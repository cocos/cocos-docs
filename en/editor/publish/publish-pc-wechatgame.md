# Access to the WeChat PC Mini Games

WeChat PC mini game is support to open WeChat Mini Game in the WeChat PC Client. The WeChat PC mini game will have most of the capabilities of Mobile, including but not limited to virtual payment, open data context, touch events, etc. (Ads are not currently supported). It also provides keyboard events, mouse events, window customization and other features.

In Cocos Creator, creating games for the WeChat PC Mini Games is officially supported. And completes the adaptation of mouse and keyboard related interfaces.

## Use Cocos Creator to access to WeChat PC Mini Games

### Preparatory work

Download and install the latest version of [WeChat PC Client [cn]](https://pc.weixin.qq.com/) and login to it with the WeChat account bound to the WeChat DevTools.

### Release Steps

1. Refer to the process of [Publish to WeChat Mini Games](./publish-wechatgame.md) and publish the game project to the WeChat Mini Game.

2. In the **WeChat DevTools**, click the **Preview** button in the upper toolbar, select the **Automatic Preview** tab, check the **Launch PC for auto preview** option, and then click the **Compile and Remote Debug** button to preview and debug the mini game on the WeChat PC Client.

    ![WeChat PC preview](./publish-wechatgame/wechat-pc.png)

## FAQ

Q: How to distinguish the **Mobile** and **PC** of WeChat through the engine interface?<br>
A: You can determine by `sys.isMobile` that the PC side returns `false` and the mobile side returns `true`.<br>
**Note**: The simulator on the WeChat DevTools simulates the environment on the mobile, so this returns `true`.

Q: Does the WeChat PC mini game support Mac?<br>
A: Not yet supported. By 2021-01-19, WeChat PC mini game has been officially launched, and it only supports Windows currently. Later on, we will actively cooperate with the engineers of WeChat PC mini game to adapt the Mac system at the first time.

## Related Reference Links

- [WeChat PC mini game access guide [cn]](https://developers.weixin.qq.com/minigame/dev/guide/open-ability/pc-game.html)
- [WeChat PC Client Download [cn]](https://pc.weixin.qq.com/)
