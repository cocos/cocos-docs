# 脚本开发工作流程

## 简介

Cocos Creator 的脚本主要是通过扩展组件来进行开发的。目前 Cocos Creator 支持 JavaScript 和 CoffeeScript 两种脚本语言。通过编写脚本组件，并将它赋予到场景节点中来驱动场景中的物体。

在组件脚本的编写过程中，你可以通过声明属性，将脚本中需要调节的变量映射到 **属性检查器**（Properties） 中，供策划和美术调整。于此同时，你也可以通过注册特定的回调函数，来帮助你初始化，更新甚至销毁节点。

## 内容

- 节点和组件
  - [创建和使用组件脚本](use-component.md)
  - [使用 cc.Class 声明类型](class.md)
  - [访问节点和其他组件](access-node-component.md)
  - [常用节点和组件接口](basic-node-api.md)
  - [生命周期回调](life-cycle-callbacks.md)
  - [创建和销毁节点](create-destroy.md)
- 资源管理
  - [加载和切换场景](scene-managing.md)
  - [获取和加载资源](load-assets.md)
- 事件系统
  - [发射和监听事件](events.md)
  - [系统内置事件](internal-events.md)
  - [玩家输入事件](player-controls.md)
- [使用动作系统](actions.md)
- [动作列表](action-list.md)
- [使用计时器](scheduler.md)
- [脚本执行顺序](execution-order.md)
- [网络接口](network.md)
- [使用对象池](pooling.md)
- 脚本组织模式
  - [模块化脚本](modular-script.md)
  - [插件脚本](plugin-scripts.md)
  - [第三方模块引用](third-party-module.md)
- [JavaScript 快速入门](javascript-primer.md)
- CCClass 参考
  - [CCClass 进阶参考](reference/class.md)
  - [属性参数参考](reference/attributes.md)

## 更多参考

- [JavaScript 标准支持](reference/javascript-support.md)
- [推荐编码规范](reference/coding-standards.md)
- [SizeProvider](reference/size-provider.md)


<hr>

继续前往 [创建和使用组件脚本](use-component.md) 开始阅读。
