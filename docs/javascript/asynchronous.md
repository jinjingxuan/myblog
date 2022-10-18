---
title: Promise
date: 2020-03-08 09:52:01
categories: JavaScript
---
# Promise
* promise
* Generator
* async和await
* 宏任务，微任务，事件循环
* 面试题精选
* 浏览器与node的事件循环

## promise

首先想一下，怎么规定函数的执行顺序，通过回调的方式：

```js
function A(callback){
    console.log("I am A");
    callback();  //调用该函数
}

function B(){
   console.log("I am B");
}

A(B);//先执行A后执行B，当需要执行ABCDEFG时，就会造成回调地狱
```

回调地狱“也叫”回调金字塔“，我们平时写代码的时候 js如果异步 回调是不可避免的  例如 ajax不断的进行异步请求数据 回调方法里还要对数据进行处理，继续回调…形成回调地狱  这会使得我们的代码可读性变差，出现问题 不好调试 也会导致性能下降 

**Promise：同步代码解决异步编程**

- 是一个构造函数，用来传递异步操作消息，链式调用，避免层层嵌套的回调函数。
- promise接收两个函数参数，resolve和reject，分别表示异步操作执行成功后的回调和失败的回调
- promise在声明的时候就已经执行了
- 有三种状态：pending进行中、resolve已完成、rejected已失败,
- 这些状态只能由pending -> resolved, pending -> rejected,一旦promise实例发生改变，就不能在变了，任何时候都能得到这个结果
- promise对象的then方法会返回一个全新的promise对象
- 前面then方法中的回调函数的返回值会作为后面then方法回调的参数
- 如果回调中返回的是Promise，那后面的then方法的回调会等待它的结果
- promise.reslove()可以快速创建一个Promise对象

```js
console.log(1)
setTimeout(() => console.log(5))
new Promise(function(resolve,reject){
    console.log(2) //立刻执行
    resolve()      //Promise.then是微任务
}).then(function(){
    console.log(3)
})
console.log(4)  //输出1,2,4,3,5

//resolve可以接收参数
new Promise(function(resolve,reject){
    resolve("2")
}).then(function(data){
    console.log(data)
})
```

```js
// 拿点外卖为例，点外卖后可能会成功派送也可能会延迟，无论如何都会有个结果
funtion dianwaimai(){
    return new Promise((reslove,reject) => {
        let result = cooking()
        if (result==="做好了") reslove("正在派送")
        else reject("还没做好")
    })
}
function cooking(){
    return Math.random() > 0.5 ? '菜烧好了' : '菜烧糊了'
}

//执行
dianwaimai().then(res => console.log(res)).catch(res => console.log(res))
```

### Promise静态方法

* Promise.reslove(value)：相当于`new Promise(resolve => resolve(value))`,对参数都做了四种判断
* Promise.reject

**这两种方法均会创建Promise对象**

```js
Promise.resolve('foo')
	.then( value => console.log(value) )
// foo

Promise.reject(new Error('rejected'))
	.catch(err => console.log(err))
// Error: rejected
//    at <anonymous>:1:16
```

Promise.resolve方法的参数分成四种情况。

**1）参数是一个 Promise 实例**

如果参数是 Promise 实例，那么Promise.resolve将不做任何修改、原封不动地返回这个实例。

**2）参数是一个thenable对象**

thenable对象指的是具有then方法的对象，比如下面这个对象。

```js
let thenable = {
  then: function(resolve, reject) {
    resolve(42);
  }
};
```

Promise.resolve方法会将这个对象转为 Promise 对象，然后就立即执行thenable对象的then方法。

```js
let thenable = {
  then: function(resolve, reject) {
    resolve(42);
  }
};

let p1 = Promise.resolve(thenable);
p1.then(function(value) {
  console.log(value);  // 42
});
```

上面代码中，thenable对象的then方法执行后，对象p1的状态就变为resolved，从而立即执行最后那个then方法指定的回调函数，输出 42。

**3）参数不是具有then方法的对象，或根本就不是对象。**

如果参数是一个原始值，或者是一个不具有then方法的对象，则Promise.resolve方法返回一个**新的 Promise 对象**，状态为resolved。

