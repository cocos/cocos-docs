# 使用对象池

> 校对：大城小胖

在运行时进行节点的创建（`cc.instantiate`）和销毁（`node.destroy`）操作是非常耗费性能的，因此我们在比较复杂的场景中，通常只有在场景初始化逻辑（`onLoad`）中才会进行节点的创建，在切换场景时才会进行节点的销毁。如果制作有大量敌人或子弹需要反复生成和被消灭的动作类游戏，我们要如何在游戏进行过程中随时创建和销毁节点呢？这里就需要对象池的帮助了。

## 对象池的概念

对象池就是一组可回收的节点对象，我们通过创建 `cc.NodePool` 的实例来初始化一种节点的对象池。通常当我们有多个 prefab 需要实例化时，应该为每个 prefab 创建一个 `cc.NodePool` 实例。当我们需要创建节点时，向对象池申请一个节点，如果对象池里有空闲的可用节点，就会把节点返回给用户，用户通过 `node.addChild` 将这个新节点加入到场景节点树中。

当我们需要销毁节点时，调用对象池实例的 `put(node)` 方法，传入需要销毁的节点实例，对象池会自动完成把节点从场景节点树中移除的操作，然后返回给对象池。这样就实现了少数节点的循环利用。假如玩家在一关中要杀死 100 个敌人，但同时出现的敌人不超过 5 个，那我们就只需要生成 5 个节点大小的对象池，然后循环使用就可以了。

关于 `cc.NodePool` 的详细 API 说明，请参考 [cc.NodePool API 文档](%__APIDOC__%/zh/classes/NodePool.html)。

## 流程介绍

下面是使用对象池的一般工作流程

### 准备好 Prefab

把你想要创建的节点事先设置好并做成 Prefab 资源，方法请查看 [预制资源工作流程](../asset-workflow/prefab.md)。

### 初始化对象池

在场景加载的初始化脚本中，我们可以将需要数量的节点创建出来，并放进对象池：

```js
//...
properties: {
    enemyPrefab: cc.Prefab
},
onLoad: function () {
    this.enemyPool = new cc.NodePool();
    let initCount = 5;
    for (let i = 0; i < initCount; ++i) {
        let enemy = cc.instantiate(this.enemyPrefab); // 创建节点
        this.enemyPool.put(enemy); // 通过 put 接口放入对象池
    }
}
```

对象池里需要的初始节点数量可以根据游戏的需要来控制，即使我们对初始节点数量的预估不准确也不要紧，后面我们会进行处理。

### 从对象池请求对象

接下来在我们的运行时代码中就可以用下面的方式来获得对象池中储存的对象了：

```js
// ...

createEnemy: function (parentNode) {
    let enemy = null;
    if (this.enemyPool.size() > 0) { // 通过 size 接口判断对象池中是否有空闲的对象
        enemy = this.enemyPool.get();
    } else { // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
        enemy = cc.instantiate(this.enemyPrefab);
    }
    enemy.parent = parentNode; // 将生成的敌人加入节点树
    enemy.getComponent('Enemy').init(); //接下来就可以调用 enemy 身上的脚本进行初始化
}
```

安全使用对象池的要点就是在 `get` 获取对象之前，永远都要先用 `size` 来判断是否有可用的对象，如果没有就使用正常创建节点的方法，虽然会消耗一些运行时性能，但总比游戏崩溃要好！另一个选择是直接调用 `get`，如果对象池里没有可用的节点，会返回 `null`，在这一步进行判断也可以。

### 将对象返回对象池

当我们杀死敌人时，需要将敌人节点退还给对象池，以备之后继续循环利用，我们用这样的方法：

```js
// ...

onEnemyKilled: function (enemy) {
    // enemy 应该是一个 cc.Node
    this.enemyPool.put(enemy); // 和初始化时的方法一样，将节点放进对象池，这个方法会同时调用节点的 removeFromParent
}
```

返还节点时，对象池内部会调用结点的 `removeFromParent(false)` 方法，将对象从父节点中移除，但并不会执行 `cleanup` 操作。这样我们就完成了一个完整的循环，主角需要刷多少怪都不成问题了！将节点放入和从对象池取出的操作不会带来额外的内存管理开销，因此只要是可能，应该尽量去利用。

