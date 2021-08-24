# AudioSource 组件参考

![](audio/audiosource.png)

## 属性

|属性            | 说明                    |
|:--            | :--                     |
|Clip           | 用来播放的声音资源对象      |
|Loop           | 是否循环播放              |
|PlayOnAwake    | 是否在组件激活后自动播放声音 |
|Volume         | 音量大小，范围在 0~1 之间   |

## 监听音频播放事件

AudioSource 组件在 v3.3.0 支持了事件监听接口，具体使用范例如下：

```typescript
@ccclass('AudioDemo')
export class AudioDemo extends Component {

    @property(AudioSource)
    audioSource: AudioSource = null!;

    onEnable () {
        // Register the started event callback
        this.audioSource.node.on(AudioSource.EventType.STARTED, this.onAudioStarted, this);
        // Register the ended event callback
        this.audioSource.node.on(AudioSource.EventType.ENDED, this.onAudioEnded, this);
    }

    onDisable () {
        this.audioSource.node.off(AudioSource.EventType.STARTED, this.onAudioStarted, this);
        this.audioSource.node.off(AudioSource.EventType.ENDED, this.onAudioEnded, this);
    }

    onAudioStarted () {
        // TODO...
    }

    onAudioEnded () {
        // TODO...
    }
}
``` 

更多声音接口的脚本接口请参考 [AudioSource API](__APIDOC__/zh/#/docs/3.3/zh/component-audio/Class/AudioSource)。  
具体的播放控制，可以参考文档 [声音系统总览](./overview.md)。

