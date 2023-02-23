---
title: DFS、BFS
date: 2020-10-29 09:52:01
categories: 算法
---
# DFS、BFS
* 深度优先遍历
* 广度优先遍历
* 求根到叶子节点数字之和（DFS）
* 路径总和
* 岛屿数量
* 岛屿最大面积
* 单词接龙（BFS）
* N叉树的最大深度（BFS）
* 打家劫舍三（DFS）

## 深度优先，广度优先（层次遍历）

```js
//深度优先的递归实现
function deepTraversal(node,nodeList) {  
    if (node) {    
            nodeList.push(node);    
            var children = node.children;    
            for (var i = 0; i < children.length; i++) 
      //每次递归的时候将  需要遍历的节点  和 节点所存储的数组传下去
                deepTraversal(children[i],nodeList);    
        }    
    return nodeList;  
} 

// 深度优先非递归
function deepTraversal(node) {  
    const res = []
    const stack = []
    stack.push(node)
    while (stack.length) {
        let tmp = stack.pop()
        res.push(tmp)
        let childrenList = tmp.children
        for (let i = 0; i < childrenList.length; i++) {
            stack.push(childrenList[i])
        }
    }
    return res
}

// 广度非递归
function wideTraversal(node) {
    const res = []
    const queue = []
    queue.push(node)
    while (queue.length) {
        let tmp = queue.shift()
        res.push(tmp)
        let childrenList = tmp.children
        for (let i = 0; i < childrenList.length; i++) {
            queue.push(childrenList[i])
        }
    }
    return res
}
```

## 求根到叶子节点数字之和

