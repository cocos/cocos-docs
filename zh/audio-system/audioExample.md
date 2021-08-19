# 音频播放示例

在 V3.0 中 Cocos Creator 废弃了 `cc.audioEngine` 系列的 API。目前采用的是用 `AudioSource` 组件来进行背景音乐和音效的播放和控制。

## 音乐播放

1. 在 **层级管理器** 上创建一个空节点。
2. 选中空节点，在 **属性检查器** 最下方点击 **添加组件 -> Components -> AudioSource** 来添加 AudioSource 组件。
3. 将 **资源管理器** 中所需的声音资源拖拽到 AudioSource 组件的 Clip 中，如下所示:

   ![audioClip](audio/audiocilp.gif)

4. 根据需要对 AudioSource 组件的其他参数项进行设置即可，参数详情可参考 [AudioSource 组件参考](./audiosource.md)。

如果只需要在游戏加载完成后自动播放声音，那么勾选 AudioSource 组件的 **PlayOnAwake** 即可。如果要更灵活的控制 AudioSource 的播放，可以在将定义脚本添加到 **AudioSource 组件** 所在的节点，然后调用相应的 API，如下所示：

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
        this._audioSource.play();
    }

    pause () {
        this._audioSource.pause();
    }
}
```

## 音效播放

相较于长的音乐播放，音效播放具有以下特点：
- 播放时间短
- 同时播放的数量多

针对这样的播放需求，AudioSource 组件提供了 `playOneShot` 接口来播放音效。具体代码实现如下：

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

## 项目实用

由于在 Cocos Creator V3.0 的版本中废弃了废弃了 `cc.audioEngine` 系列的 API，因此开发者也可以将 **AudioSource 组件** 声明为常驻根节点。封装一个管理器进行使用。如下所示：

```typescript
@ccclass('GameRoot')
export class GameRoot extends Component {
    
    @property(AudioSource) 
    _audioSource: AudioSource = null!;

    onLoad () {
        const audioSource = this.node.getComponent(AudioSource)!;
        assert(audioSource);
        this._audioSource = audioSource;
        //声明常驻根节点，该节点不会在场景切换中被销毁。 目标节点必须位于为层级的根节点，否则无效。
        game.addPersistRootNode(this.node);

        // 将节点封装到管理器中
        audioManager.instance.init(this._audioSource);
    }
}
```

特别需要注意到一点的是常驻节点在切场景时会暂停音乐，需要在 onEnable 进行继续播放播放操作。如下所示：

```typescript
@ccclass('GameRoot')
export class GameRoot extends Component {

    onEnable () {
        audioManager.instance.playMusic(true);
    }
}

```

>**注意：** 这一点后续在引擎中会解决这个问题，请关注版本公告。

在官方的示例项目快上车 3D 示例项目中。有封装好完整的音效播放的管理器使用。示例项目可以在 Cocos Dashboard 项目管理器中，选择 **项目**，接着选择右下角的 **新建**。选择合适的编辑器版本之后，选择 **Example Taxi Game** 项目，点击右下角的创建并打开，即课查看。如下所示：

   ![audioEdit](audio/audioEdit.png)

也可以在 **快上车 3D**（[GitHub](https://github.com/cocos-creator/tutorial-taxi-game) | [Gitee](https://gitee.com/mirrors_cocos-creator/tutorial-taxi-game)）中进行查看。
