---
title: Redis 线程模型
tags:
  - Redis
categories:
  - Redis
date: 2023-02-18 15:44:51
---

数据`增删改查`用单线程处理，线程安全。
Redis 6.0 中耗时的 Socket 读取、请求解析、单独用一个线程来处理，即：网络 IO 是多线程的。

# 多线程

Redis3.0 中的 BIO 线程：文件关闭、AOF 缓冲数据刷新到磁盘，以及清理对象。

# 多进程

BGSAVE 用于快照持久化，会 fork 出一个子进程去处理。

# 为什么单线程

因为 Redis 是内存操作，CPU 不是 Redis 的瓶颈；
单线程避免频繁多线程上下文切换的性能问题；
Redis 采用非阻塞的 io 多路复用机制；

# IO 多路复用

单线程或单进程同时监测多个文件描述符是否可以执行 IO 操作的能力。
