---
title: Redis 持久化
tags:
  - Redis
categories:
  - Redis
date: 2023-02-18 15:47:34
---

redis 持久化有 RDB 和 AOF 两种，redis 持久化是为了后期出现故障能恢复数据到内存。
如果 redis 同时使用 RDB 和 AOF 持久化，redis 会优先使用 AOF 进行恢复数据。

# RDB

RDB（Redis DataBase，快照持久化），就是完整记录某时刻全部数据。

- save，阻塞主线程；
- bgsave，子进程去做持久化；
- 自动持久化：save m n，m 秒内发生 n 次变化时，会触发 bgsave。
- 数据恢复：redis 重启会自动从 dump.rdb 中恢复数据。

# AOF

AOF（Append Only File，文件追加持久化），向日志文件中追加写操作，会忽略读操作，redis 启动之初会读取该文件重新构建数据。
