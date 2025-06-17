# React 版本

* React 16 - Fiber 架构
* React 17 - 过渡版本：事件委托、jsx转换器、副作用清理
* React 18 - 并发模式：并发渲染、transition api、流式服务端渲染
* React 19 - 开发体验革命：Actions api、use、自动记忆化、预加载 api

## **1. React 16（2017）**：**Fiber 架构革命**

| **突破点**      | **解决的问题**                 | **技术实现**                         |
| :-------------- | :----------------------------- | :----------------------------------- |
| **异步渲染**    | 大型应用渲染卡顿（主线程阻塞） | Fiber 节点拆分任务为可中断单元       |
| **增量渲染**    | 长时间任务导致掉帧             | 浏览器空闲时段分片渲染组件           |
| **错误边界**    | 组件崩溃导致整个应用崩溃       | `componentDidCatch()` 捕获子组件错误 |
| **Portal 支持** | 渲染到 DOM 树外节点            | `ReactDOM.createPortal()`            |
| **新生命周期**  | 废弃不安全生命周期             | 新增 `getDerivedStateFromProps()`    |

## **2. React 17（2020）**：**平稳过渡版本**

| **核心改进**       | **影响**                                               |
| :----------------- | :----------------------------------------------------- |
| **事件委托重构**   | 事件绑定到根容器而非 `document`，解决多版本共存冲突    |
| **渐进升级支持**   | 允许应用内混合使用 v17 和旧版本组件                    |
| **JSX 转换器独立** | 编译器自动引入 `jsx-runtime`，减少 `import React` 冗余 |
| **副作用清理时机** | `useEffect` 清理函数异步执行，避免阻塞屏幕更新         |

> ⚠️ **无新特性**：专注为 React 18 铺路，被开发者称为“隐形桥梁版本”

### JSX 转换器

在v16中，我们写一个React组件，总要引入

```jsx
import React from 'react'
```

这是因为在浏览器中无法直接使用 jsx，所以要借助工具如`@babel/preset-react`将 jsx 语法转换为 `React.createElement` 的 js 代码，所以需要显式引入 React，才能正常调用 createElement。

通过`React.createElement()` 创建元素是比较频繁的操作，本身也存在一些问题，无法做到性能优化，具体可见官方优化的 [动机](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Freactjs%2Frfcs%2Fblob%2Fcreatelement-rfc%2Ftext%2F0000-create-element-changes.md%23motivation)

v17之后，React 与 Babel 官方进行合作，直接通过将 `react/jsx-runtime` 对 jsx 语法进行了新的转换而不依赖 `React.createElement`，因此v17使用 jsx 语法可以不引入 React，应用程序依然能正常运行。

### 副作用清理

- v17前，组件被卸载时，`useEffect`的清理函数都是同步运行的；对于大型应用程序来说，同步会减缓屏幕的过渡（如切换标签）
- v17后，`useEffect` 副作用清理函数是**异步执行**的，如果要卸载组件，则清理会在屏幕更新后运行

## **React 18（2022）**：**并发模式时代**

| **特性**                   | **功能**                        | **代码示例**                                           |
| :------------------------- | :------------------------------ | :----------------------------------------------------- |
| **并发渲染（Concurrent）** | 可中断渲染优先响应用户交互      | `<React.StrictMode>` 中启用                            |
| **自动批处理**             | 合并多状态更新减少渲染次数      | 异步操作中自动生效                                     |
| **Transition API**         | 区分紧急/非紧急更新             | `const [isPending, startTransition] = useTransition()` |
| **Suspense SSR**           | 流式服务端渲染 + 选择性 hydrate | `<Suspense fallback={<Spinner/>}>`                     |
| **新 Root API**            | 取代 `ReactDOM.render()`        | `ReactDOM.createRoot().render(<App />)`                |

## 并发渲染

React 中 每次 setState 都会进行 render 渲染流程。有个场景，比如用户在 input 输入内容的时候，会通过 setState 设置到状态里，会触发重新渲染。这时候如果还有一个列表也会根据 input 输入的值来处理显示的数据，也会 setState 修改自己的状态。这两个 setState 会一起发生，那么同步模式下也就会按照顺序依次执行。

