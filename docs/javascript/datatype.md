---
title: JS数据类型
date: 2020-03-05 09:52:01
categories: JavaScript
---

## JS基本数据类型与类型转换

```js
ES5基本有5种简单数据类型：String，Number，Boolean，Null，undefined。一种复杂的数据类型Object。
ES6新增一种简单数据类型：Symbol,还有BigInt
JS是动态类型语言，所以类型不同的时候进行运算会进行类型转换。
```

### 转字符串

- 转字符串可以理解为 + “”，底层是toString方法，其中对象转为[object object]，数组去括号+“”

```js
2+"3"          //Number(2).toString()+"3"
true+"1"       //Boolean(true).toString()+"1"
""+{}          //输出[object object]
""+{A:123}     //[object object]
"123"=={toString(){return "123"}}    //true，因为重写了toString方法
""+[]          //""
""+[1,2,3]     //"1,2,3"
```

### 转布尔型

Boolean()传入变量

0，NaN，""，null，undefined，false直接转换成false，其余都是真

```js
!!"123"       //true
!!{}          //true
```

### 一道题

```js
var aLi = document.querySelectrAll("li")
for(let item,i = 0;item = aLi[i++];){  //每次赋值都返回当前值，当最后输出undefined是转布尔false
        console.log(item)
}
```

### 转数值

Number()除了0，“”，false会转成0，true转成1，其余都是调用toSring若是数值形式就转数值，不然是NaN

```js
Number(NaN)        //NaN
Number("NaN")      //NaN
Number(0123)       //83
Number("0123")     //123
Number("Infinity") //Infinity
Number([123])      //123   [123].toString()
Number([123，3])   //NaN   
```

### 运算符带来的强制类型转换

有字符串时加法会把其余类型转换为字符串

-，*，、，%优先转数值，+ 除外

```js
"3"-"2"            //1
3+2+"1"            //"51"
"3"+2+1            //"321"
"312"*1            //312
123+null           //123+Number(null)
[]+{}              //两个对象相加调用toString，""+[object object] = [object object]
{}+[]              //{}解析为代码块，+[]，优先转为数值，0
// 至于为什么解析成了代码块，和js引擎的解析相关，在V8，Chrome的JavaScript引擎中，它检查的第一件事一开始是否是 {，如果是，则解析为block。
[1,2]+[2,3]        //"1,22,3"
[1] == "1"         // true
```

在js中，加法运算的规则很简单，只会触发两种情况:

> 1. number + number
> 2. string + string
>
> 除了这两种，若：
>
> 如果有一个数为string，则将另一个操作数隐式的转换为string，然后通过字符串拼接得出结果。
>
> 如果为布尔值这种简单的数据类型，那么将会转换为number类型来进行运算得出结果。
>
> 如果操作数为对象或者是数组这种复杂的数据类型，那么就将两个操作数都转换为字符串，进行拼接 

```js
true + false   // 1
null + 10      // 10
false + 20     // 20
undefined + 30 // NaN
1 + '2'        // "12"
NaN + ''       // "NaN"
undefined + '' // "undefined"
null + ''      // "null"
'' - 3         // -3

[20] - 10
// 过程
[20].toString()  // '20'
Number('20')     // 20
20 - 10          // 10
```

## JS如何进行类型判断

- typeof关键字，存在问题

```js
console.log(typeof 2);               // number
console.log(typeof true);            // boolean
console.log(typeof 'str');           // string
console.log(typeof []);              // object     []数组的数据类型在 typeof 中被解释为 object
console.log(typeof function(){});    // function
console.log(typeof {});              // object
console.log(typeof undefined);       // undefined
console.log(typeof null);            // object     null 的数据类型被 typeof 解释为 object
//这是js发展过程中设计者的重大失误，早期准备更改null的类型为null，由于当时已经有大量网站使用了null，如果更改，将导致很多网站的逻辑出现漏洞问题，就没有更改过来
console.log(typeof new Boolean(true));   //object
console.log(typeof new Number(1));       //object
console.log(typeof new String("abc"));   //object
//对于一些创建的对象，它们都会返回'object'
```

