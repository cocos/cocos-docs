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

更多音频接口的脚本接口请参考 [AudioSource API](../../../api/zh/classes/AudioSource.html)。

#### 关于自动播放的问题

由于 Android，IOS 移动端的浏览器以及微信自带的浏览器为了用户更好的体验，规定不自动播放音频，如果要想达到自动播放效果，需要单独处理。用户可以通过创建一个全局的触摸事件用于播放音频

```js
cc.Class({
    extends: cc.Component,
    properties: {
       audioSource: cc.AudioSource
    },

    onStart () {
       let canvas = cc.find('Canvas');
       canvas.on('touchstart', this.playAudio, this);
    },
    
    playAudio () {
      this.audioSource.play();
    }
});
```
