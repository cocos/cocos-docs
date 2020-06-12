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

More audio interface to the script interface [AudioSource API](../../../api/en/classes/AudioSource.html).

#### Questions about autoplay

Since Android, IOS mobile browsers and WeChat's own browser for a better user experience. It is specified that the audio is not played automatically, but needs to be handled separately if the auto-play effect is to be achieved. The user can create a global touch event for playing audio by

```js
cc.Class({
    extends: cc.Component,
    properties: {
       audioSource: cc.AudioSource
    },

    onStart () {
       let canvas = cc.find('Canvas');
       canvas.on('touchstart', this.playAudio, this);
    },
    
    playAudio () {
      this.audioSource.play();
    }
});
```
