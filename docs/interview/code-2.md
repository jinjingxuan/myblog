---
title: 手写代码（二）
date: 2020-03-20 09:52:01
categories: 面试
---
# 手写代码（二）
* new相关
* Promise相关
* 作用域相关
* this相关
* css相关
* 原型相关
* 正则相关
* 场景题

## new相关

```js
function Person(name) {
  this.name = name
  return name
}

let p = new Person('Tom')
// 返回什么 Person {name: "Tom"}


function Person(name) {
  this.name = name
  return {}
}

let p = new Person('Tom')
// 返回什么 {}
```

**构造函数不需要显式的返回值。使用new来创建对象(调用构造函数)时，如果return的是非对象(数字、字符串、布尔类型等)会忽而略返回值（忽略return）;如果return的是对象（如果是对象哪么就会丢失原有对象），则返回该对象。**

## Promise相关

```js
function a() {
    console.log('a')
    Promise.resolve().then(() => {
        console.log('e')
    })
}
function b() {
    console.log('b')
}
function c() {
    console.log('c')
}
function d() {
    setTimeout(a, 0)

    var temp = Promise.resolve().then(b) 
    setTimeout(c, 0)
    console.log('d')
}

d() // d b a e c
```

> 最常见的面试题

```js
async function async1(){
    console.log('async1 start')  //2
    await async2()               
    console.log('async1 end')    //6 放入了微队列  
}                                //    相当于async2.then(()=>{console.log('async1 end')})
async function async2(){
    console.log('async2')       //3
}
console.log('script start')     //1
setTimeout(function(){
    console.log('setTimeout')   //8
},0)
async1()
new Promise(function(resolve){
    console.log('promise1')     //4
    resolve()
}).then(function(){
    console.log('promise2')    //7   放入了微队列
})
console.log('script end')     //5

//await是一个让出线程的标志。await后面的表达式会先执行一遍，将await 后面的代码加入到microtask中，然后就会跳出整个async函数来执行后面的代码
script start
async1 start
async2
promise1
script end
async1 end
promise2
setTimeout
```

> 上题变形

```js
async function async1() {
    console.log('async1 start')
    await async2() 
    console.log('async1 end')
}
async function async2() {
    console.log('async2 start')
    return new Promise((resolve, reject) => {
        resolve()
        console.log('async2 promise')
    })
}
console.log('script start')
setTimeout(function() {
    console.log('setTimeout')
}, 0)
async1()
new Promise(function(resolve) {
    console.log('promise1')
    resolve()
}).then(function() {
    console.log('promise2')
}).then(function() {
    console.log('promise3')
})
console.log('script end')

/**
script start
async1 start
async2 start
async2 promise
promise1
script end
promise2
promise3
async1 end     注意这里 async 显示返回了 promise ，最后执行
setTimeout
*/
```

> 微任务里再加一个微任务

```js
console.log(1);
setTimeout(() => {
  console.log(2);
});
new Promise(resolve => {
  console.log(5);
  resolve();
  console.log(6);
}).then(() => {
  console.log(7);
});
Promise.resolve().then(() => {
  console.log(8);
  process.nextTick(() => {
    console.log(9);
  });
});
// 1 5 6 7 8 9 2
```

