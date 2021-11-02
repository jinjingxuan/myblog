---
title: Vue3.0（一）
date: 2021-02-01 11:27:54
categories: Vue
---
# Vue3.0（一）
* Vue.js 3.0
* 目录结构
* 构建版本
* Composition API
* 函数式编程
* 性能提升
* Vite
* reactive/toRefs/ref
* Computed/Watch/WatchEffect

## Vue.js 3.0

* 源码组织方式的变化
  * 采用 TS 重写
  * 使用 Monorepo 管理项目结构
* Composition API
* 性能提升
* Vite

## 目录结构

> packages目录下有许多模块/包。Monorepo 是管理项目代码的一个方式，指在一个项目仓库 (repo) 中管理多个模块/包 (package)，不同于常见的每个模块建一个 repo。[Vue3.0 中的 monorepo 管理模式](https://juejin.cn/post/6844903961896435720)，[Monorepo 是什么，为什么大家都在用？](https://zhuanlan.zhihu.com/p/77577415)

* compiler-core：平台无关的编译器
* compiler-dom：浏览器平台下的编译器，依赖于compiler-core
* compiler-sfc：（single file component）编译单文件组件
* compiler-ssr：服务端渲染的编译器
* reactivity：数据响应式系统
* runtime-core：平台无关的运行时
* runtime-dom：浏览器平台下的运行时
* runtime-test：为了测试的运行时，dom树是js对象，可运行于所有js环境里
* server-renderer：服务端渲染
* shared：vue内部使用的一些公共的API
* size-check：一个私有的包，不会发布到npm，在treeshaking后检查包的大小
* template-explorer：实时编译组件。输出render函数
* vue：构建完整版的vue

## 构建版本

* cjs（commonJs规范）
  * vue.cjs.js
  * vue.cjs.prod.js
* global（可以直接通过script引入，增加全局vue对象，runtime是只包含运行时）
  * vue.global.js
  * vue.global.prod.js
  * vue.runtime.global.js
  * vue.runtime.global.prod.js
* browser（通过script type=module方式引入）
  * vue.esm-browser.js
  * vue.esm-browser.prod.js
  * vue.runtime.esm-browser.js
  * vue.runtime.esm-browser.prod.js
* bundler（没有打包的代码，要配合打包工具）
  * vue.esm-bundler.js
  * vue.runtime.esm-bundler.js

## Options API

在 vue2.x 中采用的是 Options API

> `在vue2中如何组织代码的`，**我们会在一个vue文件中methods，computed，watch，data中等等定义属性和方法，共同处理页面逻辑，**我们称这种方式为Options API

* 包含一个描述组件选项(data, methods, props等)的对象
* Options API 开发复杂组件，同一个功能逻辑的代码被拆分到不同选项

## Composition API

* vue.js 3.0 新增的一组 API
* 一组基于函数的 API
* 可以更灵活的组织组件的逻辑

[Composition API图示](https://user-images.githubusercontent.com/499550/62783026-810e6180-ba89-11e9-8774-e7771c8095d6.png)

[Vue3为什么要使用Composition API](https://juejin.cn/post/6875253488017342478)

## 函数式编程

> Vue2 对外表现的编程模式基本就是：对象调用自己的数据和方法——`this` + `.` 操作。所以在 Vue2 时代，我们通常会把相关的数据和操作写在同一个对象里。但是到了 Vue3 的 `setup` 里，你几乎不会用到 `this` 了；变成了让函数来调用对象或是另一个函数——就是 FP 的特点了。通俗来说，就是从基于对象的编程（OOP）转向了函数式编程（FP）。

## 性能提升

* 响应式系统升级：采用 Proxy

* 编译优化

  * Vue.js 2.x中通过标记静态根节点，优化 diff 的过程，静态节点仍需要 diff 
  * Vue.js 3.0中标记和提升所有的静态根节点，diff 的时候只需要对比动态节点内容
    * Fragments（升级 vetur 插件，没有根节点也不会报错，会创建一个 Fragment 片段）
    * 静态提升（再次编译可以跳过静态根节点）
    * Patch flag
    * 缓存事件处理函数
  * 例子：[vue2模板编译](template-explorer.vuejs.org)、[vue3模板编译网址](https://vue-next-template-explorer.netlify.app)

     ```html
     <div id='app'>
         <div>static root
     		<div>static node</div>
         </div>
         <div>static node</div>
         <div>static node</div>
         <div :id="id">{{ count }}</div>
         <button @click="handler"></button>
     </div>
     <!-- 1. 删掉根节点试一下
          2. 右上角options中选择 hoistStatic 提升静态节点
          3. 右侧可以找到 patch flag
          4. 右上角options可以开启缓存 -->
     ```

* 源码体积的优化

  * 移除一些不常用的 API：inline-template, filter
  * Tree-shaking

## Vite

### ES Module

* 现代浏览器都支持 ES Module（ie 不支持）
* 通过下面的方式加载模块
  * `<script type="module" src="..."></script>`
* 支持模块的 script 默认延迟加载

回顾浏览器加载模块（type=module会自动添加上defer属性）过程: **加载模块并执行是在DOM树创建完毕之后，DOMContentLoaded之前执行**

```html
<div id="app">hello world</div>
<script>
	window.addEventListener('DOMContentLoaded', () => {
        console.log('DOMContentLoaded')
  })
</script>
<script type="module" src="./index.js"></script>
```

```js
// index.js
import { forEach } from './utils.js'

const app = document.querySelector('#app')
console.log(app.innerHTML)

const arr = [1, 2, 3]
forEach(arr, item => {
    console.log(item)
})
```

```js
// 输出
// Hello World
// 1 2 3
// DOMContentLoaded

// （1）DOMContentLoaded 事件触发时，仅当DOM加载完成，不包括样式表，图片(譬如如果有async加载的脚本就不一定完成)。

// （2）load 事件触发时，页面上所有的DOM，样式表，脚本，图片都已经加载完成了。
```

### Vite vs Vue-CLI

* Vite 在开发模式下不需要打包可以直接运行（开发模式下使用script type=module，不需要打包代码）
* Vue-CLI 开发模式下必须对项目打包才可以运行
* 生产环境下使用 Rollup 打包（基于ES Modules的方式打包）

### Vite 特点

* 快速冷启动
* 按需编译
* 模块热更新

### Vite创建项目

```shell
npm init vite-app <project-name>
cd <project-name>
npm install
npm run dev
```

### 基于模板创建项目

```shell
npm init vite-app --template react
```

## Composition API 详解

### setup 入口函数

* setup 函数是组合式 API 的入口函数，它在 **组件创建之前** 被调用

* 因为在 `setup` 执行时组件尚未创建，`setup` 函数中的 `this` 不是当前组件的实例

* 函数接收两个参数，props 和 context，context 可以解构为 attrs、slots、emit 函数
  * props：通过 `prop` 传递过来的**所有数据**，我们都可以在这里进行接收。并且获取到的数据将**保持响应性**。
  * context：context 是一个 **JavaScript 对象**，这个对象暴露了三个组件的属性，我们可以通过 **解构** 的方式来分别获取这三个属性
    * **attrs：** 它是绑定到组件中的 **非 props** 数据，并且是非响应式的。
    * **slots：** 是组件的插槽，同样也不是 响应式的。
    * **emit：** 是一个方法，相当于 vue2 中的 this.$emit 方法。

* 函数可以返回一个对象，对象的属性可以直接在模板中进行使用，就像之前使用 data 和 methods 一样。

### 一个简单的例子：实时显示鼠标位置

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <div id="app">
    x: {{ position.x }} <br>
    y: {{ position.y }}
  </div>
  <script type="module">
    
    import { createApp, reactive, onMounted, onUnmounted } from './vue.esm-browser.js'
		
    // 把功能封装成一个函数，data，menthods，hooks都在这个函数中
    function useMousePosition () {
      
      // reactive 处理成响应式
      const position = reactive({
        x: 0,
        y: 0
      })

      const update = e => {
        position.x = e.pageX
        position.y = e.pageY
      }

      onMounted(() => {
        window.addEventListener('mousemove', update)
      })

      onUnmounted(() => {
        window.removeEventListener('mousemove', update)
      })

      return position
    }
		
    // creatAPP 创建 vue 对象
    const app = createApp({
      setup () {
        const position = useMousePosition()
        
        // return 给模板使用
        return {
          position
        }
      }
    })

    app.mount('#app')
  </script>
</body>
</html>
```

## 生命周期钩子函数

> setup()  开始创建组件之前，在`beforeCreate`和`created`之前执行。创建的是`data`和`method`

| Options API   | Hook inside setup | 说明                        |
| ------------- | ----------------- | --------------------------- |
| beforeCreate  | setup             | 组件创建之前                |
| created       | setup             | 组件创建完成                |
| beforeMount   | onBeforeMount     | 组件挂载之前                |
| mounted       | onMounted         | 组件挂载完成                |
| beforeUpdate  | onBeforeUpdate    | 数据更新，虚拟dom打补丁之前 |
| updated       | onUpdated         | 数据更新，虚拟dom渲染完成   |
| beforeDestroy | onBeforeUnmount   | 组件销毁之前                |
| destroyed     | onUnmounted       | 组件销毁后                  |

## reactive/toRefs/ref

* reactive：处理复杂数据类型为响应式
* ref：处理基本数据类型为响应式
* toRefs：`toRefs` 是 `toRef` 的批量版本。会将传入对象的每个属性处理为 `ref` 的值

> ref实现的内部创建了一个对象，将value值设置成响应式的。其实他也可以接受复杂数据类型作为参数，但是其内部依然是调用 `reactive` api 进行的响应式处理，这个过程对用户来说是隐藏的。所以，为了使代码更清晰，你应该使用 **ref 去处理基本类型的影响式数据**，而使用 **reactive 去处理复杂类型的数据**（注意，这里指的不是所有的负责类型的数据）

```js
const a = ref(0)
console.log(a.value) // 0
```

* [vue3 中的响应式处理---> Ref](https://juejin.cn/post/6854573210781483021#heading-8)

再看上面的例子，如果在插值表达式中想直接使用x, y而不使用 position

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <div id="app">
    x: {{ x }} <br>
    y: {{ y }}
  </div>
  <script type="module">
    import { createApp, reactive, onMounted, onUnmounted, toRefs } from './vue.esm-browser.js'

    function useMousePosition () {
      
      const position = reactive({
        x: 0,
        y: 0
      })

      const update = e => {
        position.x = e.pageX
        position.y = e.pageY
      }

      onMounted(() => {
        window.addEventListener('mousemove', update)
      })

      onUnmounted(() => {
        window.removeEventListener('mousemove', update)
      })
			
      // 把属性也设置成响应式的
      return toRefs(position)
    }
		
    const app = createApp({
      setup () {
        // 解构时依旧为响应式
        const { x, y } = useMousePosition()
        return {
          x,
          y
        }
      }
    })
    
    app.mount('#app');
  </script>
</body>
</html>
```

## Computed/Watch/WatchEffect

### Computed

* 第一种用法

  * let plusOne = computed(() => count.value + 1)

* 第二种用法

  * ```js
    const count = ref(1)
    const plusOne = computed({
      get: () => count.value + 1
      set: val => {
        count.value = val - 1
      }
    })
    ```

## Watch

* Watch的三个参数
  * 第一个参数：要监听的数据
  * 第二个参数：监听到数据变化后执行的函数，这个函数有两个参数分别为新值和旧值
  * 第三个参数：选项对象，deep 和 immediate
* Watch的返回值
  * 取消监听的函数

```html
<!-- 一个例子：自动回答 yes/no -->
<script type="module">

    import { createApp, ref, watch } from './vue.esm-browser.js'

    createApp({
      setup () {
        const question = ref('')
        const answer = ref('')

        watch(question, async (newValue, oldValue) => {
          const response = await fetch('https://www.yesno.wtf/api')
          answer.value = await response.json()
        })

        return {
          question,
          answer
        }
      }
    }).mount('#app');
  
  </script>
```

### WatchEffect

> `watchEffect`的用法与`watch`有所不同，`watchEffect`会传入一个函数，然后立即执行这个函数，对于函数里面的响应式依赖会进行监听，然后当依赖发生变化时，会重新调用传入的函数

```js
import { ref, watchEffect } from 'vue'
export default {
  setup() {
    const id = ref('0')
    
    watchEffect(() => {
      // 先输出 0 然后两秒后输出 1
      console.log(id.value)
    })

    setTimeout(() => {
      id.value = '1'
    }, 2000)
  }
}
```

### 进阶

**作用：** 用来追踪响应式依赖，并在追踪的时候自动触发一次，后序检测到**响应式**依赖的话，会再次更新，注意所有的里面的**响应式数据（ref\reactive）** 都会自动被加入依赖中

**用法：** 传入一个副作用方法，并会自动追踪里面的响应式依赖，另外还可以传入一个可选的options，用于控制副作用触发的时机：pre|post|sync，分别是组件渲染前后和同步，默认是pre。此外 watchEffect返回了一个停止监听的函数。

* [Vue3 学习笔记之 watchEffect](https://juejin.cn/post/6904967987883671560#heading-5)
* [Vue3.0来袭，你想学的都在这里（二）](https://juejin.cn/post/6872113750636232712#heading-4)

