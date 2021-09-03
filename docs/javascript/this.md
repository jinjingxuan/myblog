---
title: Javascript中this的指向
date: 2018-10-31 10:00:54
categories: JavaScript
---
# Javascript中this的指向
* 以函数的形式调用时，**this**指向的是**window**
* 以对象的方法的形式调用时，this就是调用方法的那个对象
* 当以构造函数的形式调用时，this就是新创建的那个对象
* 使用call()和apply()调用时，this就是call()和apply()第一个参数的对象
* 使用bind()()调用时，this就是bind()第一个参数的对象
* 箭头函数没有自己的 this，**箭头函数内部的 `this` 值始终等于离它最近的外部函数的 `this` 值。换句话说，箭头函数可按词法解析 `this`，箭头函数没有定义自己的执行上下文。**
* 由于 箭头函数没有自己的this指针，通过 `call()` *或* `apply()` 方法调用一个箭头函数时，只能传递参数（不能绑定this），他们的第一个参数会被忽略。

## 箭头函数的 this

```js
const obj = {
    val: 1,
    fn1: () => {
        console.log(this.val)
    },
    fn2: function() {
        console.log(this.val)
    },
    fn3: function() {
        showThis = () => {
            console.log(this.val)
        }
        showThis()
    }
}
obj.fn1() // undefined
obj.fn2() // 1
obj.fn3() // 1 此处的 this 继承于 fn3的 this
```

## 箭头函数与普通函数的区别

* 不能通过 new 关键字调用, 没有原型

* 不可以改变 this 绑定，由外层非箭头函数决定，所以使用 call, apply, bind 也不会影响

* 不支持 arguments，所以根据作用域链，会拿到外层函数的 arguments

* 隐式返回，箭头函数给你省了一个 `return`，适合这种函数体内只有一行代码的情况，多行还是需要写的

```js
var Foo1 = () => {};
var foo = new Foo1(); // TypeError: Foo is not a constructor
console.log(Foo1.prototype); // undefined

var Foo2 = () => {
    console.log(arguments)
};
Foo2() // Uncaught ReferenceError: arguments is not defined
```

由于不支持 arguments，ES6 也提供了这种不定参数情况下的参数如果操作，看下面的例子

```js
const add = (...args) => {
	return args.reduce((cur, i) => cur + i, 0)
}
add(5, 10, 15)
```

看一道题测试你是否掌握了

```js
// 普通函数
function foo() {
  setTimeout(function(){
    console.log('id:', this.id);
  },100)
}
var id = 1;

foo.call({ id: 2 }); // id: undefined

// 箭头函数
function foo() {
  setTimeout(() => {
    console.log('id:', this.id);
  }, 100);
}

var id = 1;

foo.call({ id: 2 }); // id: 2
```

## 普通函数和作为对象方法的 this

```js
window.val = 1;
var obj = {
    val: 2,
    dbl: function() {
        this.val *= 2;
        val *= 2;
        console.log(val);
        console.log(this.val);
    }
}
//作为对象方法
obj.dbl(); // 2 4,this指的是obj，所以this.val值为4，val相当于window.val值为2

//普通函数
var func = obj.dbl;
func(); // 8 8，func()没有任何前缀，this指的是window.func();所以此时this值得是window，值均为8
```

## 构造函数中this

JavaScript 支持面向对象式编程，与主流的面向对象式编程语言不同，JavaScript 并没有类（class）的概念，而是使用基于原型（prototype）的继承方式。相应的，JavaScript 中的构造函数也很特殊，如果不使用 new 调用，则和普通函数一样。作为又一项约定俗成的准则，构造函数以大写字母开头，提醒调用者使用正确的方式调用。如果调用正确，this 绑定到新创建的对象上。 

```js
function Point(x, y){ 
	this.x = x; 
	this.y = y; 
}

var p = new Point(1,2);
console.log(p.x);//==>1,this指向对象p
```

##  apply或call调用

在 JavaScript 中函数也是对象，对象则有方法，apply 和 call 就是函数对象的方法。这两个方法异常强大，他们允许切换函数执行的上下文环境（context），即 this 绑定的对象。很多 JavaScript 中的技巧以及类库都用到了该方法。 

```js
function Point(x, y){ 
   this.x = x; 
   this.y = y; 
   this.moveTo = function(x, y){ 
       this.x = x; 
       this.y = y; 
   } 
} 
 
var p1 = new Point(0, 0); 
var p2 = {x: 0, y: 0}; 
p1.moveTo(1, 1); 
p1.moveTo.apply(p2, [10, 10]);
```

在上面的例子中，我们使用构造函数生成了一个对象 p1，该对象同时具有 moveTo 方法；使用对象字面量创建了另一个对象 p2，我们看到使用 apply 可以将 p1 的方法应用到 p2 上，这时候 this 也被绑定到对象 p2 上。另一个方法 call 也具备同样功能，不同的是最后的参数不是作为一个数组统一传入，而是分开传入的。 
