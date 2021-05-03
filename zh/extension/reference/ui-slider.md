# ui-slider 参考

## 基础用法

```html
<ui-slider value="0.5"></ui-slider>
```

![img](ui-kit/ui-slider.gif)

## 属性

属性名  | 参数值类型 | 功能说明
------|--------------|-------------  
`value`| number, 超过最大值则值更改为最大值，小于最小值则值更改为最小值| 组件当前值
[`focused`](#`pressed,-focused,-disabled`-控制状态)| boolean | 控制 `focused` 状态
[`disabled`](#`pressed,-focused,-disabled`-控制状态)| boolean | 控制 `disabled` 状态, 设置此属性后不再响应事件
`readonly`| boolean | 控制 `readonly` 状态, 设置此属性后不再响应事件
[`max`](#max)| number，默认为 infinite| 最大值
[`min`](#min)| number，默认为 -infinite| 最小值
[`step`](#step)| number，默认为 1| 滑动步长
[`precision`](#min)| number，默认为 20| 保留的小数点位数
`unnavigable`| boolean | 控制是否可导航, 组件默认可以通过 tab 键获取焦点, 设置此属性后无法通过 tab 获取焦点，并且鼠标获取焦点后不会有 focus 样式

## event 事件

事件名称|是否冒泡|触发机制
-------|-------|--------
`change` |是|滑动、 Input 输入改值或 `cancel` 改值触发
`confirm` |是|发生 `change` 改值后，失去焦点或键入 **enter**
`cancel` |是|发生 `change` 改值后，键入 **esc**（将恢复原值）

## 使用效果示例

### `pressed, focused, disabled` 控制状态

```html
<ui-slider placeholder="Normal..."></ui-slider>
<ui-slider placeholder="Focused..." focused></ui-slider>
<ui-slider placeholder="Disabled..." disabled></ui-slider>
<ui-slider placeholder="Readonly..." readonly></ui-slider>
```

![img](ui-kit/ui-slider-state.png)
