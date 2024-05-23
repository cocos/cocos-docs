# ui-text-area 参考

## 基础用法

```html
<ui-text-area placeholder="Enter your text..."></ui-text-area>
```
    
![img](ui-kit/ui-text-area.gif)

## 属性
属性名  | 参数值类型 | 功能说明
------|--------------|-------------  
`value`| number, 超过最大值则值更改为最大值，小于最小值则值更改为最小值| 输入框中的内容值
[`focused`](#`pressed,-focused,-disabled`-控制状态)| boolean | 控制 `focused` 状态 
[`disabled`](#`pressed,-focused,-disabled`-控制状态)| boolean | 控制 `disabled` 状态, 设置此属性后不再响应事件
`readonly`| boolean | 控制 `readonly` 状态, 设置此属性后不再响应事件
`unnavigable`| boolean | 控制是否可导航, 组件默认可以通过 tab 键获取焦点, 设置此属性后无法通过 tab 获取焦点，并且鼠标获取焦点后不会有 focus 样式
`placeholder`| string | 组件不存在 `value` 值时显示的内容

## 样式控制
种类              | 参数值类型 | 功能说明
----------------|-----------|-------------
[size](#size-控制大小)      | `class` 样式名, string, 支持值"**mini, tiny, small, medium, large, big, huge, massive**" | 控制组件整体大小，包括内部字体

## event 事件
事件名称|是否冒泡|触发机制
-------|-------|--------
`change` |是|组件进行输入改变值时或因触发 `cancel` 改值
`confirm` |是|发生 `change` 改值后，失去焦点或键入 **enter**
`cancel` |是|发生 `change` 改值后，键入 **esc**后触发（将恢复原值）

## 使用效果示例

### `pressed, focused, disabled` 控制状态
```html
<ui-text-area placeholder="Normal..."></ui-text-area>
<ui-text-area placeholder="Focused..." focused></ui-text-area>
<ui-text-area placeholder="Disabled..." disabled></ui-text-area>
<ui-text-area placeholder="Readonly..." readonly></ui-text-area>
```
    
![img](ui-kit/ui-text-area-state.png)

### size 控制大小
```html
<ui-text-area class="mini"></ui-text-area>
<ui-text-area class="tiny"></ui-text-area>
 ····
```
![img](ui-kit/ui-text-area-size.png)