---
title: 场景题
date: 2020-10-29 09:52:01
categories: 算法
---
# 场景题
* LRU缓存机制

## LRU缓存机制

* [leetcode146](https://leetcode-cn.com/problems/lru-cache/)

* [题解](https://leetcode-cn.com/problems/lru-cache/solution/146-lruli-yong-js-mapshun-xu-cha-ru-de-fang-fa-by-/)：利用`Map`对于set的数值为顺序插入的原理实现LRU

```js
// 1. 新数据插入到链表头部；
// 2. 每当缓存命中（即缓存数据被访问），则将数据移到链表头部；
// 3. 当链表满的时候，将链表尾部的数据丢弃。
class LRUCache {
    constructor(capacity) {
        this.capacity = capacity
        this.map = new Map()
    }
    get(key) {
        let val = this.map.get(key)
        if (val === undefined) return -1
        this.map.delete(key)
        this.map.set(key, val)
        return val
    }
    put(key, val) {
        if (this.map.has(key)) this.map.delete(key)
        this.map.set(key, val)
        if (this.map.size > this.capacity) {
            this.map.delete(this.map.entries().next().value[0])
        }
    }
}

// 关于 map
const map = new Map([
    [1, 'a'],
    [2, 'b'],
    [3, 'c']
])
map.entries() // MapIterator {1 => "a", 2 => "b", 3 => "c"}
map.entries().next() // {value: Array(2), done: false}
map.entries().next().value[0] // 1
```

