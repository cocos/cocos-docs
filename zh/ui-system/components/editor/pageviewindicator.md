# PageViewIndicator 组件参考

PageViewIndicator 用于显示 PageView 当前的页面数量和标记当前所在的页面。

![PageViewIndicator](./pageviewindicator/pageviewindicator.png)

点击 **属性检查器** 下面的 **添加组件** 按钮，然后选择 **UI -> PageViewIndicator** 即可添加 PageViewIndicator 组件到节点上。

PageViewIndicator 的脚本接口请参考 [PageViewIndicator API](__APIDOC__/zh/#/docs/3.3/zh/ui/Class/PageViewIndicator)。

关于使用可以参考范例 **PageView**（[GitHub](https://github.com/cocos-creator/test-cases-3d/tree/v3.0/assets/cases/ui/15.pageview) | [Gitee](https://gitee.com/mirrors_cocos-creator/test-cases-3d/tree/v3.0/assets/cases/ui/15.pageview)）。

## PageViewIndicator 属性

| 属性 |   功能说明 |
| :-------------- | :----------- |
| spriteFrame | 每个页面标记显示的图片 |
| direction | 页面标记摆放方向，分别为 **水平方向** 和 **垂直方向** |
| cellSize | 每个页面标记的大小 |
| spacing | 每个页面标记之间的边距 |

## 详细说明

PageViewIndicator 一般不会单独使用，它需要与 `PageView` 配合使用，可以通过相关属性，来进行创建相对应页面的数量的标记，当你滑动到某个页面的时，PageViewIndicator 就会高亮它对应的标记。
