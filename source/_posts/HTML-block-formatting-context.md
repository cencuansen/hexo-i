---
title: HTML 块级格式化上下文
tags:
  - HTML
  - BFC
categories:
  - HTML
date: 2023-02-14 19:53:32
---

# 概念

一个块级格式化上下文（**B**lock **F**ormatting **C**ontext），包含该上下文元素的所有`直接子元素`，但是不包括子元素的子元素。

# 案例

```HTML
<div class="box-a" id="bfc1">
  <div class="box-b"></div>
  <div class="box-c" id="bfc2">
    <div class="box-d"></div>
  </div>
</div>
```

`#bfc1` 的 BFC 指的是 `.box-b` 和 `.box-c`；
`#bfc2` 的 BFC 指的是 `.box-d`；

# 特点

- 每一个 BFC 区域只包括其子元素，不包括其子元素的子元素；
- 每一个 BFC 区域都是独立隔绝的，互不影响！

# 三种布局

- 标准流（normal）
- 浮动流（float）
- 定位流（position）

# 触发 BFC

- body 根元素；
- 设置 float，不包括 none；
- 设置 position，包括 absoulte、fixed；
- 设置 display 为 inline-block；
- 设置 overflow，包括 hidden、auto、scroll；
- 表格单元格，table-cell；
- 弹性布局，flex；

# BFC 实际应用

## 兄弟 div margin 重叠

问题描述：文档中相邻 div 元素，上下分布，但两者 margin 默认会重叠。
解决思路：将相邻兄弟变成非相邻同级：把这两兄弟元素各用 div 包裹，触发包裹元素的 bfc。

## 父子 div margin 重叠

问题描述：文档中父子 div 元素，子 div margin-top 会让父子 div 同时下移。
解决思路：触发父级 bfc、父级设置边框。

## 清除浮动影响

问题描述：父元素没设置高度，包含一个子元素，子元素设置浮动，父元素会高度塌陷。
