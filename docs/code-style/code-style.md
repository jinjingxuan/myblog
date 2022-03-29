---
title: 代码规范
date: 2020-09-20 10:27:54
categories: 规范
---
# 代码规范
* 使用默认值
* 解构语法
* 删掉注释的代码
* 尽量不用“非”条件句
* 使用Array.includes来处理多个条件
* 多个类似函数
* 使用 && 运算符化简表达式
* 空值合并运算符 '??'
* 可选链操作符 '?.'
* 代码风格
* 一些技巧
* 多个变量赋值，交换变量
* 字符串重复
* 双非位运算符
* 数组中的最大值最小值
* 巧用this实现链式调用
* 新对象替换老对象
* 对象数组去重
* 巧用apply
* 合并对象
* Array.filter(Boolean)

## 使用默认值

```js
// Bad
function createMicrobrewery(name) {
    const brewryName = name || 'Hipster Brew'
    // ...
}

// Good
function createMicrobrewery(name = 'Hipster Brew') {
    // ...
}
```

## 解构语法

**如果参数超过两个，可以使用解构语法，不用考虑参数的顺序**

```js
// Bad
function createMenu(title, body, buttonText, cancellable) {
    // ...
}
// Good
function createMenu({ title, body, buttonText, cancellable }) {
    // ...
}

createMenu({
    title: 'Foo',
    body: 'Bar',
    buttonText: 'Baz',
    cancellable: true
})
```

## 删掉注释的代码

**git存在的意义就是保存你的旧代码，所以注释的代码赶紧删掉吧**

```js
// Bad
doStuff()
// doOtherStuff()
// doSomeMoreStuff()
// doSoMuchStuff()

// Good
doStuff()
```

## 尽量不用“非”条件句

```js
// Bad
function isDOMNodeNotPresent(node) {
    // ...
}

if (!isDOMNodeNotPresent(node)) {
    // ...
}
// Good
function isDOMNodeNotPresent(node) {
    // ...
}

if (isDOMNodeNotPresent(node)) {   // if后面记得加空格
    // ...
}
```

## 使用Array.includes来处理多个条件

```js
function test(fruit) {
    if (fruit == 'apple' || fruit == 'banana') {
        console.log(red)
    }
}
// 如果有更多的红色水果怎么办
function test(fruit) {
    const redFruits = ['apple', 'strawberry', 'cherry']
    if (redFruits.includes(fruit)) {
        console.log(red)
    }
}
```

## 多个类似函数

```js
 update (node, key, attrName) {
    let updateFn = this[attrName + 'Updater']
    updateFn(node, key, attrName)
 }

  textUpdater (node, value, key) {
    // ...
  }

  modelUpdater (node, value, key) {
    // ...
  }
```

## 使用 && 运算符化简表达式

让我们考虑一个具有布尔值和函数的情况。

```js
let isPrime = true;
const startWatching = () => {
    console.log('Started Watching!');
}
```

像下面这样，通过检查布尔值来确定是否调用函数，代码太多了。

```js
if (isPrime) {
    startWatching();
}
```

能否通过 AND（&&）运算符使用简写形式？是的，完全可以避免使用 if 语句。酷吧！

```js
isPrime && startWatching();
```

## 空值合并运算符 '??'

值既不是 `null` 也不是 `undefined` 的表达式称为“已定义的（defined）”。

`a ?? b` 的结果是：

- 如果 `a` 是已定义的，则结果为 `a`，
- 如果 `a` 不是已定义的，则结果为 `b`。
- 如果第一个参数不是 `null/undefined`，则 `??` 返回第一个参数。否则，返回第二个参数。

通常 `??` 的使用场景是，为可能是未定义的变量提供一个默认值。

```js
let user;

alert(user ?? "Anonymous"); // Anonymous
```

### 与 || 比较

它们之间重要的区别是：

- `||` 返回第一个 **真** 值。
- `??` 返回第一个 **已定义的** 值。

```js
let height = 0;

alert(height || 100); // 100
alert(height ?? 100); // 0
```

## 可选链操作符 '?.'

