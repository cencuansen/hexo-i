---
title: CSharp 基础知识
tags:
  - CSharp
categories:
  - CSharp
date: 2023-02-14 22:49:07
---

# string.Empty、`""`、 null。

Empty 是 string 类中的一个静态的只读字段。
string.Empty 和`""`是一样的。
string str = null 表示 str 未指向任何对象。

# string 和 StringBuilder

string 是不可变对象，string 是 String 的别名，string 是 c#中的类，String 是 Framework 的类，编译器会把 string 编译成 String。
StringBuilder 为动态字符串。StringBuilder 当达到容量时，将自动分配新的空间且容量翻倍。

# 扩展方法

向现有类型“添加”方法，无需派生、重新编译或修改原始类型。
扩展方法是一种静态类中的静态方法。
扩展方法第一个参数是 this 修饰的被扩展的类。

# 装箱和拆箱

装箱：值类型 -> 引用类型 。
拆箱：引用类型 -> 值类型。
一次装箱要分配内存（托管堆）和拷贝数据（从栈到托管堆）。
拆箱就是装箱的相反操作。

# 更改已装箱的对象

已装箱的对象，无法直接调用其指定方法。
让类对象继承一个接口，借助接口方式来更改已装箱的对象中的数据。

```c#
public interface ISomeClass {
  void Change(int x);
}

public class SomeClass : ISomeClass
{
  public int x { get; set; }
  public void Change(int x)
  {
    this.x = x;
  }
}

SomeClass some = new SomeClass();
some.x = 100;
Object o = some; // 装箱
((SomeClass)o).Change(200); // 没改掉。
((ISomeClass)o).Change(200); // 改掉了。
```

# new 关键字

- 运算符：创建对象实例。
- 修饰符：在派生类定义一个重名的方法，隐藏基类方法。
- 约束：泛型约束，表示泛型类型要有 public 修饰的无参构造。

```c#
  public class ItemFactory<T> where T : IComparable, new()
  {  }
```

# new 和 override

new 和 override 都可用覆盖基类同名方法；
new 覆盖基类不完全，父类引用子类实例时，能调用到基类方法，override 覆盖基类是彻底的，一旦子类 override 基类方法后，就无法再调用基类同名方法。

```c#
class Parent
{
  public virtual string Say ()
  {
    return "I am parent";
  }
}

class Child1 : Parent
{
  public override string Say ()
  {
    return "I am child1";
  }
}

class Child2 : Parent
{
  public new string Say ()
  {
    return "I am child2";
  }
}

// 父类引用子类实例
Parent instance1 = new Child1();
// I am child1
string who1 = instance1.Say();

// 父类引用子类实例
Parent instance2 = new Child2();
// 注意，这里就能调用到基类方法，结果为：I am parent
string who1 = instance2.Say();
```

# int? 和 int

可空类型，默认值可以是 null。
int? 是通过 int 装箱为引用类型实现。
`Nullable.GetUnderlyingType(typeof(int?)) != null` 用来判断类型是否是可空类型

# 委托

约定方法签名，来对方法进行引用，类似指针，方法能当参数传递给形参，用于事件、回调等。

# const 和 readonly

readonly 运行时常量。
const 编译时常量。
readonly 常量只能声明为类字段。
const 除了类字段，还可以声明为方法中的局部常量，默认为静态类型，不能用 static 修饰。

# CTS、CLS、CLR

CTS：通用类型系统；
CLS：通用语言规范；
CLR：公共语言运行库；

# using

- 引用命名空间。
- using 一个非托管资源（IDisposiable），用来释放资源。

# 托管资源、非托管资源

托管资源指的是.NET 可以自动进行回收的资源，主要是指托管堆上分配的内存资源。
非托管资源指的是.NET 不知道如何回收的资源，最常见的是包装操作系统资源的对象，例如文件，窗口，网络连接，数据库连接，画刷，图标等。
建议通过调用 IDisposable.Dispose()方法来回收非托管资源。

# ref、out、in

相同：都是按引用传递，形参成为实参的别名；
不同：ref 在方法外需初始化；out 需在方法内赋值；in 在方法内是只读的。

```c#
static void Main(string[] args)
{
  //初始化
  int number = 50;
  Console.WriteLine("调用方法前 number 值：" + number);
  RefFunction(ref number);
  Console.WriteLine("调用方法后 number 值：" + number);
  Console.Read();
}

// 传入的参数值是 50 ，方法中使用的 num 值也是 50
static void RefFunction(ref int num)
{
  num = num / 2;
}
```

