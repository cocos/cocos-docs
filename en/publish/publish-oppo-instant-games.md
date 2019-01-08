# Publishing to OPPO Mini Games

Starting with __v2.0.5__, Cocos Creator officially supports the release of games to the **OPPO Mini Games**. It takes just a single click with Cocos Creator to publish to the OPPO Mini Game platform. This document is currently written on the basis of **v2.0.6**, which is the lowest recommended version to use. If you are using v2.0.5, it is recommended to upgrade to v2.0.6.

## Environment Configuration

- Download [Quick Game Debugger](http://cdofs.oppomobile.com/cdo-activity/static/quickgame/tools//bbce19cecbf7c26c396762d61192a11e.zip) and install it on your Android device (Android Phone 6.0 or above is recommended)

- Install [nodejs-8.1.4](https://nodejs.org/zh-cn/download/) or above, globally

- Determine whether you need to install [Debugging Tools](http://cdofs.oppomobile.com/cdo-activity/static/quickgame/tools//6de9d1c3f06030ae7c52f5105f60383f.zip) according to your own development needs.

## Release Process

1. Use __Cocos Creator__ to open the project that needs to be released. Select **OPPO Mini Game** in the **Platform** dropdown of the **Build...** panel.

![](./publish-oppo-instant-games/build_option.jpg)

Where **Game Package Name**, **Game Name**, **Desktop Icon**, **Game Version Name**, **Game Version Number**, **Platform Version Number**. These parameters are required and filled in according to the user's requirements and the prompt information in the parameter input box. The **Small Packet Mode**, **Small Packet Mode Server Path** is optional.

For the **Keystore** and two signature files (**certificate.pem path** and **private.pem path**), need to select the **Keystore** or fill in two paths according to user requirements.

The specific filling rules for the relevant parameter configuration are as follows:

- **Desktop Icon**

  **Desktop Icon** is required. Click the **...** button at the back of the input box to select the icon you want. When building, the app icon will be built into the __OPPO Mini Game__ project. **Desktop Icon** suggest using PNG picture.

- **Small Packet Mode and Small Packet Mode Server Path**

  This item is optional. The in-package volume of the mini-game contains code and resources that cannot exceed 10M, and resources can be loaded via network requests. **Small Packet Mode** is to help users keep the script files in the small game package, other resources are uploaded to the remote server, and downloaded from the remote server as needed. And the download, cache and version management of remote resources, Cocos Creator has already helped the user. What the user needs to do is the following two steps:

  1. When building, check the **Small Packet Mode** and fill in the **Small Packet Mode Server Path**. Then click on **Build**.

  2. After the build is complete, click the **Open** button after the **Publish Path** to upload the **/quickgame/res** directory under the release path to the packet mode server. For example, if the default publishing path is build, you need to upload the **/build/quickgame/res** directory.

  At this point, the **res** directory will no longer be included in the built-up rpk, and the resources in the res directory will be downloaded from the filled **Small Packet Mode Server Path** through the network request.

- **Keystore**

  When you check the **Keystore**, the default is to build the rpk package with a certificate that comes with Creator, which is used only for **debugging**. **Note**: When the rpk package is to be used to submit an audit, do not check the **Keystore** to build it.
  
  If you don't check the **Keystore**, you need to configure the signature files **certificate.pem path** and **private.pem path**, where you build a rpk package that you can **publish directly**. The user can configure two signature files by using the **...** button to the right of the input box. **Note**: These two signature files are not recommended to be placed in the build directory of the publish package, otherwise the build directory will be emptied each time when it is built, resulting in file loss.<br>
  The user can generate the signature files from the command line, as follows:

    - How to generate a release signature

      The user needs to generate the signature file **private.pem**, **certificate.pem** through tools such as **openssl**.

      ```bash
      # Generate a signature file with the openssl command tool
      openssl req -newkey rsa:2048 -nodes -keyout private.pem   -x509 -days 3650 -out certificate.pem
      ```

      **Note**: **openssl** can be opened directly in the terminal in Linux or Mac environment, and in the Windows environment you need to install `openssl` and configure system environment variables.

**2. Build**

**Build release** After the relevant parameters of the panel are set, click **Build**. After the build is complete, click the **Open** button behind the **Publish Path** to open the build release package. You can see that the **quickgame** directory is generated under the default release path build directory, which is the exported __OPPO Mini Game__. The game project directory and **rpk**, **rpk** package are in the __/build/quickgame/dist__ directory.

![](./publish-oppo-instant-games/package.jpg)

**3. Run the built rpk to the phone**

Copy the generated mini-game **rpk** file (located in the dist directory of the OPPO minigame project's quickgame directory) to the `/sdcard/games/` directory on your phone's SD card. Then open the **Quick Game Debugger** that has been installed before on the Android device, click the **OPPO Mini Game** section, and then find the icon corresponding to the game name. If not found, click on the upper right corner. More button - refresh button to refresh.

![](./publish-oppo-instant-games/rpk_games.jpg)

**4. Subpackage rpk**

Subpackage loading, that is, splitting the game content into several packages according to certain rules, only downloading the necessary packages when starting up for the first time. This necessary package is called **main package**, and the developer can trigger in the main package. Download other sub-packages, which can effectively reduce the time spent on the first boot. To use this function, you need to set [Subpackage Configuration](../scripting/subpackage.md) in __Cocos Creator__, and the package will be automatically subpackaged when the setting is completed.

After the build is complete, the subpackage directory is in the `/build/quickgame/dist` directory. <br>
In this case, you need to create a new **subPkg** directory in the **sdcard** directory of the Android device, and then copy the **.rpk** file in the `/build/quickgame/dist` directory to the **subPkg** directory.

Then switch to the **Package Load** section of **Quick App**, click Refresh at the top right to see the game name of the subpackage, click **Second Open** to use the same as the normal packaged **rpk** .

![](./publish-oppo-instant-games/run_subpackage.jpg)

**Note**: Subpackage rpk needs to be copied to the `/sdcard/subPkg/` directory of Android devices, and non-subpackage rpk needs to be copied to the `/sdcard/games/` directory of Android devices, both of which cannot be mixed.

## Related Reference Links

- [OPPO Quick Game Tutorial](https://cdofs.oppomobile.com/cdo-activity/static/201810/26/quickgame/documentation/games/quickgame.html)
- [OPPO Quick Game API Documentation](https://cdofs.oppomobile.com/cdo-activity/static/201810/26/quickgame/documentation/feature/account.html)
- [OPPO Quick Game Tool Download](https://cdofs.oppomobile.com/cdo-activity/static/201810/26/quickgame/documentation/games/use.html)
