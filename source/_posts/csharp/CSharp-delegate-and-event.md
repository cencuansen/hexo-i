---
title: CSharp 委托和事件
tags:
  - CSharp
  - Delegate
  - Event
categories:
  - CSharp
date: 2023-02-15 09:29:35
---

# 委托

委托约定`方法签名`，引用一个或多个方法，调用委托就是调用委托引用的全部方法。

# 事件

类或对象通过事件向其他类或对象`通知`发生的相关事情。
事件只能在定义的类内部调用；

# 示例

```c#
using System;
namespace SimpleTest
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            Publisher publisher = new Publisher();
            Subscriber subscriber = new Subscriber(publisher);
            // 触发事件
            publisher.Trigger();
            Console.ReadLine();
        }
    }

    /// <summary>
    /// 发布者
    /// </summary>
    public class Publisher
    {
        public delegate void NoticeHandler(string message);
        public event NoticeHandler OnNotice;

        public void Trigger()
        {
            // 传递事件及参数
            OnNotice?.Invoke("警告！警告！警告！警告");
        }
    }

    /// <summary>
    /// 订阅者
    /// </summary>
    public class Subscriber
    {
        public Subscriber(Publisher pub)
        {
            //订阅事件
              pub.OnNotice += NoticeHandler;
        }

        /// <summary>
        /// 订阅事件后的响应函数
        /// </summary>
        /// <param name="message"></param>
        private void NoticeHandler(string message)
        {
            Console.WriteLine($"Notice Handler Got Message: {message}");
        }
    }
}

```

```c#
using System;

namespace MyConsole
{
    public delegate string DelegateFun(string word);

    public class Test
    {
        public event DelegateFun EventSay;
        public DelegateFun DelegateSay;
        public void DoEventSay(string str)
        {
            if (EventSay != null)
            {
                EventSay(str);
            }
        }
    }

    internal static class Program
    {
        private static void Main(string[] args)
        {
            Test t = new Test();
            t.EventSay += Say1;
            t.DelegateSay += Say1;
            t.DelegateSay += Say2;

            // 错误 事件不能在外部直接调用
            // t.eventSay("eventSay");

            // 正确 事件只能在声明的类内部调用
            t.DoEventSay("eventSay");

            // 正确。委托可以在外部直接调用，内部调用也行，还能有返回值，返回最后一个注册的方法的返回值
            string str = t.DelegateSay("deleSay");

            Console.Read();
        }

        private static string Say1(string word)
        {
            Console.WriteLine(word);
            return "return " + word;
        }

        private static string Say2(string word)
        {
            Console.WriteLine(word);
            return "return " + word + " 2";
        }
    }
}

```
