---
title: 面向对象编程
date: 2019-1-18 16:00:54
categories: 设计模式
---
# 面向对象编程
JavaScript这种解释型的弱类型语言没有经典强类型语言中那种通过class等关键字实现类的封装方式，JavaScript中都是通过一些特性模仿实现的。

## 如何创建一个类

首先声明一个函数保存在一个变量里，然后在这个函数（类）的内部通过this变量添加属性或者方法来实现对类添加属性或者方法。

```js
var Book = functoin(id,bookname,price){
    this.id = id;
    this.bookname = bookname;
    this.price = price;
}
//这样我们实现了封装，当使用功能方法时，我们不能直接使用这个Book类，需要用new关键字来实例化
//可以使用点语法访问实例化对象的属性和方法

var book = new Book(10,'设计模式',50);
console.log(book.bookname);//设计模式
```

### 属性与方法的封装

由于JavaScript的函数级作用域，声明在函数内部的变量以及方法在外界是访问不到的：私有变量，私有方法

函数内部通过this创建的属性可看做是对象的：共有属性，共有方法

而通过this创建的方法，不但可以访问到对象的共有属性与共有方法，而且还能访问到私有属性和私有方法，可以看做：特权方法

在对象创建时通过这些特权方法可以初始化实例对象的一些属性：构造器

```js
var Book = function(id,name,price){
    //私有属性
    var num = 1;
    //私有方法
    function checkId(){
        
    };
    //特权方法
    this.getName = function(){};
    this.getPrice = function(){};
    this.setName = function(){};
    this.setPrice = function(){};
    //对象公有属性
    this.copy = function(){};
    //构造器
    this.setName(name);
    this.setPrice(price);
}
```

**在类外面通过点语法定义的属性以及方法被称为类的静态共有属性和类的静态共有方法**

**prototype对象中的属性和方法称为共有属性和共有方法**

（ 无需实例化就可以调用的方法就叫静态方法。 ）

```js
//类静态公有属性，方法
Book.isChinese = true;
Book.resetTime = function(){
    console.log('new Time')
};
Book.prototype = {
    //公有属性
    isJSBook: false
    //公有方法
    display: function(){}
}

//测试代码
var b = new Book(11,'设计模式',50)；
console.log(b.num);     //undefined
console.log(b.isJSBook);//false
console.log(b.id);      //11
console.log(b.isChinese);//undefined
console.log(Book.isChinese);//true
Book.resetTime();        //undefined
```

## 通过闭包实现类的静态变量

闭包是有权访问另一个函数作用域中变量的函数，即在一个函数内部创建另外一个函数。我们将这个闭包作为创建对象的构造函数，这样他既是闭包又是可实例对象的函数，即可访问到类函数作用域中的变量，如

bookNum： 静态私有变量

checkBook()：静态私有方法

price,checkID()：闭包内部的私有变量以及私有方法

```js
//利用闭包实现
var Book = (function(){
    //静态私有变量
    var bookNum = 0;
    //静态私有方法
    function checkBook(name){}
    //创建类
    function book(newId,newName,newPrice){
        //私有变量
        var name,price;
        //私有方法
        function checkID(id){}
        //特权方法
        this.getName = function(){};
        this.getPrice = function(){};
        this.setName = function(){};
        this.setPrice = function(){};
        //公有属性
        this.id = newId;
        //公有方法
        this.copy = function(){}
        bookNum++
        if(bookNum > 100)
            throw new Error('我们仅出版100本书')
        //构造器
        this.setName(name);
        this.setPrice(price);
    }
    //构造原型
    _book.prototype = {
        //静态公有属性
        isJSBook:false,
        //静态公有方法
        display: function(){}
    };
    //返回类
    return _book；
})()
```

## 创建对象的安全模式

```js
var Book = function(title,time,type){
    this.title = title;
    this.time = time;
    this.type = type;
}
//实例化一本书
var book = Book('JavaScript','2014','js');
//测试
console.log(book);//undefined
console.log(window.title);//JavaScript
console.log(window.time);//2014
console.log(window.type);//js
```

**new关键字的作用可以看作是对当前对象的this不停地赋值**

例子中没有new，则会直接执行这个函数

```js
//图书安全类
var Book = function(title,time,type){
    //判断执行过程中this是否是当前这个对象（如果是说明是用new创建的）
    if(this instanceof Book){
        this.title = title;
        this.time = time;
        this.type = type;
    }else{
        return new Book((title,time,type);
    }
}
//测试
var book = Book('JavaScript','2014','js');
```

### 继承

#### 类式继承

