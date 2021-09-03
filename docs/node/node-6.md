---
title: Node.js中处理数据I/O
date: 2019-5-05 16:00:54
categories: Node.js
---

Node.js中提供了处理文件和网络I/O的功能，因此需要处理大量的二进制数据。在Node.js中，Buffer缓冲区和Stream文件流对二进制数据的处理提供了很好的支持。

# 5.1 Buffer缓冲区

Buffer类是随Node.js内核一起发布的核心库，用于支持I/O操作中移动的数据处理。

## 5.1.2 Buffer的构造函数

Node.js中的Buffer缓冲区模块，支持开发者在缓冲区结构中创建，读取，写入和操作二进制数据，该模块是全局性的，所以在使用时不需要require（）函数来加载。

1. 传入字节

```js
var buf = new Buffer(size);
```

<!--more-->

2. 传入数组

```js
var buf = new Buffer([10,20,30,40,50]);
```

3. 传入字符串和编码

```js
var buf = new Buffer("hello","utf-8");
```

Buffer同样支持以下编码：

* ascii：7位ASCII字符
* utf16le：两个字节，16位小端字节序
* usc2：两个字节，以小尾字节序编码的Unicode字符
* base64：用于传输8字节代码的编码方式之一
* hex：Hex字符串编码

## 5.1.3 写入缓冲区

`buf.write(string,offset,length,encoding) //字符串，索引值，字节数，编码`

```js
var buf = new Buffer(5);
console.log(buf.length);
buf.write('a');
console.log(buf);
//写入b时需要在第二个参数传入缓冲区开始写入的索引值
buf.write('b',1,1,'ascii');
console.log(buf);

//输出
//5
//<Buffer 61 00 00 00 00>
//<Buffer 61 62 00 00 00>
```

## 5.1.4 从缓冲区读取数据

`buf.toString(encoding,start,end)`

```js
var buf = new Buffer(26);
for(let i = 0; i < 26 ; i++){
    buf[i] = i + 97;
}
//输出全部
console.log(buf.toString('ascii'));
//输出前5个
console.log(buf.toString('ascii',0,5));

//输出
//abcdefghijklmnopqrstuvwxyz
//abcde
```

## 5.1.5拼接缓冲区

```js
var buf = new Buffer('世上无难事');
var buf1 = new Buffer('只怕有心人');
var buf2 = Buffer.concat([buf,buf1]);
console.log(buf2.toString());
//输出：世上无难事只怕有心人
```

# 5.2 Stream文件流

由于Buffer缓冲区限制在1GB，超过1GB的文件无法直接完成读写操作，在读写大文件时，如果读写资源一直持续不停止，Node.js将无法继续其他工作，为此Node.js中提供了Stream文件流模块。

## 5.2.1 文件流的概念

例如复制文件的过程，文件流的概念就是文件A中数据以流动的方式通过数据流管道，然后进入到文件B中，采用”读一部分，写一部分“的方式，就像看视频，下一点播一点。

在Node.js中，文件流的操作由Stream模块提供，Stream模块是一个抽象接口，Node.js中还有很多对象实现了这个接口，有4种流类型：

* Readable: 可读流
* Writeable：可写流
* Duplex：可读可写流
* Transform：变换流（操作被写入数据，然后读出结果）

Node.js中的I/O是异步的，因此对磁盘和网络的读/写需要通过回调函数来读取数据，而回调函数需要通过事件来触发，所有的Stream对象都是EventEmitter(时间触发器)的实例。

| 事件   | 说明                               |
| ------ | ---------------------------------- |
| data   | 当有数据可读时触发                 |
| end    | 没有更多的数据可读时触发           |
| error  | 在接收和写入过程中发生错误时触发   |
| finish | 所有数据都已被写入到低层系统时触发 |

## 5.2.2 Node.js的可读流和可写流

1. 可读流

使用文件流进行文件复制，首先需要创建一个可读流，可读流可以让用户在源文件中分块读取文件中的数据，然后再从可读流中读取数据。

`fs.createReadStream()`

由于流是基于EventEmitter的，从流读取数据最好的方法是监听数据事件（data event），并附加一个回调函数，返回数据，这个操作是循环进制的，一直到读取完毕。在读取错误或读取完毕时触发error或end事件。

```js
let fs= require("fs");
let total = "";
//创建可读流
let readableStream = fs.createReadStream('input.txt');//此时流为静止状态
//设置编码为utf-8
readableStream.setEncoding('UTF8');
//处理流事件
readableStream.on('data',function (chunk) {//附加回调函数，流开始流动
    total += chunk;
});
readableStream.on('end',function () {
    console.log(total);
});
readableStream.on('error',function (err) {
    console.log(err.stack);
});
console.log("程序执行完毕");

//输出：程序执行完毕
//input.txt中的内容
```

2. 可写流

`fs.createWriteStream()`

```js
let fs= require("fs");
let total = "";
//创建可读流
let readableStream = fs.createReadStream('input.txt');
//创建可写流
let writableStream = fs.createWriteStream('output.txt');
//设置编码为utf-8
readableStream.setEncoding('UTF8');
readableStream.on('data',function (chunk) {
    writableStream.write(chunk);
});
readableStream.on('error',function (err) {
    console.log(err.stack);
});
readableStream.on('end',function () {
    writableStream.end();//将剩下的数据全部写入
});
writableStream.on('error',function (err) {
    console.log(err.stack);
});
```

## 5.2.3使用pipe()处理大文件

在使用大文件复制的案例中，通过可读流的chunk参数来传递数据，如果把数据比作是水，chunk相当于盆，使用盆来完成水的传递。可读流中还有一个函数叫做pipe()，这个函数是一个很高效的文件处理方式，简化复制文件的操作，“把盆换成了管子”。

```js
let fs = require('fs');
let srcPath = '';
let distPath = '';
let readableStream = fs.createReadStream(srcPath);
let writableStream = fs.createWriteStream(distPath);
//可以通过使用可读流函数pipe()接入到可写流中
if(readableStream.pipe(writableStream)){
    console.log('复制成功');
}else{
    console.log('复制失败');
}
```

# 小结

数据与文件的处理是服务器端编程与客户端编程的本质区别所在。