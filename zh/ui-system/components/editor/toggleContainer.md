# ToggleContainer 组件参考

![toggle-container](toggle/toggle-container.png)

ToggleContainer 不是一个可见的 UI 组件，它可以用来修改一组 Toggle 组件的行为。当一组 Toggle 属于同一个 ToggleContainer 的时候，任何时候只能有一个 Toggle 处于选中状态。

> **注意**：所有包含 Toggle 组件的一级子节点都会自动被添加到该容器中

点击 **属性检查器** 下面的 **添加组件** 按钮，然后选择 **UI/ToggleContainer** 即可添加 ToggleContainer 组件到节点上。

ToggleContainer 的组件接口请参考 [ToggleContainer API](__APIDOC__/zh/class/ToggleContainer)。

关于使用可以参考范例 **Toggle**（[GitHub](https://github.com/cocos/cocos-test-projects/tree/v3.5/assets/cases/ui/09.toggle) | [Gitee](https://gitee.com/mirrors_cocos-creator/test-cases-3d/tree/v3.5/assets/cases/ui/09.toggle)）。

## ToggleContainer 属性

| 属性 | 功能说明 |
| :------------- | :---------- |
| AllowSwitchOff | 如果这个设置为 true，那么 toggle 按钮在被点击的时候可以反复地被选中和未选中。 |
| CheckEvents | 选中事件。列表类型，默认为空，用户添加的每一个事件由节点引用，组件名称和一个响应函数组成。 |

## ToggleContainer 事件

事件结构参考：[组件事件结构](./button.md#组件事件结构)

ToggleContainer 的事件回调有二个参数，第一个参数是 Toggle 本身，第二个参数是 customEventData。

## 详细说明

ToggleContainer 一般不会单独使用，它需要与 `Toggle` 配合使用来实现 RadioButton 的单选效果。

## 通过脚本代码添加回调

这种方法添加的事件回调和使用编辑器添加的事件回调是一样的，都是通过代码添加。首先需要构造一个 `EventHandler` 对象，然后设置好对应的 `target`、`component`、`handler` 和 `customEventData` 参数。

```ts
import { _decorator, Component, Event, Node, ToggleContainer, EventHandler } from 'cc';
const { ccclass, property } = _decorator;

@ccclass("example")
export class example extends Component {
    onLoad(){
        const containerEventHandler = new EventHandler();
        containerEventHandler.target = this.node; // 这个 node 节点是你的事件处理代码组件所属的节点
        containerEventHandler.component = 'example';// 这个是脚本类名
        containerEventHandler.handler = 'callback';
        containerEventHandler.customEventData = 'foobar';

        const container = this.node.getComponent(ToggleContainer);
        container.checkEvents.push(containerEventHandler);
    }

    callback(event: Event, customEventData: string) {
        // 这里 event 是一个 Touch Event 对象，你可以通过 event.target 取到事件的发送节点
        // 这里的 customEventData 参数就等于之前设置的 'foobar'
    }
}
```
