---
title: 手写代码（一）
date: 2020-03-20 09:52:01
categories: 面试
---
# 手写代码（一）
* 防抖
* 节流
* 深拷贝
* 柯里化
* 函数组合
* new
* instanceof
* apply,bind,call
* promise.all
* promise.race
* promise
* promise封装ajax
* 发布订阅模式
* Symbol.iterator
* 数组扁平化带参数
* 数组去重
* 并发请求控制
* 实现 map 和 reduce
* 实现 'abcd'.f() 返回 'd-c-b-a'
* Object.create

## 防抖

**所谓防抖，就是指触发事件后 n 秒后才执行函数，如果在 n 秒内又触发了事件，则会重新计算函数执行时间。**

```js
// 防抖debounce
function debounce(fn, delay) {
  let timer = null
  return function () {
    timer && clearTimeout(timer)
    timer = setTimeout(() => {
      /**
      	fn 中的 this 指向 debounce 中 return 的这个函数中的 this
      	return 回来的这个函数中的 this 也就是指向直接调用 return 函数那个对象
      */
      fn.apply(this, arguments)
    }, delay)
  }
}

function out(){
    console.log("防抖")
}
window.onscroll = debounce(out, 1000)
```

## 节流

**所谓节流，就是指连续触发事件但是在 n 秒中只执行一次函数。** 节流会稀释函数的执行频率。

```js
// 使用时间戳写法，事件会立即执行，停止触发后没有办法再次执行
function throttle(fn, delay) {
  let lastTime = 0;
  return function() {
    let now = Date.now();
    if (now - lastTime >= delay) {
      fn.apply(this, arguments);
      lastTime = now;
    }
  }
}

// 使用定时器写法，delay 毫秒后第一次执行，第二次事件停止触发后依然会再一次执行
function throttle2(fn, delay) {
  let timer = null;
  return function() {
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, arguments);
        timer = null;
      }, delay);
    }
  };
}

// 使用定时器写法，事件会立即执行
function throttle(fn, delay) {
  let timer = null;
  return function() {
    if (!timer) {
      fn.apply(this, arguments);
      timer = setTimeout(() => {
        timer = null;
      }, delay)
    }
  };
}
```

## 深拷贝

```js
function deepClone(obj, hash = new WeakMap()) {
    if (obj instanceof Date) return new Date(obj);
    if (obj instanceof Error) return new Error(obj);
    if (obj instanceof RegExp) return new RegExp(obj);
    if (typeof obj !== "object" || obj === null) return obj; // 考虑数组
    if (hash.get(obj)) return hash.get(obj);
    let cloneObj = new Object();
    hash.set(obj, cloneObj);
    for (let key in obj) {
        if (Object.hasOwn(obj, key)) {
            cloneObj[key] = deepClone(obj[key], hash);
        }
    }
    return cloneObj;
}
```

> 使用`WeakMap`，`hash`和`obj`存在的就是弱引用关系，当下一次垃圾回收机制执行时，这块内存就会被释放掉。设想一下，如果我们要拷贝的对象非常庞大时，使用`Map`会对内存造成非常大的额外消耗，而且我们需要手动清除`Map`的属性才能释放这块内存，而`WeakMap`会帮我们巧妙化解这个问题。


## 柯里化
```js
let curry = (fn,...args)=> args.length < fn.length
                ?(...arguments) => curry(fn,...args,...arguments)
                :fn(...args)
```

## 函数组合

```js
function compose(...args) {
    return function(value) {
        return args.reverse().reduce((acc, cur) => cur(acc), value)
    }
}
```

## new

> 1. 创造一个新的空对象
> 2. 新对象的`__proto__`指向构造函数的原型对象
> 3. 构造函数的this指向正在创建的新对象，并执行构造函数的代码，向新对象中添加属性和方法。
> 4. 返回新对象地址

```js
function _new(constructor, ...args) {
    let obj = new Object()
    obj.__proto__ = constructor.prototype
    constructor.call(obj, ...args)
    return obj
}

/**
		上面代码可以再优化一下，模拟了 new 就别再用 new 了
		而且没有考虑构造函数存在返回值的情况，如果构造函数返回了对象那么则返回这个对象
*/
function _new(constructor, ...args) {
  const obj = Object.create(fn.prototype); // 原型式继承
  const ret = constructor.call(obj, ...args); // 继承属性
  return typeof ret === "object" ? ret : obj;
}
```

## instanceof

```js
function _instanceof(left, right) {
 		if (typeof L !== 'object') return false
    let l = left.__proto__;
    let r = right.prototype;
    while (true) {
        if (l === null) {
            return false;
        }
        if (l === r) {
            return true;
        }
        l = l.__proto__;
    }
}
```

## apply，call，bind

