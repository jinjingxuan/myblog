---
title: 贪心
date: 2020-10-28 16:00:54
categories: 算法
---
# 贪心
* 贪心算法
* 移掉 k 位数字
* 非递增顺序的最小子序列
* 柠檬水找零
* 跳跃游戏
* 加油站

## 贪心算法

贪心算法（又称贪婪算法）是指，在对问题求解时，总是做出在当前看来是最好的选择。也就是说，不从整体最优上加以考虑，算法得到的是在某种意义上的局部最优解 。

**贪心算法一般按如下步骤进行： **

①建立数学模型来描述问题 。

②把求解的问题分成若干个子问题。

③对每个子问题求解，得到子问题的局部最优解 。

④把子问题的解局部最优解合成原来解问题的一个解  。

```js
贪心算法是一种对某些求最优解问题的更简单、更迅速的设计技术。贪心算法的特点是一步一步地进行，常以当前情况为基础根据某个优化测度作最优选择，而不考虑各种可能的整体情况，省去了为找最优解要穷尽所有可能而必须耗费的大量时间。贪心算法采用自顶向下，以迭代的方法做出相继的贪心选择，每做一次贪心选择，就将所求问题简化为一个规模更小的子问题，通过每一步贪心选择，可得到问题的一个最优解。虽然每一步上都要保证能获得局部最优解，但由此产生的全局解有时不一定是最优的，所以贪心算法不要回溯
```

**存在的问题**

- 不能保证求得的最后解是最佳的
- 不能用来求最大值或最小值的问题
- 只能求满足某些约束条件的可行解的范围

## 移掉 k 位数字

