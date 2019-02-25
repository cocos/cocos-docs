# Cocos Analytics

**Cocos Analytics** is used to record the player's game behavior and provide data analysis support in the background. **Cocos Analytics** currently supports  **Android**, **iOS** and **Web platforms**.

## Getting started

1. Visit the [Cocos Account Center](https://auth.cocos.com/#/). 
  - Click the **Game** tab in the sidebar, select the individual/company game as required. 
  - Click **Create Game** . Next, fill in the required parameters as required, then click **Submit**. The game is created.

  ![](cocos-analytics/game.png)

2. Open the **Cocos Analytics** service. 
  - Click on the game or click on the **Services** tab above to jump to the **Services** panel. 
  - Find **Cocos Analytics** and click **Provide Service**,and you can see that the **Cocos Analytics** service on the page shows **Provided**.

![](cocos-analytics/analytics_service.png)

3. Open Creator
  - click **Menu bar -> Panel -> Services** to open the **Services** panel. 
  - Set the **Cocos AppID**. For details, refer to [Cocos Service Panel Settings](cocos-services.md). 
  - Next, select **Cocos Analytics** to go to the **Cocos Analytics** settings panel.

4. Click the **Enable** button in the top right corner to enable the **Cocos Analytics** service. (If you have not opened the **Cocos Analytics** service in the **Cocos Account Center**, that is, the second step, when the statistics service is enabled, the prompt box for whether to open the service will pop up, and you can follow the prompts.)

![](cocos-analytics/enable_analytics.png)

5. After the startup is completed, you can see the newly added **Parameter Configuration** item in the service panel and fill in the parameters. The parameters are obtained as follows:

![](cocos-analytics/analytics_properties.png)

  - **AppID** and **AppSecret**: Click **Go to console** in the Cocos Analytics service panel to go to [Cocos Data Stats] (https://analytics.cocos.com/). Then click on **Cocos Analytics** at the top left to jump to the first page, select the corresponding game, and click the Settings button to get the **AppID** and **AppSecret** parameters. As shown below:

    ![](cocos-analytics/get_properties.png)

  - **channel** and **version**: channel ID and version number, respectively. These two parameters can be set by the user as long as they can be distinguished when the statistical results are obtained.

6. Click **Save** after the parameter configuration is complete. Then open the **Build Publish** panel to build and compile according to the user's needs **Android/iOS/Web** platform. The build release package has been automatically integrated with the Cocos Analytics service.

After the game is loaded, the Statistics SDK will be initialized in the main.js file after the project is built, and the parameters set above will be passed in. You can also manually modify these parameters in main.js if you need to bulk. After initialization, you can directly call the statistical SDK and send various statistics to the server.

## Each platform access integration

According to the game's requirements, refer to the following documents for access integration.

- [Android Platform Access Integration](https://analytics.cocos.com/docs/manual_android.html)
- [iOS Platform Access Integration](https://analytics.cocos.com/docs/manual_ios.html)
- [Web Platform Access Integration](https://analytics.cocos.com/docs/manual_h5.html)

For detailed product and API descriptions, please refer to [Cocos Analytics Product Documentation](https://analytics.cocos.com/docs)

## Related reference links

- [Cocos Account Center](https://auth.cocos.com/#/)
- [Cocos Data Statistics Background](https://analytics.cocos.com/)
- [Cocos Analytics Product Documentation](https://analytics.cocos.com/docs)
- [Android Platform Access Integration](https://analytics.cocos.com/docs/manual_android.html)
- [iOS Platform Access Integration](https://analytics.cocos.com/docs/manual_ios.html)
- [Web Platform Access Integration](https://analytics.cocos.com/docs/manual_h5.html)
