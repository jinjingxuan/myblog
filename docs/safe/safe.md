---
title: 前端安全简介
date: 2021-01-01 09:21:01
categories: 前端安全
---
# 前端安全简介
* XSS
* CSRF
* 点击劫持
* HTTP传输安全
* 中间人攻击
* 第三方依赖安全
* 控制台注入代码
* 钓鱼
* 扩展

## XSS

> XSS指的是恶意攻击者往Web页面里插入恶意html代码，当用户浏览该页之时，嵌入其中Web里面的html代码会被执行，从而达到恶意攻击用户的特殊目的。简单举一个例子（dom型）

```html
<div v-html="content"></div>

<script>
  new Vue({
    el: '#app',
    data: {
      // src 不存在从而触发 onerror
      content: `<img src="xxx" onerror="alert(document.cookie)">`
      content: `<script>alert(document.cookie)</script>`
		}
})
</script>
```

### XSS危害

* 窃取 cookie
* 按键记录和钓鱼
* 未授权操作
* 获取页面数据
* 劫持前端逻辑
* 偷取用户资料
* ...

> XSS的攻击一般分为以下几类：反射型XSS，存储型XSS，DOM XSS。
>
> 反射型和存储型在纯前端渲染中已经很少见了，尤其在第三方框架下

#### 反射型XSS

> 用户在一个不防范 XSS 的网站中搜索内容，关键字为 XXX，如果网站内包含 XXX的内容，那么该内容就会被展示出来，如果网站中不包含相关，那么可能会提示 XXX 相关内容不存在。也就是，用户的搜索内容最终都会以某种方式反射到搜索结果中。如果搜索内容为：`<script>alert(1)</script>`，那么页面就会执行这段 JavaScript 代码，也即该网站存在 XSS 漏洞。

```js
// node 服务端 app.js
const express = require('express')

const app = express()

app.get('/', (req, res) => {
    // 1. 读取渲染页面的内容
    // 2, 将渲染结果发送给客户端
    res.render('index.html', {
        search: req.query.search // 通过地址栏传递
    })
})

app.listen(3000, () => console.log('http://loalhost:3000/'))
```

```html
<!-- index.html -->

<form action="/" method="GET">
    <!-- 输入框内输入 <script>alert(document.cookie)</script> -->
	<input name="search" type="text">
    <button>搜索</button>
</form>

{{ if search }}
</div> 展示搜索内容 </div>	
{{ /if }}
```

#### 存储型XSS

* 攻击者将恶意代码提交到目标网站的数据库中
* 用户打开目标网站时，服务端将恶意代码从数据库中取出，拼接在html中返回给浏览器
* 用户浏览器接收响应解析时，取出恶意代码执行
* 这种攻击常见于带有用户保存数据的网站功能，如论坛发帖、商品评论、用户私信等。

> 比如一个富文本编辑器，产生的结果：html格式的字符串，web后台存储到数据库中
>
> 当其他用户查看文章详情时，就会渲染文章内容，将恶意代码执行

#### DOM型XSS

> DOM 型 XSS 攻击，实际上就是网站前端 JavaScript 代码本身不够严谨，把不可信的数据当作代码执行了。
>
> 在使用 `.innerHTML`、`.outerHTML`、`document.write()` 时要特别小心，不要把不可信的数据作为 HTML 插到页面上，而应尽量使用 `.textContent`、`.setAttribute()` 等。
>
> 如果用 Vue/React 技术栈，并且不使用 `v-html`/`dangerouslySetInnerHTML` 功能，就在前端 render 阶段避免 `innerHTML`、`outerHTML` 的 XSS 隐患。
>
> DOM 中的内联事件监听器，如 `location`、`onclick`、`onerror`、`onload`、`onmouseover` 等，`<a>` 标签的 `href` 属性，JavaScript 的 `eval()`、`setTimeout()`、`setInterval()` 等，都能把字符串作为代码运行。如果不可信的数据拼接到字符串中传递给这些 API，很容易产生安全隐患，请务必避免。
>
> DOM 型和前两种的区别：DOM 型 XSS中，取出和执行恶意代码由浏览器端完成，其他两种都属于服务端安全漏洞

### XSS 攻击注入点

* HTML中内嵌文本，恶意代码以 script 标签注入
* 标签的 href, src 等属性中，包含 javascript 等可执行代码
* 在 onload, onerror, onclick 等事件中
* style 属性和标签中，包含 background-image: url("javascript")
* style 属性和标签中，包含 expression(...) 的 CSS 表达式代码

### XSS 防御

XSS 攻击有两大要素：

* 攻击者提交恶意代码
* 浏览器执行恶意代码

常见解决办法：

* 服务端可以通过设置 HttpOnly 来防止XSS代码获取到用户的cookie

