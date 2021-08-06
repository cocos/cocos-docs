# 自定义在 material 中 effect 的 inspector 的内容

我们可以在开发 material 时可以自定义每个 effect 在 material 的 inspector 对应的内容。

## 定义 inspector

首先我们需要一个扩展，假设我们开启了一个名为 `my-extension` 的扩展。
然后在 `my-extension` 目录下定义一个js脚本 `my-effect`，脚本的内容如下：

```js
"use strict";

module.exports = {
    template: `
    <ui-prop>
        <ui-label slot="label" value="button"></ui-label>
        <ui-button slot="content">Click Me</ui-button>
    </ui-prop>
    `,
    $: {
        button: 'ui-button'
    },
    ready(){
        this.$.button.addEventListener('confirm',(event)=>{
            console.log(this.material);
        })
    },
    update(material, assetList, metaList) {
        this.material = material
    }
};
```

update 的方法参数详情如下表

| 参数名    | 参数含义                       |
| --------- | ------------------------------ |
| material  | 当前材质的数据                 |
| assetList | 当前选中的资源的资源信息列表   |
| metaList  | 当前选中的资源的 meta 信息列表 |

关于 assetList 和 metaList 的定义请参考 [inspector](./inspector.md)。

## inspector 的使用方法

我们可以根据需求修改 update 中传入的参数，
在修改后需要调用 `this.dispatch('change');` 以通知面板数据被修改。

## 设置 effect 的代码

我们新建一个名为 `my-effect` 的 effect 文件，然后在 effect 代码中进行如此设置：

```yaml
CCEffect %{
  editor:
    inspector: 'packages://my-extension/my-effect.js'
  ...
}
```

## 最终效果

新建一个 material ，然后在 material 设置 effect 为 `my-effect`，可以看到如下画面。

![custom-effect-inspector](./image/custom-effect-inspector.png)