但如果这个渲染流程中处理的 fiber 节点比较多，渲染一次就比较慢，这时候用户输入的内容可能就不能及时的渲染出来，用户就会感觉卡，体验不好。怎么解决这个问题呢？

能不能指定这俩 setState 的重要程度不一样，用户输入的 setState 的更新重要程度更高，如果有这种更新就把别的先暂停，执行这次更新，执行完之后再继续处理。

```jsx
function Search() {
  const [keywords, setKeywords] = useState('');
  const [results, setResults] = useState([]);
  const [isPending, startTransition] = useTransition();

  const handleChange = (e) => {
    // 紧急：立即更新输入框
    setKeywords(e.target.value);
    
    // 非紧急：延迟处理搜索（可中断）
    startTransition(() => {
      fetchResults(e.target.value).then(setResults);
    });
  };

  return (
    <>
      <input value={keywords} onChange={handleChange} />
      {isPending ? <Spinner /> : <Results data={results} />}
    </>
  );
}
```

### Suspense 支持 SSR

SSR 一次页面渲染的流程：

1. 服务器获取页面所需数据
2. 将组件渲染成 HTML 形式作为响应返回
3. 客户端加载资源
4. （hydrate）执行 JS，并生成页面最终内容

上述流程是串行执行的，v18前的 SSR 有一个问题就是它不允许组件"等待数据"，必须收集好所有的数据，才能开始向客户端发送HTML。如果其中有一步比较慢，都会影响整体的渲染速度。

v18 中使用并发渲染特性扩展了`Suspense`的功能，使其支持流式 SSR，将 React 组件分解成更小的块，允许服务端一点一点返回页面，尽早发送 HTML和选择性的 hydrate， 从而可以使SSR更快的加载页面

```jsx
<Suspense fallback={<Spinner />}>  
  <Comments /> 
</Suspense>
```

## **React 19（2024 Beta）**：**开发体验飞跃**

| **特性**                   | **解决的问题**                | **React 18 对比**             |
| :------------------------- | :---------------------------- | :---------------------------- |
| **Actions API**            | 表单状态管理样板代码          | 手动处理 `loading/error` 状态 |
| **use() Hook**             | 直接消费 Promise/Suspense     | 需 `useEffect` + 状态管理     |
| **自动记忆化编译器**       | 手动 `useMemo` 优化负担       | 开发者需显式记忆化            |
| **原生 Document Metadata** | 动态修改 `<title>` 需第三方库 | 依赖 `react-helmet`           |
| **资源预加载 API**         | 关键资源加载优化碎片化        | 手动 `link rel=preload`       |

## Next.js 14 vs Next.js 15 核心差异

| **能力模块**      | **Next.js 14**                        | **Next.js 15 **                    |
| :---------------- | :------------------------------------ | :--------------------------------- |
| **React 基础**    | React 18.3                            | **React 19** (首个官方集成版本)    |
| **渲染引擎**      | Pages Router + App Router 共存        | **App Router 为默认模式**          |
| **数据获取**      | `getServerSideProps`/`getStaticProps` | **Actions + `use()` 主导**         |
| **元数据处理**    | `generateMetadata` 函数               | **原生 `<title>` 组件支持**        |
| **资源优化**      | `next/image`/`next/font`              | **整合 React 19 预加载 API**       |
| **中间件**        | `middleware.ts` 基于 Edge Runtime     | **支持 Node.js 运行时**            |
| **打包工具**      | Webpack (默认) / Turbopack (可选)     | **Turbopack 为默认构建引擎**       |
| **增量静态生成**  | `revalidate` 字段控制                 | **动态 ISR：按请求流量触发重建**   |
| **Monorepo 支持** | 需手动配置 Turbo 或 Nx                | **内置 Turborepo 集成**            |
| **部署适配**      | Vercel/Netlify/Node 服务器            | **新增 Serverless 函数冷启动优化** |

## Next.js

