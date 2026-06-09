# 2D 渲染组件合批规则说明

## 合批条件说明

2D 渲染组件合批需要满足以下几点条件：

| 条件 | 说明 |
| :-- | :--- |
| 节点的 Layer 相同 | 由于 Layer 与节点是否渲染相关，因此不同的 Layer 之间不能进行合批。 |
| 使用的材质相同 | **材质相同是合批的必要要求**。<br>由于 Creator 使用的是 **材质实例化** 的机制，所以当用户在设置了材质的 `uniform` 之后，材质会进行实例化，实例化之后的材质是无法进行合批的。<br>如果用户在自定义材质中设置了 `uniform`（对应组件无法进行合批），在 `uniform` 值使用完毕后想要该组件参与合批，那么可通过 `CustomMaterial` 接口将材质资源重新赋值给组件即可。 |
| 渲染组件上所添加的材质的 `BlendState` 和 `DepthStencilState` 属性设置相同 | `DepthStencilState` 属性用于控制组件的深度检测和模板缓冲，是由引擎自动控制（用于 Mask 的效果实现）的，一般来说用户不需关心该属性的设置。 |
| 渲染组件的顶点信息要在同一个 **buffer** 中上传（v3.4.1 新增） | 一般情况下顶点信息是由引擎统一进行分配和管理的，用户无需关心。若想要了解更多相关信息，请参考下文 **MeshBuffer 合批说明** 部分的内容。 |
| 贴图源以及贴图采样相同 | 一般情况下该条件是影响合批最主要的因素，尤其对于 Sprite 和 Label 来说，贴图很容易产生差别导致无法合批。Creator 提供了部分方法用于更好地实现合批，详情请参考下文 **合批方法说明** 部分的内容。 |

## 合批方法说明

结合以上的合批条件说明，我们可以通过一些方法来实现更好的合批方法。需要额外说明的是，2D 渲染组件的渲染数据采集使用的是基于 **节点树** 的渲染方式，而有部分组件无法合批，且会打断其他组件合批，需要用户进行分模块管理节点树布局，以达到更好的合批效果。无法合批的组件包括：

- 内置组件 Mask、Graphics 和 UIMeshRenderer 组件由于材质不同和数据组织方式的差异，无法与其他组件合批；
- TiledMap、Spine 和 DragonBones 这三个中间件组件则是遵循自己的内部合批机制。

对于 Sprite 和 Label 组件来说，因为贴图很容易产生差别，导致无法合批。因此我们提供了以下方法可以更好地实现合批，用户可以根据需要参考使用：

- 对于 Sprite 组件，我们提供了 [静态合图](../../../asset/auto-atlas.md) 和 [动态合图](../../../advanced-topics/dynamic-atlas.md) 两种合批方案，通过将图片纹理合并，即可在其他条件满足的情况下进行合批。
- 对于 Label 组件，我们提供了 Bitmap 的缓存方法，通过将 Label 的纹理合图，即可实现 Sprite 和 Label 组件的合批，但需要注意的是，使用 Bitmap 缓存方式的 Label 不可频繁变动文字内容。

一般来说，通过控制材质和节点树状态，然后配合合图方法，便能够达到较好的合批效果。

## MeshBuffer 合批说明

由于合批要求渲染对象的顶点在同一个 MeshBuffer 中，而以下几种情况则会造成 MeshBuffer 切换。

### v3.4.1 之前

场景中要绘制的顶点数量超过了 MeshBuffer 所能容纳的最大顶点数量（65535 个）。

### v3.4.1 之后

由于我们在 v3.4.1 中采用了新的渲染数据提交设计，所以需要注意以下几点：

1. **项目设置 -> Macro Configurations** 面板中的 **BATCHER2D_MEM_INCREMENT** 的值会影响每个 MeshBuffer 可容纳的最大顶点数量，当这个值越大，同一个 MeshBuffer 可容纳的 2D 渲染对象也就越多。但与此同时，内存增加的幅度也会越大，请用户结合自身项目规模酌情设置大小。

2. **BATCHER2D_MEM_INCREMENT** 的单位为 **KB**，与可容纳的顶点数量之间的转换关系如下：

    引擎内置标准的顶点格式为 [vfmtPosUvColor](https://github.com/cocos/cocos-engine/blob/v3.4.1/cocos/2d/renderer/vertex-format.ts#L43)，在引擎中的定义为：

    ```ts
    export const vfmtPosUvColor = [
    // RGB32F 表示 3 个 32 位的 float
    new Attribute(AttributeName.ATTR_POSITION, Format.RGB32F),
    // RG32F 表示 2 个 32 位的 float
    new Attribute(AttributeName.ATTR_TEX_COORD, Format.RG32F),
    // RGBA32F 表示 4 个 32 位的 float
    new Attribute(AttributeName.ATTR_COLOR, Format.RGBA32F),
    ];
    ```

    由此我们可以得到每个顶点占用 9 个 `float` 值，每个顶点占用的空间为：`1 * 9 * 4 / 1024（KB）`，其中：

      - **1** 表示顶点数；

      - **9** 表示 `vfmtPosUvColor` 条件下每个顶点占用的 `float` 值；

      - **4** 表示每个 `float` 占用的字节数；

      - **1024** 表示字节与 KB 转换单位。

    因此 **BATCHER2D_MEM_INCREMENT** 的默认值 144KB，表示可容纳 `144 * 1024 / (9 * 4）= 4096` 个标准格式的顶点。需要注意的是：同一 MeshBuffer 容纳的最大顶点数不可超过 **65535** 个，即 **BATCHER2D_MEM_INCREMENT** 的最大值不可大于 `65535 * 9 * 4 / 1024 ≈ 2303.96（KB）`。

3. 目前 2D 渲染使用的核心为 **static VB**，其主要内容包括：

    - **VB 固定** 伴随着组件的整个生命周期而存在，而决定渲染顺序的 IB 则放弃缓存，每帧进行录制。由于组件的 VB 信息多而复杂，直接保存下来可针对组件的内存段进行操作，而且保存下来可以避免无用的更新。

    - IB 每帧填充。相对于 VB 来说，IB 的结构简单、数量较少，并且会直接决定渲染顺序，所以在每帧遍历时重新填充 IB 消耗较小，且无需管理复杂的缓存机制。

    - 由于 VB 固定，所以在整个组件的生命周期中，VB 会在最开始就分配好，直到组件销毁，所以在组件加载时，便会向预先分配好的 MeshBuffer 中申请好想要使用的 VB，然后在销毁时归还。

    - 当 MeshBuffer 已经无法分配出组件需要的 VB 时，系统便会新创建一个大小为 **BATCHER2D_MEM_INCREMENT** 的 MeshBuffer 来继续分配 VB。
