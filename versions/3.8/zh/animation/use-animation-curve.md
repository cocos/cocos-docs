# 程序化编辑动画剪辑

> **注意**：从 v3.3 开始，动画剪辑接口经历了较大的变动，详情可参考 [动画剪辑数据升级指南](./animation-clip-migration-3.3.x.md)。

Creator 除了支持在 **动画编辑器** 中 [创建动画剪辑](animation-create.md)，还可以通过脚本模块程序化地创建动画剪辑，例如：

```ts
import { animation, AnimationClip, Vec3 } from "cc";

const animationClip = new AnimationClip();
animationClip.duration = 1.0; // 整个动画剪辑的周期

const track  = new animation.VectorTrack(); // 创建一个向量轨道
track.componentsCount = 3; // 使用向量轨道的前三条通道
track.path = new animation.TrackPath().toHierarchy('Foo').toProperty('position'); // 指定轨道路径，即指定目标对象为 "Foo" 子节点的 "position" 属性
const [x, y, z] = track.channels(); // x, y, z 是前三条通道
x.curve.assignSorted([ // 为 x 通道的曲线添加关键帧
    [0.4, ({ value: 0.4 })],
    [0.6, ({ value: 0.6 })],
    [0.8, ({ value: 0.8 })],
]);

// 如果关键帧的组织是 [时间, 向量] 数组，可以利用解构语法赋值每一条通道曲线。
const vec3KeyFrames = [
    [0.4, new Vec3(1.0, 2.0, 3.0)],
    [0.6, new Vec3(1.0, 2.0, 3.0)],
    [0.8, new Vec3(1.0, 2.0, 3.0)],
] as [number, Vec3][];
x.curve.assignSorted(vec3KeyFrames.map(([time, vec3]) => [time, { value: vec3.x }]));
y.curve.assignSorted(vec3KeyFrames.map(([time, vec3]) => [time, { value: vec3.y }]));
z.curve.assignSorted(vec3KeyFrames.map(([time, vec3]) => [time, { value: vec3.z }]));

// 最后将轨道添加到动画剪辑以应用
animationClip.addTrack(track);
```

具体的说明请查看下文介绍。

## 动画属性轨道

动画剪辑中的任一节点支持添加多条 **动画属性轨道**，动画属性轨道由类 `animation.Track` 表示，描述了某一对象上的某一动画属性随着时间推移而发生的变化，并规定了如何将其应用到目标对象上。

