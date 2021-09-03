---
title: React基础（二）
date: 2021-06-21 11:27:54
categories: React
---

### 1.函数组件与类组件的区别

#### 1.1  函数式组件

* 函数式编程思想

- 不需要声明 `class`，不需要使用 `this`，没有生命周期方法，没有实例化。代码简洁，具有更佳的性能。
- 可以写成无副作用的纯函数。

- 没有 `shouldComponentUpdate`，不能避免重复渲染。

#### 1.2  类组件

* 面向对象编程思想
* 包含生命周期，state，this，功能更加完善
* 代码较为繁琐复杂

### 3. 什么是 React Hooks

[React Hooks 解析](https://segmentfault.com/a/1190000018928587)

> **React Hooks就是加强版的函数式组件，我们可以完全不使用 `class`，就能写出一个全功能的组件**

#### 3.1 useState

```js
import React, { useState } from 'react';

function Example() {
  // 定义一个 State 变量，变量值可以通过 setCount 来改变，useState入参为初始值
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

#### 3.2 useEffect

```js
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  componentDidMount() {
    document.title = `You clicked ${this.state.count} times`;
  }

  componentDidUpdate() {
    document.title = `You clicked ${this.state.count} times`;
  }
  
  componentWillUnmount() {
    // 卸载前进行 clear()
  }

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click me
        </button>
      </div>
    );
  }
}
```

`componentDidMount`和`componentDidUpdate`中的代码是一样的。可以使用 Effect Hook 来改写。当`useEffect`的返回值是一个函数的时候，React 会在下一次执行这个副作用之前执行一遍清理工作.

```js
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
    return function clear() {
      // clear
    }
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

> `useEffect`会在每次 DOM 渲染后执行，不会阻塞页面渲染。它同时具备`componentDidMount`、`componentDidUpdate`和`componentWillUnmount`三个生命周期函数的执行时机。
>
> 组件挂载 --> 执行副作用 --> 组件更新 --> 执行清理函数 --> 执行副作用 --> 组件更新 --> 执行清理函数 --> 组件卸载

有的情况下我们希望只有在 state 或 props 改变的情况下才执行。如果是`Class Component`，我们会这么做：

```js
componentDidUpdate(prevProps, prevState) {
  if (prevState.count !== this.state.count) {
    document.title = `You clicked ${this.state.count} times`;
  }
}
```

使用 Hook 的时候，我们只需要传入第二个参数：

```js
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]); // 只有在 count 改变的时候才执行 Effect

// 第二个参数是一个数组，可以传多个值，一般会将 Effect 用到的所有 props 和 state 都传进去。
```

