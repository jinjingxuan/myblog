---
title: 移动端适配
date: 2020-11-16 16:01:54
categories: 移动端
---
# 移动端适配
* 逻辑像素与物理像素
* 常见长度单位
* 移动端 1px
* 适配案例
* 常见移动端适配方案

## 逻辑像素与物理像素

* pt: html css中的使用的单位像素px: 实际上指的是逻辑像素pt
* px: photoshop测量中的但是实际上指的是物理像素, 物理像素即表示的是一个点, 大小固定
* 一个pt可以包含多个物理像素px
* 在iphone6中一个单位的逻辑像素包含2个物理像素，iphone的分辨率为`375*667 `实际上指的是逻辑像素为`375*667`, 所以一般移动端的设计图纸一般是给的是`750*1334`,  是因为一个逻辑像素pt包含两个物理像素px

* 不同设备下的分辨率不同, 在iphone6s中 一个逻辑像素pt包含三个物理像素px  即 1pt = 3px

## 常见长度单位

### em

em是相对长度单位。它的单位长度是根据元素的文本垂直长度来决定的。可以作用在width、height、line-height、margin、padding、border等样式的设置上。 如当前对行内文本的字体尺寸未被人为设置，则相对于浏览器的默认字体尺寸。 默认1em=16px。如果在body选择器中声明font-size=62.5%,则1em=10px。

```html
<style>
	.parent{ 
			font-size:5em; /*80px*/
			height:10em;/*800px*/
	}
  .child{
			font-size:2em;/*160px*/
			height:2em;/*320px*/
	}
</style>

<body>
	<div class="parent">
    <div class="child"></div>
	</div>
</body>
```

在不设置元素font-size的情况下，em总是根据父元素的font-size来确定长度；即使元素设置了font-size，多次嵌套使用em也往往会造成疏忽，不仅使用前需要大量计算，而且不能保证没有漏网之鱼。这将是一个繁杂而低效率的工作。 于是有了rem.

### rem

rem不是依据父元素——而是依据根元素（root element）来确定其长度。

我们一般给根元素设置一个容易计算的font-size

```html
<style>
    html {
        font-size: 62.5%;   /* 10px */
    }
    div {
        font-size: 2.4rem;  /* 24px */
        width: 64rem;   /* 640px */
        border: 0.1rem solid #ccc;  /* 1px */
    }
</style>
<body>
    <div class="div1">
        <div class="div2"></div>
    </div>
</body>
```

### rpx

| 设备         | rpx换算px (屏幕宽度/750) | px换算rpx (750/屏幕宽度) |
| :----------- | :----------------------- | :----------------------- |
| iPhone5      | 1rpx = 0.42px            | 1px = 2.34rpx            |
| iPhone6      | 1rpx = 0.5px             | 1px = 2rpx               |
| iPhone6 Plus | 1rpx = 0.552px           | 1px = 1.81rpx            |

- rpx（responsive pixel）: 可以根据屏幕宽度进行自适应。规定屏幕宽为750rpx。如在 iPhone6 上，屏幕宽度为375px，共有750个物理像素，则750rpx = 375px = 750物理像素，1rpx = 0.5px = 1物理像素。
- 建议小程序的设计稿以750 x 1334 的物理分辨率进行设计

### vw,vh

- vw和vh是css3中的新单位，是一种视窗单位，在小程序中也同样适用。
- 小程序中，窗口宽度固定为100vw，将窗口宽度平均分成100份，1份是1vw
- 小程序中，窗口高度固定为100vh ，将窗口高度平均分成100份，1份是1vh
- 所以，我们在小程序中也可以使用vw、vh作为尺寸单位使用在布局中进行布局，但是一般情况下，百分比+rpx就已经足够使用了,所以它们的出场机会很少。

## 移动端 1px

### 原因

* DPR(devicePixelRatio) 设备像素比 = 物理像素 / css像素 ，它是默认缩放为100%的屏幕下，设备像素和css像素的比值。
* 目前比较主流的设备的DPR=2或3，所以： 当我们的DPR为2，也就是2倍屏时，当物理像素（设备像素）为1px的时候，我们的css像素应该是0.5px。当DPR=3，物理像素为1px时，css像素应该为1/3px。

### 解决方案

#### scale

如果在一个元素上使用`scale`时会导致整个元素同时缩放，所以应该在该元素的伪元素下设置`scale`属性。

```css
.scale::after {
    display: block;
    content: '';
    border-bottom: 1px solid #000;
    transform: scaleY(.5);
}
```