动画属性轨道根据下文中介绍的 [轨道类型](#%E8%BD%A8%E9%81%93%E7%B1%BB%E5%9E%8B) 的不同可包含一至多条通道，一般情况下一条动画属性轨道对应一条通道，除了复合轨道，例如 `position`，有 `X`、`Y`、`Z` 三条通道。每条通道都含有一条曲线，曲线是 **可编辑的最小单元**，若动画属性轨道上未添加关键帧，则曲线为空曲线。

根据曲线类型的不同，通道包括以下几种：

- **实数通道**，含有一条实数曲线 `RealCurve`

- **四元数通道**，含有一条四元数曲线 `QuatCurve`

- **对象通道**，含有一条动画曲线 `ObjectCurve`

动画剪辑运行时，每条属性轨道都将绑定到某个对象或某个对象的动画属性上，并通过赋值对象属性或下文介绍的 **值代理** 来产生动画效果。

### 轨道类型

动画属性轨道的类型决定了轨道包含多少条通道（曲线），以及每条通道（曲线）的类型和含义，Creator 提供了以下类型的轨道：

| 轨道类型 | 类 | 产生的值  | 说明 |
| :-------------------- | :------------------- | :----------- | :--- |
| 数值轨道               | `animation.RealTrack`   | `number`             | 数值轨道产生 JavaScript 数值，包含 **一条** 实数通道。|
| 向量轨道（2/3/4 维）| `animation.VectorTrack` | `Vec2`/`Vec3`/`Vec4` | 向量轨道包括 2/3/4 维向量，值分别由向量类 `Vec2`、`Vec3`、`Vec4` 表示。向量轨道的维度是通过 `componentsCount` 字段获取和设置的，需要注意的是向量轨道共包含 **4 条** 实数通道，但运行时仅会使用前 `componentsCount` 条通道。 |
| 四元数轨道             | `animation.QuatTrack`   | `Quat`                | 四元数轨道（对应节点上的 `rotation` 属性）产生四元数，值由 `Quat` 表示。四元数轨道仅包含 **一条** 四元数通道，这意味着四元数的各个分量属性不可单独编辑，但大多数情况下分量属性的单独编辑也是没有意义的。 |
| 颜色轨道               | `animation.ColorTrack`  | `Color`              | 颜色轨道产生颜色值，值由 `Color` 表示。颜色轨道包含 **4 条** 实数通道，分别对应于红色、绿色、蓝色、透明度，且范围在 [0-255] 内。各个通道采样后产生的颜色值，将按照类 `Color` 规定的方式将实数转换为整数颜色分量值。 |
| 尺寸轨道               | `animation.SizeTrack`   | `Size`               | 尺寸轨道产生尺寸值，值由 `Size` 表示。尺寸轨道包含 **两条** 实数通道，分别对应于尺寸的宽度和高度。|
| 对象轨道               | `animation.ObjectTrack` |  任意值               | 对象轨道产生任意类型的值，仅包含 **一条** 对象曲线。对象轨道产生的值即是对象曲线产生的值。|

### 轨道路径

每个动画属性轨道都记录了一个路径，称为 **轨道路径**，由类 `animation.TrackPath` 表示。轨道路径指定了在 **运行时** 如何从当前节点对象寻址到目标对象，因为寻址是在运行时完成的，这种特性使得动画剪辑可以复用到多个对象上。

轨道路径由多个子路径组成，每个子路径都指定了如何从上一级路径的寻址结果寻址到另一个对象，最后一个子路径寻址到的结果就是目标对象。类似文件路径用于定位文件夹或文件，而轨道路径用于定位目标对象。

通过下表中 `animation.TrackPath` 的方法可根据目标对象类型添加子路径，以及获取、判断子路径的类型：

| 目标对象类型 | 添加子路径方法     | 获取解析子路径类型      | 判别子路径类型      |
| :--------- | :---------------|----------------------|-------------------|
| 对象属性     | `toProperty()`  | `parsePropertyAt()`  | `isPropertyAt()`  |
| 数组元素     | `toElement()`   | `parseElementAt()`   | `isElementAt()`   |
| 节点的子节点 | `toHierarchy()` | `parseHierarchyAt()` | `isHierarchy()`   |
| 节点上的组件 | `toComponent()` | `parseComponentAt()` | `isComponentAt()` |

以下代码片段演示了如何指定轨道路径：

```ts
function specifyTrackPath(track: animation.TrackPath) {
    const { path } = track;
    path                                  // 从当前节点对象寻址到目标对象
        .toHierarchy('path/to/children')  // 目标对象为当前节点的 “path/to/child” 子节点
        .toComponent('MyComponent')       // 目标对象为 “path/to/child” 子节点的 “MyComponent” 组件
        .toProperty('myProperty')         // 目标对象为 “MyComponent” 组件上的 “myProperty” 属性
        .toElement(1)                     // 目标对象为 “myProperty” 属性中的第二个数组元素
        ;
}
```

轨道路径中的子路径可以任意组合，只要它们具有正确的含义，但以下几种情况的轨道路径是无效的：

1. 空路径
2. 路径的末尾不是属性或数组元素，且未设置 **值代理**（参考下文介绍）
3. 对象属性、数组元素、节点的子节点、节点上的组件不存在时

对于无效的路径，运行时，此条轨道会被忽略并给出警告。

### 值代理

在轨道路径定位到目标对象后，若最后定位到的是一个 **属性**，默认情况下 Creator 将通过对该属性赋值以完成动画。

但在某些情况下，对象可能并没有提供“属性设置”接口，就不能通过赋值来完成设置。例如，材质对象是通过 `Material.prototype.setProperty(name, value)` 来改变其材质属性的值，并没有提供“属性设置”接口，这时候便可以通过在轨道指定 **值代理**，自定义赋值给目标对象。

要创建值代理，需要实现 `animation.ValueProxyFactory` 接口，代码示例如下：

```ts
class SetMaterialPropertyValueProxyFactory {
    /*
     * 材质属性名称。
     */
    private _propertyName: string;

    constructor (propertyName: string) {
        this._propertyName = propertyName;
    }

    /**
     * 需要实现该接口。‘target’ 是轨道路径的解析结果。
     * 返回的结果应实现值代理接口 ‘animation.ValueProxy’。
     */
    public forTarget (target: unknown): animation.ValueProxy {
        // 一个好的实现方法这里应该指定 'target' 一定是材质对象
        // asserts(target instanceof Material);
        const material = target as Material;
        return {
            set: (value) => {
                // ‘value’ 是轨道产生的值
                material.setProperty(this._propertyName, value);
            },
        };
    }
}
```

然后我们便可以设置一个能修改材质属性的动画属性轨道，代码示例如下：

```ts
import { MeshRenderer, animation } from 'cc';

function setupMaterialPropertyTrack(track: animation.TrackPath) {
    // 先设置轨道路径，指定目标对象为材质
    track.path
        .toHierarchy('path/to/children')
        .toComponent(MeshRenderer)
        .toProperty('materials')
        .toElement(1)
        ;

    // 应用值代理
    track.valueProxy = new SetMaterialPropertyValueProxyFactory('mainColor');
}
```

因为动画是可重用的，它可以绑定到多个对象上，Creator 支持 **不同对象应由不同的值代理**，所以 `animation.Track` 的 `valueProxy` 字段是 `animation.ValueProxyFactory` 而不是 `animation.ValueProxy`。另一方面，实现可以在 `forTarget` 这一层面做些优化。

> **注意**：此例仅为阐述值代理的创建和使用，Creator 本身提供了用于设置材质属性（`Uniform`）的值代理工厂：`animation.UniformProxyFactory`。

## 循环模式

动画剪辑通过 `AnimationClip.wrapMode` 可以设置不同的循环模式。以下列出了几种常用的循环模式：

| `AnimationClip.wrapMode` | 说明 |
| :--- | :--- |
| `WrapMode.Normal`  | 播放到结尾后停止 |
| `WrapMode.Loop`    | 循环播放 |
| `WrapMode.PingPong` | 从动画开头播放到结尾后，从结尾开始反向播放到开头，如此循环往复 |

更多循环模式，详情请参考 API [WrapMode](__APIDOC__/zh/class/AnimationClip?id=wrapMode) 以及文档 [循环模式与循环次数](./animation-state.md#%E5%BE%AA%E7%8E%AF%E6%A8%A1%E5%BC%8F%E4%B8%8E%E5%BE%AA%E7%8E%AF%E6%AC%A1%E6%95%B0)。

## 外来动画

有些动画数据并不由轨道表示，但它以另一种形式存在于动画剪辑中，并在运行时产生动画效果。这部分动画数据称为外来动画（Exotic Animation）。外来动画旨在于让 Creator 更高效地存储和计算一些复杂的动画。

用户无法访问和编辑外来动画。由编辑器从模型中导入的骨骼动画就存储在外来动画中。
