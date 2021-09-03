---
title: ES扩展
date: 2020-11-06 09:52:01
categories: JavaScript
---
# ES扩展
* ES6的class
* ES6的继承，extend与super
* ES6的let与const
* 对象字面量的增强
* object.assign
* Set数据结构
* Symbol可作为键
* forEach、find、map、filter、reduce、every、some
* ES2017
* Array.from

## class

```js
class Person{//定义了一个名字为Person的类
    constructor(name,age){//constructor是一个构造方法，用来接收参数
        this.name = name;//this代表的是实例对象
        this.age = age;
    }
    say(){//这是一个类的方法，注意千万不要加上function
        return "我的名字叫" + this.name+"今年"+this.age+"岁了";
    }
}
var obj=new Person("laotie",88);
console.log(obj.say());//我的名字叫laotie今年88岁了
console.log(typeof Person);//function
console.log(Person===Person.prototype.constructor);//true

//实际上类的所有方法都定义在类的prototype属性上。
//还可以通过Object.assign方法来为对象动态增加方法
Object.assign(Person.prototype,{
    getName:function(){
        return this.name;
    },
    getAge:function(){
        return this.age;
    }
})
var obj=new Person("laotie",88);
console.log(obj.getName());//laotie
console.log(obj.getAge());//88

//constructor方法是类的构造函数的默认方法，通过new命令生成对象实例时，自动调用该方法。
class Box{
    constructor(){
        console.log("啦啦啦，今天天气好晴朗");//当实例化对象时该行代码会执行。
    }
}
var obj=new Box();

//类的所有实例共享一个原型对象，它们的原型都是Person.prototype，所以proto属性是相等的
class Box{
    constructor(num1,num2){
        this.num1 = num1;
        this.num2 = num2;
    }
    sum(){
        return num1+num2;
    }
}
//box1与box2都是Box的实例。它们的__proto__都指向Box的prototype
var box1=new Box(12,88);
var box2=new Box(40,60);
console.log(box1.__proto__===box2.__proto__);//true
//由此，也可以通过proto来为类增加方法。使用实例的proto属性改写原型，会改变Class的原始定义，影响到所有实例，所以不推荐使用！
```

## 继承

```js
class b extends a{
    constructor(x, y, z) {
        super(x, y);//要在this的前面
        this.z = z;
    }
    toString2(){
        return super.toString()+' '+this.z
    }
}
//super表示父类的构造函数，并且子类的构造函数必须执行一次super
//`super()`相当于`a.prototype.constructor.call(this)`
```

* super完成了调用父类构造函数，extends实现了原型链的继承，本质上和ES5是一样的

### 继承的时候extends干了什么

**extends在实现继承方面，本质上也是原型链继承,该方法实现了两步原型链继承**
大多数浏览器的 ES5 实现之中，每一个对象都有__proto__属性，指向对应的构造函数的prototype属性。
Class 作为构造函数的语法糖，同时有prototype属性和__proto__属性，因此同时存在两条继承链。

