---
title: Redis 事务
tags:
  - Redis
  - Transaction
categories:
  - Redis
date: 2023-02-18 15:49:47
---

MULTI 开启一个事务， 然后将多个命令入队到事务中， 最后由 EXEC 命令触发事务。
单个 Redis 命令的执行是原子性的，但 Redis 没有在事务上增加任何维持原子性的机制，所以 Redis 事务的执行并不是原子性的，中间某条指令的失败不会导致前面已做指令的回滚，也不会造成后续的指令不做。

```bash
MULTI
SET book-name "Mastering C++ in 21 days
SADD tag "C++" "Programming" "Mastering Series"
EXEC
```
