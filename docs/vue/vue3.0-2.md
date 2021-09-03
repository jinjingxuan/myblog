---
title: Vue3.0（二）
date: 2021-02-10 11:27:54
categories: Vue
---

# Vue.js 3.0响应式原理

* 使用 Proxy 对象实现属性监听
* 多层属性嵌套，只有在访问属性过程中处理下一级属性
* 默认监听动态添加的属性
* 默认监听属性的删除操作
* 默认监听数组索引和 length 属性
* 可以作为单独的模块使用

# 核心方法

* reactive/ref/toRefs/computed
* 三个底层方法，一般不会直接调用
  * effect
  * track
  * trigger

> effect 函数用于定义副作用，它的参数就是副作用函数，会默认执行一次，当响应数据变化后，会导致副作用函数重新执行。
>
> track 用来收集依赖（收集effect），trigger 用来触发响应（执行effect）

## reactive

* 接收一个参数，判断参数是否是对象，不是对象则返回（只能处理对象）
* 创建拦截器对象 handler，设置 get / set /deleteProperty
* 返回 Proxy 对象

```js
// 判断是否为对象
const isObject = val => val !== null && typeof val === 'object'
// 对象的键仍为对象继续调用 reactive 处理
const convert = target => isObject(target) ? reactive(target) ? target
// 判断对象是否有某个属性
const hasOwnProperty = Object.prototype.hasOwnProperty
// call 方法相当于 target.hasOwnProperty(key)
const hasOwn = (target, key) => hasOwnProperty.call(target, key) 

// reactive 方法
export function reactive(target) {
	if(!isObject(target)) return target
	
	const handler = {
    get(target, key, receiver) {
      // 收集依赖
      track(target, key)
      const result = Reflect.get(target, key, receiver)
      return convert(result)
    },
    set(target, key, value, receiver) {
      const oldValue = Reflect.get(target, key, receiver)
      let result = true // 返回 boolean 值
      if (oldValue !== value) {
        result = Reflect.set(target, key, value, receiver)
        // 触发更新
        trigger(target, key)
      }
      return result
    },
    deleteProperty(target, key) {
      const hadKey = hasOwn(target, key)
      const result = Reflect.deleteProperty(target, key)
      if (hadKey && result) {
        // 触发更新
        trigger(target, key)
      }
    }
  }
  
  return new Proxy(target, handler)
}
```

测试

```js
import { reactive } from './index.js'
const obj = reactive({
  name: 'zs',
  age: 18
})
obj.name = 'ls'
delete obj.age
console.log(obj)
```

## 收集依赖

如何收集依赖，先看一个例子

```js
import { reactive, effect } from './reactivity/index.js'

const product = reactive({
  name: 'iPhone',
  price: 5000,
  count: 3
})
let total = 0 

effect(() => {
  total = product.price * product.count
  // 此处访问时会执行 price 和 count 属性的 get 方法，收集依赖
})

console.log(total)

product.price = 4000 // 此处访问时会执行 price 和 count 属性的 set 方法，触发更新
console.log(total)

product.count = 1
console.log(total)
```

![stv1pQ.jpg](https://s3.ax1x.com/2021/01/13/stv1pQ.jpg)

* [JavaScript中的Map、WeakMap、Set和WeakSet介绍](https://juejin.cn/post/6854573210794082318)

## 收集依赖实现：effect && track

```js
let activeEffect = null
export function effect(callback) {
  activeEffect = callback
  callback() // 访问响应式对象属性，收集依赖
  activeEffect = null
}

let targetMap = new WeakMap()

export function track(target, key) {
  if (!activeEffect) return
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()))
  }
  let dep = depsMap.get(key)
  if (!dep) {
    depsMap.set(key, (dep = new Set()))
  }
  dep.add(activeEffect)
}
```

## 触发更新：trigger

```js
export function trigger(target, key) {
  const depsMap = targetMap.get(target)
  if (!depsMap) return
  const dep = depsMap.get(key)
  if (dep) {
    dep.forEach(() => {
      effect()
    })
  }
}
```

## ref

```js
export function ref(raw) {
  // 判断 raw 是否是 ref 创建的对象，如果是直接返回
  if (isObject(raw) && raw.__v_isRef) {
    return
  }
  let value = convert(raw)
  const r = {
    __v_isRef: true,
    get value() {
      track(r, 'value')
      return value
    },
    set value(newValue) {
      if (newValue !== value) {
        raw = newValue
        value = convert(raw)
        trigger(r, 'value')
      }
    }
  }
  return r
}
```

**ref测试**

```js
    import { reactive, effect, ref } from './reactivity/index.js'

    const price = ref(5000)
    const count = ref(3)
   
    let total = 0 
    effect(() => {
      total = price.value * count.value
    })
    console.log(total)

    price.value = 4000
    console.log(total)

    count.value = 1
    console.log(total)
```

## reactive vs ref

* ref 可以把基本数据类型数据，转成响应式对象
* ref 返回的对象，重新赋值成对象也是响应式的
* reactive 返回的对象，重新赋值丢失响应式
* reactive 返回的对象不可以解构

## toRefs

```js
export function toRefs (proxy) {
  const ret = proxy instanceof Array ? new Array(proxy.length) : {}

  for (const key in proxy) {
    // 把每个属性都转换成 ref 对象
    ret[key] = toProxyRef(proxy, key)
  }

  return ret
}

function toProxyRef (proxy, key) {
  const r = {
    __v_isRef: true,
    get value () {
      // 访问的已经是响应式对象，不需要收集依赖
      return proxy[key]
    },
    set value (newValue) {
      proxy[key] = newValue
    }
  }
  return r
}
```

**toRefs测试**

```js
import { reactive, effect, toRefs } from './reactivity/index.js'

function useProduct () {
  const product = reactive({
    name: 'iPhone',
    price: 5000,
    count: 3
  })
	
  // 直接返回 product 解构之后不是响应式的
  // toRefs 将每个属性转换成了响应式，解构之后依旧是响应式
  return toRefs(product)
}

const { price, count } = useProduct() 

let total = 0 
effect(() => {
  total = price.value * count.value
})
console.log(total)

price.value = 4000
console.log(total)

count.value = 1
console.log(total)
```

## computed

> Computed 实际上就是一个 effect 函数，computed 返回的是一个 ref 对象。

```js
// 返回 ref 创建的对象
export function computed (getter) {
  const result = ref()

  effect(() => (result.value = getter()))

  return result
}
```

**computed测试**

```js
import { reactive, effect, computed } from './reactivity/index.js'

const product = reactive({
  name: 'iPhone',
  price: 5000,
  count: 3
})
let total = computed(() => {
  return product.price * product.count
})

console.log(total.value)

product.price = 4000
console.log(total.value)

product.count = 1
console.log(total.value)
```

