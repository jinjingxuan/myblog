---
title: 双指针
date: 2020-11-30 16:00:54
categories: 算法
---
# 双指针
* 盛水最多的容器
* 删除链表的倒数第n个结点
* 环形链表
* 验证回文字符串
* x的平方根

## 盛水最多的容器

* [leetcode11](https://leetcode-cn.com/problems/container-with-most-water/)
* [题解](https://leetcode-cn.com/problems/container-with-most-water/solution/sheng-zui-duo-shui-de-rong-qi-by-leetcode-solution/)

> 给你 n 个非负整数 a1，a2，...，an，每个数代表坐标中的一个点 (i, ai) 。在坐标内画 n 条垂直线，垂直线 i 的两个端点分别为 (i, ai) 和 (i, 0) 。找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。
>
> 说明：你不能倾斜容器。
>
> 示例 1：
> 输入：[1,8,6,2,5,4,8,3,7]
> 输出：49 
> 解释：图中垂直线代表输入数组 [1,8,6,2,5,4,8,3,7]。在此情况下，容器能够容纳水（表示为蓝色部分）的最大值为 49。
>
> 示例 2：
> 输入：height = [1,1]
> 输出：1
>
> 示例 3：
> 输入：height = [4,3,2,1,4]
> 输出：16
>
> 示例 4：
> 输入：height = [1,2,1]
> 输出：2

* 双指针法，原理详看题解

```js
var maxArea = function(height) {
    let left = 0
    let right = height.length - 1
    let ans = 0
    while (left !== right) {
        ans = Math.max(ans, Math.min(height[left], height[right]) * (right - left))
        if (height[left] > height[right]) {
            right --
        } else {
            left ++
        }
    }
    return ans
};
```

## 删除链表的倒数第n个结点

* [leetcode19](https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/)

> 给定一个链表，删除链表的倒数第 n 个节点，并且返回链表的头结点。
>
> 示例：
>
> 给定一个链表: 1->2->3->4->5, 和 n = 2.
>
> 当删除了倒数第二个节点后，链表变为 1->2->3->5.

* 思路：双指针，快的先走 n 步，然后两个一起走到最后，慢的就是倒数第 n 个，只遍历了一次

```js
var removeNthFromEnd = function(head, n) {
    // 创建头节点, 保证输入为 [1], 1 时，不会出现错误
    let pre = new ListNode()
    pre.next = head
    let slow = pre
    let fast = pre
    // fast 先走 n 次
    for (let i = 0; i < n; i++) {
        fast = fast.next
    }
    // 走到尾部
    while (fast.next !== null) {
        slow = slow.next
        fast = fast.next
    }
    // 删除
    slow.next = slow.next.next
    return pre.next
};
```

## 环形链表

* [leetcode141](https://leetcode-cn.com/problems/linked-list-cycle/)

```js
示例 1：
输入：head = [3,2,0,-4], pos = 1
输出：true
解释：链表中有一个环，其尾部连接到第二个节点。

示例 2：
输入：head = [1,2], pos = 0
输出：true
解释：链表中有一个环，其尾部连接到第一个节点。
```

* 快慢指针法
* 快、慢指针，从头节点出发
* 慢指针每次走一步，快指针每次走两步，不断比较它们指向的节点的值
* 如果节点值相同，说明有环。如果不同，继续循环。

## 验证回文字符串

* [leetcode125](https://leetcode-cn.com/problems/valid-palindrome/)

```js
给定一个字符串，验证它是否是回文串，只考虑字母和数字字符，可以忽略字母的大小写。
说明：本题中，我们将空字符串定义为有效的回文串。

示例 1:
输入: "A man, a plan, a canal: Panama"
输出: true

示例 2:
输入: "race a car"
输出: false
```

* `toUpperCase` 方法用于把字符串转换为大写
* `toLowerCase` 方法用于把字符串转换为小写
* `toLocaleLowerCase()` 和 `toLocaleUpperCase()`和上面的区别是根据地区语言来转换，一般用不到
* 正则中`\w`是字符组`[0-9a-zA-Z_]`的简写形式

```js
var isPalindrome = function(s) {
    let i = 0, j = s.length - 1
    s = s.toLowerCase()
    function isValid(str) {
        // const reg = /\w/ , 其中包含下划线，不正确
        const reg = /[0-9a-zA-Z]/
        return reg.test(str)
    }
    while (j >= i) {
        while (!isValid(s[j])) j--
        while (!isValid(s[i])) i++
        if (s[i] !== s[j]) return false
        i++
        j--
    }
    return true
};
```

## x的平方根

* [leetcode69](https://leetcode-cn.com/problems/sqrtx/)

```js
var mySqrt = function(x) {
    let left = 0, right = x, ans = -1
    while (left <= right) {
        mid = Math.floor((left + right) / 2)
        if (mid * mid <= x) {
            left = mid + 1
            ans = mid // 保证结果是向下取整的，很巧妙
        } else if (mid * mid > x) {
            right = mid - 1
        }
    }
    return ans
};
```

