# 单元测试

[前端抢饭碗系列之Vue项目中如何做单元测试 ](https://xieyufei.com/2021/04/14/Vue-Unit-Test.html)

## Jest

Jest是Facebook出品的一个测试框架，相较于其他测试框架，最大的特点就是内置了常用的测试工具，比如自带断言、测试覆盖率工具，实现了开箱即用。

[官方文档](https://jestjs.io/zh-Hans/docs/getting-started)

### 配置方式

`package.json` 或者 `jest.config.js`

```json
// package.json
{
  "name": "my-project",
  "jest": {
    // ...
  }
}
```

```js
// jest.config.js
module.exports = {
  	rootDir: path.resolve(__dirname, '../../'),
    moduleFileExtensions: ['js', 'json', 'vue'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1', // 把 @ 设置为 /src 的别名
    },
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
        '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest',
    },
    snapshotSerializers: ['<rootDir>/node_modules/jest-serializer-vue'],
    setupFiles: ['<rootDir>/test/unit/setup'],
    coverageDirectory: '<rootDir>/test/unit/coverage',
    collectCoverageFrom: ['src/**/*.{js,vue}', '!src/main.js', '!src/router/index.js', '!**/node_modules/**'],
};
```

### [transform](https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object)

Jest 默认只会处理 javascript 语法，所以项目中如果有 ES6、vue 等语法，需要配置 transform（预处理器）来处理。

```json
{
  // ...
  "jest": {
    // 告诉 Jest 处理 `*.vue` 文件
    "moduleFileExtensions": ["js", "json", "vue"],
    // 用 `vue-jest` 处理 `*.vue` 文件
    "transform": {
      "\\.[jt]sx?$": "babel-jest",
      ".*\\.(vue)$": "vue-jest"
    }
  }
}
```

**使用babel**

由于我们配置的环境是 node，它的语法是CommonJS，因此 test 文件中使用ES6 语法 import 时会报错。

babel-jest 不支持 babel7 版本，可以安装如下：

```sh
yarn add babel-jest babel-core@^7.0.0-bridge.0 @babel/core
```

当运行jest 命令时，babel-jest 会检测当前环境是否安装了 babel-core，如果安装了，会去取 .babelrc 的配置并执行 babel 对代码进行转化。我们还需在根目录下创建 `.babelrc` 文件：

```json
{
    "presets": ["@babel/preset-env"],
    "plugins": [
        "@babel/plugin-syntax-dynamic-import" // 支持 import 语法
    ]
}
```

### [testEnvironment](https://jestjs.io/docs/configuration#testenvironment-string)

jest 默认为 node 环境，如果你构建的是一个 web app ，那么需要使用 `jsdom`。或者可以在测试文件顶部加上如下配置：

```js
/**
 * @jest-environment jsdom
 */

test('use jsdom in this test file', () => {
  const element = document.createElement('div');
  expect(element).not.toBeNull();
});
```

### [testEnvironmentOptions](https://jestjs.io/docs/configuration#testenvironmentoptions-object)

Options 会作为参数传递给 `testEnvironment`。

```js
/**
 * @jest-environment jsdom
 * @jest-environment-options {"url": "https://jestjs.io/"}
 */

test('use jsdom and set the URL in this test file', () => {
  expect(window.location.href).toBe('https://jestjs.io/');
});
```

## 框架提供的单测工具

### Vue Test Utils

[Vue Test Utils](https://v1.test-utils.vuejs.org/zh/) 是 Vue.js 官方的单元测试实用工具库。

- [Vue Test Utils 1](https://v1.test-utils.vuejs.org/zh/api/) 用于 [Vue 2](https://github.com/vuejs/vue/).
- [Vue Test Utils 2](https://test-utils.vuejs.org/guide/) 用于 [Vue 3](https://github.com/vuejs/vue-next/).

### San-test-utils

* [github地址](https://github.com/wanwu/san-test-utils)

* [官方文档](https://ecomfe.github.io/san-test-utils/)

## 单测覆盖率

* [单元测试覆盖率](https://juejin.cn/post/6945241963775918110)
* [代码覆盖率工具 Istanbul 入门教程](http://www.ruanyifeng.com/blog/2015/06/istanbul.html)