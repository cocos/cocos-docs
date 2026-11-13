# 世界空间精灵（SpriteRenderer）

用 `SpriteRenderer` 可以把一张 [SpriteFrame](../../asset/sprite-frame.md) 放进 3D 场景。例如，把角色图片立在地面上，让它走到墙后时被墙遮住。组件在节点的局部 XY 平面上绘制精灵，由场景相机渲染。界面中需要跟随 Canvas 布局的图片请使用 [Sprite 组件](../../ui-system/components/editor/sprite.md)。

## 在场景中显示第一张精灵

1. 在 3D 场景中新建一个空节点，将它放在相机前方。确认相机的 **Visibility** 包含节点的 **Layer**。
2. 在节点的属性检查器中选择 **添加组件 → 2D → SpriteRenderer**。
3. 从资源管理器将图片的 **spriteFrame** 子资源拖到组件的 **Sprite Frame** 属性。使用矩形帧（**Mesh Type** 为 **Rect**）。
4. 确认第一个材质槽使用内置的 `default-sprite-renderer-material`，或指定采用 `builtin-sprite-renderer` Effect 的材质。保持默认的 **Simple** 模式即可看到精灵。

此节点可以直接放在 3D 场景层级中，无需 Canvas 或 UITransform。内置材质启用深度测试，场景中写入深度的不透明物体可以遮住精灵。要指定多个透明对象的前后顺序，请在节点上添加 [Sorting 组件](../rendering/sorting.md)。

## 设置尺寸和绘制模式

在资源管理器中选中 **spriteFrame** 子资源，在 **Mesh Options** 中设置 **Pixels To Unit** 和 **Pivot X/Y**。Pixels To Unit（PPU）表示每个局部单位对应的像素数，默认 100。Pivot 是帧的归一化支点，默认 `(0.5, 0.5)`，即图片中心对齐节点原点。使用同一帧的世界精灵共享这两个设置。

在节点上用 **Draw Mode** 选择绘制方式。下表中的尺寸均为应用节点缩放前的局部尺寸。

| 模式 | 尺寸与图像的关系 |
| --- | --- |
| **Simple** | 自然尺寸等于帧裁剪矩形的宽高除以 PPU。例如，200 × 100 像素的帧在 100 PPU 下占 2 × 1 个单位。 |
| **Sliced** | 用组件的 **Size** 指定目标尺寸。在帧上设置四个九宫格边距，引擎按 PPU 将它们换算为局部单位。放大时四角保留原尺寸，中间拉伸。若某一轴放不下两侧边框，两个边框沿该轴按比例缩小。 |
| **Tiled** | 也使用 **Size** 和帧上的边距。四角保留，上下边横向重复，左右边纵向重复，中心沿两个方向重复。边距全为零时重复整张帧。 |

Sliced 和 Tiled 在首次指定 **Size** 前跟随当前帧的自然尺寸。显式设置的 Size 在换帧后保留。将宽或高设为零可停止绘制，恢复正值即可重新显示。

Tiled 的 **Tile Mode** 决定如何填满剩余空间。

- **Continuous**（默认）保持每块的自然尺寸，在末端裁剪不足一块的部分。
- **Adaptive** 只显示完整图块，并均匀调整图块尺寸以填满空间。每一轴独立计算。剩余部分达到 **Adaptive Mode Threshold** 指定的图块比例时，多放一块。阈值范围为 0 到 1，默认 0.5。例如，无边距、自然宽度为 1 的图块，在宽度 2.4 时排 2 块，在宽度 2.6 时排 3 块。

## 在脚本中使用

下面的函数把已加载的矩形帧绘制成宽 3、高 1 的九宫格面板。`material` 使用上文的精灵材质。

```ts
import { Material, Node, SpriteFrame, SpriteRenderer, Vec2 } from 'cc';

export function setPanel(node: Node, frame: SpriteFrame, material: Material) {
    const renderer = node.getComponent(SpriteRenderer) ?? node.addComponent(SpriteRenderer);
    renderer.setSharedMaterial(material, 0);
    renderer.spriteFrame = frame;
    renderer.drawMode = SpriteRenderer.DrawMode.SLICED;
    renderer.size = new Vec2(3, 1);
    return renderer;
}
```

- **Color** 与材质颜色逐通道相乘，包括透明度。**Flip X / Flip Y** 围绕局部支点翻转当前精灵。多个组件可以共享材质，并各自设置颜色与翻转。自定义 Effect 需要支持对应的 `spriteColor` 和 `spriteFlip` 参数。
- 脚本读取的 `size` 和 `color` 是副本。修改时应给属性重新赋值，例如 `renderer.size = new Vec2(4, 1)`。

## 图集和使用限制

- 可以使用静态图集中的矩形帧，包括打包时旋转的帧。同一帧也可以交给 UI Sprite。UI 动态合图后，世界精灵继续从合图前的源纹理取样。可以保留 UI 的 **Packable** 设置。世界精灵之间不会因 UI 动态合图而自动合批。
- Tiled 单个精灵最多生成 16,383 个四边形，包含边框。超过上限时组件跳过绘制。若大面积平铺后图像消失，可减小目标尺寸或增大单块的自然尺寸。
- **RenderTexture** 有已知方向问题。在 Web 和 Windows Native 上，内置 Effect 显示相机渲染纹理时可能上下颠倒。普通 Texture2D 不受此问题影响。
