---
title: JavaScript 继承
date: 2023-02-14 16:44:17
tags:
  - JavaScript
  - Inherit
categories:
  - JavaScript
---

# ES6 继承

```JavaScript
class Parent {  }
class Child extends Parent {  }
```

# 寄生组合式继承

```JavaScript
function clone(parent, child) {
  // 该操作将 Parent 原型中属性方法等带到 Child
  child.prototype = Object.create(parent.prototype);
  child.prototype.constructor = child;
}

function Parent() {
  this.name = "parent";
  this.play = [1, 2, 3];
}

Parent.prototype.getName = function() { return this.name; };

function Child() {
  // 该 call 操作会将 Parent 自身的属性字段带到 Child
  Parent.call(this);
  this.friends = "child";
}

clone(Parent, Child);

Child.prototype.getFriends = function() {
  return this.friends;
};
```
