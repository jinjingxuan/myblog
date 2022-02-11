# webpack 模块化

webpack并不强制你使用某种模块化方案，你可以随意选择你喜欢的模块化方案，webpack 通过兼容所有模块化方案让你无痛接入项目。

## commonjs

```js
// index.js
const a = require('./a')
console.log(a)

// a.js
const a = 'a';
module.exports = a;
```

Webpack 打包后：

```js
(function(modules) {
	// The module cache
	var installedModules = {};
	// The require function
	function __webpack_require__(moduleId) {
		// Check if module is in cache
		if(installedModules[moduleId]) {
			return installedModules[moduleId].exports;
		}
		// Create a new module (and put it into the cache)
		var module = installedModules[moduleId] = {
			i: moduleId,
			l: false,
			exports: {}
		};
		// Execute the module function
		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
		// Flag the module as loaded
		module.l = true;
		// Return the exports of the module
		return module.exports;
	}

	// Load entry module and return exports
	return __webpack_require__(__webpack_require__.s = "./src/index.js");
})
/************************************************************************/
({

 "./src/a.js":
  (function(module, __webpack_exports__, __webpack_require__) {
    const a = 'a';
    module.exports = a;
  }),

  "./src/index.js":
  (function(module, __webpack_exports__, __webpack_require__) {
    const a = __webpack_require__("./src/a.js")
    console.log(a)
  })
});
```

其结构简化如下，整个打包生成的代码是一个IIFE(立即执行函数)，因为浏览器本身不支持模块化，那么webpack就用函数作用域来hack模块化的效果：

```js
(function(modules) {
    // Runtime
})([
    // 各个模块
])
```

### webpack_require

* `__webpack_require__`函数可以类比CommonJS的`require`，都是加载模块代码。和 NodeJS 的设计很类似，都是先从缓存取用，否则加载模块并放入缓存。
* `__webpack_require__`所在的闭包能访问外层变量`modules`和缓存`installedModules`。这个很关键，因为`modules`是webpack打包后立即执行函数传入的参数。`modules`是一个object，key是string类型，value是function类型。

```js
// 1、模块缓存对象
var installedModules = {};
// 2、webpack实现的require
function __webpack_require__(moduleId) {
    // 3、判断是否已缓存模块
    if(installedModules[moduleId]) {
        return installedModules[moduleId].exports;
    }
    // 4、缓存模块
    var module = installedModules[moduleId] = {
        i: moduleId,
        l: false,
        exports: {}
    };
    // 5、调用模块函数
    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    // 6、标记模块为已加载
    module.l = true;
    // 7、返回module.exports
    return module.exports;
}
// 8、require第一个模块
return __webpack_require__(__webpack_require__.s = "./src/index.js");
```

## ES Module

```js
// index.js
import a, { test } from './a'
import b from './b'
console.log(a);
test();
console.log(b)

// a.js
const a = 'a';
function test() { }
export default a;
export { test }

// b.js
const b = 'b';
export default b;
```

Webpack 打包后：

```js
{
    "./src/a.js": (function (module, __webpack_exports__, __webpack_require__) {

        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "test", function () { return test; });

        const a = 'a';

        function test() { }

        /* harmony default export */
        __webpack_exports__["default"] = (a);
    }),
    "./src/b.js": (function (module, __webpack_exports__, __webpack_require__) {

        "use strict";
        __webpack_require__.r(__webpack_exports__);
        const b = 'b';

        /* harmony default export */
        __webpack_exports__["default"] = (b);

    }),
    "./src/index.js": (function (module, __webpack_exports__, __webpack_require__) {

        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony import */
        var _a__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/a.js");
        /* harmony import */
        var _b__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/b.js");

        console.log(_a__WEBPACK_IMPORTED_MODULE_0__["default"])

        Object(_a__WEBPACK_IMPORTED_MODULE_0__["test"])();

        console.log(_b__WEBPACK_IMPORTED_MODULE_1__["default"])
    })
}
```

es模块化，`exports` 对象首先就会被`__webpack_require__.r`标记为es module，对于默认导出就是 `exports` 的 `default` 属性，对于具名导出使用 `__webpack_require__.d` 包装了一下，目的是让这些具名导出在模块之外只能读不能被修改（这是es module的特点）。

### webpack_require__.r

该函数用于标识 es 模块的导出

```js
// define __esModule on exports
__webpack_require__.r = function (exports) {
    if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
        Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
    }
    Object.defineProperty(exports, '__esModule', { value: true });
};
```

### webpack_require__.d

用于处理es模块的具名导出

```js
// define getter function for harmony exports
__webpack_require__.d = function (exports, name, getter) {
    if (!__webpack_require__.o(exports, name)) {
        Object.defineProperty(exports, name, { enumerable: true, get: getter });
    }
};
```

### webpack_require__.o

就是 `hasOwnPreperty` 

```js
__webpack_require__.o = 
    function (object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
```

## CommonJS 和 ES Module 混用

### webpack_require__.n

`__webpack_require__.n`是用来处理 commonjs 与 esm 混用的问题，如：

```js
// m.js
exports.foo = function () {
    return 1;
}

// index.js
import m from './m';
m.foo();
```

打包之后（只截取IIFE的参数部分）：

```js
[
  /* 0 */
  (function(module, __webpack_exports__, __webpack_require__) {

      "use strict";
      Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
      /* harmony import */ 
      var __WEBPACK_IMPORTED_MODULE_0__m__ = __webpack_require__(1);
      /* harmony import */ 
      var __WEBPACK_IMPORTED_MODULE_0__m___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__m__);

      __WEBPACK_IMPORTED_MODULE_0__m___default.a.foo();

  }),
  /* 1 */
  (function(module, exports, __webpack_require__) {
      "use strict";
      exports.foo = function () {
          return 1;
      }
  })
]
```

看一下`__webpack_require__.n`的定义：

```js
// getDefaultExport function for compatibility with non-harmony modules
__webpack_require__.n = function(module) {
    var getter = module && module.__esModule ?
        function getDefault() { return module['default']; } :
        function getModuleExports() { return module; };
    __webpack_require__.d(getter, 'a', getter);
    return getter;
};
```

`__webpack_require__.n`会判断module是否为es模块，当`__esModule`为true的时候，标识module为es模块，那么`module.a`默认返回`module.default`，否则返回`module`。