* 纯前端渲染，将代码和数据分隔开
  * 浏览器先加载一个静态HTML，此HTML不包含任何跟业务相关数据
  * 然后浏览器执行 HTML 中的 Javascript
  * Javascript 通过 Ajax加载业务数据，调用 DOM API 更新到页面上
  * 避免在前端代码中出现html拼接的情况
  * 我们会明确的告诉浏览器：下面要设置的内容是文本（.innerText），还是属性（.setAttribute），还是样式（.style）等等。浏览器不会被轻易的被欺骗，执行预期外的代码了。
* 对 HTML 做充分转义
  * & < > " ' /'
  * 转义库 js-xss
* [CSP：内容安全策略](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CSP)
  * 一个CSP兼容的浏览器将会仅执行从白名单域获取到的脚本文件，忽略所有的其他脚本
* [X-Xss-Protection](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/X-XSS-Protection)
  * HTTP **`X-XSS-Protection`** 响应头是 Internet Explorer，Chrome 和 Safari 的一个特性，当检测到跨站脚本攻击 ([XSS](https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting))时，浏览器将停止加载页面。

## CSRF

* **XSS 利用的是网站对用户（输入）的信任，而CSRF 利用的是网站对用户网页浏览器的信任。**

* [CSRF图示](https://pic002.cnblogs.com/img/hyddd/200904/2009040916453171.jpg)

* CSRF通常从第三方网站发起，被攻击的网站无法防止攻击发生，只能通过增强自己网站针对CSRF的防护能力来提升安全性

* CSRF的两个特点：

  - CSRF（通常）发生在第三方域名。

  - CSRF攻击者不能获取到Cookie等信息，只是使用。

**如何防御**

* Referer：但攻击者可以隐藏 Referer

  ```html
  <img src="http://bank.example/withdraw?amount=10000&for=hacker" referrerpolicy="no-referrer"> 
  ```


  > 根据 HTTP 协议，在 HTTP 头中有一个字段叫 Referer，它记录了该 HTTP 请求的来源地址。
  >
  > 如果黑客要对银行网站实施 CSRF 攻击，他只能在他自己的网站构造请求，当用户通过黑客的网站发送请求到银行时，该请求的 Referer 是指向黑客自己的网站。因此，要防御 CSRF 攻击，银行网站只需要对于每一个转账请求验证其 Referer 值 。
  >
  > 然而，这种方法并非万无一失。Referer 的值是由浏览器提供的 ，目前已经有一些方法可以篡改 Referer 值 。
  >
  > 即便是使用最新的浏览器，黑客无法篡改 Referer 值，这种方法仍然有问题。因为 Referer 值会记录下用户的访问来源，有些用户认为这样会侵犯到他们自己的隐私权，因此，用户自己可以设置浏览器使其在发送请求时不再提供 Referer。当他们正常访问银行网站时，网站会因为请求没有 Referer 值而认为是 CSRF 攻击，拒绝合法用户的访问。

  - [Samesite Cookie](http://www.ruanyifeng.com/blog/2019/09/cookie-samesite.html)

    - strict：完全禁止第三方 Cookie
    
    - lax：大多数情况也是不发送第三方 Cookie
    
    - None：Chrome 计划将`Lax`变为默认设置。这时，网站可以选择显式关闭`SameSite`属性，将其设为`None`。不过，前提是必须同时设置`Secure`属性（Cookie 只能通过 HTTPS 协议发送），否则无效。
    
    - goole浏览器的设置
    
      #### SameSite by default cookies
    
      > Treat cookies that don't specify a SameSite attribute as if they were SameSite=Lax. Sites must specify SameSite=None in order to enable third-party usage. – Mac, Windows, Linux, Chrome OS, Android
      >
      > 将未指定SameSite属性的cookie视为SameSite=Lax(默认),网站必须指定SameSite=None才能启用第三方cookie。
      > 把这个设置关了就允许所有的第三方cookie
    
      #### Cookies without SameSite must be secure
    
      > If enabled, cookies without SameSite restrictions must also be Secure. If a cookie without SameSite restrictions is set without the Secure attribute, it will be rejected. This flag only has an effect if "SameSite by default cookies" is also enabled. – Mac, Windows, Linux, Chrome OS, Android
      >
      > 如果启用，没有SameSite限制的cookie也必须是安全的。如果没有设置SameSite限制的cookie没有Secure属性，它将被拒绝。此标志仅在启用'sameSite by default cookies'时有效。
    
      如果你想加 SameSite=none 属性，那么该 Cookie 就必须同时加上 Secure 属性，表示只有在 HTTPS 协议下该 Cookie 才会被发送。 
    
  - CSRF Token

  > CSRF 攻击之所以能够成功，是因为黑客可以完全伪造用户的请求，该请求中所有的用户验证信息都是存在于 cookie 中，因此黑客可以在不知道这些验证信息的情况下直接利用用户自己的 cookie 来通过安全验证。要抵御 CSRF，关键在于在请求中放入黑客所不能伪造的信息，并且该信息不存在于 cookie 之中。可以在 HTTP 请求中以参数的形式加入一个随机产生的 token，并在服务器端建立一个拦截器来验证这个 token，如果请求中没有 token 或者 token 内容不正确，则认为可能是 CSRF 攻击而拒绝该请求。
  >
  > 这种方法要比检查 Referer 要安全一些，token 可以在用户登陆后产生并放于 session 之中，然后在每次请求时把 token 从 session 中拿出，与请求中的 token 进行比对，但这种方法的难点在于如何把 token 以参数的形式加入请求。 在一个网站中，可以接受请求的地方非常多，要对于每一个请求都加上 token 是很麻烦的

  * 验证码

  > CSRF攻击是伪造成用户的身份，自动发起恶意的请求。那么我们可以强迫攻击者与我们的网站进行交互。在一些操作之前加入验证码校验，可以抵御一部分的CSRF攻击。但是加入验证码会影响用户的体验，所以验证码不能作为主要的防御手段。

* [跨站请求伪造—CSRF](https://juejin.cn/post/6844904004288249870)

## 点击劫持

* [点击劫持图示](https://cdn.nlark.com/yuque/0/2020/png/152778/1608265590815-5fdff14b-6acd-4265-9593-dbb409e5d538.png?x-oss-process=image%2Fresize%2Cw_1038)

> 点击劫持是一种视觉欺骗的攻击手段。
>
> 黑客创建一个网页利用 iframe 包含目标网站；
>
> 构造网页，诱变用户点击特点按钮。
>

* 防御手段

  * JavaScript 禁止内嵌

    * `window.top` 属性返回当前窗口的最顶层浏览器窗口对象，在 iframe 中的 `window` 指的是 iframe 窗口对象

    * ```js
      if (top.location !== window.location) {
        top.location = window.location
      }
      ```

  * X-FRAME-OPTIONS 响应头禁止内嵌

    * `DENY`：表示页面不允许在 frame 中展示，即便是在相同域名的页面中嵌套也不允许。
    * `SAMEORIGIN`：表示该页面可以在相同域名页面的 frame 中展示。
    * `ALLOW-FROM url`：表示该页面可以在指定来源的 frame 中展示。

## HTTP传输安全

* http 明文传输不安全
* [网络协议相关](https://www.jinjingxuan.com/2020/11/23/%E6%95%B4%E7%90%86-%E7%BD%91%E7%BB%9C%E5%8D%8F%E8%AE%AE%E7%9B%B8%E5%85%B3/#toc-heading-6)

## [中间人攻击](https://www.cnblogs.com/lulianqi/p/10558719.html#%E5%9F%BA%E6%9C%AC%E4%BB%8B%E7%BB%8D)

```js
1)客户端发送请求到服务端，请求被中间人截获。

2)服务器向客户端发送公钥。

3)中间人截获公钥，保留在自己手上。然后自己生成一个【伪造的】公钥，发给客户端。

4)客户端收到伪造的公钥后，生成密文发给服务器。

5)中间人获得密文，用自己的私钥解密。同时用真正的公钥发给服务器。

6)服务器获得加密信息，用自己的私钥解密。
```

## 第三方依赖安全

现如今进行应用开发，无论是后端服务器应用还是前端应用开发，绝大多数时候我们都是在借助开发框架和各种类库进行快速开发。然而，一些第三方的依赖或者插件存在很多安全性问题，也会存在这样那样的漏洞，所以使用起来得谨慎。

* 尽量减少第三方依赖，选用相对成熟的依赖包 
* 定期使用 npm audit 检测依赖包的风险

为了提高 npm 依赖的安全，npm 6.1 后添加了 npm audit 工具，这个工具可以搜索当前项目中使用的依赖是否存在安全问题，并提供了 npm audit fix 工具修复。

它的工作原理是维护了一个已知不良依赖的名单，如果代码中使用了直接从 GitHub 而不是 npm 仓库中获取依赖，或不知名的依赖。npm audit 也是无法发现威胁。总的来说在加入第三方依赖时，需要谨慎考虑，不滥用依赖在前端开发也是非常重要的。

## 控制台注入代码

[详见天猫官网控制台](https://www.tmall.com/)

## 钓鱼

点击不可信链接输入用户名密码

## 扩展

* [Vue 的安全措施](https://cn.vuejs.org/v2/guide/security.html#Vue-%E7%9A%84%E5%AE%89%E5%85%A8%E6%8E%AA%E6%96%BD)

