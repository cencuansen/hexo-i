---
title: NETCore 请求流程
tags:
  - NETCore
  - CSharp
categories:
  - NETCore
date: 2023-02-16 14:55:17
---

# 流程

反向代理 -> kestrel -> middleware 管道 -> 业务处理 -> response 返回数据。

!["请求流程"](/images/netcore-request-flow.png)

补充：
程序启动的时候会把所有的 Controller 中的 Action 映射存储到 routeOptions 集合中，Action 映射成 Endpoint 端点的 RequestDelegate 委托属性，最后通过 UseEndPoints 添加 EndpointMiddleware 中间件进行执行，同时这个中间件中的 Endpoint 路由已经是通过 Routing 匹配后的路由。
