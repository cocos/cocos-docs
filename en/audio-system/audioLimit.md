# Compatibility Notes

## Loading modes for audio assets on the Web platform

Audio assets on the Web platform are special because the Web standard supports loading audio assets in two different ways, namely:
- Web Audio: provides a relatively more modern sound control interface, which is cached in the engine as an audio buffer. The advantage of this approach is good compatibility and fewer problems.
- DOM Audio: plays audio assets by generating a standard audio element, which is cached in the engine. When using standard audio elements to play audio assets, you may encounter some compatibility issues in some browsers, for example, iOS browsers do not support adjusting the volume, and all volume related properties will not take effect.

Currently, Cocos Creator loads audio assets as Web Audio by default, but if it detects that the current browser does not support loading Web Audio, it will switch to load audio as DOM Audio.

If the project needs to force audio assets to be loaded via DOM Audio, please load them dynamically using the following way:

```typescript
assetManager.loadRemote('http://example.com/background.mp3', {
    audioLoadMode: AudioClip.AudioType.DOM_AUDIO
}, (err, clip: AudioClip) => {
    if(err){
        console.log(err);
    }
});
```
