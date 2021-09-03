---
title: 服务端渲染与nuxtJs
date: 2020-11-08 11:27:54
categories: SSR
---
# 服务端渲染与nuxtJs
* 服务端渲染基础
  * 传统服务端渲染
  * SPA 单页应用
  * 同构应用
  * 如何实现同构渲染
* Nuxt.js 基础
* Nuxt.js 综合案例 

## 服务端渲染基础

### 传统服务端渲染

* 最早期，Web 页面渲染都是在服务端完成的，即服务端运行过程中将所需的数据结合页面模板渲染为

  HTML，响应给客户端浏览器。所以浏览器呈现出来的是直接包含内容的页面。

* 这种方式的代表性技术有：ASP、PHP、JSP，再到后来的一些相对高级一点的服务端框架配合一些模板

  引擎
  
* 在今天看来，这种渲染模式是不合理或者说不先进的。因为在当下这种网页越来越复杂的情况下，这种

  模式存在很多明显的不足：

  * 应用的前后端部分完全耦合在一起，在前后端协同开发方面会有非常大的阻力；

  * 前端没有足够的发挥空间，无法充分利用现在前端生态下的一些更优秀的方案；

  * 由于内容都是在服务端动态生成的，所以服务端的压力较大；

  * 相比目前流行的 SPA 应用来说，用户体验一般；


### SPA单页应用

* 随着ajax的发展（AJAX 是与服务器交换数据并更新部分网页的艺术，在不重新加载整个页面的情况下）以及前端框架的发展，Vue，React，Angular 都是基于客户端渲染的前端框架，这类框架所构建的都是单页应用（SPA）
* 优点
  * 用户体验好
  * 开发效率高
  * 渲染性能好
  * 可维护性好
* 缺点
  * 首屏渲染时间长
  * 不利于 SEO

### 同构应用

* 同构服务端渲染首屏直出，解决 SPA 应用首屏渲染慢以及不利于 SEO 问题
* 然后通过客户端渲染接管页面内容交互得到更好的用户体验
* 实际是【服务端渲染】 + 【客户端渲染】的结合
* 优点：首屏渲染速度快、有利于 SEO
* 缺点：
  * 开发成本高。
  * 涉及构建设置和部署的更多要求。与可以部署在任何静态文件服务器上的完全静态单页面应用程序 (SPA) 不同，服务器渲染应用程序，一般需要处于 Node.js server 运行环境。
  * 更多的服务器端负载。在 Node.js 中渲染完整的应用程序，显然会比仅仅提供静态文件的server 更加大量占用 CPU 资源 (CPU-intensive - CPU 密集)，因此如果你预料在高流量环境(high traffic) 下使用，请准备相应的服务器负载，并明智地采用缓存策略

### 如何实现同构渲染

* Vue、React等框架的官方解决方案
* 使用第三方解决方案
  * React 生态的 Next.js
  * Vue 生态的 Nuxt.js

## Nuxt.js 基础

Nuxt.js 是一个基于 Vue.js 的服务端渲染应用框架，它可以帮我们轻松的实现同构应用。

通过对客户端/服务端基础架构的抽象组织，Nuxt.js 主要关注的是应用的 **UI渲染**。

* [官网](https://zh.nuxtjs.org/)
* [Github仓库](https://github.com/nuxt/nuxt.js)

### 创建项目

```js
# 创建项目目录 
mkdir realworld-nuxtjs 

# 进入项目目录 
cd realworld-nuxtjs 

# 生成 package.json 文件 
npm init -y 

# 安装 nuxt 依赖 
npm install nuxt
```

在 `package.json` 中添加启动脚本：

```json
"scripts": { 
    "dev": "nuxt" 
}
```

`npm run dev` 启动服务

## 路由

*Nuxt.js 依据* `pages` *目录结构自动生成* [vue-router](https://github.com/vuejs/vue-router) *模块的路由配置。*

假设 `pages` 的目录结构如下：

```bash
pages/
--| user/
-----| index.vue
-----| one.vue
--| index.vue
```

那么，Nuxt.js 自动生成的路由配置如下：

```js
router: {
  routes: [
    {
      name: 'index',
      path: '/',
      component: 'pages/index.vue'
    },
    {
      name: 'user',
      path: '/user',
      component: 'pages/user/index.vue'
    },
    {
      name: 'user-one',
      path: '/user/one',
      component: 'pages/user/one.vue'
    }
  ]
}
```

## Nuxt.js 综合案例 

* [GitHub仓库](https://github.com/gothinkster/realworld)
* [在线示例](https://demo.realworld.io/#/)
* [接口文档](https://github.com/gothinkster/realworld/tree/master/api)
* [页面模板](https://github.com/gothinkster/realworld-starter-kit/blob/master/FRONTEND_INSTRUCTIONS.md)

* [项目地址](https://github.com/jinjingxuan/realworld-nuxtJs)