---
title: Docker 常用指令
tags:
  - Docker
categories:
  - Docker
date: 2023-02-19 18:17:38
---

# 指令

## 镜像操作

| 指令            | 含义                      |
| --------------- | ------------------------- |
| docker image ls | 查看所有镜像              |
| docker images   | 查看所有镜像              |
| docker images   | 查看所有镜像              |
| docker pull     | 下载镜像                  |
| docker rmi      | 删除镜像                  |
| docker build    | 使用 Dockerfile，生成镜像 |

## 容器操作

| 指令           | 含义                                            |
| -------------- | ----------------------------------------------- |
| docker create  | 将镜像创建为容器                                |
| docker ps      | 查看所有容器，ps = process status               |
| docker start   | 启动容器                                        |
| docker stop    | 停止容器                                        |
| docker logs    | 查看容器运行日志                                |
| docker run     | 创建并运行一个容器 docker create + docker start |
| docker cp      | 把本地文件复制到容器，或相反方向也行            |
| docker diff    | 查看容器文件的变化                              |
| docker exec    | 在容器中运行命令                                |
| docker commit  | 将修改的容器创建为镜像                          |
| docker tag     | 为镜像分配一个标记                              |
| docker login   | 镜像中登录                                      |
| docker logout  | 镜像中注销                                      |
| docker push    | 将镜像发布到仓库                                |
| docker inspect | 查看容器详细配置                                |

## 详细指令

| 指令                                               | 含义                                         |
| :------------------------------------------------- | -------------------------------------------- |
| docker images -q                                   | 返回全部镜像的 id 集合，-q = --quiet         |
| docker rmi -f $(docker images -q)                  | 删除全部镜像                                 |
| docker create -p 3000:80 --name myApp linux:latest | 用 linux 创建容器；外 3000 内 80；名为 myApp |
| docker ps -a                                       | 查看所有容器(已启动 + 未启动)                |
| docker start myApp                                 | 启动 myApp 容器                              |
| docker start $(docker ps -aq)                      | 启动所有容器                                 |
| docker stop myApp                                  | 停止 myApp 容器                              |
| docker logs myApp                                  | 打印日志                                     |
| docker logs -f myApp                               | 实时打印日志                                 |
| docker exec -it myApp /bin/bash                    | 进入容器，开启交互式终端，用 bash            |
| docker commit myApp newName:tagName                | 将 myApp 容器保存为镜像                      |
