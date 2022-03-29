# commander和Inquirer

本文主要介绍 node 命令行的交互工具 commander（处理命令行参数） 和 inquirer（处理问题交互）

## commander

完整的 node.js 命令行解决方案：[官方文档](https://github.com/tj/commander.js/blob/HEAD/Readme_zh-CN.md)

### program 变量

为简化使用，Commander 提供了一个全局对象 program

```js
const { program } = require('commander');
```

如果程序较为复杂，用户需要以多种方式来使用 Commander，如单元测试等。创建本地`Command`对象是一种更好的方式：

```js
const { Command } = require('commander');
const program = new Command();
```

### version

作用：定义命令程序的版本号 用法示例：`.version('0.0.1', '-v, --version')` 参数解析：

1. 第一个参数 版本号<必须>
2. 第二个参数 自定义标志<可省略>：默认为 -V 和 --version

### option

Commander 使用`.option()`方法来定义选项，同时可以附加选项的简介。每个选项可以定义一个短选项名称（-后面接单个字符）和一个长选项名称（--后面接一个或多个单词），使用逗号、空格或`|`分隔。

**boolean 型选项 、带参数选项**

有两种最常用的选项，一类是 boolean 型选项，选项无需配置参数，另一类选项则可以设置参数（使用尖括号声明在该选项后，如`--expect <value>`）。如果在命令行中不指定具体的选项及参数，则会被定义为`undefined`。第三个参数为默认值。

```js
// test.js
program
  .version('0.0.1', '-v, --version')
  .option('-d, --debug', 'output extra debugging')
  .option('-s, --small', 'small pizza size')
  .option('-p, --pizza-type <type>', 'flavour of pizza');

// 解析 process.argv
program.parse(process.argv);

if (program.debug) console.log(program.opts());
if (program.small) console.log('- small pizza size');
if (program.pizzaType) console.log(`- ${program.pizzaType}`);
```

测试输出

```sh
node test.js -v    
# 0.0.1

node test.js --help
# Usage: test [options]
# Options:
#   -v, --version            output the version number
#   -d, --debug              output extra debugging
#   -s, --small              small pizza size
#   -p, --pizza-type <type>  flavour of pizza
#   -h, --help               display help for command

node test.js -d -s
# { version: '0.0.1', debug: true, small: true, pizzaType: undefined }
# - small pizza size

node test.js -d -s -p
# error: option '-p, --pizza-type <type>' argument missing

node test.js -d -s -p fruit 
# { version: '0.0.1', debug: true, small: true, pizzaType: 'fruit' }
# - small pizza size
# - fruit
```

## Inquirer

一组通用的交互式命令行用户界面：[官方文档](https://github.com/SBoudrias/Inquirer.js/)

```js
var inquirer = require('inquirer');
inquirer
  .prompt([
    /* Pass your questions in here */
  ])
  .then(answers => {
    // Use user feedback for... whatever!!
  })
  .catch(error => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else when wrong
    }
  });
```

这里只举一个简单的例子，更多参数查看文档

```js
// test.js
const inquirer = require('inquirer');
inquirer
    .prompt([{
        type: 'list',
        name: 'type',
        message: '选择创建类型',
        choices: [{ name: '应用程序' }, { name: '组件库' }]
    }, {
        type: 'input',
        name: 'name',
        message: '输入名称',
        validate: function (value) {
            if (value) {
                return true;
            }
            return '输入名称';
        }
    }]).then((answers) => {
        console.log(answers);
    });
```

交互界面

```sh
node tset.js

? 选择创建类型 (Use arrow keys)
❯ 应用程序 
  组件库 

# 选择 "应用程序" 后输入名称 test
? 选择创建类型 应用程序
? 输入名称 test
{ type: '应用程序', name: 'test' }
```

