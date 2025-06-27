## html基础

* 常见行内元素：`<span>、<a>、<b>、<strong>、<img>、<input>`
* 常见块元素：`<p>、<h1>~<h6>、<ul>、<div>、<form>`
* 行内元素、块元素、行内块元素的区别；input 和 img 属于哪种？
* [html5常见语义化标签](https://juejin.cn/post/6844903544995184653#heading-6)

## JavaScript基础

* 面向对象与基于对象
  * 面向对象的三个基本特征
  * Js是基于对象但实现了面向对象编程(继承，函数重载)
  * 如何实现继承（[ES5六种](/interview/interview-3.html#讲讲-js-的继承方式)，[ES6的class](/javascript/ES6.html#class)）
  * [原型与原型链](/javascript/prototype.html)
  * [Object与Function原型关系](https://pic2.zhimg.com/80/dcd9f21f6457d284950b767e6f7bdea3_720w.jpg?source=1940ef5c)
  * 如何实现函数重载（arguments）
  * [Object.create](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create), [如何实现](/interview/code-1.html#object-create)
  
* [语言的强类型/弱类型，静态类型/动态类型](/ts/ts-base.html#语言类型)

* 为什么单线程？webworker
  
* [数据类型](/javascript/datatype.html)（必考）
  
  * 5种基本 + 1种复杂 + 2种新增
  * null和undefined区别
    * null是不应该有值，如原型链终点
    * undefined是缺少值，如变量声明未赋值
  * Symbol：定义对象的唯一属性名
  * BigInt解决的问题，从64位浮点数谈起
  * 值类型 / 引用类型，堆 / 栈
  * 如何定义一个常量对象`Object.freeze`
  
* [进行类型判断的方式及优缺点](/javascript/datatype.html#js如何进行类型判断)
  * typeof（type of null， typeof NaN）
  * instanceof（手写实现）
  * Object.prototype.toString.call（为什么用call，内部属性[[Class]]）
  * 判断数组的方法至少说出5种
  
* [类型转换](/javascript/datatype.html#js基本数据类型与类型转换)
  
  * 运算符带来的类型转换，`-，*，、，%`优先转数值，`+` 除外
  * +的规则，[] + {}，{} + []
  * == 和 === 的区别
  * 什么情况 ` a ===  a-1`，`Number.MAX_SAFE_INTEGER`
  * 什么情况 `a == 1 && a == 2 && a == 3` 为true
  
* [作用域](https://juejin.im/post/5abb99e9f265da2392366824)
  
  * 全局作用域
  * 函数作用域
  * 块级作用域
  * 词法作用域
  * 动态作用域
  
* [作用域（链）与执行上下文（栈）的区别](/interview/interview-4.html#说一下你对js执行上下文栈和作用域链的理解)

* [this的指向，箭头函数与普通函数区别](/javascript/this.html#javascript中this的指向)与[new一个对象的过程](/interview/interview-5.html#简述-new-一个对象的过程)

* [call / apply / bind](/interview/interview-10.html#call-apply-bind-的区别-怎么实现)

* [闭包](/javascript/closure.html#闭包的定义)，高阶函数，vue中有什么应用

* [深拷贝与浅拷贝](/javascript/clone.html#浅拷贝与深拷贝)
  
  * JSON.stringify中不安全的JSON值，参数
  * JSON.parse(JSON.stringify)的问题
  * 手写一个深拷贝方法
  
* 函数与变量解析顺序（一般为看代码说结果）
  * 变量提升
  * 函数声明优先级最高
  * let / const 暂时性死区
  
* ES6
  * let / const （块级作用域，不允许重复声明，暂时性死区）
  * 箭头函数
    * 没有构造函数，没有原型(prototype)
    * 省略 return 关键字，隐式返回
    * 继承当前上下文的 this 关键字
    * 没有arguments属性，剩余运算符
    * 由于 箭头函数没有自己的this指针，通过 `call()` *或* `apply()` 方法调用一个箭头函数时，只能传递参数（不能绑定this），他们的第一个参数会被忽略。
    * 用处：箭头函数表达式对非方法函数是最合适的
  * 扩展运算符（构造数组，解析数组，参数赋值）
  * 剩余运算符（接收参数）
  * [Map, WeakMap, Set, WeakSet](https://juejin.cn/post/6854573210794082318)，[如何理解weak](https://juejin.cn/post/6844904160085671949)
    * WeakMap和WeakSet的键只能为对象
    * 弱引用，[GC算法](/chrome/gc.html#gc算法)，[内存泄漏的场景（4种）](https://juejin.cn/post/6844903833387155464)
    * 不可迭代，只支持部分方法
  * 模板字符串 
  * 对象字面量的增强
  * Object.assign / Object.is / Object.keys / Object.values / Object.entries
  
* ES2016~ES2022
  * includes
  * 求幂运算符（**）
  
  * Object.values 与 Object.entries
  * Object.hasOwn()
  * String.prototype.padStart 与 Sting.prototype.padEnd
  * async/await
  
  * 异步迭代 for await...of
  * 顶层 await
  * Promise.prototype.finally
  * Promise.allSettled
  * Promise.any
  
  * flat 与 flatMap
  
  * 空值合并运算符
  * 可选链操作符
  * Dynamic import
  * BigInt
  
  * 数值分隔符
  
  * at() 方法
  * class 私有字段
  
* 数组方法：forEach/find/map/filer/reduce/every/some
  
* Array.from：如何初始化一个二维数组

* [promise](/javascript/asynchronous.html#promise-2)

* 手写`promise.all`和`promise.race`

* `promise.resolve`四种参数

* reject 和 catch 的区别

    * reject 是用来抛出异常，catch 是用来处理异常
    * reject 是 Promise 的方法，而 catch 是 Promise 实例的方法
    * reject后的东西，一定会进入then中的第二个回调，如果then中没有写第二个回调，则进入catch
    * 网络异常（比如断网），会直接进入catch而不会进入then的第二个回调

* Generator

* async / await （Generator + 自动执行器）

    * 更好的语义

    > async 和 await, 比起星号和yield，语义更加清楚，async表示函数里面有异步操作，await表示紧跟在后面的表达式需要等待结果。

    * 更广的适用性

    > co模块约定，yield命令后面只能是Thunk函数或者Promise对象， 而async函数的await后面，可以是Promise和原始类型值(数值、字符串和布尔值，但这时会自动转成立即 resolved 的 Promise 对象,  查看spawn函数中Promise.resolve(next.value))

    * 返回值是Promise

    > 比Generator函数的返回值是Iterator对象方便，可以使用then方法指定下一步操作

* 宏任务/微任务/事件循环

  * 浏览器与node事件循环区别（libuv，c语言）

* 微任务有哪些，[MutationObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver)是什么

  * 面试题看代码说结果

* for in 与 for of

  * [for in（字符串）/ Object.keys / Object.getOwnPropertyNames 区别](https://www.jianshu.com/p/f88c8c90b281)
  * 性能 `for...i > forEach > for...of > map > for...in`
  * for in 为什么效率低，这是因为 for...in 有一些特殊的要求，包括：
    * 遍历所有属性，不仅是 own properties 也包括原型链上的所有属性。
    * 忽略 enumerable 为 false 的属性。
    * 必须按特定顺序遍历，先遍历所有数字键，然后按照创建属性的顺序遍历剩下的。

* for of ，迭代器，Generator

* [事件冒泡 / 事件捕获 / 事件委托](/interview/interview-5.html#什么是事件冒泡-事件捕获-事件委托)

  * DOM 事件流
  * target 和 currentTarget 的区别
    * target获取是触发事件的源对象
    * currentTarget获取的事件绑定的对象

* 函数式编程
  * 高阶函数
  * 纯函数  / 记忆函数
  * 函数柯里化 / 函数组合
  * [尾递归 / 尾调用](/interview/interview-10.html#什么是尾递归和尾调用)
  * 常见数组方法，哪些是高阶函数，哪些会改变数组本身
    * push,pop,splice,unshift,shift,reverse
    * slice,concat,forEach,map,filter,some,every
    * ['1', '2', '3'].map(parseInt)的结果

* [setTimeout误差](/interview/interview-9.html#settimeout倒计时为什么会出现误差)

* babel

  * 为什么使用babel

* babel原理（词法分析生成tokens流，语法分析转换成AST，AST节点遍历进行添加更新移除，生成ES5字符串）

  * babel怎么处理ESM模块化（编译成CommonJS风格）

## CSS基础

  * [盒模型](/css/box.html#盒子模型)
  * [居中一个元素的方法](/interview/interview-3.html#简述居中一个元素的方法)
    * 水平2种，垂直3种，垂直水平5种
    * 单行文本水平垂直居中（text-align + line-height），多行文本水平垂直居中（table-cell）
  * [BFC布局规则，如何创建BFC](/css/bfc.html#什么是bfc-bfc的布局规则是什么-如何创建bfc)
  * [Grid 网格布局](http://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html)，实现一个宽度1：2：3的网格布局
  * 两栏布局（右侧自适应） 
    * [浮动，触发BFC](/css/bfc.html#什么是bfc-bfc的布局规则是什么-如何创建bfc)
    * flex布局，左侧固定宽度，右侧`flex: 1`
    * 左侧浮动，右侧设置左边距
  * 三栏布局（中间自适应）
    * 左右侧浮动，中间设置左右边距，左右高度400，中间高度300，body高度？如何清除浮动？
    * 左右侧绝对定位，中间设置左右边距
    * 中间 `flex: 1`
    * grid 布局，`grid-template-columns: 200px auto 200px;`
    * [圣杯布局与双飞翼布局](https://www.jianshu.com/p/81ef7e7094e8)，`margin-left: -100%;`相对于父元素宽度的百分比
  * [Flex 布局，三个值的含义](/css/flex.html#flex布局)
  * margin写两个值，三个值，四个值
  * [css选择器的优先级规则](/interview/interview-3.html#简述css选择器的优先级规则)
  * [脱离文档流 / 定位 / 浮动的区别](/interview/interview-6.html#什么是脱离文档流-定位与浮动)
  * [清除浮动的方法](/css/box.html#清除浮动)
  * [link 与 @import 的区别](/interview/interview-10.html#link-与-import-的区别)
  * [js执行会阻塞DOM树的解析和渲染，那么css加载会阻塞DOM树的解析和渲染吗？css会阻塞js吗](/interview/interview-1.html#js执行会阻塞dom树的解析和渲染-那么css加载会阻塞dom树的解析和渲染吗-css会阻塞js吗)
  * [DOMContentLoaded](https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event) 和 [window.onload](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/load_event) 区别
  * [画一个三角形 / 扇形](/interview/interview-4.html#css画三角形和扇形)
  * [隐藏一个元素的方法](/interview/interview-4.html#隐藏页面中某个元素的方法)
  * [逻辑像素与物理像素](/mobile/adaptation.html#逻辑像素与物理像素)
  * [DPR](https://juejin.cn/post/6844903839452102670)
  * [em / rem / rpx / vw / vh](/mobile/adaptation.html#常见长度单位)
  * rpx如何计算的，iphone6上`750rpx = 375px（逻辑像素）`iphone5上`750rpx = 320px（逻辑像素）`
  * [移动端 1px 问题](/mobile/adaptation.html#移动端-1px)
  * [display / position / transform有哪些属性](/interview/interview-7.html#display有哪些属性)
  * [如何实现图片懒加载](/interview/interview-7.html#图片懒加载)
    
    * 监听事件在哪个阶段写？（mounted，真实DOM挂载完毕，beforeDestroy销毁）
  * [伪类和伪元素](/interview/interview-7.html#伪类和伪元素)
  * [css硬件加速](https://juejin.cn/post/6844903649974435854)
  * [哪些css属性会触发回流与重绘](https://blog.csdn.net/qq_36337754/article/details/103773474)

## Vue相关

  * [Vue 响应式原理 2.x](/vue/responsive.html#响应式的整体流程)
    * 发布订阅模式（手写）
    * 观察者模式（手写）
    * Vue 实例初始化过程
    * 组件渲染过程（3种Watcher）
    * 响应式过程总结
    * [computed和watcher的原理，有什么区别及应用场景](https://jinjingxuan.github.io/2018/08/03/%E9%9D%A2%E8%AF%95-%E9%9D%A2%E8%AF%95%E9%A2%98%EF%BC%88%E4%B8%80%EF%BC%89/#toc-heading-5)
  * [Vue 响应式原理 3.0](https://jinjingxuan.github.io/2020/12/17/Vue-Vue3.0%EF%BC%88%E4%B8%80%EF%BC%89/) 
    * Composition API
    * 函数式编程
    * 性能提升
      * proxy 对比一下 [Object.defineProperty](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)
      * 编译优化：Fragments，静态提升，Patch flag
      * 源码体积优化
    * [reactive / ref / toRefs 区别](https://jinjingxuan.github.io/2020/12/17/Vue-Vue3.0%EF%BC%88%E4%BA%8C%EF%BC%89/#toc-heading-3)
    * effect / track / trigger 功能
  * [Vue 组件通信的方式（8种）](https://jinjingxuan.github.io/2020/11/12/Vue-Vue%E7%BB%84%E4%BB%B6%E9%80%9A%E4%BF%A1%E7%9A%84%E6%96%B9%E5%BC%8F/)
  * [Vuex](https://vuex.vuejs.org/zh/)
    * State
    * Getters
    * Mutations
    * Actions
    * Modules
  * [Vue 中的 key的作用](https://jinjingxuan.github.io/2020/09/24/VirtualDOM-VirtualDOM%E4%B8%8EDiff%E7%AE%97%E6%B3%95/#toc-heading-7)
    * 什么是虚拟 DOM
    * Diff算法的过程（patch / patchVnode / updateChildren）
  * [nextTick的原理](https://jinjingxuan.github.io/2020/10/16/Vue-Vue%E6%BA%90%E7%A0%81%E5%AD%A6%E4%B9%A0%EF%BC%88%E4%BA%8C%EF%BC%89/#toc-heading-3)
  * [data为什么是函数](https://jinjingxuan.github.io/2018/08/03/%E9%9D%A2%E8%AF%95-%E9%9D%A2%E8%AF%95%E9%A2%98%EF%BC%88%E4%B8%80%EF%BC%89/#toc-heading-12)，可以换成箭头函数吗（this指向问题，应该指向vm实例）
  * [Keep-alive的原理](https://jinjingxuan.github.io/2018/08/03/%E9%9D%A2%E8%AF%95-%E9%9D%A2%E8%AF%95%E9%A2%98%EF%BC%88%E5%8D%81%EF%BC%89/#toc-heading-12)
    * LRU算法（FIFO / OPT）
    * [聊到操作系统顺便说一下进程与线程的区别](https://jinjingxuan.github.io/2020/11/23/%E8%AE%A1%E7%AE%97%E6%9C%BA%E5%9F%BA%E7%A1%80-%E8%AE%A1%E7%AE%97%E6%9C%BA%E5%9F%BA%E7%A1%80/#toc-heading-7)
    * **进程间通信的方式**
  * [你做过哪些 Vue 的性能优化](https://jinjingxuan.github.io/2018/08/03/%E9%9D%A2%E8%AF%95-%E9%9D%A2%E8%AF%95%E9%A2%98%EF%BC%88%E5%8D%81%EF%BC%89/)
  * [MVVM](https://jinjingxuan.github.io/2018/03/09/%E9%9D%A2%E8%AF%95-%E9%9D%A2%E8%AF%95%E9%A2%98%EF%BC%88%E5%8D%81%E4%B8%80%EF%BC%89)
  * [Vue渲染流程](https://jinjingxuan.github.io/2018/03/09/%E9%9D%A2%E8%AF%95-%E9%9D%A2%E8%AF%95%E9%A2%98%EF%BC%88%E5%8D%81%E4%B8%80%EF%BC%89)
  * [Vue生命周期](https://jinjingxuan.github.io/2018/08/03/%E9%9D%A2%E8%AF%95-%E9%9D%A2%E8%AF%95%E9%A2%98%EF%BC%88%E5%8D%81%E4%B8%80%EF%BC%89/)
  * Mounted和created你怎么区分和使用（字节）
  * 父子组件的生命周期触发顺序
  * [如何理解插槽slot](https://www.zhihu.com/question/37548226/answer/609289491)
  * [Vue css scoped](https://vue-loader-v14.vuejs.org/zh-cn/features/scoped-css.html)

## 浏览器相关
  * 输入 URL 到页面展现的过程
  
    * 刚输入时，浏览器会从历史记录、书签或缓存中查找地址，找到了，会从缓存中调出页面显示出来
    
    * 域名解析ip地址（浏览器缓存 => 操作系统缓存  => 本地dns服务器 => 根域名服务器 => 顶级域名服务器 => [二级域名服务器](https://user-gold-cdn.xitu.io/2020/3/7/170b3f53094672ee?imageView2/0/w/1280/h/960/format/webp/ignore-error/1）))，[迭代查询与递归查询的区别](https://www.cnblogs.com/qingdaofu/p/7399670.html)（如果引入了CDN，则本地DNS系统会将域名的解析权交给CNAME指向的CDN专用DNS服务器，CDN的DNS服务器将CDN的全局负载均衡设备IP地址返回给用户。CDN全局负载均衡设备会选择一台用户所属区域的区域负载均衡设备，并将请求转发到此设备上。）
    
    * [TCP三次握手](https://jinjingxuan.github.io/2020/11/23/%E8%AE%A1%E7%AE%97%E6%9C%BA%E5%9F%BA%E7%A1%80-%E8%AE%A1%E7%AE%97%E6%9C%BA%E5%9F%BA%E7%A1%80/#toc-heading-3)
    
    * TCP安全连接上发送 HTTP 请求
    
      * [常见请求头字段](https://jinjingxuan.github.io/2020/11/23/%E8%AE%A1%E7%AE%97%E6%9C%BA%E5%9F%BA%E7%A1%80-%E8%AE%A1%E7%AE%97%E6%9C%BA%E5%9F%BA%E7%A1%80/)：connection，cookie，host，referer，origin，content-type
    
    * 服务器处理请求并返回 HTTP 响应
      
    * |      | 类别                             | 原因短语                   |
      | ---- | -------------------------------- | -------------------------- |
      | 1XX  | Informational（信息性状态码）    | 接收的请求正在处理         |
      | 2XX  | Success（成功状态码）            | 请求正常处理完毕           |
      | 3XX  | Redirection（重定向状态码）      | 需要进行附加操作以完成请求 |
      | 4XX  | Client Error（客户端错误状态码） | 服务器无法处理请求         |
      | 5XX  | Server Error（服务器错误状态码） | 服务器处理请求出错         |
    
      1xx：信息性状态码，表示服务器已接收了客户端请求，客户端可继续发送请求。
    
      ```js
      100 Continue
      103 Early Hints 用于在最终响应之前发送一个初步的 HTTP 响应，提升页面渲染性能。
      ```
    
      [HTTP 新增的 103 状态码，这次终于派上用场了！](https://juejin.cn/post/7113864980344078343)
    
      2xx：成功状态码，表示服务器已成功接收到请求并进行处理。
    
      ```js
      200 OK 表示客户端请求成功
      204 No Content 请求处理成功，但没有资源可返回，浏览器页面不会发生更新，一般在只需要从客户端往服务器发送信息，而对客户端不需要发送新信息内容的情况下使用。
      206 Partial Content 表示客户端进行了范围请求，而服务器执行了这部分的 GET 请求。响应报文中包含由 Content-Range 指定范围的实体内容。
      ```
    
      3xx：重定向状态码，表示服务器要求客户端重定向。
    
      [301和302对SEO的影响](https://www.feiniaomy.com/post/531.html)
    
      ```js
      301 Moved Permanently 永久性重定向，响应报文的Location首部应该有该资源的新URL
      302 Found 临时性重定向，响应报文的Location首部给出的URL用来临时定位资源
      303 See Other 请求的资源存在着另一个URI，客户端应使用 GET 方法定向获取请求的资源
      304 Not Modified 服务器内容没有更新，可以直接读取浏览器缓存
      
      301和302有什么区别？
      
      详细来说，301和302状态码都表示重定向，就是说浏览器在拿到服务器返回的这个状态码后会自动跳转到一个新的URL地址，这个地址可以从响应的Location首部中获取（用户看到的效果就是他输入的地址A瞬间变成了另一个地址B）——这是它们的共同点。他们的不同在于。301表示旧地址A的资源已经被永久地移除了（这个资源不可访问了），搜索引擎在抓取新内容的同时也将旧的网址交换为重定向之后的网址；302表示旧地址A的资源还在（仍然可以访问），这个重定向只是临时地从旧地址A跳转到地址B，搜索引擎会抓取新的内容而保存旧的网址。
      
      307 Temporary Redirect（临时重定向），尽管 302 标准禁止 POST 变换成 GET，但实际使用时大家并不遵守。307 会遵照浏览器标准，不会从 POST 变成 GET。
      308 Permanent Redirect （永久重定向）
      
      307和308的出现也是给上面的行为做个规范，不过是不允许重定向时改变请求方法
      
      302 在最初的定义中，内容和现在的 307 是一样的，不允许重定向方法的改写。但是早期浏览器在实现的时候有的实现成 303（GET） 的效果，有的实现成 307（POST） 的效果。简单说下就是 http 1.0里面302具有二义性，在http 1.1中加入303和307就是为了消除二义性。
      ```
    
      4xx：客户端错误状态码，表示客户端的请求有非法内容。
    
      ```js
      400 Bad Request 表示客户端请求有语法错误，不能被服务器所理解
      401 Unauthonzed 表示请求未经授权，该状态代码必须与 WWW-Authenticate 报头域一起使用
      403 Forbidden 表示服务器收到请求，但是拒绝提供服务，通常会在响应正文中给出不提供服务的原因
      404 Not Found 请求的资源不存在，例如，输入了错误的URL
      ```
    
      5xx：服务器错误状态码，表示服务器未能正常处理客户端的请求而出现意外错误。
    
      ```js
      500 Internel Server Error 表示服务器发生不可预期的错误，导致无法完成客户端的请求
      503 Service Unavailable 表明服务器暂时处于超负载或正在进行停机维护，现在无法处理请求。
      ```
    
  * [常见响应头字段](https://jinjingxuan.github.io/2020/11/23/%E8%AE%A1%E7%AE%97%E6%9C%BA%E5%9F%BA%E7%A1%80-%E8%AE%A1%E7%AE%97%E6%9C%BA%E5%9F%BA%E7%A1%80/)：Set-cookie，Cache-Control，E-Tag，Last-Modified，Access-Control-Allow-Origin
    
    * [TCP 四次挥手](https://jinjingxuan.github.io/2020/11/23/%E8%AE%A1%E7%AE%97%E6%9C%BA%E5%9F%BA%E7%A1%80-%E8%AE%A1%E7%AE%97%E6%9C%BA%E5%9F%BA%E7%A1%80/#toc-heading-3)，为什么要等 2MSL
  
* [浏览器解析渲染](https://jinjingxuan.github.io/2021/01/28/%E6%B5%8F%E8%A7%88%E5%99%A8-%E6%B5%8F%E8%A7%88%E5%99%A8%E6%B8%B2%E6%9F%93%E7%9B%B8%E5%85%B3/)
  
  * [GC算法](https://jinjingxuan.github.io/2020/08/26/%E6%B5%8F%E8%A7%88%E5%99%A8-GC%E7%AE%97%E6%B3%95%EF%BC%8CV8%E5%BC%95%E6%93%8E/) 
    
    * 标记清除 / 引用计数 / 标记整理
    * 内存泄漏 / 内存溢出
    * 新生代 / 老生代
  
  * [介绍下浏览器多进程架构，网站隔离技术](https://zhuanlan.zhihu.com/p/102149546)
  
  * [渲染过程](https://jinjingxuan.github.io/2021/01/28/%E6%B5%8F%E8%A7%88%E5%99%A8-%E6%B5%8F%E8%A7%88%E5%99%A8%E6%B8%B2%E6%9F%93%E7%9B%B8%E5%85%B3/)
    * 三个线程（Compositor Thread  / Main Thread / Compositor Tile Worker(s)）
    * js 会阻塞 DOM 解析
    * css 不会阻塞 DOM 解析会阻塞渲染
    * script标签中的async  / defer
    * DOMContentloaded和onload的区别（1是在DOM树解析完毕，2是页面完全加载完）
    
  * [浏览器缓存](https://jinjingxuan.github.io/2018/08/04/%E9%9D%A2%E8%AF%95-%E9%9D%A2%E8%AF%95%E9%A2%98%EF%BC%88%E4%B8%89%EF%BC%89/#toc-heading-7)
    * 前端缓存（HTTP缓存 / 浏览器缓存）
    * 缓存存储在哪里？
    * 强缓存 / 协商缓存，优先级？
    * expires（http1.0 已过时，缺点要求时间严格同步）
    * **Cache-Control** （http1.1 / max-age / no-cache / no-store / public / private / s-maxage）
    * Max-age = 0 会怎样
    * ETag / Last-Modified，E-Tag对服务端有什么影响（性能，计算hash，如何计算 last-modify + content-length）
    * hash、chunkhash、contenthash
    * [localStorage / sessionStorage / cookie](https://jinjingxuan.github.io/2018/08/04/%E9%9D%A2%E8%AF%95-%E9%9D%A2%E8%AF%95%E9%A2%98%EF%BC%88%E4%B8%89%EF%BC%89/#toc-heading-11) 
  * [除了css,js资源，那html文件会缓存吗](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Cache-Control)
    
  * [标签页如何通信](https://jinjingxuan.github.io/2018/08/04/%E9%9D%A2%E8%AF%95-%E9%9D%A2%E8%AF%95%E9%A2%98%EF%BC%88%E4%B8%89%EF%BC%89/#toc-heading-11)
  * Cookie + serInterval
    * localStorage
  * webworker
    
  * Websocket
  
  * [预检请求](https://github.com/amandakelake/blog/issues/62)
  
  * [浏览器最大并发请求资源数](https://segmentfault.com/a/1190000016369295)
## 网络与协议相关
  * [什么是ajax（手写）](https://jinjingxuan.github.io/2018/08/03/%E9%9D%A2%E8%AF%95-%E9%9D%A2%E8%AF%95%E9%A2%98%EF%BC%88%E4%B8%83%EF%BC%89/)

  * [跨域的原因以及解决方式](https://jinjingxuan.github.io/2018/08/03/%E9%9D%A2%E8%AF%95-%E9%9D%A2%E8%AF%95%E9%A2%98%EF%BC%88%E4%BA%8C%EF%BC%89/#toc-heading-4)
    * jsonp
      * JSONP请求首先是为了解决跨域问题而存在的一种民间解决方案
      * 通过标签的形式发请求
      * 需要和后端同学进行约束
      *  只能使用get请求
    * CORS
    * iframe的几种方式
    * postMessage（window.postMessage(message,targetOrigin) 方法是html5新引进的特性，可以使用它来向其它的window对象发送消息，无论这个window对象是属于同源或不同源）
    * Iframe + document.domain（**用于二级域名相同的情况下，比如 `a.test.com` 和 `b.test.com`** ）
    * iframe + window.name
    * Iframe + location.hash
    * nginx反向代理
    * websocket
    * web-dev-server中的proxy
    
    ```js
    浏览器的同源策略的目的就是为了防止 XSS，CSRF 等恶意攻击。
    
    跨域限制的资源:
    1.数据存储限制：Cookie, LocalStorage, IndexDB 无法读取
    2.脚本 API 限制：DOM 无法操作
    3.网络请求限制：XHR 请求无法接收响应
    
    发生跨域时，允许进行的操作:
    1.通常允许跨域写操作（link、redirect、表单提交）
    2.通常允许跨域资源嵌入（script、img、video...）
    3.通常禁止跨域读操作(ajax)
    4.可以正常发送请求，可以携带Cookie(withCredentials)，但是浏览器会限制来自于不同域的资源的接收
    ```
    
  * [http 和 https](https://jinjingxuan.github.io/2020/11/23/%E8%AE%A1%E7%AE%97%E6%9C%BA%E5%9F%BA%E7%A1%80-%E8%AE%A1%E7%AE%97%E6%9C%BA%E5%9F%BA%E7%A1%80/#toc-heading-6)

    * [http 0.9 / 1.0 / 1.1 / 2.0](https://juejin.cn/post/6844903923136856078)

      * http0.9
        * 只支持 get
        * 没有请求头概念，响应后只能返回 html
      * http1.0
        * 请求方式新增了post，head等方式
        * 增添了请求头和响应头的概念
        * 扩充了传输内容格式，图片、音视频资源、二进制等都可以进行传输
        * 问题：每请求一次都要建立一次连接
      * http1.1
        * 长连接：新增Connection字段，可以设置keep-alive值保持连接不断开
        * 管道化：基于上面长连接的基础，管道化可以不等第一个请求响应继续发送后面的请求，但响应的顺序还是按照请求的顺序返回，比较鸡肋，仍然会阻塞。
      * 缓存处理：新增字段cache-control，新增状态码303，307
        * 问题：基于文件串行传输，队头阻塞（后一请求需要等前一请求返回），最大并发数限制
    * [http2.0](https://juejin.cn/post/6844903935648497678)
        * 二进制分帧
      * 首部压缩
      * **多路复用**
    * TCP队头阻塞

      * http2通过分帧避免了请求时的队首阻塞问题，但TCP层面的阻塞是HTTP2无法解决的。因为TCP是可靠的传输，一旦丢包就要重新发包，阻塞后续，虽然有滑动窗口，但也没有彻底解决
    * 怎么减少 http 请求
        * 雪碧图
        * 合并 js 和 css（构建工具完成）
        * 利用浏览器缓存

  * 长连接与多路复用
  
  * SSL/TLS，对称加密 / 非对称加密
  
  * https主要流程，证书的作用
  
  * **[中间人攻击](https://www.cnblogs.com/lulianqi/p/10558719.html#%E5%9F%BA%E6%9C%AC%E4%BB%8B%E7%BB%8D)**
  
    ```js
    1)客户端发送请求到服务端，请求被中间人截获。
    
    2)服务器向客户端发送公钥。
    
    3)中间人截获公钥，保留在自己手上。然后自己生成一个【伪造的】公钥，发给客户端。
    
    4)客户端收到伪造的公钥后，生成密文发给服务器。
    
    5)中间人获得密文，用自己的私钥解密。同时用真正的公钥发给服务器。
    
    6)服务器获得加密信息，用自己的私钥解密。
    ```
  
  * http请求方法
  
  * Content-type有哪些
  
  * 简单请求和复杂请求
  
    * 只要同时满足以下两大条件，就属于简单请求
    
        条件1：使用下列方法之一：GET，[HEAD](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/HEAD)，POST
    
        条件2：Content-Type 的值仅限于下列三者之一：
    
      * text/plain
        * multipart/form-data
        * application/x-www-form-urlencoded
  
  * [TCP 三次握手 / 四次挥手](https://jinjingxuan.github.io/2020/11/23/%E8%AE%A1%E7%AE%97%E6%9C%BA%E5%9F%BA%E7%A1%80-%E8%AE%A1%E7%AE%97%E6%9C%BA%E5%9F%BA%E7%A1%80/#toc-heading-6)
    
    * SYN (synchronous建立联机)
    * ACK (acknowledgement 确认)
    * FIN (finish结束)
    
  * Sequence number (顺序号码)
  
* [TCP 与 UDP 的区别于应用场景](https://jinjingxuan.github.io/2020/11/23/%E8%AE%A1%E7%AE%97%E6%9C%BA%E5%9F%BA%E7%A1%80-%E8%AE%A1%E7%AE%97%E6%9C%BA%E5%9F%BA%E7%A1%80/#toc-heading-6)
  
  * [osi七层模型与 tcp/ip 五层模型](https://jinjingxuan.github.io/2020/11/23/%E8%AE%A1%E7%AE%97%E6%9C%BA%E5%9F%BA%E7%A1%80-%E8%AE%A1%E7%AE%97%E6%9C%BA%E5%9F%BA%E7%A1%80/#toc-heading-6)
  
  * cookie，session，token，JWT
    * [cookie带来的安全性问题及如何防御](https://jinjingxuan.github.io/2020/12/18/%E5%89%8D%E7%AB%AF%E5%AE%89%E5%85%A8-%E5%89%8D%E7%AB%AF%E5%AE%89%E5%85%A8%E7%AE%80%E4%BB%8B/#toc-heading-8)
    
    * cookie的属性
      * expire属性（指定浏览器可发送 Cookie 的有效期）
      * domain属性（指定 cookie 可以送达的主机名，在set-cookie中设置）
      * **secure 属性**（属性用于限制 Web 页面仅在 HTTPS 安全连接时，才可以发送 Cookie）
      * **HttpOnly 属性**（ Cookie 的扩展功能，它使 JavaScript 脚本无法获得 Cookie）
      
    * cookie如何被携带
      * 同域请求下，ajax会自动带上同源的cookie；
      * 跨域请求下，ajax不会自动携带同源的cookie，需要通过前端配置相应参数才可以跨域携带同源cookie， withCredentials: true
      * ajax请求任何时候都不会带上不同源的cookie
      
    * Session流程：
      * 用户第一次请求服务器的时候，服务器根据用户提交的相关信息，创建对应的 Session，保存相关数据，比如用户角色、登录时间等等。
      * 请求返回时将此 Session 的唯一标识信息 SessionID 返回给浏览器
      * 浏览器接收到服务器返回的 SessionID 信息后，会将此信息存入到 Cookie 中，同时 Cookie 记录此 SessionID 属于哪个域名
      * 当用户第二次访问服务器的时候，请求会自动判断此域名下是否存在 Cookie 信息，如果存在自动将 Cookie 信息也发送给服务端，服务端会从 Cookie 中获取 SessionID，再根据 SessionID 查找对应的 Session 信息，如果没有找到说明用户没有登录或者登录失效，如果找到 Session 证明用户已经登录可执行后面操作。
      
    * 根据以上流程可知，**SessionID 是连接 Cookie 和 Session 的一道桥梁**，大部分系统也是根据此原理来验证用户登录状态。
      
      * sessionID是怎么生成的？(Tomcat的sessionid的生成主要是随机数，依赖的类是`java.security.SecureRandom`)
      
    * [Token](https://www.cnblogs.com/panshao51km-cn/p/11728901.html): 令牌**，**访问资源接口（API）时所需要的资源凭证。token是服务端生成的一串字符串,以作客户端进行请求的令牌,当第一次登陆后,服务器生成一个token便将此token返回给客户端,以后客户端只要带上这个token前来请求数据即可,无需再次带上用户名和密码。**Token **使服务端无状态化，不会存储会话信息。相比于Session的优点是，即使有了多台服务器，服务器也只是做了token的解密和用户数据的查询，它不需要在服务端去保留用户的认证信息或者会话信息，这就意味着基于token认证机制的应用不需要去考虑用户在哪一台服务器登录了，这就为应用的扩展提供了便利，解决了session扩展性的弊端。最常见的生成方式是JWT：[JSON Web Token 入门教程](https://www.ruanyifeng.com/blog/2018/07/json_web_token-tutorial.html)。
    
      放在哪？可以把它放在 Cookie 里面自动发送，但是这样不能跨域，所以更好的做法是放在 HTTP 请求的头信息`Authorization`字段里面。
    
      > ```javascript
      > Authorization: Bearer <token>
      > ```
    
      另一种做法是，跨域的时候，JWT 就放在 POST 请求的数据体里面。
  
* CDN是什么（内容分发网络）
  
    * 将源站内容分发至最接近用户的节点，使用户就近取得所需内容。解决了因分布，带宽，服务器性能带来的访问延迟问题。CDN负载均衡系统负责告诉用户缓存服务器的ip地址
  
* [前端模块化](https://jinjingxuan.github.io/2020/09/05/%E6%A8%A1%E5%9D%97%E5%8C%96-%E6%A8%A1%E5%9D%97%E5%8C%96/)
  
  * 文件划分 / 命名空间 / IIFE / CommonJS / AMD / CMD
  * ESModules
  * [ESM与CommonJS的区别](https://juejin.cn/post/6844904067651600391)
    * CommonJS模块输出拷贝，ES6 模块输出引用
    * CommonJS 模块是运行时加载，ES6 模块是编译时加载，之所以webpack的tree-shaking只能作用于ES6模块，就是因为ES6模块在编译时就能确定依赖。
    * CommonJS是require()同步加载模块，ES6模块是import命令是异步加载，有一个独立的模块依赖的解析阶段
    * CommonJS第一次加载模块就会执行整个模块生成一个对象, 再次用到时到缓存中读取，**ES6 模块不会缓存运行结果，而是动态地去被加载的模块取值**
    * [循环引用的处理](https://blog.csdn.net/weixin_33851604/article/details/91451467?utm_medium=distribute.pc_relevant_download.none-task-blog-baidujs-1.nonecase&depth_1-utm_source=distribute.pc_relevant_download.none-task-blog-baidujs-1.nonecase)
## [前端安全](https://jinjingxuan.github.io/2021/01/01/%E5%89%8D%E7%AB%AF%E5%AE%89%E5%85%A8-%E5%89%8D%E7%AB%AF%E5%AE%89%E5%85%A8%E7%AE%80%E4%BB%8B/)

  * XSS（反射型 / 存储型 / DOM型）
    * httpOnly
    * 纯前端渲染
    * HTML转义
    * CSP
    * X-Xss-Protection
    
  * CSRF（第三方网站如何拿到cookie，**script、image、iframe的src都不受同源策略的影响。所以我们可以借助这一特点，实现跨域**）
    * origin（一般只存在于CORS跨域请求中，为什么要跨域， 同源策略怎么防止csrf攻击）
    
      ```js
      在以下情况不存在此请求头：
      
      302 重定向： 
      1. 在 302 重定向之后 Origin 不包含在重定向的请求中，因为 Origin 可能会被认为是其他来源的敏感信息。
      2.对于 302 重定向的情况来说都是定向到新的服务器上的 URL，因此浏览器不想将 Origin 泄漏到新的服务器上。
      
      Origin 和 Referer 存在相同的问题，同样有可能丢失该字段。
      ```
    
    * referer（**协议+域名+查询参数**）
    
      ```js
      针对通过 Referer 字段去判断请求来源是否合法是不太靠谱的，这个字段很有可能会丢失：
      
      1.IE6、7下使用 window.location.href=url 进行界面的跳转或者 window.open，都会造成 Referer 丢失。
      
      2.HTTPS 页面跳转到 HTTP 页面，所有浏览器 Referer 都丢失。
      
      3.点击 Flash 上到达另外一个网站的时候，Referer 的情况就比较杂乱，不太可信。
      
      可以附加使用于判断请求来源，但是仅通过该字段进行判断是不太靠谱的，如果请求头丢失该字段，则服务端无法判断当前请求来源，无法校验请求是否合法。
      ```
    
    * Samesite Cookie
    
    * CSRF Token
    
      * 在请求头中将获取到的 token 设置到 cookie 中。
      * 将 token 放到请求参数中。
    
    * 验证码
    
  * 点击劫持
  
  * 中间人攻击
  
  * HTTP传输安全
  
  * 第三方依赖安全
  
  * 控制台注入代码
  
  * 钓鱼
  
* [前端路由](https://jinjingxuan.github.io/2020/09/11/%E5%89%8D%E7%AB%AF%E8%B7%AF%E7%94%B1-history%E6%A8%A1%E5%BC%8F%E5%92%8Chash%E6%A8%A1%E5%BC%8F/)
  
  * hash模式
    * window.location.hash
    * onhashchange
  * history模式
    * pushState / replaceState / popState
## [设计模式：简单介绍一下](https://jinjingxuan.github.io/2021/01/08/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F-JavaScript%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F/)

  * 工厂模式
  * 抽象工厂模式
  * 单例模式
  * 建造者模式
  * 适配器模式
  * 装饰器模式
  * 过滤器模式

## webpack

  * [webpack，grunt，gulp的区别](https://juejin.cn/post/6844903877771264013)
  * [webpack，rollup，parcel分别适用于什么场景](https://jinjingxuan.github.io/2018/08/03/%E9%9D%A2%E8%AF%95-%E9%9D%A2%E8%AF%95%E9%A2%98%EF%BC%88%E4%B8%80%EF%BC%89/#toc-heading-3)
  * [webpack插件主要是做什么的，常用的有哪些](https://jinjingxuan.github.io/2020/09/06/webpack-webpack%EF%BC%88%E4%BA%8C%EF%BC%89/)
  * 自己写过webpack插件吗（compiler / compilation）
  * [Webpack loader主要是做什么的，常用的有哪些](https://jinjingxuan.github.io/2020/09/06/webpack-webPack%EF%BC%88%E4%B8%80%EF%BC%89/#toc-heading-8)
  * loader 和 plugin 的区别及用处
  * [webpack 热更新原理](https://juejin.cn/post/6844904020528594957)
  * [Sourcemap（cheap-module-eval-source-map）](https://jinjingxuan.github.io/2020/09/06/webpack-webpack%EF%BC%88%E4%BA%8C%EF%BC%89/)
  * Webpack-dev-server
  * [webpack打包流程和生命周期](https://blog.csdn.net/weixin_41973185/article/details/113803463)

## git

  * [Git reset 和 git revert 的区别](https://blog.csdn.net/yxlshk/article/details/79944535)
  * [Git rebase的两种用途](https://www.codercto.com/a/45325.html)

## 动画相关

* css动画

  * transition: 过渡，是一次性的，只能定义起始和结束状态。

    ```css
    #box {
      height: 100px;
      width: 100px;
      background: green;
      transition: transform 1s ease-in 1s;
    }
    #box:hover {
      transform: rotate(180deg) scale(.5, .5);
    }
    ```

  * animation：动画，往复性的，keyframes提供更多的控制，尤其是时间百分比的控制

    ```css
    .box {
      height: 100px;
      width: 100px;
      border: 15px solid black;
      animation: changebox 1s ease-in-out 1s infinite alternate running forwards;
    }
    
    @keyframes changebox {
      10% {
        background: red;
      }
      50% {
        width: 80px;
      }
      70% {
        border: 15px solid yellow;
      }
      100% {
        width: 180px;
        height: 180px;
      }
    }
    ```

* js动画

  * 定时器：会出现卡顿抖动，定时器实际执行实际较晚，不用设备屏幕刷新频率不同

    ```js
    var offsetX = 500  //要水平移动的距离
    var moveOffset = 0  //当前已经移动的距离
    var step = 5   //每次移动的距离
    
    function move(){
      if(moveOffset < offsetX){
        ball.style.left = parseInt(getComputedStyle(ball).left) + step + 'px'
        moveOffset += step
        setTimeout(move, 5)
      }
    }
    move()
    ```
  
  * requestAnimationframe：**由系统来决定回调函数的执行时机**。保证回调函数在屏幕每一次的刷新间隔中只被执行一次，这样就不会引起丢帧现象，也不会导致动画出现卡顿的问题。
  
    ```js
    var offsetX = 500  //要水平移动的距离
    var moveOffset = 0  //当前已经移动的距离
    var step = 5   //每次移动的距离
    
    function move(){
      if(moveOffset < offsetX){
        ball.style.left = parseInt(getComputedStyle(ball).left) + step + 'px'
        moveOffset += step
        requestAnimationFrame(move)
      }
    }
    move()
    ```
  
* 怎么实现回到顶部动画？

  ```js
  function toTOp() {
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    let timer = setInterval(() => {
      scrollTop -= 100;
      window.scrollTo(0, scrollTop)
      if (scrollTop <= 0) {
        clearInterval(timer)
      }
    }, 10)
  }
  
  function toTOp() {
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    if (scrollTop > 0) {
      requestAnimationFrame(function() {
        scrollTop -= 100;
      	window.scrollTo(0, scrollTop)
      })
    }
  }
  ```

## [常用手写代码](https://jinjingxuan.github.io/2020/03/20/%E9%9D%A2%E8%AF%95-%E6%89%8B%E5%86%99%E4%BB%A3%E7%A0%81%EF%BC%88%E4%B8%80%EF%BC%89/)

  * 防抖 / 节流
  * 柯里化
  * apply,bind,call
  * promise.all
  * promise.race
  * 发布订阅模式
  * 数组扁平化带参数
  * 数组去重 4 种
  * instanceof
  * new
  * 深拷贝
  * ajax请求
  * 快排 / 冒泡 / 堆排序
  * 手写 map / reduce
  * **并发请求控制**
  * 实现一个sleep函数

## 计算机基础

  * 32位和64位的区别？

    > 寻址空间分别为`2^32 = 4G`和`2^64`，寻址空间一般指的是CPU对于内存寻址的能力。通俗地讲，就是最多能用到多少内存的一个问题。

  * cpu如何访问内存？

    > 首先 CPU 在访问内存的时候都需要通过 MMU（内存管理单元） 把虚拟地址转化为物理地址，然后通过总线访问内存。MMU 开启后 CPU 看到的所有地址都是虚拟地址，CPU 把这个虚拟地址发给 MMU 后，MMU 会通过页表在页表里查出这个虚拟地址对应的物理地址是什么，从而去访问外面的 DDR（内存条）。
    
* 什么是平衡二叉树和红黑树

  * 平衡二叉树左右两个子树的高度差的绝对值不超过1，并且左右两个子树都是一棵平衡二叉树。
  * 红黑树是一个自平衡(不是绝对的平衡)的二叉查找树
  * 红黑树相比于AVL树，牺牲了部分平衡性，以换取删除/插入操作时少量的旋转次数，整体来说，性能优于AVL树。

## 项目

  * 小程序

    * [长列表优化](https://jinjingxuan.github.io/2020/09/20/%E7%A7%BB%E5%8A%A8%E7%AB%AF-%E5%B0%8F%E7%A8%8B%E5%BA%8F%E9%95%BF%E5%88%97%E8%A1%A8%E4%BC%98%E5%8C%96/)：为什么要做优化？1.小程序双线程 2. 框架缺陷

    * [小程序双线程原理](https://qunarcorp.github.io/anu/documents/two-threaded.html)

    * ```js
      小程序的双线程设计，主要为了管控安全，避免操作 DOM。逻辑线程是一个只能够运行JavaScript的沙箱环境，不提供DOM操作相关的API，所以不能直接操作UI，只能够通过setData更新数据的方式异步更新UI。
      ```

    * setData工作原理

      ```js
      小程序的视图层目前使用 WebView 作为渲染载体，而逻辑层是由独立的 JavascriptCore 作为运行环境。在架构上，WebView 和 JavascriptCore 都是独立的模块，并不具备数据直接共享的通道。当前，视图层和逻辑层的数据传输，实际上通过两边提供的 evaluateJavascript 所实现。即用户传输的数据，需要将其转换为字符串形式传递，同时把转换后的数据内容拼接成一份 JS 脚本，再通过执行 JS 脚本的形式传递到两边独立环境。
      
      而 evaluateJavascript 的执行会受很多方面的影响，数据到达视图层并不是实时的。所以我们的setData函数将数据从逻辑层发送到视图层，是异步的。
      ```

      ```js
      var initData = {
          info: {
              name: 'hh'
          }
      };
      
      Page({
          data: initData,
          onClick() {
              this.setData({
                  'info.name': 'xx'
              }, () => {
                  console.log(initData.info.name) // hh
              })
          }
      })
      // 1. page初始化的时候data是深拷贝生成的，所以不会改变原来initData的值
      // 2. 如果改变了initData的值，页面的初始值就会被改变了，navigateTo/redicetTo页面数据不一样
      ```

    * [项目优化](https://focus.feishu.cn/docs/doccnfxyOx11ge5YyK7khXrkZQb)

    * mpvue原理

      * mpvue 保留了 vue.runtime 核心方法，无缝继承了 Vue.js 的基础能力
      * mpvue-template-compiler 提供了将 vue 的模板语法转换到小程序的 wxml 语法的能力
      * 修改了 vue 的建构配置，使之构建出符合小程序项目结构的代码格式： json/wxml/wxss/js 文件

    * [小程序框架对比](https://ask.dcloud.net.cn/article/35867)：基于微信自定义组件实现组件开发的框架（uni-app/taro/chameleon），组件数据通讯性能接近于微信原生框架，远高于基于template实现组件开发的框架（wepy/mpvue）性能
    * 小程序为双线程模型，逻辑层和视图层，通过 Native 层通信。不像在 web 上 js 和 ui 会互斥，小程序中会限制 js 操作 dom，所以不用担心不同步问题。
    * 逻辑层和视图层通过 setData 进行通信，会把数据转换成字符串并拼接一段 js 脚本（evaluateJavascript）传到视图层，这个过程是异步的。
    * 如果每次 setData 的数据量过大，会非常损耗性能，最好是增量更新。uni-app、taro 都在调用setData之前自动做diff计算，每次仅传递变动的数据。
    * 而且基于微信自定义组件实现组件开发的框架（uni-app/taro），组件数据通讯性能接近于微信原生框架，远高于基于template实现组件开发的框架（wepy/mpvue）性能。
    * 跨端能力，uni-app 比较优秀，同时支持H5、多家小程序、跨平台App，但是一套代码横跨 iOS Android Web 和小程序比较复杂，可能会存在大量兼容性问题。
  
* [el-select的使用](https://element.eleme.io/#/zh-CN/component/select)，[vue自定义指令](https://cn.vuejs.org/v2/guide/custom-directive.html)
  
* [Mixin](https://cn.vuejs.org/v2/guide/mixins.html)
  
* 其它
  
  * 自我介绍
  * 为什么选择前端，如何学习，为什么选择这种学习方式？
  * 对前端发展的看法？
    * 早些时候，由于时代的问题，当时的web前端仅仅是展示一些简单的文本、图片，页面较为简单
    * **前后端分离**，MVVM框架(Vue, React, Angular等)的出现，使得前端更加应用化，性能更高。
    * V8引擎和node的出现，促使前端能用自己熟悉的语法编写后台系统。
    * 前端工程化的提出，提高了前端的开发效率，增强了可维护性
    * 数据可视化百家争鸣，基于svg，canvas，webGL开发的可视化，3D动画已被广泛的应用到网站中。
    * **大前端时代**：随着智能手机的普及，如今Android端、iOS端等各种移动端的应用也越来越普及，单一面向于PC端的web应用，也向着移动端发展。类似各种手机app，小程序的诞生，使得人们的生活越来越便利，让人不禁遐想，将来的前端是否能应用到全端，即一套代码能通用多种平台。
  * 最近在学什么？
  * 项目中你印象最深的地方，有什么难点，怎么解决的？
  * 技能和性格有什么缺陷？
  * 平时看什么书？
  * 优点？缺点？
  * 说说对我们公司的了解？
  * 职业规划？
  * 反问
    * 对我的评价？建议？
    * 部门的业务情况？
    * 团队架构？

* santd
  * upload：底层实现还是基于input输入框（type=file），然后利用onchange事件，监听文件选择的事件，然后利用formData对象装载需要上传的文件，最后通过XMLHttpRequest来进行文件的网络异步传输。通过`xhr.upload` 的`onprogress` 事件的监听，可以正确的获取到上传文件的total值和loaded的值，从而实时的计算出当前上传的进度。
  * tab：key、active_key
  * table：通过 slot 让用户可以自定义 column title 并支持获取 column 信息
* eslint-plugin-san
  * eslint-plugin-san 是 eslint 的一个插件，类似于 eslint-plugin-vue，内部配置了一系列针对性的规则
  * eslint执行原理：使用解析器 espree 将代码解析成 AST，进行词法分析以及语法分析；通过 DFS 来遍历 AST；在遍历的过程中 eslint 通过选择器来匹配 AST 上的节点，通过代码路径分析来控制代码检测的范围。每个 rule 都定义了 create 方法，会返回一个 vistor（即访问到某些节点时做出的操作），eslint 会收集配置文件中所有规则的 vistor，遍历 AST 并调用 vistor，得到检测结果。规则内还可以定义 fix 方法，在报错的时候可以进行修正。
  * no-empty-attributes: 默认检测 class 和 style 属性不能为空，可以通过 options 配置其他不允许为空的属性。
  * data-name-casing：dataTypes, initData, computed 中的数据在多个单词的情况下使用 "下划线"、"短横线"、"帕斯卡"命名规则会报错，提示统一使用驼峰式命名法。
  * boolean-value：强制布尔属性。`<div attr></div>`
* san-loader:
  * SanLoaderPlugin 在 webpack 正式构建之前修改原有的配置 rules。 
  * webpack 从入口文件出发, 遇到`.san`文件，第一次调用 san-loader 来处理 san 单文件, 这个过程会调用 san-sfc-compiler 的 parseSFC 方法来解析文件内容生成 import 语句，对于每一条 import 语句再遍历 rules 进行规则匹配。最后提取代码块交给对应 loader 处理

## 权限管理

### RABC 
基于角色的访问控制（Role-Based Access Control，简称 RBAC），指的是通过用户的角色（Role）授权其相关权限，实现了灵活的访问控制，相比直接授予用户权限，要更加简单、高效、可扩展。
* 用户（User）：系统实际使用者（如员工、管理员）
* 角色（Role）：职级或职能的抽象集合（如「财务专员」「部门主管」）
* 权限（Permission）：对系统资源的操作许可（如「查看报表」「导出数据」）

### 前端权限控制流程
1. 用户登录与权限初始化
用户登录后，后端返回角色标识（如roles: ["finance_staff"]）和权限清单（如permissions: ["invoice:view", "budget:edit"]）前端将权限数据存入状态管理工具（如Vuex/Pinia），为后续控制提供依据
2. 动态路由生成
* 路由分级配置：
  * 基础路由（公共页面：登录页、404）
  * 动态路由（需权限控制：仪表盘、订单管理）
  * 每个动态路由配置meta.permissions字段标记所需权限（如{ path: "/pay", meta: { permissions: ["payment:access"] } }）
* 路由过滤逻辑：根据用户权限清单过滤动态路由，仅保留用户有权访问的路由配置，通过router.addRoute()动态挂载
3. 前置守卫校验
* 全局路由守卫：在vue-router的beforeEach钩子中，对每次路由跳转进行三重校验：
  * 是否已登录（未登录跳转至登录页）
  * 是否已获取权限（防止页面刷新后权限丢失）
  * 目标路由是否在用户权限范围内（无权限跳转至403页）
* 嵌套路由处理：对父级路由设置alwaysShow: true，确保即使子路由无权限，父级菜单仍可展示（但子菜单项置灰或隐藏）
