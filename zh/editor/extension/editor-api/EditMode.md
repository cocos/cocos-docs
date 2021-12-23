# EditMode

编辑方式

## 函数

### enter

▸ **enter**(`mode: string`): `any`

标记编辑器进入了一种编辑模式

**请求参数**

| Name   | Type     | Value | Description    |
| :----- | :------- | ----- | :------------- |
| `mode` | `string` |       | 编辑模式的名字 |

**返回结果**

`any`

``` typescript
 Editor.EditMode.enter('general');
```

### getMode

▸ **getMode**(): `string`

当前所处的编辑模式

**返回结果**

`string`

``` typescript
 Editor.EditMode.getMode(); // "general"
```

