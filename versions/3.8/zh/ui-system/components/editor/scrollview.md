# ScrollView 组件参考

ScrollView 是一种带滚动功能的容器，它提供一种方式可以在有限的显示区域内浏览更多的内容。通常 ScrollView 会与 **Mask** 组件配合使用，同时也可以添加 **ScrollBar** 组件来显示浏览内容的位置。

![scrollview-content](scroll/scrollview-content.png)

![scrollview-inspector](scroll/scrollview-inspector.png)

点击 **属性检查器** 下面的 **添加组件** 按钮，然后选择 **UI/ScrollView** 即可添加 ScrollView 组件到节点上。

滚动视图的脚本接口请参考 [ScrollView API](%__APIDOC__%/zh/class/ScrollView)。

关于使用可以参考范例 **ScrollView**（[GitHub](https://github.com/cocos/cocos-test-projects/tree/v3.8/assets/cases/ui/06.scrollview) | [Gitee](https://gitee.com/mirrors_cocos-creator/test-cases-3d/tree/v3.8/assets/cases/ui/06.scrollview)）。

## ScrollView 属性

| 属性                  | 功能说明     |
| :----------  | :---------  |
| content              | 它是一个节点引用，用来创建 ScrollView 的可滚动内容，通常这可能是一个包含一张巨大图片的节点。                 |
| Horizontal           | 布尔值，是否允许横向滚动。                                                                          |
| Vertical             | 布尔值，是否允许纵向滚动。                                                                          |
| Inertia              | 滚动的时候是否有加速度。                                                                            |
| Brake                | 浮点数，滚动之后的减速系数。取值范围是 0-1，如果是 1 则立马停止滚动，如果是 0，则会一直滚动到 content 的边界。  |
| Elastic              | 布尔值，是否回弹。                                                                                 |
| BounceDuration      | 浮点数，回弹所需要的时间。取值范围是 0-10。                                                            |
| HorizontalScrollBar | 它是一个节点引用，用来创建一个滚动条来显示 content 在水平方向上的位置。                                    |
| VerticalScrollBar   | 它是一个节点引用，用来创建一个滚动条来显示 content 在垂直方向上的位置                                      |
| ScrollEvents    | 列表类型，默认为空，用户添加的每一个事件由节点引用，组件名称和一个响应函数组成。详情见下方的 ScrollView 事件     |
| CancelInnerEvents    | 如果这个属性被设置为 true，那么滚动行为会取消子节点上注册的触摸事件，默认被设置为 true。                      |

### ScrollView 事件

![scrollview-event](scroll/scrollview-event.png)

事件结构参考：[组件事件结构](./button.md#组件事件结构)

ScrollView 的事件回调有两个参数，第一个参数是 ScrollView 本身，第二个参数是 ScrollView 的事件类型。

### ScrollBar 设置

ScrollBar 是可选的，你可以选择只设置 Horizontal ScrollBar 或者 Vertical ScrollBar，当然也可以两者都设置。建立关联可以通过在 **层级管理器** 里面拖拽一个带有 ScrollBar 组件的节点到 ScrollView 的相应字段完成。

## 详细说明

ScrollView 组件必须有指定的 content 节点才能起作用，通过指定滚动方向和 content 节点在此方向上的长度来计算滚动时的位置信息，Content 节点也可以通过添加 `Widget` 设置自动 resize，也可以通过添加 `Layout` 来完成子节点布局，但是这两个组件不应该同时添加到一个节点上以避免产生不可预料的后果。

通常一个 ScrollView 的节点树如下图：

![scrollview-hierarchy](scroll/scrollview-hierarchy.png)

这里的 view 用来定义一个可以显示的滚动区域，所以通常 [Mask 组件](./mask.md) 会被添加到 view 上。可以滚动的内容可以直接放到 content 节点或者添加节 content 的子节点上。

## 通过脚本代码添加回调

### 方法一

这种方法添加的事件回调和使用编辑器添加的事件回调是一样的，都是通过代码添加。首先需要构造一个 `EventHandler` 对象，然后设置好对应的 `target`、`component`、`handler` 和 `customEventData` 参数。

```ts
import { _decorator, Component, ScrollView, EventHandler } from 'cc';
const { ccclass, property } = _decorator;

@ccclass("example")
export class example extends Component {
    onLoad() {
        const scrollViewEventHandler = new EventHandler();
        scrollViewEventHandler.target = this.node; // 这个 node 节点是你的事件处理代码组件所属的节点
        scrollViewEventHandler.component = 'example';// 这个是脚本类名
        scrollViewEventHandler.handler = 'callback';
        scrollViewEventHandler.customEventData = 'foobar';

        const scrollview = this.node.getComponent(ScrollView);
        scrollview.scrollEvents.push(scrollViewEventHandler);
    }

    callback(scrollview, eventType, customEventData){
        // 这里 scrollview 是一个 Scrollview 组件对象实例
        // 这里的 eventType === ScrollView.EventType enum 里面的值
        // 这里的 customEventData 参数就等于你之前设置的 'foobar'
    }
}
```

### 方法二

通过 `scrollview.node.on('scroll-to-top', ...)` 的方式来添加

```js
// 假设我们在一个组件的 onLoad 方法里面添加事件处理回调，在 callback 函数中进行事件处理:
import { _decorator, Component, ScrollView } from 'cc';
const { ccclass, property } = _decorator;

@ccclass("example")
export class example extends Component {
    @property(ScrollView)
    scrollview: ScrollView | null = null;
    onLoad(){
        this.scrollview.node.on('scroll-to-top', this.callback, this);
    }

    callback(scrollView: ScrollView) {
        // 回调的参数是 ScrollView 组件，注意这种方式注册的事件，无法传递 customEventData
    }
}
```

同样的，你也可以注册 `scrolling`、`touch-up`、`scroll-began` 等事件，这些事件的回调函数的参数与 `scroll-to-top` 的参数一致。

关于完整的 ScrollView 的事件列表，可以参考 ScrollView 的 API 文档 [ScrollView API](%__APIDOC__%/zh/class/ScrollView)。
