---
title: 原型和原型链
date: 2018-09-19 10:00:54
categories: JavaScript
---
# 原型和原型链
* 原型：https://blog.csdn.net/u012468376/article/details/53121081 
* 原型链：https://blog.csdn.net/u012468376/article/details/53127929
* [Object和Function图示](https://pic2.zhimg.com/80/dcd9f21f6457d284950b767e6f7bdea3_720w.jpg?source=1940ef5c)

```js
Function.prototype.a = () => console.log(1);
Object.prototype.b = () => console.log(2);
function A() {};
var a = new A(); // 记住 new 返回的是对象
a.a(); // not a function
a.b(); // 2

let fun = function x() {}
fun.a() //1
fun.b() //2
```

## 原型链继承

```js
function Father() {
    this.name = "马云"
}

function Son() {

}

Son.prototype = new Father()
let son = new Son()

console.log(son.name) // 马云
son.__proto__ // Father {name: "马云"}
son instanceof Father // true

// 1. 无法传参 2. 父类实例属性被所有子类实例共享
```

## 构造函数继承

```js
function Father(name) {
    this.name = name
}

function Son(name, age) {
    this.age = age
    Father.call(this, name)
}

let son = new Son("马云", 18)

console.log(son) // Son {age: 18, name: "马云"}

// 1. 利用call实现了传参 
// 2. son instanceof Father 为 false，不是真正的继承，所以 Father 原型中的属性拿不到
```

## 组合继承

```js
function Father(name) {
    this.name = name
    Father.prototype.eat = function() {
        console.log("吃东西")
    }
}

function Son(name, age) {
    this.age = age
    Father.call(this, name)
}

Son.prototype = new Father()

let son = new Son("马云", 18)

console.log(son) // Son {age: 18, name: "马云"}
son.eat() // 吃东西
son instanceof Father // true
```

## 原型式继承

```js
function inheritObj(o) {
    function F() {}
    F.prototype = o
    return new F()
}

let book = {
    name: "js book"
}

let ajaxBook = inheritObj(book)

ajaxBook.name // "js book"
ajaxBook.__proto__ // {name: "js book"}

// 就是对原型链继承的封装
```

## 寄生式继承

```js
function inheritObj(o) {
    function F() {}
    F.prototype = o
    return new F()
}

let book = {
    name: "js book"
}

function creteBook(obj){
    var o = inheritObj(obj)  //不仅有父类中的属性和方法
    o.getName = function() {  //还添加了新的属性和方法
        console.log(this.name)
    }
    return o
}

let ajaxBook = new creteBook(book)

ajaxBook.getName() // js book
```

## 寄生组合式继承

```js
function inheritObject(o){
    function F(){}
    F.prototype = o
    return new F()
}
function inheritPrototype(subClass, superClass){
    var p = inheritObject(superClass.prototype)
    p.constructor = subClass
    subClass.prototype = p
}
//父类
function SuperClass(name){
    this.name = name
}
//子类
function SubClass(name,time){
    //构造函数式继承
    SuperClass.call(this,name)
    this.time = time
}
//寄生式继承父类原型
inheritPrototype(subClass,superClass)
```



