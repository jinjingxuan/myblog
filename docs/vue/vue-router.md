---
title: Vue Router
date: 2020-09-13 14:47:00
categories: Vue
---
# Vue Router
* Vue Router 使用步骤
* 动态路由
* 嵌套路由
* 编程式导航
* hash模式和history模式
* 模拟实现 Vue Router

## Vue Router 使用步骤

```js
├───public
└───src
    ├───assets
    ├───components
    ├───router
    	  ├───index.js
    ├───views
    	  ├───Blog.vue
    	  ├───Index.vue
    	  ├───Photo.vue
    ├───App.vue
    └───main.js
```

```js
// router/index.js
import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
// 1. 注册路由插件
Vue.use(VueRouter)

// 路由规则
const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/blog',
    name: 'Blog',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "blog" */ '../views/Blog.vue')
  },
  {
    path: '/photo',
    name: 'Photo',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "photo" */ '../views/Photo.vue')
  }
]
// 2. 创建 router 对象
const router = new VueRouter({
  routes
})

export default router
```

```js
// main.js
import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

new Vue({
  // 3. 注册 router 对象
  router,
  render: h => h(App)
}).$mount('#app')
```

```html
<!-- App.vue -->
<template>
  <div id="app">
    <div>
      <img src="@/assets/logo.png" alt="">
    </div>
    <div id="nav">
      <!-- 5. 创建链接 -->
      <router-link to="/">Index</router-link> |
      <router-link to="/blog">Blog</router-link> |
      <router-link to="/photo">Photo</router-link>
    </div>
    <!-- 4. 创建路由组建的占位 -->
    <router-view/>
  </div>
</template>
```

> router-view 是用来渲染通过路由映射过来的组件，当路径更改时， 中的内容也会发生更改
>
> 主要应用于单页面中，与router-link配合，渲染router-link 映射过来的组件。

## 动态路由

在vue项目中，使用vue-router如果进行不传递参数的路由模式，则称为静态路由；如果能够传递参数，对应的路由数量是不确定的，此时的路由称为动态路由。动态路由，是以冒号为开头的(:)，例子如下：

```js
// index.js
import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/detail/:id', // id占位符
    name: 'Detail',
    // 开启 props，会把 URL 中的参数传递给组件
    // 在组件中通过 props 来接收 URL 参数
    props: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // 只有使用的时候才加载详情页
    component: () => import(/* webpackChunkName: "detail" */ '../views/Detail.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
```

```html
<!-- App.vue -->
<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Index</router-link> |
      <router-link to="/detail/11">Detail</router-link>
    </div>
    <router-view/>
  </div>
</template>

<!-- Detail.vue -->
<template>
  <div>
    <!-- 方式1： 通过当前路由规则，获取数据 -->
    通过当前路由规则获取：{{ $route.params.id }}

    <br>
    <!-- 方式2：路由规则中开启 props 传参 -->
    通过开启 props 获取：{{ id }}
  </div>
</template>

<script>
export default {
  name: 'Detail',
  props: ['id']
}
</script>
```

## 嵌套路由

