---
title: MySQL 数据库引擎
tags:
  - MySQL
  - Database Engine
categories:
  - MySQL
date: 2023-02-16 16:25:21
---

# 分类

- MyISAM
- InnoDB
- Memory
- Archive
- Federated

查使用的引擎类型

```sql
show variables like 'default_storage_engine';
```

# 对比

MySQL 默认使用 innodb。
innodb：支持`事务`，支持`外键`，`聚集索引`，锁最小`行锁`；
myisam：不支持事务，不支持外键，非聚集索引，锁最小表锁；
myisam 使用的场景：个人博客等文本内容为主的系统；
