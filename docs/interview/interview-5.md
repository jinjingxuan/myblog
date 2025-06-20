---
title: 面试题（五）
date: 2018-08-03 09:21:01
categories: 面试
---
# 面试题（五）
* 什么是事件冒泡，事件捕获，事件委托
* 重绘和回流
* requestAnimationFrame 和 setTimeout
* 介绍一下前端路由
* for in 和 for of
* 场景题：参数拼接
* css可继承的属性
* git有几种状态
* 简述 new 一个对象的过程
* 数据属性与访问器属性

## 什么是事件冒泡，事件捕获，事件委托

- **事件冒泡**

> 当给父子元素的同一事件绑定方法的时候，触发子元素身上的事件，执行完毕之后，也会触发父级元素相同的事件，这种机制叫事件冒泡

- 事件捕获

> 给父子元素用绑定同一事件时，当触发子元素身上的事件时，先触发父元素，然后在传递给子元素，这种传播机制叫事件捕获；

实际操作中，我们可以通过 element.addEventListener() 设置一个元素的事件模型为冒泡事件或者捕获事件。
先来看一下 addEventListener 函数的语法：

```js
element.addEventListener(type, listener, useCapture)
```

- type
  监听事件类型的字符串
- listener
  事件监听回调函数，即事件触发后要处理的函数
- useCapture
  默认值false，表示事件冒泡；设为true时，表示事件捕获

```html
       <div id="box1">
            <div id="box2">
                <div id="box3"></div>
            </div>
        </div>

        <script>
            function sayBox3() {
                console.log('你点了最里面的box');
            }
            function sayBox2() {
                console.log('你点了最中间的box');
            }
            function sayBox1() {
                console.log('你点了最外面的box');
            }
            // 事件监听，第三个参数是布尔值，默认false，false是事件冒泡，true是事件捕获
            document.getElementById('box3').addEventListener('click', sayBox3, false);
            document.getElementById('box2').addEventListener('click', sayBox2, false);
            document.getElementById('box1').addEventListener('click', sayBox1, false);

        </script>
```

* 事件委托

事件委托就是只指定一个事件处理程序，就可以管理某一类型的所有事件。

**为什么要用事件委托**

一般来说，dom需要有事件处理程序，我们都会直接给它设事件处理程序就好了，那如果是很多的dom需要添加事件处理呢？比如我们有100个li，每个li都有相同的click点击事件，可能我们会用for循环的方法，来遍历所有的li，然后给它们添加事件，那这么做会存在什么影响呢？

在JavaScript中，添加到页面上的事件处理程序数量将直接关系到页面的整体运行性能，因为需要不断的与dom节点进行交互，访问dom的次数越多，引起浏览器重绘与重排的次数也就越多，就会延长整个页面的交互就绪时间，这就是为什么性能优化的主要思想之一就是减少DOM操作的原因；如果要用事件委托，就会将所有的操作放到js程序里面，与dom的操作就只需要交互一次，这样就能大大的减少与dom的交互次数，提高性能；

每个函数都是一个对象，是对象就会占用内存，对象越多，内存占用率就越大，自然性能就越差了，比如上面的100个li，就要占用100个内存空间，如果用事件委托，那么我们就可以只对它的父级（如果只有一个父级）这一个对象进行操作，这样我们就需要一个内存空间就够了，是不是省了很多，自然性能就会更好。

如何实现呢？