> 设计一个 defer 函数，实现defer(3000).then(res => { // 30ms 后执行 }) ; 
>
> 分析：延时函数

```js
function defer(time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(1)
        }, time)
    })
}

defer(3000).then(res => {
    console.log(res)
})
// 或者
function defer(time) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, time, 1)
    })
}

defer(3000).then(res => {
    console.log(res)
})
```

> 改写回调

```js
setTimeout(() => {
    console.log(1)
    setTimeout(() => {
        console.log(2)
        setTimeout(() => {
            console.log(3)
        }, 3000)
    }, 2000)
}, 1000)

// promise 改写
let fn = (value, time) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(value)
            resolve()
        }, time)
    })
}
fn(1, 1000).then(() => fn(2, 2000)).then(() => fn(3, 3000))

// async await 改写
async function todo() {
    await fn(1, 1000)
    await fn(2, 2000)
    await fn(3, 3000)
}
todo()
```

> 交替执行

```js
Promise.resolve().then(() => {
    console.log('a')
}).then(() => {
    console.log('b')
}).then(() => {
    console.log('c')
}).then(() => {
    console.log('d')
}).then(() => {
    console.log('e')
})

Promise.resolve().then(() => {
    console.log(1)
}).then(() => {
    console.log(2)
}).then(() => {
    console.log(3)
}).then(() => {
    console.log(4)
}).then(() => {
    console.log(5)
})

// a 1 b 2 c 3 d 4 e 5
```

```js
Promise.resolve().then(() => {
    console.log(0)
    return Promise.resolve(4)
  	/**
  		相当于这里多了两个微任务，然后交替执行
  		因为返回值可能是 Promise 的嵌套，当前 then 一定递归计算它的最终值，传给下一个 then 的回调
  	*/
}).then(res => {
    console.log(res)
})

Promise.resolve().then(() => {
    console.log(1)
}).then(() => {
    console.log(2)
}).then(() => {
    console.log(3)
}).then(() => {
    console.log(5)
}).then(() => {
    console.log(6)
})

// 0 1 2 3 4 5 6
```

```js
console.log(1); 
setTimeout(() => {
  console.log(2);
});
new Promise(resolve => {
  console.log(3);
  resolve('resolve');
  console.log(4);
  reject('error')
}).catch((err) => {
  console.log(err);
}).then((res) => {
  console.log(res)
});
Promise.resolve().then(() => {
  console.log(5);
});
console.log(6);

// 1 3 4 6 5 resolve 2
```

```js
setTimeout(() => {
    console.log("setTimeout");
});
console.log(1);
new Promise(function(resolve, reject) {
    console.log(2);
    for (var i = 0; i < 1000; i ++) {
        if (i === 10) {
            console.log(10);
        }
        if (i === 999) {
            resolve(999);
        }
    }
    console.log(3); // resolve后面的代码依旧会执行
}).then((val) => {
    console.log(val);
});
console.log(4);

// 1 2 10 3 4 999 setTimeout
```

## 作用域相关

```js
var length = 10;
function fn() {
    return this.length+1;
}
var obj = {
    length: 5,
    test1: function() {
        return fn();
    }
};
obj.test2 = fn;
console.log(obj.test1()) // 11
console.log(fn() === obj.test1()) // true



var a = function () { 
    this.b =3
}
var c = new a()
a.prototype.b = 9
var b = 7
a()
console.log(b) // 3
console.log(c.b) // 3



var obj1 = (function() {
  var inner = '1-1';
  return {
    inner: '1-2',
    say: function() {
      console.log(inner); 
      console.log(this.inner);
    }
  }
})();

var obj2 = { inner: '2-1' }
debugger
obj1.say(); // 1-1, 1-2
obj2.say = obj1.say;
obj2.say(); // 1-1, 2-1

var a = 3
(function (){
    console.log(a)
    var a = 4;
})()
// Uncaught TypeError: 3 is not a function

var a = 3;
(function (){
    console.log(a)
    var a = 4;
})()
// undefined


var name = '123';
var obj = {
   name: '456',
   getName: function () {
       function printName () {
           console.log(this.name);
       }
       printName();
   }
}
obj.getName(); // 123



var obj = {
    say: function () {
        var f1 = () => {
            console.log(this)
        }
        f1()
    },
    pro: {
        getPro: () => {
            console.log(this)
        }
    }
}
var o = obj.say
o() // window
obj.say() // obj
obj.pro.getPro() // window


function a(b, c) {
    var b;
    alert(b); // 1
}
a(1, 2);
```

```js
for (var i = 0; i < 5; i++) {
    setTimeout(function() {
        console.log(i)
    }, 1000 * i)
}
// 每隔一秒输出一次 5，时间中的i作为参数成功传了进去，定时器加入队列，最后执行的时候从作用域找i，为5

for (var i = 0; i < 5; i++) {
    (function(i) {
        setTimeout(function() {
            console.log(i)
        }, 1000 * i)
    })(i)
}
// 输出0，1，2，3，4，闭包，i的值会保存下来

for (var i = 0; i < 5; i++) {
    (function() {
        setTimeout(function() {
            console.log(i)
        }, 1000 * i)
    })(i)
}
// 每隔一秒输出一次 5，i的值没有传进去
```

## this相关

```js
function Person() {  
    this.age = 0;  
    setTimeout(() => {
        this.age++; // 指向 Person
    }, 3000);
}
var p = new Person();


function Person() {  
    this.age = 0
    setTimeout(function() {
        console.log(this) // 指向 window
    }, 3000)
}
var p = new Person();

// 顺便复习以下箭头函数语法
var func1 = x => x;
var func2 = x => {x};
var func3 = x => ({x});
console.log(func1(1)); // 1
console.log(func2(1)); // undefined
console.log(func3(1)); // {x: 1}


const fn = () => {
this.x = 'z';
};

const b = {x: 'y'};
fn.call(b);
console.log(b); // {x: 'y'};
```

## css相关

```html
<div class="lightblue">
   <div class="darkblue">
      <p>1. 颜色是？</p> <!-- 深蓝 ，p没设置，继承上面的-->
   </div>
</div>
<div class="darkblue">
   <div class="lightblue">
      <p>2. 颜色是？</p> <!-- 浅蓝 -->
   </div>
</div>
.lightblue { color: lightblue; }
.darkblue { color: darkblue; }

<!------------------------------------------->

<div class="lightblue"> 
   <div class="darkblue"> <!-- 深蓝 -->
      <p>1. 颜色是？</p>
   </div>
</div>
<div class="darkblue">
   <div class="lightblue"> <!-- 深蓝 -->
      <p>2. 颜色是？</p>
   </div>
</div>
.lightblue p { color: lightblue; } <!-- 优先级相同都是10 + 1，写在后面的覆盖写在前面的 -->
.darkblue p { color: darkblue; }
```

```html
<style>
    .green {
        background-color: green;
    }

    .red {
        background-color: red;
    }

    .blue {
        background-color: blue;
    }
</style>
<body>
    <div class="green blue red">
        fsdfasdfasd
    </div>
</body>

<!-- 蓝色 -->
```

## 原型相关

```js
function Animal() {}
var cat = new Animal();
Animal.prototype = {bark: true}; // 破坏了原型链
var dog = new Animal();
console.log(cat.bark); // undefined
console.log(dog.bark); // true


function Animal() {}
var cat = new Animal();
Animal.prototype.bark = true;
var dog = new Animal();
console.log(cat.bark); // true
console.log(dog.bark); // true

function Person(name) {
	this.name = name;
}
Person.prototype.print = function() {
	return this.name;
};

const a = new Person('abc').print.call({});
console.log(a); // undefined
```

```js
// 怎么实现一个多重继承。。可以在一个object对象即可以输出M1的hello也可以输出M2.world
function M1() {
this.hello = 'hello';
}

function M2() {
this.world = 'world';
}

// 首先让 M2 继承 M1
M2.prototype = new M1()

let obj = {}
obj.__proto__ = new M2()

console.log(obj.hello, obj.world) // hello world
```

```js
Function.prototype.a = () => console.log(1); 
Object.prototype.b = () => console.log(2); 
function A() {} const a = new A(); 
a.a(); // a.a is not a function
a.b(); // 2

a.__proto__.__proto__ === A.prototype.__proto__ === Object.prototype
A.__proto__.__proto__ === Function.prototype.__proto__ === Object.prototype
```

```js
// 写下p、Parent、Function、Object的原型链
function Parent() {}
var p = new Parent()

console.log(p.__proto__ === Parent.prototype) // true
console.log(Parent.__proto__ === Function.prototype) // true
console.log(Parent.prototype.__proto__ === Object.prototype) // true
console.log(Function.prototype.__proto__ === Object.prototype) // true
console.log(Object.__proto__ === Function.prototype) // true
```

## 正则相关

* 正则中需要转义的字符：`* . ? + $ ^ [ ] ( ) { } | \ /`

```js
var a = 'hi, my name is {name}, I am {age} years old, my email is {email}.';
var b = {name:'max', age: 12, email: 'max@gmail.com'};


function replace(tpl, data){
    return tpl.replace(/\{(\w+)\}/g, (matchStr, group) => data[group])
}
```

```js
// 下划线转换驼峰
const toHump = str => {
    return str.replace(/\_(\w)/g, (matchStr, group) => group.toUpperCase())
}

// 驼峰转换下划线
const toLine = str => {
    return str.replace(/([A-Z])/g, (matchStr, group) => `_${group.toLowerCase()}`)
}
```

## 场景题

> 爬虫在爬取页面前，需要对url列表进行标准化，实现一个处理url列表的函数-对缺少http前缀的url添加前缀，返回的url不能重复
>
> `["nodejs.org", "http://nodejs.org", "http://bytedance.com"] => ["http://nodejs.org", "http://bytedance.com"]`

```js
function formaturl(urllist){
    const res = []
    for (let i in urllist) {
        const reg = /^http:\/\//
        const url = urllist[i]
        const newUrl = reg.test(url) ? url : `http://${url}`
        if (!res.includes(newUrl)) {
            res.push(newUrl)
        }
    }
    return res
}
```

### 解析url中

参数为对象，考虑 key 重复，没有 val 和 转码

```js
// https://weibo.com/u/1627615060/home?wvr=5&from_outside&key=12&key=4&l=%E4%BB%8A%E6%97%A5%E7%89%B9%E5%8D%96