```js
//apply
Function.prototype.myApply = function(context, args) {
    context = context || window;
    context.fn = this;
    const result = context.fn(...args);
    delete context.fn;
    return result;
    
}

let obj = {}
console.log(Math.max.myApply(obj, [1, 2, 3])) //3

//call
Function.prototype.myCall = function(context, ...args) {
    context = context || window;
    context.fn = this;
    const result = context.fn(...args);
    delete context.fn;
    return result;
}

let obj = {}
console.log(Math.max.myCall(obj, 1, 2, 3)) // 3

//bind
Function.prototype.myBind = function(context, ...args) {
    context = context || window;
    context.fn = this;
    return function() {
        const result = context.fn(...args, ...arguments);
        delete context.fn;
        return result;   
    }
}

let obj = {}
console.log(Math.max.myBind(obj, 1, 2, 3)(4)) // 4
```

## promise.all

```js
Promise.all = function (promises) {
    return new Promise((resolve, reject) => {
        if (!promises || promises.length === 0) {
            resolve([]);
        }
        let count = 0;
        const result = [];
        for (let i = 0; i < promises[i].length; i++) {
            // 考虑到promises[i]可能是普通对象，则统一包装为Promise对象
            Promise.resolve(promises[i]).then(res => {
                result[i] = res;
                if (++count === promises.length) {
                    resolve(res);
                }
            }).catch(err => {
                // 任何一个Promise对象执行失败，则调用reject()方法
                reject(err);
                return;
            });
        }
    });
}
```

## promise.race

```js
Promise.race = function(promises) {
    return new Promise((resolve, reject) => {
       	 if (!promises || promises.length === 0) {
            return;
         }
         for (const item of promises) {
              Promise.resolve(item).then((res) => {
                  resolve(res);
                  return;
              }).catch((err) => {
                  reject(err);
                  return;
              })
          }
    });
}
```

## promise.resolve

```js
Promise.resolve = function (value) {
    if (value instanceof promise) return value
    return new Promise(resolve => resolve(value))
}

// 例子
Promise.resolve(100).then(value => console.log(value))
```

## Promise

* 三种状态：pending，fulfilled，rejected
* new Promise 时传进来一个执行器（参数是resolve和reject），是立即执行的
* resolve函数的作用是改变状态为fulfilled，存储成功的值：value 
* reject函数的作用的改变状态为rejected，存储失败的原因：reason
* then函数有两个参数，成功回调和失败回调，首先判断状态，fulfilled则执行成功回调，rejected则执行失败回调，pending则把回调存储起来
* then要实现链式调用，需要返回 promise，then方法原来的操作可以放进新建 promise2 的执行器中立即执行，并且需要获取当前的返回值 x，传递给下一个 then 方法

```js
const PENDING = 'pending' // 等待
const FULFILLED = 'fulfilled' // 成功
const REJECTED = 'rejected' //失败

class MyPromise {
  constructor (executor) {
    executor(this.resolve, this.reject);
  }
  // promise 状态
  status = PENDING;
  // 成功之后的值
  value = undefined;
  // 失败后的原因
  reason = undefined;
  // 成功回调，用数组的原因是可能有多个 promise.then
  successCallback = [];
  // 失败回调
  failCallback = [];
  // 定义成箭头函数的好处是 this 指向当前类
  resolve = value => {
    // 如果状态不是等待 阻止程序向下执行 因为状态一旦确定就不可以再改变
    if (this.status !== PENDING) return;
    // 将状态更改为成功
    this.status = FULFILLED;
    // 保存成功之后的值
    this.value = value;
    // 判断成功回调是否存在 存在则调用
    while (this.successCallback.length) {
     	this.successCallback.shift()(this.value);
    }
  }
  reject = reason => {
    // 如果状态不是等待 阻止程序向下执行
    if (this.status !== PENDING) return;
    // 将状态更改为失败
    this.status = REJECTED;
    // 保存失败后的原因
    this.reason = reason;
    // 判断失败回调是否存在 存在则调用
    while (this.failCallback.length) {
     	this.failCallback.shift()(this.reason); 
    }
  }
 then = (successCallback, failCallback) => {
   successCallback = successCallback ? successCallback : value => value;
   return new MyPromise((resolve, reject) => {
     if (this.status === FULLFILLED) {
       let x = successCallback(this.value);
       x instanceof MyPromise ? x.then(resolve, reject) : resolve(x);
     }
     else if (this.status === REJECTED) {
       failCallback(this.reason);
     }
     else {
       this.successCallback.push(successCallback);
       this.failCallback.push(failCallback);
     }
   });
 }
 catch = (failCallback) => {
   return this.then(undefined, failCallback);
 }
}

// 测试

// 1. 测试基本功能
let p = new MyPromise((resolve, reject) => {
    resolve('success')
    reject('fail')
})

p.then(val => {
  console.log(val)
}, reason => {
  console.log(reason)
})

// 2. 测试异步
let p = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve('success')   
    }, 2000)
})

p.then(val => {
  console.log(val)
}, reason => {
  console.log(reason)
})

// 3. 测试链式调用
let p = new MyPromise((resolve, reject) => {
    resolve('success')
})

p.then(res => {
    console.log(res)
    return 100
}).then(val => {
    console.log(val)
})

// 4. 测试 then 返回也是 promise
let p = new MyPromise((resolve, reject) => {
    resolve('success')
})

p.then(res => {
    console.log(res)
    return new MyPromise((resolve, reject) => {
        resolve('other')
    })
}).then(val => {
    console.log(val)
})

// 5. 测试 then 不传参数
let promise = new MyPromise((resolve, reject) => {
    resolve('成功')
})

p.then().then().then(val => console.log(val))
```


