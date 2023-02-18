---
title: CLR AppDomain
tags:
  - CLR
  - CSharp
categories:
  - CLR
date: 2023-02-18 11:25:29
---

# 含义

代表一个应用程序的独立执行环境，在一个进程内可以存在多个 AppDomain。
这就允许不同的应用程序或组件运行在同一个进程中，但是它们相互隔离，不共享状态。
隔离不同的应用程序和组件，以保证程序的安全和稳定性，比如第三方不受信任的代码。

# 特点

两个 AppDomain 中对象无法直接相互访问；
AppDomain 可以卸载，程序集不行；
AppDomain 可以单独保护；
AppDomain 可以单独配置；

# 跨 AppDomain

按引用封送（Marshal-by-Reference）和按值封送（Marshal-by-Value）。

# Custom Marshaling

封送是 Marsal 类提供的一组方法：

- 分配非托管内存；
- 托管内存数据复制到非托管内存；
- 执行非托管函数；

用于与非托管代码交互、调用从动态链接库（DLL）导出的函数或实现数据类型的自定义封送处理。