const getQuery = url => {
    let query = {}
    if (url.includes("?")) {
        const str = url.split("?")[1]
        const params = str.split("&")
        for(let i = 0; i < params.length; i++) {
            let key = null, val = null
            if (params[i].includes("=")) {
                key = params[i].split("=")[0]
                val = decodeURIComponent(params[i].split("=")[1])
            } else {
                key = params[i]
                val = null
            }
            if (query[key]) {
                Array.isArray(query[key]) ?
                    query[key].push(val) : query[key] = [query[key], val]
            } else {
                query[key] = val
            }
        }
    }
    return query
}
```

> 实现如下效果`u.console("hello").settimeout(3000).console("world").settimeout(3000).console("hah").settimeout(0).console("111")`，首先输出hello，3s后输出world,再间隔3s,再输出

```js
// 考点 this 是立即返回的，setTimeout 加入任务队列，时间需要累加计算
class U {
    constructor() {
        this.time = null
        this.totalTime = 0
    }

    console(val) {
        if (this.time === null) {
            console.log(val)
        } else {
            this.totalTime += this.time
            setTimeout(() => {
                console.log(val)
            }, this.totalTime)
        }
        return this
    }

    settimeout(time) {
        this.time = time
        return this
    }
}

let u = new U()
u.console("hello").settimeout(3000).console("world").settimeout(3000).console("hah").settimeout(0).console("111")
```

### repeat函数

> 使下面调用代码能正常工作
> `const repeatFunc = repeat(console.log, 4, 3000)`;
> `repeatFunc("helloworld")` //会输出4次 helloworld, 每次间隔3秒

```js
// 需要实现的函数
function repeat (func, times, wait) {
    return function() {
        for (let i = 1; i <= times; i++) {
            setTimeout(() => {
                func(...arguments)
            }, wait * i)
        }
    }
}
```

### 找k好成绩

>  从一个包含学生成绩数组的中找到成绩第k好的所有学生的id,
>  学生信息如下：[{score:89,id:1}, {score:23,id:4}]。

```js
const findK = (arr, k) => {
    const store = Array.from(new Array(101), () => new Array())
    for (let i = 0; i < arr.length; i++) {
        store[arr[i].score].push(arr[i].id)
    }
    let count = 0
    for (let i = 100; i >= 0; i--) {
        if (!store[i].length) continue
        count++
        if (k === count) return store[i]
    }
}