```js
const p = Promise.resolve('Hello');

p.then(function (s){
  console.log(s)
});
// Hello
```

上面代码生成一个新的 Promise 对象的实例p。由于字符串Hello不属于异步操作（判断方法是字符串对象不具有 then 方法），返回 Promise 实例的状态从一生成就是resolved，所以回调函数会立即执行。Promise.resolve方法的参数，会同时传给回调函数。

**4）不带有任何参数**

Promise.resolve方法允许调用时不带参数，直接返回一个resolved状态的 Promise 对象。

所以，如果希望得到一个 Promise 对象，比较方便的方法就是直接调用Promise.resolve方法。

```js
const p = Promise.resolve();

p.then(function () {
  // ...
});
```

### Promise.then 返回值

[Promise.then方法的返回值问题](https://www.jianshu.com/p/802fc5801db4)

```js
var p1 = Promise.resolve(42)
p1.then((value) => {
  //第一种情况，返回一个Promise
  return new Promise(function(resolve,rejected){
    resolve(value + 1)
  })

  //第二种情况，返回一个值
  return value + 2;

  //第三种情况，新建一个promise，使用reslove返回值
  const p2 = new Promise(function(resolve,rejected){
    resolve(value + 3)
  })

  //第四种情况，新建一个promise，使用return返回值
  const p2 = new Promise(function(resolve,rejected){
    return(value + 4)
  })

  //第五种情况，没有返回值
  return undefined

}).then((value) => {
  console.log(value)
})
```

> 第一种情况，新建promise的resolve传出的值将作为then方法返回的promise的resolve的值传递出，console将打印出43
>
> 第二种情况，return的值将作为then方法返回的promise的resolve的值传递出，console将打印出44
>
> 第三种情况，虽然新建了promise，但对于then方法来说，没有向它返回的promise传递返回值，console将打印出undifined
>
> 第四种情况，同第三种情况，
>
> 第五种情况，then方法没有返回值，then方法的promise的resolve的值将传递出undifined。

参考文章开篇 promise 的特性：

- promise对象的then方法会返回一个全新的promise对象
- 前面then方法中的回调函数的返回值会作为后面then方法回调的参数

所以 then 方法中如果没有返回值，则没有继续向后传递参数。如果有返回值，不论这个值是 promise 还是普通的值，都会被处理成 promise，具体可看 [promise 实现](/interview/code-1.html#promise)

## Generator

- Generator 的中文名称是生成器，
- 通过`function*`来定义的函数称之为“生成器函数”（generator function），它的特点是可以中断函数的执行，每次执行`yield`语句之后，函数即暂停执行，直到调用返回的生成器对象的`next()`函数它才会继续执行。
- 也就是说Generator 函数是一个状态机，封装了多个内部状态。执行 Generator 函数返回一个遍历器对象（一个指向内部状态的指针对象），调用遍历器对象的next方法，使得指针移向下一个状态。 

```js
function* say(){
    for(let i=0;i<10;i++){
        yield i
    }
}
let obj = say()//返回一个遍历器对象
obj.next()  //Object {value: 0, done: false}
obj.next()  //Object {value: 1, done: false}
obj.next()  //Object {value: 2, done: false}
...
obj.next()  //Object {value: 9 done: false}
obj.next()  //Object {value: undefined, done: true}
```

### for...of 与 Generator

```js
const todos = {
    life: ['吃饭', '睡觉', '打豆豆'],
    learn: ['语文', '数学', '外语'],
    work: ['喝茶'],

    [Symbol.iterator]: function * () {
        const all = [...this.life, ...this.learn, ...this.work]
        for(const item of all) {
            yield item
        }
    }
}

for (let item of todos) {
    console.log(item)
}
```

## async和await

ES2017提供了`async`函数，使得异步操作变得更加方便。`async`函数就是`Generator`函数的语法糖。
 `async`函数就是将`Generator`函数的星号（`*`）替换成`async`，将`yield`替换成`await`，仅此而已。
 进一步说，`async`函数完全可以看作多个异步操作，包装成的一个`Promise`对象，而`await`命令就是内部`then`命令的语法糖。 

- async 函数返回的就是一个 Promise 对象，所接收的值就是函数 return 的值

- await  操作符用于等待一个 Promise 对象。它只能在异步函数 async function 中使用。
- await 表达式会暂停当前 async function 的执行，等待 Promise 处理完成。若 Promise 正常处理(fulfilled)，其回调的 resolve 函数参数作为 await 表达式的值，继续执行 async function。
- 若 Promise 处理异常(rejected)，await 表达式会把 Promise 的异常原因抛出。
- 另外，如果 await 操作符后的表达式的值不是一个 Promise，则返回该值本身。

**相比于Generator的改进**

* `内置执行器`。Generator 函数的执行必须依靠执行器，而 async 函数自带执行器，无需手动执行 next() 方法。

* `更好的语义`。async和await，比起星号和yield，语义更清楚了。async表示函数里有异步操作，await表示紧跟在后面的表达式需要等待结果。

* `更广的适用性`。co模块约定，yield命令后面只能是 Thunk 函数或 Promise 对象，而async函数的await命令后面，可以是 Promise 对象和原始类型的值（数值、字符串和布尔值，但这时会自动转成立即 resolved 的 Promise 对象）。

* `返回值是 Promise`。async 函数返回值是 Promise 对象，比 Generator 函数返回的 Iterator 对象方便，可以直接使用 then() 方法进行调用。

### 基本使用

```js
function getData () {
    return new Promise(resolve => {
        setTimeout(resolve, 1000, '结果') // 异步模拟数据请求
    })
}

async function asyncFn () {
    let res = await getData()
    console.log(res) // 1s之后输出 '结果'
}
```

### await后的值也可以是普通值

```js
async function fn () {
    return await 123
}
fn().then(res => console.log(res)) // 123
```

### async返回一个Promise对象

当没发生错误时 return 的值会成为 `then` 方法回调函数的参数。

而当抛出错误时，会导致Promise对象变为 `reject` 状态，抛出的错误也会成为 `catch` 方法回调函数的参数。

```js
async function f1(){
    return 'hello world'
}
f1().then(res => {
  console.log(res)} // hello world
)

async function f2() {
  throw new Error('error')
}
f2().then(res => {
    console.log(res)
}).catch(err => {
    console.log(err) // Error: error
})
```

### 同时发多个请求

```js
async function getABC() {
  let A = await getA()
  let B = await getB()
  let C = await getC()
  return A + B + C
}

// 正确处理
async function getABC() {
  let results = await Promise.all([getA, getB, getC])
  return results.reduce((acc, cur) => acc + cur, 0)
}
```

### 顶层 await

顶层 await 允许我们在 async 函数外面使用 await 关键字。它允许模块充当大型异步函数，通过顶层 await，这些 ECMAScript 模块可以等待资源加载。这样其他导入这些模块的模块在执行代码之前要等待资源加载完再去执行。

由于 await 仅在 async 函数中可用，因此模块可以通过将代码包装在 async 函数中来在代码中包含 await：

```js
// a.js
import fetch  from "node-fetch";
let users;
export const fetchUsers = async () => {
  const resp = await fetch('https://jsonplaceholder.typicode.com/users');
  users =  resp.json();
}
fetchUsers();
export { users };

// usingAwait.js
import {users} from './a.js';
console.log('users:', users); // undefined
setTimeout(() => {
  console.log('users:', users);
}, 100);
```

一个方法是导出一个 promise，让导入模块知道数据已经准备好了：

```js
//a.js
import fetch  from "node-fetch";
export default (async () => {
  const resp = await fetch('https://jsonplaceholder.typicode.com/users');
  users = resp.json();
})();
export { users };

//usingAwait.js
import promise, {users} from './a.js';
promise.then(() => {
  setTimeout(() => console.log('users:', users), 100); 
});
```

而顶层await就可以解决这些问题：

```js
// a.js
const resp = await fetch('https://jsonplaceholder.typicode.com/users');
const users = resp.json();
export { users};
// usingAwait.js
import {users} from './a.mjs';
console.log(users);
```

### try...catch处理错误

```js
function getData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(new Error('error')) // 模拟出错
        }, 1000)
    })
}
async function fn() {
    let res = await getData() // 会抛出错误，且不会向下执行
    console.log(res) // 不会输出任何
}

// try..catch处理
function getData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(new Error('error'))
        }, 1000)
    })
}
async function fn() {
    try {
        let res = await getData()
        console.log(res)
    } catch (err) {
        console.log(err) // Error: error
    }
    console.log('继续执行') // 会输出
}

fn()
```

**第一种情况是抛出错误且不会继续执行，第二种情况是打印错误会继续执行**

## 宏任务，微任务，事件循环

 **宏任务(macrotask)：**：

script(整体代码)、setTimeout、setInterval、UI 渲染、 I/O、postMessage、 MessageChannel、setImmediate(Node.js 环境)

**微任务(microtask)：**

Promise、 MutaionObserver、process.nextTick(Node.js环境

 **事件循环(Event Loop)**:   指主线程重复从任务队列中取任务、执行的过程 

- 选择最先进入队列的宏任务(通常是`script`整体代码)，如果有则执行
- 检查是否存在 Microtask，如果存在则不停的执行，直至清空 microtask 队列
- 更新render(每一次事件循环，浏览器都可能会去更新渲染)
- 重复以上步骤
- [图示](http://lynnelv.github.io/img/article/event-loop/ma(i)crotask.png)

## 面试题精选

```js
console.log('script start');
setTimeout(function() {
  console.log('setTimeout');
}, 0);
Promise.resolve().then(function() {
  console.log('promise1');
}).then(function() {
  console.log('promise2');
});
console.log('script end');

//script start
//script end
//promise1
//promise2
//setTimeout


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

> 1.首先，事件循环从宏任务(macrotask)队列开始，这个时候，宏任务队列中，只有一个script(整体代码)任务；当遇到任务源(task source)时，则会先分发任务到对应的任务队列中去。

> 2.然后我们看到首先定义了两个async函数，接着往下看，然后遇到了 console 语句，直接输出 script start。输出之后，script 任务继续往下执行，遇到 setTimeout，其作为一个宏任务源，则会先将其任务分发到对应的队列中

> 3.script 任务继续往下执行，执行了async1()函数，前面讲过async函数中在await之前的代码是立即执行的，所以会立即输出async1 start。
>  遇到了await时，会将await后面的表达式执行一遍，所以就紧接着输出async2，然后将await后面的代码也就是console.log('async1 end')加入到microtask中的Promise队列中，接着跳出async1函数来执行后面的代码

> 4.script任务继续往下执行，遇到Promise实例。由于Promise中的函数是立即执行的，而后续的 .then 则会被分发到 microtask 的 Promise 队列中去。所以会先输出 promise1，然后执行 resolve，将 promise2 分配到对应队列

> 5.script任务继续往下执行，最后只有一句输出了 script end，至此，全局任务就执行完毕了。
>  根据上述，每次执行完一个宏任务之后，会去检查是否存在 Microtasks；如果有，则执行 Microtasks 直至清空 Microtask Queue。
>  因而在script任务执行完毕之后，开始查找清空微任务队列。此时，微任务中， Promise 队列有的两个任务async1 end和promise2，因此按先后顺序输出 async1 end，promise2。当所有的 Microtasks 执行完毕之后，表示第一轮的循环就结束了

> 6.第二轮循环依旧从宏任务队列开始。此时宏任务中只有一个 setTimeout，取出直接输出即可，至此整个流程结束

```js
// 上题变形
// 本来是把 async1 end 加入微任务队列，结果 async 又返回了一个 promise ，加入微任务队列的就是这个 promise，执行完 async，最后才执行 async1 end
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

面试官问：

```js
setTimeout（()=>{
    console.log("1")
}, 0）;
new Promise（resolve => {
    resolve()
}）.then(() => {
	console.log("2")
})
console.log("3")
//为什么你说先运行宏任务，不直接运行setTimeout呢？
//因为后面如果有console.log("3")时，肯定会先执行3，setTimeout是放到宏任务队列里的。

Promise.resolve(1).then(2).then(Promise.resolve(3)).then(console.log) // 1
// then里面只要不是函数就不会传递，2是值，Promise.resolve(3)是Promise对象
// console.log 是函数
```

### 手写代码

* Promise
* promise.all
* promise.race
* promise.resolve
* Promise 封装 AJAX

* [手写代码整理](https://jinjingxuan.github.io/myblog/interview/code-1.html#%E9%98%B2%E6%8A%96)

### 看代码说答案

```js
// 原代码
setTimeout(function () {
  var a = 'hello '
  setTimeout(function () {
    var b = 'lagou '
    setTimeout(function () {
      var c = 'I love you'
      console.log(a + b + c)
    }, 1000)
  }, 1000)
}, 1000)

// 改进：高阶函数 + promise链式调用
function f (str) {
  return function (param) {
    return new Promise((resolve,reject) => {
      setTimeout(() => resolve(param += str), 1000)
    })
  }
}

var p1 = f('hello ')
var p2 = f('lagou ')
var p3 = f('I love you')

p1('').then((res) => p2(res)).then((res) => p3(res)).then((res) => console.log(res))
p1('').then(p2).then(p3).then(console.log)

```

红灯3秒亮一次，绿灯1秒亮一次，黄灯2秒亮一次；如何让三个灯不断交替重复亮灯？（用Promise实现）三个亮灯函数已经存在：

```js
function red() {
    console.log('red')
}
function green() {
    console.log('green')
}
function yellow() {
    console.log('yellow')
}

function light(time, fn) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            fn()
            resolve()
        }, time)
    })
}

function step() {
    Promise.resolve()
    .then(() => light(3000, red))
    .then(() => light(2000, green))
    .then(() => light(1000, yellow))
    .then(() => step())
}

step()
```

* **只有返回promsie对象后才会链式调用**

```js
Promise.resolve().then(res => {
   console.log('1')
   new Promise((resolve, reject) => { 
        setTimeout(() => {
            console.log('2')
            resolve('newPromise')
        }, 2000);
    }).then(res =>{
        console.log('3')
        return "newPromise1"
    })
}).then(res=>{
    console.log('4', res)
})
// 1 4 undefined  2 3
```

```js
Promise.resolve().then(res => {
   console.log('1')
   return new Promise((resolve, reject) => { 
        setTimeout(() => {
            console.log('2')
            resolve('newPromise')
        }, 2000);
    }).then(res =>{
        console.log('3')
        return "newPromise1"
    })
}).then(res=>{
    console.log('4', res)
})
// 1 2  3 4 newPromise1
```

```js
const promise = new Promise((resolve, reject) => {
    console.log(1);
    resolve();
    console.log(2);
    reject('error');
})
promise.then(() => {
    console.log(3);
}).catch(e => console.log(e))
console.log(4);

// 1 2 4 3
// promise构造函数的代码会立即执行，then或者reject里面的代码会放入异步微任务队列，在宏任务结束后会立即执行。规则二：promise的状态一旦变更为成功或者失败，则不会再次改变，所以执行结果为：1,2,4,3。而catch里面的函数不会再执行。
```

```js
const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
             console.log('once')
             resolve('success')
        }, 1000)
 })
promise.then((res) => {
       console.log(res)
})
promise.then((res) => {
     console.log(res)
})
// 将过一秒打印:once,success,success
```

```js
const p1 = () => (new Promise((resolve, reject) => {
	 	console.log(1);
 		let p2 = new Promise((resolve, reject) => {
        console.log(2);
        const timeOut1 = setTimeout(() => { // timeout1 加入宏任务队列
          console.log(3);
          resolve(4);
        }, 0)
        resolve(5); // p2.then加入微任务队列
 		});
		resolve(6); // p1.then加入微任务队列
    p2.then((arg) => {
  			console.log(arg);
 		});
}));

const timeOut2 = setTimeout(() => { // timeout2 加入宏任务队列
 		console.log(8);
 		const p3 = new Promise(reject => {
  		reject(9);
 		}).then(res => {
  		console.log(res)
 		})
}, 0)


p1().then((arg) => {
 		console.log(arg);
});

console.log(10);

// 1,2,10,5,6,8,9,3
```

> 首先执行 script 代码块，我们来分析一下都做了什么：
> 1. 定义了 p1 函数，定义的时候p1没有执行，所以这时候内部实现先不看
> 2. 执行了 timeout2 函数，返回值（是一个数值）赋值给 timeout2，timeout2加入了宏任务队列
> 3. 执行 p1，定义即执行的有输出 1，2，p2.then，p1.then加入微任务队列，timeout1加入宏任务队列
> 4. 输出10，执行完 script 宏任务后，清空微任务队列，p2.then => 5，p1.then => 6
> 5. 找出宏任务，首先执行 timeout2，输出 8 , reject 只是形参起名字实际上还是 resolve，p3.then加入微队列
> 6. Timeout2 宏任务执行结束清空微任务队列，输出9，然后再执行宏任务 timeout1,输出3，此时resolve(4)不会执行，因为p2状态已经成为 fullfilled

```js
Promise.resolve(1)
.then(2)
.then(Promise.resolve(3))
.then(console.log)

// Promise.resolve(1)会返回一个promise对象并且会将1当做then的参数。而.then 或者 .catch 的参数期望是函数，传入非函数则会发生值穿透。所以最后会输出：1。
```

```js
Promise.resolve(1)
.then((x)=> x + 1)
.then((x)=> { throw new Error('My Error') })
.catch(()=>1)
.then((x)=>x + 1)
.then((x)=>console.log(x))
.catch(console.error)

// 因为then()和catch()又返回了一个promise，因此，后续调用可以串联起来。
// catch 其实是 then(undefined, () => {}) 的语法糖，如下：
p.catch(err => {
  console.log("catch " + err); // catch error
});

// 等同于
p.then(undefined, err => {
  console.log("catch " + err); // catch error
});
```

### for 循环中异步顺序不一致问题

```js
// 遍历 dataList，当存在 d.data 时则调用异步请求，否则返回 123，存入 list 中
const list = [];
dataList.forEach(d => {
  let res = 123;
  if (d.data) {
    res = await axios.get(d.data);
  }
  list.push(res);
});
```

> 这样一来会有一个问题，异步请求会把回调事件放入微任务事件队列，宏任务执行完毕再执行微任务。所以 for 循环会先执行完，导致结果为 [123, 123, 123, data, data]，异步请求的结果永远在后面。

```js
// 解决办法是把原 dataList 重新生成一个 promiseList，等异步请求全部请求完再进行下一步操作
const list = [];
const promiseList = [];
dataList.forEach(d => {
  if (d.data) {
    promiseList.push(axios.get(d.data));
  }
  else {
  	promiseList.push(123);
  }
});

Promise.all(promiseList).then(res => {
  dataList.forEach((d, i) => {
      list.push(res[i]);
  });
})
```

## 浏览器事件循环和node事件循环的区别

Node的事件循环是libuv实现的，大体的task（宏任务）执行顺序是这样的：[图示](http://lynnelv.github.io/img/article/event-loop/ma(i)crotask-in-node.png)

- timers定时器：本阶段执行已经安排的 setTimeout() 和 setInterval() 的回调函数。
- pending callbacks待定回调：执行延迟到下一个循环迭代的 I/O 回调。
- idle, prepare：仅系统内部使用。
- poll 轮询：检索新的 I/O 事件;执行与 I/O 相关的回调（几乎所有情况下，除了关闭的回调函数，它们由计时器和 setImmediate() 排定的之外），其余情况 node 将在此处阻塞。
- check 检测：setImmediate() 回调函数在这里执行。
- close callbacks 关闭的回调函数：一些准备关闭的回调函数，如：socket.on('close', ...)。

****

- Node10以前，`microtask` 在事件循环的各个阶段之间执行，Node11之后和浏览器行为统一了，都是每执行一个宏任务就把微任务队列清空。
- 浏览器端，`microtask` 在事件循环的 `macrotask` 执行完之后执行

```js
function test () {
   console.log('start')
    setTimeout(() => {
        console.log('children2')
        Promise.resolve().then(() => {console.log('children2-1')})
    }, 0)
    setTimeout(() => {
        console.log('children3')
        Promise.resolve().then(() => {console.log('children3-1')})
    }, 0)
    Promise.resolve().then(() => {console.log('children1')})
    console.log('end')
}

test()

// 浏览器端 和 node11之后
// start
// end
// children1
// children2
// children2-1
// children3
// children3-1

// node10之前
// start
// end
// children2
// children3
// children2-1
// children3-1
```

