# XR Spatial Audio

XR Spatial Audio is an important technology in the virtual reality field that can simulate audio environments from the real world, providing users with a more immersive auditory experience in virtual reality. **Sound-Tracking** technology based on head-mounted displays can simulate audio environments from the real world by tracking the user's head movements. When users move their heads in a virtual reality environment, the system can adjust the position and direction of the audio based on the user's head movements and position, creating a simulation of real-world audio environments.

## XR Spatial Audio Features

| Property                   | Description                             |
| ---------------------- | -------------------------------- |
| Clip                   | References the audio file to be played.         |
| Loop                   | Determines if the audio should loop.               |
| Play On Wake           | Determines if the audio should play automatically when the project starts.   |
| Volume                 | Sets the volume level of the audio.                     |
| Distance Rolloff Model | Determines the distance-dependent volume attenuation model. |

## Using XR Spatial Audio

Select the node object to which you want to add audio, and add the component in the property manager **XR -> Extra -> XRSpatialAudioSource**.

<img src="./xr-spatial-audio/add-spatial-audio.png" style="zoom:50%;" />

## Acknowledgments

The Spatial Audio feature references the GoogleVR library. Please refer to the `LICENSE_googlevr.txt` file in the licenses folder for the licensing details.

For Google API service terms that cover this SDK, please refer to
 [https://developers.google.com/terms/](https://developers.google.com/terms/)。

> **Note**: The Spatial Audio feature requires an extension version >= 1.2.0 and the Cocos Creator version >= 3.7.3.
