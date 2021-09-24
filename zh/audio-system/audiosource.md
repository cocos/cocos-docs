# AudioSource 组件参考

AudioSource 组件用于播放音乐和音效。

![audioSource](audio/audiosource.png)

## 属性

|属性            | 说明                    |
|:--            | :--                     |
|Clip           | 用来播放的声音资源对象      |
|Loop           | 是否循环播放              |
|PlayOnAwake    | 是否在组件激活后自动播放声音 |
|Volume         | 音量大小，范围在 0~1 之间   |

## 通过编辑器播放音乐音效

1. 在 **层级管理器** 上创建一个空节点。
2. 选中空节点，在 **属性检查器** 最下方点击 **添加组件 -> Components -> AudioSource** 来添加 AudioSource 组件。
3. 将 **资源管理器** 中所需的声音资源拖拽到 **AudioSource** 组件的 Clip 中，如下所示:

   ![audioClip](audio/audiocilp.gif)

4. 根据需要对 AudioSource 组件的其他参数项进行设置即可。

## 通过脚本控制音乐音效

如果要更灵活的控制 AudioSource 的播放，可以在将定义脚本添加到 **AudioSource 组件** 所在的节点，然后调用相应的 API 即可通过脚本控制。

### 音乐播放

```typescript
// GameRoot.ts
@ccclass("GameRoot")
export class GameRoot extends Component { 
    
    @property(AudioSource)
    public _audioSource: AudioSource = null!;

    onLoad(){
        const audioSource = this.node.getComponent(AudioSource)!;
        assert(audioSource);
        this._audioSource = audioSource;
    }

    play () {
        //播放音乐
        this._audioSource.play();
    }

    pause () {
        //暂停音乐
        this._audioSource.pause();
    }
}
```

## 音效播放

相较于长的音乐播放，音效播放具有以下特点：

- 播放时间短
- 同时播放的数量多

针对这样的播放需求，**AudioSource** 组件提供了 `playOneShot` 接口来播放音效。具体代码实现如下：

```typescript
// GameRoot.ts
@ccclass("GameRoot")
export class GameRoot extends Component {     

    @property(AudioClip)
    public clip: AudioClip = null!;   

    @property(AudioSource)
    public audioSource: AudioSource = null!;

    playOneShot () {
        this.audioSource.playOneShot(this.clip, 1);
    }
}
```

> **注意**：`playOneShot` 是一次性播放操作，播放后的声音没法暂停或停止播放，也没法监听播放结束的事件回调。

更多声音接口的脚本接口请参考 [AudioSource API](__APIDOC__/zh/classes/component_audio.audiosource.html)。

具体的播放控制，可以参考文档 [AudioSource 播放示例](./audioExample.md)。
