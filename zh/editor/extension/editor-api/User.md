# User

用户

## 接口说明

```typescript
interface UserData {
    session_id: string;
    session_key: string;
    cocos_uid: string;
    email: string;
    nickname: string;
}
```

## 函数

### getData

▸ **getData**(): Promise<`UserData`\>

获取 user 数据

**返回结果**

Promise<`UserData`\>

```typescript
const userData = await Editor.User.getData();
```

### getSessionCode

▸ **getSessionCode**(extensionId: `number`): Promise<`string`\>

根据插件 id 返回 session code

**请求参数**

| Name          | Type     | Description |
| :------------ | :------- | ----------- |
| `extensionId` | `number` | 插件 id     |

**返回结果**

Promise<`string`\>

```typescript
const sessionCode = await Editor.User.getSessionCode('1027'); // {session_code: "73163bc6d45a0ea5e6f4a1dc6e20a904a856f54a"}
```

### getUserToken

▸ **getUserToken**(): Promise<`string`\>

获取用户 token
失败会抛出异常

**返回结果**

Promise<`string`\>

```typescript
const token = await Editor.User.getUserToken(); // { access_token: '', cocos_uid: 111, expires_in: 222}
```

<!-- ### hideMask

▸ **hideMask**(): `void`

隐藏用户登陆遮罩层
谨慎使用，之后会被移除

```typescript
Editor.User.hideMask();
``` -->

### isLoggedIn

▸ **isLoggedIn**(): Promise<`boolean`\>

检查用户是否登陆

**返回结果**

Promise<`boolean`\>

```typescript
const isLogIn = await Editor.User.isLoggedIn();
```

### login

▸ **login**(username: `string`, password: `string`): Promise<`UserData`\>

用户登陆
失败会抛出异常

**请求参数**

| Name       | Type     | Description |
| :--------- | :------- | ----------- |
| `username` | `string` | 用户名       |
| `password` | `string` | 用户密码     |

**返回结果**

Promise<`UserData`\>

```typescript
await Editor.User.login('youUserName@cocos.com', 'yourPassword');
```

### logout

▸ **logout**(): `void`

退出登陆
失败会抛出异常

```typescript
Editor.User.logout();
```
