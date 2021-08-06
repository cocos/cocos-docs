# 扩展属性检查器面板

**属性检查器** 作为 Creator 里显示当前选中状态的模块，为大家提供了一些基础的扩展能力。

在 inspector 里，定义了两个层级的数据:

1. 选中的物体主类型
2. 渲染主类型内容时，内容里包含的子数据类型

例如在 Creator 内选中一个节点，这时候 Creator 会发送一个物体被选中的广播消息。inspector 作为管理器，收到物体选中消息后，会检查被选中的物体的类型，例子里选中的是节点，所以他的类型是 'node'。
确定类型后，inspector 就会将收到的另一个数据（物体的 uuid），传递给 node 渲染器。渲染权限完全移交。

而在 node 渲染器里，会根据自身的实现，渲染到每个 Component 的时候，将该区域的渲染权限交给 “子类型渲染器”。大部分情况下，我们不需要关注这些。我们先来看看几种常用的的自定义方式吧。

## 自定义 Component 渲染

默认提供的组件渲染器有时候并不能满足我们的需求，我们可以在插件的 package.json 里这样注册一份数据：

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

然后我们针对这个书写一个 ./dist/contributions/inspector/comp-label.js 文件:

```typescript
'use strict';

module.exports = Editor.Panel.define({
    $: {
        button: 'ui-button[slot=content]',
    }.
    template: `
<ui-prop>
    <ui-label value="Button" slot="label"></ui-label>
    <ui-button slot="content">Console</ui-button>
</ui-prop>
    `,
    update(dump: any) {
        // TODO something
    },
    ready() {
        this.$.button.addEventListener('confirm', () => {
            console.log('Custom Inspector: Label Button...');
        });
    },
    close() {
        // TODO something
    },
});
```

Editor.Panel.define 是 3.3 新增的接口，主要是合并一些数据。

需要兼容之前版本的话可以加一行:

```typescript
Editor.Panel.define = Editor.Panel.define || function(panel: any) {return panel;}
```

这样我们就能够在 inspector 内的 Label 组件最后添加一个 button。

这里需要注意的是，多个插件注册的数据是并存的。如果一个的 Component 已经有其他插件注册或者内置了自定义渲染器，那么再次注册的自定义渲染器都会附加在后面。如果一个 Component 没有内置自定义渲染器，使用的是默认的渲染，那么当插件注册渲染器的时候，会完全接管渲染内容。

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

和 Component 注册一样，在 contributions 数据里，向 inspector 提供一份数据，请求渲染 "section" 区域内的 "asset" 类型里的 "effect" 资源。

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

// 兼容 3.3 之前的版本
Editor.Panel.define = Editor.Panel.define || function(panel: any) {return panel;}

module.exports = Editor.Panel.define({
    $: {
        button: 'ui-button[slot=content]',
    },
    template = `
<ui-prop>
    <ui-label value="Button" slot="label"></ui-label>
    <ui-button slot="content">Console</ui-button>
</ui-prop>
    `,
    update(assetList: Asset[], metaList: Meta[]) {
        // TODO something
    },
    ready() {
        // @ts-ignore
        this.$.button.addEventListener('confirm', () => {
            console.log('Custom Inspector: Label Button...');
        });
    },
    close() {
        // TODO something
    },
});
```

这样我们就能够在 inspector 内的 effect 资源页面最后添加一个 button。

这里也需要注意，多个插件注册的数据是并存的。如果一个的 Asset 已经有其他插件注册或者内置了自定义渲染器，那么再次注册的自定义渲染器都会附加在后面。如果一个 Asset 没有内置自定义渲染器，使用的是默认的渲染，那么当插件注册渲染器的时候，会完全接管渲染内容。

## 更多自定义方式

[通过修饰器定义属性](../../scripting/decorator.md)
