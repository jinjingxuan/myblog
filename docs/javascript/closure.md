---
title: 闭包
date: 2018-08-16 21:00:54
categories: JavaScript
---

## 闭包的定义

* 犀牛书：函数体内部的变量都可以保存在函数作用域内，这种特性称为闭包。
* 个人理解：闭包是指有权访问另一个函数作用域中的变量的函数，创建闭包的最常见的方式就是在一个函数内创建另一个函数，内部函数可以访问外面函数中的局部变量，一旦内部函数返回或者被引用，这个局部变量则会已知保留在内存中

## 闭包有三个特性：

```js
1.函数嵌套函数
2.函数内部可以引用外部的参数和变量
3.参数和变量不会被垃圾回收机制回收
```

## 闭包优缺点

**缺点**

闭包的缺点就是常驻内存，会增大内存使用量，使用不当很容易造成内存泄露。

一般函数执行完毕后，局部活动对象就被销毁，内存中仅仅保存全局作用域。但闭包的情况不同！

**优点及用处**

* 有了闭包之后，可以在外部作用域访问内部作用域的成员

* 希望一个变量长期驻扎在内存中
* 避免全局变量的污染
* 私有成员的存在

## vue源码中闭包的应用

```js
function createPatchFunction(nodeOps, modules) {
  return function patch(vdom1, vdom2) {
    // ...
  }
}
const patch = createPatch(...)
/**
因为vue可以运行在多个平台上通过nodeOps来区分，如果直接写在path里面的话，需要在path里面写一系列if平台判断，多次执行path会判断多次，那么如过通过闭包把这个平台差异只执行一次就判断出来，今后不需要判断就好了
*/                 
```

## 闭包与高阶函数

```js
// 函数作为返回值
function fn() {
    let a = 1
    return function() {
        console.log(a++)
    }
}

let fn1 = fn()
fn1()

// 函数作为参数

```

闭包会使变量始终保存在内存中，如果不当使用会增大内存消耗。

## `javascript`的垃圾回收原理

（1）、在`javascript`中，如果一个对象不再被引用，那么这个对象就会被`GC`回收； 
（2）、如果两个对象互相引用，而不再被第`3`者所引用，那么这两个互相引用的对象也会被回收。

## 一、全局变量的累加

```html
<script>
  var a = 1;
  function abc(){
    a++;
    alert(a);
  }
  abc();              //2
  abc();            //3
</script>
```

## 二、局部变量

```html
<script>

  function abc(){
    var a = 1;
    a++;
    alert(a);
  }
  abc();                       //2
  abc();                    //2
</script>
```

那么怎么才能做到变量a既是局部变量又可以累加呢？

## 三、局部变量的累加

```html
<script>
  function outer(){
    var x=10;
    return function(){             //函数嵌套函数
      x++;
      alert(x);
    }
  }
  var y = outer();              //外部函数赋给变量y;
  y();                 //y函数调用一次，结果为11，相当于outer()()；
  y();                //y函数调用第二次，结果为12，实现了累加
</script>
```

## 函数声明与函数表达式

在js中我们可以通过关键字`function`来声明一个函数：

```html
<script>
  function abc(){
    alert(123);
  }
  abc();
</script>
```

我们也可以通过一个"()"来将这个声明变成一个表达式：

```html
<script>
  (function (){
    alert(123);
  })();                   //然后通过()直接调用前面的表达式即可，因此函数可以不必写名字；
</script>
```

## 四、模块化代码，减少全局变量的污染

```html
<script>
  var abc = (function(){      //abc为外部匿名函数的返回值
    var a = 1;
    return function(){
      a++;
      alert(a);
    }
  })();
  abc();    //2 ；调用一次abc函数，其实是调用里面内部函数的返回值    
  abc();    //3
</script>
```

## 五、私有成员的存在

```html
<script>
  var aaa = (function(){
    var a = 1;
    function bbb(){
      a++;
      alert(a);
    }
    function ccc(){
      a++;
      alert(a);
    }
    return {
      b:bbb,             //json结构
      c:ccc
    }
  })();
  aaa.b();     //2
  aaa.c()      //3
</script>
```

## 六.使用匿名函数实现累加

```html
//使用匿名函数实现局部变量驻留内存中，从而实现累加

<script type="text/javascript">

  function box(){
    var age = 100;
    return function(){          //匿名函数
      age++;
      return age;
    };

  } 
  var b = box();
  alert(b());
  alert(b());    //即alert(box()())；
  alert(b());
  alert(b);
  b = null；  //解除引用，等待垃圾回收
</script>
```

过度使用闭包会导致性能的下降。函数里放匿名函数，则产生了闭包

## 七、在循环中直接找到对应元素的索引

```html
<script>
  window.onload = function(){
    var aLi = document.getElementsByTagName('li');
    for (var i=0;i<aLi.length;i++){
      aLi[i].onclick = function(){        //当点击时for循环已经结束
        alert(i);
      };
    }
  }
</script>

</head>
<body>
  <ul>
    <li>123</li>
    <li>456</li>
    <li>789</li>
    <li>010</li>
  </ul>
</body>
</html>
```

## 八、使用闭包改写上面代码

```html
<script>
  window.onload = function(){
    var aLi = document.getElementsByTagName('li');
    for (var i=0;i<aLi.length;i++){
      (function(i){
        aLi[i].onclick = function(){
          alert(i);
        };
      })(i);
    }
  };
</script>

</head>
<body>
  <ul>
    <li>123</li>
    <li>456</li>
    <li>789</li>
  </ul>
</body>
</html>
```

## 九.内存泄露问题

由于`IE`的`js`对象和`DOM`对象使用不同的垃圾收集方法，因此闭包在`IE`中会导致内存泄露问题，也就是无法销毁驻留在内存中的元素

```js
function closure(){
    var oDiv = document.getElementById('oDiv');//oDiv用完之后一直驻留在内存中
    oDiv.onclick = function () {
        alert('oDiv.innerHTML');//这里用oDiv导致内存泄露
    };
}
closure();
//最后应将oDiv解除引用来避免内存泄露
function closure(){
    var oDiv = document.getElementById('oDiv');
    var test = oDiv.innerHTML;
    oDiv.onclick = function () {
        alert(test);
    };
    oDiv = null;
}
```