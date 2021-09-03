---
title: Rollup
date: 2020-09-10 10:27:54
categories: 前端工程化
---

## Rollup快速上手

举例：src 目录下有如下三个文件

```js
// messages.js
export default {
  hi: 'Hey Guys, I am zce~'
}

// logger.js
export const log = msg => {
  console.log('---------- INFO ----------')
  console.log(msg)
  console.log('--------------------------')
}

export const error = msg => {
  console.error('---------- ERROR ----------')
  console.error(msg)
  console.error('---------------------------')
}

// index.js
// 导入模块成员
import { log } from './logger'
import messages from './messages'

// 使用模块成员
const msg = messages.hi

log(msg)
```

安装 Rollup：`yarn add rollup --dev `

执行打包命令：`yarn rollup ./src/index.js --format iife --file dist/bundle.js`

Rollup会自动执行`tree shaking`，去除无效代码

```js
// bundle.js
(function () {
  'use strict';

  const log = msg => {
    console.log('---------- INFO ----------');
    console.log(msg);
    console.log('--------------------------');
  };

  var messages = {
    hi: 'Hey Guys, I am zce~'
  };

  // 导入模块成员

  // 使用模块成员
  const msg = messages.hi;

  log(msg);

}());
```

## rollup配置文件

```js
// rollup.config.js
export default {
  input: 'src/index.js',   // 入口
  output: {
    file: 'dist/bundle.js',
    format: 'iife'
  }
}
```

运行命令：`yarn rollup --config rollup.config.js`

## Rollup使用插件

安装可以导入 json 的插件：`yarn add rollup-plugin-json --dev `

```js
import json from 'rollup-plugin-json'

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'iife'
  },
  plugins: [
    json()  // 调用的结果
  ]
}
```

### Rollup 加载 node_modules 中的 NPM 模块

``yarn add rollup-plugin-node-resolve --dev ``，配置同上

```js
// index.js

// 导入模块成员
import _ from 'lodash-es'
import { log } from './logger'

// 使用模块成员
log(_.camelCase('hello world'))
```

> Rollup 默认只能使用 ES Modules模块，所以要导入 lodash-es，不能导入原本的 lodash

### Rollup 加载 CommonJS

> 因为依旧很多第三方模块使用 ComminJS 规范，所以需要插件处理

`yarn add rollup-plugin-commonjs --dev`

```js
// 自己写一个 CommonJS 规范的模块 cjs-module.js
module.exports = {
  foo: 'bar'
}

// index.js
import cjs from './cjs-module'
```

## 代码拆分

```js
// 动态导入
import('./logger').then(({ log }) => { // import('./logger')返回promise，解构提取log方法
  log('code splitting~')
})
```

> 使用代码拆分不能用 iife 格式，应该使用 AMD 或者 CommonJS 规范，而在浏览器端只能使用 AMD 规范

```JS
export default {
  input: 'src/index.js',
  output: {
    dir: 'dist', // 多个文件，使用 dir
    format: 'amd'
  }
}
```

### 多入口打包

```js
export default {
  input: {
    foo: 'src/index.js',  // 两个入口
    bar: 'src/album.js'
  },
  output: {
    dir: 'dist',
    format: 'amd'
  }
}

// 最后在 dist 目录下生成3个文件，foo.js，bar.js，和公共部分的js
```

```html
  <!-- AMD 标准格式的输出 bundle 不能直接引用 -->
  <!-- <script src="foo.js"></script> -->
  <!-- 需要 Require.js 这样的库 -->
  <script src="https://unpkg.com/requirejs@2.3.6/require.js" data-main="foo.js"></script>
```

## 优缺点

* 输出结果更加扁平
* 自动移除未引用代码
* 打包结果依然完全可读

****

* 加载非 ESM 的第三方模块比较复杂
* 模块最终都被打包到一个函数中，无法实现 HMR
* 浏览器环境中，代码拆分功能依赖 AMD 库

****

开发应用程序使用 webpack，开发一个框架或者类库使用 Rollup