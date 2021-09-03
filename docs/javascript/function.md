---
title: 函数式编程
date: 2020-08-18 09:21:01
categories: 函数式编程
---
# 函数式编程
- 什么是高阶函数
- lodash
- 纯函数与记忆函数
- 函数柯里化
- 函数组合与Point Free
- Functor（函子）
- 几道习题

## 什么是高阶函数

- 函数可以参数
- 函数可以作为返回值
- 作用：抽象通用的问题，例如过滤数组，可以通过函数参数任意设定过滤规则

```js
// 函数作为参数
function forEach (array, fn) {
    for(let i = 0; i < array.length; i++){
        fn(array[i])
    }
}
forEach(arr, function (item) {
    console.log(item)
})

function filter (array, fn) {
    let res = []
    for (let i = 0; i< array.length; i++) {
        if(fn(array[i])) {
            res.push(array[i])
        }
    }
    return res
}
filter(arr, function (item) {
    return item % 2 === 0
})

// 函数作为返回值
function once (fn) {
    let done = false
    return function () {
        if (!done) {
            done = true
            // return fn.apply(this, arguments)
            // return fn.apply(fn, arguments)
            return fn(...arguments)
        }
    }
}
let pay = once(function (money) {
    console.log(`支付：${money} RMB`)
})
pay(5)
pay(5)
pay(5)
pay(5) //只执行一次
```

- 模拟常用高阶函数：map，every，some

```js
const map = (array, fn) => {
    let res = []
    for (let i = 0; i < arr.length; i++) {
        res.push(fn(arr[i], i, arr))
    }
    return res
}

// 判断数组中每一个元素是否匹配
const every = (array, fn) => {
    let res = true
    for (let value of array) {
        res = fn(value)
        if(!res) break
    }
    return res
}
every(arr, v => v > 10)

// 判断数组中的元素是否由一个匹配
const some = (array, fn) => {
    let res = false
    for (let value of array) {
        res = fn(value)
        if(res) break
    }
    return res
}
```

- 如何实现求任意次方的函数

```js
// 浏览器设置断点调试闭包
function makePower (power) {
    return function (number) {
        return Math.pow(number, power)
    }
}
//求平方
let power2 = makePower(2)
let power3 = makePower(3)

console.log(power2(4))
```

## lodash:一个一致性、模块化、高性能的 JavaScript 实用工具库

```js
const _ = require('lodash')

const array = [1,2,3,4]

console.log(_.first(array))
console.log(_.last(array))
console.log(_.toUpper(_.first(array)))
```

## 纯函数的三个条件：

* 给定输入，无论什么时候调用，无论调用多少次，输出总是确定的
* 在函数内部不可以改变函数外部对象的状态
* 不可以在函数内部共享函数外部的变量

```js
const arr = [1,2,3,4,5,6]
console.log(arr.slice(0,2))  //[1,2]
console.log(arr.slice(0,2))  //[1,2]

//splice() 方法向/从数组中添加/删除项目，然后返回被删除的项目。
console.log(arr.splice(0,2)) //[1,2]
console.log(arr.splice(0,2)) //[3,4]

//根据第一条，slice是纯函数，splice不是
```

```js
//函数传进来的参数如果是对象的引用，会在内部改变该对象，则不是纯函数
```

```js
//函数取到了函数外的变量，不是纯函数
var num = 20 ;
function add(x){
    return x > num;
}
add(18);
```
纯函数优点：可记忆，可测试

**使用js记忆函数来计算菲波那切数列、阶乘等，可以极大减少我们必须要做的工作，加速程序计算。** 

```js
const _ = require('lodash')

function getArea (r) {
    console.log(r)
    return Math.PI * r *r
}

let getAreaWithMemory = _.memoize(getArea)
console.log(getAreaWithMemory(4))
console.log(getAreaWithMemory(4))
console.log(getAreaWithMemory(4))

// 4
// 50..
// 50..
// 50..

// 模拟实现
function memoize (fn) {
    let cache = {}
    return function () {
        let key = JSON.stringify(arguments)
        cache[key] = cache[key] || fn(...arguments) // 不必重新执行
        return cache[key]
    }
}
let getAreaWithMemory = memoize(getArea)
console.log(getAreaWithMemory(4))
console.log(getAreaWithMemory(4))
console.log(getAreaWithMemory(4))
```

