---
title: React Hooks
date: 2021-06-21 11:27:54
categories: React
---

# React Hooks

## 函数组件与类组件的区别

### 函数式组件

* 函数式编程思想

- 不需要声明 `class`，不需要使用 `this`，没有生命周期方法，没有实例化。代码简洁，具有更佳的性能。
- 可以写成无副作用的纯函数。

- 没有 `shouldComponentUpdate`，不能避免重复渲染。

### 类组件

* 面向对象编程思想
* 包含生命周期，state，this，功能更加完善，但是不能保证 this 指向正确性
* 代码较为繁琐复杂，例如生命周期函数中存在多个不相干的业务逻辑

## 什么是 React Hooks

[React Hooks 解析](https://segmentfault.com/a/1190000018928587)

> **React Hooks就是加强版的函数式组件，让函数型组件可以存储状态，可以拥有处理副作用的能力。让开发者不使用类组件的情况下实现相同的功能**
>
> 副作用：不是用来转换视图的代码，例如 ajax 请求，获取 dom，我们一般在生命周期中处理这些代码。

Hooks 意为钩子，React Hooks 就是一堆钩子函数，React 通过这些钩子函数对函数型组件进行增强，不同的钩子函数提供不同的功能。

* useState
* useEffects
* useReducer
* useRef
* useCallback
* useContext
* useMemo

### useState：用于为函数组件引入状态

> 为什么需要 useState？因为一般函数内部的变量在使用完就会被释放掉，useState 内部使用闭包来实现保存状态数据，用于为函数组件引入状态

* 接收唯一的参数即状态初始值，可以为任意数据类型
* 返回值为数组，存储状态值和更改状态的方法，方法名约定为 set 开头
* 方法可以被调用多次用以保存不同的状态值
* **参数可以是一个函数，函数返回值就是初始状态。函数只会被调用一次，用于初始值为动态值的情况**

```react
import React, { useState } from 'react';

function Example(props) {
  const [foo, setFoo] = useState(() => {
    // 获取初始值 foo 这一段代码只需在组件初始化时执行一次，可以写在函数里
    return props.foo || 'xx'
  });
  const [count, setCount] = useState(0);
  const [person, setPerson] = useState({name: '张三', age: 20});

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
			// 注意解构这种写法 {name: '张三', age: 20, name:''李四} name 会取最后一项
			<button onClick={() => setPerson({...person, name:'李四'})}>setPerson</button>
    </div>
  );
}
```

> 在点击按钮后 count + 1，组件状态改变，为了在页面上展示组件会重新渲染，此时状态数据会被保留，useState 的作用就体现了出来。

* 设置状态值方法的参数可以是一个值也可以是一个函数
* 设置状态值方法的方法本身是异步的

```react
import React, { useState } from 'react';

function Example(props) {
  const [count, setCount] = useState(0);
	
  function handleCount() {
    setCount(count => count + 1);
    document.title = count; // setCount异步,所以会先执行这句,解决办法是放在setCount方法里
  }
  
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={handleCount}>+1</button>
    </div>
  );
}
```

### useEffect

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

