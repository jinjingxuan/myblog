---
title: 面试题（六）
date: 2018-08-03 09:21:01
categories: 面试
---
# 面试题（六）
* 什么是脱离文档流，定位与浮动
* 值类型与引用类型，堆和栈
* MVC与MVVM
* cookie和session的区别
* html5的标签
* 数组和链表的对比
* 怎么实现轮播图
* 口述一下什么是原型链
* 详细理解instanceof
* 数组扁平化带深度参数
* for 循环的问题怎么解决

## 什么是脱离文档流，定位与浮动

所谓的**文档流**，指的是元素排版布局过程中，元素会自动从左往右，从上往下的流式排列。

**脱离文档流**，也就是将元素从普通的布局排版中拿走，其他盒子在定位的时候，会当做脱离文档流的元素不存在而进行定位。

**浮动 ( float ) 和绝对定位 ( position:absolute )** 

（1）均脱离文档流

（2）均不占位

（3）浮动情况下，其他元素会自动在其右边排列。绝对定位会完全忽视其存在。

* [盒子模型](https://www.jinjingxuan.com/2020/11/26/CSS-%E7%9B%92%E5%AD%90%E6%A8%A1%E5%9E%8B/)

## 值类型与引用类型，堆和栈

* undefined null number string boolean symbol 属于值类型，object array function 属于引用类型 
* 值类型存储在栈中，引用类型存储在堆中。
* 值类型有固定的大小和值，存放在栈中，而引用类型不确定大小，但是其引用地址是固定的，因此，它的地址存在栈中，指向存在堆中的对象。 
* 值类型不可添加属性和方法，而引用类型可以添加属性和方法 
* 值类型比较只要相等，就可以用==或者===来比较，但是引用类型，即使let s = {};let s1 = {};但他们的内存地址不一样，比较依然不相等。
* stack为自动分配的内存空间，它由系统自动释放；而heap则是动态分配的内存，大小不定也不会自动释放。  

* [图示](https://upload-images.jianshu.io/upload_images/2295405-2012a343e5e0c162.png?imageMogr2/auto-orient/strip|imageView2/2/w/423/format/webp)

## MVC与MVVM

（1）MVC的定义：MVC是Model-View- Controller的简写。即模型-视图-控制器。 

- Model（模型）表示应用程序核心（如数据库）。
- View（视图）显示效果（HTML页面）。
- Controller（控制器）处理输入（业务逻辑）。 

（2）MVVM是Model-View-ViewModel的简写。即模型-视图-视图模型。是MVC的升级版

* 【模型】指的是后端传递的数据。
* 【视图】指的是所看到的页面。
* 【视图模型】mvvm模式的核心，它是连接view和model的桥梁。它有两个方向，也就是常说的双向绑定。 

（3）在以前传统的开发模式当中即MVC模式，前端人员只负责MVC当中的View（视图）部分，写好页面交由后端创建渲染模板并提供数据，随着MVVM模式的出现前端已经可以自己写业务逻辑以及渲染模板，后端只负责数据即可，前端所能做的事情越来越多。

## cookie和session的区别

> Session是另一种记录客户状态的机制，不同的是Cookie保存在客户端浏览器中，而Session保存在服务器上。客户端浏览器访问服务器的时候，服务器把客户端信息以某种形式记录在服务器上。这就是Session。客户端浏览器再次访问时只需要从该Session中查找该客户的状态就可以了 。

* [Cookie 和 Session 关系和区别](https://juejin.cn/post/6844903575684907016)

### Cookie和Session关系

1. 都是为了实现客户端与服务端交互而产出
2. Cookie是保存在客户端，缺点易伪造、不安全
3. Session是保存在服务端，会消耗服务器资源
4. Session实现有两种方式：Cookie和URL重写

### Cookie带来的安全性问题

* CSRF
* XSS

 ### [如何防御](https://jinjingxuan.github.io/2020/12/18/%E5%89%8D%E7%AB%AF%E5%AE%89%E5%85%A8-%E5%89%8D%E7%AB%AF%E5%AE%89%E5%85%A8%E7%AE%80%E4%BB%8B/#toc-heading-8)

## html5的标签

```html
<footer>:定义区段或页面的页脚.(足部)
<section>:定义文档中的区段.
<article>:定义文章.
<aside>:定义页面内容之外的内容.
<details>:定义元素的细节.
<audio>:定义声音内容.
<video>:定义视频.
<iframe>:内联框架.
```

## 数组和链表的对比

数组存储方式采用线性结构，声明数组时需要声明类型，并且大小也会固定：

* 优点：

　　　　因此访问数组元素可根据数组下标随机访问，O(1).

* 缺点：

　　　　大小固定，可能会造成空间浪费，或空间不够影响程序运行；

　　　　插入和删除元素却比较麻烦，可能需要移动部分数组元素以保证数组元素的物理位置保持连续。

链表采用链式存储结构，在声明时只需声明结构类型，：

* 优点：

　　　　链表大小在实际使用中可以动态增大和减小；

　　　　插入和删除操作就很方便，只需修改该元素节点邻接元素即可O(1).

* 缺点：

　　　　访问元素比较费时，需要逐个节点进行查看或能找到目标元素。

## 怎么实现轮播图

```JS
// 若果有在等待的定时器，则清掉
if (timer) {
    clearInterval(timer);
    timer = null;
}
//自动切换
timer = setInterval(autoPlay, 4000);

//定义自动播放函数
function autoPlay() {
    index++;
    if (list.length <=index) {
        index = 0;
    }

    changeImg(index);
    // alert("我正在autoplay");
}

// 定义图片切换函数（根据当前的index值也就是curindex）
function changeImg(curIndex) {
    for (var j = 0; j < list.length; j++) {
        list[j].className = "";
    }
    // 改变当前显示索引
    list[curIndex].className = "on";
    pic.style.marginLeft = -1920 * curIndex + "px";
    index = curIndex;
}

// 鼠标划过整个容器时停止自动播放
wrap.onmouseover = function(curIndex) {
    clearInterval(timer);
    //点击右按钮
}

// 鼠标离开整个容器时继续播放至下一张
wrap.onmouseout = function() {
    timer = setInterval(autoPlay, 4000);
    // alert("鼠标移走了");
}

// 遍历所有数字导航实现划过切换至对应的图片
for (var i = 0; i < list.length; i++) {
    list[i].id = i;
    list[i].onmouseover = function() {
        clearInterval(timer);
        changeImg(this.id);
    }
}
```

## 原型链

> 每个对象都有一个指向它的原型（prototype）对象的内部链接。这个原型对象又有自己的原型，直到某个对象的原型为 null 为止（也就是不再有原型指向），组成这条链的最后一环。这种一级一级的链结构就称为原型链（prototype chain）。

- [原型和原型链](https://www.jinjingxuan.com/2018/09/19/JavaScript-%E5%8E%9F%E5%9E%8B%E5%92%8C%E5%8E%9F%E5%9E%8B%E9%93%BE/)

 ## instanceof

> instanceof 运算符用来测试一个对象在其原型链中是否存在一个构造函数的 prototype 属性。
> A instanceof B
> //判断 B 的 prototype 属性指向的原型对象(B.prototype)是否在对象 A 的原型链上。

```js
function _instanceof(L, R) { //L为instanceof左表达式，R为右表达式
  let Ro = R.prototype //原型
  L = L.__proto__ //隐式原型
  while (true) {
    if (L === null) { //当到达L原型链顶端还未匹配，返回false
      return false
    }
    if (L === Ro) { //全等时，返回true
      return true
    }
    L = L.__proto__
  }
}

let num = 1
num.__proto__ === Number.prototype // true
num instanceof Number // false

num = new Number(1)
num.__proto__ === Number.prototype // true
num instanceof Number // true

num.__proto__ === (new Number(1)).__proto__ // true
```

```js
Object instanceof Object // true
Function instanceof Function // true
Function instanceof Object // true

Number instanceof Number // false
String instanceof String // false

// Object和Function都是构造函数，而所有的构造函数都是Function的实例，因此，Object是Function的实例对象。

console.log(Object instanceof Function)
console.log(Number instanceof Function) 
console.log(String instanceof Function)
console.log(Function instanceof Function)

console.log(Function instanceof Object)

console.log(Object instanceof Object)
console.log(Number instanceof Object) 
console.log(String instanceof Object)
console.log(Function instanceof Object)

// 均为 true
```

* [Object和Function图示](https://pic2.zhimg.com/80/dcd9f21f6457d284950b767e6f7bdea3_720w.jpg?source=1940ef5c)

 ## 数组扁平化带深度参数

```js
function flattern(list,depth){
    let res = []
    for(let item of list){
        if(Array.isArray(item)&&depth>0){
            res = res.concat(flattern(item,depth-1))
        }else{
            res.push(item)
        }
    }
    return res
}

// 写一个函数，将传进去的数组按深度展开
list = [1,2,[3,4],[5,6,[7,8],9],10,11]
// depth 等于 1 时输出
//depth = 1 :[1,2,3,4,5,6,[7,8],9,10,11]
// depth 等于 2 时输出
//depth = 2 :[1,2,3,4,5,6,7,8,9,10,11]

console.log(flattern(list,1))
console.log(flattern(list,2))
```

## for 循环的问题怎么解决

```html
<ul>
    <li>第一个</li>
    <li>第二个</li>
    <li>第三个</li>
    <li>第四个</li>
</ul>

<script>
    let oli = document.getElementsByTagName("li")
    for(var i=0;i<4;i++){
        oli[i].onclick = function(){
            console.log(i)
        }
    }
    // //相当于
    var i
    i=0
    oli[0].onclick = function(){
        console.log(i)
    }
    i=1
    oli[1].onclick = function(){
        console.log(i)
    }
    i=2
    oli[2].onclick = function(){
        console.log(i)
    }
    i=3
    oli[3].onclick = function(){
        console.log(i)
    }
    //按照词法作用域查找，会每次都找到全局的i


    //方法一：改为let
    for(let i=0;i<4;i++){
        oli[i].onclick = function(){
            console.log(i)
        }
    }
    //let声明了一个块级作用域，以上相当于
    for(let i=0;i<4;i++){
        let i = //隐藏作用域里的i
            oli[i].onclick = function(){
                console.log(i)
            }
        }
    //这个时候在执行点击事件时，i会在for循环的第一行找到i的值

    //方法二：闭包
    for(var i=0;i<4;i++){
        (function(i){
            oli[i].onclick = function(){
                console.log(i)
            }
        })(i)
    }

    //方法三：暂存数据,和let原理类似
    for(var i=0;i<4;i++){
        oli[i].index = i
        oli[i].onclick = function(){
            console.log(this.index)
        }
    }

    //方法四：事件委托
    var oul = document.getElementsByTagName("ul")[0];
    oul.onclick = function(e){
        var e = e || window.event
        var target = e.target || e.srcElement
        if(target.nodeName.toLowerCase() == 'li'){
            var li=this.querySelectorAll("li");
            var index = Array.prototype.indexOf.call(li,target);
            console.log(index);
        }
    }
```

```js
for (let i = 0; i < 3; i++) {
    let i = 'foo'
    console.log(i) //foo foo foo
}
```

