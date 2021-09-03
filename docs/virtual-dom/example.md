---
title: 模拟实现snbbDom排行实例
date: 2020-10-09 14:47:00
categories: VirtualDOM
---
# 模拟实现snbbDom排行实例
* 官网示例：http://snabbdom.github.io/snabbdom/examples/reorder-animation/
* 代码地址：https://github.com/jinjingxuan/part3_module1_task/tree/master/code_3
* 构建工具 parcel

## parcel

parcel 官网：https://zh.parceljs.org/getting_started.html

安装流程

```js
npm install -g parcel-bundler
```

在你正在使用的项目目录下创建一个 package.json 文件：

```
npm init -y
```

Parcel 内置了一个当你改变文件时能够自动重新构建应用的开发服务器，而且为了实现快速开发，该开发服务器支持[热模块替换](https://zh.parceljs.org/hmr.html)。只需要在入口文件指出：

```js
parcel index.html
```

## 安装 snabbdom

```js
cnpm i -D snabbdom
```

## 实现

github地址：https://github.com/jinjingxuan/part3_module1_task/tree/master/code_3

* 关键代码

```js
import { Data } from './Data.js'
import { init } from "snabbdom/build/package/init";
import { styleModule } from "snabbdom/build/package/modules/style";
import { eventListenersModule } from "snabbdom/build/package/modules/eventlisteners";
import { h } from "snabbdom/build/package/h";

var patch = init([styleModule, eventListenersModule]);
var container = document.getElementById("app");

// title
var title = function () {
    return h("h2", {}, "Top 10 movies")
}

// list-item
var item = function (itemIdx, itemData) {
    return h("li", { 
        style: { 
            listStyle: "none", 
            display: "flex",
            marginTop: "20px"
        }
    }, [
        h("div", {
            style: { 
                width: "5%"
            }
        }, itemData.rank),
        h("div", {
            style: { 
                width: "30%"
            }
        }, itemData.title),
        h("div", {
            style: { 
                width: "65%"
            }
        }, itemData.desc)
    ]);
};

// list
var list = function () {
    let items = [];
    for (let i = 0; i < Data.length; i++) {
        items.push(item(i, Data[i]));
    }
    return h("ul", {
        style: {
            padding: "0",
        }
    }, items);
};

// btns
var btns = function () {
    return h("div", { style: { float: "left", display: "flex" } }, [
        h("span", {}, "Sort by:"),
        h(
            "div",
            {
                style: {
                    marginLeft: "20px"
                },
                on: {
                    click: sortByRank,
                },
            },
            "Rank"
        ),
        h(
            "div",
            {
                style: {
                    marginLeft: "20px"
                },
                on: {
                    click: sortByTitle,
                },
            },
            "Title"
        ),
        h(
            "div",
            {
                style: {
                    marginLeft: "20px"
                },
                on: {
                    click: sortByDes,
                },
            },
            "Description"
        ),
    ]);
};

// clearBoth
var clear = h("div", { style: { clear: "both" } });

// 主节点
var pageNode = function () {
    return h(
        "div#main",
        {
            style: {
                width: "800px",
                paddingTop: "30px",
                margin: "0 auto",
            },
        },
        [title(), btns(), clear, list()]
    );
};

// 首次渲染保存当前节点为老节点
var oldPageNode = patch(container, pageNode());

// 刷新节点，并重新保存老节点
function updateNode() {
    oldPageNode = patch(oldPageNode, pageNode());
}

function sortByRank() {
    Data.sort((a, b) =>  a.rank - b.rank )
    updateNode();
}

function sortByTitle() {
    Data.sort((a, b) =>  a.title.localeCompare(b.title) )
    updateNode();
}

function sortByDes() {
    Data.sort((a, b) =>  a.desc.localeCompare(b.desc) )
    updateNode();
}

```

