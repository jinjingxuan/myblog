---
title: Node.js网络编程
date: 2019-5-05 08:00:54
categories: Node.js
---

# 6.1 Node.js网络编程基础

## 6.1.1 IP地址和端口号

通过IP地址可以找到服务器设备，而端口号可以理解为在发送数据时定位到不同服务器应用程序的标识。

IP地址对于计算机是唯一的，一个端口号也只能被一个应用程序所占用。

## 6.1.2 套接字Socket简单模型

先了解一下TCP/IP协议，TCP（Transfer Control Protocol）传输控制协议是一种稳定可靠的传送方式，TCP负责发现传输的问题，一有问题就发出信号，要求重新传输，直到所有数据安全正确地传输到目的地为止。

Socket原意为孔或插座。在程序方面可理解为接口对象，在网络编程中通常称为套接字，常用于描述IP地址和端口等。Socket是支持TCP/IP的网络通信的基本操作单元。**简单理解，Socket就是对TCP/IP协议的封装，Socket本身并不是协议，而是一个调用接口**

Socket需要使用套接字地址来展开工作，套接字地址就是IP地址和端口号的组合，套接字服务与其他服务不同，不需要处理网络中的GET或POST请求，而是采用点对点传输数据方式。

## 6.1.3 Node.js名字的由来

Node.js诞生的目的就是为了更加高效的处理网络数据，因为使用它进行网络编程时不需要使用其他的服务器软件进行支持，Node.js本身就是一个服务器。在进行网络编程时，每一个进程构成网络应用中的一个结点，而Node就是结点的意思，最终web.js更名为Node.js。

# 6.2 Node.js中实现套接字服务

套接字服务由Net模块提供：

`let net = require('net');`

## 6.2.1 Net.Server对象

`let server = net.creatServer()`

当Server对象被创建后，在该服务器的生命周期中就存在了一些可触发的事件。

| 事件       | 描述                                  |
| ---------- | ------------------------------------- |
| listening  | 当服务器调用server.listen绑定后会触发 |
| connection | 当新连接创建后会被触发                |
| close      | 服务器关闭时会被触发                  |
| error      | 发生错误时触发                        |

```js
let net = require('net');
let server = net.createServer();
server.on('connection',function(){
    console.log('有客户端连接上来了');
});
server.on('listening',function () {
    console.log('服务器监听成功了，正在等待客户端连接');
});
server.listen(3000,'127.0.0.1');
```

然后启用Telnet客户端服务，命令行中输入：

> telnet 127.0.0.1 3000

就会连接成功。

## 6.2.2 Net.Socket对象

 Net.Socket实例实现了一Duplex（双工）流接口，提供了Writable和Readable所有功能，所以说它既是可读流也是可写流。

 Net.Socket对象同时在套接字服务器和客户端上创建，并且会允许数据在他们之间进行读取和写入，一旦Socket对象被创建，就提供了一些触发的事件。

| 事件    | 描述                      |
| ------- | ------------------------- |
| lookup  | 解析域名后，连接前触发    |
| connect | 成功建立socket连接时触发  |
| data    | 当收到数据时触发          |
| end     | 当socket另一点发送FIN包时 |
| timeout | socket空闲超时            |
| drain   | 写缓存为空的时候触发。    |
| error   | 发生错误。                |
| close   | socket关闭                |

1. 服务器向客户端发送消息

```js
let net = require('net');
let server = net.createServer();
server.on('connection',function(socket){
    console.log('有客户端连接上来了');
    console.log('客户端IP地址：'+socket.remoteAddress+'连接到了当前服务器');
    socket.write('hello');
});
server.on('listening',function () {
    console.log('服务器监听成功了，正在等待客户端连接');
});
server.listen(3000,'127.0.0.1');

//然后启用Telnet客户端服务，命令行中输入：
//telnet 127.0.0.1 3000

//服务端输出
//服务器监听成功了，正在等待客户端连接
//有客户端连接上来了
//客户端IP地址：127.0.0.1连接到了当前服务器

//客户端输出
//hello
```

2. 统计在线人数

```js
let net = require('net');
let server = net.createServer();
let count = 0;
server.on('connection',function(socket){
    count++;
    console.log('welcome,当前在线人数：'+count);
    socket.write('remoteAddress'+socket.remoteAddress+'\n');
    socket.write('remotePort'+socket.remotePort);
});
server.listen(3000,'127.0.0.1',function() {
    console.log('server listening at port 3000');
});

//然后启用两个Telnet客户端服务，命令行中输入：
//telnet 127.0.0.1 3000

//服务端输出
/*
server listening at port 3000
welcome,当前在线人数：1
welcome,当前在线人数：2
*/
```

3. 客户端与服务端双向通信

创建客户端`net.creatConnection()`执行完毕会返回一个socket对象

```js
//服务端
let net = require('net');
let server = net.createServer();
server.on('connection',function(socket){
    socket.on('data',function (data) {
        console.log(data.toString());
        socket.write('我吃的小豆包');
    });
});
server.listen(3000,'127.0.0.1',function() {
    console.log('server listening at port 3000');
});

//客户端
let net = require('net');
let client = net.createConnection({
    port:3000
});
client.on('connect',function () {
    console.log('客户端与服务器连接成功了');
    client.write('你吃了吗');
});
client.on('data',function (data) {
    console.log(data.toString());
});
```

# 6.3 Node.js进程管理

## 6.3.1 Process模块获取终端输入

如果需要在客户端输入信息发送到服务器，这样的功能就需要依赖Process模块来完成。

Process模块是一个无须使用require就可以访问的全局对象。

```js
process.stdin.on('data',function(data){
    console.log(data.toString().trim());//trim是去掉输入后按的空格
});
```

## 6.3.2 多人广播消息

服务端接收客户端消息，将客户端消息发送给其他客户端

```js
//服务端
let net = require('net');
let server = net.createServer();
//该数组用来封装所有客户端的scoket
let users = [];
server.on('connection',function (socket) {
    users.push(socket);
    socket.on('data',function (data) {
        data = data.toString().trim();
        users.forEach(function (client) {
            if(client !== socket){
                //不同客户端端口号不同
                client.write(client.remotePort+':'+data);
            }
        });
    });
    socket.on('error',function () {
        console.log('有客户端退出了');
    });
})
server.listen(3000,'127.0.0.1',function () {
    console.log('server listening at port 3000');
})

//客户端
let net = require('net');
//向服务端创建连接
let client = net.createConnection({
    port:3000,
    host:'127.0.0.1'
});
client.on('connect',function(){
    //通过当前进程的标准输入的data事件获取终端的输入
    process.stdin.on('data',function (data) {
        data = data.toString().trim();
        client.write(data);
    });
});
client.on('data',function (data) {
    console.log(data.toString());
});

//打开多个客户端，即可互相发送消息
```

