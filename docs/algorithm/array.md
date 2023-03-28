---
title: 数组操作
date: 2020-11-16 16:00:54
categories: 算法
---
# 数组操作
* 合并两个有序数组
* 合并区间
* 二分查找
* 只出现一次的数字
* 找到所有数组中消失的数字
* 两数之和
* 三数之和
* 数字数组去重排序
* 删除排序数组中的重复项
* 旋转矩阵
* 非递减数列
* 顺时针打印矩阵
* 最长湍流子数组
* 长度最小子数组
* 寻找两个正序数组的中位数
* 从两个数组中找出共有的元素
* 二分查找（有重复元素）

## 合并两个有序数组

* [leetcode88](https://leetcode-cn.com/problems/merge-sorted-array/)
* 要求：时间复杂度`O(m + n)`，不需要额外空间
* [图示](https://leetcode-cn.com/problems/merge-sorted-array/solution/88-by-ikaruga/)

```js
var merge = function(nums1, m, nums2, n) {
    let i = m - 1;
    let j = n - 1;
    let len = i + j + 1;
    while (j >= 0) {
        nums1[len--] = nums1[i] >= nums2[j] ? nums1[i--] : nums2[j--];
    }
};

// 参数如果只给了两个普通的数组
const merge = (nums1, nums2) => {
    let i = nums1.length - 1;
    let j = nums2.length - 1;
    let len = i + j + 1;
    nums1 = nums1.concat(new Array(nums2.length).fill(0));
    while (j >= 0) {
        nums1[len--] = nums1[i] >= nums2[j] ? nums1[i--] : nums2[j--];
    }
    return nums1;
}

```

## 合并区间

题目来源：[leetcode56](https://leetcode-cn.com/problems/merge-intervals/)

```js
示例 1:

输入: intervals = [[1,3],[2,6],[8,10],[15,18]]
输出: [[1,6],[8,10],[15,18]]
解释: 区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].

示例 2:
输入: intervals = [[1,4],[4,5]]
输出: [[1,5]]
解释: 区间 [1,4] 和 [4,5] 可被视为重叠区间。
```

* 思路

```js
// 1. 先按照 intervals[i][0] 从小到大排序
// 2. intervals[i][1] >= intervals[i+1][1] 直接取 intervals[i][1] : [1,4] [2,3] 直接取 [1,4]
// 3. intervals[i][1] >= intervals[i+1][0] 时 intervals[i][1] = intervals[i+1][1] ：[1,4] [3,5] 取 [1,5]  
// 4. 设置一个 flag，如果此轮合并过，继续合并下一轮  
```

* 个人解法

```js
var merge = function(intervals) {
    let flag = true;
    intervals.sort((a,b) => a[0] - b[0]);
    while (flag) {
        flag = false;
        for (let i = 0; i < intervals.length - 1; i++) {
            if (intervals[i][1] >= intervals[i + 1][1]) {
                intervals.splice(i + 1, 1);
                flag = true;
            }
            else if (intervals[i][1] >= intervals[i + 1][0]) {
                intervals[i][1] = intervals[i + 1][1];
                intervals.splice(i + 1,1);
                flag = true;
            }     
        }
    }
    return intervals;
};
```

## 二分查找

* [leetcode704](https://leetcode-cn.com/problems/binary-search/)

```js
var search = function(nums, target) {
    let left = 0;
    let right = nums.length - 1;
    while(left <= right) {
        let mid = Math.floor((left + right)/2);
        if (nums[mid] > target) {
            right = mid - 1;
        }
        else if (nums[mid] < target) {
            left = mid + 1;
        }
        else {
            return mid;
        }
    }
    return -1;
};
```

## 只出现一次的数字

* [leetcode136](https://leetcode-cn.com/problems/single-number/)

```js
给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。

说明：

你的算法应该具有线性时间复杂度。 你可以不使用额外空间来实现吗？

示例 1:

输入: [2,2,1]
输出: 1
示例 2:

输入: [4,1,2,1,2]
输出: 4
```

* 任何数和 0 做异或运算，结果仍然是原来的数，
* 任何数和其自身做异或运算，结果是 0
* 异或运算满足交换律和结合律

```js
var singleNumber = function(nums) {
    return nums.reduce((pre, item) => pre ^ item, 0)
};
```

## 找到所有数组中消失的数字

* [leetcode448](https://leetcode-cn.com/problems/find-all-numbers-disappeared-in-an-array/)

```js
给定一个范围在  1 ≤ a[i] ≤ n ( n = 数组大小 ) 的 整型数组，数组中的元素一些出现了两次，另一些只出现一次。

找到所有在 [1, n] 范围之间没有出现在数组中的数字。

您能在不使用额外空间且时间复杂度为O(n)的情况下完成这个任务吗? 你可以假定返回的数组不算在额外空间内。

示例:

输入:
[4,3,2,7,8,2,3,1]

输出:
[5,6]
```

* 值表示索引

```js
var findDisappearedNumbers = function(nums) {
    let arr = [], res = []
    for (let i = 0; i < nums.length; i++) {
        arr[nums[i]-1] = 1
    }
    for (let i = 0; i < nums.length; i++) {
        if (arr[i] !== 1) {
            res.push(i+1)
        } 
    }
    return res
};
```

## 两数之和

* [leetcode1](https://leetcode-cn.com/problems/two-sum/)

```js
给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。

你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。

你可以按任意顺序返回答案。
```

```js
var twoSum = function(nums, target) {
    let map = new Map()
    for (let i = 0; i < nums.length; i++) {
        if (map.has(target - nums[i])) return [map.get(target - nums[i]), i]
        map.set(nums[i], i)
    }
};
```

## 三数之和

* [leetcode15](https://leetcode-cn.com/problems/3sum/)

```js
给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有满足条件且不重复的三元组。

注意：答案中不可以包含重复的三元组。

 

示例：

给定数组 nums = [-1, 0, 1, 2, -1, -4]，

满足要求的三元组集合为：
[
  [-1, 0, 1],
  [-1, -1, 2]
]
```

* 双指针讲思路，注意去重
* [题解](https://leetcode-cn.com/problems/3sum/solution/man-hua-jue-bu-wu-ren-zi-di-xiang-kuai-su-kan-dong/)

```js
var threeSum = function(nums) {
    nums.sort((a, b) => a - b)
    const res = []
    for (let i = 0; i < nums.length - 2; i++) {
        if (nums[i] > 0) break
        let l = i + 1, r = nums.length - 1
        if (i == 0 || nums[i] != nums[i - 1]) {
            while (l < r) {
                if (nums[i] + nums[l] + nums[r] > 0) r--
                else if (nums[i] + nums[l] + nums[r] < 0) l++
                else {
                    res.push([nums[i], nums[l], nums[r]])
                    while (l < r && nums[l] == nums[l + 1]) l++
                    while (l < r && nums[r] == nums[r - 1]) r--
                    l++, r--
                }
            }
        }
    }
    return res
};
```

## 数字数组去重排序

* 用下标表示数字，空间复杂度较高，一般不建议使用

```js
const arr = [5, 1, 1, 3, 2, 0]

const foo = (arr) => {
  const res = []
  const ans = []
  for (let i in arr) {
      res[arr[i]] = 1
  }
  for (let i in res) {
      ans.push(i)
  }
  return ans
}
```

## 删除排序数组中的重复项

> 示例 1:
>
> 给定数组 nums = [1,1,2], 
>
> 函数应该返回新的长度 2, 并且原数组 nums 的前两个元素被修改为 1, 2。 (注意只需修改，不需删除)
>
> 你不需要考虑数组中超出新长度后面的元素。
>
> 示例 2:
>
> 给定 nums = [0,0,1,1,1,2,2,3,3,4],
>
> 函数应该返回新的长度 5, 并且原数组 nums 的前五个元素被修改为 0, 1, 2, 3, 4。
>
> 你不需要考虑数组中超出新长度后面的元素。

* 遍历一次，不重复的放在数组前几位，时间复杂度O（n)

```js
var removeDuplicates = function(nums) {
    let len = 1
    for(let i = 1; i < nums.length; i++){
        if(nums[i]!==nums[i-1]) nums[len++] = nums[i]
    }
    return len
};
```

> 给定 nums = [3,2,2,3], val = 3,
>
> 函数应该返回新的长度 2, 并且 nums 中的前两个元素均为 2。
>
> 你不需要考虑数组中超出新长度后面的元素。
>
>
> 给定 nums = [0,1,2,2,3,0,4,2], val = 2,
>
> 函数应该返回新的长度 5, 并且 nums 中的前五个元素为 0, 1, 3, 0, 4。
>
> 注意这五个元素可为任意顺序。
>
> 你不需要考虑数组中超出新长度后面的元素。

```js
var removeElement = function(nums, val) {
    let len = 0
    for(let i = 0; i < nums.length; i++){
        if(nums[i] !== val) nums[len++] = nums[i]
    }
    return len
};
```

## 旋转矩阵

* [leetcode48](https://leetcode-cn.com/problems/rotate-image/)

> 你必须在原地旋转图像，这意味着你需要直接修改输入的二维矩阵。请不要使用另一个矩阵来旋转图像。
>
> 示例 1:
>
> 给定 matrix = 
> [
>   [1,2,3],
>   [4,5,6],
>   [7,8,9]
> ],
>
> 原地旋转输入矩阵，使其变为:
> [
>   [7,4,1],
>   [8,5,2],
>   [9,6,3]
> ]

```js
var rotate = function(matrix) { 
    const len = matrix.length;
    for(let i = 0; i < len; i++){
        for(let j = 0; j < len; j++){
            let curr = matrix[i].pop()
            matrix[len - j - 1].unshift(curr)
        }
    }
};
```

* 具体过程如下：

```js
[ [ 1, 2 ], [ 4, 5, 6 ], [ 3, 7, 8, 9 ] ]

[ [ 1 ], [ 2, 4, 5, 6 ], [ 3, 7, 8, 9 ] ]

[ [ 1 ], [ 2, 4, 5, 6 ], [ 3, 7, 8, 9 ] ]

[ [ 1 ], [ 2, 4, 5 ], [ 6, 3, 7, 8, 9 ] ]

[ [ 1 ], [ 5, 2, 4 ], [ 6, 3, 7, 8, 9 ] ]

[ [ 4, 1 ], [ 5, 2 ], [ 6, 3, 7, 8, 9 ] ]

[ [ 4, 1 ], [ 5, 2 ], [ 9, 6, 3, 7, 8 ] ]

[ [ 4, 1 ], [ 8, 5, 2 ], [ 9, 6, 3, 7 ] ]

[ [ 7, 4, 1 ], [ 8, 5, 2 ], [ 9, 6, 3 ] ]
```

## 非递减数列

* [leetcode665](https://leetcode-cn.com/problems/non-decreasing-array/)

* [题解](https://leetcode-cn.com/problems/non-decreasing-array/solution/3-zhang-dong-tu-bang-zhu-ni-li-jie-zhe-d-06gi/)

```js
var checkPossibility = function(nums) {
    let count = 0
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] < nums[i-1]) {
            if (i === 1 || nums[i] >= nums[i-2]) {
                nums[i-1] = nums[i]
            } else {
                nums[i] = nums[i-1]
            }
            count ++
        }
    }
    return count <= 1
};
```

## 顺时针打印矩阵

* [leetcode54](https://leetcode-cn.com/problems/spiral-matrix/)
* [【手绘图解】两种遍历的策略，看你喜欢哪种](https://leetcode-cn.com/problems/spiral-matrix/solution/shou-hui-tu-jie-liang-chong-bian-li-de-ce-lue-kan-/)

```js
示例 1：
输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
输出：[1,2,3,6,9,8,7,4,5]

示例 2：
输入：matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
输出：[1,2,3,4,8,12,11,10,9,5,6,7]
```

```js
var spiralOrder = function(matrix) {
    if (!matrix.length) return [];
    let left = 0, right = matrix[0].length - 1, top = 0, bottom = matrix.length - 1;
    const res = [];
    while (right > left && bottom > top) {
        for (let i = left; i < right; i++) res.push(matrix[top][i]); // 上层
        for (let i = top; i < bottom; i++) res.push(matrix[i][right]); // 右层
        for (let i = right; i > left; i--) res.push(matrix[bottom][i]); // 下层
        for (let i = bottom; i > top; i--) res.push(matrix[i][left]); // 左层
        // 四个边界同时收缩，进入内层
        left++;
        right--;
        top++;
        bottom--;
    }
    // 剩下一列，从上到下依次添加
    if (left === right) {
        for (let i = top; i <= bottom; i++) res.push(matrix[i][left]);
    }
    // 剩下一行，从左到右依次添加
    else if (top === bottom) {
        for (let i = left; i <= right; i++) res.push(matrix[top][i]);
    }
    return res;
}
```

## 最长湍流子数组

* [leetcode978](https://leetcode-cn.com/problems/longest-turbulent-subarray/)

* [题解](https://leetcode-cn.com/problems/longest-turbulent-subarray/solution/mo-ni-dan-zhi-zhen-on-o1-by-xiaohaicai-7qy6/)

```js
var maxTurbulenceSize = function(arr) {
    let n = arr.length,
        maxNum = Number.MIN_SAFE_INTEGER,
        cur = 1
    if(n === 1) return 1
    for(let i = 1; i < n; i++) {
        if(arr[i] === arr[i-1]) {
            cur = 1
        }else if(arr[i] > arr[i-1] && arr[i-2] >= arr[i-1]) {
            cur++
        } else if(arr[i] < arr[i-1] && arr[i-2] <= arr[i-1]) {
            cur++
        } else {
            cur = 2
        }
        maxNum = Math.max(maxNum, cur)
    }
    return maxNum;
};
```

## 长度最小子数组(滑动窗口)

* [leetcode209](https://leetcode-cn.com/problems/minimum-size-subarray-sum/)
* [题解](https://leetcode-cn.com/problems/minimum-size-subarray-sum/solution/209shuang-zhi-zhen-hua-dong-chuang-kou-by-fo-qian-/)

```js
var minSubArrayLen = function(s, nums) {
    const int_max = Number.MAX_SAFE_INTEGER
    var i = 0, sum = 0, ans = int_max
    for (var j = 0; j < nums.length; j++) {
        sum += nums[j]
        while (sum >= s) {
            ans = Math.min(ans, j - i + 1)
            sum -= nums[i++]
        }
    }
    return ans === int_max ? 0 : ans
};
```

## 寻找两个正序数组的中位数

* [leetcode4]((https://leetcode-cn.com/problems/median-of-two-sorted-arrays/))

```js
var findMedianSortedArrays = function(nums1, nums2) {
    let i = nums1.length - 1, j = nums2.length - 1
    nums1 = nums1.concat(new Array(j + 1).fill(0))
    let k = nums1.length - 1
    while (j >= 0) {
        nums1[i] > nums2[j] ? nums1[k--] = nums1[i--] : nums1[k--] = nums2[j--]
    }
    if (nums1.length % 2 === 0) {
        return (nums1[nums1.length / 2] + nums1[nums1.length / 2 - 1]) / 2
    } else {
        return nums1[~~(nums1.length / 2)]
    }
};
```

## 从两个数组中找出共有的元素

```js
// 从两个数组中找出共有的元素。
// 示例： arr1 = [1,2,3,4]; arr2=[3,4,5,6]
// intersection(arr1, arr2);
// output [3,4]

function intersection(arr1, arr2) {
    return arr1.filter(item => arr2.includes(item))
}

function intersection(arr1, arr2) {
    const map = new Map()
    const res = []
    for (const item of arr1) {
        if (!map.get(item)) {
            map.set(item, 1)
        }
    }
    for (const item of arr2) {
        if (map.get(item)) {
            res.push(item)
        }
    }
    return res
}
```

## 二分查找（有重复元素）

> 一个有序可重复数组，指定target，返回该target在数组中的位置。
>
> [1,2,2,3,4,5]
>
> 1 => [0]
>
> 2 = >[1,2]
>
> 10 = > [-1]

```js
function search(arr, target) {
    const res = []
    let left = 0, right = arr.length - 1
    while (left <= right) {
        let mid = (left + right) >> 1
        if (arr[mid] === target) {
            res.push(mid)
            let index1 = index2 = mid
            while (arr[index1 + 1] === arr[index1]) {
                res.push(index1 + 1)
                index1++
            }
            while (arr[index2 - 1] === arr[index2]) {
                res.push(index2 - 1)
                index2--
            }
            break
        } else if (arr[mid] > target) {
            right = mid - 1
        } else {
            left = mid + 1
        }
    }
    return res.length ? res : [-1]
}
```

