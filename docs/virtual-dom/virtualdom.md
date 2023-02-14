---
title: Virtual DOM 与 Diff 算法
date: 2021-01-15 11:27:54
categories: VirtualDOM
---
# Virtual DOM 与 Diff 算法
* 什么是虚拟DOM
* 使用 Snabbdom
* 源码解读
  * h函数
  * VNode对象
  * init函数
* Diff 算法
* v-for 带 key
* vue 和 react 在虚拟dom的diff上，做了哪些改进使得速度很快
* React 和 Vue 的 diff 时间复杂度从 O(n^3) 优化到 O(n) ，那么 O(n^3) 和 O(n) 是如何计算出来的？

## 什么是虚拟DOM

* 虚拟DOM是由普通的 JS 对象来描述 DOM 对象，因为不是真实的 DOM 对象，所以叫虚拟 DOM
* 创建虚拟 DOM 的开销比真实 DOM 小很多
* 虚拟 DOM 的好处是当状态改变时不需要立即更新 DOM，只需要一个虚拟树来描述 DOM，虚拟DOM内部将弄清楚如何有效（diff）的更新 DOM
* 如果每次更改应用程序状态都重新创建整个 DOM，则程序非常缓慢，而虚拟DOM可以跟踪上一次的状态
* 除了渲染 DOM 以外,还可以实现 SSR(Nuxt.js/Next.js),原生应用(Weex/React Native),小程序(mpvue/uni-app)

* 关于服务端渲染（SSR）可查看：
  * https://www.jianshu.com/p/b8cfa496b7ec
  * https://blog.csdn.net/github_34708151/article/details/98344114

### Virtual DOM 库

* Snabbdom
  * Vue 2.x 内部使用的 Virtual DOM 就是改造的 Snabbom
  * 大约 200 SLOC（single line of code）
  * 通过模块可扩展
  * 源码使用 TS 开发
  * 最快的 Virtual DOM 之一

## 使用 Snabbdom

* 可以使用`parcel`构建工具，比较轻便

```js
yarn add snabbdom
```

* Snabbdom 官网 demo 中导入使用的是 common.js 模块化语法，我们使用 ES Modules 语法 import

```js 
require snabbdom from 'snabbdom' // 导入所有函数
import { init, h, thunk } from 'snabbdom'

// 不使用 import snabbdom from 'snabbdom' 是因为
// snabbdom.ts 末尾导出使用的语法是 export 导出，而没有使用 export default
```

* init 是一个高阶函数，返回 patch()
* h()返回虚拟结点 VNode，这个函数在Vue.js中见过

```js
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
```

* thunk()是一种优化策略，可以在处理不可变数据时使用

### 如何使用

```js
// div中放置子元素 h1,p
import { h, init } from 'snabbdom'

// patch函数，作用对比两个vnode的差异更新到真实DOM
let patch = init([])

// 第一个参数：标签+选择器
// 第二个参数：如果是字符串的话就是标签中的内容
let vnode = h('div#container', [
  h('h1', 'Hello Snabbdom'),
  h('p', '这是一个p标签')
])

let app = document.querySelector('#app')

let oldVnode = patch(app, vnode)

// 两秒之后继续更新
setTimeout(() => {
  vnode = h('div#container', [
    h('h1', 'Hello World'),
    h('p', 'Hello P')
  ])
  patch(oldVnode, vnode)

  // 清空页面元素 -- 错误
  // patch(oldVnode, null)
  // patch(oldVnode, h('!'))
}, 2000);
```

### snabbdom的模块

**类似于插件机制**

```js
import { init, h } from 'snabbdom'
// 1. 导入模块
import style from 'snabbdom/modules/style'
import eventlisteners from 'snabbdom/modules/eventlisteners'
// 2. 注册模块
let patch = init([
  style,
  eventlisteners
])
// 3. 使用 h() 函数的第二个参数传入模块需要的数据（对象）
let vnode = h('div', {
  style: {
    backgroundColor: 'red'
  },
  on: {
    click: eventHandler
  }
}, [
  h('h1', 'Hello Snabbdom'),
  h('p', '这是p标签')
])

function eventHandler () {
  console.log('点击我了')
}

let app = document.querySelector('#app')

let oldVnode = patch(app, vnode)
```

## 源码解读

源码地址：https://github.com/snabbdom/snabbdom

### h函数：

* `h` 函数主要根据传进来的参数，返回一个 vnode 对象

