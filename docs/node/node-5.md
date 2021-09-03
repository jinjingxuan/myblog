---
title: Node.js文件操作
date: 2019-5-04 16:00:54
categories: Node.js
---

Node.js的文件操作API由fs（File System）模块提供，该模块提供的函数均有异步和同步版本，例如读取文件内容的函数有异步的fs.readFile()和同步的fs.readFileSync()。实际开发中建议大家使用异步函数，性能更高，速度更快，而且没有阻塞。

## 同步文件写入

```js
//同步API必须使用try...catch来捕获异常
var fs = require('fs');
try{
    console.log('写入文件...');
    fs.writeFileSync('路径','内容');
}catch(e){
    console.log('不好意思，文件写入失败了');
}
```

<!--more-->

## 异步文件写入

```js
//异步文件写入函数多了一个回调函数
var fs = require('fs');
console.log(1);
//该方法中回调函数的第一个参数为错误对象
fs.write('路径','内容',function(err){
    if(err){
        console.log('不好意思，文件写入失败了');
    }
    console.log(2);
});
console.log(3);
//输出132
```

其他的一些文件操作在此就不细写了，上网随时可查，下面做一个实际例子。

## 控制歌词滚动

歌词格式

> [ti:自由(Live)]
> [ar:梁咏琪]
> [al:蒙面歌王第八期]
> [by:果果1314]
> [00:00.00]梁咏琪 - 自由(Live)
> [00:03.00]歌词编辑：果果
> [00:06.00]QQ:765708831
> [00:09.00]Lrc歌词网：www.90lrc.cn
> [00:12.00]
> [00:16.65]也许会恨你
> [00:18.66]我知道我的脾气不是很好

歌词随时间逐句输出

```js
let fs = require('fs');
fs.readFile('./lrc.txt',function (err,data) {
    if(err){
        return console.log('读取歌词文件失败了');
    }
    data = data.toString();
    let lines = data.split('\n');
    //正则匹配，解析出毫秒
    //需要里面的时间和里面的内容
    let reg = /\[(\d{2})\:(\d{2})\.(\d{2})\]\s*(.+)/;
    for(let i = 0;i < lines.length;i++){
        //自执行函数
        ;(function(index){
            let line = lines[index];
            let matches = reg.exec(line);
            if(matches){
                let m = parseFloat(matches[1]);
                let s = parseFloat(matches[2]);
                let ms = parseFloat(matches[3]);
                let content = matches[4];
                let time = m*60*1000 + s*1000 +ms;
                setTimeout(function () {
                    console.log(content);
                },time);
            }
        })(i);
    }
})
```

