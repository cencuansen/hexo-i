---
title: MySQL 执行计划
tags:
  - MySQL
  - Explain
categories:
  - MySQL
date: 2023-02-16 16:45:55
---

# 使用

explain <sql 语句>，模拟 MySQL 优化器执行 SQL，用来分析 SELECT 语句执行效率。

# 组成

```
id | select_type | table | partitions | type | possible_keys | key | key_len | ref | rows | filtered | extra
```

# 说明

- id：从大到小顺序执行，相等值的从上到下顺序执行，null 值的最后执行。

- select_type：

  - simple：表示不需要 union 操作或者不包含子查询的简单 select 查询。有连接查询时，外层的查询为 simple，且只有一个。
  - primary：一个需要 union 操作或者含有子查询的 select，位于最外层的单位查询的 select_type 即为 primary。且只有一个。
  - union：union 连接的两个 select 查询，第一个查询是 dervied 派生表，除了第一个表外，第二个以后的表 select_type 都是 union。
  - dependent union：与 union 一样，出现在 union 或 union all 语句中，但是这个查询要受到外部查询的影响。
  - union result：包含 union 的结果集，在 union 和 union all 语句中，因为它不需要参与查询，所以 id 字段为 null。
  - subquery：除了 from 字句中包含的子查询外，其他地方出现的子查询都可能是 subquery。
  - dependent subquery：与 dependent union 类似，表示这个 subquery 的查询要受到外部表查询的影响。
  - derived：from 字句中出现的子查询，也叫做派生表，其他数据库中可能叫做内联视图或嵌套 select。

- type：null > system > const > eq_ref > ref > ref_or_null > index_merge > range > index > all，一般来说，得保证查询至少达到 range 级别，最好能达到 ref。

  - null MySQL 在优化阶段分解查询语句，在执行阶段不再需要访问表或索引

  ```sql
  explain select min(id) from <table name>;
  ```

  - system 表中只有一行记录（等于系统表），const 类型的特例。
  - const 通过索引一次命中，匹配一行数据，常见于主键索引或唯一索引。比如：where id=1
  - eq_ref 唯一索引扫描，对于每个索引键，表中只有一条记录匹配，常见于主键索引或唯一索引。
  - ref 非唯一索引扫描，返回匹配的所有结果。
  - range 检索给定范围的行。
  - index 遍历索引树。
  - all 全表扫描。

- extra：using filesort，using index，using temporary，using where
  - using filesort，mysql 对结果集合进行外部排序，说明没有通过索引顺序达到排序效果，需要优化。
  - using index，覆盖索引，说明索引树中就能找到所需要的数据，避免了回表，性能不错。
  - using temporary，使用了临时表，一般出现于排序，分组，多表 join 的情况下，需要优化。
  - using where，使用了 where 过滤，性能较高。
