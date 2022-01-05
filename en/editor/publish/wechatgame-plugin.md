# WeChat Mini Games Engine Plugin Instructions

> **Note**: some platforms only have Chinese documentation available when visiting the platform's website. It may be necessary to use Google Translate in-order to review the documentation.

The **Game Engine Plugin** is a new feature added to **WeChat v7.0.7**, which has the official version of the __Cocos Creator__ engine built in. If the plugin is enabled in the first game the player experiences, all games that also have the plugin enabled do not need to download the __Cocos Creator__ engine again, just use the same version of the engine directly from the public plugin library, or incremental update the engine.

For example, when a player has played an A game developed using __Cocos Creator__ v2.2.0, and the A game already enabled this plugin. Then he played the B Game, also developed by v2.2.0, and would not have needed to re-download the __Cocos Creator__ engine if the B game had also enabled this plugin. Even if the B Game is developed using __Cocos Creator__ v2.2.1, WeChat only needs to incremental update the difference between the two engine versions. This will drastically reduce the download counts of mini games, and improve the startup speed of mini games by 0.5~2s for a better user experience.

## How to use

Simply check the **Separate Engine** option in the **Build** panel, and then build and release as normal, without additional manual operation. (This feature is only available when the built-in engine is used and the build is in non-debug mode.)

![build-options](./wechatgame-plugin/build-options.png)

## FAQ

__Q:__ Does the engine plugin feature support engine customization?<br/>
__A:__ Not supported. If the version does not match or the engine customization is enabled during the build, the built package will not actually use the engine plugin feature properly, although the editor will continue to build after an error occurs.

__Q:__ The project enable the engine module clipping, should I need to disable it when using the engine plugin?<br/>
__A:__ No, the project can continue to use the engine module clipping as before. The engine plugin provides a complete engine that is compatible with all clipping settings without affecting the original project package.

__Q:__ After the engine plugin is enabled, will the engine code still be counted into the first package?<br/>
__A:__ According to WeChat's rules, it will still be counted.

__Q:__ After the engine plugin is enabled, can I remove all modules in **Project Setting -> Modules** of editor to reduce the package size?<br/>
__A:__ No, because WeChat only supports engine plugin since v7.0.7, if the engine is clipped randomly, the game may not be able to run on a lower version of WeChat.

__Q:__ When the engine plugin is enabled, prompt "Code package unpacking failed" or "Login user is not the developer of the Mini Program" in the WeChat DevTools, while the physical device previews correctly?<br/>
__A:__ The default appid in the **Build** panel is a common test id, and according to WeChat's rules, you need to fill in the **appid** applied for yourself to test the engine plugin.

__Q:__ When the engine plugin is enabled, prompt "Unauthorized plugin, `Add plugin`" in the WeChat DevTools?<br/>
__A:__ Click the `Add plugin` in the prompt, then select add **CocosCreator** plugin and recompile. If prompt "There are no plugins to add" when you add the plugin, you can select the **Clear Cache -> Clear All** option in the WeChat DevTools and try again.

## Reference documentation

> **Note**: some platforms only have Chinese documentation available when visiting the platforms website. It may be necessary to use Google Translate in-order to review the documentation.

- [WeChat Mini Games Engine Plugin Development Documentation](https://developers.weixin.qq.com/minigame/dev/guide/base-ability/game-engine-plugin.html)
