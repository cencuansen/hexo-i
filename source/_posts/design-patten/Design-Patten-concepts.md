---
title: Design Patten 概念
tags:
  - Design Patten
categories:
  - Design Patten
date: 2023-03-04 22:18:58
---

# 分类

创建型、结构型、行为型。
创建型：关注对象的创建，花式实例化对象。
结构型：关注类与类之间的关系，组合优于继承。
行为型：关注对象和行为的关系（类和方法间关系），方法到底放哪。

| 创建型       | 结构型     | 行为型       |
| ------------ | ---------- | ------------ |
| 单例模式     | 适配器模式 | 策略模式     |
| 工厂模式     | 装饰器模式 | 模板方法模式 |
| 工厂方法模式 | 代理模式   | 观察者模式   |
| 原型模式     | 外观模式   | 迭代子模式   |
| 建造者模式   | 桥接模式   | 责任链模式   |
|              | 组合模式   | 命令模式     |
|              | 享元模式   | 备忘录模式   |
|              |            | 状态模式     |
|              |            | 访问者模式   |
|              |            | 中介者模式   |
|              |            | 解释器模式   |

# 工厂模式

用来创建对象。
应用场景：IOC 容器就是一个常见的工厂，负责产生实例对象。

# 单例模式

类只被实例化一次。
应用场景：数据库连接池、缓存、日志记录器等。

1. 懒汉
2. 饿汉
3. 双检锁
4. lazy(.NET)

```csharp
public class LazySingleton
{
  private static readonly Lazy<LazySingleton> _instance = new Lazy<LazySingleton>(() => new LazySingleton());
  public static LazySingleton Instance => _instance.Value;
  private LazySingleton() { }
}
```

# 适配器模式

抹平类之间的兼容性问题，核心思想就是封装。
应用场景：

1. 电源适配器：转化电流电压等，使电器能正常充电；
2. EF 对不同数据库的同时支持；

# 代理模式

封装原对象，外部使用代理对象。代理模式只应该添加通用逻辑，不添加业务逻辑。
应用场景：

1. VPN、代理商
2. 在代理对象中进行日志、异常、缓存、权限等处理。
3. 使用动态代理模式来实现 AOP。

# 责任链模式

目标对象在流程上被每个部分依次处理。
应用场景：

1. DOM 上的事件冒泡、事件捕获；
2. 审批流；
3. WebAPI 中的请求管道；

# 享元模式

资源复用共享形式。Java、C# 等，用于减少创建对象的数量，减少内存占用。
应用场景：C# 或 Java 对字符串对象的创建，类似于享元模式。

# 原型模式

在父子模式下，对通用功能、数据进行复用。
应用场景：JavaScript 中原型中存放通用字段或方法。