具体看 [算法-栈](https://www.jinjingxuan.com/2020/10/22/%E7%AE%97%E6%B3%95-%E6%A0%88/#more) 中的最后一题

## 非递增顺序的最小子序列

* [leetcode1403](https://leetcode-cn.com/problems/minimum-subsequence-in-non-increasing-order)

```js
给你一个数组 nums，请你从中抽取一个子序列，满足该子序列的元素之和 严格 大于未包含在该子序列中的各元素之和。

如果存在多个解决方案，只需返回 长度最小 的子序列。如果仍然有多个解决方案，则返回 元素之和最大 的子序列。

与子数组不同的地方在于，「数组的子序列」不强调元素在原数组中的连续性，也就是说，它可以通过从数组中分离一些（也可能不分离）元素得到。

注意，题目数据保证满足所有约束条件的解决方案是 唯一 的。同时，返回的答案应当按 非递增顺序 排列。


示例 1：
输入：nums = [4,3,10,9,8]
输出：[10,9] 
解释：子序列 [10,9] 和 [10,8] 是最小的、满足元素之和大于其他各元素之和的子序列。但是 [10,9] 的元素之和最大。 

示例 2：
输入：nums = [4,4,7,6,7]
输出：[7,7,6] 
解释：子序列 [7,7] 的和为 14 ，不严格大于剩下的其他元素之和（14 = 4 + 4 + 6）。因此，[7,6,7] 是满足题意的最小子序列。注意，元素按非递增顺序返回。  

示例 3：
输入：nums = [6]
输出：[6]
```

* 数组从大到小排序
* 取出最大值放入 ans 中，如果不选这个最大值将不是最优解，选了之后继续进行下一步子问题的选择(贪心)
* 直到取出元素大于所有元素和的一半为止

```js
var minSubsequence = function(nums) {
    let sum = 0
    let tmp = 0
    let ans = []
    for (let i of nums) {
        sum += i
    }
    nums.sort((a, b) => b - a)
    for (let i = 0; i < nums.length; i++) {
        tmp += nums[i]
        if (tmp * 2 > sum) {
            ans = nums.slice(0, i + 1)
            return ans
        }
    }   
};
```

## 柠檬水找零

* [leetcode860](https://leetcode-cn.com/problems/lemonade-change/)

> 在柠檬水摊上，每一杯柠檬水的售价为 5 美元。
>
> 顾客排队购买你的产品，（按账单 bills 支付的顺序）一次购买一杯。
>
> 每位顾客只买一杯柠檬水，然后向你付 5 美元、10 美元或 20 美元。你必须给每个顾客正确找零，也就是说净交易是每位顾客向你支付 5 美元。
>
> 注意，一开始你手头没有任何零钱。
>
> 如果你能给每位顾客正确找零，返回 true ，否则返回 false 。
>
> 示例 1：
>
> 输入：[5,5,5,10,20]
> 输出：true
> 解释：
> 前 3 位顾客那里，我们按顺序收取 3 张 5 美元的钞票。
> 第 4 位顾客那里，我们收取一张 10 美元的钞票，并返还 5 美元。
> 第 5 位顾客那里，我们找还一张 10 美元的钞票和一张 5 美元的钞票。
> 由于所有客户都得到了正确的找零，所以我们输出 true。

* 贪心算法，每次找钱，总是先找大面额的

```js
var lemonadeChange = function(bills) {
    let five = 0, ten = 0
    for (const bill of bills) {
        if (bill === 5) {
            five++
        } else if (bill === 10) {
            if (five < 0) {
                return false
            } else {
                five--
                ten++
            }
        } else {
            if (ten > 0 && five > 0) {
                ten--
                five--
            } else if (five > 3) {
                five-=3
            } else {
                return false
            }
        }
    }
    return true
};
```

## 跳跃游戏

* [leetcode55](https://leetcode-cn.com/problems/jump-game/)
* [题解](https://leetcode-cn.com/problems/jump-game/solution/tiao-yue-you-xi-by-leetcode-solution/)
* 思路：从前向后遍历，维护最远跳跃距离

> 给定一个非负整数数组，你最初位于数组的第一个位置。
>
> 数组中的每个元素代表你在该位置可以跳跃的最大长度。
>
> 判断你是否能够到达最后一个位置。
>
> 示例 1:
>
> 输入: [2,3,1,1,4]
> 输出: true
> 解释: 我们可以先跳 1 步，从位置 0 到达 位置 1, 然后再从位置 1 跳 3 步到达最后一个位置。
> 示例 2:
>
> 输入: [3,2,1,0,4]
> 输出: false
> 解释: 无论怎样，你总会到达索引为 3 的位置。但该位置的最大跳跃长度是 0 ， 所以你永远不可能到达最后一个位置。

```js
var canJump = function(nums) {
    let distance = 0
    for (let i = 0; i < nums.length; i++) {
        if (i <= distance) {
            distance = Math.max(distance, i + nums[i])
            if (distance >= nums.length - 1) {
                return true
            }
        }
    }
    return false
};
```

## 加油站

* [leetcode134](https://leetcode-cn.com/problems/gas-station/)

> 输入: 
> gas  = [1,2,3,4,5]
> cost = [3,4,5,1,2]
>
> 输出: 3
>
> 解释:
> 从 3 号加油站(索引为 3 处)出发，可获得 4 升汽油。此时油箱有 = 0 + 4 = 4 升汽油
> 开往 4 号加油站，此时油箱有 4 - 1 + 5 = 8 升汽油
> 开往 0 号加油站，此时油箱有 8 - 2 + 1 = 7 升汽油
> 开往 1 号加油站，此时油箱有 7 - 3 + 2 = 6 升汽油
> 开往 2 号加油站，此时油箱有 6 - 4 + 3 = 5 升汽油
> 开往 3 号加油站，你需要消耗 5 升汽油，正好足够你返回到 3 号加油站。
> 因此，3 可为起始索引。

### 暴力解法

* 首先计算 gas 与 cost 的差值，例如 gas  = [1,2,3,4,5]，cost = [3,4,5,1,2]，sub为 [-2, -2, -2, 3, 3]
* 其中 sub[i] > 0  才能作为起始点
* 题目就变为找出sub数组中的索引值 i，从 i 开始轮一圈判断剩余油量大于0直到循环一轮结束
* 时间复杂度 O(n^2)

```JS
var canCompleteCircuit = function(gas, cost) {
    let n = gas.length
    for (let i = 0; i < n; i++) {
        if (gas[i] - cost[i] >= 0) {
            let count = gas[i] - cost[i]
            let pos = (i + 1) % n
            let flag = true
            while (pos !== i) {
                count += gas[pos] - cost[pos]
                if (count < 0) {
                    flag = false
                    break
                }
                pos = (pos + 1) % n
            }
            if (!flag) continue
            else return i
        }
    }
    return -1
};
```

### 贪心解法

* 首先如果总油量减去总消耗大于等于零那么一定可以跑完一圈，则一定可以找到一个解（即索引i），至于为什么可以参考[这篇题解](https://leetcode-cn.com/problems/gas-station/solution/shou-hua-tu-jie-liang-ge-guan-jian-jie-lun-de-jian/)，如果小于零直接返回 -1
* 同样的每个加油站的剩余量sub[i]为gas[i] - cost[i]。
* i从0开始累加sub[i]，和记为curSum，一旦curSum小于零，说明[0, i]区间都不能作为起始位置，因为小于0说明无法到达，这时起始位置从i+1算起，再从0计算curSum。
* 那么为什么一旦[i，j] 区间和为负数，起始位置就可以是j+1呢，j+1后面就不会出现负数？因为如果出现更大的负数，就是更新j，那么起始位置又变成新的j+1了。
* 时间复杂度 O(n)

```js
var canCompleteCircuit = function(gas, cost) {
  let total = 0; // 总的剩余油料
  let sub = 0;  // 当前站点的剩余油料
  let start = 0; // 起始点
  for(let i = 0; i < gas.length; i++) {
    sub += gas[i] - cost[i];
    if (sub < 0) {
      start = i + 1;
      sub = 0;
    }
    total += gas[i] - cost[i]
  }
  return total >= 0 ? start: -1;
};
```
