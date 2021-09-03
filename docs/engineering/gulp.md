---
title: gulp构建工具
date: 2020-09-01 09:47:00
categories: 前端工程化
---

## 什么是gulp

[gulpjs](http://gulpjs.com/)是一个前端构建工具，与[gruntjs](http://gruntjs.com/)相比，gulpjs无需写一大堆繁杂的配置参数，API也非常简单，学习起来很容易，而且gulpjs使用的是nodejs中[stream](http://nodejs.org/api/stream.html)来读取和操作数据，其速度更快。 

**gulp：The streaming build system**

## gulp初体验

初始一个项目文件夹叫`gulp`，使用`npm init`初始化`package.json`文件，然后使用`cnpm install -g gulp`安装

依赖，`code gulpfile.js  `新建一个`gulpfile.js`文件，作为入口文件，示例如下：

```js
exports.foo = done => {
  console.log('foo task working~')
  done() // 标识任务完成
}

exports.default = done => {
  console.log('default task working~')
  done() // 标识任务完成
}

const gulp = require('gulp')

gulp.task('bar', done => {
  console.log('bar working')
  done()
})

// 分别运行如下：
// gulp foo
// gulp
// gulp bar
```

### 组合任务（串行，并行）

```js
const { series, parallel } = require('gulp')

const task1 = done => {
  setTimeout(() => {
    console.log('task1')
    done()
  }, 1000)
}

const task2 = done => {
  setTimeout(() => {
    console.log('task2')
    done()
  }, 1000)
}

const task3 = done => {
  setTimeout(() => {
    console.log('task3')
    done()
  }, 1000)
}

exports.foo = series(task1, task2, task3)   // 串行
exports.bar = parallel(task1, task2, task3) // 并行

// 执行 gulp foo, gulp bar
```

### gulp处理异步任务

```js
exports.callback = done => {
  console.log('callback')
  done()
}

exports.callback_error = done => {
  console.log('callback error')
  done(new Error('task failed'))
}

exports.promise = () => {
  console.log('promise task')
  return Promise.resolve()
}

exports.promise_error = () => {
  console.log('promise task')
  return Promise.reject('task failed')
}

const timeout = time => {
  return new Promise(resolve => {
    setTimeout(resolve, time)
  })
}

exports.async = async () => {
  await timeout(1000)
  console.log('async task')
}

// 处理文件 stream
exports.stream = () => {
  const readStream = fs.createReadStream('package.json')
  const writeStream = fs.createWriteStream('temp.txt')
  readStream.pipe(writeStream)
  return readStream
}
```

## 压缩过程实现

```js
const fs = require('fs')
const { Transform } = require('stream')

exports.default = () => {
  // 文件读取流
  const read = fs.createReadStream('foo.css')
  // 文件写入流
  const write = fs.createWriteStream('foo.min.css')
  // 文件转换流
  const transform = new Transform({
    transform: (chunk, encoding, callback) => {
      // 核心转换过程实现
      // chunk => 读取流中读取到的内容
      const input = chunk.toString()
      const output = input.replace(/\s+/g, '').replace(/\/\*.+?\*\//g, '')
      callback(null, output)
    }
  })

  read
    .pipe(transform) // 转换
    .pipe(write) // 写入

  return read
}
```

### 利用gulp的API来简化

```js
const { src, dest } = require('gulp')
const cleanCss = require('gulp-clean-css')
const rename = require('gulp-rename')

exports.default = () => {
  return src('src/*.css')
    .pipe(cleanCss())
    .pipe(rename({ extname: '.min.css' }))
    .pipe(dest('dist'))
}
```

## 构建实例

现在有一个目录结构，如何实现构建

> ── src
>     ├── about.html
>     ├── index.html
>     ├── assets
>         └── styles
>             ├── demo.scss
>             ├── main.scss
>             ├── _icons.scss
>             └── _variables.scss
>         └── scripts
>             ├── main.js
>         └── images
>             ├── logo.png
>             ├── a.svg

* 需要在src的同级目录下创建dist目录，且保留src的目录结构
* scss编译成css
* 利用 babel 将 es6 转成 es5
* png，svg图片进行压缩要先
* 每次构建要先删除原有的dist

```js
// gulpfile.js
const { src, dest, parallel, series } = require('gulp')
const sass = require('gulp-sass') // cnpm install -D gulp-sass
const babel = require('gulp-babel')
const swig = require('gulp-swig') // html模板引擎 cnpm install -D gulp-swig 
const imagemin = require('gulp-imagemin')

const del = require('del') // 删除功能的插件 cnpm install -D del

const data = { // 模板数据
    // ...
}

const clean = () => {
  return del(['dist'])
}

const style = () => {
    return src('src/assets/styles/*.scss', { base: 'src' }) // base 基准目录
    	.pipe(sass())
    	.pipe(dest('dist'))
}

const script = () => {
    return src('src/assets/scripts/*.js', { base: 'src' })
    	.pipe(babel({ presets: ['@babel/preset-env'] })) //babel只是平台，需要安装
		.pipe(dest('dist'))                             // @babel/core 和 @babel/preset-env
}                

const page = () => {
    return src('src/*.html, { base: 'src' }）
         .pipe(swig({ data }))
    	 .pipe(dest('dist'))
}

const image = () => {
     return src('src/assets/images/**', { base: 'src' })
         .pipe(imagemin())
    	 .pipe(dest('dist'))
}

// public目录的拷贝
const extra = () => {
  return src('public/**', { base: 'public' })
    .pipe(dest('dist'))
}

const compile = parallel(style, script, page, image) // compile只执行src的处理

const build = series(clean, parallel(compile, extra)) // 先删除

module.exports = {
  compile,
  build
}
```

### 插件越来越多怎么办

`cnpm install -D gulp-load-plugins` 使用这个插件自动加载插件所有

```js
// gulpfile.js
const loadPlugins = require('gulp-load-plugins')
const plugins = loadPlugins()

const style = () => {
  return src('src/assets/styles/*.scss', { base: 'src' }) 
    .pipe(plugins.sass()) // 所有插件使用plugin.sass()去使用
    .pipe(dest('dist'))
}
```

## 怎么实现热更新

* 会自动打开浏览器
* 修改`dist`下的文件，页面会自动更新

****

安装`browser-sync`插件：`cnpm install -D browser-sync ` 

```js
// gulpfile.js中增加以下内容

const browserSync = require('browser-sync')
const bs = browserSync.create()

const serve = () => {
  bs.init({
    notify: false,
    files: 'dist/**',    // 热更新文件
    port: 2080,
    server: {
      baseDir: 'dist'    // 基准目录
    }
  })
}

module.exports = {
  compile,
  build,
  serve  
}
```

### 怎么实现修改`src`下面的文件，自动执行编译过程，再更新到页面

使用`watch`插件来监听，同时优化一下组合任务

```js
const { src, dest, parallel, series, watch } = require('gulp')

const serve = () => {
  watch('src/assets/styles/*.scss', style)
  watch('src/assets/scripts/*.js', script)
  watch('src/*.html', page)
    
  watch([
    'src/assets/images/**',
    'public/**'
  ], bs.reload)

  bs.init({
    notify: false,
    files: 'dist/**',
    server: {
      baseDir: ['dist', 'src', 'public'] // 起服务时按顺序找文件，dist找不到就找src,图片就在src中
      routes: {
        '/node_modules': 'node_modules' // html文件中
      }
    }
  })
}

// 编译源文件到dist目录
const compile = parallel(style, script, page)

// 上线之前执行的任务：包括对图片的压缩等只需执行一次的任务
const build = series(clean, parallel(compile, image, extra))

// 开发过程中的任务，先编译再起服务器
const develop = series(compile, serve)

module.exports = {
  compile,
  build,
  serve,
  develop
}
```

**现在html文件中存在引用外部文件的方式**

```html
  <!-- build:css assets/styles/main.css -->
  <link rel="stylesheet" href="assets/styles/main.css">
  <!-- endbuild -->

  <!-- 处理成下面这种 -->
  <link rel="stylesheet" href="assets/styles/vendor.css">
```

**需要安装`useref`插件：`cnpm install -D gulp-useref`**，在`gulpfile.js`中创建一个新任务

```js
const useref = () => {
  return src('dist/*.html', { base: 'dist' })
    .pipe(plugins.useref({ searchPath: ['dist', '.'] }))
    .pipe(dest('dist'))
}
```
### 压缩文件

安装`cnpm install -D gulp-htmlmin gulp-uglify gulp-clean-css`

```js
const min = () => {
  return src('dist/**', { base: 'dist' })
    .pipe(plugins.if(/\.js$/, plugins.uglify()))
    .pipe(plugins.if(/\.css$/, plugins.cleanCss()))
    .pipe(plugins.if(/\.html$/, plugins.htmlmin({
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true
    })))
    .pipe(dest('release')) // 如果写dist会有文件冲突
}

// 解决办法是把目前的dist改为temp，作为中间文件，最后再压缩到dist中
```

### 构建完成的处理

```js
// 选择需要导出的任务
module.exports = {
  build,
  develop
}

// 把他写在package.json中
"scripts": {
    "build": "gulp build",
    "develop": "gulp develop"
}
```

### 封装工作流

**将构建过程封装，发布并使用模块，就不必在每个项目中单独去重复写`gulpfile.js`**

