# DragonBones ArmatureDisplay 组件参考

ArmatureDisplay 组件可以对 DragonBones（龙骨）资源进行渲染和播放。

![dragonbones](./dragonbones/properties.png)

在 **层级管理器** 中选中需要添加 ArmatureDisplay 组件的节点，然后点击 **属性检查器** 下方的 **添加组件 -> DragonBones -> ArmatureDisplay** 按钮，即可添加 ArmatureDisplay 组件到节点上。

- ArmatureDisplay 组件的使用方法可参考 **DragonBones**（[GitHub](https://github.com/cocos/cocos-test-projects/tree/v3.4/assets/cases/dragonbones) | [Gitee](https://gitee.com/mirrors_cocos-creator/test-cases-3d/tree/v3.4/assets/cases/dragonbones)）范例。
- DragonBones 相关的脚本接口请参考 [DragonBones API](%__APIDOC__%/zh/#/docs/3.4/zh/dragonBones/Class/ArmatureDisplay)。

## DragonBones 属性

| 属性 | 功能说明
| :-------- | :---------- |
| CustomMaterial        | 自定义材质，可用于实现溶解、外发光等渲染效果。详情请参考 [自定义材质](../../ui-system/components/engine/ui-material.md)。
| Color                 | 设置骨骼动画颜色
| DragonAsset          | 骨骼信息数据，包含了骨骼信息（绑定骨骼动作、slots、渲染顺序、attachments、皮肤等）和动画，但不持有任何状态。<br>多个 ArmatureDisplay 可以共用相同的骨骼数据。<br/>可拖拽 DragonBones 导出的骨骼资源到这里
| DragonAtlasAsset    | 骨骼数据所需的 Atlas Texture 数据。可拖拽 DragonBones 导出的 Atlas 资源到这里
| Armature              | 当前使用的 Armature 名称
| Animation             | 当前播放的骨骼动画名称
| Animation Cache Mode  | 渲染模式，包括 **REALTIME**（默认）、**SHARED_CACHE** 和 **PRIVATE_CACHE** 三种。<br>1. **REALTIME** 模式，实时运算，支持 DragonBones 所有的功能。<br>2. **SHARED_CACHE** 模式，将骨骼动画及贴图数据进行缓存并共享，相当于预烘焙骨骼动画。拥有较高性能，但不支持动作融合、动作叠加、骨骼嵌套，只支持动作开始和结束事件。至于内存方面，当创建 N（N>=3）个相同骨骼、相同动作的动画时，会呈现内存优势。N 值越大，优势越明显。综上 **SHARED_CACHE** 模式适用于场景动画、特效、副本怪物、NPC 等，能极大地提高帧率和降低内存。<br>3. **PRIVATE_CACHE** 模式，与 **SHARED_CACHE** 类似，但不共享动画及贴图数据，且会占用额外的内存，仅存在性能优势，但如果大量使用该模式播放动画可能会造成卡顿。若想利用缓存模式的高性能，但又存在换装的需求（不能共享贴图数据）时，那么 **PRIVATE_CACHE** 就适合你。
| TimeScale            | 当前骨骼中所有动画的时间缩放率，默认为 **1**，表示不缩放。
| PlayTimes            | 播放默认动画的循环次数。<br>**-1** 表示使用 DragonBones 资源文件中的默认值<br>**0** 表示无限循环<br>**>0** 表示循环次数
| PremultipliedAlpha    | 图片是否启用贴图预乘，默认为 True。<br>当图片的透明区域出现色块时需要关闭该项。<br>当图片的半透明区域颜色变黑时需要启用该项
| DebugBones            | 是否显示 bone 的 debug 信息
| Sockets               | 用于将某些外部节点挂到指定的骨骼关节上，属性的值表示挂点的数量。详情请参考下文介绍。

> **注意**：
> 1. 当使用 ArmatureDisplay 组件时，**属性检查器** 中 Node 组件上的 **Anchor** 与 **Size** 属性是无效的。
> 2. ArmatureDisplay 组件属于 UI 渲染组件，而 Canvas 节点是 UI 渲染的 **渲染根节点**，所以带有该组件的节点必须是 Canvas 节点（或者是带有 RenderRoot2D 组件的节点）的子节点才能在场景中正常显示。

## DragonBones 换装

下面通过一个范例介绍 DragonBones 如何换装。通过替换插槽的显示对象，将下图机器人的武器替换为红色框中的武器。

![dragonbones-cloth](./dragonbones/cloth.png)

1. 首先在 **层级管理器** 中新建一个 Canvas 节点，然后在 Canvas 节点下新建一个空节点并命名为 `replaceDBNode`。选中 `replaceDBNode` 并在 **属性检查器** 中添加 ArmatureDisplay 组件，将绿色框中的武器资源拖拽至 ArmatureDisplay 组件的属性框中，如下图所示：

    ![dragonbones-cloth](./dragonbones/cloth2.png)

2. 再次新建一个空节点并命名为 `dbNode`，然后在 **属性检查器** 中添加 ArmatureDisplay 组件，并将机器人的资源拖拽至 ArmatureDisplay 组件的属性框中，如下图所示。可更改 ArmatureDisplay 组件的 `Animation` 属性用于设置想要播放的动画。

    ![dragonbones-cloth](./dragonbones/cloth3.png)

3. 在 **资源管理器** 中新建一个 TypeScript 脚本并命名为 `ReplaceSlotDisplay`，编写组件脚本。脚本代码如下：

    ```ts
    import { _decorator, Component, dragonBones } from 'cc';
    const { ccclass, property } = _decorator;

    @ccclass('ReplaceSlotDisplay')
    export class ReplaceSlotDisplay extends Component {

        @property({ type: dragonBones.ArmatureDisplay })
        armatureDisplay: dragonBones.ArmatureDisplay | null = null
        @property({ type: dragonBones.ArmatureDisplay })
        replaceArmatureDisplay: dragonBones.ArmatureDisplay | null = null;

        _leftWeaponIndex = 0;
        _rightDisplayIndex = 0;
        _rightDisplayNames:string[] = [];
        _rightDisplayOffset:{x: number, y: number}[] = [];

        start () {
            this.replaceArmatureDisplay!.node.active = false;
            this._leftWeaponIndex = 0;
            this._rightDisplayIndex = 0;
            this._rightDisplayNames = ["weapon_1004s_r", "weapon_1004e_r"];
            this._rightDisplayOffset = [{ x: 0, y: 0 }, { x: -60, y: 100 }];
        }

        left () {
            let armature = this.armatureDisplay!.armature();
            let slot = armature!.getSlot("weapon_hand_l");
            slot!.displayIndex = slot!.displayIndex == 0 ? 4 : 0;
        }

        right () {
            this._rightDisplayIndex++;
            this._rightDisplayIndex %= this._rightDisplayNames.length;
            let armature = this.armatureDisplay!.armature();
            let slot = armature!.getSlot("weapon_hand_r");
            let replaceArmatureName = this.replaceArmatureDisplay!.armatureName;
            const displayName = this._rightDisplayNames[this._rightDisplayIndex];
            let factory = dragonBones.CCFactory.getInstance() as any;
            factory.replaceSlotDisplay(this.replaceArmatureDisplay!.getArmatureKey(), replaceArmatureName , "weapon_r", displayName, slot);

            let offset = this._rightDisplayOffset[this._rightDisplayIndex];
            slot!.parent.offset.x = offset.x;
            slot!.parent.offset.y = offset.y;
            armature!.invalidUpdate();
        }
    }
    ```

4. 然后将 `ReplaceSlotDisplay` 脚本挂载到 Canvas 节点上，即将脚本拖拽到 Canvas 节点的 **属性检查器** 中。再将 **层级管理器** 中的 `dbNode` 节点和 `replaceDBNode` 节点分别拖拽到脚本组件对应的属性框中，并保存场景。

    ![dragonbones-cloth](./dragonbones/dragonbone_tscomponent.png)

5. 接下来我们需要利用 Button 组件的点击事件来触发 `ReplaceSlotDisplay` 脚本中的 `left` 和 `right` 回调，实现通过点击按钮来替换机器人左/右手的武器。

    在 **层级管理器** 的 Canvas 节点下新建两个 Button 节点并命名为 `left` 和 `right`，根据需要调整其位置、大小、文字显示等属性。

    然后在 **属性检查器** 中设置 `left` 和 `right` 节点的点击事件，将挂载了 `ReplaceSlotDisplay` 脚本组件的 Canvas 节点分别拖拽到两个节点的 `ClickEvents` 属性的 `cc.Node` 属性框中，指定脚本组件为 `ReplaceSlotDisplay`，并设置回调为 `left`/`right`（下图以 `right` 节点为例）：

    ![spine-cloth](./dragonbones/click-events.png)

6. 保存场景后，点击编辑器上方的预览按钮，然后点击 **Left**/**Right** 按钮即可看到机器人左/右手的武器已经被替换。

    ![dragonbones-cloth](./dragonbones/cloth4.png)

    详情可参考官方范例 **ReplaceSlotDisplay**（[GitHub](https://github.com/cocos/cocos-test-projects/tree/v3.4/assets/cases/dragonbones) | [Gitee](https://gitee.com/mirrors_cocos-creator/test-cases-3d/tree/v3.4/assets/cases/dragonbones)）。

    > **注意**：
    >
    > 1. 范例运行起来后右手替换的武器样式与场景中预备的武器样式不一致，这是资源问题导致的，开发者请参考具体的代码实现。
    > 2. 若预览时未显示场景，请检查各节点的 Layer 属性是否与 Camera 节点的保持一致。
    >
    >     ![layer](./dragonbones/layer.png)

## DragonBones 挂点与碰撞检测

DragonBones 挂点和碰撞检测的方法与 Spine 完全相同，详情请参考 [Spine 挂点与碰撞检测](./spine.md)。