// 注：创建二维数组时，千万不要 new Array(101).fill([]), [] 指向的都是同一个
```

### 进制转换

```js
function mulBase(num, base){
    let str = ""
    while (num !== 0) {
        str += num % base
        num = Math.floor(num / base)
    }
    return str.split('').reverse().join('')
}
console.log(mulBase(64,8));
```

### 随机生成16进制

```js
function geneHex() {
  return "#" + Math.floor((Math.random() * 0xFFFFFF)).toString(16)
}
```

### 16进制颜色转 rgb

```js
function hex2rgb(hex) {
    const str = hex.slice(1),
        res = []
    if (str.length === 3) {
        for (const w of str) {
            res.push(parseInt(w + w, 16))
        }
    } else {
        for (let i = 0; i < 6; i += 2) {
            res.push(parseInt(str[i] + str[i + 1], 16))
        }
    }
    return res
}
```

### 有序数组找数求和

> 输入：[1,2,3,4,5]， 6 

* 双指针

```js
function foo(arr, target) {
    let left = 0, right = arr.length - 1
    while (left < right) {
        if (arr[left] + arr[right] > target) {
            right --
        } else if (arr[left] + arr[right] === target) {
            return [left, right]
        } else {
            left ++
        }
    }
}
```

### 判断2的整数次幂

```js
// 2: 10, 4: 100, 8: 1000, 16: 10000
// 可以发现2的整数次幂都是1后面跟着许多0，如果减1分别对应
// 1: 01, 3: 011, 7: 0111, 15: 01111
// 如果作与运算，2 & 1 == 0，4 & 3 == 0
function judge(num) {
  return (num&(num - 1)) == 0
}
```

### 对象转为数组键值对

```js
{
  name: 'A',
	age: 10
}
// 转换为
[
  {
        key: 'name',
        value: 'A'
	},
	{
        key: 'age',
        value: 10
  }
]
```

### 开根号

要求位数 0.0001，考虑 0 - 1 开根号越来越大

```js

