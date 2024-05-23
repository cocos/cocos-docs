# ui-node 参考

## 基础用法

```html
<ui-node class="flex-1" type="cc.Node" typename="Node" droppable="node"></ui-node>
```

## 属性

属性名  | 参数值类型 | 功能说明
------|--------------|-------------  
`value`| string | 接收资源的 uuid
`values`| array | 返回存储资源 uuid 的数组
`droppable`| string | 支持接收的元素名称，多种元素用逗号隔开
`typename`| string | 显示的资源类型名称
`empty`| boolean，只读| 是否内部已有资源数据
`highlighted`| boolean | 是否高亮
`invalid`| boolean | 是否有效
`multi-values`| boolean | 是否允许接收多个资源数据

## event 事件

事件名称|是否冒泡|触发机制
-------|-------|--------
`change` |是|拖拽资源改变值时或修改资源数据或因触发 `cancel` 改值
`confirm` |是|`change` 事件后，失去焦点或键入 **enter**
`cancel` |是|发生 `change` 改值后，尚未 `confirm` 键入 **esc**（将恢复原值）
