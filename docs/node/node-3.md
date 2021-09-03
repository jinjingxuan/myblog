---
title: Node.js异步资源和包资源管理
date: 2019-5-03 16:00:54
categories: Node.js
---

# 异步编程

JavaScript的执行环境是单线程的，单线程一次只能完成一个任务，如果有多个任务，就需要等待前面一个任务完成后，再执行后面的一个任务。常见的浏览器无响应就是某一段JS代码长时间运行造成的。

为解决单线程阻塞的问题，Node.js中加入了异步编程模块，保证了Node.js快速响应，充分利用CPU。

## 同步和异步

1. 同步：代码按照顺序依次执行

```js
console.log('起床');
console.log('背单词');
function eatBreakfast(){
    console.log('早餐吃完了');
}
eatBreakfast();
console.log('去上学');
```

2. 异步：

```js
console.log('起床');
console.log('背单词');
function eatBreakfast(){
    console.log('开始吃早餐了');
    //setTimeout是一个异步函数，不会阻塞后面代码的继续执行
    setTimeout(function(){
        console.log('早餐吃完了');
    },0);
}
eatBreakfast();
console.log('去上学');
//相当于边去学校，边吃早餐
//输出：起床，背单词，开始吃早餐了，去上学，早餐吃完了
```

## 回调函数

回调函数是指函数可以被传递到另一个函数中，然后被调用的形式，典型的应用就是异步函数的异常处理。

1. 同步代码中使用try...catch处理异常

```js
//同步代码处理异常
function parseJsonStrToObj(str){
    //用于从一个字符串中解析出json对象
    return JSON.parse(str);
}
//对于同步代码，可以使用try...catch来捕获异常
try{
    let obj = parseJsonStrToObj('foo');
    console.log(obj);
}catch (e) {
    console.log('转换失败了');
}

//输出：转换失败了
```

2. 异步代码无法使用try...catch处理异常

```js
//异步代码无法处理异常
function parseJsonStrToObj(str){
    setTimeout(function(){
            return JSON.parse(str);
    },0)
}
try{
    let obj = parseJsonStrToObj('foo');
    console.log(obj);
}catch (e) {
    console.log('转换失败了');
}

//最后会报错，说明异步代码无法处理异常
```

3. 使用回调函数接收异步代码的执行结果

```js
//try...catch写在异步代码中
function parseJsonStrToObj(str){
    setTimeout(function(){
        try{
            return JSON.parse(str);//有返回值，但是无法接收
        }catch (e) {
            console.log('转换失败了');
        }
    },0)
}
let obj = parseJsonStrToObj('foo');
console.log(obj);

//输出：undefined 转换失败了
```

根据此提出回调函数的设计，即当使用异步代码去做一件事时，不能预测这件事什么时候做完，其他的事情还在继续，这时可给异步代码准备一个包裹，当异步代码有了执行结果时，可以将结果放在这个包裹里，需要在哪里使用这个结果就从包裹取出。

回调函数设计的3个约定：

（1） 函数名通常为callback,在封装异步执行代码时，优先把callback作为函数最后一个参数出现

```js
function 函数名(arg1,arg2,callback){}
```

（2）把代码中出现的错误作为callback回调函数的第一个参数进行传递,返回结果作为第二个参数

```js
callback(err,result);
```

改写上面函数

```js
function parseJsonStrToObj(str,callback){
    setTimeout(function(){
        try{
            let obj = JSON.parse(str);
            callback(null,obj);
        }catch (e) {
            callback(e,null);
        }
    },0)
}
parseJsonStrToObj('foo',function(err,result){
    if(err){
        return console.log('转换失败了');
    }
    console.log('转换成功：'+result);
})
//输出，转换失败了
```

## 事件驱动

当异步函数执行时，不确定何时执行完毕，回调函数会被压入到一个事件循环队列，然后往下执行其他代码，直到异步函数执行完成后，才会开始处理事件循环，调用相应的回调函数。事件循环队列为先进先出队列，按顺序执行。

# Node.js的包和NPM

Node.js根据CommonJS规范实现了包机制，CommomJS API定义很多用于非浏览器的应该使用的普通应用程序，Node.js就是一个非浏览器的应用，CommonJS是一种规范，Node.js是这种规范的部分实现。

## 包的概念

包和模块没有本质的区别，包是在模块的基础上更进一步的组织JavaSript代码的目录。

包目录结构：

| 规范的包结构 | 作用                                            |
| ------------ | ----------------------------------------------- |
| package.json | 顶层目录的包描述文件，说明文件（JSON字符串描述) |
| bin          | 可执行的二进制文件                              |
| lib          | 存放JS文件的目录                                |
| doc          | 文档                                            |
| test         | 存放单元测试用例的代码                          |

## NPM的概念

全称为Node.js Package Manage,有两种含义，一种是Node.js的开放模块登记和管理系统，是一个NPM网站:`www.npmjs.com`,里面所有的包都是通过Node.js实现的。

另一种含义是Node.js的包管理工具，命令行下的软件，比如，npm install 包名

NPM是随Node.js一同安装的。

## 基本应用

> npm install 包名

安装后，Node.js会自动在项目当前根目录下创建一个目录，名为node_modules,然后把第三方包自动放在该目录下。node_modules就是专门用于放置第三方包的。

## 包模块加载规则

（1）加载时，默认为核心模块，若不是，则会去node_modules目录下寻找。

（2）如果找到了，Node.js将会找到该目录下的package.json文件获取main属性值，根据main属性指定的路径值进行加载。

