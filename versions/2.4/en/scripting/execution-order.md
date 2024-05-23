# Script execution order

## Use a unified control script to initialize other scripts

In general, I will have a script `Game.js` as the overall control script, and if I have three scripts, such as `Player.js`, `Enemy.js`, `Menu.js`, then their initialization process is like this of:

```js
// Game.js

const Player = require('Player');
const Enemy = require('Enemy');
const Menu = require('Menu');

cc.Class({
    extends: cc.Component,
    properties: {
        player: Player,
        enemy: Enemy,
        menu: Menu
    },

    onLoad: function () {
        this.player.init();
        this.enemy.init();
        this.menu.init();
    }
});
```

In the `Player.js`, `Enemy.js` and `Menu.js`, you need to implement an `init` method and put the initialization logic into it. So that we can guarantee Player, Enemy and Menu initialization sequence.

## Use the custom method to control the update order in 'update'

Similarly, if you want to ensure the update order of above three scripts, we can also replace the `update` scattered in each script with our own definition of the method:

```js
// Player.js
    updatePlayer: function (dt) {
        // do player update
    }
```

And then call these methods in the `update` of `Game.js` script:

```js
// Game.js
    update: function (dt) {
        this.player.updatePlayer(dt);
        this.enemy.updateEnemy(dt);
        this.menu.updateMenu(dt);
    }
```

## Controls the order in which components are executed on the same node

The sequence of component scripts executed on the same node can be controlled by the order in which the components are in the **Properties**. The components that are arranged above are executed before the components that are arranged below. We can adjust the order of the components and the order in which they are executed by the `Move Up` and `Move Down` menus in the gear button in the upper right corner of the component.

If we have two components CompA and CompB, their contents are:

```js
// CompA.js
cc.Class({
    extends: cc.Component,

    onLoad: function () {
        cc.log('CompA onLoad!');
    },

    start: function () {
        cc.log('CompA start!');
    },

    update: function (dt) {
        cc.log('CompA update!');
    },
});

// CompB.js
cc.Class({
    extends: cc.Component,

    onLoad: function () {
        cc.log('CompB onLoad!');
    },

    start: function () {
        cc.log('CompB start!');
    },

    update: function (dt) {
        cc.log('CompB update!');
    },
});
```

When CompA is above CompB, it will output:

```
CompA onLoad!
CompB onLoad!
CompA start!
CompB start!
CompA update!
CompB update!
```

In the **Properties**, by clicking `Move Down` in the gear menu in the upper right corner of the CompA component to move CompA down to CompB, it will output:

```
CompB onLoad!
CompA onLoad!
CompB start!
CompA start!
CompB update!
CompA update!
```

## Set execution order for each kind of Component

If the above methods still can not provide the required fine grained control, you can also set the `executionOrder` of the component directly. The `executionOrder` affects the execution priority of the life cycle callbacks for component. Set as follows:

```js
// Player.js

cc.Class({
    extends: cc.Component,
    editor: {
        executionOrder: -1
    },

    onLoad: function () {
        cc.log('Player onLoad!');
    }
});
```

```js
// Menu.js

cc.Class({
    extends: cc.Component,
    editor: {
        executionOrder: 1
    },

    onLoad: function () {
        cc.log('Menu onLoad!');
    }
});
```

The smaller the `executionOrder` is, the earlier the component executes relative to the other components. The `executionOrder` defaults to 0, so if set to negative, it will execute before the other default components.

The `executionOrder` will only affect `onLoad`, `onEnable`, `start`, `update` and `lateUpdate` while `onDisable` and `onDestroy` will not be affected.
