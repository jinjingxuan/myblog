---
title: 面试题（八）
date: 2018-08-03 09:21:01
categories: 面试
---
# 面试题（八）
* v-show 与 v-if 区别
* 动态绑定class的方法
* v-model是怎么实现的
* Sass与Stylus的常见语法
* 小程序的页面栈与生命周期
* 看代码说输出
* package.json和package-lock.json
* npm nrm yarn
* 什么是node-sass
* 封装小程序分享参数,获取参数
* url编码与解码

## v-show 与 v-if 区别 

相同点：v-if与v-show都可以动态控制dom元素显示隐藏

不同点：v-if显示隐藏是将dom元素整个添加或删除，而v-show隐藏则是为该元素添加`display:none`，dom元素还在。

`visibility:hidden`和`display:none`的区别

```js
visibility:hidden; 可以隐藏某个元素，但是隐藏的元素仍要占据空间，仍要影响布局，会触发重绘
display:none; 不会占据空间，会触发回流
```

```html
	<div id='app'>
        <div v-if='isIf'>我是v-if</div>
        <div v-show='isShow'>我是v-show</div>
    </div>

    <script src='vue.min.js'></script>
    <script>
        let app = new Vue({
            el:'#app',
            data:{
                isIf:true,
                isShow:false
            }
        })
    </script>
```

**性能消耗：**v-if有更高的切换消耗；v-show有更高的初始渲染消耗；

**使用场景：**v-if适合运营条件不大可能改变；v-show适合频繁切换。

对于管理系统的权限列表的展示，这里可以使用V-if来渲染,对于前台页面的数据展示，这里推荐使用V-show 

## 动态绑定class的方法

### （1）对象语法

给v-bind:class 设置一个**对象**，可以动态地切换class，如下

```html
<div id="app">
    <div :class="{'active':isActive}"></div>
</div>

<script>
    var app = new Vue({
        el:'#app',
        data:{
            isActive:true
        }
    })
</script>
```

最终渲染结果为：`<div class="active">\</div>`

v-bind就是**用于绑定数据和元素属性的** 

```html
<div class="app">
    <a v-bind:href="url">click me</a>
</div>  

<script>
    var app = new Vue({
        el:'.app',
        data:{
            url:"https://www.baidu.com",
        }
    });
</script>
```

当然对象中也可以传入多个属性

```html
<div id="app">
    <div :class="{'active':isActive,'error':isError}"></div>
</div>

<!--当值均为true时-->
<div class="active error"></div>
```

### （2）直接设置为对象

```html
<div :class="classObject"></div>

data: {
  classObject: {
    active: true,
  }
}
```

### （3）数组方法

```html
<div :class="[activeClass, errorClass]"></div>

 data:{
      activeClass: "active",
      errorClass: "disActive"
 },

渲染为
<div class="active disActive"></div>
```

### （4）三元运算符

```html
<div :class="[isActive?'active':'disActive']"></div>

 data:{
      isActive: false,
  },

渲染为：
<div class="disActive"></div>
```

### （5）computed

```html
<div :class="classObject"></div>

  data:{
    isActive: true,
  },
  computed: {
      classObject: {
          active: this.isActive,
	  }
  }
```

## v-model

 v-model本质上是一个语法糖。（双向的）

如下代码`<input v-model="test">`本质上是<`input :value="test" @input="test = $event.target.value">` 

` :value="test"`设置input初始值为text值，

`@input="test = $event.target.value`,当输入的值改变时，test更新

## Sass与Stylus的常见语法

Sass,Stylus都是css预处理器，除了这两种之外还有less等。

### Sass与Stylus的对比

