# Panel

面板管理器

## 函数

### open

▸ **open**(name: `string`, ...args: `any[]`): `any`

传入面板名字，打开一个面板

**请求参数**

| Name      | Type     | Description              |
| :-------- | :------- | ------------------------ |
| `name`    | `string` | 面板名称 |
| `...args` | `any`[]  | 打开面板时传递的参数 |

```typescript
Editor.Panel.open('console');
```

### close

▸ **close**(name: `string`): `any`

传入面板名字，关闭同名的面板

**请求参数**

| Name   | Type     | Description |
| :----- | :------- | ----------- |
| `name` | `string` | 面板名称 |

```typescript
Editor.Panel.close('package-asset.import');
```

### focus

▸ **focus**(name: `string`): `any`

将焦点传递给找到的第一个同名面板

**请求参数**

| Name   | Type     | Description |
| :----- | :------- | ----------- |
| `name` | `string` | 面板名称 |

```typescript
Editor.Panel.focus('assets');
```

### has

▸ **has**(name: `string`): Promise<`boolean`\>

检查面板是否已经打开

**请求参数**

| Name   | Type     | Description |
| :----- | :------- | ----------- |
| `name` | `string` | 面板名称 |

**返回结果**

Promise<`boolean`\>

```typescript
const res = await Editor.Panel.has('package-asset.import');
```

### define

▸ **define**(options: `Options`): `PanelObject`

定义一个面板，如果我们用 typescript 书写面板内容，ready 等生命周期函数内无法解析出正确的 this 对象，所以 Creator 里提供了一个 define 函数。

这个函数传入一个 PanelObject，返回一个 PanelObject，并不进行逻辑处理。但在这个函数传入的 PanelObject 上，能够正常识别出 this 对象。

**请求参数**

| Name      | Type                             | Description          |
| :-------- | :------------------------------- | -----------          |
| `options` | `Options`<`Selector`, `M`, `U`\> | 面板的配置 |

```typescript
module.exports = Editor.Panel.define({
    template: '<div id="app"></div>',
    $: {
        app: '#app',
    },
    methods: {
        init() { },
    },
    async ready() {
        new App({
            el: this.$.app,
        });
    },
});
```
