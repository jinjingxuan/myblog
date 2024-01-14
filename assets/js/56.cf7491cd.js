(window.webpackJsonp=window.webpackJsonp||[]).push([[56],{497:function(t,e,s){t.exports=s.p+"assets/img/err.ca5d1e05.png"},641:function(t,e,s){"use strict";s.r(e);var r=s(14),a=Object(r.a)({},(function(){var t=this,e=t._self._c;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"typescirpt类型声明文件"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#typescirpt类型声明文件"}},[t._v("#")]),t._v(" TypeScirpt类型声明文件")]),t._v(" "),e("p",[t._v("类型声明（Type Declaration）或者 类型定义（Type Definition）文件是一个以"),e("code",[t._v(".d.ts")]),t._v("作为文件后缀名的TypeScript文件。")]),t._v(" "),e("p",[t._v("类型声明文件用来帮助开发者在 typescript 中使用已有的 JavaScript 工具包。")]),t._v(" "),e("h2",{attrs:{id:"d-ts"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#d-ts"}},[t._v("#")]),t._v(" "),e("code",[t._v(".d.ts")])]),t._v(" "),e("p",[t._v("类型声明文件的后缀名为"),e("code",[t._v(".d.ts")]),t._v("，文件中只包含与类型相关的代码，不包含逻辑代码，它们的作用旨在为开发者提供类型信息，所以它们只在开发阶段起作用。")]),t._v(" "),e("blockquote",[e("p",[t._v("我们知道第三方库一般会使用 ts 代码编写，ts 代码会编译成 js 代码，发布后供他人使用。这个时候类型信息就丢失了。当我们在 IDE 中引入第三方库时，如果该库没有提供类型声明，TypeScript 则不知道该库是什么类型，有什么东西，进而 IDE 会进行报错。")])]),t._v(" "),e("p",[t._v("比如我们在项目中使用jQuery，直接在全局使用变量"),e("code",[t._v("$")]),t._v("或"),e("code",[t._v("jQuery")]),t._v("：")]),t._v(" "),e("div",{staticClass:"language-ts extra-class"},[e("pre",{pre:!0,attrs:{class:"language-ts"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[t._v("$")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'#foo'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v('// 找不到名称 "$"。是否需要安装 jQuery 的类型定义? 请尝试使用 `npm i --save-dev @types/jquery`。ts(2581)')]),t._v("\n")])])]),e("p",[e("a",{attrs:{href:"https://github.com/DefinitelyTyped/DefinitelyTyped",target:"_blank",rel:"noopener noreferrer"}},[t._v("DefinitelyTyped"),e("OutboundLink")],1),t._v(" 社区为我们提供了很多第三方 npm 声明文件包，例如"),e("code",[t._v("@types/lodash")]),t._v("和"),e("code",[t._v("@types/node")]),t._v("等等。你可以使用npm安装"),e("a",{attrs:{href:"https://www.npmjs.com/org/types",target:"_blank",rel:"noopener noreferrer"}},[e("code",[t._v("@types")]),e("OutboundLink")],1),t._v("下的声明包。")]),t._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[t._v("npm")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("-D")]),t._v(" @types/jquery\n")])])]),e("p",[t._v("这些包会被下载到 "),e("code",[t._v("node_modules/@types")]),t._v("文件夹下。")]),t._v(" "),e("p",[t._v("声明文件有两种使用方法：")]),t._v(" "),e("ul",[e("li",[t._v("将声明文件和源码放在一起")]),t._v(" "),e("li",[t._v("将声明文件发布到 "),e("code",[t._v("@types")]),t._v(" 下")])]),t._v(" "),e("p",[t._v("我们一般不需要手动去写声明文件，如果我们的文件本身是用 TS 编写的，在编译的时候让 TS 自动生成声明文件，并在发布的时候将 .d.ts  文件一起发布即可。")]),t._v(" "),e("p",[t._v("如果是手动写的声明文件，那么需要满足以下任一一项条件，才能被正确的识别：")]),t._v(" "),e("ul",[e("li",[t._v("给 package.json 中的 "),e("code",[t._v("types")]),t._v(" 或 "),e("code",[t._v("typings")]),t._v(" 字段指定类型声明文件的路径。")]),t._v(" "),e("li",[t._v("声明文件放在项目根目录下，命名为 "),e("code",[t._v("index.d.ts")])]),t._v(" "),e("li",[t._v("与入口文件（package.json 中的 main 字段指定的入口文件）一起，编写一个同名 "),e("code",[t._v(".d.ts")]),t._v(" 文件")])]),t._v(" "),e("h2",{attrs:{id:"全局声明"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#全局声明"}},[t._v("#")]),t._v(" 全局声明")]),t._v(" "),e("p",[t._v("**全局声明（global declaration）**在任何 TypeScript 项目或者 TypeScript 代码片段中都会起作用的。例如当你写下"),e("code",[t._v("const p = new Promise();")]),t._v("时，TypeScript编译器不会去编译你的代码，因为"),e("code",[t._v("const p = new Promise();")]),t._v("语法错误了。")]),t._v(" "),e("p",[e("img",{attrs:{src:s(497),alt:"err"}})]),t._v(" "),e("p",[t._v("从IDE的提示中，可以看到"),e("code",[t._v("Promise")]),t._v("类型是定义在"),e("code",[t._v("lib.es2015.promise.d.ts")]),t._v("文件中的，由 TypeScript 提供，TypeScript 提供的很多这样的声明文件，被称作"),e("strong",[t._v("标准库")]),t._v("（这些声明文件会随TypeScript一起安装）。")]),t._v(" "),e("h2",{attrs:{id:"编写声明文件"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#编写声明文件"}},[t._v("#")]),t._v(" 编写声明文件")]),t._v(" "),e("p",[t._v("详见以下两篇文章：")]),t._v(" "),e("ul",[e("li",[e("a",{attrs:{href:"https://drylint.com/Typescript/%E5%A3%B0%E6%98%8E%E6%96%87%E4%BB%B6.d.ts.html#%E5%A3%B0%E6%98%8E%E6%96%87%E4%BB%B6-d-ts",target:"_blank",rel:"noopener noreferrer"}},[t._v("声明文件 *.d.ts"),e("OutboundLink")],1)]),t._v(" "),e("li",[e("a",{attrs:{href:"https://www.pengfeixc.com/blogs/javascript/typescript-declarations",target:"_blank",rel:"noopener noreferrer"}},[t._v("TypeScirpt类型声明完全指南"),e("OutboundLink")],1)])])])}),[],!1,null,null,null);e.default=a.exports}}]);