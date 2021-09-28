# 脚本指南及事件机制

Cocos Creator 脚本用于实现用户定义的（游戏）行为，目前支持 JavaScript 和 TypeScript 两种编程语言。通过编写脚本组件，并将它挂载到场景节点中来驱动场景中的物体。

在组件脚本的编写过程中，开发者可以通过声明属性，将脚本中需要调节的变量映射到 **属性检查器** 中，供策划和美术调整。与此同时，也可以通过注册特定的回调函数，来帮助初始化、更新甚至销毁节点。

## 脚本指南

- [编程语言支持](./language-support.md)
    - [tsconfig](./tsconfig.md)
- [脚本基础](./script-basics.md)
    - [创建脚本](./setup.md)
    - [脚本运行环境](./basic.md)
    - [装饰器使用](./decorator.md)
    - [属性参数参考](./reference/attributes.md)
    - [生命周期回调](./life-cycle-callbacks.md)
- [脚本使用](./usage.md)
    - [访问节点和其他组件](./access-node-component.md)
    - [常用节点和组件接口](./basic-node-api.md)
    - [创建和销毁节点](./create-destroy.md)
    - [使用计时器](./scheduler.md)
    - [组件和组件执行顺序](./component.md)
    - [加载和切换场景](./scene-managing.md)
    - [获取和加载资源](./load-assets.md)
- [模块规范与示例](./modules/index.md)
    - [引擎模块](./modules/engine.md)
    - [外部模块使用案例](./modules/example.md)
    - [模块规范](./modules/spec.md)
- [插件脚本](./external-scripts.md)
- [脚本进阶](./reference-class.md)

## 事件机制

作为引擎中极为常用的系统，我们提供了完整高效的事件系统给开发者使用，具体内容请参考：

- [事件系统](../engine/event/index.md)
    - [发射和监听事件](../engine/event/event-emit.md)
    - [节点系统事件](../engine/event/event-builtin.md)
    - [全局系统事件](../engine/event/event-input.md)
    - [事件 API](../engine/event/event-api.md)

## 更多参考

- [添加引擎内 Log 信息](./log.md)
- [废弃 API](./deprecated.md)
- [推荐编码规范](./reference/coding-standards.md)
- [如何向 Cocos 提交代码](../submit-pr/submit-pr.md)
