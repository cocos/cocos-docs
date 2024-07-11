# Play Audio

- Audio loading method: [Audio Resource](../asset-workflow/audio-asset.md)

## Use AudioSource component

1. Create an empty node on the **Node Tree**
2. Select the empty node and click **Add Component -> Other Component -> AudioSource** at the bottom of the **Properties** to add the AudioSource component.
3. Drag the audio resources in **Assets** to the **Clip** of the AudioSource component, as follows:

![](audio/audiosource.png)

Then set the other parameter of the AudioSource component as needed, for the details of parameter can refer [Audiosource Component Reference](../components/audiosource.md).

- **Control AudioSource components with scripts**

    If you only need to play the audio automatically after the game is loaded, check the **Play On Load** of the AudioSource component. If you want more flexibility in controlling AudioSource playback, you can get the **AudioSource Component** in the custom script and then call the appropriate API. As shown below:

    ```js
    // AudioSourceControl.js
    cc.Class({
        extends: cc.Component,

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

    Then add the corresponding custom component to the editor's **Properties**. Selecting the corresponding node and add the custom component by clicking **Add Component-> Custom Component -> User Script** at the bottom of the **Properties**. Then drag and drop the node with the AudioSource component onto **Audio Source** in the custom component. As shown below:

    ![](audio/audiosourcecontrol.png)

## Use AudioEngine

Both AudioEngine and AudioSource can play audio. The difference is that AudioSource is a component that can be added to the Scene and set by the editor. And AudioEngine is a pure API provided by the engine and can only be called in scripts. As shown below:

1. Defines an AudioClip resource object in the `properties` of the script
2. Play directly with `cc.audioEngine.play(audio, loop, volume);`, as shown below:

    ```js
    // AudioEngine.js
    cc.Class({
        extends: cc.Component,

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

It is currently recommended to use the [audioEngine.play](%__APIDOC__%/en/classes/audioEngine.html#play) interface to play audio in unison. Or you can use the two interfaces [audioEngine.playEffect](%__APIDOC__%/en/classes/audioEngine.html#playeffect) and [audioEngine.playMusic](%__APIDOC__%/en/classes/audioEngine.html#playmusic), the former is mainly used to play sound effects, the latter is mainly used to play background music. See the API documentation for details.

When playing AudioEngine, it is important to note that a complete AudioClip object (not a URL) is passed in here. Therefore, it is not recommended to fill in the URL address of the audio directly within the `play` interface, but rather to the user to define a AudioClip in the `properties` of the script, and then add the corresponding custom component to the editor's **Properties**, dragging the audio resource into the `audio-clip` of the custom component. As shown below:

![](audio/audioengine.png)

> **Note**: if the audio playback related settings are complete, there is still no sound to be heard when previewing or running on some browsers, which may be due to browser compatibility issues. For example, Chrome disables automatic playback of Web Audio, while audio is loaded and played by default using Web Audio, where the user needs to select the audio resource in **Assets** and then modify the Download Mode of the audio to the DOM Audio in the **Properties** to play audio properly on the browser. For more information, please refer to [Audio Resource](../asset-workflow/audio-asset.md) and [Audio Compatibility](compatibility.md).
>
> ![mode](audio/mode.png)