参考于[这篇文章](<https://segmentfault.com/a/1190000008013566> )

1. 变量

`sass`允许使用变量，所有的变量以`$`开头。

```css
$blue: #1875e7;
div {
   color: $blue
 }
```

`stylus`也允许使用变量，变量名的`$`是可选的，变量值可以是表达式。

```css
color = blue 或者  $color = blue
div
    color: color
```

2. 计算属性

`sass`允许在代码中使用算式:

```css
body {
    margin: (14px/2);
    top: 50px + 100px;
    right: $var * 10%;
  }
```

`stylus`同样也支持在代码中使用算式:

```css
 body
    margin: (14px/2)
    top: 50px + 100px
    right: var * 10%
```

3. 嵌套

`sass`允许选择器嵌套。比如下面的`css`代码:

```css
  div h1 {
    color: red
  }
  
 可以写成：
 
  div {
    h1{
      color: red
   }
 }
```

`stylus`同样支持选择器嵌套，上面的代码可以写成:

```css
div
  h1
    color: red
```

`sass`也支持属性嵌套,比如`border-color`属性可以写成:

```css
 p{
     border: {
       color: red;
     }
 }
 
 border后面需要加上冒号
```

**stylus没有这个功能**

4. 继承

`sass`允许一个选择器，继承另一个选择器。比如，现在`class1`：

```css
.class1 {
    border: 1px solid #ddd
  }
  
  class2要继承class1，就要使用@extend命令。
  
  .class2 {
    @extend .class1
    font-size: 120%
  }
```

`stylus`的继承方式和`sass`基本一致，但有一些稍微的不同。

`stylus`实现继承:

```css
.class1
    border: 1px solid #ddd
    
 .class2
    @extend .class1
    font-size: 120%
```

**两者的区别主要在于--sass不允许@extend嵌套选择器:**
如下面的样式:

```css
div
  h1
   color: red
```

在`sass`中，如果按照下面这样写就会直接编译错误。

```css
 .div2 {
    @extend div h1
 }
```

而在`stylus`中却可以成功编译，因为`stylus`中，只要选择器匹配，继承就会生效。

```css
.div2
   @extend div h1
```

## 小程序的页面栈与生命周期

### 小程序的页面栈

| 路由方式                             | 页面栈                                   |
| ------------------------------------ | ---------------------------------------- |
| 初始化                               | 新页面入栈                               |
| 打开新页面（wx.navigateTo）          | 新页面入栈                               |
| 页面重定向（wx.redirctTo）           | 当前页面出栈，新页面入栈                 |
| 页面返回（wx.navigateBack）          | 页面不断出栈，直到目标返回页，新页面入栈 |
| Tab切换（wx.switchTab或底部tab切换） | 页面全部出栈，只留下新的Tab页面          |
| 重启动（wx.relaunch）                | 页面全部出栈，只留下新的页面             |

* `navigateTo`, `redirectTo` 只能打开非 tabBar 页面。
* `switchTab` 只能打开 tabBar 页面。
* `reLaunch` 可以打开任意页面。
* 页面底部的 tabBar 由页面决定，即只要是定义为 tabBar 的页面，底部都有 tabBar。
* 调用页面路由带的参数可以在目标页面的`onLoad`中获取。

### 小程序的生命周期

```js
onLaunch() {
    console.log('onLaunch监听小程序初始化');
}

onShow() {
    console.log('onShow监听小程序显示');
}

onHide() {
    console.log('onLaunch监听小程序隐藏');
}
```

### 页面的生命周期

```js
onLoad(options) {
    console.log('onLoad监听页面加载');
}

onReady() {
    console.log('onReady监听页面初次渲染完成');
}

onShow() {
    console.log('onShow监听页面显示');
}

onHide() {
    console.log('onHide监听页面隐藏');
}

onUnload() {
    console.log('onUnload监听页面卸载');
}
```

## window.length

```js
function foo(){
    console.log(length)  //词法作用域，找foo函数外面定义的length，即window.length
}
function bar(){
    var length = 'jin'
    foo()
}
bar()  //输出的为window.length即为iframe的个数
```

## package.json和package-lock.json

npm描述模块信息的文件就是 package.json ，npm  install会根据package.json安装依赖

每次执行完npm install之后会对应生成package-lock文件，该文件记录了上一次安装的具体的版本号。

> 原来的 package.json 文件只能锁定大版本，也就是版本号的第一位，并不能锁定后面的小版本，你每次npm install都是拉取的该大版本下的最新的版本，为了稳定性考虑我们几乎是不敢随意升级依赖包的，这将导致多出来很多工作量，测试/适配等，所以package-lock.json文件出来了，当你每次安装一个依赖的时候就锁定在你安装的这个版本。

当文件中存在package-lock.json时，执行npm install，node从package.json文件读取模块名称，从package-lock.json文件中获取版本号，然后进行下载或者更新。 

### 版本号区分

- `^16.8.0`表示安装16.x.x的最新版本，安装时不改变大版本号。
- `~16.8.0`表示安装16.8.x的最新版本，安装时不改变大版本号和次要版本号。
- `16.8.0` 表示安装指定的版本号，也就是安装16.8.0版本。

## npm nrm yarn

* [npm,nrm,yarn的关系](https://juejin.cn/post/6844904004279861262)

> yarn 是 FaceBook 开源的一个新的包管理器， 和npm的作用是一样的，但是解决了一些npm的痛点。

### 常用命令

| npm                           | yarn                           |
| ----------------------------- | ------------------------------ |
| npm init                      | yarn init                      |
| npm install                   | yarn install                   |
| npm install --no-package-lock | yarn install --no-package-lock |
| npm install xxx --save        | yarn add xxx                   |
| npm install xxx --save-dev    | yarn add xxx --dev             |
| npm uninstall xxx --save      | yarn remove xxx                |
| yarn add xx@version           | npm install xx@vision          |
| yarn upgrade xx               | npm update xx                  |
| yarn upgrade xx@version       | npm update xx@vision           |
| yarn why xx                   | -                              |
| yarn config list              | npm config list                |

### npm中的 --save与--save-dev

- **i** 是 **install** 的简写
- **-g** 是全局安装，不带 **-g** 会安装在个人文件夹
- **-S** 与 **--save** 的简写，安装包信息会写入 **dependencies** 中
- **-D** 与 **--save-dev** 的简写，安装包写入 **devDependencies** 中
- **dependencies** 生产阶段的依赖,也就是项目运行时的依赖
- **devDependencies** 开发阶段的依赖，就是我们在开发过程中需要的依赖，只在开发阶段起作用的

****

比如写 `ES6` 代码，需要 `babel` 转换成 `es5` ，转换完成后，我们只需要转换后的代码，上线的时候，直接把转换后的代码部署到生产环境，不需要 `bebal` 了，生产环境不需要。这就可以安装到 **devDependencies** ，再比如说代码提示工具，也可以安装到 **devDependencies** 。

如果你用了 `Element-UI`，由于发布到生产后还是依赖 `Element-UI`，这就可以安装到 **dependencies** 。

## 什么是node-sass

> Node-sass是一个库，它将Node.[js](http://www.fly63.com/tag/js)绑定到LibSass（流行样式表预处理器Sass的C版本）。它允许用户以令人难以置信的速度将.s[css](http://www.fly63.com/tag/css)文件本地编译为[css](http://www.fly63.com/tag/css)，并通过连接中间件自动编译。

## url编码与解码

网页URL只能使用英文、数字、还有一些特定的字符，若出现中文字符就必须经过编码解码，否则服务器无法识别

编码方法有三种：

| 方法                                                 | 规则                                                         | 特点                                                         |
| ---------------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| escape（编码） unescape                              | 除了ASCII字母、数字、标点符号"@ * _ + - . /"以外，对其他所有字符进行编码 | 不提倡                                                       |
| encodeURI（编码） decodeURI（解码）                  | 除了常见的符号以外，对其他一些在网址中有特殊含义的符号"; / ? : @ & = + $ , #"，也不进行编码 | encodeURI()是Javascript中真正用来对URL编码的函数，它着眼于对整个URL进行编码 |
| encodeURIComponent（编码）  decodeURIComponent解码） | 在encodeURI()中不被编码的符号"; / ? : @ & = + $ , #"，在encodeURIComponent()中统统会被编码 | 与encodeURI()的区别是，它用于对URL的组成部分进行个别编码，而不用于对整个URL进行编码 |

```js
encodeURIComponent("http://www.test.com?a=哈哈")
// "http%3A%2F%2Fwww.test.com%3Fa%3D%E5%93%88%E5%93%88"

encodeURI("http://www.test.com?a=哈哈")
// "http://www.test.com?a=%E5%93%88%E5%93%88"
```

