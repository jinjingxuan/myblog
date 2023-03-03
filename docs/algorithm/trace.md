---
title: 回溯算法
date: 2020-11-30 16:00:54
categories: 算法
---
# 回溯算法
* 全排列
* 括号生成
* 电话号码的数字组合
* 子集
* 二维数组全排列
* 组合总和
* 组合总和II
* 单词搜索
* 三角形的最小路径和
* 路径总和
* 路径总和II
* 根节点到叶节点数字之和

## 回溯算法

**解决一个回溯问题，实际上就是一个决策树的遍历过程**。基本原理就是**递归**，用白话解释就是：**从一条路往前走，能进则进，不能进则退回来，换一条路再试。**只需要思考 3 个问题：

1、路径：也就是已经做出的选择。

2、选择列表：也就是你当前可以做的选择。

3、结束条件：也就是到达决策树底层，无法再做选择的条件。

代码方面，回溯算法的框架：

```js
result = []
def backtrack(路径, 选择列表):
    if 满足结束条件:
        result.add(路径)
        return

    for 选择 in 选择列表:
        做选择
        backtrack(路径, 选择列表)
        撤销选择
```

**其核心就是 for 循环里面的递归，在递归调用之前「做选择」，在递归调用之后「撤销选择」**

> 递归，回溯，DFS的区别
>
>
> 递归就是在函数中调用函数本身来解决问题
>
> 回溯就是通过不同的尝试来生成问题的解，有点类似于穷举，但是和穷举不同的是回溯会“剪枝”
>
> 回溯搜索是深度优先搜索（DFS）的一种，回溯和DFS，其主要的区别是，回溯法在求解过程中不保留完整的树结构，而深度优先搜索则记下完整的搜索树。
>

## 全排列