```ts
// h函数的重载，TS支持
export function h (sel: string): VNode
export function h (sel: string, data: VNodeData | null): VNode
export function h (sel: string, children: VNodeChildren): VNode
export function h (sel: string, data: VNodeData | null, children: VNodeChildren): VNode
export function h (sel: any, b?: any, c?: any): VNode {
  var data: VNodeData = {}, children: any, text: any, i: number
  // 处理参数，实现重载的机制
  if (c !== undefined) {
    // 处理三个参数的情况
    // ...
  // 处理两个参数的情况
  } else if (b !== undefined && b !== null) {
	// ...
  }
  if (children !== undefined) {
    // 处理 children 中的原始值（string/number）
    for (i = 0; i < children.length; ++i) {
      // 如果 child 是 string/number，创建文本节点
    }
  }
  // 如果是 svg ，创建命名空间
  if (
    sel[0] === 's' && sel[1] === 'v' && sel[2] === 'g' &&
    (sel.length === 3 || sel[3] === '.' || sel[3] === '#')
  ) {
    addNS(data, children, sel)
  }
  // 返回vnode
  return vnode(sel, data, children, text, undefined)
};
```

### VNode对象

* 一个 VNode 就是一个虚拟节点用来描述一个 DOM 元素，如果这个 VNode 有 children 就是Virtual DOM

* 源码位置：src/vnode.ts

```ts
export type Key = string | number

// 接口
export interface VNode {
  // 选择器  
  sel: string | undefined
  // 节点数据：属性/样式/事件等
  data: VNodeData | undefined
  // 子节点
  children: Array<VNode | string> | undefined
  // 记录 vnode 对应的真实 DOM
  elm: Node | undefined
  // 节点中的内容，和 children 只能互斥
  text: string | undefined
  key: Key | undefined
}

// 实现接口
export function vnode (sel: string | undefined,
  data: any | undefined,
  children: Array<VNode | string> | undefined,
  text: string | undefined,
  elm: Element | Text | undefined): VNode {
  const key = data === undefined ? undefined : data.key
  // 使用js对象描述DOM
  return { sel, data, children, text, elm, key }
}
```

### patch过程

* patch(oldVnode, newVnode)
* 打补丁，把新节点中变化的内容渲染到真实DOM，最后返回新节点作为下一次处理的旧节点
* 对比新旧 VNode 是否相同节点（节点的 key 和 sel 相同）
* 如果不是相同节点，删除之前的内容，重新渲染
* 如果是相同节点，再判断新的 VNode 是否有 text，如果有并且和旧节点 text 不同，直接更新
* 如果新的 VNode 有 children，判断子节点是否有变化，判断子节点的过程使用的就是 diff 算法
* diff 过程只进行同层级比较

### init函数

* **功能:** init(modules, domApi)，返回 patch() 函数（高阶函数）

* 为什么要使用高阶函数？
  * 因为 patch() 函数在外部会调用多次，每次调用依赖一些参数，比如：modules/domApi/cbs

  * 通过高阶函数让 init() 内部形成闭包，返回的 patch() 可以访问到 modules/domApi/cbs，而不需要重新创建

* init() 在返回 patch() 之前，首先收集了所有模块中的钩子函数存储到 cbs 对象中

* 源码位置：src/snabbdom.ts

```ts
// 钩子函数
const hooks: (keyof Module)[] = ['create', 'update', 'remove', 'destroy', 'pre', 'post'];
// 第一个参数是模块，参考上面模块使用的部分
export function init(modules: Array<Partial<Module>>, domApi?: DOMAPI) { 
    let i: number, j: number, cbs = ({} as ModuleHooks); 
    // 初始化 api ，htmlDomApi里是一些原生 DOM api，用于创建真实 DOM
    // 如果想把虚拟 DOM 转化为其他类型时，可以传入第二个参数
    const api: DOMAPI = domApi !== undefined ? domApi : htmlDomApi; 
    // 把传入的所有模块的钩子方法，统一存储到 cbs 对象中 
    // 最终构建的 cbs 对象的形式 cbs = [ create: [fn1, fn2], update: [], ... ] 
    for (i = 0; i < hooks.length; ++i) { 
        // cbs['create'] = [] 
        cbs[hooks[i]] = []; 
        for (j = 0; j < modules.length; ++j) { 
         	// const hook = modules[0]['create'] 
            // 每一个模块都会导出钩子函数的方法，例如 attributes.ts 中导出
            // export const attributesModule: Module = 
            // { create: updateAttrs, update: updateAttrs }
            const hook = modules[j][hooks[i]]; 
            if (hook !== undefined) { 
                (cbs[hooks[i]] as Array<any>).push(hook);
            } 
        } 
    }
    …
    return function patch(oldVnode: VNode | Element, vnode: VNode): VNode {}
}
```

### patch函数

* **功能：**
  * 传入新旧 VNode，对比差异，把差异渲染到 DOM
  * 返回新的 VNode，作为下一次 patch() 的 oldVnode