```

### 并发请求控制

```js
function multiRequest(urls = [], maxNum) {
    const len = urls.length
    const result = new Array(len).fill(false)
    let count = 0

    return new Promise((resolve, reject) => {
        while (count < maxNum) {
            next()
        }
        function next() {
            let current = count++
            if (current >= len) {
                !result.includes(false) && resolve(result)
                return
            }
            const url = urls[current]
            fetch(url)
                .then((res) => {
                    result[current] = res
                    if (current < len) {
                        next()
                    }
                })
            .catch((err) => {
                result[current] = err
                if (current < len) {
                    next()
                }
            })
        }
    })
}
```

### 尝试重新请求

```js
function requestRetry (url, retryNum) {
    return request(url).catch(e => {
        if (retryNum) {
            return requestRetry(url, --retryNum)
        } else {
            return Promise.reject(e)
        }
    })
}
```

**失败测试**

```js
function tryRequest(request, times = 3) {
    return request().catch(e => {
        if (times) {
            console.log('正在重试')
            return tryRequest(request, --times)
        } else {
            return Promise.reject(e)
        }
    })
}

function request() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('error')
        }, 1000)
    })
}

tryRequest(request, 3).then(console.log).catch(console.log)

// 正在重试
// 正在重试
// 正在重试
// error
```

**成功测试**

```js
function tryRequest(request, times = 3) {
    return request().catch(e => {
        if (times) {
            console.log('正在重试')
            return tryRequest(request, --times)
        } else {
            return Promise.reject(e)
        }
    })
}

function request() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('success')
        }, 1000)
    })
}

tryRequest(request, 3).then(console.log).catch(console.log) // success
```

### loading动画

> vue项目中：loading控制页面加载动画，sort是一个消耗时间的排序操作，问loading动画会显示吗？

```js
this.loading = true
this.data.sort()
this.loading = false

// 答：不会，vue更新视图是异步的，虽然sort消耗时间，还是会把loading数据的改变缓冲为一次