```js
//声明父类
function SuperClass(){
    this.superValue = true;
}
//为父类添加共有方法
SuperClass.prototype.getSuperValue = function(){
  	return this.superValue;  
};
//声明子类
function SubClass(){
    this.subValue = false;
}

//继承父类
SubClass.prototype = new SuperClass()'
//为子类添加共有方法
SubClass.prototype.getSubValue = function(){
    return this.subValue;
}'

//测试
var instance = new SubClass();
console.log(instance.getSubValue);   //false
console.log(instance.getSuperValue); //true
```

**instanceof 可以检测某个对象是否是某个类的实例**

```js
console.log(instance instanceof SuperClass); //true
console.log(instance instanceof SubClass);   //true
console.log(SubClass instanceof SuperClass); //false
console.log(SubClass.prototype instanceof SuperClass) //true

//所有创建的对象都是原生对象Object的实例
```

缺点：

1. 父类中的共有属性要是引用类型，就会在子类中被所有实例共用

2. 由于子类实现的继承是靠原型对父类的实例化实现的，因此在创建父类的时候，是无法向父类传递参数的，因而在实例化父类的时候也无法对父类构造函数内的属性进行初始化。

### 构造函数继承

```js
//声明父类
function SuperClass(id){
    //引用类型共有属性
    this.books = ['JavaScript','html','css'];
    //值类型共有属性
    this.id = id;
}

//父类声明原型方法
SuperClass.prototype.showBooks = function(){
    console.log(this.books);
}

//声明子类
function SubClass(id){
    //继承父类
    SuperClass.call(this,id);
}

//创建第一个子类的实例
var instance1 = new SubClass(10);
//创建第二个子类的实例
var instance2 = new SubClass(11);

instance1.books.push('设计模式');
console.log(instance1.books); //['JavaScript','html','css','设计模式']
console.log(instance1.id);  //10
console.log(instance2.books); //['JavaScript','html','css']
console.log(instance2.id);	//11

instance1.showBooks(); //TypeError
```

SuperClass.call(this,id);这条语句是构造函数继承的精华，由于call这个方法可以更改函数的作用环境，因此在子类中，对superClass调用这个方法就是将子类中的变量在父类中执行一遍，由于父类中是给this绑定属性的，因此子类继承了父类的共有属性。

缺点：父类的原型方法不会被子类继承，如果要被继承必须放在构造函数中，这样创建出来的每个实例都会单独拥有一份而不能共有，违反了代码复用的原则在

### 组合继承

* 类式继承是通过子类的原型对父类实例化来实现的
* 构造函数式继承是通过在子类的构造函数作用环境中执行一次父类的构造函数来实现的
* 组合继承同时实现这两点

```js
//声明父类
function SuperClass(id){
    //引用类型共有属性
    this.books = ['JavaScript','html','css'];
    //值类型共有属性
    this.name = name;
}

//父类声明原型方法
SuperClass.prototype.getName = function(){
    console.log(this.name);
}

//声明子类
function SubClass(name,time){
    //构造函数继承父类name属性
    SuperClass.call(this,name);
}

//类式继承 
SubClass.prototype = new SuperClass();
//子类原型方法
SubClass.prototype.getTime = function(){
    console.log(this.time)
};

//测试

var instance1 = new SubClass('js book',2014);
instance1.books.push('设计模式');
console.log(instance1.books); //['JavaScript','html','css','设计模式']
instance1.getName(); //js book
instance1.getTime();//2014

var instance2 = new SubClass('css book',2013);
console.log(instance1.books); //['JavaScript','html','css']
instance1.getName(); //css book
instance1.getTime();//2013
```

缺点：

1. 使用构造函数继承时执行了一遍父类的构造函数，而在实现子类原型的类式继承时又调用了一遍父类构造函数，因此父类构造函数调用了两遍。

### 原型式继承

```js
//这是对类式继承的封装，其中的过渡对象就相当于类式继承中的子类
function inheritObkect(o){
    //声明一个过渡函数对象
    function F(){}
    //过渡对象的原型继承父对象
    F.prototype = o;
    //返回过渡对象的一个实例，该实例的原型继承了父对象
    return new F();
}

var book = {
    name: 'js book',
    alikeBook:['css book','html book']
};
var newBook = inheritObkect(book);
var newBook.name = 'ajax book'
```

这种方式由于F过渡类中的构造函数无内容，所以开销比较小。

缺点：仍然存在类式继承的缺点

### 寄生式继承

```js
var book = {
    name: 'js book',
    alikeBook:['css book','html book']
};

function createBook(obj){
    //通过原型继承方式创建新对象
    var o = new inheritObject(obj);
    //拓展新对象
    o.getName = function(){
        console.log(name);
    };
    //返回拓展后的新对象
    return o;
}
```

