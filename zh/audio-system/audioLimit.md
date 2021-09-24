# 兼容性说明

## Web 平台的播放限制

目前 Web 平台的声音播放需要遵守最新的 [Audio Play Police](https://www.chromium.org/audio-video/autoplay)，即使 **AudioSource** 组件设置了 `playOnAwake` 也会在第一次接收到用户输入时才开始播放。范例如下：

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

## 关于 Web 平台声音资源的加载模式

Web 平台上的声音资源比较特别，因为 Web 标准支持以两种不同的方式加载声音资源，分别是：
- Web Audio: 提供相对更加现代化的声音控制接口，在引擎内是以一个 audio buffer 的形式缓存的。这种方式的优点是兼容性好，问题比较少。
- DOM Audio: 通过生成一个标准的 audio 元素来播放声音资源，缓存的就是这个 audio 元素。使用标准的 audio 元素播放声音资源的时候，在某些浏览器上可能会遇到一些兼容性问题。比如：iOS 上的浏览器不支持调整音量大小，所有 volume 相关属性将不会有效。

目前引擎默认会尝试以 Web Audio 的方式加载声音资源。如果检测到浏览器不支持加载 Web Audio，则会回滚到 DOM Audio 的方式。

如果项目需要强制使用 DOM Audio 的声音资源，请使用以下方式动态加载声音资源：

```typescript
assetManager.loadRemote('http://example.com/background.mp3', {
    audioLoadMode: AudioClip.AudioType.DOM_AUDIO,
}, callback);
```
