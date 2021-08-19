# 音频系统

在一款游戏中，没有音乐总是不完整的。好的音乐能让游戏更加丰富多彩，身临其境。因此在 Cocos Creator 中为开发者提供了良好的音频系统，为创造更好的游戏添砖加瓦。

## 音频文件

Cocos Creator 支持多种音频文件格式，在导入到项目中时所有声音资源都会在编辑器内导入成 AudioClip 资源。更多内容，可以查看 [音频文件](./audioFile.md)。

## 音频组件参考

在 v3.0 中使用 `AudioSource` 组件来进行音频的播放与控制。将音乐与音效的使用封装在同一个组件中，方便开发者使用。

具体内容可参考 [AudioSource 组件参考](./audiosource.md)。

## 音频播放示例

在 v3.0 中 Cocos Creator 废弃了 v2.X 中的 `audioEngine` 单例。统一采用了 `AudioSource` 组件进行音乐音效的播放。

具体内容可参考 [AudioSource 播放示例](./audioExample.md)。
