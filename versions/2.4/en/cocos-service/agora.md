> **Note**: this version of the documentation has been archived and is no longer maintained. Please move to the [latest version](https://service.cocos.com/document/en/agora.html).

# Agora RTC Quick Start

Agora is a leading video, voice and live interactive streaming platform, helping developers deliver rich in-app experiences—including embedded voice and video chat, real-time recording, interactive live streaming, and real-time messaging.

[Agora Interactive Live Streaming Premium](https://docs.agora.io/en/Interactive%20Broadcast/product_live?platform=Cocos%20Creator) enables one-to-many and many-to-many audio or video live streaming with the Agora RTC SDK.

### Functions

Agora Live Interactive Audio Streaming boasts a flexible combination of functions for different scenarios.

| Function                                | Description                                                  | Scenario                                                     |
| :--------------------------------------- | :------------------------------------------------------------ | :------------------------------------------------------------ |
| Co-hosting in a channel                 | An audience switches to a co-host and interacts with the existing host. | <li>Large-scale live streams where hosts can invite the audience to interact with them.</li><li>Online games such as Murder Mystery and Werewolf Killing.</li> |
| Co-hosting across channels              | Hosts interact with each other across channels.              | PK Hosting.                                                  |
| Audio mixing                            | Sends the local and online audio with the user's voice to other audience members in the channel. | <li>Online KTV.</li> <li>Interactive music classes for children.</li>  |
| Screen sharing                          | Hosts share their screens with the audience in the channel. Supports specifying which screen or which window to share, and supports specifying the sharing region. | <li>Interactive online classes.</li><li>Live streaming of gaming hosts.</li> |
| Basic image enhancement                 | Sets basic beauty effects, including skin smoothening, whitening, and cheek blushing. | Image enhancement in a video call.                           |
| Modify the raw data                     | Developers obtain and modify the raw voice or video data of the SDK engine to create special effects, such as a voice change. | <li>To change the voice in an online voice chatroom.</li><li>Image enhancement in a live stream.</li> |
| Inject an online media stream           | Injects an external audio or video stream to an ongoing live interactive streaming channel. The host and audience in the channel can listen to or watch the stream while interacting with each other. You can set the attributes of the video source. | <li>The host and audience watching a movie or game together.</li> |
| Customize the video source and renderer | Users process videos (from self-built cameras, screen sharing, or files) for image enhancement and filtering. | <li>To use a customized image enhancement library or pre-processing library.</li><li>To customize the application's built-in image and video modules.</li><li>To use other video sources, such as a recorded video.</li><li>To provide flexible device management for exclusive video capture devices to avoid conflicts with other services.</li> |
| Push streams to the CDN                 | Sends the audio and video of your channel to other RTMP servers through the CDN:<li>Starts or stops publishing at any time.</li><li>Adds or removes an address while continuously publishing the stream.</li> <li>Adjusts the picture-in-picture layout.</li> | <li>To send a live stream to WeChat or Weibo.</li><li>To allow more people to watch the live stream when the number of audience members in the channel reached the limit.</li> |


### Version Update Description

- Latest Version: 1.3.1_3.1

    - Modify the service name from Agora Voice to Agora RTC
    - Added video module and optimize performance.

- v1.2.1_3.1.2

    - Adapt to Cocos Creator 2.4.x.

- v1.1.0_2.2.3.20_2.5.2

    - Adapt to Cocos Creator 2.3.x.

- v1.0.2_2.2.3.20_2.5.2

    - Fix some bugs.

- v1.0.1_2.2.3.20_2.5.2

    - Integrated Agora service.

## Enable Agora RTC Service

- Use Cocos Creator to open the project that needs to be connected to Agora RTC service.

- Click on **Panel -> Service** in the menu bar to open the Service panel, select **Agora RTC** service to go to the service detail page, and then click on the **Enable** button in the top right to enable the service. For details, please refer to the Cocos Service [Operation Guide](./index.md#usage) documentation.

    ![](agora/agora-panel.png)

    **Charge**: Agora RTC services use the **prepaid** model. When your service usage exceeds the free portion of the service provider and the account balance is insufficient, the service will be stopped. At that time, you need to **pre-charge** in the Cocos Developer Console. 

After the service is activated, Cocos Service will automatically activate the Agora RTC service, connect the Agora account, and integrate the Agora SDK into the game project.

### Verify whether the service is integrated successfully

- Once the Agora RTC service is integrated, we can verify the success of the Agora RTC service integration by adding simple code to the script.

- Click **Dashboard** button in the Agora RTC service panel, jump to [Agora Console](https://console.agora.io/). Then click ![](agora/agora-projecticon.png) icon in the left navigation menu to enter the Project Management page and obtain the **App ID** of the corresponding game.

    ![](agora/agora-param.png)

- Call the initialize method in the script and fill in the **App ID** obtained from the Agora console:

    ```js
    var appid = 'App ID obtained from the Agora console';
    agora && agora.init(appid);
    ```

- After the script is finished and saved, go back to the editor. Select the **Browser** and click the ![](./image/preview-button.jpg) [Preview](../getting-started/basics/preview-build.md) button. If you can see the initialization log in the browser console, which means the integrate is successful.

    ![](agora/agora-debugging.png)

## Sample Project

- Sample project of Interactive Live Audio Streaming, please refer to [Hello Agora CocosCreator Voice](https://github.com/AgoraIO/Voice-Call-for-Mobile-Gaming/blob/master/Basic-Voice-Call-for-Gaming/Hello-CocosCreator-Voice-Agora/README.md).

- Sample project of Interactive Live Video Streaming, please refer to [Agora-Cocos-Quickstart](https://docs.agora.io/en/Interactive%20Broadcast/start_live_cocos_creator?platform=Cocos%20Creator#see-also).

## Developer Guide

Please refer to [Start Interactive Live Audio Streaming](https://docs.agora.io/en/Interactive%20Broadcast/start_live_audio_cocos_creator?platform=Cocos%20Creator), [Start Interactive Live Video Streaming](https://docs.agora.io/en/Interactive%20Broadcast/start_live_cocos_creator?platform=Cocos%20Creator) and [Start a Video Call](https://docs.agora.io/en/Video/start_call_cocos_creator?platform=Android) documentations.

## Reference Links

- [Agora Platform Overview](https://docs.agora.io/en/Agora%20Platform/agora_platform?platform=Cocos%20Creator)
- [Agora Live Interactive Audio Streaming Overview](https://docs.agora.io/en/Interactive%20Broadcast/product_live?platform=Cocos%20Creator)
- [Use an App ID for authentication](https://docs.agora.io/en/Agora%20Platform/token?platform=All%20Platforms) 

## API Reference

Please refer to the [Cocos Creator SDK API Reference](https://docs.agora.io/en/Video/API%20Reference/cocos_creator/index.html?platform=All%20Platforms) documentation.
