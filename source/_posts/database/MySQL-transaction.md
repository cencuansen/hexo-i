---
title: MySQL 事务
tags:
  - MySQL
  - Transaction
categories:
  - MySQL
date: 2023-02-16 16:34:07
---

# ACID

1. 原子性：事务中包含的各操作要么都做，要么都不做。数据库通过 undo log 和 redo log 实现原子性：事务提交，redo log 写入到数据库，事务回滚，undo log 恢复到先前状态。
2. 一致性：从一个一致性状态变到另一个一致性状态。
3. 隔离性：一个事务的执行不受其它事务干扰。
4. 持久性：一个事务一旦提交，它对数据库中的数据的改变就应该是永久性的。

# redo log & binlog

redo log 属于 innoDB 层面，binlog 属于 MySQL Server 层面；
redo log 是物理日志，记录该数据页更新的内容；binlog 是逻辑日志，记录的是更新语句的原始逻辑；
redo log 是循环写，日志空间大小固定；binlog 是追加写，写到一定大小会写下一个文件，不覆盖；
redo log 作为异常宕机、介质故障后的数据恢复使用；binlog 主从架构恢复数据；

# Innodb 事务过程

1. innodb 收到 update 语句后，根据条件去找到数据所在页，将该页缓存到 buffer pool；
2. 执行 update，修改 buffer pool 中数据，也就是内存中数据；
3. 生成 undo log，用于事务回滚；
4. 生成 redo log，存入 log buffer；
5. 如果事务提交，则将 redo log 持久化，后续会有其他机制将 buffer pool 中修改的数据持久化到磁盘；
6. 如果事务回滚，利用 undo log 日志进行回滚；

# 例子

假设有 X、Y 两个数据，值分别为 1，2：

1. 事务开始
2. 记录 X=1 到 undo log
3. 修改 X=3
4. 记录 X=3 到 redo log
5. 记录 Y=2 到 undo log
6. 修改 Y=4
7. 记录 Y=4 到 redo log
8. 将 redo log 写入磁盘
9. 事务提交
