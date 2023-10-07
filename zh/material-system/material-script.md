# 程序化使用材质

## 创建材质

材质（Material）资源可以看成是着色器资源（EffectAsset）在场景中的资源实例。

Creator 支持在 **资源管理器** 中手动 [创建材质资源](../asset/material.md)，同时也支持通过 [IMaterialInfo](__APIDOC__/zh/interface/IMaterialInfo) 接口在脚本模块中程序化地创建材质。`IMaterialInfo` 的可配置参数包括：

- `effectAsset`/`effectName`：effect 资源引用，指定使用哪个 EffectAsset 所描述的流程进行渲染。（`effectAsset` 和 `effectName` 二者必须选其一）
- `technique`：指定使用 EffectAsset 中的第几个 technique，默认为第 0 个。
- `defines`：宏定义列表，指定开启哪些 [预处理宏定义](../shader/macros.md)，默认全部关闭。
- `states`：管线状态重载列表，指定对渲染管线状态（深度模板透明混合等）有哪些重载，默认与 effect 声明一致。

创建代码示例：

```ts
const mat = new Material();
mat.initialize({
    // 通过 effect 名指定材质使用的着色器资源
    effectName: 'pipeline/skybox',
    defines: {
        USE_RGBE_CUBEMAP: true
    }
});
```

## 使用材质

![设置材质](img/add-material.png)

对任意渲染器组件，可以在脚本模块中进行程序化访问，代码示例如下：

```ts
// 通过网格渲染器组件（MeshRenderer、SkinnedMeshRenderer、SkinnedMeshBatchRenderer）可访问 3D 物体的材质
let renderable = this.getComponent(MeshRenderer);

// 获取索引为 0 的材质
let material = renderable.getMaterial(0)

// 设置索引为 0 的材质
renderable.setMaterial(mat, 0);

let sprite = this.node.getComponent(Sprite)

// 获取 2D 渲染器组件的自定义材质
let customMaterial = sprite.customMaterial;

// 设置 2D 渲染器组件的自定义材质
sprite.customMaterial = mat;

// 获取和设置粒子发射器的材质
let particleSystem = this.getComponent(ParticleSystem);
const material = particleSystem.material;
particleSystem.material = material;

// 设置和获取粒子拖尾材质
const trailMaterial = particleSystem.renderer.trailMaterial;
particleSystem.renderer.trailMaterial = trailMaterial;
```

> **注意**：
> 1. 这里访问的是共享材质。
> 2. 材质中存在共享材质和材质实例两种情况，共享材质无法和材质实例进行合批。

## 设置材质的属性

材质通过 `IMaterialInfo` 接口初始化后，只能通过 `Material.setProperty` 来设置材质的 `Uniform` 变量，代码示例如下：

```ts
mat.setProperty("uniform name", uniformValue)
```

`Uniform` 对应了 `Shader` 内声明的由 `Uniform` 限定的变量。若要了解更多 `Uniform` 的信息请参考：

- [Cocos Shader 内置 Uniform](../shader/uniform.md)
- [GLSL 存储限定符](../shader/glsl.md#存储限定符)

若需频繁设置 `Uniform` 的值，请使用 `Pass.setUniform` 来获得更好的性能。

## 共享材质 & 材质实例

在渲染器组件中，材质会以 **共享材质** 和 **材质实例** 两种情况存在。

- **共享材质**

    共享材质由多个渲染器组件共同使用，修改共享材质会影响所有使用它的渲染器组件。默认情况下，同一材质在多个渲染器组件之间是共享的。

    获取共享材质的代码示例如下：

    ```ts
    // 获取渲染器组件
    let renderableComponent = this.node.getComponent(MeshRenderer) as RenderableComponent
    // 获取共享材质数组中索引为 0 的元素
    let sharedMaterial = renderableComponent.sharedMaterial
    // 获取共享材质的数组
    let sharedMaterials = renderableComponent.sharedMaterials
    // 获取共享材质数组中索引为 0 的元素
    let sharedMaterial = renderableComponent.getMaterial(0)
    ```

- **材质实例**

    材质实例由单个渲染器组件单独使用，修改材质实例仅影响使用它的渲染器组件。材质默认为共享材质，当修改共享材质时，引擎会根据材质创建材质实例，例如：

    - 当调用 `RenderableComponent.getMaterialInstance` 或 `RenderableComponent.material` 的 `getter` 时，引擎会根据当前的材质创建材质实例
    - 当调用 `RenderableComponent.material` 的 `setter` 时，引擎会根据传入的材质创建材质实例

    代码示例如下：

    ```ts
    // 获取渲染器组件
    let renderableComponent = this.node.getComponent(MeshRenderer) as RenderableComponent
    // 获取材质实例的数组，若没有则根据当前材质数组进行创建
    let materialInstances = renderableComponent.materials
    // 获取材质实例数组中索引为 0 的元素，若没有则根据当前材质创建
    let materialInstance = renderableComponent.material     
    // 获取材质实例，若没有则根据当前材质创建
    let materialInstance = renderableComponent.getMaterialInstance(materialIndex);
    ```

### FAQ

**Q**：修改了材质的属性后，DrawCall 增加了？<br>
**A**：可能是因为使用了渲染器组件的 `getMaterialInstance` 或者 `RenderableComponent.material` 的 `getter` 方法，导致新的材质实例生成，影响了合批流程。
