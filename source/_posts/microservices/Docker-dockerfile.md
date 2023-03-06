---
title: Docker dockerfile
tags:
  - Docker
categories:
  - Docker
date: 2023-02-19 18:32:48
---

# 示例

```dockerfile
FROM debian
RUN apt-get install emacs
RUN apt-get install apache2
CMD ["/bin/bash"]
```

`FROM debian`：将 debian 镜像作为基础镜像
`RUN apt-get install emacs`：安装 emacs
`RUN apt-get install apache2`：安装 apache2
`CMD ["/bin/bash"]`：执行 bash

# FROM

FROM 用来初始化新的生成阶段，并为后续指令提供基本映像。
多个 FROM 代表`多阶段`构建。
Dockerfile 一般以 FROM 开头，ARG 是唯一能在 FROM 之前的指令。

```dockerfile
ARG  CODE_VERSION=latest
FROM base:${CODE_VERSION}
CMD  /code/run-app
```

# RUN

1. shell 模式：RUN <command>
2. exec 模式：RUN ["executable", "param1", "param2"]

RUN 会创建新的层（Layer），在新的层上执行命令，并提交（commit）执行结果。
shell 模式会调用 shell，exec 模式不会调用 shell。
exec 模式默认不会进行字符串替换（指的是变量替换），但可以通过显式调用 shell 的形式处理：

exec 模式调用 shell，$HOME 为变量：

```dockerfile
RUN [ "sh", "-c", "echo $HOME" ]
```

# CMD

1. exec 模式，首选：CMD ["executable","param1","param2"]
2. 为 ENTRYPOINT 提供默认参数形式：CMD ["param1","param2"]
3. shell 模式：CMD command param1 param2

一个 Dockerfile 中只能有一个 CMD，如果有多个，也只有最后一个有效。
CMD 主要用途是给执行容器默认行为，如：指定默认执行文件。
如果 CMD 用的第 2 中模式（为 ENTRYPOINT 提供默认参数形式），那么 ENTRYPOINT 指令也应该用字符串数组的形式，CMD 的值就会是 ENTRYPOINT 默认参数。
不要将 RUN 与 CMD 混淆。RUN 实际上运行一个命令并提交结果；CMD 在构建时不执行任何操作，而是为镜像提前设置执行指令。

# EXPOSE

声明哪些端口是将要开放的，docker run 时 使用 -P（P 是大写的）进行随机端口关联映射。或者使用
docker run -p 外部端口:容器端口 镜像名。所以 Dockerfile 中使用 EXPOSE 用处不大。

# ENV

设置环境变量，会被持久化进容器。

```dockerfile
ENV MY_NAME="John Doe"  MY_DOG="Rex The Dog"
ENV MY_VAR my-value
```

如果不希望 ENV 环境变量持久化进容器，可以使用行内变量：

```dockerfile
RUN DEBIAN_FRONTEND=noninteractive apt-get update && apt-get install -y ...
```

这里的 DEBIAN_FRONTEND=noninteractive 就是行内变量。
或者 ARG 指令也能实现不持久化变量到容器。

# ADD

```dockerfile
ADD [--chown=<user>:<group>] [--checksum=<checksum>] <src>... <dest>
ADD [--chown=<user>:<group>] ["<src>",... "<dest>"]
```

--chown 只支持 Linux 容器。
ADD 作用是：从 src 复制文件到镜像中 dest 路径，会创建新的层。
src 可以是：本地文件、目录、url 形式的远程文件。
如果 src 是本地的压缩文件（.tar.xz），ADD 会自动解压到镜像中。
多 src 的，路径被解析为相对路径（相对于 build 路径）。
src 可以包含通配符：\* 多字符，? 单字符。

# COPY

```dockerfile
COPY [--chown=<user>:<group>] <src>... <dest>
COPY [--chown=<user>:<group>] ["<src>",... "<dest>"]
```

COPY 功能和 ADD 类似，同样会创建新的层。
src 可以是：本地文件、目录。
ADD 和 COPY 两者，更推荐使用 COPY。

# WORKDIR

Dockerfile 中 WORKDIR 指令为后续的 RUN、CMD、ENTRYPOINT、COPY、ADD 等指令设置工作目录。
多 WORKDIR 指令，如果提供了相对路径，则后出现的 WORKDIR 是基于先前出现的 WORKDIR 的路径的。

```dockerfile
WORKDIR /a
WORKDIR b
WORKDIR c
RUN pwd
```

# ENTRYPOINT

