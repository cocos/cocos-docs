# 接入抖音 PC 小游戏

抖音 PC 小游戏即支持在​ 直播伴侣 打开抖音小游戏。PC 小游戏将具备移动端的大部分能力，暂时不支持以下功能：keyDown/keyUp 键盘事件、录屏/录音​、​广告​、转发分享、收藏、群聊、侧边栏、支付、以及强依赖移动端设备的能力，如罗盘、加速度计、相机、麦克风等​。

Cocos Creator 支持将游戏发布到抖音 PC 小游戏，下面我们来看看，如何通过 Cocos Creator 将游戏发布到抖音 PC 小游戏平台。

## 使用 Cocos Creator 接入抖音 PC 小游戏

### 准备工作

下载并安装最新版本的 [抖音直播伴侣 PC 版](https://streamingtool.douyin.com/)。

### 发布流程

1. 参考 [发布到抖音小游戏](./publish-bytedance-mini-game.md) 的流程，将项目工程发布到抖音小游戏。
2. PC 端小游戏需要代码运行在严格模式才能保障正常运行，因此请将代码使用严格模式进行编译，并且修改因严格模式造成的问题，否则可能造成运行时报错。​  
3. 在直播伴侣调试前先保证在 IDE 上能够正常运行

## 常见问题

Q：抖音 PC 小游戏支持 Mac 系统吗？<br>
A：暂时不可以。

## 相关链接

- [抖音 PC 小游戏接入指南](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/guide/open-ability/pc-game/tutorial)
- [抖音 PC 版下载](https://streamingtool.douyin.com/)
- [抖音 开发者工具--IDE 下载](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/developer-instrument/developer-instrument-update-and-download)
