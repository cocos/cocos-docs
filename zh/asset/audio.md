# 声音资源

声音资源就是音频文件。<br>
对于声音系统来说，其接口主要面向两种需求：长度较长的音乐，长度短的音效。<br>
但对于声音资源来说，两者并没有区别，所有的音频资源在导入编辑器之后，AudioClip 资源通过 AudioSource 声音系统组件来进行相关的音频操作。关于声音系统的使用，请参考：[声音系统](../audio-system/overview.md)

## 支持的声音资源的格式

目前引擎的音频系统已经能够支持 web 原生支持的格式：
- .ogg
- .mp3
- .wav
- .mp4
- .m4a

## 关于 Web 平台声音资源的加载模式

Web 平台上的声音资源比较特别，因为 Web 标准支持以两种不同的方式加载声音资源，分别是：
- Web Audio: 提供相对更加现代化的声音控制接口，在引擎内是以一个 audio buffer 的形式缓存的。这种方式的优点是兼容性好，问题比较少。
- DOM Audio: 通过生成一个标准的 audio 元素来播放声音资源，缓存的就是这个 audio 元素。使用标准的 audio 元素播放声音资源的时候，在某些浏览器上可能会遇到一些兼容性问题。比如：iOS 上的浏览器不支持调整音量大小，所有 volume 相关属性将不会有效。

目前引擎默认会尝试以 Web Audio 的方式加载声音资源。如果检测到浏览器不支持加载 Web Audio，则会回滚到 DOM Audio 的方式。

如果项目需要强制使用 DOM Audio 的声音资源，请使用以下方式动态加载声音资源：

```typescript
assetManager.loadRemote('http://example.com/background.mp3', {
    audioLoadMode: AudioClip.AudioType.DOM_AUDIO,
}, callback);
```
