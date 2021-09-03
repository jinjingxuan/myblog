---
title: 面试题（十一）
date: 2018-08-03 09:21:01
categories: 面试
---
# 面试题（十一）
* MVVM
* Vue渲染流程
* Vue生命周期
* 父子组件声明周期
* vue和react的异同

## MVVM

MVVM 对应 3个组成部分，Model（模型）、View（视图） 和 ViewModel（视图模型）。

- View 是用户在屏幕上看到的结构、布局和外观，也称UI。
- ViewModel 是一个绑定器，能和 View 层和 Model 层进行通信。
- Model 是数据和逻辑。

View 不能和 Model 直接通信，它们只能通过 ViewModel 通信。Model 和 ViewModel 之间的交互是双向的，ViewModel 通过双向数据绑定把 View 层和 Model 层连接起来，因此 View 数据的变化会同步到 Model 中，而 Model 数据的变化也会立即反应到 View 上。

**严格的 MVVM 要求 View 不能和 Model 直接通信，而 Vue 在组件提供了 `$refs` 这个属性，让 Model 可以直接操作 View，违反了这一规定。**

## Vue渲染流程

流程主要分为三个部分：

1. **模板编译**，`parse` 解析模板生成抽象语法树（AST）；`optimize` 标记静态节点，在后续页面更新时会跳过静态节点；`generate` 将AST转成 `render` 函数，`render` 函数用于构建 `VNode`。
2. **构建VNode（虚拟dom）**，构建过程使用 `createElement` 构建 `VNode`，`createElement` 也是自定义 `render` 函数时接受到的第一个参数。
3. **VNode转真实dom**，`patch` 函数负责将 `VNode` 转换成真实dom，核心方法是`createElm`，递归创建真实dom树，最终渲染到页面上。

## Vue生命周期

1. **beforeCreate:** 在实例创建之前调用，由于实例还未创建，所以无法访问实例上的 `data`、`computed`、`method`等。
2. **created:** 在实例创建完成后调用，这时已完成数据的观测，可以获取数据和更改数据，但还无法与dom进行交互，如果想要访问dom，可以使用 `vm.$nextTick`。此时可以对数据进行更改，不会触发 `updated`。
3. **beforeMount:** 在挂载之前调用，这时的模板已编译完成并生成`render`函数，准备开始渲染。在此时也可以对数据进行更改，不会触发 `updated`。
4. **mounted:** 在挂载完成后调用，真实的dom挂载完毕，可以访问到dom节点，使用 `$refs` 属性对dom进行操作。
5. **beforeUpdate:** 在更新之前调用，也就是响应式数据发生更新，虚拟dom重新渲染之前被触发，在当前阶段进行更改数据，不会造成重渲染。
6. **updated：** 在更新完成之后调用，组件dom已完成更新。要注意的是避免在此期间更改数据，这可能会导致死循环。
7. **beforeDestroy：** 在实例销毁之前调用，这时实例还可以被使用，一般这个周期内可以做清除计时器和取消事件监听的工作。
8. **destroyed：** 在实例销毁之后调用，这时已无法访问实例。当前实例从父实例中被移除，观测被卸载，所有事件监听器呗移除，子实例也统统被销毁。

> created时已经可以访问到data和methods了，可以在此时进行调用接口。
>
> mounted是可以访问到DOM了，需要用到DOM的操作可以在此进行。

## 父子组件生命周期

加载渲染过程：

> 父beforeCreate->父created->父beforeMount->子beforeCreate->子created->子beforeMount->子mounted->父mounted

子组件更新过程：

> 父beforeUpdate->子beforeUpdate->子updated->父updated

父组件更新过程：

> 父beforeUpdate->父updated

销毁过程：

> 父beforeDestroy->子beforeDestroy->子destroyed->父destroyed

## vue和react的异同

### 1.核心思想

vue与react都推崇组件式的开发理念，但是在设计的核心思想上有很大差别。

### vue

vue的整体思想仍然是拥抱经典的html(结构)+css(表现)+js(行为)的形式，vue鼓励开发者使用template模板，并提供指令供开发者使用(v-if、v-show、v-for等等)，因此在开发vue应用的时候会有一种在写经典web应用（结构、表现、行为分离）的感觉。另一方面，在针对组件数据上，vue2.0通过`Object.defineProperty`对数据做到了更细致的监听，精准实现组件级别的更新。

### react

react整体上是函数式的思想，组件使用jsx语法，all in js，将html与css全都融入javaScript，jsx语法相对来说更加灵活，我一开始刚转过来也不是很适应，感觉写react应用感觉就像是在写javaScript。当组件调用setState或props变化的时候，组件内部render会重新渲染，子组件也会随之重新渲染，可以通过`shouldComponentUpdate`或者`PureComponent`可以避免不必要的重新渲染（个人感觉这一点上不如vue做的好）。