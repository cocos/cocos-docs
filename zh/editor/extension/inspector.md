# 扩展属性检查器面板

**属性检查器** 作为 Creator 里显示当前选中状态的模块，为大家提供了一些基础的扩展能力。

在 **属性检查器** 里，定义了两个层级的数据:

1. 选中的物体主类型
2. 渲染主类型内容时，内容里包含的子数据类型

当在 **层级管理器**/**资源管理器** 中选中一个节点/资源时，Creator 便会将物体被选中的广播消息发送到 **属性检查器**。当 **属性检查器** 接收到消息后，会检查被选中的物体的类型，例如选中的是节点，那么类型便是 `node`。

针对两种类型，允许注册两种渲染器：
1. 主类型渲染器
2. 主类型渲染器接收数据开始渲染的时候，允许附带子类型渲染器

示例里选中的是 `node`，`node` 上携带了多个 `component`，所以主类型就是 `node`，而子类型则是 `component`。

在 **属性检查器** 收到选中物体的广播消息后，首先确定类型，而后 **属性检查器** 会将收到的数据（物体的 uuid），传递给 `node` 渲染器，将渲染权限完全移交。

而在 `node` 渲染器里，会根据自身的实现，渲染到每个 `组件` 的时候，将该区域的渲染权限交给 `子类型渲染器`。大部分情况下，我们不需要关注这些。我们先来看看几种常用的的自定义方式吧。

## 自定义 Component 渲染

默认提供的组件渲染器有时候并不能满足我们的需求，这时候我们就需要自定义一个组件的渲染方式。

首先在项目内书写一个 ts 文件命名为 NewComponent.ts，内容如下:

```typescript
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('NewComponent')
export class NewComponent extends Component {
    @property({
        type: String,
    })
    test: string = '';
}
```

将组件拖到节点上，这时候能看到组件上有一个 string 输入框。

然后新建一个插件，在插件 package.json 里这样注册一份 contributions.inspector 数据：

```json
{
    "name": "extension",
    "editor": ">=3.3.0",

    "contributions": {
        "inspector": {
            "section": {
                "node": {
                    "cc.Label": "./dist/contributions/inspector/comp-label.js"
                }
            }
        }
    }
}
```

在 contributions 数据里，向 **属性检查器** 提供一份数据，要求渲染 section 区域内的 node 类型物体里的 cc.Label 组件。

然后我们针对这个书写一个 `./dist/contributions/inspector/comp-label.js` 文件：

Javascript

```javascript
'use strict';

exports.template = `
<ui-prop>
    <ui-label>Custom Render</ui-label>
</ui-prop>
<ui-prop type="dump" class="test"></ui-prop>
`;

exports.$ = {
    test: '.test',
};

exports.update = function(dump: any) {
    // 使用 ui-porp 自动渲染，设置 prop 的 type 为 dump
    // render 传入一个 dump 数据，能够自动渲染出对应的界面
    // 自动渲染的界面修改后，能够自动提交数据
    this.$.test.render(dump.value.test);
}
exports.ready = function() {}
```

Typescript

```typescript
'use strict';

type Selector<$> = { $: Record<keyof $, any | null> }

export const template = `
<ui-prop>
    <ui-label>Custom Render</ui-label>
</ui-prop>
<ui-prop type="dump" class="test"></ui-prop>
`;

export const $ = {
    test: '.test',
};

export function update(this: Selector<typeof $> & typeof methods, dump: any) {
    // 使用 ui-porp 自动渲染，设置 prop 的 type 为 dump
    // render 传入一个 dump 数据，能够自动渲染出对应的界面
    // 自动渲染的界面修改后，能够自动提交数据
    this.$.test.render(dump.value.test);
}
export function ready(this: Selector<typeof $> & typeof methods) {}
```

这样我们就能够在 inspector 内接管 NewComponent 组件的渲染了。

这里需要注意的是，多个插件注册的数据是并存的。如果一个的 Component 已经有其他插件注册或者内置了自定义渲染器，那么再次注册的自定义渲染器都会附加在后面。如果一个 Component 没有内置自定义渲染器，使用的是默认的渲染，那么当插件注册渲染器的时候，会完全接管渲染内容。

如果我们希望手动渲染，而不使用自动渲染，那我们也可以手动通过 prop 提交数据：

Javascript

```javascript
'use strict';

exports.template = `
<ui-prop>
    <ui-label>Custom Render</ui-label>
</ui-prop>
<!-- 帮忙提交数据的元素 -->
<ui-prop type="dump" class="test"></ui-prop>
<!-- 实际渲染的元素 -->
<ui-input class="test-input"></ui-input>
`;

exports.$ = {
    test: '.test',
    testInput: '.test-input',
};

exports.update = function(dump: any) {
    // 缓存 dump 数据，请挂在 this 上，否则多开的时候可能出现问题
    this.dump = dump;
    // 将 dump 数据传递给帮忙提交数据的 prop 元素
    this.$.test.dump = dump.value.test;
    // 更新负责输入和显示的 input 元素上的数据
    this.$.testInput.value = dump.value.test.value;
}
exports.ready = function(this: PanelThis) {
    // 监听 input 上的提交事件，当 input 提交数据的时候，更新 dump 数据，并使用 prop 发送 change-dump 事件
    this.$.testInput.addEventListener('confirm', () => {
        this.dump.value.test.value = this.$.testInput.value;
        this.$.test.dispatch('change-dump');
    });
}
```

Typescript

```typescript
'use strict';

type Selector<$> = { $: Record<keyof $, any | null> }

export const template = `
<ui-prop>
    <ui-label>Custom Render</ui-label>
</ui-prop>
<!-- 帮忙提交数据的元素 -->
<ui-prop type="dump" class="test"></ui-prop>
<!-- 实际渲染的元素 -->
<ui-input class="test-input"></ui-input>
`;

export const $ = {
    test: '.test',
    testInput: '.test-input',
};

type PanelThis = Selector<typeof $> & { dump: any };

export function update(this: PanelThis, dump: any) {
    // 缓存 dump 数据，请挂在 this 上，否则多开的时候可能出现问题
    this.dump = dump;
    // 将 dump 数据传递给帮忙提交数据的 prop 元素
    this.$.test.dump = dump.value.test;
    // 更新负责输入和显示的 input 元素上的数据
    this.$.testInput.value = dump.value.test.value;
}
export function ready(this: PanelThis) {
    // 监听 input 上的提交事件，当 input 提交数据的时候，更新 dump 数据，并使用 prop 发送 change-dump 事件
    this.$.testInput.addEventListener('confirm', () => {
        this.dump.value.test.value = this.$.testInput.value;
        this.$.test.dispatch('change-dump');
    });
}
```

这个示例通过一个空的 prop 元素进行数据提交。这样我们可以使用 html 自定义任何界面，再通过对应的隐藏的 prop 提交数据实现多种多样的界面效果。

## 自定义 Asset 渲染

如果官方资源面板不能满足需求，我们也可以扩展自定义的面板：

```json
{
    "name": "extension",
    "editor": ">=3.3.0",
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

和 Component 注册一样，在 contributions 数据里，向 **属性检查器** 提供一份数据，请求渲染 "section" 区域内的 "asset" 类型里的 "effect" 资源。

Javascript

```javascript
exports.$ = {
    'test': '.test',
};
exports.template = `
<ui-prop>
    <ui-label slot="label">Test</ui-label>
    <ui-checkbox slot="content" class="test"></ui-checkbox>
</ui-prop>
`;
exports.update = function(assetList: Asset[], metaList: Meta[]) {
    this.assetList = assetList;
    this.metaList = metaList;
    this.$.test.value = metaList[0].userData.test || false;
};
exports.ready() {
    this.$.test.addEventListener('confirm', () => {
        this.metaList.forEach((meta: any) => {
            // 修改对应的 meta 里的数据
            meta.userData.test = !!this.$.test.value;
        });
        // 修改后手动发送事件通知
        this.dispatch('change');
    });
};
exports.close() {
    // TODO something
};
```

Typescript

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
        // 修改后手动发送事件通知
        this.dispatch('change');
    });
};

export function close(his: PanelThis, ) {
    // TODO something
};
```

这样我们就能够在 inspector 内的 effect 资源页面最后添加一个 button。

这里也需要注意，多个插件注册的数据是并存的。如果一个的 Asset 已经有其他插件注册或者内置了自定义渲染器，那么再次注册的自定义渲染器都会附加在后面。如果一个 Asset 没有内置自定义渲染器，使用的是默认的渲染，那么当插件注册渲染器的时候，会完全接管渲染内容。

## 更多自定义方式

[通过修饰器定义属性](../../scripting/decorator.md)
