---
title: Vue源码学习（三）
date: 2020-10-20 09:47:00
categories: Vue
---
# Vue源码学习（三）
* Array.prototype.concat.apply
* 模板编译
* 简述 Vue 首次渲染过程
* 简述 Vue 首次模板编译过程

## Array.prototype.concat.apply

* 如果`concat方法`的`参数`是一个元素，该元素会被直接插入到新数组中；如果参数是一个`数组`，`该数组的各个元素`将被插入到`新数组`中；将该特性应用到代码中完成数组降维

```js
// vue 源码中的一段
function simpleNormalizeChildren (children: any) {
    for (let i = 0; i < children.length; i++) {
        // 如果第 i 项是数组则降维
        if (Array.isArray(children[i])) {
            return Array.prototype.concat.apply([], children)
        }
    }
    return children
}

// 测试
let children = [1, 2, 3, [4, 5, 6], 7, 8, [9, 10]];
simpleNormalizeChildren(children);
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

## 模板编译

* 模板编译的主要目的是将模板 (template) 转换为渲染函数 (render)

```html
<div> 
    <h1 @click="handler">title</h1> 
    <p>some content</p> 
</div>
```

* 渲染函数 render

```js
render (h) { 
    return h('div', [ 
        h('h1', { on: { click: this.handler} }, 'title'), 
        h('p', 'some content') 
    ]) 
}
```

* 模板编译的作用
  * Vue 2.x 使用 VNode 描述视图以及各种交互，用户自己编写 VNode 比较复杂
  * 用户只需要编写类似 HTML 的代码 - Vue 模板，通过编译器将模板转换为返回 VNode 的 render 函数
  * .vue 文件会被 webpack 在构建的过程中转换成 render 函数（Vue-loader）

* 在线编译
  * vue2.xx版本在线编译:https://template-explorer.vuejs.org/#
  * vue3.xx版本在线编译:https://vue-next-template-explorer.netlify.app/#

## 简述 Vue 首次渲染过程

参考[大前端学习-Vue首次渲染过程](https://blog.csdn.net/sinat_35349493/article/details/107684898)

## 简述 Vue 首次模板编译过程

参考[Vue 中模板的编译过程概述](https://blog.csdn.net/weixin_40599109/article/details/107645458?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.add_param_isCf&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.add_param_isCf)