(window.webpackJsonp=window.webpackJsonp||[]).push([[90],{555:function(t,a,e){"use strict";e.r(a);var s=e(14),r=Object(s.a)({},(function(){var t=this,a=t._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"git操作"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#git操作"}},[t._v("#")]),t._v(" git操作")]),t._v(" "),a("ul",[a("li",[t._v("git")]),t._v(" "),a("li",[t._v("commit 规范")]),t._v(" "),a("li",[t._v("sourceTree")]),t._v(" "),a("li",[t._v("合并多条 commit")]),t._v(" "),a("li",[t._v("git stash")]),t._v(" "),a("li",[t._v("git commit --amend")]),t._v(" "),a("li",[t._v("gitemoji")]),t._v(" "),a("li",[t._v("cherry-pick")])]),t._v(" "),a("h2",{attrs:{id:"git"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#git"}},[t._v("#")]),t._v(" git")]),t._v(" "),a("ul",[a("li",[t._v("git常见命令："),a("a",{attrs:{href:"https://blog.csdn.net/web_csdn_share/article/details/79243308",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://blog.csdn.net/web_csdn_share/article/details/79243308"),a("OutboundLink")],1)]),t._v(" "),a("li",[t._v("git reset原理："),a("a",{attrs:{href:"https://www.cnblogs.com/wangwenjin2026/p/11549285.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://www.cnblogs.com/wangwenjin2026/p/11549285.html"),a("OutboundLink")],1)]),t._v(" "),a("li",[t._v("什么是fork：https://www.liaoxuefeng.com/wiki/896043488029600/900937935629664")])]),t._v(" "),a("h3",{attrs:{id:"commit-规范"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#commit-规范"}},[t._v("#")]),t._v(" commit 规范")]),t._v(" "),a("blockquote",[a("p",[a("code",[t._v("commitizen")]),t._v("是一个nodejs命令行工具，通过交互的方式，生成符合规范的git commit，使用如下")])]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("git add "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("\ngit cz\n")])])]),a("h4",{attrs:{id:"如何安装"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#如何安装"}},[t._v("#")]),t._v(" 如何安装")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 全局安装")]),t._v("\nnpm install "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("g commitizen \n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 或本地安装")]),t._v("\n$ npm install "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("--")]),t._v("save"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("dev commitizen\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 安装适配器")]),t._v("\nnpm install cz"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("conventional"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("changelog\n")])])]),a("h3",{attrs:{id:"sourcetree"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#sourcetree"}},[t._v("#")]),t._v(" sourceTree")]),t._v(" "),a("ul",[a("li",[t._v("便于查看分支图表")]),t._v(" "),a("li",[t._v("Dark 主题")])]),t._v(" "),a("h3",{attrs:{id:"合并多条-commit"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#合并多条-commit"}},[t._v("#")]),t._v(" 合并多条 commit")]),t._v(" "),a("h4",{attrs:{id:"git-rebase"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#git-rebase"}},[t._v("#")]),t._v(" git rebase")]),t._v(" "),a("p",[a("a",{attrs:{href:"https://learngitbranching.js.org/?locale=zh_CN",target:"_blank",rel:"noopener noreferrer"}},[t._v("演示地址"),a("OutboundLink")],1)]),t._v(" "),a("p",[t._v("参考"),a("a",{attrs:{href:"https://www.codercto.com/a/45325.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("这一次彻底搞懂 Git Rebase"),a("OutboundLink")],1),t._v("，"),a("a",{attrs:{href:"https://zhuanlan.zhihu.com/p/141871803",target:"_blank",rel:"noopener noreferrer"}},[t._v("完美生活：git rebase -i | Linux 中国"),a("OutboundLink")],1),t._v("，"),a("a",{attrs:{href:"https://www.jianshu.com/p/4a8f4af4e803",target:"_blank",rel:"noopener noreferrer"}},[t._v("【Git】rebase 用法小结"),a("OutboundLink")],1)]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("git rebase "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("i head"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("~")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("3")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 合并最近三条commit")]),t._v("\n")])])]),a("p",[t._v("弹出编辑界面")]),t._v(" "),a("blockquote",[a("p",[t._v("pick b931dac 修改test2为test\npick efd10a0 feat: 群引流加好友时间\npick 860aea3 合并")]),t._v(" "),a("p",[t._v("# commands")]),t._v(" "),a("p",[t._v("pick：保留该commit（缩写:p）")]),t._v(" "),a("p",[t._v("reword：保留该commit，但我需要修改该commit的注释（缩写:r）")]),t._v(" "),a("p",[t._v("edit：保留该commit, 但我要停下来修改该提交(不仅仅修改注释)（缩写:e）")]),t._v(" "),a("p",[t._v("squash：将该commit和前一个commit合并（缩写:s）")]),t._v(" "),a("p",[t._v("fixup：将该commit和前一个commit合并，但我不要保留该提交的注释信息（缩写:f）")]),t._v(" "),a("p",[t._v("exec：执行shell命令（缩写:x）")]),t._v(" "),a("p",[t._v("drop：我要丢弃该commit（缩写:d）")])]),t._v(" "),a("p",[t._v("我一般选择"),a("code",[t._v("rff")]),t._v("命令，使用最上面的提交并修改，后两条合并，然后继续进入编辑界面修改提交记录，:wq 退出")]),t._v(" "),a("h3",{attrs:{id:"git-reset-soft-commitid"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#git-reset-soft-commitid"}},[t._v("#")]),t._v(" git reset --soft [commitID]")]),t._v(" "),a("blockquote",[a("p",[t._v("带 "),a("code",[t._v("--soft")]),t._v(" 参数的区别在于把改动内容添加到暂存区 相当于执行了"),a("code",[t._v("git add .")])])]),t._v(" "),a("h3",{attrs:{id:"git-stash"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#git-stash"}},[t._v("#")]),t._v(" git stash")]),t._v(" "),a("p",[t._v("场景：正在feature分支写代码时，线上出现bug，需要切回master修复")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("git stash\ngit checkout master\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 修复中...")]),t._v("\ngit checkout "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("feture_branch"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//切换刚才功能开发的分支")]),t._v("\ngit stash pop "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//取出修改")]),t._v("\n")])])]),a("h3",{attrs:{id:"git-commit-amend"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#git-commit-amend"}},[t._v("#")]),t._v(" git commit --amend")]),t._v(" "),a("p",[a("a",{attrs:{href:"https://zhuanlan.zhihu.com/p/100243017",target:"_blank",rel:"noopener noreferrer"}},[t._v("修改git提交记录用法详解"),a("OutboundLink")],1)]),t._v(" "),a("h3",{attrs:{id:"拉取本地不存在的远程分支"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#拉取本地不存在的远程分支"}},[t._v("#")]),t._v(" 拉取本地不存在的远程分支")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("git checkout "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("b "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1.0")]),t._v(" origin"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1.0")]),t._v("\ngit pull\n")])])]),a("h2",{attrs:{id:"gitemoji"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#gitemoji"}},[t._v("#")]),t._v(" gitemoji")]),t._v(" "),a("p",[t._v("https://gitmoji.js.org/")]),t._v(" "),a("h2",{attrs:{id:"cherry-pick"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#cherry-pick"}},[t._v("#")]),t._v(" cherry-pick")]),t._v(" "),a("p",[a("a",{attrs:{href:"https://www.ruanyifeng.com/blog/2020/04/git-cherry-pick.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("git cherry-pick 教程"),a("OutboundLink")],1)]),t._v(" "),a("p",[t._v("如有冲突则解决冲突后 "),a("code",[t._v("git add .")]),t._v(" "),a("code",[t._v("git cherry-pick --continue")])]),t._v(" "),a("p",[t._v("rebase、merge、cherry-pick 都有 --abort（相当于反悔，回到操作之前的状态）")]),t._v(" "),a("h2",{attrs:{id:"一些问题"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#一些问题"}},[t._v("#")]),t._v(" 一些问题")]),t._v(" "),a("p",[t._v("1、2021.8.14 github修改密码校验为 token 校验")]),t._v(" "),a("ul",[a("li",[a("p",[t._v("https://blog.csdn.net/weixin_41010198/article/details/119698015")])]),t._v(" "),a("li",[a("p",[t._v("https://blog.csdn.net/m0_46332820/article/details/119708248")])])]),t._v(" "),a("p",[t._v("2、怎么配置命令行代理")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 配置代理：")]),t._v("\ngit config "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("--")]),t._v("global http"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("proxy "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("代理地址"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 用完重置：")]),t._v("\ngit config "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("--")]),t._v("global "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("--")]),t._v("unset http"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("proxy\n")])])]),a("p",[t._v("3、"),a("code",[t._v("cd ..")]),t._v(" 和 "),a("code",[t._v("cd -")]),t._v(" 有什么区别")]),t._v(" "),a("ul",[a("li",[a("code",[t._v("cd..")]),t._v("：返回到上一级目录")]),t._v(" "),a("li",[a("code",[t._v("cd -")]),t._v("：返回到上一次的工作目录")])]),t._v(" "),a("p",[t._v("4、"),a("code",[t._v("git add .")]),t._v("与"),a("code",[t._v("git add -A")]),t._v("的区别")]),t._v(" "),a("ul",[a("li",[a("code",[t._v("git add .")]),t._v("：将修改和新增的文件添加到暂存区")]),t._v(" "),a("li",[a("code",[t._v("git add -A")]),t._v("：将修改，新增和删除的文件添加到暂存区（方便恢复被删除的文件）")])])])}),[],!1,null,null,null);a.default=r.exports}}]);