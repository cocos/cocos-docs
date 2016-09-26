# Cocos Package

Cocos Package 为 Cocos 引擎的开发者集成第三方 SDK 提供了自动化集成方案.它让开发者无需再关注集成 SDK 是否缺少资源，是否少了配置，开发者可直接使用 SDK 接口，集成更加方便、快捷。

## 功能介绍

Cocos Package 为开发者提供了命令行工具，开发者可在 Cocos Console 命令中使用。`cocos package -h --anysdk` 可查看 Cocos Package 帮助文档。

```
	命令:

        list            展示当前支持的 SDK 列表及 SDK 相关信息。

        import [name]   一键集成 SDK 到 Cocos 引擎工程。

        update          一键更新当前集成到工程的 SDK 到最新版本 

        restore         使用备份文件还原工程中被修改的文件。谨慎使用该命令，避免改动的文件被覆盖

        info            查看当前集成到工程中的 SDK 列表

        symbols         显示当前工程的环境变量

        version         查看 Cocos Package 版本号 
```
 : <p> 调用时需要加 --anysdk 参数 </p>
## SDK

### AnySDK Framework

**AnySDK Framework**为 AnySDK 客户端框架，AnySDK 为游戏开发者提供一套第三方 SDK 接入解决方案，整个接入过程，不改变任何 SDK 的功能、特性、参数等，对于最终玩家而言是完全透明无感知的。

Cocos Creator 内置 Cocos 引擎中包含了 AnySDK Framework 资源。即开发者构建发布出的平台工程已经包含了 AnySDK Framework。开发者可参考[AnySDK Framework](anysdk/anysdk-framework.md) 一节，了解如何使用 Cocos Package 集成 AnySDK Framework



