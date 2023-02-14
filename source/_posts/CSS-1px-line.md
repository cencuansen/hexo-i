---
title: CSS 1像素线
tags:
  - CSS
  - CSS Tricks
categories:
  - CSS
date: 2023-02-14 17:21:43
---

# 场景

移动端开发线条的 1 像素线绘制。

# 方式

- 用 0.5px
- transform scale
- box-shadow 模拟
- 图片

## scale

```css
div {
  height: 1px;
  display: block;
  transform: scale(1, 0.5);
  background-color: #000;
}
```
