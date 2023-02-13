---
title: JavaScript 闭包
date: 2023-02-13 21:15:30
tags: JavaScript
---

# 定义

闭包是一个特殊的函数，能够记录自己`词法作用域`内变量的状态，可以读取该作用域内的变量，在函数或语句块结束后，变量仍然对引用它的函数有效。
在一个函数中`返回函数`或者`作为回调`，这样创建了闭包。当基于参数创建回调，参数必须在闭包中存储（比如：形参存储），否则就会创建一个闭包指向封闭环境中的变量，而这个变量可能会变。

## 场景一，返回函数

```JavaScript
var add = (function () {
    var counter = 0;
    return function () { return counter += 1; }
})();

add();
```

## 场景二，作为回调

```JavaScript
for (var i = 0; i < 5; i++) {
  (function clo(ii) {
    // 形参 ii 对 i 进行了存储
    setTimeout(function() { console.log(ii); }, 20);
    })(i);
}
```

或者

```JavaScript
// 需要浏览器版本 > IE9
for (var i = 0; i < 5; i++) {
    setTimeout(function(ii) {
        // 形参 ii 对 i 进行了存储
        console.log(ii);
        }, 20, i);
}
```

# 用途

封装变量：闭包可以隐藏内部变量，使得代码变得更加简洁；
模拟私有变量：闭包可以模拟私有变量，使得变量不被外部访问；
实现回调函数：闭包可以作为回调函数传递给其他函数，以实现延迟执行；
实现单例模式：闭包可以保证一个类型仅有一个实例；
构建命名空间：闭包可以构建命名空间，使得变量名不冲突；

# 注意

参数未在闭包中存储，就会创建一个闭包指向封闭环境中的变量，这变量会变。

```JavaScript
for(var i = 0; i < 10; i++) {
    setTimeout(function() {
        // 未对变量 i 进行存储
        console.log('i is ' + i);
    }, 10);
}
```

这里参数未在闭包中存储，运行中 i 会变，最终 i 变成 10，输出 10 次 `i is 10`。
类似的有 setTimeout、setInterval、eval() 等。

# 问题

问：闭包一定需要 return 吗
答：不一定，上面所示的`场景二`也是闭包，就不涉及 return。

# 参考

https://creeperyang.github.io/2015/01/JavaScript-dynamic-scope-vs-static-scope/
