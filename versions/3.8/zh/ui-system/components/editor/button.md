# Button（按钮）组件简介

![button.png](./button/button.png)

![button-color](./button/button-color.png)

Button 组件通常是一个 2D 按钮交互组件，负责在游戏界面中响应用户的屏幕点击。组件不具备渲染能力，通常 Button 节点会添加 Sprite 组件节点以及 Label 组件节点作为按钮背景和按钮标签。按顺序通过以下步骤可以在场景中快速创建一个交互按钮。

## 创建一个有点击过渡变化效果的按钮

1. 添加 Button：为场景中已添加 Canvas 组件的节点添加一个子节点，并设置它的 Layer 属性为 `Layers.Enum.UI_2D`，最后为这个子节点添加一个 Button 组件。

2. 设置 Button 的宽高：设置 Button 节点的 UITransform 组件的 contentSize 属性的 width 和 height 值。

3. 添加 Button 的背景颜色：在 Button 节点中添加一个 Sprite 组件用于渲染背景，并且设置 Sprite 组件的 sizeMode 为 custom 以及使用 internal 内置资源库的 default_ui 文件夹中的 default_sprite_splash.png 的 spriteFrame 资源作为 Sprite 组件的 spriteFrame。

4. 设置 Button 的背景宽高：Button 的背景宽高需要与 Button 的宽高一致。将 Button 节点的 UITransform 组件的 contentSize 属性值设置为已添加 Sprite 组件的子节点的 UITransform 组件的 contentSize 属性值。

5. 添加 Button 的标签：在 Button 节点中添加一个 UI 子节点，并添加一个 Label 组件，以及设置 Label 组件的 string 属性。

6. 设置 Button 的交互效果：设置 Button 组件的 transition 属性。

## 编辑器内手动添加 Button 组件

点击 **属性检查器** 下面的 **添加组件** 按钮，然后从 **添加 UI 组件** 中选择 **Button**，即可添加 Button 组件到节点上。

## Button 属性

| 属性                 | 功能说明             |
| :-------------       | :----------        |
| Target               | Node 类型，当 Button 发生 Transition 的时候，会相应地修改 Target 节点的 SpriteFrame，颜色或者 Scale。                      |
| Interactable         | 布尔类型，设为 false 时，则 Button 组件进入禁用状态。                                                                    |
| Transition           | 枚举类型，包括 NONE、COLOR、SPRITE 和 SCALE。每种类型对应不同的 Transition 设置。详情见下方的 **Button Transition** 部分。    |
| Click Event          | 列表类型，默认为空，用户添加的每一个事件由节点引用，组件名称和一个响应函数组成。详情见下方的 **Button 点击事件** 部分。                 |

### Button Transition

Button 的 Transition 用来指定当用户点击 Button 时的状态表现。目前主要有 NONE、COLOR、SPRITE 和 SCALE。

![transition](button/transition.png)

#### Color Transition

![color-transition](button/color-transition.png)

| 属性            | 功能说明                         |
| :------------- | :----------                     |
| Normal         | Button 在 Normal 状态下的颜色。    |
| Pressed        | Button 在 Pressed 状态下的颜色。   |
| Hover          | Button 在 Hover 状态下的颜色。     |
| Disabled       | Button 在 Disabled 状态下的颜色。  |
| Duration       | Button 状态切换需要的时间间隔。      |

#### Sprite Transition

![sprite-transition](button/sprite-transition.png)

| 属性            | 功能说明                                 |
| :------------- | :----------                             |
| Normal         | Button 在 Normal 状态下的 SpriteFrame。   |
| Pressed        | Button 在 Pressed 状态下的 SpriteFrame。  |
| Hover          | Button 在 Hover 状态下的 SpriteFrame。    |
| Disabled       | Button 在 Disabled 状态下的 SpriteFrame。 |

#### Scale Transition

![scaleTransition](button/scaleTransition.png)

| 属性            | 功能                                                                                       |
| :------------- | :----------                                                                                |
| Duration       | Button 状态切换需要的时间间隔。                                                                |
| ZoomScale      | 当用户点击按钮后，按钮会缩放到一个值，这个值等于 Button 原始 **scale * zoomScale**，zoomScale 可以为负数  |

### Button 点击事件

Button 目前只支持 Click 事件，即当用户点击并释放 Button 时才会触发相应的回调函数。

### 组件事件结构

![button-event](button/button-event.png)

| 属性             | 功能说明                                           |
| :-------------  | :----------                                       |
| Target          | 带有脚本组件的节点。                                  |
| Component       | 脚本组件名称。                                       |
| Handler         | 指定一个回调函数，当用户点击 Button 并释放时会触发此函数。 |
| CustomEventData | 用户指定任意的字符串作为事件回调的最后一个参数传入。       |

### 通过脚本代码添加回调

#### 方法一

这种方法添加的事件回调和使用编辑器添加的事件回调是一样的，都是通过代码添加。首先需要构造一个 `EventHandler` 对象，然后设置好对应的 `target`、`component`、`handler` 和 `customEventData` 参数。

```ts
import { _decorator, Component, Event, Node, Button, EventHandler } from 'cc';
const { ccclass, property } = _decorator;

@ccclass("example")
export class example extends Component {
    onLoad () {
        const clickEventHandler = new EventHandler();
        clickEventHandler.target = this.node; // 这个 node 节点是你的事件处理代码组件所属的节点
        clickEventHandler.component = 'example';// 这个是脚本类名
        clickEventHandler.handler = 'callback';
        clickEventHandler.customEventData = 'foobar';

        const button = this.node.getComponent(Button);
        button.clickEvents.push(clickEventHandler);
    }

    callback (event: Event, customEventData: string) {
        // 这里 event 是一个 Touch Event 对象，你可以通过 event.target 取到事件的发送节点
        const node = event.target as Node;
        const button = node.getComponent(Button);
        console.log(customEventData); // foobar
    }
}
```

#### 方法二

通过 `button.node.on('click', ...)` 的方式来添加，这是一种非常简便的方式，但是该方式有一定的局限性，在事件回调里面无法
获得当前点击按钮的屏幕坐标点。

```ts
// 假设我们在一个组件的 onLoad 方法里面添加事件处理回调，在 callback 函数中进行事件处理

import { _decorator, Component, Button } from 'cc';
const { ccclass, property } = _decorator;

@ccclass("example")
export class example extends Component {
    @property(Button)
    button: Button | null = null;
    onLoad () {
        this.button.node.on(Button.EventType.CLICK, this.callback, this);
    }

    callback (button: Button) {
        // 注意这种方式注册的事件，无法传递 customEventData
    }
}
```

#### API 文档

按钮的脚本接口请参考 [Button API](%__APIDOC__%/zh/class/Button)。