```c#
static void Main(string[] args)
{
  int number = 50;
  Console.WriteLine("调用方法前 number 值：" + number);
  OutFunction(out number);
  Console.WriteLine("调用方法后 number 值：" + number);
  Console.Read();
}

// 无法将的参数值 50 传入 ，但是必须在方法中初始化
static void OutFunction(out int num)
{
  //初始化
  num = 120;
  num = num / 2;
}
```

# in 的意义

结构体实例数据分配在栈上，当需要将大数据量的结构体作为方法参数时，会复制一份该大结构体，成本有点高，使用 in 来按引用传递该大结构体，就能避免复制问题。

# ref、out、in 使用限制

async 修饰的异步方法中无法使用；
迭代器方法（含有 yield return 或 yield break 的方法）中无法使用；
扩展方法的第一个参数不能有 in 修饰符，除非该参数是结构体；
扩展方法的第一个参数，其中该参数是泛型类型（即使该类型被约束为结构体）；

# Equals 和 ==

== 值类型数据比较的是值，引用类型比较的是引用地址。
Equals 引用类型比较的是最终数据。

# as 和 is

is 判断对象是否兼容于某类型，返回 bool 值，永远不会抛出异常。
as 用于在兼容的引用类型之间执行转换。无法转换则为 null。
is 需要做两次对象的类型检查，而 as 需要做一次对象类型检查。

# 访问修饰符

public：共有的，访问不受限制；
private：私有的，只能在当前类中访问；
internal：内部的，只能在当前程序集中访问；
protected：受保护的，只能在当前类或其派生类中访问；
file：当前文件范围，C# 11 新增；
protected internal：受保护的内部成员，当前程序集或派生自包含类的类型可访问；
private protected：私有受保护的成员，当前程序集中的包含类或从包含类派生的类型可访问；
class 默认 internal，class member 默认 private。

# class 成员、interface 成员

class 成员：字段、常量、属性、方法、事件、运算符、索引器、构造函数、终结器、嵌套类型。
interface 成员：方法、属性、索引器和事件

# 类的执行顺序

父类，子类，静态块，静态字段，非静态块，非静态字段，构造器，方法

# 数据类型和内存占用

1 byte bool、byte
2 byte char、short
4 byte int、float
8 byte long、double
16 byte decimal

# 多态

编译时多态和运行时多态。

## 编译时多态

重载编译时多态。根据签名不同分为不同的方法，编译后就成两个不同名函数。

## 运行时多态

虚方法是运行时多态，父类中有虚方法，子类覆盖实现虚方法。

# 浅拷贝和深拷贝

在浅拷贝中，仅对顶级对象进行了复制，对低级别对象进行了引用。
在深拷贝中，会复制所有对象。

## 浅拷贝

继承 ICloneable，实现 Clone()方法，方法中调用 MemberwiseClone()；
如果字段是值类型，则执行字段的按位复制；如果字段是引用类型，引用将复制，但被引用的对象不会被复制。

# 协变和逆变

in 逆变，out 协变。
赋值的兼容性，用在委托或者接口上。
需要`返回数据`，这种结构化的委托有效性之间的关系叫做协变，用 out 标记泛型类型。
需要`接受数据`，期望传入基类时允许传入派生对象的特性叫逆变，用 in 标记泛型类型。
协变：

- IEnumerable<out T>
- IEnumerator<out T>
- IQueryable<out T>
- IGrouping<out TKey, out TElement>

逆变：

- IComparer<in T>
- IEqualityComparer<in T>
- IComparable<in T>
- Action<in T>
- Predicate<in T>
- Comparison<in T>

协变 + 逆变：

- TOutput Converter<in TInput, out TOutput>

# object 和 dynamic

object 是一种引用类型，表示 .NET 框架中的任何类型。它是所有引用类型的基类，允许将任何类型的对象存储在这个变量中。
dynamic 是 C# 中的一个关键字，在编译时将变量的类型指定为 dynamic ，对象的实际类型将在运行时确定，这在使用没有特定类型定义的 API 或库时非常有用。

## 总结

object 是`基类`，可以存储任何引用类型；
dynamic 是`关键字`，在编译时跳过类型检查，在运行时确定类型。

## 场景

object 在我们不知道数据类型时很有用。
dynamic 更多是用在反射，支持动态语言，COM 对象调用以及获取 LINQ 的查询结果。

```c#
object a = "Rohatash Kumar";
string a1 = a.ToString();

dynamic a = "Rohatash Kumar";
string a1 = a;
```

# 抽象类和接口

- 都能有默认实现；
- 都不能直接实例化；
- 抽象类单继承，接口多继承；
- 抽象类中可以有字段、属性、方法，接口中可以有属性、方法、索引器、事件，没有字段；
