# 动画剪辑

> **注意**：从 v3.3 开始，动画剪辑接口经历了较大的变动，详情可参考 [动画剪辑数据升级指南](./animation-clip-migration-3.3.x.md)。

动画剪辑包含了动画数据的资源。

## 轨道

动画剪辑包含了零至多条 **轨道**。轨道描述了如何随时间产生值，并规定了该值如何应用到目标对象。轨道由类 `animation.Track` 表示。

轨道又包含了数条通道，是 **编辑的最小单元**。每条通道持有一条曲线，按曲线类型不同，存在以下几种通道：

- 实数通道，持有一条实数曲线 `RealCurve`；

- 四元数通道，持有一条四元数曲线 `QuatCurve`；

- 对象通道，持有一条动画曲线 `ObjectCurve`。

轨道包含多少通道、以及每个通道的类型、含义是由轨道本身决定的。见下述的轨道类型章节。

动画剪辑运作时，每条轨道都将绑定到某个对象或某个对象属性，并通过赋值对象属性或下述的值代理来产生动画效果。

### 轨道类型

每个轨道都明确了它所产生的值。Creator 提供了以下类型的轨道：

| 轨道类                  | 产生的值及其表示 | 产生的值及其表示     |
|-------------------------|------------------|----------------------|
| `animation.RealTrack`   | 数值             | `number`             |
| `animation.VectorTrack` | 2/3/4 维向量     | `Vec2`/`Vec3`/`Vec4` |
| `animation.QuatTrack`   | 四元数           | `Quat`               |
| `animation.ColorTrack`  | 颜色             | `Color`              |
| `animation.SizeTrack`   | 尺寸             | `Size`               |
| `animation.ObjectTrack` | 任意值           |                      |

#### 数值轨道

数值轨道产生 JavaScript 数值。它包含一个实数通道。

#### 向量轨道

向量轨道产生 2/3/4 维向量，值分别由向量类 `Vec2`、`Vec3`、`Vec4` 表示。通过 `componentsCount` 字段来获取和设置产生的向量维度。要注意的是向量轨道总是包含 4 个实数通道，但运作时仅会使用前 `componentsCount` 条通道。

#### 四元数轨道

四元数轨道产生四元数，值由 `Quat` 表示。四元数轨道仅包含一条四元数通道。

> 这意味着四元数的各个分量不可单独编辑。在多数情况下这也是没有意义的。

#### 颜色轨道

颜色轨道产生颜色，值由 `Color` 表示。颜色轨道包含四条实数通道，分别对应于红色、绿色、蓝色、透明度，且范围在 [0-255] 内。若各个通道采样后产生颜色值时，将按类 `Color` 规定的方式将实数转换为整数颜色分量值。

#### 尺寸轨道

尺寸通道产生尺寸，值由 `Size` 表示。尺寸轨道包含两条实数通道，分别对应于尺寸的宽度和高度。

#### 对象轨道

对象轨道产生任意类型的值。它仅包含一条对象曲线。对象轨道产生的值即是对象曲线产生的值。

### 轨道路径

每个轨道都记录了一个路径，称为 **轨道路径**，描述如何寻址到目标对象或目标属性。定位到目标对象或属性后，对一些绑定。轨道路径由类 `animation.TrackPath` 表示。

可以将轨道路径类比为文件路径。文件路径用于定位文件或文件夹，而轨道路径用于定位目标对象或目标属性。

轨道路径由多段子路径组成，其中每一段子路径可以用于指定：

- 当前对象的属性；

- 当前对象是数组时，当前数组的元素；

- 当前对象是结点时，结点的子结点；

- 当前对象是结点时，结点上的组件。

其中，“当前对象” 是指该子路径前方路径的寻址结果。首个子路径的当前对象就是轨道的根对象。

> 目前，任何轨道寻址的根对象都是动画组件所在的节点。

可以通过 `animation.TrackPath` 的以下方法向路径附加子路径，以及获取、判别子路径的类型：

