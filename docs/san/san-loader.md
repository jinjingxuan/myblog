# san-loader 原理

San-Loader 是基于 webpack 的工具，允许开发者书写 San 单文件的方式来进行组件开发。如最基本的一个 San 单文件 `app.san`：

```vue
<template>
  <div>Hello {{name}}!</div>
</template>

<script>
export default {
  initData() {
    return {
      name: 'San',
    };
  },
};
</script>

<style>
div {
  font-size: 40px;
}
</style>
```

San-loader 的核心作用是将单文件中的 `template`、`script`、`style` 提取出来并交给其他 loader 进行处理。

比如：

* `template`交给`html-loader`处理
* `script`交给`babel-loader`处理
* `style`交给`css-loader`和`style-loader`处理

那么 San-loader 是如何完成这一过程的呢？下面分为四个阶段来介绍：

## 第一阶段

**SanLoaderPlugin 在 webpack 正式构建之前修改原有的配置 rules。 **

首先复习一下 [compiler 钩子](https://webpack.docschina.org/api/compiler-hooks/) 和 webpack Plugin 的工作原理，：

1. 读取配置的过程中会先执行 new SanLoaderPlugin(options) 初始化一个 SanLoaderPlugin 获得其实例。

2. 初始化 compiler 对象后调用 SanLoaderPlugin.apply(compiler) 给插件实例传入 compiler 对象。

3. 插件实例在获取到 compiler 对象后，就可以通过 compiler 对象去操作 Webpack。

```js
class SanLoaderPlugin {
  static NS?: string;
  apply(compiler) {

    // 通过 compiler 获取原始配置的规则并处理
    const rawRules = compiler.options.module.rules;
    const { rules } = new RuleSet(rawRules);

    // 生成 clonedRules
    const sanRule = rules[sanRuleIndex];
    const clonedRules = rules.filter((r) => r !== sanRule).map(cloneRule);

    // 通过 compiler 对象更改 rules
    compiler.options.module.rules = [...clonedRules, ...rules];
  }
}
```

SanLoaderPlugin 主要做了以下几件事：

1. 通过 compiler 获取原始配置的规则并进行处理

2. 通过 `rules` 来生成 `cloneRules`

3. 通过 compiler 对象修改了原有的规则，在 `rules` 前面加上了 `cloneRules`（注意这里的顺序后面会讲到）

假如这是项目中已经配置好的规则：

```js
[
  {
    test: /\.san$/,
    use: ['san-loader-next']
  },
  {
    test: /\.js$/i,
    loader: 'babel-loader'
  },
  {
    test: /\.css$/,
    use: ['style-loader', 'css-loader']
  },
  {
    test: /\.html$/i,
    use: ['html-loader']
  }
]
```

那么这就是处理后的规则：

```js
[
  {use: ['babel-loader'], resource: ƒ, resourceQuery: ƒ}
  {use: ['style-loader', 'css-loader'], resource: ƒ,  resourceQuery: ƒ}
  {use: ['html-loader'], resource: ƒ,  resourceQuery: ƒ}

  {use: ['san-loader-next'], resource: ƒ}
  {use: ['babel-loader'], resource: ƒ}
  {use: ['style-loader', 'css-loader'], resource: ƒ}
  {use: ['html-loader'], resource: ƒ}
]
```

其中后四条是原来的规则，只是在`new RuleSet`阶段把 `test` 字段规范成了 `resource` 字段：

```js
{
    use: ['babel-loader'],
    test: /\.js$/
}

// 等价于
{
    use: ['babel-loader'],
    resource: {
      test: /\.js$/
    }
}
```

前三条是新增的`cloneRules`，那么为什么要添加这些规则呢？其实是因为我们的目的是让 san 单文件中的语言块也能被对应规则所识别然后交给对应的 loader 处理，比如 `script` 代码块需要被 `babel-loader` 来处理。所以需要把除了 .san 之外其他的规则复制一遍添加一些属性方法，让它们能够识别 san 文件中的代码块。

这里需要注意另一个用来**匹配资源查询**（从问号开始）的字段： [resourceQuery](https://webpack.docschina.org/configuration/module/#ruleresourcequery)

```js
rules: [
  {
    test: /\.css$/,
    resourceQuery: /inline/,
    use: 'url-loader',
  },
],
  
// 可以匹配
import Foo from './foo.css?inline'
```

resource 和 resourceQuery 具体定义在 cloneRule 方法中：

```js
function cloneRule(rule) {
  const { resource, resourceQuery } = rule;
  let currentResource;
  const res = Object.assign({}, rule, {
    resource: {
      test: (resource) => {
        currentResource = resource;
        return true;
      },
    },
    resourceQuery: (query) => {
      // 首先，经过san-loader拆分之后的style、template、script会变成：
      // xxx.san?san=&lang=js&type=script
      // lang=js/css/less/html...，来自element的lang attribute
      const parsed = qs.parse(query.slice(1));
      // 跳过不是san=的，即不是san-loader拆分的文件
      if (parsed.san == null) {
        return false;
      }
      // 跳过san-loader拆分后，没有lang的，lang=js/css/less/html...
      if (resource && parsed.lang == null) {
        return false;
      }
      // 得到一个假的uri，用于判断之前的rule是否匹配
      // /src/App.san.js
      // /src/App.san.html
      // /src/App.san.css
      const fakeResourcePath = `${currentResource}.${parsed.lang}`;

      // 复制之前的loader rule，规则匹配不上的，例如babel的test/\.js$/，如果匹配不上，则跳过
      // js文件，则xxx.js，resource(xxx.js) => true => false，则继续
      if (resource && !resource(fakeResourcePath)) {
        return false;
      }
      // 同上，匹配的是babel写了resourceQuery的情况
      if (resourceQuery && !resourceQuery(query)) {
        return false;
      }
      if (parsed.type === 'style' && parsed.module !== undefined) {
        const conf = findMatchedLoader(
          'css-loader',
          rule,
          currentResource,
          resourceQuery
        );
        // style 会经过很多规则，检查 css-loader 的那一个
        if (conf && (!conf.options || !conf.options.modules)) {
          throw new Error(
            `css-loader#module not set, required by ${currentResource}${query}`
          );
        }
      }
      // 经过过滤，则这个babel的rule，必须是query: san=&lang=js 才会过
      // 同时跟babel的rule必须resource/resourceQuery是匹配上的
      // 这样可以避免给san-loader处理后的文件单独配置后续loader
      // 实现共享项目的loader rule
      return true;
    },
  });

  if (rule.rules) {
    res.rules = rule.rules.map(cloneRule);
  }

  if (rule.oneOf) {
    res.oneOf = rule.oneOf.map(cloneRule);
  }

  return res;
}
```

比如原本的`.js`规则可以识别 `.js` 结尾的文件，clone 后的规则加上了 resourcequery 就会识别 `*.san?san&type=script&lang=js` 这样的语句

```js
// 原有
{ test: /\.js$/i, loader: 'babel-loader'}

