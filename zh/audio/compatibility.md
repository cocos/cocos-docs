# 音频兼容性说明

## DOM Audio

一般的浏览器都支持 **Audio** 标签的方式播放音频。引擎内的 DOM Audio 模式通过创建 Audio 标签来播放一系列的声音。但是在某些浏览器上可能会出现下列情况：

1. 部分移动浏览器内，Audio 的回调缺失，会导致加载时间偏长的问题。所以我们尽量推荐使用 WebAudio。
2. iOS 系统上的浏览器，必须是用户主动操作的事件触发函数内，才能够播放这类型的音频。使用 javascript 主动播放可能会被忽略。

## WebAudio

WebAudio 的兼容性比 DOM 模式好了不少，不过也有一些特殊情况：

- iOS 系统上的浏览器，默认 WebAudio 时间轴是不会前进的，只有在用户第一次触摸并播放音频之后，时间轴才会启动。也就是说页面启动并播放背景音乐可能做不到。最好的处理方式就是引导用户点击屏幕，然后播放声音。

## iOS WeChat 自动播放音频

WeChat 内加载 js sdk 之后，会有一个事件 `WeixinJSBridgeReady`，在这个事件内，也是可以主动播放音频的。所以如果需要启动立即播放背景音乐，可以这么写：

```javascript
document.addEventListener('WeixinJSBridgeReady', function () {
    cc.resources.load('audio/music_logo', cc.AudioClip, (err, audioClip) => {
        var audioSource = this.addComponent(cc.AudioSource);
        audioSource.clip = audioClip;
        audioSource.play();
    });
});
```

并在引擎启动之后，使用其他方式播放音频的时候停止这个音频的播放。
