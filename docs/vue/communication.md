---
title: Vue组件通信的方式
date: 2020-11-12 10:27:54
categories: Vue
---
# Vue组件通信的方式
* $root / $parent / $children
* $refs
* provide / inject
* $attrs / $listeners
* props / $emit
* vuex
* EventBus
* v-model

## $root

```js
<template>
  <div>
    <!--
      小型应用中可以在 vue 根实例里存储共享数据
      组件中可以通过 $root 访问根实例
    -->
    $root.title：{{ $root.title }}
    <br>
    <button @click="$root.title = 'Hello $root'">改变 title</button>
  </div>
</template>
```

## $parent/$children

指定已创建的实例之父实例，在两者之间建立父子关系。子实例可以用 `this.$parent` 访问父实例，子实例被推入父实例的 `$children` 数组中。

节制地使用 `$parent` 和 `$children` - 它们的主要目的是作为访问组件的应急方法。更推荐用 props 和 events 实现父子组件通信

```js
<!-- parent.vue -->
<template>
  <div class="parent">
    parent
    <child></child>
  </div>
</template>

<script>
export default {
  components: {
    child
  },
  data () {
    return {
      title: '获取父组件实例'
    }
  },
  methods: {
    handle () {
      console.log(this.title)
    }
  }
}
</script>

<!-- children.vue -->
<template>
  <div class="child">
    child<br>
    $parent.title：{{ $parent.title }}<br>
    <button @click="$parent.handle">获取 $parent.title</button>
    <button @click="$parent.title = 'Hello $parent.title'">改变 $parent.title</button>
  
    <grandson></grandson>
  </div>
</template>
```

## $refs

```js
<!-- parent.vue -->
<template>
  <div>
    <myinput ref="mytxt"></myinput>
    <button @click="focus">获取焦点</button>
  </div>
</template>

<script>
export default {
  components: {
    myinput
  },
  methods: {
    focus () {
      this.$refs.mytxt.focus() // 调用的是子组件的 focus 方法
      this.$refs.mytxt.value = 'hello'
    }
  }
}
</script>

<!-- myinput.vue -->
<template>
  <div>
    <input v-model="value" type="text" ref="txt">
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: 'default'
    }
  },
  methods: {
    focus () {
      this.$refs.txt.focus() // this.$refs.txt 获取 DOM 对象，focus 方法获取焦点
    }
  }
}
</script>
```

## provide/inject

> `provide` 和 `inject` 主要在开发高阶插件/组件库时使用。并不推荐用于普通应用程序代码中。

这对选项需要一起使用，以允许一个祖先组件向其所有子孙后代注入一个依赖，不论组件层次有多深，并在其上下游关系成立的时间里始终生效。如果你熟悉 React，这与 React 的上下文特性很相似。

**提示：`provide` 和 `inject` 绑定并不是可响应的。这是刻意为之的。然而，如果你传入了一个可监听的对象，那么其对象的 property 还是可响应的。并且在子组件中不可修改**

```js
// 父级组件提供 'foo'
var Provider = {
  provide: {
    foo: 'bar'
  },
  // ...
}

// 子组件注入 'foo'
var Child = {
  inject: ['foo'],
  created () {
    console.log(this.foo) // => "bar"
  }
  // ...
}
```

## $attrs / $listeners

* $attrs ：把父组件中非 prop 属性绑定到内部组件
* $listeners：把父组件中的 DOM 对象的原生事件绑定到内部组件
* 可查看文章[Vue - 组件通信之$attrs、$listeners](https://www.cnblogs.com/chanwahfung/p/11520909.html)
* [如何理解vue中的native](https://juejin.cn/post/6844904166167429133)

## props / $emit

> 父组件通过props向子组件传递数据，子组件通过$emit触发父组件的方法，从而实现子到父的通信

#### 父组件传子组件：通过props

```js
<!--父组件-->
<template>
    <div>我是父组件,我的值是{{ msg }}
        <child :logo="msg"></child>
    </div>
</template>

<script>
import child from './child'
export default {
  data () {
    return {
      msg: '123'
    }
  },
  components: {
    child
  }
}
</script>


<!--子组件-->
<template>
    <div>
      <div>我是子组件,这是父组件的值：{{ logo }}</div>
    </div>
</template>

<script>
export default {
  name: 'child',
  data () {
    return {
    }
  },
  props: ['logo']
}
</script>

<!--
	我是父组件,我的值是123
	我是子组件,这是父组件的值：123
-->
```

#### 子组件传父组件：$emit

- 输入框的onchange事件，要在 input 失去焦点的时候才会触发；
- oninput 事件在用户输入时触发，它是在元素值发生变化时立即触发；

```js
<!--父组件-->
<template>
    <div>
        <child @transfer="get"></child>
        <div>我是父组件：这是子组件传来的值：{{ msg }}</div>
    </div>

</template>

<script>
import child from './child'
export default {
  data () {
    return {
      msg: ''
    }
  },
  components: {
    child
  },
  methods: {
    get (msg) {
      this.msg = msg
    }
  }
}
</script>

<!--子组件-->
<template>
    <div>
        <input type="text" v-model="msg" @input="set">
    </div>
</template>

<script>
export default {
  name: 'child',
  data () {
    return {
      msg: ''
    }
  },
  methods: {
    set: function () {
      this.$emit('transfer', this.msg)
      console.log(1)
    }
  }
}
</script>

<!--
    23131 //输入框
    我是父组件：这是子组件传来的值：23131
-->
```

## vuex

[vuex](https://www.jinjingxuan.com/2020/10/22/Vue-Vuex/)

## event bus

一个完整的eventBus主要分为三个部分：**eventBus组件、注册事件（$on）、发送事件（$emit）**

## v-model

父组件通过v-model传递值给子组件时，会自动传递一个value的prop属性，在子组件中通过this.$emit(‘input',val)自动修改v-model绑定的值

```js
Vue.component('child',{
    props:{
      value:String, //v-model会自动传递一个字段为value的prop属性
    },
    data(){
      return {
        mymessage:this.value
      }
    },
    methods:{
      changeValue(){
        this.$emit('input',this.mymessage);//通过如此调用可以改变父组件上v-model绑定的值
      }
    },
    template:`
      <div>
        <input type="text" v-model="mymessage" @change="changeValue">
      </div>
  })


  Vue.component('parent',{
    template:`
      <div>
        <p>this is parent compoent!</p>
        <p>{{message}}</p>
        <child v-model="message"></child>
      </div>
    `,
    data(){
      return {
        message:'hello'
      }
    }
  })
```

