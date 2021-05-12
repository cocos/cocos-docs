# UI 变换组件

定义了 UI 上的矩形信息，包括矩形的尺寸和锚点位置。开发者可以通过该组件任意地操作矩形的大小、位置。一般用于渲染、点击事件的计算、界面布局以及屏幕适配等。

点击 **属性检查器** 下面的 **添加组件** 按钮，然后选择 **UI/UITransform** 即可添加 UITransform 组件到节点上。

UITransform 脚本接口请参考 [Mask API](__APIDOC__/zh/classes/ui.uitransform.html)。

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
由于表意不明及于引擎中其他属性的命名冲突，我们移除了 UITransform 组件上的 priority 属性，这个属性的设计之初是为用户提供了节点树排序的快捷方式，本身并无其他用途，且和 priority 表达的优先级并不相关，其设置之后实际上还是通过更改节点树的顺序变更了渲染顺序。

在移除了这个属性之后，用户还是可以使用 setSiblingIndex 方法来设置节点树顺序，不同的是， priority 存在默认值，而 node 的 siblingIndex 实际上就是这个节点在在父节点中的位置，所以在节点树发生变化之后，节点的 siblingIndex 数值会产生变化，这就要求用户在使用 setSiblingIndex 方法的时候，需要知道节点在父节点中的相对位置并作出控制，才能够获得预期的结果。这里修改的重点在与用户不能直接将 siblingIndex 属性等同于 priority（旧）属性来理解使用，他们的意义是不同的，使用 siblingIndex 需要理解并清楚其代表的是在父节点下的位置，且在节点树变化时会发生变化。

考虑到节点快捷排序的需求，我们会在之后的版本中提供更方便快捷的接口供用户排列节点使用。
