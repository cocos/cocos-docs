# 地形系统

地形系统以一种高效的方式来展示大自然的山川地貌。开发者可以很方便的使用画刷来雕刻出盆地、山脉、峡谷、平原等地貌。

![terrain](./images/terrain.png)

## 创建地形

创建地形需要以下步骤：

1. 在 **层级管理器** 右击菜单中点击 **创建 -> 地形** 来创建地形节点（地形节点可移动，但不支持旋转与缩放）。

    ![create terrain](./images/create-terrain.png)

2. 在 **资源管理器** 右击菜单中点击 **创建 -> 地形** 来创建地形资源。

    ![create terrain asset](./images/create-terrain-asset.png)

## 使用地形资源

**层级管理器** 里点击选中地形节点， **属性检查器** 会显示 `cc.Terrain` 地形组件，将已经创建好的地形资源拖拽到地形组件中的 `Asset` 属性框。

![terrain inspector](./images/terrain-inspector.png)

| 属性 | 说明 |
|:-----|:----|
| Asset | 地形资源 |
| Effect Asset | 地形特效资源 |
| Receive Shadow | 是否接受阴影 |
| Use Normal Map | 是否使用法线贴图 |
| Use PBR | 是否使用物理材质 |
| Lod Enable | 是否启用地形 Lod。若启用可减少渲染面数，提升渲染性能 |
| Lod Bias | 设置 Lod 起始距离 |

## 编辑场景地形

**层级管理器** 里点击选中地形节点， **场景编辑器** 会显示 地形节点的可编辑面板。
编辑面板菜单有： **管理**（Manage）、**雕塑**（Sculpt）、**涂料**（Paint）和 **选择**（Select）几部分。可通过点击各 Tab 标签来切换面板内容。

![terrain panel](./images/terrain-panel.png)

除了编辑面板，也可以通过 **场景编辑器** 左上角的图标来快捷切换地形画刷等功能。按顺序为：

- **管理** 功能
- **雕塑** 功能中的 **Bulge**（隆起）画刷类型
- **雕塑** 功能中的 **Sunken**（凹陷）画刷类型
- **雕塑** 功能中的 **Smooth**（平滑）画刷类型
- **涂料** 功能
- **选择** 功能

### 管理（Manage）

用于调整地形的各种参数。Tile 是地形的最小单位，Tile 组成地形块（Block），目前一个 Block 由 **32x32** 个 Tile 组成，一个地形至少由 1 个 Block 组成。

![terrain manage](./images/terrain-manage.png)

| 参数 | 说明 |
| :--- | :-- |
| Tile Size | 地形 Tile 的大小，目前一个地形块由 32 x 32 个 Tile 组成，所以一个地形块的边长是 **32 x Tile Size** |
| Weight Map Size | 权重图大小 |
| Light Map Size | 光照贴图大小 |
| Block Count | 地形块在两个维度上的数量（**注意**：若该值设置过大会造成顶点数过多，导致卡顿） |

### 雕塑（Sculpt）

用于改变地形的形状。

![terrain sculpt](./images/terrain-sculpt.png)

| 参数 | 说明 |
| :--- | :--- |
| Brush Size | 画刷的大小 |
| Brush Strength | 画刷的力度  |
| Brush Mode | 画刷类型，包括 **Bulge**、**Sunken**、**Smooth**、**Flatten**、**Set Height** |
| Brush Height | 画刷高度，只有画刷模式为**Set Height**时生效 |
| Brush | 自定义画刷样式，通过选取样式图片生成自定义画刷，使用R通道来作为画刷蒙版 |

| 画刷模式 | 说明 |
| :--- | :--- |
| Bulge | 隆起地形 |
| Sunken | 下凹地形  |
| Smooth | 平滑地形 |
| Flatten | 整平地形 |
| Set Height | 使用**画刷高度**设置地形高度 |

通过 **鼠标左键** 来雕刻地形，当使用**Bulge**模式时，还可以通过 **Shift + 鼠标左键** 下凹地形

### 涂料（Paint）

用于描绘地形的纹理

![terrain paint](./images/terrain-paint.png)

| 参数 | 说明 |
| :--- | :--- |
| Terrain Layer | 设置地形的 Layer。详情可参考下方的 **Layer 编辑** |
| Brush Size | 画刷的大小 |
| Brush Strength | 画刷的力度  |
| Brush Falloff | 画刷衰减度，决定了画刷边缘的锐利程度。<br>**0.0** 表示画刷在整个范围内都有完全效果（全部被当前层纹理覆盖），具有尖锐的边缘。<br>**1.0** 表示画刷仅在它中心具有完全效果，在到达边缘的过程中效果逐渐衰减 |
| Brush | 自定义画刷样式，通过选取样式图片生成自定义画刷 |

#### Layer 编辑

![terrain layer](./images/terrain-layer.png)

点击右上方的 **+/-** 按钮可以添加/删除 Layer（最多支持 4 层 layer）。选中某个 Layer 后就可以对 Layer 及其纹理进行编辑。

| 参数 | 说明 |
| :--- | :--- |
| Terrain Layer | 设置当前 Layer 的纹理 |
| Normal Map | 设置当前 Layer 的法线贴图，需要勾选地形组件的 **Use Normal Map** 属性 |
| Metallic | 设置当前 Layer 的金属特性 (主要指光滑程度) |
| Roughness | 设置当前 Layer 的粗糙程度 |
| Tile Size   | 纹理的平铺大小，值越小会在同样大小的区域内进行更多次的平铺 |

### 选择（Select）

切换到 **选择** 分页后，在 **场景编辑器** 中选中地形块，便会显示当前地形块的相关信息。

![terrain select](./images/terrain-select.png)

| 参数 | 说明 |
| :--- | :--- |
| Index  | 当前选中地形块的索引    |
| Layers | 当前选中地形块的纹理列表 |
| Wight  | 当前选中地形块的权重图  |
