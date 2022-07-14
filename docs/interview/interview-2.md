---
title: 面试题（二）
date: 2018-08-03 09:21:01
categories: 面试
---
# 面试题（二）
* 使用正则判断邮箱是否合法
* Cooike,sessionStorge,localStorge的区别
* http 和 https
* 怎么解决跨域问题
* 输入域名到展示页面发生了什么
* 常见的状态码
* get与post的区别
* 垃圾回收机制（GC算法）
* JS隐式转换与显示转换
* 对象的键支持什么类型

## 使用正则判断邮箱是否合法

```js
const pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
//字符+@+字符+.+字母
pattern.test(str) // true or false
```

> 正则基本知识

```js
//1.横向模糊匹配,一个正则可匹配的字符串的长度不是固定的
//比如/ab{2,5}c/表示匹配这样一个字符串：第一个字符是“a”，接下来是2到5个字符“b”，最后是字符“c”
var regex = /ab{2,5}c/g;
var string = "abc abbc abbbc abbbbc abbbbbc abbbbbbc";
console.log( string.match(regex) ); 
// => ["abbc", "abbbc", "abbbbc", "abbbbbc"]

//2.纵向模糊匹配，一个正则匹配的字符串，具体到某一位字符时，它可以不是某个确定的字符
//比如/a[123]b/可以匹配如下三种字符串："a1b"、"a2b"、"a3b"。测试如下：
var regex = /a[123]b/g;
var string = "a0b a1b a2b a3b a4b";
console.log( string.match(regex) ); 
// => ["a1b", "a2b", "a3b"]

//3.范围表示法，比如[123456abcdefGHIJKLM]，可以写成[1-6a-fG-M]
//要匹配“a”、“-”、“z”这三者中任意一个字符，不能写成[a-z]，可以写成如下的方式：[-az]或[az-]或[a\-z]

//4.排除字符组
var regex = = /[^abc]/

//5.常见简写
/*
\d就是[0-9]。表示是一位数字。记忆方式：其英文是digit（数字）。
\D就是[^0-9]。表示除数字外的任意字符。
\w就是[0-9a-zA-Z_]。表示数字、大小写字母和下划线。记忆方式：w是word的简写，也称单词字符。
\W是[^0-9a-zA-Z_]。非单词字符。
\s是[ \t\v\n\r\f]。表示空白符，包括空格、水平制表符、垂直制表符、换行符、回车符、换页符。记忆方式：s是space character的首字母。
\S是[^ \t\v\n\r\f]。 非空白符。
.通配符，表示几乎任意字符。
*/

//6.多选分支
var regex = /good|nice/g;
var string = "good idea, nice try.";
console.log( string.match(regex) ); 
// => ["good", "nice"]

//7. ^代表开头，$代表结尾
```

## Cooike,sessionStorge,localStorge的区别

> Cooike始终在同源的HTTP请求中携带，会在浏览器和服务器之间传递。
> sessionStorge和localStorge不会发送给服务器，仅在本地保存
> Cooike不能超过4k，session和local一般小于5M
> localStorge存储的是持久数据，浏览器关闭不丢失。SessionStorge在关闭窗口后会自动删除。

## http 和 https

> https并非应用层的一种新协议，只是http通信接口部分用ssl/tls协议代替而已。
> SSL和TLS都是加密协议
> 通常http直接和tcp通信，当使用ssl时则演变成先和ssl通信，再由ssl和tcp通信。
> 所谓https，其实就是身披ssl协议这层外壳的http。（回忆一下osi7层,TCP/IP4层，我们学的是5层）
>
> SSL协议采用的是非对称加密算法，客户端先向服务器端索要公钥，然后用公钥加密信息，服务器收到密文后，用自己的私钥解密.
>
> RSA算法：两个大素数p,q，n=pq,f(n)=(p-1)(q-1),1<b<f(n),a=b^-1modf(n),公钥n,b,私钥p,q,a
>
> 证书，顾名思义，就是证明的文件。例如浏览器和 tlanyan.me 服务器通信，浏览器怎么知道对方就是 tlanyan.me 对应的服务器呢？在不可信的网络下通信，中立的第三方作用就显现出来了。权威的第三方中立机构（ Certificate Authority, CA）收到 tlanyan.me 持有者的证书请求并核验信息后，将持有者的名称、公钥与 CA 用私钥生成的数字签名等信息写成证书颁发给申请者。

## 怎么解决跨域问题

