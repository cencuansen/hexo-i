---
title: JavaScript 防抖和节流
date: 2023-02-13 20:35:59
tags: JavaScript
---

# 意义

节流和防抖是 JavaScript 中常用的`性能优化`手段，用途主要是在`高频率`的事件触发时，如鼠标移动、滚动事件、输入事件等，避免因频繁调用而导致性能下降。

# 应用

页面滚动时需要请求数据，可以使用`节流`限制请求频率。
验证用户输入是否合法，此时可以使用`防抖`避免频繁验证。

# 节流

节流（throttling）是指在一段时间内，只让一个函数有限次执行。它通常用来限制函数在一段时间内的`最大调用次数`，从而防止对性能造成过大的影响。

```JavaScript
function throttle(fn, interval) {
  let canRun = true;
  return function () {
    if (!canRun) return;
    canRun = false;
    setTimeout(() => {
      fn.apply(this, arguments);
      canRun = true;
    }, interval);
  };
}
```

# 防抖

防抖（debouncing）是指在一段时间内，等待事件`停止触发`后才执行一次函数。它通常用来限制事件触发的频率，从而防止对性能造成过大的影响。

```JavaScript
function debounce(fn, interval) {
  let timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn.apply(this, arguments);
    }, interval);
  };
}
```
