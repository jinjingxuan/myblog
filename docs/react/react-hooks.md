---
title: React Hooks
date: 2021-06-21 11:27:54
categories: React
---

# React Hooks

React 框架在 v16.8 版本引入了全新的 API，叫做 [React Hooks](https://reactjs.org/docs/hooks-reference.html)，颠覆了以前的用法。**React Hooks 的意思是，组件尽量写成纯函数，如果需要外部功能和副作用，就用钩子把外部代码"钩"进来。**

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
* useContext
* useMemo
* useCallback
* useRef

### useState

> 为什么需要 useState？因为一般函数内部的变量在使用完就会被释放掉，useState 内部使用闭包来实现保存状态数据，用于为函数组件引入状态

* 接收唯一的参数即状态初始值，可以为任意数据类型
* 返回值为数组，存储状态值和更改状态的方法，方法名约定为 set 开头
* 方法可以被调用多次用以保存不同的状态值
* **参数可以是一个函数，函数返回值就是初始状态。函数只会被调用一次，用于初始值为动态值的情况**

```js
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

```js
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

> 类组件在生命周期中处理副作用，函数型组件使用 useEffect 来处理
>
> 可以把 useEffect 看做 componentDidMount，componentDidUpdate，componentWillUnmount 的组合
>
> 解决的问题：相干业务逻辑归置到同一副作用函数中，简化重复代码，使组件内部代码更加清晰

#### 执行时机

`useEffect` **必然会在 render 的时候执行一次**，其他的运行时机取决于以下情况：

- 有没有第二个参数。`useEffect` hook 接受两个参数，第一个是要执行的代码，第二个是一个数组，指定一组依赖的变量，其中的变量发生变化时，此 effect 会重新执行一次。
- 有没有返回值。 `useEffect` 的执行代码中可以返回一个函数，在每一次新的 render 进行前或者组件 unmount 之时，都会执行此函数，进行清理工作。

例如：

* `useEffect(() => {})`：在 componentDidMount，componentDidUpdate 执行
* `useEffect(() => {}, [])`：空数组，只在 componentDidMount 执行
* `useEffect(() => {}, [count])`：在 componentDidMount，componentDidUpdate（count变化） 执行
* `useEffect(() => () => {})`：返回函数在 componentWillUnmount 执行

原来的类组件写法

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

`componentDidMount`和`componentDidUpdate`中的代码是一样的。可以使用 useEffect 来改写。

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

#### useEffect 结合异步函数

useEffect 中的参数函数不能是异步函数，因为 useEffect 要返回清理资源的函数，如果是异步函数就变成了返回Promise

```js
// err
useEffect(async () => {
  const result = axios.get();
})

// ok
useEffect(() => {
  (async () => {
    const result = axios.get();
  })()
})
```

### useReducer

> useReducer 是另一种让函数组件保存状态的方式，类似于 redux

```js
import React, { useReducer } from 'react';

function reducer (state, action) {
  swtich (action.type) {
    case 'increment':
    	return state + 1;
    case 'decrement':
    	return state - 1;
    default:
    	return state;
  }
}

function App () {
  const [count, dispatch] = useReducer(reducer, 0);
  return (
    <div>
      <span>{count}</span>
      <button onClick={() => dispatch({type: 'increment'})}>+1</button>
      <button onClick={() => dispatch({type: 'decrement'})}>-1</button>
    </div>
  )
}
```

### useContext

> 一般组件传值可以使用 props，但是涉及很多层级时可以使用 context 来解决

* React.createContext

```js
cont MyContext  = React.createContext(defaultValue);
```

创建一个 Context 对象。当 React 渲染一个订阅了这个 Context 对象的组件，这个组件会从组件树中离自身最近的那个匹配的 `Provider` 中读取到当前的 context 值。

* Context.Provider

```js
<MyContext.Provider value={/* 某个值 */}>
```

每个 Context 对象都会返回一个 Provider React 组件，它允许消费组件订阅 context 的变化。

Provider 接收一个 `value` 属性，传递给消费组件。一个 Provider 可以和多个消费组件有对应关系。多个 Provider 也可以嵌套使用，里层的会覆盖外层的数据。

当 Provider 的 `value` 值发生变化时，它内部的所有消费组件都会重新渲染。

* Context.Consumer

```js
<MyContext.Consumer>
  {value => /* 基于 context 值进行渲染*/}
</MyContext.Consumer>
```

一个简单的例子

```js
import React, { createContext } from 'react';

const countContext = createContext();

function App() {
  return (
  	<countContext.Provider value={100}>
      <Foo />
    </countContext.Provider>
  )
}

function Foo() {
	return (
  	<countContext.Consumer>
      { value => <div>{value}</div> }
    </countContext.Consumer>
  )
}
```

> 使用 useContext 在跨组件层级获取数据时简化获取数据的代码

```js
import React, { createContext, useContext } from 'react';

const countContext = createContext();

function App() {
  return (
  	<countContext.Provider value={100}>
      <Foo />
    </countContext.Provider>
  )
}

function Foo() {
	const value = useContext(countContext);
  return <div>{value}</div>
}
```

### useMemo

> 类似于 vue 中的计算属性，可以监测某个值的变化，根据变化计算新值。
>
> useMemo 会缓存计算结果，如果监测值没有发生变化，即使组件重新渲染，也不会重新计算。此行为可以有助于避免在每个渲染上进行昂贵的计算。

```js
import React, { useState, useMemo } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const result = useMemo(() => {
    return count * 2;
  }, [count]);
  return (
  	<div>
    	<span>{count} {result}</span>
			<button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  )
}
```

### memo 方法

> 性能优化，如果本组件中的数据没有发生变化，阻止组件更新。类似于类组件中的 PureComponent 和 shouldComponentUpdate

```js
import React, { useState, memo } from 'react';

function App() {
  const [count, setCount] = useState(0);
  return (
  	<div>
    	<span>{count}</span>
			<button onClick={() => setCount(count + 1)}>+1</button>
			<Foo />
    </div>
  )
}

const Foo = memo(function Foo() {
  console.log("Foo组件重新渲染了");
  return <div>我是Foo组件</div>
})

export default App;

// 当点击按钮时，正常来说 App 组件会被重新渲染，相应地 Foo 组件也被重新渲染，但是使用 memo 后，Foo 组件中的数据没有发生变化，所以不会重新渲染。
```

### useCallback

> 性能优化，缓存函数，是组件重新渲染时得到相同的函数实例。

```js
// 代码功能：App 组件中 setCount，Foo 组件中 resetCount

// 表现效果：每次 resetCount 时都会输出 "Foo组件重新渲染了"

// 原因：App 组件 setCount 时，组件被重新渲染，resetCount 函数也重新生成，所以当一个新的函数以 props 传入 Foo 组件时，相当于 Foo 组件中的数据改变，重新渲染

import React, { useState, memo } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const resetCount = () => {
    setCount(0);
  }
  return (
  	<div>
    	<span>{count}</span>
			<button onClick={() => setCount(count + 1)}>+1</button>
			<Foo resetCount={resetount}/>
    </div>
  )
}

const Foo = memo(function Foo(props) {
  console.log("Foo组件重新渲染了");
  return (
    <div>
    	我是Foo组件
    	<button onClick={props.resetCount}>resetCount</button>
    </div>
  )
})

export default App;
```

使用 useCallback 改写 resetCount

```js
const restCount = useCallback(() => setCount(0), [setCount]);
// setCount 不会改变，resetCount 也不会改变
```

> 总结一下，使用场景是：有一个父组件，其中包含子组件，子组件接收一个函数作为props；通常而言，如果父组件更新了，子组件也会执行更新；但是大多数场景下，更新是没有必要的，我们可以借助 useCallback 来返回函数，然后把这个函数作为props传递给子组件；这样，子组件就能避免不必要的更新。

### useRef

> 获取 Dom 元素对象

```js
import React, { useRef } from 'react';

function App() {
  const box = useRef();
  return (
  	<div ref={box}>
			<button onClick={() => console.log(box)}>获取DIV</button>
    </div>
  )
}
```

> useRef还有另一个功能就是保存数据（跨组件周期）：即使组件重新渲染，保存的数据仍然还在。保存的数据被更改不会触发组件重新渲染。

