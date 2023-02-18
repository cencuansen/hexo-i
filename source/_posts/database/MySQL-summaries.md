---
title: MySQL 综合
tags:
  - MySQL
categories:
  - MySQL
date: 2023-02-18 14:48:40
---

# group_concat

把 name 相同的 code 拼接在一起

```sql
select name,group_concat(code) from `students` group by name;
```

| name    | group_concat(code) |
| ------- | ------------------ |
| xiaosan | 001,002            |
| sanhuo  | 004,008            |

# char_length

```sql
select name from students where name like '%san%' order by char_length(name);
```

根据字符长度排序：
| name |
| - |
| sanhuo |
| xiaosan |

# locate

返回关键词在目标字段中的位置。

# replace

替换字段中的内容。

```sql
update students set name=REPLACE(name,'A','B')  where id=1;
```

# now

获取当前时间，时间包含毫秒使用 now(3)。

# insert into ... select

从一个表中选数据插入到另一个表。

```sql
INSERT INTO `students`(`id`, `code`, `name`) select null,code,name from `student_infos` where code in ('004','005');
```

# insert into ... ignore

根据主键索引或唯有索引，插入或忽略数据。

```sql
INSERT ignore INTO `students`(`id`, `code`, `name`) VALUES (123, '108', '苏三');
```

# select ... for update

行锁、悲观锁。

```sql
START TRANSACTION;
SELECT * FROM students WHERE id = 12345 FOR UPDATE;
-- 该条数据的修改处理
COMMIT;
```

# on duplicate key update

如果主键或唯一索引不存在，则插入数据；
如果主键或唯一索引存在，则更新数据。
高并发的场景下使用 on duplicate key update 语法，可能会存在死锁的问题

# show create table

显示表创建语句。

# create table ... select

创建表，并从某个表中选数据插入到创建的表中。
应用场景：快速备份表。

# explain

可以使用 explain 命令，查看 mysql 的执行计划，它会显示索引的使用情况。

# show processlist

查看数据库进程列表。

```sql
show processlist
```

等价于

```sql
SELECT * FROM information_schema.processlist limit 10;
```

# mysqldump

导出备份数据。

```sql
mysqldump -h 127.0.0.1 -u root -p123456 dbname > backup.sql
```

# 来源

https://mp.weixin.qq.com/s/_0umF8IBEzf9IHW2-e_LTQ
