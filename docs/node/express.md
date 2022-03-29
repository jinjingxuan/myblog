# express

[Express](https://expressjs.com/zh-cn) 是一种保持最低程度规模的灵活 Node.js Web 应用程序框架，为 Web 和移动应用程序提供一组强大的功能。

```js
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
```

应用程序会启动服务器，并在端口 3000 上侦听连接。此应用程序以“Hello World!”响应针对根 URL (`/`) 或*路由*的请求。对于其他所有路径，它将以 **404 Not Found** 进行响应。

使用以下命令运行应用程序：

```sh
$ node app.js
```

然后，在浏览器中输入 http://localhost:3000/ 以查看输出。

## 中间件

中间件就是一个请求处理方法，用其把用户从请求到响应的整个过程分发到多个中间件去处理，这样做的目的是提高代码的灵活性，动态可扩展的。简单的理解就是：将收到的请求进行逐层过滤。

```js
var express = require('express');
var app = express();

// 中间件函数 myLogger
var myLogger = function (req, res, next) {
  console.log('LOGGED');
  next();
};

app.use(myLogger);

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000);
```

应用程序每次收到请求时，会在终端上显示消息“LOGGED”。

### 应用程序级别中间件

1. 全匹配（不关心任何请求路径和请求方法，当用户请求的时候如果分发到该中间件则直接进行处理请求操作）

```js
app.use(function(req, res, next) {
  console.log('全匹配');
  next();
})
```

当请求经过这个中间件的时候，不关心请求路径和方法，直接进入该中间件进行处理。其中`next`是一个方法，用于调用下一个**符合条件**的中间件。如果不写`next`，则会在当前中间件停留下来，不会再去匹配其他中间件。

2. 路径以`/xx/`**开头**的匹配（模糊匹配）

```js
app.use('/a', function(req, res, next) {
  console.log('/a');
  next();
})
```

只有以`/a/`开头的路径才可以匹配成功并处理，比如：`/a/b`是可以匹配成功的，但是`/ab/b`不能匹配成功

### 路由级别中间件

必须与请求路径和请求方法一致才匹配成功（精确匹配）

```js
app.get('/a', function(req, res, next) {
  console.log('/a');
  next();
})
```

