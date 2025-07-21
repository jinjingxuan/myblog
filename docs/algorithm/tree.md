---
title: 二叉树相关
date: 2020-12-29 09:52:01
categories: 算法
---
# 二叉树相关
* 二叉树的前序遍历，中序遍历，后序遍历的递归与非递归
* 判断二叉树是否相同
* 判断二叉树是否对称
* 合并二叉树
* 求二叉树的深度
* 翻转二叉树
* 二叉树的层次遍历
* 有序数组转二叉搜索树
* 验证二叉搜索树
* 判断平衡二叉树
* 验证前序序列
* 求二叉树的宽度
* 前序中序构造二叉树
* 二叉树的右视图
* 二叉树展开为链表
* 最近公共祖先
* 根据边构造二叉树
* 扁平数据结构转Tree

## 二叉树的前序遍历，中序遍历，后序遍历的递归与非递归

* [前序遍历](https://leetcode.cn/problems/binary-tree-preorder-traversal/)
* [中序遍历](https://leetcode.cn/problems/binary-tree-inorder-traversal/)
* [后序遍历](https://leetcode.cn/problems/binary-tree-postorder-traversal/)

给一棵二叉树

```js
var root = {
val: 1,
left: {
    val: 2,
    left: {
      val: 4,
    },
    right:{
      val:5
    }
},
right: {
    val: 3,
    left: {
      val: 6
    },
    right: {
      val: 7
    }
}
}
```

```js
function TreeNode(val) {  // 树节点构造方式
    this.val = val;
    this.left = null;
    this.right = null;
}

//先序递归
var preorderTraversal = function(root) {
    const res = []; 
    function DLR (root) {
      if (root) {
          res.push(root.val);
          DLR(root.left);
          DLR(root.right);
      }
  	}
    DLR(root);
    return res;
};

//中序递归
var inorderTraversal = function(root) {
    const res = []; 
    function LDR (root) {
    	if (root) {
        LDR(root.left);//先遍历到最左边的节点，然后输出
        res.push(root.val);
        LDR(root.right);
      }
    }
    LDR(root);
    return res;
};

//后序递归
var postorderTraversal = function(root) {
    const res = []; 
    function LRD (root) {
      if(root){
        LRD(root.left);
        LRD(root.right);
        res.push(root.val);
      }
    }
    LRD(root);
    return res;
};

//先序非递归
var preorderTraversal = function(root) {
    if (!root) return [];
    const stack = [];
    const res = [];
    stack.push(root);
    while (stack.length) {
        const tmp = stack.pop();
        res.push(tmp.val);
        if (tmp.right) stack.push(tmp.right);
        if (tmp.left) stack.push(tmp.left);
    } 
    return res;
};

//中序非递归
var inorderTraversal = function(root) {
    if (!root) return [];
    const stack = [];
    const res= [];
    while (true) {
        while (root) {
            stack.push(root);
            root = root.left;
        }
        if (stack.length === 0) break;
        const tmp = stack.pop();
        res.push(tmp.val);
        root = tmp.right;
    }
    return res;
};

//后序非递归
var postorderTraversal = function(root) {
    if (!root) return [];
    const stack = [];
    const res = [];
    stack.push(root);
    while (stack.length) {
        const tmp = stack.pop();
        res.push(tmp.val);
        if (tmp.left) stack.push(tmp.left);
        if (tmp.right) stack.push(tmp.right);
    } 
    return res.reverse();
};
```

## 相同的树

[leetcode100](https://leetcode-cn.com/problems/same-tree/)

```js
var isSameTree = function(p, q) {
    if (!p && !q) {
        return true;
    }
    else if ((!p && q) || (p && !q)) {
        return false;
    }
    else if (p.val !== q.val) {
        return false;
    }
    else {
        return isSameTree(p.left, q.left) && isSameTree(p.right, q.right)
    }
};
```

## 判断二叉树是否对称

* [leetcode101](https://leetcode-cn.com/problems/symmetric-tree/submissions/)

```js
给定一个二叉树，检查它是否是镜像对称的。

 

例如，二叉树 [1,2,2,3,4,4,3] 是对称的。

    1
   / \
  2   2
 / \ / \
3  4 4  3
 

但是下面这个 [1,2,2,null,3,null,3] 则不是镜像对称的:

    1
   / \
  2   2
   \   \
   3    3
```

* 和上题类似，把根节点拿掉，就是判断两个树的关系

```js
var isSymmetric = function(root) {
    let p = root.left;
    let q = root.right;
    const fn = (p, q) => {
        if (!p && !q) return true;
        else if ((p && !q) || (!p && q)) return false;
        else if (p.val !== q.val) return false;
        else return fn(p.left, q.right) && fn(p.right, q.left);
    }
    return fn(p, q);
};
```

## 合并二叉树

* [leetcode617](https://leetcode-cn.com/problems/merge-two-binary-trees/)

```js
var mergeTrees = function(root1, root2) {
    // 有一个树为 null 就直接替换
    if (!root1 || !root2) return root1 || root2;
    else {
        root1.val = root1.val + root2.val;
        root1.left = mergeTrees(root1.left, root2.left);
        root1.right = mergeTrees(root1.right, root2.right);
    }
    return root1;
};
```

## 求二叉树的深度(最大，最小)

* [leetcode104](https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/)
* [leetcode111](https://leetcode-cn.com/problems/minimum-depth-of-binary-tree/)

```js
给定一个二叉树，找出其最大深度。

二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。

说明: 叶子节点是指没有子节点的节点。

示例：
给定二叉树 [3,9,20,null,null,15,7]，

    3
   / \
  9  20
    /  \
   15   7
返回它的最大深度 3 。
```

```js
// 递归
var maxDepth = function(root) {
    if (!root) return 0;
    else return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}

// BFS
var maxDepth = function(root) {
    if (!root) return 0;
    const queue = [root];
    let depth = 0;
    while (queue.length) {
        const len = queue.length;
        for (let i = 0; i < len; i++) {
            const tmp = queue.shift();
            if (tmp.left) queue.push(tmp.left);
            if (tmp.right) queue.push(tmp.right);
        }
        depth++;
    }
    return depth;
}
```

给定一个二叉树，找出其最小深度。

最小深度是从根节点到最近叶子节点的最短路径上的节点数量。

说明: 叶子节点是指没有子节点的节点。

示例:

给定二叉树 [3,9,20,null,null,15,7],

```js
    3
   / \
  9  20
    /  \
   15   7

返回它的最小深度  2.
```

```js
// 递归
// 对比最大深度，需要考虑斜着下来的树，例如left为null时，左侧虽然深度为0，但没有叶子结点，所以需要去计算右侧的深度
var minDepth = function(root) {
    if (!root) return 0;
    else if (!root.left) return 1 + minDepth(root.right);
    else if (!root.right) return 1 + minDepth(root.left);
    else return 1 + Math.min(minDepth(root.left), minDepth(root.right));
}

// 优化后
var minDepth = function(root) {
    if (!root) return 0;
    else if (!root.left || !root.right) return minDepth(root.left) + minDepth(root.right) + 1;
    else return 1 + Math.min(minDepth(root.left), minDepth(root.right));
};

// BFS
var minDepth = function(root) {
    if (!root) return 0;
    const queue = [root];
    let depth = 1;
    while (queue.length) {
        const len = queue.length;
        for (let i = 0; i < len; i++) {
            const tmp = queue.shift();
            // 遍历到一层时，只要该层有叶子节点则返回最小值
            if (!tmp.left && !tmp.right) return depth;
            if (tmp.left) queue.push(tmp.left);
            if (tmp.right) queue.push(tmp.right);
        }
        depth++;
    }
}
```

## 翻转二叉树

* [leetcode226](https://leetcode-cn.com/problems/invert-binary-tree/)

```js
var invertTree = function(root) {
    if (!root) return null;
    [root.left, root.right] = [root.right, root.left];
    invertTree(root.left);
    invertTree(root.right);
    return root;
};
```

##  二叉树的层次遍历

* [leetcode102](https://leetcode-cn.com/problems/binary-tree-level-order-traversal/)

```js
// 队列
var levelOrder = function(root) {
    if (!root) {
        return [];
    }
    const res = [];
    const queue = [root];
    while (queue.length) {
        const len = queue.length;
        const arr = [];
        for (let i = 0; i < len; i++) {
            const tmp = queue.shift();
            arr.push(tmp.val);
            if (tmp.left) {
                queue.push(tmp.left);
            }
            if (tmp.right) {
                queue.push(tmp.right);
            }
        }
        res.push(arr);
    }
    return res;
};

// 改变题型，输出二维数组
// leetcode 102

二叉树：[3,9,20,null,null,15,7],

    3
   / \
  9  20
    /  \
   15   7
返回其层次遍历结果：

[
  [3],
  [9,20],
  [15,7]
]

var levelOrder = function(root) {
    let queue = [], arr = [], res = []
    if (root !== null) queue.push(root)
    while (queue.length !== 0) {
        const len = queue.length // 一定要暂存长度，不然后面push的时候会改变queue的长度
        for (let i = 0; i < len; i++) {
            const node = queue.shift()
            arr.push(node.val)
            if (node.left) queue.push(node.left)
            if (node.right) queue.push(node.right)
        }
        res.push(arr)
        arr = []
    }
    return res
};
```

## 有序数组转二叉搜索树

* [leetcode108](https://leetcode-cn.com/problems/convert-sorted-array-to-binary-search-tree/)

将一个按照升序排列的有序数组，转换为一棵高度平衡二叉搜索树。

本题中，一个高度平衡二叉树是指一个二叉树每个节点 的左右两个子树的高度差的绝对值不超过 1。

示例:

```js
给定有序数组: [-10,-3,0,5,9],

一个可能的答案是：[0,-3,9,-10,null,5]，它可以表示下面这个高度平衡二叉搜索树：

      0
     / \
   -3   9
   /   /
 -10  5
```

* 每次取中间的值作为根节点

```js
var sortedArrayToBST = function(nums) {
    if(nums.length === 0) return null
    let mid = parseInt(nums.length / 2)
    let root = new TreeNode(nums[mid])
    root.left = sortedArrayToBST(nums.slice(0, mid))
    root.right = sortedArrayToBST(nums.slice(mid + 1))
    return root
};

// parseInt(nums.length / 2)      =>     nums.length >> 1
```

## 有序链表转二叉搜索树

* [leetcode109](https://leetcode-cn.com/problems/convert-sorted-list-to-binary-search-tree/)
* 首先将链表转数组，再按上题做

```js
var sortedListToBST = function(head) {
    const arr = []
    while (head) {
        arr.push(head.val)
        head = head.next
    }
    return sortedArrayToBST(arr)
};
```

## 验证二叉搜索树

* [leetcode98](https://leetcode-cn.com/problems/validate-binary-search-tree/)

> 给定一个二叉树，判断其是否是一个有效的二叉搜索树。
>
> 假设一个二叉搜索树具有如下特征：
>
> 节点的左子树只包含小于当前节点的数。
> 节点的右子树只包含大于当前节点的数。
> 所有左子树和右子树自身必须也是二叉搜索树。

```js
// 结合中序遍历即可
var isValidBST = function(root) {
    const res = [-Infinity];
    const stack = [];
    while (true) {
        while (root) {
            stack.push(root);
            root = root.left;
        }
        if (!stack.length) break;
        const tmp = stack.pop();
        if (tmp.val <= res[res.length - 1]) return false;
        res.push(tmp.val);
        root = tmp.right;
    }
    return true;
}
```

## 判断平衡二叉树

```js
var isBalanced = function(root) {
    let flag = true; // 先把所有二叉树先当做平衡二叉树
    function maxHeight (r) {
        if(!r) return 0;//当节点不存在时，高度为0
        let left = maxHeight(r.left);
        let right = maxHeight(r.right);//dfs常规操作,求出左右子树高度
        if(Math.abs(left-right)>1){
            flag = false;//高度差超过1时，非平衡二叉树，直接false
        }
        return Math.max(left,right)+1 // 这里加1是因为要把父节点高度算进去
    };
    maxHeight(root);
    return flag;
};
```

## 验证前序序列

[leetcode331](https://leetcode-cn.com/problems/verify-preorder-serialization-of-a-binary-tree/)

```js
序列化二叉树的一种方法是使用前序遍历。当我们遇到一个非空节点时，我们可以记录下这个节点的值。如果它是一个空节点，我们可以使用一个标记值记录，例如 #。

     _9_
    /   \
   3     2
  / \   / \
 4   1  #  6
/ \ / \   / \
# # # #   # #

示例 1:
输入: "9,3,4,#,#,1,#,#,2,#,6,#,#"
输出: true

示例 2:
输入: "1,#"
输出: false

示例 3:
输入: "9,#,#,1"
输出: false
```

* [题解](https://leetcode-cn.com/problems/verify-preorder-serialization-of-a-binary-tree/solution/yan-zheng-er-cha-shu-de-qian-xu-xu-lie-hua-by-leet/)

* 初始化可用槽位：slots = 1。

* 根据逗号分隔前序序列化，将结果数组存储，随后遍历该数组：

  * 空节点和非空节点都消耗一个槽位：slots = slot - 1.

  * 如果当前的可用槽位是负数，那么这个前序序列化是非法的，返回 False。

  * 非空节点（node != '#'）新增两个可用槽位：slots = slots + 2.

* 如果所有的槽位都消耗完，那么这个前序序列化就是合法的：返回 slots == 0。

```js
		isValidSerialization (preorder) {
            // "9,3,4,#,#,1,#,#,2,#,6,#,#"
            let slot = 1
            let arr = preorder.split(",")
            for (let i in arr) {
                slot--
                if (slot < 0) return false
                if (arr[i] !== "#") {
                    slot += 2
                }
            }
            return slot === 0
        }
```

## 求二叉树的宽度

* [leetcode662](https://leetcode-cn.com/problems/maximum-width-of-binary-tree/)
* 思路：层次遍历，记录每层的宽度
* 左孩子的索引值为 `index *  2 + 1`，右孩子的索引值为`index * 2 + 2`，利用节点值来记录索引值
* 为了防止无限乘2超出范围，每层索引都减去该层第一个索引的值

```js
var widthOfBinaryTree = function(root) {
    if (!root) return [];
    const stack = [root];
    let res = 0n; // 防止计算溢出, 均用BigInt类型表示
    root.val = 0n;
    while (stack.length) {
        const len = stack.length;
        const left = stack[0].val;
        const right = stack[len - 1].val;
        if (right - left + 1n > res) {
            res = right - left + 1n;
        }
        for (let i = 0; i < len; i++) {
            const tmp = stack.shift();
            if (tmp.left) {
                stack.push(tmp.left)
                tmp.left.val = 2n * tmp.val
            }
            if (tmp.right) {
                stack.push(tmp.right)
                tmp.right.val = 2n * tmp.val + 1n
            }
        }
    }
    return Number(res);
};
```

## 前序中序构造二叉树

* [leetcode105](https://leetcode-cn.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/)

> 根据一棵树的前序遍历与中序遍历构造二叉树。
>
> 注意:
> 你可以假设树中没有重复的元素。
>
> 例如，给出
>
> 前序遍历 preorder = [3,9,20,15,7]
> 中序遍历 inorder = [9,3,15,20,7]
> 返回如下的二叉树：
>
> ​    3
>
>    / \
>   9  20
>     /  \
>    15   7

```js
var buildTree = function(preorder, inorder) {
    if (!preorder.length) return null;
    const root = new TreeNode(preorder[0]);
    const mid = inorder.indexOf(preorder[0]);
    root.left = buildTree(preorder.slice(1, 1 + mid), inorder.slice(0, mid));
    root.right = buildTree(preorder.slice(1 + mid), inorder.slice(mid + 1));
    return root;
};
```

## 二叉树的右视图

* [leetcode199](https://leetcode-cn.com/problems/binary-tree-right-side-view/)

```js
输入: [1,2,3,null,5,null,4]
输出: [1, 3, 4]
解释:

   1            <---
 /   \
2     3         <---
 \     \
  5     4       <---
```

* 层次遍历记录每层最后一个就好

```js
var rightSideView = function(root) {
    if (!root) {
        return [];
    }
    const queue = [root];
    const res = [];
    while (queue.length) {
        const len = queue.length;
        for (let i = 0; i < len; i++) {
            const tmp = queue.shift();
            if (i === len - 1) {
                res.push(tmp.val);
            }
            if (tmp.left) {
                queue.push(tmp.left);
            } 
            if (tmp.right) {
                queue.push(tmp.right);
            } 
        }
    }
    return res;
};
```

## 二叉树展开为链表

* [leetcode114](https://leetcode-cn.com/problems/flatten-binary-tree-to-linked-list/)

```js
给你二叉树的根结点 root ，请你将它展开为一个单链表：

展开后的单链表应该同样使用 TreeNode ，其中 right 子指针指向链表中下一个结点，而左子指针始终为 null 。
展开后的单链表应该与二叉树 先序遍历 顺序相同。
```

* 先序遍历后构造链表（一定要手写一下，构造链表很容易出错）

```js
var flatten = function(root) {
    const stack = []
    const arr = []
    if (root !== null) stack.push(root)
    while (stack.length) {
        let tmp = stack.pop()
        arr.push(tmp)
        if (tmp.right !== null) stack.push(tmp.right)
        if (tmp.left !== null) stack.push(tmp.left)
    }
    for (let i = 1; i < arr.length; i++) {
        const prev = arr[i - 1], curr = arr[i]
        prev.left = null
        prev.right = curr
    }
};
```

## 最近公共祖先

* [leetcode236](https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-tree/)
* [视频讲解](https://www.bilibili.com/video/BV1W44y1Z7AR/?vd_source=97847e8b8c5d751e295339f7abf09033)

```js
var lowestCommonAncestor = function(root, p, q) {
    if (root === null || root === p || root === q) {
        return root;
    }
    const left = lowestCommonAncestor(root.left, p, q);
    const right = lowestCommonAncestor(root.right, p, q);
    // 左右子树都找到，说明左子树和右子树各有一个寻找的节点，此时 root 就是最近公共祖先
    if (left && right) {
        return root;
    }
    // 只有左子树找到, 返回递归左子树的结果
    else if (left) {
        return left;
    }
    // 只有右子树找到, 返回递归右子树的结果
    else if (right) {
        return right;
    }
};
```

## 根据边构造二叉树

```js
[[1, 2], [1, 3], [3, 4], [3, 5], [1, 6]]

{  
    value: 1,
    children: [
   		{ value:2, children: []},
     	{ 
          value: 3,
       	  children: [{ value: 4, children:[]}, { value: 5, children:[]}]
        },
   		{ value:6, children: []},
	]
}
```
```js
// O(2n)
function build(sides) {
    const map = {};
    // 找到根节点
    const pids = sides.map(s => s[0]);
    const ids = sides.map(s => s[1]);
    const root = pids.find(p => !ids.includes(p));
    // 初始化 map
    for (const side of sides) {
        for (const id of side) {
            map[id] = {val: id, children: []};
        }
    }
    // 根据边构造
    for (const side of sides) {
        const pid = side[0];
        const id = side[1];
        const node = map[id];
        map[pid].children.push(node);
    }
    return map[root];
}

// O(n): 边遍历边初始化 map
function builds(sides) {
    const map = {};
    // 找到根节点
    const pids = sides.map(s => s[0]);
    const ids = sides.map(s => s[1]);
    const root = pids.find(p => !ids.includes(p));
    for (const side of sides) {
        const pid = side[0];
        const id = side[1];
        if (!map[id]) {
            map[id] = {val: id, children: []};
        }
        const node = map[id];
        if (!map[pid]) {
            map[pid] = {val: pid, children: []};
        }
        map[pid].children.push(node);
    }
    return map[root];
}
```

## 扁平数据结构转Tree
```js
// 输入
[
    {id: 1, name: '部门1', pid: 0},
    {id: 2, name: '部门2', pid: 1},
    {id: 3, name: '部门3', pid: 1},
    {id: 4, name: '部门4', pid: 3},
    {id: 5, name: '部门5', pid: 4},
]
// 输出
[
    {
        "id": 1,
        "name": "部门1",
        "pid": 0,
        "children": [
            {
                "id": 2,
                "name": "部门2",
                "pid": 1,
                "children": []
            },
            {
                "id": 3,
                "name": "部门3",
                "pid": 1,
                "children": [
                    // 结果 ,,,
                ]
            }
        ]
    }
]
```
```js
// 递归
const fn = function(arr, id) {
    const nodes = arr.filter(item => item.pid === id);
    const res = [];
    nodes.forEach(n => {
        res.push({
            ...n,
            children: this.fn(arr, n.id),
        })
    })
    return res;
}
fn(arr, 0);

// 非递归 O(2n)
fn(arr) {
    const result = [];
    const map = {};
    // 初始化 map
    for (const item of arr) {
        map[item.id] = {
            ...item,
            children: [],
        };
    }
    for(const item of arr) {
        const node = map[item.id];
        if (item.pid === 0) {
            result.push(node);
        }
        else {
            map[item.pid].children.push(node);
        }
    }
    return result;
}
fn(arr);

// 非递归 O(n): 边遍历边初始化 map
fn(arr) {
    const result = [];
    const map = {};
    for(const item of arr) {
        if (!map[item.id]) {
            map[item.id] = {
                ...item,
                children: [],
            };
        }
        const node = map[item.id];
        if (item.pid === 0) {
            result.push(node);
        }
        else {
            if (!map[item.pid]) {
                map[item.pid] = {
                    ...item,
                    children: [],
                };
            }
            map[item.pid].children.push(node);
        }
    }
    return result;
}
```