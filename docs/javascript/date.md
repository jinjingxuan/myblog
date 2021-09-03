---
title: 关于日期对象
date: 2018-08-30 11:00:54
categories: JavaScript
---
# 关于日期对象
* 日期对象
* 关于时间戳处理
* Date.parse（）
* moment API

```js
		var date = new Date();//返回时间；
        var YY = date.getFullYear(); //返回年
        var MM = date.getMonth() + 1  ;//返回月
        var Day = date.getDay();//返回星期 【注意 ：每个星期第一天是星期日】
        var DD = date.getDate();//返回天 
        var hh = date.getHours(); //返回时
        var mm = date.getMinutes();//返回分
        var ss = date.getSeconds();//返回秒
        var ms = date.getMilliseconds();//返回秒
        var Time = date.getTime();//返回 1970 年 1 月 1 日至今的毫秒数 
        var Now = Date.now(); //返回 1970 年 1 月 1 日至今的毫秒数  【不兼容IE】
        var a = date.toLocaleString() //返回年月日，时分秒；
        var b = date.toLocaleDateString(); //返回年月日
        var c = date.toLocaleTimeString(); //返回时分秒
```

```js

        var date = new Date(); //返回指定的时间 【注意：月份会加1，所以我们设置的时候要减1】
        var date1 = new Date( '2018/8/20' );
        var date2 = new Date( 2018,7 );
        var date3 = new Date( 2018 );
        var date4 = new Date( '9' );
        console.log( date ) //当前时间
        console.log( date1 )//Mon Aug 20 2018 00:00:00
        console.log( date2 )//Wed Aug 01 2018 00:00:00
        console.log( date3 )//Thu Jan 01 1970 08:00:02
        console.log( date4 )//Sat Sep 01 2001 00:00:00
        //getTimezoneOffset() 世界时（东八区） - 本地时间（ 当前的时间 ）
        console.log( date.getTimezoneOffset() ) //480/8 60分钟
```

## 案例一：输出北京时间

```html
<div id="box">
		现在是北京时间：
		<p></p>
</div>

<script>
		var box = document.getElementById('box'),
		p = document.getElementsByTagName('p')[0],
		arr = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
        function fn(){
            var date = new Date();//返回时间；
            var YY = date.getFullYear(); //返回年
            var MM = date.getMonth() + 1  ;//返回月
            var Day = date.getDay();//返回星期 【注意 ：每个星期第一天是星期日】
            var DD = date.getDate();//返回天 
            var hh = addZero(date.getHours()); //返回时
            var mm = addZero(date.getMinutes());//返回分
            var ss = addZero(date.getSeconds());//返回秒

            var str = YY+'年'+MM+'月'+DD+'日'+arr[Day]+':'+hh+'时'+mm+'分'+ss+'秒';
            p.innerHTML = str;
        }

        fn();//先执行一次，避免出现延迟加载
        setInterval(fn,1000);

        function addZero(n){
            return n < 10 ? '0' + n : n;
        }
</script>
```
## 案例二：距离过年时间

```html
	<div>距离过年还有：
        <p></p> 
	</div>
    <script>
        var newYear = new Date( '2019/2/5' ),
        p = document.getElementsByTagName('p')[0];
        function fn(){
            var date = newYear - Date.now(),//返回毫秒为距离明年过年要多少毫秒;
                DD = Math.floor(date/1000/60/60/24), //返回天
                hh = Math.floor(date/1000/60/60)%24,
                mm = Math.floor(date/1000/60)%60,
                ss = Math.floor(date/1000)%60;
            console.log( DD ,hh,mm, ss)
            var str =  DD +'日'+':'+hh+'时'+mm+'分'+ss+'秒';
            p.innerHTML = str;
        }
        fn()
        setInterval( fn ,1000 )
    </script>
```

## 关于时间戳处理

在前后端接口开发时，时间对象的处理往往处理成13位的时间戳形式。

一般时间选择器拿到的都是`Thu Jul 04 2019 23:59:59 GMT+0800 (中国标准时间)`即日期对象的格式

* 时间对象转换为时间戳

```js
// 定义一个时间对象 dt，然后依次演示各种将 dt 转换为时间戳的写法
var dt = new Date("2019-07-04 23:59:59.999");
// Thu Jul 04 2019 23:59:59 GMT+0800 (中国标准时间)

// 写法一，精确到毫秒，得到 13 位时间戳 1562255999999
console.log(dt.getTime());

// 写法二，精确到毫秒，得到 13 位时间戳 1562255999999
console.log(dt.valueOf());

// 写法三，精确到毫秒，得到 13 位时间戳 1562255999999
console.log(Number(dt));

// 写法四，精确到毫秒，得到 13 位时间戳 1562255999999
console.log(+dt);

// 写法五，精确到秒，得到 13 位时间戳 1562255999000，后三位固定为 000
console.log(Date.parse(dt));

// 但是如果这样写，还是可以的
Date.parse("2019-07-04 23:59:59.999")
// 1562255999999
```

