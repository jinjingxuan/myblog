---
title: 自动化构建与grunt
date: 2020-08-31 20:53:00
categories: 前端工程化
---

## 什么是自动化构建

比如在项目中需要通过`sass main.css`来编译css文件，不必要每次都使用命令行命令来编译。

可以用`npm scripts`来实现自动化构建，在`package.json`中书写

```json
// 类似与这种就是自动化构建 
"scripts": {
    "dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js",
    "start": "npm run dev",
    "build": "node build/build.js",
    "lint": "eslint --fix --ext .js,.vue src",
    "precommit": "npm run lint"
}
```

## grunt

grunt是一款构建工具，在项目中使用`npm init`初始化一个`package.json`文件，然后使用`npm install grunt`

安装，安装成功之后创建`gruntfile.js`作为入口文件，编写如下：

```js
// Grunt的入口文件
// 需要导出一个函数，此函数接收一个 grunt 的形参

module.exports = grunt => {
  grunt.registerTask('foo', ()=>{
    console.log('hello grunt')
  }) // grunt foo

  grunt.registerTask('bar', ()=>{
    console.log('hello grunt bar')
  }) // grunt bar

  grunt.registerTask('default', ()=>{
    console.log('default task')
  }) // grunt

  grunt.registerTask('default', ['foo', 'bar']) // grunt

  // 模拟异步任务
  grunt.registerTask('async', function () {
    const done = this.async()
    setTimeout(() => {
      console.log('async task')
      done()
    })
  }, 1000) // grunt async
  
  // 标记任务失败
  grunt.registerTask('bad', ()=>{
    console.log('hello grunt bar')
    return false
  }) // grunt bad 会执行失败
}
```

**`initConfig`方法**

```js
module.exports = grunt => {
    grunt.initConfig({
        foo: {
            bar: 123
        }
    })  
  
  grunt.registerTask('foo', ()=>{
    console.log(grunt.config('foo.bar'))
  }) // grunt foo 输出 123
}
```

**多目标任务**

```js
module.exports = grunt => {

  grunt.initConfig({
    build: {
      options: { // 配置选项
        foo: 'bar'
      },
      css: {
        options: {
          foo: 'baz'
        }
      },
      js: '2'
    }
  })

  // 多目标模式，可以让任务根据配置形成多个子任务
  grunt.registerMultiTask('build', function () {
    console.log(this.options())
    console.log(`target: ${this.target}, data: ${this.data}`)
  })
}

// grunt build
// 输出

Running "build:css" (build) task
{ foo: 'baz' }
target: css, data: [object Object]

Running "build:js" (build) task
{ foo: 'bar' }
target: js, data: 2

Done.
```

**插件使用：clean插件删除文件**

```js
module.exports = grunt => {
    grunt.initConfig({
        clean: {
            temp: 'temp/**'
        }
    })
    
    grunt.loadNpmTasks('grunt-contrib-clean')
}

// grunt clean 可删除temp下对应文件
```

* grunt-sass
* grunt-babel

```js
const sass = require('sass')
const loadGruntTasks = require('load-grunt-tasks')

module.exports = grunt => {
  grunt.initConfig({
    sass: {
      options: {
        sourceMap: true, // 生成map文件
        implementation: sass
      },
      main: {
        files: {
          'dist/css/main.css': 'src/scss/main.scss' // 目录
        }
      }
    },
    babel: {
      options: {
        sourceMap: true,
        presets: ['@babel/preset-env']
      },
      main: {
        files: {
          'dist/js/app.js': 'src/js/app.js'
        }
      }
    },
    watch: { // 监听
      js: {
        files: ['src/js/*.js'],
        tasks: ['babel']
      },
      css: {
        files: ['src/scss/*.scss'],
        tasks: ['sass']
      }
    }
  })

  // grunt.loadNpmTasks('grunt-sass')
  loadGruntTasks(grunt) // 自动加载所有的 grunt 插件中的任务

  grunt.registerTask('default', ['sass', 'babel', 'watch']) // 首先执行 sass, babel 任务，再监听
}
```

