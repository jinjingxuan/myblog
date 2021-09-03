# typescript
* 强类型和弱类型（类型安全）
* 静态类型与动态类型（类型检查）
* Flow：JS类型检查器
* TypeScript快速上手
* TypeScript原始类型
* Object类型，数组类型等
* TypeScript接口与类
* 泛型

学习网址：<https://jkchao.github.io/typescript-book-chinese/> 

## 强类型和弱类型

比如说强类型语言要求实参和形参必须类型一致，弱类型则不会要求

强类型：不允许随意的隐式类型转换

弱类型：允许隐式类型转换

## 静态类型和动态类型

静态类型：声明过后，它的类型就不允许再修改

动态类型：变量的类型可以随时改变

> 基于以上，所有编程语言分为四类，JS即是弱类型也是动态类型

```js
const obj = {}
obj.foo()  //这样写没问题，只有等到运行时才会报错

// 如果加了一个时间

setTimeout(() => {
    obj.foo()
},10000)  // 错误就会保留在代码中

// 又或者
function sum (a, b) {
    return a + b
}
console.log(sun(100, '100')) //100100

// 还有对象键会自动转化成字符串
obj[true] = 100
console.log(obj['true'])
```

### 强类型的优势

1. 错误更早暴露
2. 代码更智能，编码更准确
3. 重构更牢靠
4. 减少不必要的类型判断

## Flow：JS类型检查器

```js
// 类型注解
function sum (a: number, b:number) {
    return a + b
}
```

怎么使用？首先`yarn add flow-bin`

```js
// @flow

function sum (a: number, b: number) {
  return a + b
}

sum('100', 100)


// 命令行运行 yarn flow 
// 报错:Could not find a .flowconfig in . or any of its parent directories.
// 运行yarn flow init
// yarn flow stop 停止运行
```

学会Flow在读源码时很方便

1）函数的类型注释

```js
function add(x: number, y: number): number {
  return x + y      //x的类型是number,y的类型是number，函数的返回值类型是number
}
add('Hello', 11)
```

 2）数组类型注释：Array`<T>`,T表示数组中每项的数据类型

```js
var arr: Array<number> = [1, 2, 3]
arr.push('Hello')
```

3）类类型注释

```js
class Bar {
  x: string;           // x 是字符串
  y: string | number;  // y 可以是字符串或者数字
  z: boolean;
  constructor(x: string, y: string | number) {
    this.x = x
    this.y = y
    this.z = false
  }
}
var bar: Bar = new Bar('hello', 4)
```

4）对象类型注释

```js
var obj: { a: string, b: number, c: Array<string>, d: Bar } = {
  a: 'hello',
  b: 11,
  c: ['hello', 'world'],
  d: new Bar('hello', 3)
}
```

5）如果想指定类型为null或者undefined，只需要写成?T形式

```js
var foo: ?string = null   //foo可以为字符串也可以为bull
```
## TypeScript快速上手

`yarn init`：初始化package.json

`yarn add typescript --dev`：安装typescript

新建ts文件`demo.ts`

`yarn tsc demo.ts `：编译demo.ts

根目录下出现`demo.js`，已经自动转化为ES5

### TypeScript配置文件

`yarn tsc --init`：生成`tsconfig.json`

```json
   "sourceMap": true,                     
    // "outFile": "./",                      
    "outDir": "dist",                        
    "rootDir": "src",  
```

创建`src`文件夹放ts文件，运行`yarn tsc`编译整个项目

## TypeScript原始类型

```ts
const a: string = 'a'
const b: number = 100 // NaN Infinity
const c: boolean = true

// 非严格模式下可以设置为空
const d: string = null

const e: void = undefined
const f: null = null
const g: undefined = undefined

const h: symbol = Symbol() // 会报错，tsconfig.json中target设置成es2015就可以（引用的标准库）
```

在写demo时，每个ts文件最后都加上一行`export {}`，使其成为模块作用域，保证变量名重复不报错

## Object类型，数组类型等

```ts
const foo: object = function () {} // [] // {}
// object类型不止有对象，还有数组，函数

const obj: { foo: number } = { foo:123 } // 对象

// 数组类型
const arr1: Array<number> = [1, 2, 3]
const arr2: number[] = [1, 2, 3]

function sum (...args: number[]) {
    // 就不用在这里判断是否数字了
    return args.reduce((prev, current) => pre + current, 0)
}

// 元组类型:数量和类型确定
const tuple: [number, string] = [18, 'a']

Object.entries() //得到的就是元组

// 枚举类型
const post = {
    title: 'aaaaa'
    content: 'abbb',
    status: 0 // 0,1,2 代表不同状态，如果忘了或者混进其他数字怎么办
}

// 加上const不会影响编译后的代码
const enum PostStatus {
    Draft = 0,
    Unpublished = 1,
    Published = 2
}
// 令status = PostStatus.Draft

// 函数类型

// 函数声明
function func1 (a: number, b?:number): string {
    return 'func1'
}
// 函数表达式
const func2: (a: number, b:number) => string = function () {
    return 'func2'
}

// 任意类型
function stringify (value: any) {
    return JSON.stringify(value)
}
stringify('str') // 轻易不要使用

// 隐式类型推断
let age = 18 // number
age = 'string' // 保存

let foo // 默认为any
foo = 'string

// 类型断言
const nums = [110, 120, 119, 112]
const res = nums.find(i => i > 0)
const square = res * res // ts会报错，它认为res为number或undefined（可能找不到）

// 如何断言
const num1 = res as number
const num2 = <number>res // JSX 下不能使用
```

## TypeScript接口与类

```ts
// 接口
interface Post {
    title: string
    content: string
    subtitle?: string        // 可选成员
    readonly summary: string // 只读成员
}

function printPost (post: Post) {
    console.log(post.title)
    console.log(post.content)
}

printPost({
    title: 'hello',
    content: 'a'
})

// 动态成员
interface Cache {
    [prop: string]: string // 属性名为任意字符串
}
const cache: Cache = {}
cache.foo = 'value1'
cache.bar = 'value2'

// 类
class Person {
    public name: string
    private age: number
    protected readonly gender: boolean // protected只允许子类访问   readonly只读属性
    
    constructor (name: string, age: number) {
        this.name = name
        this.age = age
    }
    
    sayHi (msg: string)：void {
        console.log(this.name, msg)
    }
}

class Student extends Person {
    constructor (name: string, age: number) {
		super(name, age)
         console.log(this,gender)
    }
}

const tom = new Person('tom', 18)
 console.log(this.gender) // 报错
```

类去实现接口

```ts
interface Eat {
    eat（food: string): void
}
interface Run {
    run（distance: number): void
}

class Person implements Eat, Run {
    eat (food: string): void {
        console.log(`优雅地进餐：${food}`)
    }
    
    run (distance: number): void {
        console.log(`直立行走：${distance}`)
    }
}

class Animal implements Eat, Run {
    eat (food: string): void {
        console.log(`呼噜呼噜地吃：${food}`)
    }
    
    run (distance: number): void {
        console.log(`爬行：${distance}`)
    }
}
```





