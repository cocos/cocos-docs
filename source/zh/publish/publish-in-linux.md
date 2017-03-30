# 在 Linux 上构建项目

> 目前 cocos-lite 的 jsb-binary 工作流以及 creator 的 asar 打包工作流仍未完成，因此本文档先介绍开发版如何构建。之后能用发布版直接构建的话，就能跳过[安装 Creator 开发版]这些步骤。等全部完成后需要在 meta.json 中链接本文。

## 安装 Creator 开发版

 - 克隆 https://github.com/cocos-creator/fireball 到本地（需 GitHub 权限）
 - 安装第三方依赖库
 
    ```bash
    # 进入克隆下来的 repo
    cd path/to/repo
    # 安装 nvm
    curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash
    # 安装 Node.js，如果找不到 nvm 命令可以重新加载 bash profile 或者手工 export 环境变量
    nvm install node
    # 安装 npm CLI 模块
    npm install -g gulp
    npm install -g bower
    npm install -g node-gyp
    # 安装 npm 和 bower 模块
    npm install
    bower install
    ```
 - 安装 Creator，依次执行
 
    ```bash
    gulp update-hosts
    gulp update-builtin
    gulp update-electron-official
    gulp checkout-setting-branch
    gulp update-full
    ```
 - 编译 Electron 原生模块
 
    ```bash
    # 安装原生开发环境
    sudo apt-get install make -y
    sudo apt-get install g++ -y
    # 选取伟大的淘宝镜像
    export USE_TAOBAO_MIRROR=1
    # 编译
    gulp npm-rebuild
    ```
 - 重新更新一次
 
    ```bash
    gulp update
    ```
 - （可选）屏蔽 browserify 或 gulp-sourcemaps 的版本过低的 convert-source-map，否则构建时可能会堆栈溢出
 
    ```bash
    mv node_modules/combine-source-map/node_modules/convert-source-map/ node_modules/combine-source-map/node_modules/convert-source-map_origin
    mv node_modules/gulp-sourcemaps/node_modules/convert-source-map/ node_modules/gulp-sourcemaps/node_modules/convert-source-map_origin
    ```

## 安装 Headless 依赖环境

 - 安装 [Xvfb](https://en.wikipedia.org/wiki/Xvfb)
 
    ```bash
    sudo apt-get install xvfb -y
    ```
 - 安装 [xvfb-maybe](https://github.com/paulcbetts/xvfb-maybe)
 
    ```bash
    npm install xvfb-maybe -g
    ```
 - 启动 Xvfb 服务器
 
    ```bash
    export DISPLAY=':99.0'
    Xvfb :99 -screen 0 1024x768x24 > /dev/null 2>&1 &
    ```
 - 安装其它 Electron 依赖库
 
    ```bash
    # 尝试启动 Electron
    xvfb-maybe node_modules/electron/dist/electron --help
    # 如果提示 error while loading shared libraries: `xxx.so.x`, 则安装所需的库并重复以上步骤直到 electron 命令执行成功
    sudo apt-get install `***` -y
    ```
可能缺少的库有：

提示缺少的文件 | 需要安装的库
:----------- |:-------------
libgtk-x11-2.0.so.0  | libgtk2.0-0
libXtst.so.6 | libxtst6
libXss.so.1 | libxss1
libgconf-2.so.4 | libgconf-2-4
libnss3.so | libnss3
libasound.so.2 | libasound2

 - Trouble Shooting

   - `xvfb-run: error: Xvfb failed to start`

     重新启动 Xvfb 服务器，并且确保 DISPLAY 环境变量已经设置好

   - `Xlib:  extension "RANDR" missing on display ":99.0"`

     无关警告，可以忽略

   - `ALSA lib ***.c:***:(***) ...`

     无关警告，可以忽略

## 用命令行启动 Creator 并执行构建

使用和其它平台一样的[命令行参数](publish-in-command-line.md)执行构建，其中可执行文件路径需要替换成 `xvfb-maybe npm start --`，例如

```bash
xvfb-maybe npm start -- --path path/to/project/ --build 'platform=web-mobile;'
```

## 自动更新 Creator

需 GitHub 权限

```bash
gulp update
```

## 构建与编译 Android 平台

### 安装 Android 开发环境

1. 需要安装的有：
    * python (需要 2.7.5 以上的 2.7.x 版本)
    * JDK
    * Android SDK
    * Android NDK
    * Ant

2. 配置环境变量：
    * NDK_ROOT
    * ANDROID_SDK_ROOT
    * ANT_ROOT （指向 ant/bin 文件夹）

3. 配置 Creator 的 Perference：
    * 打开 `~/.CocosCreator/settings.json`
    * 修改 `android-sdk-root`, `ant-root` & `ndk-root` 的值（与环境变量一致）。

### 安装 cocos2d-x-lite 仓库

通过 git clone 命令将 [cocos2d-x-lite 仓库](https://github.com/cocos-creator/cocos2d-x-lite) clone 到 `cocos-creator/cocos2d-x` 文件夹。

### 构建 Android 平台的工程

使用命令行方式来构建项目，生成 Android 平台工程。示例命令如下：

  ```bash
  xvfb-maybe npm start -- --path path/to/project/ --build 'platform=android;template=default'
  ```

关于命令行构建项目的更多参数，参考[命令行构建项目文档](./publish-in-command-line.md)。

### 通过 cocos 命令行来编译 Android 工程

* 首先，需要将 `cocos-creator/cocos2d-x/tools/cocos2d-console/bin` 文件夹添加到系统的 PATH 环境变量中。
* 然后，在命令行中执行如下命令来编译 Android 工程：

  ```bash
  cocos compile -s /path/to/project/build/jsb-default -p android
  ```
* 如果在编译 Android 平台是遇到报错：`Cannot run program "/path/android-sdk/.../aapt": >error=2, No such file or directory`

  参考[网页](http://stackoverflow.com/questions/22701405/aapt-ioexception-error-2-no-such-file-or-directory-why-cant-i-build-my-grad)，执行如下命令来解决：

  ```bash
  sudo apt-get install lib32stdc++6 lib32z1
  ```

## 参考

 - Testing on Headless CI Systems: https://github.com/electron/electron/blob/master/docs/tutorial/testing-on-headless-ci.md
