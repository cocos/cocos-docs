# 存储和读取用户数据

我们在游戏中通常需要存储用户数据，如音乐开关、显示语言等，如果是单机游戏还需要存储玩家存档。Cocos Creator 中我们使用 `localStorage` 接口来进行用户数据存储和读取的操作。

`localStorage` 接口是按照 [Web Storage API](http://devdocs.io/dom/storage) 来实现的，在 Web 平台运行时会直接调用 Web Storage API，在原生平台上会调用 sqlite 的方法来存储数据。一般用户不需要关心内部的实现。

配合本篇文档可以参考 **数据存储范例**（[GitHub](https://github.com/cocos-creator/tutorial-storage) | [Gitee](https://gitee.com/mirrors_cocos-creator/tutorial-storage)）。

## 存储数据

`sys.localStorage.setItem(key, value)`

上面的方法需要两个参数，用来索引的字符串键值 `key`，和要保存的字符串数据 `value`。

假如我们要保存玩家持有的金钱数，假设键值为 `gold`：

`sys.localStorage.setItem('gold', 100);`

对于复杂的对象数据，我们可以通过将对象序列化为 JSON 后保存：

```js
userData = {
    name: 'Tracer',
    level: 1,
    gold: 100
};

sys.localStorage.setItem('userData', JSON.stringify(userData));
```

## 读取数据

`sys.localStorage.getItem(key)`

和 `setItem` 相对应，`getItem` 方法只要一个键值参数就可以取出我们之前保存的值了。对于上文中储存的用户数据：

```js
var userData = JSON.parse(sys.localStorage.getItem('userData'));
```

**存储数据** 和 **读取数据** 的完整示例代码参考如下：

```ts
import { _decorator, Component, sys } from 'cc';
const { ccclass, property } = _decorator;

const coinKey: string = 'gold'
const userDataKey = 'userData';

interface UserData{
    name:string
    level:number
    gold:number
}

@ccclass('LocalStorageExample')
export class LocalStorageExample extends Component {
    start() {
        this.saveCoin(100);
        this.loadCoin();
        this.saveUserData();
        this.loadUserData();
    }
    
    saveCoin(value: number) {
        sys.localStorage.setItem(coinKey, value.toString());
    }
    loadCoin() {
        const value = sys.localStorage.getItem(coinKey);
        if (value) {
            console.log(`${coinKey} = ${value}`)
        } else {
            console.log(`${coinKey} is not exist`);
        }
    }

    saveUserData(){        
        const userData = { name:"Tracer", level:1, gold:100}
        const jsonStr = JSON.stringify(userData);
        sys.localStorage.setItem(userDataKey,jsonStr);
    }

    loadUserData(){
        const jsonStr = sys.localStorage.getItem(userDataKey);
        const userData = JSON.parse(jsonStr) as UserData;;
        console.log(userData);
    }
}
```

## 移除键值对

当我们不再需要一个存储条目时，可以通过下面的接口将其移除：

`sys.localStorage.removeItem(key)`

## 清空数据

当我们不再需要已存储的用户数据时，可以通过下面的接口将其清空：

`sys.localStorage.clear()`

## 数据加密

对于单机游戏来说，对玩家存档进行加密可以延缓游戏被破解的时间。要加密存储数据，只要在将数据通过 `JSON.stringify` 转化为字符串后调用你选中的加密算法进行处理，再将加密结果传入 `setItem` 接口即可。

您可以搜索并选择一个适用的加密算法和第三方库，比如 [encryptjs](https://www.npmjs.com/package/encryptjs)，将下载好的库文件放入你的项目。

存储时：

```typescript
import encrypt from 'encryptjs';
var secretkey = 'open_sesame'; // 加密密钥
var dataString = JSON.stringify(userData);
var encrypted = encrypt.encrypt(dataString,secretkey,256);

sys.localStorage.setItem('userData', encrypted);
```

读取时：

```typescript
var cipherText = sys.localStorage.getItem('userData');
var userData=JSON.parse(encrypt.decrypt(cipherText,secretkey,256));
```

> **注意**：数据加密不能保证对用户档案的完全掌控，如果您需要确保游戏存档不被破解，请使用服务器进行数据存取。
