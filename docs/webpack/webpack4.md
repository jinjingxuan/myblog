---
title: webpack（四）
date: 2020-09-08 14:47:00
categories: webpack
---
# webpack（四）
* Webpack sideEffects
* Code Splitting
* mini-css-extract-plugin
* 文件名 Hash

## Webpack sideEffects

> 副作用：模块执行时除了导出成员之外所做的事情
>
> 比如一个 css 文件没有导出，可认为有副作用

```js
|--components
		--button.js
		--heading.js
		--link.js
		--index.js
|--index.js
```

```js
// components/index.js

export { default as Button } from './button'
export { default as Link } from './link'
export { default as Heading } from './heading'

// 入口文件 index.js
import { Button } from './components'
// 只想载入 Button 却载入了所有模块
```

```js
// webpack.config.js

module.exports = {
  mode: 'none',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  optimization: {
    sideEffects: true, // 标识为true就会去package.json中去检查有无副作用
  }
}

// package.json
{
  "name": "31-side-effects",
  "version": "0.1.0",
  "main": "index.js",
  "author": "zce <w@zce.me> (https://zce.me)",
  "license": "MIT",
  "scripts": {
    "build": "webpack"
  },
  "devDependencies": {
    "css-loader": "^3.2.0",
    "style-loader": "^1.0.0",
    "webpack": "^4.41.2",
    "webpack-cli": "^3.3.9"
  },
  // "sideEffects": false  //设置为false说明没有副作用，则多余的模块不会被打包
  "sideEffects": [
    "./src/extend.js", // 标识一下有副作用而不想被删除的模块，防止不会被打包
    "*.css"
  ]
}

```

## 代码分割

> webpack将所有模块都打包到一起，但是并不是每个模块在启动时都是必要的。
>
> 更好的方案是把打包结果按一定的规则分离，按照应用的运行结果按需加载。
>
> webpack 的理念就是把各个模块打包到一起，现在又要分离开来，是否矛盾？不矛盾，物极必反而已。

* 多入口打包：一个页面一个入口，公共部分提取。
* 动态导入：需要某个模块时，再去加载这个模块。

### 多入口打包配置

```js
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'none',
  entry: {
    index: './src/index.js',  // 多入口
    album: './src/album.js'
  },
  output: {
    filename: '[name].bundle.js' // 生成对应的文件名
  },
  optimization: {
    splitChunks: {
      // 自动提取所有公共模块到单独 bundle 一个文件
      // 打包后: index.bundle.js, album.bundle.js, index~album.bundle.js（公共部分）
      chunks: 'all'
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Multi Entry',
      template: './src/index.html',
      filename: 'index.html',
      chunks: ['index']  // index.html 只会引入打包后的 index.js
    }),
    new HtmlWebpackPlugin({
      title: 'Multi Entry',
      template: './src/album.html',
      filename: 'album.html',
      chunks: ['album'] // album.html 只会引入打包后的 album.js
    })
  ]
}
```

### 动态导入

> 需要某个模块时再去加载，动态导入的模块会被自动分包，例如常见的数字开头的 js 文件: 0.js 就是这类模块分包出来的文件。

```js
// import posts from './posts/posts'
// import album from './album/album'
// 删除固定导入

const render = () => {
  const hash = window.location.hash || '#posts'

  const mainElement = document.querySelector('.main')

  mainElement.innerHTML = ''
  // 根据 hash 值动态导入
  if (hash === '#posts') {
    // 魔法注释可以设置打包后文件名
    import(/* webpackChunkName: 'components' */'./posts/posts').then(({ default: posts }) => {	
      mainElement.appendChild(posts())
    })
  } else if (hash === '#album') {
    // 魔法注释可以设置打包后文件名
    import(/* webpackChunkName: 'components' */'./album/album').then(({ default: album }) => {
      mainElement.appendChild(album())
    })
  }
}

render()

window.addEventListener('hashchange', render)
```

