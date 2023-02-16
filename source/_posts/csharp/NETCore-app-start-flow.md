---
title: NETCore 程序启动流程
tags:
  - NETCore
  - CSharp
categories:
  - NETCore
date: 2023-02-16 15:07:14
---

Program.main

1. 创建主机(Host.CreateDefaultBuilder(args))；
2. 配置主机(ConfigureWebHostDefaults())：
   - 使用 kestrel 主机
   - 读取配置文件
   - 配置 log 组件
   - 注册默认 IOC 容器
   - 使用 Startup
3. Startup.ConfigureServices 对程序中涉及的相关服务进行注册；
4. Startup.Configure 配置请求管道。

启动执行顺序

1. ConfigureWebHostDefaults 注册组件，比如 Configuration 组件、IOC 容器组件等
2. ConfigureHostConfiguration 设置生成器自身的配置，比如配置监听的端口、URL 地址
3. ConfigureAppConfiguration 为应用程序设置其他配置，比如设置自定义配置文件
4. ConfigureServices、ConfigureLogging、Startup.ConfigureServices 服务注册
5. Startup.Configure 配置请求中间件
