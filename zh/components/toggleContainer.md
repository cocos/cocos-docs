# ToggleContainer 组件参考

![toggle-container](../toggle/toggle-container.png)

ToggleContainer 不是一个可见的 UI 组件，它可以用来修改一组 Toggle  组件的行为。当一组 Toggle 属于同一个 ToggleContainer 的时候，任何时候只能有一个 Toggle 处于选中状态。

**注意**：所有包含 Toggle 组件的一级子节点都会自动被添加到该容器中

点击 **属性检查器** 下面的 **添加组件** 按钮，然后从 **添加 UI 组件** 中选择 **ToggleContainer**，即可添加 ToggleContainer 组件到节点上。

ToggleContainer 的脚本接口请参考 [ToggleContainer API](../../../api/zh/classes/ToggleContainer.html)。

## ToggleContainer 属性

| 属性 |   功能说明
| -------------- | ----------- |
| allowSwitchOff | 如果这个设置为 true， 那么 toggle 按钮在被点击的时候可以反复地被选中和未选中。

## 详细说明

ToggleContainer 一般不会单独使用，它需要与 `Toggle` 配合使用来实现 RadioButton 的单选效果。
