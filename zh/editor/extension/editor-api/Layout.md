# Layout

布局

## 函数

### apply

▸ **apply**(json: `any`): `any`

应用布局信息

**请求参数**

| Name   | Type  | Description  |
| :----- | :---- | :----------- |
| `json` | `any` | 布局文件内容 |

```typescript
Editor.Layout.apply(fs.readJSONSync(ps.join(Editor.App.path, './default.json')));
```

### init

▸ **init**(): `any`

初始化布局系统

```typescript
Editor.Layout.init();
```
