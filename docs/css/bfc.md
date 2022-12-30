# BFC

## 什么是BFC，BFC的布局规则是什么，如何创建BFC

* BFC的定义:

>  BFC（Block formatting context ）“块级格式上下文”。 是用于布局块级盒子的一块渲染区域。并且与这个区域的外部毫无关系。

* BFC的布局规则

> BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。
>
> 内部的Box会在垂直方向，一个接一个地放置。
>
> Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠。
>
> BFC的区域不会与float box重叠。
>
> 计算BFC的高度时，浮动元素也参与计算。

* 触发BFC的条件:

满足下列条件之一就可以触发BFC

> 1：根元素，即 `<html>`
>
> 2：浮动元素，float 的值不为 none
>
> 3：overflow 的值不为 visible
>
> 4：display 的值为 inline-block、table-cell、table-caption
>
> 5：position 的值为 absolute 或者 fixed

* BFC的作用

| 作用               | 原理                                       |
| ------------------ | ------------------------------------------ |
| 外边距合并问题     | 同一个BFC的两个相邻Box的margin会发生重叠。 |
| 浮动的高度塌陷问题 | 计算BFC的高度时，浮动元素也参与计算。      |
| 双列布局           | BFC 不得与任何浮动的外边距重叠。           |

（1）**可以阻止元素被浮动的元素覆盖，可做两栏自适应布局**（BFC的区域不会与float box重叠。）

![1](https://img-blog.csdnimg.cn/20190428161126130.png)

​       触发红色盒子的BFC后

![2](https://img-blog.csdnimg.cn/20190428161306268.png)

（2）**解决高度塌陷**：我们知道当浮动的盒子的父元素没有高度时，会出现高度塌陷现象。

​                                   ![3](https://img-blog.csdnimg.cn/20190428162141491.png)

​           父盒子触发BFC可以解决这个问题（计算BFC的高度时，浮动元素也参与计算）。

（3）**解决同一个BFC区域的垂直方向margin塌陷的问题** 

![4](https://img-blog.csdnimg.cn/20190428165048481.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQxMjU3MTI5,size_16,color_FFFFFF,t_70)

​           分为两个不同的BFC之后可以解决 （属于同一个BFC的两个相邻Box的margin会发生重叠）



 

 

 

 