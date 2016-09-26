# 脚本执行顺序

完善的脚本执行顺序控制将在新版本中添加，目前请使用下面的原则控制脚本执行顺序：

## 使用统一的控制脚本来初始化其他脚本

一般我都会有一个 `Game.js` 的脚本作为总的控制脚本，假如我还有 `Player.js`, `Enemy.js`, `Menu.js` 三个组件，那么他们的初始化过程是这样的：

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

其中在 `Player.js`, `Enemy.js` 和 `Menu.js` 中需要实现 `init` 方法，并将初始化逻辑放进去。这样我们就可以保证 Player, Enemy 和 Menu 的初始化顺序。

## 在 Update 中用自定义方法控制更新顺序

同理如果要保证以上三个脚本的每帧更新顺序，我们也可以将分散在每个脚本里的 `update` 替换成自己定义的方法：

```js
// Player.js
    updatePlayer: function (dt) {
        // do player update
    }
```

然后在 `Game.js` 脚本的 `update` 里调用这些方法：

```js
// Game.js
    update: function (dt) {
        this.player.updatePlayer(dt);
        this.enemy.updateEnemy(dt);
        this.menu.updateMenu(dt);
    }
```

## 控制同一个节点上的组件执行顺序

在同一个节点上的组件脚本执行顺序，是可以通过组件在 **属性检查器** 里的排列顺序来控制的。排列在上的组件会先于排列在下的组件执行。我们可以通过组件右上角的齿轮按钮里的 `Move Up` 和 `Move Down` 菜单来调整组件的排列顺序和执行顺序。

假如我们有两个组件 CompA 和 CompB，他们的内容分别是：

```js
// CompA.js
cc.Class({
    extends: cc.Component,

    // use this for initialization
    onLoad: function () {
        cc.log('CompA onLoad!');
    },

    start: function () {
        cc.log('CompA start!');
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        cc.log('CompA update!');
    },
});
// CompB.js
cc.Class({
    extends: cc.Component,

    // use this for initialization
    onLoad: function () {
        cc.log('CompB onLoad!');
    },

    start: function () {
        cc.log('CompB start!');
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        cc.log('CompB update!');
    },
});
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