* [Leetcode46](https://leetcode-cn.com/problems/permutations/)

```js
 给定一个 没有重复 数字的序列，返回其所有可能的全排列。
 
 示例:
 输入: [1,2,3]
 输出:
 [
 [1,2,3],
 [1,3,2],
 [2,1,3],
 [2,3,1],
 [3,1,2],
 [3,2,1]
]
```

我们要在这个包含解的空间树上，用 递归的方式搜索出所有的解。

```js
var permute = function(nums) {
    const res = [];
    const backtrack = (path) => {
        if (path.length === nums.length) {
            // slice 的原因是防止 push 到 res 中的结果是引用类型，后面 path 改变时会影响 res
            res.push(path.slice());
        }
        for (const item of nums) {
            if (path.includes(item)) {
                continue;
            }
            path.push(item); // 比如目前 path 是 [1]，push(2), 变成 [1, 2]
            backtrack(path); // 递归到头了：[1,2,3] 就 return 
            path.pop(); // [1,2] pop 变为 [1]， 继续下一轮 for 循环, push(3)
        }
    }
    backtrack([]);
    return res;
};
```

## 括号生成

* [leetcode22](https://leetcode-cn.com/problems/generate-parentheses/)
* [题解](https://leetcode-cn.com/problems/generate-parentheses/solution/shou-hua-tu-jie-gua-hao-sheng-cheng-hui-su-suan-fa/)

```js
数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。

示例：
输入：n = 3
输出：[
       "((()))",
       "(()())",
       "(())()",
       "()(())",
       "()()()"
     ]
```

```js
var generateParenthesis = function(n) {
    const res = [];
    const backtrack = (left, right, path) => {
        if (path.length === 2 * n) {
            res.push(path);
            return;
        }
        if (left > 0) {
            backtrack(left - 1, right, path + '(');
        }
        if (right > left) {
            backtrack(left, right - 1, path + ')');
        }
    }
    backtrack(n, n, '');
    return res;
};
```

## 电话号码的数字组合

* [leetcode17](https://leetcode-cn.com/problems/letter-combinations-of-a-phone-number/)

* [题解](https://leetcode-cn.com/problems/letter-combinations-of-a-phone-number/solution/shou-hua-tu-jie-liang-chong-jie-fa-dfshui-su-bfsya/)

```js
给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。

给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。

示例:
输入："23"
输出：["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"].
```

```js
var letterCombinations = function(digits) {
    if (!digits.length) {
        return [];
    }
    const map = {2: 'abc', 3: 'def', 4: 'ghi', 5: 'jkl', 6: 'mno', 7: 'pqrs', 8: 'tuv', 9: 'wxyz'};
    const res = [];
    const backtrack = (path, i) => {
        if (path.length === digits.length) {
            res.push(path);
            return;
        }
        for (const item of map[digits[i]]) {
            backtrack(path + item, i + 1);
        }
    }
    backtrack('', 0);
    return res;
};
```

## 子集

* [Leetcode78](https://leetcode-cn.com/problems/subsets/)
* [题解](https://leetcode-cn.com/problems/subsets/solution/shou-hua-tu-jie-zi-ji-hui-su-fa-xiang-jie-wei-yun-/)

```js
给定一组不含重复元素的整数数组 nums，返回该数组所有可能的子集（幂集）。

说明：解集不能包含重复的子集。

示例:

输入: nums = [1,2,3]
输出:
[
  [3],
  [1],
  [2],
  [1,2,3],
  [1,3],
  [2,3],
  [1,2],
  []
]
```

```js
var subsets = function(nums) {
    const res = [];
    const backtrack = (path, index) => {
        res.push(path.slice());
        for (let i = index; i < nums.length; i++) {
            path.push(nums[i]);
            backtrack(path, i + 1);
            path.pop();
        }
    }
    backtrack([], 0);
    return res;
};
```

## 子集II

* [leetocode90](https://leetcode-cn.com/problems/subsets-ii/)
* 有重复元素先排序，每次取值时

```js
var subsetsWithDup = function(nums) {
    nums.sort((a, b) => a - b)
    const res = []
    const backTrack = (path, index) => {
        res.push(path.slice())
        for (let i = index; i < nums.length; i++) {
            if (i >= index + 1 && nums[i] === nums[i - 1]) continue
            path.push(nums[i])
            backTrack(path, i + 1)
            path.pop()
        }
    }
    backTrack([], 0)
    return res
};
```

## 二维数组全排列

> var arr = [[‘A’,’B’],[‘a’,’b’],[1,2]]` 
>
> 求二维数组的全排列组合 结果：[Aa1,Aa2,Ab1,Ab2,Ba1,Ba2,Bb1,Bb2]

```js
const fullArray = (arr) => {
    const res = []
    const traceBack = (path, n) => {
        if (path.length === arr.length) {
            res.push(path)
            return
        }
        for (const item of arr[n]) {
            traceBack(path + item, n+1)
        }
    }
    traceBack('', 0)
    return res
}
```

## 组合总和

* [leetcode39](https://leetcode-cn.com/problems/combination-sum/)
* [题解](https://leetcode-cn.com/problems/combination-sum/solution/shou-hua-tu-jie-zu-he-zong-he-combination-sum-by-x/)

> 给定一个无重复元素的数组 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。
>
> candidates 中的数字可以无限制重复被选取。
>
> 说明：
>
> 所有数字（包括 target）都是正整数。
> 解集不能包含重复的组合。 
>
> 示例 1：
>
> 输入：candidates = [2,3,6,7], target = 7,
> 所求解集为：
> [
>   [7],
>   [2,2,3]
> ]
>
> 示例 2：
>
> 输入：candidates = [2,3,5], target = 8,
> 所求解集为：
> [
>   [2,2,2,2],
>   [2,3,3],
>   [3,5]
> ]

```js
var combinationSum = function(candidates, target) {
    const res = [];
    const fn = (path, sum, start) => {
        if (sum > target) {
            return;
        }
        if (sum === target) {
            res.push(path.slice());
            return;
        }
        for (let i = start; i < candidates.length; i++) {
            path.push(candidates[i]);
            fn(path, sum + candidates[i], i);
            path.pop();
        }
    }
    fn([], 0, 0);
    return res;
};
```

## 组合总和II

* [leetcode40](https://leetcode-cn.com/problems/combination-sum-ii/)
* [题解](https://leetcode-cn.com/problems/combination-sum-ii/solution/man-tan-wo-li-jie-de-hui-su-chang-wen-shou-hua-tu-/)

> 接上题，每个数字只可使用一次
>
> **示例 1:**
>
> 输入: candidates = [10,1,2,7,6,1,5], target = 8,
> 所求解集为:
> [
>   [1, 7],
>   [1, 2, 5],
>   [2, 6],
>   [1, 1, 6]
> ]
>
> **示例 2:**
>
> 输入: candidates = [2,5,2,1,2], target = 5,
> 所求解集为:
> [
>   [1,2,2],
>   [5]
> ]

```js
var combinationSum2 = function(candidates, target) {
    candidates = candidates.sort((a, b) => a - b);
    const res = [];
    const fn = (path, sum, start) => {
        if (sum > target) {
            return;
        }
        if (sum === target) {
            res.push(path.slice());
            return;
        }
        for (let i = start; i < candidates.length; i++) {
            // 数组中有重复元素时，当前选项和左邻选项一样，跳过达到去重
            // 比如[1, 2, 2, 3]，选两次2会重复
            if (i > start && candidates[i] === candidates[i - 1]) {
                continue;
            }
            path.push(candidates[i]);
            fn(path, sum + candidates[i], i + 1);
            path.pop();
        }
    }
    fn([], 0, 0);
    return res;
};
```

## 从数组中找n个数求和

```js
let arr = [1, 4, 5, 8, 10, 12], total = 19, n = 3
// 返回结果为 [[1, 8, 10], [4, 5, 10]]

let arr = [1, 4, 5, 8, 10, 12], total = 9, n = 2
// 返回结果为 [[1, 8], [4, 5]]
```

* fn：从 arr 中找出 n 个数使其和为 total
* path: 当前分支
* sum：当前和
* index：当前遍历到的索引，从该索引下一位置开始继续查找，避免结果出现 [1, 8], [8,1]
* 需要考虑的问题
  * 数组元素是否重复：重复的话，需要排序后再算
  * 可否重复选取：`backTrack(path, sum + arr[i], i + 1)`  中`i + 1`为不重复选择，`i`为可以重复选择

```js
const fn = (arr, total, n) => {
    let res = []
    const backTrack = (path, sum, index) => {
        if (path.length > n || sum > total) return
        if (path.length === n && sum === total) {
            res.push(path.slice())
            return
        }
        for (let i = index; i < arr.length; i++) {
            path.push(arr[i])
            backTrack(path, sum + arr[i], i + 1) // i + 1为不重复选择，i为可以重复选择
            path.pop()
        }
    }
    backTrack([], 0, 0)
    return res
}
```

## 单词搜索

* [leetcode79](https://leetcode-cn.com/problems/word-search/)
* [题解](https://leetcode-cn.com/problems/word-search/solution/shou-hua-tu-jie-79-dan-ci-sou-suo-dfs-si-lu-de-cha/)

> 给定一个二维网格和一个单词，找出该单词是否存在于网格中。
>
> 单词必须按照字母顺序，通过相邻的单元格内的字母构成，其中“相邻”单元格是那些水平相邻或垂直相邻的单元格。同一个单元格内的字母不允许被重复使用。
>
> 示例:
>
> board =
> [
>   ['A','B','C','E'],
>   ['S','F','C','S'],
>   ['A','D','E','E']
> ]
>
> 给定 word = "ABCCED", 返回 true
> 给定 word = "SEE", 返回 true
> 给定 word = "ABCB", 返回 false

```js
var exist = function(board, word) {
    const m = board.length
    const n = board[0].length
    const used = Array.from(new Array(m),()=>(new Array(n).fill(0)))
        
    const traceback = (row, col, i) => {
      if (i == word.length) {
        return true
      }
      // 越界
      if (row < 0 || row >= m || col < 0 || col >= n) {
        return false
      }
      // 已访问或不匹配
      if (used[row][col] || board[row][col] != word[i]) {
        return false
      }
      // 匹配记录一下当前点被访问了
      used[row][col] = true
  
      const canFindRest = traceback(row + 1, col, i + 1) || traceback(row - 1, col, i + 1) 					|| traceback(row, col + 1, i + 1) || traceback(row, col - 1, i + 1)
      
      // 能找到路径
      if (canFindRest) {
        return true
      }

      // 找不到路径
      used[row][col] = false
      return false
    }

    // 找入口
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        if (board[i][j] == word[0] && traceback(i, j, 0)) {
          return true; 
        }
      }
    }
    return false
};
```

## 三角形的最小路径和

* [leetcode120](https://leetcode-cn.com/problems/triangle/)

```js
输入：triangle = [[2],[3,4],[6,5,7],[4,1,8,3]]
输出：11
解释：如下面简图所示：
   2
  3 4
 6 5 7
4 1 8 3
自顶向下的最小路径和为 11（即，2 + 3 + 5 + 1 = 11）。
```

```js
var minimumTotal = function(triangle) {
    let res = 999999
    // path: 路径和 | n: 记录第几层 | index: 当前层选中的index
    const backtrack = (path, n, index) => {
        if (n > triangle.length - 1) {
            res = Math.min(res, path)
            return
        }
        backtrack(path + triangle[n][index], n + 1, index)
        backtrack(path + triangle[n][index], n + 1, index + 1)
    }
    backtrack(0, 0, 0)
    return res
};
```

**回溯思路可行，但是给的测试用例会超时，更优的解法应该是[dp](https://jinjingxuan.github.io/2020/11/16/%E7%AE%97%E6%B3%95-%E5%8A%A8%E6%80%81%E8%A7%84%E5%88%92/)**

## 路径总和

* [leetcode112](https://leetcode-cn.com/problems/path-sum/)

> 给你二叉树的根节点 root 和一个表示目标和的整数 targetSum ，判断该树中是否存在 根节点到叶子节点 的路径，这条路径上所有节点值相加等于目标和 targetSum 。
>

```js
// ans 甚至可以求究竟有几条路径
var hasPathSum = function(root, targetSum) {
    if (!root) {
        return 0;
    }
    let res = 0;
    const backtrack = (path, sum) => {
        if (!path.left && !path.right && sum === targetSum) {
            res++;
        }
        if (path.left) {
            backtrack(path.left, sum + path.left.val);
        }
        if (path.right) {
            backtrack(path.right, sum + path.right.val);
        }
    }
    backtrack(root, root.val);
    return res > 0;
};
```

## 路径总和II

* [leetcode113](https://leetcode-cn.com/problems/path-sum-ii/)

```js
给定一个二叉树和一个目标和，找到所有从根节点到叶子节点路径总和等于给定目标和的路径。

示例:
给定如下二叉树，以及目标和 sum = 22，

              5
             / \
            4   8
           /   / \
          11  13  4
         /  \    / \
        7    2  5   1

返回:
[
   [5,4,11,2],
   [5,8,4,5]
]
```

```js
var pathSum = function(root, targetSum) {
    if (!root) {
        return [];
    }
    const res = [];
    const backtrack = (path, sum, arr) => {
        if (!path.left && !path.right && sum === targetSum) {
            res.push(arr.slice());
        }
        if (path.left) {
            arr.push(path.left.val)
            backtrack(path.left, sum + path.left.val, arr);
            arr.pop();
        }
        if (path.right) {
            arr.push(path.right.val)
            backtrack(path.right, sum + path.right.val, arr);
            arr.pop();
        }
    }
    backtrack(root, root.val, [root.val]);
    return res;
};
```

## 根节点到叶节点数字之和

- [leetcode129](https://leetcode-cn.com/problems/sum-root-to-leaf-numbers/)

```js
var sumNumbers = function(root) {
    let res = 0
    const backTrack = (root, num) => {
        if (root.left === null && root.right === null) {
            res += num
        }
        if (root.left !== null) {
            backTrack(root.left, num * 10 + root.left.val)
        }
        if (root.right !== null) {
            backTrack(root.right, num * 10 + root.right.val)
        }
    }
    backTrack(root, root.val)
    return res
};
```

