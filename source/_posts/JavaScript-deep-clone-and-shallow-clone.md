---
title: JavaScript 深拷贝和浅拷贝
tags:
  - JavaScript
  - Deep Clone
categories:
  - JavaScript
date: 2023-02-14 17:08:52
---

# 定义

浅拷贝：复制一层数据，基本类型直接复制，对象类型复制引用。
深拷贝：会递归复制。

# 浅拷贝

- 扩展运算符(`...`)
- Object.assign

# 深拷贝

- JSON.parse(JSON.stringify())
- 遍历递归

## JSON 化问题

1. 正则变成空对象(`{}`)；
2. 函数直接丢；
3. 日期变成时间字符串(无解)；
4. 构造函数丢失，变成 Object；
5. 循环引用无法正确处理；

## 遍历深拷贝

版本一

```JavaScript
function deepClone(obj, hash = new WeakMap()) {
  // 处理null或者undefined
  if (obj === null) return obj;
  // 处理日期类型
  if (obj instanceof Date) return new Date(obj);
  // 处理正则类型
  if (obj instanceof RegExp) return new RegExp(obj);
  // 普通值或函数不需要深拷贝
  if (typeof obj !== "object") return obj;
  // 对象进行深拷贝
  if (hash.get(obj)) return hash.get(obj);
  let cloneObj = new obj.constructor();
  // 找到的是所属类原型上的constructor,而原型上的 constructor指向的是当前类本身
  hash.set(obj, cloneObj);
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      // 实现一个递归拷贝
      cloneObj[key] = deepClone(obj[key], hash);
    }
  }
  return cloneObj;
}
```

版本二

```JavaScript
const isComplexDataType = obj => (typeof obj === 'object' || typeof obj === 'function') && (obj !== null)
const deepClone = function (obj, hash = new WeakMap()) {
  if (obj.constructor === Date) {
    // 日期对象直接返回一个新的日期对象
    return new Date(obj);
  }

  if (obj.constructor === RegExp) {
    // 正则对象直接返回一个新的正则对象
    return new RegExp(obj);
  }

  if (hash.has(obj)) {
    // 如果循环引用了就用 weakMap 来解决
    return hash.get(obj);
  }

  let allDescriptors = Object.getOwnPropertyDescriptors(obj);
  // 遍历传入参数所有键的特性
  let cloneObj = Object.create(Object.getPrototypeOf(obj), allDescriptors);

  // 继承原型链
  hash.set(obj, cloneObj)

  for (let key of Reflect.ownKeys(obj)) {
    cloneObj[key] = (isComplexDataType(obj[key]) && typeof obj[key] !== 'function')
      ? deepClone(obj[key], hash)
      : obj[key];
  }

  return cloneObj
}
```
