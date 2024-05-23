# 访问节点和组件

你可以在 **属性检查器** 里修改节点和组件，也能在脚本中动态修改。动态修改的好处是能够在一段时间内连续地修改属性、过渡属性，实现渐变效果。脚本还能够响应玩家输入，能够修改、创建和销毁节点或组件，实现各种各样的游戏逻辑。要实现这些效果，你需要先在脚本中获得你要修改的节点或组件。

在本篇教程，我们将介绍如何

- 获得组件所在的节点
- 获得其它组件
- 使用 **属性检查器** 设置节点和组件
- 查找子节点
- 全局节点查找
- 访问已有变量里的值

## 获得组件所在的节点

获得组件所在的节点很简单，只要在组件方法里访问 `this.node` 变量：

```ts
start() {
    let node = this.node;
    node.setPosition(0.0, 0.0, 0.0);
}
```

## 获得其它组件

如果你经常需要获得同一个节点上的其它组件，这就要用到 `getComponent` 这个 API，它会帮你查找你要的组件。

```ts
import { _decorator, Component, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass("test")
export class test extends Component {
    private label: any = null

    start() {
        this.label = this.getComponent(Label);
        let text = this.name + 'started';
        // Change the text in Label Component
        this.label.string = text;
    }
}
```

你也可以为 `getComponent` 传入一个类名。对用户定义的组件而言，类名就是脚本的文件名，并且 **区分大小写**。例如 "SinRotate.ts" 里声明的组件，类名就是 "SinRotate"。

```ts
let rotate = this.getComponent("SinRotate");
```

在节点上也有一个 `getComponent` 方法，它们的作用是一样的：

```ts
start() {
    console.log( this.node.getComponent(Label) === this.getComponent(Label) );  // true
}
```

如果在节点上找不到你要的组件，`getComponent` 将返回 null，如果你尝试访问 null 的值，将会在运行时抛出 "TypeError" 这个错误。因此如果你不确定组件是否存在，请记得判断一下：

```ts
import { _decorator, Component, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass("test")
export class test extends Component {
    private label: any = null;

    start() {
        this.label = this.getComponent(Label);
        if (this.label) {
            this.label.string = "Hello";
        } else {
            console.error("Something wrong?");
        }
    }
}
```

## 获得其它节点及其组件

仅仅能访问节点自己的组件通常是不够的，脚本通常还需要进行多个节点之间的交互。例如，一门自动瞄准玩家的大炮，就需要不断获取玩家的最新位置。Cocos Creator 提供了一些不同的方法来获得其它节点或组件。

### 利用属性检查器设置节点

最直接的方式就是在 **属性检查器** 中设置你需要的对象。以节点为例，这只需要在脚本中声明一个 type 为 `Node` 的属性：

```ts
// Cannon.ts

import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass("Cannon")
export class Cannon extends Component {
    // 声明 Player 属性
    @property({ type: Node })
    private player = null;
}

```

这段代码在 `properties` 里面声明了一个 `player` 属性，默认值为 null，并且指定它的对象类型为 `Node`。这就相当于在其它语言里声明了 `public Node player = null;`。脚本编译之后，这个组件在 **属性检查器** 中看起来是这样的：

![player-in-inspector-null](access-node-component/player-in-inspector-null.png)

接着你就可以将层级管理器上的任意一个节点拖到这个 Player 控件：

![player-in-inspector](access-node-component/player-in-inspector.png)

这样一来它的 player 属性就会被设置成功，你可以直接在脚本里访问 player：

```ts
// Cannon.ts

import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass("Cannon")
export class Cannon extends Component {

    @property({ type: Node })
    private player = null;

    start() {
        console.log('The player is ' + this.player.name);
    }
}
```

### 利用属性检查器设置组件

在上面的例子中，如果你将属性的 type 声明为 Player 组件，当你拖动节点 "Player Node" 到 **属性检查器**，player 属性就会被设置为这个节点里面的 Player 组件。这样你就不需要再自己调用 `getComponent` 啦。

```ts
// Cannon.ts

import { _decorator, Component } from 'cc';
const { ccclass, property } = _decorator;
import { Player } from "Player";

@ccclass("Cannon")
export class Cannon extends Component {
    @property({ type: Player })
    private player = null;

    start() {
        let PlayerComp = this.player;
    }
}
```

你还可以将属性的默认值由 `null` 改为数组 `[]`，这样你就能在 **属性检查器** 中同时设置多个对象。<br>
不过如果需要在运行时动态获取其它对象，还需要用到下面介绍的查找方法。

### 查找子节点

有时候，游戏场景中会有很多个相同类型的对象，像是炮塔、敌人和特效，它们通常都有一个全局的脚本来统一管理。如果用 **属性检查器** 来一个一个将它们关联到这个脚本上，那工作就会很繁琐。为了更好地统一管理这些对象，我们可以把它们放到一个统一的父物体下，然后通过父物体来获得所有的子物体：

```ts
// CannonManager.ts

import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass("CannonManager")
export class CannonManager extends Component {

    start() {
        let cannons = this.node.children;
        //...
    }

}
```

你还可以使用 `getChildByName`：

```ts
this.node.getChildByName("Cannon 01");
```

如果子节点的层次较深，你还可以使用 `find`，`find` 将根据传入的路径进行逐级查找：

```ts
find("Cannon 01/Barrel/SFX", this.node);
```

### 全局名字查找

当 `find` 只传入第一个参数时，将从场景根节点开始逐级查找：

```ts
this.backNode = find("Canvas/Menu/Back");
```

## 访问已有变量里的值

如果你已经在一个地方保存了节点或组件的引用，你也可以直接访问它们

### 通过模块访问

你可以使用 `import` 来实现脚本的跨文件操作，让我们看个示例：

```ts
// Global.ts, now the filename matters
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass("Global")
export class Global extends Component {

    public static backNode: any = null;
    public static backLabel: any = null;
}
```

每个脚本都能用 `import{ } from` + 文件名(不含路径) 来获取到对方 exports 的对象。

```ts
// Back.ts
import { _decorator, Component, Node, Label } from 'cc';
const { ccclass, property } = _decorator;
// this feels more safe since you know where the object comes from
import{Global}from "./Global";

@ccclass("Back")
export class Back extends Component {
    onLoad() {
        Global.backNode = this.node;
        Global.backLabel = this.getComponent(Label);
    }
}
```

```ts
// AnyScript.ts
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
// this feels more safe since you know where the object comes from
import{Global}from "./Global";

@ccclass("AnyScript")
export class AnyScript extends Component {
    start () {
        const text = "Back";
        Global.backLabel.string = text;
    }
}
```
