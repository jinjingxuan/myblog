---
title: 模块化
date: 2020-09-05 09:47:00
categories: 模块化
---
# 模块化
* 模块化的演变过程
* ES Modules
* Polyfill
* ES Module与CommonJS交互
* import中的@

## 模块化的演变过程

1. 基于文件的划分模块的方式

> 所有模块都直接在全局工作，没有私有空间，所有成员都可以在模块外部被访问或者修改，
>
> 而且模块一段多了过后，容易产生命名冲突，
>
> 另外无法管理模块与模块之间的依赖关系

2. 命名空间方式

> 具体做法就是在第一阶段的基础上，通过将每个模块「包裹」为一个全局对象的形式实现，
>
> 有点类似于为模块内的成员添加了「命名空间」的感觉。
>
> 通过「命名空间」减小了命名冲突的可能，
>
> 但是同样没有私有空间，所有模块成员也可以在模块外部被访问或者修改，
>
> 而且也无法管理模块之间的依赖关系。

3. IIFE：立即执行函数，实现了私有成员

> 具体做法就是将每个模块成员都放在一个函数提供的私有作用域中，
>
> 对于需要暴露给外部的成员，通过挂在到全局对象上的方式实现
>
> 有了私有成员的概念，私有成员只能在模块成员内通过闭包的形式访问。

```js
// module a 相关状态数据和功能函数，IIFE

;(function () {
  var name = 'module-a'
  
  function method1 () {
    console.log(name + '#method1')
  }
  
  function method2 () {
    console.log(name + '#method2')
  }

  window.moduleA = {
    method1: method1,
    method2: method2
  }
})()

```

4. CommonJS规范（node环境）

* 一个文件就是一个模块
* 每个模块都有单独的作用域
* 通过`module.exports`导出成员
* 通过require函数载入模块

> 浏览器端不能使用，因为CommonJS是以同步模式加载模块，每一次页面加载都会有大量模块请求

5. AMD：Asynchronous Module Definition （异步模块定义）

> 同时期推出了require.js，实现了AMD规范
>
> 目前绝大数第三方库都支持AMD规范
>
> 但是AMD使用起来比较复杂，模块JS文件请求频繁

6. Sea.js + CMD ：Common Module Definition 

> 类似于CommonJS的语法

## ES Modules

* CommonJS in Node.js（目前Node8以上也支持ES Modules）
* ES Modules in Browsers（ES6）

### ES Modules 基本特性

* 自动采用严格模式，忽略 'use strict'
* 每个 ES Module 都是运行在单独的私有作用域中
* ESM 是通过 CORS 的方式请求外部 JS 模块的
* ESM 的 script 标签会延迟执行脚本

```html
  <!-- 通过给 script 添加 type = module 的属性，就可以以 ES Module 的标准执行其中的 JS 代码了 -->
  <script type="module">
    console.log('this is es module')
  </script>

  <!-- 1. ESM 自动采用严格模式，忽略 'use strict' -->
  <script type="module">
    console.log(this) // undefined
  </script>

  <!-- 2. 每个 ES Module 都是运行在单独的私有作用域中 -->
  <script type="module">
    var foo = 100
    console.log(foo)
  </script>
  <script type="module">
    console.log(foo)
  </script>

  <!-- 3. ESM 是通过 CORS 的方式请求外部 JS 模块的，需要服务器端的跨域支持，普通script不存在跨域 -->
  <script type="module" src="https://unpkg.com/jquery@3.4.1/dist/jquery.min.js"></script> 

  <!-- 4. ESM 的 script 标签会延迟执行脚本,此处会先执行p标签 -->
  <script defer src="demo.js"></script>
  <p>需要显示的内容</p> 
```

### ES Modules 的导入导出

```js
// app.js
import { default as fooName, fooHello, Person } from './module.js'

import height23 from './module.js' // 接收default

console.log(fooName, fooHello, Person)

// modeule.js
var name = 'foo module'

var height = 180

function hello () {
  console.log('hello')
}

class Person {}

export { name as default, hello as fooHello, Person }

export default height

// index.html
<script type="module" src="app.js"></script>
```

### 几点注意事项

```js
import { name } from './module.js' // 不能省略.js
import { lowercase } from './utils/index.js' // 不能省略index.js，否则找不到
import { name } from './module.js' // 不能省略./，否则认为加载第三方模块
import './module.js' // 加载这个模块但是不提取
import * as mod from './module.js' // 提取所有放入mod对象中

// 下面这两种方式不正确，不能动态条件导入
var modulePath = './module.js'
import { name } from modulePath
console.log(name)

 if (true) {
   import { name } from './module.js'
 }

// 那怎么动态导入呢
 import('./module.js').then(function (module) {
   console.log(module)
 })

// 提取默认成员和正常成员
import abc, { name, age } from './module.js'
console.log(name, age, abc)

// 直接导出导入成员

// button.js
var Button = 'Button Component'
export default Button

// avatar.js
export var Avatar = 'Avatar Component'

// index.js
export { default as Button } from './button.js'
export { Avatar } from './avatar.js'

// 第三方模块都是导出默认成员
import _ from 'lodash'
import { camelCase } from 'lodash' // 不正确
```

## Polyfill

`ie`浏览器不兼容`ES Modules`

Polyfill 是一块代码（通常是 Web 上的 JavaScript），用来为旧浏览器提供它没有原生支持的较新的功能。

> 例如，querySelectorAll是很多现代浏览器都支持的原生Web API，但是有些古老的浏览器并不支持，那么假设有人写了库，只要用了这个库， 你就可以在古老的浏览器里面使用document.querySelectorAll，使用方法跟现代浏览器原生API无异。那么这个库就可以称为Polyfill或者Polyfiller。
>
> jQuery是不是一个Polyfill?答案是No。因为它并不是实现一些标准的原生API，而是封装了自己API。一个Polyfill是抹平新老浏览器 标准原生API 之间的差距的一种封装，而不是实现自己的API。
>
> 把旧的浏览器想象成为一面有了裂缝的墙.这些[polyfills]会帮助我们把这面墙的裂缝抹平,还我们一个更好的光滑的墙壁(浏览器)

## ES Module与CommonJS交互

在node原生环境中

* ES Modules中可以导入CommonJS模块
* CommonJS中可以导入ES Modules模块
* CommonJS始终只会导出一个默认成员
* 注意import不是解构对象

`es-module.mjs`    文件名要改成.mjs

```js
// ES Module 中可以导入 CommonJS 模块

import mod from './commonjs.js'
console.log(mod)

// 不能直接提取成员，注意 import 不是解构导出对象

import { foo } from './commonjs.js'
console.log(foo)

export const foo = 'es module export value'
```

`commonjs.js`

```js
// CommonJS 模块始终只会导出一个默认成员

module.exports = {
  foo: 'commonjs exports value'
}

exports.foo = 'commonjs exports value'

// 不能在 CommonJS 模块中通过 require 载入 ES Module

const mod = require('./es-module.mjs')
console.log(mod)
```

> 无论是`require`或者`import`，目前仍然需要通过`babel`或者`traceur`之类的转义工具将之转义为`ES5`语法，才能在浏览器里运行。

## import中的@

> 这是webpack的路径别名，相关代码定义在配置文件webpack.base.config里：

```js
	resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'lib': resolve('src/lib'),
      'style': resolve('src/style'),
      'com': resolve('src/components'),
      'serv': resolve('src/service'),
      'api': resolve('src/api'),
      'store': resolve('src/store')
    }
  },
```

