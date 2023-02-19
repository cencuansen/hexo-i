---
title: RabbitMQ 实操
tags:
  - RabbitMQ
categories:
  - RabbitMQ
date: 2023-02-19 22:03:07
---

# Erlang 环境

需要配置 Er 语言环境。

## 下载

ttps://www.erlang.org/downloads

## 配置

windows 环境变量的 path 中添加 erlang 的 bin 文件夹。

# RabbitMQ

## 下载

windows 安装包：https://github.com/rabbitmq/rabbitmq-server/releases/download/v3.10.1/rabbitmq-server-3.10.1.exe

## 配置

1. windows 环境变量的 path 中添加 rabbitmq 的 sbin 文件夹。
2. 执行 `rabbitmq-plugins enable rabbitmq_management`。
3. 添加用户 `rabbitmqctl add_user [username] [password]`。
4. 为用户配置权限 `rabbitmqctl set_user_tags [username] administrator`。
5. 访问管理后台 http://localhost:15672，账号：guest，密码：guest。
6. 后台中配置用户权限：Admin - 点击用户名 - Set permission。

# 使用

创建 2 个 ASP.NET 项目。分别是生产端和消费端。

# 生产端

```c#
using RabbitMQ.Client;
using System;
using System.Text;

namespace MQProducer
{
  class Program
  {
    private static void Main(string[] args)
    {
      Console.WriteLine("生产者");
      // 创建连接工厂对象
      IConnectionFactory factory = new ConnectionFactory
      {
        HostName = "172.21.46.105",
        Port = 5672,
        UserName = "rabbit1",
        Password = "rabbit1"
      };
      // 创建连接对象
      IConnection con = factory.CreateConnection();
      // 创建连接会话对象
      IModel channel = con.CreateModel();

      string name = "demo";
      // 声明一个队列
      channel.QueueDeclare(
        queue: name,       // 消息队列名称
        durable: false,    // 是否持久化,true持久化,队列会保存磁盘,服务器重启时可以保证不丢失相关信息。
        exclusive: false,  // 是否排他,true排他的,如果一个队列声明为排他队列,该队列仅对首次声明它的连接可见,并在连接断开时自动删除.
        autoDelete: false, // 是否自动删除。true是自动删除。自动删除的前提是：致少有一个消费者连接到这个队列，之后所有与这个队列连接的消费者都断开时,才会自动删除.
        arguments: null);  // 设置队列的一些其它参数

      string str = string.Empty;

      do
      {
        Console.WriteLine("发送内容:");
        str = Console.ReadLine();
        // 消息内容
        byte[] body = Encoding.UTF8.GetBytes(str);
        // 发送消息
        channel.BasicPublish("", name, null, body);
        Console.WriteLine("成功发送消息:" + str);
      }
      while (str.Trim().ToLower() != "exit");

      con.Close();
      channel.Close();
    }
  }
}
```

# 消费端

```c#
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System;
using System.Text;

namespace MQConsumer
{
  internal class Program
  {
    private static void Main(string[] args)
    {
      Console.WriteLine("消费者");
      IConnectionFactory factory = new ConnectionFactory
      {
        HostName = "172.21.46.105",
        Port = 5672,
        UserName = "rabbit1",
        Password = "rabbit1"
      };

      IConnection conn = factory.CreateConnection();
      IModel channel = conn.CreateModel();
      string name = "demo";

      // 声明一个队列
      channel.QueueDeclare(
        // 消息队列名称
        queue: name,
        // 是否持久化
        durable: false,
        // 是否排他。仅当前连接可用该队列
        exclusive: false,
        // 是否自动删除。最后一个消费者断开连接后，该队列自动删除
        autoDelete: false,
        // 设置队列的一些其它参数
        arguments: null
        );

      //创建消费者对象
      var consumer = new EventingBasicConsumer(channel);
      consumer.Received += (model, ea) =>
      {
        byte[] message = ea.Body.ToArray();//接收到的消息
        Console.WriteLine("接收到消息为:" + Encoding.UTF8.GetString(message));
      };

      //消费者开启监听
      channel.BasicConsume(name, true, consumer);
      Console.ReadKey();
      channel.Dispose();
      conn.Close();
    }
  }
}
```