* 时间戳转换为时间对象

```js
// 注意：参数中的时间戳必须是 13 位的，多一位或少一位都不行
new Date(1562169599000); // Wed Jul 03 2019 23:59:59 GMT+0800 (中国标准时间)

// 将时间戳转换为更加直观形象的本地时间
new Date(1562169599000).toLocaleString() // "2019/7/3 下午11:59:59"

// 判断两个时间差是否超过一天
(Date.parse(new Date('2020-08-06 21:33:00')) - Date.parse(new Date('2020-08-05 21:33:00')))
/1000/3600/24 = 1

// 后三位是精确到毫秒，一般不用考虑
+new Date("2019-07-04 23:59:59.999")
// 1562255999999

+new Date("2019-07-04 23:59:59")
// 1562255999000
```
## 一个兼容性问题

> 时间格式为2020-08-09具有兼容性问题，正确用法是 new Date('2020/08/-09 21:33:00')

`str.replace(/-/g,"/")`

```js
(Date.parse(new Date('2020-08-06 21:33:00')) - Date.parse(new Date(('2020-08-05 21:33:00').replace(/-/g,"/"))))/1000/3600/24 = 1
```

## 一个函数

* 选择日期：比如说选择日期`10.23-10.24`，组件返回的是`23号0点到24号零点`，所以需要加一天时间
* 但是如果组件是精确到秒的话直接用`getTime`就行了

```js
disposeTime(start, end) {
  let startDate, endDate
  if (start.getTime) {
    startDate = start.getTime()
  } else {
    startDate = moment(start).valueOf()
  }
  if (end.getTime) {
    endDate = end.getTime()
  } else {
    endDate = moment(end).valueOf()
  }
  endDate += 24 * 60 * 60 * 1000 - 1;
  return {
    startDate,
    endDate
  }
},
```

* 其中的`moment`是一个时间格式化的插件
* 可以参考：[Vue使用Moment插件格式化时间](https://blog.csdn.net/fu983531588/article/details/89330929)

> 给定一个时间戳，今天的展示今天，一个月内的发布日期，展示X天前，一个月前的展示年月日，如何实现？

```js
// 处理时间
transTime(time) {
  const diff = (+new Date() - time) / 1000 / 3600 / 24
  if (new Date(time).getDate() === new Date().getDate()) return '今天'
  else if (diff < 30) return `${~~diff + 1}天前`
  else return new Date(time).toLocaleString().split(' ')[0]
}
```

## moment  API

| moment                                                       | 含义                                       | 数据类型    |
| ------------------------------------------------------------ | ------------------------------------------ | ----------- |
| moment()                                                     | 当前时间                                   | moment 对象 |
| moment('2020-01-02')                                         | 2020-01-02 00:00:00                        | moment 对象 |
| moment('00:00:00', 'HH:mm:ss')<br />moment("12-25-1995", "MM-DD-YYYY") | 当天0点<br />1995-12-25 00:00:00           | moment 对象 |
| moment().format("YYYY-MM-DD HH:mm:ss")                       | 当前时间格式化处理                         | string      |
| moment().subtract(1, 'day'))  <br />moment().subtract(1, 'days'))<br />moment().subtract('days', 1)<br />moment().subtract('day', 1) | 当前时间减去一天                           | moment 对象 |
| moment().add(1, 'week'))                                     | 当前时间加上一周                           | moment 对象 |
| moment().startOf('day')<br />moment().hours(0).minutes(0).seconds(0) | 当天0点                                    | moment 对象 |
| moment().endOf('year')                                       | 今年最后一天 23:59:59                      | moment 对象 |
| moment('2021-07-24') < moment('2021-07-25')                  | 比较大小                                   | bool        |
| moment().day()                                               | 获取当天星期几                             | number      |
| moment().day(-7)，moment().day(0)                            | 上个星期日，这个星期日（0-6代表周日-周六） | moment 对象 |
| moment().get('month')，moment().get('date')                  | 当前月份-1，当前日期                       | number      |
| moment().subtract(1, 'day').endOf('day').format()            | 链式操作，昨天23:59:59                     | string      |
| moment().valueOf()                                           | 当前时间的时间戳                           | number      |
| moment('2021-07-22').diff(moment('2021-07-23'), 'days')      | 相差天数                                   | number      |

### 
