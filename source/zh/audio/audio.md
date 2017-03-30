# 音频播放

- 音频的加载方式请参考：[声音资源](../asset-workflow/audio-asset.md)

## 使用 AudioSource 播放

1. 创建一个空节点
2. 在这个空节点上，添加一个 '其他组件' - 'AudioSource'
3. 在脚本上预设好 AudioSource，并且根据实际需求，完善脚本的对外接口，如下：
```
cc.Class({
    properties: {
        audioSource: {
            type: cc.AudioSource,
            default: null
        },
    },
    play: function () {
        this.audioSource.play();
    },
    pause: function () {
        this.audioSource.pause();
    },
});
```

## 使用 AudioEngine 播放

1. 在脚本内定义一个 audioClip 资源对象，如下示例中 properties 对象内。
2. 直接使用 cc.audioEngine.play(audio, loop, volume); 播放。如下示例中 onLoad 中。

```
cc.Class({
    properties: {
        audio: {
            url: cc.AudioClip,
            default: null
        }
    },
    
    onLoad: function () {
        this.current = cc.audioEngine.play(this.audio, false, 1);
    },
    
    onDestroy: function () {
        cc.audioEngine.stop(this.current);
    }
});
```

AudioEngine播放的时候，需要注意这里的传入的是一个完整的 url（与 res 路径稍有不同）。
所以我们不建议在 play 接口内直接填写音频的 url 地址，而是希望大家先定义一个 AudioClip，然后在编辑器内将音频拖拽过来。


