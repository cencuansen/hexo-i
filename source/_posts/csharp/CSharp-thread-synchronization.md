---
title: CSharp 线程同步
tags:
  - CLR
  - CSharp
  - Thread Synchronization
categories:
  - CSharp
date: 2023-02-15 10:27:06
---

# 概念

线程同步指的是线程之间的协调，以确保它们不会同时执行并彼此冲突。
目标是保持数据完整性，避免多个线程同时访问`共享资源`时可能出现的`竞争`。

# 分类

- 内核模式
- 用户模式
- 混合模式

# 内核模式

涉及上下文切换（线程或进程切换），比较消耗操作系统资源。

- Mutex
- Event
- Semaphore
- ReaderWriterLock

# 用户模式

轮询 CPU，避免上下文切换，合适短时操作。

- Volatile
- SpinLock
- SpinWait
- Interlocked

# 混合模式

用户模式 + 内核模式。

- Barrier
- Monitor/lock
- SemaphoreSlim
- CountDownEvent
- ManualResetEventSlim
- ReaderWriterLockSlim

# 详细

## Mutex

互斥量，支持`线程互斥`和`进程互斥`
线程互斥：mutex.WaitOne、mutex.ReleaseMutex
进程互斥：new Mutex(true, "test", out flag)

- 参数 1：给调用线程赋予初始所有权限
- 参数 2：给互斥体取个名字
- 参数 3：如果赋予调用线程初始权限成功就返回 true，失败就返回 false。

## Event

有 AutoResetEvent、ManualResetEvent 等。
使用：event.WaitOne、event.Set
AutoResetEvent 只激活一个线程，ManualResetEvent 激活全部线程。
应用：两个线程`交互输出`数字

## Semaphore

Semaphore 信号量，支持`线程同步`和`进程同步`。
使用：semaphore.Wait、semaphore.Release
SemaphoreSlim 轻量级信号量，用于线程同步。
new SemaphoreSlim(int) 设定信号总数，限制总数，比如：限制数据库连接数。

## Volatile

volatile 修饰字段，用来告诉编译器，该字段会被多线程修改，不要对该字段进行访问优化（缓存优化），确保该字段值的多线程可见性。

```c#
public class Example
{
    public int x;
    public void DoWork()
    {
        x = 5;
        var y = x + 10;
    }
}
```

编译器第一次发现 y = 15，就尝试缓存这个结果，避免每次计算 y = x + 10，但 x 有可能被其他线程修改，不该缓存 y = 15。
解决方法：public volatile int x，表明 x 可能会被多线程修改。

## SpinLock

自旋锁，一个线程获取该锁，其他线程`自旋`等待，浪费 CPU，但避免上下文切换，功能与 lock 一样。

## Monitor/lock

混合锁，可重入，lock 是 Monitor 语法糖，lock 无法设置超时。
获得锁失败，线程会由运行转为阻塞，会出现上下文切换。
Monitor 可超时，避免无限等待出现死锁。
lock 原则：

1. 只读私有；
2. 禁用 this、typeof(type)、string；
3. 避免 MethodImplAttribute 同步；

# 同步构造选择逻辑

- 避免使用同步构造
- 优先选择混合模式，其次同步模式，最次内核模式
- 异步锁 SemaphoreSlim.WaitAsync

# 问题

## 为什么 lock 引用类型

同步块索引。
CLR 为堆内的对象分配同步索引，一个引用类型的同步索引不指向任何同步块数组中的同步块，说明没加锁，否则说明该对象被加锁了。
值类型没同步块索引，所以 lock 的只能是引用类型。

## lock 值类型会如何

值类型会被装箱，每次装箱后的对象都不一样，会导致锁定无效。

## lock 注意项

不要锁定 this，用无意义的 object 更好；
不要锁定一个类型对象，类型对象是全局的；
不要锁定一个字符串，因为字符串可能被驻留，不同字符对象可能指向同一个字符串；
不要使用[System.Runtime.CompilerServices.MethodImpl(MethodImplOptions.Synchronized)]，这个可以使用在方法上面，保证方法同一时刻只能被一个线程调用。它实质上是使用 lock 的，如果是实例方法，会锁定 this，如果是静态方法，则会锁定类型对象；

# 可超时线程同步

- Mutex：mutex.WaitOne(int)
- Monitor：Monitor.TryEnter(object, int)
- Semaphore：semaphore .WaitOne(int)
- AutoResetEvent：resetEvent.WaitOne(int)

# 示例

## 两个线程交互输出数字

```c#
var some = new SomeClass();
var t1 = new Thread(some.PrintEven) { Name = "even" };
var t2 = new Thread(some.PrintOdd) { Name = "odd" };
t1.Start();
t2.Start();
class SomeClass
{
    // 偶数
    AutoResetEvent even = new AutoResetEvent(false);
    // 奇数
    AutoResetEvent odd = new AutoResetEvent(false);
    volatile int number = 0;
    internal void PrintEven()
    {
        while (number <= 100)
        {
            $"{Thread.CurrentThread.Name} - {number++}".Dump();
            odd.Set();
            even.WaitOne();
        }
    }
    internal void PrintOdd()
    {
        odd.WaitOne();
        while (number <= 100)
        {
            $"{Thread.CurrentThread.Name} - {number++}".Dump();
            even.Set();
            odd.WaitOne();
        }
    }
}
```
