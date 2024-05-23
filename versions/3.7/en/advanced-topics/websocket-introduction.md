# WebSocket Introduction

Often when developing web applications or games, for data security or other goals, user data needs to be stored in a web back-end server, and browsers generally only support the HTTP protocol.

The HTTP (HyperText Transfer Protocol) protocol [^1] is an application layer transport protocol based on the TCP protocol and is used by requesting data from the client (web browser or via [API](http.md)) to the server, which stores the data in the HTTP protocol response and returns it to the client.

![http](web-socket/http.png)

In the early days of the HTTP protocol (before 1.1), one request corresponded to one network connection, which meant that each time an HTTP request was made, the client and server had to re-establish a TCP connection, which was a waste of resources. After HTTP/1.1, the HTTP protocol can be merged by keep-alive, so that multiple requests (Request) and responses (Respnose) can be merged. However, the HTTP protocol at this time is still one request for one response.

Usually, such communication is sufficient for the server to passively accept the return data from the client's request. In specific cases, such as when the server needs to push data to the client, the client needs to poll the request, i.e., the client keeps requesting data from the server through timing or other loops. The HTTP protocol itself carries a large HTTP header and the constant polling behavior can cause waste of resources and bandwidth on the client and server side.

To solve this problem, the W3C Advisory Committee developed the WebSocket protocol in 2008, and in 2011, WebSocket became the browser standard, which means that all browsers support WebSocket.

The HTTP/1.1 protocol can be upgraded to the Websocket protocol by upgrading the connection [^2], after which both the client and the server can actively push the required data to each other. This solves the problem of real-time client-server interaction.

![web-socket](web-socket/web-socket.png)

WebSocket transfers can optionally use Binary or String to increase the specificity and security of the private protocol.

To use Websock within Cocos Creator, see [Using WebSocket Server](websocket-server.md) and [WebSocket Client](websocket.md).

[^1]: [The WebSocket Protocol](https://www.rfc-editor.org/rfc/rfc6455)
[^2]: [HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP)
