---
title: 模块化编程
date: 2019-5-01 16:00:54
categories: Node.js
---

随着 Web 技术的蓬勃发展和依赖的基础设施日益完善，前端领域逐渐从浏览器扩展至服务端（Node.js），桌面端（PC、Android、iOS），乃至于物联网设备（IoT），其中 JavaScript 承载着这些应用程序的核心部分，随着其规模化和复杂度的成倍增长，其软件工程体系也随之建立起来（协同开发、单元测试、需求和缺陷管理等），模块化编程的需求日益迫切。

JavaScript 对模块化编程的支持尚未形成规范，难以堪此重任；一时间，江湖侠士挺身而出，一路披荆斩棘，从刀耕火种过渡到面向未来的模块化方案；

# 初识模块化思想

## 模块化的概念

模块化是一种生产方式，这种方式体现了两个特点

（1）生产效率高

（2）维护成本低

## 模块化开发

非模块化开发会遇到哪些问题

1. 命名冲突

```js
//全局变量中名称重复
var foo = 'bar';
var foo = 'brz';
//另外若引用第三方的库，在全局对象中声明了一个属性foo，自己的代码中有同样的名称，后加载的会替换之前的
```

2. 文件依赖

```html
<srcipt src='./ccc.js'></srcipt>
<srcipt src='./a.js'></srcipt>
<srcipt src='./b.js'></srcipt>
<srcipt src='./c.js'></srcipt>
<srcipt src='./d.js'></srcipt>
<srcipt src='./aaa.js'></srcipt>
<!--->.aaa,js依赖于./a.js,若调换顺序则会出错，模块化开发并不需要将所有的文件引入<!--->
```

# 模块化编程的演变

## 全局函数

```html
<!--->计算器的例子<!--->
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>模块化开发演变-全局函数</title>
</head>
<body>
	<input type="text" id='x'>
	<select name="" id="opt">
		<option value="0">+</option>
		<option value="1">-</option>
		<option value="2">*</option>
		<option value="3">/</option>
	</select>
	<input type="text" id='y'>
	<button id='cal'>=</button>
	<input type="text" id='result'>

	<script>

		//定义计算函数
		function add(x,y){
			return parseInt(x)+parseInt(y);
		}

		function subtract(x,y){
			return parseInt(x)-parseInt(y);
		}

		function multiply(x,y){
			return parseInt(x)*parseInt(y);
		}

		function divide(x,y){
			return parseInt(x)/parseInt(y);
		}

		//获取Dom
		var oX = document.getElementById('x');
		var oY = document.getElementById('y');
		var oOpt = document.getElementById('opt');
		var oCal = document.getElementById('cal');
		var oResult = document.getElementById('result');

		//为等号按钮添加单击事件
		oCal.addEventListener('click', function(){
			var x = oX.value;
			var y = oY.value;
			var opt = oOpt.value;
			var result = 0;
			switch(opt){
				case '0':
					result = add(x,y);
					break;
				case '1':
					result = subtract(x,y);
					break;
				case '2':
					result = multiply(x,y);
					break;
				case '3':
					resule = divide(x,y);
					break;
			}
			oResult.value = result;
		})
	</script>
</body>
</html>
```

全局函数这种编程方式很常见，但是不可取，无法保证全局变量不与其他模块的变量冲突。

## 对象命名空间

```html
	<script>
        
		//对象命名空间
        var calculator = {};
        
		//定义计算函数
		calculator.add(x,y){
			return parseInt(x)+parseInt(y);
		}

		calculator.subtract(x,y){
			return parseInt(x)-parseInt(y);
		}

		calculator.multiply(x,y){
			return parseInt(x)*parseInt(y);
		}

		calculator.divide(x,y){
			return parseInt(x)/parseInt(y);
		}

		//获取Dom
		var oX = document.getElementById('x');
		var oY = document.getElementById('y');
		var oOpt = document.getElementById('opt');
		var oCal = document.getElementById('cal');
		var oResult = document.getElementById('result');

		//为等号按钮添加单击事件
		oCal.addEventListener('click', function(){
			var x = oX.value;
			var y = oY.value;
			var opt = oOpt.value;
			var result = 0;
			switch(opt){
				case '0':
					result = calculator.add(x,y);
					break;
				case '1':
					result = calculator.subtract(x,y);
					break;
				case '2':
					result = calculator.multiply(x,y);
					break;
				case '3':
					resule = calculator.divide(x,y);
					break;
			}
			oResult.value = result;
		})
	</script>
```

