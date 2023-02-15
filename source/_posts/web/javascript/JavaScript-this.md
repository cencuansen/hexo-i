---
title: JavaScript this
date: 2023-02-13 19:54:25
tags:
  - JavaScript
  - Function
categories:
  - JavaScript
---

# 普通函数

普通函数中的 this 是根据运行时上下文动态确定的，this 指向函数运行时所在上下文。

```JavaScript
let obj = {
  name: "san",
  func: function () {
    console.log(`name is ${this.name}`); // name is san
  }
};
```

# 箭头函数

箭头函数的中 this 在非运行期间就确定了，箭头函数的 this 和外层函数的 this 一致。

```JavaScript
let name = 'win';
let obj = {
  name: 'san',
  funcA: function () {
    (() => console.log(`name is ${this.name}`))(); // name is san
  },
  funcB: () => {
    // 这里箭头函数是 obj 下定义的，外层没有函数包裹，就会找到最外层的 window 对象上
    console.log(`name is ${this.name}`); // name is win
  }
}
```
