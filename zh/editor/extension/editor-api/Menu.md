# Menu

菜单

## 函数

其他配置具体参数参考 [Electron 官网文档](https://www.electronjs.org/zh/docs/latest/api/menu) 

```typescript
export interface BaseMenuItem {
    template?: string;
    type?: string;
    label?: string;
    subLabel?: string;
    checked?: boolean;
    enabled?: boolean;
    icon?: string;
    accelerator?: string;
    order?: number;
    group?: string;
    message?: string;
    target?: string;
    params?: any[];
    click?: Function | null;
    role?: string;
    submenu?: MenuTemplateItem[];
}
export interface MainMenuItem extends BaseMenuItem {
    path: string;
}
export interface ContextMenuItem extends BaseMenuItem {
    accelerator?: string;
}
export interface MenuTemplateItem extends BaseMenuItem {
}
export interface PopupOptions {
    x?: number;
    y?: number;
    menu: ContextMenuItem[];
}
```

### add

▸ **add**(`path: string`, `options: BaseMenuItem`): `any`

添加一个菜单
**只有主进程可以使用**

**请求参数**

| Name      | Type           | Description |
| :-------- | :------------- | ----------- |
| `path`    | `string`       | 菜单路径     |
| `options` | `BaseMenuItem` | 菜单配置     |

**返回结果**

`any`

```typescript
Editor.Menu.add('i18n:menu.extension', {
    "label": "Open Menu",
    "icon": "./static/icon.png",
});
```

### addGroup

▸ **addGroup**(`path: string`, `name: string`, `order: number`): `any`

添加分组信息
**只有主进程可以使用**

**请求参数**

| Name    | Type     | Description       |
| :------ | :------- | ----------------- |
| `path`  | `string` | 菜单分组的路径       |
| `name`  | `string` | 菜单分组的名称       |
| `order` | `number` | 菜单分组排序       |

**返回结果**

`any`

```typescript
Editor.Menu.addGroup('i18n:menu.extension.group', 'extendGroup', 1);
```

### apply

▸ **apply**(): `any`

应用之前的菜单修改
**只有主进程可以使用**

**返回结果**

`any`

```typescript
Editor.Menu.apply();
```

### clickMain

▸ **clickMain**(`searcher: string`): `Promise`<`any`\>

查询当前弹出的右键菜单的模版信息
**只有主进程可以使用**

**请求参数**

| Name       | Type     | Description |
| :--------- | :------- | :---------- |
| `searcher` | `string` | 选择器      |

**返回结果**

`Promise`<`any`\>

```typescript
await Editor.Menu.clickMain('.main');
```

### clickPopup

▸ **clickPopup**(`searcher: string`): `Promise`<`any`\>

查询当前弹出的右键菜单的模版信息

**请求参数**

| Name       | Type     | Description |
| :--------- | :------- | :---------- |
| `searcher` | `string` | 选择器      |

**返回结果**

`Promise`<`any`\>

```typescript
const res = await Editor.Menu.clickPopup('.main');
```

### get

▸ **get**(`path: string`): `any`

获取一个菜单对象
**只有主进程可以使用**

**请求参数**

| Name   | Type     | Description |
| :----- | :------- | ----------- |
| `path` | `string` | 菜单路径     |

**返回结果**

`any`

```typescript
const resMenu = await Editor.Menu.get('i18n:menu.extension');
```

### popup

▸ **popup**(`json: PopupOptions`): `any`

右键弹窗
**只有面板进程可以使用**

**请求参数**

| Name   | Type                                                        | Description     |
| :----- | :---------------------------------------------------------- | --------------- |
| `json` | `PopupOptions`                                              | 右键菜单的配置   |

**返回结果**

`any`

```typescript
Editor.Menu.popup({
    "menu": [{
        label: Editor.I18n.t('assets.menu.sortName'),
        type: 'radio',
        checked: true,
        click() {
            // ...
        }
    }]
});
```

### queryMain

▸ **queryMain**(): `Promise`<`any`\>

查询主菜单的模版信息

**返回结果**

`Promise`<`any`\>

```typescript
const resMenu = await Editor.Menu.queryMain();
```

### queryPopup

▸ **queryPopup**(): `Promise`<`any`\>

查询当前弹出的右键菜单的模版信息

**返回结果**

`Promise`<`any`\>

```typescript
const resMenu = await Editor.Menu.queryPopup();
```

### registerTemplate

▸ **registerTemplate**(`name: string`, `template: MenuTemplateItem[]`): `any`

注册菜单模版
**谨慎使用，之后会被移除**

**请求参数**

| Name       | Type                 | Description  |
| :--------- | :------------------- | ------------ |
| `name`     | `string`             | 菜单模板名称  |
| `template` | `MenuTemplateItem[]` | 菜单模板内容  |

**返回结果**

`any`

```typescript
Editor.Menu.registerTemplate('i18n:menu.template', []);
```

### remove

▸ **remove**(`path: string`, `options: BaseMenuItem`): `any`

删除一个菜单
**只有主进程可以使用**

**请求参数**

| Name      | Type           | Description |
| :-------- | :------------- | ----------- |
| `path`    | `string`       | 菜单路径     |
| `options` | `BaseMenuItem` | 菜单配置     |

**返回结果**

`any`

```typescript
Editor.Menu.remove('i18n:menu.extension', {});
```

### removeGroup

▸ **removeGroup**(`path: string`, `name: string`): `any`

删除分组信息

**请求参数**

| Name   | Type     | Description        |
| :----- | :------- | ------------------ |
| `path` | `string` | 菜单分组的路径      |
| `name` | `string` | 菜单分组的名称      |

**返回结果**

`any`

```typescript
Editor.Menu.removeGroup('i18n:menu.extension.group', 'extendGroup');
```

### unregisterTemplate

▸ **unregisterTemplate**(`name: string`): `any`

移除菜单模版
**谨慎使用，之后会被移除**

**请求参数**

| Name   | Type     | Description     |
| :----- | :------- | --------------- |
| `name` | `string` | 菜单模板名称     |

**返回结果**

`any`

```typescript
Editor.Menu.registerTemplate('i18n:menu.template');
```