* [leetcode129](https://leetcode-cn.com/problems/sum-root-to-leaf-numbers/)

> 给定一个二叉树，它的每个结点都存放一个 0-9 的数字，每条从根到叶子节点的路径都代表一个数字。
> 例如，从根到叶子节点路径 1->2->3 代表数字 123。
> 计算从根到叶子节点生成的所有数字之和。
> 说明: 叶子节点是指没有子节点的节点。
>
> 示例 1:
> 输入: [1,2,3]
>     1
>    / \
>   2   3
> 输出: 25
> 解释:
> 从根到叶子节点路径 1->2 代表数字 12.
> 从根到叶子节点路径 1->3 代表数字 13.
> 因此，数字总和 = 12 + 13 = 25.
>
> 示例 2:
> 输入: [4,9,0,5,1]
>     4
>    / \
>   9   0
>  / \
> 5   1
> 输出: 1026
> 解释:
> 从根到叶子节点路径 4->9->5 代表数字 495.
> 从根到叶子节点路径 4->9->1 代表数字 491.
> 从根到叶子节点路径 4->0 代表数字 40.
> 因此，数字总和 = 495 + 491 + 40 = 1026.

* 从根节点开始，遍历每个节点，如果遇到叶子节点，则将叶子节点对应的数字加到数字之和。如果当前节点不是叶子节点，则计算其子节点对应的数字，然后对子节点递归遍历。

```js
var sumNumbers = function(root) {
    const dfs = function(root, num) {
        // 若节点是 null 直接返回 0
        if (!root) {
            return 0;
        }
        // 不是空节点就计算一下加到目前的值
        num = num * 10 + root.val;
        // 若是根节点返回该计算值，一条路就走完了
        if (root.left === null && root.right === null) {
            return num;
        }
        // 不是根节点则递归遍历
        else {
            return dfs(root.left, num) + dfs(root.right, num);
        }
    }
    return dfs(root, 0);
};
```

## 路径总和

* [leetcode112](https://leetcode-cn.com/problems/path-sum/)

```js
var hasPathSum = function(root, targetSum) {
    const res = [];
    const dfs = function(root, num) {
        if (!root) {
            return;
        }
        num = num + root.val;
        if (root.left === null && root.right === null) {
            res.push(num);
        }
        else {
            dfs(root.left, num);
            dfs(root.right, num);
        }
    }
    dfs(root, 0);
    return res.includes(targetSum);
};
```

## 岛屿数量

* [leetcode200](https://leetcode-cn.com/problems/number-of-islands/)
* 思路：从为"1"的开始，向四周dfs，把遇到的"1"变为"0"

```js
var numIslands = function(grid) {
    const m = grid.length;
    const n = grid[0].length;
    const dfs = function(i, j) {
        if (i < 0 || j < 0 || i > m - 1 || j > n - 1 || grid[i][j] === '0') {
            return;
        }
        grid[i][j] = '0';
        dfs(i - 1, j);
        dfs(i + 1, j);
        dfs(i, j + 1);
        dfs(i, j - 1);
    };

    let count = 0;
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === '1') {
                dfs(i, j);
                count++;
            }
        }
    }
    return count;
};
```

## 岛屿最大面积

* [leetcode695](https://leetcode-cn.com/problems/max-area-of-island/)
* 思路：和上题一样，在dfs的过程中计算面积即可

```js
var numIslands = function(grid) {
    const m = grid.length;
    const n = grid[0].length;
    const dfs = function(i, j) {
        if (i < 0 || j < 0 || i > m - 1 || j > n - 1 || grid[i][j] === '0') {
            return;
        }
        grid[i][j] = '0';
        dfs(i - 1, j);
        dfs(i + 1, j);
        dfs(i, j + 1);
        dfs(i, j - 1);
    };

    let count = 0;
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === '1') {
                dfs(i, j);
                count++;
            }
        }
    }
    return count;
};
```

## 单词接龙

* 题目来源：[leetcode127](https://leetcode-cn.com/problems/word-ladder/)

> 给定两个单词（beginWord 和 endWord）和一个字典，找到从 beginWord 到 endWord 的最短转换序列的长度。转换需遵循如下规则：
>
> 每次转换只能改变一个字母。
> 转换过程中的中间单词必须是字典中的单词。
> 说明:
>
> 如果不存在这样的转换序列，返回 0。
> 所有单词具有相同的长度。
> 所有单词只由小写字母组成。
> 字典中不存在重复的单词。
> 你可以假设 beginWord 和 endWord 是非空的，且二者不相同。
>
> 示例 1:
> 输入:
> beginWord = "hit",
> endWord = "cog",
> wordList = ["hot","dot","dog","lot","log","cog"]
> 输出: 5
> 解释: 一个最短转换序列是 "hit" -> "hot" -> "dot" -> "dog" -> "cog",
>      返回它的长度 5。
>      
> 示例 2:
> 输入:
> beginWord = "hit"
> endWord = "cog"
> wordList = ["hot","dot","dog","lot","log"]
> 输出: 0
> 解释: endWord "cog" 不在字典中，所以无法进行转换。

* 抽象为图，若两个单词可以转换，则连一条双向边，BFS求起点到终点最短路径
* 优化为：求图的最短路径，使用队列 + BFS 实现
* 参考题解：[BFS的应用](https://leetcode-cn.com/problems/word-ladder/solution/bfs-de-ying-yong-by-muyunyun/)

```js
var ladderLength = function(beginWord, endWord, wordList) {
    if (!wordList.includes(endWord)) return 0
    let queue = []
    // 用一个对象维护当前节点是否访问过
    let visitedObj = {
        beginWord: true
    }
    // 用 level 记录当前路径长度
    queue.push({ word: beginWord, level: 1 })
    // 队列实现 BFS
    while (queue.length) {
        let { word, level } = queue.shift()
        if (visitedObj[word]) continue
        for (let i = 0; i < wordList.length; i++) {
            // 若只有一个字母不同则证明是相邻两边，入队列
            if (isOneDiff(word, wordList[i])) {
                if (wordList[i] == endWord) {
                    return level + 1
                }
                queue.push({ word: wordList[i], level: level + 1 })
                visitedObj[word] = true
            }
        }
    }
    return 0
}


// 判断两个单词是否只有一个字母不同
function isOneDiff(source, target) {
    let diff = 0
    for (let i = 0; i < source.length; i++) {
        if (source[i] !== target[i]) {
            diff ++
        }
    }
    if (diff === 1) {
        return true
    } else {
        return false
    }
}
```

## N叉树的最大深度

* 题目来源:[leetcode559](https://leetcode-cn.com/problems/maximum-depth-of-n-ary-tree/)

> 给定一个 N 叉树，找到其最大深度。
>
> 最大深度是指从根节点到最远叶子节点的最长路径上的节点总数。

```js
// BFS
var maxDepth = function(root) {
    if (root === null) return 0
    if (root.children.length === 0) return 1
    let queue = []
    let depthArr = []
    queue.push({ node: root, depth: 1 })
    while (queue.length) {
        const { node, depth } = queue.shift()
        for (let i = 0; i < node.children.length; i++) {
            if (node.children[i].children.length === 0) {
                depthArr.push(depth + 1)
                continue
            }
            queue.push({ node: node.children[i], depth: depth + 1 })
        }
    }
    return Math.max(...depthArr)
};

// 递归
var maxDepth = function(root) {
    if (!root) {
        return 0;
    }
    let depth = 0;
    for (let i = 0; i < root.children.length; i++) {
        depth = Math.max(depth, maxDepth(root.children[i]));
    }
    return 1 + depth;
};
```

## 打家劫舍iii（DFS）

* [Leetcode337](https://leetcode-cn.com/problems/house-robber-iii/)
* 每个节点都设置：**[不偷, 偷]**
* 当前节点被偷时，其左右孩子不能偷
* 当前节点未被偷时，其左右孩子可以偷，也可以不偷，取 **[不偷, 偷]** 的较大者

```js
var rob = function(root) {
    let res = dfs(root);
    return Math.max(res[0], res[1]);
};

function dfs(root) {
    // [不偷, 偷]
    let res = [0,0];
    if (root === null) return res;
    // left 为 root 左侧子节点的[不偷值, 偷值]
    let left = dfs(root.left); 
  	// right 为 root 右侧子节点的[不偷值, 偷值]
    let right = dfs(root.right); 
    // 每一个节点的不偷值都是： 左侧子节点的最大值 + 右侧子节点的最大值
    res[0] = Math.max(...left) + Math.max(...right);
    // 每一个节点的偷值都是：左侧子节点的不偷值 + 右侧子节点的不偷值 + 该节点的值
    res[1] = root.val + left[0] + right[0];
    return res;
}
```

