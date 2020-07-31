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

## 上线新服务
* 统一向服务列表文件夹下添加
* 左侧导航的服务名称与服务面板里保持一致，特殊情况下可在后面加（）进行备注；
* 左侧导航需要用文件夹进行折叠时，文件夹链接到其下面的第1篇文档

## 服务指南文档编写规则
* 文档的大标题统一用“《服务名称+快速入门》”
* 文档的结构基本保持一致：
    * 服务介绍
    * 开通服务
    * 验证服务是否接入成功
    * Sample 工程
    * API 文档
    
        (原则上如果能直接用官方 API 文档则直接链接过去，否则粘贴 API 说明)
        
    * 其它特别说明
    * 相关链接
