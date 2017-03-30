# PageviewIndicator 组件参考

PageviewIndicator 用于显示 PageView 当前的页面数量和标记当前所在的页面。

![pageviewindicator.png](./pageviewindicator/pageviewindicator.png)

点击**属性检查器**下面的`添加组件`按钮，然后从`添加 UI 组件`中选择 `PageviewIndicator`，即可添加 PageviewIndicator 组件到节点上。

PageviewIndicator 的脚本接口请参考[PageviewIndicator API](../api/classes/PageviewIndicator.html)。

## PageviewIndicator 属性

| 属性 |   功能说明
| -------------- | ----------- |
| spriteFrame | 每个页面标记显示的图片
| direction | 页面标记摆放方向，分别为 水平方向 和 垂直方向
| cellSize | 每个页面标记的大小
| spacing | 每个页面标记之间的边距


## 详细说明

PageviewIndicator 一般不会单独使用，它需要与 `PageView` 配合使用，可以通过相关属性，来进行创建相对应页面的数量的标记，当你滑动到某个页面的时，PageviewIndicator 就会高亮它对应的标记