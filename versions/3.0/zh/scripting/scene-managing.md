# 加载和切换场景

在 Cocos Creator 3.0 中，我们使用场景文件名（不包含扩展名）来索引指代场景。并通过以下接口进行加载和切换操作：

```ts
director.loadScene("MyScene");
```

除此之外，从 v2.4 开始 Asset Bundle 还增加了一种新的加载方式：

```typescript
bundle.loadScene('MyScene', function (err, scene) {
    director.runScene(scene);
});
```

Asset Bundle 提供的 `loadScene` 只会加载指定 bundle 中的场景，并不会自动运行场景，还需要使用 `director.runScene` 来运行场景。<br>`loadScene` 还提供了更多参数来控制加载流程，开发者可以自行控制加载参数或者在加载完场景后做一些处理。

更多关于加载 Asset Bundle 中的场景，可参考文档 [Asset Bundle](../asset/bundle.md)。

## 通过常驻节点进行场景资源管理和参数传递

引擎同时只会运行一个场景，当切换场景时，默认会将场景内所有节点和其他实例销毁。如果我们需要用一个组件控制所有场景的加载，或在场景之间传递参数数据，就需要将该组件所在节点标记为「常驻节点」，使它在场景切换时不被自动销毁，常驻内存。我们使用以下接口：

`game.addPersistRootNode(myNode);`

上面的接口会将 `myNode` 变为常驻节点，这样挂在上面的组件都可以在场景之间持续作用，我们可以用这样的方法来储存玩家信息，或下一个场景初始化时需要的各种数据。
需要注意的是，目标节点必须为位于层级的根节点，否则设置无效。

如果要取消一个节点的常驻属性：

`game.removePersistRootNode(myNode);`

需要注意的是上面的 API 并不会立即销毁指定节点，只是将节点还原为可在场景切换时销毁的节点。


## 场景加载回调

加载场景时，可以附加一个参数用来指定场景加载后的回调函数：

`director.loadScene("MyScene", onSceneLaunched);`

上一行里 `onSceneLaunched` 就是声明在本脚本中的一个回调函数，在场景加载后可以用来进一步的进行初始化或数据传递的操作。

由于回调函数只能写在本脚本中，所以场景加载回调通常用来配合常驻节点，在常驻节点上挂载的脚本中使用。


## 预加载场景

`director.loadScene` 会在加载场景之后自动切换运行新场景，有些时候我们需要在后台静默加载新场景，并在加载完成后手动进行切换。那就可以预先使用 `preloadScene` 接口对场景进行预加载：

```ts
director.preloadScene("table", function () {
    console.log('Next scene preloaded');
});
```

之后在合适的时间调用 `loadScene`，就可以真正切换场景。

```ts
director.loadScene("table");
```

就算预加载还没完成，你也可以直接调用 `director.loadScene`，预加载完成后场景就会启动。
