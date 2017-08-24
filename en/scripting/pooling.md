# Pooling

Creating and destroying node and component instance (with `cc.instantiate` and `node.destroy` during runtime is very inefficient and can cause frame rate to drop if there're too many of those going on. We recommend to only create node and component instance in `onLoad` life cycle callback during scene initialization, and only destroy them at scene switching. If we are making a game with lots of dynamically generated and destroyed enemies and bullets, how can we keep the performance cost of instance creating and destroying from messing up our framerate? It would be a perfect case for node pooling to shine.


## Node Pool

Node Pool is a collection of reusable node object. We can use `new cc.NodePool()` to create an instance of Node Pool for a certain node template. If we have multiple prefabs that need to be instantiated, we should create multiple Node Pool instance for each prefab. Whenever we need to instantiate node we will first try to "request" one from Node Pool, the request method `get` will return a node from pool if there's at least one node available. Then we can use `parentNode.addChild(newNode)` to add that into the node tree.

When a node is not needed anymore, we call `put(newNode)` method of our Node Pool instance to return the node to the pool instead of destroy it. This method will also remove the node from its parent, so we don't need to call `removeFromParent` explicitly. Returning nodes to the pool is very important since only this way we can keep the stock of nodes up in our pool for future requesting. If player need to kill 100 enemies to finish the level, but no more than 5 enemies show up at the same time, we can fulfill the design need with a Node Pool that has a total count of 5 and keep recycling enemies.

To learn the detailed API of `cc.NodePool` please read [cc.NodePool API reference](http://www.cocos.com/docs/creator/api/classes/NodePool.html).


## Workflow

Here's the workflow to use Node Pool:

### Create your prefab

First create the node you want to reuse, and save it as a Prefab asset, you can read [Prefab introduction](../asset-workflow/prefab.md) to learn how.


### Create Node Pool instance

We recommend create Node Pool instance(s) in your scene's intialization code block since it will create a bunch of node instances all at once:

```js
//...
properties: {
    enemyPrefab: cc.Prefab
},
onLoad: function () {
    this.enemyPool = new cc.NodePool();
    let initCount = 5;
    for (let i = 0; i < initCount; ++i) {
        let enemy = cc.instantiate(this.enemyPrefab); // create node instance
        this.enemyPool.put(enemy); // populate your pool with putInPool method
    }
}
```

Don't worry if you don't know the exact number of initial nodes count, we can still spawn nodes if it's short on stock during runtime.


### Requesting node from pool

Now we can write code to get nodes from pool:

```js
// ...

createEnemy: function (parentNode) {
    let enemy = null;
    if (this.enemyPool.size() > 0) { // use size method to check if there're nodes available in the pool
        enemy = this.enemyPool.get();
    } else { // if not enough node in the pool, we call cc.instantiate to create node
        enemy = cc.instantiate(this.enemyPrefab);
    }
    enemy.parent = parentNode; // add new enemy node to the node tree
    enemy.getComponent('Enemy').init(); //initialize enemy
}
```

To use Node Pool safely, the key is to always use `size` method to check if there's a node in the pool. We can always create node instance during runtime if needed so there'll be no worry about game breaks. But to reduce node creation overhead you can track the nodes number created during runtime to better adjust your initial node count of the pool.

You can also all `cc.NodePool.get()` directly, if no node available it will return `null`, you can check the return value as well.


### Return node to the pool

When an enemy is killed, we'd want to return the instance to the Node Pool so we can reuse them later:


```js
// ...

onEnemyKilled: function (enemy) {
    // enemy should be a cc.Node instance
    this.enemyPool.put(enemy); // using the same put method as inistalizing node pool, this will also call removeFromParent for the node
}
```

Now we completes the full cycle, and there'll be infinite number of enemy supply without the need to instantiate them over and over. 'Get node from' and 'put node into' operation has very low cost of performance compare to instantiate and destroy. So it's definitely a must-have for most game types.


## Register reuse and unuse callback

When creating a Node Pool instance, we can specify a component as where we want to handle the 'reuse' and 'unuse' callback when we recycling nodes. Let's say we have a group of clickable menu items that we want to get from a Node Pool, each menu item has a `MenuItem.js` component attached:

```js
// MenuItem.js
cc.Class({
    extends: cc.Component,

    onLoad: function () {
        this.node.selected = false;
        this.node.on(cc.Node.EventType.TOUCH_END, this.onSelect.bind(this), this.node);
    },

    unuse: function () {
        this.node.off(cc.Node.EventType.TOUCH_END, this.onSelect.bind(this), this.node);
    },

    reuse: function () {
        this.node.on(cc.Node.EventType.TOUCH_END, this.onSelect.bind(this), this.node);
    }
});
```

When creating the Node Pool instance, we can use:

`let menuItemPool = new cc.NodePool('MenuItem');`

This way when we use `menuItemPool.get()` to get node instance, the `reuse` callback method on requested node's `MenuItem` component will be called.

When we use `menuItemPool.put(menuItemNode)` to return a node to the pool, the `unuse` callback method of `MenuItem` component will be called.

In the above example we use `reuse` and `unuse` method to register and unregister touch event for our menu items. You can also implement your own initialization method.

Also `cc.NodePool.get()` can pass any number and type of argument, these arguments will be passed to `reuse` callback method:

```js
// BulletManager.js
let myBulletPool = new cc.NodePool('Bullet'); //create a pool for bullet
...
let newBullet = myBulletPool.get(this); // pass the manager instance so we can recycle the bullet in its component


// Bullet.js

reuse (bulletManager) {
    this.bulletManager = bulletManager; // store manager reference from argument of get method
}

hit () {
    // ...
    this.bulletManager.put(this.node); // use the manager reference to recyle bullet
}
```


## Clear Node Pool

When we don't need the pool and its nodes anymore, we can clear the pool and destroy every nodes in it:

```js
myPool.clear();
```

When a Node Pool instance is not referenced anywere, the builtin garbage collection system will automatically destroy the Node Pool and its nodes. But auto garbage collection is not managable, also note that if some nodes of the pool is referenced elsewhere it can cause memory leak. It's better to clear the pool before switching scenes or doing other types of reset.


## Advantage of cc.NodePool

`cc.NodePool` can create multiple instances and you can control what nodes to put into each one. So you can use one single Prefab asset for multiple pools, each one with different initialization parameters. `cc.NodePool` also works well with new `cc.Node.on` event register system, users can register and un-register events safely in `reuse` and `unuse` callback.

The old API `cc.pool` is a singleton and cannot handle event register on node correctly, so it **deprecated**.

The basic function of Node Pool is no more than an array to store the reference of a group of instantiated nodes. If you want to customize the behavior of the pool, you can take the example in [Dark Slash PoolMng](https://github.com/cocos-creator/tutorial-dark-slash/blob/master/assets/scripts/PoolMng.js) and make your own pooling mechanics.




