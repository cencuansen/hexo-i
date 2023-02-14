---
title: HTML src 和 href
tags:
  - HTML
categories:
  - HTML
date: 2023-02-14 22:27:46
---

# 作用结果不同

href 用于在当前文档和引用资源之间建立`联系`。
src 加载资源，`嵌入`相应元素中。

# 浏览器解析方式不同

href 浏览器会并行下载资源并且不会停止对当前文档的处理。这也是为什么建议使用 link 方式加载 CSS，而不是使用 @import 方式。
src 会暂停其他资源的下载和处理，直到将该资源加载、编译、执行完毕，如图片(img)和框架(iframe)等，类似于将资源应用到当前内容。这也是为什么建议把 js 脚本放在底部而不是头部的原因。

# 请求资源类型不同

href（Hypertext Reference，超文本引用）用来建立当前元素和文档之间的链接。如：link、a。
src 的资源，会将资源下载并应用到文档中，常用的有 script，img 、iframe。

# 使用

```HTML
<link href="./style.css" rel="stylesheet">

<a href="http://example.com" target="_blank">click here</a>

<script src="http://example.com/foo.js" type="text/javascript"></script>

<img src="http://example.com/bar.png">
```
