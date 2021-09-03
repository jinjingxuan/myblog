---
title: webpack（三）
date: 2020-09-07 14:47:00
categories: webpack
---
# webpack（三）
* HMR
* 生产环境优化
* DefinePlugin
* Tree-shaking
* sideEffects

## HMR

https://jinjingxuan.github.io/2021/08/09/webpack-hmr/

## 生产环境优化

> 模式 （mode）：为不同的工作环境创建不同的配置
>
> 1. 配置文件根据环境不同导出不同配置
> 2. 一个环境对应一个配置文件

```js
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = (env, argv) => {
  const config = {
	// 正常配置
  }

  if (env === 'production') {
    config.mode = 'production'
    config.devtool = false
    config.plugins = [
      ...config.plugins,
      new CleanWebpackPlugin(),
      new CopyWebpackPlugin(['public']) // 生产环境需要 copy 图片等
    ]
  }

  return config
}

// 此时在命令行中运行：webpack --env production
```

若一个环境对应一个配置文件，则项目中需要有三个配置文件

* webpack.common.js：存放一些公共的配置
* webpack.dev.js
* webpack.prod.js

此时还需要安装一个插件`webpack-merge`，实现在原有基础上添加插件

```js
const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-eval-module-source-map',
  devServer: {
    hot: true,
    contentBase: 'public'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
})
```

此时命令行则需要输入`webpack --config webpack.prod.js`

## DefinePlugin

> 为代码注入全局成员

```js
// webpack.config.js
const webpack = require('webpack')

module.exports = {
  mode: 'none',
  entry: './src/main.js',
  output: {
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      // 值要求的是一个代码片段
      API_BASE_URL: JSON.stringify('https://api.example.com')
    })
  ]
}

// main.js
console.log(API_BASE_URL)

// 运行 webpack 打包后查看bundle.js,发现在最后添加了代码
console.log("https://api.example.com")
```

## Tree-shaking

摇掉那些未引用的代码，减小代码体积，在生产模式下会自动开启`webpack --mode production`

不是生产环境需要手动配置，如下：

```js
module.exports = {
  mode: 'none',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js'
  },
  // 优化操作
  optimization: {
    // 负责标记枯树叶
    usedExports: true,
    // 负责摇掉枯树叶
    minimize: true,
    // 尽可能合并每一个模块到一个函数中,可以看到 bundle.js 模块数量减少了
    // concatenateModules: true,
  }
}
```

举个例子

```js
// components.js
export const Button = () => {
  return document.createElement('button')

  console.log('dead-code')
}

export const Link = () => {
  return document.createElement('a')
}

export const Heading = level => {
  return document.createElement('h' + level)
}

// index.js,只有Button被使用
import { Button } from './components'

document.body.appendChild(Button())

// 正常用 webpack 命令打包时，在 bundle.js 中搜不到 Link, Heading，console.log
```

#### 问题：使用`babel-loader`后，Tree-shaking会失效？

* 由webpack打包的代码必须使用ES Modules，先交给loader处理，然后再打包
* 而babel转换时，可能会将 ES Module 转换成 CommonJS ,就会失效，但是最新版的babel没问题

```js
module.exports = {
  mode: 'none',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              // 如果 Babel 加载模块时已经转换了 ESM，则会导致 Tree Shaking 失效
              // ['@babel/preset-env', { modules: 'commonjs' }]
                
              // 设置为false就不会开启转换
              // ['@babel/preset-env', { modules: false }]
                
              // 也可以使用默认配置，也就是 auto，这样 babel-loader 会自动关闭 ESM 转换
              ['@babel/preset-env', { modules: 'auto' }]
            ]
          }
        }
      }
    ]
  },
  optimization: {
    // 模块只导出被使用的成员
    usedExports: true,
    // 尽可能合并每一个模块到一个函数中
    // concatenateModules: true,
    // 压缩输出结果
    // minimize: true
  }
}

```

