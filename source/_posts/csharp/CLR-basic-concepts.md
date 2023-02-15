---
title: CLR 基本概念
tags:
  - CLR
  - CSharp
categories:
  - CLR
date: 2023-02-15 12:43:00
---

# CLR

Common Language Runtime，公共语言运行时，一种可被多种编程语言使用的运行时。

## 核心功能

内存管理、程序集加载、异常处理、线程同步、安全性。

## 托管模块

无论哪种语言(C++、C#、VB、F#等)，最后通过编译的结果都是托管模块。
托管模块是 PE32 文件或 PE32+ 文件，都需要 CLR 才能执行。

## IL

源代码经语言编译器编译生成.exe 或.dll 是 IL(Intermediate Language，中间语言)代码，CPU 不能直接执行。
通过 IL 代码可以了解程序执行的底层通用逻辑。

## JIT

Just In Time，即时编译，以方法为单位，将 IL 编译成本机 CPU 指令。
JIT 是按需编译的，来最小化启动开销，未被使用的方法 JIT 不编译，小而多的方法优于大而少的方法。
JIT 对小而简单(局部变量少，控制分支简单)的方法进行登记(enregistration)，将局部变量存到寄存器中，访问效率比堆栈更高。

# CTS

Common Type System，通用类型系统，描述类定义和行为，让不同编程语言能互通。

1. 类的成员：字段、属性、方法、事件等；
2. 类和成员的可见性：

   - public
   - internal
   - protected
   - private

3. 类只能单继承。一个类型只能从一个基类派生；
4. 所有类都继承自 System.Object。

# CLS

Common Language Specification，公共语言规范。
有的语言不区分大小写，有的语言不支持无符号整数、操作符重载。
为了不同语言程序可以进行相互通信，CLS 去定义`最小可通用`功能集合，让不同语言编译器去支持这些规范，生成的程序彼此间达到兼容目的。
