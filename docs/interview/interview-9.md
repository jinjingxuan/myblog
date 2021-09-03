---
title: 面试题（九）
date: 2018-03-09 09:52:01
categories: 面试
---
# 面试题（九）
* content-type是什么
* 什么是预检请求
* 逗号运算符
* parseInt有什么用
* setTimeout倒计时为什么会出现误差
* 聊聊前端登陆
* 请详细介绍一下从输入 URL 到页面加载完成的过程？
* fetch/Body.json()
* Object.prototype.hasOwnProperty()

## content-type是什么

* application/x-www-form-urlencoded
  * HTTP会将请求参数用key1=val1&key2=val2的方式进行组织，并放到请求实体里面
* application/json
  * JSON 是一种轻量级的数据格式，以“键-值”对的方式组织的数据。这个使用这个类型，需要参数本身就是json格式的数据，参数会被直接放到请求实体里，不进行任何处理。
* 可以参考[Content-Type 详解](https://www.jianshu.com/p/de5845b4c095)

##  什么是预检请求

* 预检请求会向服务器确认跨域是否允许，服务返回的响应头里有对应字段`Access-Control-Allow-Origin`来给浏览器判断：如果允许，浏览器紧接着发送实际请求；不允许，报错并禁止客户端脚本读取响应相关的任何东西。
* 参考[预检请求 OPTIONS](https://zhuanlan.zhihu.com/p/46405073)

## 逗号运算符

## (0,function)

> 逗号运算符，它将先计算左边的参数，再计算右边的参数值。然后返回最右边参数的值。 

```js
var a = {
  foo: function() {
    console.log(this === window);
  }
};
 
a.foo(); // Returns 'false' in console
(0, a.foo)(); // Returns 'true' in console
```

But, if you were call `(0, a.foo)()`. The expression `(0, a.foo)` will evaluate each of its operands (from left to right) and returns the value of the last operand. In other words, `(0, a.foo)` is equivalent to 

```js
function() {
  console.log(this === window);
} 
```

## parseInt有什么用

```js
parseInt("10");			//返回 10
parseInt("19",10);		//返回 19 (10+9)
parseInt("11",2);		//返回 3 (2+1)
parseInt("17",8);		//返回 15 (8+7)
parseInt("1f",16);		//返回 31 (16+15)
parseInt("010");		//未定：返回 10 或 8

//BigInt也有转换进制的功能
BigInt("0b"+"10") //2
BigInt("0o"+"10") //8
BigInt("0x"+"10") //16

//那么10进制怎么转换成2进制呢
NumberObject.toString(radix);

//parseInt还具有向下取整的功能
parseInt(2.5) //2
```

## setTimeout倒计时为什么会出现误差

> setTimeout() 只是将事件插入了“任务队列”，必须等当前代码（执行栈）执行完，主线程才会去执行它指定的回调函数。要是当前代码消耗时间很长，也有可能要等很久，所以并没办法保证回调函数一定会在 setTimeout() 指定的时间执行。所以， setTimeout() 的第二个参数表示的是最少时间，并非是确切时间。
>
> HTML5标准规定了 setTimeout() 的第二个参数的最小值不得小于4毫秒，如果低于这个值，则默认是4毫秒。在此之前。老版本的浏览器都将最短时间设为10毫秒。另外，对于那些DOM的变动（尤其是涉及页面重新渲染的部分），通常是间隔16毫秒执行。这时使用 requestAnimationFrame() 的效果要好于 setTimeout();

```js
setTimeout(() => {
    console.log('setTimeout', 10)
})

for (let i = 0; i < 10000; i++) {
    console.log(i)
}
```

`window.requestAnimationFrame()` 告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行

## 前端登陆

- Cookie + Session 登录
  - 服务端存储 session ，客户端存储 cookie，其中 cookie 保存的为 sessionID
  - 可以灵活 revoke 权限，更新信息后可以方便的同步 session 中相应内容
  - 分布式 session 一般使用 redis(或其他KV) 存储
  - 适合传统系统独立鉴权
- Token 登录
- SSO 单点登录
- OAuth 第三方登录

[前端登录，这一篇就够了](https://juejin.cn/post/6845166891393089544)

## 请详细介绍一下从输入 URL 到页面加载完成的过程？

[一道面试题是如何引发深层次的灵魂拷问](https://mp.weixin.qq.com/s/O8j9gM5tD5rjLz1kdda3LA)

## fetch/Body.json()

[使用 Fetch](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch)

[Body.json()](https://developer.mozilla.org/zh-CN/docs/Web/API/Body/json)

## Object.prototype.hasOwnProperty()

> `hasOwnProperty()` 方法会返回一个布尔值，指示对象自身属性中是否具有指定的属性（也就是，是否有指定的键）。

```js
const object1 = {};
object1.property1 = 42;

console.log(object1.hasOwnProperty('property1'));
// expected output: true

console.log(object1.hasOwnProperty('toString'));
// expected output: false

console.log(object1.hasOwnProperty('hasOwnProperty'));
// expected output: false
```

> 所有继承了 [`Object`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object) 的对象都会继承到 `hasOwnProperty` 方法。这个方法可以用来检测一个对象是否含有特定的自身属性；和 [`in`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/in) 运算符不同，该方法会忽略掉那些从原型链上继承到的属性。
>
> 即使属性的值是 `null` 或 `undefined`，只要属性存在，`hasOwnProperty` 依旧会返回 `true`。

```js
o = new Object();
o.propOne = null;
o.hasOwnProperty('propOne'); // 返回 true
o.propTwo = undefined;
o.hasOwnProperty('propTwo'); // 返回 true
```

