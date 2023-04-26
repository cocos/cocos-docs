# 接入微信 PC 小游戏

微信 PC 小游戏即支持在微信 PC 版打开微信小游戏。PC 小游戏将具备移动端的大部分能力，包括但不限于虚拟支付、开放数据域、触摸事件等（广告目前暂不支持）。同时 PC 小游戏还支持键盘、鼠标事件及自定义窗口等功能。

Cocos Creator 支持将游戏发布到微信 PC 小游戏，并完成了鼠标、键盘相关接口的适配工作。下面我们来看看，如何通过 Cocos Creator 将游戏发布到微信 PC 小游戏平台。

## 使用 Cocos Creator 接入微信 PC 小游戏

### 准备工作

下载并安装最新版本的 [微信 PC 版](https://pc.weixin.qq.com/)，使用微信开发者工具绑定的微信号登录微信 PC 版。

### 发布流程

1. 参考 [发布到微信小游戏](./publish-wechatgame.md) 的流程，将项目工程发布到微信小游戏。

2. 在 **微信开发者工具** 中，点击上方工具栏中的 **预览** 按钮，选择 **自动预览** 选项卡，勾选 **启动 PC 端自动预览**，然后点击 **编译并预览**，即可在微信 PC 版预览并调试小游戏。

    ![WeChat PC preview](./publish-wechatgame/wechat-pc.png)

## 常见问题

Q：如何通过引擎接口区分微信的 **移动端** 与 **PC 端**？<br>
A：可以通过 `sys.isMobile` 判断，PC 端返回 `false`，移动端返回 `true`。<br>
> **注意**：微信开发者工具中的模拟器，模拟的是移动端环境，所以这里返回的是 `true`。

Q：微信 PC 小游戏支持 Mac 系统吗？<br>
A：是的, 微信 PC 小游戏目前已支持 Mac 系统。发布流程与上述一致。

## 相关链接

- [微信 PC 小游戏接入指南](https://developers.weixin.qq.com/minigame/dev/guide/open-ability/pc-game.html)
- [微信 PC 版下载](https://pc.weixin.qq.com/)
