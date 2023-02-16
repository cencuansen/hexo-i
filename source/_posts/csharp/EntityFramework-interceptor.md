---
title: EntityFramework 拦截器
tags:
  - EntityFramework
  - CSharp
  - Interceptor
categories:
  - EntityFramework
date: 2023-02-16 16:03:41
---

# 用途

改 SQL，缓存结果，审计日志，自动事务提交等。

# 类型

1. IDbCommandInterceptor：创建、执行、失败、释放
2. IDbConnectionInterceptor：打开和关闭连接、连接失败
3. IDbTransactionInterceptor：创建事务、使用事务、提交事务、回滚事务、创建和使用保存点、事务失败
4. ISaveChangesInterceptor：提交变更

基类 DbCommandInterceptor、 DbConnectionInterceptor、DbTransactionInterceptor、SaveChangesInterceptor 包含对应接口中每个方法的无操作实现，以避免实现不需要的方法。

# DbCommandInterceptor

在 SQL 发送到数据库之前，对 SQL 进行修改，通常结合 EF Core 查询标记来标记每个需要修改的查询。

```c#
var blogs1 = context.Blogs.TagWith("Use hint: robust plan").ToList();
```

```c#
public class TaggedQueryCommandInterceptor : DbCommandInterceptor
{
  public override ValueTask<InterceptionResult<DbDataReader>> ReaderExecutingAsync(DbCommand command, CommandEventData eventData, InterceptionResult<DbDataReader> result, CancellationToken cancellationToken = default)
  {
    ManipulateCommand(command);
    return new ValueTask<InterceptionResult<DbDataReader>>(result);
  }

  private static void ManipulateCommand(DbCommand command)
  {
    if (command.CommandText.StartsWith("-- Use hint: robust plan", StringComparison.Ordinal))
    {
      command.CommandText += " OPTION (ROBUST PLAN)";
    }
  }
}
```

结果

```sql
-- Use hint: robust plan
SELECT [b].[Id], [b].[Name] FROM [Blogs] AS [b] OPTION (ROBUST PLAN)
```

# SaveChangesInterceptor

1. 用于审计

```c#
public async ValueTask<InterceptionResult<int>> SavingChangesAsync(DbContextEventData eventData, InterceptionResult<int> result, CancellationToken cancellationToken = default)
{
  _audit = CreateAudit(eventData.Context);
  using var auditContext = new AuditContext(_connectionString);
  auditContext.Add(_audit);
  await auditContext.SaveChangesAsync();
  return result;
}

public InterceptionResult<int> SavingChanges(DbContextEventData eventData, InterceptionResult<int> result)
{
  _audit = CreateAudit(eventData.Context);
  using var auditContext = new AuditContext(_connectionString);
  auditContext.Add(_audit);
  auditContext.SaveChanges();
  return result;
}
```

同时重写同步和异步方法可确保在无论是否调用 SaveChanges 或 SaveChangesAsync 的情况下进行审计。

```c#
private static SaveChangesAudit CreateAudit(DbContext context)
{
  context.ChangeTracker.DetectChanges();
  var audit = new SaveChangesAudit { AuditId = Guid.NewGuid(), StartTime = DateTime.UtcNow };
  foreach (var entry in context.ChangeTracker.Entries())
  {
    var auditMessage = entry.State switch
    {
        EntityState.Deleted => CreateDeletedMessage(entry),
        EntityState.Modified => CreateModifiedMessage(entry),
        EntityState.Added => CreateAddedMessage(entry),
        _ => null
    };

    if (auditMessage != null)
    {
        audit.Entities.Add(new EntityAudit { State = entry.State, AuditMessage = auditMessage });
    }
  }

  return audit;

  string CreateAddedMessage(EntityEntry entry)
      => entry.Properties.Aggregate(
          $"Inserting {entry.Metadata.DisplayName()} with ",
          (auditString, property) => auditString + $"{property.Metadata.Name}: '{property.CurrentValue}' ");

  string CreateModifiedMessage(EntityEntry entry)
      => entry.Properties.Where(property => property.IsModified || property.Metadata.IsPrimaryKey()).Aggregate(
          $"Updating {entry.Metadata.DisplayName()} with ",
          (auditString, property) => auditString + $"{property.Metadata.Name}: '{property.CurrentValue}' ");

  string CreateDeletedMessage(EntityEntry entry)
      => entry.Properties.Where(property => property.Metadata.IsPrimaryKey()).Aggregate(
          $"Deleting {entry.Metadata.DisplayName()} with ",
          (auditString, property) => auditString + $"{property.Metadata.Name}: '{property.CurrentValue}' ");
}
```

2. 自动设置实体值，如 CreatedBy，CreatedDT 等

```c#
public class MySaveChangesInterceptor : SaveChangesInterceptor
{
  private readonly IAppUser _appUser;

  public MySaveChangesInterceptor (IAppUser appUser)
  {
    _appUser = appUser;
  }

  public async ValueTask<InterceptionResult<int>> SavingChangesAsync(DbContextEventData eventData, InterceptionResult<int> result, CancellationToken cancellationToken = default)
  {
    foreach (var entry in eventData.Context.ChangeTracker.Entries())
    {
      switch (entry.State)
      {
        case EntityState.Added:
          InterceptAddedOperation(entry);
          break;
        case EntityState.Modified:
          InterceptModifiedOperation(entry);
          break;
        case EntityState.Deleted:
          InterceptDeletedOperation(entry);
          break;
      }
    }
    return result;
  }

  /// <summary>
  /// 拦截添加操作
  /// </summary>
  protected virtual void InterceptAddedOperation(EntityEntry entry)
  {
    if (entry.Entity is IAuditedCreationEntity)
    {
      (entry.Entity as IAuditedCreationEntity).CreatedBy = _appUser?.UserId ?? string.Empty;
      (entry.Entity as IAuditedCreationEntity).CreatedDT = DateTime.Now;
    }
  }
  /// <summary>
  /// 拦截修改操作
  /// </summary>
  protected virtual void InterceptModifiedOperation(EntityEntry entry)
  {
    if (entry.Entity is IAuditedUpdateEntity)
    {
      (entry.Entity as IAuditedUpdateEntity).ModifiedBy = _appUser?.UserId ?? string.Empty;
      (entry.Entity as IAuditedUpdateEntity).ModifiedDT = DateTime.Now;
    }
  }

  /// <summary>
  /// 拦截删除操作
  /// </summary>
  protected virtual void InterceptDeletedOperation(EntityEntry entry)
  {
  }
}
```

# 注册

配置 DbContext 实例，在 DbContext.OnConfiguring 中完成注册。

```c#
public class ExampleContext : BlogsContext
{
  protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    => optionsBuilder.AddInterceptors(new TaggedQueryCommandInterceptor());
}
```
