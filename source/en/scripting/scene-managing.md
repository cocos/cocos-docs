# Scene Managing

In Cocos Creator we use scene filename (without extension) to index scenes, and use the following API to load and switch scene:

```js
cc.director.loadScene("MyScene");
```

## Use persist node to managing multiple scenes and pass information among scenes

There's only one scene running at the same time, when switching scenes the previous scene will be destroyed. To easily store and pass information among scenes we can mark a node as **persist node** to prevent it from being destroyed during scene switch. This way the node and all the component instances attached to it will remain in memory. 

`cc.game.addPersistRootNode(myNode);`

The above API will make `myNode` a persist node across scenes. We can store information for player profile or necessary data needed to initialize next scene.

To revert a persist node to normal node:

`cc.game.removePersistRootNode(myNode);`

Beware the above API will not destroy the node immediately, only mark it as 'destroyable' for next scene switch.


### Global variable

We can also store and pass information using global variable. For details please read [Global Variable](access-node-component.md#global_variable).


## Scene loaded callback

When loading scene, you can pass a function as the callback when scene loaded:

`cc.director.loadScene("MyScene", onSceneLaunched);`

`onSceneLaunched` is the callback function declared in the same script.

Since it can only be declared in the same script, it's better to call `loadScene` from a persist node so that the component instance will stay in memory for callback function to continue running.


## Preload scene

`cc.director.loadScene` will destroy previous scene and run new scene right after the new scene is completely loaded. Sometimes we need to load new scene in the background when still running previous scene, and only switch scene when new scene is loaded. We can use `preloadScene` to do this:

```js
cc.director.preloadScene("table", function () {
    cc.log("Next scene preloaded");
});
```

Once callback is fired, you can call `loadScene` at any time to immediately switch scenes.

```js
cc.director.loadScene("table");
```

It will be totally fine to call `cc.director.loadScene` at any time even if the preloading is not yet finished, the scene will be launched after preloaded automatically. You can take [Black Jack demo](https://github.com/cocos-creator/tutorial-blackjack/blob/master/assets/scripts/Menu.js#L12-L14) as an example.

**Notice** Using `cc.loader.loadRes` to load assets in next scene and call `runScene` method to switch scene is **deprecated!**

```js
// DO NOT USE THE FOLLOWING METHOD!
cc.loader.loadRes('MyScene.fire', function(err, res) {
    cc.director.runScene(res.scene);
});
```


---

Continue on to read about [Asset Loading](load-assets.md).
