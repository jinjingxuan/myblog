---
title: 函数与变量的解析顺序
date: 2018-08-08 15:00:54
categories: JavaScript
---

## 首先了解一下规则

1)函数声明会置顶 

2)变量声明也会置顶 

3)函数声明更优先 

4)变量和赋值语句一起书写，在js引擎解析时，会将其拆成声明和赋值2部分，声明置顶，赋值保留在原来位置 

5)声明过的变量不会重复声明 

### 例子一

先来看一下结果

```js
var scope = gloabl;
function f(){
    console.log(scope);  
    var scope = "local";  
    console.log(scope);	  
}//输出undefined，local
```

按照规则改写顺序之后

```js
var scope = gloabl;
function f(){
    var scope;            //声明提前
    console.log(scope);   //输出undefined，不是gloabl
    scope = "local"       //初始化
    console.log(scope);	  //输出local
}
```

### 例子二

先来看一下结果

```js
console.log( a );         
var a = 1;
var a = [];
function a(){
    console.log( 'fn' );  
}
console.log( a );         //输出函数体，[]
```

按照规则改写顺序之后

```js
function a(){            //函数声明提前
    console.log( 'fn' ); //不执行
}
var a;                   //变量声明提前，但是在函数后面
var a;
console.log( a );        //原本js内存地址中本来已经声明了一个名为a的函数对象                            （相当于已经将a这个地址指向了函数对象），再次声明一次                           a，但并没赋值，所以打印出来的依旧是函数a。
a = 1;
a = [];
console.log( a );        //输出[]
```

### 例子三

先来看一下结果

```js
var a = 1;
function b(){
    a = 10;              //这里a并没有提升为全局变量
    return;
    function a(){
        console.log(a);  
    }	
}
b();
console.log(a);          //输出1
```

如果你不懂，我们来看看改写之后

```js
function b(){
    function a(){       //函数声明置顶
        console.log(a); //不执行
    }
    a = 10;             //10赋值给了函数名为a的这个函数对象！
    return;	
}
var a;
a  = 1;
b();
console.log(a);        //输出1
```

如果把函数a注释掉

```js
function b(){
    a = 10;
    return;	
}
var a;
a = 1;
b();
console.log(a);       //输出10
```

### 例子四

```js
console.log( a );    
a();                 
var a = 1;
console.log( a );    
var a = {};
function a(){
    var b = 5;
    console.log( 'fn' );
}
a();                 
console.log( a );    //输出函数体，"fn"，1，报错
```

改写顺序

```js
function a(){
    var b = 5;
    console.log( 'fn' );
}
var a;
var a;
console.log( a );    //输出函数体
a();                 //输出"fn"
a = 1;               //输出1
console.log( a );
a = {};
a();                 //报错
console.log( a );    //前面报错了，不执行了
```

### 例子五

```js
fn()();
var a = 0;
function fn(){
    console.log( a );
    var a = 3;
    function b(){
        console.log( a );
    }
    return b;
}                      //输出undefined,3
```

改写顺序

```js
function fn(){
    function b(){
        console.log( a );
    }
    var a;
    console.log( a );  //输出undefined
    a = 3;
    return b;          //返回函数b
}
var a;
fn()();                //相当于b()，输出3
a = 0;
```

### 例子六

```js
function fn1(){
    var num = 10;
    function fn2(){
        console.log( num );
    }
    return fn2;
}
console.log( fn1() );
var b = fn1();
b();
```

改写顺序

```js
function fn1(){
    function fn2(){
        console.log( num );
    }
    var num;
    num = 10;
    return fn2;
}
var b;
console.log( fn1() ); //先执行fn1(),返回fn2,输出fn2的函数体
b = fn1();            //b=fn2
b();                  //fn2(),输出10
```

### 例子七

```js
a();
function a(){
    var fn = function(){
        console.log( 123 );
    }
    return fn1;
}
a();
var a = 0;
var a = 0;
function fn1(){
    console.log( a );
    var a = 1;
    return a;
}
console.log( fn1() );
console.log( a );
fn1()();//输出undefined,undefined,undefined,1,0,undefined,报错
```

改写顺序

```js
function a(){
    var fn = function(){
        console.log( 123 );
    }
    return fn1();
};
function fn1(){
    var a;
    console.log( a );
    a = 1;
    return a;
};
var a;
var a;
a();                 //fn1=>console.log(a)=>undefined
a();		        //fn1=>console.log(a)=>undefined
a = 0;
a = 0;
console.log( fn1() );//undefined,1
console.log( a );    //0
fn1()();             //fn1()=>console.log(a)=>undefined,a()=>报错
```

