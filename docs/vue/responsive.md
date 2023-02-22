---
title: Vue响应式原理详解
date: 2020-11-12 11:27:54
categories: Vue
---
# Vue响应式原理详解
## 发布订阅模式

* 订阅者
* 发布者
* 信号中心

> 假定存在一个信号中心，某个任务执行完成，就向信号中心发布一个信号，其他任务可以向信号中心订阅这个信号，从而知道自己什么时候自己可以开始执行。

## Vue的自定义事件

```js
let vm = new Vue()

// 注册事件
vm.$on('dataChange', ()=>{
    console.log('dataChange')
})

vm.$on('dataChange', ()=>{
    console.log('dataChange1')
})

// 发起事件
vm.$emit('dataChange')
```

### 兄弟组件通信过程

**两个组件不相互依赖，即发布者和订阅者被事件中心隔离**

```js
// 信号中心
let eventHub = new Vue()

// ComponentA.vue
// 发布者
addTodo: function () {
    // 发布事件
    eventHub.$emit('add-todo', { text: this.newTodoText })
    this.newTodoText = ''
}
// ComponentB.vue
// 订阅者
created: function () {
    // 订阅事件
    eventHub.$on('add-todo', this.addTodo)
}
```

### 模拟实现vue的自定义事件

```js
// 类内部存储一个对象，包含事件名和对应的触发函数
// { click: [fn1, fn2], change: fn }
class EventEmitter {
  constructor () {
    this.subs = Object.create(null)
  }
  // 注册事件
  $on (eventType, handler) {
    this.subs[eventType] = this.subs[eventType] || []
    this.subs[eventType].push(handler)
  }

  // 触发事件
  $emit (eventType) {
    if (this.subs[eventType]) {
      this.subs[eventType].forEach(handler => handler())
    }
  }

  $off(eventType) {
    this.subs[eventType] = []
  }
}

// 测试
let em = new EventEmitter() // 信号中心
em.$on('click', () => {
  console.log('click1')
})
em.$on('click', () => {
  console.log('click2')
})
em.$emit('click')
```

