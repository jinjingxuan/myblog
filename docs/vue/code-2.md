---
title: Vue源码学习（二）
date: 2020-10-16 09:47:00
categories: Vue
---
# Vue源码学习（二）
* watch的两个参数
* 三种类型的 Watcher 对象
* 异步更新队列-nextTick

## watch的两个参数

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

## 三种类型的 Watcher 对象

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

## 异步更新队列-nextTick

可以查看[Vue.nextTick 的原理和用途](https://www.jianshu.com/p/7f9495b1c8ab)

* 首先修改数据，在script代码块中，这是宏任务，同一事件循环的所有的宏任务都在主线程上执行，形成一个执行栈，此时还未涉及DOM.

* Vue开启一个异步队列，并缓冲在此事件循环中发生的所有数据变化。如果同一个watcher被多次触发，只会被推入 queueWatcher 队列中一次，这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作上非常重要

#### 定义位置

* src\core\instance\render.js

```js
Vue.prototype.$nextTick = function (fn: Function) { 
    return nextTick(fn, this) 
}
```

#### 源码

* 手动调用 vm.$nextTick()
* 在 Watcher 的 queueWatcher 中执行 nextTick()
* src\core\util\next-tick.js

#### 注意

* 在修改完数据时，想要获取更新后 DOM 上最新数据，需要使用 nextTick，因为 DOM 的更新过程是异步的

* nextTick 会把传入的回调函数 cb 压入 callbacks 数组，这里使用 callbacks 而不是直接在 nextTick 中执行回调函数的原因是保证在同一个 tick 内多次执行 nextTick时不会开启多个异步任务，而是把这些任务放在一起一同执行。

* 那么这些回调函数如何调用呢，nextTick 内部优先使用微任务执行异步的回调函数，microtask 因为其高优先级特性能确保队列中的微任务在一次事件循环前被执行完毕，如果浏览器不支持 Promise 的话会降级成 MutationObserver，如果浏览器再不支持微任务，会降级成宏任务，如果 IE 优先使用 setImmediate，否则使用 setTimeout

* 然后其实Vue进行 DOM 更新内部也是调用 nextTick 来做异步队列控制，而当我们自己调用 nextTick 时，更新 DOM 的回调函数已经加入了callback，在他后面后追加了我们自己的回调函数，从而确保我们的代码在 DOM 更新后执行，所以我们可以拿到更新后的 DOM

* 问题： 按照 macrotask => microtask => ui渲染的顺序，若 nextTick 在微任务队列中，此时ui还没渲染，那他是怎么拿到 DOM 的呢

  * 首先解释：其实macrotask => microtask => ui渲染的规则是为了 JS 引擎线程和 GUI 渲染线程有序切换

  * 因为已经保证了我们的 nextTick 在更新 DOM 的 nextTick 之后，可以拿到，就是还没渲染而已

```js
// 支持 Promise 使用 Promise
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  const p = Promise.resolve()
  timerFunc = () => {
    p.then(flushCallbacks)
    if (isIOS) setTimeout(noop)
  }
  isUsingMicroTask = true
// 否则使用 MutationObserver
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  let counter = 1
  const observer = new MutationObserver(flushCallbacks)
  const textNode = document.createTextNode(String(counter))
  observer.observe(textNode, {
    characterData: true
  })
  timerFunc = () => {
    counter = (counter + 1) % 2
    textNode.data = String(counter)
  }
  isUsingMicroTask = true
// 否则使用 setImmediate
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = () => {
    setImmediate(flushCallbacks)
  }
// 否则使用 setTimeout
} else {
  // Fallback to setTimeout.
  timerFunc = () => {
    setTimeout(flushCallbacks, 0)
  }
}

// 如果有回调函数 cb 则加入一个队列，如果没有则返回 Promise，第二个参数是上下文
export function nextTick (cb?: Function, ctx?: Object) {
  let _resolve
  callbacks.push(() => {
    if (cb) {
      try {
        cb.call(ctx)
      } catch (e) {
        handleError(e, ctx, 'nextTick')
      }
    } else if (_resolve) {
      _resolve(ctx)
    }
  })
  if (!pending) {
    pending = true
    timerFunc() // 取出所有的回调函数调用
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(resolve => {
      _resolve = resolve
    })
  }
}
```

