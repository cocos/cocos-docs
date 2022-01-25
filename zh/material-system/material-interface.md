# 材质接口说明

材质继承自 `Asset` 是资源的一部分。在资源目录内右键 **创建->材质** 可创建单独的材质文件（*.mtl）。

![](create-material/create.png)

查看 [材质操作指南](material-inspector.md) 可了解更多材质操作。

也可由  `IMaterialInfo` 在脚本中创建，若要在脚本中使用，可参考 [在程序中使用材质](material-script.md)

## `Material`  的属性和方法

### 属性

|属性|说明|
|:--|:--|
|effectAsset| 获取当前所使用的着色器资源|
|effectName|获取当着色器资源的名字，仅当材质的着色器不为空时有效，否则返回 `''`|
|technique|获取当前材质激活的渲染技术的索引|
|passes|获取当前所有渲染过程数组|
|hash| 获取当前材质的哈希值|
|owner|获取当前材质所归属的可渲染组件|

### 方法

|属性|说明|
|:--|:--|
|getHash| 静态方法,获得材质的哈希值。<br>哈希值相同的材质才可以进行合批|
|initialize| 通过 `IMaterialInfo` 结构初始化材质，程序化控制可参考：[在程序中使用材质](material-script.md)|
|reset| 通过 `IMaterialInfo` 结构重置材质|
|destroy| 彻底销毁材质<br>**注意：销毁后无法重新初始化**|
|recompileShaders| 使用指定预处理宏重新编译当前渲染过程中的着色器片段。<br>**注意：该方法只允许对材质实例（`MaterialInstance`）执行** |
|overridePipelineStates|使用指定管线状态重载当前的渲染过程数组。<br>**注意：该方法只允许对材质实例（`MaterialInstance`）执行**|
|onLoaded| 加载器加载完成回调。会自动初始化材质资源|
|resetUniforms| 重置材质的所有 Uniform 参数数据为材质资源中的默认初始值|
|setProperty| 设置材质 Uniform 参数的统一入口。<br> **注意：如果需要每帧更新 uniform，建议使用 `Pass.setUniform` 以获得更好的性能**|
|getProperty| 获取当前材质的指定 Uniform 参数的值。<br> **注意：只有通过 `Material.setProperty` 函数设置的参数才能从此函数取出**<br>如需取出完整的渲染数据，请使用 ``Pass.getUniform``|
|copy| 复制目标材质到当前的材质实例|
|initDefault| 使用传入的 `uuid` 将实例初始化为内置无光照着色器
|validate| 判断材质是否有效，同时满足着色器资源不为空、着色器资源已初始化且着色器的渲染过程数组长度大于 0 |
 
## `IMaterialInfo` 的属性和方法

`IMaterialInfo` 是用于初始化材质的接口。若要手动初始化材质可以参考：[在程序中使用材质](material-script.md)

### 属性

|属性|说明|
|:--|:---|
|effectAsset| 材质引用的着色器资源 <br> 和 `effectName` 必须二选一|
|effectName|  材质引用的着色器资源的名字 <br> 和 `effectAsset` 必须二选一|
|technique | 指定着色器的渲染技术的索引, 默认为 0 |
|defines| 这个材质定义的预处理宏，默认全为 0， 可指定 1 个宏或者多个宏的数组|
|states| 这个材质的自定义管线状态，将覆盖 effect 中的属性 <br>注意：在可能的情况下请尽量少的自定义管线状态，以减小对渲染效率的影响|

创建代码示例：

```ts
const mat = new Material();
mat.initialize({
  effectName: 'pipeline/skybox',
  defines: {
    USE_RGBE_CUBEMAP: true
  }
});
```

## 材质说明

在可渲染组件中，材质会以共享材质和材质实例两种情况存在。
- 共享材质受多个可渲染组件共享，修改共享材质会影响所有使用它的可渲染组件。
- 材质实例属于可渲染组件的独享属性，修改材质实例仅影响使用它的可渲染组件。
- 材质在未进行实例生成操作之前，默认以共享材质方式存在。

为方便理解，通过一个常见问题来进行描述：

Q : **为何我修改了材质的属性，Draw Call会增加？**

A: 有可能是使用了可渲染组件的`getMaterialInstance`或者`get RenderableComponent.material`方法，导致新的材质实例生成，影响了合批功能。

当调用 `RenderableComponent.getMaterialInstance` 或 `get RenderableComponent.material` 时，引擎会根据当前的材质创建材质实例。

当调用 `set renderableComponent.material` 时，引擎会根据传入的材质创建材质实例。

**材质修改示例代码：**

- 修改共享材质，会影响所有使用此共享材质的可渲染组件。下列代码演示了如何获取共享材质：
```ts

// 获取可渲染组件
let renderableComponent = this.node.getComponent(MeshRenderer) as RenderableComponent

//获取共享材质数组中索引 0 的元素
let sharedMaterial = renderableComponent.sharedMaterial

//获取共享材质的数组
let sharedMaterials = renderableComponent.sharedMaterials

//获取共享材质数组中索引 0 的元素
let sharedMaterial = renderableComponent.getMaterial(0)
```
- 若只想修改单个可渲染组件的材质，需要修改其材质实例。下面代码演示了如何获取/创建材质实例：
```ts
// 获取可渲染组件
let renderableComponent = this.node.getComponent(MeshRenderer) as RenderableComponent

//获取材质实例的数组，若无则根据当前材质数组进行创建
let materialInstances = renderableComponent.materials

//获取材质实例数组中索引 0 的元素，若无则根据当前材质创建
let materialInstance = renderableComponent.material     

//获取材质实例，若无则根据当前材质创建
let materilInstance = renderableComponent.getMaterialInstance(materialIndex);
```

<!-- 
- 共享材质
    由于材质是资源的一种，因此在默认的情况下，同一材质在多个可渲染组件间是共享的。对于使用同一材质的可渲染组件来说，修改某一个组件上的共享才追

    ```ts

    let meshRenderer = this.node.GetComponent(MeshRenderer) as RenderableComponent;
    let sharedMaterial = meshRenderer.sharedMaterial;
    let sharedMaterials = meshRenderer.sharedMaterials

    ```

- 材质实例
在运行时，如对材质属性进行修改，就会根据当前材质（`Material`）创建出新的材质实例（`MaterialInstance`）。如果多个可渲染组件共用一个材质，当某个可渲染组件的材质被修改后，引擎会为该材质创建出材质实例以避免其他使用该材质的组件受影响。**这种情况下，材质实例和材质不能进行合批，会导致 DrawCall 的增加。**
-->



