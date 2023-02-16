---
title: NETCore 请求管道
tags:
  - NETCore
  - CSharp
  - Pipeline
categories:
  - NETCore
date: 2023-02-16 15:12:47
---

# 中间件

## 形式

app.Use：use 中间件可以由 next。
app.Run：不能调用 next，用于断路或者管道末尾。
app.Map：map request，可用于匹配条件走对应的逻辑，搭配 Use。

## 示例

### app.Use

```c#
app.Use(async (context, next) =>
{
  await context.Response.WriteAsync("hello world");
  await next.Invoke();
});
```

### app.Run

```c#
app.Run(async context =>
{
  await context.Response.WriteAsync("hello world3");
});
```

### app.Map

```c#
app.Map(new PathString("/test"), application =>
{
  application.Use(async (context, next) =>
  {
    await context.Response.WriteAsync("test");
    await next();
  });
});
```

## 常见中间件

UsingRouting、UsingEndpoint、UseAuthentication、UseAuthorization。

### UseRouting

注册路由，根据请求匹配路由；UseEndpoints 执行路由委托；
在 UseRouting 和 UseEndpoint 管道之间注册其自定义中间件，以实现业务逻辑；UseAuthorization 应该注册在 UseRouting 之后，UseEndpoint 之前。实现对 UseRouting 匹配到的路由进行拦截，做授权验证操作等，验证通过则执行下一个中间件。

### UseEndpoints

对于传统路由（控制器和视图）需要用 endpoints.MapControllerRoute，restful 属性路由（用属性修饰控制器和方法）需要用 endpoints.MapController。

### Authentication

认证，表明用户身份的信息，你是谁；Authorization 授权，表明你有系统什么权限，管理员权限或普通用户权限等。例如：你要登机，你需要出示你的身份证和机票，身份证是为了证明你张三确实是你张三，这就是 authentication；而机票是为了证明你张三确实买了票可以上飞机，这就是 authorization。

```c#
public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
{
    // 路由匹配，用来匹配Controller中Action
    app.UseRouting();

	// ...
    // 其他处理，如鉴权、授权等
    // ...

    // 对UseRouting匹配到的路由进行委托方法的执行
    app.UseEndpoints(endpoints =>
    {
        // 配置默认首页是HomeController下的Index方法
        endpoints.MapControllerRoute(name: "default", pattern: "{controller=Home}/{action=Index}/{id?}");
    });
}
```

# 过滤器

过滤器(Filters)只能应用到 Action 或 Controller 方法上。

## 常用过滤器

- Authorization filters
- Resource filters
- Action filters
- Exception filters
- Result filters

![过滤器示意图](/images/filter-pipeline-2.png)

## 使用

- [TypeFilter(typeof(xxxxxx))]
- [ServiceFilter(typeof(xxxxxx))]

TypeFilter 不需要注册到服务容器就能直接使用；
ServiceFilter 需要注册到服务容器中才能使用，如：service.AddTransient<xxxFilterAttrbute>();