this.loading = true // 宏
this.$nextTick(() => { // 微
  this.data.sort()
  this.loading = false
})

// 还是不会，$nextTick优先使用微任务，宏 => 微 => ui渲染

this.loading = true
setTimeout(() => {
  this.data.sort()
  this.loading = false
}, 5000)
// 会
```

### 实现一个cash类

```js
//实现一个 Cash 类，期望执行下面代码：
const cash1 = new Cash(105);
const cash2 = new Cash(66);
const cash3 = cash1.add(cash2);
const cash4 = Cash.add(cash1, cash2);
const cash5 = new Cash(cash1 + cash2); // 考虑 valueOf
console.log(`${cash3}`, `${cash4}`, `${cash5}`); // 考虑 toString
// 1元7角1分 1元7角1分 1元7角1分
```

```js
// 写之前先复习一下 valueOf 和 toString
const a = {
    val: 1,
    valueOf() {
        console.log('valueOf')
        return this.val
    },
    toString() {
        console.log('toString')
        return this.val
    }
}
console.log(a) // {val: 1, valueOf: ƒ, toString: ƒ}
console.log(a + "") // valueOf 1
console.log(a + 1) // valueOf 2
console.log(a + {}) // valueOf 1[object Object]
console.log(`${a}`) // toString 1
```

```js
class Cash {
    constructor(num) {
        this.num = num
    }
    add(c1) {
        return new Cash(this + c1)
    }
    static add(c1, c2) {
        return new Cash(c1 + c2)
    }
    // valueOf 用于处理 new Cash(cash1 + cash2)
    valueOf() {
        return this.num
    }
    // toString 用于处理 cash3 => `${cash3}`
    toString() {
        this.sum=`${this.num}`
        return `${this.sum[0]}元${this.sum[1]}角${this.sum[2]}元`
    }
}
```

[class中static方法中的this指向哪里](https://segmentfault.com/q/1010000020401270)

### 字符串替换

```js
"ababab".match(/a.*b/) // "ababab"，.是任意字符，贪婪匹配，尽可能多的匹配
"ababab".match(/a.*?b/) // "ab"，非贪婪，尽可能少的匹配
```

```js
const template = "{{name }}很厉name害，才{{age }}岁"
const context = { name: "jawil", age: "15" }

// vue 插值表达式
function fn(template, context) {
    return template.replace(/\{\{(.*?)\}\}/g, (matchStr, group) => {
        return context[group.trim()]
    })
}

// es6模板字符串
function replaceStr(str, obj) {
    return str.replace(/\$\{(.*?)\}/g, (matchStr, group) => {
        return obj[group]
    })
}
```

## 判断对象有没有空值

> 判断一个对象没有空属性（undefined、 null） 

```js
// 测试用例
const obj1 = {
  prop1:{
    subProp1: 0,
    subPorp2: undefined,
    subProp3: {
      pp1: 123,
      pp2: ""
    },
	},
	prop2:"test"
}

// 递归
function hasEmptyProp(obj){
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (obj[key] === null || obj[key] === undefined) {
                return true
            } else if (typeof obj[key] === 'object') {
                if (hasEmptyProp(obj[key])) {
                    return true
                }
            }
        }
    }
    return false
}

// 这种为什么不对？return 是箭头函数内部的 return，所以整体函数会一直返回 false
function hasEmptyProp(obj){
    Object.keys(obj).forEach(key => {
      	if (obj[key] === null || obj[key] === undefined) {
          return true
        } else if (typeof obj[key] === 'object') {
          if (hasEmptyProp(obj[key])) {
            return true
          }
        }
    })
    return false
}

// 非递归，对象可以理解为树，用广度优先的思想
function hasEmptyProp(obj){
    const queue = [obj]
    while (queue.length) {
        let prop = queue.shift()
        if (prop === null || prop === undefined) {
            return true
        } else if (typeof prop === 'object') {
            for (let key in prop) {
                queue.push(prop[key])
            }
        }
    }
    return false
}
```
