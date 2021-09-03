---
title: 规范化标准ESLint
date: 2020-09-10 22:27:54
categories: 前端工程化
---

## ESLint 安装与配置

安装：`npm init --yes`，`npm intall eslint --save-dev`

配置：`eslint --init`，此时会有一些问题，按需回答即可，一般选用 Standard 规范，安装一些依赖之后

使用`eslint foo.js`检查目标文件即可

```js
// .eslintrc.js
module.exports = {
  env: {
    browser: true, // 运行环境 browser/node/commonjs等，可以同时使用
    es6: false
  },
  extends: [ // 继承公共配置
    'standard'
  ],
  parserOptions: { // 语法解析器，只是检测语法，env中的 es6 设置了 false，还是不可用
    ecmaVersion: 2015
  },
  rules: { // 校验规则
    'no-alert': "error" // 有 off/warn/error 选项
  },
  globals: { // 声明可以使用的全局成员
    "jQuery": "readonly"
  }
}
```

## 配置注释

> standard 标准不支持 模板字符串语法，但是在项目中某一行我还是想用一下怎么办，可以通过配置注释
>
> 禁用规则：no-template-curly-in-string

```js
const str1 = '${name} is a coder' // eslint-disable-line no-template-curly-in-string

console.log(str1)
```

## ESLint 结合自动化工具

#### ESLint 结合 gulp

在已经配置好 gulp 的项目中安装`gulp-eslint`：` yarn add gulp-eslint --save-dev`

初始化`.eslintrc.js`配置文件

```js
// gulpfile.js
const script = () => {
  return src('src/assets/scripts/*.js', { base: 'src' })
    .pipe(plugins.eslint()) // 如果只加入这一行只会检查错误，而不会抛出错误
    .pipe(plugins.eslint.format())
    .pipe(plugins.eslint.failAfterError())
    .pipe(plugins.babel({ presets: ['@babel/preset-env'] }))
    .pipe(dest('temp'))
    .pipe(bs.reload({ stream: true }))
}
```

#### ESLint 结合 webpack

安装`eslint-loader`，初始化`.eslintrc.js`配置文件

```js
// webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: './src/main.js',
  module: {
    rules: [
      {
        test: /\.js$/, 
        exclude: /node_modules/, 
        use: 'babel-loader'
      },
      {
        test: /\.js$/, 
        exclude: /node_modules/, 
        use: 'eslint-loader',
        enfore: 'pre' // 优先级最高
      },
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
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ]
}
```

> vue-cli 在安装过程中有选项会自动集成 eslint 配置

### eslint 检查 TypeScript

* eslint 初始化时选择 TypeScript

```js
// .eslintrc.js

module.exports = {
  env: {
    browser: true,
    es2020: true
  },
  extends: [
    'standard'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 11
  },
  plugins: [
    '@typescript-eslint'
  ],
  rules: {
  }
}
```

## Stylelint

* 提供默认的代码检查规则
* 提供CLI工具，快速调用
* 通过插件支持Sass，Less，PostCSS
* 支持 Gulp 或 Webpack 集成

安装 stylelint ：`yarn add stylelint -D`

安装配置模块：`stylelint-config-standard`

sass配置模块：`stylelint-config-sass-guidelines`

```js
// .stylelintrc.js
modules.exports = {
    extends: ["stylelint-config-standard", "stylelint-config-sass-guidelines"]
}
```

执行检查：`stylelint ./index.sass`

## Prettier

安装：`yarn add prettier -D`

运行：`prettier style.css --write`可以自动将格式化后的文件覆盖源文件

## Git Hooks

* Git Hooks也称之为 git 钩子，每个钩子都对应一个任务（commit/push）
* 通过 shell 脚本可以编写钩子任务触发时要具体执行的操作

`.git/hooks/pre-commit.sample`为`commit`之前的钩子函数，可以新建一个`pre-commit`文件写一些操作

`Husky`可以实现`Git Hooks`的使用需求

 安装：`yarn add Husky -D`

```json
// 在package.json中配置

{
    "husky": {
        "hooks": {
            "pre-commit": "eslint ./index.js"
        }
    }   
}
```

此外还有`lint-staged`模块等