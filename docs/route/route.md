---
title: history模式和hash模式
date: 2020-09-11 14:47:00
categories: 前端路由
---
# history模式和hash模式
* hash模式
* history模式
* 根据权限动态添加路由列表
* 配置路由meta属性
* router跳转两次的问题

> 前端随着 ajax 的流行，数据请求可以在不刷新浏览器的情况下进行。异步交互体验中最盛行的就是 SPA —— 单页应用。单页应用不仅仅是在页面交互时无刷新的，连页面跳转都是无刷新的，为了实现单页应用，所以就有了前端路由。 

## hash模式

**#的涵义**

* #代表网页中的一个位置,右面的字符就是代表的位置
* `http://localhost：8081/cbuild/index.html#first`就代表网页index.html的first位置。浏览器读取这个URL后，会自动将first位置滚动至可视区域。

**#后的字符**

* 在第一个#后面出现的任何字符，都会被浏览器解读为位置标识符。这意味着，这些字符都不会被发送到服务器端。

* 比如，下面URL的原意是指定一个颜色值：`http://www.example.com/?color=#fff`但是，浏览器实际发出的请求是"#fff"被省略了。只有将#转码为%23，浏览器才会将其作为实义字符处理。也就是说，上面的网址应该被写成：`http://example.com/?color=%23fff`

**改变#不触发网页重载**

* 单单改变#后的部分，浏览器只会滚动到相应位置，不会重新加载网页。
* 比如，从`http://www.example.com/index.html#location1`改成`http://www.example.com/index.html#location2`浏览器不会重新向服务器请求index.html。

**改变#会改变浏览器的访问历史**

* 每一次改变#后的部分，都会在浏览器的访问历史中增加一个记录，使用"后退"按钮，就可以回到上一个位置。

**window.location.hash读取#值**

* window.location.hash这个属性可读可写。读取时，可以用来判断网页状态是否改变；写入时，则会在不重载网页的前提下，创造一条访问历史记录。

**onhashchange事件**

* 这是一个HTML 5新增的事件，当#值发生变化时，就会触发这个事件。
* window.addEventListener("hashchange",func, false);

**思路**

> 当URL的片段标识符更改时，将触发**hashchange**事件 (跟在＃符号后面的URL部分，包括＃符号),然后根据hash值做些路由跳转处理的操作.具体参数可以访问`location`查看

```html
<!-- hashchange 触发页面改变 -->
	<ul>
      <li>
        <a href="#/a">a</a>
      </li>
      <li>
        <a href="#/b">b</a>
      </li>
      <li>
        <a href="#/c">c</a>
      </li>
    </ul>
    <div id="view"></div>

    <script>
      var view = null;
      // 页面加载完不会触发 hashchange，这里主动触发一次 hashchange 事件
      // 该事件快于onLoad,所以需要在这里操作
      window.addEventListener('DOMContentLoaded', function () {
        view = document.querySelector('#view');
        viewChange();
      });
      // 监听路由变化
      window.addEventListener('hashchange', viewChange);

      // 渲染视图
      function viewChange() {
        switch (location.hash) {
          case '#/b':
            view.innerHTML = 'b';
            break;
          case '#/c':
            view.innerHTML = 'c';
            break;
          default:
            view.innerHTML = 'a';
            break;
        }
      }
</script>
```

## history模式

window.history(可直接写成history)指向History对象，它表示当前窗口的浏览历史。

History对象保存了当前窗口访问过的所有页面网址

### length

* history.length属性保存着历史记录的url数量，初始时该值为1，如果当前窗口先后访问了三个网址，那么history对象就包括3项，history.length=3

**跳转方法**

* **go()** 接受一个整数为参数，移动到该整数指定的页面，比如`history.go(1)`相当于`history.forward()`,`history.go(-1)`相当于`history.back()`,`history.go(0)`相当于刷新当前页面
* **back()** 移动到上一个访问页面，等同于浏览器的后退键,常见的返回上一页就可以用`back()`，是从浏览器缓存中加载，而不是重新要求服务器发送新的网页
* **forward()** 移动到下一个访问页面，等同于浏览器的前进键

如果移动的位置超出了访问历史的边界，以上三个方法并不报错，而是默默的失败

### history.pushState()

history.pushstate() 方法接受三个参数，以此为：

- **state**: 一个与指定网址相关的状态对象，popState事件触发时，该对象会传入回调函数，如果不需要这个对象，此处可填null
- **title**: 新页面的标题，但是所有浏览器目前都忽略这个值，因此这里可以填null
- **url**: 新的网址，必须与当前页面处在同一个域，浏览器的地址栏将显示这个网址

```js
// 假定当前网址是example.com/1.html，我们使用pushState方法在浏览记录(history对象)中添加一个记录

var stateObj = {foo:'bar'};
history.pushState(stateObj,'page 2','2.html')
```

> 添加上边这个新纪录后，浏览器地址栏立刻显示`example.com/2.html`，但不会跳转到`2.html`，甚至也不会检查`2.html`是否存在，**它只是成为浏览历史中的新纪录**。这时，你在地址栏输入一个新的地址，然后点击了后退按钮，页面的`url`将显示`2.html`；你再点击以此后退按钮，`url`将显示`1.html`

**总之，pushState方法不会触发页面刷新，只是导致了history对象发生变化，地址栏会有反应**

