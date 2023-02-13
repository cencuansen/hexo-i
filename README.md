# cencuansen.github.io

新建文章

```
hexo new "new post title"
```

本地运行

```bash
hexo clean & hexo generate & hexo server
```

或

```bash
hexo cl & hexo g & hexo s
```

发布

```bash
hexo cl & hexo g & hexo d
```

发布涉及到的库

```bash
npm install hexo-deployer-git --save
```

报错问题

## spawn failed

### 1. 代理问题

`kex_exchange_identification: Connection closed by remote host`，检查 git 代理，设置代理或者取消代理。

设置代理

```bash
git config --global https.proxy http://127.0.0.1:1080
git config --global https.proxy https://127.0.0.1:1080
```

取消代理

```bash
git config --global --unset http.proxy
git config --global --unset https.proxy
```

### 2. .deploy_git

1. 删除.deploy_git 文件夹
2. 输入 `git config --global core.autocrlf false`
3. 部署 `hexo cl & hexo g & hexo d`
