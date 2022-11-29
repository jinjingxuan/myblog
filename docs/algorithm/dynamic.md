---
title: 动态规划
date: 2020-11-16 16:01:54
categories: 算法
---
# 动态规划
* 爬楼梯
* 零钱兑换
* 最大子序列和
* 最长非重复子串
* 最长重复子数组
* 最长递增子序列
* 最长公共子序列
* 编辑距离
* 最长回文子串
* 不同路径
* 最小路径和
* 正则表达式匹配
* 分割等和子集
* 三角形的最小路径和
* 买卖股票的最佳时机i/ii/iii
* 打家劫舍

> 动态规划的三个概念：最优子结构，边界，状态转移方程

## 动态规划与贪心的区别

> 贪心算法中，作出的每步贪心决策都无法改变，因为贪心策略是由上一步的最优解推导下一步的最优解，而上一部之前的最优解则不作保留。 贪心是求局部最优，以得到全局最优（不一定是正确的，需要证明）
>
> 比如某国的钱币分为1元3元4元，如果要拿6元钱怎么拿？贪心的话先拿4再拿两个1，一共3张钱，而实际最优其实是两张3元（类似于背包问题，需要考虑物品个数）
>
> 动态规划算法中，全局最优解中一定包含某个局部最优解，但不一定包含前一个局部最优解，因此需要记录之前的所有最优解 

动态规划其实和分治策略是类似的，也是将一个原问题分解为若干个规模较小的子问题，递归的求解这些子问题，然后合并子问题的解得到原问题的解。
区别在于这些子问题会有重叠，一个子问题在求解后，可能会再次求解，于是我们想到将这些子问题的**解存储起来**，当下次再次求解这个子问题时，直接拿过来就是。

## 爬楼梯

