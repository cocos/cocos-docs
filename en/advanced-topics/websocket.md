# WebSocket Client

The native environment supports the [Web Standard](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/WebSocket) WebSocket interface.

## Differences

Prior to version 3.5, the WebSocket API on Android and Windows was implemented using [libwebsockets](https://github.com/warmcat/libwebsockets). It requires the developer to specify the CA file path with the third parameter. 

```ts
this.wsInstance = new WebSocket('wss://echo.websocket.org', [], caURL);
````

See [demo code](https://github.com/cocos/cocos-test-projects/blob/07f5671e18ef3ed4494d8cba6c2f9499766467a6/assets/cases/network/NetworkCtrl.ts#L113-L120). CA certificates can be downloaded from [here](https://curl.se/docs/caextract.html).

After version 3.5, certificates are no longer mandatory on Android.
