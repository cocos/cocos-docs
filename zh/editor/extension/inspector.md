# 扩展属性检查器面板

有扩展属性检查器需求的开发者建议先参考文档 [通过修饰器定义属性](../../scripting/decorator.md)，若该文档满足需求，建议优先使用该文档中的方法。


**属性检查器** 作为 Cocos Creator 里显示当前选中状态的模块，为大家提供了一些基础的扩展能力。

在 **属性检查器** 里，定义了两个层级的数据:

1. 选中的物体主类型
2. 渲染主类型内容时，内容里包含的子数据类型

当在 **层级管理器**/**资源管理器** 中选中一个**节点**/**资源**时，Cocos Creator 会将物体被选中的消息进行广播。当 **属性检查器** 接收到消息后，会检查被选中的物体的类型，例如选中的是节点，那么类型便是 `node`。

针对两种类型，允许注册两种渲染器：
1. 主类型渲染器
2. 主类型渲染器接收数据开始渲染的时候，允许附带子类型渲染器

示例里选中的是 `node`，`node` 上携带了多个 `component`，所以主类型就是 `node`，而子类型则是 `component`。

在 **属性检查器** 收到选中物体的广播消息后，首先确定类型，而后 **属性检查器** 会将收到的数据（物体的 uuid），传递给 `node` 渲染器，将渲染权限完全移交。

而在 `node` 渲染器里，会根据自身的实现，渲染到每个 `组件` 的时候，将该区域的渲染权限交给 `子类型渲染器`。大部分情况下，我们不需要关注这些。我们先来看看几种常用的的自定义方式吧。

## 自定义 Component 渲染

默认提供的组件渲染器有时候并不能满足我们的需求，这时候我们就需要自定义一个组件的渲染方式。

首先在项目内新建一个脚本组件 `CustomLabelComponent.ts`，并添加一个字符串属性，内容如下:

```typescript

import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CustomLabelComponent')
export class CustomLabelComponent extends Component {
    @property
    label = '';

    start () {

    }
}

```

将组件拖到节点上，这时候能看到组件上有一个输入框。

新建一个扩展，在扩展的 `package.json` 里注册如下的 `contributions.inspector` 信息：

```json
{
    "contributions": {
        "inspector": {
            "section": {
                "node": {
                    "CustomLabelComponent": "./dist/contributions/inspector/comp-label.js"
                }
            }
        }
    }
}
```

### 自动渲染
编写一个 `src/contributions/inspector/comp-label.ts` 文件，内容如下：

```typescript
'use strict';

type Selector<$> = { $: Record<keyof $, any | null> }

export const template = `
<ui-prop type="dump" class="test"></ui-prop>
`;

export const $ = {
    test: '.test',
};

export function update(this: Selector<typeof $> & typeof methods, dump: any) {
    // 使用 ui-porp 自动渲染，设置 prop 的 type 为 dump
    // render 传入一个 dump 数据，能够自动渲染出对应的界面
    // 自动渲染的界面修改后，能够自动提交数据
    this.$.test.render(dump.label.value);
}
export function ready(this: Selector<typeof $> & typeof methods) {}
```

编译并刷新插件后，我们可以发现 `CustomLabelComponent` 组件的渲染被接管了。

> 每一个 `ui-prop` 对应一条属性，若要显示多条属性需要定义多个 `ui-prop`。


### 手动渲染

上面的自动渲染示例中，我们使用了类型为 `dump` 的特殊的 `ui-prop` 进行渲染数据提交，它使我们可以快捷的接管组件的渲染，但若面临一些极端情况却很难处理一些细节问题，此时可以切换到手动渲染模式，代码如下所示：
```typescript
'use strict';

type Selector<$> = { $: Record<keyof $, any | null> }

export const template = `
<!-- 帮忙提交数据的元素 -->
<ui-prop type="dump" class="test"></ui-prop>
<!-- 实际渲染的元素 -->
<ui-label class="label"></ui-label>
<ui-input class="test-input"></ui-input>
`;

export const $ = {
    label:'.label',
    test: '.test',
    testInput: '.test-input',
};

type PanelThis = Selector<typeof $> & { dump: any };

export function update(this: PanelThis, dump: any) {
    // 缓存 dump 数据，请挂在 this 上，否则多开的时候可能出现问题
    this.dump = dump;
    // 将 dump 数据传递给帮忙提交数据的 prop 元素
    this.$.test.dump = dump.value.label;
    // 更新负责输入和显示的 input 元素上的数据
    this.$.testInput.value = dump.value.label.value;
    this.$.label.value = dump.value.label.name;
}
export function ready(this: PanelThis) {
    // 监听 input 上的提交事件，当 input 提交数据的时候，更新 dump 数据，并使用 prop 发送 change-dump 事件
    this.$.testInput.addEventListener('confirm', () => {
        this.dump.value.label.value = this.$.testInput.value;
        this.$.test.dispatch('change-dump');
    });
}
```

