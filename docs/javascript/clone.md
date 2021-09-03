---
title: 浅拷贝与深拷贝
date: 2021-01-20 18:37:54
categories: JavaScript
---
# 浅拷贝与深拷贝
* 对象间赋值
* 浅拷贝
* 深拷贝
* Object.assign
* JSON.stringify
* 递归实现深拷贝

## 对象间赋值

除了一些基本类型，对象之间的赋值，只是将地址指向同一个，而不是真正意义上的拷贝

```js
var a = [1,2,3];
var b = a;
b.push(4); // b中添加了一个4
alert(a); // a变成了[1,2,3,4] 

var obj = {a:10};
var obj2 = obj;
obj2.a = 20; // obj2.a改变了，
alert(obj.a); // 20，obj的a跟着改变 
```

## 浅拷贝

所以为了解决地址指向同一个的问题，我们需要封装一个函数，来对对象进行拷贝，通过for in 循环获取基本类型，赋值每一个基本类型，才能真正意义上的复制一个对象

```js
var obj = {a:10};
function copy(obj){
    var newobj = {};
    for ( var attr in obj) {
        newobj[attr] = obj[attr];
    }
    return newobj;
}
var obj2 = copy(obj);
obj2.a = 20;
alert(obj.a); //10  
```

这样就解决了对象赋值的问题。

> 浅拷贝是会将对象的每个属性进行依次复制，但是当对象的属性值是引用类型时，实质复制的是其引用，当引用指向的值改变时也会跟着变化。

```js
var obj = {a:{b:10}};
function copy(obj){
    var newobj = {};
    for ( var attr in obj) {
        newobj[attr] = obj[attr];
    }
    return newobj;
}
var obj2 = copy(obj);
obj2.a.b = 20;
alert(obj.a.b); //20  
```

## 深拷贝

> 深拷贝复制变量值，对于非基本类型的变量，则递归至基本类型变量后，再复制。深拷贝后的对象与原来的对象是完全隔离的，互不影响，对一个对象的修改并不会影响另一个对象。

```js
let obj = {
    name:'a',
    hobbies:{
        like:'coding',
        hate:'reading'
    }
}     
let obj2 = Object.assign({},obj)
let obj3 = JSON.parse(JSON.stringify(obj))

obj.hobbies.like = 'reading'
obj.name='b'

console.log(obj)
console.log(obj2) //name:a,like:reading,说明没有实现深拷贝
console.log(obj3) //实现了深拷贝，但是存在问题

// //JSON.parse(JSON.stringify(obj))我们一般用来深拷贝，其过程说白了 就是利用JSON.stringify 将js对象序列化（JSON字符串），再使用JSON.parse来反序列化(还原)js对象
```

* [Object.assign](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)

* [JSON.stringify详解](https://jinjingxuan.github.io/2020/04/12/JavaScript-JSON.stringify%E8%AF%A6%E8%A7%A3/)

> JSON.parse(JSON.stringify(obj)) 的问题：
>
> 1. 如果obj里面有时间对象，则JSON.stringify后再JSON.parse的结果，时间将只是字符串的形式。而不是时间对象；
> 2. 如果obj里有RegExp、Error对象，则序列化的结果将只得到空对象；
> 3. 如果obj里有函数，undefined，symbol，则序列化的结果会把函数或 undefined丢失；
> 4. 如果obj里有NaN、Infinity和-Infinity，则序列化的结果会变成null
> 5. JSON.stringify()只能序列化对象的可枚举的自有属性，例如 如果obj中的对象是有构造函数生成的， 则使用JSON.parse(JSON.stringify(obj))深拷贝后，会丢弃对象的constructor；
> 6. 如果对象中存在循环引用的情况也无法正确实现深拷贝；因为JSON.tostringify 无法将一个无限引用的对象序列化为 JSON 字符串。

```js
let obj = {
    'date': new Date(),
    'regexp': new RegExp(/a/),
    'error': new Error('err'),
    'fun': function a() {},
    'undefined': undefined,
    'symbol': Symbol('1'),
    'nan': NaN,
    'str': new String('a'),
    'object': {a:1}
}

let _obj = JSON.parse(JSON.stringify(obj))
obj.object.a = 2

console.log(obj)
/**
	date: Wed Feb 03 2021 10:37:06 GMT+0800 (中国标准时间) {}
	error: Error: err at <anonymous>:4:14
  fun: ƒ a()
  nan: NaN
  object: {a: 2}
  regexp: /a/
  str: String {"a"}
  symbol: Symbol(1)
  undefined: undefined
*/
console.log(_obj)
/**
	date: "2021-02-03T02:37:06.906Z"
	error: {}
  nan: null
  object: {a: 1}
  regexp: {}
  str: "a"
*/


// 循环引用
let o = {}
let a = {
    b:42,
    c:o,
    d:function(){}
}
o.e = a //创建循环引用
console.log(JSON.stringify(a)) //报错
```

### 递归方法实现深拷贝原理：

遍历对象、数组直到里边都是基本数据类型，然后再去复制，就是深度拷贝。

> 有种特殊情况需注意就是对象存在循环引用的情况，即对象的属性直接的引用了自身的情况，解决循环引用问题，我们可以额外开辟一个存储空间，来存储当前对象和拷贝对象的对应关系，当需要拷贝当前对象时，先去存储空间中找，有没有拷贝过这个对象，如果有的话直接返回，如果没有的话继续拷贝，这样就巧妙化解的循环引用的问题。

```js
function deepClone(obj, hash = new WeakMap()) {
    // 处理几种特殊的对象：Date, RegExp, Error
    if (obj instanceof Date) return new Date(obj)
    if (obj instanceof RegExp) return new RegExp(obj)
    if (obj instanceof Error) return new Error(obj)
    // 如果是 function, undefined, symbol, NaN 等不是对象的话是不需要深拷贝
    if (typeof obj !== "object" || obj === null) return obj
    // 是对象的话就要进行深拷贝, 若拷贝过直接返回
    if (hash.get(obj)) return hash.get(obj)
    // 否则创建新的对象
    let cloneObj = new Object()
    hash.set(obj, cloneObj)
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            // 实现一个递归拷贝
            cloneObj[key] = deepClone(obj[key], hash)
        }
    }
    return cloneObj
}

let deepobj = deepClone(obj)
console.log(deepobj)
/**
	date: Wed Feb 03 2021 11:02:25 GMT+0800 (中国标准时间) {}
  error: Error at deepClone (<anonymous>:10:20) at deepClone (<anonymous>:16:29) at <anonymous>:35:15
  fun: ƒ a()
  nan: NaN
  object: {a: 1}
  regexp: /a/
  str: String {"", 0: "a"}
  symbol: Symbol(1)
  undefined: undefined
  __proto__: Object
*/


let obj = { name: 1, address: { x: 100 } };
obj.o = obj; // 对象存在循环引用的情况
let d = deepClone(obj);
obj.address.x = 200;

console.log(d);
// { name: 1, address: { x: 100 } }
```

