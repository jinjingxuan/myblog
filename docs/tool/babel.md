# babel

本文部分转载于[Babel教程](https://zhuanlan.zhihu.com/p/393122285)

 The compiler for writing next generation JavaScript

 简单翻译下就是“用于编写下一代JavaScript的编译器”。Babel是一个工具集，主要用于将ES6版本的JavaScript代码转为ES5等向后兼容的JS代码，从而可以运行在低版本浏览器或其它环境中。

## 安装与使用

Babel依赖Node.js，没有安装的话，去官网下载安装最新稳定版本的Node.js。

在本地新建一个文件夹，在该文件夹下新建一个js文件，文件命名为babel.config.js。该文件是 Babel配置文件 ，我们在该文件里输入如下内容：

```js
module.exports = {
  presets: ["@babel/env"],
  plugins: []
}
```

然后在该文件夹下新建一个js文件main.js，该js里的代码是我们需要转译的，我们写入代码

```js
var fn = (num) => num + 2;
```

然后执行下面的命令安装三个npm包，这些npm包是Babel官方包

```bash
npm install --save-dev @babel/cli @babel/core @babel/preset-env
```

安装完成后，执行下面的命令进行转码，该命令含义是把 main.js 转码生成 compiled.js 文件

```bash
npx babel main.js -o compiled.js
```

此时文件夹下会生成compiled.js，该文件是转换后的代码：

```js
"use strict";
var fn = function fn(num) {
  return num + 2;
};
```

这就是一个最简单的Babel使用过程，我们把用ES6编写main.js转换成了ES5的compiled.js。

- @babel/cli是Babel命令行转码工具，如果我们使用命令行进行Babel转码就需要安装它。
- @babel/cli依赖@babel/core，因此也需要安装@babel/core这个Babel核心npm包。
- @babel/preset-env这个npm包提供了ES6转换ES5的语法转换规则，我们在Babel配置文件里指定使用它。如果不使用的话，也可以完成转码，但转码后的代码仍然是ES6的，相当于没有转码。 

## @babel/preset-env

Babel插件的数量非常多，处理ES2015的有

- @babel/plugin-transform-arrow-functions
- @babel/plugin-transform-block-scoped-functions
- @babel/plugin-transform-block-scoping ......

Babel插件实在太多，假如只配置插件数组，那我们前端工程要把ES2015,ES2016,ES2017...下的所有插件都写到配置项里，我们的Babel配置文件会非常臃肿。

preset预设就是帮我们解决这个问题的。预设是一组Babel插件的集合：

- @babel/preset-env
- @babel/preset-react
- @babel/preset-typescript
- babel-preset-es2015

2017年Babel 的官网上在9月宣布 ES2015 / ES2016/ ES2017 等等 ES20xx 时代的 presets 通通被废弃（deprecated），取而代之的是 [babel-preset-env](https://link.zhihu.com/?target=https%3A//github.com/babel/babel-preset-env)，并且承诺它将成为“未来不会过时的（future-proof）”解决方案。在Babel7之后，babel-preset-env 的名字是 @babel/preset-env。

 也就是说： **babel preset 将基于你的实际浏览器及运行环境，自动的确定babel插件及polyfills，转译ES2015及此版本以上的语言。**  

在没有配置项的情况下，@babel/preset-env 表现的同 babel-preset-latest 一样(或者可以说同 babel-preset-es2015, babel-preset-es2016, and babel-preset-es2017 结合到一起，表现的一致。所以那么多的 preset 预设，现在只需一个 @babel/preset-env 就可以了。

```json
{
  "presets": [
    ["@babel/preset-env"]
  ]
}
```

[Babel教程7：Babel配置文件](https://zhuanlan.zhihu.com/p/393731413)

[Babel教程10：@babel/preset-env](https://zhuanlan.zhihu.com/p/394782898)

## @babel/polyfill

```js
var fn = (num) => num + 2;
var promise = Promise.resolve('ok')
```

执行命令：

```bash
npx babel main.js -o compiled.js
```

生成 compiled.js 如下：

```js
"use strict";
var fn = function fn(num) {
  return num + 2;
};
var promise = Promise.resolve('ok');
```

我们发现Babel并没有对ES6的Promise进行转换 ，在比较老的浏览器（ 例如火狐27 ）里打开引入后控制台会报错：Promise is not defined。

> 为何 Babel没有对ES6的Promise进行转换 ？
>
> 因为Babel默认只转换新的JavaScript语法（syntax），而不转换新的 API。
>
> 新的API分类两类，一类是Promise、Map、Symbol、Proxy、Iterator等全局对象及其对象自身的方法，例如Object.assign，Promise.resolve；另一类是新的实例方法，例如数组实例方法[1, 4, -5, 10].find((item) => item < 0)

缺点：babel-polyfill比较简单粗暴，在引入的同时，也污染了全局对象，导致无效增加了很多用不到的polyfill，也可能会污染子模块的变量引用，可能导致不必要的冲突。我们目前一般会使用 @babel/runtime 和 @babel/plugin-transform-runtime

## @babel/runtime

 babel-runtime 和 babel-polyfill有点类似，都是去兼容新API的“垫片”，它和 babel-polyfill 最大的不同就是可以做到按需引用，哪里需要什么就用什么，比如我需要Promise。一般在生成环境，首先安装依赖，然后引入：

```js
// npm install --save babel-runtime
import Promise from 'babel-runtime/core-js/promise';
```

## @babel/plugin-transform-runtime

如果用 @babel/runtime，如果我10个文件要引用Promise，难道每个文件都得写个 @babel/runtime的Promise引入么，显然很麻烦。那么 @babel/plugin-transform-runtime就是用来解决这个问题的，无论你多少个文件引入了相关新的API，它只会存在一份，@babel/plugin-transform-runtime 本质上依赖于 babel-runtime 的 core-js，在编译的时候会帮你自动处理，在开发环境安装依赖：

```bash
npm install --save-dev @babel/plugin-transform-runtime
```

你只需要配置：

```json
{
  "plugins": [
    "@babel/plugin-transform-runtime"
  ]
}
```

> 综上，我们最常用的预设是 @babel/preset-env，最常用的插件是 @babel/plugin-transform-runtime

## @babel/register

`babel-register`模块改写`require`命令，为它加上一个钩子。此后，每当使用`require`加载`.js`、`.jsx`、`.es`和`.es6`后缀名的文件，就会先用Babel进行转码。

```bash
npm install --save-dev @babel/register
```

使用时，必须首先加载`babel-register`。

```js
require("babel-register");
require("./index.js");
```

然后，就不需要手动对`index.js`转码了。

需要注意的是，`babel-register`只会对`require`命令加载的文件转码，而不会对当前文件转码。另外，由于它是实时转码，所以只适合在开发环境使用。

**默认忽略 node_modules**

**注意：** 默认情况下，所有对 `node_modules` 目录下的文件的 require 请求都将被忽略。你可以通过以下方式传递一个用于匹配被忽略文件的正则表达式来修改默认行为：

```js
require("@babel/register")({
  // When a file path matches this regex then it is not compiled
  ignore: [],
  
  // It will not be compiled if `true` is returned.
  function(filepath) {
      return filepath !== "/path/to/es6-file.js";
  }
});
```

