---
title: CSS 选择第二个以及后续元素
tags:
  - CSS
  - Selector
categories:
  - CSS
date: 2023-02-14 17:28:47
---

元素如下，希望除了第一个子 div 不选择，其他子 div 都选择。

```html
<div class="box">
  <div class="item item-1">1</div>
  <div class="item item-2">2</div>
  <div class="item item-3">3</div>
  <div class="item item-4">4</div>
</div>
```

方式一

```css
.item:nth-of-type(n + 2) {
}
```

方式二

```css
.item:nth-child(n + 2) {
}
```
