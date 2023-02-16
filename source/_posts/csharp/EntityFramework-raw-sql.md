---
title: EntityFramework 原生 SQL
tags:
  - EntityFramework
  - CSharp
  - SQL
categories:
  - EntityFramework
date: 2023-02-16 15:55:13
---

# FromSql

FromSql 只能直接在 DbSet 上使用。 不能在任意 LINQ 查询的基础上组合使用它。

```c#
var blogs = context.Blogs.FromSql($"SELECT * FROM dbo.Blogs").ToList();
```

FromSql 和 FromSqlInterpolated 方法可以防止 SQL 注入，FromSqlRaw 方法可能易受 SQL 注入攻击。

## 动态 SQL 和参数

```c#
var user = "johndoe";
var sqlString = $"SELECT * FROM dbo.Blogs WHERE Name = {user}";
var blogs = context.Blogs.FromSql(sqlString).ToList();
```

# SqlQuery

```c#
var ids = context.Database.SqlQuery<int>($"SELECT [BlogId] FROM [Blogs]").ToList();
```

# Non-Query SQL

非查询 SQL 通常指用于修改数据库中的数据或调用不返回任何结果集的存储过程。

## ExecuteSql

EF Core 7.0 之前批量变更，比在查询所有匹配行后使用 SaveChanges 来修改它们要高效得多。

```c#
var rowsModified = context.Database.ExecuteSql($"UPDATE [Blogs] SET [Url] = NULL");
```

## ExecuteDeleteAsync

EF Core 7.0 新特性，借助 LINQ 更方便高效。

```c#
await context.Tags.Where(t => t.Text.Contains(".NET")).ExecuteDeleteAsync();
```

## ExecuteUpdateAsync

EF Core 7.0 新特性，借助 LINQ 更方便高效。

```c#
await context.Blogs.ExecuteUpdateAsync(s =>
    s.SetProperty(b => b.Name, b => $"{b.Name}_new"))
    s.SetProperty(b => b.Author, b => $"{b.Author}_new"));
```
