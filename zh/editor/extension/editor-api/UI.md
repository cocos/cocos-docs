# UI

UI 组件

## 变量


### Base

• **Base**: `any`



### Bit

• **Bit**: `any`



### Button

• **Button**: `any`



### Checkbox

• **Checkbox**: `any`



### Code

• **Code**: `any`



### Color

• **Color**: `any`



### ColorPicker

• **ColorPicker**: `any`



### Curve

• **Curve**: `any`



### CurveEditor

• **CurveEditor**: `any`



### DragAreax

• **DragArea**: `any`



### DragItem

• **DragItem**: `any`



### DragObject

• **DragObject**: `any`



### File

• **File**: `any`



### Gradient

• **Gradient**: `any`



### GradientPicker

• **GradientPicker**: `any`



### Icon

• **Icon**: `any`



### Image

• **Image**: `any`



### Input

• **Input**: `any`



### Label

• **Label**: `any`



### Link

• **Link**: `any`



### Loading

• **Loading**: `any`



### Markdown

• **Markdown**: `any`



### NodeGraph

• **NodeGraph**: `any`



### NumInput

• **NumInput**: `any`



### Progress

• **Progress**: `any`



### Prop

• **Prop**: `any`



### QRCode

• **QRCode**: `any`



### Section

• **Section**: `any`



### Select

• **Select**: `any`



### Slider

• **Slider**: `any`



### Tab

• **Tab**: `any`



### TextArea

• **TextArea**: `any`



### Tooltip

• **Tooltip**: `any`



## 函数

### register

▸ **register**(`tagName`, `element`): `void`

在当前页面上注册一个自定义节点
谨慎使用，之后会被移除

**请求参数**

| Name      | Type     | Description    |
| :-------- | :------- | :------------- |
| `tagName` | `string` | 元素名字       |
| `element` | `any`    | 元素的定义函数 |

**返回结果**

`void`

```typescript
Editor.UI.register('ui-new-tag', NewTag);
```
