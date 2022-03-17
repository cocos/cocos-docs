# Theme

主题

## 函数

### getList

▸ **getList**(): `string[]`

获取所有主题的名字

```typescript
const themes = Editor.Theme.getList();  // ["creator", "dark", "light"]
```

### use

▸ **use**(name?: `string`): `any`

使用某个皮肤

**请求参数**

| Name    | Type     | Description |
| :------ | :------- | ----------- |
| `name?` | `string` | 主题名      |

```typescript
Editor.Theme.use('creator');
```
