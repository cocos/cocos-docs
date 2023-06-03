# 原生平台二次开发指南

如果你需要为增加第三方 SDK 库，或者增删 C++，OC，JAVA 代码文件，以下内容可以帮你更好地理解。

## 原生项目目录

当点击**构建**按钮后，会生成三个原生平台相关的文件夹。

### 公共目录

公共目录位置：`native/engine/common`

此目录用于存放共公内容，如引擎库配置，以及一些所有平台都会用上的第三方库。

> 这个目录下的代码多数是由 C/C++ 编写。

### 原生平台目录

平台目录名字规则：native/engine/当前构建的平台名称

这个目录用于存放对应平台相关的信息，比如：

- native/engine/android
- native/engine/ios
- native/engine/win64
- native/engine/mac

> win64 用于 windows, 目前已不再支持 win32, 仅支持 win64 应用程序发布。

### 项目目录

项目目录名字规则：`build/当前构建的平台名称`

这个目录，包含的是最终生成的原生工程，用于编译、调试和发布。如：

- build/android
- build/ios
- build/windows
- build/mac

每一次构建时，引擎会将公共目录和原生平台目录，以及 Cocos Creator 项目中的资源、脚本等结合在一起，生成项目目录。

项目目录中的代码和相关配置引用原生平台目录下的文件，在 IDE 中改动对应的部分，平台目录下的文件也会做对就修改。

**例外：** `native/engine/ios/info.plist` 与 `native/engine/mac/info.plist` 文件由于`CMake`的机制，使用的是复制方式。 如果要对 `info.plist` 进行修改，则需要注意。

项目目录包含下内容：
- `assets`：`data` 目录的软链，用于兼容各平台
- `data`：Cocos Creator 项目中的资源和脚本生成的内容
- `proj`：存放当前构建的原生平台工程，可用于对应平台的 IDE（如 Xcode，Android Studio 等） 执行编译、调试和发布。
- `cocos.compile.config.json`：本次构建的采用的构建选项配置

## 原生项目定制开发

因为项目需要，有时候我们需要修改、增删原生平台相关的源代码，或者引入第三方SDK，修改项目配置等。 这些工作，我们称为项目定制开发。

下面我们就分类说明，不同情况下的需求，如何操作。

### 修改引擎代码

请参考 [引擎定制工作流程](./engine-customization.md)。

### 修改项目代码

如果需要修改项目相关的代码，只需要找到对应文件进行修改即可，修改完即可编译，不需要额外配置。

### 增删项目代码文件

增删代码文件，将会涉及到编译配置，而不同的语言和平台有所差异，下面将分类说明。

#### 增删 C++ 文件

如果需要增加和删除项目相关的 `C++` 文件，需要做对应的 `CMakeList.txt` 修改。

如果增删的是 `native/engine/common/` 目录下的代码，则需要修改 `native/engine/common/CMakeLists.txt`

```bat
list(APPEND CC_COMMON_SOURCES
    ${CMAKE_CURRENT_LIST_DIR}/Classes/Game.h
    ${CMAKE_CURRENT_LIST_DIR}/Classes/Game.cpp
)
```

如上面代码所示，找到对应位置，添加或者删除自己的源码即可。

如果增删的是平台相关的 `C++` 代码文件，则需要修改 `native/engine/平台名称/CMakeLists.txt`。参考下面代码：

```bat
include(${CC_PROJECT_DIR}/../common/CMakeLists.txt)

//在这个位置添加自己的 C++ 文件
list(APPEND CC_PROJ_SOURCES
    ${CMAKE_CURRENT_LIST_DIR}/MyTest2.hpp
    ${CMAKE_CURRENT_LIST_DIR}/MyTest2.cpp
)
```

#### 增删 OC 文件

Cocos Creator 生成的 iOS/macOS 原生工程中，Objective-C 文件的管理方式，与 C++ 完全一致，参考上面的内容即可。

#### 增删 Java 文件

Java 语言本身是基于路径的包管理机制，增删 `JAVA` 文件不需要做特殊处理。

### 引入第三方 C++/OC 库

如果引入的库是由 C++/OC 编写而成，则根据情况将 SDK 放入 `native/engine/common/` 或者 `native/engine/平台名称/` 目录下，并修改对应目录下的 `CMakeList.txt`。

OC 库只能放在平台目录，不能放在 `native/engine/common/`，否则会导致在其他原生平台出现编译错误。

大部分 C++ SDK 也提供了自己的 `CMakeList.txt`，直接通过 `include` 的方式集成就行。

关于 CMake 的配置，可以参考项目中已有的 `CMakeList.txt` 进行修改。更多关于 CMake 的使用详情，可参考 [CMake 使用简介](../../advanced-topics/cmake-learning.md)。

### 引入 Jar 库

如果引入的库是 Android 平台特有的库，直接放到对应的 `native/engine/android/` 目录，配置 `native/android/build.gradle` 即可。

## 脚本与原生通信

新写的原生方法，或者新引入的原生 SDK，如果想要导出到脚本层使用，可以采用以下几种方案。

### 使用 JsbBridge

如果需要调用一些简单，非高频的函数，可以使用 `JsbBridge` 机制进行调用。

- [使用 JsbBridge 实现 JavaScript 与 Java 通信](js-java-bridge.md)
- [使用 JsbBridge 实现 JavaScript 与 Objective-C 通信](js-oc-bridge.md)

### JSB 自动绑定

对于需要高频调用，或者批量导出 API 到脚本层的接口，建议使用 [JSB 自动绑定](jsb-auto-binding.md) 机制实现脚本与原生交互。

### 基于语言反射机制

基于 Java 和 OC 语言反射机制的通信，也可以很方便实现脚本与原生的交互，但由于 iOS 的审核规则越来越严格，iOS 上使用反射机制有审核失败的风险。

- [基于反射机制实现 JavaScript 与 Android 系统原生通信](java-reflection.md)
- [基于反射机制实现 JavaScript 与 iOS/macOS 系统原生通信](oc-reflection.md)

## 源码版本管理

如果你的团队使用源码版本管理软件进行多人协同工作，`native` 目录需要全部加入到源码版本管理。

所有的项目定制化工作都应该尽量放到 `native` 目录，这样 `build` 目录就可以随时被删除，它不需要加入到源代码版本管理。

对于一些特殊的项目需求，无法在 `native` 目录下完成，则需要改动 `build` 目录下的内容，此时应该根据需求将对应的文件夹加入管理。
