# UIStaticBatch 组件参考

UI 静态合批组件是一个提升 UI 渲染性能的组件，脚本在初始化当前帧渲染的过程中会收集该 UI 节点树下的所有渲染数据（除了模型、Mask 和 Graphics），存储为一个静态的 IA 渲染数据。并在后续的渲染流程中使用固定数据进行渲染，不再遍历其节点树，此后的坐标变换将不再生效。当你需要修改静态数据的时候，可以调用 markAsDirty 接口来重新触发渲染数据收集标记。

遮罩的组件接口请参考 [UIStaticBatch API](%__APIDOC__%/zh/classes/ui.uistaticbatch.html)。

关于使用可以参考范例 **UIStaticBatch**（[GitHub](https://github.com/cocos/cocos-test-projects/tree/v3.0/assets/cases/ui/19.static-ui) | [Gitee](https://gitee.com/mirrors_cocos-creator/test-cases-3d/tree/v3.0/assets/cases/ui/19.static-ui)）。

## 通过脚本代码开启静态合批

```ts
import { _decorator, Component } from 'cc';
const { ccclass, property } = _decorator;

@ccclass("example")
export class example extends Component {
    start(){
        const uiStatic = this.node.getComponent(UIStaticBatch);
        // 选择你要开始静态合批的时机，调用此接口开始静态合批
        uiStatic.markAsDirty();
    }
}
```

## 注意事项

使用该组件有以下几点需要注意：

1. 不要频繁触发静态合批，因为会清空原先存储的 IA 数据重新采集，会有一定性能和内存损耗。
2. 不适用于子节点树中包含 Mask、Graphics 和 Model 的情况。
3. 对于节点树不会有任何改变的节点（例如 2D 地图），在 **开始静态合批之后** 即可将所有子节点删除，以得到最好的性能和内存表现。
