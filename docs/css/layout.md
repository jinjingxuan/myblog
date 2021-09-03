---
title: 圣杯布局和双飞翼布局
date: 2018-09-18 19:00:54
categories: CSS
---

## 传统三栏布局

```html
<style>
    .wrap {
        display: flex;
    }
    .middle {        
        flex: 1;
    }
    .left {
        width: 300px;
    }
    .right {        
        width: 300px;
    }
</style>

</head>
<body>
    <div class="wrap">
        <div class="left"></div>
        <div class="middle"></div>
        <div class="right"></div>
    </div>
</body>
```

```html
<style>
    .middle {
        margin: 0 300px;
    }
    .left {
        width: 300px;
        float: left;
    }
    .right {        
        width: 300px;
        float: right;
    }
</style>

</head>
<body>
    <div class="left"></div>
    <div class="right"></div>
    <div class="middle"></div>
</body>
```

```html
<style>
    .middle {
        margin: 0 300px;
    }
    .left {
        position: absolute;
        top: 0;
        left: 0;
        width: 300px;
    }
    .right {  
        position: absolute;
        top: 0;
        right: 0;      
        width: 300px;
    }
</style>

</head>
<body>
    <div class="left"></div>
    <div class="right"></div>
    <div class="middle"></div>
</body>
```

圣杯布局跟双飞翼布局的实现，目的都是左右两栏固定宽度，中间部分自适应。
中间栏放在最前面优先渲染。 

## 圣杯布局

### 1.这是初始状态，我们来构造圣杯布局

```html
	<style>
		.header {
			width: 100%;
			height: 30px;
			background: red;
		}
		.content {
			padding: 0 100px;/*左右各留出100px*/
		}
		.footer {
			width: 100%;
			height: 30px;
			background: red;
		}
		.middle {		
			width: 100%;
			height: 80px;
			background: green;
		}
		.left {
			width: 100px;
			height: 80px;
			background: yellow;
		}
		.right {		
			width: 100px;
			height: 80px;
			background: pink
		}
	</style>
<body>
	  <div class="header"></div>
     	<div class="content">
			<div class="middle"></div>
			<div class="left"></div>
			<div class="right"></div>
		</div>
	  <div class="footer"></div>
</body>
```

### 2.我们首先给middle,left,right三个盒子加上浮动

`float:left`

出现了高度塌陷给content加上`overflow:hidden`

### 3.这里先介绍一下margin-left

当margin-left的值为%时，数值基于父对象的百分比左外边距。  

给黄色盒子加上`margin-left:-100%`

给粉色盒子加上`margin-left:-100px`  

### 3.最后用相对定位调整位置

给黄色盒子加上`position:relative;right:100px`

给粉色盒子加上`position:relative;left:100px  `

## 双飞翼布局

```html
<style>
        .header {
			width: 100%;
			height: 30px;
			background: red;
		}

		.content {
			overflow: hidden;
		}

		.footer {
			width: 100%;
			height: 30px;
			background: red;
		}

		.middle {			
			width: 100%;
			float: left;
		}
         .inner-middle{
			width:100%;
			height: 80px;
			background: green;			
		}
		.left {
			width: 100px;
			float: left;
			height: 80px;
			margin-left: -100%;
			background: yellow;
		}

		.right {			
			width: 100px;
			float: left;
			height: 80px;
			margin-left: -100px;
			background: pink
		}
</style>

<div class="header"></div>
	<div class="content">
		<div class="middle">
			<div class="inner-middle"></div>
		</div>
		<div class="left"></div>
		<div class="right"></div>
	</div>
<div class="footer"></div>
```

### 1.初始状态

```html
<div class="header"></div>
	<div class="content">
		<div class="middle">
			<div class="inner-middle"></div>
		</div>
		<div class="left"></div>
		<div class="right"></div>
	</div>
<div class="footer"></div>
```

### 2.给left,right,middle加浮动

### 3.margin-left调整位置

给黄色盒子加上`margin-left:-100%`

给粉色盒子加上`margin-left:-100px`  