## 使用组件来处理回收和复用的事件

使用构造函数创建对象池时，可以指定一个组件类型或名称，作为挂载在节点上用于处理节点回收和复用事件的组件。假如我们有一组可点击的菜单项需要做成对象池，每个菜单项上有一个 `MenuItem.js` 组件：

```js
// MenuItem.js
cc.Class({
    extends: cc.Component,

    onLoad: function () {
        this.node.selected = false;
        this.node.on(cc.Node.EventType.TOUCH_END, this.onSelect, this.node);
    },

    unuse: function () {
        this.node.off(cc.Node.EventType.TOUCH_END, this.onSelect, this.node);
    },

    reuse: function () {
        this.node.on(cc.Node.EventType.TOUCH_END, this.onSelect, this.node);
    }
});
```

在创建对象池时可以用：

`let menuItemPool = new cc.NodePool('MenuItem');`

这样当使用 `menuItemPool.get()` 获取节点后，就会调用 `MenuItem` 里的 `reuse` 方法，完成点击事件的注册。当使用 `menuItemPool.put(menuItemNode)` 回收节点后，会调用 `MenuItem` 里的 `unuse` 方法，完成点击事件的反注册。

另外 `cc.NodePool.get()` 可以传入任意数量类型的参数，这些参数会被原样传递给 `reuse` 方法：

```js
// BulletManager.js
let myBulletPool = new cc.NodePool('Bullet'); //创建子弹对象池
...
let newBullet = myBulletPool.get(this); // 传入 manager 的实例，用于之后在子弹脚本中回收子弹

// Bullet.js
reuse (bulletManager) {
    this.bulletManager = bulletManager; // get 中传入的管理类实例
}

hit () {
    // ...
    this.bulletManager.put(this.node); // 通过之前传入的管理类实例回收子弹
}
```

## 清除对象池

如果对象池中的节点不再被需要，我们可以手动清空对象池，销毁其中缓存的所有节点：

```js
myPool.clear(); // 调用这个方法就可以清空对象池
```

当对象池实例不再被任何地方引用时，引擎的垃圾回收系统会自动对对象池中的节点进行销毁和回收。但这个过程的时间点不可控，另外如果其中的节点有被其他地方所引用，也可能会导致内存泄露，所以最好在切换场景或其他不再需要对象池的时候手动调用 `clear` 方法来清空缓存节点。

## 使用 cc.NodePool 的优势

`cc.NodePool` 除了可以创建多个对象池实例，同一个 prefab 也可以创建多个对象池，每个对象池中用不同参数进行初始化，大大增强了灵活性；此外 `cc.NodePool` 针对节点事件注册系统进行了优化，用户可以根据自己的需要自由的在节点回收和复用的生命周期里进行事件的注册和反注册。

而之前的 `cc.pool` 接口是一个单例，无法正确处理节点回收和复用时的事件注册。不再推荐使用。

对象池的基本功能其实非常简单，就是使用数组来保存已经创建的节点实例列表。如果有其他更复杂的需求，你也可以参考 **暗黑斩 Demo 中的 PoolMng 脚本**（[GitHub](https://github.com/cocos/cocos-example-dark-slash/blob/master/assets/scripts/PoolMng.js) | [Gitee](https://gitee.com/mirrors_cocos-creator/tutorial-dark-slash/blob/master/assets/scripts/PoolMng.js)）来实现自己的对象池。

## 使用 cc.NodePool 的注意事项

当获取和返还节点时，`cc.NodePool` 内部会不断地对节点执行 `removeFromParent` 和 `addChild` 操作，当大批量、频繁地操作对象池时（比如制作射击游戏弹幕），可能在低端机器上仍然会引起卡顿。

除了性能问题，不断地执行 `removeFromParent` 和 `addChild` 也会导致节点的默认渲染顺序发生变化。如有必要避免，可以调用 `setSiblingIndex` 修改节点的索引。