[webpack SplitChunksPlugin实用指南](https://juejin.cn/post/6844903680307625997)

[Webpack之SplitChunks插件用法详解](https://zhuanlan.zhihu.com/p/152097785)

> 在研究splitChunks之前，我们必须先弄明白这三个名词是什么意思，主要是chunk的含义，要不然你就不知道splitChunks是在什么的基础上进行拆分。
>
> - module：就是js的模块化webpack支持commonJS、ES6等模块化规范，简单来说就是你通过import语句引入的代码。
> - chunk: chunk是webpack根据功能拆分出来的，包含三种情况：
>
> 　　　　1、你的项目入口（entry）
>
> 　　　　2、通过import()动态引入的代码（默认分包）
>
> 　　　　3、通过splitChunks拆分出来的代码
>
> 　　　　chunk包含着module，可能是一对多也可能是一对一。
>
> - bundle：bundle是webpack打包之后的各个文件，一般就是和chunk是一对一的关系，bundle就是对chunk进行编译压缩打包等处理之后的产出。

```js
const resolve = require('path').resolve
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'none',
    entry: {
        entry1: './src/entry1.js',
        entry2: './src/entry2.js'
    },
    plugins: [
        new CleanWebpackPlugin()
    ],
    output: {
        filename: '[name].bundle.js',
        path: resolve(__dirname, 'dist')
    },
    optimization: {
        // splitChunks作用: 把 entry1.js 和 entry2.js 都共同引入的模块分包出来。
        // 假如 entry1.js 和 entry2.js 都引入了 element，那么 entry1.bundle.js 和 entry2.bundle.js
        // 不分包的话都会将 element 打包进去，两个文件就都会很大，所以需要分包处理
        splitChunks: {
            // 默认值就是async，分包的对象共同引入的异步模块。
            // initial: 分包的对象是共同引入的初始静态导入模块。all: 分包所有的共同引入的模块。
            chunks: 'all',
            // name代表打包出来的 chunk 的名称，有三种值：
            // 1.boolean = false (webpack5中不支持true)
            // 2.function (module, chunks, cacheGroupKey) => string 
            // 3.string
            // 一般都是使用 false，就是以 cacheGroups 中的 name 命名，如果没有 name，默认为 2.js, 3.js 这种数字类型的
            name: false,
            // 表示要被提取的模块最小被引用次数，引用次数超过或等于minChunks值，才能被提取
            // 这个例子里 subtract 被引用了 2 次，如果设置成 3 则不能被分包
            minChunks: 2,
            // 表示只有超过了多少字节才会被提取, 默认值是 20000，这里设置成 1 是为了这个例子里能分包 modules 中模块
            minSize: 1,
            // 模块打包生成的文件大小不能超过的值，如果超了要对其进行分割并打包生成新的文件。
            // webpack4中默认为0表示大小不限制, webpack5中取消了默认值设置为0时表示大于0的就会分割
            maxSize: 9999999999,
            // 动态引入的模块，并行请求的最大数量
            maxAsyncRequests: 5,
            // 打包后的入口文件加载时，能同时初始加载js文件的数量
            // 优先级: maxInitialRequest/maxAsyncRequests < maxSize < minSize
            maxInitialRequests: 3,
            // 命名连接符
            automaticNameDelimiter: '~',
            cacheGroups: {
                vendors: {
                    name: 'vendors',
                    test: /[\\/]node_modules[\\/]/,
                    priority: 10
                },
                modules: {
                    name: 'modules',
                    test: resolve('src/modules'),
                    priority: 10,
                    reuseExistingChunk: true
                }
            }
        }
    }
}
```

* [demo](https://github.com/jinjingxuan/webpack-splitchunk-demo)
* [官方文档](https://webpack.docschina.org/plugins/split-chunks-plugin/)

## mini-css-extract-plugin

> mini-css-extract-plugin将css单独提取出来，如果 css 超过 150KB 时需要单独提取
>
> 提取出来后还需要用OptimizeCssAssetsWebpackPlugin进行压缩
>
> 因为 webpack 内置的压缩插件只打包 js 文件

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')

module.exports = {
  mode: 'none',
  entry: {
    main: './src/index.js'
  },
  optimization: {
    minimizer: [
      new TerserWebpackPlugin(),
      new OptimizeCssAssetsWebpackPlugin() 
    ]
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // 'style-loader', // 将样式通过 style 标签注入
          MiniCssExtractPlugin.loader, // 直接通过 link 方式引入
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin()
  ]
}
```

> 为什么ptimizeCssAssetsWebpackPlugin插件放在这不放在 plugins 数组中呢 ?
>
> 因为放在 plugins 说明在任何时候都会加载这个插件，而我们放到 minimizer 中，只会在生产环境开启 minimizer 时工作
>
> 但是这时会发现 js 没有压缩，因为我们设置了minimizer，webpack会认为我们自定义了压缩插件，所以我们还要添加回去压缩 js 的插件TerserWebpackPlugin。

## 文件名 Hash

```js
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Dynamic import',
      template: './src/index.html',
      filename: 'index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name]-[contenthash:8].bundle.css' // 文件级别的hash
      // filename: '[name]-[chunkhash].bundle.css'  // chunk级别
      // filename: '[name]-[hash].bundle.css'       // 项目级别，一个文件改变，所有hash全部改变
    })
  ]
}
```

