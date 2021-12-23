# User

用户

## 函数

```typescript
interface UserData {
    session_id: string;
    session_key: string;
    cocos_uid: string;
    email: string;
    nickname: string;
}
```

### getData

▸ **getData**(): `Promise`<[`UserData`](../interfaces/Editor.User.UserData.md)\>

获取 user 数据

**返回结果**

`Promise`<[`UserData`](../interfaces/Editor.User.UserData.md)\>

```typescript
const userData = await Editor.User.getData();
```

### getSessionCode

▸ **getSessionCode**(`extensionId: number`): `Promise`<`string`\>

根据插件 id 返回 session code

**请求参数**

| Name          | Type     | Description |
| :------------ | :------- | ----------- |
| `extensionId` | `number` | 插件 id     |

**返回结果**

`Promise`<`string`\>

```typescript
const sessionCode = await Editor.User.getSessionCode('1027'); // {session_code: "73163bc6d45a0ea5e6f4a1dc6e20a904a856f54a"}
```

### getUserToken

▸ **getUserToken**(): `Promise`<`string`\>

获取用户 token
失败会抛出异常

**返回结果**

`Promise`<`string`\>

```typescript
const token = await Editor.User.getUserToken(); // { access_token: '', cocos_uid: 111, expires_in: 222}
```

### hideMask

▸ **hideMask**(): `void`

隐藏用户登陆遮罩层
谨慎使用，之后会被移除

**返回结果**

`void`

```typescript
Editor.User.hideMask();
```

### isLoggedIn

▸ **isLoggedIn**(): `Promise`<`boolean`\>

检查用户是否登陆

**返回结果**

`Promise`<`boolean`\>

```typescript
const isLogIn = await Editor.User.isLoggedIn();
```

### login

▸ **login**(`username: string`, `password: string`): `Promise`<[`UserData`](../interfaces/Editor.User.UserData.md)\>

用户登陆
失败会抛出异常

**请求参数**

| Name       | Type     | Description |
| :--------- | :------- | ----------- |
| `username` | `string` |             |
| `password` | `string` |             |

**返回结果**

`Promise`<[`UserData`](../interfaces/Editor.User.UserData.md)\>

```typescript
await Editor.User.login('youUserName@cocos.com', 'yourPassword');
```

### logout

▸ **logout**(): `void`

退出登陆
失败会抛出异常

**返回结果**

`void`

```typescript
Editor.User.logout();
```

### on

▸ **on**(`action: string`, `handle: Function`): `any`

监听事件
谨慎使用，之后会被移除

**请求参数**

| Name     | Type       | Description |
| :------- | :--------- | ----------- |
| `action` | `string`   |             |
| `handle` | `Function` |             |

**返回结果**

`any`

### once

▸ **once**(`action: string`, `handle: Function`): `any`

监听一次事件
谨慎使用，之后会被移除

**请求参数**

| Name     | Type       | Description |
| :------- | :--------- | ----------- |
| `action` | `string`   |             |
| `handle` | `Function` |             |

**返回结果**

`any`

### removeListener

▸ **removeListener**(`action: string`, `handle: Function`): `any`

取消已经监听的事件
谨慎使用，之后会被移除

**请求参数**

| Name     | Type       | Description |
| :------- | :--------- | ----------- |
| `action` | `string`   |             |
| `handle` | `Function` |             |

**返回结果**

`any`

### showMask

▸ **showMask**(): `void`

显示用户登陆遮罩层
谨慎使用，之后会被移除

**返回结果**

`void`

```typescript
Editor.User.showMask();
```

### skip

▸ **skip**(): `any`

跳过 User
谨慎使用，之后会被移除

**返回结果**

`any`

```typescript
Editor.User.skip();
```
