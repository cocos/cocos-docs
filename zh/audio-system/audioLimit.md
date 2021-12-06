# 兼容性说明

## Web 平台音频资源的加载模式

Web 平台上的音频资源比较特别，因为 Web 标准支持以两种不同的方式加载音频资源，分别是：
- Web Audio：提供相对更加现代化的声音控制接口，在引擎内是以一个 audio buffer 的形式缓存的。这种方式的优点是兼容性好，问题比较少。
- DOM Audio：通过生成一个标准的 audio 元素来播放音频资源，在引擎内缓存的就是这个 audio 元素。使用标准的 audio 元素播放音频资源时，在某些浏览器上可能会遇到一些兼容性问题，比如 iOS 上的浏览器不支持调整音量大小，所有 volume 相关属性将不会生效。

目前 Creator 默认以 Web Audio 的方式加载音频资源，但如果检测到当前浏览器不支持加载 Web Audio，则会切换使用 DOM Audio 的方式加载音频。

如果项目需要强制通过 DOM Audio 的方式加载音频资源，请使用以下方式动态加载：

```typescript
assetManager.loadRemote('http://example.com/background.mp3', {
    audioLoadMode: AudioClip.AudioType.DOM_AUDIO,
}, callback);
```
