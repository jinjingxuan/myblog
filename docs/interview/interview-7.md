---
title: 面试题（七）
date: 2018-08-03 09:21:01
categories: 面试
---
# 面试题（七）
* 原生ajax
* display有哪些属性
* position有哪些属性
* transform有哪些属性
* input标签的属性
* 如何给一个页面添加10000个div
* 原生js操作DOM的API
* 伪类和伪元素
* 变量提升的一道题
* 正则将手机号中间四位变为*
* 图片懒加载
* 二分查找
* promise能封装setInterval吗

## 原生ajax

```js
// 原生ajax实现
function ajax() {
    var xhr = new XMLHttpRequest();
    xhr.open('method', 'url');
    xhr.send();
    xhr.onreadystatechange = function() {
        if ( xhr.readyState==4 && xhr.status==200) {
            console.log('success', xhr.responseText);
        } else {
            console.log('error', xhr.responseText);
        }
    }
}

//readyState
//0：初始化，XMLHttpRequest对象还没有完成初始化
//1：载入，XMLHttpRequest对象开始发送请求
//2：载入完成，XMLHttpRequest对象的请求发送完成
//3：解析，XMLHttpRequest对象开始读取服务器的响应
//4：完成，XMLHttpRequest对象读取服务器响应结束
```

## display有哪些属性

- **display: none;表示此元素将不被显示。**
- **display: block;将元素显示为块元素。（又叫块级元素）**
- **display: inline;将元素显示为内联元素。（又叫行内元素）**

> 内联元素不可以设置高度、宽度
> 只能设置左右的margin值和左右的padding值，而不能设置上下的margin值和上下的padding值
> 常见：span、img、input、a、label、button

- **display: inline-block;将元素显示为内联块元素。**

> 不换行，但可以设置宽高

- **display: inherit;规定应该从父元素继承 display 属性的值。**
- **display: table，display: table-cell**

## position有哪些属性

* position:static，出现在文档流中，不受top，left影响
* position:relative，相对定位，根据元素原来位置定位，在文档流中
* position:absolute，绝对定位，根据relative的父元素定位，脱离文档流
* positoin:fixed，相对于浏览器窗口固定位置，脱离文档流。
* position:inherit,继承
* position:initial
* position:sticky，

>  position: sticky; 基于用户的滚动位置来定位。

粘性定位的元素是依赖于用户的滚动，在 position:relative 与 position:fixed 定位之间切换。

在目标区域以内，它的行为就像 position:relative; 而当页面滚动超出目标区域时，它的表现就像 position:fixed;，它会固定在目标位置。

```html
<style>
    .top,
    .middle,
    .bottom {
        position: relative;
        background: lightblue;
        height: 200px;
    }
    .middle {
        background: yellow;
    }
    .bottom {
        background: pink;
    }
    .fixed {
        width: 100px;
        height: 100px;
        position: fixed;
        background: red;
    }
</style>

<div class="top"></div>
<div class="middle"></div>
<div class="fixed"></div>
<div class="bottom"></div>

<!--fixed在bottom的左上角，脱离文档流后被覆盖了-->
```

## transform有哪些属性

`transform: rotate | scale | skew | translate |matrix;`

* transform:rotate(30deg)

* scale(x,y)使元素水平方向和垂直方向同时缩放（也就是X轴和Y轴同时缩放）；

  scaleX(x)元素仅水平方向缩放（X轴缩放）；

  scaleY(y)元素仅垂直方向缩放（Y轴缩放）

* skew(x,y)使元素在水平和垂直方向同时扭曲（X轴和Y轴同时按一定的角度值进行扭曲变形）；

  skewX(x)仅使元素在水平方向扭曲变形（X轴扭曲变形）；

  skewY(y)仅使元素在垂直方向扭曲变形（Y轴扭曲变形），

* translate:同样有三种方法

* matrix

## input标签的属性

```html
<!-- maxlength 属性规定输入字段的最大长度-->
<input maxlength="value">

<!-- autocomplete 属性规定输入字段是否应该启用自动完成功能。自动完成允许浏览器预测对字段的输入。当用户在字段开始键入时，浏览器基于之前键入过的值，应该显示出在字段中填写的选项。 开启为默认-->

<input autocomplete="on/off">
```

## 如何给一个页面添加10000个div

```html
<!DOCTYPE html>
<html lang="zh-cn">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        body div {
            width: 30px;
            height: 2px;
            border: 1px solid #ee3333;
        }
    </style>
</head>
<body>


<script>
    // 利用 innerHTML 拼接字符串的方式     (添加10000个div)  (耗时约900ms） 最慢
    // function f() {
    //     var date = +new Date();
    //     for (var i = 1; i <= 10000; i++) {
    //         document.body.innerHTML += "<div></div>"
    //     }
    //     var date1 = +new Date();
    //     console.log(date1-date);
    // }
    // f();

    // 利用 innerHTML 数组赋值的方式  结构稍微复杂  （添加10000个div)   （耗时约15ms)  最快
    function f() {
        var date = +new Date();
        var str = [];
        for (var i = 1; i <= 10000; i++) {
            str.push('<div></div>');
        }
        str = str.join('');
        document.body.innerHTML = str;
        var date1 = +new Date();
        console.log(date1 - date);
    }

    f();

    // 利用 createElement    结构清晰简单          (添加10000个div)   (耗时约20ms) 比最快慢一丢丢
    // function f() {
    //     var date = +new Date();
    //     for (var i = 1; i <= 10000; i++) {
    //         var div = document.createElement('div');
    //         document.body.appendChild(div);
    //     }
    //     var date1 = +new Date();
    //     console.log(date1 - date);
    // }
    // f();

</script>
</body>
</html>
```