手动渲染模式下依然要通过一个类型为 `dump` 的 `ui-prop` 元素进行数据提交。但 `template` 中的 `html` 布局就是一个完全可以自由掌控的内容，可根据需求制定出十分复杂的显示方式。

## 自定义 Asset 渲染

当在资源管理窗口（Assets）中选中文件时，属性检查器窗口会显示当前选中文件的重要属性，如果默认显示的信息不满足要求，我们也可以自定义渲染内容。

在 `package.json` 中添加 `contributions.section.asset` 字段，并定义对应资源类型的自定义渲染脚本，如下所示：

```json
{
    "contributions": {
        "inspector": {
            "section": {
                "asset": {
                    "effect": "./dist/contributions/inspector/asset-effect.js"
                }
            }
        }
    }
}
```

`effect` 表示我们要对 Cocos Effect（*.effect） 文件类型的资源属性面板自定义渲染。常见的资源文件类型如下：
- `scene` - 场景文件
- `typescript` - TypeScript 脚本文件
- `prefab` - 预制体文件 
- `fbx` - FBX 文件
- `material` - 材质文件
- `directory` - 文件夹
- `image` - 图片文件

可通过查看文件对应的 `*.meta` 中的 `importer` 字段获取该文件的类型定义。

接下来，在插件目录下新建一个 `src/contributions/inspector/asset-effect.ts` 脚本文件，并编写如下代码：
```typescript
'use strict';

interface Asset {
    displayName: string;
    file: string;
    imported: boolean;
    importer: string;
    invalid: boolean;
    isDirectory: boolean;
    library: {
        [extname: string]: string;
    };
    name: string;
    url: string;
    uuid: string;
    visible: boolean;
    subAssets: {
        [id: string]: Asset;
    };
}

interface Meta {
    files: string[];
    imported: boolean;
    importer: string;
    subMetas: {
        [id: string]: Meta;
    };
    userData: {
        [key: string]: any;
    };
    uuid: string;
    ver: string;
}

type Selector<$> = { $: Record<keyof $, any | null> } & { dispatch(str: string): void, assetList: Asset[], metaList: Meta[] };

export const $ = {
    'test': '.test',
};

export const template = `
<ui-prop>
    <ui-label slot="label">Test</ui-label>
    <ui-checkbox slot="content" class="test"></ui-checkbox>
</ui-prop>
`;

type PanelThis = Selector<typeof $>;

export function update(this: PanelThis, assetList: Asset[], metaList: Meta[]) {
    this.assetList = assetList;
    this.metaList = metaList;
    this.$.test.value = metaList[0].userData.test || false;
};

export function ready(this: PanelThis) {
    this.$.test.addEventListener('confirm', () => {
        this.metaList.forEach((meta: any) => {
            // 修改对应的 meta 里的数据
            meta.userData.test = !!this.$.test.value;
        });
        // 修改后手动发送事件通知，资源面板是修改资源的 meta 文件，不是修改 dump 数据，所以发送的事件和组件属性修改不一样
        this.dispatch('change');
    });
};

export function close(his: PanelThis, ) {
    // TODO something
};
```

编译、刷新扩展后，回到 Cocos Creator 编辑器界面，选中某个 `Cocos Effect` 文件，可以在属性检查器底部发现，多了一个 **Test 复选框**。

**注意**：多个扩展注册的数据是并存的。如果一个**组件**/**资源**已经有了自定义渲染器，那么再次注册的自定义渲染器都会附加在后面。如果一个**组件**/**资源**没有内置自定义渲染器，使用的是默认的渲染器，那么当扩展注册自定义渲染器的时候，会完全接管渲染内容。
