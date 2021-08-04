# AudioSource 组件参考

![audioSource](audio/audiosource.png)

## 属性

|属性            | 说明                    |
|:--            | :--                     |
|Clip           | 用来播放的声音资源对象      |
|Loop           | 是否循环播放              |
|PlayOnAwake    | 是否在组件激活后自动播放声音 |
|Volume         | 音量大小，范围在 0~1 之间   |

更多声音接口的脚本接口请参考 [AudioSource API](__APIDOC__/zh/classes/component_audio.audiosource.html)。

具体的播放控制，可以参考文档 [AudioSource 播放示例](./audioExample.md)。

## Web 平台的播放限制

目前 Web 平台的声音播放需要遵守最新的 [Audio Play Police](https://www.chromium.org/audio-video/autoplay)，即使 AudioSource 组件设置了 `playOnAwake` 也会在第一次接收到用户输入时才开始播放。范例如下：

```typescript
// AudioController.ts
@ccclass("AudioController")
export class AudioController extends Component {      

    @property(AudioSource)
    public audioSource: AudioSource = null!;

    start () {
        let btnNode = find('BUTTON_NODE_NAME');
        btnNode!.on(Node.EventType.TOUCH_START, this.playAudio, this);
    }
    
    playAudio () {
        this.audioSource.play();
    }
}
```
