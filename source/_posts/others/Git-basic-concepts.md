---
title: Git 常用指令
tags:
  - Git
categories:
  - Git
date: 2023-02-25 14:45:34
---

# 代理

```bash
// 设置代理
git config --global http.proxy socks5://127.0.0.1:1080
git config --global https.proxy socks5://127.0.0.1:1080

// 取消代理
git config --global --unset http.proxy
git config --global --unset https.proxy
```

# 切分支

```bash
git checkout -b dev:origin/dev
```

# cherry pick

已知当前分支为 master。
dev 分支的 commit 记录如下：

```bash
commit 023sb6f299849a1fec3bbe72baaf315482522cb6
Author: sunguowei <me@xx.com>
Date:   Thu Nov 9 11:01:13 2017 +0800
修复bug 3
Change-Id: I30850819d3dcfb8814b5d67124133215a4469374

commit 5d2c18fsf4b85b4564991963d7c3c3917e951364
Author: sunguowei <me@xx.com>
Date:   Wed Nov 8 16:33:58 2017 +0800
修复bug 2
Change-Id: I0c94d305a35ef8372afc127b2eab13f4ebb70386

commit ba51861402b0a18663f2c9ee28ed054b0879b225
Author: shenjiaqi <other@xx.com>
Date:   Sun Nov 5 18:50:28 2017 +0800
修复bug 1
Change-Id: I32a8e29523f709eed59f6044c7a06311e953727e
```

将 dev 分支 ba518 到 023sb 之间的 commits 复制到 master 分支，`..`代表范围，而且是(左不包含，右包含]。

```bash
git cherry-pick ba518..023sb
```

# stash

```bash
git stash
git stash pop
```

# rebase

已知存在 master 和 feature 两个分支。
![分支](images/git-rebase-1.png)
当前分支为 feature，同步 master 到 feature 。

```bash
git rebase master feature
```

![变基](images/git-rebase-1.png)
`feature`：待变基分支、当前分支
`master`：基分支、目标分支
`变基`，可以直接理解为改变基底，这里就是改变 feature 的基底，从 B 变成 M。
改变后：master 分支为 ABM，feature 分支为 ABMC'D'。
