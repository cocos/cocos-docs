# Toggle 组件参考

Toggle 是一个 CheckBox，当它和 ToggleContainer 一起使用的时候，可以变成 RadioButton。

![toggle1](toggle/toggle.png)

点击 **属性检查器** 下面的 **添加组件** 按钮，然后选择 **UI/Toggle** 即可添加 Toggle 组件到节点上。

Toggle 的组件接口请参考 [Toggle API](__APIDOC__/zh/class/Toggle)。

关于使用可以参考范例 **Toggle**（[GitHub](https://github.com/cocos/cocos-test-projects/tree/v3.7/assets/cases/ui/09.toggle) | [Gitee](https://gitee.com/mirrors_cocos-creator/test-cases-3d/tree/v3.7/assets/cases/ui/09.toggle)）。

## Toggle 属性

| 属性           | 功能说明     |
| :------------- | :----------   |
| isChecked      | 布尔类型，如果这个设置为 true，则 check mark 组件会处于 enabled 状态，否则处于 disabled 状态。 |
| checkMark      | Sprite 类型，Toggle 处于选中状态时显示的图片  |
| Check Events   | 列表类型，默认为空，用户添加的每一个事件由节点引用，组件名称和一个响应函数组成。详情见下方的 **Toggle 事件** 部分  |

> **注意**：因为 Toggle 继承自 Button，所以关于 Toggle 的 Button 相关属性的详细说明和用法请参考 [Button 组件](button.md)。

## Toggle 事件

事件结构参考：[组件事件结构](./button.md#组件事件结构)。

Toggle 的事件回调有二个参数，第一个参数是 Toggle 本身，第二个参数是 customEventData。

## 详细说明

Toggle 组件的节点树一般为：

![toggle-node-tree](toggle/toggle-node-tree.png)

> **注意**：checkMark 组件所在的节点需要放在 background 节点的上面。

## 通过脚本代码添加回调

### 方法一

这种方法添加的事件回调和使用编辑器添加的事件回调是一样的，都是通过代码添加。首先需要构造一个 `EventHandler` 对象，然后设置好对应的 `target`、`component`、`handler` 和 `customEventData` 参数。

```ts
import { _decorator, Component, Event, Node, ToggleComponent, EventHandler } from 'cc';
const { ccclass, property } = _decorator;

@ccclass("example")
export class example extends Component {
    onLoad(){
        const checkEventHandler = new EventHandler();
        checkEventHandler.target = this.node; //这个 node 节点是你的事件处理代码组件所属的节点
        checkEventHandler.component = 'example';//这个是脚本类名
        checkEventHandler.handler = 'callback';
        checkEventHandler.customEventData = 'foobar';

        const toggle = this.node.getComponent(ToggleComponent);
        toggle.checkEvents.push(checkEventHandler);
    }

    callback(event: Event, customEventData: string){
        //这里 event 是一个 Touch Event 对象，你可以通过 event.target 取到事件的发送节点
        // 这里的 customEventData 参数就等于之前设置的 'foobar'
    }
}
```

### 方法二

通过 `toggle.node.on('toggle', ...)` 的方式来添加

```js
// 假设我们在一个组件的 onLoad 方法里面添加事件处理回调，在 callback 函数中进行事件处理

import { _decorator, Component, ToggleComponent } from 'cc';
const { ccclass, property } = _decorator;

@ccclass("example")
export class example extends Component {
    @property(ToggleComponent)
    toggle: ToggleComponent | null = null;
    onLoad(){
       this.toggle.node.on('toggle', this.callback, this);
    }

    callback(toggle: ToggleComponent){
        // 回调的参数是 toggle 组件，注意这种方式注册的事件，无法传递 customEventData
    }
}
```