如果pushState的url参数，设置了一个新的锚点值（即hash），并不会触发hashChange事件，如果设置了一个跨域网址，则会报错。

```js
//报错
history.pushState(null,null,'https://twitter.com/hello')
```

上边代码中，pushState()想要插入一个跨域的网址，导致报错，这样设计的目的是防止恶意代码让用户以为他们是在另一个网站上.

### history.replaceState()

**history.replaceState()** 方法的参数和 **pushState()** 方法一摸一样，区别是它修改浏览器历史当中的记录

假定当前页面是`example.com/example.html`

```js
history.pushState({page:1},'title 1','?page=1')
history.pushState({page:2},'title 2','?page=2')
history.replaceState({page:3},'title 3','?page=3')

history.back() //url显示为example.com/example.html?page=1
history.back() //url显示为example.com/example.html
history.go(2) //url显示为example.com/example.html?page=3
```

### popState 事件

* 每当同一个文档的浏览历史（即history）出现变化时，就会触发popState事件

* 需要注意：仅仅调用pushState方法或replaceState方法，并不会触发该事件，只有用户点击浏览器后退和前进按钮时，或者使用js调用back、forward、go方法时才会触发。另外该事件只针对同一个文档，如果浏览历史的切换，导致加载不同的文档，该事件不会被触发

* 使用的时候，可以为popState事件指定回调函数

```js
window.onpopstate = function (event) {
  console.log('location: ' + document.location);
  console.log('state: ' +JSON.stringify(event.state));
};

// 或者

window.addEventListener('popstate', function(event) {
  console.log('location: ' + document.location);
  console.log('state: ' + JSON.stringify(event.state));
});
```

回调函数的参数是一个event事件对象，它的state属性指向pushState和replaceState方法为当前url所提供的状态对象（即这两个方法的第一个参数）。上边代码中的event.state就是通过pushState和replaceState方法为当前url绑定的state对象

那既然调用pushState方法或replaceState方法，并不会触发popState事件，要怎么处理呢？

> **解决思路：**我们可以通过遍历页面上的所有 `a` 标签，阻止 `a` 标签的默认事件的同时，加上点击事件的回调函数，在回调函数内获取 `a` 标签的 `href` 属性值，再通过 `pushState`去改变浏览器的 `location.pathname` 属性值。然后手动执行 `popstate` 事件的回调函数，去匹配相应的路由。

```html
<!-- popstate 和点击事件 触发页面改变 -->
	<ul>
      <li>
        <a href="/a">a</a>
      </li>
      <li>
        <a href="/b">b</a>
      </li>
      <li>
        <a href="/c">c</a>
      </li>
    </ul>
    <div id="view"></div>

    <script>
      var view = null;
      
      window.addEventListener('DOMContentLoaded', function () {
        view = document.querySelector('#view');
        document
          .querySelectorAll('a[href]')
          .forEach(e => e.addEventListener('click', function (_e) {
            _e.preventDefault();
            history.pushState(null, '', e.getAttribute('href'));
            viewChange();
          }));

        viewChange();
      });
      // 监听路由变化
      window.addEventListener('popstate', viewChange);

      // 渲染视图
      function viewChange() {
        switch (location.pathname) {
          case '/b':
            view.innerHTML = 'b';
            break;
          case '/c':
            view.innerHTML = 'c';
            break;
          default:
            view.innerHTML = 'a';
            break;
        }
      }
</script>
```

## 根据权限动态添加路由列表

* 业务场景：不同用户调用权限接口获得的权限是不同的，根据用户权限动态展示路由列表

```js
		 api.getAuditInfo({
             account: username,
         }).then(res => {
             console.log('权限代码:', res)
             // 高级权限：可以查看某一块路由
             if (res.includes('auth0')) {
                 window.authInfo = true
                 // 添加路由
                 this.$router.addRoutes(videoRoutes)
                 this.$router.options.routes.push(...videoRoutes)
             // 普通权限
             } else if (res.includes('auth1') && !res.includes('auth0')) {
                 window.authInfo = false
             // 没有权限时返回
             } else {
                 window.location.href = `
             }
         })
```

## 配置路由meta属性

* 业务场景：同一个组件在不同路由下的展示状态是不同的，这时可以配置路由meta属性来实现

```js
const routes = [
    {
        path: '/audit/video',
        name: '视频管理',
        component: Layout,
        children: [
            {
                path: 'videoList',
                name: '视频列表',
                meta: {
                    noCache: true,
                    cityChange: true,
                },
                component: auditvideoList
            },
            {
                path: 'auditList',
                name: '审核列表',
                // 配置 meta 属性
                meta: {
                    noCache: true,
                    cityDefault: true 
                },
                component: auditList
            }
        ]
    },
    {
        path: '*',
        redirect: '/audit/agent',
        hidden: true
    }
]
```

* 比如说 header 中的一个组件，不同路由页面均展示，只是状态不同

```html
<template>
    <div v-if="!cityDefault"></div>
	  <div v-else ></div>
</template>	
	
<script>
computed: {
        cityDefault() {
            return this.$route.meta.cityDefault;
        }
    },
</script>
```

## router跳转两次的问题

> 浏览器会自动对中文进行转码，会导致router的监听方法监听到浏览器地址栏变化。也就是说当我们跳转链接存在中文字符时，浏览器地址会变化两次，然后导致页面组件也会加载两次；