// clone 后
{use: ['babel-loader'], resource: ƒ, resourceQuery: ƒ}
```

到这里，webpack 正式构建之前的准备工作就做好了，我们通过插件修改了规则的配置。

## 第二阶段

**san-loader 第一次处理 San 单文件。**

webpack 从入口文件出发，当遇到 `app.san` 文件时，会匹配到规则中的：

```js
{
  test: /\.san$/,
  use: ['san-loader-next']
}
```

到这里我们第一次调用 `san-loader` 来处理 san 单文件，具体的处理流程为：

源码地址：https://github.com/wanwu/san-loader/blob/next/src/loader.ts#L62

```js
const shortFilePath = path
  .relative(sourceRoot, filename)
  .replace(/^(\.\.[\/\\])+/, '')
  .replace(/\\/g, '/');
const scopeId = hash(shortFilePath);

// 解析 SFC
const descriptor = parseSFC({
  source,
  filename,
  sourceRoot,
  needMap: true,
});

setDescriptor(filename, descriptor);

// 生成入口文件
const templateImport = generateTemplateImport(descriptor, scopeId, options);
const stylesImport = generateStyleImport(descriptor, scopeId, options);
const scriptImport = generateScriptImport(descriptor, scopeId, options);

// normalize.js 的绝对路径
const normalizePath = stringifyRequest(
  this,
  require.resolve('./normalize.js')
);

const importStr = `import normalize from ${normalizePath};`
const exportStr = 'export default normalize(script, template, $style);'

const output = [
  importStr,
  scriptImport,
  templateImport,
  stylesImport,
  exportStr,
  '/* san-hmr component */',
];

this.callback(null, output.join('\n'));
```

这里主要做了三件事：

1. 调用 [san-sfc-compiler](https://github.com/wanwu/san-sfc-compiler) 库的 parseSFC 方法来解析文件内容

2. 生成 import 语句
3. 使用 [this.callback](https://webpack.docschina.org/api/loaders#examples) 返回结果给 webpack

处理后的结果如下：

```js
import normalize from "../../../dist/normalize.js";
import script from "/src/App.san?san&type=script&id=472cf1bd&lang=js";
export * from "/src/App.san?san&type=script&id=472cf1bd&lang=js";
import template from "src/App.san?san&type=template&id=472cf1bd&lang=html";

