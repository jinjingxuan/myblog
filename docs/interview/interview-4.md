---
title: 面试题（四）
date: 2018-03-09 09:52:01
categories: 面试
---
# 面试题（四）
* 深拷贝与浅拷贝
* 什么是BFC，BFC的布局规则是什么，如何创建BFC
* 隐藏页面中某个元素的方法
* 说一下你对JS执行上下文和作用域链的理解
* 防抖函数，节流函数的作用与实现
* 什么是闭包，闭包的作用是什么
* 关于reduce函数
* 数组去重的方法
* 时间复杂度和空间复杂度分别对应计算机什么资源
* css画三角形和扇形

##  深拷贝与浅拷贝

* [深拷贝与浅拷贝](https://jinjingxuan.github.io/2018/09/27/JavaScript-%E6%B5%85%E6%8B%B7%E8%B4%9D%E4%B8%8E%E6%B7%B1%E6%8B%B7%E8%B4%9D/)

## 什么是BFC，BFC的布局规则是什么，如何创建BFC

* [盒子模型](https://www.jinjingxuan.com/2020/11/26/CSS-%E7%9B%92%E5%AD%90%E6%A8%A1%E5%9E%8B/)

## 隐藏页面中某个元素的方法

隐藏类型：

* 完全隐藏：元素从渲染树中消失，不占据空间
* 视觉上隐藏：屏幕中不可见，占据空间
* 语义上隐藏：读屏软件不可读，但正常占据空间

完全隐藏：

```js
1. display: none;
2. <div hidden></div>  hidden属性
```

视觉上隐藏：

```js
1.利用poisition和盒模型将元素移出可视区范围
position:absolute;
left:-9999px;

2.利用transform
（1）缩放：transform: scale(0);
（2）移动：transform：translateX(-9999px)
 (3) 旋转：transform: rotateY(90deg);
 
3.透明度
opacity: 0;

4.visibility: hidden;

5.层级覆盖， z-index 属性
z-index: -999;

6.clip-path 裁剪
clip-path: polygon(00,00,00,00);
```

语义上隐藏

```js
<div aria-hidden="true">
</div>
```
* display:none 关闭元素的布局，所以元素不被渲染
* visibility:hidden 隐藏元素，而不改变它们的布局
* opacity:0 使元素非常透明，但是用户依然可以和元素交互

##  说一下你对JS执行上下文栈和作用域链的理解

js执行上下文

> 执行上下文就是当前 JavaScript 代码被解析和执行时所在环境的抽象概念， JavaScript 中运行任何的代码都是在执行上下文中运行，上下文是在**执行阶段**才创建的
>
> 执行上下文类型分为：
> 
> 全局执行上下文 / 函数执行上下文 / eval执行上下文

作用域

> 作用域:控制着变量与函数的可见性和生命周期，**取决于代码定义的位置**。
>
> 作用域有两种工作模型：词法作用域和动态作用域，JS采用的是词法作用域工作模型，词法作用域意味着作用域是由书写代码时变量和函数声明的位置决定的。
>
> 分为：
>
> 按实际情况分：全局作用域 / 函数作用域 / 块级作用域  
>
> 按工作模型分：词法作用域 / 动态作用域

执行上下文栈

```js
/**
	首次运行JavaScript代码的时候,会创建一个全局执行的上下文并Push到当前的执行栈中，每当发生函数调用，引擎都会为该函数创建一个新的函数执行上下文并Push当前执行栈的栈顶。

当栈顶的函数运行完成后，其对应的函数执行上下文将会从执行栈中Pop出，上下文的控制权将移动到当前执行栈的下一个执行上下文。
*/

function fun3(){
    console.log('fun3')
}
function fun2(){
    fun3()
}
function fun1(){
    fun2()
}
fun1()

// 入栈：全局，f1,f2,f3
// 出栈：f3,f2,f1
```

作用域链

> 作用域链就是从当前作用域开始一层一层向上寻找某个变量，直到找到全局作用域还是没找到，就宣布放弃。这种一层一层的关系，就是作用域链。 

函数的阶段分为**函数建立阶段**和**函数执行阶段**

* 函数建立阶段：调用函数，还没有执行函数内部的代码

  * 创建执行上下文对象

  ```js
  fn.ExecutionContext = {
    variableObject: // 函数中的 arguments，局部成员
    scopeChains: // 作用域链
    this: {} // 当前函数内部的 this 指向
  }
  ```

* 函数执行阶段：把变量对象转换为活动对象

```js
fn.ExecutionContext = {
  activationObject: // 函数中的 arguments，局部成员
  scopeChains: // 作用域链
  this: {} // 当前函数内部的 this 指向
}
```

**尝试调试以下函数**

```js
function fn(a, b) {
  function inner() {
    console.log(a, b)
  }
  console.dir(inner)
}
console.dir(fn)
const f = fn(1, 2)
```

## 防抖函数，节流函数的作用与实现

* [手写代码整理](https://jinjingxuan.github.io/myblog/interview/code-1.html#%E9%98%B2%E6%8A%96)

## 什么是闭包，闭包的作用是什么

闭包是指有权访问另一个函数作用域中的变量的函数 

```js
//创建一个闭包
function foo(){
    var a=2;
    return function fn(){
        console.log(a)
    }
}
let func = foo()
func()//输出2
```

闭包的作用：

（1）访问另一个函数作用域中的变量

（2）私有化变量

```js
function privateVariable() {
    var value;
    this.setValue = function(value) {
        value= value;
    };
    this.getValue = function() {
        return value;
    };
}
var x = new privateVariable();
x.setValue("abcd");
console.log(x.value); //undefined
console.log(x.getValue ()); //abcd
```

 （3）模拟块级作用域

```js
for(var i=0;i<10;i++){
    (function(i){
        console.log(i)
    })(i)
}
```

## 关于reduce函数

> reduce() 方法接收一个函数作为累加器，数组中的每个值（从左到右）开始缩减，最终计算为一个值。对空数组是不会执行回调函数的。 

```js
//数组求和
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const sum = arr.reduce(function (prev, current) {
    return prev+current
}, 0)
console.log(sum) //55

//合并二维数组
var twoArr = [['mu','zi'],['dig','big'],['lucky','jiji']];
var oneArr = twoArr.reduce(function(total,currentValue){
  // console.log(total)
  return total.concat(currentValue);
})
console.log(oneArr);//["mu", "zi", "dig", "big", "lucky", "jiji"]
```

## 数组去重

（1）reduce + includes

```js
let arr = [1, 2, 2, 4, null, null].reduce((prev, current) => {
    return prev.includes(current) ? prev : prev.concat(current);
}, []);
```

（2）利用ES6的Set数据结构

> `set` 类似于数组，且成员值不重复都是唯一的，`set`本身是一个构造函数。 

```js
let arr = [1,2,2,3]
[...new Set(arr)]  //[1,2,3]
```

（3）for循环+splice

```js
for(var i=0;i<arr.length;i++){
    for(var j=i+1;j<arr.length;j++){
        if(arr[i]==arr[j]){
            arr.splice(j,1)
            j--
        }
    }
}
```

（4）利用indexOf

```js
var array = [];
for (var i = 0; i < arr.length; i++) {
    if (array .indexOf(arr[i]) === -1) {
            array .push(arr[i])
     }
}
```

（5）利用sort

```js
arr = arr.sort()
var array = []
for(var i=0;i<arr.length;i++){
    if(arr[i]!==arr[i-1]){
        array.push(arr[i])
    }
}
```

（6）利用includes

```js
var array = []
for(var i=0;i<arr.length;i++){
    if(!array.includes(arr[i])){
        array.push(arr[i])
    }
}
```

## 时间复杂度和空间复杂度分别对应计算机什么资源

> 时间复杂度对应的是cpu，cpu就是用来做运算的，每个CPU都有一套自己可以执行的专门的**指令集**，经过取指，解码，执行的过程构成cpu的一个基本周期，空间复杂度对应的是内存。

## css画三角形和扇形

```css
/*扇形*/
#box1 {
  width: 0;
  height: 0;
  border: 40px solid;
  border-color: transparent transparent red;
  border-radius: 50%;
}

/*三角形*/
#box2 {
  width: 0;
  height: 0;
  border: 40px solid;
  border-color: transparent transparent red;
}
```

