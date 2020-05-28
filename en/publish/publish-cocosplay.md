# Publish to Cocos Play

## Environment Configuration

- Download and install [Cocos Play Self-test Tools](https://gamebox.gitbook.io/project/you-xi-jie-ru-wen-dang/ji-shu-dui-jie/zi-ce-gong-ju) on your Android device (recommended Android Phone 6.0 or above).

## Release Process

### 1. Parameter configuration

Use **Cocos Creator** to open a project. Select **Cocos Play** in the **Platform** dropdown of the **Build** panel, and then click **Build**.

![](publish-cocosplay/build.png)

The specific filling rules for the relevant parameter configuration are as follows:

- **Custom game package path**

  This item is optional. You can customize the directory in which the `.cpk` (generated after the build) is stored. If not set, the `.cpk` is generated to the release package `build/cocos-play` directory by default.

- **Small Packet Mode**

  This item is optional. The in-package volume of the mini game contains code and resources that cannot exceed **10M**, and resources can be loaded via network requests. **Small Packet Mode** is to help developers keep the script files in the mini game package, other resources are uploaded to the remote server, and downloaded from the remote server as needed. And the download, cache and version management of remote resources, Cocos Creator has already done that for developers. What the developer needs to do are the following steps:

  - When building, check the **Small Packet Mode** and fill in the **Small Packet Mode Server Path**.

  - **First game resource package into the game package**, this item is optional.

    In the **Small Packet Mode**, due to too many resources on the launch scene, downloading and loading resources for a long time may result in a short black screen when entering the game for the first time. If **First game resource package into the game package** is checked, you can reduce the black screen time when you first enter the game. However, it should be noted that the `res/import` resource does not support split resource downloading at this time, and the entire `import` directory is also packaged into the first package.
  
    You can choose whether to check this item according to your needs. Then click on **Build**.

  - After the build is complete, click the **Open** button after the **Build Path** to upload the `build/cocos-play/res` folder under the release path to the small packet mode server.

  At this point, the `res` folder will no longer be included in the `.cpk` file which is generated after the build, and the resources in the `res` folder will be downloaded from the filled **Small Packet Mode Server Path** through the network request.

### 2. Build

After the build is completed, click the **Open** button behind the **Build Path** to open the build release package. You can see that the **cocos-play** directory is generated under the default release path `build` directory, which is the exported Cocos Play game project directory and **.cpk** file, the **cpk** package is in the `build/cocos-play` directory. If you have set a **Custom game package path**, the **cpk** package will be generated into the specified directory.

![](publish-cocosplay/package.png)

### 3. Access testing

Developers must use the Cocos Play **Self-test Tools** to test access without problems before submitting to the platform for review. The size of the package is not required for the self-test, but if it is to be submitted for review, the package size cannot exceed **10M**.<br>
The **Self-test Tools** can launch the game and provide features such as game login, payment, etc. By reading the game configuration parameters, you can determine the type of game to start and how the game will start. For details, please refer to [Self-test Tools Documentation](https://gamebox.gitbook.io/project/you-xi-jie-ru-wen-dang/ji-shu-dui-jie/zi-ce-gong-ju).

Open the previously installed **Self-test Tools**, then click the **Configure Game** button at the top left of the **Self-test Tools** to enter the game configuration page. Configure parameters as required and then click **Save**.

![](publish-cocosplay/configuration.png)

#### Parameters

| Parameters      | Function Explanation  |
| --------------  |  -----------          |
| **gameId**      | Game ID, which can be obtained from the background. |
| **gameKey**     | Game key, which can be obtained from the background. |
| **gameSecret**  | Game secret key, which can be obtained from the background. |
| **gameType**    | Game type, including **Versus** and **non-Versus**. You can see how to use it in the **Start Game** section below. |
| **gameMode**    | Game mode, please select **Runtime**.    |
| **loadType**    | Game load type, which is how the game starts. Includes both **File** and **Url**. Please refer to the **Start Game** section below. |
| **path**        | Game load address, needs to be used with **loadType**. Please refer to the **Start Game** section below.   |

### 4. Start Game

There are two ways to start the game through the **Self-test Tools**.

1. Load the game package as a file from the specified location (The game loadType is **File**).

    - Copy the `.cpk` file generated after the build to the device directory, if it is copied to the `sdcard` directory of device, you need to create a new folder (For example named `cocosplay`) in the `sdcard` directory and copy the `.cpk` file to the `cocosplay` folder.
    - Select **File** in the **loadType** of the game configuration page.
    - Fill in the path to the `cocosplay` folder where the `.cpk` file is placed in the **path** option. Such as `cocosplay/game.cpk`.
    - Click on **Save** after the configuration is complete, then click on **Start Game** to open the game.

2. Open the game as a web page from the specified URL (The game loadType is **Url**).

    - Upload the `.cpk` file to the server.
    - Select **Url** in the **loadType** of the game configuration page.
    - Fill in **path**, such as: <http://192.168.0.1:8080/game.cpk>.
    - Click on **Save** after the configuration is complete, then click on **Start Game** to open the game.

## Reference documentation

- [Cocos Play Center](https://gamebox.cocos.com/)
- [Cocos Play Documentation Center](https://gamebox.gitbook.io/project/)
- [Cocos Play API Documentation](https://gamebox.gitbook.io/project/you-xi-jie-ru-wen-dang/ji-shu-dui-jie/ji-chu-neng-li)
- [Cocos Play Self-test Tools](https://gamebox.gitbook.io/project/you-xi-jie-ru-wen-dang/ji-shu-dui-jie/zi-ce-gong-ju)
- [Cocos Play Self-test Tools Download](https://gamebox.gitbook.io/project/you-xi-jie-ru-wen-dang/zi-ce-gong-ju)
