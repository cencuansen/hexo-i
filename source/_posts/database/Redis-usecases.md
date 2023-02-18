---
title: Redis 使用场景
tags:
  - Redis
categories:
  - Redis
date: 2023-02-18 15:34:46
---

# 缓存

# 分布式数据共享

分布式 Session

# 分布式锁

借助 string 的 set。

set 有如下参数：
EX：设置键的过期时间（单位为秒）；
PX：设置键的过期时间（单位为毫秒）；
NX：只在键不存在时，才对键进行设置操作，set key value NX 和 SETNX key value 等价；
XX：只在键已经存在时，才对键进行设置操作；

```bash
set lock_key lock_value NX EX 1
```

结果：
如果返回 false，说明 key 的添加不成功，也就是当前有人在占用这把锁；
如果返回 true，则说明得了锁，便可以继续进行操作；
并且在操作后通过 del 命令释放掉锁，而且设置了过期时间，该锁也会在 1 秒后自动释放。

# 全局 ID

```sql
incrby userid 1
```

# 计数器

int 类型，incr 方法。

# 限流

int 类型，incr 方法，以访问者的 ip 和其他信息作为 key，访问一次增加一次计数，超过次数则返回 false。

# 消息队列

Redis 中 list 的数据结构实现是双向链表，所以可以非常便捷的应用于消息队列，lpush 将消息放入 list，消费者便可以通过 rpop 取出该消息。

# 抽奖

利用 set 结构的无序性，通过 spop 随机获得值。

# 排行榜

利用 sorted set
