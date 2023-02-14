---
title: JavaScript 词法作用域和动态作用域
date: 2023-02-13 21:40:43
tags: JavaScript
---

# 说明

JavaScript 中，`变量`采用的是`词法作用域`。

# 词法作用域/静态作用域

作用域在变量`定义时`就确定。

# 动态作用域

作用域在变量`使用时`才确定。

# 验证

```JavaScript
var value = 1;

function foo() {
  console.log(value);
}

function bar() {
  var value = 2;
  foo();
}

bar();
```

这里 bar 中 foo 的 value 输出为 1，说明变量在函数定义时就确定了，属于词法作用域。
如果是动态作用域，bar 中 foo 的 value 值就应当等于 2。

# 问题

问：this 是动态作用域吗？
答：不是。
