# Components and Component Execution Order

All classes inherited from [Component](__APIDOC__/en/class/Component) are called __Component Classes__. The objects in a __Component Class__ are called __Components__. __Components__ are implement according to the __Cocos Creator__ __Entity Component (EC)__ system.

The component class must inherit from a `cc` class. Example:

```ts
import { Component } from 'cc';

@ccclass("MyComponent")
class MyComponent extends Component {

}
```

## Component creation and destruction

The life cycle of a component is completely controlled by the node. Unlike ordinary class objects, components cannot be created by constructors:

```ts
const component = new MyComponent(); // Error: The component cannot be created by the constructor
```

In contrast, __components__ must be created by nodes and added to nodes as follows

```ts
const myComponent = node.addComponent(MyComponent);
```

When the component is no longer needed, call the `node.removeComponent(myComponent)` method to remove the specified component and destroy it. Example:

```ts
import { Component } from 'cc';

@ccclass("MyComponent")
class MyComponent extends Component {
    constructor () {
        console.log(this.node.name); // Error: The component is not attached to the node
    }

    public printNodeName () {
        console.log(this.node.name);
    }
}
```

```ts
const myComponent = node.addComponent(MyComponent);
myComponent.printNodeName(); // Correct
node.removeComponent(myComponent);
myComponent.printNodeName(); // Error: The component is not attached to the node
```

## Component execution order

### Use a unified control script to initialize other scripts

Generally, developers will have a `Game.ts` script as the overall control script. If there are three components `Configuration.ts`, `GameData.ts`, and `Menu.ts`, then their initialization process would look like the following example:

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

Among them, the `init` method needs to be implemented in `Configuration.ts`, `GameData.ts` and `Menu.ts`, and the initialization logic is put in it. In this way, it is guaranteed the initialization sequence of `Configuration`, `GameData` and `Menu`.

### Use custom methods to control the update sequence in Update

Similarly, it is necessary to ensure the update order of each frame of the above three scripts, we can also replace the `update` scattered in each script with our own defined method:

```ts
// Configuration.ts
    static updateConfig (deltaTime: number) {

    }
```

Then call these methods in the update of the `Game.ts` script:

```ts
// Game.ts
update (deltaTime: number) {
    this.configuration.updateConfig(deltaTime);
    this.gameData.updateData(deltaTime);
    this.menu.updateMenu(deltaTime);
}
```

### Control the execution order of components on the same node

The execution order of component scripts on the same node can be controlled by the order of the components in the **Inspector** panel. The components arranged above will be executed before the components arranged below. We can adjust the arrangement order and execution order of the components through the `Move Up` and `Move Down` menus in the gear button at the upper right corner of the component.

If there are two components: `CompA` and `CompB`, their contents may be similar to this example:

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

When `CompA` is above `CompB` on the **Inspector** panel, the output may be this way:

```
CompA onLoad!
CompB onLoad!
CompA start!
CompB start!
CompA update!
CompB update!
```

After moving CompA under CompB in **Inspector** by `Move Down` in the upper right corner of the CompA component settings menu, the output may be this way:

```
CompB onLoad!
CompA onLoad!
CompB start!
CompA start!
CompB update!
CompA update!
```

### Set component execution priority

If the above method still cannot provide the required control granularity, developers can also directly set the `executionOrder` of the component. `executionOrder` affects the execution priority of the component's life cycle callback. The smaller the `executionOrder`, the earlier the component will be executed relative to other components. The `executionOrder` defaults to `0`, so if it is set to a negative number, it will execute before other default components. Example:

```ts
// Configuration.ts
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

By setting it as above, `Configuration.ts`'s `onLoad` will be executed before `Menu.ts`'s onLoad method.

> **Note**: `executionOrder` is only valid for `onLoad`, `onEnable`, `start`, `update` and `lateUpdate`, but not valid for `onDisable` and `onDestroy`.