寄生式继承就是对原型继承的第二次封装，并且在这第二次封装过程中对继承的对象进行了拓展，这样新创建的对象不仅仅有父类中的属性和方法而且还添加新的属性和方法

### 寄生组合式继承

寄生式继承依托于原型继承，原型继承又与类式继承相像。

寄生组合式继承是寄生式继承和构造函数继承两种模式的组合，也是对组合继承的改进。

组合继承 = 类式继承+构造函数继承（子类不是父类的实例，而子类的原型是父类的实例）

寄生组合式继承= 寄生式继承+构造函数继承

```js
function inheritPrototype(subClass,superClass){
    //复制一份父类的原型副本保存在变量中
    var p = inheritObject(superClass.prototype);
    //修正因为重写子类原型导致子类的constructor属性被修改
    p.construcor = subClass;
    //设置子类的原型
    subClass.prototype = p;
}
```

组合式继承中，通过构造函数继承的属性和方法是没有问题的，所以我们主要探究通过寄生式继承重新继承父类的原型。在构造函数继承中我们已经调用了父类的构造函数。因此我们需要的就是父类的原型对象的一个副本，这个副本我们通过原型继承便可得到，但是这个复制对象p中的construstor指向的不是subClass，因此在寄生式继承中要对p做一次增强，修复其construstor指向不正确的问题，再赋给子类的原型。

```js
		//定义父类
		function SuperClass(name){
			this.name = name;
			this.colors = ['red','blue','green'];
		}
		//定义父类原型方法
		SuperClass.prototype.getName = function(){
			console.log(this.name);
		}
		//定义子类
		function SubClass(name,time){
			//构造函数式继承
			SuperClass.call(this,name);
			//子类新增属性
			this.time = time;
		}
		//寄生式继承父类原型
		inheritPrototype(SubClass,SuperClass);
		//子类新增原型方法
		SubClass.prototype.getTime = function(){
			console.log(this.time);
		};

		//测试
		var instance1 = new SubClass('js book',2014);
		var instance2 = new SubClass('css book',2013);

		instance1.colors.push('black');
		console.log(instance1.colors); //["red", "blue", "green", "black"]
		console.log(instance2.colors); //["red", "blue", "green"]
		instance2.getTime(); //2013
		instance2.getName(); //css book
```

### 继承单对象属性的extend方法

```js
//单继承 属性复制
var extend = function(target,source){
    //遍历源对象中的属性
    for(var property in source){
        target[property] = source[property];
    }
    //返回目标对象
    return target;
}
```

### 多继承

```js
var mix = function(){
    var i = 1,                    //从第二个参数起为被继承的对象
    	len = arguments.length,   //获取参数长度
        target = arguments[0],    //第一个对象为目标对象
        arg;                      //缓存参数对象
    for(;i < len;i++){
        arg = arguments[i];
        for(var property in arg){
            target[property] = arg[property];
        }
    }
    return target;
}
```

我们也可以将它绑定到原生对象Object上，这样所有的对象就可以拥有这个方法了。

```js
Object.prototype.mix = function(){
    var i = 1,                    //从第二个参数起为被继承的对象
    	len = arguments.length,   //获取参数长度
        arg;                      //缓存参数对象
    for(;i < len;i++){
        arg = arguments[i];
        for(var property in arg){
            this[property] = arg[property];
        }
    }
}

//测试
otherBook.mix(book1,book2);
```

## 多态

多态，对同一个方法多种调用方式，要对传入的参数做判断以实现多种调用方式，如果我们定义一个add方法，如果不传参数返回10，如果传一个参数返回10+参数，如果传两个参数返回相加的结果

```js
function add(){
    //获取参数
    var arg = arguments;
    //获取参数长度
        len = arg.length;
    switch(len){
        case 0:
            return 10;
        case 1:
            return 10 + arg[0];
        case 2:
            return arg[0] + arg[1];
    }
}

//测试
console.log(add());
console.log(add(5));
console.log(add(6,7));
```

### 类形式实现

```js
function Add(){
    function zero(){
        return 10;
    }
    function one(num){
        return 10+num;
    }
    function two(num1,num2){
        return num1+num2
    }
    //相加共有方法
    this.add = function(){
        var arg = arguments;
    	//获取参数长度
            len = arg.length;
    switch(len){
        case 0:
            return zero();
        case 1:
            return one(arg[0]);
        case 2:
            return two(arg[0],arg[1]);
    }
}
    
//测试
var A = new add();
console.log(A.add());
console.log(A.add(5));
console.log(A.add(6,7))
```

