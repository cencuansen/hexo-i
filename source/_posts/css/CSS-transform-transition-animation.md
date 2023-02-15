---
title: CSS transform、transition、animation
tags:
  - CSS
  - transform
  - transition
  - animation
categories:
  - CSS
date: 2023-02-14 19:41:16
---

# transform

`transform: [转换函数];`
转换函数：translate、scale、rotate、skew。
transform 只影响当前元素，不影响文档流。

```css
transform: translateX(1px);
transform: translateY(2px);
```

## 特性

参考：https://www.bilibili.com/video/BV1L3411C76T

- 变换后盒子模型占据的尺寸和位置不会变换；
- 变换后会创建层叠上下文；
- 对内联元素无效；
- 不同顺序效果不同；
- 锯齿或虚化问题；

# transition

改变目标元素的样式：颜色、外观、尺寸，一般`搭配伪类`。
transition 尺寸变更会对文档流产生影响。

```css
.box {
  width: 10px;
  transition: width 0.4s ease;
}

.box:hover {
  width: 50px;
}
```

或者用 JavaScript 改变元素属性触发 transition

```css
.box {
  width: 100px;
  height: 100px;
  background-color: blueviolet;
  transition: width 1s linear 0.5s;
}

.box1 {
  width: 400px;
}
```

```JavaScript
document.querySelector('.box').classList.add('box1');
```

## 局限性

- transition 需要触发，没法在网页加载时自动发生。
- transition 是一次性的，不能重复发生，除非一再触发。
- transition 只能定义开始状态和结束状态，不能定义中间状态。
- 一条 transition 规则，只能定义一个属性的变化，不能涉及多个属性。

# animation

transition 不够用的时候，可以使用 animation。
animation 搭配 `@keyframes` 使用，无需搭配伪类，页面加载 animation 就自动开始了。

```css
.animation1 {
  /* forwards：动画结束时，就停在最终状态 */
  animation: changeAnimation 1s ease forwards;
}

.animation2 {
  /* infinite alternate：无限循环 + 往复 */
  animation: changeAnimation 1s ease infinite alternate;
}

@keyframes changeAnimation {
  0% {
    width: 110px;
  }
  50% {
    width: 140px;
  }
  100% {
    width: 200px;
  }
}
```
