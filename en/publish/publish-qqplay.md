# Publishing to __QQ Play__

__QQ Play__ is similar to __WeChat Mini Games__, but built on the __QQ__ platform. __QQ Play__ allows you to play a variety of popular mobile games *without downloading* them. The underlying runtime of **QQ Play** is not a real HTML browser kernel, but a self-developed Bricks game engine. __Cocos Creator__ has supported game content cross-platform publishing to __QQ Play__ since v1.9.

 As a cross-platform game engine, __Cocos Creator's__ main tasks for users include:

- The engine is responsible for adapting the __QQ Play__ platform, the user's game logic code does not require any additional modifications.
- The __Cocos Creator__ editor provides a packaging process that can be directly published as a game that meets the __QQ Play__ specification.
- Support remote __QQ__ resource loading, caching, and version control of cache resources for __QQ Play__ platform standard.

## Use __Cocos Creator__ to publish to __QQ Play__ with one-click.

### Ready to work

Obtain the Bricks engine project (this project is temporarily unavailable, developers can apply to the __Cocos Creator__ engine team for internal testing, or directly apply to Tencent for bitbucket library read access)

### Publishing process

**First**, use __Cocos Creator__ to open the project project you want to publish, and select __QQ Play__ platform in the __Build...__ panel. If necessary, you can set the `Remote server address` option. Then click on **Build**.

![](./publish-qqplay/build.jpeg)

After the build is complete, a __qqplay__ release package will be generated in the __build__ directory:

![](./publish-qqplay/package.jpeg)

**Second**, copy the contents of the __qqplay__ folder to the __Res__ folder of the Bricks Engine project:

![](./publish-qqplay/paste.jpeg)

**Third**, open the Xcode project in the Bricks engine, you can compile and debug the __QQ Play__ game directly, see the [Bricks Engine Official Debugging Document](https://hudong.qq.com/docs/engine/debug/intro.html).

**Note:** there is also a [teaching video](https://v.qq.com/iframe/player.html?vid=m055288q7cl&tiny=0&auto=0) that can be used alongside this document.

## __QQ Play__ Known issues

Currently, only Xcode is used for compiling and developing on Mac. In addition, our adaptation of __QQ Play__ has not been completely completed, and the following modules are still not supported:

- Label: TTF is not supported, and system fonts can only use default fonts.
- Particle system: Does not support storing texture data in plist, only supports texture URL
- WebView
- VideoPlayer
- DeviceMotion

The above functions are expected to be gradually supported in future updates, and we will continue to communicate closely with __QQ Play__ engineers to continuously optimize the adaptation effect.

## Access Notes

- The first package must be within 10MB, and subsequent resources can be deployed on the __Tencent CDN__ using https for loading.
- Software copyright is required before going online, and proof of application number, receipt or receipt of screenshots is provided.
- Except for the games developed by Tencent Studios, the official names such as QQ, Tencent, Everyday, All People, and Joy are not allowed.
- The game must have its own hall. The lobby needs to have a start game (including inviting friends), an item store, and an event entrance.
- The ability to share to QQ friends / QQ space is required in the game.
- The game needs to use the self-built background and must be connected to openkey authentication.

## Reference link

For more details, please refer to [QQ Play official documentation](https://hudong.qq.com/docs/access/).
