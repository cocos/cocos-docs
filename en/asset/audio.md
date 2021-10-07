# Audio

__Sound__ assets are __audio files__. An __audio system__ has two main functions: __playing background music__ and __playing short sound effects__.
For sound assets, there is no difference between the two. After all, audio assets are imported into the editor, `AudioClip` assets perform related audio operations through the `AudioSource` system component. To use the audio system, please refer to the [Audio System](../audio-system/overview.md) documentation.

## Supported Audio Asset Formats

Currently, the engine's audio system can support the following formats:

  1. `.ogg`
  2. `.mp3`
  3. `.wav`
  4. `.mp4`
  5. `.m4a`

## Loading Modes of Audio Resources on the Web Platform

Audio resources on the Web platform are special because the Web standard supports loading audio resources in two different ways as follows:

- **Web Audio**: provides a relatively more modern audio control interface, and the audio resource is cached in the engine as an audio buffer. The advantage of this approach is good compatibility and robust.

- **DOM Audio**: plays the sound resource by generating a standard audio element, which is cached. When using the standard audio element to play audio resources, some compatibility issues may be encountered in some browsers. For example, browsers on iOS do not support setting volume, and all volume related properties will not be available.

The engine currently tries to load audio resources as Web Audio by default. If it detects that the browser does not support loading Web Audio, it will fall back to the DOM Audio mode.

If the project needs to force using DOM Audio mode, use the following to load the audio resources dynamically:

```typescript
assetManager.loadRemote('http://example.com/background.mp3', {
    audioLoadMode: AudioClip.AudioType.DOM_AUDIO,
}, callback);
```
