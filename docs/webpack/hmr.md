---
title: webpack热更新原理
date: 2021-08-09 14:47:00
categories: webpack
---

# webpack 热更新

> HMR：Hot Module Replacement 模块热更新
>
> 应用程序运行过程中实时替换某个模块，页面状态不会改变

## watch，webpack-dev-server，hmr区别

* watch 模式：使用 webpack --watch 开启，文件改变后自动重新编译，但是不会自动刷新浏览器。
* webpack-dev-server：集成工具，综合了自动编译和自动刷新浏览器的功能。
* HMR：不用刷新浏览器，实时更新，也集成在 webpack-dev-server 中。

## 如何使用HMR

1. 引入内置 HotModuleReplacementPlugin 插件
2. 开启 hot: true

```js
// 使用 webpack 自带的 HotModuleReplacementPlugin
plugins: {
    HotModuleReplacementPlugin: new webpack.HotModuleReplacementPlugin()
}
// devServer 再配置一下
devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    hot: true,
    hotonly: false, // hot: 出现错误刷新页面，不会发现错误，hotonly: 若有错误不会刷新，可以发现错误代码
    historyApiFallback: true,
    compress: true,
    watchOptions: {
      // 不监听的文件或文件夹
      ignored: /node_modules/,
      // 监听到变化发生后会等300ms再去执行动作，防止文件更新太快导致重新编译频率太高
      aggregateTimeout: 300,
      // 默认每隔1000毫秒询问一次
      poll: 1000
    }
}
```

注：webpack的HMR并不能开箱即用，其实是需要手动处理模块替换的逻辑。

* 样式文件可以直接使用，style-loader中会处理热更新的逻辑，更新后的 CSS 直接覆盖掉之前的 CSS 即可。
* js模块不能直接使用，因为我们所编写的 JavaScript 模块是没有任何规律的，你可能导出的是一个对象，也可能导出的是一个字符串，还可能导出的是一个函数，使用时也各不相同。所以 Webpack 面对这些毫无规律的 JS 模块，根本不知道该怎么处理更新后的模块，也就无法直接实现一个可以通用所有情况的模块替换方案。

* 通过脚手架创建的项目内部都集成了 HMR 方案，不需要自己手动处理。
  * Vue.js HMR 方案：https://vue-loader.vuejs.org/guide/hot-reload.html
  * React HMR 方案：https://github.com/gaearon/react-hot-loader
  * San HMR 方案：https://github.com/ecomfe/san-hot-loader

 ## 如何自己处理热更新逻辑

以编辑器和图片热更新逻辑为例

```js
if (module.hot) {
 	module.hot.accept('./editor.js', () => {
     // 当 editor.js 更新，自动执行此函数
     // 在这里写更新逻辑，则页面不会自动刷新，如果没有此处的手动处理，页面还会自动刷新
  }) 
}

// ================================================================
// HMR 手动处理模块热更新
// 不用担心这些代码在生产环境冗余的问题，因为通过 webpack 打包后，
// 这些代码全部会被移除变为 if (false) ，这些只是开发阶段用到
import createEditor from './editor';
if (module.hot) {
  let hotEditor = editor
  module.hot.accept('./editor.js', () => {
    // 当 editor.js 更新，自动执行此函数
    // 临时记录编辑器内容
    const value = hotEditor.innerHTML
    // 移除更新前的元素
    document.body.removeChild(hotEditor)
    // 创建新的编辑器
    // 此时 createEditor 已经是更新过后的函数了
    hotEditor = createEditor()
    // 还原编辑器内容
    hotEditor.innerHTML = value
    // 追加到页面
    document.body.appendChild(hotEditor)
  })

  module.hot.accept('./better.png', () => {
    // 当 better.png 更新后执行
    // 重写设置 src 会触发图片元素重新加载，从而局部更新图片
    img.src = background
  })
}
```

