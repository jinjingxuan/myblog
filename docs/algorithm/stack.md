---
title: 栈的应用
date: 2020-10-22 16:00:54
categories: 算法
---
# 栈的应用
* 括号匹配问题
* 最长有效括号
* 表现良好的最长时间段
* 字符串解码
* 去除重复字母
*  移掉 k 位数字
*  接雨水
*  柱状图中的最大矩形
*  最大矩形
*  每日温度
*  两个栈实现队列
*  最小栈

## 括号匹配问题

大致思路是遇到左括号入栈，遇到右括号将左括号出栈，复杂度为O(n)

```js
const isBalanced = str => {
    const stack = []
    for (const item of str) {
        if (item === '(') {
            stack.push(item)
        } else {
            if (!stack.length) return false
            stack.pop()
        }
    }
    return stack.length === 0
}
```

我们还可以把题目再向前面推进一步，如果包含三种括号怎么办：

```js
const isBalanced = str => {
    const map = new Map([
        [')', '('],
        ['}', '{'],
        [']', '[']
    ])
    const stack = []
    for (const item of str) {
        if (/\(|\[|\{/.test(item)) {
            stack.push(item)
        } else {
            if (!stack.length || stack[stack.length - 1] !== map.get(item)) return false
            stack.pop()
        }
    }
    return stack.length === 0
}
```

## 最长有效括号

