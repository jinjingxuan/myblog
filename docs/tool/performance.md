# Performance

Performance API 是 Web 平台提供的一组 JavaScript 接口，用于精确测量和分析网页或应用的性能指标（如加载时间、渲染耗时、资源加载效率等）。它通过 `window.performance` 对象暴露，开发者可以利用这些数据优化用户体验、定位性能瓶颈，并监控应用运行状态。以下是其核心功能、关键接口及使用场景的详细介绍：

## **一、核心功能**

Performance API 主要解决以下问题：

1. **精确计时**：提供高精度时间戳（毫秒级，部分浏览器支持微秒级），避免 `Date.now()` 的精度限制。
2. **性能指标采集**：记录页面生命周期各阶段（如导航、渲染、资源加载）的耗时。
3. **资源监控**：跟踪图片、脚本、样式等资源的加载时间和状态。
4. **用户行为分析**：测量交互事件（如点击、滚动）的响应延迟。
5. **长期性能监控**：结合 `PerformanceObserver` 实现实时数据收集和上报。

## **二、关键接口与使用方法**

### 1. **Performance Timing（性能时间线）**

#### **（1）Navigation Timing API**

记录页面导航（从用户发起请求到页面完全加载）的各个阶段耗时，通过 `performance.timing` 或 `performance.getEntriesByType('navigation')[0]` 获取。

**示例字段**：

```javascript
const timing = performance.getEntriesByType('navigation')[0];
console.log({
  // 用户发起请求的时间戳（相对于页面加载起点）
  navigationStart: timing.navigationStart,
  // DNS查询耗时
  domainLookupEnd - timing.domainLookupStart,
  // TCP连接耗时
  connectEnd - timing.connectStart,
  // 请求到响应开始（TTFB）
  responseStart - timing.requestStart,
  // 响应数据接收耗时
  responseEnd - timing.responseStart,
  // DOM解析耗时
  domComplete - timing.domInteractive,
  // 页面完全加载耗时
  loadEventEnd - timing.navigationStart,
});
```

**可视化工具**：
Chrome DevTools 的 **Performance** 面板会自动解析这些数据，生成瀑布图（Waterfall Chart）。

#### **（2）Paint Timing API**

记录页面首次渲染（First Paint, FP）和首次内容渲染（First Contentful Paint, FCP）的时间点。

```javascript
const paintEntries = performance.getEntriesByType('paint');
console.log({
  'First Paint': paintEntries.find(e => e.name === 'first-paint')?.startTime,
  'First Contentful Paint': paintEntries.find(e => e.name === 'first-contentful-paint')?.startTime,
});
```

### 2. **Resource Timing API**

监控所有资源（脚本、样式、图片、XHR/Fetch请求等）的加载性能，通过 `performance.getEntriesByType('resource')` 获取。

**示例字段**：

```javascript
const resources = performance.getEntriesByType('resource');
resources.forEach(resource => {
  console.log({
    name: resource.name, // 资源URL
    duration: resource.duration, // 总耗时
    initiatorType: resource.initiatorType, // 资源类型（script/img/css等）
    transferSize: resource.transferSize, // 传输大小（含头部）
    encodedBodySize: resource.encodedBodySize, // 压缩后大小
  });
});
```

**应用场景**：

- 识别慢加载资源（如大图片、未压缩的JS文件）。
- 分析第三方脚本（如广告、分析工具）对性能的影响。

### 3. **User Timing API**

标记自定义代码段的执行时间，用于测量关键业务逻辑的耗时。

**示例**：

```javascript
// 标记开始
performance.mark('API_Request_Start');
 
// 模拟异步请求
setTimeout(() => {
  performance.mark('API_Request_End');
 
  // 计算区间耗时
  const measure = performance.measure('API_Request_Duration', 'API_Request_Start', 'API_Request_End');
  console.log(measure.duration); // 耗时（毫秒）
}, 1000);
```

**优势**：
比手动记录 `Date.now()` 更精确，且可与浏览器性能工具集成。

### 4. **Performance Observer API**

实时监听性能事件（如资源加载、长任务等），避免轮询查询性能数据。

**示例**：

```javascript
const observer = new PerformanceObserver((list) => {
  const entries = list.getEntries();
  entries.forEach(entry => {
    if (entry.entryType === 'longtask') {
      console.warn('Long task detected:', entry.duration); // 检测长任务（>50ms）
    }
  });
});
 
// 监听长任务和资源加载
observer.observe({ entryTypes: ['longtask', 'resource'] });
```

