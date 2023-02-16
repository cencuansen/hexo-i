---
title: NETCore IOC
tags:
  - NETCore
  - CSharp
  - IOC
categories:
  - NETCore
date: 2023-02-16 15:24:52
---

# 生命周期

Singleton：实例化一次，然后在整个应用程序中重复使用；
Scoped：单个请求中会实例化一次实例，请求中可以重复使用；
Transient：每次使用时都会创建新实例；

# 应用

缓存服务、Option 等配置服务注册成 Singleton；
一般服务（Service）注册成 Scoped；

# 常见 IOC 容器

ServiceCollection、Autofac、Unity

# 批量注册服务

```c#
/// <summary>
/// 根据前缀后缀注册服务
/// </summary>
/// <param name="services"></param>
/// <param name="assembly"></param>
/// <param name="postfix">后缀</param>
/// <param name="prefix">前缀</param>
/// <returns></returns>
public static IServiceCollection AddBusinessServices(this IServiceCollection services, Assembly assembly, string postfix, string prefix = "")
{
    var types = assembly?.GetTypes().Where(type => type.IsClass && !type.IsAbstract).ToList();
    if (!string.IsNullOrWhiteSpace(postfix))
    {
        types = types?.Where(type => type.Name.EndsWith(postfix, StringComparison.OrdinalIgnoreCase)).ToList();
    }
    if (!string.IsNullOrWhiteSpace(prefix))
    {
        types = types?.Where(type => type.Name.StartsWith(prefix, StringComparison.OrdinalIgnoreCase)).ToList();
    }
    types?.ForEach(type =>
    {
        foreach (var it in type.GetInterfaces())
        {
            services.AddScoped(it, type);
        }
    });
    return services;
}
```

# 问题

1. Singleton 中如何访问 Scoped？
   通过 IServiceProvider.GetRequireService()。
2. GetService 和 GetRequiredService 区别？
   a. GetService 如果服务未注册，则返回 null；
   b. GetRequiredService 如果服务未注册，则抛出一个 Exception 异常；
