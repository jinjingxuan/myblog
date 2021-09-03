---
title: JSON.stringify详解
date: 2020-04-12 09:52:01
categories: JavaScript
---

我们都知道toString是用于处理非字符串到字符串的强制类型转换（隐式类型转换）

```js
let a={}  
a.toString()   //[object Object]
let b=[1,2,3]
b.toString()   //数组的toString被重写了，所以输出"1,2,3"
```

JSON.stringify将JSON对象序列化时也用到了toString()

### 先说结论

* 安全的JSON值可以序列化，不安全的JSON值会特殊处理

* 安全：字符串，数字，布尔值和null的JSON.stringify与toString基本相同
* 不安全：undefined,function,symbol会特殊处理，如果传递给JSON.stringify的对象中定义了toJSON方法，那么该方法会在字符串化前调用，将对象转化为安全JSON值

### 不安全的JSON值

### （1）undefined,function,symbol

1. 直接放在对象中：undefined

```js
JSON.stringify(undefined)    //undefined
JSON.stringify(function(){}) //undefined
JSON.stringify(Symbol(a))    //undefined
```

2. 放在数组中：输出null

```js
JSON.stringify(
	[1,undefined,function(){},Symbol(a),4]
)
//[1,null,null,null,4]

JSON.stringify(
	{a:1,b:undefined,c:function(){},d:Symbol(a),e:4}
)
//{"a":1,"e":4}
```

### （2）循环引用

可以定义toJSON方法来返回安全的JSON值

```js
let o = {}
let a = {
    b:42,
    c:o,
    d:function(){}
}
o.e = a //创建循环引用
console.log(JSON.stringify(a)) //报错

//自定义一下toJSON
a.toJSON = function(){
    return {b:this.b}
}
console.log(JSON.stringify(a)) //{"b":42}
```

也就是说，toJSON应该返回一个能够被字符串化的安全JSON值

```js
var a = {
 val: [1,2,3],
 toJSON: function(){
 	return this.val.slice( 1 );
 }
};
console.log(JSON.stringify(a)) //"[2,3]"
```

## JSON.stringify的几个参数

### （1）replacer

* 是一个数组，那么他必须是一个字符串数组，其中包含的是要序列化的，除此之外的属性被忽略
* 是一个函数，对对象本身调用一次，然后对每个属性各调用一次

```js
let a = {
    b:42,
    c:"42",
    d:[1,2,3]
}
console.log(JSON.stringify(a,["b","c"]))
//{"b":42,"c":"42"}

console.log(JSON.stringify(a,function(k,v){
    if(k!=="c") return v
}))
//{"b":42,"d":[1,2,3]}
```

### （2）space

用于指定缩进格式

```js
let a = {
    b:42,
    c:"42",
    d:[1,2,3]
}
console.log(JSON.stringify(a,null,3))
/*
{
   "b": 42,
   "c": "42",
   "d": [
      1,
      2,
      3
   ]
}
*/

console.log(JSON.stringify(a,null,'----'))
/*
{
----"b": 42,
----"c": "42",
----"d": [
--------1,
--------2,
--------3
----]
}
*/
```

## 联系序列化深拷贝

JSON.parse(JSON.stringify(obj)) 的问题：

1. 对象的属性值是函数时，无法拷贝。
2. 原型链上的属性无法拷贝
3. 不能正确的处理 Date 类型的数据
4. 不能处理 RegExp
5. 会忽略 symbol
6. 会忽略 undefined

**由此可知，无法处理函数,undefied,symbol是因为不是安全的JSON格式**