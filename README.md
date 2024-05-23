
# Cocos Creator 用户手册

- 官方文档地址：[https://docs.cocos.com](https://docs.cocos.com)
- 引擎下载地址：[https://www.cocos.com](https://www.cocos.com/)

## 准备工作

```sh
npm install
```

## 生成侧边栏数据

node ./scripts/create-sidebar.js versions/3.8/zh/SUMMARY.md

node ./scripts/create-sidebar.js versions/3.8/en/SUMMARY.md

## 本地启动具体版本

npx vitepress dev versions/3.8

## 本地构建具体版本

npx vitepress build versions/3.8

## 本地预览具体版本

npx vitepress preview versions/3.8

## 发布版本

### 发布单个

node ./scripts/publish.js versions/3.8

### 发布全部

node ./scripts/publish.js versions/all

>上文中的 3.8 替换为对应版本即可实现版本发布

