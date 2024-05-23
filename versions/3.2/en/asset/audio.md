# Audio Assets

Cocos Creator supports importing most common audio file formats, just drag and drop them directly into the **Assets** panel, and the corresponding **AudioClip** will be generated in the **Assets** panel after import.

![audio-clip](audio-clip.png)

The audio can be divided into longer length **Music** and shorter length **Sound Effects** based on their length. Creator controls the playback of different audio assets through the AudioSource component to implement in-game background music and sound effects. For more details, please refer to the [AudioSource Component Reference](../audio-system/audiosource.md).

## Supported Audio Formats

Currently Cocos Creator supports importing audio files in the following formats:

| Audio Format | Description |
|:-- | :-- |
| `.ogg` | `.ogg` is an open source lossy audio compression format, which has the advantage of supporting multi-channel encoding and using a more advanced acoustic model to reduce the loss of sound quality, while the file size is smaller than `.mp3` format under the same conditions. Currently all the built-in ringtones for Android also use `.ogg` files.      |
|`.mp3` | `.mp3` is the most common digital audio encoding and lossy compression format. The purpose of compression is to compress PCM audio material into smaller files by discarding parts of the material that are not important to human hearing. MP3 is supported by a large number of hardware and software, and is widely used, and is currently the mainstream.            |
| `.wav` | `.wav` is a standard digital audio file developed by Microsoft and IBM specifically for Windows. This file can record various mono or stereo sound information, and can ensure that the sound is not distorted because the audio format is not compressed. However, the file size is relatively large. |
| `.mp4` | `.mp4` is a set of compression coding standards for audio and video information. Different coding algorithms can be used for different objects to further improve the compression efficiency.   |
| `.m4a` | `.m4a` is an audio-only MP4 file. The audio quality is very high among the compression formats, and the file footprint is smaller at the same bit rate.  |

With different audio encoding formats, the generated audio files vary in size and sound quality under the same conditions.
