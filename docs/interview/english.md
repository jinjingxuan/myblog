# 英语学习

## 单词

| mission     | plug in     | threshold | ripple effect | benchmarks   | delimited  |
| ----------- | ----------- | --------- | ------------- | ------------ | ---------- |
| iteration   | conflated   | hazards   | handy         | capable      | clumsy     |
| somewhat    | reach for   | underused | literal       | mechanism    | collision  |
| ergonomic   | intuitively | nuances   | constitute    | introduce    | infamously |
| retrieve    | dedicated   | awkward   | clunk         | Nevertheless | melt       |
| come across | recursive   |           |               |              |            |

## 长句

* This is done on a best-effort basis as some compile-to-JavaScript languages may provide more accurate source maps than others. 
* resource-intensive 
* Jest will use them to try and map code coverage against the original source code when writing reports and checking thresholds.
* [jest transform](https://jestjs.io/zh-Hans/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object): A map from **regular expressions** to paths to transformers. Optionally, a **tuple** with configuration options can be passed as second argument: `{filePattern: ['path-to-transformer', {options}]}`. For example, here is how you can configure babel-jest for non-default behavior: `{'\\.js$': ['babel-jest', {rootMode: 'upward'}]}`.
* Jest runs the code of your project as JavaScript, hence a transformer is needed if you use some syntax not supported by Node **out of the box** (such as JSX, TypeScript, Vue templates). By default, Jest will use [`babel-jest`](https://github.com/facebook/jest/tree/main/packages/babel-jest#setup) transformer, which will load your project's Babel configuration and transform any file matching the `/\.[jt]sx?$/` RegExp (in other words, any `.js`, `.jsx`, `.ts` or `.tsx` file). In addition, `babel-jest` will inject the Babel plugin necessary for mock hoisting talked about in [ES Module mocking](https://jestjs.io/docs/manual-mocks#using-with-es-module-imports).
* Remember to include the default `babel-jest` transformer explicitly, if you wish to use it **alongside with** additional code preprocessors

## 文章

* [When You Should Prefer Map Over Object In JavaScript](https://www.zhenghao.io/posts/object-vs-map)
