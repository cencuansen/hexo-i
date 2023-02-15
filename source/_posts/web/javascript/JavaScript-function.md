---
title: JavaScript 函数
date: 2023-02-13 20:00:45
tags:
  - JavaScript
  - Function
categories:
  - JavaScript
---

# 函数定义

## 一般形式

```JavaScript
function functionName(parameters) {  }
```

## 表达式形式

```JavaScript
var functionName = function (parameters) {  };
```

## 箭头函数形式

```JavaScript
(parameters) => {  }
```

# 提升（Hoisting）

提升特性让函数可以在声明之前调用，**使用表达式定义函数时，无法提升。**

```JavaScript
myFunction(5);
function myFunction(y) { return y * y; }
```

# 自调用函数

```JavaScript
(function(){  })();
(()=>{  })();
```

# 箭头函数特点

- 不能做构造函数，不能 new
- 没有 arguments，可用剩余参数代替
- 没有自己的 this，this 取决于箭头函数所在上下文
- apply、bind、call 无法影响 this 指向
- 没有原型属性
- 不能作为 Generator 函数，不能使用 yield
