# Overview of sound systems

There are __two__ types of sounds available in the audio system: __sound effects__ and __music__. __Sound effects__ are short bursts of quick sounds that signal the player of the game making progress. A few examples of __sound effects__ are __gun noises__, __bullets firing__, a __character jumping__, __physics contact events__ and many others. __Music__ is longer in length and usually played in a loop. A few examples of __music__ are __background music__, __cut scenes__, __successfully completing a milestone in the game__ and many others.

All audio assets are imported into the editor in the format of **audioClip** assets. If you want to play audio, you first need to create an **AudioSource** in the scene.

For music, **audioClip** assets can be assigned directly to the `clip` property on an **AudioSource**. If you want to play music you can set the `playOnAwake` property of the **AudioSource** to true or call its `play` method in the script.

For sound effects, you can call the `playOneShot` method of **AudioSource** in the script, calling this method requires incoming sound clips and the volume of playback.

Note that although the **audioClip** asset itself also has direct interface implementations such as `play`, but **AudioSource** is the usual entry point, try to use components to component the workflow.

## Audio related event

All **AudioClip** asset objects are one EventTarget:

* The `started` event is sent when the audio starts to actually play.

* When the audio playback ends naturally, the `ended` event will be issued.

## Platform differentiation

*Web audio API*, *DOM audio*, *WeChat mini game* audio are currently supported, although the audio interface implementations of each platform are not fully unified at runtime.

There is, however, some incongruity in the engine:

* The *DOM audio* mode on *iOS* does not support adjusting the volume, and not all volume related attributes will not be available. Calling `playOneShot` multiple times causes the audio currently playing to stop and then replay the same audio.

* Only *Web Audio* mode supports multiple playback of the same audio. In other modes, to avoid repeated creation,the playing

* Most platforms have complied with the latest [Audio Play Police](https://www.chromium.org/audio-video/autoplay). Even if `playOnAwake` is set, it will only start playing when user input is first received.
