(window.webpackJsonp=window.webpackJsonp||[]).push([[117],{584:function(s,t,a){"use strict";a.r(t);var r=a(14),n=Object(r.a)({},(function(){var s=this,t=s._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h2",{attrs:{id:"js的数值范围以及为什么"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#js的数值范围以及为什么"}},[s._v("#")]),s._v(" js的数值范围以及为什么")]),s._v(" "),t("blockquote",[t("p",[s._v("JavaScript能表示并进行精确算术运算的整数范围为：正负2的53次方，也即从最小值-9007199254740992到最大值+9007199254740992之间的范围；对于超过这个范围的整数，JavaScript依旧可以进行运算，但却不保证运算结果的精度。")])]),s._v(" "),t("div",{staticClass:"language-js extra-class"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("+")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"6145390195186705543"')]),s._v("    "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 出现精度问题，6145390195186705000")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("BigInt")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"6145390195186705543"')]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("+")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1n")]),s._v("  "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//6145390195186705544n")]),s._v("\n")])])]),s._v(" "),t("p",[s._v("JavaScript 内部，所有数字都是以64位浮点数形式储存，即使整数也是如此。所以，"),t("code",[s._v("1")]),s._v("与"),t("code",[s._v("1.0")]),s._v("是相同的，是同一个数。")]),s._v(" "),t("div",{staticClass:"language-js extra-class"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("===")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1.0")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// true")]),s._v("\n")])])]),t("p",[s._v("由于浮点数不是精确的值，所以涉及小数的比较和运算要特别小心。")]),s._v(" "),t("div",{staticClass:"language-js extra-class"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0.1")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("+")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0.2")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("===")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0.3")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// false")]),s._v("\n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//0.1 => 0.0001 1001 1001 1001…（无限循环）")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//0.2 => 0.0011 0011 0011 0011…（无限循环）")]),s._v("\n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("//双精度浮点数的小数部分最多支持 52 位，所以两者相加之后得到这么一串 0.0100110011001100110011001100110011001100110011001100因浮点数小数位的限制而截断的二进制数字，这时候，我们再把它转换为十进制，就成了0.30000000000000004。")]),s._v("\n\n"),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0.3")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0.1")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 2.999999999999999")]),s._v("\n\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0.3")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0.2")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("===")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0.2")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0.1")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// false")]),s._v("\n")])])]),t("h3",{attrs:{id:"数值精度"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#数值精度"}},[s._v("#")]),s._v(" 数值精度")]),s._v(" "),t("p",[s._v("根据国际标准 IEEE 754，JavaScript 浮点数的64个二进制位，从最左边开始，是这样组成的。")]),s._v(" "),t("ul",[t("li",[s._v("第1位：符号位，"),t("code",[s._v("0")]),s._v("表示正数，"),t("code",[s._v("1")]),s._v("表示负数      （1位）")]),s._v(" "),t("li",[s._v("第2位到第12位：指数部分                                 （11位）")]),s._v(" "),t("li",[s._v("第13位到第64位：尾数部分                               （52位）")])]),s._v(" "),t("p",[s._v("符号位决定了一个数的正负，指数部分决定了数值的大小，小数部分决定了数值的精度。")]),s._v(" "),t("div",{staticClass:"language-js extra-class"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[t("span",{pre:!0,attrs:{class:"token constant"}},[s._v("IEEE")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("754")]),s._v(" 规定，有效数字第一位默认总是"),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("，不保存在"),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("64")]),s._v("位浮点数之中。也就是说，有效数字总是"),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("xx"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("...")]),s._v("xx的形式，其中xx"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("xx的部分保存在"),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("64")]),s._v("位浮点数之中，最长可能为"),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("52")]),s._v("位。因此，JavaScript "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("提供的有效数字最长为53个二进制位。")]),s._v("\n\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("^")]),s._v("符号位 "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("*")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("xx"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("...")]),s._v("xx "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("*")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("^")]),s._v("指数位\n\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("精度最多只能到53个二进制位")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("有一位不在浮点数中"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("，这意味着，绝对值小于"),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),s._v("的"),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("53")]),s._v("次方的整数，即"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("^")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("53")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("到"),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("^")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("53")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("，都可以精确表示。\n\n"),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("^")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("+")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("^")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("+")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("...")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("+")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("^")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("52")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("^")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("53")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v(" \n")])])])])}),[],!1,null,null,null);t.default=n.exports}}]);