## 函数柯里化

* 对函数参数的缓存
* 让函数变得更灵活，让函数的粒度更小
* 把多元函数转换成一元函数，可以组合使用函数产生强大的功能

```js
const curry = (fn, ...args) => 
	args.length < fn.length
       ? (...arguments) => curry(fn, ...args, ...arguments)
	   : fn(...args)

function plus(a, b, c) {
  return a + b + c
}

let curryPlus = curry(plus)  //这里给到一个有三个参数的函数
console.log(curryPlus(1)(2)(3)) //返回 6
console.log(curryPlus(1)(2,3)) //返回 6
console.log(curryPlus(1,2)(3)) //返回 6
console.log(curryPlus(1,2,3)) //返回 6

let curryPlus = curry(plus,1,2,3) 
console.log(curryPlus) // 6
```

柯里化案例：正则表达式匹配字符串

```js
function match (reg, str) {
    return str.match(reg)
}

let matchPlus = curry(match)

// 判断空白字符
const haveSpace = match(/\s+/g)
console.log(haveSpace('hello world'))
```

柯里化在Vue源码中的应用

```js
// src/platform/web/patch.js

function createPatch (obj) {
    // 一些操作
    return function patch (vdom1, vdom2) {
        ..
    }
}

const patch = createPatch(...)
                          
// 这样就不必每次都patch参数里传obj了
```

## 函数组合

洋葱代码：`tOUpper(first(reverse(arr))`

可以用函数组合把细粒度的函数组合成一个新的函数

```js
function compose (f, g) {
    return function (value) {
        return f(g(value))
    }
}

// 函数组合求数组中最后一个元素：先反转再获取第一个
function reverse (arr) {
    return arr.reverse()
}
function first (arr) {
    return arr[0]
}

const last = compose(first, reverse)
console.log(last[1,2,3,4])

// 在lodash中调用 _.flowRight(fn1, fn2, fn3)
```

**模拟实现**

```js
function reverse (arr) {
  return arr.reverse()
}
function first (arr) {
  return arr[0]
}
function toUpper(str) {
  return str.toUpperCase()
}

const f = compose(toUpper, first, reverse)
  console.log(f(['one', 'two', 'three'])) // three


function compose(...args) {
    return function(value) {
        return args.reverse().reduce((acc, cur) => cur(acc), value)
    }
}
```

## Point Free模式：函数组合去实现

* 不需要指明处理的数据
* 只需要合成运算过程
* 需要定义一些辅助的基本运算函数

```js
// Hello World => hello_world
function f (word) {
    return word.toLowCase().replace(/\s+/g,'_')
}

// Point Free 模式
const f = compose(replace(/\s+/g, '_'), toLower)
```

## Functor（函子）

* 函子：可以认为函子是这样一个函数，它从一个容器中取出值， 并将其加工，然后放到一个新的容器中。这个函数的第一个输入的参数是类型的态射，第二个输入的参数是容器。 

最简单的函子`map`

```js
[1, 4, 9].map(Math.sqrt); // Returns: [1, 2, 3]
```

如何实现？

```js
class Container {
    constructor (value) {
        this._value = value
    }
    
    map (fn) {
        return new Container(fn(this._value))
    }
}

let res = new Container(5)
            .map(x => x + 1)
            .map(x => x * x)
console.log(res) // Container { _value: 36 }
```

为了简化可以增加静态方法（静态方法：既可以通过类调用，也可以通过实例对象调用）

```js
class Container {
  static of(value) {
    return new Container(value)
  }
  constructor(value) {
    this._value = value
  }
  map(fn) {
    return Container.of(fn(this._value))
  }
  // 取值
  value(f) {
     return f(this._value)
  }  
}
```

为了处理参数为null和undefined的情况

```js
class Maybe {
  static of(x) {
    return new Maybe(x)
  }
  isNothing() {
    return this._value === null || this._value ===undefined
  }
  constructor(x) {
    this._value = x
  }
  map(fn) {
    return this.isNothing() ? this : Maybe.of(fn(this._value))
  }
}
```

应用

