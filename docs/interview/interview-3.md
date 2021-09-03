---
title: 面试题（三）
date: 2018-08-04 09:21:01
categories: 面试
---
# 面试题（三）
* == 和 === 的区别
* 讲讲 js 的继承方式
* 介绍一下箭头函数
* this 的指向
* 简述CSS选择器的优先级规则
* 简述居中一个元素的方法
* 浏览器缓存和webpack缓存配置
* meta标签与视口
* margin 写3个值
* background-size
* 浏览器标签页通信
* cookie, localStorage, sessionStorage

## == 和 === 的区别

> == 代表相同， ===代表严格相同
>
> 当进行双等号比较时候： 先检查两个操作数数据类型，如果相同， 则进行===比较， 如果不同， 则愿意为你进行一次类型转换， 转换成相同类型后再进行比较， 而===比较时， 如果类型不同，直接就是false.
>
> null == undefined // true，是一种规定
> null === undefined // false
>
> typeof null // object
> typeof undefined // undefined
>
> [1] == [1] // false，地址不同
>
> [1] == "1" //true，隐式类型转换

## 讲讲 js 的继承方式

**（1）原型链继承：子类原型是对父类的实例化**

```js
function Father(){}
function Son(){}
Son.prototype = new Father()   //实例化对象会指向父类的原型，如图

// 或者使用 Object.create()
Son.prototype = Object.create(Father.prototype);

let son = new Son()
son instanceof Son // true
son instanceof Father // true

// Object.create 实现
let o = Object.create(obj) // o.__proto__ === obj
Object.create = function (obj) {
    function F() {}
    F.prototype = obj;
    return new F();
};
```

