---
title: san框架
date: 2021-07-13 11:27:54
categories: San
---
# san框架
* san-store
* san-update
* san-native
* san生命周期

## san-store

san-store是san框架用于状态管理的工具，和vuex类似，但是还是有区别的，首先复习一下`vue`

> vue中更改`state`的方式有且只有一个： `mutation`，用`commit` 来触发，限制是只能同步修改。
>
> 想要异步需要`dispatch` 一个 `action`，`action`中再触发`commit`修改`state`，`action`中可以做异步操作。

```js
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  actions: {
    increment (context) {
      context.commit('increment')
    }
  }
})
// 通过 dispathch 触发
store.dispatch('increment')
```

![vuex](https://vuex.vuejs.org/vuex.png)

**San-store**中则不会有`mutation`和`action`之分，只存在`action`，通过`dispatch`来触发。

![san-store](https://raw.githubusercontent.com/baidu/san-store/master/doc/flow.png)

### store

**store**的概念和vuex中一样，那么一个初始化的store是什么样的呢？（san-update库实现了一个更新对象的函数，同时随更新过程输出新旧对象的差异结构）

```js
import {Store} from 'san-store';
import {builder} from 'san-update';

let myStore = new Store({
    initData: {
        user: {
            name: 'your name'
        }
    },

    actions: {
        changeUserName(name) {
            return builder().set('user.name', name);
        }
    }
});
```

### getState

san-store中用getState来获取state状态的值

```js
myStore.getState('user.name');
```

### Action

Action是一个函数，可以直接定义在store中，也可以通过 addAction 方法可以为 Store 添加 Action。

两个参数：

* payload载荷
* context对象：getState, dispatch

返回值：

* 返回一个 Promise 时，当前 Action 为异步
* 返回一个 builder 或什么都不返回时，当前 Action 为同步

[使用builder构建更新函数](https://github.com/baidu/san-update#%E4%BD%BF%E7%94%A8builder%E6%9E%84%E5%BB%BA%E6%9B%B4%E6%96%B0%E5%87%BD%E6%95%B0)

```js
function actionFun(payload, {getState, dispatch}) {
	// payload 载荷数据
  // getState 获取state状态
  // dispatch 触发其他action
}

// 同步 Action
store.addAction('setUserName', function (name) {
    return builder().set('user.name', name);
});

// 异步 Action
store.addAction('login', function (payload, {getState, dispatch}) {
    if (getState('user.name') === payload.name) {
        return;
    }

    dispatch('logining', true);
    return userService.validate(payload).then(() => {
        dispatch('setUserName', payload.name);
        dispatch('logining', false);
    })
});
```

### dispath

**参数**

- `{string} name` action名称
- `{*} payload` 给予的数据

**返回值**

- action 为同步时，返回 undefined
- action 为异步时，返回 Promise

```js
store.dispatch('login', {
    name: 'errorrik',
    password: 'xxxxx'
});
```

### connect

connect 用于将 store 实例与 san 组件连接，从而：

- 当 store 数据变更时，连接的组件数据也进行相应的变更
- 组件内部像调用方法一样 dispatch action，组件实现时无需关心对具体 store 的依赖

两个参数：

* mapStates
* mapActions

connect.san 返回一个执行 connect 操作的函数，这个函数可以接受一个组件类作为参数

```js
export default class UserComponent extends Component {
  // 插值表达式直接访问 mapStates
  static template = `
		<template>
			<div>{{ name }}</div>
		</template>
	`,
  
  changeName() {
    // 通过 this.actions 访问 mapActions
  	this.actions.change()
  }
}

connect.san(
    {name: 'user.name'},
    {change: 'changeUserName'}
)(UserComponent);
```

## san-update

**Immutable Data**

JavaScript 中的对象一般是可变的（Mutable），因为使用了引用赋值。

Immutable Data是指一旦被创造后，就不可以被改变的数据。

在javascript中我们可以通过deep clone来模拟Immutable Data，就是每次对数据进行操作，新对数据进行deep clone出一个新数据。但是深拷贝是用递归的方式实现的，十分消耗性能，所以诞生了Immutable Data

**可以理解为优化后的深拷贝**。

但是社区的库普遍存在一些问题，如：

1. 指令不够。除最基本的`set`、`push`、`unshift`、`merge`等功能外，其它功能难以方便地补充
2. 使用不便。当需要对一个对象的多个属性进行更新时，组装一个复杂的更新指令并不容易

`san-update`希望在社区经验的基础之上，通过提供更强大的功能和方便的使用方式（如链式调用）来简化基于不可变对象的系统开发

具体使用可看：[san-update官方文档](https://github.com/baidu/san-update)

## React Native

* RN是 React 的一个原生扩展
* 它允许我们通过 React 语法，来开发 ios 和 Android 原生应用

### 几种跨平台框架的比较

| 框架     | RN（NA View） | Weex（NA View） | Flutter（自绘制） |
| -------- | ------------- | --------------- | ----------------- |
| 所属公司 | FB            | ali             | google            |
| 编程语言 | js（React）   | js（Vue）       | Dart              |
| 引擎     | JSCore        | V8              | Flutter engine    |

### 移动 App 的开发模式

原生开发：android / iOS 

混合开发：RN / weex / Flutter

H5开发：html / css / js

| 开发模式 | 原生开发          | 混合开发              | web开发         |
| -------- | ----------------- | --------------------- | --------------- |
| 运行环境 | Android，iOS      | Android，iOS          | 浏览器，webview |
| 编程语言 | Java，Objective-C | JS，Dart(Flutter使用) | Html,css,js     |
| 可移植性 | 差                | 一般                  | 好              |
| 开发速度 | 慢                | 一般                  | 快              |
| 性能     | 快                | 较慢                  | 慢              |
| 学习成本 | 高                | 一般                  | 低              |

### RN 的优势

* 开发体验好
  * 用统一的代码规范开发移动端程序，不用关注移动端的差异
* 开发成本低
  * 开发一次，可以生成 Android 和 iOS 两个系统上的 app
  * Learn once，write anywhere
* 学习成本低
  * 只要掌握 JS 和 React，就可以进行移动端开发了

### RN的不足

* 不成熟
  * 项目版本更新维护较频繁，学习成本高
  * 试错成本高，有些问题较少解决方案，易耽误开发进度
* 性能差
  * 整体性能扔不如原生
* 兼容性差
  * 涉及底层的功能，需要针对 Android 和 ios 双端单独开发

### 运行原理

这里摘抄自[React Native 原理与实践](https://juejin.cn/post/6916452544956858382)

React Native 需要一个 JS 的运行环境，因为 React Native 会把应用的 JS 代码编译成一个 JS 文件（x x.bundle），React Native 框架的目标就是解释运行这个 JS 脚本文件，如果是 Native 拓展的 API，则直接通过 bridge 调用 Native 方法，最基础的比如绘制 UI 界面，映射 Virtual DOM 到真实的 UI 组件中。

![react native](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c0372c7df58e4b6584cae190862611a1~tplv-k3u1fbpfcp-zoom-1.image)

绿色的是我们应用开发的部分，我们写的代码基本上都是在这一层。

蓝色代表公用的跨平台的代码和工具引擎，一般我们不会动蓝色部分的代码。

黄色代表平台相关的 bridge 代码，做定制化的时候会添加修改代码。

红色代表系统平台的功能，另外红色上面有一个虚线，表示所有平台相关的东西都通过 bridge 隔离开来了，红色部分是独立于 React Native 的。

## Talos

Talos 是百度研发的一套动态 Native 视图框架，渲染引擎融合 Webview 和 NA，能同时支持 NA 和 Hybrid 的开发需求。它既能满足独立 App 的开发，也能满足平台型 App 内嵌。它专注性能优化，主要指标均优于同类框架。

San Native 作为 Talos 中的一种 DSL（「Domain Specific Language」,「领域特定语言」）, 采用 San UI 框架作为底层驱动，通过重写 Document 以及 Element 类来驱动端渲染，使得 Web 前端工程师可以十分方便的编写原生移动应用，一套代码多端运行。

### san-native

SanNative是一套动态NA视图框架，利用`JS引擎`驱动NA端渲染，使得web前端工程师可以十分方便的编写原生移动应用，一套代码二端运行。

> 浏览器渲染：React / vue / angular / san => DOM api => 渲染
>
> San-native：san => Render Api => NA渲染

### 为什么不用 rn 等其他方案

移动端采用开源方案（Vue/React）也是可以考虑的，外部库的好处在于发展的非常快，经常会有些新的 feature。但这也将会是个很大的风险，开源库的快速迭代意味着随时有新的最佳实践取代旧的模式而频繁的破坏性更改，让早期采用者承担重构成本。

## san生命周期

| 生命周期 | 触发时机                                                     |
| -------- | ------------------------------------------------------------ |
| compiled | 组件视图模板编译完成，template编译生成[ANODE](https://github.com/baidu/san/blob/master/doc/anode.md) |
| inited   | 组件实例初始化完成，可以访问到 data                          |
| created  | 组件元素创建完成，可以访问到路由信息                         |
| attached | 组件已被附加到页面中，此时可以访问到 DOM                     |
| detached | 组件从页面中移除                                             |
| disposed | 组件卸载完成                                                 |

其中`san`组件中路由相关的`route()`函数会在`inited`后，`created`前执行。