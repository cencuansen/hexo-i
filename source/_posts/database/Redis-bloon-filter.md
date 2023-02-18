---
title: Redis 布隆过滤器
tags:
  - Redis
  - Bloon Filter
categories:
  - Redis
date: 2023-02-18 15:51:41
---

# 布隆过滤器

一个很长的二进制向量（位数组）和一系列随机映射函数。
优点：空间效率和查询时间都比一般的算法要好的多；
缺点：有一定的误识别率和删除困难。
Redis 中的布隆过滤器底层是一个大型`位数组`（二进制数组）和多个`无偏散列函数`。
位数组越长，空间占用较大，错误率越低；无偏 hash 函数越多，计算耗时较长，错误率越低；

# 添加数据

通过 k 个无偏 hash 函数计算得到 k 个 hash 值，依次取模数组长度，得到数组索引，将计算得到的数组索引下标位置数据修改为 1

# 匹配数据

通过 k 个无偏 hash 函数计算得到 k 个 hash 值，依次取模数组长度，得到数组索引，判断索引处的值是否全部为 1，如果全部为 1 则`可能存在`，如果存在一个 0 则`必定不存在`，1%误判率。

# 为什么是“可能存在”

其实原因很简单，那些被置为 1 的位置也可能是由于其他元素的操作而改变的。
比如，元素 1 和 元素 2，这两个元素同时将一个位置变为了 1。
在这种情况下，我们就不能判定“元素 1”一定存在，这是布隆过滤器存在误判的根本原因。

布隆过滤器牺牲了判断的准确率、删除的便利性 ，才做到在时间和空间上的效率比较高，是因为：

- 存在误判，可能要查到的元素并没有在容器中，但是 hash 之后得到的 k 个位置上值都是 1。如果 bloom filter 中存储的是黑名单，那么可以通过建立一个白名单来存储可能会误判的元素。
- 删除数据。一个放入容器的元素映射到 bit 数组的 k 个位置上是 1，删除的时候不能简单的直接置为 0，可能会影响其他元素的判断。可以考虑 Counting Bloom Filter