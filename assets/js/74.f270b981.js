(window.webpackJsonp=window.webpackJsonp||[]).push([[74],{536:function(v,_,t){"use strict";t.r(_);var a=t(14),s=Object(a.a)({},(function(){var v=this,_=v._self._c;return _("ContentSlotsDistributor",{attrs:{"slot-key":v.$parent.slotKey}},[_("h1",{attrs:{id:"gc算法-v8引擎"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#gc算法-v8引擎"}},[v._v("#")]),v._v(" GC算法，V8引擎")]),v._v(" "),_("ul",[_("li",[v._v("GC算法")]),v._v(" "),_("li",[v._v("内存泄露")]),v._v(" "),_("li",[v._v("内存溢出")]),v._v(" "),_("li",[v._v("V8引擎")]),v._v(" "),_("li",[v._v("performance")])]),v._v(" "),_("h2",{attrs:{id:"gc算法"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#gc算法"}},[v._v("#")]),v._v(" GC算法")]),v._v(" "),_("h5",{attrs:{id:"_1-标记清除"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_1-标记清除"}},[v._v("#")]),v._v(" 1. 标记清除")]),v._v(" "),_("p",[v._v("垃圾回收器会在运行时给存储在内存中的所有变量加一个标记，然后去除环境中的变量以及被环境中的变量所引用的变量（闭包）在这些完成后仍存在标记的就是要删除的变量了，因为环境中的变量已经无法访问到这些变量了。缺点是清除的对象可能地址不连续，造成内存碎片化。")]),v._v(" "),_("p",[v._v("优缺点：1. 可处理循环引用 2. 产生碎片化 3. 不会立即回收")]),v._v(" "),_("blockquote",[_("p",[v._v("你可以想象整个内存是一个大海，每个对象都是一个岛屿，相互之间用大桥连接，现在要找出与大陆相连的岛屿，那么就从大陆出发，依次标记所能达到的每个岛屿，最后没有被标记到的岛屿就是孤岛，可以当垃圾清除掉。即使两个孤岛之间相互有桥连接也没用，因为与大陆不通啊。")])]),v._v(" "),_("h5",{attrs:{id:"_2-引用计数"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_2-引用计数"}},[v._v("#")]),v._v(" 2. 引用计数")]),v._v(" "),_("p",[v._v("引用计数的策略是跟踪记录每个值被使用的次数。当声明了一个变量并将一个引用类型赋值给该变量时，这个值得引用次数就加一，如果该变量的值变成了另一个，则这个值得引用次数就减一，当这个值的引用次数为0的时候，说明没有变量在使用，这个值无法访问。由此可以将其占用的空间回收，这些垃圾回收器就会在运行时清理掉引用次数为0的值占用的空间，但这种方法容易引起内存泄漏，因为这种方式没有解决循环引用的问题，所以不建议使用！例如：")]),v._v(" "),_("div",{staticClass:"language-js extra-class"},[_("pre",{pre:!0,attrs:{class:"language-js"}},[_("code",[_("span",{pre:!0,attrs:{class:"token keyword"}},[v._v("var")]),v._v(" obj "),_("span",{pre:!0,attrs:{class:"token operator"}},[v._v("=")]),v._v(" "),_("span",{pre:!0,attrs:{class:"token punctuation"}},[v._v("{")]),v._v(" "),_("span",{pre:!0,attrs:{class:"token literal-property property"}},[v._v("a")]),_("span",{pre:!0,attrs:{class:"token operator"}},[v._v(":")]),_("span",{pre:!0,attrs:{class:"token number"}},[v._v("1")]),_("span",{pre:!0,attrs:{class:"token punctuation"}},[v._v(",")]),_("span",{pre:!0,attrs:{class:"token literal-property property"}},[v._v("b")]),_("span",{pre:!0,attrs:{class:"token operator"}},[v._v(":")]),_("span",{pre:!0,attrs:{class:"token number"}},[v._v("2")]),_("span",{pre:!0,attrs:{class:"token punctuation"}},[v._v(",")]),_("span",{pre:!0,attrs:{class:"token literal-property property"}},[v._v("c")]),_("span",{pre:!0,attrs:{class:"token operator"}},[v._v(":")]),_("span",{pre:!0,attrs:{class:"token number"}},[v._v("3")]),v._v(" "),_("span",{pre:!0,attrs:{class:"token punctuation"}},[v._v("}")]),_("span",{pre:!0,attrs:{class:"token punctuation"}},[v._v(";")]),v._v("\nobj"),_("span",{pre:!0,attrs:{class:"token punctuation"}},[v._v(".")]),v._v("o "),_("span",{pre:!0,attrs:{class:"token operator"}},[v._v("=")]),v._v(" obj"),_("span",{pre:!0,attrs:{class:"token punctuation"}},[v._v(";")]),_("span",{pre:!0,attrs:{class:"token comment"}},[v._v("//循环引用")]),v._v("\n")])])]),_("p",[v._v("优缺点：1.即时回收 2. 减少程序卡顿 3.无法解决循环引用 4. 资源消耗大：维护引用计数器")]),v._v(" "),_("h5",{attrs:{id:"_3-标记整理"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_3-标记整理"}},[v._v("#")]),v._v(" 3. 标记整理")]),v._v(" "),_("p",[v._v("标记清除的升级版，清除之前先整理空间，再清除，防止内存碎片化")]),v._v(" "),_("h2",{attrs:{id:"什么情况会引起内存泄漏"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#什么情况会引起内存泄漏"}},[v._v("#")]),v._v(" 什么情况会引起内存泄漏？")]),v._v(" "),_("p",[v._v("虽然有垃圾回收机制但是我们编写代码操作不当还是会造成内存泄漏。")]),v._v(" "),_("ul",[_("li",[v._v("意外的全局变量引起的内存泄漏。")])]),v._v(" "),_("p",[v._v("原因：全局变量，不会被回收。")]),v._v(" "),_("p",[v._v("解决：使用严格模式避免。")]),v._v(" "),_("ul",[_("li",[v._v("闭包引起的内存泄漏")])]),v._v(" "),_("p",[v._v("原因：闭包可以维持函数内局部变量，使其得不到释放。")]),v._v(" "),_("p",[v._v("解决：将事件处理函数定义在外部，解除闭包,或者在定义事件处理函数的外部函数中，删除对dom的引用。")]),v._v(" "),_("ul",[_("li",[v._v("没有清理的DOM元素引用")])]),v._v(" "),_("p",[v._v("原因：虽然别的地方删除了，但是对象中还存在对dom的引用")]),v._v(" "),_("p",[v._v("解决：手动删除。")]),v._v(" "),_("ul",[_("li",[v._v("被遗忘的定时器或者回调")])]),v._v(" "),_("p",[v._v("原因：定时器中有dom的引用，即使dom删除了，但是定时器还在，所以内存中还是有这个dom。")]),v._v(" "),_("p",[v._v("解决：手动删除定时器和dom。")]),v._v(" "),_("ul",[_("li",[v._v("子元素存在引用引起的内存泄漏")])]),v._v(" "),_("p",[v._v("原因：div中的ul li  得到这个div，会间接引用某个得到的li，那么此时因为div间接引用li，即使li被清空，也还是在内存中，并且只要li不被删除，他的父元素都不会被删除。")]),v._v(" "),_("p",[v._v("解决：手动删除清空。")]),v._v(" "),_("h2",{attrs:{id:"内存溢出"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#内存溢出"}},[v._v("#")]),v._v(" 内存溢出")]),v._v(" "),_("ul",[_("li",[_("p",[v._v("内存溢出，申请不到足够的内存；")])]),v._v(" "),_("li",[_("p",[v._v("内存泄露，无法释放已申请的内存；")])])]),v._v(" "),_("h2",{attrs:{id:"v8引擎与垃圾回收策略"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#v8引擎与垃圾回收策略"}},[v._v("#")]),v._v(" V8引擎与垃圾回收策略")]),v._v(" "),_("ul",[_("li",[_("p",[v._v("V8采用即时编译")])]),v._v(" "),_("li",[_("p",[v._v("V8内存设限（64操作系统不超过1.5G）")])]),v._v(" "),_("li",[_("p",[v._v("采用分代回收的思想")])]),v._v(" "),_("li",[_("p",[v._v("内存分为新生代，老生代")])]),v._v(" "),_("li",[_("p",[v._v("不同对象采用不同GC算法")])])]),v._v(" "),_("h3",{attrs:{id:"v8内存分配与垃圾回收"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#v8内存分配与垃圾回收"}},[v._v("#")]),v._v(" V8内存分配与垃圾回收")]),v._v(" "),_("blockquote",[_("p",[v._v("V8内存空间一分为二")]),v._v(" "),_("p",[v._v("小空间用于存储新生代对象（32M | 16M）")]),v._v(" "),_("p",[v._v("新生代指的是存活时间较短的对象")]),v._v(" "),_("p",[v._v("新生代内存区分为两个相等空间")]),v._v(" "),_("p",[v._v("使用空间为From，空闲空间为To")]),v._v(" "),_("p",[v._v("活动对象存储于From空间")]),v._v(" "),_("p",[v._v("进行回收时，标记整理将From活动对象拷贝至To，释放From区域")]),v._v(" "),_("p",[v._v("最后From和To交换空间")]),v._v(" "),_("p",[v._v("空间换时间")])]),v._v(" "),_("p",[v._v("回收过程中可能出现晋升：")]),v._v(" "),_("ul",[_("li",[v._v("一轮GC还存活的新生代需要晋升到老年代")]),v._v(" "),_("li",[v._v("To空间使用率超过25%的需要晋升，因为From和To互换后需要保证新活动对象的空间充足")])]),v._v(" "),_("blockquote",[_("p",[v._v("老生代（1.4G | 700M）")]),v._v(" "),_("p",[v._v("老生代对象就是指存活时间较长的对象")]),v._v(" "),_("p",[v._v("采用标记清除，标记整理，增量标记")]),v._v(" "),_("p",[v._v("首先使用标记清除完成垃圾回收")]),v._v(" "),_("p",[v._v("采用标记整理进行空间优化")]),v._v(" "),_("p",[v._v("采用增量标记进行效率优化，将标记过程分段，与程序执行交替执行，提高效率（垃圾回收会阻塞程序）")])]),v._v(" "),_("h2",{attrs:{id:"performance"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#performance"}},[v._v("#")]),v._v(" performance")]),v._v(" "),_("p",[v._v("打开F12中的performance工具，点击录制，输入网址并做一些操作，点击停止就可以看到最后一个图的蓝色线条即是内存变换情况。")]),v._v(" "),_("p",[_("strong",[v._v("监控内存的方式")])]),v._v(" "),_("ul",[_("li",[v._v("浏览器任务管理器："),_("code",[v._v("shift+esc，")]),v._v("最后一列可看到JavaScript使用的内存")]),v._v(" "),_("li",[v._v("Timeline时序图：蓝色线条，在其上面可定位")]),v._v(" "),_("li",[v._v("堆快照查找分离DOM：F12中的Memory选项，Take snapshot")]),v._v(" "),_("li",[v._v("判断是否存在频繁的垃圾回收：Timeline和任务管理器去查看")])])])}),[],!1,null,null,null);_.default=s.exports}}]);