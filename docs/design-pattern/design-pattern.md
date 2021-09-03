# 设计模式

JavaScript 设计模式，设计模式是一种思想，和语言无关。

* 开发效率
* 可维护性

相关书籍

* 《大话设计模式》
* 《设计模式：可服用面向对象软件的基础》
* 《headfirst 设计模式》
* 《JavaScript 设计模式》
* [《JavaScript中的设计模式》](https://www.bookstack.cn/books/design-pattern-in-javascript?tab=comment)

# 面向对象的 JavaScript

* 类
* 实例
* 构造函数
* 继承
* 多态
* 封装
* 原型
* class语法 
* 具体看[面向对象编程](https://www.jinjingxuan.com/2019/01/18/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F-%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E7%BC%96%E7%A8%8B/)

# 设计模式

* 创建型模式
  * 工厂模式
  * 抽象工厂模式
  * 单例模式
  * 建造者模式
  * 原型模式
* 结构型模式
  * 适配器模式
  * 桥接模式
  * 过滤器模式
  * 组合模式
  * 装饰器模式
  * 外观模式
  * 享元模式
  * 代理模式
* 行为型模式
  * 责任链模式
  * 命令模式
  * 解释器模式
  * 迭代器模式
  * 中介者模式
  * 备忘录模式
  * 观察者模式
  * 状态模式
  * 空对象模式
  * 策略模式
  * 模板模式
  * 访问者模式

* 适配器模式
* 装饰器模式

## 工厂模式(Factory pattern)

工厂模式是比较常用的设计模式之一，那么什么叫工厂模式呢？简单来说，就是你需要什么东西不直接使用new的方法生成实例，然后统一通过工厂进行生产加工再生成实例。

### 工厂模式的实例

比如我们现在有很多形状比如圆形，矩形和正方形。这类都是属于形状，那我们是不是可以通过专门生产形状的工厂来生成它们的实例么？

```js
class Circle {
    draw() {
        console.log("I'm a circle")
    }
}
class Rectangle {
    draw() {
        console.log("I'm a rectangle")
    }
}
class Square {
    draw() {
        console.log("I'm a square")
    }
}
```

那么接下来，我们可以建立一个专门生产形状的工厂来生产它们了。即根据字符串来产生对应需要的类。你在这里可以看到类的出口都已经在一个方法中了。

```js
class ShapeFactory {
    getShape(shapeType){
        switch(shapeType) {
            case 'CIRCLE':
                return new Circle();
            case 'RECTANGLE':
                return new Rectangle();
            case 'SQUARE':
                return new Square();
            default:
                return null;
        }
    }
}
```

那么我们需要使用的时候，就可以直接只需要new出一个工厂，在根据字符串就能拿到对应的需要生产的类了。而不需要分别对类进行new。

```js
const shapeFactory = new ShapeFactory();
// 通过工厂拿各种形状
const shape1 = shapeFactory.getShape('CIRCLE');
shape1.draw();
const shape2 = shapeFactory.getShape('RECTANGLE');
shape2.draw();
const shape3 = shapeFactory.getShape('SQUARE');
shape3.draw();
/**
 * output:
 * I'm a circle
 * I'm a rectangle
 * I'm a square
 */
```

### 工厂模式的优势

那么使用工厂模式的好处也是显而易见的，比如实例的生产比较复杂，或者说生成实例后还需要额外加工，这个时候工厂给了我们一个统一的出入口，也方便了日后对这个实例的修改。比如你要修改工厂产出是一个单例的时候，就不需要在所有的类中修改，而只要在工厂出口修改即可达到目标。

## 抽象工厂模式(abstract Factory Pattern)

上文讲到了工厂模式，这篇文章将抽象工厂，抽象工厂的名字是真的很抽象，也很容易让人抽象的理解，那么什么是抽象工厂呢？

其实抽象工厂，简单来说就是工厂的工厂，因为一般来说一个工厂只负责加载一类组件，那么你有很多小类组件需要生产，那么势必会有很多小类的工厂。那么你最终生产一个大类，那就要很多小类的工厂负责生产。那么如何更方便的管理或者说生产这些工厂呢？那就用生产工厂的工厂来生成吧。

### 抽象工厂模式的实例

先把上文说的形状工厂搬过来

```js
// 这是之前上文说的形状工厂
class Circle {
    draw() {
        console.log("I'm a circle")
    }
}
class Rectangle {
    draw() {
        console.log("I'm a rectangle")
    }
}
class Square {
    draw() {
        console.log("I'm a square")
    }
}
class ShapeFactory {
    getShape(shapeType){
        switch(shapeType) {
            case 'CIRCLE':
                return new Circle();
            case 'RECTANGLE':
                return new Rectangle();
            case 'SQUARE':
                return new Square();
            default:
                return null;
        }
    }
}
```

这时候你已经有形状了，但你觉得不美观，你还需要颜色，那么你这个时候，你又搞了个颜色工厂，如下：

```js
// 再新加一个颜色工厂
class Red {
    fill() {
        console.log("fill red")
    }
}
class Blue {
    fill() {
        console.log("fill blue")
    }
}
class Green {
    fill() {
        console.log("fill green")
    }
}
class ColorFactory {
    getColor(color){
        switch(color) {
            case 'RED':
                return new Red();
            case 'BLUE':
                return new Blue();
            case 'GREEN':
                return new Green();
            default:
                return null;
        }
    }
}
```

颜色工厂好了，但是你担心，以后工厂多了，不好管理咋办，那还是走之前的套路，把工厂通过抽象工厂生产出来。如下：

```js
// 最后添加抽象工厂
class FactoryProducer {
    static getFactory(choice){
        switch(choice) {
            case 'SHAPE':
                return new ShapeFactory();
            case 'COLOR':
                return new ColorFactory();
            default:
                return null;
        }
    }
}
```

那么这个时候和上文一样只需要new出一个抽象工厂，就能把所有需要的东西拿到手了:

```js
//通过抽象工厂拿形状工厂
const shapeFactory = FactoryProducer.getFactory('SHAPE');
// 通过工厂拿各种形状
const shape1 = shapeFactory.getShape('CIRCLE');
shape1.draw();
const shape2 = shapeFactory.getShape('RECTANGLE');
shape2.draw();
const shape3 = shapeFactory.getShape('SQUARE');
shape3.draw();
//通过抽象工厂拿颜色工厂
const colorFactory = FactoryProducer.getFactory('COLOR');
// 通过工厂拿各种颜色
const color1 = colorFactory.getColor('RED');
color1.fill();
const color2 = colorFactory.getColor('BLUE');
color2.fill();
const color3 = colorFactory.getColor('GREEN');
color3.fill();
/**
 * output：
 * I'm a circle
 * I'm a rectangle
 * I'm a square
 * fill red
 * fill blue
 * fill green
 */
```

### 抽象工厂模式的优势

那么使用抽象工厂模式的好处和工厂模式的好处很相似，给工厂做了一个统一的出入口，也方便了日后对这个工厂的修改。

## 单例模式(Singleton Pattern)

什么叫单例模式，简单来说就是一个实例只生产一次。

### 单例模式的实例

这个很简单，我觉得可以直接看代码。

这是一种“懒汉式”写法，还有一种叫饿汉式写法，区别是懒汉使用时才初始化，饿汉则先初始化，用的时候直接给。

由于js不需要考虑线程安全，所以推荐使用懒汉式写法，饿汉在JS中反而容易产生没必要的垃圾。

> 惰性单例是指在需要的时候才创建

```js
class SingleObject {
    constructor() {
        // 防止调用new初始化
        if(new.target != undefined) {
            const errorMsg = "This is single object,Can't use keyword new!";
            const tipMsg = "You should use method getInstance to get instance。";
            throw new Error(`\n${errorMsg}\n${tipMsg}`)
        }
    }
    static getInstance(){
        // 生产单例
        if(SingleObject.instance) {
            return SingleObject.instance;
        }
        SingleObject.instance = {};
        SingleObject.instance.__proto__ = SingleObject.prototype;
        return SingleObject.instance;
    }
    showMessage(){
       console.log("Hello World!");
    }
}
const instance = SingleObject.getInstance();
instance.showMessage();
/**
 * output:
 * Hello World!
 */
```

### 单例模式的优势

对于频繁使用且可重复使用的对象，可以极大来减少内存消耗和没必要的垃圾回收。

### 单例模式的使用场景

在一个系统中，要求一个类有且仅有一个对象，如果出现多个对象就会出现”不良反应“，可以采用单例模式，具体的场景如下：

- 在整个项目中需要一个共享访问点或共享数据，例如一个Web上的计数器，可以不用每次把刷新都记录到数据库中，使用单例模式保持计数器的值，并确保是线程安全的；
- 需要定义大量的静态常量和静态方法（如工具类）的环境，可以采用单例模式（当然，也可以直接声明为static的方式）。
- 在项目开发时有一些对象其实我们只需要一个，比如：线程池、缓存、日志对象等等。

## 建造者模式

在软件系统中，有时候面临着“一个复杂对象”的创建工作，其通常由各个部分的子对象用一定的算法构成；由于需求的变化，这个复杂对象的各个部分经常面临着剧烈的变化，但是将它们组合在一起的算法确相对稳定。如何应对这种变化？如何提供一种“封装机制”来隔离出“复杂对象的各个部分”的变化，从而保持系统中的“稳定构建算法”不随着需求改变而改变？这就是要说的建造者模式。

**建造者模式**(Builder pattern)，将一个复杂对象的构建层与其表示层相互分离，使得同样的构建过程可以采用不同的表示。也就是说如果我们用了建造者模式，那么用户就需要指定需要建造的类型就可以得到它们，而具体建造的过程和细节就不需要知道了。

在**工厂模式**中，对创建的结果都是一个完整的个体，我们对参见的过程不为所知，只了解创建的结果对象。而在建造者模式中我们关心的是对象的创建过程，因此我们通常将创建对象的类模块化，这样使被创建的类的每一个模块都可以得到灵活的运用和高质量的复用。

### 白话解释

> 在建造者模式里，有个指导者(Director)，由指导者来管理建造者，用户是与指导者联系的，指导者联系建造者最后得到产品。即建造者模式可以强制实行一种分步骤进行的建造过程。

```js
    //产品——产品类
    function Product(){
        this.design = "";
        this.db = "";
        this.front = "";
        this.back = "";
    }
    //产品经理——指导类
    function ProductManager(){
        this.startWork = function(engineer){
            engineer.productDesign();
            engineer.frontEnd();
            engineer.backEnd();
            engineer.dbManageer();
        }
    }
    //工程师——建造者类
    function Engineer(){
        this.productDesign = function(){
            console.log("产品设计好了");
        };
        this.dbManageer = function(){
            console.log("数据库设计好了");
        };
        this.backEnd = function(){
            console.log("后台写好了");
        };
        this.frontEnd = function(){
            console.log("前台写好了");
        };
        this.done = function(){
            var product = new Product();
            product.design = "done";
            product.db = "done";
            product.back = "done";
            product.front = "done";
            return product;
        }
    }

		let engineer = new Engineer()
    let productmanager = new ProductManager()
    productmanager.startWork(engineer)
		// 产品设计好了
    // 前台写好了
		// 后台写好了
		// 数据库设计好了
		let product = engineer.done()
		console.log(product)
		/**
			Product
        back: "done"
        db: "done"
        design: "done"
        front: "done"
		*/
```

## 适配器模式(Adapter Pattern)

适配器模式是作为两个不同接口的一种聚合，把比如说SD卡适配器，无论使用TF或SD卡或者其它卡，对外输出都是USB接口。

### 适配器模式的实例

首先我们有两个设备一个是Vlc播放器，一个是Mp4播放器，一个需要使用playVlc按钮来播放，一个要使用playMp4来播放。

```js
class VlcPlayer {
    playVlc(fileName) {
       console.log("Playing vlc file. Name: "+ fileName);      
    }
}
class Mp4Player  {
    playMp4(fileName) {
        console.log("Playing mp4 file. Name: "+ fileName);      
    }
}
```

但是我就想通过一个播放按钮来播放，我不管他是什么播放设备，这个时候，我们就需要一个适配器来做这个事情。

```js
class MediaAdapter {
    constructor(audioType){
        switch(audioType) {
            case 'vlc':
                MediaAdapter.advancedMusicPlayer = new VlcPlayer();
                break;
            case 'mp4':
                MediaAdapter.advancedMusicPlayer = new Mp4Player();
                break;
        }
    }
    play(audioType, fileName) {
        switch(audioType) {
            case 'vlc':
                MediaAdapter.advancedMusicPlayer.playVlc(fileName);
                break;
            case 'mp4':
                MediaAdapter.advancedMusicPlayer.playMp4(fileName);
                break;
        }
    }
 }
```

通过适配器我们可以把各种设备桥接到一个音频设备上。

```js
class AudioPlayer{
    play(audioType, fileName) {
        switch(audioType) {
            case 'mp3':
                console.log("Playing mp3 file. Name: "+ fileName);
                break;
            case 'vlc':
            case 'mp4':
                    AudioPlayer.mediaAdapter = new MediaAdapter(audioType);
                    AudioPlayer.mediaAdapter.play(audioType, fileName);
                break;
            default:
                console.log("Invalid media. "+
                    audioType + " format not supported");
                break;
        }
    }  
 }
```

那么这个时候我们就可以直接通过这个音频设备来播放我们想要播放的音频了

```js
const audioPlayer = new AudioPlayer();
 audioPlayer.play("mp3", "beyond the horizon.mp3");
 audioPlayer.play("mp4", "alone.mp4");
 audioPlayer.play("vlc", "far far away.vlc");
 audioPlayer.play("avi", "mind me.avi");
  /**
  * output:
  * Playing mp3 file. Name: beyond the horizon.mp3
  * Playing mp4 file. Name: alone.mp4
  * Playing vlc file. Name: far far away.vlc
  * Invalid media. avi format not supported
  */
```

### 适配器模式的优势

可以让两个不同接口作为一个适配的接口使用，这样对下层的关心可以减少.

## 装饰器模式(Decorator Pattern)

装饰器模式实现了不改变原有对象，在原有对象上实现功能的添加。这是一种对原有对象的一种包装。

### 装饰器模式的实例

假设现在有两个形状，一个矩形一个圆形，这时候我们希望能在形状上实现一些特殊的功能，但又不改变原来的类，我们要如何做呢？

```js
class Rectangle {
    draw() {
       console.log("Shape: Rectangle");
    }
}
class Circle {
    draw() {
       console.log("Shape: Circle");
    }
}
```

这时我们可以用装饰器来实现，假设我们要给形状添加颜色功能

```js
class RedShapeDecorator {
    constructor(decoratedShape) {
       this.decoratedShape = decoratedShape;    
    }
    draw() {
       this.decoratedShape.draw();        
       this.setRedBorder();
    }
    setRedBorder(){
       console.log("Border Color: Red");
    }
}
```

那么在使用装饰器的类，在画圆的时候就实现了了画边框的颜色。

```js
const circle = new Circle();
const redCircle = new RedShapeDecorator(new Circle());
const redRectangle = new RedShapeDecorator(new Rectangle());
console.log("Circle with normal border");
circle.draw();
console.log("\nCircle of red border");
redCircle.draw();
console.log("\nRectangle of red border");
redRectangle.draw();
/**
 * output:
 * Circle with normal border
 * Shape: Circle
 * 
 * Circle of red border
 * Shape: Circle
 * Border Color: Red
 * 
 * Rectangle of red border
 * Shape: Rectangle
 * Border Color: Red
 */
```

### 装饰器模式的优势

即使原有对象发生改变，装饰器是种非侵入式功能添加，对原有对象的影响也能降低到最小。

## 过滤器模式(Filter Pattern)

通过多个单一的功能筛选构建出一个复杂的筛选功能。

### 过滤器模式的实例

首先定义一个对象，我们后续可以通过名字(name)，性别(gender)，婚姻状况(maritalStatus)

```js
// 定义对象
class Person {
    constructor(name, gender, maritalStatus){
       this.name = name;
       this.gender = gender;
       this.maritalStatus = maritalStatus;    
    }
    getName() {
       return this.name;
    }
    getGender() {
       return this.gender;
    }
    getMaritalStatus() {
       return this.maritalStatus;
    }  
}
```

定义一些单一功能的筛选条件，比如啊判断是男，是女，是不是单身。

```js
// 添加筛选条件
class CriteriaMale {
    meetCriteria(persons) {
       const malePersons = [];
       for (const person of persons) {
          if(person.getGender().toUpperCase() == "MALE"){
             malePersons.push(person);
          }
       }
       return malePersons;
    }
}
class CriteriaFemale {
    meetCriteria(persons) {
       const femalePersons = [];
       for (const person of persons) {
          if(person.getGender().toUpperCase() == "FEMALE"){
             femalePersons.push(person);
          }
       }
       return femalePersons;
    }
}
class CriteriaSingle {
    meetCriteria(persons) {
       const singlePersons = [];
       for (const person of persons) {
          if(person.getMaritalStatus().toUpperCase() == "SINGLE"){
             singlePersons.push(person);
          }
       }
       return singlePersons;
    }
}
```

将单一功能增加对应的操作符，使单一功能筛选条件能通过组合来实现复杂的筛选。

```js
// 添加筛选操作符
class AndCriteria {
    constructor(criteria, otherCriteria) {
       this.criteria = criteria;
       this.otherCriteria = otherCriteria;
    }
    meetCriteria(persons) {
       const firstCriteriaPersons = this.criteria.meetCriteria(persons);
       return this.otherCriteria.meetCriteria(firstCriteriaPersons);
    }
 }
 class OrCriteria{
    constructor(criteria, otherCriteria) {
       this.criteria = criteria;
       this.otherCriteria = otherCriteria;
    }
    meetCriteria(persons) {
       const firstCriteriaItems = this.criteria.meetCriteria(persons);
       const otherCriteriaItems = this.otherCriteria.meetCriteria(persons);
       for (const person of otherCriteriaItems) {
          if(firstCriteriaItems.indexOf(person)==-1){
            firstCriteriaItems.push(person);
          }
       }
       return firstCriteriaItems;
    }
 }
```

使用单一筛选条件或是组合单一筛选条件来筛选，达到复杂筛选目的

```js
function printPersons(persons){
    for (const  person of persons) {
       console.log(person);
    }
}
const persons = [];
persons.push(new Person("Robert","Male", "Single"));
persons.push(new Person("John","Male", "Married"));
persons.push(new Person("Laura","Female", "Married"));
persons.push(new Person("Diana","Female", "Single"));
persons.push(new Person("Mike","Male", "Single"));
persons.push(new Person("Bobby","Male", "Single"));
const male = new CriteriaMale();
const female = new CriteriaFemale();
const single = new CriteriaSingle();
const singleMale = new AndCriteria(single, male);
const singleOrFemale = new OrCriteria(single, female);
console.log("Males: ");
printPersons(male.meetCriteria(persons));
console.log("\nFemales: ");
printPersons(female.meetCriteria(persons));
console.log("\nSingle Males: ");
printPersons(singleMale.meetCriteria(persons));
console.log("\nSingle Or Females: ");
printPersons(singleOrFemale.meetCriteria(persons));
/**
 * output:
 * Males: 
 * Person { name: 'Robert', gender: 'Male', maritalStatus: 'Single' }
 * Person { name: 'John', gender: 'Male', maritalStatus: 'Married' }
 * Person { name: 'Mike', gender: 'Male', maritalStatus: 'Single' }
 * Person { name: 'Bobby', gender: 'Male', maritalStatus: 'Single' }
 * 
 * Females: 
 * Person { name: 'Laura', gender: 'Female', maritalStatus: 'Married' }
 * Person { name: 'Diana', gender: 'Female', maritalStatus: 'Single' }
 * 
 * Single Males: 
 * Person { name: 'Robert', gender: 'Male', maritalStatus: 'Single' }
 * Person { name: 'Mike', gender: 'Male', maritalStatus: 'Single' }
 * Person { name: 'Bobby', gender: 'Male', maritalStatus: 'Single' }
 * 
 * Single Or Females: 
 * Person { name: 'Robert', gender: 'Male', maritalStatus: 'Single' }
 * Person { name: 'Diana', gender: 'Female', maritalStatus: 'Single' }
 * Person { name: 'Mike', gender: 'Male', maritalStatus: 'Single' }
 * Person { name: 'Bobby', gender: 'Male', maritalStatus: 'Single' }
 * Person { name: 'Laura', gender: 'Female', maritalStatus: 'Married' }
 */
```

### 过滤器模式优势

在需要做类的筛选的时候，通过每次单一功能的筛选，再做聚合能极大的降低筛选功能的复杂性。