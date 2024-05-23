# WebSocket 简介

通常在开发网络应用或者游戏时，出于数据安全或其他目标，需要将用户的数据存放在网络后端服务端中，而浏览器一般来说只支持 HTTP 协议。

HTTP（HyperText Transfer Protocol）协议[^1]是基于 TCP 协议的应用层传输协议，使用方法是通过客户端（网页浏览器或通过 [API](http.md)）向服务端请求数据，服务端将数据存储在 HTTP 协议的响应内，返回给客户端。

![http](web-socket/http.png)

在 HTTP 协议初期（1.1 之前的版本中）一个请求对应一次网络连接，也就是说每次发起 HTTP 请求时，客户端和服务端都需要重新建立 TCP 连接，这无疑是对资源的浪费。而在 HTTP/1.1 之后，可以通过 keep-alive 将 HTTP 协议进行合并，从而将多个请求（Request）和响应（Respnose）进行合并。但此时的 HTTP 协议仍然是一个请求对应一个响应。

通常情况下，这样的通信方式是足够的，可以满足服务端被动接受客户端请求返回数据。而在特定的情况下，如服务端需将数据推送给客户端时，就需要客户端进行轮询请求，即客户端通过定时或者其他循环的方式不断的向服务端请求数据。由于 HTTP 协议本身携带有较大的 HTTP 头以及不断的轮询行为会造成客户端、服务端资源以及带宽的浪费。

为了解决这个问题，浏览器标准标准委员会于 2008 年制定了 WebSocket 协议，在 2011 年时，WebSocket 成为浏览器标准，这也意味着所有的浏览器都支持 WebSocket。

HTTP/1.1 协议可以通过升级将连接升级为 Websocket 协议[^2]，完成后客户端和服务端都可向对方主动推送需要的数据。这样就解决了客户端与服务端的实时交互的问题。

![web-socket](web-socket/web-socket.png)

WebSocket 传输时可以选择使用二进制（Binary）或 字符串（String）以此来提高私有协议的特定制性和安全性。

在 Cocos Creator 内如果要使用 Websock 可以参考 [使用 WebSocket 服务端](websocket-server.md)以及 [WebSocket 客户端](websocket.md)。

[^1]: [The WebSocket Protocol](https://www.rfc-editor.org/rfc/rfc6455)
[^2]: [HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP)
