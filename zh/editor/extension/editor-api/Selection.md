# Selection

选择

## 函数

### clear

▸ **clear**(`type: string`): `any`

清空一个类型的所有选中元素

**请求参数**

| Name   | Type     | Description |
| :----- | :------- | ----------- |
| `type` | `string` |             |

**返回结果**

`any`

```typescript
Editor.Selection.clear('asset');
```

### getLastSelected

▸ **getLastSelected**(`type: string`): `string`

获取某个类型内，最后选中的元素

**请求参数**

| Name   | Type     | Description |
| :----- | :------- | ----------- |
| `type` | `string` |             |

**返回结果**

`string`

```typescript
const elem = Editor.Selection.getLastSelected('asset');
```

### getLastSelectedType

▸ **getLastSelectedType**(): `string`

获取最后选中的元素的类型

**返回结果**

`string`

```typescript
const type = Editor.Selection.getLastSelectedType();
```

### getSelected

▸ **getSelected**(`type: string`): `string`[]

获取一个类型选中的所有元素数组

**请求参数**

| Name   | Type     | Description |
| :----- | :------- | ----------- |
| `type` | `string` |             |

**返回结果**

`string`[]

```typescript
const uuids = Editor.Selection.getSelected('asset');
```

### hover

▸ **hover**(`type: string`, `uuid?: string`): `any`

悬停触碰了某个元素
会发出 selection:hover 的广播消息

**请求参数**

| Name    | Type     | Description |
| :------ | :------- | ----------- |
| `type`  | `string` |             |
| `uuid?` | `string` |             |

**返回结果**

`any`

```typescript
Editor.Selection.hover('asset', '7bf9df40-4bc9-4e25-8cb0-9a500f949102');
```

### select

▸ **select**(`type: string`, `uuid:`string` | `string`[]`): `any`

选中一个或者一组元素

**请求参数**

| Name   | Type                   | Description |
| :----- | :--------------------- | ----------- |
| `type` | `string`               |             |
| `uuid` | `string` \| `string`[] |             |

**返回结果**

`any`

```typescript
Editor.Selection.select('asset', '7bf9df40-4bc9-4e25-8cb0-9a500f949102');
```

### unselect

▸ **unselect**(`type: string`, `uuid:`string` | `string`[]`): `any`

取消一个或者一组元素的选中状态

**请求参数**

| Name   | Type                   | Description |
| :----- | :--------------------- | ----------- |
| `type` | `string`               |             |
| `uuid` | `string` \| `string`[] |             |

**返回结果**

`any`

```typescript
Editor.Selection.unselect('asset', '7bf9df40-4bc9-4e25-8cb0-9a500f949102');
```

### update

▸ **update**(`type: string`, `uuids: string[]`): `any`

更新当前选中的类型数据

**请求参数**

| Name    | Type       | Description |
| :------ | :--------- | ----------- |
| `type`  | `string`   |             |
| `uuids` | `string`[] |             |

**返回结果**

`any`

```typescript
Editor.Selection.update('asset', '7bf9df40-4bc9-4e25-8cb0-9a500f949102');
```
