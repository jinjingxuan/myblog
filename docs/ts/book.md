# 《深入理解 TypeScript》

## 第一章 为什么要使用 TypeScript

* 为 JavaScript 提供可选的类型系统
* 兼容当前及未来的 JavaScript 的特性，是 JavaScript 的超集

## 第二章 JavaScript 常见语法

TypeScript 将试图保护你免受无意义的 JavaScript 代码的影响，关于 JavaScript 的知识仍然需要学习。

```js
[] + []; // JavaScript 返回 ''，TypeScript 会报错
{} + []; // JavaScript 返回 0，TypeScript 会报错
[] + {}; // JavaScript 返回 [object Object]，TypeScript 会报错
'hello' - 1; // JavaScript 返回 NaN，TypeScript 会报错
```

### 相等

在 JavaScript 中：

```js
5 == '5' // true
5 === '5' // false
"" == "0" // false
"" == 0 // true
```

而在 TypeScript 中在编写代码时就会报错，避免了隐式类型转换：

```ts
5 == '5' // false
5 === '5' // false
"" == "0" // false
"" == 0 // false
```

![err](./imgs/equal.png)

### null 和 undefined

* undefined：变量没有初始化
* null：变量不可用

无论在 JavaScript 还是在 TypeScript 中：

```js
null == undefined // true
0 == undefined // false
"" == undefined // false 
false == undefined // false
```

推荐使用 == null 来检查 undefined 和 null，因为你通常不希望区分它们。

```js
function foo (arg: string | null | undefined) {
  if (arg != null) {
    // arg 是字符串的情况，因为 != 排除了 null 和 undefined
  }
}
```

限制显示地使用 undefined

```ts
function foo() {
  // if ...
  return { a: 1, b: 2 }
  // else ...
  return { a: 1, b: undefined }
}

// 应该使用一个返回值的类型注解
function foo(): {a: number, b?: number} {
  // if ...
  return { a: 1, b: 2 }
  // else ...
  return { a: 1}
}
```

Json 和序列化

```js
// JSON 标准支持编码 null，但是不支持 undefined
JSON.stringify({a: null, b: undefined}) // {a: null}
```

### 数字

内置数字类型表示的整数限制是

```js
console.log({max: Number.MAX_SAFE_INTEGER, min: Number.MIN_SAFE_INTEGER})
// {max: 9007199254740991, min: -9007199254740991}

// 不安全的值会存在误差
console.log(Number.MAX_SAFE_INTEGER + 1 === Number.MAX_SAFE_INTEGER + 2) // true
```

为了检查是否安全可以使用`Number.isSafeInteger`

```js
Number.isSafeInteger(Number.MAX_SAFE_INTEGER) // true
Number.isSafeInteger(Number.MAX_SAFE_INTEGER + 1) // false
```

**无穷**

数字的边界值可以用 `Number.MAX_VALUE` 和 `-Number.MAX_VALUE` 的值来表示

```js
console.log(Number.MAX_VALUE) // 1.7976931348623157e+308
console.log(-Number.MAX_VALUE) // -1.7976931348623157e+308
```

超出边界但是精读没有改变的值都被限制在此范围内，但是超出边界且精度已经改变的值，用 Infinity 表示

```js
console.log(Number.MAX_VALUE + 10**1000); // Infinity
```

最小非 0 值可以用 `Number.MIN_VALUE` 来表示

```js
console.log(Number.MIN_VALUE); // 5e-324

// 小于 MIN_VALUE 的值会被转换为 0
console.log(Number.MIN_VALUE / 10); // 0
```

> 就像大于 Number.MAX_VALUE 的值会被限制为 Infinity，小于 Number.MIN_VALUE 的值会被限制为 0

## 第三章 JavaScript新语法特性

### 3.1 类

**1. 继承**：支持使用 extends 关键字实现单继承

**2. 静态**：静态属性会被所有的实例共享

```js
class Something {
  static instances = 0;
	constructor() {
		Something.instances++;
  }
}

var s1 = new Something();
var s2 = new Something();
console.log(Something.instances); // 2
```

**3. 访问修饰符**：public、private、protected

| 可访问 | public | protected | private |
| ------ | ------ | --------- | ------- |
| 类     | 是     | 是        | 是      |
| 子类   | 是     | 是        | 否      |
| 实例   | 是     | 否        | 否      |

在运行时（在编译后的 JavaScipt 代码中），这些没有任何意义，但是如果你没有正确地使用它们的话，在编译时会抛出错误。

**4. 抽象**：拥有一个 abstract 修饰符意味着该函数不能直接被调用，并且子类必须实现这个功能

* abstract 类不能直接被实例化，用户必须创建一个类来继承 abstract 类
* abstract 成员不能直接被访问，子类必须实现这个功能

**5. 构造器**：构造器是可选的，类不是必须要有一个构造器，示例如下：

```js
class Foo {}
var foo = new Foo();
```

可以使用构造器来定义成员变量

```js
class Foo {
  x: number;
	constructor(x: number) {
    this.x = x;
  }
}

// TS 为这种方式提供了一个缩写
class Foo {
  constructor(public x: number)
}
```

### 3.2 箭头函数

this 一直是 JavaScript 的一个痛点，箭头函数通过使用捕获上下文的 this 的意义的方式，修复了此问题。

```js
function Person(age) {
  this.age = age;
  this.growOld = function() {
    this.age++;
  }
}

var person = new Person(1);
setTimeout(person.growOld, 1000);
setTimeout(function() {
  console.log(person.age); // 1
}, 2000)
```

如果在浏览器中运行，函数中的 this 将会指向 window，利用箭头函数改写

```js
function Person(age) {
  this.age = age;
  this.growOld = () => {
    this.age++;
  }
}

var person = new Person(1);
setTimeout(person.growOld, 1000);
setTimeout(function() {
  console.log(person.age); // 1
}, 2000)
```

