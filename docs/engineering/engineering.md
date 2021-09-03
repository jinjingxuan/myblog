---
title: yeoman脚手架工具
date: 2020-08-28 10:37:54
categories: 前端工程化
---

## 工程化和脚手架的理解

谈谈你对工程化的初步认识？

> 前端工程化我认为可以提高开发效率，提高代码质量，简便流程。
>
> 就目前公司所做的项目来说，工程化所带来的优点是，无论从项目的编码到编译，打包到部署，都十分方便和规范，对开发人员特别友好。

你认为脚手架除了为我们创建项目结构，还有什么更深的意义？

> 我觉得脚手架是帮我们减少「为减少重复性工作而做的重复性工作」的工具，只需要几行命令，目录结构，脚本，配置等等都已经搞好了，我们只需要写核心代码就好，而不用关心其他重复性的事情。

## yeoman

在谈论脚手架时，我们想到的都是`vue-cli`等比较集成的脚手架，而Yeoman是一种通用的工具，便于创建属于自己的脚手架，很值得学习。

> Yeoman主要有三部分组成：yo（脚手架工具）、grunt（构建工具）、bower（包管理器）。这三个工具是分别独立开发的，但是需要配合使用，来实现我们高效的工作流模式。 

安装：`cnpm install -g yo grunt-cli bower`

安装后在命令行中输入 yo，在这里显示的是我的系统中已经安装的generator的库

可以选择`install generator`，然后搜索我们想安装的generator，比如webapp，然后安装即可。

****

现在我们要使用`generator-node`：creates a base template to start a new Node.js module.

直接运行`yo node`，则会直接在文件夹中创建好目录结构

### sub-generator

如果不需要生成整个项目结构，只需生成ESLint等配置文件，就可以用sub-generator,用`:`来表示

`yo node:cli`：其中的`cli`就是子集生成器

### 总结一下使用步骤

1. 明确需求
2. 找到合适的Generator
3. 全局范围安装找到的Generator
4. 通过Yo运行对应的Generator
5. 通过命令行交互填写选项
6. 生成你所需要的项目结构

### 自定义Generator来搭建自己的脚手架

比如用`vue-cli`创建项目时，并没有`vue-router,vuex`等，需要手动引入，如果把这些也放入脚手架中就很方便

首先使用`npm init`初始化一个`package.json`文件

安装`cnpm install yeoman-generator`,提供了生成器的基类

Generator的一个基本结构如下

> |- generators/..........生成器目录
> |-    app/..............默认生成器目录
> |-       index.js.......默认生成器实现
> |-    templates/foo.txt..模板文件
> |-package.json..........模块包配置文件
>
> 其中的index.js是作为Generator 的核心入口
>
> 需要导出一个继承自 Yeoman Generator 的类型
>
> Yeoman Generator 在工作时会自动调用此类型定义的方法

```js
const Generator = require('yeoman-generator')

module.exports = class extends Generator {
    writing () {
        // Yeoman 自动在生成文件阶段调用此方法
        // 我们尝试往项目目录中写入文件
        this.fs.write(
        	this.destinationPath('temp.txt'),
            Math.random().toString()
        )
        
        // 还可以通过模板方式写入文件到目标目录
        // 模板文件路径
        const tmpl = this.templatePath('foo.txt')
        // 输出目标路径
        const output = this.destinationPath('foo.txt')
        // 模板数据上下文
        const context = { title: 'hello', success: false }
        
        this.fs.copyTpl(tmpl, output, context)
    }
}
```

编写好之后使用`npm link`使其成为一个全局模块包，这样在别的地方也能使用`yo 'name' `调用这个模块

#### 使用模板文件

```txt
模板文件，支持 EJS 模板标记
<%= title %>

<% if (success) { %>
哈哈哈
<% } %>

title和success在模板上下文中赋值
```

之后同样运行`yo 'name'`创建模板文件，如下：

> 模板文件，支持 EJS 模板标记
> hello

 ### 如何使用命令行交互的方式实现询问用户输入

```js
const Generator = require('yeoman-generator')

module.exports = class extends Generator {
    prompting () {
      return this.prompt([
        {
          type: 'input',
          name: 'name', // 命令行需要输入的
          message: 'Your project name',
          default: this.appname
        }
      ])
      .then(answers => {
        this.answers = answers
      })
    }
    writing () {
        // 模板文件路径
        const tmpl = this.templatePath('bar.html') // 在bar.html中可以写 <h1><%= name %></h1>
        // 输出目标路径
        const output = this.destinationPath('bar.html')
        // 模板数据上下文
        const context = this.answers // name传进上下文
        
        this.fs.copyTpl(tmpl, output, context)
    }
}
```

### 如何创建一个自定义的vue脚手架

* 把写好的vue文件目录结构拷贝到`templates`目录下
* 重写`writing方法`，因为不只是创建单个文件，每一个文件都需要创建

```js
const Generator = require('yeoman-generator')

module.exports = class extends Generator {
    prompting () {
      return this.prompt([
        {
          type: 'input',
          name: 'name', // 命令行需要输入的
          message: 'Your project name',
          default: this.appname
        }
      ])
      .then(answers => {
        this.answers = answers
      })
    }
    writing () {
        const templates = [
            'a.js',
            'src/main.js',
            //...需要的文件
        ]
        templates.forEach(item => {
            this.fs.copyTpl(
                this.templatePath(item),
                this.destinationPath(item),
                this.answers
            )
        })
    }
}
```



