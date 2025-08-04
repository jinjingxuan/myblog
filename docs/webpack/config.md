# webpack 常见配置

## publicPath, contentBase 区别

* [webpack配置中的path、publicPath和contentBase](https://www.cnblogs.com/ssw-men/p/11505529.html)

* [Webpack中publicPath详解](https://juejin.cn/post/6844903601060446221)

* [output里面的publicPath和devServer中的publicPath的区别](https://juejin.cn/post/6954238345178415141)

## externals

Webpack 中的 externals 配置项主要用于排除某些依赖项不被打包到最终的bundle 文件中，而是在运行时从外部获取这些依赖。简单来说，就是让你的代码可以引用这些外部依赖，但它们不会被打包进你的项目中，而是通过其他方式（比如CDN 引入）提供。这样做的好处是可以减小bundle 的体积，加快页面加载速度，并避免重复打包一些常用的库。

具体来说，externals 的作用包括:
1. 减少打包体积:
当你的项目依赖于一些大型库（如jQuery、React、Vue 等），并且这些库已经通过CDN 引入到页面中，或者在其他地方已经存在，那么使用 externals 就可以避免将这些库再次打包到你的项目中，从而减小最终的bundle 文件大小。﻿
2. 提高加载速度:
由于减小了bundle 的体积，页面加载速度自然会得到提升，特别是对于那些依赖大量外部库的项目来说，效果更加明显。﻿
3. 避免重复打包:
当多个项目都依赖同一个库时，使用 externals 可以避免每个项目都打包一份相同的库，节省资源。﻿
4. 支持不同的模块化规范:
externals 不仅可以用于排除全局变量，还可以支持CommonJS、AMD、UMD 等不同的模块化规范。﻿