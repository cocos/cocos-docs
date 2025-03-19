# 发布到 HarmonyOS Next

自 Cocos Creator v3.8.5 起，支持发布到 HarmonyOS Next 平台。

## 准备工作

### 安装最新的Creator

1. Cocos Creator 下载传送门（版本>=3.8.5）：[Cocos Creator](https://www.cocos.com/creator-download)

### 安装 DevEco Studio

1. 下载最新的 IDE，下载对应平台的 IDE，点击右边的下载按钮，如下图：

    ![](./publish-openharmony/document_image_rId3.png)

2. 解压目录，双击 deveco-studio-5.0.5.310.exe 进行安装，点击 Next，如下图：

    ![](./publish-openharmony/document_image_rId33.png)

3. 选择安装路径，点 Next，如下图：

    ![](./publish-openharmony/document_image_rId34.png)

4. 根据需求配置，点击 Next，如下图:

    ![](./publish-openharmony/document_image_rId35.png)

5. 点击安装，如下图：

    ![](./publish-openharmony/document_image_rId36.png)

6. 等待安装，如下图：

    ![](./publish-openharmony/document_image_rId37.png)

7. 安装完成，如下图：

    ![](./publish-openharmony/document_image_rId38.png)

8. 启动 DevEco Studio，如下图:

    ![](./publish-openharmony/document_image_rId39.png)

9. 首次会提示设置源，默认应该就可以，如下图:

    ![](./publish-openharmony/document_image_rId40.png)

10. 首次安装需要安装 Node.js，如果之前安装有 Node.js，选择本地的 Node.js 即可，但是有版本要求，Node.js 的版本必须大于 v14.19.1和小于 v15.0.0。npm 的版本要求大于 6.14.16 和小于 7.0.0。如下图：

    ![](./publish-openharmony/document_image_rId41.png)

11. 这里选择下载新的 Node.js 为例，如下图:

    ![](./publish-openharmony/document_image_rId42.png)

12. 等待下载完成，然后点击 Finish 按钮，如下图：

    ![](./publish-openharmony/document_image_rId43.png)

13. 确认版本信息，点击 Next，如下图：

    ![](./publish-openharmony/document_image_rId45.png)

14. 选择 Accept 之后，选择 Next，如下图：

    ![](./publish-openharmony/document_image_rId46.png)

15. 等待下载完成，之后点击 Finish 即可，如下图：

    ![](./publish-openharmony/document_image_rId47.png)

### Creator构建HarmonyOS Next工程

1. 选择工程的目录，以下以 [cocos-test-projects](https://github.com/cocos/cocos-test-projects/tree/v3.8) 为例，如下图：

    ![](./publish-openharmony/document_image_rId53.png)

2. 登录开发者账号，如下图：

    ![](./publish-openharmony/document_image_rId54.png)

3. 创建游戏项目，增加游戏逻辑等

4. 制作完成之后，选择构建，选择标题栏中的 Project-\>Build，也可以使用 Ctrl+Shift+B 的快捷键，如下图：

    ![](./publish-openharmony/document_image_rId55.png)

5. 点击新建任务，如下图：

    ![](./publish-openharmony/document_image_rId56.png)

6. 选择 HarmonyOS Next

    ![](./publish-openharmony/document_image_rId57.png)

7. 配置工程名称、配置开始场景与包含的其他场景，配置 Debug/Release，点击 Build，如下图：

    ![](./publish-openharmony/document_image_rId58.png)

8. 目前Make与Run功能还未实现，请使用 DevEco 打开工程
    ![](./publish-openharmony/document_image_rId59.png)


## HarmonyOS Next 系统接口与 Cocos 交互

[基于反射机制实现 JavaScript 与 HarmonyOS Next 系统原生通信](../../advanced-topics/arkts-reflection.md)

目前 Cocos 与 Ark 是分两个线程的，一个是 UI 线程，跑的是 Ark 引擎，另一个是 worker 线程，可以跑 Ark/V8 引擎。

所以这里要分两种情况：

### Cocos 使用 Ark 引擎

这样 globalThis 与 Cocos 的 globalThis 是一致的，也就是说给 globalThis 赋值，在 Cocos 上可以直接使用 globalThis 获取。

参考实现(构建 HarmonyOS Next 工程，使用 DevEco 打开工程，查看：entry/src/main/ets/cocos/oh-adapter/sys-ability-polyfill文件的实现)：

```ts
globalThis.getSystemLanguage = function () {
  return i18n.getSystemLanguage();
}
```

在 Cocos 上，可以直接使用:

```ts
globalThis.getSystemLanguage();
```

但是并不是所有的接口都可以这样封装，由于部分 HarmonyOS Next 的系统接口是只能在 UI 线程上使用的，例如 tts 与 asr 等接口；还有些 UI 操作相关的接口，例如 Editbox、Video 等。

这样必须使用进程间的通信机制来完成

Cocos 封装了一个类，名为 ProxyPort 类，这个是个公共类，同时可以在 ui 线程与 worker 线程上使用。可以通过使用 ProxyPort 接口互相发送消息。例如，在 ui 线程上（即 ets 布局文件与 ability 等文件）使用：

```ts
// entry/src/main/ets/pages/index.ets文件
// 监听从worker上发送的消息，即cocos发送的消息；
this.workPort.on('createWebview', (param: number)=> {
    this.webViewArray.push(new WebViewInfo(0, 0, 0, 0, param));
    this.webViewIndexMap.set(param, this.webViewArray.length - 1);
});

// entry/src/main/ets/components/CocosVideoPlayer.ets文件
// 在UI线程上，把事件派发给worker线程（即cocos）。
this.workPort?.postMessage("onVideoEvent", {
    videoTag: this.videoInfo.viewTag as number,
    videoEvent: EventType.PLAYING as EventType
} as param);

// entry/src/main/ets/workers/cocos_worker.ts 文件
// 在worker线程（即cocos）上，接收来着ui线程发送的消息
// 这里相当于中转，对游戏来说是只关心回调。
uiPort.on("onVideoEvent", (param) => {
  // @ts-ignore
  if (globalThis.oh && typeof globalThis.oh.onVideoEvent === "function") {
    // @ts-ignore 
    // 回调至业务代码
    globalThis.oh.onVideoEvent(msg.param.videoTag, msg.param.videoEvent, msg.param.args);
  }
});

```

### Cocos使用 V8 引擎

使用 V8，则不能使用 globalThis 来进行互相调用，因为 globalThis 已经是两个不同的东西；
因此需要交互的话，需要通过native进行绑定。

绑定分为两个部分：

- Ark 通过  napi 接口与 native 进行绑定；
- V8 通过接口绑定到 native

这样就可以在native里进行互相调用，例如：

```ts
// entry/src/main/ets/cocos/oh-adapter/sys-ability-polyfill文件的实现
globalThis.getSystemLanguage = function () {
  return i18n.getSystemLanguage();
}

```

在 native 里：

```c++
// getCurrentLanguageCode是js上的jsb.__getCurrentLanguageCode的实现
std::string System::getCurrentLanguageCode() const {
    // 通过napi调用ark引擎上的getSystemLanguage接口
    auto ret = NapiHelper::napiCallFunction("getSystemLanguage");
    if (!ret.IsString()) {
        return {};
    }
    auto str = ret.As<Napi::String>().Utf8Value();
    std::string::size_type pos = str.find('-');
    if(pos != std::string::npos) {
        str = str.substr(0, pos);
    }
    return str;
}
```

## 几个注意事项

另外，因为 HarmonyOS Next 还在不断完善当中，因此有些已知问题。这些问题都会在后续的版本解决。

- Restart 目前还未有方案；
- 编译失败时，可能是内存不足导致，退出部分应用，重新 build 试试；
    >>
    >> ![](./publish-openharmony/document_image_rId72.png)
- 更新IDE，编译报错,如下图：
   >> ![](./publish-openharmony/document_image_rId75.png)
