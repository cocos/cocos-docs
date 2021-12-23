# Logger

日志

## 函数

### clear

▸ **clear**(): `any`

清空所有的日志

**返回结果**

`any`

```typescript
Editor.Logger.clear();
```

### on

▸ **on**(`action: string`, `handle: Function`): `any`

监听 Logger 内发送的事件
**谨慎使用，之后会被移除**

**请求参数**

| Name     | Type       | Description |
| :------- | :--------- | :---------- |
| `action` | `string`   | 监听动作    |
| `handle` | `Function` | 处理函数    |

**返回结果**

`any`

```typescript
Editor.Logger.on('record', () => {});
```

### once

▸ **once**(`action: string`, `handle: Function`): `any`

监听 Logger 内发送的事件
**谨慎使用，之后会被移除**

**请求参数**

| Name     | Type       | Description |
| :------- | :--------- | :---------- |
| `action` | `string`   | 监听动作    |
| `handle` | `Function` | 处理函数    |

**返回结果**

`any`

```typescript
Editor.Logger.once('clear', () => {});
```

### query

▸ **query**(): `any`

查询所有日志

**返回结果**

`any`

```typescript
const list = await Editor.Logger.query();
```

### removeListener

▸ **removeListener**(`action: string`, `handle: Function`): `any`

移除监听的事件
**谨慎使用，之后会被移除**

**请求参数**

| Name     | Type       | Description |
| :------- | :--------- | :---------- |
| `action` | `string`   | 监听动作    |
| `handle` | `Function` | 处理函数    |

**返回结果**

`any`

```typescript
Editor.Logger.removeListener('record', () => {});
```
