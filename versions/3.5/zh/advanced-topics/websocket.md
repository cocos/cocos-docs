# WebSocket 客户端

原生环境支持 [Web 标准的](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/WebSocket) WebSocket 接口。

## 差异

在 v3.5 版本之前，Android 和 Windows 上的 WebSocket API 使用 [libwebsockets](https://github.com/warmcat/libwebsockets) 实现。需要开发者通过第三个参数指定 CA 文件路径：

```ts
this.wsInstance = new WebSocket('wss://echo.websocket.org', [], caURL);
```

详情请参考 [示例代码](https://github.com/cocos/cocos-test-projects/blob/07f5671e18ef3ed4494d8cba6c2f9499766467a6/assets/cases/network/NetworkCtrl.ts#L113-L120)。可访问 [下载 CA 证书](https://curl.se/docs/caextract.html) 下载对应的证书。

在 v3.5 版本之后, Android 上不再强制要求提供证书。
