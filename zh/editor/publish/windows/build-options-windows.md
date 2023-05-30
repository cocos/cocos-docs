# Windows 平台构建选项

Windows 平台的构建选项包括 **渲染后端** 和 **生成平台**。

![Windows build options](../publish-native/windows-options.png)

## 渲染后端（Render BackEnd）

在 Windows 平台上， Cocos Creator 目前支持 **VULKAN**、**GLES3** 和 **GLES2** 三种**渲染后端**。默认勾选 **GLES3**，在同时勾选多个的情况下，运行时将会根据设备实际支持情况来选择使用的渲染后端。

## 生成平台

设置编译架构，目前支持 **x64** 和 **win32** 两种。
- 若选择 **x64**，则只能在 **x64** 架构上运行。
- 若选择 **win32**，则可以在两种架构上运行。