用于计算的4个函数的命名冲突问题解决了，但是如果再定义一个名为calculator的命名空间还是会报错，虽然减少了命名冲突的问题，但是命名冲突还是存在。另外还会出现子命名空间的情况。

```js
calculator.subcal = {};
calculator.subcal.foo = 'bar';//命名空间越来越长，代码可读性差
```

##  函数的作用域（闭包）

```js
	<script>
        
		//利用匿名自执行函数形成的封闭的函数作用域空间，达到私有化的目的。
        
        var calcultor = (function(){
            function add(x,y){
			return parseInt(x)+parseInt(y);
            }

            function subtract(x,y){
                return parseInt(x)-parseInt(y);
            }

            function multiply(x,y){
                return parseInt(x)*parseInt(y);
            }

            function divide(x,y){
                return parseInt(x)/parseInt(y);
            }
            return{
                add:add,
                subtract:subtract,
                multiply:multiply,
                divide:divide
            }
        })();


		//获取Dom
		var oX = document.getElementById('x');
		var oY = document.getElementById('y');
		var oOpt = document.getElementById('opt');
		var oCal = document.getElementById('cal');
		var oResult = document.getElementById('result');

		//为等号按钮添加单击事件
		oCal.addEventListener('click', function(){
			var x = oX.value;
			var y = oY.value;
			var opt = oOpt.value;
			var result = 0;
			switch(opt){
				case '0':
					result = calculator.add(x,y);
					break;
				case '1':
					result = calculator.subtract(x,y);
					break;
				case '2':
					result = calculator.multiply(x,y);
					break;
				case '3':
					resule = calculator.divide(x,y);
					break;
			}
			oResult.value = result;
		})
	</script>
```

上述方法中，用于计算的4个方法被封装到了立即执行匿名函数中，添加返回值后，在全局可以通过“匿名函数.函数名（）”进行调用，这样有效的公开了公有方法，并且可以隐藏一些私有属性和元素，大部分第三方库都使用这种形式，例如jQuery。

## 维护和扩展

若现在需要添加取余方法，传统方式是在匿名函数中添加一个方法

```js
var calcultor = (function(){
            function add(x,y){
			return parseInt(x)+parseInt(y);
            }

            function subtract(x,y){
                return parseInt(x)-parseInt(y);
            }

            function multiply(x,y){
                return parseInt(x)*parseInt(y);
            }

            function divide(x,y){
                return parseInt(x)/parseInt(y);
            }
    		
    		function mod(x,y){
                return parseInt(x)%parseInt(y);
            }
    
            return{
                add:add,
                subtract:subtract,
                multiply:multiply,
                divide:divide,
                mod:mod
            }
        })();
```

试想一下，如果这个计算模块由第三方库提供，难道要修改源码？

其实可以通过参数的形式将原来的模块和第三方库传递出去。

```js
//传递参数cal
var calcultor = (function(cal){
            function add(x,y){
		   	    return parseInt(x)+parseInt(y);
            }

            function subtract(x,y){
                return parseInt(x)-parseInt(y);
            }

            function multiply(x,y){
                return parseInt(x)*parseInt(y);
            }

            function divide(x,y){
                return parseInt(x)/parseInt(y);
            }
    		
    		function mod(x,y){
                return parseInt(x)%parseInt(y);
            }
    
            
                cal.add = add;
                cal.subtract = subtract;
                cal.multiply = multiply;
                cal.divide = divide;
                return cal;
            
        })(calculator||{});

//下面的calculator已经把上面的给覆盖掉了
//注意：在进行扩展的时候，优先查找要扩展的对象是否已经存在
var calculator = (function(cal){
    cal.mod = function(x,y){
        return x%y;
    }
})(calculator||{});
//当扩展该模块时，判断calculator是否存在，存在就使用存在的，不存在就重新创建

		//获取Dom
		var oX = document.getElementById('x');
		var oY = document.getElementById('y');
		var oOpt = document.getElementById('opt');
		var oCal = document.getElementById('cal');
		var oResult = document.getElementById('result');

		//为等号按钮添加单击事件
		oCal.addEventListener('click', function(){
			var x = oX.value;
			var y = oY.value;
			var opt = oOpt.value;
			var result = 0;
			switch(opt){
				case '0':
					result = calculator.add(x,y);
					break;
				case '1':
					result = calculator.subtract(x,y);
					break;
				case '2':
					result = calculator.multiply(x,y);
					break;
				case '3':
					result = calculator.divide(x,y);
					break;
			}
			oResult.value = result;
		})
```

把模块化思想带入编程中，可以解决命名冲突和文件依赖等问题，后面会介绍Node.js是一个高度模块化的平台。



