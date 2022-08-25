# WebSocket Server

Developers can launch a WebSocket Server during the game and provide an **RPC interface**. By improving and calling these **RPC interfaces**, developers can monitor the internal state of the game process and increase the ability to manage the game process state.

## How To Enable

The **WebSocket Server** is disabled by default. To enable it, need to check the editor's main menu **Project -> Project Settings -> Feature Cropping** , and enable the **WebSocket Server** configuration setting.

## How to use WebSocket

Refer to the example code below:

```ts
// In the native platform's Release mode or in Web / WeChat Mini Games and other platforms, WebSocketServer may not be defined.
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

The interface is defined as follows

```typescript
/**
 * Server object
 */
class WebSocketServer {
    /**
     * Close the server
     */
    close(cb?: WsCallback): void;
    /**
     * Listen and launch the service
     */
    listen(port: number, cb?: WsCallback): void;
    /**
     * Handle new requests
     */
    set onconnection(cb: (client: WebSocketServerConnection) => void);
    /**
     * Set up the server shutdown callback
     */
    set onclose(cb: WsCallback);
    /**
     * Gets all the connection objects
     */
    get connections(): WebSocketServerConnection[];
}

/**
 * The client connection object in the server
 */
class WebSocketServerConnection {
    /**
     * Close the connection
     */
    close(code?: number, reason?: string): void;
    /**
     * Send the data
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

> **Note**: After v3.7.0, `ondata` callback has been deprecated, please use `onmessage` to instead. 

## Reference links

The interface design refers to the [nodejs-websocket](https://www.npmjs.com/package/nodejs-websocket#server) server.
