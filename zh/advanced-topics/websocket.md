# WebSocket 客户端

原生环境支持 [Web 标准的](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/WebSocket) WebSocket 接口.

## 差异

在 3.5 版本之前, Android 和 Windows 上的 WebSocket API 使用 [libwebsockets](https://github.com/warmcat/libwebsockets) 实现. 需要开发者通过第三个参数指定 CA 文件路径. 
```ts
this.wsInstance = new WebSocket('wss://echo.websocket.org', [], caURL);
```

> 参考 [示例代码](https://github.com/cocos/cocos-test-projects/blob/07f5671e18ef3ed4494d8cba6c2f9499766467a6/assets/cases/network/NetworkCtrl.ts#L113-L120). 可以在 [这里](https://curl.se/docs/caextract.html) 下载 CA 证书.


3.5 版本之后, Android 上不在强制提供证书.
