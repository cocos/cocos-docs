# v3.5 已构建工程升级 v3.6 指南

本文将详细介绍 Cocos Creator 原生构建工程从 3.5.0 ~ 3.5.x 升级到 3.6 的注意事项。修改仅针对项目工程下的 native 目录。

## 构建

使用新版本的引擎打开旧版本的工程，待升级完成之后，构建目标平台。为避免升级失败，请先备份好工程，然后依据下列步骤进行升级。

## Android 平台

### 文件修改

- 删除文件：jni/main.cpp
- android/CMakeLists.txt：删除 `${CMAKE_CURRENT_LIST_DIR}/jni/main.cpp`

### 编译修改

为减少包体大小，更改了 CMAKE_C_FLAGS_RELEASE、CMAKE_CXX_FLAGS_RELEASE 编译参数 `visibility` 的默认值;从 default 改成了 hidden 。改完后 arm64-v8a 下的引擎动态库可以减少约 3.5M。针对这个修改，若 release 版本 `jni` 出现接口找不到，请先检查接口是否有添加`JNIEXPORT`的声明。

## 代码修改

- 有自定义 jsb 接口的工程：须删除与 `NonRefNativePtrCreatedByCtorMap` 相关的代码

## 脚本编写注意事项

由于 Native 引擎的实现和非 Native 的引擎在实现上略有差异，开发者须了解这些差异，现整理如下：

- `Readonly`：在 Native 平台上，为减少内存使用，获取到的属性是新创建的对象。

    关于 `Readonly` 的说明可参考 [开发注意事项 - ReaOnly](../../scripting/readonly.md#readonly)