* [leetcode32](https://leetcode-cn.com/problems/longest-valid-parentheses/)
* [题解](https://leetcode-cn.com/problems/longest-valid-parentheses/solution/zui-chang-you-xiao-gua-hao-by-leetcode-solution/)

```js
给定一个只包含 '(' 和 ')' 的字符串，找出最长的包含有效括号的子串的长度。

示例 1:
输入: "(()"
输出: 2
解释: 最长有效括号子串为 "()"

示例 2:
输入: ")()())"
输出: 4
解释: 最长有效括号子串为 "()()"
```

* 对于遇到的每个 '('，我们将它的下标放入栈中
* 对于遇到的每个 ')'，我们先弹出栈顶元素表示匹配了当前右括号：
  * 如果栈为空，说明当前的右括号为没有被匹配的右括号，我们将其下标放入栈中来更新我们之前提到的「最后一个没有被匹配的右括号的下标」
  * 如果栈不为空，当前右括号的下标减去栈顶元素即为「以该右括号为结尾的最长有效括号的长度」我们从前往后遍历字符串并更新答案即可。
* 需要注意的是，如果一开始栈为空，第一个字符为左括号的时候我们会将其放入栈中，这样就不满足提及「最后一个没有被匹配的右括号的下标」，为了保持统一，我们在一开始的时候往栈中放入一个值为 -1的元素。

```js
var longestValidParentheses = function(s) {
    const stack = [-1];
    let res = 0;
    for (let i = 0; i < s.length; i++) {
        if (s[i] === '(') {
            stack.push(i);
        }
        else {
            stack.pop();
            if (!stack.length) {
                stack.push(i);
            }
            else {
                res = Math.max(res, i - stack[stack.length - 1]);
            }
        }
    }
    return res;
};
```

## 表现良好的最长时间段

[leetcode1124](https://leetcode-cn.com/problems/longest-well-performing-interval/)

```js
给你一份工作时间表 hours，上面记录着某一位员工每天的工作小时数。
我们认为当员工一天中的工作小时数大于 8 小时的时候，那么这一天就是「劳累的一天」。
所谓「表现良好的时间段」，意味在这段时间内，「劳累的天数」是严格 大于「不劳累的天数」。
请你返回「表现良好时间段」的最大长度。

输入：hours = [9,9,6,0,6,6,9]
输出：3
解释：最长的表现良好时间段是 [9,9,6]。
```

### 前置知识：前缀和，单调栈

* 数组转换并计算前缀和

```js
hours = [9, 9, 6, 0, 6, 6, 9]
score = [1, 1, -1, -1, -1, -1, 1] // 大于8记1，小于8记-1
presum = [0, 1, 2, 1, 0, -1, -2, -1] // 前缀和

// presum[j] - presum[i] 代表的是 score[i] 到 score[j-1] 的区间元素和
```

* 单调栈：就是栈中元素,按递增顺序或者递减顺序排列，最大好处就是时间复杂度是线性的,每个元素遍历一次
* 单调递增栈可以找到左起第一个比当前数字小的元素
* 比如数组:`[3,5,4,1]`,我们如何要找每一个元素下一个最小数.例如:`3` 下一个最小的数为`1`,`5`下一个是`4`.我们先构造栈,把`3`压入栈中,`5`入栈时候,发现栈顶元素`3`比它小,也依次压入;当`4`时候,栈顶元素`5`大于`4`,于是得到,`5`**左起第一个小的元素**为`4`.将`5`弹出,压入`4`.接下来元素`1`,也比栈顶元素小,于是得到`4`第一个小的元素为`1`,弹出`4`,依次类推,`3`也是`1`...栈中的元素**一直保持单调递增的状态**.

****

### 回归题目

* 我们要找的是：一个最长的区间 能使 score的区间元素和大于 0
* 有了前缀和就变成了：寻找最长的区间使得 presum[j] - presum[i] >0"
* 以任意元素presum[i]为起始点，找最右边往左找第一个满足presum[j]大于presum[i]的元素下标A[j]，找(j – i)的最大值，即最大区间。那么可以按照元素从左到右建单调递减的栈，然后从右到左找满足要求的最区间。


```js
/**
 * @param {number[]} hours
 * @return {number}
 */

var longestWPI = function(hours) {
    // 转换成: [1,  1, -1, -1, -1, -1, 1]
    for (let i in hours) {
        if (hours[i] > 8) {
            hours[i] = 1
        } else {
            hours[i] = -1
        }
    }
    // 求前缀和: [0, 1, 2, 1, 0, -1, -2, -1]
    let presum = []
    presum[0] = 0
    for (let i = 1;i <= hours.length;i++) {
        presum[i] = presum[i-1] + hours[i-1]
    }
    // 构造单调递减栈：存储的是索引 [0, 5, 6]，对应前缀和中的 [0, -1, -2]
    // 我们最后要求的最大的宽度坡一定是以这个序列中的某一个i为坡底的(自己理解一下)
    // 最大宽度坡：假设存在某个元素位置k不存在于上面的递减序列中，且有最大宽度j-k，
    // 这也就说明k位置的元素一定是小于k前面所有的元素的，否则就会有更长的宽度，但是既然k小于前面所有的元素，
    // 那么k就一定会被加入到序列中，与假设矛盾，所以不存在k，解一定存在递减序列中
    let stack = []
    stack[0] = presum[0]
    for (let i = 1;i < presum.length;i++) {
        // 小于栈顶则 push
        if (presum[i] < presum[stack[stack.length - 1]]) {
            stack.push(i)
        }
    }
    //  从尾部遍历presum
    //  如果该位置元素比stack中存储的位置的元素高，则表明为上坡路
    //  弹出栈顶元素（因为再往前遍历长度会减小），并记录坐标差，该坐标差即为上坡路的长度
    let ans = 0
    for (let i = presum.length - 1;i > ans;i--){
        // 注意此处是 while，满足条件 pop 之后会继续比较
        while(stack.length > 0 && presum[i] > presum[stack[stack.length - 1]]){
            ans = Math.max(ans, i - stack.pop())
        }
    }
    return ans
};
```

类似题目：[leetcode962:最大宽度坡](https://leetcode-cn.com/problems/maximum-width-ramp/)

## 字符串解码

```js
示例 1：
输入：s = "3[a]2[bc]"
输出："aaabcbc"

示例 2：
输入：s = "3[a2[c]]"
输出："accaccacc"

示例 3：
输入：s = "2[abc]3[cd]ef"
输出："abcabccdcdcdef"

示例 4：
输入：s = "abc3[cd]xyz"
输出："abccdcdcdxyz"
```

* 题目来源：[leetcode394](https://leetcode-cn.com/problems/decode-string/)
* 正则解法

```js
	decodeString(s) {
      let reg = /(\d+)\[(\w+)\]/g
      while (reg.test(s)) {
        // replace 第二个参数可以为函数
        // 参数：匹配到的，$1，$2，索引，源字符串
        s = s.replace(reg, function(matchStr, group1, group2, index, sourceStr) {
          let str = ""
          while(group1--) {
            str +=  group2
          }
          return str;
        })
      }
      console.log(s)
    }
```

## 去除重复字母（单调栈）

* [leetcode316](https://leetcode-cn.com/problems/remove-duplicate-letters/)

```js
给你一个字符串 s ，请你去除字符串中重复的字母，使得每个字母只出现一次。需保证 返回结果的字典序最小（要求不能打乱其他字符的相对位置）。 

示例 1：
输入：s = "bcabc"
输出："abc"

示例 2：
输入：s = "cbacdcbc"
输出："acdb"
```

* 用 map 存储字符串中每个字符出现的次数
* 遍历字符串，每访问一个字符，将字符入栈，并且当前字符次数减1。入栈之前首先需要判断，当前字符的字典序若小于栈顶字符（栈顶字符次数大于0），则栈顶字符先出栈

```js
var removeDuplicateLetters = function(s) {
    const stack = []
    const map = new Map()
    for (let i in s) {
        map.has(s[i]) ? map.set(s[i], map.get(s[i]) + 1) : map.set(s[i], 1)
    }
    for (let i in s) {
        if (!stack.includes(s[i])) {
            const len = stack.length
            while (len && s[i] < stack[len - 1] && map.get(stack[len - 1])) {
                stack.pop()
            }
            stack.push(s[i])
        }
        map.set(s[i], map.get(s[i]) - 1)
    }
    return stack.join("")
};
```

## 移掉 k 位数字（单调栈）

* 题目：[leetcode402](https://leetcode-cn.com/problems/remove-k-digits)
* 可参考：[一招吃遍力扣四道题，妈妈再也不用担心我被套路啦～](https://leetcode-cn.com/problems/remove-k-digits/solution/yi-zhao-chi-bian-li-kou-si-dao-ti-ma-ma-zai-ye-b-5/)

```js
给定一个以字符串表示的非负整数 num，移除这个数中的 k 位数字，使得剩下的数字最小。

注意:
num 的长度小于 10002 且 ≥ k。
num 不会包含任何前导零。

示例 1 :
输入: num = "1432219", k = 3
输出: "1219"
解释: 移除掉三个数字 4, 3, 和 2 形成一个新的最小的数字 1219。

示例 2 :
输入: num = "10200", k = 1
输出: "200"
解释: 移掉首位的 1 剩下的数字为 200. 注意输出不能有任何前导零。

示例 3 :
输入: num = "10", k = 2
输出: "0"
解释: 从原数字移除所有的数字，剩余为空就是0。
```

```js
给定一个数字序列，例如 425，如果要求我们只删除一个数字，那么从左到右，我们有 4、2 和 5 三个选择。我们将每一个数字和它的左邻居进行比较。从 2 开始，小于它的左邻居 4。则我们应该去掉数字 4。如果不这么做，则随后无论做什么，都不会得到最小数。

如果我们保留数字 4，那么所有可能的组合都是以数字 4（即 42，45）开头的。相反，如果去掉 4，留下 2，我们得到的是以 2 开头的组合（即 25），这明显小于任何留下数字 4 的组合。

这个问题可以用贪心算法来解决。上述规则阐明了我们如何接近最终答案的基本逻辑。一旦我们从序列中删除一个数字，剩下的数字就形成了一个新的问题，我们可以继续使用这个规则。
```

* 思路：从左向右遍历入栈，若下一个数更小，则上一个数出栈。
* 问题： num 是一个增序序列，则不会出栈；是一个降序序列，则会一直出栈。
* 解决：
  * 每次丢弃一次，k 减去 1。当 k 减到 0 ，我们可以提前终止遍历。
  * 而当遍历完成，如果 k 仍然大于 0。不妨假设最终还剩下 x 个需要丢弃，那么我们需要选择删除末尾 x 个元素。

* 若输入为("1234567890", 9)，按照以上逻辑最后输出的 stack 为 [1,2,3,4,5,6,7,8,0]，所以要设置 while 循环，当 num[i] 一直比栈顶元素小时，则继续出栈
* 保证数字范围使用 BigInt
* 若 num.length === k，说明全部删除，直接返回 "0"

```js
function removeKdigits(num, k) {
    let stack = []
    let n = k
    if (num.length === k) return "0"
    for (let item of num) {
        while (stack.length && item < stack[stack.length - 1] && n) {
            stack.pop()
            n--
        }
        stack.push(item)
    }
    return (BigInt(stack.join("")) + "").slice(0, num.length - k)
}
```

## 接雨水

* [leetcode42](https://leetcode-cn.com/problems/trapping-rain-water/)
* [题解1](https://leetcode-cn.com/problems/trapping-rain-water/solution/trapping-rain-water-by-ikaruga/)，[题解2](https://leetcode-cn.com/problems/trapping-rain-water/solution/dan-diao-zhan-jie-jue-jie-yu-shui-wen-ti-by-sweeti/)

```js
输入：height = [0,1,0,2,1,0,1,3,2,1,2,1]
输出：6
解释：上面是由数组 [0,1,0,2,1,0,1,3,2,1,2,1] 表示的高度图，在这种情况下，可以接 6 个单位的雨水（蓝色部分表示雨水）。 
```

* 数据结构：单调栈
* 当后面的柱子高度比前面的低时，是无法接雨水的，当找到一根比前面高的柱子，就可以计算接到的雨水，所以使用单调递减栈
* 当出现高于栈顶的柱子时，说明可以对前面的柱子结算了，计算已经到手的雨水，然后出栈前面更低的柱子

```js
var trap = function(height) {
    if (!height || height.length == 0) return 0
    const stack = []
    let res = 0
    for (let i = 0; i < height.length; i++) {
        while (stack.length && height[i] > height[stack[stack.length-1]]) {
            let tmp = stack.pop()
            if (stack.length === 0) break
            res += (Math.min(height[i], height[stack[stack.length-1]]) - height[tmp]) * (i - stack[stack.length-1] -1)
        }
        stack.push(i)
    }
    return res
};
```

## 柱状图中的最大矩形

* [leetcode84](https://leetcode-cn.com/problems/largest-rectangle-in-histogram/)
* [题解](https://leetcode-cn.com/problems/largest-rectangle-in-histogram/solution/zhao-liang-bian-di-yi-ge-xiao-yu-ta-de-zhi-by-powc/)

> 首先，要想找到第 i 位置最大面积是什么？
>
> 是以i 为中心，向左找第一个小于` heights[i] `的位置` left`；向右找第一个小于` heights[i] `的位置 `right`，即最大面积为 `heights[i] * (right - left -1)`
>
> 单调递增栈，栈内的元素是递增的
>
> 当元素出栈时，说明这个新元素是出栈元素向后找第一个比其小的元素
>
> 举个例子，栈里是 1 5 6 。接下来新元素是 2 ，那么 6 需要出栈。
> 当 6 出栈时，右边 2 代表是 6 右边第一个比 6 小的元素。
>
> 当元素出栈后，说明新栈顶元素是出栈元素向前找第一个比其小的元素
> 当 6 出栈时，5 成为新的栈顶，那么 5 就是 6 左边第一个比 6 小的元素。

* 思路：每次出栈时，`tmp = stack.pop`，当前的 i 是右边第一个比他小的，栈顶为左边第一个比他小的，只需要`heights[tmp] * (right - left -1)`

```js
var largestRectangleArea = function(heights) {
    if (heights.length === 0) return 0
    if (heights.length === 1) return heights[0]
    heights.unshift(0)
    heights.push(0)
    const stack = []
    stack.push(0)
    let res = 0
    for (let i = 1; i < heights.length; i++) {
        while (stack.length && heights[i] < heights[stack[stack.length - 1]]) {
            let tmp = stack.pop()
            res = Math.max(res, heights[tmp] * (i - stack[stack.length - 1] - 1))
        }
        stack.push(i)
    }
    return res
}
```

## 最大矩形

* [leetcode85](https://leetcode-cn.com/problems/maximal-rectangle/)
* [完全可以把问题转换成上一题](https://leetcode-cn.com/problems/maximal-rectangle/solution/dan-diao-zhan-fa-ba-wen-ti-zhuan-hua-che-uscz/)，针对每一行求最大高度

```js
// 求柱状图最大矩形
const maxArea = function(heights) {
    if (heights.length === 0) return 0
    if (heights.length === 1) return heights[0]
    heights.unshift(0)
    heights.push(0)
    const stack = []
    let res = 0
    for (let i = 0; i < heights.length; i++) {
        while(stack.length && heights[i] < heights[stack[stack.length - 1]]) {
            let tmp = stack.pop()
            res = Math.max(res, heights[tmp] * (i - stack[stack.length - 1] - 1))
        }
        stack.push(i)
    }
    return res
 }

// 针对每一行求最大高度
var maximalRectangle = function(matrix) {
    if (!matrix.length) return 0
    const m = matrix.length, n = matrix[0].length
    const arr = Array.from(new Array(m), () => new Array(n).fill(0))
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (matrix[i][j] == '1') {
                arr[i][j] = i == 0 ? +matrix[i][j]: arr[i - 1][j] + 1
            }
        }
    }
    let res = 0
    for (let i = 0; i < arr.length; i++) {
        res = Math.max(maxArea(arr[i]), res)
    }
    return res
};
```

## 对于任意子序列可以计算一个X值

> X = sum(subArray) * min(subArray)， 求最大X
>
> 例如：[3,1,6,4,5,2]
>
> X = (6+4+5) * 4 = 60

* 单调递增栈，若遍历到某元素比栈顶元素小，那么这个元素就是右侧第一比他小的，出栈，此时栈顶为左侧第一比他小的，所以此时可以结算以出栈元素为最小值的子序列
* 首先3入栈，[3]，遇到1 < 3，3出栈，left = arr[-1] = 0，right = arr[1] = 1，res = 3 * 3 = 9
* 1和6入栈，[1, 6]，遇到 4 < 6，6出栈，left = arr[1] = 1，right = arr[3] = 4, res = 6 * 6 = 36
* [1, 4, 5]，遇到 2 < 5，5出栈，同理 res = 25
* [1, 4]，遇到 2< 4，4出栈，左侧为1，右侧为2，找中间的，res = 4 * (6 + 4 + 5) = 60
* [1, 2]，需要把剩下的全部结算

```js
function calX(arr) {
    let res = 0
    const stack = []
    stack.push(0)
    for (let i = 1; i < arr.length; i++) {
        while (stack.length && arr[i] <= arr[stack[stack.length - 1]]) {
            let tmp = stack.pop()
            let left = stack[stack.length - 1] || -1
            let right = i
            let ans = 0
            for (let j = left + 1; j < right; j++) {
                ans += arr[j]
            }
            res = Math.max(res, ans * arr[tmp])
        }
        stack.push(i)
    }
    console.log(stack) // 此时为 [1, 2],需要将栈中剩余元素结算
    while (stack.length) {
        let tmp = stack.pop()
        let left = stack[stack.length - 1] || -1
        let right = arr.length
        let ans = 0
        for (let j = left + 1; j < right; j++) {
            ans += arr[j]
        }
        res = Math.max(res, ans * arr[tmp])
    }
    return res
}
```

## 每日温度

* [leetcode739](https://leetcode-cn.com/problems/daily-temperatures/)

```js
请根据每日 气温 列表，重新生成一个列表。对应位置的输出为：要想观测到更高的气温，至少需要等待的天数。如果气温在这之后都不会升高，请在该位置用 0 来代替。

例如，给定一个列表 temperatures = [73, 74, 75, 71, 69, 72, 76, 73]，你的输出应该是 [1, 1, 4, 2, 1, 1, 0, 0]。

提示：气温 列表长度的范围是 [1, 30000]。每个气温的值的均为华氏度，都是在 [30, 100] 范围内的整数。
```

### 暴力法

```js
var dailyTemperatures = function(T) {
    let len = T.length
    let res = new Array(len).fill(0)
    for (let i = 1; i < len; i++) {
        for (let j = 0; j < i; j++) {
            if (res[j] === 0 && T[i] > T[j]) {
                res[j] = i - j
            } 
        }
    }
   return res
};
```

### 单调栈

* 维护单调递减栈，一旦入栈元素大于栈顶元素，则 pop，并记录索引的差值
* [图示](https://leetcode-cn.com/problems/daily-temperatures/solution/tu-jie-suan-fa-739mei-ri-wen-du-javascriptjie-ti-b/)

```js
var dailyTemperatures = function(T) {
    let len = T.length
    let res = new Array(len).fill(0), stack = []
    for (let i = 0; i < len; i++) {
        while (stack.length && T[i] > T[stack[stack.length-1]]) {
            res[stack[stack.length-1]] = i - stack[stack.length-1]
            stack.pop()
        }
        stack.push(i)
    }
    return res
};
```

## 两个栈实现队列

```js
class CQueue {
    constructor () {
        this.pushStack = []; // 存储入队的值   模拟入队行为
        this.deleStack = []; // 存储待出队的项 模拟出队行为
    }
    appendTail(v) {
        this.pushStack.push(v);
    }
    deleteHead() {
        // 若待删除栈中有值则直接pop 模拟出队行为
        if (this.deleStack.length) {
            return this.deleStack.pop();
        }
        // 若 push 栈中有值 则全部推入 delete 栈中
        while (this.pushStack.length) {
            this.deleStack.push(this.pushStack.pop());
        }
        // 此时出栈对还无内容，返回 -1
        if(!this.deleStack.length) {
            return -1;
        // 有内容，弹出栈顶，且返回即可
        } else {
            return this.deleStack.pop();
        }
    }
}
```

## 最小栈

* [leetcode155](https://leetcode-cn.com/problems/min-stack/)
* [题解](https://leetcode-cn.com/problems/min-stack/solution/fu-zhu-zhan-zui-xiao-zhan-by-demigodliu-wnpk/)

