# Panel

面板

## 变量


### \_kitControl

• **\_kitControl**: `any`

```typescript
const obj = Editor.Panel._kitControl;
```

## 函数

```typescript
type Selector<$> = { $: Record<keyof $, HTMLElement | null> }

type Options<S, M, U extends (...args: any[]) => void> = {
    /**
    * 监听面板事件
    */
    listeners?: {
        /**
        * 面板显示的时候触发的钩子
        */
        show?: () => any;
        /**
        * 面板隐藏的时候触发的钩子
        */
        hide?: () => any;
    };
    /** 
    * 面板的内容
    */
    template: string;
    /**
    * 面板上的样式
    */
    style?: string;
    /**
    * 快捷选择器
    */
    $?: S;
    /** 
    * panel 内置的函数方法，可以在 messages、listeners、生命周期函数内调用 
    */
    methods?: M;
    /**
    * 面板数据更新后触发的钩子函数
    */
    update?: (...args: Parameters<U>) => void;
    /**
    * 面板启动后触发的钩子函数
    */
    ready?: () => void;
    /**
    * 面板准备关闭的时候会触发的函数，return false 的话，会终止关闭面板
    * 生命周期函数，在 panel 准备关闭的时候触发
    * 如果 return false，则会中断关闭流程,请谨慎使用，错误的判断会导致编辑器无法关闭。
    */
    beforeClose?: () => Promise<boolean | void> | boolean | void;
    /**
    * 面板关闭后的钩子函数
    */
    close?: () => void;           
} & ThisType<Selector<S> & M>
```

### close

▸ **close**(`name: string`): `any`

关闭一个面板

**请求参数**

| Name   | Type     | Description |
| :----- | :------- | ----------- |
| `name` | `string` | 面板名称     |

**返回结果**

`any`

```typescript
Editor.Panel.close('package-asset.import');
```

### define

▸ **define**<`U`, `Selector`, `M`\>(`options`): `any`

**类型参数**

| Name       | Type                                   | Description |
| :--------- | :------------------------------------- | ----------- |
| `U`        | extends (...`args`: `any`[]) => `void` |             |
| `Selector` | `Record`<`string`, `string`\>          |             |
| `M`        | `Record`<`string`, `Function`\>        |             |

**请求参数**

| Name      | Type                             | Description |
| :-------- | :------------------------------- | ----------- |
| `options` | `Options`<`Selector`, `M`, `U`\> |             |

**返回结果**

`any`

```typescript
Editor.Panel.define({
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

### focus

▸ **focus**(`name: string`): `any`

将焦点传递给一个面板

**请求参数**

| Name   | Type     | Description |
| :----- | :------- | ----------- |
| `name` | `string` | 面板名称     |

**返回结果**

`any`

```typescript
Editor.Panel.focus('assets');
```

### has

▸ **has**(`name: string`): `Promise`<`boolean`\>

检查面板是否已经打开

**请求参数**

| Name   | Type     | Description |
| :----- | :------- | ----------- |
| `name` | `string` | 面板名称     |

**返回结果**

`Promise`<`boolean`\>

```typescript
const res = await Editor.Panel.has('package-asset.import');
```

### open

▸ **open**(`name: string`, ...`args: any[]`): `any`

打开一个面板

**请求参数**

| Name      | Type     | Description              |
| :-------- | :------- | ------------------------ |
| `name`    | `string` | 面板名称                  |
| `...args` | `any`[]  | 打开面板时传递的参数       |

**返回结果**

`any`

```typescript
Editor.Panel.open('console');
```

### querySelector

▸ **querySelector**(`name: string`, `selector: string`): `Promise`<`any`\>

查询当前窗口里某个面板里的元素列表

**请求参数**

| Name       | Type     | Description |
| :--------- | :------- | ----------- |
| `name`     | `string` | 面板名称     |
| `selector` | `string` | 选择器       |

**返回结果**

`Promise`<`any`\>

```typescript
const res = await Editor.Panel.querySelector('assets', '.tree-node');
```
