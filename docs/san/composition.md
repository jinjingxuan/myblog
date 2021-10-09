---
title: san-composition
date: 2021-10-09 11:27:54
categories: San
---

# [san-composition](https://github.com/baidu/san-composition)

Vue3.0 提出了组合式 api 的概念，san-composition 是 san 框架实现组合式 api 的方式，下面列出一些基础用法。

## 常用 api

* [template](https://github.com/baidu/san-composition/blob/master/docs/api.md#template)：定义组件模板的方法
* [data](https://github.com/baidu/san-composition/blob/master/docs/api.md#data)：初始化数据
* [components](https://github.com/baidu/san-composition/blob/master/docs/api.md#components)：子组件
* [method](https://github.com/baidu/san-composition/blob/master/docs/api.md#method)：定义组件中的方法
* [watch](https://github.com/baidu/san-composition/blob/master/docs/api.md#watch)：监听数据变化
* [computed](https://github.com/baidu/san-composition/blob/master/docs/api.md#computed)：计算属性
* [filters](https://github.com/baidu/san-composition/blob/master/docs/api.md#filters)：过滤器

## 生命周期

* [onConstruct](https://github.com/baidu/san-composition/blob/master/docs/api.md#onconstruct)：在 construct （组件初始化开始）过程到达时触发的钩子函数
* [onCompiled](https://github.com/baidu/san-composition/blob/master/docs/api.md#oncompiled)：在 compiled （组件视图模板编译完成）过程到达时触发的钩子函数
* [onInited](https://github.com/baidu/san-composition/blob/master/docs/api.md#oninited)：在 inited （组件实例初始化完成）过程到达时触发的钩子函数
* [onCreated](https://github.com/baidu/san-composition/blob/master/docs/api.md#oncreated)：在 created （组件元素创建完成）过程到达时触发的钩子函数
* [onAttached](https://github.com/baidu/san-composition/blob/master/docs/api.md#onattached)：在 attached （组件已被附加到页面）过程到达时触发的钩子函数
* [onDetached](https://github.com/baidu/san-composition/blob/master/docs/api.md#ondetached)：在 detached （组件从页面中移除）过程到达时触发的钩子函数
* [onDisposed](https://github.com/baidu/san-composition/blob/master/docs/api.md#ondisposed)：在 disposed （组件卸载完成）过程到达时触发的钩子函数
* [onUpdated](https://github.com/baidu/san-composition/blob/master/docs/api.md#onupdated)：在 updated （组件视图刷新后）过程到达时触发的钩子函数
* [onError](https://github.com/baidu/san-composition/blob/master/docs/api.md#onerror)：在 error （处理组件异常）过程到达时触发的钩子函数

## [DataProxy](https://github.com/baidu/san-composition/blob/master/docs/api.md#DataProxy)

DataProxy是data初始化返回的实例，支持如下方法：

* get
* set
* merge
* apply
* push / pop / unshift / shift
* remove / removeAt
* splice

## 完整的例子

[san-composition 进阶篇](https://github.com/baidu/san-composition/blob/master/README.md#%E8%BF%9B%E9%98%B6%E7%AF%87)

