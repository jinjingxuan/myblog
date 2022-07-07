# npm、cnpm、nvm、nrm、yarn、tyarn、npx、pnpm

这么多工具还分不清楚，看这篇文章就够了。

## npm && cnpm

下载完 node 就自动有了 npm，但是 npm 源访问可能比较慢，这就有了 cnpm

```sh
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

这样就全局创建了命令 `cnpm`，使用淘宝镜像源，当然也可以直接这样使用：

```sh
npm install xxx --registry=https://registry.npm.taobao.org
```

## nrm

**npm包有很多的镜像源，有的源有的时候访问失败，有的源可能没有最新的包,有的要使用公司内部的源，所以有时需要切换npm的源，nrm包就是解决快速切换问题的。**

```sh
nrm ls # 列出可选择的源
nrm use <registry> # 切换使用的源
nrm add <registry> <url> # 添加一个源
nrm del <registry> # 删除一个源
nrm test npm # 测试源速度
```

其实这种方式相当于

```sh
npm install xxx --registry=<url>
```

## nvm

[nvm](https://juejin.cn/post/6844904056024989710) 是管理 node 版本的工具，类似的还有 [n](https://www.jianshu.com/p/c641dcc47b48)

## yarn && tyarn

yarn 是 FaceBook 开源的一个新的包管理器， 和npm的作用是一样的。它和npm最大区别是，yarn是并行下载的，所以下载速度很快

tyarn 即是对应的淘宝镜像源

```sh
npm i yarn tyarn -g
```

## npx

npx 会自动查找当前目录依赖包中的可执行文件，如果找不到，就会去 PATH 里找。如果依然找不到，就会帮你安装。

```sh
npx create-react-app my-app
# 这条命令会临时安装 create-react-app 包，命令完成后会删掉。
```

* npx --no-install：不尝试下载，这时 npx 的作用就是首先会在当前目录寻找命令，不存在则去全局中去找。
* npx --ignore-existing：必须下载，无论本地是否存在都去下载。

## pnpm

performant npm ，意味"高性能的 npm"。pnpm由npm/yarn衍生而来，解决了npm/yarn内部潜在的bug，极大的优化了性能，扩展了使用场景。被誉为“最先进的包管理工具”，pnpm比传统方案(yarn, npm)安装包的速度快了两倍：

```sh
npm install -g pnpm
pnpm add package
pnpm remove package
```

> 当使用npm或者yarn时，如果你有100个项目使用了某个依赖，就会有100份依赖的副本保存在磁盘上，对于pnpm，依赖项将存储在一个内容可寻址的仓库中。
>
> 所有文件都会在存储在硬盘上的同一个位置，当多个包被安装时，所有文件都会从同一位置创建硬链接，不会占用额外的磁盘空间，允许跨项目共享同一版本依赖。

[为什么推荐使用pnpm](https://zhuanlan.zhihu.com/p/419399115)