#### linear-gradient

通过线性渐变，也可以实现移动端1px的线。原理大致是使用渐变色，上部分为白色，下部分为黑色。这样就可以将线从视觉上看只有1px。

由于是通过背景颜色渐变实现的，所以这里要使用伪元素并且设置伪元素的高度。 当然，也可以不使用伪元素，但是就会增加一个没有任何意义的空标签了。

```css
div.linear::after {
    display: block;
    content: '';
    height: 1px;
    background: linear-gradient(0, #fff, #000);
}
```

#### box-shadow

通过`box-shaodow`来实现1px也可以，实现原理是将纵坐标的shadow设置为0.5px即可。`box-shadow`属性在Chrome和Firefox下支持小数设置，但是在Safari下不支持。所以使用该方法设置移动端1px时应该慎重使用。

```css
div.shadow {
    box-shadow: 0 0.5px 0 0 #000;
}
```

## 适配案例

**设计给出750px的设计稿，也按照750px来开发h5页面，怎么在小程序的 webview 页面中适配？**

* transform: scale
* hack 为占满全屏的透明盒子，因为小程序存在顶部栏，所以不能用 screenHeight
* toFixed 是为了取整，防止小数出现 bug

```js
				function autoAdapt() {
            var screenWidth = hack.offsetWidth
            var screenHeight = hack.offsetHeight
            var scale = (screenWidth / 750).toFixed(2)
            if (scale < 1) {
                main.style.width = `${(screenWidth / scale).toFixed(0)}px`
                main.style.height = `${(screenHeight / scale).toFixed(0)}px`
                main.style.overflow = 'auto'
                document.body.style.transform = `scale(${scale})`
                document.body.style.transformOrigin = '0% 0%'
                document.body.style.overflow = `hidden`
            } else {
                main.style.transform = `scale(${scale})`
                main.style.transformOrigin = '50% 0%'
            }
        }
        autoAdapt()

        window.onresize = function() {
            autoAdapt()
        }
```

## 常见移动端适配方案

- media queries
- flex 布局
- rem + viewport
- vh vw
- 百分比

#### 一、Meida Queries

meida queries 的方式可以说是我早期采用的布局方式，它主要是通过查询设备的宽度来执行不同的 css 代码，最终达到界面的配置。

**核心语法:**

```css
@media only screen and (max-width: 374px) {
  /* iphone5 或者更小的尺寸，以 iphone5 的宽度（320px）比例设置样式*/
}
@media only screen and (min-width: 375px) and (max-width: 413px) {
  /* iphone6/7/8 和 iphone x */
}
@media only screen and (min-width: 414px) {
  /* iphone6p 或者更大的尺寸，以 iphone6p 的宽度（414px）比例设置样式 */
}
复制代码
```

**优点：**

- media query 可以做到设备像素比的判断，方法简单，成本低，特别是针对移动端和 PC 端维护同一套代码的时候。目前像 Bootstrap 等框架使用这种方式布局
- 图片便于修改，只需修改 css 文件
- 调整屏幕宽度的时候不用刷新页面即可响应式展示

**缺点：**

- 代码量比较大，维护不方便
- 为了兼顾大屏幕或高清设备，会造成其他设备资源浪费，特别是加载图片资源
- 为了兼顾移动端和 PC 端各自响应式的展示效果，难免会损失各自特有的交互方式

#### 二、Flex 弹性布局

以天猫的实现方式进行说明：

它的 viewport 是固定的：`<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">`

高度定死，宽度自适应，元素都采用 px 做单位。

随着屏幕宽度变化，页面也会跟着变化，效果就和 PC 页面的流体布局差不多，在哪个宽度需要调整的时候使用响应式布局调调就行（比如网易新闻），这样就实现了『适配』。

#### 三、rem+viewport 缩放

**实现原理：**

根据 rem 将页面放大 dpr 倍, 然后 viewport 设置为 1/dpr.

- 如 iphone6 plus 的 dpr 为 3, 则页面整体放大 3 倍, 1px(css 单位)在 plus 下默认为 3px(物理像素)
- 然后 viewport 设置为 1/3, 这样页面整体缩回原始大小. 从而实现高清。

这样整个网页在设备内显示时的页面宽度就会等于设备逻辑像素大小，也就是 device-width。这个 device-width 的计算公式为：

`设备的物理分辨率/(devicePixelRatio * scale)`，在 scale 为 1 的情况下，`device-width = 设备的物理分辨率/devicePixelRatio`。

