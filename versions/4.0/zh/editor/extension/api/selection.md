# Selection

Creator 选择管理器，编辑器内所有的选中物体，都通过这个管理器进行管理

选中物体需要记录 "类型" 和 "ID" 两个属性

## 函数

### clear

▸ **clear**(type: `string`): `any`

清空一个类型的所有选中元素

如果有元素被取消选中，会发送 selection:unselect 广播消息

**请求参数**

| Name   | Type     | Description |
| :----- | :------- | ----------- |
| `type` | `string` | 选中的类型 |

```typescript
Editor.Selection.clear('asset');
```

### hover

▸ **hover**(type: `string`, uuid?: `string`): `any`

悬停触碰了某个元素

会发出 selection:hover 的广播消息

**请求参数**

| Name    | Type     | Description |
| :------ | :------- | ----------- |
| `type`  | `string` | 选中的类型 |
| `uuid?` | `string` | 元素的 uuid |

```typescript
Editor.Selection.hover('asset', '7bf9df40-4bc9-4e25-8cb0-9a500f949102');
```

### select

▸ **select**(type: `string`, uuid:`string` | `string[]`): `any`

选中一个或者一组元素

当没有选中的元素变成选中状态时，会发出 selection:select 的广播消息

**请求参数**

| Name   | Type                   | Description |
| :----- | :--------------------- | ----------- |
| `type` | `string`               | 选中的类型 |
| `uuid` | `string | string[]`  | 元素的 uuid |

```typescript
Editor.Selection.select('asset', '7bf9df40-4bc9-4e25-8cb0-9a500f949102');
```

### unselect

▸ **unselect**(type: `string`, uuid:`string` | `string[]`): `any`

取消一个或者一组元素的选中状态

当元素被取消选中的时候，会发送 selection:unslect 广播消息

**请求参数**

| Name   | Type                   | Description |
| :----- | :--------------------- | ----------- |
| `type` | `string`               | 选中的类型 |
| `uuid` | `string | string[]`  | 元素的 uuid |

```typescript
Editor.Selection.unselect('asset', '7bf9df40-4bc9-4e25-8cb0-9a500f949102');
```

### getSelected

▸ **getSelected**(type: `string`): `string[]`

获取一个类型选中的所有元素数组

**请求参数**

| Name   | Type     | Description |
| :----- | :------- | ----------- |
| `type` | `string` | 选中的类型 |

**返回结果**

`string[]`

```typescript
const uuids = Editor.Selection.getSelected('asset');  // ["b0a4abb1-db32-49c3-9e09-a45b922a2024"]
```

### getLastSelected

▸ **getLastSelected**(type: `string`): `string`

获取某个类型内，最后选中的元素

**请求参数**

| Name   | Type     | Description |
| :----- | :------- | ----------- |
| `type` | `string` | 选中的类型 |

**返回结果**

`string`

```typescript
const elem = Editor.Selection.getLastSelected('asset');  // "b0a4abb1-db32-49c3-9e09-a45b922a2024"
```

### getLastSelectedType

▸ **getLastSelectedType**(): `string`

获取最后选中的元素的类型

**返回结果**

`string`

```typescript
const type = Editor.Selection.getLastSelectedType();  // "asset"
```
