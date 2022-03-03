
# 热重载案例一：服务器

假设你正在实现一个服务器，它向用户提供多个功能：登录、打印，并且希望这些功能的逻辑都可以被更新，而不需要重启服务器。

那么接下来，我们通过一个简单的例子阐述对这一目标的实现。

实现服务器本身逻辑的模块 `server.ts`：

```ts
import { LoginService } from './login-service';
import { PrintService } from './print-service';

class Server {
    public login(username: string, password: string): boolean {
        return this._loginService.login(username);
    }

    public print(text: string) {
        this._printService.print(text);
    }

    private _loginService = new LoginService();

    private _printService = new PrintService();
}

const globalServer = new Server();

export { globalServer };
```

实现登录服务的模块 `login-service.ts`：

```ts
const users = { 'foo': 'bar' };

export class LoginService {
    public login(username: string, password: string) {
        return username in users && users[username] === password;
    }
}
```

实现打印服务的模块 `print-service.ts`：

```ts
export class PrintService {
    public print(text: string) {
        console.log(text);
    }
}
```

最后，我们添加一个使用该服务器的入口模块 `app.ts`：


```ts
import { globalServer } from './server.ts';

function login(username: string, password: string) {
    globalServer.login(username, password);
}

function print(text: string) {
    globalServer.print(text);
}
```

我们希望能达到的效果是：

- 模块 `login-service.ts`、`print-service.ts` 允许被热更新；

- 我们确实用上了更新之后的功能——从 `server.ts` 导出的 `globalServer` 对象已经调用了新的功能。

## 默认行为

然而目前为止，热重载系统都会拒绝对任何一个模块的热更新。因为它不知道这些模块是否能够处理自身或其依赖更新的情况。

## 自我接受

接下来我们要告诉热重载系统：如果 `login-service.ts`、`print-service.ts` 重载了，那 `server.ts` 也需要重载，但是不要再将这次重载蔓延到其它模块了。

这通过向 `server.ts` 添加一个语句来实现：

```ts
// server.ts 的原本代码

import.meta.ccHot?.accept(); // 添加这一句
```

现在我们来看一下，当 `login-service.ts` 被重载时会发生什么：

- `login-service.ts` 被重载执行。

- `server.ts` 依赖它，因此 `server.ts` 也被重载执行。

  这里注意，`server.ts` 导入的是新的 `login-service.ts` 模块中新的 `LoginService` 类。并且因为它执行了，它也会创建全新的 `globalServer` 对象并导出。

- 热重载系统发现 `server.ts` 声明它自己可以接受重载。重载不会再被蔓延了。

尽管重载不会蔓延，**但所有从 `server.ts` 导入的绑定都会更新**。换句话说，虽然 `app.ts` 并没有重新执行，但是当 `app.ts` 中的 `login` 函数被调用时，它会去使用新的 `globalServer` 对象。

## 接受依赖

上面的案例确实已经实现了我们的需求。但是，现实中的服务器往往具有昂贵的创建代价——客户端到它的连接会被重置。那我们是否能实现在不重启服务器（在我们的示例中，也就是不重新创建 `globalServer` 对象）的情况下，更新登录功能呢？

首先我们试着模仿上一节中的做法，将 `login-service.ts` 设为自我接受，看下会发生什么：

- `login-service.ts` 被重载执行。

- 热重载系统发现 `login-service.ts` 声明它自己可以接受重载。重载不会再被蔓延了。

是的，`server.ts` 不会被重载执行。这就是意味着 `globalServer` 对象中使用的依然是旧版本的 `LoginService` 类。

此法行不通。

看来我们在 `server.ts` 更新后，需要“更新” `globalServer` 对象。可以这样做：

```ts
// server.ts 原本的代码
// ...

// 将
// const globalServer = new Server();
// 修改为：
let globalServer = new Server();

import.meta.ccHot?.accept('./login-service', () => { // #1
    // 重新创建 globalServer 对象
    globalServer = new Server();
});

// server.ts 原本的代码
export { globalServer };
```

`#1` 处的代码告诉热重载系统：当 `login-service.ts` 重载后，执行指定的回调。我们在回调中重新创建了 `globalServer` 对象。因为 ESM 模块的“动态绑定”机制，`app.ts` 中使用的 `globalServer` 就会是我们新创建的对象。

实现完成。不过我们虽然没有重新执行 `server.ts`，但还是重新创建了服务器对象。这没有达到我们的意图。现在换种想法：我们试着只创建 `globalServer` 一次，如果 `login-server.ts` 有更新，我们只重新创建 `globalServer` 中引用的 `LoginService` 对象：

```ts
// 回退上一节的更改，使用 server.ts 原本的代码
// 但向 Server 类添加一个方法，它重新创建登录服务对象：
// public updateLoginService() {
//     // 注意此时 `LoginService` 已经是新版本的类
//     this._loginService = new LoginService();
// }

import.meta.ccHot?.accept('./login-service', () => {
    globalServer.updateLoginService();
});
```
