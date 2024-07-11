# ToggleGroup 组件参考

**注意**：该组件已弃用，请使用 [ToggleContainer](toggleContainer.md)

![toggle-group](./toggle/toggle-group.png)

ToggleGroup 不是一个可见的 UI 组件，它可以用来修改一组 Toggle 组件的行为。当一组 Toggle 属于同一个 ToggleGroup 的时候，任何时候都只能有一个 Toggle 处于选中状态。

点击 **属性检查器** 下面的 **添加组件** 按钮，然后从 **UI 组件** 中选择 **ToggleGroup**，即可添加 ToggleGroup 组件到节点上。

ToggleGroup 的脚本接口请参考 [ToggleGroup API](%__APIDOC__%/zh/classes/ToggleGroup.html)。

## ToggleGroup 属性

| 属性 |   功能说明
| -------------- | ----------- |
| Allow Switch Off | 如果这个设置为 true，那么 toggle 按钮在被点击的时候可以反复地被选中和未选中。

## 详细说明

ToggleGroup 一般不会单独使用，它需要与 `Toggle` 配合使用来实现 RadioButton 的单选效果。