## 原生js操作DOM的API

#### 创建型API总结

> 创建型API包括createElement,createTextNode,cloneNode和createDocumentFragment四个方法，需要注意下面几点:
>  (1) 它们创建的节点，只是一个孤立的节点，需要通过appendChild添加到文档中。
>  (2) cloneNode要注意，如果被复制，是否包含子节点以及事件绑定等问题。
>  (3) 使用createDocumentFragment来解决添加大量节点时的性能问题  。

------

#### 页面修改型API总结

> 修改页面内容的API主要包括：appendChild,removeChild,insertBefore,replaceChild
>  需要注意几点：
>  (1) 不管是新增还是替换节点，如果新增或者替换的节点原本是存在于页面上的，则其原来位置的节点将被移除，也就是说同一个节点，不能存在于页面上的多个位置。
>  (2) 节点本身绑定的事件不会消失，会一直保留。

------

#### 节点查询型API总结

>  document.getElementById
>  document.getElementByName
>  document.getElementByTagName
>  document.getElementByClassName
>  document.querySelector和document.querySelectorAll：通过CSS选择器来查找元素，注意选择器要复合CSS选择器的规则。使用深度优先搜索来获取元素。

------

#### 节点关系型API总结

父关系型API

- parentNode: Element的父节点可能是Element,Document和DocumentFragment
- parentElement:与parentNode的区别在于，其父节点必须是一个Element，如果不是，则返回null。

兄弟关系型API

- previousSibling: 节点的前一个节点，如果该节点是第一个节点，则为null.注意有可能拿到的节点是文本节点或注释节点，与预期的不符，要进行处理一下。
- previousElementSibling:返回前一个元素节点，前一个节点必须是Element,注意IE9以下浏览器不支持。
- nextSibling: 节点的后一个节点，如果该节点是最后一个节点，则为null. 注意有可能拿到的节点是文本节点，与预期的不符，要进行处理一下。
- nextElementSibling: 返回后一个元素节点，后一个节点必须是Element，注意IE9以下浏览器不支持。

子关系型API

- childNodes :返回一个即时的nodeList,表示元素的子节点列表，子节点可能会包含文本节点，注释节点等。
- children: 一个即时的HTMLCollection,子节点都是Element，IE9以下浏览器不支持。
- firstNode: 第一个子节点
- lastNode: 最后一个子节点
- hasChildNodes方法：可以用来判断是否包含子节点

------

#### 元素属性型API

>  setAttribute: 根据名称和值修改元素的特性，eg:element.setAttribute(name,value);
>  getAttribute: 返回指定的特性名相应的特性值，如果不存在，则返回null或空字符串。

#### 元素样式型API

window.getComutedStyle是用来获取应用到元素后的样式，假设某个元素并未设置高度，而是通过其内容将其高度撑开，这时候要获取它的高度，就要用到getComutedStyle，用法如下：

```js
var style = window.getComputedStyle(element[, pseudoElt]);
```

>  element是要获取的元素，pseudoElt指定一个伪元素进行匹配。
>  返回的style是一个CSSStyleDeclaration对象。
>  通过style可以访问到元素计算后的样式
>  clientRect是一个DOMRect对象，包含left，top，right，bottom，它是相对于可视窗口的距离，滚动位置发生改变时，它们的值是会发生变化的。除了IE9以下浏览器，还包含元素的height和width等数据；

## 伪类和伪元素

伪类：`:focus`,`:hover`以及`<a>`标签的`:link`、`visited`等，

伪元素：较常见的比如`:before`、`:after`等。 

**（1）伪类的功能**

1.获取不存在与DOM树中的信息 。比如： `<a>` 标签的`:link、:visited` 等。这些信息不存在于DOM树中。

2.获取 不能被常规CSS选择器获取到的信息。比如：要获取第一个子元素，我们无法用常规的CSS选择器获取，但可以通过 `:first-child` 来获取到。

>  **伪类其实是弥补了CSS选择器的不足，用来更方便地获取信息。** 

 **（2）伪元素的功能**

> **而伪元素本质上是创建了一个虚拟容器(元素)，我们可以在其中添加内容或样式。** 

**（3）冒号区别**

> 伪元素的由**两个冒号**`::`开头，然后是伪元素的名称。

