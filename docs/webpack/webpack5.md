---
title: webpack（五）
date: 2020-09-08 14:48:00
categories: webpack
---
# webpack（五）
* 使用webpack打包一个vue项目
* 安装 loader 和 plugin
* 配置 webpack.dev.js
* 配置 webpack.prod.js
* merge
* 配置eslint

## 使用 webpack 打包一个 vue 项目

> 首先安装一些必要的 loader 和 plugin

* webpack，webpack-cli：webpack工具
* vue，vue-loader，vue-template-compiler：处理 .vue 文件
* less，less-loader，css-loader，style-loader：处理样式
* url-loader，file-loader：处理图片等文件
* eslint-loader：代码标准化
* babel-loader    @babel/core    @babel/preset-env：babel处理 es6
* clean-webpack-plugin：删除 dist 目录

* html-webpack-plugin：生成自动引用打包后的 js 的 html 文件
* copy-webpack-plugin：可以用来拷贝 public 目录
* webpack-dev-server：浏览器自动编译刷新
* webpack-merge：合并配置文件
* sourcemap：映射源文件

## 配置 webpack.dev.js

首先写一下入口，出口，处理 vue 和 样式的配置

```js
const path = require('path')

module.exports = {
  mode: 'none',
  entry: './src/main.js', // 入口
  output: { 
    filename: 'bundle.js', 
    path: path.join(__dirname, 'dist')
  },
  module:{
    rules:[
      { 
        test: /\.vue$/, 
        use: 'vue-loader' 
      },
      {
        test: /.css$/,   // 处理css
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /.less$/, // 处理sass
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /.png$/, // 处理图片
        use: {
          loader: 'url-loader', 
          options: {
            limit: 10 * 1024 // 10 KB
          }
        }
      }
    ]
  }
}
```

然后在`package.json`中配置一下`scripts`

>  "serve": "webpack --config webpack.dev.js"

运行`npm run server`后报错：

>vue-loader was used without the corresponding plugin
>
>原来是Vue-loader在15.*之后的版本都是需要伴随 VueLoaderPlugin的,

```js
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  mode: 'none',
  entry: './src/main.js', // 入口
  output: { 
    filename: 'bundle.js', 
    path: path.join(__dirname, 'dist')
  },
  module:{
    rules:[
      // ...
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ],
}
```

> 再次运行 npm run server 打包成功，在 dist 目录下生成了 bundle.js
>
> 此时只有一个 js 文件，那么怎么能运行呢，这时就需要 html-webpack-plugin 和 webpack-dev-server 了

```js
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'none',
  entry: './src/main.js', // 入口
  output: { 
    filename: 'bundle.js', 
    path: path.join(__dirname, 'dist')
  },
  module:{
    rules:[
      // ...
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(),  // 清除 dist
    new HtmlWebpackPlugin({    // 生成引入 bundle.js 的 index.html
      filename: 'index.html'
    }),
    new CopyWebpackPlugin({    // 拷贝 public 目录
      patterns: [
        { from: path.join(__dirname,'public'),
          to: 'public' 
        }
      ],
    }),
  ],
}
```

> // 然后修改脚本
>
> "scripts": {
>
>   "serve": "webpack-dev-server --config webpack.dev.js --open --hot",
>
>  },
>
> 再次运行 npm run serve，成功打开页面，但是里面什么也没有，按 F12检查发现报错
>
> Vue warn: Cannot find element: #app

发现在生成的 index.html 文件中没有 div id="app" 的元素，原来是在使用 html-webpack-plugin 的时候没有使用template，检查目录发现在public目录下有写好的 index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <link rel="icon" href="<%= BASE_URL %>favicon.ico">
    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>
  <body>
    <noscript>
      <strong>We're sorry but <%= htmlWebpackPlugin.options.title %> doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
    </noscript>
    <div id="app"></div>
    <!-- built files will be auto injected -->
  </body>
</html>
```

其中 BASE_URL 需要使用 DefinePlugin 注入全局成员，title 就在 htmlWebpackPlugin 配置

```js
  plugins: [
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'this is a title',
      template : './public/index.html',
      filename: 'index.html'
    }),
    new webpack.DefinePlugin({
      BASE_URL: JSON.stringify('./public/')
    })
  ]
```

> 然后页面就正常打开了，但是有一张图片没有显示，显示：
>
> img src="[object Module]"
>
> 原因是在url-loader内部封装了file-loader 而file-loader在**新版本**中**esModule**属性默认为`true` 即**默认使用ES模块语法**，导致了造成了引用图片文件的方式和以前的版本不一样 引入路径改变了 自然找不到图片

```js
	{
        test: /.png$/,
        use: {
          loader: 'url-loader', // 大于10KB的还会使用file-loader
          options: {
            limit: 10 * 1024, // 10 KB
            esModule: false // 取消使用 esModules
          }
        }
      }
```

再次运行页面就能正常打开了，并且试了热更新功能没问题，但是在开发环境下没必要拷贝 public 目录，设置一下 contentBase 即可

```js
devServer: {
    contentBase: './public',
    hot: true  // 热更新也可以在这配置
},
```

## 配置 webpack.prod.js 和 webpack.common.js

在生产环境下，就需要拷贝 public 目录了，并且设置 `mode: 'production'`，通过 webpack-merge 合并

```js
// webpack.dev.js
const path = require('path')
const common = require('./webpack.common.js')
const webpackMerge = require('webpack-merge')

module.exports = webpackMerge.merge(common, {
  mode: 'none',
  devServer: {
    contentBase: './public',
    hot: true
  }
})

// webpack.prod.js
const path = require('path')
const common = require('./webpack.common.js')
const webpackMerge = require('webpack-merge')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = webpackMerge.merge(common, {
  mode: 'production',
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { 
          from: path.join(__dirname,'public'),
          to: 'public' 
        }
      ],
    })
  ]
})
```

```js
// webpack.common.js
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  entry: './src/main.js', // 入口
  output: { 
    filename: 'bundle.js', 
    path: path.join(__dirname, 'dist')
  },
  module:{
    rules:[
      { 
        test: /\.vue$/, 
        use: 'vue-loader' 
      },
      {
        test: /.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /.png$/,
        use: {
          loader: 'url-loader', // 大于10KB的还会使用file-loader
          options: {
            limit: 10 * 1024, // 10 KB
            esModule: false
          }
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'this is a title',
      template : './public/index.html',
      filename: 'index.html'
    }),
    new webpack.DefinePlugin({
      BASE_URL: JSON.stringify('./public/')
    })
  ]
}
```

## 配置eslint

`eslint --init`时模块下载失败，这里我就手动安装一下：

```js
cnpm i -D eslint-plugin-vue eslint-config-standard eslint eslint-plugin-import eslint-plugin-node eslint-plugin-promise eslint-plugin-standard
```

然后在`webpack.common.js`中配置一下就可以

```js
	  {
        test: /\.vue$/,
        use: [
          'vue-loader',
          'eslint-loader'
        ]
      },
```

然后再`package.json`中再配置一下

```js
"scripts": {
	"lint": "eslint src/**/*.vue"
}
```