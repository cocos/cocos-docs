# Startup

启动

## 变量

### ready

• **ready**: `Object`

**类型参数**

| Name      | Type  | Description |
| :-------- | :---- | ----------- |
| `package` | `any` |             |
| `window`  | `any` |             |

```typescript
const isReady = Editor.Startup.ready; // { package: true, window: true }
```

## 函数

### build

▸ **build**(`options: any`, `debug: boolean`): `Promise`<`any`\>

**请求参数**

| Name      | Type      | Description |
| :-------- | :-------- | ----------- |
| `options` | `any`     |             |
| `debug`   | `boolean` |             |

**返回结果**

`Promise`<`any`\>



### manager

▸ **manager**(`skipLogin: boolean`): `Promise`<`void`\>

**请求参数**

| Name        | Type      | Description |
| :---------- | :-------- | ----------- |
| `skipLogin` | `boolean` |             |

**返回结果**

`Promise`<`void`\>



### on

▸ **on**(`action: string`, `handle: Function`): `any`

**请求参数**

| Name     | Type       | Description |
| :------- | :--------- | ----------- |
| `action` | `string`   |             |
| `handle` | `Function` |             |

**返回结果**

`any`



### once

▸ **once**(`action: string`, `handle: Function`): `any`

**请求参数**

| Name     | Type       | Description |
| :------- | :--------- | ----------- |
| `action` | `string`   |             |
| `handle` | `Function` |             |

**返回结果**

`any`



### package

▸ **package**(): `Promise`<`void`\>

**返回结果**

`Promise`<`void`\>



### removeListener

▸ **removeListener**(`action: string`, `handle: Function`): `any`

**请求参数**

| Name     | Type       | Description |
| :------- | :--------- | ----------- |
| `action` | `string`   |             |
| `handle` | `Function` |             |

**返回结果**

`any`



### window

▸ **window**(): `Promise`<`void`\>

**返回结果**

`Promise`<`void`\>


