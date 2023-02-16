---
title: MySQL MVCC
tags:
  - MySQL
  - MVCC
categories:
  - MySQL
date: 2023-02-16 17:02:31
---

多版本并发控制(Multiversion Concurrency Control)，通过保存数据在某时刻的快照来实现并发控制，不管事务执行多长时间，事务内部看到的数据不受其它事务影响。InnoDB 用 Undo Log 保存数据的多个版本。

普通锁，只能串行执行；
读写锁，可以实现读读并发；
多版本并发控制，可以实现读写并发。

隔离级别要求：已提交读和可重复读。未提交读总是读取最新的数据行，串行化会对读取的行加锁。

事务 ID：每开启一个事务，我们都会从数据库中获得一个事务 ID（事务版本号），这个事务 ID 是自增长的。

# 隐藏列

1. DB_ROW_ID，隐藏的行 ID，用来生成默认聚簇索引；
2. DB_TRX_ID，事务 ID；
3. DB_ROLL_PTR，回滚指针，指向行数据的 Undo Log；

# SELECT：

1. 事务 ID 早于当前事务 ID 的数据，确保数据已经存在或当前事务自身插入或者修改的；
2. 删除版本未定义或大于当前事务 ID，确保在事务开始之前未被删除。
   INSERT：数据的事务 ID 列保存当前事务 ID。
   DELETE：数据的删除标识更新为当前事务 ID，删除被视为更新，行中的一个特殊位用来标记。
   UPDATE：插入新记录，数据的事务 ID 列保存当前事务 ID，原数据的删除标识更新为当前事务 ID。