# 组件和组件执行顺序

所有继承自 [Component](__APIDOC__/zh/#/docs/3.4/zh/component/Class/Component) 的类都称为组件类，其对象称为组件，实现了 Cocos Creator 3.0 EC 系统中的组件概念。

**组件类必须是 cc 类**。

```ts
import { Component } from 'cc';

@ccclass("MyComponent")
class MyComponent extends Component {

}
```

## 组件的创建和销毁

组件的生命周期完全由节点操控。与普通类对象不同，组件不能由构造函数创建：

```ts
const component = new MyComponent(); // 错误：组件无法由构造函数创建
```

相反地，组件必须由节点来创建，通过如下方法将组件添加到节点上：

```ts
const myComponent = node.addComponent(MyComponent);
```

当组件不再被需要的时候，可以调用 `node.removeComponent(myComponent)` 移除指定的组件并将其销毁。

```ts
import { Component } from 'cc';

@ccclass("MyComponent")
class MyComponent extends Component {
    constructor () {
        console.log(this.node.name); // 错误：组件并未附加到节点上
    }

    public printNodeName () {
        console.log(this.node.name);
    }
}
```

```ts
const myComponent = node.addComponent(MyComponent);
myComponent.printNodeName(); // 正确
node.removeComponent(myComponent);
myComponent.printNodeName(); // 错误：组件已被该节点移除
```

## 组件执行顺序

### 使用统一的控制脚本来初始化其他脚本

项目中一般会有一个像 `Game.ts` 这样的脚本作为总的控制脚本，而其余脚本，像 `Configuration.ts`、`GameData.ts` 和 `Menu.ts` 三个组件，如果要在 `Game.ts` 里初始化，那么它们的初始化过程是这样的：

```ts
// Game.ts
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

import { Configuration } from './Configuration';
import { GameData } from './GameData';
import { Menu }from './Menu';

@ccclass("Game")
export class Game extends Component {
    private configuration = Configuration;
    private gameData = GameData;
    private menu = Menu;

    onLoad () {
        this.configuration.init();
        this.gameData.init();
        this.menu.init();
    }
}

```

其中在 `Configuration.ts`、`GameData.ts` 和 `Menu.ts` 中需要实现 `init` 方法，并将初始化逻辑放进去。这样就可以保证 Configuration、GameData 和 Menu 的初始化顺序。

### 在 update 中用自定义方法控制更新顺序

同理如果要保证以上三个脚本的每帧更新顺序，也可以将分散在每个脚本里的 `update` 替换成自己定义的方法：

```ts
    //Configuration.ts
    static updateConfig (deltaTime: number) {

    }
```

然后在 `Game.ts` 脚本的 `update` 里调用这些方法：

```ts
    // Game.ts
    update (deltaTime: number) {
        this.configuration.updateConfig(deltaTime);
        this.gameData.updateData(deltaTime);
        this.menu.updateMenu(deltaTime);
    }
```

### 控制同一个节点上的组件执行顺序

在同一个节点上的组件执行顺序，可以通过组件在 **属性检查器** 里的排列顺序来控制，排列在上的组件会先于排列在下的组件执行。可以通过组件右上角的齿轮按钮里的 `Move Up` 和 `Move Down` 菜单来调整组件的排列顺序，即执行顺序。

假如有两个组件 CompA 和 CompB，它们的内容分别是：

```ts
// CompA.ts
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass("CompA")
export class CompA extends Component {

    onLoad () {
        console.log('CompA onLoad!');
    }

    start () {
        console.log('CompA start!');
    }

    update (deltaTime: number) {
        console.log('CompA update!');
    }
}


// CompB.ts
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass("CompB")
export class CompB extends Component {

    onLoad () {
        console.log('CompB onLoad!');
    }

    start () {
        console.log('CompB start!');
    }

    update (deltaTime: number) {
        console.log('CompB update!');
    }
}

```

组件顺序 CompA 在 CompB 上面时，输出：

```
CompA onLoad!
CompB onLoad!
CompA start!
CompB start!
CompA update!
CompB update!
```

在 **属性检查器** 里通过 CompA 组件右上角设置菜单里的 `Move Down` 将 CompA 移到 CompB 下面后，输出：

```
CompB onLoad!
CompA onLoad!
CompB start!
CompA start!
CompB update!
CompA update!
```

### 设置组件执行优先级

如果以上方法还是不能提供所需的控制粒度，还可以直接设置组件的 **executionOrder**。executionOrder 会影响组件生命周期回调执行的优先级。executionOrder 越小，该组件相对其它组件就会越先执行。executionOrder 默认为 0，因此设置为负数的话，就会在其它默认的组件之前执行。设置方法如下：

```ts
//Configuration.ts
import { _decorator, Component, Node } from 'cc';
const { ccclass, executionOrder } = _decorator;

@ccclass("Configuration")
@executionOrder(-1)
export class Configuration extends Component {

    onLoad () {
        console.log('Configuration onLoad!');
    }
}
```

```ts
// Menu.ts
import { _decorator, Component, Node } from 'cc';
const { ccclass, executionOrder } = _decorator;

@ccclass("Menu")
@executionOrder(1)
export class Menu extends Component {

    onLoad () {
        console.log('Menu onLoad!');
    }
}
```

通过如上方法设置，Configuration.ts 的 onLoad 会在 Menu.ts 的 onLoad 方法之前执行。

**注意**：executionOrder 只对 `onLoad`、`onEnable`、`start`、`update` 和 `lateUpdate` 有效，对 `onDisable` 和 `onDestroy` 无效。
