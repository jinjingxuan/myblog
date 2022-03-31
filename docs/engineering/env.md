# process.env全局变量

众所周知，vue-cli 中有 `.env` 创建全局变量的功能，项目中可以直接使用 `process.env.[变量名]` 来使用。

最近在公司自研 cli 创建的项目中并没有发现此功能，于是打算了解一下 `process.env` 的原理并探索如何在 cli 工具中实现读取 `.env` 环境变量的功能，使其在客户端侧使用。

## vue-cli

首先我们看一下 vue-cli 的相关概念：[原文地址](https://cli.vuejs.org/zh/guide/mode-and-env.html)

### 模式

一个 Vue CLI 项目有三个模式：

- `development` 模式用于 `vue-cli-service serve`
- `test` 模式用于 `vue-cli-service test:unit`
- `production` 模式用于 `vue-cli-service build` 和 `vue-cli-service test:e2e`

当运行 `vue-cli-service` 命令时，所有的环境变量都从对应的[环境文件](https://cli.vuejs.org/zh/guide/mode-and-env.html#环境变量)中载入。如果文件内部不包含 `NODE_ENV` 变量，它的值将取决于模式，例如，

* 在 `production` 模式下被设置为 `"production"`
* 在 `test` 模式下被设置为 `"test"`，默认则是 `"development"`。

### 环境变量

你可以在你的项目根目录中放置下列文件来指定环境变量：

```sh
.env                # 在所有的环境中被载入
.env.local          # 在所有的环境中被载入，但会被 git 忽略
.env.[mode]         # 只在指定的模式中被载入
.env.[mode].local   # 只在指定的模式中被载入，但会被 git 忽略
```

一个环境文件只包含环境变量的“键=值”对：

```
FOO=bar
VUE_APP_NOT_SECRET_CODE=some_value
```

### 优先级

为一个特定模式准备的环境文件（例如 `.env.production`）将会比一般的环境文件（例如 `.env`）拥有更高的优先级。

### 在客户端侧代码中使用环境变量

```js
console.log(process.env.VUE_APP_NOT_SECRET_CODE); // some_value
```

## 实现原理

整个过程其实分为两步：

1. 如何读取 `.env`  中的变量
2. 如何在客户端侧代码中全局使用

在介绍之前，先来复习一些相关的知识点。

### process.env

`process` 对象提供有关当前 Node.js 进程的信息并对其进行控制。它可以作为全局可用。

[`process.env`](http://nodejs.cn/api/process.html#processenv) 属性返回包含用户环境的对象，包含了当前Shell的所有环境变量。比如，`process.env.HOME` 返回用户的主目录。

```js
// 可以直接在 node 程序中输出
console.log(process.env);
```

项目中通常的做法是，新建一个环境变量`NODE_ENV`，用它确定当前所处的阶段，生产阶段设为 `production`，开发阶段设为 `development`。**NODE_ENV 这个名称只是开发社区的一种共识，名称内容是可以修改的。**

如何设置 这个 `process.env.NODE_ENV` 环境变量呢？在webpack项目里，我们可以通过设置package.json来实现，但是Windows 系统和Mac系统有区别。

```json
// windows
{
  "scripts": {
    "dev": "set NODE_ENV=development &&  webpack-dev-server --open --hot",
    "build": "set NODE_ENV=production &&   --progress --hide-modules"
  }
}

// mac
{
  "scripts": {
    "dev": "export NODE_ENV=development &&  webpack-dev-server --open --hot",
    "build": "export NODE_ENV=production &&   --progress --hide-modules"
  }
}
```

`cross-env` 是一个跨平台设置环境变量的第三方包，它可以让你只配置一行命令，就能轻松地在多个平台设置环境变量。

```json
{
  ...
  "scripts": {
    "dev": "cross-env NODE_ENV=development webpack-dev-server --open --hot",
    "build": "cross-env NODE_ENV=production webpack --mode=production  --progress --hide-modules"
  },
}
```

这样我们就可以在项目里取到 `process.env.NODE_ENV` 的值，然后利用这个值来区分当前环境。

### process.cwd

`process.cwd()` 方法返回 Node.js 进程的当前工作目录。

### compiler

`Compiler` 对象包含了当前运行`Webpack`的配置，包括`entry、output、loaders`等配置，这个对象在启动`Webpack`时被实例化，而且是全局唯一的。`Plugin`可以通过该对象获取到 Webpack 的配置信息进行处理。

### [webpack.DefinePlugin](https://webpack.docschina.org/plugins/define-plugin/)

`DefinePlugin` 允许在 **编译时** 将你代码中的变量替换为其他值或表达式。

换种方式理解就是可以向应用中**注入全局变量**。

:::tip

请注意，由于本插件会直接替换文本，因此提供的值必须在字符串本身中再包含一个 **实际的引号** 。通常，可以使用类似 `'"production"'` 这样的替换引号，或者直接用 `JSON.stringify('production')`。

:::

```js
// 这样写的话
new webpack.DefinePlugin({
    'process.env.NODE_ENV': 'production',
})

// production是一个变量，并不是我们想象中的字符串
if (production === 'production') {
    console.log('production');
}


// 所以需要这么写
new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production'),
})
// 或者
new webpack.DefinePlugin({
    'process.env.NODE_ENV': '"production"',
})
```

## 具体实现

首先我们需要读取 `.env` 文件中的内容并解析出来，并赋值到 process.env 中去。

这里可以用到工具库 [dotenv](https://github.com/motdotla/dotenv#rules)，使用其中的 [parse](https://github.com/motdotla/dotenv#parse) 方法来解析。

```js
import * as dotenv from 'dotenv';
// 从 .env 文件中取出变量赋值给 process.env
function loadEnv (mode) {
    // 当前路径
    const basePath = path.resolve(process.cwd());

    const load = envPath => {
        let env = {};
        try {
            const content = fs.readFileSync(envPath);
            env = dotenv.parse(content) || {};
        } catch (err) {
            if (err.toString().indexOf('ENOENT') < 0) {
                logger.error(err);
            }
        }
        return env;
    };

    let env = {};
    // 注意此处的优先级
    ['.env', `.env.${mode}`, `.env.${mode}.local`].forEach(envName => {
        const envPath = path.resolve(basePath, envName);
        if (fs.existsSync(envPath)) {
            env = Object.assign(env, load(envPath));
        }
    });
    process.env.NODE_ENV = mode;
    Object.keys(env).forEach(key => {
        if (!process.env.hasOwnProperty(key)) {
            process.env[key] = env[key];
        }
    });
}
```

找到 cli 项目中 webpack 配置项的部分，使用 webpack.DefinePlugin 来注入变量

```js
module: {
  	rules: [],
    plugins: [
      new webpack.DefinePlugin({
        ...resolveClientEnv(),
        '__GLOBAL_VAR__': '1'
      })
    ]
}
```

其中的 resolveClientEnv 的功能是从 `process.env` 中解析出来用到的变量，因为其中的变量不一定都是我们所需要的，同时我们也可以在这个方法中要求变量名的前缀，即不满足前缀要求的不能被解析。

```js
/**
 * 解析 process.env 中符合要求的变量在客服端侧使用
 * 要求变量前缀符合: GLOBAL_VAR_
 */
export function resolveClientEnv () {
    const prefixRE = /^GLOBAL_VAR_/;
    const env = {};
    Object.keys(process.env).forEach(key => {
        if (prefixRE.test(key) || key === 'NODE_ENV') {
            env[key] = process.env[key];
        }
    });

    for (const key in env) {
        env[key] = JSON.stringify(env[key]);
    }
    return {
        'process.env': env
    };
}
```

## 如何验证

在项目中创建 `.env`、`.env.development`、`.env.production` 三个文件，使用 cli 启动项目，测试客户端侧代码中的变量输出及优先级。

## 总结

综上所述，项目中使用的 `process.env` 其实和 node 中的 `process.env` 不是一回事，项目中使用的是我们自定义的全局变量，可以更改为其他名字，实现原理其实是 `webpack` + `dotenv` + `webpack.definePlugin` 的作用。

node 中的 `process.env` 是自带的 api。