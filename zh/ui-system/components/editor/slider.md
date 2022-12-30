# Slider 组件参考

Slider 是一个滑动器组件。

![slider-inspector](slider/slider-inspector.png)

点击 **属性检查器** 下面的 **添加组件** 按钮，选择 **UI -> Slider** 即可添加 Slider 组件到节点上。也可以直接在 **层级管理器** 中点击右上角的 **+** 按钮，然后选择 **UI 组件 -> Slider** 创建一个 Slider 节点。

滑动器的脚本接口请参考 [Slider API](__APIDOC__/zh/#/docs/3.4/zh/ui/Class/Slider)。

关于使用可以参考范例 **Slider**（[GitHub](https://github.com/cocos/cocos-test-projects/tree/v3.4/assets/cases/ui/10.slider) | [Gitee](https://gitee.com/mirrors_cocos-creator/test-cases-3d/tree/v3.4/assets/cases/ui/10.slider)）。

## Slider 属性

| 属性           | 功能说明                                                 |
| :------------- | :----------                                            |
| handle         | 滑块按钮部件，可以通过该按钮进行滑动调节 Slider 数值大小       |
| direction      | 滑动器的方向，分为横向和竖向                                |
| progress       | 当前进度值，该数值的区间是 0-1 之间                         |
| slideEvents    | 滑动器组件事件回调函数                                     |

## Slider 事件

![slider-event](slider/slider-event.png)

事件结构参考：[组件事件结构](./button.md#组件事件结构)

Slider 的事件回调有两个参数，第一个参数是 Slider 本身，第二个参数是 CustomEventData

## 详细说明

Slider 通常用于调节 UI 的数值（例如音量调节），它主要的部件是一个滑块按钮，该部件用于用户交互，通过该部件可进行调节 Slider 的数值大小。

通常一个 Slider 的节点树如下图：

![slider-hierarchy](slider/slider-hierarchy.png)

## 通过脚本代码添加回调

### 方法一

这种方法添加的事件回调和使用编辑器添加的事件回调是一样的，都是通过代码添加。首先需要构造一个 `EventHandler` 对象，然后设置好对应的 `target`、`component`、`handler` 和 `customEventData` 参数。

```ts
import { _decorator, Component, Event, Node, Slider, EventHandler } from 'cc';
const { ccclass, property } = _decorator;

@ccclass("example")
export class example extends Component {

    onLoad () {
        const sliderEventHandler = new EventHandler();
        // 这个 node 节点是事件处理脚本组件所属的节点
        sliderEventHandler.target = this.node; 
        // 这个是脚本类名
        sliderEventHandler.component = 'example';
        sliderEventHandler.handler = 'callback';
        sliderEventHandler.customEventData = 'foobar';

        const slider = this.node.getComponent(Slider);
        slider!.slideEvents.push(sliderEventHandler);
    }

    callback(slider: Slider, customEventData: string) {
        //这里 event 是一个 Touch Event 对象，你可以通过 event.target 取到事件的发送节点
        // 这里的 customEventData 参数就等于之前设置的 'foobar'
    }
}
```

### 方法二

通过 `slider.node.on('slide', ...)` 的方式来添加

```ts
// 假设我们在一个组件的 onLoad 方法里面添加事件处理回调，在 callback 函数中进行事件处理

import { _decorator, Component, Slider } from 'cc';
const { ccclass, property } = _decorator;

@ccclass("example")
export class example extends Component {

    @property(Slider)
    slider: Slider | null = null;

    onLoad () {
       this.slider!.node.on('slide', this.callback, this);
    }

    callback(slider: Slider) {
        // 回调的参数是 slider 组件，注意这种方式注册的事件，无法传递 customEventData
    }
}
```
