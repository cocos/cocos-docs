# 原生平台构建指引

支持的原生平台包括 Android、iOS、Mac、Windows 四个，其中 iOS、Mac 和 Windows 的选项只能在相应的操作系统中才会出现，这些原生平台都是基于 cocos2d-x 引擎的，所以在工程处理方面会有很多类似的地方，也会有很多相同的选项。

## 环境配置

发布原生平台需要配置一些必要的环境，详情请参考 [原生环境配置](setup-native-development.md)。

## 构建选项

一些通用构建参数的配置，请参照 [通用构建参数介绍](build-options.md)。

![native platform](publish-native/native_platform.jpg)

下面介绍一些平台特有以及通用选项内需要注意的点：

### MD5 Cache

作为通用选项，主要是给构建后的所有资源文件名将加上 MD5 信息，解决热更新时的 CDN 资源缓存问题。
启用后，如果出现资源加载不了的情况，说明找不到重命名后的新文件。这通常是因为有些 C++ 中用到的第三方资源没通过 cc.loader 加载引起的。这时可以在加载前先用以下方法转换 url ，转换后的路径就能正确加载，具体代码如下：

```cpp
auto cx = ScriptingCore::getInstance()->getGlobalContext();
JS::RootedValue returnParam(cx);
ScriptingCore::getInstance()->evalString("loader.md5Pipe.transformURL('url')", &returnParam);

string url;
jsval_to_string(cx, returnParam, &url);
```

### 原生平台通用参数选项

由于目前构建机制上的调整，不同平台的处理均以插件的形式注入，在选择完原生平台后，将会看到除了原生具体平台的选项外还有 `native` 的选项，native 相关选项参数在各个具体平台上都是一致的。

![Native 选项](publish-native/native_options.jpg)

#### 选择源码模板（Template）

在 native 选项的 **模板 (Template)** 下拉菜单中有两种可用的引擎模板，我们可以从中选择一种：

- default，使用默认的 Cocos2d-x 源码版引擎构建项目
- link，与 default 模板不同的是，link 模板不会拷贝 Cocos2d-x 源码到构建目录下，而是使用共享的 Cocos2d-x 源码。这样可以有效减少构建目录占用空间，以及对 Cocos2d-x 源码的修改可以得到共享。

关于源码引擎的概念，可以参照下文：

> Cocos2d-x 引擎中包括源码引擎。他们适用的范围是：
>
> - 源码引擎初次构建和编译某个工程时需要很长的时间编译 C++ 代码，视电脑配置而定，这个时间可能在 5~20 分钟。对于同一个项目，已经编译过一次之后，下次再编译需要的时间会大大缩短。
> - 源码引擎构建出的工程，使用原生开发环境编译和运行（如 Android Studio、Xcode 等 IDE），是可以进行调试和错误捕获的。

目前 Cocos Creator 安装目录下已经包含了自带的 Cocos2d-x 源码引擎，在安装目录下的 resources/3d/cocos2d-x-lite 文件夹内可以查看到。

#### Polyfills

这里是脚本系统支持的一些新特性的 polyfills 选项，勾选后生成的项目会带上对应的 polyfills 也就是会增大包体，开发者可以根据实际需求选择需要的 polyfills, 这组选项暂时只有异步函数，后续将会开放更多功能。

## 构建后目录

```bash
- [native]
    - assets // 项目资源资源文件夹目录(具体参考通用构建的基础目录结构)
        - main.js
        - project.json
        - src
        ...
    - proj // 对应平台原生工程入口，不同平台结构不同
        - ...
    - compile.config.json // 本次构建的编译选项 json
```

构建生成对应工程文件后，使用对应平台的相关开发工具打开 proj 即可。具体还请参考对应平台的具体文档。