```js
// 把美元转换成人民币
const toRMB = s => Functor.of(s)
	.map(v => v.replace('$', ''))
	.map(parseFloat)
	.map(v => v * 7)
	.map(v => v.toFixed(2))
	.value(v => '￥' + v)
// ...
```

## 几道习题

```js
const fp = require('lodash/fp')
const cars = [
  { name: 'Ferrari FF', horsepower: 660, dollar_value: 700000, in_stock: true },
  { name: 'Spyker C12 Zagato', horsepower: 650, dollar_value: 648000, in_stock: false },
  { name: 'Jaguar XKR-S', horsepower: 550, dollar_value: 132000, in_stock: false },
  { name: 'Audi R8', horsepower: 525, dollar_value: 114200, in_stock:false },
  { name: 'Aston Martin One-77', horsepower: 750, dollar_value: 1850000, in_stock: true },
  { name: 'Pagani Huaya', horsepower: 700, dollar_value: 1300000, in_stock: false }
]

// 练习1，使用函数组合fp.flowRight()重新实现下面这个函数
// let isLastInStock = function (cars) {
//   // 获取最后一条数据
//   let last_car = fp.last(cars)
//   // 获取 in_stock 属性值
//   return fp.prop('in_stock', last_car)
// }

let isLastInStock = fp.flowRight(fp.prop('in_stock'), fp.last)

// 练习2：使用fp.flowRight(),fp.prop(),fp.first()获取第一个car的name

let isFirstName = fp.flowRight(fp.prop('name'), fp.first)
console.log(isFirstName(cars))

// 练习3：使用帮助函数_average重构averageDollarValue，使用函数组合的方式实现

let _average = function (xs) {
  return fp.reduce(fp.add, 0, xs) / xs.length
}

// 原代码
// let averageDollarValue = function (cars) {
//   // dollar_values 为保存价格的数组
//   let dollar_values = fp.map(function (car) {
//     return car.dollar_value
//   }, cars)
//   return _average(dollar_values)
// }

// 改进
let averageDollarValue = fp.flowRight(_average, fp.map())
averageDollarValue(car => car.dollar_value, cars)

// 练习4：使用flowRight写一个sanitizeNames()函数，返回一个
// 下划线连接的小写字符串，把数组中的name转换成这种形式，
// sanitizeNames(["Hello World"]) => ["hello_world"]

let _underscore = fp.replace(/\W+/g,'_')
let sanitizeNames = fp.flowRight(_underscore, fp.toLower)
```

```js
const fp = require('lodash/fp')
class Container {
  static of(value) {
    return new Container(value)
  }
  constructor(value) {
    this._value = value
  }
  map(fn) {
    return Container.of(fn(this._value))
  }
}
class Maybe {
  static of(x) {
    return new Maybe(x)
  }
  isNothing() {
    return this._value === null || this._value ===undefined
  }
  constructor(x) {
    this._value = x
  }
  map(fn) {
    return this.isNothing() ? this : Maybe.of(fn(this._value))
  }
}

// 练习1：使用fp.add(x,y)和fp.map(f,x)创建一个能让functor里的值增加的函数ex1
let maybe = Maybe.of([5, 6, 1])
let ex1 = arr => fp.map(item => fp.add(item, 1), arr)
console.log(maybe.map(ex1))  // Maybe { _value: [ 6, 7, 2 ] }

// 练习2：实现一个函数ex2，能够使用fp.first获取列表的第一个元素
let xs = Container.of(['do', 'ray', 'me', 'fa', 'so', 'la', 'ti', 'do'])
let ex2 = arr => fp.first(arr)
console.log(xs.map(ex2))

// 练习3：实现一个函数ex3，使用safeProp和fp.first找到user的名字的首字母
let safeProp = fp.curry(function (x, o){
  return Maybe.of(o[x])
})
let user = { 'id': 2, 'name': 'Albert' }
let ex3 = obj => safeProp('name')(obj).map(fp.first)
console.log(ex3(user))

// 练习4：使用maybe重写ex4，不要有if语句
// let ex4 = function (n) {
//   if (n) {
//     return parseInt(n)
//   }
// }

let ex4 = n => Maybe.of(n).map(n => parseInt(n))
```

