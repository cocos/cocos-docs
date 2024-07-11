# AudioSource Component

![](../audio/audio/audiosource.png)

## Properties

Properties          | Function Explanation
--                  | --
Clip                | Audio resource object to play
Volume              | Audio volume, the range is between 0~1
Mute                | Whether it is muted
Loop                | Whether it is loop
Play on load        | Whether to play audio automatically after the component is activated
preload             | Whether to load preloaded when it is not playing

More audio interface to the script interface [AudioSource API](%__APIDOC__%/en/classes/AudioSource.html).

#### Questions about autoplay

Some mobile browsers or **WebView** do not allow auto-playing of audio and users need to play the audio manually in a touch event.

```js
cc.Class({
    extends: cc.Component,
    properties: {
       audioSource: cc.AudioSource
    },

    start () {
       let canvas = cc.find('Canvas');
       canvas.on('touchstart', this.playAudio, this);
    },
    
    playAudio () {
      this.audioSource.play();
    }
});
```