|              | 附加          | 获取                 | 判别              |
|--------------|---------------|----------------------|-------------------|
| 对象属性     | `toProperty()`  | `parsePropertyAt()`  | `isPropertyAt()`  |
| 数组元素     | `toElement()`   | `parseElementAt()`   | `isElementAt()`   |
| 结点的子结点 | `toHierarchy()` | `parseHierarchyAt()` | `isHierarchy()`   |
| 结点上的组件 | `toComponent()` | `parseComponentAt()` | `isComponentAt()` |

以下代码片段演示了如何指定轨道路径：

```ts
function specifyTrackPath(track: animation.TrackPath) {
    const { path } = track;
    path                                // 根节点的
        .toHierarchy('path/to/children')  // “path/to/child” 子结点的
        .toComponent('MyComponent')       // “MyComponent” 组件的
        .toProperty('myProperty')         // “myProperty” 属性的
        .toElement(1)                     // 第二个数组元素
        ;
}
```

#### 轨道路径的有效性

从轨道路径的含义不难看出，以下情况下，轨道路径是无效的：

- 空路径；

- 路径的末尾不是属性或数组元素，且未设置值代理（见下）；

- 对象属性、数组元素、结点的子结点、结点上的组件不存在时。

对于无效的路径，运行时，此条轨道会被忽略并给出警告。

### 值代理

在定位到目标对象或目标属性后，若最后定位到的是一个属性，Creator 默认通过赋值该属性完成动画。但在某些情况下，对象可能并没有提供“属性设置”接口。在这种情况下，允许为该轨道指定 “值代理” 来进行 “自定义的赋值”。

例如，材质对象通过 `Material.prototype.setProperty(name, value)` 来改变其材质属性的值。我们就需要在值代理来完成这一操作。

要创建值代理，需要实现值代理工厂接口 `animation.ValueProxyFactory`，以下代码片段演示了这个步骤：

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
     * 需要实现该接口。`target` 是轨道路径的解析结果。
     * 返回的结果应实现值代理接口 `animation.ValueProxy`。
     */
    public forTarget (target: unknown): animation.ValueProxy {
        // 一个好的实现这里应该断言 `target` 一定是材质对象
        // asserts(target instanceof Material);
        const material = target as Material;
        return {
            set: (value) => {
                // `value` 是轨道产生的值
                material.setProperty(this._propertyName, value);
            },
        };
    }
}
```

其后，我们便可如此设置一个能修改材质属性的动画轨道：

```ts
import { MeshRenderer, animation } from 'cc';

function setupMaterialPropertyTrack(track: animation.TrackPath) {
    // 先设置路径，让它对准材质
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

> 为什么 `animation.Track` 的 `valueProxy` 字段是 `animation.ValueProxyFactory` 而不是 `animation.ValueProxy`？因为动画是可重用的，它可以绑定到多个对象上。Creator 在这里给出了“不同对象应由不同的值代理”的机会。另一方面，实现可以在 `forTarget` 这一层面做些优化。

> 此例仅为阐述值代理的创建和使用，Creator 本身提供了用于设置材质属性（一般地，称为 Uniform）的值代理工厂：`animation.UniformProxyFactory`。

## 循环模式

可以通过设置 `AnimationClip.wrapMode` 为动画剪辑设置不同的循环模式。以下列出了几种常用的循环模式：

| `AnimationClip.wrapMode` | 说明 |
| :--- | :--- |
| WrapMode.Normal  | 播放到结尾后停止 |
| WrapMode.Loop    | 循环播放 |
| WrapMode.PingPong | 从动画开头播放到结尾后，从结尾开始反向播放到开头，如此循环往复 |

更多循环模式，详情请参考 API [WrapMode](__APIDOC__/zh/enums/animation.wrapmode.html) 以及文档 [循环模式与循环次数](./animation-state.md#%E5%BE%AA%E7%8E%AF%E6%A8%A1%E5%BC%8F%E4%B8%8E%E5%BE%AA%E7%8E%AF%E6%AC%A1%E6%95%B0)。

## 外来动画

有些动画数据并不由轨道表示，但它以另一种形式存在于动画剪辑，并在运行时产生动画效果。这部分动画数据称为外来动画（Exotic Animation）。外来动画旨在于让 Creator 更高效地存储、计算一些复杂的动画。

用户无法访问和编辑外来动画。由编辑器从模型中导入的骨骼动画就存储在外来动画中。
