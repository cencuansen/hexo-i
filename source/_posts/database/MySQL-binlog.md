---
title: MySQL binlog
tags:
  - MySQL
  - binlog
categories:
  - MySQL
date: 2023-02-16 16:36:09
---

# 概述

binlog 是 MySQLSever 层维护的一种二进制日志，与 InnoDB 引擎中的 redo log/undo log 是完全不同的日志；
其主要是用来记录对 MySQL 数据更新或潜在发生更新的 SQL 语句，并以事件的形式保存在磁盘中；

# 应用场景

1. MySQL 主从复制：MySQL Replication 在 Master 端开启 binlog，Master 把它的二进制日志传递给 Slaves 来达到 Master-Slave 数据一致的目的；
2. 数据恢复：通过使用 mysqlbinlog 工具来使恢复数据；

# 配置和查看

查询

```sql
show variables like '%log_bin%';

-- 查看 binlog 文件列表
show binary logs;

-- 查看 binlog 的状态
show master status;

-- 清空 binlog 日志文件
reset master
```

my.cnf 配置

```
[mysqld]

# 开启二进制日志，设置 binlog 文件路径
log-bin=mysql-bin

# 设置server-id
server-id=1

# 1073741824 Bytes == 1 GB
max_binlog_size=1073741824
```

当 binlog 日志写满，或者数据库重启才会产生新文件，也可人为切换生成新文件：flush logs；
一个事务不能跨两个文件，因此也可能在 binlog 文件未满的情况下刷新文件；

# 日志文件格式

三种格式：ROW，STATEMENT，MIXED。

修改格式方式

1. 修改 my.cnf 配置文件；
2. set global binlog_format = 'ROW/STATEMENT/MIXED'；

查看 binglog 格式：show variables like 'binlog_format';

## ROW

记录的是行数据变化`细节`，`多`。
保存记录被修改细节，不记录 sql 语句上下文相关信息。5.1.5 版本的 MySQL 才开始支持。
优点： 能非常清晰的记录下每行数据的修改细节，不需要记录上下文相关信息，因此不会发生某些特定情况下的 procedure、function、trigger 的调用触发无法被正确复制的问题，任何情况都可以被复制，且能加快从库重放日志的效率，保证从库数据的一致性；
缺点：由于所有的执行的语句在日志中都将以每行记录的修改细节来记录，因此，可能会产生大量的日志内容，干扰内容也较多。比如一条 update 语句，如修改多条记录，则 binlog 中每一条修改都会有记录，这样造成 binlog 日志量会很大，特别是当执行 alter table 之类的语句的时候，由于表结构修改，每条记录都发生改变，那么该表每一条记录都会记录到日志中，实际等于重建了表。

## STATEMENT

记录的是会改变数据的 sql 语句，`少`。
修改数据的 sql 都会记录在 binlog 中。
优点：不需要记录每一行的变化，减少了 binlog 日志量，节约了 IO，提高了性能。
缺点：由于记录的只是执行语句，为了这些语句能在 slave 上正确运行，因此还必须记录每条语句在执行的时候的一些相关信息，以保证所有语句能在 slave 得到和在 master 端执行的时候相同的结果。另外 mysql 的复制，像一些特定函数的功能，slave 与 master 要保持一致会有很多相关问题。

## MIXED

ROW 和 STATEMENT 的结合。

# 复制

复制是 MySQL 最重要的功能之一，MySQL 集群的高可用、负载均衡和读写分离都是基于复制来实现，
MySQL 5.6 开始，复制有两种实现方式：binlog、GTID（全局事务标示符）。

# 主从

## 分类

binlog 主从、GTID 主从
