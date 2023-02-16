---
title: EntityFramework 复杂查询
tags:
  - EntityFramework
  - CSharp
categories:
  - EntityFramework
date: 2023-02-16 15:48:44
---

# LINQ Join

LINQ Join 对应关系数据库中的 INNER JOIN。

# LEFT JOIN

```C#
from c in table0
join o in table1 on c.sno equals o.sno into ps
from o in ps.DefaultIfEmpty()
select new { c.name, o.number}
```

生成的 SQL：

```sql
SELECT [t0].[name], [t1].[number] AS [number] FROM [table0] AS [t0]
LEFT OUTER JOIN [table1] AS [t1]
ON ([t0].[sno]) = [t1].[sno]
```
