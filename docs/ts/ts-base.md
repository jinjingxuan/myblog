# TypeScript 基础
[《官方文档》](https://www.tslang.cn/docs/home.html)

[《深入理解TypeScript》](<https://jkchao.github.io/typescript-book-chinese/> )

## 语言类型

强类型：不允许随意的隐式类型转换

弱类型：允许隐式类型转换（`1+ '2'`）

静态类型：声明过后，它的类型就不允许再修改

动态类型：变量的类型可以随时改变（`a=1; a='1'`）

> 基于以上，所有编程语言分为四类，JS即是弱类型也是动态类型，例如：

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

### TS是静态类型+弱类型

1. 错误更早暴露
2. 代码更智能，编码更准确
3. 重构更牢靠
4. 减少不必要的类型判断

## TypeScript项目

`yarn init`：初始化package.json

`yarn add typescript --dev`：安装typescript

新建ts文件`demo.ts`

`yarn tsc demo.ts `：编译demo.ts

根目录下出现`demo.js`，已经自动转化为ES5

### 编译上下文

编译上下文算是一个比较花哨的术语，可以用它来给文件分组，告诉 TypeScript 哪些文件是有效的，哪些是无效的。除了有效文件所携带信息外，编译上下文还包含有正在被使用的编译选项的信息。定义这种逻辑分组，一个比较好的方式是使用 `tsconfig.json` 文件。

`yarn tsc --init`：生成`tsconfig.json`

```json
"sourceMap": true, 
"outDir": "dist",                        
"rootDir": "src",  
```

创建`src`文件夹放ts文件，运行`yarn tsc`编译整个项目

[具体编译选项](https://jkchao.github.io/typescript-book-chinese/project/compilationContext.html#tsconfig-json)

### 声明空间

在 TypeScript 里存在两种声明空间：类型声明空间与变量声明空间。

```ts
interface Bar {}
const bar = Bar; // Error: "cannot find name 'Bar'"

// 因为 Bar 定义在类型声明空间中，而未定义在变量声明空间中。
```

```ts
const foo = 123;
let bar: foo; // ERROR: "cannot find name 'foo'"

// foo 定义在变量声明空间中，不能用作类型注解。
```

### 模块

在默认情况下，当你开始在一个新的 TypeScript 文件中写下代码时，它处于全局命名空间中。如在 foo.ts 里的以下代码可以在 bar.ts 中使用。

```ts
// foo.ts
const foo = 123;

// bar.ts
const bar = foo; // allowed
```

所以需要使用文件模块：

```ts
// foo.ts
export const foo = 123;

// bar.ts
import { foo } from './foo';
const bar = foo; // allow
```

## TypeScript类型系统

### 类型注解

类型注解使用 `:TypeAnnotation` 语法。在类型声明空间中可用的任何内容都可以用作类型注解。例如：

```ts
// 函数声明
function func1 (a: number, b?:number): string {
    return 'func1'
}

// 函数表达式
const func2: (a: number, b:number) => string = function () {
    return 'func2'
}
```

### 原始类型

 `string`、`number`、`boolean`

```ts
let num: number;
let str: string;
let bool: boolean;

num = 123;
num = 123.456;
num = '123'; // Error

str = '123';
str = 123; // Error

bool = true;
bool = false;
bool = 'false'; // Error
```

### 特殊类型

`any`、 `null`、 `undefined` 以及 `void`

#### any

`any` 类型在 TypeScript 类型系统中占有特殊的地位。它提供给你一个类型系统的「后门」,TypeScript 将会把类型检查关闭。在类型系统里 `any` 能够兼容所有的类型（包括它自己）。因此，所有类型都能被赋值给它，它也能被赋值给其他任何类型。

```ts
let power: any;

// 赋值任意类型
power = '123';
power = 123;

// 它也兼容任何类型
let power: any;
let num: number;

power = '123'
num = power

// 反过来也可
num = 123
power = num
```

#### null 和 undefined

默认情况下它们是所有类型的子类型，即可以赋值给任意类型

```ts
let num: number;
let str: string;

// 这些类型能被赋予
num = null;
str = undefined;
```

#### void

使用 `:void` 来表示一个函数没有一个返回值

```ts
function log(message: string): void {
  console.log(message);
}
```

### 数组

```ts
// 两种写法，常使用第二种
const arr1: Array<number> = [1, 2, 3]
const arr2: number[] = [1, 2, 3]

let boolArray: boolean[];

boolArray = [true, false];
console.log(boolArray[0]); // true
console.log(boolArray.length); // 2

boolArray[1] = true;
boolArray = [false, false];

boolArray[0] = 'false'; // Error
boolArray = 'false'; // Error
boolArray = [true, 'false']; // Error
```

### 对象

除了 `Object`之外，函数和数组也属于对象

```ts
const obj: { foo: number } = { foo:123 }

const foo: object = function () {}
const bar: object = []
```

### 接口

为什么需要接口？可以看这个例子：

```ts
function print(obj: { a: string }) {
  console.log(obj.a);
}

let myObj = { a: '10', b: 20 };
print(myObj);
```

类型检查器会查看`print`的调用。 `print`有一个参数，并要求这个对象参数有一个名为`a`类型为`string`的属性。 需要注意的是，我们传入的对象参数实际上会包含很多属性，但是编译器只会检查那些`a`是否存在，而没有检查`b`

**接口可以合并众多类型声明至一个类型声明**，在这里，我们把类型注解：`a: string` + `b: number` 合并到了一个新的类型注解 `Obj` 里，这样能强制对每个成员进行类型检查。

```ts
interface Obj {
  a: string;
  b: number;
}

let obj: Obj;
obj = {
  a: '10',
  b: 20
};

// Error: Property 'b' is missing
obj = {
  a: '10'
};

// Error: Property 'b' is missing
obj = {
  a: '10',
  b: '20'
};
```

### 内联类型注解

内联类型能为你快速的提供一个类型注解。它可以帮助你省去为类型起名的麻烦（你可能会使用一个很糟糕的名称）。然而，如果你发现需要多次使用相同的内联注解时，那么考虑把它重构为一个接口（或者是 `type alias`）

```ts
let foo: {
  first: string;
  second: string;
};

foo = {
  first: 'John',
  second: 'Doe'
};

foo = {
  // Error: 'Second is missing'
  first: 'John'
};

foo = {
  // Error: 'Second is the wrong type'
  first: 'John',
  second: 1337
};
```

### 泛型

在计算机科学中，许多算法和数据结构并不会依赖于对象的实际类型。但是，你仍然会想在每个变量里强制提供约束。

```ts
function createNumberArray (length: number, value: number): number[] {
    const arr = Array<number>(length).fill(value)
    return arr
}

function createStringArray (length: number, value: string): string[] {
    const arr = Array<string>(length).fill(value)
    return arr
}

// 泛型解决冗余问题,在函数后面加 <T>
function createArray<T> (length: number, value: T): T[] {
    const arr = Array<T>(length).fill(value)
    return arr
}
const res = createArray<string>(3, 'foo')
```

具体例子请看[泛型](https://jkchao.github.io/typescript-book-chinese/typings/overview.html#%E6%B3%9B%E5%9E%8B)

### 联合类型(|)

在 JavaScript 中，你可能希望属性为多种类型之一，如字符串或者数组。它使用 `|` 作为标记，如 `string | number`

```ts
function formatCommandline(command: string[] | string) {
  let line = '';
  if (typeof command === 'string') {
    line = command.trim();
  } else {
    line = command.join(' ').trim();
  }
}
```

### 交叉类型(&)

交叉类型是将多个类型合并为一个类型。 这让我们可以把现有的多种类型叠加到一起成为一种类型，它包含了所需的所有类型的特性。

```ts
interface A {
  name: string;
  sex: number;
}

interface B {
  age: number;
  sex: number;
}

let c: A&B = { name: 'xxx', age: 18, sex: 1 }
```

### 元组类型

元组可以看作是数组的拓展，它表示已知元素数量和类型的数组。确切地说，是已知数组中每一个位置上的元素的类型。

```ts
let nameNumber: [string, number];

// Ok
nameNumber = ['Jenny', 221345];

// Error
nameNumber = ['Jenny', '221345'];

// 与解构一起使用
let nameNumber: [string, number];
nameNumber = ['Jenny', 322134];

const [name, num] = nameNumber;
```

### 类型别名

TypeScript 提供了为类型注解设置别名的便捷语法，你可以使用 `type SomeName = someValidTypeAnnotation` 来创建别名：

```ts
type StrOrNum = string | number;

// 使用
let sample: StrOrNum;
sample = 123;
sample = '123';

// 会检查类型
sample = true; // Error
```

### 枚举类型

枚举（Enum）类型用于取值被**限定在一定范围内**的场景，比如一周只能有七天，颜色限定为红绿蓝等。默认情况下，枚举是基于 0 的，也就是说第一个值是 0，后面的值依次递增。

```ts
// 例如文章对象
const post = {
    title: 'aaaaa'
    content: 'abbb',
    status: 0 // 0, 1, 2 代表不同状态，但是不直观
}

// 枚举类型
const enum PostStatus {
    Draft = 0,
    Unpublished = 1,
    Published = 2
}

const post = {
    title: 'aaaaa',
    content: 'abbb',
    status: PostStatus.Draft
}
```

枚举是基于 0 的，后面的值依次递增。

```ts
enum Color {Red, Green, Blue}
let c: Color = Color.Green;  // 1

enum Color {Red = 1, Green, Blue = 4}
let c: Color = Color.Green;  // 2
```

### 类

```ts
class Person {
    public name: string
    private age: number
    protected readonly gender: boolean // protected 只允许子类访问   readonly 只读属性
    
    constructor (name: string, age: number, gender: boolean) {
        this.name = name
        this.age = age
        this.gender = gender
    }
    
    sayHi (msg: string): void {
        console.log(this.name, msg)
    }
}

class Student extends Person {
    constructor (name: string, age: number, gender: boolean) {
        super(name, age, gender)
        console.log(gender) // 只有在这里能访问 gender
    }
}
```

#### 用类实现接口

> 实现（implements）是面向对象中的一个重要概念。一般来讲，一个类只能继承自另一个类，有时候不同类之间可以有一些共有的特性，这时候就可以把特性提取成接口（interfaces），用 `implements` 关键字来实现。这个特性大大提高了面向对象的灵活性。

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

### 抽象类

抽象类作为其他派生类的基类使用，它们一般不会直接被实例化，不同于接口，抽象类可以包含成员的实现细节。`abstract`关键字是用于定义抽象类和在抽象类内部定义抽象方法。**抽象类中的抽象方法不包含具体实现并且必须在派生类中实现。**

```ts
abstract class Animal { // 抽象类只能被继承
    eat (food: string): void {
        console.log(`呼噜呼噜地吃：${food}`)
    }

    abstract run (distance: number): void // 抽象方法在子类中必须实现
}

class Dog extends Animal {
    run (distance: number): void { 
         console.log('爬行：' + distance);
    }
}
const d = new Dog();
d.eat('food')
d.run(100)
```
