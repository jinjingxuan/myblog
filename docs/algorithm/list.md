---
title: 链表
date: 2020-11-13 16:00:54
categories: 算法
---
# 链表
* 奇偶链表
* 旋转链表
* 两两交换链表元素
* 环形链表
* 环形链表2
* 删除链表的倒数第n个结点
* 合并两个有序链表
* 合并k个有序链表
* 链表反转
* 输出链表倒数第K个结点
* 排序链表
* 相交链表
* k个一组反转链表

## 奇偶链表

* [leetcode328](https://leetcode-cn.com/problems/odd-even-linked-list)

```js
给定一个单链表，把所有的奇数节点和偶数节点分别排在一起。请注意，这里的奇数节点和偶数节点指的是节点编号的奇偶性，而不是节点的值的奇偶性。

请尝试使用原地算法完成。你的算法的空间复杂度应为 O(1)，时间复杂度应为 O(nodes)，nodes 为节点总数。

示例 1:

输入: 1->2->3->4->5->NULL
输出: 1->3->5->2->4->NULL
示例 2:

输入: 2->1->3->5->6->4->7->NULL 
输出: 2->3->6->7->1->5->4->NULL
```

* 思路：拆分链表再组合

```js
var oddEvenList = function(head) {
    if (head === null) return head
    let odd = head, evenHead = head.next
    let even = evenHead
    while (even !== null && even.next !== null) {
        odd.next = even.next
        odd = odd.next
        even.next = odd.next
        even = even.next
    }
    odd.next = evenHead
    return head
};
```

## 旋转链表

* [leetcode61](https://leetcode-cn.com/problems/rotate-list)

```js
给定一个链表，旋转链表，将链表每个节点向右移动 k 个位置，其中 k 是非负数。

示例 1:
输入: 1->2->3->4->5->NULL, k = 2
输出: 4->5->1->2->3->NULL
解释:
向右旋转 1 步: 5->1->2->3->4->NULL
向右旋转 2 步: 4->5->1->2->3->NULL

示例 2:
输入: 0->1->2->NULL, k = 4
输出: 2->0->1->NULL
解释:
向右旋转 1 步: 2->0->1->NULL
向右旋转 2 步: 1->2->0->NULL
向右旋转 3 步: 0->1->2->NULL
向右旋转 4 步: 2->0->1->NULL
```

* 思路：成环再打开
* 遍历链表，找到链尾接环，记录链表长度 n
* k = k % n ，找到断开位置 n-k 

```js
var rotateRight = function(head, k) {
    if (head === null) return head
    let p = head, n = 1
    while (p.next !== null) {
        p = p.next
        n++
    }
    p.next = head
    k = k % n
    for (let i = 0; i < n-k-1; i++) {
        head = head.next
    }
    let tmp = head
    head = head.next
    tmp.next = null
    return head
};
```

## 两两交换链表元素

* [leetcode24](https://leetcode-cn.com/problems/swap-nodes-in-pairs/solution/)

* [题解](https://leetcode-cn.com/problems/swap-nodes-in-pairs/solution/shou-hua-tu-jie-24-liang-liang-jiao-huan-lian-biao/)

```js
给定一个链表，两两交换其中相邻的节点，并返回交换后的链表。

你不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。

示例 1：
输入：head = [1,2,3,4]
输出：[2,1,4,3]

示例 2：
输入：head = []
输出：[]

示例 3：
输入：head = [1]
输出：[1]
```

```js
var swapPairs = function(head) {
    const dummy = new ListNode(0)
    dummy.next = head
    let prev = dummy
    while (head && head.next) {
        const next = head.next
        head.next = next.next
        next.next = head
        prev.next = next

        prev = head
        head = head.next
    }
    return dummy.next
}
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

```js
var hasCycle = function(head) {
    let slow = head;
    let fast = head;
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow === fast) return true;
    }
    return false;
};
```

```js
// 如果对象中存在循环引用，则 JSON.stringify 报错
var hasCycle = function(head) {
    try {
        JSON.stringify(head)
    } catch(e) {
        return true
    }
    return false
};
```

## 环形链表2

* [leetcode142](https://leetcode-cn.com/problems/linked-list-cycle-ii/)
* 相比上一题需要找到环形入口，具体可参考题解[「手画图解+公式推导」链表有环，如何求入环点？](https://leetcode-cn.com/problems/linked-list-cycle-ii/solution/141ti-de-kuo-zhan-ru-guo-lian-biao-you-huan-ru-he-/)

```js
var detectCycle = function(head) {
    let fast = head;
    let slow = head;
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow === fast) {
            let slow = head;
            while (slow !== fast) {
                slow = slow.next;
                fast = fast.next;
            }
            return slow;
        }
    }
    return null;
};
```

## 删除链表的倒数第n个结点

* [leetcode19](https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/)

```js
给定一个链表，删除链表的倒数第 n 个节点，并且返回链表的头结点。

示例：

给定一个链表: 1->2->3->4->5, 和 n = 2.

当删除了倒数第二个节点后，链表变为 1->2->3->5.
```

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

## 合并两个有序链表

* [leetcode21](https://leetcode-cn.com/problems/merge-two-sorted-lists/)

```js
将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。 

示例：