**[http://www.a.com/a.js](https://link.jianshu.com?t=http://www.a.com/a.js)**  访问以下URL的结果

| URL                                                          |          说明          | 是否允许通信 |
| ------------------------------------------------------------ | :--------------------: | -----------: |
| [http://www.a.com/b.js](https://link.jianshu.com?t=http://www.a.com/b.js) |       同一域名下       |         允许 |
| [http://www.a.com/script/b.js](https://link.jianshu.com?t=http://www.a.com/script/b.js) |   同一域名下不同文件   |         允许 |
| [http://www.a.com:8000/b.js](https://link.jianshu.com?t=http://www.a.com:8000/b.js) |   同一域名，不同端口   |       不允许 |
| [https://www.a.com/b.js](https://link.jianshu.com?t=https://www.a.com/b.js) |   同一域名，不同协议   |       不允许 |
| [http://70.32.92.74/b.js](https://link.jianshu.com?t=http://70.32.92.74/b.js) |    域名和域名对应IP    |       不允许 |
| [http://script.a.com/b.js](https://link.jianshu.com?t=http://script.a.com/b.js) |    主域相同子域不同    |       不允许 |
| [http://a.com/b.js](https://link.jianshu.com?t=http://a.com/b.js) | 同一域名，不同二级域名 |       不允许 |
| [http://www.b.com/b.js](https://link.jianshu.com?t=http://www.b.com/b.js) |        不同域名        |       不允许 |

> 1、 通过jsonp跨域: 直接请求文件不行，请求JS可以，我们就把数据以JSON格式装进JS文件里，其实jsonp是前后端共同约定的一种结果。

```js
// jsonp原理(只支持get请求)
// 1. 创建一个动态script节点
let jsonp = document.createElement('script');
// 2. 声明接收数据的回调函数
function res(ev) {
  // ev接收的就是服务端回复的数据
  console.log(ev)
}
// 3. 为节点设置src属性, src属性为get请求, 后面拼接一个回调函数
jsonp.src = 'http://www.ceshi.com/api/jsonp?callback=res';
// 4. 将节点插入页面
let head = document.querySelector('head');
head.appendChild(jsonp);
// 5. 获取完数据删除节点
head.removeChild(jsonp);
```

接收到的服务端返回内容为:

```js
res({"message":"JSONP请求测试成功","data":{}})
```

可以看的返回的内容, 是我们之前传入的参数res, res被作为一个函数调用了, 而传递的数据作为该回调函数的实参传递了进来, 在script标签执行的时候, 就相当于执行了res()这个函数, 括号内部的数据也就变成了参数, 可以直接被函数接收处理, 如此便实现了跨域获取数据。

> 2、 document.domain + iframe跨域:
>news.baidu.com和map.baidu.com的一级域名相同，故可以设置document.domain = “baidu.com”;就可以跨域
> 
> 3、 location.hash + iframe
> 
> 4、 window.name + iframe跨域
>
> 5、 postMessage跨域
>
> 6、 跨域资源共享（CORS） Access-Control-Allow-Origin: *
> 
>主要通过后端来配置，CORS规范将请求分为两种类型，一种是简单请求，一种是带预检的非简单请求。
> 如果是简单请求，就先执行服务端程序，然后浏览器才会判断是否跨域；GET HEAD,POST
> 而对于非简单请求，浏览器会在发送实际请求之前先发送一个OPTIONS的HTTP请求来判断服务器是否能接受该跨域 请求；如果不能接受的话，浏览器会直接阻止接下来实际请求的发生。 服务端可以设置携带cooike
> 
> 7、 nginx代理跨域
> 
> 正向代理：我们将请求发送给代理服务器，代理服务器去访问，然后将访问到的数据传递给我们。隐藏了客户端
> 
>反向代理：在服务器端，有很多服务器处理请求，nginx扮演的就是一个反向代理角色，隐藏了服务器。
> 启动nginx服务器把server_name设置成前端的域名，此时前端发起的请求相当于是localhost对localhost发 起，这样是不会引起跨域的。
> 
> 8、 nodejs中间件代理跨域 与nginx代理跨域类似
> 
>9、 WebSocket协议跨域
> WebSocket protocol是HTML5一种新的协议。它实现了浏览器与服务器全双工通信，同时允许跨域通讯
> 
> 10、webpack的proxy，webpack的dev-server模块会启动一个服务器，这个服务器不止帮我们做了自动更新，同时也可以做到**反向**代理。就是我们把请求发送给webpack-dev-server, 然后webpack-dev-server再去请求后端服务器，服务之间的请求是没有跨域问题的

[正向代理&反向代理](https://my.oschina.net/u/2401092/blog/4412558)

## 输入域名到展示页面发生了什么

[(超详细）从输入url到页面展示发生了什么？](https://juejin.cn/post/6869279683230629896)

> DNS（Domain Name System，域名系统），简单的说：就是把我们输入的网站域名翻译成IP地址的系统.
>
> 1.在浏览器中输入url
>
> 2.客户端先检查本地是否有对应的IP地址，若找到则返回响应的IP地址。若没找到则请求上级DNS服务器，直至找到
>
> 3.有了服务器的IP， 浏览器就要可以发起HTTP请求了,联系之前的HTTP和HTTPS
>
> 4.Http会基于TCP建立起一个到服务器的连接通道，TCP是面向连接可靠的服务，联系三次握手四次握手
> Udp是无连接的，想发就发，不会对数据进行封装。适用于实时应用，就比如视频面试。TCP可靠，用于文件传输。
>
> 5.传输层下面是网络层，作用是把TCP分割好的各种数据包传送给接收方，这里需要用到mac地址，一个网络设备的IP地 址可以更换，但是MAC地址一般是固定不变的.ARP协议可以将IP地址解析成对应的MAC地址。
>
> 6.在找到对方的MAC地址后，就将数据发送到数据链路层传输。这时，客户端发送请求的阶段结束
>
> 7.接收端的服务器在链路层接收到数据包，再层层向上直到应用层。这过程中包括在运输层通过TCP协议讲分段的数据包重新组成原来的HTTP请求报文,返回响应报文，联系返回码。
>
> 8.请求成功之后，服务器会返回响应的HTML文件，接下来就到页面渲染了，联系到渲染引擎。
>
> 9.构建dom树->计算DOM树每个结点的样式->页面布局->生成分层树->栅格化（转化为位图，GPU可以处理）->显示

## 常见的状态码

[状态码](./interview.html#%E6%B5%8F%E8%A7%88%E5%99%A8%E7%9B%B8%E5%85%B3)

## get与post的区别

> GET请求，请求的数据会附加在URL之后，以?分割URL和传输数据，多个参数用&连接，传输数据会受URL长度限制
> POST请求：POST请求会把请求的数据放置在HTTP请求包的包体中，数据不受限制，数据不暴露会更安全

- GET 方法参数写法是固定的吗？

在约定中，我们的参数是写在 `?` 后面，用 `&` 分割。

我们知道，解析报文的过程是通过获取 TCP 数据，用正则等工具从数据中获取 Header 和 Body，从而提取参数。

也就是说，我们可以自己约定参数的写法，只要服务端能够解释出来就行。

- POST 方法比 GET 方法安全？

按照网上大部分文章的解释，POST 比 GET 安全，因为数据在地址栏上不可见。

然而，从传输的角度来说，他们都是不安全的，因为 HTTP 在网络上是明文传输的，只要在网络节点上捉包，就能完整地获取数据报文。

**要想安全传输，就只有加密，也就是 HTTPS。**

- GET 方法的长度限制是怎么回事？

在网上看到很多关于两者区别的文章都有这一条，提到浏览器地址栏输入的参数是有限的。

首先说明一点，HTTP 协议没有 Body 和 URL 的长度限制，对 URL 限制的大多是浏览器和服务器的原因。

浏览器原因就不说了，服务器是因为处理长 URL 要消耗比较多的资源，为了性能和安全（防止恶意构造长 URL 来攻击）考虑，会给 URL 长度加限制。

- POST 方法会产生两个 TCP 数据包？

有些文章中提到，post 会将 header 和 body 分开发送，先发送 header，服务端返回 100 状态码再发送 body。

HTTP 协议中没有明确说明 POST 会产生两个 TCP 数据包，而且实际测试(Chrome)发现，header 和 body 不会分开发送。所以，header 和 body 分开发送是部分浏览器或框架的请求方法，不属于 post 必然行为

## 垃圾回收机制（GC算法）

[GC算法，V8引擎](https://www.jinjingxuan.com/2020/08/26/%E6%B5%8F%E8%A7%88%E5%99%A8-GC%E7%AE%97%E6%B3%95%EF%BC%8CV8%E5%BC%95%E6%93%8E/)

## JS隐式转换与显示转换

### 隐式转换

> 1.undefined与null相等，但不恒等（===）
> 2.一个是number一个是string时，会尝试将string转换为number
> 3.隐式转换将boolean转换为number，0或1
> 4.隐式转换将Object转换成number或string，取决于另外一个对比量的类型
> 5.对于0、空字符串的判断，建议使用 “===” 。
> 6.“==”会对不同类型值进行类型转换再判断，“===”则不会。它会先判断两边的值类型，类型不匹配时直接为false。

```js
undefined == null;  // true   
== true;  // true  
== true;  // false  
== false;  // true
== '';  // true   
NaN == NaN;  // false  NaN不等于任何值
[] == false;  // true  
[] == ![];  // true           !会将其转为布尔值，![]的值为false，==操作符将false转为0，[]==0
'6' - '3'  // 3               []也会转为数字0   0==0
{} == !{}  //false           {} == false  ->  {} == 0  ->   NaN == 0    ->  false
1234 + 'abcd' // "1234abcd"
```

### 显式转换

> 显示转换一般指使用Number、String和Boolean三个构造函数，手动将各种类型的值，转换成数字、字符串或者布尔值。

```js
Number('1234') // 1234
Number('1234abcd') // NaN
Number('') // 0
Number(true) // 1
Number(null) // 0
Number(undefined) // NaN
String(1234)  // "1234"
String('abcd')  // "abcd"
String(true)  // "true"
String(undefined) // "undefined"
String(null)  // "null"
Boolean(0)  // false
Boolean(undefined)  // false
Boolean(null)  // false
Boolean(NaN)  // false
Boolean('')  // false
```

### 几道小题

```js
[]+{}     //"[object Object]"
{}+[]     //0
1+-'1'+1  //1
'A'-'B'   //NaN
```

## 对象的键支持什么类型

**字符串或symbol**

```js
const person = {
   	name: 'yd',
    [Symbol()]: 18
}
```