`e.target`可以用来实现[事件委托](https://www.jianshu.com/p/ac47521806d2)，该原理是通过事件冒泡（或者事件捕获）给父元素添加事件监听，e.target指向引发触发事件的元素，如例子中，`e.target`指向用户点击的`li`，由于事件冒泡，`li`的点击事件冒泡到了`ul`上，通过给`ul`添加监听事件而达到了给每一个`li`添加监听事件的效果，而`e.currentTarget`指向的是给绑定事件监听的那个对象，即`ul`，从这里可以发现，`e.currentTarget===this`返回`true`，而`e.target===this`返回`false`。`e.currenttarget`和`e.target`是不相等的。

```html
<ul id="item-list">
	<li>item1</li>
	<li>item2</li>
	<li>item3</li>
	<li>item4</li>
</ul>

<script>
var items = document.getElementById('item-list');
  
//事件捕获实现事件代理
items.addEventListener('click', (e) => {console.log('捕获：click ',e.target.innerHTML)}, true);
  
//事件冒泡实现事件代理
items.addEventListener('click', (e) => {console.log('冒泡：click ',e.target.innerHTML)}, false);
</script>
```

### 如何阻止冒泡和默认事件

什么是冒泡事件？如在一个按钮是绑定一个”click”事件，那么”click”事件会依次在它的父级元素中被触发

```html
    <div id='div'>
        <ul>
            <li>test</li>
        </ul>
    </div>
    <script>
        let div = document.getElementById('div')
        let ul = document.getElementsByTagName('ul')[0]
        let li = document.getElementsByTagName('li')[0]

        div.onclick = function(){
            alert("div")
        }
        ul.onclick = function(){
            alert("ul")
        }
        li.onclick = function(){
            // window.event? window.event.cancelBubble = true : e.stopPropagation();
            alert("li")
        }
    </script>
```

阻止冒泡

**w3c的方法是e.stopPropagation()，IE则是使用e.cancelBubble = true** ，兼容性写法如上，只会输出li

阻止默认事件

**w3c的方法是e.preventDefault()，IE则是使用window.event.returnValue = false;**

javascript的return false只会阻止默认行为

```html
<a href="http://caibaojian.com/" id="testA" >caibaojian.com</a>
    <script>
        var a = document.getElementById("testA");
            a.onclick =function(e){
                if(e.preventDefault){
                    e.preventDefault();
                }else{
                    window.event.returnValue == false;
                }
        }
 </script>
```

* **DOM事件流有3个阶段：捕获阶段，目标阶段，冒泡阶段；三个阶段的顺序为：捕获阶段——目标阶段——冒泡阶段，这个顺序是固定的，我们上面实现的事件捕获或者事件冒泡，只是在这三个阶段的某个阶段去执行而已**
* **当某个类型的`事件A`发生后，DOM会以--从Window对象开始依次降级，找到目标DOM对象，再从目标对象依次升级至Window--这样一个顺序，寻找各级的该事件(事件A)的事件监听。**  

## 重绘和回流

在页面加载时，浏览器把获取到的HTML代码解析成1个DOM树。 DOM Tree 和样式结构体组合后构建render tree，render tree中每个NODE都有自己的style，而且render tree不包含隐藏的节点，因为这些节点不会用于呈现，而且不会影响呈现的。

* [图示](https://segmentfault.com/img/bVbaC2e?w=624&h=289)

### 什么是回流

当render tree中的一部分(或全部)因为元素的规模尺寸，布局，隐藏等改变而需要重新构建。这就称为回流(reflow)。每个页面至少需要一次回流，就是在页面第一次加载的时候，这时候是一定会发生回流的，因为要构建render tree。在回流的时候，浏览器会使渲染树中受到影响的部分失效，并重新构造这部分渲染树，完成回流后，浏览器会重新绘制受影响的部分到屏幕中，该过程成为重绘。

### 什么是重绘

当render tree中的一些元素需要更新属性，而这些属性只是影响元素的外观，风格，而不会影响布局的，比如background-color。则就叫称为重绘。

### 区别：

- 回流必将引起重绘，而重绘不一定会引起回流。比如：只有颜色改变的时候就只会发生重绘而不会引起回流
- 当页面布局和几何属性改变时就需要回流。比如：添加或者删除可见的DOM元素，元素位置改变，元素尺寸改变——边距、填充、边框、宽度和高度，内容改变

### 浏览器的优化机制

由于每次回流都会造成额外的计算消耗，因此大多数浏览器都会通过队列化修改并批量执行来优化回流过程。浏览器会将修改操作放入到队列里，直到过了一段时间或者操作达到了一个阈值，才清空队列。

### 如何减少回流，重绘

- 直接避免：采用transform,opacity可以直接跳过主线程，用compositer线程完成
- 合并多次对DOM和样式的修改
- 将复杂的元素绝对定位，脱离文档流，否则回流的代价很高。

* [浏览器渲染相关](https://www.jinjingxuan.com/2020/11/23/%E6%B5%8F%E8%A7%88%E5%99%A8-%E6%B5%8F%E8%A7%88%E5%99%A8%E6%B8%B2%E6%9F%93%E7%9B%B8%E5%85%B3/)
* [字节前端提前批面试题：触发了几次回流几次重绘](https://juejin.cn/post/6854573209791135757)

## requestAnimationFrame 和 setTimeout

### （1）seTimeout实现动画：

利用seTimeout实现的动画在某些低端机上会出现卡顿、抖动的现象

　　**原因一**、setTimeout的执行时间并不是确定的。当调用 setTimeout(fn, 0) 时：fn 会被推入宏任务队列。但当前执行栈（同步代码）必须先完全清空。清空后，引擎会先处理所有微任务（如 Promise.then 的回调）。微任务队列清空后，才会从宏任务队列中取出 fn 执行。因此，即使 setTimeout 的延迟设为 0，它仍需等待当前代码执行完毕 + 所有微任务执行完毕，导致实际执行时间稍晚。

　　**原因二**、刷新频率受屏幕分辨率和屏幕尺寸的影响，因此不同设备的屏幕刷新频率可能会不同，而 setTimeout只能设置一个固定的时间间隔，这个时间不一定和屏幕的刷新时间相同。

　　上两种情况都会导致setTimeout的执行步调和屏幕的刷新步调不一致，从而引起丢帧现象。

**setTimeout的执行只是在内存中对图像属性进行改变，这个变化必须要等到屏幕下次刷新时才会被更新到屏幕上。如果两者的步调不一致，就可能会导致中间某一帧的操作被跨越过去，而直接更新下一帧的图像。**

### （2）**requestAnimationFrame实现动画：**

 requestAnimationFrame最大的优势是由系统来决定回调函数的执行时机。

　　如果屏幕刷新率是60Hz,那么回调函数就每16.7ms被执行一次，如果刷新率是75Hz，那么这个时间间隔就变成了1000/75=13.3ms，换句话说就是，requestAnimationFrame的步伐跟着系统的刷新步伐走。它能保证回调函数在屏幕每一次的刷新间隔中只被执行一次，这样就不会引起丢帧现象，也不会导致动画出现卡顿的问题。

js

```js
var num = 0;
animation = null;

function fn(){
    console.log( num++ );
    animation = requestAnimationFrame(fn);//异步
}
fn();

document.onclick = function(){
    cancelAnimation( animation );
}
```

## 介绍一下前端路由

* [history模式和hash模式](https://www.jinjingxuan.com/2020/09/11/%E5%89%8D%E7%AB%AF%E8%B7%AF%E7%94%B1-history%E6%A8%A1%E5%BC%8F%E5%92%8Chash%E6%A8%A1%E5%BC%8F/)

## for in 和 for of

 最直接的区别是：

* [`for...in`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...in) 语句以任意顺序迭代对象的[可枚举属性](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Enumerability_and_ownership_of_properties)。
* `for...of` 语句遍历[可迭代对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Iterators_and_Generators#Iterables)定义要迭代的数据。
  * 包括 [`Array`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Array)，[`Map`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Map)，[`Set`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set)，[`String`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/String)，[`TypedArray`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray)，[arguments](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions_and_function_scope/arguments) 对象等等

除此之外，对于for in的缺点

1. 索引是字符串型的数字，因而不能直接进行几何运算
2. 遍历顺序可能不是实际的内部顺序
3. for in会遍历数组所有的可枚举属性，包括原型。例如的原型方法method和name属性

> 此外，`for ... in`是为遍历对象属性而构建的，不建议与数组一起使用，数组可以用`Array.prototype.forEach()`和`for ... of`

```js
arr = [1,2,3,4]
for(let i in arr){
    console.log(i + 1)
}
// 输出
// 01
// 11
// 21
// 31
```

相对于for of的缺点：

```js
Array.prototype.method=function(){}
var myArray=[1,2,4];
myArray.name="数组";

for (var index in myArray)
    console.log(myArray[index]);    //0,1,2,method,name

for (var value of myArray) 
    console.log(value);    //1,2,4

var obj = {
    a:1,
    b:2
}
for(var i in obj){
    console.log(obj[i])   //1,2
}
for(var j of obj){
    console.log(j)        //报错obj[Symbol.iterator] is not a function
}
```

### 迭代器

当我们用for…of遍历对象时

```js
const obj = { foo: 123, bar: 456 }

for(const item of obj) {
    console.log(item)
}
// 报错 obj is not iterable
```

Array,Set,Map都有Iterator属性，所以可以用for…of遍历

```js
const arr = [1, 2, 3]
arr[Symbol.iterator]()

// Array Iterator {} 其中还有next方法

const iterator = arr[Symbol.iterator]()
iterator.next() // {value: 1, done: false}
iterator.next() // {value: 2, done: false}
iterator.next() // {value: 3, done: false}
iterator.next() // {value: undefined, done: true}
```

for..of其实就是去调用iterator接口

```js
// 迭代器模式

// 场景：协同开发一个任务清单

// a的代码
const todos = {
    life: ['吃饭', '睡觉', '打豆豆'],
    learn: ['语文', '数学', '外语'],
    work: ['喝茶']
}

// b的代码,需要知道对象结构
for (const item of todos.life) {
    console.log(item)
}
for (const item of todos.learn) {
    console.log(item)
}
for (const item of todos.work) {
    console.log(item)
}

// 这时如果我在a代码的todos对象中加一个接口
each: function (callback) {
    const all = [].concat(this.life, this.learn, this.work)
    for(const item of all) {
        callback(item)
    }
}

// b中就可以这样调用
todo.each(item => console.log(item))
```

迭代器实现：对外提供统一遍历接口

```js
const todos = {
    life: ['吃饭', '睡觉', '打豆豆'],
    learn: ['语文', '数学', '外语'],
    work: ['喝茶'],

    [Symbol.iterator]: function () {
        const all = [...this.life, ...this.learn, ...this.work]
        let index = 0
        return {
            next: function () {
                return {
                    value: all[index]
                    done: index++ >= all.length
                }
            }
        }
    }
}

for(const item of todos) {
    console.log(item)
}
```

生成器实现迭代器

```js
const todos = {
    life: ['吃饭', '睡觉', '打豆豆'],
    learn: ['语文', '数学', '外语'],
    work: ['喝茶'],

    [Symbol.iterator]: function * () {
        const all = [...this.life, ...this.learn, ...this.work]
        for(const item of all) {
            yield item
        }
    }
}

for(const item of todos) {
    console.log(item)
}
```

## 场景题：参数拼接

- 如何保证有这个参数时拼接，没有的时候不拼接呢

```js
    let options = {
        'name': this.name,
        'age': this.age,
        'sex': this.sex
      }
      let paramsurl = ''
      for(const key in options) {
        const value = options[key]
        value &&
          (paramsurl += paramsurl ? `&${key}=${value}` : `${key}=${value}`)
      }
```

## css可继承的属性

* 字体系列属性

> font-family：字体系列
>
> font-weight：字体的粗细
>
> font-size：字体的大小
>
> font-style：字体的风格

* 文本系列属性

> text-indent：文本缩进
>
> text-align：文本水平对齐
>
> line-height：行高
>
> word-spacing：单词之间的间距
>
> letter-spacing：中文或者字母之间的间距
>
> text-transform：控制文本大小写（就是uppercase、lowercase、capitalize这三个）
>
> color：文本颜色

* 元素可见性

> visibility：控制元素显示隐藏　　

* 列表布局属性

> list-style：列表风格，包括list-style-type、list-style-image等

* 光标属性

> cursor：光标显示为何种形态

## git有几种状态

Git 有三种状态，你的文件可能处于其中之一：

- **已提交（committed）**：数据已经安全的保存在本地数据库中。
- **已修改（modified）**：已修改表示修改了文件，但还没保存到数据库中。
- **已暂存（staged）**：表示对一个已修改文件的当前版本做了标记，使之包含在下次提交的快照中。

由此引入 Git 项目的三个工作区域的概念：

- **Git 仓库(.git directoty)**
- **工作目录(Working Directory)**
- **暂存区域(Staging Area)**

#### 基本的 Git 工作流程如下：

- 在工作目录中修改文件。
- 暂存文件，将文件的快照放入暂存区域。
- 提交更新，找到暂存区域的文件，将快照永久性存储到 Git 仓库目录

****

- Workspace：工作区
- Index / Stage：暂存区
- Repository：仓库区（或本地仓库）
- Remote：远程仓库

## 简述 new 一个对象的过程

简述new一个对象的过程：

> 创造一个新的空对象
> 新对象的_proto_指向构造函数的原型对象
> 构造函数的this指向正在创建的新对象，并执行构造函数的代码，向新对象中添加属性和方法。
> 返回新对象地址

```js
        function book(name,value){
            this.name = name
            this.value = value
        }

        let book1 = new book("abc","100")
        console.log(book1)

        function myNew(constructor,...args){
            let obj = new Object()
            constructor.call(obj,...args)
            obj.__proto__ = constructor.prototype
            return obj
        }
        let book2 = myNew(book,"def","200")
        console.log(book2)

        console.log(book2 instanceof book) //true
```

### 一道面试题

```js
function ClassA()
{
    this.name = 'classA'
}
const classA = new ClassA ()
ClassA.prototype =
classA.__proto__ =
classA instanceof ClassA
```

* new 出来的实例 this 指向哪 	(新实例)
* 怎么修改 new 出来的 this 的指向（return一个新对象） 		
* ClassA.prototype == classA.proto
* 原型链讲一下 	
* instanceof 什么时候返回 true，什么时候返回 false 	
* 怎么让 classA instanceof ClassA 返回 false  ( 改变ClassA.prototype或classA.proto)

## 数据属性与访问器属性

首先明确，这两个概念是针对数据来定义的。

#### 数据属性

数据属性（property）用于实现JavaScript引擎，是属性(property)的内部值，它包含一个数据值的位置。有如下4种行为特性。

- [[Configurable]]：能否被delete删除属性重新定义
- [[Enumerable]]：能否被for-in枚举
- [[Writable]]：能否修改属性值
- [[Value]]：数据的数据值

```js
let person = {}
Object.defineProperty(person,"name",{
    writable:false   //不可修改属性
    value:"abc"
})

console.log(person.name) //abc
person.name = bcd
console.log(person.name) //abc
```

#### 访问器属性

访问器属性主要由setter和getter函数组成，包含如下4个特性：

- [[Configurable]]：能否被delete删除属性重新定义。默认值：true
- [[Enumerable]]：能否被for-in枚举。默认值：true
- [[Get]]：读取属性值。默认值：undefined
- [[Set]]：写入属性值。默认值：undefined

```js
let book = {
    _year:2004, //_year前面的下划线是一种常用的记号，用于表示只能通过对象方法访问的属性。
    edition:1
}
Object.defineProperty(book,"year",{
    get:function(){
        return this._year
    },
    set:function(newValue){
        if(newValue>2004){
            this._year = newValue
            this.edition += newValue-2004
        }
    }
})

book.year = 2005
console.log(book.edition)
```

其实`_year`和`year`是两个属性，`_year`是数据属性，`year`是访问器属性，`_year`为内部使用的，`year`为外部使用的。

如果都改为year，调用book.year会报错，因为这句话既可以输出数据属性，也可以调用访问器属性，产生冲突。