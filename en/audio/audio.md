# Audio playback

- Audio loading method: [Audio resource](../asset-workflow/audio-asset.md)

## Use AudioSource component

1. Create an empty node
2. In this empty node, add an 'other component' - 'AudioSource'
3. Add audioSource to script:
```
cc.Class({
    properties: {
        audioSource: {
            type: cc.AudioSource,
            default: null
        },
    },
    play: function () {
        this.audioSource.play();
    },
    pause: function () {
        this.audioSource.pause();
    },
});
```

## Use AudioEngine

> Starting from 1.10, AudioClip changed from Rawasset to Asset, and the usage is different from the original. If you are still using an older version of Creator, check the [older version of the document](https://github.com/cocos-creator/creator-docs/blob/8e6e4d7ef644390ec40d6cc5d30d8f1e96e46855/en/audio/audio.md)。

1. Defines a audioClip resource object within the script
2. Use cc.audioEngine.play (audio, loop, volume);
```
cc.Class({
    properties: {
        audio: {
            default: null,
            type: cc.AudioClip
        }
    },
    
    onLoad: function () {
        this.current = cc.audioEngine.play(this.audio, false, 1);
    },
    
    onDestroy: function () {
        cc.audioEngine.stop(this.current);
    }
});
```

Audio needs an AudioClip object, not url. So we recommend avoiding url, try to use audioClip as much as possible to replace url.
