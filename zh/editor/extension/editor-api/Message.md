# Message

消息

## 函数

### _\_register\_\_

▸ **__register__**(`name: string`, `messageInfo: Object`): `any`

请勿使用
马上会被删除

**请求参数**

| Name          | Type     | Description     |
| :------------ | :------- | --------------- |
| `name`        | `string` | 消息的名称       |
| `messageInfo` | `Object` | 消息的内容       |

**返回结果**

`any`



### \_\_unregister\_\_

▸ **__unregister__**(`name: string`): `any`

请勿使用
马上会被删除

**请求参数**

| Name   | Type     | Description     |
| :----- | :------- | --------------- |
| `name` | `string` | 消息的名称       |

**返回结果**

`any`



### addBroadcastListener

▸ **addBroadcastListener**(`message: string`, `func: Function`): `any`

新增一个广播消息监听器
不监听的时候，需要主动取消监听

**请求参数**

| Name      | Type       | Description |
| :-------- | :--------- | :---------- |
| `message` | `string`   | 消息名      |
| `func`    | `Function` | 处理函数    |

**返回结果**

`any`

```typescript
Editor.Message.addBroadcastListener('console:logsUpdate', () => {});
```

### broadcast

▸ **broadcast**(`message: string`, ...`args: any[]`): `void`

广播一个消息

**请求参数**

| Name      | Type     | Description    |
| :-------- | :------- | :------------- |
| `message` | `string` | 消息的名字     |
| `...args` | `any`[]  | 消息附加的参数 |

**返回结果**

`void`

```typescript
Editor.Message.broadcast('console:update-log-level', []);
```

### removeBroadcastListener

▸ **removeBroadcastListener**(`message: string`, `func: Function`): `any`

新增一个广播消息监听器

**请求参数**

| Name      | Type       | Description |
| :-------- | :--------- | :---------- |
| `message` | `string`   | 消息名      |
| `func`    | `Function` | 处理函数    |

**返回结果**

`any`

```typescript
Editor.Message.removeBroadcastListener('console:logsUpdate', () => {});
```

### request

▸ **request**<`J extends string`, `K extends keyof EditorMessageMaps\[J\]`>(`name: J`, `message: K,` `...args: *EditorMessageMaps*\[J\]\[K\]\['params'\]`): `Promise<EditorMessageMaps\[J\]\[K\]\['result'\]>`

发送一个消息，并等待返回

**类型参数**

| Name | Type                                     |
| :--- | :--------------------------------------- |
| `J`  | extends `string`                         |
| `K`  | extends `string` \| `number` \| `symbol` |

**请求参数**

| Name      | Type                                              | Description    |
| :-------- | :------------------------------------------------ | :------------- |
| `name`    | `J`                                               | 目标插件的名字 |
| `message` | `K`                                               | 触发消息的名字 |
| `...args` | `EditorMessageMaps`\[`J`\]\[`K`\]\[``"params"``\] | 消息需要的参数 |

**返回结果**

`Promise`<`EditorMessageMaps`\[`J`\]\[`K`\]\[``"result"``\]\>

```typescript
const url = await Editor.Message.request('asset-db', 'generate-available-url', arg);
```

### send

▸ **send**<`M extends string`, `N extends keyof EditorMessageMaps\[M\]`>(`name: M`, `message: N`, `...args: EditorMessageMaps\[M\]\[N\]\['params'\]`): `void`

发送一个消息，没有返回

**类型参数**

| Name | Type                                     |
| :--- | :--------------------------------------- |
| `M`  | extends `string`                         |
| `N`  | extends `string` \| `number` \| `symbol` |

**请求参数**

| Name      | Type                                              | Description    |
| :-------- | :------------------------------------------------ | :------------- |
| `name`    | `M`                                               | 目标插件的名字 |
| `message` | `N`                                               | 触发消息的名字 |
| `...args` | `EditorMessageMaps`\[`M`\]\[`N`\]\[``"params"``\] | 消息需要的参数 |

**返回结果**

`void`

```typescript
Editor.Message.send('assets', 'twinkle', uuid);
```

## 事件

### \_\_eb\_\_

请勿使用
马上会被删除

• **\_\_eb\_\_**: `EventEmitter`
