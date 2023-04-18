---
title: 十大排序算法
date: 2020-12-17 11:27:54
categories: 算法
---
# 十大排序算法
* 冒泡排序
* 选择排序
* 插入排序
* 希尔排序
* 归并排序
* 快速排序
* 堆排序
* 计数排序
* 桶排序
* 基数排序

参考文章：[十大经典排序算法总结（JavaScript描述）](https://juejin.cn/post/6844903444365443080#heading-38)

## 常用术语

**稳定**：如果a原本在b前面，而a=b，排序之后a仍然在b的前面； 

**不稳定**：如果a原本在b的前面，而a=b，排序之后a可能会出现在b的后面；

**内排序**：所有排序操作都在内存中完成； 

**外排序**：由于数据太大，因此把数据放在磁盘中，而排序通过磁盘和内存的数据传输才能进行；

**时间复杂度**: 一个算法执行所耗费的时间。

**空间复杂度**: 运行完一个程序所需内存的大小。

![img](https://static001.geekbang.org/infoq/26/26d77c968c576919964853afd90eb6bc.png)

## 冒泡排序

1. 比较相邻的元素。如果第一个比第二个大，就交换他们两个。
2. 对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对。这步做完后，最后的元素会是最大的数。
3. 针对所有的元素重复以上的步骤，除了最后一个。
4. 持续每次对越来越少的元素重复上面的步骤，直到没有任何一对数字需要比较

```js
const bubbleSort = function(arr) {
    const len = arr.length;
    // len 长度只需循环 len - 1 次，就会把 len - 1 个大元素放在后面，即排序成功
    for (let i = 0; i < len - 1; i++) {
        // i 每循环一次后都会选出最大的放到最后
        // 所以是 j 只需判断 len - i, 又因为下面是 j + 1 和 j 比较, 所以是 len - i - 1
        for (let j = 0; j < len - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // 交换
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}
```

## 选择排序

1. 在未排序序列中找到最小（大）元素，存放到排序序列的起始位置
2. 从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾
3. 以此类推，直到所有元素均排序完毕

```js
const selectSort = nums => {
    for (let i = 0; i < nums.length - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[j] < nums[minIndex]) {
                minIndex = j;
            }
        }
        [nums[i], nums[minIndex]] = [nums[minIndex], nums[i]];
    }
    return nums;
}
```

## 插入排序

1. 从第一个元素开始，该元素可以认为已经被排序
2. 取出下一个元素，在已经排序的元素序列中从后向前扫描
3. 如果该元素（已排序）大于新元素，将该元素移到下一位置
4. 重复步骤3，直到找到已排序的元素小于或者等于新元素的位置
5. 将新元素插入到该位置后
6. 重复步骤2~5

```js
function insertionSort(array) {
    for (var i = 1; i < array.length; i++) {
      var key = array[i];
      var j = i - 1;
      while (j >= 0 && array[j] > key) {
        array[j + 1] = array[j];
        j--;
      }
      array[j + 1] = key;
    }
    return array;
}
```

## 希尔排序

1. 选择一个增量序列t1，t2，…，tk，其中ti>tj，tk=1；

2. 按增量序列个数k，对序列进行k 趟排序；

3. 每趟排序，根据对应的增量ti，将待排序列分割成若干长度为m 的子序列，分别对各子表进行直接插入排序。仅增量因子为1 时，整个序列作为一个表来处理，表长度即为整个序列的长度。

```js
function shellSort(arr) {
    var len = arr.length,
        temp,
        gap = 1;
    while(gap < len/5) {          //动态定义间隔序列
        gap =gap*5+1;
    }
    for (gap; gap > 0; gap = Math.floor(gap/5)) {
        for (var i = gap; i < len; i++) {
            temp = arr[i];
            for (var j = i-gap; j >= 0 && arr[j] > temp; j-=gap) {
                arr[j+gap] = arr[j];
            }
            arr[j+gap] = temp;
        }
    }
    return arr;
}
```

## 归并排序

> 归并排序是建立在归并操作上的一种有效的排序算法。该算法是采用分治法（Divide and Conquer）的一个非常典型的应用。归并排序是一种稳定的排序方法。将已有序的子序列合并，得到完全有序的序列；即先使每个子序列有序，再使子序列段间有序。若将两个有序表合并成一个有序表，称为2-路归并。

1. 把长度为n的输入序列分成两个长度为n/2的子序列；

2. 对这两个子序列分别采用归并排序；

3. 将两个排序好的子序列合并成一个最终的排序序列。

```js
function mergeSort(arr) {  //采用自上而下的递归方法
    var len = arr.length;
    if(len < 2) {
        return arr;
    }
    var middle = Math.floor(len / 2),
        left = arr.slice(0, middle),
        right = arr.slice(middle);
    return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right)
{
    var result = [];
    while (left.length && right.length) {
        if (left[0] <= right[0]) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }

    while (left.length)
        result.push(left.shift());

    while (right.length)
        result.push(right.shift());
    return result;
}
```

## 快速排序

* [图示](https://leetcode-cn.com/problems/sort-an-array/solution/dong-hua-mo-ni-yi-ge-kuai-su-pai-xu-wo-x-7n7g/)

```js
// 快排的基本思想是分治，选择一个枢纽，小的放它左面，大的右面，这样pivot放在了最终位置
// 然后再对 pivot 左右两个子表排序

const partition = (arr, low, high) => {
    const pivot = arr[low];
    while (low < high) {
        while (low < high && arr[high] >= pivot) high--;
        arr[low] = arr[high];
        while (low < high && arr[low] <= pivot) low++;
        arr[high] = arr[low];
    }
    arr[low] = pivot;
    return low;
}

const quickSort = (arr, low, high) => {
    if (low < high) {
        const index = partition(arr, low, high);
        quickSort(arr, low, index - 1);
        quickSort(arr, index + 1, high);
    }
}

const sortArray = arr => {
    quickSort(arr, 0, arr.length - 1);
    return arr;
}

[4, 7, 6, 5, 3, 2, 8, 1]
// 一次排序过程
[1, 7, 6, 5, 3, 2, 8, -]
[1, -, 6, 5, 3, 2, 8, 7]
[1, 2, 6, 5, 3, -, 8, 7]
[1, 2, -, 5, 3, 6, 8, 7]
[1, 2, 3, 5, -, 6, 8, 7]
[1, 2, 3, -, 5, 6, 8, 7]
[1, 2, 3, 4, 5, 6, 8, 7]

// 优化：
// 1.子序列的规模较小时，不用在递归调用快排，可以采取直接插入排序
// 2.尽量选一个可以将数据中分的枢纽元素，比如从序列的头，中，尾选3个，取这三个值的中间元素为枢纽
```

时间复杂度

* 若枢纽值选的好，则形成二叉树的高度为`O(logn)`，每一层排序需要`O(n)`，总复杂度为`O(nlogn)`
* 若待排序的记录序列正序或逆序，二叉树的高度为`O(n)`，总复杂度为`O(n^2)`

## 堆排序

1. 将待排序序列构成一个大顶堆，此时，整个序列的最大值就是堆顶的根节点
2. 将其与末尾元素进行交换，此时末尾就是最大值
3. 然后将剩余n-1个元素重新构造成一个堆，就会得到n个元素的次小值，如此反复执行，便能得到一个有序序列

* [堆排序图示](https://www.runoob.com/wp-content/uploads/2019/03/heapSort.gif)
* [原理解析](https://www.cnblogs.com/chengxiao/p/6129630.html)
* 时间复杂度：`O(n*logn)`，每次构造堆都需要`O(logn)`，一共构造`n`次
* 堆的插入与删除？删除从根节点删，插入从最后插

```js
/*方法说明：堆排序
@param  array 待排序数组*/
function heapSort(array) {
    // 建堆
    let heapSize = array.length;
    for (let i = Math.floor(heapSize / 2) - 1; i >= 0; i--) {
      heapify(array, i, heapSize);
    }
    // 堆排序
    for (let j = heapSize - 1; j >= 1; j--) {
        [array[0], array[j]] = [array[j], array[0]];
        heapify(array, 0, --heapSize);
    }
    return array;
}

/*方法说明：维护堆的性质
@param  arr 数组
@param  x   数组下标
@param  len 堆大小*/
function heapify(arr, x, len) {
    let l = 2 * x + 1, r = 2 * x + 2, largest = x;
    if (l < len && arr[l] > arr[largest]) {
        largest = l;
    }
    if (r < len && arr[r] > arr[largest]) {
        largest = r;
    }
    if (largest !== x) {
        [arr[x], arr[largest]] = [arr[largest], arr[x]];
        heapify(arr, largest, len);
    }
}
```

* 数组第k大元素: [leetcode215](https://leetcode-cn.com/problems/kth-largest-element-in-an-array/)

```js
var findKthLargest = function(nums, k) {
    const heapSort = (arr, k) => {
        let len = arr.length
        // 构造堆
        for (let i = Math.floor(arr.length / 2); i >= 0; i--) {
            heapify(arr, i, len)
        }
        for (let j = len - 1; j >= 0; j--) {
            [arr[0], arr[j]] = [arr[j], arr[0]]
            heapify(arr, 0, --len)
            if (j === arr.length - k) return arr[arr.length - k] // 第 k 大
        }
    }

    // 维护堆
    const heapify = (arr, x, len) => {
        let l = 2 * x + 1, r = 2 * x + 2, largest = x
        if (l < len && arr[l] > arr[largest]) {
            largest = l
        }
        if (r < len && arr[r] > arr[largest]) {
            largest = r
        }
        if (largest !== x) {
            [arr[largest], arr[x]] = [arr[x], arr[largest]]
            heapify(arr, largest, len)
        }
    }
    return heapSort(nums, k)
};
```

> 下面要介绍的 **计数排序、桶排序、基数排序** ，它们的平均时间复杂度都为 **O(n)**。
>
> 因为这三个排序算法的时间复杂度是线性的，所以我们把这类排序算法叫作 **线性排序**（Linear sort）。
>
> 之所以能做到线性的时间复杂度，主要原因是，这三个算法不是基于比较的排序算法，都不涉及元素之间的比较操作。

## 计数排序

1. 找出待排序的数组中最大和最小的元素。

2. 统计数组中每个值为 i 的元素出现的次数，存入新数组 countArr 的第 i 项。

3. 对所有的计数累加（从 countArr 中的第一个元素开始，每一项和前一项相加）。

4. 反向填充目标数组：将每个元素 i 放在新数组的第 countArr[i] 项，每放一个元素就将 countArr[i] 减去 1 。

- 只能用在数据范围不大的场景中，若数据范围 k 比要排序的数据 n 大很多，就不适合用计数排序。
- 计数排序只能给非负整数排序，其他类型需要在不改变相对大小情况下，转换为非负整数。

```js
function countingSort(array) {
    var len = array.length,
        B = [],
        C = [],
        min = max = array[0];
    for (var i = 0; i < len; i++) {
        min = min <= array[i] ? min : array[i];
        max = max >= array[i] ? max : array[i];
        C[array[i]] = C[array[i]] ? C[array[i]] + 1 : 1;
    }
    for (var j = min; j < max; j++) {
        C[j + 1] = (C[j + 1] || 0) + (C[j] || 0);
    }
    for (var k = len - 1; k >= 0; k--) {
        B[C[array[k]] - 1] = array[k];
        C[array[k]]--;
    }
    return B;
}
```

## 桶排序

> 桶排序是计数排序的升级版。它利用了函数的映射关系，高效与否的关键就在于这个映射函数的确定。
>
> 桶排序 (Bucket sort)的工作的原理：假设输入数据服从均匀分布，将数据分到有限数量的桶里，每个桶再分别排序（有可能再使用别的排序算法或是以递归方式继续使用桶排序进行排序）

```js
const utils = {  
	swap(array, a, b) {
    [array[a], array[b]] = [array[b], array[a]]
  },
  randomNum() {
    return Math.floor(Math.random() * 100)
  },
  randomArray() {
    return Array.from(Array(this.randomNum()), _ => this.randomNum())
  }
}

function bucketSort(array, size = 10) {
  let min = Math.min(...array)
  let max = Math.max(...array)
  let count = Math.floor((max - min) / size) + 1
  let buckets = []
  for (let i = 0; i < count; i++) {
    buckets.push([])
  }
  for (let v of array) {
    let num = Math.floor((v - min) / size)
    buckets[num].push(v)
  }
  let result = []
  for (bucket of buckets) {
    result.push(...insertionSort(bucket)) 
  }
  return result
}

console.log(bucketSort(utils.randomArray()))

function insertionSort(array) {
  for (let i = 1; i < array.length; i++) {
    let j = i
    let target = array[j]
    while(j > 0 && array[j-1] > target) {
      array[j] = array[j-1]
      j--
    }
    array[j] = target
  }
  return array
}
```

## 基数排序

1. 取得数组中的最大数，并取得位数；
2. arr为原始数组，从最低位开始取每个位组成radix数组；
3. 对radix进行计数排序（利用计数排序适用于小范围数的特点）；

```js
/**
 * 基数排序适用于：
 *  (1)数据范围较小，建议在小于1000
 *  (2)每个数值都要大于等于0
 * @author xiazdong
 * @param  arr 待排序数组
 * @param  maxDigit 最大位数
 */
//LSD Radix Sort

function radixSort(arr, maxDigit) {
    var mod = 10;
    var dev = 1;
    var counter = [];
    for (var i = 0; i < maxDigit; i++, dev *= 10, mod *= 10) {
        for(var j = 0; j < arr.length; j++) {
            var bucket = parseInt((arr[j] % mod) / dev);
            if(counter[bucket]== null) {
                counter[bucket] = [];
            }
            counter[bucket].push(arr[j]);
        }
        var pos = 0;
        for(var j = 0; j < counter.length; j++) {
            var value = null;
            if(counter[j]!=null) {
                while ((value = counter[j].shift()) != null) {
                      arr[pos++] = value;
                }
          }
        }
    }
    return arr;
}
```

