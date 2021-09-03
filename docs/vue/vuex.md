---
title: Vuex
date: 2020-10-22 11:27:54
categories: Vue
---
# Vuex
* 什么是 Vuex
* 核心概念
* vue-devtools
* 模拟 Vuex

## 什么是 Vuex

* Vuex 是专门为 Vue.js 设计的状态管理库
* 它采用集中式的方式存储需要共享的数据
* 从使用角度，它就是一个 JavaScript 库
* 它的作用是进行状态管理，解决复杂组件通信，数据共享
* 如果不打算开发大型单页应用，使用 Vuex 可能是繁琐冗余的。
* [官网](https://vuex.vuejs.org/zh/)

## 核心概念

每一个 Vuex 应用的核心就是 store（仓库）。“store”基本上就是一个容器，它包含着你的应用中大部分的**状态 (state)**。Vuex 和单纯的全局对象有以下两点不同：

1. Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。
2. 你不能直接改变 store 中的状态。改变 store 中的状态的唯一途径就是显式地**提交 (commit) mutation**。这样使得我们可以方便地跟踪每一个状态的变化，从而让我们能够实现一些工具帮助我们更好地了解我们的应用。

```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})
```

* State：**单一状态树**，用一个对象就包含了全部的应用层级状态。它作为一个“唯一数据源”而存在。

* Getter：Vuex 允许我们在 store 中定义“getter”（可以认为是 store 的计算属性）。就像计算属性一样，getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。

* Mutation：更改 Vuex 的 store 中的状态的唯一方法是提交 mutation

  * 你可以向 `store.commit` 传入额外的参数，即 mutation 的 **载荷（payload）**：

    ```js
    // ...
    mutations: {
      increment (state, n) {
        state.count += n
      }
    }
    
    store.commit('increment', 10)
    ```

  * 使用常量替代 mutation 事件类型在各种 Flux 实现中是很常见的模式。这样可以使 linter 之类的工具发挥作用，同时把这些常量放在单独的文件中可以让你的代码合作者对整个 app 包含的 mutation 一目了然：

    ```js
    // mutation-types.js
    export const SOME_MUTATION = 'SOME_MUTATION'
    
    // store.js
    import Vuex from 'vuex'
    import { SOME_MUTATION } from './mutation-types'
    
    const store = new Vuex.Store({
      state: { ... },
      mutations: {
        // 我们可以使用 ES2015 风格的计算属性命名功能来使用一个常量作为函数名
        [SOME_MUTATION] (state) {
          // mutate state
        }
      }
    })
        
    // JavaScript语言定义对象的属性，有两种方法
        
    // 方法一
    obj.foo = true;
    
    // 方法二
    obj['a' + 'bc'] = 123;
    ```

* Action：Action 类似于 mutation，不同在于：

  - Action 提交的是 mutation，而不是直接变更状态。

  - Action 可以包含任意异步操作。

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
    ```

  - Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象，因此你可以调用 `context.commit` 提交一个 mutation，或者通过 `context.state` 和 `context.getters` 来获取 state 和 getters。实践中，我们会经常用到 ES2015 的 [参数解构](https://github.com/lukehoban/es6features#destructuring) 来简化代码（特别是我们需要调用 `commit` 很多次的时候）

    ```js
    actions: {
      increment ({ commit }) {
        commit('increment')
      }
    }
    ```

  - Actions 支持同样的载荷方式和对象方式进行分发：

    ```js
    // 以载荷形式分发
    store.dispatch('incrementAsync', {
      amount: 10
    })
    
    // 以对象形式分发
    store.dispatch({
      type: 'incrementAsync',
      amount: 10
    })
    ```

* Module：由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。

  * 为了解决以上问题，Vuex 允许我们将 store 分割成**模块（module）**。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割

* 具体使用请看[官方文档](https://vuex.vuejs.org/zh/guide/state.html)

## vue-devtools

vue-devtools是一款基于chrome浏览器的插件,用于vue应用的调试,帮助我们快速的调试开发vue应用

## 模拟 Vuex

```js
let _Vue = null
class Store {
  constructor (options) {
    const {
      state = {},
      getters = {},
      mutations = {},
      actions = {}
    } = options
    this.state = _Vue.observable(state)
    this.getters = Object.create(null)
    Object.keys(getters).forEach(key => {
      Object.defineProperty(this.getters, key, {
        get: () => getters[key](state)
      })
    })
    this._mutations = mutations
    this._actions = actions
  }

  commit (type, payload) {
    this._mutations[type](this.state, payload)
  }

  dispatch (type, payload) {
    this._actions[type](this, payload)
  }
}

function install (Vue) {
  _Vue = Vue
  _Vue.mixin({
    beforeCreate () {
      if (this.$options.store) {
        _Vue.prototype.$store = this.$options.store
      }
    }
  })
}

export default {
  Store,
  install
}
```

* 测试

```js
import Vue from 'vue'
import Vuex from '../myvuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0,
    msg: 'Hello World'
  },
  getters: {
    reverseMsg (state) {
      return state.msg.split('').reverse().join('')
    }
  },
  mutations: {
    increate (state, payload) {
      state.count += payload
    }
  },
  actions: {
    increateAsync (context, payload) {
      setTimeout(() => {
        context.commit('increate', payload)
      }, 2000)
    }
  }
})
```