输入：1->2->4, 1->3->4
输出：1->1->2->3->4->4
```

```js
var mergeTwoLists = function(l1, l2) {
    if (l1 === null) return l2
    if (l2 === null) return l1
    if (l1.val < l2.val) {
        l1.next = mergeTwoLists(l1.next, l2)
        return l1
    } else {
        l2.next = mergeTwoLists(l1, l2.next)
        return l2
    }
};
```

## 合并k个有序链表

* [leetcode23](https://leetcode-cn.com/problems/merge-k-sorted-lists/)

```js
给你一个链表数组，每个链表都已经按升序排列。
请你将所有链表合并到一个升序链表中，返回合并后的链表。

示例 1：
输入：lists = [[1,4,5],[1,3,4],[2,6]]
输出：[1,1,2,3,4,4,5,6]
解释：链表数组如下：
[
  1->4->5,
  1->3->4,
  2->6
]
将它们合并到一个有序链表中得到。
1->1->2->3->4->4->5->6

示例 2：
输入：lists = []
输出：[]

示例 3：
输入：lists = [[]]
输出：[]
```


* 分治：把 k 个链表拆分，利用合并两个链表来操作

```js
var mergeKLists = function (lists) {
  if (lists.length === 0) return null
  if (lists.length === 1) return lists[0]
  if (lists.length === 2) {
    return mergeTwoLists(lists[0], lists[1])
  }
  
  const mid = lists.length >> 1
  const l1 = [], l2 = []
  for (let i = 0; i < mid; i++) {
    l1[i] = lists[i];
  }
  for (let i = mid, j = 0; i < lists.length; i++, j++) {
    l2[j] = lists[i]
  }
  return mergeTwoLists(mergeKLists(l1), mergeKLists(l2))
};
```

## 链表反转

* [剑指offer24](https://leetcode-cn.com/problems/fan-zhuan-lian-biao-lcof/)

* [题解](https://leetcode-cn.com/problems/fan-zhuan-lian-biao-lcof/solution/jian-zhi-offer-24-fan-zhuan-lian-biao-die-dai-di-2/)

```js
var reverseList = function(head) {
    let pre = null
    let cur = head
    while (cur) {
        tmp = cur.next // 暂存后继节点 cur.next
        cur.next = pre // 修改 next 引用指向
        pre = cur      // pre 暂存 cur
        cur = tmp      // cur 访问下一节点
    }
    return pre
};
```

## 链表中倒数第k个结点

* [剑指offer22](https://leetcode-cn.com/problems/lian-biao-zhong-dao-shu-di-kge-jie-dian-lcof/submissions/)

```js
var getKthFromEnd = function(head, k) {
    let arr = []
    while (head) {
        arr.unshift(head)
        head = head.next
    }
    return arr[k - 1]
};
```

## 排序链表

* [leetcode148](https://leetcode-cn.com/problems/sort-list/)
* [题解](https://leetcode-cn.com/problems/sort-list/solution/jsjie-pai-xu-lian-biao-wen-ti-by-user7746o/)

```js
// 合并两个有序链表
const mergeTwoLists = function(l1, l2) {
    if (l1 === null) return l2
    if (l2 === null) return l1
    if (l1.val < l2.val) {
        l1.next = mergeTwoLists(l1.next, l2)
        return l1
    } else {
        l2.next = mergeTwoLists(l1, l2.next)
        return l2
    }
}

// 获取中间节点
// - 如果链表长度为奇数，则返回中间节点
// - 如果链表长度为偶数，则有两个中间节点，这里返回第一个
const middleNode = function(head) {
    let fast = head, slow = head
    while(fast.next && fast.next.next) {
        slow = slow.next
        fast = fast.next.next
    }
    return slow
}

var sortList = function(head) {
    if (head === null || head.next === null) return head
    // 获取中间节点
    let middle = middleNode(head)
    // 分裂成两个链表
    let temp = middle.next
    middle.next = null
    let left = head, right = temp
    // 继续分裂（递归分裂）
    left = sortList(left)
    right = sortList(right)
    // 合并两个有序链表
    return mergeTwoLists(left, right)
};
```

## 相交链表

* [leetcode160](https://leetcode-cn.com/problems/intersection-of-two-linked-lists/)
* [题解](https://leetcode-cn.com/problems/intersection-of-two-linked-lists/solution/160xiang-jiao-lian-biao-shuang-zhi-zhen-ha-xi-biao/#%E6%96%B9%E6%B3%95-3%E5%8F%8C%E6%8C%87%E9%92%88)

```js
var getIntersectionNode = function(headA, headB) {
    if (headA === null || headB === null) return null
    let p = headA, q = headB
    while (p !== q) {
        p = p === null ? headB : p.next
        q = q === null ? headA : q.next
    }
    return p
};
```

## k个一组反转链表

* [leetcode25](https://leetcode-cn.com/problems/reverse-nodes-in-k-group/)
* 思路和反转链表类似，每K个反转一次

```js
var reverseKGroup = function(head, k) {
    let cur = head, count = 0
    while (cur !== null && count !== k) {
        cur = cur.next
        count ++
    }
    if (count === k) {
        pre = reverseKGroup(cur, k)
        while (count --) {
            let tmp = head.next
            head.next = pre
            pre = head
            head = tmp
        }
        head = pre
    }
    return head
}
```

