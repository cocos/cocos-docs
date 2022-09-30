# WebGPU使用手册（实验性质）

自3.6.2起Cocos Creator支持将WebGPU作为Web-Desktop渲染后端，构建Web-Desktop的时候勾选`WebGPU`即可。

## 预览

需要指定版本的chromium才能预览：[chromium历史版本](https://vikyd.github.io/download-chromium-history-version/#/)。
下载mac或者windows平台chromium 105的最后一个版本，需要本地搭建一个服务器来访问对应的资源文件。为了方便本地调试，也可以启动chromium的时候带上参数`--allow-file-access-from-files`. 打开构建出来的网页即可。

## 调试

参考：[gfx-wgpu](https://github.com/cocos/cocos-engine/tree/v3.6.2/native/cocos/renderer/gfx-wgpu).
