---
title: CLR new
tags:
  - CLR
  - CSharp
categories:
  - CLR
date: 2023-02-15 12:52:56
---

CLR 要求对象都用 new 创建。

new 实例化对象：

1. 计算类和基类中所有实例字段的`总字节`数，外加类型对象指针、同步块索引字节数；
2. 从托管堆中分配所需空间，空间数据都置为 0；
3. 初始化对象的类型对象指针、同步块索引成员；
4. 如果实现了 Finalize 方法，对象地址会被放到`终结器队列`；
5. 调用类的实例`构造函数`，传递必要的参数；

类型对象指针又叫做方法表指针(MT)；