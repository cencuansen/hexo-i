---
title: EntityFramework 实体状态
tags:
  - EntityFramework
  - CSharp
categories:
  - EntityFramework
date: 2023-02-16 15:47:30
---

# EntityState

1. Added，在上下文中，而且对象是需要添加的状态
2. Deleted，在上下文中，而且对象是需要删除的状态
3. Modified，在上下文中，而且对象是需要修改的状态
4. UnChanged，在上下文中，对象没有任何状态
5. Detached，没有在上下文中，和 ef 上下文没有关联的状态

new 的新对象属于 Detached 状态；
查询出来的对象属于 UnChanged 状态；
new 的新对象调用 Attach 方法后对象属于 Unchanged 状态；
调用 Add 方法后对象属于 Added 状态；
Remove 方法将状态修改为 Deleted；
