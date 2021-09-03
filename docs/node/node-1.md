---
title: 初识Node.js
date: 2019-5-02 16:00:54
categories: Node.js
---

JavaScript在客户端与服务端实现的功能不同，区别具体如下：

​	在客户端，JavaScript需要依赖浏览器提供的JavaScript引擎解析执行，浏览器提供了对DOM的解析，客户端不仅要应用语法，而且要会操作DOM和BOM。

​	在服务器端，JavaScript不依赖浏览器，而是由特定的运行环境提供的JavaScript引擎解析执行，例如Node.js，只需应用语法，不需要操作DOM和BOM。

JavaScript包括ECMAScript,DOM,BOM三个部分，具体如下：

1. ECMAScript是JavaScript的核心语法
2. DOM是HTML和XML的应用程序接口，用于控制文档的内容和结构。
3. BOM（浏览器对象模型）可以对浏览器窗口进行访问和操作。

## 1.Node.js的特点与优势

* 它是一个JavaScript运行环境，前后端语言一致。
* 依赖于Chrome v8引擎进行代码解析，这个引擎负责在非浏览器解析情况下解析代码
* 事件驱动（Event-Driven）
* 非阻塞I/O：服务器端会设计阻塞I/O的操作，Node.js使用事件回调的方式实现非阻塞I/O
* 轻量，可伸缩，适于实时数据交互应用
* 单进程，单线程：阻塞I/O一个线程只能处理一个任务，非阻塞I/O一个线程永远在处理任务，Node.js采用             单线程，利用事件驱动的异步编程模式，实现了非阻塞I/O。

## 2.第一个Node.js的web程序

命令行运行`node demo.js`,demo.js如下，打开浏览器输入127.0.0.1:3000,输出hello world

```js
//加载http模块
var http = require('http');
//创建http服务器
http.createServer(function(req,res){
	//响应结束
	res.end('hello world');
	//监听网址127.0.0.1 端口号3000
}).listen(3000,'127.0.0.1');
```

## 3.REPL运行环境（Read-Eval-Print-Loop）

打开终端，输入node即可进入REPL运行环境，可以解析JS代码，执行变量和函数的相关操作。

其实**Chrome中的Console控制台就是REPL环境**。

## 4.global对象和模块作用域

在Node.js中，默认声明的变量，函数都是属于当前文件模块，都是私有的，只有在当前模块作用域内可以使用，如果想在全局范围内为某个变量赋值，可以应用 全局对象global.

```js
var foo = 'bar';
global.foo = foo;
console.log('global:foo'+global.foo);
```

### 4.1 require(),exports,module.exports

在一个文件模块中直接给某个全局变量赋值，显得很突兀，可能会污染命名空间，造成耦合的问题，为了解决上述问题，exports是模块公开的接口，require()用于从外部获取一个模块的接口。

info.js:

```js
//向外开放变量name
exports.name = 'itcast';
//向外开放变量age
module.exports.age = '10';
//向外开放函数
module.exports.sayHello = function(){
    console.log('hello');
}
```

demo.js

```js
//加载模块
let myModule = require('./info');
console.log(myModule);
//输出模块中的变量值
console.log('name:'+myModule.name);
console.log('age:'+myModule.age);
//调用模块的方法
myModule.sayHello();
```

### 4.2 exports和module.exports的区别

exports是一个指向module.exports的引用，module.exports初始值为一个空对象{}，所以exports初始值也是{}，虽然exports和module.exports都可以向模块外开放变量和函数，但是使用上，**module.exports可以单独定义，返回数据类型，而exports只能返回一个object对象**。

例如：

test.js

```js
//定义一个数组
module.exports=['name','type','age'];
```

demo2-5.js

```js
//加载模块
let myModule = require('./test');
console.log(myModule);
//输出数组长度
console.log('length:'+myModule.length); 

//输出 结果
//[ 'name', 'type', 'age' ]
//length:3
```

修改test.js中的代码

```js
exports=['name','type','age'];

//最后输出
//{}
//length:undefined
```

可见使用exports直接定义数据，会切断exports与module.exports的联系，出现了找不到值的情况。

## 5.全局可用变量，函数和对象

即不需要进行模块加载，可以直接使用的，例如require()函数。

### 5.1 _dirname和 _filename变量

* _dirname表示当前文件所在的目录
*  _filename表示当前正在执行的脚本的文件名。（绝对路径）

```js
console.log('文件的目录是：'+__dirname);
console.log('文件的绝对路径是：'+__filename);
//输出
//文件的目录是：C:\Users\Jin\Desktop\前端学习\Node.js\chapter 02
//文件的绝对路径是：C:\Users\Jin\Desktop\前端学习\Node.js\chapter 02\demo2-6.js
```

### 5.2 全局函数

* setTimeout(cb,ms)：ms后执行cb
* clearTimeout()
* setInterval(cb,ms)：每ms后执行cb
* clearInterval()
* setImmediate(cb)：延迟调用cb函数，cb将在I/O事件回调之后，setTimeout和setInterval回调之前调用
* clearImmediate()

### 5.3 console对象

console是一个全局对象，除了console.log()函数外还提供了其他函数

* console.info
* console.error
* console.warn
* console.dir：用来对一个对象进行检查，以易于阅读和打印的格式显示
* console.time和console.timeEnd
* console.trace：当前执行代码在堆栈中的调用路径
* console.assert：判断某个表达式或变量是否为真（断言）

## 6 重写计算器模块

以add.js为例，定义加减乘除模块

```js
module.exports = function(x,y){
	return parseInt(x)+parseInt(y);
}
```

index.js：分别使用require加载4个功能模块，并使用exports向外开放这4个接口

```js
module.exports = {
    add:require('./add');
    //sub
    //mul
    //divide
}
```

testCal.js

```js
var cal = require('./index');
console.log(cal.add(1,2));//3
```

## 7. require()的模块加载规则

主要分为两类：文件模块和核心模块

1. 文件模块

```js
require('路径.扩展名');
require('/example.js');//当前目录
require('./example.js');
require('../example.js');//上一目录
```

2. 核心模块

核心模块包含了基本的API，保存在node.js源码的lib文件下，例如

* 全局对象
* 常用工具
* 事件机制
* 文件系统访问
* HTTP服务器与客户端

```js
require('模块标识');
const os = require('os');
console.log(os.cpus());
```

## 8. 模块的缓存

多次使用同一模块，Node.js只会加载一次，模块被缓存在require.cache中

foo.js:

```js
console.log('foo模块被加载了');
```

test.js:

```js
require('./foo');
require('./foo');
require('./foo');
require('./foo');
//只输出一次 foo模块被加载了，说明只加载了一次
```

在foo.js加入

```js
delete require.cache[module.filename];
//删除缓存后输出4次
```

