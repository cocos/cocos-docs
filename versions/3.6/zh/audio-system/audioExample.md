# 音频播放示例

由于 Cocos Creator 3.x 移除了 v2.x `cc.audioEngine` 系列的 API，统一使用 AudioSource 控制音频播放，因此我们需要在项目中将 [AudioSource 组件](./audiosource.md) 声明为常驻根节点，并封装一个管理器使用。可参考以下代码：

```typescript
import { assert, AudioSource, Component, game } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameRoot')
export class GameRoot extends Component {
    
    @property(AudioSource) 
    _audioSource: AudioSource = null!;

    onLoad () {
        const audioSource = this.node.getComponent(AudioSource)!;
        assert(audioSource);
        this._audioSource = audioSource;
        // 声明常驻根节点，该节点不会在场景切换中被销毁。目标节点必须是根节点，否则无效。
        director.addPersistRootNode(this.node);

        // 将节点封装到管理器中
        audioManager.instance.init(this._audioSource);
    }
}
```

音频管理的具体实现，可参考以下代码：

```typescript
import { AudioClip, AudioSource, assert, warn, clamp01, resources } from "cc";
export class audioManager {

    private static _instance: audioManager;
    private static _audioSource?: AudioSource;

    static get instance () {
        if (this._instance) {
            return this._instance;
        }

        this._instance = new audioManager();
        return this._instance;
    }

    /**管理器初始化*/
    init (audioSource: AudioSource) {
        audioManager._audioSource = audioSource;
    }

      /**
     * 播放音乐
     * @param {Boolean} loop 是否循环播放
     */
    playMusic (loop: boolean) {
        const audioSource = audioManager._audioSource!;
        assert(audioSource, 'AudioManager not inited!');

        audioSource.loop = loop;
        if (!audioSource.playing) {
            audioSource.play();
        }
    }

     /**
     * 播放音效
     * @param {String} name 音效名称
     * @param {Number} volumeScale 播放音量倍数
     */
    playSound (name: string, volumeScale: number = 1 ) {
        const audioSource = audioManager._audioSource!;
        assert(audioSource, 'AudioManager not inited!');
            
        // 注意：第二个参数 “volumeScale” 是指播放音量的倍数，最终播放的音量为 “audioSource.volume * volumeScale”
        audioSource.playOneShot(audioClip, volumeScale);

    }
    // 设置音乐音量
    setMusicVolume (flag: number) {
        const audioSource = audioManager._audioSource!;
        assert(audioSource, 'AudioManager not inited!');

        flag = clamp01(flag);
        audioSource.volume = flag;
    }

}
```

以上代码片段只是举例了 AudioSource 组件播放的一种使用方式，并不完整。Creator 在范例项目 **快上车**（[GitHub](https://github.com/cocos/cocos-tutorial-taxi-game) | [Gitee](https://gitee.com/mirrors_cocos-creator/tutorial-taxi-game)）中提供了完整的封装好的音频播放管理器的使用示例。开发者可打开 Dashboard 的 **项目** 页面，点击右下角的 **新建** 按钮，进入新建项目页面，即可看到 **Example Taxi Game** 范例，根据需要填写项目名称和项目位置后即可创建并打开：

![audioEdit](audio/audioEdit.png)
