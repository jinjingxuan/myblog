---
title: 面试题（一）
date: 2018-08-03 09:21:01
categories: 面试
---
# 面试题（一）
* Vue的组件传值的方式（8种）
  * 父传子：数组/对象形式，单向数据流（在子组件中改变prop会出现警告）
  * 子传父：联系发布订阅模式（$emit,$on）讲一下，怎么实现一个发布订阅模式
* 打包工具webpack，rollup，parcel分别适用于什么场景？
* 如何理解 vue 响应式原理（2.0/3.0）？
* computed和watcher的原理，有什么区别及应用场景？（Watcher，惰性）
* 为什么 Vue3.0 采用了 proxy，有什么优势？
* 说一下模块化的方案，CommonJs，AMD，CMD，ES Modules
* 介绍一下 Vue 的 Virtual DOM 与 Diff 算法
* 说一下 $nextTick 的原理
* Vue 组件 data 为什么必须是函数 ?
* webpack插件主要是做什么的，常用的有哪些，自己写过webpack插件吗
* webpack 热更新原理
* js执行会阻塞DOM树的解析和渲染，那么css加载会阻塞DOM树的解析和渲染吗？css会阻塞js吗

## Vue的组件传值的方式（8种）

* [Vue组件通信的方式](https://www.jinjingxuan.com/2020/11/12/Vue-Vue%E7%BB%84%E4%BB%B6%E9%80%9A%E4%BF%A1%E7%9A%84%E6%96%B9%E5%BC%8F/)
* [如何实现发布订阅模式](https://www.jinjingxuan.com/2020/11/12/Vue-Vue%E5%93%8D%E5%BA%94%E5%BC%8F%E5%8E%9F%E7%90%86%E8%AF%A6%E8%A7%A3/)

## props的写法

- props 可以是数组或对象，用于接收来自父组件的数据。props 可以是简单的数组，或者使用对象作为替代，对象允许配置高级选项，如类型检测、自定义验证和设置默认值。

  你可以基于对象的语法使用以下选项：

  - `type`：可以是下列原生构造函数中的一种：`String`、`Number`、`Boolean`、`Array`、`Object`、`Date`、`Function`、`Symbol`、任何自定义构造函数、或上述内容组成的数组。会检查一个 prop 是否是给定的类型，否则抛出警告。
  - `default`：`any`
    为该 prop 指定一个默认值。如果该 prop 没有被传入，则换做用这个值。对象或数组的默认值必须从一个工厂函数返回。
  - `required`：`Boolean`
    定义该 prop 是否是必填项。在非生产环境中，如果这个值为 truthy 且该 prop 没有被传入的，则一个控制台警告将会被抛出。
  - `validator`：`Function`
    自定义验证函数会将该 prop 的值作为唯一的参数代入。在非生产环境下，如果该函数返回一个 false 的值 (也就是验证失败)，一个控制台警告将会被抛出。你可以在[这里](https://cn.vuejs.org/v2/guide/components-props.html#Prop-验证)查阅更多 prop 验证的相关信息。

```js
props: {
        detail: {
            type: Object,
            default: () => {},
            required: true
        },
        age: {
          type: Number,
          default: 0,
          required: true,
          validator: function (value) {
            return value >= 0
          }
        }
}

// 子组件向父组件传值时，一个事件可以传递多个参数

// 子组件点击事件
click(params1, params2) {
    this.$emit('selectDay', params1, params2)
}

// 父组件获取值
// <child  @selectDay="fun"></child>
fun (params1, params2) {
   console.log(params1, params2) 
}
```

## 打包工具webpack，rollup，parcel分别适用于什么场景？

> webpack：一般用于大型复杂应用
>
> rollup：一般用于开发第三方类库，例如 vue 源码就是用 rollup 打包的
>
> parcel：轻量快捷，一般用于自己写一些小的 demo

## 如何理解 vue 响应式原理？

* [Vue响应式原理详解](https://www.jinjingxuan.com/2020/11/12/Vue-Vue%E5%93%8D%E5%BA%94%E5%BC%8F%E5%8E%9F%E7%90%86%E8%AF%A6%E8%A7%A3/)
* [Vue 3.0响应式原理](https://www.jinjingxuan.com/2020/12/17/Vue-Vue3.0%EF%BC%88%E4%BA%8C%EF%BC%89/)

## computed和watcher的原理，有什么区别及应用场景？（Watcher，惰性）

**一、 计算属性（computed）** 

> computed 是计算属性，它会根据你所依赖的数据动态显示新的计算结果

通过计算出来的属性**不需要调用**直接可以在 DOM 里使用

```html
<div id='app'>
  <p>我是原始值: {{ message }}</p>
  <p>我是计算属性的值: {{ computedMessage }}</p> 
</div>

    <script>
        let app = new Vue({
            el:'#app',
            data: {
                message: 'hello'
            },
            computed: {
                computedMessage: function () {
                    return this.message.split('').reverse().join('')
                }
            }      
        })
    </script>
```

计算属性的set操作

```js
// set 操作
computedMessage: {
  get() {
		return
  }
  set() {
		return
  }
}
```

**二、methods同样可实现** （没有缓存，会计算多次）

```html
<div id="app">
  <p>Original message: "{{ message }}"</p>
  <p>Computed reversed message: "{{ reversedMessage() }}"</p>
  <p>Computed reversed message: "{{ reversedMessage() }}"</p>
  <p>Computed reversed message: "{{ reversedMessage() }}"</p>
  <p>Computed reversed message: "{{ reversedMessage() }}"</p>
  <p>Computed reversed message: "{{ reversedMessage() }}"</p>
</div>

<script>
const app = new Vue({
  el: '#app',
  data: {
    message: 'Hello'
  },
  methods: {
    // 计算属性的 getter
    reversedMessage: function () {
      // this 指向 Vue 实例
      return this.message.split('').reverse().join('')
    }
  }
})
</script>script>
```

**三、监听属性（watch）** 

> 侦听属性 `watch` 用来观察和响应数据的变动。 

```html
    <div id="demodiv">      
        <input type="text" v-model="text">
        {{text}}         
    </div>

    <script>
        new Vue({
            el:"#demodiv",
            data:{
                    text:"abcdefg"
            },
            watch:{
                text(newval,oldval){
                    console.log(newval+'========'+oldval)
                }
            }
        })
    </script>
```

（1）首先表明，computed 和 watch 都属于 watcher，在`initState`中初始化，一共有三种还有一种是渲染 Watcher 在 mount 中初始化，本质上都依赖于 Vue 的响应式原理。

（2）computed 本质是一个惰性求值的观察者，具有缓存性，只有当依赖变化后，第一次访问 computed 属性，才会计算新的值，其内部通过dirty属性标记计算属性是否需要重新求值。而 watch 则是当数据发生变化便会调用执行函数。

（3）`computed`: 当某个数据需要随着（依赖于）另一个数据的变动而作出改变时，这时候你需要使用计算属性。 `watch`: 当某个数据发生变化时，需要对这个数据的变化进行反应（进行一系列操作），这时候你需要使用侦听属性。`methods`: 与计算属性不同的是，每次读取数据时，都是计算一遍，除非你不需要缓存，否则这样做需要大量的性能开销。  

### watch的两个参数

* immediate：代表立即执行，而不是等监听对象改变再执行
* deep：深度监听，对象的属性改变也可以监听的到

可以参考[这篇文章](https://zhuanlan.zhihu.com/p/86273758)

```js
// 两种写法
watch: {
    'user.firstName': function (newValue, oldValue) {
        this.user.fullName = this.user.firstName + '' + this.user.lastName
    }
}

watch: {
    'user': {
        handler: function (newValue, oldValue) {
        	this.user.fullName = this.user.firstName + '' + this.user.lastName
    	  },
        deep: true,
        immediate: true
    }
}
```

### 三种类型的 Watcher 对象

* 没有静态方法，因为 $watch 方法中要使用 Vue 的实例

* Watcher 分三种：计算属性 Watcher、用户 Watcher (侦听器)、渲染 Watcher
  * 计算属性 Watcher 在 initComputd 中创建
  * 用户 Watcher (侦听器) 在 Vue.$watch 中创建
  * 渲染 Watcher 在 mountComponent 中创建
* Watcher内部实现是一样的，`src/core/observer/watcher.js`中，并且每一个Watcher都有一个id

* 创建顺序：计算属性 Watcher、用户 Watcher (侦听器)、渲染 Watcher

* vm.$watch()
  * src\core\instance\state.js

```js
Vue.prototype.$watch = function (
    expOrFn: string | Function,
    cb: any,
    options?: Object
  ): Function {
    // 获取 Vue 实例 this
    const vm: Component = this
    if (isPlainObject(cb)) {
      // 判断如果 cb 是对象执行 createWatcher
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {}
    options.user = true
    // 创建用户 watcher 对象
    const watcher = new Watcher(vm, expOrFn, cb, options)
    // 判断 immediate 如果为 true
    if (options.immediate) {
      // 立即执行一次 cb 回调，并且把当前值传入
      try {
        cb.call(vm, watcher.value)
      } catch (error) {
        handleError(error, vm, `callback for immediate watcher "${watcher.expression}"`)
      }
    }
    // 返回取消监听的方法
    return function unwatchFn () {
      watcher.teardown()
    }
  }
```

## 为什么 Vue3.0 采用了 proxy，有什么优势？

* [Vue响应式原理详解](https://www.jinjingxuan.com/2020/11/12/Vue-Vue%E5%93%8D%E5%BA%94%E5%BC%8F%E5%8E%9F%E7%90%86%E8%AF%A6%E8%A7%A3/)

## 说一下模块化的方案，CommonJs，AMD，CMD，ESModules

* [模块化](https://www.jinjingxuan.com/2020/09/05/%E6%A8%A1%E5%9D%97%E5%8C%96-%E6%A8%A1%E5%9D%97%E5%8C%96/)

## 介绍一下 Vue 的 Virtual DOM 与 Diff 算法

* [Virtual DOM 与 Diff 算法](https://www.jinjingxuan.com/2020/09/24/VirtualDOM-VirtualDOM%E4%B8%8EDiff%E7%AE%97%E6%B3%95/)

## 说一下 $nextTick 的原理

* [nextTick](https://www.jinjingxuan.com/2020/10/16/Vue-Vue%E6%BA%90%E7%A0%81%E5%AD%A6%E4%B9%A0%EF%BC%88%E4%BA%8C%EF%BC%89/#toc-heading-3)

## Vue 组件 data 为什么必须是函数 ?

> vue中data 是可以直接写成一个对象的,但这是保证这个组件不会被复用的情况下
>
> 由于组价的复用,其实是创建多个vue实例,如果data中仍然是只是一个对象,那么其实创建出来的实例保持的都是对同一个对象的引用。
>
> 所以我们通过 一个 函数执行返回了一个新的全新的数据对象。

## webpack插件主要是做什么的，常用的有哪些，自己写过webpack插件吗

* [webpack插件](https://www.jinjingxuan.com/2020/09/06/webpack-webpack%EF%BC%88%E4%BA%8C%EF%BC%89/)

## webpack 热更新原理

* [从零实现webpack热更新HMR](https://juejin.cn/post/6844904020528594957)

## js执行会阻塞DOM树的解析和渲染，那么css加载会阻塞DOM树的解析和渲染吗？css会阻塞js吗

* css加载不会阻塞DOM树的解析
* css加载会阻塞DOM树的渲染
* css加载会阻塞后面js语句的执行

