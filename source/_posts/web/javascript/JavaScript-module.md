---
title: JavaScript 模块化
tags:
  - JavaScript
  - Module
categories:
  - JavaScript
date: 2023-02-14 16:57:11
---

# 种类

- AMD/CMD
- CommonJS(适用于服务端)
- UMD
- ESM(EcmaScript Module)

# AMD/CMD

AMD：Asynchronous Module Definition，异步模块定义。
CMD：Common Module Definition，通用模块定义。
相对于 CommonJS，定义了适用于`浏览器端`的规范。
AMD 中有 requirejs，CMD 中有 seajs。
用 define 方法来定义一个模块，通过前置依赖列表导入外部模块数据。

# CommonJS

nodejs 模块化采用的是 CommonJS。
module.exports 或 exports 导出，require 导入。
CommonJS 规范一些特性：文件系统，同步加载等，不适用于浏览器端，适用于`服务端`。

# UMD

UMD：Universal Module Definition，通用模块定义
不属于一套模块规范，主要用来处理 CommonJS、AMD、CMD 的差异`兼容`，使模块代码能在前面不同的模块环境下都能正常运行。

# ESM

JavaScript 在 `ES6` 开始引入模块概念：ES Module。
export default 或 export 导出，import 导入。
动态导入 import() 返回 promise。