![wwzc4K.png](https://s1.ax1x.com/2020/09/13/wwzc4K.png)

> 抽取公共组件 layout.vue 存储 header 和 footer

```js
//index.js
import Vue from 'vue'
import VueRouter from 'vue-router'
// 加载组件
import Layout from '@/components/Layout.vue'
import Index from '@/views/Index.vue'
import Login from '@/views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    name: 'login',
    path: '/login',
    component: Login
  },
  // 嵌套路由
  {
    path: '/',
    component: Layout,
    children: [
      {
        name: 'index',
        path: '',
        component: Index
      },
      {
        name: 'detail',
        path: 'detail/:id',
        props: true,
        component: () => import('@/views/Detail.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
```

## 编程式导航的几种方法

* this.$router.push：跳转到指定URL，向history栈添加一个新的记录，点击后退会返回至上一个页面
* this.$router.replace：跳转到指定URL，替换history栈中最后一个记录，点击后退会返回至上上一个页面

* this.$router.go(n)：向前或向后跳转n个页面，n可正（向后跳转）可负（向前跳转）

```js
this.$router.push({ name: 'Detail', params: { id: 1 } })
this.$router.replace('/login')
this.$router.go(-2)

// 返回主页
this.$router.push('/')
// this.$router.push({ name: 'Home' })
```

## hash模式和history模式

### history模式的使用

* 通过history.pushState()方法改变地址栏
* 监听popstate事件
* 根据当前路由地址找到对应组件进行重新渲染

* History需要服务器的支持
* 单页应用中，服务端不存在`http:www.testurl.com/login`这样的地址会返回找不到该页面
* 在服务端应该除了静态资源外都返回单页应用的`index.html`

```js
// 这是一个简单的 node 服务器
const path = require('path')
// 导入处理 history 模式的模块
const history = require('connect-history-api-fallback')
// 导入 express
const express = require('express')

const app = express()
// 注册处理 history 模式的中间件，一旦客户端请求不存在的地址，服务端都会返回单页的index.html
app.use(history())
// 处理静态资源的中间件，网站根目录 ../web
app.use(express.static(path.join(__dirname, '../web')))

// 开启服务器，端口是 3000
app.listen(3000, () => {
  console.log('服务器开启，端口：3000')
})
```

同样的在nginx服务器中也可以配置返回`index.html`，客户端来判断路由地址对应展示内容。

### hash模式的使用

* URL中#后面的内容作为路径地址
* 监听hashchange事件
* 根据当前路由地址找到对应组件重新渲染

## 模拟实现 Vue Route

前置知识：

* vue的构建版本 

> 运行时版：不支持 template 模板，需要打包的时候提前编译，如果你打包的时候是用vue-loader 或者 vueify，将`*.vue文件内的templates编译成JavaScript代码， 你就不需要compiler, 可以使用 runtime-only版本编译。
>
> 完整版：包含运行时和编译器，体积比运行时版大10K左右，程序运行时把模板转换成render函数
>
> vue-cli默认创建运行时版

* slot插槽

```html
	<div id = "app">
        <aaa>
            <p slot = "s1">在上面的内容</p>
            <p slot = "s2">在下面的内容</p>
        </aaa>
    </div>
	
	<!-- 子组件 -->
    <template id="aaa">
        <div class = "aaa">
            <slot name = "s1"></slot>
            <p>我是aaa组件</p>
            <slot name = "s2"></slot>
        </div>
    </template>
```

* 混入mixin

```js
混入 (mixin) 提供了一种非常灵活的方式，来分发 Vue 组件中的可复用功能。一个混入对象可以包含任意组件选项。当组件使用混入对象时，所有混入对象的选项将被“混合”进入该组件本身的选项

// 定义一个混入对象
var myMixin = {
  created: function () {
    this.hello()
  },
  methods: {
    hello: function () {
      console.log('hello from mixin!')
    }
  }
}

// 定义一个使用混入对象的组件
var Component = Vue.extend({
  mixins: [myMixin]
})

var component = new Component() // => "hello from mixin!"

```

* render函数

> 简单的说，在vue中我们使用模板HTML语法组建页面的，使用render函数我们可以用js语言来构建DOM
>
> 因为vue是虚拟DOM，所以在拿到template模板时也要转译成VNode的函数，而用render函数构建DOM，vue就免去了转译的过程。
>
> 当使用render函数描述虚拟DOM时，vue提供一个函数，这个函数是就构建虚拟DOM所需要的工具。官网上给他起了个名字叫createElement。还有约定的简写叫h,

```html
<div>
    <myslot>
    	<p>hello world</p>
    </myslot>
</div>	

<template id="myslot">
	<h1 v-if="level==1">
    	<slot></slot>    
    </h1>
    <h2 v-if="level==2">
    	<slot></slot>    
    </h2>
    <h3 v-if="level==3">
    	<slot></slot>    
    </h3>
    <h4 v-if="level==4">
    	<slot></slot>    
    </h4>
</template>
```

使用render函数将myslot动态生成

```js
'myslot':{
    render: function(createElement) {
        return createElement('h' + this.level, this.$slot.default) //h(n),helloworld
    }
}
```

* Vue.use(plugin, arguments)

- 参数：`plugin(Function | Object)`

- 用法：
   如果vue安装的组件类型必须为`Function`或者是`Object`

  如果是个对象，必须提供**install**方法

  如果是一个函数，会被直接当作`install`函数执行

  `install`函数接受参数，默认第一个参数为Vue,其后参数为注册组件时传入的`arguments`

**实现思路**

* 创建VueRouter插件，静态方法 install
  * 判断插件是否已经被加载
  * 当Vue加载时把传入的router对象挂载到Vue实例上
* 创建VueRouter类
  * 初始化，options，routeMap，app
  * createRouteMap()遍历所有路由信息，把组件和路由的映射记录到routeMap对象中
  * 注册popstate事件，当路由地址发生变化，重新记录当前路径
  * 创建router-link和router-view组件
  * 当路径改变时，在routerMap中找到对应的组件，渲染router-view

```js
let _Vue = null
class VueRouter {
    // Vue.use(VueRouter) 表示使用VueRouter插件，调用 install 方法
    static install(Vue){
        //1 判断当前插件是否被安装
        if(VueRouter.install.installed) return;
        
        VueRouter.install.installed = true
        //2 把Vue的构造函数记录在全局，后面使用vue.component时会用到
        _Vue = Vue
        
        //3 把创建Vue的实例传入的router对象注入到Vue实例
        _Vue.mixin({
            beforeCreate(){
                if(this.$options.router){
                    _Vue.prototype.$router = this.$options.router // 给所有的vue实例添加     
                	// $ 一般是vue中自带的，和普通的属性没什么区别
                    // 在vue的原型上添加一个 $router，令其注册在vue实例上的 router
                    // 即等于 vue.$options.router
                } 
            }
        })
    }
    constructor(options){
        this.options = options
        this.routeMap = {}
        // observable
        this.data = _Vue.observable({ 
            current:"/"    // current记录当前路由地址，"/"为当前的默认路径，为响应式数据
        })
        this.init()
    }
    init(){
        this.createRouteMap()
        this.initComponent(_Vue)
        this.initEvent()
    }
    createRouteMap(){
        //遍历所有的路由规则 吧路由规则解析成键值对的形式存储到routeMap中
        this.options.routes.forEach(route => {
            this.routeMap[route.path] = route.component
        });
    }
    initComponent(Vue){
        Vue.component("router-link",{
            props:{
                to:String
            },
            // template: '<a :href="to"><slot></slot></a>'
            // <router-link to="/blog">Blog</router-link> 就会把Blog替换插槽
            // 但是上面这种方式在运行时Vue不可用，不支持template
            // 完整版本的Vue就是把template编译成render函数，所以可以直接写render函数
            render(h){
                return h("a",{ // 三个参数：标签，属性，子元素slot
                    attrs:{
                        href:this.to
                    },
                    on:{
                        click:this.clickhander
                    }
                },[this.$slots.default]) // 默认插槽就是<slot></slot>
            },
            methods:{
                clickhander(e){
                    history.pushState({},"",this.to) // pushState改地址而且不向服务器发请求
                    this.$router.data.current=this.to
                    e.preventDefault() // 阻止默认行为
                }
            }
        })
        const self = this
        Vue.component("router-view",{
            render(h){
                // 获取组件
                const cm=self.routeMap[self.data.current] // current响应式数据，会重新渲染组件
                return h(cm)
            }
        })
        
    }
    initEvent(){
        // 点击浏览器的前进后退时，重新获取当前路径并记录到current
        window.addEventListener("popstate",()=>{
            this.data.current = window.location.pathname
        })
    }
}
```

* 前端路由是实现单页应用的基础 
* 可以通过this.$router对象获取当前路由对象中信息
* window.pushState不会触发popstate时间，浏览器前进后退时会触发

* 当浏览器地址的路由为#/artical，router-link to="/artical/101"生成的超链接的class属性会被设置为exact-active-class中的类样式，因为exact-active-class是用来设置路由地址精确匹配元素的样式

## 模拟hash模式vueRouter

```js
let _Vue = null
class VueRouter {
    // Vue.use(VueRouter) 表示使用VueRouter插件，调用 install 方法
    static install(Vue){
        //1 判断当前插件是否被安装
        if(VueRouter.install.installed) return;
        
        VueRouter.install.installed = true
        //2 把Vue的构造函数记录在全局，后面使用vue.component时会用到
        _Vue = Vue
        
        //3 把创建Vue的实例传入的router对象注入到Vue实例
        _Vue.mixin({
            beforeCreate(){
                if(this.$options.router){
                    _Vue.prototype.$router = this.$options.router // 给所有的vue实例添加     
                	// $ 一般是vue中自带的，和普通的属性没什么区别
                    // 在vue的原型上添加一个 $router，令其注册在vue实例上的 router
                    // 即等于 vue.$options.router
                } 
            }
        })
    }
    constructor(options){
        this.options = options
        this.routeMap = {}
        // observable
        this.data = _Vue.observable({ 
            current:"/"    // current记录当前路由地址，"/"为当前的默认路径，为响应式数据
        })
        this.init()
    }
    init(){
        this.createRouteMap()
        this.initComponent(_Vue)
        this.initEvent()
    }
    createRouteMap(){
        //遍历所有的路由规则 吧路由规则解析成键值对的形式存储到routeMap中
        this.options.routes.forEach(route => {
            this.routeMap[route.path] = route.component
        });
    }
    initComponent(Vue){
        Vue.component("router-link",{
            props:{
                to:String
            },
            // template: '<a :href="to"><slot></slot></a>'
            // <router-link to="/blog">Blog</router-link> 就会把Blog替换插槽
            // 但是上面这种方式在运行时Vue不可用，不支持template
            // 完整版本的Vue就是把template编译成render函数，所以可以直接写render函数
            render(h){
                return h("a",{ // 三个参数：标签，属性，子元素slot
                    attrs:{
                        href: '#' + this.to
                    },
                    on:{
                        click:this.clickhander
                    }
                },[this.$slots.default]) // 默认插槽就是<slot></slot>
            },
            methods:{
                clickhander(e){
                    window.location.hash = '#' + this.to
                    this.$router.data.current=this.to
                    e.preventDefault() // 阻止默认行为
                }
            }
        })
        const self = this
        Vue.component("router-view",{
            render(h){
                // 获取组件
                const cm=self.routeMap[self.data.current] // current响应式数据，会重新渲染组件
                return h(cm)
            }
        })
        
    }
    initEvent() {
        window.addEventListener('load', this.hashChange())
        window.addEventListener('hashchange', this.hashChange())
    }
    hashChange() {
        if (!window.location.hash) {
            window.location.hash = '#/'
        }
        this.data.current = window.location.hash.substr(1)
    }
}
```

