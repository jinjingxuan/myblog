---
title: 盒子模型
date: 2020-11-26 11:27:54
categories: CSS
---

# 盒子模型
* 盒子模型
* 脱离文档流
* BFC
* 清除浮动

## 分类

* w3c标准盒模型
  * 包括 width, height, margin, padding, border
  * 可视宽度是 width + padding + border
  * box-sizing: content-box;
* ie盒模型
  * 也包括 width, height, margin, padding, border
  * 可视宽度 width
  * box-sizing: border-box;

## 脱离文档流

* 所谓的**文档流**，指的是元素排版布局过程中，元素会自动从左往右，从上往下的流式排列。
* **脱离文档流**，也就是将元素从普通的布局排版中拿走，其他盒子在定位的时候，会当做脱离文档流的元素不存在而进行定位。
* **浮动 ( float ) 和绝对定位 ( position:absolute )**
  * 均脱离文档流
  * 均不占位
  * 浮动情况下，其他元素会自动在其右边排列。绝对定位会完全忽视其存在。

## BFC

* BFC的定义:

```js
BFC（Block formatting context ）“块级格式上下文”。 是用于布局块级盒子的一块渲染区域。并且与这个区域的外部毫无关系。
```

- BFC的布局规则

```js
 内部的Box会在垂直方向，一个接一个地放置。

 Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠。

 每个盒子（块盒与行盒）的margin box的左边，与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。

 BFC的区域不会与float box重叠。

 BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。

 计算BFC的高度时，浮动元素也参与计算。
```

* 触发BFC的条件:

```js
满足下列条件之一就可以触发BFC

 1：根元素，即html元素

 2：float的值不为none

 3：overflow的值不为visible

 4：display的值为inline-block、table-cell、table-caption

 5：position的值为absolute或者fixed
```

- BFC的作用

（1）**可以阻止元素被浮动的元素覆盖**（可做两栏布局自适应）

[![1](https://img-blog.csdnimg.cn/20190428161126130.png)](https://img-blog.csdnimg.cn/20190428161126130.png)

 触发红色盒子的BFC后

[![2](https://img-blog.csdnimg.cn/20190428161306268.png)](https://img-blog.csdnimg.cn/20190428161306268.png)

```html
<style>
       .box1{
            float: left;
            width: 100px;
            height: 100px;
            background: green;
        }
        .box2{
            height: 500px;
            background: red;
            overflow: hidden;
        }
    </style>
</head>
<body>
  <div class="box1"></div>
  <div class="box2"></div>
</body>
```



（2）**解决高度塌陷**：我们知道当浮动的盒子的父元素没有高度时，会出现高度塌陷现象。

[![3](https://img-blog.csdnimg.cn/20190428162141491.png)](https://img-blog.csdnimg.cn/20190428162141491.png)

 父盒子触发BFC可以解决这个问题,根据布局规则的最后一条。

（3）**解决同一个BFC区域的垂直方向margin塌陷的问题**

[![4](https://img-blog.csdnimg.cn/20190428165048481.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQxMjU3MTI5,size_16,color_FFFFFF,t_70)](https://img-blog.csdnimg.cn/20190428165048481.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQxMjU3MTI5,size_16,color_FFFFFF,t_70)

 分为两个不同的BFC之后可以解决

## 清除浮动

> 1. 浮动元素后面加空 div 
> 2. 利用 BFC
> 3. 利用 after 伪元素

* 浮动元素后面加一个空的`div`，并为它清除浮动

```html
<style>
  .wrap{
    width:500px;
    height:400px;
    border:1px solid red;
    margin:0 auto;
  }
  .float{
    width:200px;
    height:200px;
    background:#ccc;
    float:left;
  }
  .nofloat{
    width:300px;
    height:150px;
    background:red;
  }
  .clear{
    clear:both;
  }
</style>

<div class="wrap">
  <div class="float">浮动</div>
  <div class="clear"></div>
  <div class="nofloat">不想被浮动影响</div>
</div>
```

* 利用BFC特性清除浮动（BFC中浮动元素也会参与计算高度）

```html
<style>
  .wrap{
    width:500px;
    border:1px solid red;
    margin:0 auto;
    overflow:hidden;
  }
  .float{
    width:200px;
    height:200px;
    background:#ccc;
    float:left;
  }
  .nofloat{
    width:300px;
    height:150px;
    background:red;
  }
</style>

<div class="wrap">
  <div class="float">浮动</div>
  <div class="nofloat">不想被浮动影响</div>
</div>
```

* 使用`after`伪元素，给浮动元素的父元素清除浮动

```html
<style>
  .wrap{
    width:500px;
    border:1px solid red;
    margin:0 auto;
  }
  .float{
    width:200px;
    height:200px;
    background:#ccc;
    float:left;
  }

  .wrap:after{
    content:'clear';
    display:block;
    height:0;
    clear:both;
    overflow:hidden;
    visibility:hidden;
  }
</style>

<div class="wrap">
  <div class="float">浮动</div>
</div>
```