至此，对于 editor 模块的热替换逻辑就算是全部实现了。我们可以发现，为什么 Webpack 需要我们自己处理 JS 模块的热更新了：因为不同的模块有不同的情况，不同的情况，在这里处理时肯定也是不同的。就好像，我们这里是一个文本编辑器应用，所以需要保留状态，如果不是这种类型那就不需要这样做。所以说 Webpack 没法提供一个通用的 JS 模块替换方案。

## 热更新的流程

> 热更新用到了`websoket`，因为 `Websocket` 是一种全双工协议，它最大的特点就是 **服务器可以主动向客户端推送消息，客户端也可以主动向服务器发送信息**。这是 `HTTP` 协议不具备的，热更新实际上就是服务器端的更新通知到客户端。

![HMR](https://img-blog.csdnimg.cn/2021040110352564.png)

> 本地启动了一个 `HMR Server` 服务（websocket），而且在启动 `Bundle Server` 的时候已经往我们的 `bundle.js` 中注入了 `HMR Runtime`

* 首次构建：1->2->A->B，webpack compiler 编译文件传输给 bunder Server，浏览器可以进行访问

* HMR：1->2->3->4，文件变化，然后还是 webpack compiler 进行编译，编译好了会将代码发送给 HMR Server，它就可以知道哪些资源、哪些模块发生了改变。然后 HMR server 会通知 HRM Runtime，浏览器就会进行对应的刷新。

### 1. 启动 Server (express 和 websocket)

webpack-dev-server 中的 Server.js

```js
setupApp() {
  // 使用 express 框架启动本地 server，让浏览器可以请求本地的静态资源。
  this.app = new express();
}

listen(port, hostname, fn) {
  return this.listeningApp.listen(port, hostname, (err) => {
    
    // 创建 SocketServer ，可以向浏览器端传递消息。
    this.createSocketServer();

    // ...
  });
}
```

这中间还有一个关键环节，添加 webpack-dev-middleware 中间件：

> webpack-dev-middleware 将 webpack 编译后文件会输出到内存中，webpack-dev-middleware 就在此基础上形成一个文件映射系统，每当应用程序请求一个文件，它匹配到了就把内存中缓存的对应结果以文件的格式返回给你，反之则进入到下一个中间件，因为是内存型文件系统，所以重建速度非常快，很适合于开发阶段用作静态资源服务器。

### 2. Webpack compiler 编译

Webpack compiler 的作用：**监听本地文件的变化、文件改变自动编译、编译输出**

Webpack 监听文件变换是通过 **watchpack** 实现的，主要监听的是文件修改时间。

文件改变后等待 Webpack compiler 编译完成，然后通知客户端进行更新，这个过程通过 `done` 钩子实现，即：每当监听到一次 webpack 编译结束，就会调用 sendStats 方法，会向客户端发送 `hash` 和 `ok` 事件。

```js
setupHooks() {
  const addHooks = (compiler) => {
    const { compile, invalid, done } = compiler.hooks;

    compile.tap('webpack-dev-server', invalidPlugin);
    invalid.tap('webpack-dev-server', invalidPlugin);
    done.tap('webpack-dev-server', (stats) => {
      this._sendStats(this.sockets, this.getStats(stats));
      this._stats = stats;
    });
  };

  if (this.compiler.compilers) {
    this.compiler.compilers.forEach(addHooks);
  } else {
    addHooks(this.compiler);
  }
}

_sendStats(sockets, stats, force) {
  // 发送 hash
  this.sockWrite(sockets, 'hash', stats.hash);

  if (stats.errors.length > 0) {
    this.sockWrite(sockets, 'errors', stats.errors);
  } else if (stats.warnings.length > 0) {
    this.sockWrite(sockets, 'warnings', stats.warnings);
  } else {
    // 发送 ok
    this.sockWrite(sockets, 'ok');
  }
}
```

### 3. 客户端接收更新消息

webpack-dev-server 中的 client / index.js：更新 `hash`，并且在 `ok` 的时候去进行检查更新 `reloadApp`

```js
var onSocketMessage = {
  // 更新 hash
  hash: function hash(_hash) {
    status.currentHash = _hash;
  },
  
  ok: function ok() {
    sendMessage('Ok');

    if (options.useWarningOverlay || options.useErrorOverlay) {
      overlay.clear();
    }

    if (options.initial) {
      return options.initial = false;
    }

		// 进行更新检查操作
    reloadApp(options, status);
  },
}
```

reloadApp 发出 webpackHotUpdate 消息，让 webpack 去执行更新操作。

```js
function reloadApp(
  { hotReload, hot, liveReload },
  { isUnloading, currentHash }
) {
  // ...
  if (hot) {
    log.info('App hot update...');
    //  hotEmitter 其实就是 EventEmitter 的实例
    const hotEmitter = require('webpack/hot/emitter');
    // 又利用 node.js 的 EventEmitter，发出 webpackHotUpdate 消息。
    // websocket 仅仅用于客户端（浏览器）和服务端进行通信。而真正做事情的活还是交回给了 webpack。
    hotEmitter.emit('webpackHotUpdate', currentHash);
    if (typeof self !== 'undefined' && self.window) {
      // broadcast update to window
      self.postMessage(`webpackHotUpdate${currentHash}`, '*');
    }
  }
  // ...
}
```

在 `webpack` 的 `hot/dev-server.js` 中，监听 `webpackHotUpdate` 事件，并执行 `check` 方法。并在 `check` 方法中调用 `module.hot.check` 方法进行热更新。至于 `module.hot.check` ，实际上通过 `HotModuleReplacementPlugin` 已经注入到我们 `chunk` 中了（也就是我们上面所说的 HMR Runtime）

```js
// hot/dev-server.js
// 监听webpackHotUpdate事件
hotEmitter.on("webpackHotUpdate", function (currentHash) {
  lastHash = currentHash;
  if (!upToDate() && module.hot.status() === "idle") {
    log("info", "[HMR] Checking for updates on the server...");
    check();
  }
});

var check = function check() {
  //  moudle.hot.check 开始热更新
  module.hot
    .check(true)
    .then(function (updatedModules) {
      // ...
    })
    .catch(function (err) {
      // ...
    });
};
```

### 4. 请求 hot-update.json 和 hot-update.js

调用 `module.hot.check` 的时候，实际上就是执行 `hotCheck` 函数，通过调用`hotDownloadmainfest`方法，向server端发送ajax请求，服务端返回一个Manifest文件（即`hot-update.json`），该文件包含所有要更新模块的hash值和chunk名。

```js
function hotCheck(apply) {
		// ...
		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
      hotEnsureUpdateChunk(chunkId);
    })
}

// hot-update.json 文件，h 代表本次新生成的 Hash 值，c 表示当前要热更新的文件对应的是哪个模块
{
    "h": "0c256052432b51ed32c8",
    "c": {
        "201": true
    }
}
```

然后根据描述文件调用`hotDownloadUpdateChunk`方法通过`jsonp`请求获取到最新的模块代码

```js
function hotEnsureUpdateChunk(chunkId) {
  if (!hotAvailableFilesMap[chunkId]) {
    hotWaitingFilesMap[chunkId] = true;
  } else {
    hotRequestedFilesMap[chunkId] = true;
    hotWaitingFiles++;
    hotDownloadUpdateChunk(chunkId); // jsonp 方式
  }
}
```

* 补丁js取回后调用 `JsonpMainTemplate.runtime` 的 `webpackHotUpdate`方法，里面会调用`hotAddUpdateChunk`方法，用新的模块替换掉旧的模块。
* 调用`HotMoudleReplacement.runtime.js` 的 `hotAddUpdateChunk`方法动态更新模块代码
* 调用 `hotApply` 方法热更新

参考文章：

* [聊聊 Webpack 热更新以及原理](https://mp.weixin.qq.com/s/oXzsXIumOmg45SOOCsevQQ)
* [彻底搞懂并实现webpack热更新原理](https://segmentfault.com/a/1190000020310371)

