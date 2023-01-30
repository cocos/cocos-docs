# 使用 WebSocket 服务器

开发者可以在游戏进程中启动一个 **WebSocket 服务器**，提供 **RPC 接口**。通过完善和调用这些 **RPC 接口**，开发者能够对游戏进程内部状态进行监控，增加对游戏进程状态的管理能力。

## 如何启用

**WebSocket 服务器** 默认是剔除的。若要启用，需要在编辑器顶部菜单栏中 **项目设置 -> 功能裁剪** 中勾选**WebSocket Server** 配置。

## 如何调用 WebSocket 服务器接口

可参考下方实例代码：

```ts
// 在原生平台的 Release 模式下或者在 Web /微信小游戏等平台中，WebSocketServer 可能没有定义
if (typeof WebSocketServer === "undefined") {
    console.error("WebSocketServer is not enabled!");
    return;
}

let s = new WebSocketServer();
s.onconnection = function (conn) {
    conn.onmessage = function (data) {
        conn.send(data, (err) => {});
    }
    conn.onclose = function () {
        console.log("connection gone!");
    };
};

s.onclose = function () {
  console.log("server is closed!");
}
s.listen(8080, (err) => {
   if (!err);
   console.log("server booted!");
});
```

## API

接口定义如下：

```typescript
/**
 * 服务器对象
 */
class WebSocketServer {
    /**
     * 关闭服务
     */
    close(cb?: WsCallback): void;
    /**
     * 监听并启动服务
     */
    listen(port: number, cb?: WsCallback): void;
    /**
     * 处理新的请求
     */
    set onconnection(cb: (client: WebSocketServerConnection) => void);
    /**
     * 设置服务器关闭回调
     */
    set onclose(cb: WsCallback);
    /**
     * 获取所有的连接对象
     */
    get connections(): WebSocketServerConnection[];
}

/**
 * 服务器中客户端的连接对象
 */
class WebSocketServerConnection {
    /**
     * 关闭连接
     */
    close(code?: number, reason?: string): void;
    /**
     * 发送数据
     */
    send(data: string|ArrayBuffer, cb?: WsCallback): void;

    set ontext(cb: (data: string) => void);
    set onbinary(cb: (data: ArrayBuffer) => void);
    set onmessage(cb: (data: string|ArrayBuffer) => void);
    set onconnect(cb: () => void;);
    set onclose(cb: WsCallback);
    set onerror(cb: WsCallback);

    get readyState(): number;
}

interface WsCallback {
    (err?: string): void;
} 
```

> **注意**: `ondata` 回调已经在 v3.7.0 版本废弃, 请使用 `onmessage` 代替.

## 参考链接

接口设计参考了 [nodejs-websocket](https://www.npmjs.com/package/nodejs-websocket#server)。