- instanceof关键字：

  判断对象是否是某一数据类型（如Array）的实例 ，存在问题

```js
console.log(2 instanceof Number);                    // false
console.log(true instanceof Boolean);                // false 
console.log('str' instanceof String);                // false  
console.log([] instanceof Array);                    // true
console.log(function(){} instanceof Function);       // true
console.log({} instanceof Object);                   // true  
//问题：字面值被实例化才可，因为字面值不存在__proto__
console.log(new Number(2) instanceof Number);                    // true
console.log(new Boolean(true) instanceof Boolean);                // true 
console.log(new String('str') instanceof String);                // true  
```

- Object.prototype.toString.call()

```js
Object.toString()//"function Object() { [native code] }"
Object.prototype.toString()//"[object Object]"
//Object对象和它的原型链上各自有一个toString()方法，第一个返回的是一个函数，第二个返回的是值类型。

var a = Object.prototype.toString;
 
console.log(a.call(2));
console.log(a.call(true));
console.log(a.call('str'));
console.log(a.call([]));
console.log(a.call(function(){}));
console.log(a.call({}));
console.log(a.call(undefined));
console.log(a.call(null));

// [object Number]
// [object Boolean]
// [object String]
// [object Array]
// [object Function]
// [object Object]
// [object Undefined]
// [object Null]
```

### 例：判断数组

```js
const arr = [1,2,3,4]
arr instanceof Array
Object.prototype.toString.call(arr) === '[object Array]'
Array.isArray(arr)
arr.__proto__.constructor === Array
arr.__proto__ === Array.prototype
```

## Symbol

- 为什么要用Symbol？

ES5里面的对象的属性名是字符串，当我们使用时，若想添加一些新属性，可能会出现重名的情况，于是我们借助Symbol来生成一个独一无二的值，这样就可以防止属性名的冲突了。

- Symbol是什么

她是ES6新引入的一种原始类型数据，使用Symbol可以直接生成一个新的值。

```js
let a1 = Symbol("a1")
let a2 = Symbol("a2")
a1===a2 //false
```

## Bigint

JS 中的`Number`类型只能安全地表示`-9007199254740991 (-(2^53-1))` 和`9007199254740991(2^53-1)`之间的整数，任何超出此范围的整数值都可能失去精度。 

```js
90099999999999992 == 90099999999999993 //true
//使用新的数据类型BigInt  直接在数字后面加n即可
90099999999999992n == 90099999999999993n //false
typeof 90099999999999992n  //"bigint"
```

## 什么情况下 a === a - 1

*  正负Infinity
* 不可被精确表示的值

> 在 JavaScript 里，整数可以被精确表示的范围是从-2 ** 53 + 1到2 ** 53 - 1，即-9007199254740991到9007199254740991。超过这个数值的整数，都不能被精确表示。
> 常量 Number.MAX_SAFE_INTEGER 和 Number.MIN_SAFE_INTEGER分别对应9007199254740991和-9007199254740991。

```js
let a = Number.MIN_SAFE_INTEGER - 1;
console.log(a === a - 1); // true

let a = Number.MAX_SAFE_INTEGER + 1;
console.log(a === a - 1); // false

let a = Number.MAX_SAFE_INTEGER + 2;
console.log(a === a - 1); // false

let a = Number.MAX_SAFE_INTEGER + 3;
console.log(a === a - 1); // false

let a = Number.MAX_SAFE_INTEGER + 4;
console.log(a === a - 1); // true

let a = Number.MAX_SAFE_INTEGER + 5;
console.log(a === a - 1); // true
```

* [js的数值范围](https://www.jinjingxuan.com/2020/07/11/%E6%95%B4%E7%90%86-js%E7%9A%84%E6%95%B0%E5%80%BC%E8%8C%83%E5%9B%B4/)

## 什么情况下 a==1&&a==2&&a==3为true成立

```js
const a = {
  i: 1,
  toString: function () {
    return a.i++;
  }
}
console.log(a == 1 && a == 2 && a == 3) // true

// a是一个对象，在判断时会调用toString方法，而我们把toString方法重写了
// 如果改成 === 则不成立，类型不同直接返回 false，不会隐式转换
```



