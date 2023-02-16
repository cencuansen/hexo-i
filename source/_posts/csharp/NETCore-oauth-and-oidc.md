---
title: NETCore 身份验证和授权
tags:
  - NETCore
  - CSharp
  - OAuth
  - OIDC
categories:
  - NETCore
date: 2023-02-16 15:26:45
---

# 定义

OAuth 是授权协议（Authorization），不支持身份认证。
OpenID Connect（OIDC）是基于 OAuth 的简单身份认证协议。

# OAuth 2.0 授权方式

1. 授权码
2. 隐式
3. 密码
4. 客户端凭证

# 授权码

功能最完整、流程最严密，适合通用前后端服务，由客户端的后台服务向授权服务请求 token。

```
用户正在访问网站 A ，A 支持用 QQ 登录。
A 网站跳转 QQ 授权页（https://qq.com/oauth/authorize?response_type=code&client_id=CLIENT_ID&redirect_uri=http://a.com/callback&scope=read）。
QQ 提供登录页，用户用 QQ 登录，然后 QQ 跳转 A 网站（http://a.com/callback），并携带授权码（code）。
A 网站使用授权码，向 QQ 请求 Token（https://qq.com/oauth/token?client_id=CLIENT_ID&client_secret=CLIENT_SECRET&grant_type=authorization_code&code=AUTHORIZATION_CODE&redirect_uri=http://a.com/callback）。
QQ 收到请求，跳转 A 网站（http://a.com/callback），并携带 Token。
```

# 密码

用户必须高度信任该网站。用户向客户端提供账号密码，客户端向授权服务请求 token。

```
用户在 A 网站直接用 B 网站的账号密码进行登录。
A 网站带上用户提供的 B 网站的账号密码向 B 网站发起登录请求（https://oauth.b.com/token?grant_type=password&username=USERNAME&password=PASSWORD&client_id=CLIENT_ID）。
在 B 网站验证账号密码成功后直接返回 Token，相当于直接响应。
```

# 凭证式

客户端以自己的名义（不是以用户的名义），用 clientid 和 clientsecret 向授权服务请求 token。这会涉及客户端身份验证（clientid）。

```
A 服务使用 clientid 和 clientsecret 向授权服务申请 Token（https://oauth.b.com/token?grant_type=client_credentials&client_id=CLIENT_ID&client_secret=CLIENT_SECRET）。
授权服务验证通过以后，直接返回 Token。
```

# 隐式

无后端的服务，如 swagger 服务。客户端用 clientid 直接向授权服务器请求 token，不涉及客户端身份验证。

```
swagger 访问授权服务（https://id4.com/oauth/authorize?response_type=token&client_id=CLIENT_ID&redirect_uri=CALLBACK_URL&scope=read）。
授权服务访问 CALLBACK_URL 并携带 token（CALLBACK_URL#TOKEN）。
```
