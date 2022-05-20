# 跨域相关

本文不是八股文知识点，不会介绍 jsonp、iframe 等跨域方式，只介绍在开发中最常见的几种跨域方式。

## Access-Control-Allow-Origin

最简单的方式：服务端配置 `Access-Control-Allow-Origin: * `，借此复习一下几种响应头。

**[预检请求 (opens new window)](http://www.ruanyifeng.com/blog/2016/04/cors.html)相关响应头**

- Access-Control-Allow-Origin：响应头指定了该响应的资源是否被允许与给定的[origin (opens new window)](https://developer.mozilla.org/zh-CN/docs/Glossary/Origin)共享。
- Access-Control-Allow-Methods: 响应首部 **`Access-Control-Allow-Methods`** 在对 [preflight request (opens new window)](https://developer.mozilla.org/zh-CN/docs/Glossary/Preflight_request).（预检请求）的应答中明确了客户端所要访问的资源允许使用的方法或方法列表。
- Access-Control-Allow-Headers: 响应首部 **`Access-Control-Allow-Headers`** 用于 [preflight request (opens new window)](https://developer.mozilla.org/zh-CN/docs/Glossary/Preflight_request)（预检请求）中，列出了将会在正式请求的 [`Access-Control-Request-Headers` (opens new window)](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Access-Control-Request-Headers)字段中出现的首部信息。
- Access-Control-Allow-Credentials: 当请求要求携带证书信息（例如cookie,授权信息等）验证，服务器端是否允许携带
- Access-Control-Max-Age: 本次预检请求的有效期，单位为秒

## proxy 代理

由于 webpack-dev-server 是一个本地开发服务器，所以我们的应用在开发阶段是独立运行在 localhost 的一个端口上，而后端服务又是运行在另外一个地址上。但是最终上线过后，我们的应用一般又会和后端服务部署到同源地址下。

那这样就会出现一个非常常见的问题：在实际生产环境中能够直接访问的 API，回到我们的开发环境后，再次访问这些 API 就会产生跨域请求问题。

可能有人会说，我们可以用跨域资源共享（CORS）解决这个问题。确实如此，如果我们请求的后端 API 支持 CORS，那这个问题就不成立了。但是并不是每种情况下服务端的 API 都支持 CORS。如果前后端应用是同源部署，也就是协议 / 域名 / 端口一致，那这种情况下，根本没必要开启 CORS，所以跨域请求的问题仍然是不可避免的。

那解决这种开发阶段跨域请求问题最好的办法，就是在开发服务器中配置一个后端 API 的代理服务，也就是把后端接口服务代理到本地的开发服务地址。

webpack-dev-server 就支持直接通过配置的方式，添加代理服务。接下来，我们来看一下它的具体用法。

比如我们假定 GitHub 的 API 就是我们应用的后端服务，那我们的目标就是将 GitHub API 代理到本地开发服务器中，我们可以先在浏览器中尝试访问其中的一个接口： [https://api.github.com/users](https://api.github.com/users/mojombo/followers)

```js
devServer: {
    contentBase: './public',
    proxy: {
      '/api': {
        // http://localhost:8080/api/users -> https://api.github.com/api/users
        target: 'https://api.github.com',
        // http://localhost:8080/api/users -> https://api.github.com/users
        pathRewrite: {
          '^/api': ''
        },
        // 不能使用 localhost:8080 作为请求 GitHub 的主机名
        changeOrigin: true
      }
    }
  },
```

![1](https://img-blog.csdnimg.cn/20200531181008355.png)

那此时我们请求 http://localhost:8080/api/users ，就相当于请求了 https://api.github.com/users

```js
// 此时再写跨域请求，就可正常访问
// 虽然 GitHub 支持 CORS，但是不是每个服务端都应该支持。
// fetch('https://api.github.com/users')
fetch('/api/users')
  .then(res => res.json())
// 实际请求到http://localhost:8080/api/users
```

## Allow CORS 插件

[chrome网上应用商店地址](https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf?hl=zh-CN)

开发时只需开启插件即可，原理也是添加响应头 Access-Control-Allow-Origin

> Easily add (Access-Control-Allow-Origin: *) rule to the response header.

但是注意这种方式不一定完全适用，且不用的时候注意关掉，因为访问正常网站的时候可能会报错。

## 接口的形式

项目中的接口一般分为两种写法，第一种是区分测试环境和线上环境：

```
测试环境地址：api.github-test.com/api/users
正式环境地址：api.github.com/api/users
```

另一种是使用相对路径的方式，只写 `/api/users`，不用区分测试和线上环境，这种方式一般使用上述的 devserver 开发的，测试环境可以直接跑在开发机上，线上部署后由于相对路径请求起来也没问题。

