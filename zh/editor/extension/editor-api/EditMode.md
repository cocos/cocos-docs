# EditMode

编辑模式

目前编辑器内主要的编辑模式：

- `general` 普通场景编辑模式
- `animation` 动画编辑模
- `prefab` prefab 编辑模式

## 函数

### enter
▸ **enter**(mode: `string`): `any`

标记编辑器进入了一种编辑模式

**请求参数**

| Name   | Type     | Description    |
| :----- | :------- | :------------- |
| `mode` | `string` | 编辑模式的名字  |

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

