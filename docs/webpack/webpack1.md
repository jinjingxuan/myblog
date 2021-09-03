---
title: webpack（一）
date: 2020-09-06 09:47:00
categories: webpack
---
# webpack（一）
* 为什么使用 webpack
* webpack初体验
* 如何打包css和图片
* 常用加载器分类
* 如何处理ES6语法
* 模块加载方式
* 自己创建一个loader

## 为什么使用 webpack

个人理解我们平时开发的时候，比如使用es6，ts，采用模块化，使用不同的技术栈，大多数所写的代码是不能被浏览器直接运行的，所以需要一个工具来帮我们完成这些事情，另外还可以增加压缩代码，hmr这些功能，这就是 webpack。

## webpack初体验

>  webpack是一种前端资源构建工具，一个静态模块打包器（module bundler）。在webpack看来，前端的所有资源文件（js/json/css/img/less…）都会作为模块处理。它将根据模块的依赖关系进行静态分析，打包生成对应的静态资源（bundle）

安装：`cnpm install -D webpack webpack-cli`，举例：比如此时有如下的目录结构

```js
|--src
    --heading.js  // 遵循ES Modules
    --index.js
|--index.html
|--package.json
```

其中`index.js`模块中引入了`heading.js`模块导出的方法，而`index.html`中又引入了`index.js`，默认入口为`src/index.js`

> html文件中原本的引入
>
> script type="module" src="src/index.js"

运行`webpack`命令

```js
|--dist
    --main.js // 打包后的js文件
|--src
    --heading.js
    --index.js
|--index.html
|--package.json
```

> html文件中，打包之后的引入
>
> script src="dist/main.js"

### 如何添加配置入口文件

新建`webpack.config.js`文件，使用`common.js`规范

```js
const path = require('path')

module.exports = {
  // mode这个属性有三种取值，分别是 production、development 和 none。
  // 1. 生产模式下，Webpack 会自动优化打包结果；
  // 2. 开发模式下，Webpack 会自动优化打包速度，添加一些调试过程中的辅助；
  // 3. None 模式下，Webpack 就是运行最原始的打包，不做任何额外处理；
  mode: 'development',
  entry: './src/main.js', // 入口
  output: { 
    filename: 'bundle.js', 
    path: path.join(__dirname, 'output') //绝对路径，__dirname为当前文件夹路径 + output
  }
}
```

[path.join与path.resolve](https://blog.csdn.net/lychee_xiahua/article/details/112791840)

## 如何打包css文件

因为webpack默认打包js文件，所以我们需要额外的loader来处理，`cnpm install -D style-loader css-loader`

* css-loader：处理css文件，将其打包至js文件中
* style-loader：用于展示打包后的css文件

```js
// 在webpack.config.js中新增
 module: {
    rules: [
      {
        test: /.css$/, // 遇到css文件时
        use: [
          'style-loader', // 采用如下loader，从后向前调用
          'css-loader'
        ]
      }
    ]
  }

// 然后比如在main.js中通过import的方式引入main.css文件
import './main.css'

// 此时运行webpack就会打包css文件
```

### 如何打包图片

`cnpm install -D file-loader url-loader`，首先在`main.js`使用import的方式中导入`./icon.png`

* 超出10KB的文件单独提取存放在dist中
* 小于10KB的文件转换为 Data URLs 嵌入代码中（base64编码）

```js
|--dist
    --bundle.js 
    --aaa0e...png // 打包后的图片
|--src
    --heading.js
    --main.js
    --main.css
    --icon.png
|--index.html
|--package.json
```

```js
const path = require('path')

module.exports = {
  mode: 'none',
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'),
    publicPath: 'dist/'                 // 因为index.html在根目录，所以图片也从根目录加载，不会显示，要加上dist
  },
  module: {
    rules: [
      {
        test: /.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /.png$/,
        use: {
          loader: 'url-loader', // 大于10KB的还会使用file-loader
          options: {
            limit: 10 * 1024 // 10 KB
          }
        }
      }
    ]
  }
}
```

## 常用加载器分类

* 编译转换类：比如css-loader将css编译并嵌入在bundle.js
* 文件操作类：比如file-loader
* 代码检查类：比如eslint-loader

## 如何处理ES6语法

虽然webpack支持import和export模块化，但并不支持ES6语法

`cnpm install -D babel-loader @babel/core @babel/preset-env `

```json
// rules新增
	{
        test: /.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
```

## 模块加载方式

* 遵循 ES Modules 标准的 import 声明（非特殊情况只用这一种）
* 遵循 CommonJS 标准的 require函数
* 遵循 AMD 标准的 define 函数和 require 函数
* * 样式代码中的@import指令和url函数
  * HTML 代码中图片标签的 src 属性，a标签的href属性（需要配置）

```js
// html中的a标签的href属性需要配置
	 {
        test: /.html$/,
        use: {
          loader: 'html-loader',
          options: {
            attrs: ['img:src', 'a:href']
          }
        }
      }
```

## 自己创建一个loader

根目录下新建一个`markdown-loader.js`作为处理`md`文件的`loader`，然后在`webpack.config.js`中配置：

```js
const path = require('path')

module.exports = {
  mode: 'none',
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'),
    publicPath: 'dist/'
  },
  module: {
    rules: [
      {
        test: /.md$/,
        use: [
          'html-loader',
          './markdown-loader'
        ]
      }
    ]
  }
}
```

```js
// markdown-loader.js

const marked = require('marked')

module.exports = source => {
    
  const html = marked(source)

  // 返回 html 字符串交给下一个 loader 处理
  return html
}


// loader管道示意

// Source => md-loader => loader2 => loader3 => Result （js文件） 
```

