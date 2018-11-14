# Publishing to __Vivo Mini Games__

Starting with __v2.0.5__, __Cocos Creator__ officially supports the release of games to the __Vivo Mini Game__ platform. It takes just a single click with __Cocos Creator__ to publish to the __Vivo Mini Game__ platform.

## Environment Configuration

- Download [Quick App & Vivo Mini Game Debugger](https://dev.vivo.com.cn/documentCenter/doc/163) and [Vivo Mini Game Engine](https://dev.vivo.com.cn/documentCenter/doc/163) and install it on your Android device (recommended Android Phone 6.0 or above)

- Install [nodejs-8.1.4](https://nodejs.org/zh-cn/download/) or above, globally:

    **Note**: After installing nodejs, you need to pay attention to whether the npm source address is https://registry.npmjs.org/

    ```bash
    # View current npm source address
    npm config get registry

    # If not, reset the npm source address
    npm config set registry https://registry.npmjs.org/
    ```

- Install `qgame-toolkit` globally:

    ```bash
    npm install -g qgame-toolkit
    ```

## Release Process

1. Use __Cocos Creator__ to open the project that needs to be released. Select **Vivo Mini Game** in the **Platform** dropdown of the **Build...** panel.

![](./publish-vivo-instant-games/build.png)

Where **App Package Name**, **App Name**, **App Icon**, **App Version Name**, **App Version Number**, **Supported Minimum Engine Platform Version Number** (Note: Please fill in **1020**) These parameters are required and filled in according to the user's needs and the prompt information in the parameter input box. The **Local npm Installation Path**, **Build Release Package**, **Packet Mode**, **Packet Mode Server Path** are optional. The specific filling rules for the relevant parameter configuration are as follows:

- **App icon**

  **App icon** is required. When building, the app icon will be built into the project of the __Vivo Mini Game__ game. Please make sure that the image under the app icon path is true. For example, if the application icon path is `/assets/image/logo.png`, the image directory and logo.png need to exist in the **Assets** directory of __Cocos Creator__ **Explorer**.

- **Local npm installation path**

  **Local npm installation path** is optional. The purpose of filling out the npm installation path is to build a runable mini-game rpk package (the rpk package is located in the dist directory under the qgame directory of the build-generated mini-game project). If you do not fill in the item, __Cocos Creator__ will only export the game project directory and will not generate the **rpk** package.

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
    where npm

    # If the output is
    C:\Program Files\nodejs\npm

    # Then the local npm installation path is filled in as
    C:\Program Files\nodejs
    ```

- **Build a release package**

  **Build a release package** is optional. The purpose of this check is to build an **rpk** package that can be published directly. But there are two prerequisites: you need to fill in the **local npm installation path** and add a release signature. <br>
  If you do not check the **Build Release Package**, the **rpk** package for testing is built.

    - Add release signature:

      In the game project root directory, add the **build-templates/jsb-link/sign/release** directory, then place your private key file **private.pem** and **certificate.pem**. As shown below:

      ![](./publish-vivo-instant-games/sign_release_path.png)

    - How to generate a release signature

      The user needs to generate the signature file **private.pem**, **certificate.pem** through tools such as `openssl. The certificate in the **build/qgame/sign/debug** directory is for debugging purposes only.

    ```bash
    # Command line assignment to the release directory just added to the root directory of the game
    cd E:\workspace\YourProject\build-templates\jsb-link\sign\release

    # Generate a signature file with the openssl command tool
    openssl req -newkey rsa:2048 -nodes -keyout private.pem -x509 -days 3650 -out certificate.pem
    ```

  **Note**: The `openssl` tool can be opened directly in the terminal in linux or Mac environment, and in the Windows environment you need to install `openssl` and configure system environment variables.

- **Small package mode and packet mode server path**

  This item is optional. The in-package volume of the mini-game contains code and resources that cannot exceed 4M, and resources can be loaded via network requests. **Small package mode** is to help users keep the script files in the small game package, other resources are uploaded to the remote server, and downloaded from the remote server as needed. And the download, cache and version management of remote resources, __Cocos Creator__ has already helped the user. What the user needs to do is the following two steps:

  1. When building, check the **packet mode** and fill in the **packet mode server path**. Then click on **Build**.

  2. After the build is complete, click the **Open** button after the **Publish Path** to upload the **jsb-link/res** directory under the release path to the packet mode server. For example, if the default publishing path is build, you need to upload the **build/jsb-link/res** directory.

  At this point, the built-up `qgame` directory will no longer contain the `res` directory, and the resources in the `res` directory will be downloaded from the filled **packet mode server address** via the network request.

2.  **Build...** After the relevant parameters of the panel are set, click **Build**. After the build is complete, click the **Open** button behind the **Build Path** to open the build release package. You can see that the **qgame** directory is generated under the default release path build directory, which is the exported __Vivo Mini Game__ project directory.

![](./publish-vivo-instant-games/package.png)

3. Generate the rpk package (if you have filled out the **local npm installation path** in the **Build...** panel, you can skip this step).

```bash
# Command line specified to the qgame directory
cd E:\workspace\YourProject\build\qgame
npm install
npm run build
```

Then the rpk package will be generated in the **/build/qgame/dist** directory.

![](./publish-vivo-instant-games/rpk.png)

4. Run the packaged rpk to your phone. There are two ways to run rpk on your phone:

- **method one**:

    Generate URLs and QR codes using the __Vivo Mini Game Packer Commands__.

    ```bash
    # First assign the command line to the qgame directory
    cd E:\workspace\YourProject\build\qgame

    # Generate URL and QR code
    npm run server
    ```

    Then open the **Quick App & Vivo Mini Game Debugger** that was installed before on your Android device.

    ![](./publish-vivo-instant-games/vivo-instant_scan_install.jpg)

    Finally, click the **Scan code install** button to copy the URL generated in the first step to the browser, and then directly scan the QR code on the web page to open the **rpk**.

- **Method Two**:

    Copy the generated small game **rpk** file (located in the dist directory of the game project qgame directory) to the mobile phone SD card

    Open the **Quick App & Vivo Mini Game Debugger** that has been installed before on your Android device, click **Local Install**, then find the **rpk** file from your phone SD and select Open.

    ![](./publish-vivo-instant-games/vivo-instant_native_install.jpg)
