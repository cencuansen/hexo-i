---
title: CSharp dispose
tags:
  - CSharp
  - Dispose
categories:
  - CSharp
date: 2023-02-14 23:37:48
---

# IDisposable.Dispose

对于`非托管资源`建立和释放，C# 约定由 Dispose 方法来处理。
当类库中涉及到非托管资源，就应实现 Dispose 方法，来定义资源释放逻辑。
using 用来管理实现了 Dispose 方法的类，编译器会在作用域结束时调用 Dispose 方法。
非托管资源包括：网络请求，数据库连接，句柄等。

# 标准 dispose 模式

1. 析构函数中调用 dispose 方法，托底防忘记调用；
2. dispose 中最后要调用 GC.SuppressFinaliza 方法，通知 CLR 无需执行析构函数，因为清除工作已完成；
3. 多次调用 dispose 应该是安全的，dispose 方法调用后，后续再调用都不会执行额外的工作；
4. dispose 方法有 2 个重载：public 和 protected，protected 真实清除，public 调用 protected；
5. 析构函数调用 protected；
6. protected 的 bool 参数区分是被析构函数调用（false）还是被 public 调用（true）；

```c#
using System;
using System.Runtime.InteropServices;

namespace MyConsole.DisposeDemo
{
    /// <summary>
    /// 用于模拟一个托管资源
    /// </summary>
    public class SomeManagedResource
    {
        public SomeManagedResource(string name)
        {
            Name = name;
        }

        public string Name { get; }
    }

    /// <summary>
    /// 用于模拟一个非托管资源
    /// </summary>
    public class MyUnmanagedResource : IDisposable
    {
        // 模拟一个非托管资源
        private IntPtr someUnmanagedResource = Marshal.AllocHGlobal(100);
        // 模拟一个托管资源
        private SomeManagedResource managedResource = new SomeManagedResource("这是托管资源");
        // 是否被清理过的标识
        protected bool baseDisposed = false;

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool isDisposing)
        {
			// 确保多次执行的安全性
            if (baseDisposed)
            {
                return;
            }
        	// 被 public 调用，需要额外清理托管资源
            if (isDisposing)
            {
                // 要调用 SuppressFinaliza，需手动清理托管资源, 否则无法释放。
                if (managedResource != null)
				{
                    managedResource = null;
                }
            }
            // 清理非托管资源
            if (someUnmanagedResource != IntPtr.Zero)
            {
                Marshal.FreeHGlobal(someUnmanagedResource);
                someUnmanagedResource = IntPtr.Zero;
            }
            baseDisposed = true;
        }

        ///<summary>
        /// 必须，以防忘记调用 Dispose 方法的托底方法
        ///</summary>
        ~MyUnmanagedResource()
        {
            // 必须为false
            Dispose(false);
        }
    }
}
```

# Finalize

1. 无法显式的重写 Finalize 方法，只能通过析构函数语法形式来实现。
2. struct 中不允许定义析构函数，只有 class 中才可以，并且只能有一个。
3. Finalize 方法不能被继承或重载。
4. 执行垃圾回收之前系统会自动执行 Finalize 操作。
5. Finalize 方法会极大地损伤性能。
