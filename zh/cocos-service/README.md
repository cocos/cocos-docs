# Cocos Service 用户手册编写说明

## 文档仓库与分支

* forked from https://github.com/cocos-creator/creator-docs
* Cocos Service 文档部分始终基于 master 分支进行编写，当需要发布时，提交 PR 到 Creator 文档的指定分支

## 编辑与预览

可以进入 ./zh/cocos-service 单独进行预览

```
cd ./zh/cocos-service
gitbook install
gitbook serve
```

## 线上发布

* 安装 [Node.js](https://nodejs.org/)
* 通过 npm 来安装 gitbook

    ```
    npm install gitbook-cli -g
    ```

* `gitbook init` 初始化书籍目录
* `gitbook build [编译目录] [输出目录]` 编译书籍

    ```
    gitbook build /Projects/creator-docs/zh/cocos-service /Projects/creator-docs/zh/cocos-service/output
    ```

## 上线新服务
* 统一向服务列表文件夹下添加
* 左侧导航的服务名称与服务面板里保持一致，特殊情况下可在后面加（）进行备注；
* 左侧导航需要用文件夹进行折叠时，文件夹链接到其下面的第1篇文档

## 服务指南文档编写规则
* 文档的大标题统一用“《服务名称+快速入门》”
* 文档的结构基本保持一致：
    * 服务介绍
    （服务介绍中第一次出现的第三方产品名称加上链接到其官方文档）
    * 开通服务
    * 验证服务是否接入成功
    * Sample 工程
    * API 文档
    
        (原则上如果能直接用官方 API 文档则直接链接过去，否则粘贴 API 说明)
        
    * 其它特别说明
    * 相关链接


