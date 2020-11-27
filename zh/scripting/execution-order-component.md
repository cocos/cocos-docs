# 组件执行顺序

## 使用统一的控制脚本来初始化其他脚本

项目中一般都会有一个 `Game.ts` 的脚本作为总的控制脚本，假如还有 `Player.ts`、`Enemy.ts` 和 `Menu.ts` 三个组件，那么他们的初始化过程是这样的：

```ts
// Game.ts
import { _decorator, Component, Node } from "cc";
const { ccclass, property } = _decorator;

import { Player } from './Player';
import { Enemy } from './Enemy';
import { Menu }from './Menu';

@ccclass("Game")
export class Game extends Component {

    private player =Player; 
    private enemy =Enemy;
    private menu =Menu;

    onLoad(){
        this.player.init();
        this.enemy.init();
        this.menu.init();
    }
}

```

其中在 `Player.ts`、`Enemy.ts` 和 `Menu.ts` 中需要实现 `init` 方法，并将初始化逻辑放进去。这样我们就可以保证 Player、Enemy 和 Menu 的初始化顺序。

## 在 Update 中用自定义方法控制更新顺序

同理如果要保证以上三个脚本的每帧更新顺序，我们也可以将分散在每个脚本里的 `update` 替换成自己定义的方法：

```ts
//Player.ts
    static updataPlayer(deltaTime: number) {

    }
```

然后在 `Game.ts` 脚本的 `update` 里调用这些方法：

```ts
// Game.ts
    update (deltaTime: number) {
        this.player.updataPlayer(deltaTime);
        this.enemy.updataEnemy(deltaTime);
        this.menu.updateMenu(deltaTime);
    }
```

## 控制同一个节点上的组件执行顺序

在同一个节点上的组件执行顺序，可以通过组件在 **属性检查器** 里的排列顺序来控制。排列在上的组件会先于排列在下的组件执行。我们可以通过组件右上角的齿轮按钮里的 `Move Up` 和 `Move Down` 菜单来调整组件的排列顺序和执行顺序。

假如我们有两个组件 CompA 和 CompB，他们的内容分别是：

```ts
// CompA.ts
import { _decorator, Component, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("CompA")
export class CompA extends Component {

    onLoad(){
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
import { _decorator, Component, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("CompB")
export class CompB extends Component {

    onLoad(){
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

在 **属性检查器** 里通过 CompA 组件右上角齿轮菜单里的 `Move Down` 将 CompA 移到 CompB 下面后，输出：

```
CompB onLoad!
CompA onLoad!
CompB start!
CompA start!
CompB update!
CompA update!
```

## 设置组件执行优先级

如果以上方法还是不能提供所需的控制粒度，还可以直接设置组件的 executionOrder。executionOrder 会影响组件的生命周期回调的执行优先级。设置方法如下：

```ts
//Player.ts
import { _decorator, Component, Node } from "cc";
const { ccclass, executionOrder } = _decorator;

@ccclass("Player")
@executionOrder(-1)
export class Player extends Component {

    onLoad () {
        console.log('Player onLoad!');
    }
}
```

```ts
// Menu.ts
import { _decorator, Component, Node } from "cc";
const { ccclass, executionOrder } = _decorator;

@ccclass("Menu")
@executionOrder(1)
export class Menu extends Component {

    onLoad () {
        console.log('Menu onLoad!');
    }
}
```

executionOrder 越小，该组件相对其它组件就会越先执行。executionOrder 默认为 0，因此设置为负数的话，就会在其它默认的组件之前执行。

executionOrder 只对 `onLoad`、`onEnable`、`start`、`update` 和 `lateUpdate` 有效，对 `onDisable` 和 `onDestroy` 无效。
