---
title: Vue3.0（三）
date: 2021-02-22 11:27:54
categories: Vue
---

# Vite 概念

* Vite 是一个面向现代浏览器的一个更轻，更快的 web 应用开发工具
* 它基于 ECMAScript 标准原生模块系统（ES Modules）实现
* 主要为了解决开发阶段使用 webpack-dev-server 仍启动过慢，HMR 热更新反应慢

# Vite 项目依赖

* Vite：命令行工具
* @vue/compiler-sfc：编译 .vue 单文件组件，在 vue2 中是 vue=template-compiler

# 基础使用

* vite serve：开启 web 服务器，不需要编译所有文件，启动速度十分快
* vite build
  * Rollup
  * Dynamic import
    * Polyfill

## vite serve

> 只有具体使用模块的时候才会编译，HMR也立即编译当前所修改的文件

![sNcPaV.png](https://s3.ax1x.com/2021/01/13/sNcPaV.png)

## vue-cli serve

> 不管模块是否被执行，都会被打包
>
> HMR：会自动以这个文件为入口重新 build 一次，所有涉及到的依赖也都会被加载一遍

![sN6hgH.png](https://s3.ax1x.com/2021/01/13/sN6hgH.png)

## 打包 or 不打包

使用 webpack 打包的两个原因

* 浏览器环境并不支持模块化（已渐渐不存在 ）
* 零散的模块文件会产生大量的 http 请求

# 开箱即用

* TypeScript - 内置支持
* less / sass / stylus / postcss - 内置支持（需要单独安装）
* JSX
* Web Assembly

# Vite 特性

* 快速冷启动
* 模块热更新
* 按需编译
* 开箱即用

> webpack会先打包，然后启动开发服务器，请求服务器时直接给予打包结果。 而vite是直接启动开发服务器，请求哪个模块再对该模块进行实时编译。 由于现代浏览器本身就支持ES Module，会自动向依赖的Module发出请求。vite充分利用这一点，将开发环境下的模块文件，就作为浏览器要执行的文件，而不是像webpack那样进行打包合并。 由于vite在启动的时候不需要打包，也就意味着不需要分析模块的依赖、不需要编译，因此启动速度非常快。当浏览器请求某个模块时，再根据需要对模块内容进行编译。这种按需动态编译的方式，极大的缩减了编译时间，项目越复杂、模块越多，vite的优势越明显。 在HMR方面，当改动了一个模块后，仅需让浏览器重新请求该模块即可，不像webpack那样需要把该模块的相关依赖模块全部编译一次，效率更高。 当需要打包到生产环境时，vite使用传统的rollup进行打包，因此，vite的主要优势在开发阶段。另外，由于vite利用的是ES Module，因此在代码中不可以使用CommonJS