* [leetcode70](https://leetcode-cn.com/problems/climbing-stairs/)

```js
有一座高度是10级台阶的楼梯，从下往上走，每跨一步只能向上1级或者2级台阶。要求用程序来求出一共有多少种走法。
```

* 思考：如果只差最后一步就走到第 10 级，此时分为两种：从第 9 级到 10 级，从第 8 级到 10 级
* 0 到 9 级的走法有 x，0 到 8 级的走法有 y 种，那么 0 到 10 级的走法一共有 x+y
* F(10) = F(9) + F(8)，F(8) = F(8) + F(7)
*  F(9) 和 F(8) 是 F(10) 的最优子结构
* 边界是 F(1) 和 F(2)
* 状态转移方程是 F(n) = F(n-1) + F(n-2)

```js
var climbStairs = function(n) {
    let dp = new Array(n + 1).fill(0)
    dp[1] = 1
    dp[2] = 2
    for (let i = 3; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2]
    }
    return dp[n]
};
```

## 零钱兑换

* [leetcode322](https://leetcode-cn.com/problems/coin-change/)

```js
给定不同面额的硬币 coins 和一个总金额 amount。编写一个函数来计算可以凑成总金额所需的最少的硬币个数。如果没有任何一种硬币组合能组成总金额，返回 -1。

你可以认为每种硬币的数量是无限的。

示例 1：
输入：coins = [1, 2, 5], amount = 11
输出：3 
解释：11 = 5 + 5 + 1

示例 2：
输入：coins = [2], amount = 3
输出：-1
```

* 设`dp[i]` 表示总金额为 i 的时候最优解法的硬币数
* 若面值有1，2，5要凑够120元，此时可以拿一枚面值为1的，最优个数为 `dp[119] + 1`，拿一枚面试为2的，最优个数为`dp[118] + 1`，拿一枚面值为5的，最优个数为`dp[115] + 1`，取三种的最小值即可
* 状态转移方程：`dp[i] = Math.min(dp[i - coin] + 1, dp[i - coin] + 1, ...)`
* 边界：`dp[0] = 0`

```js
const coinChange = (coins, amount) => {
  	let dp = new Array( amount + 1 ).fill( Infinity );
    dp[0] = 0;
    for (let i = 1; i <= amount; i++) {
        for (let coin of coins) {
            if (i - coin >= 0) {
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
    }
    return dp[amount] === Infinity ? -1 : dp[amount];
}
```

## 最大子序列和（连续）

* [leetcode53](https://leetcode-cn.com/problems/maximum-subarray/)

```js
给定一个整数数组 nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。

示例:

输入: [-2,1,-3,4,-1,2,1,-5,4]
输出: 6
解释: 连续子数组 [4,-1,2,1] 的和最大，为 6。
```

* 分析：答案肯定是在以下组合中：
* 第一个子组合是以第一个数字结尾的连续序列，也就是[-2]，最大值-2
* 第二个子组合是以第二个数字结尾的连续序列，也就是[-2,1], [1]，最大值1
* 第三个子组合是以第三个数字结尾的连续序列，也就是[-2,1,-3], [1,-3], [-3]，最大值-2
* 第四个子组合是以第四个数字结尾的连续序列，也就是[-2,1,-3,4],[1.-3,4],[-3,4],[4]，最大值4
* 第n个子组合......

****

* 最优子结构：组合n只是在组合n-1的基础上每一个数组后面添加1个数字num，然后增加一个只有第n个数字的数组[num]，只需要比较前一个组合的最大值+num和num
* 边界：`dp[0] = nums[0] `
* 状态转移方程：`dp[i] = max(dp[i-1] + nums[i], nums[i])`

```js
// 组合3只是在组合2的基础上每一个数组后面添加第3个数字，也就是3，然后增加一个只有第三个数字的数组[3]
// 只需要比较前一个组合的最大值+num和num
// 计算出九个组合的最大值，再取最大的即可

var maxSubArray = function(nums) {
    let len = nums.length
    let dp = new Array(len).fill(0)
    dp[0] = nums[0]
    for (let i = 1; i < len; i++) {
        dp[i] = Math.max(nums[i], dp[i-1] + nums[i])
    }
    return Math.max(...dp)
};
```

怎么求对应的数组呢？相比于上题，应该存储起始和结束的索引。

```js
var maxSubArray = function(nums) {
    const len = nums.length
    const dp = new Array(len).fill(0)
    let start = end = 0
    let finalStart = finalEnd = 0
    let max = dp[0] = nums[0]
    for (let i = 1; i < len; i++) {
        if (dp[i - 1] > 0) {
            dp[i] = dp[i - 1] + nums[i]
            end = i
        } else {
            dp[i] = nums[i]
            start = end = i
        }
        if (dp[i] > max) {
            max = dp[i]
            finalStart = start
            finalEnd = end
        }
    }
    return nums.slice(finalStart, finalEnd + 1)
};

console.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4]))
// [4,-1,2,1]
```

## 打家劫舍（非连续）

* [leetcode198](https://leetcode-cn.com/problems/house-robber/)
* 由于不可以在相邻的房屋闯入，所以在当前位置 n 房屋可盗窃的最大值，要么就是 n-1 房屋可盗窃的最大值，要么就是 n-2 房屋可盗窃的最大值加上当前房屋的值，二者之间取最大值
* 状态转移方程：`dp[n] = max( dp[n-1], dp[n-2] + num )`
* 举例来说：`[3,4,2]`，1 号房间可盗窃最大值为 3， 即为 `dp[1]=3`，2 号房间可盗窃最大值为 4， 即为 `dp[2]=4`，3 号房间自身的值为 2 即为 num=2，那么 `dp[3] = MAX( dp[2], dp[1] + num ) =  5`，3 号房间可盗窃最大值为 5
* 时间复杂度：O(n)

```js
var rob = function(nums) {
    const dp = new Array(nums.length).fill(0);
  
  	// 初始化好前两个状态
    dp[0] = nums[0];
    dp[1] = nums[1] > nums[0] ? nums[1] : nums[0];

    for (let i = 2; i < nums.length; i++) {
        dp[i] = Math.max(dp[i - 2] + nums[i], dp[i - 1]);
    }

    return dp[nums.length - 1]
};
```

## 最长非重复子串

* [剑指offer48](https://leetcode-cn.com/problems/zui-chang-bu-han-zhong-fu-zi-fu-de-zi-zi-fu-chuan-lcof/)

```js
示例 1:
输入: "abcabcbb"
输出: 3 
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。

示例 2:
输入: "bbbbb"
输出: 1
解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。

示例 3:
输入: "pwwkew"
输出: 3
解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
     请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
```

* `dp[i]`代表以`s[i]`结尾的最长非重复字串
* 若`dp[i-1]`包含`s[i]`，则截取出不包含的部分拼接
* 若`dp[i-1]`不包含`s[i]`，则直接拼接

```js
var lengthOfLongestSubstring = function(s) {
    if (s.length === 0) return 0
    const len = s.length
    const dp = new Array(len).fill("")
    dp[0] = s[0]
    for (let i = 1; i < len; i++) {
        if (dp[i - 1].includes(s[i])) {
            dp[i] = dp[i - 1].slice(dp[i - 1].indexOf(s[i]) + 1) + s[i]       
        } else {
            dp[i] = dp[i - 1] + s[i]
        }
    }
    return Math.max(...dp.map(s => s.length))
};
```

## 最长重复子数组

* [leetcode718](https://leetcode-cn.com/problems/maximum-length-of-repeated-subarray/)
* `dp[i][j]`：表示第一个数组 A 前 i 个元素和数组 B 前 j 个元素组成的最长公共子数组(相当于子串)的长度。

```js
var findLength = function(nums1, nums2) {
    const m = nums1.length
    const n = nums2.length
    const dp = Array.from(new Array(m + 1), () => new Array(n + 1).fill(0))                    
    let res = 0
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (nums1[i - 1] == nums2[j - 1]) {     
                dp[i][j] = dp[i - 1][j - 1] + 1
            }
            res = Math.max(dp[i][j], res)
        }
    }
    return res
};
```

## 最长递增子序列

* [leetcode300](https://leetcode-cn.com/problems/longest-increasing-subsequence/)

```js
输入：nums = [10,9,2,5,3,7,101,18]
输出：4
解释：最长递增子序列是 [2,3,7,101]，因此长度为 4 。
```

* `dp[i]`：以`nums[i]`结尾的最长子序列长度
* 转移方程： 设` j∈[0,i)`，考虑每轮计算新 `dp[i]` 时，遍历 `[0,i)` 列表区间，做以下判断：
  * 当 `nums[i] > nums[j]` 时： `nums[i]`可以接在 `nums[j]`之后（此题要求严格递增），此情况下最长上升子序列长度为 `dp[j] + 1` ；
  * 当 `nums[i] <= nums[j]` 时：` nums[i]` 无法接在 `nums[j]`之后，此情况上升子序列不成立，跳过。
  * 故转移方程：` dp[i] = max(dp[i], dp[j] + 1) for j in [0, i)`

```js
var lengthOfLIS = function(nums) {
    let len = nums.length
    let dp = new Array(len).fill(1)
    for (let i = 1; i < len ; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[i] > nums[j]) {
                dp[i] = Math.max(dp[i], dp[j] + 1)
            }
        }
    }
    return Math.max(...dp)
};
```

## 最长公共子序列(LCS)

* [leetcode1143](https://leetcode-cn.com/problems/longest-common-subsequence/)
* [参考题解1](https://leetcode-cn.com/problems/longest-common-subsequence/solution/dong-tai-gui-hua-xiang-jin-zhu-shi-fu-qiu-jie-guo-/)，[参考题解2(填表)](https://leetcode-cn.com/problems/longest-common-subsequence/solution/1143-zui-chang-gong-gong-zi-xu-lie-dong-zde2v/)

```js
示例 1:
输入：text1 = "abcde", text2 = "ace" 
输出：3  
解释：最长公共子序列是 "ace"，它的长度为 3。

示例 2:
输入：text1 = "abc", text2 = "abc"
输出：3
解释：最长公共子序列是 "abc"，它的长度为 3
```

* `dp[i][j]：字符串 text1 和 text2 中对应的前i，前j个字符的LCS的长度`
* 当`text1[i] === text2[j]`时，说明 `text1[i]` 或者 `text2[j] `对应的字符是最长公共子序列的一部分，所以有 `dp[i][j] = 1 + dp[i-1][j-1]`
* 当`text1[i] !== text2[j]`时，此时我们要看两个字符串分别单独往回撤一个字符串的对比情况，获取两者的最大值即可，所以有` dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1])`

| text2\text1 |  -   |  a   |  b   |  c   |  d   |  e   |
| :---------: | :--: | :--: | :--: | :--: | :--: | :--: |
|      -      |  0   |  0   |  0   |  0   |  0   |  0   |
|      a      |  0   |  1   |  1   |  1   |  1   |  1   |
|      c      |  0   |  1   |  1   |  2   |  2   |  2   |
|      e      |  0   |  1   |  1   |  2   |  2   |  3   |

```js
var longestCommonSubsequence = function (text1, text2) {
    let m = text1.length
    let n = text2.length
    let dp = Array.from(new Array(m + 1), () => new Array(n + 1).fill(0))
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (text1[i - 1] === text2[j - 1]) {
                dp[i][j] = 1 + dp[i - 1][j - 1]
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
            }
        }
    }
    return dp[m][n]
};
```

## 编辑距离(SES)

* [leetcode72](https://leetcode.cn/problems/edit-distance/)
* [题解:微软又考了这道题](https://mp.weixin.qq.com/s/JDfm9uWF7zKhQJL4mbCSeQ)、[题解2](https://leetcode.cn/problems/edit-distance/solution/jsshua-ti-mian-shi-ti-jie-by-distracted-5dc5t/)

```js
输入：word1 = "horse", word2 = "ros"
输出：3

horse -> rorse (将 'h' 替换为 'r')
rorse -> rose (删除 'r')
rose -> ros (删除 'e')
```

状态定义：`dp[i][j]`是word1,word2的最小编辑距离

* 当`word1[i - 1]` = `word2[j - 1]` 时，字符串最后一位相等，不需要任何操作，
  也就是`dp(i, j) = dp(i - 1, j - 1)`， `s1[0..i] 和 s2[0..j]` 的最小编辑距离等于`s1[0..i - 1]` 和 `s2[0..j - 1]` 的最小编辑距离

* 当 `word1[i]！= word2[j]`，则需要进行插入、删除、替换操作了
  1、插入：`dp[i][j] = dp(i, j - 1) + 1`， 直接在 `s1[i]` 插入一个和 `s2[j]` 一样的字符， 操作数加一
  2、删除：`dp[i][j] = dp(i - 1, j) + 1`，直接把 `s[i]` 这个字符删掉， 操作数加一
  3、替换：`dp[i][j] = dp(i - 1, j - 1) + 1` ， 直接把 `s1[i]` 替换成` s2[j]`， 操作数加一

| word1/word2 | -    | r    | o    | s    |
| ----------- | ---- | ---- | ---- | ---- |
| -           | 0    | 1    | 2    | 3    |
| h           | 1    | 1    | 2    | 3    |
| o           | 2    | 2    | 1    | 2    |
| r           | 3    | 2    | 2    | 2    |
| s           | 4    | 3    | 3    | 2    |
| e           | 5    | 4    | 4    | 3    |

```js
var minDistance = function(wonrd1, word2) {
    let m = word1.length;
    let n = word2.length;
    let dp = Array.from(new Array(m + 1), () => new Array(n + 1).fill(0))
    // 初始化
    for (let i = 1; i <= m; i++) { 
        dp[i][0] = i;
    }
    for (let j = 1; j <= n; j++) {
        dp[0][j] = j;
    }

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (word1[i - 1] === word2[j - 1]) {// 最后一位字符一样，不需要任何操作
                dp[i][j] = dp[i - 1][j - 1]
            }
          	else { // 插入、删除、替换
                dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1
            }
        }
    }
    return dp[m][n];
};
```

## LCS和SES的关系

对于LCS和SES如果我们细心想一下就不难发现两者其实就是同一个问题；

> **存在字符串string1=ABCDE，string2=BCEGF；**
>
> **则字符串的长度分别计作Length(string1)，Length(string2);**
>
> **从LCS的角度来看，最长公共子序列就是BCE，长度计作Length(LCS);**
>
> **从SES的角度来看，最短编辑路径就是A(-)D(-)G(+)F(+)，长度计作Length(SES);**
>
> **Length(string1)+Length(string2)=Length(SES)+Length(LCS)*2；**

## 最长回文子串

* [leetcode5](https://leetcode-cn.com/problems/longest-palindromic-substring)

```js
给定一个字符串 s，找到 s 中最长的回文子串。你可以假设 s 的最大长度为 1000。

示例 1：
输入: "babad"
输出: "bab"
注意: "aba" 也是一个有效答案。

示例 2：
输入: "cbbd"
输出: "bb"
```

* 分析：i 到 j 是回文子串那么 i+1 到 j-1 也是回文子串
* i 到 j 的最优子结构就是 i+1 到 j-1
* 边界就是单个字符或者 aa 这种
* 状态转移方程是：`dp[i][j] = dp[i+1][j-1] && s[i] == s[j]`

```js
var longestPalindrome = function(s) {
    if (!s) return ""
    let res = [], dp = []

    // 从后向前遍历，因为 dp[i] 依赖于 dp [i+1]
    for (let i = s.length - 1; i >= 0; i--) {
        dp[i] = []
        for (let j = i; j < s.length; j++) {
            // 边界
            if (i === j || (j - i === 1 && s[i] === s[j])) {
                dp[i][j] = true
            }
            // 状态转移
            else if (s[i] === s[j] && dp[i + 1][j - 1]) {
                dp[i][j] = true
            }
            if (dp[i][j] && j - i + 1 > res.length) {
                res = s.slice(i, j + 1);
            }
        }
    }
    return res
};
```

## 不同路径

* [leetcode62](https://leetcode-cn.com/problems/unique-paths/)

```js
一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为“Start” ）。

机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为“Finish”）。

问总共有多少条不同的路径？

示例 1:
输入: m = 3, n = 2
输出: 3
解释:
从左上角开始，总共有 3 条路径可以到达右下角。
1. 向右 -> 向右 -> 向下
2. 向右 -> 向下 -> 向右
3. 向下 -> 向右 -> 向右

示例 2:
输入: m = 7, n = 3
输出: 28
```

* 分析：到达终点总是向右或向下，故到达终点的走法=到达其上面点的走法 + 到达其左面点的走法
* 状态转移：`map[m][n] = map[m-1][n] + map[m][n-1]`
* 边界：`map[0][j] = 1,map[i][0] = 1`

```js
	// 初始化二维数组
    let map = Array.from(new Array(m),()=>(new Array(n).fill(0)))
    for (let j = 0; j < n; j++) {
        map[0][j] = 1
    }
    for (let i = 0; i < m; i++) {
        map[i][0] = 1
    }
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            map[i][j] = map[i-1][j] + map[i][j-1]
        }
    }
    return map[m-1][n-1]
```

#### Array.from

**将一个类数组对象或者可遍历对象转换成一个真正的数组。**

* 该类数组对象必须具有length属性，用于指定数组的长度。如果没有length属性，那么转换后的数组是一个空数组。

* 该类数组对象的属性名必须为数值型或字符串型的数字

* 该类数组对象的属性名可以加引号，也可以不加引号
* `Array.from`可以接受第二个参数，作用类似于数组的`map`方法，用来对每个元素进行处理，将处理后的值放入返回的数组。

## 最小路径和

* [leetcode64](https://leetcode-cn.com/problems/minimum-path-sum/)

```js
给定一个包含非负整数的 m x n 网格 grid ，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。

说明：每次只能向下或者向右移动一步。

示例 1：
输入：grid = [[1,3,1],[1,5,1],[4,2,1]]
输出：7
解释：因为路径 1→3→1→1→1 的总和最小。

示例 2：
输入：grid = [[1,2,3],[4,5,6]]
输出：12
```

* 思路：到`grid[i][j]`的最小值，肯定等于到`grid[i-1][j]`的最小值和到`grid[i][j-1]`的最小值中较小的加上当前`grid[i][j]`的值
* 最优子结构：`dp[i-1][j], dp[i][j-1]`中小的那个
* 边界：`dp[0][0] = grid[0][0]`
* 状态转移方程：`dp[i][j] = min(dp[i-1][j], dp[i][j-1]) + grid[i][j] `；

```js
var minPathSum = function(grid) {
    let m = grid.length
    let n = grid[0].length
    let dp = Array.from(new Array(m),()=>(new Array(n).fill(0)))
    dp[0][0] = grid[0][0]
    for (let i = 1; i < m; i++) {
        dp[i][0] = dp[i-1][0] + grid[i][0];
    }
    for (let j = 1; j < n; j++) {
        dp[0][j] = dp[0][j-1] + grid[0][j];
    }
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[i][j] = Math.min(dp[i][j-1], dp[i-1][j]) + grid[i][j];
        }
    }
    return dp[m-1][n-1]
};
```

## 正则表达式匹配

* [leetcode10](https://leetcode-cn.com/problems/regular-expression-matching/)

* [题解](https://leetcode-cn.com/problems/regular-expression-matching/solution/shou-hui-tu-jie-wo-tai-nan-liao-by-hyj8/)

## 分割等和子集

* [leetcode416](https://leetcode-cn.com/problems/partition-equal-subset-sum/)

> 这个问题可以转化为求数组的一个子集，使得这个子集中的元素的和尽可能接近sum/2，其中sum为数组中所有元素的和。这样转换之后这个问题就很类似0-1背包问题了：在n件物品中找到m件物品，他们的可以装入背包中，且总价值最大不过这里不考虑价值，就考虑使得这些元素的和尽量接近sum/2。

* [背包问题分析](https://juejin.cn/post/6844903607855251463)

```js
输入: n物品重W[1:n], 价值V[1:n], 背包容量C
输出: 装包使得价值最大 (物品重量为整数).

dp[i,k] = 由[1:i]组合出重量<=k的最大价值

如果第i件物品没有包括在其中，则dp[i,k] = dp[i-1,k]
如果第i件物品包括在其中，则dp[i,k] = dp[i-1,k-W[i]] + V[i]

转移方程：dp[i,k] = max{ dp[i-1,k], dp[i-1,k-W[i]] + V[i] }
```

* 例如输入为1，2，3，6，`midSum = 6`

| -    | 0    | 1    | 2    | 3    | 4    | 5    | 6    |
| ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| 0    | 0    | 0    | 0    | 0    | 0    | 0    | 0    |
| 1    | 0    | 1    | 1    | 1    | 1    | 1    | 1    |
| 2    | 0    | 1    | 2    | 3    | 3    | 3    | 3    |
| 3    | 0    | 1    | 2    | 3    | 4    | 5    | 6    |
| 5    | 0    | 1    | 2    | 3    | 4    | 5    | 6    |

```js
var canPartition = function(nums) {
    let len = nums.length
    let sum = 0
    for (let i = 0; i < len; i++) {
        sum += nums[i]
    }
    let midSum = sum >> 1
    let dp = Array.from(new Array(len + 1),()=>(new Array(midSum + 1).fill(0)))
    for (let i = 1; i <= len; i++) {
        for (let j = 1; j <= midSum; j++) {
            if (j >= nums[i - 1]) {
                // dp[i - 1][j] 为不装
                // dp[i - 1][j - nums[i-1]] + nums[i - 1] 是装，且剩余空间继续装
                dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - nums[i - 1]] + nums[i - 1])
            }
            // 当前背包容量j不够装下第i个物品的重量nums[i-1]时，只有选择不装
            else {
                dp[i][j] = dp[i - 1][j]
            }
        }
    }
    return dp[len][midSum] === sum / 2
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

* `dp[i][j]`表示从三角形顶部走到位置 (i, j) 的最小路径和，因此要想走到位置 (i, j)，上一步就只能在位置 (i - 1, j - 1)或者位置 (i - 1, j)

* 状态转移方程：`dp[i][j] = min(dp[i-1][j-1], dp[i-1][j]) + triangle[i][j]`

* 边界条件：`dp[0][0] = triangle[0][0] `
* 三角形的两腰上的 dp 值是确定的
  * `dp[i][0] = dp[i-1][0] + triangle[i][0] `
  * `dp[i][i] = dp[i-1][i-1] + triangle[i][i] `

```js
var minimumTotal = function(triangle) {
    const len = triangle.length
    let dp = Array.from(new Array(len),()=>(new Array(len).fill(0)))
    dp[0][0] = triangle[0][0]
    for (let i = 1; i < len; i++) {
        dp[i][0] = dp[i-1][0] + triangle[i][0]
        for (let j = 1; j < i; j++) {
            dp[i][j] = Math.min(dp[i-1][j-1], dp[i-1][j]) + triangle[i][j]
        }
        dp[i][i] = dp[i-1][i-1] + triangle[i][i]
    }
    return Math.min(...dp[len-1])
};
```

## 买卖股票的最佳时机

* [leetcode121](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock/)

```js
给定一个数组，它的第 i 个元素是一支给定股票第 i 天的价格。
如果你最多只允许完成一笔交易（即买入和卖出一支股票一次），设计一个算法来计算你所能获取的最大利润。
注意：你不能在买入股票前卖出股票。

示例 1:
输入: [7,1,5,3,6,4]
输出: 5
解释: 在第 2 天（股票价格 = 1）的时候买入，在第 5 天（股票价格 = 6）的时候卖出，最大利润 = 6-1 = 5 。
     注意利润不能是 7-1 = 6, 因为卖出价格需要大于买入价格；同时，你不能在买入前卖出股票。
     
示例 2:
输入: [7,6,4,3,1]
输出: 0
解释: 在这种情况下, 没有交易完成, 所以最大利润为 0。
```

> 设 `dp[i]`为`i`支股票的最大利润，若已知前`i-1`支股票的最大利润为 `dp[i-1]`，怎么建立动态转移方程？
>
> 如果记录了前`i-1`支股票的最小值 min，那么最大利润一定是第`i`支股票的价格减去min所得的值与`dp[i-1]`之间的最大值，所以只需计算一下 `price[i] - min` 与` dp[i]` 的最大值

* 动态规划的三要素：最优子结构，边界，状态转移方程
* `dp[i]` 的 最优子结构就是 `dp[i-1]`
* 边界：`dp[0] = 0`
* 状态转移方程：`dp[i] = Math.max(dp[i-1], prices[i] - min);`

```js
var maxProfit = function(prices) {
    const len = prices.length
    const dp = new Array(len).fill(0)
    let min = prices[0]
    dp[0] = 0
    for (let i = 1; i < len; i++) {
        dp[i] = Math.max(prices[i] - min, dp[i - 1])
        min = Math.min(min, prices[i])
    }
    return dp [len - 1]
};
```

代码优化之后（看了[官方题解](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock/solution/121-mai-mai-gu-piao-de-zui-jia-shi-ji-by-leetcode-/)才领悟到不用 dp 也可直接写出如下）

```js
let maxProfit = function(prices) {
    let max = 0, min = prices[0]
    for(let i = 1; i < prices.length; i++) {
        min = Math.min(prices[i], min)
        max = Math.max(max, prices[i] - min)
    }
    return max
}
```

## 买卖股票的最佳时机ii（多次交易）

```js
输入: [7,1,5,3,6,4]
输出: 7
解释: 在第 2 天（股票价格 = 1）的时候买入，在第 3 天（股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5-1 = 4 。
     随后，在第 4 天（股票价格 = 3）的时候买入，在第 5 天（股票价格 = 6）的时候卖出, 这笔交易所能获得利润 = 6-3 = 3 。
```

> 由于可以无限次的买入和卖出，我们都知道炒股想要挣钱的话当然是低价买入，高价卖出，那么这里我们只需要从第二天开始，如果当天价格比之前的价格高，则把差价加入利润中，因为我们可以昨天买入，今日卖出，若明天价格更高的话，还可以今日买入，明天再抛出，以此类推遍历完整个数组，即可求出最大利润。

```js
var maxProfit = function(prices) {
    let res = 0
    for (let i = 0; i < prices.length - 1; i++) {
        if (prices[i] < prices[i + 1]) {
            res += prices[i + 1] - prices[i] 
        }
    }
    return res
};
```

## 买卖股票的最佳时机iii（含冷冻期）

```js
给定一个整数数组，其中第 i 个元素代表了第 i 天的股票价格 。​

设计一个算法计算出最大利润。在满足以下约束条件下，你可以尽可能地完成更多的交易（多次买卖一支股票）:

你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。
卖出股票后，你无法在第二天买入股票 (即冷冻期为 1 天)。

示例:
输入: [1,2,3,0,2]
输出: 3 
解释: 对应的交易状态为: [买入, 卖出, 冷冻期, 买入, 卖出]
```

* 设 `dp[i]` 为 截止至第`i`天的最大收益
* 对于每一天`i`都有两种状态**持股**和**不持股**，而不持股又分为**当天卖出**和**本来就没有**
  * 持股：设为`dp[i][1]`
  * 不持股
    * 当天卖出了股票所以没有，设为`dp[i][2]`
    * 前一天就没有，今天也没有，设为`dp[i][0]`
* 状态确定好后，下面就是如何建立状态转移方程？
  * 当天持股分为两种情况：**当天买入**和**本来就有**，找出效益最大值
    * 当天买入，前一天一定没有并且前一天没有卖出（`dp[i-1][0]`）,此时效益为`dp[i-1][0]-p[i]`
    * 前一天本来就有，此时的效益为`dp[i-1][1]`
    * 状态转移方程：` dp[i][1] = max(dp[i-1][1],dp[i-1][0]-p[i])`
  * 不持股（当天卖出所以没有）
    * 当天卖出，前一天一定持有，此时的最大效益就是前一天的效益 + 卖出的价格
    * 状态转移方程：`dp[i][2] = dp[i-1][1] + p[i]`
  * 不持股（本来就没有）
    * 说明前一天也没有，最大效益就是前一天两种没有状态的最大值
    * 状态转移方程：` dp[i][0] = max(dp[i-1][0],dp[i-1][2])`
* 截止最后一天的最大效益一定是不持有状态的
* 边界：`dp[0][0] =  0`,`dp[0][2] = 0`,`dp[0][1] = -p[0]` 

```js
var maxProfit = function(prices) {
    if (prices.length === 0) return 0
    const len = prices.length
    let dp = Array.from(new Array(len), () => new Array(3).fill(0))
    dp[0][0] = 0
    dp[0][2] = 0
    dp[0][1] = -prices[0]
    for (let i = 1; i < len; i++) {
        dp[i][1] = Math.max(dp[i-1][1], dp[i-1][0] - prices[i])
        dp[i][2] = dp[i-1][1] + prices[i]
        dp[i][0] = Math.max(dp[i-1][0], dp[i-1][2])
    }
    return Math.max(dp[len-1][0], dp[len-1][2])
};
```

