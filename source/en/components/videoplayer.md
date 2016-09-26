# VideoPlayer Component Reference

VideoPlayer is a component for playing videos, you could use this component for playing local video and remove videos.

Play local video：

![videoplayer](./videoplayer/videoplayer.png)

Play remote video：

![videoplayer-remote](./videoplayer/videoplayer-remote.png)

Click `add component` at the bottom of **Properties** panel and select `VideoPlayer` from `add UI component` popup.
Then you could add VideoPlayer component to the node.

For more info about VideoPlayer API reference [VideoPlayer API](../api/classes/VideoPlayer.html)。

## VideoPlayer Attribute

| Attribute | Function Explanation
|-------- | ----------- |
| Resource Type| The resource type of videoplayer, REMOTE for remote url and LOCAL for local file path.
| Clip | Displayed when Resource Type is LOCAL，feed it with a local video path.
| Remote URL | Displayed when Resource Type is REMOTE, feed it with a remote video URL.
| Current Time | The current time when video start to play.
| Keep Aspect Ratio | Whether keep the aspect ration of the original video.
| Is Fullscreen| Whether play video in fullscreen mode.
| Video Player Event| the video player's callback, it will be triggered when certain event occurs. Please refer to the `VideoPlayer Event` section for more details.

## VideoPlayer Event

### VideoPlayerEvent Event
| Attribute |   Function Explanation
| -------------- | ----------- |
|Target| Node with the script component.
|Component| Script component name.
|Handler| Specify a callback，when the video player is about to playing or paused, it will be called. There is a parameter in the callback which indicate the state of played videos. For more information, please refer to `Parameter of VideoPlayerEvent`.

### Parameter of VideoPlayerEvent

| Name |   Function Explanation
| -------------- | ----------- |
|PLAYING| Video is playing.
|PAUSED| Video is paused.
|STOPPED| Video is stopped.
|COMPLETED| Video is completed.

## Detailed Explanation
Currently this component is only available on Web(Both PC and Mobile), iOS and Android.
You can't use it on Mac or Windows which means if you preview VideoPlayer on these platforms, there is nothing to show.

The supported video types are determined by the supported OS, in order to make it works across all the supported platforms,
we suggest to use mp4 format.

<hr>
