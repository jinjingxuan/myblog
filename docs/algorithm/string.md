---
title: 字符串操作
date: 2020-11-10 16:00:54
categories: 算法
---
# 字符串操作
* 下一个排列
* 对输入的字符串，去除其中的字符'b'以及连续出现的'a'和'c'
* 外观数列
* 最长公共前缀
* 字符串的最大非重复子串长度
* 重复的子字符串
* 参数分解
* 字符串解码
* 字符串相加
* 比较版本号
* z字型变换

## 下一个排列

* 题目来源：[leetcode31](https://leetcode-cn.com/problems/next-permutation/)

* 参考题解：[思路最清晰的题解](https://leetcode-cn.com/problems/next-permutation/solution/xia-yi-ge-pai-lie-suan-fa-xiang-jie-si-lu-tui-dao-/)

```js
实现获取下一个排列的函数，算法需要将给定数字序列重新排列成字典序中下一个更大的排列。

如果不存在下一个更大的排列，则将数字重新排列成最小的排列（即升序排列）。

必须原地修改，只允许使用额外常数空间。

以下是一些例子，输入位于左侧列，其相应输出位于右侧列。
1,2,3 → 1,3,2
3,2,1 → 1,2,3
1,1,5 → 1,5,1
```

* 分析：就相当于找一个比当前数大并且最小的一个，比如比123大的有132,213,231,321,312，但是最小的是132
* 思路：
  * 从后向前遍历，找到nums[i] < nums[i+1]的数，记录下i需要交换
  * 交换的对象应该是比他大但是最小的一个，只需从后向前遍历找即可，因为i后面已经是降序
  * 交换后打乱了序列，应该将 i 后面的序列重新排序
  * 注意题目要求，只能在原数组上改，用 nums = nums.concat的一些操作会有问题，最好还是用splice,push,unshift这些修改原数组的方法

```js
// 1234654
var nextPermutation = function(nums) {
    let flag = false;
    for (let i = nums.length - 2; i >= 0; i--) {
        if (nums[i] < nums[i + 1]) {
            flag = true;
            for (let j = nums.length - 1; j > i; j--) {
                if (nums[j] > nums[i]) {
                    [nums[i], nums[j]] = [nums[j], nums[i]];
                    break;
                }
            }
            const head = nums.splice(0, i + 1);
            nums.sort((a, b) => a - b);
            for (let i = head.length - 1; i >= 0 ; i--) {
                nums.unshift(head[i]);
            }
            break;
        }
    }
    if (!flag) nums.reverse();
};
```

## 对输入的字符串，去除其中的字符'b'以及连续出现的'a'和'c'

```js
'aacbd' => 'ad'
'aabcd' => 'ad'
'aaabbccc' => ''
```

* 正则解决

```js
function fn(str){
    let res= str.replace(/b+/g,'')
    while(res.match(/(ac)+/)){
        res = res.replace(/ac/,'')
    }
    return res
}
```

## 外观数列

### 正则表达式：\1捕获

> \1表示匹配第一个括号里的内容
>
> 利用这个\1，可以获取一个长字符串中的最长相同子串

```js
	//寻找连续相同的最长子串
	var str = "ABCCCDDDDDEFFFFFFFFFFFFGGGGHHIIII";
	var reg = /(\w)\1+/g;
	var arr = str.match(reg);
	console.log(arr) // ["CCC", "DDDDD", "FFFFFFFFFFFF", "GGGG", "HH", "IIII"]
```

### 外观数列

```js
1.     1
2.     11
3.     21
4.     1211
5.     111221

给定一个正整数 n（1 ≤ n ≤ 30），输出外观数列的第 n 项。
```

* 利用正则表达式

```js
var countAndSay = function(n) {
    let pre = '1'
    for(let i=1;i<n;i++){
        pre = pre.replace(/(\d)\1*/g, item =>`${item.length}${item[0]}`)
    }
    return pre
};

//  \1*代表出现任意次
// ${}代表字符串拼接
// replace第二个参数为函数例如

var str1 = 'abbcbca'
str1.replace(/(b)/g,item => item+'*')  //ab*b*cb*ca
```

## 算法：最长公共前缀4

* [leetcode14](https://leetcode-cn.com/problems/longest-common-prefix/)

```js
编写一个函数来查找字符串数组中的最长公共前缀。

如果不存在公共前缀，返回空字符串 ""。

示例 1:

输入: ["flower","flow","flight"]
输出: "fl"

输入: ["dog","racecar","car"]
输出: ""
解释: 输入不存在公共前缀。
```

* 当字符串数组长度为 0 时则公共前缀为空，直接返回
* 令最长公共前缀 ans 的值为第一个字符串，进行初始化
* 遍历后面的字符串，依次将其与 ans 进行比较，两两找出公共前缀，最终结果即为最长公共前缀
* 如果查找过程中出现了 ans 为空的情况，则公共前缀不存在直接返回
* 时间复杂度：O(s)，s 为所有字符串的长度之和

```js
var longestCommonPrefix = function(strs) {
    if (!strs.length) return ""
    let ans = strs[0]
    for (let i = 1; i < strs.length; i++) {
        for (let j = 0; j < ans.length; j++) {
            if (ans[j] !== strs[i][j]) {
                ans = ans.slice(0, j)
            }
        }
    }
    return ans
};
```

## 字符串的最大非重复子串长度

js中，因为Array继承Object，那么Array也是可以用字符串作为数组下标的 ，c++可以，写一个参考的C++解法

```c++
int lengthOfLongestSubstring(string s) {
        vector dict(256, -1);
        int maxLen = 0, start = -1;
        for (int i = 0; i != s.length(); i++) {
            if (dict[s[i]] > start)//当前字符“曾经”是否出现在此子串中？
                start = dict[s[i]];//“曾经”出现那次作为新起点
            dict[s[i]] = i;//标志该字符出现的位置
            maxLen = max(maxLen, i - start);//每次都要更新最大长度
        }
        return maxLen;
}
```

例如：a,b,c,d,a,b,a 输出4

无重复：a,b,c,d

a重复了：把上一个a之前的清除，现在b,c,d,a

b重复了：把上一个b之前的清除，现在c,d,a,b

a重复了：现在b,a

## 重复的子字符串

* [leetcode459](https://leetcode-cn.com/problems/repeated-substring-pattern/)

```js
var repeatedSubstringPattern = function(s) {
    if (s.length === 1) return false
    for (let i = 0; i < s.length / 2; i++) {
        const substr = s.slice(0, i + 1)
        const count = s.length / substr.length
        if (count === Math.floor(count)) {
            let str = ""
            for (let i = 0; i < count; i++) {
                str += substr
            }
            if (str === s) return true
        }
    }
    return false
};
```

* [简单解法](https://leetcode-cn.com/problems/repeated-substring-pattern/solution/jian-dan-ming-liao-guan-yu-javaliang-xing-dai-ma-s/)

```js
var repeatedSubstringPattern = function(s) {
    let str = s + s
    return str.slice(1, str.length - 1).includes(s)
};
```

## 参数分解

```js
let str = "x=1&&y=2&&y=3&&z=4&&y=4"

//输出
// obj = {
//     x:1,
//     y:[2,3],
//     z:4
// }

let tmp = str.split("&&")
let left = []
let right = []
for(let i in tmp){
    left.push(tmp[i].split("=")[0])
    right.push(tmp[i].split("=")[1])
}
console.log(left,right)
let res = new Object()
for(let i in left){
    if(res.hasOwnProperty(left[i])){//如果包含重复元素
        if(Array.isArray(res[left[i]])){//如果已经是数组就直接添加
            res[left[i]].push(right[i])
        }else{//如果不是数组则构造成数组
            let tmp = new Array(res[left[i]])
            tmp.push(right[i])   //push的返回值为push的值
            res[left[i]] = tmp
        }    
    }else{
        res[left[i]] = right[i]
    }   
}
```

## 字符串解码

* [leetcode394](https://leetcode-cn.com/problems/decode-string/)

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

* 采用正则表达式将`3[a]` 的格式转换成`aaa`即可
* 匹配到`3[a]`之后，找到`[`的位置，前面为数字，后面为字符，按次数拼接

```js
var decodeString = function(s) {
    const reg = /\d+\[[a-z]+\]/g
    while (reg.test(s)) {
        s = s.replace(reg, item => {
            let pos  = item.indexOf('[') ,number = item.slice(0, pos)
            let str = item.slice(pos + 1, item.length - 1), res = ''
            for (let i = 0; i < number; i++) res += str
            return res
        })
    }
    return s
};
```

## 字符串相加

* [leetcode415](https://leetcode-cn.com/problems/add-strings/)

```js
var addStrings = function(num1, num2) {
   	let i = num1.length - 1,
        j = num2.length - 1,
        carry = 0,
        res = ""
    while (i >= 0 || j >= 0 || carry > 0) {
        let c1 = num1[i] ? num1[i] - '0' : 0,
            c2 = num2[j] ? num2[j] - '0' : 0
            sum = (c1 + c2 + carry) % 10
        carry = Math.floor((c1 + c2 + carry) / 10)
        res = sum + res
        i--
        j--
    }
    return res
};
```

## 比较版本号

* [leetcode165](https://leetcode-cn.com/problems/compare-version-numbers/)

```js
var compareVersion = function(version1, version2) {
    let arr1 = version1.split(".")
    let arr2 = version2.split(".")
    let len = Math.max(arr1.length, arr2.length)
    for (let i = 0; i < len; i++) {
        let data1 = ~~arr1[i]
        let data2 = ~~arr2[i]
        if (data1 < data2) {
            return -1
        } else if (data1 > data2) {
            return 1
        }
    }
    return 0
};

~~undefined // 0
~~001 === ~~ 01 //true
```

[JS按位非运算符(~)及双非(~~)的使用](https://segmentfault.com/a/1190000003731938)

## z字形变换

* [leetcode6](https://leetcode-cn.com/problems/zigzag-conversion/)

* [题解](https://leetcode-cn.com/problems/zigzag-conversion/solution/tiao-zhao-vzi-xing-de-wu-ba-gei-liao-liao-by-ai-xu/)

```js
var convert = function(s, numRows) {
    if (numRows === 1) return s
    const n = 2 * numRows - 2
    const arr = new Array(n).fill("")
    for (let i = 0; i < s.length; i++) {
        let x = i % n
        arr[x < numRows ? x : n - x] += s[i]
    }
    return arr.join("")
};
```

