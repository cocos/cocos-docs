# UIStaticBatch Component References

The UIStaticBatch component is used to improve UI rendering performance. The script will collect all the rendering data under the UI node tree (except Model, Mask, and Graphic) during the initialization of the current frame rendering and store it as a static input assembler(IA) rendering data. And rendering with fixed data in the subsequent rendering process, no longer traversing its node tree, after which the coordinate transformation will no longer take effect.

To use `UIStaticBatch`, please refer to the [UIStaticBatch API](__APIDOC__/en/#/docs/3.3/en/ui/Class/UIStaticBatch) documentation and the [UIStaticBatch](https://github.com/cocos/cocos-test-projects/tree/v3.3/assets/cases/ui/19.static-ui) scene of the test-cases-3d project.

## Enable static batching through script code

Example:

```ts
import { _decorator, Component } from 'cc';
const { ccclass, property } = _decorator;

@ccclass("example")
export class example extends Component {
    start(){
        const uiStatic = this.node.getComponent(UIStaticBatch);
        // Choose the time you want to start static batching, call this interface to start static batching
        uiStatic.markAsDirty();
    }
}
```

## Detailed Explanation

The following points need to be noted when using this component:

- Do not trigger static batches frequently, as the original stored IA data will be emptied and re-collected, resulting in some performance and memory loss.
- Not applicable for child node tree which contains Mask, Graphic and Model.
- For a node that will not have any changes in the node tree (e.g.: 2D Map), all child nodes can be deleted after data collection to get the best performance and memory performance.
