# Audio Compatibility

## DOM Audio

The average browser supports the **Audio** tag to play audio. The __DOM Audio__ mode in the engine plays a series of sounds by creating an audio tag. However, the following may occur on some browsers:

1. In some mobile browsers, the **Audio** callback is missing, which will cause a long load time. So we try to recommend __WebAudio__ (see below).
2. The browser on IOS must be in the event trigger function actively operated by the user to play this type of audio. Active playback using javascript may be ignored.

## WebAudio

__WebAudio__ compatibility is much better than __DOM__ mode, but there are some special considerations to think about:

- On iOS, the default __WebAudio__ timeline will not advance. The timeline will only start after the user touches and plays the audio for the first time. This means that the page may not be able to start and play background music. The best way to do this is to guide the user through the screen and then play the sound.

## IOS WeChat automatically plays audio

After loading the __js sdk__ in WeChat, the `WeixinJSBridgeReady` event, can be used to also play audio. If you need to start playing background music immediately, use the following:

```javascript
document.addEventListener('WeixinJSBridgeReady', function () {
    cc.resources.load('audio/music_logo', cc.AudioClip,  (err, audioClip) => {
        var audioSource = this.addComponent(cc.AudioSource);
        audioSource.clip = audioClip;
        audioSource.play();
    });
});
```

And after the engine is started, make sure to stop playing this audio before playing audio in other ways.
