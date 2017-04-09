# Audio asset

Audio resources are simple audio files.

Gmae engine plays different sound resources for game background music and sound effects through basic interface of various platforms.

## About the loading mode of sound

Audio loading method only affects the loading effect on the Web. As the implementation of  Web platform is different, so two loading method of sound resources are provided.

### WebAudio
Loading audio resources with WebAudio, the audio resources will be cached in a buffer of the engine.

The advantage of this approach is good compatibility and robust. However the disadvantage is that too much memory will be occupied.

### Dom Audio
By generating a standard element to play the sound resources, the cache is the audio element.

When using standard audio elements to play sound resources, you may encounter some restrictions on some browsers.

For example, each play must be played within the user action event (WebAudio only requires the first time), allowing only one sound resource to be played.

## Manually choose to load audio by some sort of way
Sometimes we may not use the automatic loading or preload function of the scene, and want to manually control the cc.load resource loading process. We can choose different loading method to load audio resources from url.




<hr>

Continue on to read about [Prefabricate Asset](prefab.md).
