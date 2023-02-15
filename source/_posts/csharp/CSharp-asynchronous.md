---
title: CSharp 异步
tags:
  - CSharp
  - Asynchronous
  - Synchronous
  - Task
  - async/await
categories:
  - CSharp
date: 2023-02-15 09:30:32
---

# 同步

同步编程中代码逻辑按`顺序执行`，处理长时间运行的操作（如：IO 操作）时会导致性能问题：软件速度缓慢且无响应。

# 异步

异步编程对于长时间运行或 I/O 密集型的操作，会`释放主线程`以执行其他任务，效率更高。
C# 中，异步编程是使用 Task 和 async/await 关键字等来实现的。

# Thread

线程是最基本的工作单元，有自己的栈和内核资源，共用进程资源。

# ThreadPool

线程池是一堆线程的包装器，由 CLR 维护，当有任务需要处理，先用已创建的空闲线程来执行任务，如果没有空闲线程，可能会创建新线程，也可能会等待。
线程池适合`不需要结果`的`短时操作`。

# Task

1. .NET 4 推出 Task，.NET 4.5 推出 async/await；
2. Task 基于`池线程`，不是全局线程池，而是本地线程池，避免线程资源竞争；
3. Task 提供了丰富的 API 来管理线程、控制；
4. Task 依赖于 CPU，对于多核的 CPU，性能更佳；
5. 创建一个 task 也有 3 种方式：
   前面 2 种是一样的，不需要用 start 来开始执行，后面一种需要 start 来执行。

   - Task.Factory.StartNew()
   - Task.Run()
   - new Task()

6. 对比 Thread、ThreadPool ，Task 原生支持`延续`、`取消`、`失败通知`；
7. Task 不应该用于执行长时任务;

```c#
Task<string> task1 = Task.Run<string>(() => "something to do");
// 在获取Result结果时会阻塞线程
var result = task1.Result;
```

# async/await

async/await 用于简化异步代码的编写和理解，以更加自然的方式编写异步代码，避免`回调地狱`和复杂的状态机。
async 修饰的方法表示这是一个异步方法，而 await 表示等待异步方法执行完成。
使用 await 等待一个异步方法时，程序将暂停执行当前方法，等待异步方法完成，然后继续执行后续代码。
async/await 更适合处理 `I/O 密集型` 操作，或 UI 事件响应；
