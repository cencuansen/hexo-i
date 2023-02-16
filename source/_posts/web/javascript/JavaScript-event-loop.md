---
title: JavaScript 事件循环
date: 2023-02-13 16:30:17
tags:
  - JavaScript
  - Event Loop
categories:
  - JavaScript
---

# 关键词

宏任务 & 微任务

# 意义

让 JavaScript 在单线程环境中处理异步操作，不阻塞主线程，保证程序的流畅性，如：用户输入、网络请求、动画等。

# 细分

宏任务：IO、setTimeout、setInterval；
微任务：Promise、process.nextTick、MutationObserver；

# 浏览器环境

1. 同步代码
2. 一个宏任务
3. 全部微任务 + 新产生的微任务
4. 一个宏任务
5. 全部微任务 + 新产生的微任务
6. ...

# Node.js 环境

| 阶段              | 说明                                                          |
| :---------------- | :------------------------------------------------------------ |
| timers            | 执行 setTimeout、setInterval 回调                             |
| pending callbacks | 执行上一轮循环少数未执行的 I/O 回调                           |
| idle, prepare     | 仅 node 内部使用                                              |
| poll              | 执行 timers、setImmediate、close 之外的大部分回调，如网络连接 |
| check             | 执行 setImmediate 回调                                        |
| close callbacks   | 执行 socket.close 回调                                        |

# 环境差异

- 浏览器中，微任务在宏任务之后执行；
- Node.js 中，微任务在各阶段之间执行：一个阶段执行完毕，就去执行微任务。
