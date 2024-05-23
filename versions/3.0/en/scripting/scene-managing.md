# Loading and Switching Scenes

__Cocos Creator__ uses the scene's file name (without extension) to index the scene. Loading and switching scenes is performed using the `loadScene()` API. Example:

```ts
director.loadScene("MyScene");
```

In addition, as of v2.4, the Asset Bundle has added a new loading method:

```js
bundle.loadScene('MyScene', function (err, scene) {
    director.runScene(scene);
});
```

The `loadScene` provided by the Asset Bundle will only load scenes from the specified bundle and will not automatically run the scenes, you also need to use `director.runScene` to run the scenes.<br>
`loadScene` also provides more parameters to control the loading process, so developers can control the loading parameters themselves or do some processing after the loading scene.

For more information about loading scenes in the Asset Bundle, you can refer to the [Asset Bundle](../asset/bundle.md) documentation.

## Scene resource management and Persistent Nodes

The engine will only run one scene at the same time. When switching scenes, all nodes and other instances in the scene will be destroyed by default. Developer's may need to use a component to control the loading of all scenes, or to transfer parameter data between scenes, mark the node where the component is located as a __Persistent Node__ so that it will not be automatically destroyed when the scene is switched, and will remain in memory. Example:

```ts
game.addPersistRootNode(myNode);
```

The above interface will turn `myNode` into a persistent node, so that the components attached to it can continue to function between scenes. This method can be used to store player information, or various things needed for the initialization of the next scene data.

> **Note**: the target node must be the root node in the hierarchy, otherwise the setting is invalid.

Cancelling the persistece of a node is easy. Example:

```ts
game.removePersistRootNode(myNode);
```

> **Note**: the above API does not immediately destroy the specified node, but restores the node to a node that can be destroyed when the scene is switched.

## Scene loading callback

When loading a scene, you can attach a parameter to specify the callback function after the scene is loaded. Example:

```ts
director.loadScene("MyScene", onSceneLaunched);
```

`onSceneLaunched` is a callback function declared in this script, and can be used for further initialization or data transfer operations after the scene is loaded.

Since the callback function can only be written in this script, the scene loading callback is usually used in conjunction with the persistent node and used in the script mounted on the persistent node.

## Preloading a scene

`director.loadScene` will automatically switch to run the new scene after loading the scene. It is also possible to silently load the new scene in the background and switch manually after the loading is complete. Use the `preloadScene` interface to preload the scene in advance. Example:

```ts
director.preloadScene("table", function () {
    console.log('Next scene preloaded');
});
```

Then call `loadScene` at an appropriate time to switch scenes. Example:

```ts
director.loadScene("table");
```

> **Note**: if the preloading is not complete, you can also call `director.loadScene()` directly, and the scene will start after the preloading is complete.