![原型链继承](http://lizhenchao.oss-cn-shenzhen.aliyuncs.com/imgs/public/16-11-11/5352248.jpg)

缺点：

1.父类的共有属性会被子类实例共享

2.创建子类对象无法传参，因为只有Son.prototype = new Father()可以传，但是会对所有子类有效。

**（2）构造函数继承**

```js
function Father(name,age){
    this.name = name;
    this.age = age;
}
function Son(name,age,sex){
    this.sex = sex;
    Father.call(this,name,age)
}
var son1 = new Son('张三','30','男')

//简述new一个对象的过程
//1.创造一个新的空对象
//2.新对象的_proto_指向构造函数的原型对象
//3.构造函数的this指向正在创建的新对象，并执行构造函数的代码，向新对象中添加属性和方法。
//4.返回新对象地址

//讲一下_proto_和prototype的区别
//1.__proto__是 对象实例 都有的，而 prototype 是函数对象特有的
//2.prototype 原型对象 有 constructor 属性，又指回 构造函数
//3.对象实例的 __proto__ 均默认指向 它们的 构造函数的 prototype
```

缺点： 

 1.父类的原型方法不会被子类继承，如果全放到构造函数中，每个子类实例都单独拥有一份，违反复用性。

 2.不能通过 son instanceof Father

**（3）组合继承**

```js
function Father(name,age){
    this.name = name;
    this.age = age;
}
function Son(name,age,sex){
    this.sex = sex;
    Father.call(this,name,age)
}
Son.prototype = new Father()
```

缺点：父类的构造函数执行了两遍

**（4）原型式继承：对原型链继承的封装**

```js
function inheritObject(o){
    function F(){}
    F.prototype = o;
    return new F();
}
var book = {
    name:'js book'
}
var newBook = inheritObject(book)
var newBook.name = 'ajax book'
```

缺点：仍存在原型链继承的缺点

优点：F中无内容，开销比较小。

**（5）寄生式继承：对原型继承的二次封装并进行了扩展**

```js
var book = {
    name:'js book'
}
function creteBook(obj){
    var o = inheritObject(obj); //不仅有父类中的属性和方法
    //扩展新对象
    o.getName = function(){     //还添加了新的属性和方法
        console.log(name)
    }
    return o
}
```

缺点：方法在函数中定义，无法得到复用

**（6）寄生组合继承（最理想）**

组合继承= 原型链继承 + 构造函数继承

寄生组合式继承=寄生式继承+构造函数继承

```js
function inheritObject(o){
    function F(){}
    F.prototype = o;
    return new F();
}
function inheritPrototype(subClass,superClass){
    var p = inheritObject(superClass.prototype)
    p.constructor = subClass
    subClass.prototype = p
}
//父类
function SuperClass(name){
    this.name = name
}
//子类
function SubClass(name,time){
    //构造函数式继承
    SuperClass.call(this,name)
    this.time = time
}
//寄生式继承父类原型
inheritPrototype(subClass,superClass)
```

## 介绍一下箭头函数

箭头函数的含义

```js
x => x * x  // 相当于
function (x) {
    return x * x;
}
```

- 说一下箭头函数和普通函数的区别

（1）箭头函数是匿名函数，不能作为构造函数，不能使用new
（2）箭头函数不绑定arguments，取而代之用rest参数…解决

```js
let B = (b)=>{
	console.log(arguments);
}
B(2,92,32,32); // Uncaught ReferenceError: arguments is not defined

let C = (...c) => {
  console.log(c);
}
C(3,82,32,11323);  // [3, 82, 32, 11323]   
```

（3）箭头函数不绑定this，会捕获其所在的上下文的this值，作为自己的this值
（4）箭头函数通过 call() 或 apply() 方法调用一个函数时，对 this 并没有影响。
（5）箭头函数没有原型属性

## this 的指向

- 普通函数指向函数调用者（执行的时候才确定）
- 箭头函数指向函数所在的作用域（对象的{}和if(){}都构不成作用域）

```js
const obj = {
    name:'objName',
    say:function(){console.log(this.name)},
    read:()=>{console.log(this.name)}
}
obj.say();  //objName     指向的是调用者
obj.read(); //undefined   指向的是window.name
```

怎么答：

1. 全局环境中的this指向全局对象window
2. new绑定，并且构造函数没有**返回其他对象**，this指向这个新对象
3. 通过call，apply，bind，并且第一个参数值不是Null,undefined，那么this绑定的就是指定的对象
4. 普通函数指向函数调用者（执行的时候才确定）
5. 箭头函数指向函数所在的作用域，根据上下文确定

关于第二条

```js
function fn()  
{  
    this.user = '追梦子';  
    return {};  
}
var a = new fn;  
console.log(a.user); //undefined
```

## 简述CSS选择器的优先级规则

> 优先级不同，高优先级属性覆盖低优先级属性
> 优先级相同，定义在后覆盖定义在先
>
> 内联 > ID选择器 > 类选择器 > 标签选择器，伪类>元素标记  !important最高，但是在低版本IE有兼容性问题
>
> 如果link引入外部样式表，而本身又有内部样式表，则行内样式依旧优先级最高，内部样式表和外部样式表的优先级和定义先后顺序有关，定义在后的优先级更高。

## 简述居中一个元素的方法

考虑：水平还是垂直，块还是行内，是否需要知道宽高，兼容性

（1）水平：

```js
1. margin: 0 auto; // 对于 block 生效
2. text-align: center; // 对于 inline 和 inline-block 均生效
```

（2）垂直：

```js
3. line-height：xxpx
4. vertical-align：middle // 还有两个值text-top / text-bottom，常用于图片对齐文字
5. align-items: center; // flex布局的居中方法
```

（3）水平竖直同时居中

 absolute方法：

5. 已知宽高：负数margin

```css
.parent{
    position: relative;
}
.child{
    position: absolute;
    top: 50%;
    left: 50%;
    width: 80px;
    height: 60px;
    margin-left: -40px;
    margin-top: -30px;
}
```

6. 已知宽高：calc

```css
.parent{
    position:relative;
}
.child{
    position:absolute;
    width: 80px;
    height: 60px;
    top:calc(50% - 30px);
    left:calc(50% - 40px);
}
```

7. 需要设定宽高：margin auto

```css
    .f14 .parent{
        position: relative;
    }
    .f14 .child{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        height: 50px;
        width: 80px;
        margin: auto;
    }
```

8. 不需要设定宽高：transform(css3,IE8及以下不支持)

```css
    .f15 .parent{
        position: relative;
    }
    .f15 .child{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);  自身偏移
    }
```

9. flex布局

```css
.main{
     display: flex;
     justify-content: center;
     align-items: center;
 }
```

10. table-cell + inline-block

css新增的table属性，可以让我们把普通元素，变为table元素的现实效果，通过这个特性也可以实现水平垂直居中，这个属性和table标签一样的居中原理。

```css
.parent{
    display: table-cell;
    text-align: center;
    vertical-align: middle;
}
.child{
    display: inline-block;
}
```

## 浏览器缓存和webpack缓存配置

**我们经常谈论的浏览器缓存（强缓存，协商缓存）指的都是HTTP缓存**

* [浏览器缓存: 重点看](https://juejin.cn/post/6844903763665240072)
* [hash、chunkhash和contenthash区别](https://www.jiangruitao.com/webpack/hash-chunkhash-contenthash/)
* [HTTP缓存、浏览器缓存、应用程序缓存](https://zhuanlan.zhihu.com/p/63541232)

>当浏览器再次访问一个已经访问过的资源时，它会这样做：
>
>1. 看看是否命中强缓存，如果命中，就直接使用缓存了。
>2. 如果没有命中强缓存，就发请求到服务器检查是否命中协商缓存（Etag, Last-modified）。
>3. 如果命中协商缓存，服务器会返回 304 告诉浏览器使用本地缓存。
>4. 否则，请求网络返回最新的资源。
>
>浏览器缓存的位置：
>
>1. Service Worker： 是运行在浏览器背后的独立线程，它可以让我们自由控制缓存哪些文件、如何匹配缓存、如何读取缓存，并且缓存是持续性的。
>2. Memory Cache： 内存缓存，读取内存中的数据肯定比磁盘快。但是内存缓存虽然读取高效，可是缓存持续性很短，会随着进程的释放而释放。 一旦我们关闭 Tab 页面，内存中的缓存也就被释放了。
>3. Disk Cache: Disk Cache 也就是存储在硬盘中的缓存，读取速度慢点，但是什么都能存储到磁盘中，比之 Memory Cache 胜在容量和存储时效性上。
>

> HTTP缓存的基本目的就是使应用执行的更快，更易扩展，但是HTTP缓存通常只适用于idempotent request（可以理解为查询请求，也就是不更新服务端数据的请求），这也就导致了在HTTP的世界里，一般都是对GET请求做缓存，POST请求很少有缓存。
>
> GET多用来直接获取数据，不修改数据，主要目的就是database的search语句的感觉。用缓存（有个代理服务器的概念）的目的就是查db的速度变快。
>
> POST则是发送数据到服务器端去存储。类似db里的update delete和insert语句的感觉。更新db的意思。数据必须放在数据库，所以一般都得去访问服务器端，而极少需要缓存。

**缓存的实现： 强缓存和协商缓存都是根据 HTTP Header 来实现的，就看 response 中 Cache-Control 的值，如果有max-age=xxx秒，则命中强缓存。如果Cache-Control的值是no-cache，说明没命中强缓存，走协商缓存。**

**参数**

public

> 所有内容都将被缓存(客户端和代理服务器都可缓存)

private

> 内容只缓存到私有缓存中(仅客户端可以缓存，代理服务器不可缓存) 对于private和public，前端可以认为一样，不用深究）

no-cache

> 不走强缓存，必须先与服务器确认返回的响应是否被更改，然后才能使用该响应来满足后续对同一个网址的请求。因此，如果存在合适的验证令牌 (ETag)，no-cache 会发起往返通信来验证缓存的响应，如果资源未被更改，可以避免下载。

no-store

> 所有内容都不会被缓存到缓存或 Internet 临时文件中

must-revalidation/proxy-revalidation

> 如果缓存的内容失效，请求必须发送到服务器/代理以进行重新验证

max-age=xxx

> 缓存的内容将在 xxx 秒后失效, 这个选项只在HTTP 1.1可用, 并如果和Last-Modified一起使用时, 优先级较高

s-maxage=xxx

> 同max-age作用一样，只在代理服务器中生效（比如CDN缓存）。比如当s-maxage=60时，在这60秒中，即使更新了CDN的内容，浏览器也不会进行请求。max-age用于普通缓存，而s-maxage用于代理缓存。**s-maxage的优先级高于max-age**。如果存在s-maxage，则会覆盖掉max-age和Expires header。

## meta标签与视口

首先介绍3个视口的概念

- **layout viewport(布局视口)：**在PC端上，布局视口等于浏览器窗口的宽度。而在移动端上，由于要使为PC端浏览器设计的网站能够完全显示在移动端的小屏幕里，此时的布局视口会远大于移动设备的屏幕，就会出现滚动条。js获取布局视口：`document.documentElement.clientWidth | document.body.clientWidth`；
- **visual viewport(视觉视口)：**用户正在看到的网页的区域。用户可以通过缩放来查看网站的内容。如果用户缩小网站，我们看到的网站区域将变大，此时视觉视口也变大了，同理，用户放大网站，我们能看到的网站区域将缩小，此时视觉视口也变小了。不管用户如何缩放，都不会影响到布局视口的宽度。js获取视觉视口：`window.innerWidth`；
- **ideal viewport(理想视口)：**布局视口的一个理想尺寸，只有当布局视口的尺寸等于设备屏幕的尺寸时，才是理想视口。js获取理想视口：`window.screen.width`；
- 页面的滚动条取决于视觉视口和布局视口，页面元素宽度取决于布局视口大小

我们在开发时，常常加入这样一行代码

```html
<meta content="width=device-width, initial-scale=1.0" name="viewport">
```

- `width=device-width`，这句代码的意思就是把布局视口 = 理想视口。
- `initial-scale`指的是缩放系数。其中有这样的公式：

```js
视觉视口宽度 = 理想视口宽度 / 缩放系数 

比如iphone加入这段代码时：
视觉视口 = 320/1.0 = 320
布局视口 = 320
当视觉视口= 布局视口，页面无滚动条。

当改变initial-scale时：

initial-scale = 0.5 
视觉视口宽度 = 320 / 0.5 = 640
布局视口宽度 = 320
又因为：视觉视口不能大于布局视口，所以此时，将布局视口的宽度提高等于640
总结：视觉视口 = 布局视口 = 640

initial-scale = 2 「 div宽度320，页面有滚动条 」
视觉视口宽度 = 320 / 2 = 160
布局视口宽度 = 320
总结：视觉视口 < 布局视口 页面出现了滚动条。
```

## margin 写 3 个值

> margin: 20px 40px 60px;（上20px；左、右40px；下60px）

## background-size

正常一个竖屏的封面图，怎么截取中间部分作为封面呢？

**采用background属性设置**

```html
 <div class="imagecover" 
      :style="{'background-image': 'url(' + CoverUrl ')'}"></div>

<style>
	.imagecover {              
        width: 345px;
        height: 194px;
        overflow: hidden;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
    }
</style>
```

* background-size属性

> cover

缩放背景图片以完全覆盖背景区，可能背景图片部分看不见。和 `contain` 值相反，`cover` 值尽可能大的缩放背景图像并保持图像的宽高比例（图像不会被压扁）。该背景图以它的全部宽或者高覆盖所在容器。当容器和背景图大小不同时，背景图的 左/右 或者 上/下 部分会被裁剪。

> contain

缩放背景图片以完全装入背景区，可能背景区部分空白。`contain` 尽可能的缩放背景并保持图像的宽高比例（图像不会被压缩）。该背景图会填充所在的容器。当背景图和容器的大小的不同时，容器的空白区域（上/下或者左/右）会显示由 background-color 设置的背景颜色。

## 浏览器标签页通信

### cookie + setInterval

> 想在所有的标签页中实现通信，我们必须将数据存放到一个公共的存储空间，所有的标签页都能获取并且还能进行修改；我们知道，cookie在用户所有浏览器标签页中都是共享的，因此，我们可以尝试把选中的数据存放到cookie中去，由于更新cookie并不能触发任何事件，因此我们需要通过定时器`setInterval`来主动监听cookie中的值是否改变。
>
> 缺点：定时器存在延时情况

### localStorage

> localStorage也是浏览器多个页面共用的存储空间；而且localStorage在一个页面中添加、修改或者删除时，都会在**非当前页面中**被动触发一个`storage`事件，我们通过在其他页面中监听`storage`事件，即可拿到`storage`更新前后的值

### webworker

> HTML5引入了一个**工作线程（webWorker）**的概念。它允许开发人员编写能够长时间运行而不被用户所中断的后台程序，去执行事务或者逻辑，并同时保证页面对用户的响应。
>
> 简而言之，就是**允许JavaScript创建多个线程，但是子线程完全受主线程控制，且不得操作DOM**。
>
> **从而，**可以用webWorker来处理一些比较耗时的计算。
>
> webworker也分为Worker和SharedWorker，普通的worker可以直接使用`new Worker()`创建，只在当前页面中使用；而SharedWorker通过名字我们也能看出，是可以在多个标签页面中数据是共享的；

### websocket

> websocket作为全双工通信，自然可以实现多个标签页之间的通信；WebSocket是HTML5新增的协议，它的目的是在浏览器和服务器之间建立一个不受限的双向通信的通道。

## cookie, localStorage, sessionStorage

> cookie是网站为了标示用户身份而储存在用户本地终端（Client Side）上的数据（通常经过加密）。
>
> cookie数据始终在同源的http请求中携带（即使不需要），记会在浏览器和服务器间来回传递。
>
> sessionStorage和localStorage不会自动把数据发给服务器，仅在本地保存。

**存储大小：**

> cookie数据大小不能超过4k。
>
> sessionStorage和localStorage 虽然也有存储大小的限制，但比cookie大得多，可以达到5M或更大

**有效时间：**

> localStorage  存储持久数据，浏览器关闭后数据不丢失除非主动删除数据；
>
> sessionStorage 数据在当前浏览器窗口关闭后自动删除。
>
> cookie     设置的cookie过期时间之前一直有效，即使窗口或浏览器关闭

