# Component Execution Order

## Use a unified control script to initialize other scripts

Generally, developers will have a `Game.ts` script as the overall control script. If there are three components `Player.ts`, `Enemy.ts`, and `Menu.ts`, then their initialization process would look like the following example:

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

Among them, the `init` method needs to be implemented in `Player.ts`, `Enemy.ts` and `Menu.ts`, and the initialization logic is put in it. In this way, it is guaranteed the initialization sequence of `Player`, `Enemy` and `Menu`.

## Use custom methods to control the update sequence in Update

Similarly, we want to ensure the update order of each frame of the above three scripts, we can also replace the `update` scattered in each script with our own defined method:

```ts
// Player.ts
static updataPlayer(deltaTime: number) {

}
```

Then call these methods in the update of the `Game.ts` script:

```ts
// Game.ts
update (deltaTime: number) {
    this.player.updataPlayer(deltaTime);
    this.enemy.updataEnemy(deltaTime);
    this.menu.updateMenu(deltaTime);
}
```

## Control the execution order of components on the same node

The execution order of component scripts on the same node can be controlled by the order of the components in the **Inspector** panel. The components arranged above will be executed before the components arranged below. We can adjust the arrangement order and execution order of the components through the `Move Up` and `Move Down` menus in the gear button at the upper right corner of the component.

If there are two components: `CompA` and `CompB`, their contents may be similar to this example:

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

When `CompA` is above `CompB` on the inspector panel, the output may be this way:

```
CompA onLoad!
CompB onLoad!
CompA start!
CompB start!
CompA update!
CompB update!
```

When the component sequence `CompA` is above `CompB`, the output may be this way:

```
CompB onLoad!
CompA onLoad!
CompB start!
CompA start!
CompB update!
CompA update!
```

## Set component execution priority

If the above method still cannot provide the required control granularity, developers can also directly set the `executionOrder` of the component. `executionOrder` affects the execution priority of the component's life cycle callback. Example:

```ts
// Player.ts
import { _decorator, Component, Node } from "cc";
const { ccclass, executionOrder } = _decorator;

@ccclass("Player")
@executionOrder(-1)
export class Player extends Component {

    onLoad() {
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

> **Note**: the smaller the `executionOrder`, the earlier the component will be executed relative to other components. The `executionOrder` defaults to `0`, so if it is set to a negative number, it will execute before other default components. 

> **Note**: `executionOrder` is only valid for `onLoad`, `onEnable`, `start`, `update` and `lateUpdate`, but not valid for `onDisable` and `onDestroy`.