Next.js 是一个基于 **React** 的**全栈前端框架**，核心目标是简化高性能 Web 应用的开发（尤其解决 React 的 SEO 弱、首屏加载慢等问题）。它通过开箱即用的功能（如服务端渲染、路由、打包优化等）大幅提升开发效率。

------

### Next.js 核心解决的问题

**传统 React (CSR - Client-Side Rendering) 的问题：**

- **过程：** 浏览器下载一个近乎空的 HTML → 下载庞大的 JS Bundle → JS 执行 → React 渲染页面内容。
- **致命伤：**
  - **SEO 不友好：** 搜索引擎爬虫看到的是空 HTML 或加载动画，无法抓取有效内容。
  - **首屏加载慢 (FCP/LCP)：** 用户需要等待 JS 下载执行完才能看到主要内容，体验差。
  - **低端设备体验差：** JS 解析和执行在性能弱的设备上耗时更长。

**Next.js 的解决方案：** **服务端渲染 (SSR)** 与 **静态站点生成 (SSG)**

- **SSR (Server-Side Rendering) - 动态内容实时渲染：**
  - **过程：** 用户请求 → Next.js 服务器**实时执行 React 组件**，获取数据 → 生成**包含完整内容的 HTML** 发送给浏览器 → 浏览器立即展示内容 → React 再“注水”(Hydrate) 接管交互。
  - **优势：**
    - **完美 SEO：** 爬虫拿到的是包含完整数据的 HTML。
    - **瞬间首屏：** 用户第一时间看到完整内容，无需等待 JS 执行。
    - **适合：** 用户仪表盘、实时数据页面、个性化内容页（需要知道用户是谁）。
- **SSG (Static Site Generation) - 构建时预渲染：**
  - **过程：** 在 `npm run build` 时，Next.js **提前执行 React 组件**，获取数据 → 生成**纯静态 HTML/CSS/JS 文件** → 部署到 CDN。
  - **优势：**
    - **极致性能：** CDN 直接返回预渲染好的 HTML，速度最快。
    - **超高扩展性：** CDN 轻松应对高并发，成本低。
    - **安全性高：** 静态文件无服务器运行时风险。
    - **适合：** 博客、文档、营销页、电商产品列表/详情页（数据变化不频繁）。
- **ISR (Incremental Static Regeneration) - SSG 的智能升级：**
  - **过程：** 在 SSG 基础上，可以为每个页面设置一个 `revalidate` 时间（秒）。首次访问触发构建，之后在设定的时间间隔内，访问仍返回缓存的静态页面；**超过时间后的首次访问**，Next.js 在后台**异步重新生成**该页面，下次访问得到新页面，同时旧页面仍可被访问（无中断）。
  - **优势：** 兼具 SSG 的速度与接近 SSR 的**数据新鲜度**，无需全站重建。
  - **适合：** 新闻资讯、商品价格（允许短暂延迟）、用户生成内容（UGC）列表页。

**总结：Next.js 让你按需选择渲染方式，从根本上解决 SEO 和首屏性能瓶颈。**

### **2. 解决路由配置繁琐：文件即路由 (File-system based Routing)**

**传统 React 的问题：**

- 需要手动安装 `react-router-dom` 库。
- 需要编写复杂的路由配置文件 (`<Routes>`, `<Route>`, `<Link>`)，定义路径与组件的映射关系。
- 嵌套路由、动态路由、路由守卫等配置较繁琐。

**Next.js 的解决方案：**

- **约定优于配置：** 在 `pages` 目录下的文件结构**自动映射**为 URL 路由。
  - `pages/index.js` → `/`
  - `pages/about.js` → `/about`
  - `pages/blog/index.js` → `/blog`
  - `pages/blog/[slug].js` → `/blog/:slug` (e.g., `/blog/nextjs-is-awesome`)
  - `pages/user/[id]/profile.js` → `/user/:id/profile` (嵌套动态路由)
- **无需手动配置：** 创建文件即创建路由，极大简化开发流程。
- **内置 `<Link>`：** 提供高性能的客户端导航（无整页刷新）。
- **自动代码分割：** 每个页面自动生成独立的 JS Bundle，按需加载。

