# Cocos Statistics (Cocos Analytics)

**Cocos** data statistics are used to record the player's game behavior and provide data analysis in the background. **Cocos Creator** provides one-click integration to get data statistics into your game. Currently, *web page preview* and *publishing to the web*, *iOS* and *Android* platforms are supported.

Open the **Project Settings** panel, located in **Menu Bar - Projects - Project Settings**. In the **Services** column, you can check the configuration item of **Cocos Data Statistics**:

![cocos-analytics](cocos-analytics/analytics_properties.png)

 - Open the background:<br>
   Click to jump to the data statistics background for easy viewing of statistical results
 - **AppID** and **AppSecret**:<br>
   Fill in the account information applied in the background, the default is public account
 - channel and version:<br>
   Fill in the **channel ID** and **version number**. These two parameters can be set by themselves, as long as they can distinguish when they get the statistical results. On the native platform, if the **channel ID** is empty and packaged by **AnySDK**, the **channel ID** will be automatically read at startup.

After the game is loaded, the Statistics SDK will be initialized in the **main.js** file after the project is built, and the parameters set above will be passed in. You can also manually modify these parameters in **main.js** if you need to publish them in batches. After initialization, you can directly call the statistical SDK and send various statistics to the server.

For detailed product and API instructions, please read the [Product Documentation](https://analytics.cocos.com/docs).