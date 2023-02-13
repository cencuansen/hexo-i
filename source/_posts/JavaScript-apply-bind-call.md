---
title: JavaScript apply、bind、call
date: 2023-02-13 20:53:10
tags: JavaScript
---

# 用途

apply、bind、call 用来改变函数内 this 指向

# 用法

```JavaScript
func.apply(this, [arg1, arg2 [,...]])
func.bind(this, arg1, arg2 [,...])
func.call(this, arg1, arg2 [,...])
```

# 区别

|  分类 | 说明                           |
| ----: | :----------------------------- |
| apply | 参数数组形式传，并调用对应函数 |
|  bind | 参数一个一个传，返回一个函数   |
|  call | 参数一个一个传，并调用对应函数 |

# 问题

问：一个方法连续 bind 多次，结果如何？
答：只有第一次 bind 有效果。