**总结：文件即路由是 Next.js 最直观、最高效的特性之一，显著提升开发速度和代码可维护性。**

------

### **3. 解决构建优化复杂：开箱即用的优化工具链**

**传统 React (CRA) 的问题：**

- 虽然封装了 Webpack 配置，但深度定制（如修改 Loader、Plugin、分包策略）需要 `eject`（不可逆）或使用 `react-app-rewired` 等第三方工具，门槛高。
- 性能优化（如代码分割、懒加载、图片优化）需要开发者手动配置或集成额外库。

**Next.js 的解决方案：**

- **零配置优化：**
  - **自动代码分割：** 基于页面和动态 `import()`。
  - **SWC 编译器：** 替代 Babel + Terser，编译速度**快 17 倍以上**，支持 Rust 插件。
  - **Image 组件 (`next/image`):** **自动优化图片**（格式转换 - WebP/AVIF、尺寸调整、懒加载），大幅提升 LCP 指标和节省带宽。
  - **Font 组件 (`next/font`):** 自动托管和优化字体文件，消除布局偏移 (CLS)，提高隐私性（无 Google Fonts 请求）。
  - **Script 组件 (`next/script`):** 优化第三方脚本加载策略（如 `afterInteractive`, `lazyOnLoad`）。
- **可扩展配置 (`next.config.js`):** 提供简单 API 覆盖默认 Webpack 配置、配置环境变量、反向代理等，无需 `eject`。

**总结：Next.js 内置了生产环境所需的几乎所有性能优化手段，开发者可以专注于业务逻辑。**

------

### **4. 解决前后端分离的割裂感：API Routes (全栈能力)**

**传统 React 的问题：**

- 前端项目需要单独部署。
- 需要另外搭建和维护一个后端服务（Node.js/Express, Python/Django, Go 等）来提供 API。
- 开发环境配置 CORS、代理等解决跨域问题。
- 增加了项目复杂度和协作成本。

**Next.js 的解决方案：** **API Routes**

- **概念：** 在 `pages/api` 目录下创建 `.js`/`.ts` 文件，该文件默认导出一个函数（请求处理程序），它就是一个 **API 端点**。
  - `pages/api/hello.js` → 对应 `/api/hello` 接口。
- **优势：**
  - **前后端同项目：** API 和前端页面在同一个 Next.js 项目中编写、构建和部署。
  - **无 CORS 问题：** 同源请求，前端调用 `/api/xxx` 就像调用本地函数一样简单。
  - **使用熟悉的 Node.js 环境：** 可以直接访问文件系统、数据库（ORM）、环境变量等。
  - **简化部署：** Vercel/Netlify/Node 服务器等一键部署整个应用（前端 + API）。
- **适合场景：** 处理表单提交、Webhook 接收器、轻量级数据库 CRUD、身份验证端点、代理第三方 API（隐藏密钥）等。**不适合：** 计算密集型任务、需要长连接（WebSocket）的场景。

**总结：API Routes 让 Next.js 具备了全栈能力，极大简化了需要简单后端逻辑的应用开发。**

------

### **核心价值再提炼**

| 问题领域        | 传统 React 痛点          | Next.js 核心解决方案                    | 带来的核心价值           |
| :-------------- | :----------------------- | :-------------------------------------- | :----------------------- |
| **渲染 & 性能** | SEO 差、首屏慢           | SSR / SSG / ISR                         | 极致性能、SEO 友好       |
| **开发体验**    | 路由配置繁琐             | 文件即路由 (`pages/`)                   | 开发高效、结构清晰       |
| **构建 & 优化** | 配置复杂、优化需手动     | 开箱即用优化 (SWC, Image, Font, Script) | 高性能、最佳实践内置     |
| **应用架构**    | 前后端分离、部署运维复杂 | API Routes (`pages/api/`)               | 全栈一体化、简化部署运维 |

**一句话理解 Next.js：它是对 React 的“生产环境强化”，通过约定优于配置、开箱即用的服务端渲染/静态生成、一体化路由和 API 方案，让开发者能高效构建高性能、SEO 友好、体验卓越的现代化 Web 应用。