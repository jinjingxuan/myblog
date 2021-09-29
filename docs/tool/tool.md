---
title: 常用工具和插件
date: 2020-12-18 11:27:54
categories: 规范
---
# 常用工具和插件
* VSCode 插件
* vue-dev-tools
* Jsonview
* Iterm2 + oh my zsh
* nvm和n
* Homebrew
* tree
* npm, cnpm, yarn
* carbon

## VSCode 常用插件

* Git History： 查看 git 历史
* Leetcode：刷题必备
* Bracket Pair Colorizer：括号匹配
* GitLens：在 vscode 上使用 git 功能
* Chinese (Simplified) Language Pack for Visual Studio Code：中文设置

> 安装后，在 `locale.json` 中添加 `"locale": "zh-cn"`，即可载入中文（简体）语言包。要修改 `locale.json`，你可以同时按下 `Ctrl+Shift+P` 打开**命令面板**，之后输入 "config" 筛选可用命令列表，最后选择**配置语言**命令。

* Babel JavaScript：JavaScript 语法高亮显示
* ESLint
* Live Server
* open in browser
* Minapp：微信小程序标签、属性的智能补全
* wechat-snippet：微信小程序代码辅助
* wxml：微信小程序 wxml 格式化以及高亮组件
* Vetur: 支持vue文件的语法高亮显示，除了支持template模板以外，还支持大多数主流的前端开发脚本和插件，比如Sass和TypeScript
* vscode-icons
* vue-helper插件：代码提示，函数跳转
* Codelf：右键变量命名
* any-rule：正则大全
* es6-string-html：模板字符串高亮
* [模板字符串闭合](https://blog.csdn.net/qq_36634628/article/details/107650540)
* [自动补全](https://blog.csdn.net/qq_35393869/article/details/101280343)

## vue-dev-tools

> 控制台调试 vue，[安装](https://juejin.cn/post/6994289281141309476)

## Jsonview

* [地址](https://github.com/gildas-lormeau/JSONView-for-Chrome)

> Chrome 查看 json 数据

## Iterm2 + oh my zsh

[iTerm2 + Oh My Zsh 打造舒适终端体验](https://segmentfault.com/a/1190000014992947)

其中字体包等资源github访问慢可以去gitee上找

[oh my zsh命令提示功能 ](https://blog.csdn.net/sunyv1/article/details/108049209),提示颜色在 `perference / profiles / color / ANSI Colors / Bright`设置

## nvm和n

安装node：`brew install node`

管理node版本工具：[nvm](https://juejin.cn/post/6844904056024989710)或者[n](https://www.jianshu.com/p/c641dcc47b48)，我比较喜欢用n

## homebrew

[Homebrew](https://zhuanlan.zhihu.com/p/90508170)是一款自由及开放源代码的软件包管理系统，用以简化macOS系统上的软件安装过程。对于Appstore中没有的软件，推荐使用此方法安装管理第三方软件。

## tree

安装：`brew install tree`

使用：`tree -a`

## npm, cnpm, yarn,tyarn

下载完 node 就自动有了 npm

```js
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

```js
cnpm i -g yarn
```

## 同时配置github和gitlab

[git配置github与gitlab同时使用](https://blog.csdn.net/qq_36625806/article/details/111589620)

```
# gitlab
Host icode
  HostName gitlan.com
  PreferredAuthentications publickey
  IdentityFile ~/.ssh/id_rsa

# github
Host github
  HostName github.com
  User 915397405@qq.com
  PreferredAuthentications publickey
  IdentityFile ~/.ssh/id_rsa_github
```

如果出现了 `git@github.com: Permission denied (publickey).`

可以进入`ssh`目录运行下`ssh-add id_rsa_github`试试

## github访问慢

[解决GitHub下载速度太慢问题](https://www.jianshu.com/p/238f8242e1a6)

## carbon

https://carbon.now.sh/
