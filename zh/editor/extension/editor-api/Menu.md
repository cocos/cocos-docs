# Menu

菜单

## 接口说明

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

## 函数

### popup

▸ **popup**(json: `PopupOptions`): `any`

右键弹窗
**只有面板进程可以使用**

**请求参数**

| Name   | Type                       | Description     |
| :----- | :------------------------- | --------------- |
| `json` | `PopupOptions`             | 右键菜单的配置   |

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
