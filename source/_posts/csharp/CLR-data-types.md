---
title: CLR 数据类型
tags:
  - CLR
  - CSharp
  - Data Types
categories:
  - CLR
date: 2023-02-18 10:52:08
---

# C# 基元类型

指的是`不使用类`而直接定义的内置数据类型，由 C# 语言规范定义，属于语言层面，具有特定的语义和行为。

整数类型：sbyte、byte、short、ushort、int、uint、long 和 ulong
浮点类型：float 和 double
十进制类型：decimal
布尔类型：bool
字符类型：char
指针类型：指向其他类型的指针类型
空类型：void

# C# 复杂类型

结构体、枚举和类，是由基元类型组成的。

# CLR 内置类型

内置类型就是 .NET Framework System 命名空间中写好的类型。

## 值类型

bool、byte、char、decimal、double、enum、float、int、long、sbyte、short、struct、uint、ulong、ushort。

## 引用类型

object、string、dynamic。

## 特点

值类型是直接存储在`栈`中的，引用类型则是存储在`堆`中，而栈中存储的仅是指向堆中对象的引用。
值类型的内存管理由 CLR 自动处理，不需要手动释放，而引用类型则需要手动释放。

## 自定义类型

类、结构体、接口、委托。
自定义类型也称为“用户定义类型”或 “托管类型”。

# 问题

问：对比 object 和 dynamic
dynamic：派生自 object，在运行时动态解释，具有更多的`灵活性`和`动态性`，在运行时，编译器会根据实际类型执行`动态绑定`操作。
object：是静态类型。
