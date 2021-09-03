---
title: Vue源码学习（一）
date: 2020-10-13 09:47:00
categories: Vue
---
# Vue源码学习（一）
* 调试与打包
* template和render同时存在
* 平台无关与平台相关
* Vue的构造函数
* 源码报错的两个小问题
* Vue初始化-静态成员
* Vue的实例属性和方法

## 调试与打包

* vue源码中的打包工具 Rollup
  * Vue.js 源码的打包工具使用的是 Rollup，比 Webpack 轻量
  * Webpack 把所有文件当做模块，Rollup 只处理 js 文件更适合在 Vue.js 这样的库中使用
  * Rollup 打包不会生成冗余的代码
* 安装依赖后设置 sourcemap

```json
"dev": "rollup -w -c scripts/config.js --sourcemap --environment TARGET:web- full-dev"
```

* 执行`npm run dev`打包，发现`dist`目录下生成许多文件

此处参考：[官方文档](https://cn.vuejs.org/v2/guide/installation.html#%E5%AF%B9%E4%B8%8D%E5%90%8C%E6%9E%84%E5%BB%BA%E7%89%88%E6%9C%AC%E7%9A%84%E8%A7%A3%E9%87%8A)

* 推荐使用运行时版本，因为运行时版本相比完整版体积要小大约 30%

* 基于 Vue-CLI 创建的项目默认使用的是 vue.runtime.esm.js

* *.vue 文件中的模板是在构建时预编译的，最终打包后的结果不需要编译器，只需要运行

  时版本即可

## 通过看源码解决问题

```js
const vm = new Vue({ 
    el: '#app', 
    template: '<h3>Hello template</h3>', 
    render (h) { 
        return h('h4', 'Hello render') 
    } 
})
// 同时存在template和render函数时页面输出 Hello render
```

* el 不能是 body 或者 html 标签
* 如果没有 render，把 template 转换成 render 函数
* 如果有 render 方法，直接调用 mount 挂载 DOM

```js
// 1. el 不能是 body 或者 html 
if (el === document.body || el === document.documentElement) { 
    process.env.NODE_ENV !== 'production' && warn( 
        `Do not mount Vue to <html> or <body> - mount to normal elements 
instead.` 
    )
    return this 
}
const options = this.$options 
if (!options.render) 
{ 
    // 2. 把 template/el 转换成 render 函数 
    …… 
}
// 3. 调用 mount 方法，挂载 DOM 
return mount.call(this, el, hydrating)
```

## 平台无关与平台相关

源码的`src`目录下有这样的结构

```js
|--core
|--platforms
	  |--web
	  |--weex
```

其中`core`存放的就是**平台无关**代码，`platforms`中存放的就是**平台相关**代码

**什么是平台无关性:**

* 平台无关性就是一种语言在计算机上的运行不受平台的约束，一次编译，到处执行 。 

**平台无关有两种：**

* 源代码级和目标代码级。而C和C++具有一定程度的源代码级平台无关，表明用C或C++写的应用程序不用修改只需重新编译就可以在不同平台上运行。

* 而Java编译出来的是字节码，去到哪个平台都能用，只要有那个平台的JDK就可以运行，所以，Java程序的最大优势就是平台无关。

## Vue的构造函数

* src/platform/web中有一些`entry-`文件，引用了 '/runtime/index'
* src/platform/web/runtime/index.js 中引用了 'core/index'

* src/core/index.js
  * 定义了 Vue 的静态方法
  * initGlobalAPI(Vue)

* src/core/index.js 中引用了 './instance/index'

* src/core/instance/index.js
  * 定义了 Vue 的构造函数

```js
function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  // 调用 _init() 方法，在 initMixin 中定义
  this._init(options)
}

export default Vue
```

## 源码报错的两个小问题

例如在`src/core/global/index.js`中会有报错

```js
// 例如此处不支持泛型会报错  
Vue.observable = <T>(obj: T): T => {
    observe(obj)
    return obj
  }
// 而且这段代码之后的部分不会高亮显示
```

**解决：文件 => 首选项 => 设置 => 右上角json格式**

```json
// 不检查 js 语法问题
"javascript.validate.enable": false
```

高亮显示：安装`Babel JavaScript`插件，但是之后的代码有些功能丢失了，不能跳转定义

## Vue初始化-静态成员

静态方法目录在：`src/core/global-api`中

**src/core/global-api/index.js**：初始化 Vue 的静态方法

```js
export function initGlobalAPI (Vue: GlobalAPI) {

  // src/core/global-api/index.js 
  // 初始化 Vue.config 对象
  Object.defineProperty(Vue, 'config', configDef)

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn,
    extend,
    mergeOptions,
    defineReactive
  }
 
  // 静态方法 set/delete/nextTick
  Vue.set = set
  Vue.delete = del
  Vue.nextTick = nextTick

  // 2.6 explicit observable API
  // 让一个对象可响应
  Vue.observable = <T>(obj: T): T => {
    observe(obj)
    return obj
  }
  
  // 初始化 Vue.options 对象，并给其扩展
  Vue.options = Object.create(null)
  ASSET_TYPES.forEach(type => {
    Vue.options[type + 's'] = Object.create(null)
  })

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue

  // 设置 keep-alive 组件
  extend(Vue.options.components, builtInComponents)
  
  // 注册 Vue.use() 用来注册插件
  initUse(Vue)
  // 注册 Vue.mixin() 实现混入
  initMixin(Vue)
  // 注册 Vue.extend() 基于传入的 options 返回一个组件的构造函数
  initExtend(Vue)
  // 注册 Vue.directive()、 Vue.component()、Vue.filter()
  initAssetRegisters(Vue)
}
```

上面所注册的全局API在[官方文档中](https://cn.vuejs.org/v2/api/#%E5%85%A8%E5%B1%80-API)。

关于Vue.directive可参考[这篇博客](https://www.jianshu.com/p/13398358b5b4)。

## Vue的实例属性和方法

定义实例属性和方法的目录在：`src/core/instance`中

**src/core/instance/index.js**：定义Vue的构造函数和实例成员

```js
function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  // 调用 _init() 方法，在 initMixin 中定义
  this._init(options)
}

// 下面这些方法都是在 Vue 的原型上增加属性,即实例上也可以调用

// 注册 vm 的 _init() 方法，初始化 vm
initMixin(Vue)
// 注册 vm 的 $data/$props/$set/$delete/$watch
stateMixin(Vue)
// 初始化事件相关方法 $on/$once/$off/$emit
eventsMixin(Vue)
// 初始化生命周期相关的混入方法 _update/$forceUpdate/$destroy
lifecycleMixin(Vue)
// 混入 render $nextTick/_render
renderMixin(Vue)

export default Vue
```

