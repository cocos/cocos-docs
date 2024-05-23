# 顶点动画贴图 （VAT）

顶点动画贴图（Vertex Animation Texture，VAT）通常用于表达刚体破碎、布料、流体等物理模拟动画。在 Houdini 等 PCG 软件中计算好的物理模拟动画可烘焙为 VAT 数据导出，并在实时渲染引擎中回放，以极低的性能消耗来重现复杂的物理效果。

目前支持的 VAT 数据格式为 Houdini 导出的刚体、柔体和流体数据，以及泽森科工 Zeno 的流体数据。

## 数据导出与使用

导出的 VAT 数据包含 fbx 模型、动画贴图、包含 VAT 材质属性的 json 文件（帧数量和包围盒最大最小值等）三部分。

### 刚体

1、导出：Houdini 设置好刚体碰撞、破碎等动画后，选择 **VAT2.0 版本，UE 模式，无 paddle，LDR方式** 导出。

2、材质：在 Cocos Creator 中创建一个材质，Effect 选择 **util/dcc/vat/houdini-rigidbody-v2**。

3、参数：查看导出的 json 文件，将 Animation Speed、NumOfFrames、PivotMin/Max、PosMin/Max 等数据填到材质中。

4、贴图：展开导出的 Position 形状贴图，将本体拖入PositionMap，下属的 Sign 和 Alpha 分别拖入 PosSignMap 和 PosAlphaMap（若有）。
Rotation 法线贴图同理。

### 柔体

1、导出：Houdini 设置好柔体碰撞、破碎等动画后，选择 **VAT3.0 版本，Unity 模式，无 paddle，LDR方式**导出。

2、材质：在 Cocos Creator 中创建一个材质，Effect 选择 **util/dcc/vat/houdini-softbody-v3**。

3、参数：查看导出的 json 文件，将 Animation Speed、NumOfFrames 等数据填到材质中。

4、贴图：展开导出的 Position 形状贴图，将本体拖入 PositionMap，下属的 Sign 和 Alpha 分别拖入 PosSignMap 和 PosAlphaMap（若有）。
Rotation 法线贴图同理。

### 流体（Houdini）

1、导出：Houdini 设置好流体动画后，选择 **VAT3.0 版本，Unity 模式，无 paddle，LDR方式**导出。

2、材质：在 Cocos Creator 中创建一个材质，Effect 选择 **util/dcc/vat/houdini-fluid-v3-liquid**。

3、参数：查看导出的 json 文件，将 Animation Speed、NumOfFrames 等数据填到材质中。

    - 勾选 Use Lookup Texture，将导出的 lookup 图拖入 LookupMap
    - 勾选 Use Lookup Auto Frame，将导出的 lookup 图的分辨率填入 LUTTextureWidth/Height
    - 选中导出的 fbx 模型，将其顶点数记录下来填入 FBXVertexCount

4、贴图：展开导出的 Position 形状贴图，将本体拖入PositionMap，下属的 Sign 和 Alpha 分别拖入 PosSignMap 和 PosAlphaMap（若有）。
Rotation 法线贴图同理。

### 流体（Zeno）

1、导出：Zeno 设置好流体动画后，选择 **VAT模式** 导出。

2、材质：在 Cocos Creator 中创建一个材质，Effect 选择 **util/dcc/vat/zeno-fluid-liquid**。

3、参数：查看导出的 json 文件，将 Animation Speed、NumOfFrames 等数据填到材质中。

4、贴图：展开导出的 Position 形状贴图拖入 PositionMap，Rotation 法线贴图拖入 RotationMap。

## 错误效果调试

### 刚体

若出现碎块绕圈转等动画异常，请确认导出选项是否指定的 VAT2.0 UE 模式，若选错为 Unity 模式可能导致此情况发生。

### 流体

若出现面破碎甚至有些面错乱，请检查 NumOfFrames 是否与 DCC 软件中的一致

若整个流体在抖或有穿插的乱面，请确认两张贴图的过滤模式为 Nearest，且一定不能勾选消除透明伪影（fix alpha transparency artifacts）
