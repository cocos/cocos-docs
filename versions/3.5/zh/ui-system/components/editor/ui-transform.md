# UI 变换组件

定义了 UI 上的矩形信息，包括矩形的尺寸和锚点位置。开发者可以通过该组件任意地操作矩形的大小、位置。一般用于渲染、点击事件的计算、界面布局以及屏幕适配等。

点击 **属性检查器** 下面的 **添加组件** 按钮，然后选择 **UI/UITransform** 即可添加 UITransform 组件到节点上。

UITransform 脚本接口请参考 [Mask API](%__APIDOC__%/zh/class/UITransform)。

## UITransform 属性介绍

| 属性 |   功能说明
| :-------------- | :----------- |
| ContentSize | UI 矩形内容尺寸
| AnchorPoint | UI 矩形锚点位置

---

### 通过脚本代码修改节点尺寸和锚点

```ts
import { _decorator, Component, Node, UITransform } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Example')
export class Example extends Component {

    start () {
        const uiTransform = this.getComponent(UITransform);
        // 方法一
        uiTransform.setContentSize(200, 120);
        uiTransform.setAnchorPoint(0, 0.5);

        // 方法二
        uiTransform.width = 200;
        uiTransform.height = 120;
        uiTransform.anchorX = 0;
        uiTransform.anchorY = 0.5;
    }
}
```

### priority 属性的弃用说明

我们在 3.1 版本中弃用了 UITransform 组件的 priority 属性，用户可以通过使用 setSiblingIndex 来设置节点树的顺序来进行调整渲染顺序。

关于 priority 属性的移除及推荐使用的 SiblingIndex 属性的说明：
由于表意不明以及与引擎中其他属性的命名冲突，UITransform 组件上的 priority 属性在 v3.1 已被废弃。priority 属性的设计之初是为用户提供节点树排序的快捷方式，本身并无其他用途，和 priority 所表达的“优先级”也不相关，并且设置之后实际上还是通过更改节点树的顺序来调整渲染顺序。

在移除了 `priority` 属性之后，用户可以用 `setSiblingIndex` 方法来替换使用，`setSiblingIndex` 方法通过影响节点中的 `siblingIndex` 属性来调整节点树的顺序。不同之处在于，`priority` 属性存在默认值，而 node 的 `siblingIndex` 属性实际上就是这个节点在父节点中的位置，所以在节点树发生变化之后，节点的 `siblingIndex` 属性数值就会产生变化。这就要求在使用 `setSiblingIndex` 方法的时候，需要知道节点在父节点中的相对位置并做出控制，才能够获得预期的结果。

需要注意的是，不能直接将 `siblingIndex` 属性等同于 `priority`（已废弃）属性来理解使用，它们的意义是不同的，改变 `siblingIndex` 属性需要理解并清楚其代表的是在父节点下的位置，且在节点树变化时会发生变化，并且只能通过 `setSiblingIndex` 方法来修改 `siblingIndex` 属性。

考虑到节点快捷排序的需求，我们会在之后的版本中提供更方便快捷的接口供用户排列节点使用。
