---
title: webpack（二）
date: 2020-09-06 14:47:00
categories: webpack
---
# webpack（二）
* webpack插件机制
* webpack dev server
* Sourcemap
* splitChunks

## webpack插件机制

* Loader专注实现资源模块加载
* Plugin解决其他自动化工作
  * 清除dist目录
  * 拷贝静态文件至输出目录
  * 压缩输出代码

webpack + plugin 基本实现了前端工程化

### clean-webpack-plugin

> 作用： 清除dist目录插件

`cnpmm install -D clean-webpack-plugin`

```js
// webpack.config.js
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  // 新增
  plugins: [
    new CleanWebpackPlugin()
  ]
}
```

### html-webpack-plugin

> 作用：自动生成引用bundle.js的html文件

`cnpm install -D html-webpack-plugin`

```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'none',
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'),
    // publicPath: 'dist/'
  },
  plugins: [
    new CleanWebpackPlugin(),
    // 用于生成 index.html
    new HtmlWebpackPlugin({
      title: 'Webpack Plugin Sample',
      meta: {
        viewport: 'width=device-width'
      },
      template: './src/index.html' // 模板
    }),
    // 用于生成 about.html
    new HtmlWebpackPlugin({
      filename: 'about.html'
    })
  ]
}
```

### copy-webpack-plugin

```js
 plugins: [
    new CopyWebpackPlugin([
      // 'public/**'
      'public'
    ])
  ]
```

### 插件原理

> webpack过程中存在钩子函数，插件挂载在其上面
>
> 例：实现移除bundle.js中的注释

### 理解Compiler（负责编译）

开发插件首先要知道`compiler`和 `compilation` 对象是做什么的

`Compiler` 对象包含了当前运行`Webpack`的配置，包括`entry、output、loaders`等配置，这个对象在启动`Webpack`时被实例化，而且是全局唯一的。`Plugin`可以通过该对象获取到Webpack的配置信息进行处理。

### 理解Compilation

`Compilation`对象代表了一次资源版本构建。当运行 `webpack` 开发环境中间件时，每当检测到一个文件变化，就会创建一个新的 `compilation`，从而生成一组新的编译资源。一个 `Compilation` 对象表现了当前的模块资源、编译生成资源、变化的文件、以及被跟踪依赖的状态信息，简单来讲就是把本次打包编译的内容存到内存里。`Compilation` 对象也提供了插件需要自定义功能的回调，以供插件做自定义处理时选择使用拓展。

`apply`方法中插入钩子的一般形式如下：

```go
// compiler提供了compiler.hooks，可以根据这些不同的时刻去让插件做不同的事情。

compiler.hooks.阶段.tap函数('插件名称', (阶段回调参数) => {

});

compiler.run(callback)
```

```js
// webpack.config.js
class MyPlugin {
  apply (compiler) { // compiler对象为webpack一核心对象，通过他来找钩子函数
    console.log('MyPlugin 启动')
	
    // Webpack 会调用 Plugin 实例的 apply 方法给插件实例传入 compiler 对象
    compiler.hooks.emit.tap('MyPlugin', compilation => { // 挂载在emit方法上
      // compilation => 可以理解为此次打包的上下文
      for (const name in compilation.assets) {
        // console.log(name)                              // 输出文件名
        // console.log(compilation.assets[name].source()) // 输出文件内容 
        if (name.endsWith('.js')) {
          const contents = compilation.assets[name].source() // 获取内容
          const withoutComments = contents.replace(/\/\*\*+\*\//g, '') // 删除注释
          compilation.assets[name] = {
            source: () => withoutComments, // 替换内容
            size: () => withoutComments.length // 必要注释：长度
          }
        }
      }
    })
  }
}

plugins: [
    new MyPlugin()
  ]
```

## webpack-dev-server

**如何自动编译：修改源文件后自动打包**

只需要在启动`webpack`命令时，添加`webpack --watch`即可

**如何自动刷新浏览器**

使用`browser-sync`：`browser-sync dist --files "**/*" `

> 组合这两种方式可以实现，修改源文件时自动刷新浏览器。
>
> 缺点：1. 操作复杂：需要同时运行两个终端命令。2. 消耗大：先打包写入磁盘，再读出磁盘刷新浏览器

**webpack-dev-server**

`webpack dev server`：将自动编译和自动刷新集成在一起

安装：`cnpm install -D webpack-dev-server  `

> 优点：不会生成dist目录造成磁盘读写操作，均存储在内存中
>
> webpack-dev-server --open 命令可自动打开浏览器

**静态资源文件的处理**

> 在开发阶段，因为要频繁的打包和编译，尽量不将图片等静态资源文件一起打包到dist目录中

```js
// webpack.config.js

module.exports = {
  mode: 'none',
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  },
  devServer: {
    contentBase: './public', // 使用contentBase来设置
  },
  module: {
   // ...
  },
  plugins: [
    // ...
      
    // // 开发阶段最好不要使用这个插件
    // new CopyWebpackPlugin(['public'])
  ]
}
```

### proxy代理