> 使用两个冒号`::`是为了区别伪类和伪元素（CSS2中并没有区别）。当然，考虑到兼容性，CSS2中已存的伪元素仍然可以使用一个冒号`:`的语法，但是CSS3中新增的伪元素必须使用两个冒号`::`

 ```js
div:after
div::after
div:first-child
div::first-child //错
 ```

### 结构性伪类元素

结构性伪类选择器的公共特征是允许开发者根据文档结构来指定元素的样式。 

**（1）nth-child和nth-last-child** 

```js
 	  p:nth-child(n){background:red}  表示E父元素中的第n个字节点
      p:nth-child(odd){background:red}/*匹配奇数行*/
      p:nth-child(even){background:red}/*匹配偶数行*/
      p:nth-child(2n){background:red}/*其中n是从0开始计算*/
```

**（2）E:first-child和E:last-child** 

**（3）nth-of-type(n) 和E:nth-last-of-type(n)** 

**（4）**）E:root（根节点）、E:only-child（独子元素）、E:only-of-type（独子类型元素）和E:empty（孤节点） 

## 变量提升的一道题

```js
	   setTimeout(() => console.log('1', a));

        new Promise(resolve => resolve()).then(() => console.log('2', a));

        console.log('3', a);
        var a = '哈哈'
        console.log('4', a);
        function a() {};

//3,f
//4,哈哈
//2，哈哈
//1，哈哈
```

## 正则将手机号中间四位变为*

```js
function replacePhone(str){
    let reg = /^(\d{3})(\d{4})(\d{4})$/
   	return  str.replace(reg,'$1****$3')
}
```

## 图片懒加载

一张图片就是一个<img>标签，而图片的来源主要是src属性。浏览器是否发起亲求就是根据是否有src属性决定的。

既然这样，那么我们就要对<img>标签的src属性下手了，在没进入可视区域的时候，我们先不给这个<img>标签赋src属性，这样岂不是浏览器就不会发送请求了。

```js
document.documentElement.clientHeight//获取屏幕可视区域的高度
element.offsetTop//获取元素相对于文档顶部的高度
document.documentElement.scrollTop//获取浏览器窗口顶部与文档顶部之间的距离，也就是滚动条滚动的距离
```

![1](https://pic1.zhimg.com/80/v2-af1ab0c5f34e468e8647135c1f9f51e4_720w.jpg)

如果：offsetTop-scroolTop<clientHeight，则图片进入了可视区内，则被请求。 

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>图片懒加载</title>
    <style>
        img {
            display: block;
            width: 100%;
            height: 300px;
            margin-bottom: 20px;
        }
    </style>
</head>
<body>
    <img data-src="./images/1.jpg" alt="">
    <img data-src="./images/2.jpg" alt="">
    <img data-src="./images/3.jpg" alt="">
    <img data-src="./images/4.jpg" alt="">
    <img data-src="./images/5.jpg" alt="">
    <img data-src="./images/6.jpg" alt="">
    <img data-src="./images/7.jpg" alt="">
    <img data-src="./images/8.jpg" alt="">
    <img data-src="./images/9.jpg" alt="">
    <img data-src="./images/10.jpg" alt="">
    <img data-src="./images/1.jpg" alt="">
    <img data-src="./images/2.jpg" alt="">
</body>
<script>
        var imgs = document.querySelectorAll('img');

        //offsetTop是元素与offsetParent的距离，循环获取直到页面顶部
        function getTop(e) {
            var T = e.offsetTop;
            while(e = e.offsetParent) {
                T += e.offsetTop;
            }
            return T;
        }

        function lazyLoad(imgs) {
            var H = document.documentElement.clientHeight;//获取可视区域高度
            var S = document.documentElement.scrollTop || document.body.scrollTop;
            for (var i = 0; i < imgs.length; i++) {
                if (H > getTop(imgs[i])-S) {
                    imgs[i].src = imgs[i].getAttribute('data-src');
                }
            }
        }

        window.onload = window.onscroll = function () { //onscroll()在滚动条滚动的时候触发
            lazyLoad(imgs);
        }
</script>
</html>
```

## 二分查找

```js
function binary_search(arr, key) {
    var low = 0,
        high = arr.length - 1;

    while (low <= high) {
        var mid = parseInt((high + low) / 2);
        if (key == arr[mid]) {
            return mid;
        } else if (key > arr[mid]) {
            low = mid + 1;
        } else if (key < arr[mid]) {
            high = mid - 1;
        } else {
            return -1;
        }
    }
}
```

## promise能封装setInterval吗

不能，因为promise只能执行一次

```js
		  new Promise(function(resolve,reject){
                setTimeout(function(){
                    resolve()
                },1000)
            }).then(function(){
                console.log(1)
            })

            new Promise(function(resolve,reject){
                setInterval(function(){
                    resolve()
                },1000)
            }).then(function(){
                console.log(2)
            })
```

解决办法

```js
		   function p(){
                return new Promise(function(resolve,reject){
                    setTimeout(function(){
                        resolve()
                    },1000)
                }).then(function(){
                    console.log("1")
                })
            }
            setInterval(p,1000)
```

