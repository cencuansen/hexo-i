---
title: Web 浏览器中网络请求过程
tags:
  - Web
  - Request
categories:
  - Web
date: 2023-02-14 22:21:06
---

1. 地址解析，提取出协议、域名、端口等信息等
2. 通过 DNS 获取到 IP 地址
3. 进行 TCP 连接(三次握手)
   a. 第一次握手：建立连接时，客户端发送 syn(建立联机)包到服务器，并进入 syn_send 状态，等待服务器确认；
   b. 第二次握手：服务器收到 syn 包，确认包信息，同时自己也发送一个 syn + ack(确认)包并进入 syn_recv 状态;
   c. 第三次握手：客户端收到 syn+ack 包，向服务器发送 ack 包，发送完后，客户端和服务器都进入 established 状态，完成三次握手；
4. HTTP 请求
5. 服务器响应请求
6. DOM 解析和渲染
