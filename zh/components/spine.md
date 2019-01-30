# Spine 组件参考

Spine 组件支持 Spine 导出的数据格式，并对骨骼动画（Spine）资源进行渲染和播放。

![spine](./spine/spine-properties.png)

选中节点，点击 **属性检查器** 下方的 **添加组件 -> 渲染组件 -> Spine Skeleton** 按钮，即可添加 Spine 组件到节点上。

Spine 的脚本接口请参考 [Skeleton API](../../../api/zh/classes/Skeleton.html)。

## Spine 属性

| 属性 |   功能说明
| ------------------ | ------------------ |
| Skeleton Data      | 骨骼信息数据，拖拽 Spine 导出后的 **.json** 资源到该属性中使用
| Default Skin       | 选择默认的皮肤
| Animation          | 当前播放的动画名称
| Loop               | 是否循环播放当前动画
| Premultiplied Alpha| 图片是否启用贴图预乘，默认为 True。<br>当图片的透明区域出现色块时需要关闭该项。<br>当图片的半透明区域颜色变黑时需要启用该项。
| Time Scale         | 当前骨骼中所有动画的时间缩放率
| Debug Slots        | 是否显示 slot 的 debug 信息
| Debug Bones        | 是否显示骨骼的 debug 信息

**注意**：当使用 Spine 组件时，**属性检查器** 中 Node 组件上的 **Anchor** 与 **Size** 属性是无效的。
