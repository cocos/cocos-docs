# 项目工程升级指南

- 本文将详细介绍 Cocos Creator 原生构建工程从 3.5~3.5.x 升级到 3.6 的注意事项。修改仅针对项目工程下的 native 目录

### 首先，在新的目录中使用新版本的creator打开旧工程，然后构建目标平台，最后参考以下步骤

#### Android 文件修改
  - 删除文件 ~~jni/main.cpp~~
  - android/CMakeLists.txt 中删除 `${CMAKE_CURRENT_LIST_DIR}/jni/main.cpp`
  
#### Native 文件的修改可参考以下注意事项
  - 有自定义 jsb 接口的情况：`NonRefNativePtrCreatedByCtorMap` 有使用到的话删除相关代码

#### 针对 Native 代码对应的 `Readonly` 属性变更
  - 为减少内存使用，获取到的属性是新创建的对象，关于 `Readonly` 的说明[参见](../../scripting/readonly.md)


    