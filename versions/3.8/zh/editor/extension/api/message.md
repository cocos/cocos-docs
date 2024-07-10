# Message

Creator 消息系统，消息在 Creator 非常重要，几乎所有的操作和数据传递都是通过消息进行的。

具体扩展支持调用的消息可以在菜单栏 [`开发者->消息列表`](./messages.md#查看消息列表) 查看。

## 函数

### send

▸ **send**(name: `string`, message: `string`, ...args: `any[]`): `void`

发送一个消息，没有返回

**请求参数**

| Name      | Type              | Description    |
| :-------- | :---------------- | :------------- |
| `name`    | `string`          | 目标扩展的名字  |
| `message` | `string`          | 触发消息的名字  |
| `...args` | `any[]`           | 消息需要的参数  |

```typescript
Editor.Message.send('builder', 'open-devtools');
```

### request

▸ **request**(name: `string`, message: `string`, ...args: `any[]`): Promise<`any`>

发送一个消息，并等待返回

**请求参数**

| Name      | Type                | Description    |
| :-------- | :------------------ | :------------- |
| `name`    | `string`            | 目标扩展的名字  |
| `message` | `string`            | 触发消息的名字  |
| `...args` | `any[]`               | 消息需要的参数  |

**返回结果**

Promise<`any`>

```typescript
const sceneDirty = await Editor.Message.request('scene', 'query-dirty');  // false
```

### broadcast

▸ **broadcast**(message: `string`, ...args: `any[]`): `void`

广播一个消息

我们约定每个扩展自己发出的广播消息，将以 `[扩展名]:xxx` 的形式命名，希望后续其他各个扩展也可以遵守这样的规范

**请求参数**

| Name      | Type     | Description    |
| :-------- | :------- | :------------- |
| `message` | `string` | 消息的名字     |
| `...args` | `any[]`  | 消息附加的参数 |

```typescript
Editor.Message.broadcast('console:update-log-level', []);
```

### addBroadcastListener（废弃）

▸ **addBroadcastListener**(message: `string`, func: `Function`): `any`

**废弃警告，请通过扩展监听广播消息**
新增一个广播消息监听器，不监听的时候，需要主动取消监听

**请求参数**

| Name      | Type       | Description |
| :-------- | :--------- | :---------- |
| `message` | `string`   | 消息名      |
| `func`    | `Function` | 处理函数    |

```typescript
Editor.Message.addBroadcastListener('console:logsUpdate', () => {});
```

### removeBroadcastListener（废弃）

▸ **removeBroadcastListener**(message: `string`, func: `Function`): `any`

**废弃警告，请通过扩展监听广播消息**
新增一个广播消息监听器

**请求参数**

| Name      | Type       | Description |
| :-------- | :--------- | :---------- |
| `message` | `string`   | 消息名      |
| `func`    | `Function` | 处理函数    |

```typescript
Editor.Message.removeBroadcastListener('console:logsUpdate', () => {});
```