> **可选链**操作符( **`?.`** )允许读取位于连接对象链深处的属性的值，而不必明确验证链中的每个引用是否有效。`?.` 操作符的功能类似于 `.` 链式操作符，不同之处在于，在引用为空([nullish](https://wiki.developer.mozilla.org/en-US/docs/Glossary/nullish) ) ([`null`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/null) 或者 [`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)) 的情况下不会引起错误，该表达式短路返回值是 `undefined`。与函数调用一起使用时，如果给定的函数不存在，则返回 `undefined`。

```js
const adventurer = {
  name: 'Alice',
  cat: {
    name: 'Dinah'
  }
};

console.log(adventurer.cat?.name)
// Dinah

console.log(adventurer.dog?.name)
// undefined

console.log(adventurer.dog.name)
// Uncaught TypeError: Cannot read property 'name' of undefined
```

## 一些技巧

```js
const obj = {
    max(a,b) {
        return Math.max(a,b)
    }
}
// 优化为
const obj = {
    max: Math.max
}


var numbers = [1, 4, 9];
var roots = numbers.map(Math.sqrt);

[1,2,3,4].map(item => {
    return item * 2
})
// 当只有一个 return 时简化为
[1,2,3,4].map(item => item * 2)
```

## 多个变量赋值，交换变量

```js
// 多个变量赋值
let a, b, c
a = 5
b = 8
c = 12

// 利用数组解构
let [a, b, c] = [5, 8, 12]

// 交换变量
let x = 'hello', y = 55
const tmp = x
x = y
y = tmp

[x, y] = [y, x]
```

## 字符串重复

```js
let str = ''
for (let i = 0; i < 5; i++) {
  str += 'hello '
}

// good
'hello '.repeat(5)
```

## 双非位运算符

```js
// bad
const floor = Math.floor(6.8) // 6

// good
const floor = ~~6.8 // 6

// ~ 是位运算NOT，按位取反

var iNum1 = 25; // 00000000000000000000000000011001

var iNum2 = ~iNum1; // 11111111111111111111111111100110

console.log(iNum2);// 输出 "-26"
```

**总结一下取整方法**

* [parseInt](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/parseInt)
* Math.floor
* 右移运算符 >> (除2后取整)
* 双非位运算符 ~~

## 数组中的最大值最小值

```js
const arr = [2, 8, 15, 4]
Math.max(...arr)
Math.min(...arr)
```

## 巧用this实现链式调用

```js
// 实现验证功能的函数
var CheckObject = function(){};
CheckObject.prototype.checkName = function(){
    //验证姓名
    return this;
}
CheckObject.prototype.checEmail = function(){
    //验证邮箱
    return this;
}
CheckObject.prototype.checkPassword = function(){
    //验证密码
    return this;
}

var a = new CheckObject();
a.checkName().checkEmail().checkPassword();
```

## 新对象替换老对象

以新对象替换老对象。例如，利用[对象展开运算符](https://github.com/tc39/proposal-object-rest-spread)我们可以这样写：

```js
obj = { ...obj, newProp: 123 }
```

## 对象数组去重

```js
let arr = [
  {
    id: 1,
    name: '1'
  },
  {
    id: 2,
    name: '2'
  },
  {
    id: 3,
    name: '3'
  },
  {
    id: 1,
    name: '1'
  }
]
unique(arr) {
  const res = new Map();
  return arr.filter((arr) => !res.has(arr.id) && res.set(arr.id, 1));
},
```

## 巧用apply

**数组之间追加**

```js
var array1 = [12 , "foo" , {name "Joe"} , -2458];
var array2 = ["Doe" , 555 , 100];
Array.prototype.push.apply(array1, array2);

/* array1 值为 [12 , "foo" , {name "Joe"} , -2458 , "Doe" , 555 , 100] */
```

**获取数组中的最大值和最小值**

```js
var numbers = [5, 458 , 120 , -215 ];
var maxInNumbers = Math.max.apply(Math, numbers), //458
maxInNumbers = Math.max.call(Math,5, 458 , 120 , -215); //458
```

## 合并对象

```js
const o1 = { a: 1 };
const o2 = { b: 2 };
const o3 = { c: 3 };

const obj = Object.assign(o1, o2, o3);
console.log(obj); // { a: 1, b: 2, c: 3 }
console.log(o1);  // { a: 1, b: 2, c: 3 }, 注意目标对象自身也会改变。

// 合并具有相同属性的对象
const o1 = { a: 1, b: 1, c: 1 };
const o2 = { b: 2, c: 2 };
const o3 = { c: 3 };

const obj = Object.assign({}, o1, o2, o3);
console.log(obj); // { a: 1, b: 2, c: 3 }
```

## Array.filter(Boolean)

像 0, undefined, null, false, "", 这样的假值可以通过此方法轻易地过滤掉。

```js
[0, undefined, null, false, "", {}].filter(Boolean) // [{}]

// 等价于
[0, undefined, null, false, "", {}].filter(function (x) { return Boolean(x); });
```

Boolean 是一个函数，它会对遍历数组中的元素，并根据元素的真假类型，对应返回 true 或 false.

```js
Boolean(0)         // false
Boolean(undefined) // false
Boolean(null)      // false
Boolean(false)     // false
Boolean("")        // false
Boolean({})        // true
```

