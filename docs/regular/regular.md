# 正则表达式
https://juejin.cn/post/6844903487155732494

## 捕获组、非捕获组、命名捕获组

https://segmentfault.com/a/1190000021043947

```js
// 捕获组
'1,2,3,4'.split(/(,)/)
// ['1', ',', '2', ',', '3', ',', '4']

// 非捕获组
'1,2,3,4'.split(/(?:,)/) 
 // ['1', '2', '3', '4']

// 命名分组捕获，ES2018允许命名捕获组使用符号?<name>, 可以指定小括号中匹配内容的名称放在groups里
const reg = /(\d{4})-(\d{2})-(\d{2})/u;
const matched = reg.exec('2018-12-31');
matched[0];  // 2018-12-12
matched[1];  // 2018
matched[2];  // 12
matched[3];  // 31

const reg = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/u;
const matched = reg.exec('2018-12-31');
matched.groups.year;   // 2018
matched.groups.month;  // 12
matched.groups.day;    // 31
```