* **执行过程：**
  * vnode 不存在，但是 oldVnode 存在，说明是需要销毁旧节点
  * vnode 存在，但是 oldVnode 不存在，说明是需要创建新节点
  * 如果 oldVnode 和 vnode 都存在且是相同节点时
    * 调用 patchVnode()，找节点的差异并更新 DOM
  * 如果 oldVnode 和 vnode 都存在且是不同节点时
    * 根据 vnode 创建一个真实的 DOM 节点，删除老节点，增加新节点
  

```ts
// vnode 不存在，但是 oldVnode 存在，说明是需要销毁旧节点
if (isUndef(vnode)) {
  if (isDef(oldVnode)) invokeDestroyHook(oldVnode)
  return
}

// vnode 存在，但是 oldVnode 不存在，说明是需要创建新节点
if (isUndef(oldVnode)) {
  isInitialPatch = true
  createElm(vnode, insertedVnodeQueue)
}

// 如果新旧节点是相同节点
if (sameVnode(oldVnode, vnode)) { 
  // 找节点的差异并更新 DOM 
  patchVnode(oldVnode, vnode, insertedVnodeQueue); 
} else { 
  // 如果新旧节点不同，vnode 创建对应的 DOM 
  // 获取当前的 DOM 元素 
  elm = oldVnode.elm!; 
  parent = api.parentNode(elm); 
  // createElm 是为 VNode 创建真实的 DOM 
  createElm(vnode, insertedVnodeQueue); 
  if (parent !== null) { 
    // 如果父节点不为空，把 vnode 对应的 DOM 插入到文档中 
    api.insertBefore(parent, vnode.elm!, api.nextSibling(elm)); 
    // 移除老节点 
    removeVnodes(parent, [oldVnode], 0, 0);
  } 
}
return vnode

// 当可以比较时，调用 patchVnode 找差异并更新 DOM
// 当不值得比较时，新节点直接把老节点整个替换了
// 最后会返回 VNode，可以继续进行下一个 patch 过程

// sameVnode 判断了 key、 tag、 isComment（是否为注释节点）
function sameVnode(a, b) {
  return (
    a.key === b.key &&
    a.asyncFactory === b.asyncFactory &&
    ((a.tag === b.tag &&
      a.isComment === b.isComment &&
      isDef(a.data) === isDef(b.data) &&
      sameInputType(a, b)) ||
      (isTrue(a.isAsyncPlaceholder) && isUndef(b.asyncFactory.error)))
  )
}
```

### patchVnode函数

* 功能：

  * `patchVnode(oldVnode, vnode, insertedVnodeQueue)`
  * 对比 oldVnode 和 vnode 的差异，把差异渲染到 DOM

* 执行过程：

  * `if(oldVnode === vnode)`则没有变化
  * `if(oldVnode.text !== null && vnode.text !== null && oldVnode.text !== vnode.text)`，文本节点的比较，需要修改，则会调用`Node.textContent = vnode.text`。
  * `if(oldVnode.children && vnode.children)`, 两个节点都有子节点，而且它们不一样，这样我们会调用`updateChildren`函数比较子节点，**这是diff的核心**。
  * 如果 vnode.children 有值， oldVnode.children 无值
    * 清空 DOM 元素
    * 调用 addVnodes() ，批量添加子节点
  * 如果 oldVnode.children 有值， vnode.children 无值
    * 调用 removeVnodes() ，批量移除子节点

### **updateChildren**

* **功能：**
  * diff 算法的核心，对比新旧节点的 children，更新 DOM

