# Integrating Douyin PC Mini Games

Douyin PC Mini Games allow you to play Douyin mini-games directly through the Streaming Companion. PC mini-games retain most features available on mobile but currently do not support the following: `keyDown`/`keyUp` keyboard events, screen recording, recording, ads, sharing, favorites, group chat, sidebar, payments, or capabilities that depend heavily on mobile device hardware, such as compass, accelerometer, camera, and microphone.

Cocos Creator supports publishing games to Douyin PC Mini Games. Let’s look at how to publish your game to the Douyin PC mini-game platform through Cocos Creator.

## Using Cocos Creator to Integrate Douyin PC Mini Games

### Preparation

Download and install the latest version of the [Douyin Streaming Companion for PC](https://streamingtool.douyin.com/).

### Publishing Process

1. Follow the process in [Publishing to Douyin Mini Games](./publish-bytedance-mini-game.md) to publish the project to Douyin Mini Games.
2. Douyin PC Mini Games require code to run in strict mode to ensure proper functionality. Compile the code in strict mode and resolve any issues arising from strict mode to avoid runtime errors.
3. Ensure the game runs smoothly in the IDE before debugging on the Streaming Companion.

## FAQs

**Q**: Does Douyin PC Mini Games support Mac systems?  
**A**: Not yet.

## Related Links

- [Douyin PC Mini Games Integration Guide](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/guide/open-ability/pc-game/tutorial)
- [Douyin PC Download](https://streamingtool.douyin.com/)
- [Douyin Developer Tools - IDE Download](https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/developer-instrument/developer-instrument-update-and-download)