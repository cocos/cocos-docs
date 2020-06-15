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

- **Resource Server Address**

  This entry fills in the address at which the resource is stored on the server and is optional:

  - If this entry is not filled, the **remote** folder in the build directory will be packaged in the cpk package.

  - If this entry is filled in, the built cpk package will not include the **remote** folder and you will need to manually upload the **remote** folder to the filled in resource server address.

  For specific resource management details, see [Resource Management for Cocos Play Environment](#resource-management-for-cocos-play-environment).

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

## Resource Management for Cocos Play Environment

**Cocos Play** is similar to **WeChat Mini Game**. There are restrictions on the package size. Resources over **10MB** must be downloaded via a network request.

We recommend that developers save only the script files in the package and download all other resources from the remote server. Cocos Creator already helps developers with downloading, caching and version management of remote resources. The specific implementation logic and operation steps are similar to the WeChat Mini game. Please refer to the [Resource Management for WeChat Mini Game](./publish-wechatgame.md#resource-management-for-wechat-mini-game-environment) documentation for details.

## Reference documentation

- [Cocos Play Center](https://gamebox.cocos.com/)
- [Cocos Play Documentation Center](https://gamebox.gitbook.io/project/)
- [Cocos Play API Documentation](https://gamebox.gitbook.io/project/you-xi-jie-ru-wen-dang/ji-shu-dui-jie/ji-chu-neng-li)
- [Cocos Play Self-test Tools](https://gamebox.gitbook.io/project/you-xi-jie-ru-wen-dang/ji-shu-dui-jie/zi-ce-gong-ju)
- [Cocos Play Self-test Tools Download](https://gamebox.gitbook.io/project/you-xi-jie-ru-wen-dang/zi-ce-gong-ju)
