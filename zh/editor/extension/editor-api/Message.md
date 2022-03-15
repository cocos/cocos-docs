# Message

消息

## 接口说明

```typescript
export interface MessageInfo {
    methods: string[];
    public?: boolean;
    description?: string;
    doc?: string;
    sync?: boolean;
}

export interface TableBase {
    [x: string]: any;
    params: any[];
}

export interface EditorMessageContent {
    params: any[],
    result: any;
}

export interface EditorMessageMap {
    [x: string]: EditorMessageContent;
}

export interface EditorMessageMaps {
    [x: string]: EditorMessageMap;
    'asset-db': AssetDB.message;
    'scene': Scene.message;
    'engine': Engine.message;
    'builder': Builder.message;
    'programming': Programming.message,
}
```

## 函数

### addBroadcastListener

▸ **addBroadcastListener**(message: `string`, func: `Function`): `any`

新增一个广播消息监听器
不监听的时候，需要主动取消监听

**请求参数**

| Name      | Type       | Description |
| :-------- | :--------- | :---------- |
| `message` | `string`   | 消息名      |
| `func`    | `Function` | 处理函数    |

```typescript
Editor.Message.addBroadcastListener('console:logsUpdate', () => {});
```

### broadcast

▸ **broadcast**(message: `string`, ...args: `any[]`): `void`

广播一个消息

**请求参数**

| Name      | Type     | Description    |
| :-------- | :------- | :------------- |
| `message` | `string` | 消息的名字     |
| `...args` | `any[]`  | 消息附加的参数 |

```typescript
Editor.Message.broadcast('console:update-log-level', []);
```

### removeBroadcastListener

▸ **removeBroadcastListener**(message: `string`, func: `Function`): `any`

新增一个广播消息监听器

**请求参数**

| Name      | Type       | Description |
| :-------- | :--------- | :---------- |
| `message` | `string`   | 消息名      |
| `func`    | `Function` | 处理函数    |

```typescript
Editor.Message.removeBroadcastListener('console:logsUpdate', () => {});
```

### request

▸ **request**<`J` extends `string`, `K` extends keyof `EditorMessageMaps`[`J`]>(name: `J`, message: `K`, ...args: `EditorMessageMaps`[`J`][`K`]['params']): Promise<`EditorMessageMaps`[`J`][`K`]['result']>

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
| `...args` | `EditorMessageMaps`[`J`][`K`]['params']         | 消息需要的参数 |

**返回结果**

Promise<`EditorMessageMaps`[`J`][`K`]['result']>

```typescript
const url = await Editor.Message.request('asset-db', 'generate-available-url', arg);
```

### send

▸ **send**<`M` extends `string`, `N` extends keyof `EditorMessageMaps`[`M`]>(name: `M`, message: `N`, ...args: `EditorMessageMaps`[`M`][`N`]['params']): `void`

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
| `...args` | `EditorMessageMaps`[`M`][`N`]['params']           | 消息需要的参数 |

**返回结果**

`void`

```typescript
Editor.Message.send('assets', 'twinkle', uuid);
```
