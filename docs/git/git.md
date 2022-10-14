---
title: git操作
date: 2020-12-17 11:27:54
categories: 规范
---
# git操作
* git
* commit 规范
* sourceTree
* 合并多条 commit 
* git stash
* git commit --amend
* gitemoji
* cherry-pick

## git

* git常见命令：<https://blog.csdn.net/web_csdn_share/article/details/79243308> 
* git reset原理：<https://www.cnblogs.com/wangwenjin2026/p/11549285.html> 
* 什么是fork：https://www.liaoxuefeng.com/wiki/896043488029600/900937935629664

### commit 规范

> `commitizen`是一个nodejs命令行工具，通过交互的方式，生成符合规范的git commit，使用如下

```js
git add .
git cz
```

#### 如何安装

```js
// 全局安装
npm install -g commitizen 
// 或本地安装
$ npm install --save-dev commitizen
// 安装适配器
npm install cz-conventional-changelog
```

### sourceTree

* 便于查看分支图表
* Dark 主题

### 合并多条 commit 

#### git rebase

[演示地址](https://learngitbranching.js.org/?locale=zh_CN)

参考[这一次彻底搞懂 Git Rebase](https://www.codercto.com/a/45325.html)，[完美生活：git rebase -i | Linux 中国](https://zhuanlan.zhihu.com/p/141871803)，[【Git】rebase 用法小结](https://www.jianshu.com/p/4a8f4af4e803)

```js
git rebase -i head~3 // 合并最近三条commit
```

弹出编辑界面

> pick b931dac 修改test2为test
> pick efd10a0 feat: 群引流加好友时间
> pick 860aea3 合并
>
> \# commands
>
> pick：保留该commit（缩写:p）
>
> reword：保留该commit，但我需要修改该commit的注释（缩写:r）
>
> edit：保留该commit, 但我要停下来修改该提交(不仅仅修改注释)（缩写:e）
>
> squash：将该commit和前一个commit合并（缩写:s）
>
> fixup：将该commit和前一个commit合并，但我不要保留该提交的注释信息（缩写:f）
>
> exec：执行shell命令（缩写:x）
>
> drop：我要丢弃该commit（缩写:d）

我一般选择`rff`命令，使用最上面的提交并修改，后两条合并，然后继续进入编辑界面修改提交记录，:wq 退出

### git reset --soft [commitID]

> 带 `--soft` 参数的区别在于把改动内容添加到暂存区 相当于执行了`git add .`

### git stash

场景：正在feature分支写代码时，线上出现bug，需要切回master修复

```js
git stash
git checkout master
// 修复中...
git checkout <feture_branch> //切换刚才功能开发的分支
git stash pop //取出修改
```

### git commit --amend

[修改git提交记录用法详解](https://zhuanlan.zhihu.com/p/100243017)

### 拉取本地不存在的远程分支

```js
git checkout -b 1.0 origin/1.0
git pull
```

## gitemoji

https://gitmoji.js.org/

## cherry-pick

[git cherry-pick 教程](https://www.ruanyifeng.com/blog/2020/04/git-cherry-pick.html)

## 一些问题

1、2021.8.14 github修改密码校验为 token 校验

* https://blog.csdn.net/weixin_41010198/article/details/119698015

* https://blog.csdn.net/m0_46332820/article/details/119708248

2、怎么配置命令行代理

```js
// 配置代理：
git config --global http.proxy <代理地址>
// 用完重置：
git config --global --unset http.proxy
```

3、`cd ..` 和 `cd -` 有什么区别

* `cd..`：返回到上一级目录
* `cd -`：返回到上一次的工作目录

4、`git add .`与`git add -A`的区别

* `git add .`：将修改和新增的文件添加到暂存区
* `git add -A`：将修改，新增和删除的文件添加到暂存区（方便恢复被删除的文件）



