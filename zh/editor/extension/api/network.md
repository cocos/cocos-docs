# Network

Creator 网络工具函数

## 函数

### get

▸ **get**(url: `string`, data?: `Object`): Promise<`Buffer`\>

Get 方式请求某个服务器数据

**请求参数**

| Name    | Type     | Description          |
| :------ | :------- | -------------------- |
| `url`   | `string` | 请求的 url |
| `data?` | `Object` | 请求时带上的数据 |

**返回结果**

Promise<`Buffer`\>

```typescript
network.get(RUNTIME_REQUEST_URL).then((ret: any) => {
    ret = ret.toString();
}).catch((e: any) => {
    console.error('error', e);
});
```

### post

▸ **post**(url: `string`, data?: `Object`): Promise<`Buffer`\>

Post 方式请求某个服务器数据

**请求参数**

| Name    | Type     | Description          |
| :------ | :------- | -------------------- |
| `url`   | `string` | 请求的 url |
| `data?` | `Object` | 请求时带上的数据 |

**返回结果**

Promise<`Buffer`\>

```typescript
let res: Buffer = await Editor.Network.post('https://creator-api.cocos.com/api/session/token', {
    ip: '127.0.0.1',
    client_type: 1
});
```

### portIsOccupied

▸ **portIsOccupied**(port: `number`): Promise<`boolean`\>

检查一个端口是否被占用

**请求参数**

| Name   | Type     | Description |
| :----- | :------- | ----------- |
| `port` | `number` | 端口号 |

**返回结果**

Promise<`boolean`\>

```typescript
const isOccupied = await Editor.Network.portIsOccupied(8000);  // false
```

### queryIPList

▸ **queryIPList**(): `string[]`

查询当前电脑的 ip 列表

**返回结果**

`string[]`

```typescript
const ipList = Editor.Network.queryIPList();  // ["127.0.0.1", "192.168.52.154"]
```

### testConnectServer

▸ **testConnectServer**(): Promise<`boolean`\>

测试是否可以联通 passport.cocos.com 服务器

**返回结果**

Promise<`boolean`\>

```typescript
const res = await Editor.Network.testConnectServer();
```

### testHost

▸ **testHost**(ip: `string`): Promise<`boolean`\>

测试是否可以联通某一台主机

**请求参数**

| Name | Type     | Description |
| :--- | :------- | ----------- |
| `ip` | `string` | ip 地址 |

**返回结果**

Promise<`boolean`\>

```typescript
const res = await Editor.Network.testHost('192.168.0.0');
```
