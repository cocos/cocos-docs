# Publishing to Oppo Mini games

Starting with __v2.0.5__, __Cocos Creator__ officially supports the release of games to the __OPPO Mini Game__ platform. It takes just a single click with __Cocos Creator__ to publish to the __OPPO Mini Game __platform.

## Environment Configuration

- Download [Quick Game Debugger] (https://cdofs.oppomobile.com/cdo-activity/static/201810/26/quickgame/documentation/resource/runtime.apk) and install it on your Android device (recommended Android Phone) 6.0 or above)

- Global installation [nodejs-8.1.4] (https://nodejs.org/zh-cn/download/) or above

- Download [quickgame-toolkit] (http://cdofs.oppomobile.com/cdo-activity/static/quickgame/tools//0974ab43dc361f148189515ee254ff6d.zip) and unzip it.
  The following step is optional, you can switch to the compressed directory installation dependencies, and reduce the waiting time for rpk packaged with creator for the first time. The steps are as follows:

  ```bash
   # Enter the decompression directory
   cd quickgame-toolkit
   #Installation project dependencies
   npm install
  ```

- According to the user's own development needs, determine whether you need to install [combat debugging tools] (https://cdofs.oppomobile.com/cdo-activity/static/201810/26/quickgame/documentation/resource/test.zip)

## Release process

1. Use Cocos Creator to open the project project that needs to be released. Select **OPPO Mini Game** in the **Publishing Platform** of the **Build Release** panel.

  ![](./publish-oppo-instant-games/build_option.jpg)

   The **game package name**, **game name**,**desktop icon**,**game version name**,** platform version number**,**supported minimum engine platform version number** , **local npm installation path**, **local quickgame-toolkit path** These parameters are required. The **Build Release Package**, **Packet Mode**, **Packet Mode Server Path** is optional. The specific filling rules for the relevant parameter configuration are as follows:

- **App icon**

  **App icon** is required. When building, the app icon will be built into the OPPO Quick Game project. Please make sure that the image under the app icon path is true. For example, if the application icon path is /assets/image/logo.png, the image directory and logo.png need to exist in the **Assets** directory of Creator ** Explorer**.

- **Local npm installation path**

  **Local npm installation path** is required.
    - Mac system

    ```bash
    # Get local npm installation path
    which npm
    # If the output is
    /Users/yourname/.nvm/versions/node/v8.1.4/bin/npm
    # Then the local npm installation path is filled in as:
    /Users/yourname/.nvm/versions/node/v8.1.4/bin
    ```

    - Windows system

    ```bash
    # Get local npm installation path
    which npm
    # If the output is
    C:\Program Files\nodejs\npm
    # Then the local npm installation path is filled in as
    C:\Program Files\nodejs
    ```
- **local quickgame-toolkit path**

  **The local quickgame-toolkit path** is required. The quickgame-toolkit path here also needs to be noted: the unpacked quickgame-toolkit path, such as the quickgame.cmd path. The path under the mac system is


 ```
 /Users/hym/Documents/quickgame-toolkit/lib/bin/quickgame.cmd
 ```
  Then the local quickgame-toolki installation path needs to be filled in as


 ```
 /Users/hym/Documents/quickgame-toolkit
 ```
  The path to the windows system is

  D:\quickgame-toolki\lib\bin\quickgame.cmd
  Then the local quickgame-toolki installation path needs to be filled in as


  ```
  D:\quickgame-toolki
  ```

- **Build a release package**

  **Build a release package** is optional. The purpose of this check is to build an rpk package that can be published directly. <br>
  If you do not check the **Build Release Package**, the rpk package for testing is built.

 - Add release signature:

    In the game project root directory, add the **build-templates/jsb-link/sign/release** directory, then place your private key file **private.pem** and certificate file**certificate in the release directory. .pem**. As shown below:


      ![](./publish-oppo-instant-games/release_sign.jpg)


- How to generate a release signature

   The user needs to generate the signature file private.pem, certificate.pem through tools such as the openssl command.

    ```bash
    # Command line assignment to the release directory just added to the root directory of the game
    Cd E:\workspace\YourProject\build-templates\jsb-link\sign\release
    # Generate a signature file with the openssl command tool
    Openssl req -newkey rsa:2048 -nodes -keyout private.pem -x509 -days 3650 -out certificate.pem
    ```

  **Note**: The openssl tool can be opened directly in the terminal in linux or Mac environment, and in the Windows environment you need to install the openssl tool and configure system environment variables.

- **Small package mode and packet mode server path**

  This item is optional. The in-package volume of the mini-game contains code and resources that cannot exceed 4M, and resources can be loaded via network requests. **Small package mode** is to help users keep the script files in the small game package, other resources are uploaded to the remote server, and downloaded from the remote server as needed. And the download, cache and version management of remote resources, Creator has already helped the user. What the user needs to do is the following two steps:

  1. When building, check the **packet mode** and fill in the **packet mode server path**. Then click on **Build**.

  2. After the build is complete, click the **Open** button after the **Publish Path** to upload the **jsb-link/res** directory under the release path to the packet mode server. For example, if the default publishing path is build, you need to upload the build/jsb-link/res directory.

  At this point, the res directory will no longer be included in the built-up quickgame directory, and the resources in the res directory will be downloaded from the filled **packet mode server address** via the network request.

Second, ** build release **
    Once the panel's related parameters are set, click **Build**. After the build is complete, click the **Open ** button behind the **Publish Path** to open the build release package. You can see that the **quickgame** directory is generated under the default release path build directory, which is the exported OPPO. The game project directory and rpk, rpk directory are in the /build/quickgame/dist directory.

![](./publish-oppo-instant-games/package.jpg)

Third, run the packaged rpk to the phone.
   Copy the generated mini-game rpk file (located in the dist directory of the minigame project's quickgame directory) to the /sdcard/games/ directory on your phone's SD card. Then open the **Quick app** that has been installed before on the Android device, click on the **Fast game ** section, and then find the icon corresponding to the game name. If not found, click on the upper right corner to add more Button - Refresh button to refresh.

Fourth, subcontracting rpk

Subcontracting rpk is not required. Subcontract loading, that is, the game content is split into several packages according to certain rules. When the first startup is started, only the necessary packages are downloaded. The necessary package is called the main package, and the developer can trigger other users to be downloaded in the main package. Package, this can effectively reduce the time spent on the first boot. Developers use this feature as needed.
After the creator setting [configuration method] (https://docs.cocos.com/creator/manual/zh/scripting/subpackage.html), it will be automatically subcontracted when packaging.

After the build is complete, the subcontracted directory is in the /build/quickgame/quickgame/dist directory.
At this time, you need to create a new subPkg directory on the sd card, and then copy all the files and folders in the /build/quickgame/quickgame/dist directory to the subPkg directory.


![](./publish-oppo-instant-games/subpackage.jpg)


   Then switch to the **Fast Game** section of the **Quick App**, click Refresh to see the main app icon of the subcontract, click to use the same as normal packaging.


![](./publish-oppo-instant-games/run_subpackage.jpg)


## Related reference links

- [OPPO Quick Game Tutorial] (https://cdofs.oppomobile.com/cdo-activity/static/201810/26/quickgame/documentation/games/quickgame.html)
- [OPPO Quick Game API Documentation] (https://cdofs.oppomobile.com/cdo-activity/static/201810/26/quickgame/documentation/feature/account.html)
- [OPPO Quick Game Tool Download] (https://cdofs.oppomobile.com/cdo-activity/static/201810/26/quickgame/documentation/games/use.html)
- [cocos creator subcontracting] (https://docs.cocos.com/creator/manual/zh/scripting/subpackage.html)
