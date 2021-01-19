# Audio

__Sound__ assets are __audio files__. An __audio system__ has two main functions: __playing background music__ and __playing short sound effects__.
For sound assets, there is no difference between the two. After all, audio assets are imported into the editor, `AudioClip` assets perform related audio operations through the `AudioSource` system component. To use the audio system, please refer to the [Audio System](../audio-system/overview.md) documentation.

## Supported audio asset formats

Currently, the engine's audio system can support the following formats:
  - `.ogg`
  - `.mp3`
  - `.wav`
  - `.mp4`
  - `.m4a`

## loading mode of audio resources on the Web platform

Audio resources on the Web platform are special because the Web standard supports loading audio resources in two different ways as follows:
- Web Audio: providing a relatively more modern interface for audio control, the audio resources will be cached in a buffer of the engine. The advantage of this approach is good compatibility and robust.
- DOM Audio: By generating a standard element to play the sound resources, the cache is the audio element. When using standard audio elements to play audio resources, you may encounter some restrictions on some browsers. For example, browsers on iOS does not support setting volume, and all volume-related properties will not be available.

The engine currently tries to load audio resources as Web Audio by default. If it detects that the browser does not support loading Web Audio, it will fall back to the DOM Audio mode.

If the project needs to force using DOM Audio mode, use the following to load the audio resources dynamically:
```javascript
assetManager.loadRemote('http://example.com/background.mp3', {
    audioLoadMode: AudioClip.AudioType.DOM_AUDIO,
}, callback);
```