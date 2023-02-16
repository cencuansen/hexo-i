---
title: MySQL 慢查询排查
tags:
  - MySQL
  - Slow Query
categories:
  - MySQL
date: 2023-02-16 17:04:39
---

# 排查思路

1. 查看“慢查询日志”找慢 SQL
2. explain“执行计划”查询
3. profile 执行耗时分析
4. Optimizer Trace

# 慢查询日志

该功能默认是关闭的。

```sql
-- 查看慢查询日志功能是否开启，默认 OFF
show variables like 'slow_query_log%';

-- 查询超时多久的查询才被记录日志
show variables like 'long_query_time';

-- 查看日志输出模式 FILE、TABLE
show variables LIKE '%log_output%';
```

用配置开启慢查询日志，持久性。

```
[mysqld]

# 开启慢查询日志
slow_query_log = ON

# 慢查询日志文件位置
slow_query_log_file = dir\filename

# 大于 3 秒就记录日志
long_query_time = 3

# 将未使用索引的查询记录日志
log_queries_not_using_indexes = ON
```

用命令开启慢查询日志，临时性

```bash
SET GLOBAL slow_query_log=ON;
SET GLOBAL long_query_time=3;
SET GLOBAL slow_query_log_file=dir\filename;
```

查看记录的慢查询日志

```sql
SELECT * FROM mysql.slow_log;
```

# 执行计划

执行计划是模拟执行 SQL 查询，来查看执行策略。

```sql
explain select * from 'stu' where gender=1;
```

# 执行耗时分析

profile 根据最近执行的 SQL，显示执行耗时情况。

```sql
select * from 'stu' where gender=1;
show profiles;
```

```sql
select * from 'stu' where gender=1;
show profiles;
```

# Optimizer Trace

optimizer trace 跟踪 SQL 语句解析优化执行过程。

```sql
set optimizer_trace='enabled=on';
select * from 'stu' where gender=1;
select * from information_schema.optimizer_trace;
```
