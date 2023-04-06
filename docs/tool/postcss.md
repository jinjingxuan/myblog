# postcss

1. [官方文档](https://www.postcss.com.cn/)

2. [github地址](https://github.com/postcss/postcss#usage)
3. [PostCSS 入门教程](https://mp.weixin.qq.com/s/Gd56E4sXUDChnpL8yL-b0g)
4. [Postcss了解一下](https://juejin.cn/post/6964364929377779719)

PostCSS 是一个用 JavaScript 工具和插件转换 CSS 代码的工具，常见的功能如：

* 使用下一代css语法
* 自动补全浏览器前缀
* 自动把px代为转换成rem
* css 代码压缩等等

PostCSS 可以称为一个平台，提供了一个解析器，能够将 CSS 解析成 AST，还需要配合插件使用。

大多数构建工具内置了 PostCSS，例如 vite，可以直接配置

## 与预处理器的区别

* Less / Sass / Stylus，这类工具都属于 CSS 预处理工具。预处理指的是通过特殊的规则，将非 css 文本格式最终生成 css 文件。
* postcss 则是对 CSS 进行处理，最终生成的还是 CSS。
* 从其名字 postcss 可以看出早期是被当做后处理器的。也就是处理less/sass 编译后的 css。最常用的插件就是 autoprefixer，根据浏览器版本添加兼容前缀。（post：在...之后的，例如后序遍历 postorder）

## 接入 webpack

目前一般还是 postcss 和 less/sass 结合使用，在 webpack 配置中，postcss-loader 要写在 sass-loader/less-loader 前面。

```js
module.exports = {
    module: {
        rules: [
            {
                test: /\.(css|less)$/i,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader'],
            },
        ]
    }
}
```

## 常用插件

* Autoprefixer：前缀补全
* postcss-pxtorem：把 px 转换成 rem

```css
:fullscreen {
}

/* 处理后 */
:-webkit-full-screen {
}
:-ms-fullscreen {
}
:fullscreen {
}
```

## [API 使用](https://github.com/postcss/postcss#js-api)

Postcss 除了插件的使用方式还提供了 api：

```js
let postcss = require('postcss');
let autoprefixer = require('autoprefixer');

let css = `:fullscreen {}`

postcss([autoprefixer]).process(css).then(result => {
  console.log(result.css)
})

// 输出
// :-webkit-full-screen {}
// :-ms-fullscreen {}
// :fullscreen {}
```

### [Result.root](https://postcss.org/api/#result-root)

除了 Result.css 还有 Result.root 等属性

![result](./imgs/result.png)

### [LazyResult](https://postcss.org/api/#lazyresult)

Post CSS 转换结果的 Promise 代理

```js
const lazy = postcss([autoprefixer]).process(css)
```

* [LazyResult.root]()

通过同步插件处理输入 CSS 并返回 Result.root，也就是说两个 API 返回结果相同。

注意：此属性仅适用于同步插件。 如果处理器包含任何异步插件，它将引发错误。

```js
let postcss = require('postcss');
const autoprefixer = require('autoprefixer');

let css = `:fullscreen {}`

const lazy = postcss([autoprefixer]).process(css)
console.log(lazy.root)
```

