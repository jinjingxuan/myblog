# BFC

在一个Web页面的CSS渲染中，[块级格式化上下文](http://www.w3.org/TR/CSS21/visuren.html#block-formatting) (Block Fromatting Context)是按照块级盒子布局的。W3C对BFC的定义如下：

```js
浮动元素和绝对定位元素，非块级盒子的块级容器（例如 inline-blocks, table-cells, 和 table-captions），以及overflow值不为“visiable”的块级盒子，都会为他们的内容创建新的BFC（块级格式上下文）。
```

为了便于理解，我们换一种方式来重新定义BFC。一个HTML元素要创建BFC，则满足下列的任意一个或多个条件即可：

1. float的值不是none。
2. position的值不是static或者relative。
3. display的值是inline-block、table-cell、flex、table-caption或者inline-flex
4. overflow的值不是visible

BFC是一个独立的布局环境，其中的元素布局是不受外界的影响，并且在一个BFC中，块盒与行盒（行盒由一行中所有的内联元素所组成）都会垂直的沿着其父元素的边框排列。

## BFC布局规则

1. 内部的Box会在垂直方向，一个接一个地放置。
2. Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠
3. 每个BFC内部元素的左外边距， 与包含块的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。
4. BFC的区域不会与float box重叠。
5. BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。
6. 计算BFC的高度时，浮动元素也参与计算

 ## BFC解决的问题

| 作用               | 原理                                     |
| ------------------ | ---------------------------------------- |
| 外边距合并问题     | 同一个BFC的两个相邻Box的margin会发生重叠 |
| 浮动的高度塌陷问题 | 计算BFC的高度时，浮动元素也参与计算      |

****

## 什么是BFC，BFC的布局规则是什么，如何创建BFC

* BFC的定义:

>  BFC（Block formatting context ）“块级格式上下文”。 是用于布局块级盒子的一块渲染区域。并且与这个区域的外部毫无关系。

* BFC的布局规则

> 内部的Box会在垂直方向，一个接一个地放置。
>
> Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠。
>
> 每个盒子（块盒与行盒）的margin box的左边，与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。
>
> BFC的区域不会与float box重叠。
>
> BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。
>
> 计算BFC的高度时，浮动元素也参与计算。

* 触发BFC的条件:

满足下列条件之一就可以触发BFC

> 1：根元素，即html元素
>
> 2：float的值不为none
>
> 3：overflow的值不为visible
>
> 4：display的值为inline-block、table-cell、table-caption
>
> 5：position的值为absolute或者fixed

* BFC的作用

BFC是页面独立的一个容器，与外界的毫无关系。与不同容器的区别是：

（1）**可以阻止元素被浮动的元素覆盖**（可做两栏布局自适应）

![1](https://img-blog.csdnimg.cn/20190428161126130.png)

​       触发红色盒子的BFC后

![2](https://img-blog.csdnimg.cn/20190428161306268.png)

（2）**解决高度塌陷**：我们知道当浮动的盒子的父元素没有高度时，会出现高度塌陷现象。

​                                   ![3](https://img-blog.csdnimg.cn/20190428162141491.png)

​           父盒子触发BFC可以解决这个问题,根据布局规则的最后一条。

（3）**解决同一个BFC区域的垂直方向margin塌陷的问题** 

![4](https://img-blog.csdnimg.cn/20190428165048481.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQxMjU3MTI5,size_16,color_FFFFFF,t_70)

​           分为两个不同的BFC之后可以解决 



 

 

 

 