- （1）子类的__proto__属性，表示构造函数的继承，总是指向父类。（把子类构造函数(`Child`)的原型(`__proto__`)指向了父类构造函数(`Parent`)，）
- （2）子类prototype属性的__proto__属性，表示方法的继承，总是指向父类的prototype属性。
- [ES5继承](https://images2018.cnblogs.com/blog/1290444/201805/1290444-20180522190257058-425523963.png)
- [ES6继承](https://images2018.cnblogs.com/blog/1290444/201805/1290444-20180522190423509-1503553581.png)

ES5只有两种声明变量的方式：var和function，ES6还添加了两种常用的声明变量的方式：let和const。

## let命令

ES6新增了let命令，用来声明变量，它的用法类似于var，但是所声明的变量，只在let命令所在的代码块内有效。

1、for循环的计数器，就很合适使用let。

```js
var a = [];
for (var i = 0; i < 10; i++) {
	a[i] = function() {
		console.log(i);
	}
}
a[6](); // 10
```

变量i是var声明的，在全局范围内有效，所以每次循环新的i值都会覆盖旧值，导致最后输出的是最后一轮的i的值。

```js
var a = [];
for (let i = 0; i < 10; i++) {
	a[i] = function() {
		console.log(i);
	}
}
a[5](); // 5
```

使用let，声明的变量仅在块级作用域内有效，最后输出的是5。

2、let不存在变量提升：let不像var那样会发生变量提升，所以，变量一定要在声明后使用，否则报错。

```js
console.log(i); // 输出：undefined
console.log(j); // 报错
var i = 5;
let j = 10;
```

3、暂时性死区：

只要块级作用域存在let命令，它所声明的变量就绑定到这个区域，不再受外部的影响。

```js
var i= 6;
if (i > 5) {
	i = 3; // 报错
	let i;
}
```

ES6明确规定，若块作用域中存在let和const命令，则它们声明的变量，从一开始就形成了封闭作用域，凡是在声明之前就使用这些变量，就会报错。

在代码块内，使用let命令声明变量之前，该变量都是不可用的（不可赋值，不可访问等），这称为“暂时性死区”。

暂时性死区使得typeof操作不一定安全，所以在let声明之前，使用typeof操作符会报错。而在let出现之前，typeof是百分之百安全的，永远不会被报错，即使变量没有被声明，typeof也会返回undefined。

```js
if (true) {
	alert(typeof x); // 报错
	alert(typeof y); // undefined
	let x;
}
```

暂时性死区的本质：只要一进入当前作用域，所要使用的变量就已经存在了，但是不可获取，只有等到声明变量的那一行代码出现，才可以获取和使用该变量。

ES6规定暂时性死区和let、const语句不出现变量提升，主要是为了减少运行时错误，防止变量在声明前就使用该变量，从而导致意料之外的错误。这类错误在ES5中很常见。

4、不允许重复声明

let不允许在相同作用域内，重复声明同一个变量。

```js
function func() { // 报错
	var i= 1;
	let i = 1;
}
function func() { // 报错
	let i= 1;
	let i = 1;
}
```

不能在函数内部重新声明参数。

```js
function func(arg) { // 报错
	let arg;
}
function func(arg) { // 不报错
	{
		let arg;
	}
}
```

## const命令

const声明一个只读的常量，一旦声明，常量的值就不能改变，这意味着，const一旦声明常量，就必须立即初始化，不能等到之后再赋值。因此，改变常量和只声明不赋初始值都会报错。

const的作用域与let命令相同，只在声明所在的块级作用域内有效。

```js
if (true) {
	const i = 5;
}
console.log(i); // 报错
```

const声明的常量也不提升，同时存在暂时性死区，只能在声明的位置后面使用。

```js
if (true) {
	console.log(i); // 报错
	const i = 5;
}
```

const声明的常量，也和let一样不可重复声明。

```js
var i = 5;
let j = 10;
const i =6; // 报错
const j = 11; // 报错
```

对于复合类型的常量，常量名不指向数据，而是指向数据所在的地址。const命令只是保证常量名指向的地址不变，并不保证该地址的数据不变，也就是说，将对象常量指向另一个地址会报错，但对象本身是可变的，可以为其添加，修改属性，因此将一个对象声明为常量必须十分小心。

```js
const obj = {};
obj.name = “Alice”;
obj = {}; // 报错
```

将一个数组声明为常量，该数组本身是可写的，但是若将另一个数组赋值给该数组，会报错。

```js
const arr = [];
arr.push(1);
arr = [1,2,3,4]; // 报错
```

转载自https://blog.csdn.net/zhouziyu2011/article/details/68067609

```js
不用var，主用const，配合let
主用const的好处是用于判断变量是否需要更改
```

****

* **箭头函数**

```js
//不需要 function 关键字来创建函数
//省略 return 关键字
//继承当前上下文的 this 关键字

// ES5
[1,2,3].map((function(x){  //map方法返回一个由原数组中的每个元素调用指定方法后的返回值组成的新数组。
    return x + 1;
}).bind(this));

//array.map(function() {}, this) 的作用实际上和 array.map(function() {}.bind(this)) 是一样的。map的第二个参数就是给第一个参数bind一个对象。
    
// 使用箭头函数
[1,2,3].map(x => x + 1);
```

* **函数默认参数值**

```js
// ES6之前，当未传入参数时，text = 'default'；
function printText(text) {
    text = text || 'default';
    console.log(text);
}

// ES6；
function printText(text = 'default') {
    console.log(text);
}

// 有多个参数时，带默认值的要放到最后
```

* **扩展运算符(spread)和剩余运算符(rest)，即...的含义**

```js
//扩展运算符(spread)   数组化为参数,功能是把数组或类数组对象展开成一系列用逗号隔开的值

//1.构造数组
var arr1 = ['a','b','c'];
var arr2 = ['aa','bb','cc'];
var arrs = [...arr1, ...arr2];
console.log(arrs); // ['a','b','c','aa','bb','cc']
//2.解析数组
var son1,son2;
[son1, ...son2] = arr1
console.log(son1);  // 'a'
console.log(son2);  //['b','c']
//3.参数赋值
const arr = [2,3,1,5];
const maxNum = Math.max(...arr); // 返回5。max函数不接受数组只接受数列


//剩余运算符(rest)     参数转化为数组,把逗号隔开的值序列组合成一个数组
//1.所有参数可由一个变量统一接收
function foo(...args) {
  console.log(args);
}
foo( 1, 2, 3, 4, 5); // [1, 2, 3, 4, 5]
foo( 'a', 'b', 'c'); // [a,b,c]
```

* **对象和数组解构**

```js
//1.对象
var obj = {x: 1, y: 2, z: 3};
const {x, y, z} = obj; // x = 1, y = 2, z = 3
//还可赋值a,b,c
const {x: a, y: b, z: c} = obj; // a = 1, b = 2, c = 3

//2.数组
const arr = [1, 2, 3, 4, 5, 6]
const [a, b] = arr;
console.log(a, b);  // 1, 2，按顺序自动获取
const [a, b,,, c] = arr;
console.log(a, b, c);  // 1, 2, 5  获取指定位置

//3.函数对象参数
const student = {
  name: 'Job',
  num: 001,
  age: 18,
  sex: 'boy'
};
const check = function half({num,sex}) {
    return (num , sex);
};
console.log(student); // 一个object
console.log(check(student)); // (001, 'boy')
```

* **Map数据结构**

为什么需要Map，因为Object本质上是键值对的集合，Object的键在使用Object.keys输出时都转化为了字符串，如果键为对象则都转化为[object, Object]，但是Map的键不限。

与Object的区别

（1）Map 中的键值是有序的，而添加到对象中的键则不是。因此，当对它进行遍历时，Map 对象是按插入的顺序返回键值。

（2）你可以通过 `size` 属性直接获取一个 `Map` 的键值对个数，而 `Object` 的键值对个数只能手动计算。

 ```js
//Map的结构遍历
// 1. keys()-->将键名都取出来，组成一个可遍历的数据集合
let m = new Map([
    [123,'abc'],
    ['a','hahaha'],
    [1>2,'baidu.com']
]);
for(let x of m.keys()){  //m.keys => MapIterator {123, "a", false}  返回容器对象
    console.log(x);
}
-->123 a false

//2. values()  返回键值的遍历器
let m = new Map([
    [123,'abc'],
    ['a','hahaha'],
    [1>2,'baidu.com']
]);
for(let x of m.values()){  //m.values=>MapIterator {"abc", "hahaha", "baidu.com"}
    console.log(x);
}
-->abc hahaha baidu.com

//3. entries()  返回所有成员的遍历器
let m = new Map([
    [123,'abc'],
    ['a','hahaha'],
    [1>2,'baidu.com']
]);
m.entries()   //MapIterator {123 => "abc", "a" => "hahaha", false => "baidu.com"}
[...m.entries()] // [Array(2), Array(2), Array(2)]

//4. 扩展运算符,转换为二维数组或一维数组
let m = new Map([
    [123,'abc'],
    ['a','hahaha'],
    [1>2,'baidu.com']
]);
console.log([...m]) //(3) [Array(2), Array(2), Array(2)]
[...m.keys()]       //[123, "a", false]
 ```

* **数组的include方法**

在ES5，Array已经提供了indexOf用来查找某个元素的位置，如果不存在就返回-1，

缺点：

1. 是它会返回-1和元素的位置来表示是否包含，在定位方面是没问题，就是不够语义化。

2. 不能判断是否有NaN的元素。 

ES6提供了Array.includes()函数判断是否包含某一元素，除了不能定位外，解决了indexOf的上述的两个问题。它直接返回true或者false表示是否包含元素，对NaN一样能有有效。 

```js
[1, 2, 3].includes(2)     // true
[1, 2, 3].includes(4)     // false
[1, 2, NaN].includes(NaN) // true
[1, 2, 3].includes(3, 3);  // false  该方法的第二个参数表示搜索的起始位置，默认为0
[1, 2, 3].includes(3, -1); // true
```

## 模板字符串

```js
// 模板字符串前面可以添加标签

const name = 'tom'
const gender = true

function myTagFunc (strings, name, gender) {
    console.log(strings, name, gender)
}

const result = myTagFuc`hey, ${name} is a ${gender}`
console.log(result)
```

## 对象字面量的增强

```js
const bar = '345'
const obj = {
    foo: 123
    bar,                 // bar: bar
    method1 () {         // 省略了 :function
    	console.log(1)   
	}
	[Math.random()]: 123 // 计算属性，加上方括号，可以为一个随机的值
}
```

* [对象初始化](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Object_initializer)

## object.assign

```js
const source = {
    a: 123,
    b: 123
}

const target = {
    a: 456,
    c: 456
}

Object.assign(target,source)
```

## object.is

```js
+0 === -0 // true
NaN === NaN // false

object.is(+0, -0) //false
Object.is(NaN, NaN) // true
```

`Object.is()` 方法判断两个值是否为[同一个值](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Equality_comparisons_and_sameness)。如果满足以下条件则两个值相等:

- 都是 [`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)
- 都是 [`null`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/null)
- 都是 `true` 或 `false`
- 都是相同长度的字符串且相同字符按相同顺序排列
- 都是相同对象（意味着每个对象有同一个引用）
- 都是数字且
  - 都是 `+0`
  - 都是 `-0`
  - 都是 [`NaN`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/NaN)
  - 或都是非零而且非 [`NaN`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/NaN) 且为同一个值

与[`==`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Comparison_Operators#Equality) 运算*不同。* `==` 运算符在判断相等前对两边的变量(如果它们不是同一类型) 进行强制转换 (这种行为的结果会将 `"" == false` 判断为 `true`), 而 `Object.is`不会强制转换两边的值。

与[`===`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Comparison_Operators#Identity) 运算也不相同。 `===` 运算符 (也包括 `==` 运算符) 将数字 `-0` 和 `+0` 视为相等 ，而将[`Number.NaN`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/NaN) 与[`NaN`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/NaN)视为不相等.

## Set数据结构

```js
const s = new Set()
s.add(1).add(2)

console.log(s.size)
console.log(s.has(100))
console.log(s.delete(3))
s.clear()
```

## Symbol

```js
const obj = {
    [Symbol()]: 'symbol value',
    foo: 'value'
}

// 用for in, Object.keys, JSON.stringify都获取不到
```

## forEach、find、map、filter、reduce、every、some

#### 1、forEach 没有返回值，只是让数组中的每个元素执行function的操作

```js
let arr = [1,2,3,4,5];
arr.forEach((item,index)=>{
    console.log(item * 2);       //2,4,6,8,10
})
```

#### 2、find 返回数组中第一个满足条件的元素（查找）

```js
let arr = [1,2,3,4,5];
arr.find((item,index)=>{
    return item > 3;       //4
})
```

#### 3、map 返回一个新数组，数组中的每个元素为调用function的结果

```js
let arr = [1,2,3,4,5];
arr.map((item,index)=>{
    return item * 2;       //[2,4,6,8,10]
})
```

#### 4、filter 返回一个符合function条件的元素数组（过滤）

```js
let arr = [1,2,3,4,5];
arr.filter((item,index)=>{
    return item > 3;       //[4,5]
})
```

#### 5、reduce 让数组中的前项和后项做某种运算，返回累计的最终值

```js
let arr = [1,2,3,4,5];
arr.reduce((prev,next)=>{
    return prev + next;       //15
})
```

#### 6、every 返回一个Boolean值，判断数组中每一个元素是否符合function的条件

```js
let arr = [1,2,3,4,5];
arr.every((item,index)=>{
    return item > 0;       //true(所有元素都满足才为true)
})
```

#### 7、some 返回一个Boolean值，判断数组中是否有元素符合function的条件

```js
let arr = [1,2,3,4,5];
arr.some((item,index)=>{
    return item > 4;       //true(只要有一个满足即可)
})
```

## ES2017

* Object.values
* Object.entries
* Object.getOwnPropertyDescriptors
* String.prototype.padStart
* Sting.prototype.padEnd
* 函数参数中添加尾逗号

``` js
const obj = {
    foo: 'value1',
    bar: 'value2'
}

console.log(Object.keys(obj))   // 键
console.log(Object.values(obj)) // 值

console.log(Object.entries(obj))
// [["foo", "value1"], ["bar", "value2"]]

// 可以用这种方法来遍历对象
for(const [key, value] of Object.entries(obj)) {
    console.log(key, value)
}

// 对象转换为Map
new Map(Object.entries(obj))

Object.getOwnPropertyDescriptors(obj)
// 获取对象的完整描述信息
// {foo: {…}, bar: {…}}

// foo:
// value: "value1"
// writable: true
// enumerable: true
// configurable: true

// bar:
// value: "value2"
// writable: true
// enumerable: true
// configurable: true

//padEnd和padStart可以使输出更工整
const books = {
    html: 5,
    css: 16,
    javascript: 128
}
for(const [name, count] of Object.entries(books)) {
    console.log(`${name.padEnd(16, '-')}|${count.toString().padStart(3, '0')}`)
}

// html------------|005
// css-------------|016
// javascript------|128

// 尾逗号，方便代码管理
const arr = [
    100,
    200,
    300,
]
```

## Array.from

**将一个类数组对象或者可遍历对象转换成一个真正的数组。**

- 该类数组对象必须具有length属性，用于指定数组的长度。如果没有length属性，那么转换后的数组是一个空数组。
- 该类数组对象的属性名必须为数值型或字符串型的数字
- 该类数组对象的属性名可以加引号，也可以不加引号
- `Array.from`可以接受第二个参数，作用类似于数组的`map`方法，用来对每个元素进行处理，将处理后的值放入返回的数组。

### 从 `String` 生成数组

```js
Array.from('foo');
// [ "f", "o", "o" ], 可以代替 split
```

### 从 `Set` 生成数组

```js
const set = new Set(['foo', 'bar', 'baz', 'foo']);
Array.from(set);
// [ "foo", "bar", "baz" ]
```

### 从 `Map` 生成数组

```js
const map = new Map([[1, 2], [2, 4], [4, 8]]);
Array.from(map);
// [[1, 2], [2, 4], [4, 8]]

const mapper = new Map([['1', 'a'], ['2', 'b']]);
Array.from(mapper.values());
// ['a', 'b'];

Array.from(mapper.keys());
// ['1', '2'];
```

### 从类数组对象（arguments）生成数组

```js
function f() {
  return Array.from(arguments);
}

f(1, 2, 3);

// [ 1, 2, 3 ]
```

### 在 `Array.from` 中使用箭头函数

```js
// Using an arrow function as the map function to
// manipulate the elements
Array.from([1, 2, 3], x => x + x);
// [2, 4, 6]


// Generate a sequence of numbers
// Since the array is initialized with `undefined` on each position,
// the value of `v` below will be `undefined`
Array.from({length: 5}, (v, i) => i);
// [0, 1, 2, 3, 4]
```

### 初始化二维数组

```js
Array.from(new Array(m),()=>(new Array(n).fill(0)))
```

## Array.of

`Array.of()` 方法创建一个具有可变数量参数的新数组实例，而不考虑参数的数量或类型。

```js
Array.of(7);       // [7]
Array.of(1, 2, 3); // [1, 2, 3]

Array(7);          // [ , , , , , , ]
Array(1, 2, 3);    // [1, 2, 3]
```

