---
title: Linux WSL
tags:
  - Linux
  - WSL
categories:
  - Linux
date: 2023-03-04 22:32:46
---

WSL：windows 下的 linux 子系统

# 前置

打开管理员模式 cmd，输入如下指令：

```bash
wsl --install
```

```bash
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
```

```bash
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
```

```bash
wsl --set-default-version 2
```

重启电脑

# 安装

下载 [centos 7](https://github.com/wsldl-pg/centwsl/releases/tag/7.0.1907.3)，然后双击运行安装。

# 其他

列出全部系统

```bash
wsl -l -v
```

将 CentOS7 设为默认

```bash
wsl --set-default CentOS7
```

# 结束

关闭

```bash
wsl --shutdown
```

注销

```bash
wsl --unregister CentOS7
```
