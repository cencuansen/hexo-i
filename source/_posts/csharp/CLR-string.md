---
title: CLR 字符串
tags:
  - CLR
  - CSharp
categories:
  - CLR
date: 2023-02-18 10:46:05
---

# 特点

字符串属于引用类型，具有不可变性。

# 暂存池

暂存池(intern) 是 CLR 维护的哈希表(字典)，键是字符串，值是对堆中该字符串对象的引用。

1. 暂存池由 CLR 维护，其中所有字符串的值都不同；
2. 编译阶段字面量字符串会被添加到暂存池；
3. 运行时期，用 string.Intern() 将动态创建的字符串添加到暂存池；

# 三种方式

1. 用字面量；
2. 用 string.Intern()；
3. 用字面量 + 字面量拼接；

```c#
// a，b，c 指向的是同一个堆内存地址
string a = "this is string";
string b = string.Intern(new StingBuilder("this is string"));
string c = "this" + " is " + "string";
```

```c#
// str1 和 str2 字符串地址不同
var str1 = new string("abc");
var str2 = new string("abc");
```

```c#
// str1 和 str2 字符串地址不同
var str1 = "abc";
var str2 = new StringBuilder("abc").ToString();
```

```c#
// str1 和 str2 指向的是同一个堆内存地址
var charArr = new char['a', 'b', 'c'];
var str1 = charArr.ToString();
var str2 = charArr.ToString();
```
