# AudioSource 组件参考

![](../audio/audio/audiosource.png)

## 属性

属性                | 说明
--                  | --
Clip                | 用来播放的音频资源对象
Volume              | 音量大小，范围在 0~1 之间
Mute                | 是否静音
Loop                | 是否循环播放
Play on load        | 是否在组件激活后自动播放音频
preload             | 是否在未播放的时候预先加载

更多音频接口的脚本接口请参考 [AudioSource API](%__APIDOC__%/zh/classes/AudioSource.html)。

#### 关于自动播放的问题

一些移动端的浏览器或 **WebView** 不允许自动播放音频，用户需要在触摸事件中手动播放音频。

```js
cc.Class({
    extends: cc.Component,
    properties: {
       audioSource: cc.AudioSource
    },

    start () {
       let canvas = cc.find('Canvas');
       canvas.on('touchstart', this.playAudio, this);
    },
    
    playAudio () {
      this.audioSource.play();
    }
});
```