1. exec 模式：ENTRYPOINT ["executable", "param1", "param2"]
2. shell 模式：ENTRYPOINT command param1 param2

docker run [image] [arguments] 的 arguments 部分会追加到 exec 模式的 ENTRYPOINT 指令数组的后面，并且会替换 CMD 指令中所有元素。如果想替换 ENTRYPOINT，使用 docker run --entrypoint。
shell 模式的 ENTRYPOINT 会阻止
Dockerfile 中只有最后一个 ENTRYPOINT 是有效指令。

# 应用

假设一个简单的场景：公司的服务器需要定期清理旧的日志文件。

clean_log 文件：

```bash
#!/bin/bash
echo "即将删除 $1 天前的日志文件"
find /log_dir -ctime "$1" -name '*log' -exec rm {} \;
```

dockerfile 文件：

```dockerfile
FROM ubuntu:14.04

# 将 clean_log 脚本添加到镜像中
ADD clean_log /usr/bin/clean_log

# 设置 clean_log 可执行
RUN chmod +x /usr/bin/clean_log

# 将此镜像的入口点定义为 clean_log 脚本
ENTRYPOINT ["/usr/bin/clean_log"]

# 为 ENTRYPOINT 提供默认参数，7天
CMD ["7"]
```

构建镜像：

```bash
docker build -t log-cleaner .
```

运行镜像：

```bash
docker run -v /var/log/myapplogs:/log_dir log-cleaner 365
```

上述命令将 /var/log/myapplogs 目录挂载到容器内部的脚本指定的目录，并且 365 这个值会替换掉 CMD 的 7。

# RUN、CMD 和 ENTRYPOINT

Dockerfile 中 RUN、CMD 和 ENTRYPOINT 都能够用于执行命令，下面是三者的主要用途：
`RUN`：命令执行命令并创建新的镜像层，通常用于安装软件包；
`CMD`：命令设置容器启动后默认执行的命令及其参数，但 CMD 设置的命令能够被 docker run 命令后面的命令行参数替换。一个 Dockerfile 至多只能有一个 CMD，如果有多个，只有最后一个生效。如果我们在 docker run 时指定了命令或者有 ENTRYPOINT，那么 CMD 就会被覆盖；
`ENTRYPOINT`：配置容器启动时的执行命令，不会被忽略，一定会被执行，即使 docker run 时指定了其他命令。如果存在多个 ENTRYPOINT 命令，则只会执行最后一个 ENTRYPOINT 命令。

## RUN

错误写法：

```dockerfile
FROM debian:jessie
RUN apt-get update
RUN apt-get install -y gcc libc6-dev make
RUN wget -O redis.tar.gz "http://download.redis.io/releases/redis-3.2.5.tar.gz"
RUN mkdir -p /usr/src/redis
RUN tar -xzf redis.tar.gz -C /usr/src/redis --strip-components=1
RUN make -C /usr/src/redis
RUN make -C /usr/src/redis install
```

该写法会创建 7 层镜像，这是完全没有意义的，而且很多运行时不需要的东西，都被装进了镜像里，比如编译环境、更新的软件包等等。结果就是产生非常臃肿、非常多层的镜像，不仅仅增加了构建部署的时间，也很容易出错。

合理写法：

```dockerfile
FROM debian:jessie
RUN buildDeps='gcc libc6-dev make' \
  && apt-get update \
  && apt-get install -y $buildDeps \
  && wget -O redis.tar.gz "http://download.redis.io/releases/redis-3.2.5.tar.gz" \
  && mkdir -p /usr/src/redis \
  && tar -xzf redis.tar.gz -C /usr/src/redis --strip-components=1 \
  && make -C /usr/src/redis \
  && make -C /usr/src/redis install \
  && rm -rf /var/lib/apt/lists/* \
  && rm redis.tar.gz \
  && rm -r /usr/src/redis \
  && apt-get purge -y --auto-remove $buildDeps
```

## CMD

```dockerfile
FROM ubuntu:16.04
RUN apt-get update \
  && apt-get install -y curl \
  && rm -rf /var/lib/apt/lists/*
CMD [ "curl", "-s", "http://ip.cn" ]
```

该镜像作用是查机器的 IP。

```bash
docker build -t myip
docker run myip
```

如果想替换 Dockerfile 中 CMD 中参数，执行一下命令：

```bash
docker run myip curl -s http://ip.cn -i
```

# 总结

RUN、ADD、COPY 这三个指令都会创建新的层。
