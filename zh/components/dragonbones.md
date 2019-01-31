# DragonBones 组件参考

DragonBones 组件可以对骨骼动画（DragonBones）资源进行渲染和播放。

![dragonbones](./dragonbones/properties.png)

点击 **属性检查器** 下方的 **添加组件 -> 渲染组件 -> DragonBones** 按钮，即可添加 DragonBones 组件到节点上。

DragonBones 组件在脚本中的操作请参考 [example-cases](https://github.com/cocos-creator/example-cases) 中的 [DragonBones 测试例](https://github.com/cocos-creator/example-cases/tree/v2.0/assets/cases/dragonbones)。<br>DragonBones 相关的脚本接口请参考 [DragonBones API](../../../api/zh/modules/dragonBones.html)。

## DragonBones 属性

| 属性 |   功能说明
| ------------------ | ------------------ |
| Dragon Asset       | 骨骼信息数据，包含了骨骼信息（绑定骨骼动作，slots，渲染顺序，attachments，皮肤等等）和动画，但不持有任何状态。<br>多个 ArmatureDisplay 可以共用相同的骨骼数据。<br/>可拖拽 DragonBones 导出的骨骼资源到这里
| Dragon Atlas Asset | 骨骼数据所需的 Atlas Texture 数据。可拖拽 DragonBones 导出的 Atlas 资源到这里
| Armature           | 当前使用的 Armature 名称
| Animation          | 当前播放的动画名称
| Time Scale         | 当前骨骼中所有动画的时间缩放率
| Play Times         | 播放默认动画的循环次数。<br>-1 表示使用配置文件中的默认值；<br>0 表示无限循环；<br>>0 表示循环次数
| Premultiplied Alpha| 图片是否启用贴图预乘，默认为 True。（v2.0.7 中新增）<br>当图片的透明区域出现色块时需要关闭该项。<br>当图片的半透明区域颜色变黑时需要启用该项
| Debug Bones        | 是否显示 bone 的 debug 信息

**注意**：当使用 DragonBones 组件时，**属性检查器** 中 Node 组件上的 **Anchor** 与 **Size** 属性是无效的。
