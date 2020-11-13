# Agora Voice Quick Start

Agora is a leading video, voice and live interactive streaming platform, helping developers deliver rich in-app experiences—including embedded voice and video chat, real-time recording, interactive live streaming, and real-time messaging.

The [Agora Interactive Gaming SDK](https://docs.agora.io/en/Interactive%20Gaming/product_gaming?platform=All%20Platforms) helps you quickly integrate audio and video functions into your gaming projects.

### Functions

The Agora Interactive Gaming SDK provides a variety of functions for different gaming scenarios, which are mainly used for applications based on Unity and Cocos gaming engines. You can also use native SDK for native development.

| Function                      | Description                                                  | Scenario                    |
| ----------------------------- | ------------------------------------------------------------ | --------------------------- |
| Audio and Video Communication | Enables real-time audio and video communication in your game. | Group chatting in the games |
| Radio Voice                   | <li>Supports sampling rates of up to 44.1K and super high-quality sound.<li>Enables interaction with the radio host. | <li>MMO<li>RPG                    |
| Spatial Sound Effects         | Provides immersive experiences.                              | FPS                         |
| Voice Change              | Changes the speaker's voice, for example, to the opposite gender. | <li>MOBA<li>ACG games       |

### Version Update Description

- Latest Version: 1.2.1_3.1.2

    - Adapt to Cocos Creator 2.4.x.

- v1.1.0_2.2.3.20_2.5.2

    - Adapt to Cocos Creator 2.3.x.

- v1.0.2_2.2.3.20_2.5.2

    - Fix some bugs.

- v1.0.1_2.2.3.20_2.5.2

    - Integrated Agora Voice service.

## Enable Agora Voice Service

- Use Cocos Creator to open the project that needs to be connected to Agora Voice service.

- Click on **Panel -> Service** in the menu bar to open the Service panel, select **Agora Voice** service to go to the service detail page, and then click on the **Enable** button in the top right to enable the service. For details, please refer to the Cocos Service [Operation Guide](./index.md#usage) documentation.

    ![](agora/agora-panel.png)

    **Charge**: Agora Voice services use the **prepaid** model. When your service usage exceeds the free portion of the service provider and the account balance is insufficient, the service will be stopped. At that time, you need to **pre-charge** in the Cocos Developer Console. 

After the service is activated, Cocos Service will automatically activate the cloud development service, Unicom Agora Voice account, and integrate the Agora Interactive Gaming SDK into the game project.

### Verify whether the service is integrated successfully

- Once the Agora Voice service is integrated, we can verify the success of the Agora Voice service integration by adding simple code to the script.

- Click **Dashboard** button in the Agora Voice service panel, jump to [Agora Console](https://console.agora.io/). Then click ![](agora/agora-projecticon.png) icon in the left navigation menu to enter the Project Management page and obtain the **App ID** of the corresponding game.

    ![](agora/agora-param.png)

- Call the initialize method in the script and fill in the **App ID** obtained from the Agora Voice console:

    ```js
    var appid = 'App ID obtained from the Agora console';
    agora && agora.init(appid);
    ```

- After the script is finished and saved, go back to the editor. Select the **Browser** and click the ![](./image/preview-button.jpg) [Preview](../getting-started/basics/preview-build.md) button. If you can see the initialization log in the browser console, which means the integrate is successful.

    ![](agora/agora-debugging.png)

## Sample Project

- Click the **Sample Project** button in Agora Voice service panel, Clone or download **Voice-Call-for-Mobile-Gaming/Basic-Voice-Call-for-Gaming/Hello-CocosCreator-Voice-Agora** Project and open the project in Cocos Creator. The Sample project contains the following functions:

  - Join channel & leave channel.
  - Publish or subscribe stream.

- Enabling the Agora Voice service.

- Open the **HelloWorld.js** file, Then replace **appid** in the `initAgora` method with the App ID obtained from the Agora Voice console.

- After the script is finished and saved, go back to the editor. Select the **Browser** and click the ![](./image/preview-button.jpg) [Preview](../getting-started/basics/preview-build.md) button, you can debug the project in the browser.

  ![](agora/agora-sample.jpg)

  **Note**: If you find that the Sample project is successfully initialized during debugging in the browser, but there is no callback when you click **Join Channel**, please confirm whether you have enabled the Agora Voice service in the **Cocos Service** panel.

## Developer Guide

Please refer to [Agora Voice API Document](https://docs.agora.io/en/Interactive%20Gaming/game_coco?platform=Cocos%20Creator).

## Reference Links

- [Agora Platform Overview](https://docs.agora.io/en/Agora%20Platform/agora_platform?platform=All%20Platforms)
- [Agora Interactive Gaming Overview](https://docs.agora.io/en/Interactive%20Gaming/product_gaming?platform=All%20Platforms)
- [Use an App ID for authentication](https://docs.agora.io/en/Agora%20Platform/token?platform=All%20Platforms) 
