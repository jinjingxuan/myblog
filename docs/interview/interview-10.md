---
title: 面试题（十）
date: 2018-08-03 09:21:01
categories: 面试
---
# 面试题（十）
* call, apply, bind 的区别？怎么实现
* 介绍一下vue的生命周期
* 16进制颜色转换为rgb
* keep-alive了解吗
* 聊聊LRU算法
* Vue中组件生命周期调用顺序
* 你都做过哪些Vue的性能优化
* npm install 原理
* Map,weakMap,Set,weakSet
* 什么是尾递归和尾调用
* link 与 @import 的区别
* 数组 `map()` 和 `forEach()` 方法的区别？
* 什么是静态网站

## call, apply, bind 的区别？怎么实现

> 都是用来改变函数的 this 对象的指向的。
>
> 第一个参数都是 this 要指向的对象。
>
> 都可以利用后续参数传参。 区别：
>
> call 接受函数传参方式为：fn.call(this, 1, 2, 3)
>
> apply 接受函数传参方式为：fn.apply(this,[1, 2, 3])
>
> bind 的返回值为一个新的函数，需要再次调用： fn.bind(this)(1, 2, 3)

* [手写代码整理](https://jinjingxuan.github.io/myblog/interview/code-1.html#%E9%98%B2%E6%8A%96)

## vue的生命周期

### beforeCreate( 创建前 )

使用这个钩子，组件的选项对象并没有创建，el和data都还没初始化，所以data、methods和computed等都用不了。一般用来在组件挂在之前渲染一些东西。

### created ( 创建后 ）

这时候上面的data、methods、computed都已经创建完成了，数据观测，属性和方法的运算，watch/event事件回调都完成了，但这时候挂载阶段mount还没开始，是el并没有完成。这是最常用的生命周期钩子，可以调用methods中的方法，改变data中的数据，并且修改可以通过vue的响应式绑定体现在页面上，，获取computed中的计算属性等等，通常我们可以在这里对实例进行预处理，也在这里发ajax请求，这个周期中是没有什么方法来对实例化过程进行拦截的，因此假如有某些数据必须获取才允许进入页面的话，并不适合在这个方法发请求，建议在组件路由钩子beforeRouteEnter（路由守卫）中完成

### beforeMount（挂载之前）

挂载之前被调用，render（渲染）函数首次被调用（虚拟DOM），这里已经完成了模板编译，data里面的数据和模板会生产HTML，这里el也完成了，但并没有挂载到html页面上。

### mounted（挂载）

挂载完成了，这时候HTML模板会被渲染到HTML中，还可以做一些ajax操作。但mounted只能执行一次。

### beforeUpdate（更新之前）

更新指数据更新，发生在虚拟DOM重新渲染和补丁之前，在这个钩子中可以更改状态而不发生重绘。

### updated（更新后）

在由于数据更改导致地虚拟DOM重新渲染和打补丁只会调用，调用时，组件DOM已经更新，所以可以执行依赖于DOM的操作，然后在大多是情况下，应该避免在此期间更改状态，因为这可能会导致更新无限循环，该钩子在服务器端渲染期间不被调用

### beforeDestroy（销毁前）

在实例销毁前调用，但实例还可以用。

这里还可以使用this，一般用来做重置操作，比如清除定时器和DOM监听事件。

### destroyed（销毁后）

在实例销毁之后调用，调用后，所以的事件监听器会被移出，所有的子实例也会被销毁，该钩子在服务器端渲染期间不被调用

## 16进制颜色转换为rgb

```js
function hex2rgb(hex) {
	const str = hex.slice(1),
		res = []
	if (str.length === 3) {
		for (const w of str) {
			res.push(parseInt(w + w, 16))
		}
	} else {
		for (let i = 0; i < 6; i += 2) {
			res.push(parseInt(str[i] + str[i + 1], 16))
		}
	}
	return res
}
```

## keep-alive了解吗

> keep-alive是一个抽象组件：它自身不会渲染一个 DOM 元素，也不会出现在父组件链中；使用keep-alive包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。

### 一个场景

用户在某个列表页面选择筛选条件过滤出一份数据列表，由列表页面进入数据详情页面，再返回该列表页面，我们希望：列表页面可以保留用户的筛选（或选中）状态。keep-alive就是用来解决这种场景。当然keep-alive不仅仅是能够保存页面/组件的状态这么简单，它还可以避免组件反复创建和渲染，有效提升系统性能。 总的来说，keep-alive用于保存组件的渲染状态

> `keep-alive`可以实现组件缓存，当组件切换时不会对当前组件进行卸载。
>
> 常用的两个属性`include/exclude`，允许组件有条件的进行缓存。
>
> 两个生命周期`activated/deactivated`，用来得知当前组件是否处于活跃状态。
>
> keep-alive的中还运用了`LRU(Least Recently Used)`算法。
>
> 使用 vue-des-tools 可以查看当前组件是否缓存

`<keep-alive>` 是一个抽象组件，

- 首次渲染的时候设置缓存
- 缓存渲染的时候不会执行组件的 created、mounted 等钩子函数, 而是对缓存的组件执行patch 过程，最后直接更新到目标元素。

使用 LRU 缓存策略对组件进行缓存

- 命中缓存，则直接返回缓存，同时更新缓存key的位置
- 不命中缓存则设置进缓存，同时检查缓存的实例数量是否超过 max

* [Vue keep-alive深入理解及实践总结](https://juejin.cn/post/6844903919273918477)
* [keep-alive的实现原理及LRU缓存策略](https://segmentfault.com/a/1190000022248237)
* [vue多级菜单(路由)导致缓存(keep-alive)失效](https://segmentfault.com/a/1190000019975188)

## 聊聊LRU算法

> 操作系统内存管理：分页，分段，段页结合
>
> LRU（最近最久未使用）属于页面置换算法中的一种，其他还有 FIFO（先进先出算法），OPT（最佳置换算法）等等

[操作系统页面置换算法](https://blog.csdn.net/jankin6/article/details/78179320)

[leetcode146：LRU缓存机制](https://leetcode-cn.com/problems/lru-cache/)

[题解](https://leetcode-cn.com/problems/lru-cache/solution/146-lru-huan-cun-ji-zhi-shuang-xiang-lian-biao-ha-/)

## Vue中组件生命周期调用顺序

组件的调用顺序都是`先父后子`,渲染完成的顺序是`先子后父`。

组件的销毁操作是`先父后子`，销毁完成的顺序是`先子后父`。

### 加载渲染过程

```js
父beforeCreate->父created->父beforeMount->子beforeCreate->子created->子beforeMount- >子mounted->父mounted
```

### 子组件更新过程

```js
父beforeUpdate->子beforeUpdate->子updated->父updated
```

### 父组件更新过程

```js
父 beforeUpdate -> 父 updated
```

### 销毁过程

```js
父beforeDestroy->子beforeDestroy->子destroyed->父destroyed
```

## 你都做过哪些Vue的性能优化

* [v-if与v-show](https://jinjingxuan.github.io/2018/08/03/%E9%9D%A2%E8%AF%95-%E9%9D%A2%E8%AF%95%E9%A2%98%EF%BC%88%E5%85%AB%EF%BC%89/)
* [使用计算属性的缓存性](https://jinjingxuan.github.io/2018/08/03/%E9%9D%A2%E8%AF%95-%E9%9D%A2%E8%AF%95%E9%A2%98%EF%BC%88%E4%B8%80%EF%BC%89/#toc-heading-5)
* [v-if与v-for连用的问题](https://juejin.cn/post/6844904052371767309)
* V-for必须为item添加key，且避免使用 index 作为标识
* 长列表优化
  * 只需要静态展示不需要响应式的数据，使用`Object.freeze`冻结
  * 虚拟列表，[vue-infinite-scroll](https://github.com/ElemeFE/vue-infinite-scroll)
* 释放组件资源，监听事件，定时器销毁
* 图片资源优化
  * 大图 cdn 加速
  * 图片懒加载
  * 压缩图片大小，大多使用付费云服务
* SPA 页面采用keep-alive缓存组件
* [使用路由懒加载、异步组件](https://router.vuejs.org/zh/guide/advanced/lazy-loading.html#%E6%8A%8A%E7%BB%84%E4%BB%B6%E6%8C%89%E7%BB%84%E5%88%86%E5%9D%97)，也不宜太多
* 防抖、节流
* 第三方模块按需导入，例如[Element ui](https://element.eleme.io/#/zh-CN/component/quickstart)
* sourcemap
* 首屏渲染优化
  * 服务端渲染
  * 预渲染
  * 路由懒加载
  * loading动画

## npm install 原理

[npm install 原理分析](https://cloud.tencent.com/developer/article/1555982)

## Map,weakMap,Set,weakSet

[JavaScript中的Map、WeakMap、Set和WeakSet介绍](https://juejin.cn/post/6854573210794082318)

## 什么是尾递归和尾调用

**阶乘函数**

```c
int fact(int n) {
    if (n < 0)
        return 0;
    else if(n == 0 || n == 1)
        return 1;
    else
        return n * fact(n - 1);
}
```

**尾递归实现**

```c
int facttail(int n, int res)
{
    if (n < 0)
        return 0;
    else if(n == 0)
        return 1;
    else if(n == 1)
        return res;
    else
        return facttail(n - 1, n * res);
}
```

**再举一个例子：计算 1 到 n 的整数的和**

```js
const sum = (n) => {
  if (n <= 1) return n;
  return n + sum(n-1) // 当前调用栈保留，还需计算 n + ...
}

const sum = (n, prevSum = 0) => {
  if (n <= 1) return n + prevSum;
  return sum(n-1, n + prevSum)
}
```

**根本思想：避免了入栈出栈造成的时间空间损耗**

```js
// 尾调用
function f() {
  let m = 1;
  let n = 2;
  return g(m + n);
}
f();

// 等同于
function f() {
  return g(3);
}
f();

// 等同于
g(3);
```

> 上面代码中，如果函数g不是尾调用，函数f就需要保存内部变量m和n的值、g的调用位置等信息。但由于调用g之后，函数f就结束了，所以执行到最后一步，完全可以删除 f() 的调用记录，只保留 g(3) 的调用记录。
>
> 这就叫做"尾调用优化"（Tail call optimization），即只保留内层函数的调用记录。如果所有函数都是尾调用，那么完全可以做到每次执行时，调用记录只有一项，这将大大节省内存。这就是"尾调用优化"的意义。

[尾调用优化](http://www.ruanyifeng.com/blog/2015/04/tail-call.html)

## link 与 @import 的区别

* `link`功能较多，可以定义 RSS，定义 Rel 等作用，而`@import`只能用于加载 css
* 当解析到`link`时，页面会同步加载所引的 css，而`@import`所引用的 css 会等到页面加载完才被加载
* `@import`需要 IE5 以上才能使用
* `link`可以使用 js 动态引入，`@import`不行

## 数组 `map()` 和 `forEach()` 方法的区别？

这两个方法都是进行遍历数组的方法。`map()` 方法通过调回回调函数映射每一个元素到新元素上，并且返回的是一个新数组。另一方面，`forEach()` 为每个元素调用回调函数，但是它不返回新数组。`forEach()` 函数通常用于在迭代中产生副作用，而 `map()` 函数是一种常见的函数式编程技术

- 如果你需要遍历数组，会造成元素变化，而且不需要返回值来生成一个新数组，你可以使用 `forEach()`
- 对于保持数据的不变，`map()` 是正确的选择，原始数组的每一个值都会映射到一个新数组中

## 静态网站

### 什么是静态网站生成器

* 静态网站生成器是使用一系列配置，模板以及数据，生成静态HTML文件及相关资源的工具
* 这个功能也叫预渲染
* 生成的网站不需要服务器，只需要放到支持静态资源的 Web Server 或 CDN 上即可运行

### 常见的静态网站生成器

* Jekyll（Ruby）
* Hexo（Node）
* Hugo（Golang）
* Gatsby（Node/React）
* Gridsome（Node/Vue）
* 另外，Next.js，Nuxt.js 也能生成静态网站，但是它们更多被认为是服务端渲染框架

### 应用场景

* 不适合有大量路由页面的应用
* 不适合有大量动态内容的应用
* 适用于纯内容展示网站：博客，文档，宣传站等