* **执行过程：**
  * 此外可参考：[https://juejin.im/post/6844903607913938951](https://juejin.im/post/6844903607913938951)
  * 在对**开始和结束节点**比较的时候，总共有四种情况
    * oldStartVnode / newStartVnode (旧开始节点 / 新开始节点)
    * oldEndVnode / newEndVnode (旧结束节点 / 新结束节点)
    * oldStartVnode / oldEndVnode (旧开始节点 / 新结束节点)
    * oldEndVnode / newStartVnode (旧结束节点 / 新开始节点)

![0rCzTI.png](https://s1.ax1x.com/2020/10/09/0rCzTI.png)

* 开始节点和结束节点比较，这两种情况类似
  * oldStartVnode / newStartVnode (旧开始节点 / 新开始节点)
  * oldEndVnode / newEndVnode (旧结束节点 / 新结束节点)

* 如果 oldStartVnode 和 newStartVnode 是 sameVnode 
  * 调用 patchVnode() 对比和更新节点
  * 把旧开始和新开始索引往后移动 oldStartIdx++ / oldEndIdx++

****

![0rPgAI.png](https://s1.ax1x.com/2020/10/09/0rPgAI.png)

* oldStartVnode / newEndVnode (旧开始节点 / 新结束节点) 相同
  * 调用 patchVnode() 对比和更新节点
  * 把 oldStartVnode 对应的 DOM 元素，移动到右边
    * 更新索引

****

![0ri3PP.png](https://s1.ax1x.com/2020/10/09/0ri3PP.png)

* oldEndVnode / newStartVnode (旧结束节点 / 新开始节点) 相同
  * 调用 patchVnode() 对比和更新节点
  * 把 oldEndVnode 对应的 DOM 元素，移动到左边
    * 更新索引

****

* 如果不是以上四种情况
  * 遍历新节点，使用 newStartNode 的 key 在老节点数组中找相同节点
  * 如果没有找到，说明 newStartNode 是新节点
    * 创建新节点对应的 DOM 元素，插入到 DOM 树中
  * 如果找到了
    * 判断新节点和找到的老节点是否 sameVnode
    * 如果不相同，说明节点被修改了，重新创建对应的 DOM 元素，插入到 DOM 树中
    * 如果相同，把 elmToMove 对应的 DOM 元素，移动到左边

****

* 当老节点的所有子节点先遍历完 (oldStartIdx > oldEndIdx)，循环结束
  * 说明新节点有剩余，把剩余节点批量插入到右边

![0rFz79.png](https://s1.ax1x.com/2020/10/09/0rFz79.png)

* 新节点的所有子节点先遍历完 (newStartIdx > newEndIdx)，循环结束
  * 说明老节点有剩余，把剩余节点批量删除

![0rkBcT.png](https://s1.ax1x.com/2020/10/09/0rkBcT.png)

## 关于 V-for 带 key

参考：https://juejin.im/post/6844903577215827982

官方：https://cn.vuejs.org/v2/api/#key

除了上述所说，更快速 : key 的唯一性可以被 Map 数据结构充分利用,相比于遍历查找的时间复杂度 O(n),Map 的时间复杂度仅仅为 O(1),源码如下:

```js
function createKeyToOldIdx(children, beginIdx, endIdx) {
  let i, key;
  const map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) map[key] = i;
  }
  return map;
}
```

## 场景：list 三条数据删除中间的那条

#### index作为key，错误的删除了第三条

> 至于为什么，根据 diff 算法，首先生成旧节点和新节点的虚拟 dom , 根据 key 判断是否为相同节点，再去更新内部内容，此时以 index 作为 key，算法会认为前两条key是相同的，即相同的节点，就不去更新内部了，造成的结果就是实际第二条没删除，而是删除了第三条

```js
之前的数据                         之后的数据

key: 0  index: 0 name: test1     key: 0  index: 0 name: test1
key: 1  index: 1 name: test2     key: 1  index: 1 name: test2
key: 2  index: 2 name: test3     
```

#### id作为key

```js
之前的数据                              删除之后的数据

key: 1  id: 1 index: 0 name: test1     key: 1  id: 1 index: 0  name: test1
key: 2  id: 2 index: 1 name: test2     key: 3  id: 3 index: 3  name: test3
key: 3  id: 3 index: 2 name: test3     
```

再比如中间插入的时候，如果使用index作为key会造成复用

## vue 和 react 在虚拟dom的diff上，做了哪些改进使得速度很快
[https://juejin.cn/post/6878892606307172365](https://juejin.cn/post/6878892606307172365)

1. 虚拟DOM在比较时只比较同一层级节点，复杂度都为 O(n)，降低了算法复杂度；
2. 都使用key比较是否是相同节点，都是为了尽可能的复用节点
3. 都是操作虚拟DOM，最小化操作真实DOM，提高性能（其实虚拟DOM的优势 并不是在于它操作DOM快）

## React 和 Vue 的 diff 时间复杂度从 O(n^3) 优化到 O(n) ，那么 O(n^3) 和 O(n) 是如何计算出来的？
原来的 O(n^3) 的 diff 流程是：

老树的每一个节点都去遍历新树的节点，直到找到新树对应的节点。那么这个流程就是 O(n^2)，再紧接着找到不同之后，再计算最短修改距离然后修改节点，这里是 O(n^3)

所以前端框架的 diff 约定了两种处理原则：只做同层的对比，type 变了就不再对比子节点。
因为 dom 节点做跨层级移动的情况还是比较少的，一般情况下都是同一层级的 dom 的增删改。
这样只要遍历一遍，对比一下 type 就行了，是 O(n) 的复杂度，而且 type 变了就不再对比子节点，能省下一大片节点的遍历。