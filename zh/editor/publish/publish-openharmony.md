# **Cocos3.6.1-OH 适配OpenHarmany教程**

## 前言

在OpenHarmony开源之初，Cocos
就将与OpenHarmony的深度合作作为了重要发展战略之一。在2022年4月份，Cocos官方基于
Cocos2d-html5 3.16
案例游戏《鹰击长空》适配OpenHarmony架构、在RK3568板卡上流畅游戏的工作流。在后续的持续技术适配当中，Cocos
团队更是以最新的Creator 3D 引擎适配为目标， 在最新的Creator
3.6.1版本上保障了《鹰击长空》持续集成。

鹰击长空：[GitHub - cocos/cocos-tutorial-airplane: video tutorial
airplane](https://github.com/cocos/cocos-tutorial-airplane)

游戏视频：

<video src="./publish-openharmony/video.mp4"></video>

## 准备工作 

1.  下载 Cocos3.6.1-OH 传送门: Cocos Creator 3.6.1

2.  下载 OpenHarmany 传送门
    ：[OpenHarmonyOS](http://download.ci.openharmony.cn/version/Master_Version/OpenHarmony_3.2.5.5/20220926_081431/version-Master_Version-OpenHarmony_3.2.5.5-20220926_081431-dayu200.tar.gz)

3.  下载最新的IDE（版本\>=3.0.0.993）:[DevEco
    Studio](https://developer.harmonyos.com/cn/develop/deveco-studio#download_beta_openharmony)

4.  系统烧录工具：[RKDevTool](https://gitee.com/hihope_iot/docs/tree/master/HiHope_DAYU200/%E7%83%A7%E5%86%99%E5%B7%A5%E5%85%B7%E5%8F%8A%E6%8C%87%E5%8D%97/windows)，[使用文档](https://gitee.com/hihope_iot/docs/tree/master/HiHope_DAYU200/%E7%83%A7%E5%86%99%E5%B7%A5%E5%85%B7%E5%8F%8A%E6%8C%87%E5%8D%97#https://gitee.com/hihope_iot/docs/tree/master/HiHope_DAYU200/%E7%83%A7%E5%86%99%E5%B7%A5%E5%85%B7%E5%8F%8A%E6%8C%87%E5%8D%97/windows)

5.  开发套件：[HH-SCDAYU200](https://gitee.com/hihope_iot/docs/tree/master/HiHope_DAYU200)

## 发布步骤

### 系统烧录

1.  下载[windows平台工具](https://gitee.com/hihope_iot/docs/tree/master/HiHope_DAYU200/%E7%83%A7%E5%86%99%E5%B7%A5%E5%85%B7%E5%8F%8A%E6%8C%87%E5%8D%97/windows)，解压后，如下图：

![](./publish-openharmony/document_image_rId19.png)

2.  解压DriverAssitant_v5.1.1，解压后，如下图：

![](./publish-openharmony/document_image_rId20.png)

3.  双击DriverInstall.exe安装USB驱动，如下图

![](./publish-openharmony/document_image_rId21.png)

4.  点击驱动安装，如下图：

![](./publish-openharmony/document_image_rId22.png)

5.  连接设备，设备连接图，如下图：

![](./publish-openharmony/document_image_rId23.png)

6.  切换根目录，双击RKDevTool.exe，双击运行，如下图：

![](./publish-openharmony/document_image_rId24.png)

7.  如果连上设备，默认就是\'发现一个MASKROM设备\'，但是只有loader设备才能烧写系统（必须安装USB驱动之后，才会显示设备），如下图：![](./publish-openharmony/document_image_rId25.png)

8.  按着recover（一直按着），然后按一下下reset按钮（按一次，松开），过一会放开recover，就会发现变成
    发现一个loader设备，如下图: ![](./publish-openharmony/document_image_rId26.png)

9.  显示'发现一个LOADER设备'才能烧写系统，如下图：

![](./publish-openharmony/document_image_rId27.png)

10. 出现这个状态之后，解压下载的[OpenHarmony系统](http://download.ci.openharmony.cn/version/Master_Version/OpenHarmony_3.2.5.5/20220926_081431/version-Master_Version-OpenHarmony_3.2.5.5-20220926_081431-dayu200.tar.gz)，如下图：

![](./publish-openharmony/document_image_rId29.png)

11. 在软件中，把打勾的部分，选择解压的系统对应的文件，如下图

![](./publish-openharmony/document_image_rId30.png)

12. 点击执行，等待日志显示'下载完成'即可。执行成功后，设备会自动进行重启，出现软件OpenHarmony界面欢迎页面，然后进入到桌面，即表示烧录成功。

![](./publish-openharmony/document_image_rId31.png)

### 安装DevEco Studio：

1.  下载最新的IDE，下载对应平台的IDE，点击右边的下载按钮，如下图：

![](./publish-openharmony/document_image_rId32.png)
2.  解压目录，双击deveco-studio-3.0.0.993.exe进行安装，点击next，如下图：

![](./publish-openharmony/document_image_rId33.png)

3.  选择安装路径，点next，如下图：

![](./publish-openharmony/document_image_rId34.png)

4.  根据需求配置，点击next，如下图:

![](./publish-openharmony/document_image_rId35.png)

5.  点击安装，如下图：

![](./publish-openharmony/document_image_rId36.png)

6.  等待安装，如下图：

![](./publish-openharmony/document_image_rId37.png)

7.  安装完成，如下图：

![](./publish-openharmony/document_image_rId38.png)

8.  启动DevEco Studio，如下图:

![](./publish-openharmony/document_image_rId39.png)

9.  首次会提示设置源，默认应该就可以，如下图:

![](./publish-openharmony/document_image_rId40.png)

10. 首次安装需要安装nodejs，如果之前安装有nodejs，选择本地的nodejs即可，但是有版本要求，nodejs的版本必须大于V14.19.1和小于15.0.0。npm的版本要求大于6.14.16和小于7.0.0。如下图：

![](./publish-openharmony/document_image_rId41.png)

11. 这里选择下载新的nodejs为例，如下图:

![](./publish-openharmony/document_image_rId42.png)

12. 等待下载完成，然后点击Finish按钮，如下图：

![](./publish-openharmony/document_image_rId43.png)

13. 接下来会提示安装SDK，点击下一步，注意是OpenHarmonySDK，如下图

![](./publish-openharmony/document_image_rId44.png)

14. 确认版本信息，点击next，如下图：

![](./publish-openharmony/document_image_rId45.png)

15. 选择Accept，之后，选择Next，如下图：

![](./publish-openharmony/document_image_rId46.png)

16. 等待下载完成，之后点击Finish即可，如下图：

![](./publish-openharmony/document_image_rId47.png)

### Cocos Creator 3.6.1 构建 OpenHarmony 工程

1.  设置OpenHarmony SDK的路径，如下图：

![](./publish-openharmony/document_image_rId48.png)

可以使用DevEco查看SDK的路径

1.  打开DevEco

2.  点击标题栏里的，File-\>Settings\...，如下图：

![](./publish-openharmony/document_image_rId49.png)

3.  查看OpenHarmony SDK的配置，如下图：

![](./publish-openharmony/document_image_rId50.png)

注意：API Version
9的版本要为已安装的状态，如果未安装，需要手动安装，如上图所示。

2.  打开creator，打开存在的项目，如下图：

> ![](./publish-openharmony/document_image_rId51.png)

3.  选择工程的目录，以下以[cocos-test-projects](https://github.com/cocos/cocos-test-projects/tree/v3.6)为例，如下图：

![](./publish-openharmony/document_image_rId53.png)

4.  登录开发者账号，如下图：

![](./publish-openharmony/document_image_rId54.png)

5.  根据创建游戏，增加游戏逻辑等

6.  制作完成之后，选择构建，选择标题栏中的project-\>Build，也可以使用Ctrl+Shift+B的快捷键，如下图：

![](./publish-openharmony/document_image_rId55.png)

7.  点击新建任务，如下图：

![](./publish-openharmony/document_image_rId56.png)
8.  选择Openharmony

![](./publish-openharmony/document_image_rId57.png)

9.  配置工程名称、配置开始场景与包含的其他场景，勾选调试模式（其他参数需要保持默认配置），点击build，如下图：

![](./publish-openharmony/document_image_rId58.png)

11、点击make（目前会提示失败，但是会生成无签名的hap包），之后点击run（需要设备，由于没有签名，目前run会失败）即可（由于目前make和run都会失败，因此可以不操作）。

![](./publish-openharmony/document_image_rId59.png)

### 烧录Hap包到RK板

1、构建工程成功后，如下状态即可，make与run可以不需要点击，如下图：

![](./publish-openharmony/document_image_rId60.png)

2、 使用[DevEco
Studio](https://developer.harmonyos.com/cn/develop/deveco-studio#download)，打开工程，如下图：

![](./publish-openharmony/document_image_rId62.png)

3、
找到工程目录（native/engine/openharmony）并点击打开，如下图（下图是以[cocos-test-projects](https://github.com/cocos/cocos-test-projects)为例）：

![](./publish-openharmony/document_image_rId64.png)

4、配置签名，如下图：

![](./publish-openharmony/document_image_rId65.png)

5、插入设备，点击运行，如下图：

![](./publish-openharmony/document_image_rId66.png)

执行成功之后，就能看到效果了。

## 几个注意事项：

目前适配的是 OpenHarmony 32 位系统，且系统暂不支持
JIT，因此性能会比较受限。引擎会继续适配 64 位系统，并继续优化性能。

另外，因为 OpenHarmony
还在不断完善当中，因此有些已知问题。这些问题都会在后续的版本解决。这些已知问题是：

1、未适配功能

1.  videoplay

2.  webview

3.  editbox输入法

4.  network网络相关的模块

5.  重力传感器模块

6.  横屏、竖屏适配接口


2、  已知效果问题
1.  restart还有问题；

2.  音频播放带有杂音，播放速度比较慢；（单通道和OpenSELS的问题）

3.  部分测试例，背景会显示桌面

4.  


3、  用到 top level await 的代码，例如 L10n 暂时无法适配；

4、  手动关闭L10N

由于OpenHarmony的bata3.2的分支目前支持async有问题，导致l10n的组件使用不了，需要手动关闭。

（1）打工具栏，Pannel-\>localization Editor选项，如下图：

![](./publish-openharmony/document_image_rId67.png)

（2）点击右上角三个点的按钮，选择关闭l10n，如下图：

> ![](./publish-openharmony/document_image_rId68.png)

如果是已关闭状态，则不需要关闭。关闭状态 如下图：

> ![](./publish-openharmony/document_image_rId69.png)

（3）如果测试的是cocos-test-project工程，选择Assets-\>cases-\>localization-deitor-\>点击鼠标右键-\>选择删除。

![](./publish-openharmony/document_image_rId70.png)

5.  如果修改build工程的参数，重新build之后，需要在IDE里，清楚缓存之后在编译，否则有可能会出现不生效的情况。DevEco
    Studio的问题，目前正在解决。操作如下图：

![](./publish-openharmony/document_image_rId71.png)

如果修改工程里的js文件等，也同样需要clean
project的操作。否则也可能会不生效。

6.  编译失败时，可以退出部分应用，重新build试试；

![](./publish-openharmony/document_image_rId72.png)
