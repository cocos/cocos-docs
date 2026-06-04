# Clipboard

系统剪切板，当调用剪切板接口的时候，会修改系统剪切板内容。请谨慎使用

## 接口说明

```typescript
export type ICopyType = 'image' | 'text' | 'files' | string;
```

## 函数

### clear

▸ **clear**(): `void`

清空剪贴板

```typescript
Editor.Clipboard.clear();
```

### has

▸ **has**(type: `ICopyType`): `boolean`

判断当前剪贴板内容是否含有指定类型的数据

**请求参数**

| Name   | Type        |   Description   |
| :----- | :---------- | --------------- |
| `type` | `ICopyType` | 剪贴板内容的类型 |

**返回结果**

`boolean`

```typescript
const res = Editor.Clipboard.has('files');  // false
```

### read

▸ **read**(type: `ICopyType`): `any`

获取剪贴板内容

**请求参数**

| Name   | Type        |  Description   |
| :----- | :---------- | -------------  |
| `type` | `ICopyType` | 剪贴板内容的类型 |

```typescript
const textRes = Editor.Clipboard.read('text');  // 'your copy text'
const filesRes = Editor.Clipboard.read('files');  // []
```

### write

▸ **write**(type: `ICopyType`, value: `string | FileList`): `boolean`

写入剪贴板内容，请勿频繁调用，这个操作会覆盖系统剪切板，频繁调用可能会影响用户正常操作

**请求参数**

| Name    | Type                       | Description             |
| :------ | :------------------------- | ----------------------- |
| `type`  | `ICopyType`                | 剪贴板内容的类型 |
| `value` | `string` \| `FileList`     | 复制到剪贴板中的内容 |

**返回结果**

`boolean`

```typescript
Editor.Clipboard.write('text', 'you can test other type');
```
