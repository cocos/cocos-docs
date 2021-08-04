# 音频播放示例

在 V3.0 中 Cocos Creator 废弃了 `cc.audioEngine` 系列的API。目前采用的是用 `AudioSource` 组件来进行背景音乐和音效的播放和控制。

## 音乐播放

1. 在 **层级管理器** 上创建一个空节点。
2. 选中空节点，在 **属性检查器** 最下方点击 **添加组件 -> Components -> AudioSource** 来添加 AudioSource 组件。
3. 将 **资源管理器** 中所需的声音资源拖拽到 AudioSource 组件的 Clip 中，如下所示:

   ![audioClip](audio/audiocilp.gif)

4. 根据需要对 AudioSource 组件的其他参数项进行设置即可，参数详情可参考 [AudioSource 组件参考](./audiosource.md)。

如果只需要在游戏加载完成后自动播放声音，那么勾选 AudioSource 组件的 **PlayOnAwake** 即可。如果要更灵活的控制 AudioSource 的播放，可以在自定义脚本中获取 **AudioSource 组件**，然后调用相应的 API，如下所示：

```typescript
// AudioController.ts
@ccclass("AudioController")
export class AudioController extends Component { 
    
    @property(AudioSource)
    public audioSource: AudioSource = null!;

    play () {
        this.audioSource.play();
    }

    pause () {
        this.audioSource.pause();
    }
}
```

然后在编辑器的 **属性检查器** 中添加对应的用户脚本组件。选择相对应的节点，在 **属性检查器** 最下方点击 **添加组件 -> 自定义脚本 -> 用户脚本**，即可添加脚本组件。然后将带有 AudioSource 组件的节点拖拽到脚本组件中的 **Audio Source** 上，如下所示：

![audioController](audio/audiocontroller.png)