**常见监听类型**：

- `paint`：首次渲染事件。
- `resource`：资源加载事件。
- `longtask`：主线程被阻塞超过50ms的任务（可能导致卡顿）。
- `navigation`：页面导航事件。

### 5. **High Resolution Time API**

提供高精度时间戳（`performance.now()`），相对于页面加载起点（`performance.timeOrigin`），精度可达微秒级（受浏览器限制）。

**对比 `Date.now()`**：

```javascript
console.log(Date.now()); // 系统时间，可能被调整（如用户修改时钟）
console.log(performance.now()); // 相对于页面加载的稳定时间，不受系统时间影响
```

**应用场景**：
精确测量代码执行时间（如动画帧间隔、游戏逻辑耗时）。

## **三、核心性能指标（Web Vitals）**

Google 提出的 Web Vitals 是一组关键性能指标，可通过 Performance API 计算：

1. LCP（Largest Contentful Paint）

   ：最大内容元素渲染时间（衡量页面主要内容加载速度）。

   ```javascript
   const lcp = performance.getEntriesByType('largest-contentful-paint')[0];
   console.log('LCP:', lcp.startTime);
   ```

2. **FID（First Input Delay）**：首次输入延迟（衡量交互响应速度）。
   *需通过 `Event Timing API` 或真实用户监控（RUM）获取。*

3. **CLS（Cumulative Layout Shift）**：累计布局偏移（衡量页面稳定性）。
   *需通过 `Layout Instability API` 计算。*

4. **TTI（Time to Interactive）**：可交互时间（衡量页面完全可用的时间）。
   *需结合长任务和资源加载状态计算。*

## **四、实际应用案例**

### 1. **性能监控与上报**

```javascript
function reportPerformance() {
  const data = {
    navigation: performance.getEntriesByType('navigation')[0],
    resources: performance.getEntriesByType('resource').map(r => ({
      url: r.name,
      duration: r.duration,
    })),
    timings: {
      FCP: performance.getEntriesByName('first-contentful-paint')[0]?.startTime,
      LCP: performance.getEntriesByType('largest-contentful-paint')[0]?.startTime,
    },
  };
 
  // 上报到分析平台（如Google Analytics、Sentry）
  navigator.sendBeacon('/api/performance', JSON.stringify(data));
}
 
// 在页面卸载时触发上报
window.addEventListener('beforeunload', reportPerformance);
```

### 2. **优化资源加载策略**

```javascript
// 识别慢加载资源并优化
const slowResources = performance.getEntriesByType('resource')
  .filter(r => r.duration > 1000) // 过滤耗时>1s的资源
  .map(r => r.name);
 
console.warn('Slow resources:', slowResources);
// 解决方案：预加载、CDN加速、代码分割
```

### 3. **检测卡顿（长任务）**

```javascript
const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach(entry => {
    if (entry.duration > 50) {
      console.error('Long task detected:', entry);
      // 解决方案：拆分任务、使用Web Worker
    }
  });
});
observer.observe({ entryTypes: ['longtask'] });
```

## **五、浏览器兼容性**

- **主流支持**：现代浏览器（Chrome、Firefox、Edge、Safari）均支持 Performance API 的核心功能。

- 部分差异

  - `performance.getEntriesByType('largest-contentful-paint')` 在旧版浏览器中可能缺失。
  - `PerformanceObserver` 的 `entryTypes` 支持程度不同（如 `longtask` 在部分移动端浏览器中不可用）。

- **降级方案**：使用 polyfill（如 `web-vitals` 库）或特征检测。

## **六、总结**

| **API 分类**      | **核心接口**                               | **典型应用场景**             |
| ----------------- | ------------------------------------------ | ---------------------------- |
| **Timing API**    | `performance.timing`                       | 分析页面加载生命周期         |
| **Resource API**  | `performance.getEntriesByType('resource')` | 监控资源加载性能             |
| **User Timing**   | `performance.mark()` / `measure()`         | 测量自定义代码段耗时         |
| **Observer API**  | `PerformanceObserver`                      | 实时监听性能事件（如长任务） |
| **High Res Time** | `performance.now()`                        | 高精度计时（动画、游戏）     |

Performance API 是前端性能优化的“瑞士军刀”，结合 Chrome DevTools 和自动化监控工具（如 Lighthouse、Sentry），可构建完整的性能分析体系。对于微前端、SPA 等复杂应用，它能帮助开发者精准定位子应用加载、路由切换等场景的性能问题。