[Object.create(null) 和 {} 的区别](https://juejin.cn/post/6844903589815517192)

## 观察者模式

* 观察者  -- watcher
  * update()：当事件发生时，具体要做的事情
* 发布者 -- Dep
  * subs数组：存储所有观察者
  * addSub()：添加观察者
  * notify()：当事件发生，调用所有观察者的update方法
* 没有事件中心

```js
    // 发布者-目标
    class Dep {
      constructor () {
        // 记录所有的订阅者
        this.subs = []
      }
      // 添加订阅者
      addSub (sub) {
        if (sub && sub.update) {
          this.subs.push(sub)
        }
      }
      // 发布通知
      notify () {
        this.subs.forEach(sub => sub.update())
      }
    }

    // 订阅者-观察者
    class Watcher {
      update () {
        console.log('update')
      }
    }

    // 测试
    let dep = new Dep()
    let watcher = new Watcher()

    dep.addSub(watcher)
    dep.notify()
```

## Vue实例初始化过程

在 Vue 实例初始化的时候会调用`_init`方法，`_init`方法中有很多初始化的过程，比如

```js
//初始化生命周期
initLifecycle(vm)
//初始化事件
initEvents(vm)
//初始化render
initRender(vm)
// ...
initState(vm)
```

这里的重点就是`initState`方法，`initState`中也初始化了很多，如下：

```js
  //初始化props
  if (opts.props) initProps(vm, opts.props)
  //初始化methods
  if (opts.methods) initMethods(vm, opts.methods)
  //初始化data！！！再次划重点！！！
  if (opts.data) {
    initData(vm)
  } else {
    //即使没有data，也要调用observe观测_data对象
    observe(vm._data = {}, true /* asRootData */)
  }
```

这里的重点就是`initData`方法，在其内部调用了`observe`方法，到这里才是真正响应式的开始

```js
  //将vm中的属性转至vm._data中
  proxy(vm, `_data`, key)
  //调用observe观测data对象
  observe(data, true /* asRootData */)
```

observe是一个工厂函数，用于为对象生成一个Observe实例。而真正将对象转化为响应式对象的是observe工厂函数返回的Observe实例。

```js
export class Observer {
  constructor (value: any) {
    //对象本身
    this.value = value
    //依赖收集器
    this.dep = new Dep()
    this.vmCount = 0
    //为对象添加__ob__属性
    def(value, '__ob__', this)
    //若对象是array类型
    if (Array.isArray(value)) {
      ...
    } else {
      //若对象是object类型
      ...
    }
  }
```

从代码分析，Observe构造函数做了三件事：

- 为对象添加 `__ob__`属性， `__ob__`中包含value数据对象本身、dep依赖收集器、vmCount。数据经过这个步骤以后的变化如下：

```js
//原数据
  const data = {
        name: 'summer'
  }
  //变化后数据
  const data = {
        name: 'summer',
        __ob__: {
            value: data, //data数据本身
            dep: new Dep(), //dep依赖收集器
            vmCount: 0
        }
  }
```

- 若对象是array类型，则进行array类型操作
- 若对象是object类型，则进行object类型操作

### 1. 数据是object类型

当数据是object类型时，调用了一个walk方法，在walk方法中遍历数据的所有属性，并调用defineReactive方法。

```js
export function defineReactive (...) {
  //dep存储依赖的变量，每个属性字段都有一个属于自己的dep，用于收集属于该字段的依赖
  const dep = new Dep()

  //为属性加入getter/setter方法
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get () {
      // 收集依赖，target会在watcher类中定义
      Dep.target && dep.addSub(Dep.target)
      return val
    },
    set (newValue) {
      if (newValue === val) {
        return
      }
       val = newValue
       that.walk(newValue)
       // 发送通知
       dep.notify()
    }
  })
}
```

**在getter中收集依赖，在setter中触发依赖。**

- 当外界通过Watcher读取数据时，会触发getter从而将Watcher添加到依赖中。
- 在修改对象的值的时候，会触发对应的`setter`， `setter`通知之前**依赖收集**得到的 Dep 中的每一个 Watcher，告诉它们自己的值改变了，需要重新渲染视图。这时候这些 Watcher就会开始调用 `update` 来更新视图。

### 2. 数据是array类型

调用`arrayMethods`拦截修改数组方法：

- 需要拦截的修改数组的方法有：push、pop、shift、unshift、splice、sort、reverse
- 当数组有新增元素时，使用observeArray对新增的元素进行观测

**对于对象**

Vue 无法检测 property 的添加或移除。这是因为 Vue 通过`Object.defineProperty`来将对象的key转换成`getter/setter`的形式来追踪变化，但`getter/setter`只能追踪一个数据是否被修改，无法追踪新增属性和删除属性。由于 Vue 会在**初始化实例**时对 property 执行 getter/setter 转化，所以 property 必须在 `data` 对象上存在才能让 Vue 将它转换为响应式的。例如：

```js
var vm = new Vue({
  data:{
    a:1
  }
})

// `vm.a` 是响应式的

vm.b = 2
// `vm.b` 是非响应式的
```

对于已经创建的实例，Vue 不允许动态添加根级别的响应式 property。但是，可以使用 `Vue.set(object, propertyName, value)` 方法向嵌套对象添加响应式 property。例如，对于：

```js
Vue.set(vm.someObject, 'b', 2)
```

您还可以使用 `vm.$set` 实例方法，这也是全局 `Vue.set` 方法的别名：

```js
this.$set(this.someObject,'b',2)
```

* 给data对象的某个属性设置为一个新的对象`this.o = { name: 'xxx' }`，此对象是响应式的
* 给data对象的obj新增一个name属性时，`this.obj.name = 'xxx'`，该属性不是响应式的

**对于数组**

`Object.defineProperty` 不能监听数组的一些方法，push/pop/splice等等改变原数组的方法不能触发set，需要进行数组方法的重写。（Vue3中使用proxy则不存在这些问题）

```js
因为 Vue2.x 的响应式是通过 Object.defineProperty() 实现的，这个 api 没办法监听数组长度的变化，也就没办法监听数组的新增，push/pop/splice等也就不能触发set
```

此外 Vue 不能检测以下数组的变动：

1. 当你利用索引直接设置一个数组项时，例如：`vm.items[indexOfItem] = newValue`
2. 当你修改数组的长度时，例如：`vm.items.length = newLength`

举个例子：

```js
var vm = new Vue({
  data: {
    items: ['a', 'b', 'c']
  }
})
vm.items[1] = 'x' // 不是响应性的
vm.items.length = 2 // 不是响应性的
```

**为什么数组方法可以重写，但是不去监听数组属性(索引和length)呢？**

* 性能问题：数组数据可能有很多

为了解决这个问题，以下两种方式都可以实现和 `vm.items[indexOfItem] = newValue` 相同的效果，同时也将在响应式系统内触发状态更新：

```js
// Vue.set
Vue.set(vm.items, indexOfItem, newValue)
// Array.prototype.splice
vm.items.splice(indexOfItem, 1, newValue)
```

你也可以使用 [`vm.$set`](https://cn.vuejs.org/v2/api/#vm-set) 实例方法，该方法是全局方法 `Vue.set` 的一个别名：

```js
vm.$set(vm.items, indexOfItem, newValue)
```

为了解决不监听数组长度的问题，你可以使用 `splice`和重写数组方法：

```js
vm.items.splice(newLength)
```

* Vue.set 和 vm.$set内部是同一个方法，原理是手动触发 notify

```js
  // 获取 target 中的 observer 对象
  const ob = (target: any).__ob__
  // 如果 target 是 vue 实例或者$data 直接返回
  if (target._isVue || (ob && ob.vmCount)) {
    return val
  }
  // 如果 ob 不存在，target 不是响应式对象直接赋值
  if (!ob) {
    target[key] = val
    return val
  }
  // 把 key 设置成响应式属性
  defineReactive(ob.value, key, val)
  // 发送通知
  ob.dep.notify()
  return val
}
```

## 组件渲染过程

**那么究竟是如何触发依赖实现响应式的呢，从组件渲染阶段开始说起**

vue源码的 instance/init.js 中是初始化的入口，其中初始化中除了初始化的几个步骤以外，在最后有这样一段代码，**要实现的功能是挂载到el上，要么是运行时有render直接挂载，要么将template/el编译一下再挂载**

```js
if (vm.$options.el) {
  vm.$mount(vm.$options.el)
}
```

* 一共有两个`$mount`,第一个定义在`entry-runtime-with-compiler.js`文件中，这是[完整构建版本的入口](https://juejin.cn/post/6844904073238446093)，首先会判断一下当前是否传入了`render`选项，如果没有传入的话，它会去获取我们的`template`选项，如果`template`选项也没有的话，他会把`el`中的内容作为我们的模板，然后把模板编译成`render`函数，存在我们的`options.render`中，优先级[`render > template > el`](https://blog.csdn.net/jiang7701037/article/details/83178630)
* 另一个`$mount`是`src/platforms/web/runtime/index.js`文件中的`$mount`方法
  * 运行时版本的挂载入口，可以直接调用，因为运行时存在`render`，直接挂载到el上即可
  * 完整版本的`$mount`函数的最后调用，因为完整版本经过`template`编译之后，也有了`render`

```js
Vue.prototype.$mount = function(
    el?: string | Element,
    hydrating?: boolean
): Component {
    // 判断el, 以及宿主环境, 然后通过工具函数query重写el。
    el = el && inBrowser ? query(el) : undefined
    // 执行真正的挂载并返回
    return mountComponent(this, el, hydrating)
}
```

* 接下来调用`mountComponent()`，首先会判断`render`选项，如果没有`render`选项，会报出警告
  * 如果我们传入了`template`或`el`，然后还没有`render`，会告诉我们如果是运行时版本不支持编译器。
  * 否则会警告`template or render function not defined`
* 接下来会触发beforeMount这个生命周期中的钩子函数，也就是开始挂载之前。

```js
export function mountComponent(
    vm: Component, // 组件实例vm
    el: ?Element, // 挂载点
    hydrating?: boolean
): Component {
    // 在组件实例对象上添加$el属性
    // $el的值是组件模板根元素的引用
    vm.$el = el
    if (!vm.$options.render) {
        // 渲染函数不存在, 这时将会创建一个空的vnode对象
        vm.$options.render = createEmptyVNode
        if (process.env.NODE_ENV !== "production") {
            /* istanbul ignore if */
            if (
                (vm.$options.template &&
                    vm.$options.template.charAt(0) !== "#") ||
                vm.$options.el ||
                el
            ) {
                warn(
                    "You are using the runtime-only build of Vue where the template " +
                        "compiler is not available. Either pre-compile the templates into "+
                        "render functions, or use the compiler-included build.",
                    vm
                )
            } else {
                warn(
                    "Failed to mount component: template or render function not defined.",
                    vm
                )
            }
        }
    }
    // 触发 beforeMount 生命周期钩子
    callHook(vm, "beforeMount")
```

* 然后定义了updateComponent()，在这个函数中，调用`vm._render`和`vm._update`，`vm._render`的作用是生成虚拟DOM，`vm._update`的作用是将虚拟`DOM`转换成真实`DOM`，并且挂载到页面上，这里只是定义
* 然后创建`Watcher`对象，在创建`Watcher`时，传递了`updateComponent`这个函数，这个函数最终是在`Watcher`内部调用的。在`Watcher`内部会用`get`方法，当Watcher创建完成之后,会触发生命周期中的`mounted`钩子函数

```js
new Watcher(vm, updateComponent, noop, {
    before () {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate')
      }
    }
  }, true /* isRenderWatcher */)

// vm ：与Wather对应的Vue Component实例，这种对应关系通过Wather去管理
// updateComponent：可以理解成Vue Component的更新函数，调用实例render和update两个方法，render作用是将Vue对象渲染成虚拟DOM,update是通过虚拟DOM创建或者更新真实DOM
```

上面说在创建 Watcher 实例的时候会调用`get`方法，在get方法中，会调用`updateComponent()`，调用其中的`_render`函数找到传入或者编译生成的`render`函数去生成虚拟DOM，然后调用`_update`方法将虚拟DOM转换成真实DOM

* [更多详细请看](https://zhuanlan.zhihu.com/p/110441137)

Watcher 实例分为渲染 watcher (render watcher),计算属性 watcher (computed watcher),侦听器 watcher（user watcher）三种：

1. initState 时,对 computed 属性初始化时,触发 computed watcher 依赖收集
2. initState 时,对侦听属性初始化时,触发 user watcher 依赖收集
3. render()的过程,触发 render watcher 依赖收集
4. re-render 时,vm.render()再次执行,会移除所有 subs 中的 watcer 的订阅,重新赋值。

**watcher类**

```js
class Watcher {
    constructor (
    vm: Component, 
    expOrFn: string | Function,
    cb: Function,
    options?: ?Object,
    isRenderWatcher?: boolean
  ) {
    this.vm = vm
    if (isRenderWatcher) {
      // 将渲染函数的观察者存入_watcher
      vm._watcher = this
    }
    // 将所有观察者push到_watchers列表
    vm._watchers.push(this)
  }
    
  get () { // 触发取值操作，进而触发属性的getter
    pushTarget(this) // Dep 中提到的：给 Dep.target 赋值 watcher
    let value
    const vm = this.vm
    try {
      // 核心，运行观察者表达式，进行取值，触发getter，从而在闭包中添加watcher
      value = this.getter.call(vm, vm)
    } catch (e) {
      if (this.user) {
        handleError(e, vm, `getter for watcher "${this.expression}"`)
      } else {
        throw e
      }
    } finally {
      if (this.deep) { // 如果要深度监测，再对 value 执行操作
        traverse(value)
      }
      // 清理依赖收集
      popTarget()
      this.cleanupDeps()
    }
    return value
  }

  // 当依赖变化时，触发更新
  update () {
    ...
  }
}
```

## 响应式的整体流程
[Vue响应式原理-理解Observer、Dep、Watcher](https://juejin.cn/post/6844903858850758670)

* 组件实例初始化过程中，walk 方法遍历 data 利用`Object.defineProperty`为每个属性添加getter、setter方法，用于收集依赖和触发依赖，每个属性都会有一个 Dep 用来收集依赖。
* 组件渲染过程中（mountComponent方法），初始化组件自己的 watcher 对象，当外界通过 watcher 读取数据时，会触发 getter 从而将 watcher 添加到 Dep 中。watcher 可以是渲染 watcher、computed watcher、watch watcher
* data 中的属性变化，会调用 setter 中的方法（Dep.notify）通知收集到的 watcher 执行 update 方法。
* watcher 收到依赖变化的消息，重新渲染虚拟dom，实现页面响应

## Vue 3.0 Proxy

>  Object.defineProperty 只能劫持对象的属性,因此我们需要对每个对象的每个属性进行遍历。Vue 2.x 里,是通过 递归 + 遍历 data 对象来实现对数据的监控的,如果属性值也是对象那么需要深度遍历,显然如果能劫持一个完整的对象是才是更好的选择。Proxy 可以劫持整个对象,并返回一个新的对象。Proxy 不仅可以代理对象,还可以代理数组。还可以代理动态增加的属性。

 Proxy可以理解成，在目标对象之前架设一层 "拦截"，当外界对该对象访问的时候，都必须经过这层拦截，而Proxy就充当了这种机制，类似于代理的含义，它可以对外界访问对象之前进行过滤和改写该对象。 

  > proxy不存在Object.defineProperty()的三个问题,并且Proxy有多达13种拦截方法 

  ```js
  var proxy = new Proxy(target, handler);
  ```

  > `new Proxy()`表示生成一个`Proxy`实例，`target`参数表示所要拦截的目标对象，`handler`参数也是一个对象，用来定制拦截行为

  ```js
  let obj = {
    name: 'Eason',
    age: 30
  }
  let handler = {
    get (target, key, receiver) {
      console.log('get', key)                   // 如果什么操作也没有就直接return Reflect..
      // return target[key]
      return Reflect.get(target, key, receiver) //函数式行为
    },
    set (target, key, value, receiver) {
      console.log('set', key, value)
      // target[key] = value
      return Reflect.set(target, key, value, receiver)
    }
  }
  let proxy = new Proxy(obj, handler)
  
  proxy.name = 'Zoe' // set name Zoe
  proxy.age = 18     // set age 18
  proxy.name         //22 get name
  	              //"Eason"
  ```

  * `proxy` 读取属性的值时，实际上执行的是 `Handler.get` ：在控制台输出信息，并且读取被代理对象 `obj` 的属性。
  * 在 ``proxy`` 设置属性值时，实际上执行的是 `Handler.set` ：在控制台输出信息，并且设置被代理对象 `obj` 的属性的值

  > Reflect是一个内置的对象，没有构造函数，所有的属性与方法都是静态的（就像Math对象）
  >
  > Reflect.get():获取对象身上某个属性的值，类似于 target[name]。
  >
  > Reflect.set():将值分配给属性的函数,返回一个Boolean，如果更新成功，则返回true。 
  >
  > Reflect对象的静态方法和Proxy对象的静态方法一一对应 ，一共13种
  >
  > Reflect设计的目的是为了优化Object的一些操作方法以及合理的返回Object操作返回的结果，对于一些命令式的Object行为，Reflect对象可以将其变为函数式的行为 

  ```js
  const obj = {
      name: 'ace',
      age: 18
  }
  
  console.log('name' in obj)
  console.log(delete obj['age'])
  console.log(Object.keys(obj))
  
  console.log(Reflect.has(obj, 'name'))
  console.log(Reflect.deleteProperty(obj, 'age'))
  console.log(Reflect.ownKeys(obj))
  ```

  ```js
  Reflect.apply(target, thisArgument, argumentsList)
  // 对一个函数进行调用操作，同时可以传入一个数组作为调用参数。和 Function.prototype.apply() 功能类似。
  
  Reflect.construct(target, argumentsList[, newTarget])
  // 对构造函数进行 new 操作，相当于执行 new target(...args)。
  
  Reflect.defineProperty(target, propertyKey, attributes)
  // 和 Object.defineProperty() 类似。如果设置成功就会返回 true
  
  Reflect.deleteProperty(target, propertyKey)
  //作为函数的delete操作符，相当于执行 delete target[name]。
  
  Reflect.get(target, propertyKey[, receiver])
  // 获取对象身上某个属性的值，类似于 target[name]。
  
  Reflect.getOwnPropertyDescriptor(target, propertyKey)
  // 类似于 Object.getOwnPropertyDescriptor()。如果对象中存在该属性，则返回对应的属性描述符,  否则返回 undefined.
  
  Reflect.getPrototypeOf(target)
  // 类似于 Object.getPrototypeOf()。
  
  Reflect.has(target, propertyKey)
  // 判断一个对象是否存在某个属性，和 in 运算符 的功能完全相同。
  
  Reflect.isExtensible(target)
  // 类似于 Object.isExtensible().
  
  Reflect.ownKeys(target)
  // 返回一个包含所有自身属性（不包含继承属性）的数组。(类似于 Object.keys(), 但不会受enumerable影响).
  
  Reflect.preventExtensions(target)
  // 类似于 Object.preventExtensions()。返回一个Boolean。
  
  Reflect.set(target, propertyKey, value[, receiver])
  // 将值分配给属性的函数。返回一个Boolean，如果更新成功，则返回true。
  
  Reflect.setPrototypeOf(target, prototype)
  // 设置对象原型的函数. 返回一个 Boolean， 如果更新成功，则返回true。
  ```

  ### Proxy 中的 receiver

[Proxy 和 Reflect](https://zh.javascript.info/proxy)

> 在 Reflect.get 的场景下，receiver 可以改变计算属性中 this 的指向。

```js
var target = {
  get a() { return this.c }
}

Reflect.get(target, 'a', { c: 4 }) // 4
```

> receiver是接受者的意思，表示调用对应属性或方法的主体对象，通常情况下，receiver参数是无需使用的，但是如果发生了继承，为了明确调用主体，receiver参数就需要出马了。

```js
let user = {
  _name: "Guest",
  get name() {
    return this._name;
  }
};

let userProxy = new Proxy(user, {
  get(target, prop, receiver) {
    return target[prop]; // (*) target = user
    return Reflect.get(target, prop, receiver); // receiver = admin
  }
});

let admin = {
  __proto__: userProxy,
  _name: "Admin"
};

// 期望输出：Admin
alert(admin.name); // 输出：Guest (?!?)
```

- `target` —— 是目标对象，该对象被作为第一个参数传递给 `new Proxy`，
- `prop` —— 目标属性名，
- `receiver` —— 如果目标属性是一个 getter 访问器属性，则 `receiver` 就是本次读取属性所在的 `this` 对象。通常，这就是 `proxy` 对象本身（或者，如果我们从 proxy 继承，则是从该 proxy 继承的对象）。

  

