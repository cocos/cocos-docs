# 声音系统总览

声音系统的接口主要面向两类需求，一类是长度较长，循环持续播放的 “音乐”，一类是长度较短，一次性播放的 “音效”。<br>
所有音频资源都会在编辑器内导入成 AudioClip 资源，要播放声音，首先需要在场景里创建 AudioSource。

对于音乐，可以直接将 AudioClip 赋给 AudioSource 上的 `clip` 属性，勾选 `playOnAwake` 属性或脚本调用组件的 play 方法来控制播放；<br>
对于音效，可以在脚本里调用 AudioSource 的 `playOneShot` 方法，在调用时传入要播放的音效片段和音量。

注意虽然 AudioClip 资源本身也直接有 `play` 等接口实现，但 AudioSource 才是常规的播放入口，请尽量使用组件完成工作流。

## 音频相关事件
所有的 AudioClip 资源对象都是一个 EventTarget：
* 在音频开始实际播放时，会发出 `started` 事件；
* 在音频播放自然结束时，会发出 `ended` 事件；

## 平台差异性

目前支持 Web Audio API、DOM 音频、微信小游戏音频三种接口，虽然运行时各个平台的音频接口实现并不完全统一，<br>
我们已经尽力在引擎中最小化这部分差异，但还是会存在一部分不可协调的不一致性：
* iOS 平台 DOM 音频模式不支持调整音量大小，所有 volume 相关属性将不会有效；
* 只有 Web Audio 模式支持同一音频的多重播放，其他模式下为避免重复创建，多次调用 `playOneShot` 的默认行为是从头开始重新播放；
* 目前大部分平台都已遵守最新的 [Audio Play Police](https://www.chromium.org/audio-video/autoplay)，即使设置了 `playOnAwake` 也会在第一次接收到用户输入时才开始播放；