#### 四、rem 实现

`rem`是相对长度单位，`rem`方案中的样式设计为相对于根元素`font-size`计算值的倍数。根据屏幕宽度设置`html`标签的`font-size`，在布局时使用 **rem** 单位布局，达到自适应的目的。

viewport 是固定的：`<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">`。

通过以下代码来控制 rem 基准值(设计稿以 720px 宽度量取实际尺寸)

```js
!(function (d) {
  var c = d.document;
  var a = c.documentElement;
  var b = d.devicePixelRatio;
  var f;
  function e() {
    var h = a.getBoundingClientRect().width,
      g;
    if (b === 1) {
      h = 720;
    }
    if (h > 720) h = 720; //设置基准值的极限值
    g = h / 7.2;
    a.style.fontSize = g + "px";
  }
  if (b > 2) {
    b = 3;
  } else {
    if (b > 1) {
      b = 2;
    } else {
      b = 1;
    }
  }
  a.setAttribute("data-dpr", b);
  d.addEventListener(
    "resize",
    function () {
      clearTimeout(f);
      f = setTimeout(e, 200);
    },
    false
  );
  e();
})(window);
复制代码
```

css 通过 sass 预编译，设置量取的 px 值转化 rem 的变量`$px: (1/100)+rem;`

优点：

- 兼容性好，页面不会因为伸缩发生变形，自适应效果更佳。

缺点：

- 不是纯 css 移动适配方案，需要在头部内嵌一段 `js`脚本监听分辨率的变化来动态改变根元素的字体大小，`css`样式和 `js` 代码有一定耦合性，并且必须将改变`font-size`的代码放在 `css` 样式之前。
- 小数像素问题，浏览器渲染最小的单位是像素，元素根据屏幕宽度自适应，通过 `rem` 计算后可能会出现小数像素，浏览器会对这部分小数四舍五入，按照整数渲染，有可能没那么准确。

#### 五、纯 vw 方案

视口是浏览器中用于呈现网页的区域。

- **vw** : **1vw** 等于 **视口宽度** 的 **1%**
- **vh** : **1vh**  等于 **视口高度** 的 **1% **
- **vmin** : 选取 **vw** 和 **vh** 中 **最小** 的那个
- **vmax** : 选取 **vw** 和 **vh** 中 **最大** 的那个

虽然 vw 能更优雅的适配，但是还是有点小问题，就是宽，高没法限制。

```js
$base_vw = 375;
@function vw ($px) {
    return ($px/$base_vw) * 100vw
};
复制代码
```

优点：

- 纯 `css` 移动端适配方案，不存在脚本依赖问题。
- 相对于 `rem` 以根元素字体大小的倍数定义元素大小，逻辑清晰简单。

缺点：

- 存在一些兼容性问题，有些浏览器不支持

#### 六、vw + rem 方案

```js
// scss 语法
// 设置html根元素的大小 750px->75 640px->64
// 将屏幕分成10份，每份作为根元素的大小。
$vw_fontsize: 75
@function rem($px) {
    // 例如：一个div的宽度为100px，那么它对应的rem单位就是（100/根元素的大小）* 1rem
    @return ($px / $vw_fontsize) * 1rem;
}
$base_design: 750
html {
    // rem与vw相关联
    font-size: ($vw_fontsize / ($base_design / 2)) * 100vw;
    // 同时，通过Media Queries 限制根元素最大最小值
    @media screen and (max-width: 320px) {
        font-size: 64px;
    }
    @media screen and (min-width: 540px) {
        font-size: 108px;
    }
}

// body 也增加最大最小宽度限制，避免默认100%宽度的 block 元素跟随 body 而过大过小
body {
    max-width: 540px;
    min-width: 320px;
}

复制代码
```

#### 七、百分比

使用百分比%定义宽度，高度用`px`固定，根据可视区域实时尺寸进行调整，尽可能适应各种分辨率，通常使用`max-width`/`min-width`控制尺寸范围过大或者过小。

优点：

- 原理简单，不存在兼容性问题

缺点：

- 如果屏幕尺度跨度太大，相对设计稿过大或者过小的屏幕不能正常显示，在大屏手机或横竖屏切换场景下可能会导致页面元素被拉伸变形，字体大小无法随屏幕大小发生变化。
- 设置盒模型的不同属性时，其百分比设置的参考元素不唯一，容易使布局问题变得复杂。

> 作者：前端先锋
> 链接：https://juejin.cn/post/6899291168891207688
> 来源：掘金

