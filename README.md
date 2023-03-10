# cencuansen.github.io

# 全局安装 hexo

```bash
npm i hexo-cli -g
```

# 新建文章

```bash
hexo new "new post title"
```

# 新建文章到指定路径下

在 source\\\_posts\path1\path2\ 路径下创建名为 post-title 的文章：

```bash
hexo new "new post title" -p path1\\path2\\post-title.md
```

# 本地运行

```bash
hexo clean & hexo generate & hexo server
```

或

```bash
hexo cl & hexo g & hexo s
```

# 发布

```bash
hexo cl & hexo g & hexo d
```

# 发布功能所需库

```bash
npm i hexo-deployer-git -S
```

# 报错问题

## Spawn failed

### 1. 代理问题

问题：`kex_exchange_identification: Connection closed by remote host`
解决：检查 git 代理，设置代理或者取消代理。
\_config.yml 中 deploy 中 repo 地址可以换成 https 格式。

设置代理

```bash
git config --global http.proxy http://127.0.0.1:1080
git config --global https.proxy https://127.0.0.1:1080
```

取消代理

```bash
git config --global --unset http.proxy
git config --global --unset https.proxy
```

### 2. .deploy_git

1. 删除 `.deploy_git` 文件夹
2. 执行 `git config --global core.autocrlf false`
3. 部署 `hexo cl & hexo g & hexo d`
