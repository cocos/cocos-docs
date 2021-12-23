# Network

网络

## 函数

### get

▸ **get**(`url: string`, `data?`: Object): `Promise`<`Buffer`\>

Get 方式请求某个服务器数据

**请求参数**

| Name    | Type     | Description |
| :------ | :------- | ----------- |
| `url`   | `string` |             |
| `data?` | `Object` |             |

**返回结果**

`Promise`<`Buffer`\>

```typescript
network.get(RUNTIME_REQUEST_URL).then((ret: any) => {
    ret = ret.toString();
}).catch((e: any) => {
    console.error('error', e);
});
```

### portIsOccupied

▸ **portIsOccupied**(`port: number`): `Promise`<`boolean`\>

检查一个端口是否被占用

**请求参数**

| Name   | Type     | Description |
| :----- | :------- | ----------- |
| `port` | `number` |             |

**返回结果**

`Promise`<`boolean`\>

```typescript
const isOccupied = await Editor.Network.portIsOccupied(8000);
```

### post

▸ **post**(`url: string`, `data?: Object`): `Promise`<`Buffer`\>

Post 方式请求某个服务器数据

**请求参数**

| Name    | Type     | Description |
| :------ | :------- | ----------- |
| `url`   | `string` |             |
| `data?` | `Object` |             |

**返回结果**

`Promise`<`Buffer`\>

```typescript
let res: Buffer = await Editor.Network.post('https://creator-api.cocos.com/api/session/token', {
    ip: '127.0.0.1',
    client_type: 1
});
```

### queryIPList

▸ **queryIPList**(): `string`[]

查询当前电脑的 ip 列表

**返回结果**

`string`[]

```typescript
const ipList = Editor.Network.queryIPList();
```

### testConnectServer

▸ **testConnectServer**(): `Promise`<`boolean`\>

测试是否可以联通 passport.cocos.com 服务器

**返回结果**

`Promise`<`boolean`\>

```typescript
const res = await Editor.Network.testConnectServer();
```

### testHost

▸ **testHost**(`ip: string`): `Promise`<`boolean`\>

测试是否可以联通某一台主机

**请求参数**

| Name | Type     | Description |
| :--- | :------- | ----------- |
| `ip` | `string` |             |

**返回结果**

`Promise`<`boolean`\>

```typescript
const res = await Editor.Network.testHost('192.168.0.0');
```