## promise封装ajax

```js
function ajax (url) {
    return new Promise(function (reslove, reject) {
        var xhr = new XMLHttpRequest()
        xhr.open('GET', url) 
        xhr.reponeseType = 'json'
        xhr.onload = function () {
            if(this.status === 200) {
                reslove(this.response)
            } else {
                reject(new Error(this.statusText))
            }
        }
        xhr.send()
    })
}

ajax('/api/')
	.then(res => console.log(res))
	.catch(err => console.log(err))


//promise.reslove
Promise.resolve('foo')
    .then(function (value) {
 	   		console.log(value)
		})
```

## 发布订阅模式

```js
    // 类内部存储一个对象，包含事件名和对应的触发函数
    // { click: [fn1, fn2], change: fn }
    class EventEmitter {
      constructor () {
        this.subs = Object.create(null)
      }
      // 注册事件
      $on (eventType, handler) {
        this.subs[eventType] = this.subs[eventType] || []
        this.subs[eventType].push(handler)
      }

      // 触发事件
      $emit (eventType) {
        if (this.subs[eventType]) {
          this.subs[eventType].foreach(handler => {
            handler()
          })
        }
      }
    }

    // 测试
    let em = new EventEmitter() // 信号中心
    em.$on('click', () => {
      console.log('click1')
    })
    em.$on('click', () => {
      console.log('click2')
    })
    em.$emit('click')
```

## Symbol.iterator

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

## 数组扁平化带参数

```js
function flattern(arr, depth) {
    let res = []
    for(let item of arr){
        if (Array.isArray(item) && depth > 0) {
            res = res.concat(flattern(item, depth - 1))
        } else {
            res.push(item)
        }
    }
    return res
}

// 一次性拍平
function flat(arr) {
  return arr.toString().split(',').map(item => +item)
}
```

## 数组去重

（1）reduce + includes

```js
function deduplicate(arr) {
    return arr.reduce((acc, cur) => acc.includes(cur) ? acc : acc.concat(cur), []);
}
// concat 不会改变原有数组，返回值为新数组，可拼接单个元素
```

（2）利用ES6的Set数据结构

> `set` 类似于数组，且成员值不重复都是唯一的，`set`本身是一个构造函数。 

```js
function deduplicate(arr) {
    return [...new Set(arr)];
}
```

（3）利用sort

```js
function deduplicate(arr) {
    arr = arr.sort();
    const res = [];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] !== arr[i - 1]) {
            res.push(arr[i]);
        }
    }
    return res;
}
```

（4）利用includes

```js
function deduplicate(arr) {
    const res = [];
    for (let i = 0; i < arr.length; i++) {
        if (!res.includes(arr[i])) {
            res.push(arr[i]);
        }
    }
    return res;
}
```

## 并发请求控制

> 实现一个批量请求函数 multiRequest(urls, maxNum)，要求如下：
> • 要求最大并发数 maxNum
> • 每当有一个请求返回，就留下一个空位，可以增加新的请求
> • 所有请求完成后，结果按照 urls 里面的顺序依次打出

```js
function multiRequest(urls = [], maxNum) {
    const len = urls.length
    const result = new Array(len).fill(false)
    let count = 0
  
    return new Promise((resolve, reject) => {
        while (count < maxNum) {
            next();
        }
        function next() {
            let current = count++;
            if (current >= len) {
                !result.includes(false) && resolve(result);
                return;
            }
            const url = urls[current];
            fetch(url).then((res) => {
                result[current] = res;
                if (current < len) {
                    next();
                }
            }).catch((err) => {
                result[current] = err;
                if (current < len) {
                    next();
                }
            })
        }
    })
}
```

## 实现一个sleep函数

```js
const sleep = (time) => {
  return new Promise(resolve => setTimeout(resolve, time))
}

sleep(1000).then(() => {
  // 这里写你的操作
})
```

## 实现 map 和 reduce

```js
Array.prototype.myMap = function(fn) {
    const arr = this;
    const res = [];
    for (let i = 0; i < arr.length; i++) {
        res[i] = fn(arr[i], i, arr)
    }
    return res;
};

Array.prototype.myReduce = function(fn, initValue) {
    const arr = this;
    let val = initValue || arr[0]
    for (let i = initValue ? 0 : 1; i < arr.length; i++) {
        val = fn(val, arr[i], i, arr)
    }
    return val;
};
```

## 实现 'abcd'.f() 返回 'd-c-b-a'

```js
String.prototype.f = function() {
    return this.split('').reverse().join('-')
}
```

## Object.create

```js
// Object.create 实现
let o = Object.create(obj) // o.__proto__ === obj
Object.create = function (obj) {
    function F() {}
    F.prototype = obj;
    return new F();
};

// 可以理解为
Object.create = function (obj) {
  return {
    __proto__: obj
  }
}
```