var $style = [];
import "/src/App.san?san&type=style&index=0&id=472cf1bd&lang=css";$style = [];

export default normalize(script, template, $style);
/* san-hmr component */
```

到这里 san-loader 的第一次处理就结束了，下面我们来介绍为什么要生成这么多 `import` 语句以及路径中的`?san&type=script&id=472cf1bd&lang=js`  的作用是什么？

## 第三阶段

**`import` 语句匹配规则**

当第二阶段的结果返回给 webpack 时，webpack 会**遍历当前模块的依赖**，即每一条 `import` 语句，对于每一条import 语句再遍历 rules 进行规则匹配。

比如当遇到 `import script from "/src/App.san?san&type=script&id=472cf1bd&lang=js";` 这条语句时，在webpack 中的处理如下：

```js
/**
  data: 语句信息
    resource: "/src/App.san"
    resourceQuery: "?san&type=template&id=472cf1bd&lang=html"

  rule：遍历到的规则

  result：存储 loader
*/

_run(data, rule, result) {
  // test conditions
  if (rule.resource && !data.resource) return false;
  if (rule.resourceQuery && !data.resourceQuery) return false;
  if (rule.resource && !rule.resource(data.resource)) return false;
  if (
    data.resourceQuery &&
    rule.resourceQuery &&
    !rule.resourceQuery(data.resourceQuery)
  ) {
    return false;
  }

  // 将 loader 添加到 result 中
  if (rule.use) {
    const process = use => {
      if (typeof use === "function") {
        process(use(data));
      } else if (Array.isArray(use)) {
        use.forEach(process);
      } else {
        result.push({
          type: "use",
          value: use,
          enforce: rule.enforce
        });
      }
    };
    process(rule.use);
  }

  if (rule.rules) {
    for (let i = 0; i < rule.rules.length; i++) {
      this._run(data, rule.rules[i], result);
    }
  }

  return true;
}
```

按照规则的先后顺序：

* `?san&type=script&id=472cf1bd&lang=js` 会被 cloneRules 识别，对应的 loader 是 `babel-loader`
* `/src/App.san` 会被 `/\.san$/`规则识别，对应的 loader 是 `san-loader-next`

result 逐个 push 进去后的结果为 `['babel-loader', 'san-loader-next']`

## 第四阶段

**提取代码块交给对应 loader 处理**

按照 loader 从后向前的顺序，首先会经过 `san-loader` 处理，然后再交给 `babel-loader`，这里也就是第二次进入`san-loader`，即根据 `query.type` 来提取对应的代码块：

```js
const userOptions = getOptions(this);
const options: Options = { ...defaultOptions, ...userOptions };

const filename = this.resourcePath;
const sourceRoot = this.context || process.cwd();
const rawQuery = this.resourceQuery.slice(1);
const query = qs.parse(rawQuery);

if (query && 'san' in query) {
  const descriptor = getDescriptor(filename);
  let result = { code: '', map: {} };

  if (query.type === 'template') {
    const hasScoped = descriptor!.styles.some((s) => s.scoped);
    result = transformTemplate(
      descriptor?.template!,
      rawQuery,
      filename,
      options,
      query,
      hasScoped
    );
  } else if (query.type === 'style') {
      result = transformStyle(
        descriptor?.styles!,
        rawQuery,
        filename,
        options,
        query
      );
  } else {
     result = {
       code: descriptor?.script!.content!,
       map: descriptor?.script?.map,
     };
  }
  if (this.sourceMap) {
     this.callback(null, result.code, result.map);
  } else {
     this.callback(null, result.code);
  }
}
```

提取后的结果：

```js
// rawQuery 为 san&type=script&id=472cf1bd&lang=js
{code: "\n\n\n\n\nexport default {\n  initData() {\n    return {\n      name: 'San',\n    };\n  },\n};\n", map: {…}}

// rawQuery 为 san&type=template&id=472cf1bd&lang=html
{code: '\n  <div>Hello {{name}}!</div>\n', map: {…}}

// rawQuery 为 san&type=style&index=0&id=472cf1bd&lang=css
{code: '\ndiv {\n  font-size: 40px;\n}\n', map: null}
```

最后将提取后的代码块交给其他 loader 进行处理，到这里 san-loader 整体的工作流程就结束了。