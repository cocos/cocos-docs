# Audio Assets

An **audio** asset is an **audio file**.<br>
For the **audio system**, its interface is geared to two main needs: "music" of longer lengths, and "sound" effects of shorter lengths.<br>
But for audio assets, there is no difference between the two. After all audio assets are imported into the editor, AudioClip assets perform the relevant audio operations through the AudioSource audio system component. For more information on using the audio system, please refer to the [Audio System](../audio-system/overview.md) documentation.

## Supported Formats of Audio Assets

The current audio system of the engine is able to support the formats natively supported by the web:
- .ogg
- .mp3
- .wav
- .mp4
- .m4a

## About the loading mode of audio assets on the Web platform

Audio assets on the Web platform are special because the Web standard supports loading audio assets in two different ways, namely
- Web Audio: provides a relatively more modern sound control interface, which is cached in the engine as an audio buffer. This approach has the advantage of good compatibility and fewer problems.
- DOM Audio: the audio asset is played by generating a standard audio element, which is cached. When using a standard audio element to play an audio asset, some compatibility issues may be encountered in some browsers. For example, browsers on iOS do not support volume resizing and all volume related properties will not work.

Currently, the engine tries to load audio assets as Web Audio by default. If it detects that the browser does not support loading Web Audio, it will roll back to the DOM Audio method.

If the project needs to force the use of DOM Audio audio assets, please load the audio assets dynamically using

```typescript
assetManager.loadRemote('http://example.com/background.mp3', {
    audioLoadMode: AudioClip.AudioType.DOM_AUDIO,
}, callback);
```
