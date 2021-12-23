# Clipboard

剪切板

## 函数

```typescript
export type ICopyType = 'image' | 'text' | 'files' | string;
```

### clear

▸ **clear**(): `void`

清空剪贴板

```typescript
Editor.Clipboard.clear();
```

### has

▸ **has**(`type: ICopyType`): `boolean`

判断当前剪贴板内是否是指定类型

**请求参数**

| Name   | Type        |   Description   |
| :----- | :---------- | --------------- |
| `type` | `ICopyType` | 剪贴板内容的类型  |

**返回结果**

`boolean`

```typescript
const res = Editor.Clipboard.has('files');  // false
```

### read

▸ **read**(`type: ICopyType`): `any`

获取剪贴板内容

**请求参数**

| Name   | Type        |  Description   |
| :----- | :---------- | -------------  |
| `type` | `ICopyType` | 剪贴板内容的类型 |

**返回结果**

`any`

```typescript
const textRes = Editor.Clipboard.read('text');  // 'your copy text'
const imageRes = Editor.Clipboard.read('image');
const filesRes = Editor.Clipboard.read('files');  // []
```

### write

▸ **write**(`type: ICopyType`, `value: string | FileList`): `boolean`

写入剪贴板内容

**请求参数**

| Name    | Type                                    | Description             |
| :------ | :-------------------------------------- | ----------------------- |
| `type`  | `"image" | "text" | "files" | string`   | 剪贴板内容的类型          |
| `value` | `string` | `FileList`                   | 复制到剪贴板中的内容      |

**返回结果**

`boolean`

```typescript
Editor.Clipboard.write('text', 'you can test other type');
```
