# 发布到 OpenHarmony

## 前言

我们在 Cocos Creator 3.6.1 的基础上成功适配了 OpenHarmony 在 7 月 30 日发布的 3.2 beta2 分支，并以《鹰击长空》项目为案例，成功运行在开发板上，并且能够相对流畅的操作。目前 OpenHarmony 平台的适配仍在持续进行中，因此需要单独下载社区版来试用，后续会进入到 Cocos Creator 的正式版本中。

鹰击长空：[GitHub - cocos/cocos-tutorial-airplane: video tutorial airplane](https://github.com/cocos/cocos-tutorial-airplane)

游戏视频：

<video src="./publish-openharmony/video.mp4"></video>

如无法观看视频，请点击 [下载地址](./publish-openharmony/video.mp4) 下载后观看。

## 准备工作 

1. 下载 Cocos Creator 3.6.1-OH 传送门：[Cocos Creator 3.6.1-OH](https://download.cocos.org/CocosCreator/voh/CocosCreator-v3.6.1-oh-win-092319.zip)

2.  下载 [OpenHarmany系统](http://download.ci.openharmony.cn/version/Master_Version/OpenHarmony_3.2.5.5/20220926_081431/version-Master_Version-OpenHarmony_3.2.5.5-20220926_081431-dayu200.tar.gz)

3.  下载 [OpenHarmony SDK系统](http://download.ci.openharmony.cn/version/Master_Version/OpenHarmony_3.2.5.5/20220926_081431/version-Master_Version-OpenHarmony_3.2.5.5-20220926_081431-dayu200.tar.gz) 

4. 下载最新的IDE（版本\>=3.0.0.993）：[DevEco Studio](https://developer.harmonyos.com/cn/develop/deveco-studio#download_beta_openharmony)

5. 系统烧录工具：[RKDevTool](https://gitee.com/hihope_iot/docs/tree/master/HiHope_DAYU200/%E7%83%A7%E5%86%99%E5%B7%A5%E5%85%B7%E5%8F%8A%E6%8C%87%E5%8D%97/windows) 烧录工具与 [使用文档](https://gitee.com/hihope_iot/docs/tree/master/HiHope_DAYU200/%E7%83%A7%E5%86%99%E5%B7%A5%E5%85%B7%E5%8F%8A%E6%8C%87%E5%8D%97#https://gitee.com/hihope_iot/docs/tree/master/HiHope_DAYU200/%E7%83%A7%E5%86%99%E5%B7%A5%E5%85%B7%E5%8F%8A%E6%8C%87%E5%8D%97/windows)

6. 开发套件：[HH-SCDAYU200](https://gitee.com/hihope_iot/docs/tree/master/HiHope_DAYU200)

## 发布步骤

### 系统烧录

1. 下载 [windows平台工具](https://gitee.com/hihope_iot/docs/tree/master/HiHope_DAYU200/%E7%83%A7%E5%86%99%E5%B7%A5%E5%85%B7%E5%8F%8A%E6%8C%87%E5%8D%97/windows)，解压后，如下图：

![](./publish-openharmony/document_image_rId19.png)

2. 解压 DriverAssitant_v5.1.1，解压后，如下图：

![](./publish-openharmony/document_image_rId20.png)

3. 双击 DriverInstall.exe 安装 USB 驱动，如下图

![](./publish-openharmony/document_image_rId21.png)

4. 点击驱动安装，如下图：

![](./publish-openharmony/document_image_rId22.png)

5. 连接设备，设备连接图，如下图：

![](./publish-openharmony/document_image_rId23.png)

6. 切换根目录，双击 RKDevTool.exe，双击运行，如下图：

![](./publish-openharmony/document_image_rId24.png)

7. 如果连上设备，默认就是\'发现一个MASKROM设备\'（必须安装 USB 驱动之后且连接设备后才会显示），如下图：

![](./publish-openharmony/document_image_rId25.png)

8. 按着 recover（一直按着），然后按一下 reset 按钮（按一次，松开），过一会放开 recover，就会在 RKDevTool 工具里提示\'发现一个loader设备\'，如下图: ![](./publish-openharmony/document_image_rId26.png)

9. 显示'发现一个LOADER设备'才能烧写系统，如下图：

![](./publish-openharmony/document_image_rId27.png)

10. 出现这个状态之后，解压下载的 [OpenHarmony系统](http://download.ci.openharmony.cn/version/Master_Version/OpenHarmony_3.2.5.5/20220926_081431/version-Master_Version-OpenHarmony_3.2.5.5-20220926_081431-dayu200.tar.gz)，如下图：

![](./publish-openharmony/document_image_rId29.png)

11. 在 RKDevTool软件中，把打勾的部分，选择解压的系统对应的文件，如下图

![](./publish-openharmony/document_image_rId30.png)

12. 点击执行，等待日志显示'下载完成'即可。执行成功后，设备会自动进行重启，出现软件 OpenHarmony 界面欢迎页面，然后进入到桌面，即表示烧录成功，如下图：

![](./publish-openharmony/document_image_rId31.png)

### 安装 DevEco Studio：

1. 下载最新的 IDE，下载对应平台的 IDE，点击右边的下载按钮，如下图：

![](./publish-openharmony/document_image_rId32.png)

2. 解压目录，双击 deveco-studio-3.0.0.993.exe 进行安装，点击 next，如下图：

![](./publish-openharmony/document_image_rId33.png)

3. 选择安装路径，点 next，如下图：

![](./publish-openharmony/document_image_rId34.png)

4. 根据需求配置，点击 next，如下图:

![](./publish-openharmony/document_image_rId35.png)

5. 点击安装，如下图：

![](./publish-openharmony/document_image_rId36.png)

6. 等待安装，如下图：

![](./publish-openharmony/document_image_rId37.png)

7. 安装完成，如下图：

![](./publish-openharmony/document_image_rId38.png)

8. 启动DevEco Studio，如下图:

![](./publish-openharmony/document_image_rId39.png)

9. 首次会提示设置源，默认应该就可以，如下图:

![](./publish-openharmony/document_image_rId40.png)

10. 首次安装需要安装 Node.js，如果之前安装有 Node.js，选择本地的 Node.js 即可，但是有版本要求，Node.js 的版本必须大于 v14.19.1和小于 v15.0.0。npm 的版本要求大于 6.14.16 和小于 7.0.0。如下图：

![](./publish-openharmony/document_image_rId41.png)

11. 这里选择下载新的 Node.js 为例，如下图:

![](./publish-openharmony/document_image_rId42.png)

12. 等待下载完成，然后点击 Finish 按钮，如下图：

![](./publish-openharmony/document_image_rId43.png)

13. 接下来会提示安装 SDK，点击下一步，注意是 OpenHarmonySDK，如下图

![](./publish-openharmony/document_image_rId44.png)

14. 确认版本信息，点击 next，如下图：

![](./publish-openharmony/document_image_rId45.png)

15. 选择 Accept 之后，选择 Next，如下图：

![](./publish-openharmony/document_image_rId46.png)

16. 等待下载完成，之后点击 Finish 即可，如下图：

![](./publish-openharmony/document_image_rId47.png)

### OpenHarmonySDK 更换

由于 SDK 随着 ID E的升级不断的升级，可能会导致部分兼容性的问题，为了能让工程正常运行，建议是替换 IDE 内置的 SDK。操作方法如下：

1. 更新 NDK

    - 找到下载的 OpenHarmony SDK，解压后，打开 ohos-sdk/windows，如下图：
    
    ![](./publish-openharmony/document_image_rId11.png)

    - 找到 OpenHarmony 的 SDK\\nativ e目录（可以在 IDE 里查看目录），点开 **IDE(DevEco)-> 工具栏 File->Setting** 即可, 如下图：

    ![](./publish-openharmony/document_image_rId14.png)

    - 备份原来的 SDK 目录, 3.2.5.5_IDE 是备份目录，如下图：

    ![](./publish-openharmony/document_image_rId15.png)

    - 解压 SDK，找到 ohos-sdk\\windows 里的 native-windows-3.2.5.6-Beta2.zip，解压至 OHOS_SDK/native 目录，重命名 native 文件夹（默认解压之后是 native 文件夹）为 3.2.5.5 的目录里，如下图：

    ![](./publish-openharmony/document_image_rId16.png)

    - 修改 OHOS_SDK\\native\\3.2.5.5\\oh-uni-package.json （解压后的NDK），修改版本号为 3.2.5.5，这一步修改是为了避免提示 NDK 升级，如下图：

    ![](./publish-openharmony/document_image_rId17.png)

2. 更换 ets

    - 备份原来的 ets 文件，把目录下的 3.2.5.5（注意不同的IDE下载的版本不一样，例如 DEVECO
993里可能是 3.2.8.3，如果不是3.2.5.5则可以不需要备份，可以共存）改成 3.2.5.5_backup，如下图：

    ![](./publish-openharmony/document_image_rId18.png)

    - 解压文件ets-windows-3.2.5.6-Beta2.zip至OHOS-SDK/ets目录：

    ![](./publish-openharmony/document_image_rId8.png)

    - 解压至OHOS_SDK/ets目录，如下图：

    ![](./publish-openharmony/document_image_rId7.png)

    - 把ets目录改成3.2.5.5，如下图：

    ![](./publish-openharmony/document_image_rId6.png)

    - 修改 OHOS_SDK\\ets\\3.2.5.5\\oh-uni-package.json （解压后的ETS），修改版本号为 3.2.5.5。这一步修改是为了避免提示 ETS 升级，如下图：

    ![](./publish-openharmony/document_image_rId5.png)

    - 打开命令行进入目录 OHOS_SDK\\ets\\3.2.5.5\\build-tools\\ets-loader，并执行 `npm install`，如下图（注意目录要匹配）：

    ![](./publish-openharmony/document_image_rId10.png)

    > **注意**：如果 `npm install` 报错，检查下是否配置了华为的源，配置方法如下： 
    >
    > ` npm config set registry https://repo.huaweicloud.com/repository/npm/ `

    - 在 deveco 里，clear project 之后，重新 build 即可。clear project 操作如下图：

     ![](./publish-openharmony/document_image_rId4.png)

3. 其他
将 js-windows-3.2.5.6-Beta2.zip、previewer-windows-3.2.5.6-Beta2.zip、toolchains-windows-3.2.5.6-Beta2.zip 这三个文件参考上述步骤替换，总结步骤入下：
    - 备份源目录文件；
    - 解压，重命名对应版本文件；
    - 修改对应目录的oh-uni-package.json文件;

    目录对应关系，如下图：
    
    ![](./publish-openharmony/document_image_rId9.png)

### Cocos Creator 3.6.1-OH 构建 OpenHarmony 工程

1. 设置 OpenHarmony SDK 的路径，如下图：

![](./publish-openharmony/document_image_rId48.png)

可以使用 DevEco 查看 SDK 的路径。

2. 打开 DevEco，点击标题栏里的，File-\>Settings\...，如下图：

![](./publish-openharmony/document_image_rId49.png)

3. 查看 OpenHarmony SDK 的配置，如下图：

![](./publish-openharmony/document_image_rId50.png)

> **注意**：API Version 9 的版本要为已安装的状态，如果未安装，需要手动安装，如上图所示。

2. 打开 Cocos Creator，打开存在的项目，如下图：

> ![](./publish-openharmony/document_image_rId51.png)

3. 选择工程的目录，以下以 [cocos-test-projects](https://github.com/cocos/cocos-test-projects/tree/v3.6) 为例，如下图：

![](./publish-openharmony/document_image_rId53.png)

4. 登录开发者账号，如下图：

![](./publish-openharmony/document_image_rId54.png)

5. 根据创建游戏，增加游戏逻辑等

6. 制作完成之后，选择构建，选择标题栏中的 Project-\>Build，也可以使用 Ctrl+Shift+B 的快捷键，如下图：

![](./publish-openharmony/document_image_rId55.png)

7. 点击新建任务，如下图：

![](./publish-openharmony/document_image_rId56.png)

8. 选择 Openharmony

![](./publish-openharmony/document_image_rId57.png)

9. 配置工程名称、配置开始场景与包含的其他场景，勾选调试模式（其他参数需要保持默认配置），点击 build，如下图：

![](./publish-openharmony/document_image_rId58.png)

11、点击 make（目前会提示失败，但是会生成无签名的 hap 包），之后点击 run（需要设备，由于没有签名，目前 run 会失败）即可（由于目前 make 和 run 都会失败，因此可以不操作）。

![](./publish-openharmony/document_image_rId59.png)

### 烧录 Hap 包到 RK 板

1. 构建工程成功后，如下状态即可，make 与 run 可以不需要点击，如下图：

![](./publish-openharmony/document_image_rId60.png)

2. 使用[DevEcoStudio](https://developer.harmonyos.com/cn/develop/deveco-studio#download)，打开工程，如下图：

![](./publish-openharmony/document_image_rId62.png)

3. 找到工程目录（native/engine/openharmony）并点击打开，如下图（下图是以[cocos-test-projects](https://github.com/cocos/cocos-test-projects)为例）：

![](./publish-openharmony/document_image_rId64.png)

4. 配置签名，如下图：

![](./publish-openharmony/document_image_rId65.png)

5. 插入设备，点击运行，如下图：

![](./publish-openharmony/document_image_rId66.png)

执行成功之后，就能看到效果了。

## 几个注意事项：

目前适配的是 OpenHarmony 32 位系统，且系统暂不支持 JIT，因此性能会比较受限。引擎会继续适配 64 位系统，并继续优化性能。

另外，因为 OpenHarmony 还在不断完善当中，因此有些已知问题。这些问题都会在后续的版本解决。这些已知问题是：

1. 未适配功能

    - videoplay

    - webview

    - editbox 输入法

    - network 网络相关的模块

    - 重力传感器模块

    - 横屏、竖屏适配接口


2.  已知效果问题

    - restart 还有问题；

    - 音频播放带有杂音，播放速度比较慢；（单通道和 OpenSELS 的问题）

    - 部分测试例，背景会显示桌面

    - 用到 top level await 的代码，例如 L10N 暂时无法适配；

    - 手动关闭 L10N
        >> 由于 OpenHarmony 的 bata3.2 的分支目前支持 async 有问题，导致 L10N 的组件使用不了，需要手动关闭。
        >>
        >>（1）打工具栏，Pannel-\>localization Editor 选项，如下图：
        >>
        >>![](./publish-openharmony/document_image_rId67.png)
        >>
        >>（2）点击右上角三个点的按钮，选择关闭 L10N，如下图：
        >>
        >> ![](./publish-openharmony/document_image_rId68.png)
        >>
        >> 如果是已关闭状态，则不需要关闭。关闭状态如下图：
        >>
        >> ![](./publish-openharmony/document_image_rId69.png)
        >>
        >>（3）如果测试的是 cocos-test-project 工程，选择 Assets-\>cases-\>localization-deitor-\>点击鼠标右键-\>选择删除。
        >>
        >> ![](./publish-openharmony/document_image_rId70.png)
        >>

    - 如果修改 build 工程的参数，重新 build 之后，需要在 IDE 里，清楚缓存之后在编译，否则有可能会出现不生效的情况。这是 DevEco Studio 本身的问题，目前正在解决。操作如下图：
        >>
        >> ![](./publish-openharmony/document_image_rId71.png)
        >>
        >> 如果修改工程里的 js 文件等，也同样需要 clean project 的操作。否则也可能会不生效。

    - 编译失败时，可以退出部分应用，重新 build 试试；
        >>
        >> ![](./publish-openharmony/document_image_rId72.png)