>  由于 webpack-dev-server 是一个本地开发服务器，所以我们的应用在开发阶段是独立运行在 localhost 的一个端口上，而后端服务又是运行在另外一个地址上。但是最终上线过后，我们的应用一般又会和后端服务部署到同源地址下。
>
> ​    那这样就会出现一个非常常见的问题：在实际生产环境中能够直接访问的 API，回到我们的开发环境后，再次访问这些 API 就会产生跨域请求问题。
>
> ​    可能有人会说，我们可以用跨域资源共享（CORS）解决这个问题。确实如此，如果我们请求的后端 API 支持 CORS，那这个问题就不成立了。但是并不是每种情况下服务端的 API 都支持 CORS。如果前后端应用是同源部署，也就是协议 / 域名 / 端口一致，那这种情况下，根本没必要开启 CORS，所以跨域请求的问题仍然是不可避免的。
>
> ​    那解决这种开发阶段跨域请求问题最好的办法，就是在开发服务器中配置一个后端 API 的代理服务，也就是把后端接口服务代理到本地的开发服务地址。
>
> ​    webpack-dev-server 就支持直接通过配置的方式，添加代理服务。接下来，我们来看一下它的具体用法。
>
> 比如我们假定 GitHub 的 API 就是我们应用的后端服务，那我们的目标就是将 GitHub API 代理到本地开发服务器中，我们可以先在浏览器中尝试访问其中的一个接口： [https://api.github.com/users](https://api.github.com/users/mojombo/followers)

```js
devServer: {
    contentBase: './public',
    proxy: {
      '/api': {
        // http://localhost:8080/api/users -> https://api.github.com/api/users
        target: 'https://api.github.com',
        // http://localhost:8080/api/users -> https://api.github.com/users
        pathRewrite: {
          '^/api': ''
        },
        // 不能使用 localhost:8080 作为请求 GitHub 的主机名
        changeOrigin: true
      }
    }
  },
```

![1](https://img-blog.csdnimg.cn/20200531181008355.png)

那此时我们请求 http://localhost:8080/api/users ，就相当于请求了 https://api.github.com/users

```js
// 此时再写跨域请求，就可正常访问
// 虽然 GitHub 支持 CORS，但是不是每个服务端都应该支持。
// fetch('https://api.github.com/users')
fetch('/api/users') // 实际请求到http://localhost:8080/api/users
  .then(res => res.json())
  .then(data => {
    data.forEach(item => {
      const li = document.createElement('li')
      li.textContent = item.login
      ul.append(li)
    })
  })
```

## Sourcemap

> SourceMap是一种映射关系。当项目运行后，如果出现错误，错误信息只能定位到打包后文件中错误的位置。如果想查看在源文件中错误的位置，则需要使用映射关系，找到对应的位置。

那么如何在webpack中配置Sourcemap呢？

```js
// webpack.config.js

module.exports = {
  devtool: 'source-map' 
}

// 此时在代码中写一个错误，就可以在控制台看到源文件的错误
```

该配置可选且具有多个配置项 ，具体包含以下：

| devtool                        | 构建速度 | 重新构建速度 | 生产环境 | 品质(quality)          |
| ------------------------------ | -------- | ------------ | -------- | ---------------------- |
| (none)                         | +++      | +++          | yes      | 打包后的代码           |
| eval                           | +++      | +++          | no       | 生成后的代码           |
| cheap-eval-source-map          | +        | ++           | no       | 转换过的代码（仅限行） |
| cheap-module-eval-source-map   | o        | ++           | no       | 原始源代码（仅限行）   |
| eval-source-map                | --       | +            | no       | 原始源代码             |
| cheap-source-map               | +        | o            | yes      | 转换过的代码（仅限行） |
| cheap-module-source-map        | o        | -            | yes      | 原始源代码（仅限行）   |
| inline-cheap-source-map        | +        | o            | no       | 转换过的代码（仅限行） |
| inline-cheap-module-source-map | o        | -            | no       | 原始源代码（仅限行）   |
| source-map                     | --       | --           | yes      | 原始源代码             |
| inline-source-map              | --       | --           | no       | 原始源代码             |
| hidden-source-map              | --       | --           | yes      | 原始源代码             |
| nosources-source-map           | --       | --           | yes      | 无源代码内容           |

> *+++ 非常快速, ++ 快速, + 比较快, o 中等, - 比较慢, -- 慢*

* eval：打包后的模块都使用 `eval()` 执行，不产生独立的 map 文件
* cheap：Source map是否包含行信息
* module：是否能够得到 Loader 处理之前的源代码，即手写的es6没有编译的源代码
* inline：使用 dataURL 把 SourceMap 嵌入 （不常用）
* hidden：控制台看不到SourceMap
*  nosources：看不见源代码，生产环境保护源代码

****

* eval-source-map：相比 eval 生成了 SourceMap
* cheap-eval-source-map：简单版的eval-source-map，只有行没有列
* cheap-module-eval-source-map：没有经过 loader 加工，真正的源代码（vue中常用）

****

开发模式：cheap-module-eval-source-map

生产模式：none