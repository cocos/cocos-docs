# UI 变换组件

定义了 UI 上的矩形信息，包括矩形的尺寸和锚点位置。开发者可以通过该组件任意地操作矩形的大小、位置。一般用于渲染、点击事件的计算、界面布局以及屏幕适配等。

点击 **属性检查器** 下面的 **添加组件** 按钮，然后选择 **UI/UITransform** 即可添加 UITransform 组件到节点上。

UITransform 脚本接口请参考 [Mask API](%__APIDOC__%/zh/classes/ui.uitransform.html)。

## UITransform 属性介绍

| 属性 |   功能说明
| :-------------- | :----------- |
| ContentSize | UI 矩形内容尺寸
| AnchorPoint | UI 矩形锚点位置
| Priority | UI 节点优先级，在当前父节点下排序，Canvas 节点顺序不受此属性影响。

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
