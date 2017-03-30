# RichText 组件参考

RichText 组件用来显示一段带有不同样式效果的文字，你可以通过一些简单的 BBCode 标签来设置文字的样式。
目前支持的样式有：颜色(color)，字体大小(size)，字体描边(outline)，加粗(b)，斜体(i)，下划线(u)，换行(br)，图片(img)和点击事件(on)，并且不同的 BBCode 标签是可以支持相互嵌套的。

更多关于 BBCode 标签的内容，请参考本文档的 `BBCode 标签格式说明` 小节。

![richtext](./richtext/richtext.png)

点击**属性检查器**下面的`添加组件`按钮，然后从`添加渲染组件`中选择 `RichText`，即可添加 RichText 组件到节点上。

富文本的脚本接口请参考 [RichText API](../api/classes/RichText.html)。

## RichText 属性

| 属性             | 功能说明                                                                                                          |
| --------------   | -----------                                                                                                       |
| String           | 富文本的内容字符串, 你可以在里面使用 BBCode 来指定特定文本的样式                                                  |
| Horizontal Align | 水平对齐方式                                                                                                      |
| Font Size        | 字体大小, 单位是 point （注意，该字段不会影响 BBCode 里面设置的字体大小）                                         |
| Font             | 富文本定制字体，所有的 label 片断都会使用这个定制的 TTF 字体                                                      |
| Line Height      | 字体行高, 单位是 point                                                                                            |
| Max Width        | 富文本的最大宽度, 传 0 的话意味着必须手动换行.                                                                    |
| Image Atlas      | 对于 img 标签里面的 src 属性名称，都需要在 imageAtlas 里面找到一个有效的 spriteFrame，否则 img tag 会判定为无效。 |

## BBCode 标签格式
### 基本格式
目前支持的标签类型有：size，color, b, i, u, img 和 on，分别用来定制字体大小，字体颜色, 加粗，斜体，下划线，图片和点击事件。
每一个标签都有一个起始标签和一个结束标签，起始标签的名字和属性格式必要符合要求，且全部为小写。
结束标签的名字不做任何检查，只需要满足结束标签的定义即可。

下面分别是应用 size 和 color 标签的一个例子：

`<color=green>你好</color>，<size=50>Creator</>`

### 支持标签
注意：所有的 tag 名称必须是小写，且属性值是用=号赋值

|名称|描述|示例|注意事项
| -------|------- | -----|------ |
|color|指定字体渲染颜色，颜色值可以是内置颜色，比如 white，black 等，也可以使用 16 进制颜色值，比如#ff0000 表示红色| `<color=#ff0000>Red Text</color>` | 内置颜色值参考 [cc.Color](../api/classes/Color.html)
|size|指定字体渲染大小，大小值必须是一个整数| `<size=30>enlarge me</size>` |  Size 值必须使用等号赋值
|outline|设置文本的描边颜色和描边宽度 | `<outline color=red width=4>A label with outline</outline>` | 如果你没有指定描边的颜色或者宽度的话，那么默认的颜色是白色(#ffffff),默认的宽度是 1
|b|指定使用粗体来渲染| `<b>This text will be rendered as bold</b>`| 名字必须是小写，且不能写成 bold
|i|指定使用斜体来渲染| `<i>This text will be rendered as italic</i>`| 名字必须是小写，且不能写成 italic
|u|给文本添加下划线|`<u>This text will have a underline</u>`| 名字必须是小写，且不能写成 underline
|on|指定一个点击事件处理函数，当点击该 Tag 所在文本内容时，会调用该事件响应函数| `<on click="handler"> click me! </on>` | 除了 on 标签可以添加 click 属性，color 和 size 标签也可以添加，比如 `<size=10 click="handler2">click me</size>`
|br|插入一个空行| `<br/>`| 注意：`<br></br>` 和 `<br>` 都是不支持的。
|img| 给富文本添加图文混排功能，img 的 src 属性必须是 ImageAtlas  图集里面的一个有效的 spriteframe 名称 |`<img src='emoji1' click='handler' />` | 注意: 只有 `<img src='foo' click='bar' />` 这种写法是有效的。如果你指定一张很大的图片，那么该图片创建出来的精灵会被等比缩放，缩放的值等于富文本的行高除以精灵的高度。


标签与标签是支持嵌套的，且嵌套规则跟 HTML 是一样的。比如下面的嵌套标签设置一个文本的渲染大小为 30，且颜色为绿色。

`<size=30><color=green>I'm green></color></size>`

也可以实现为:

`<color=green><size=30>I'm green</size></color>`

## 详细说明
富文本组件全部由 JS 层实现，采用底层的 Label 节点拼装而成，并且在上层做排版逻辑。
这意味着，你新建一个复杂的富文本，底层可能有十几个 label 节点，而这些 label 节点都是采用系统字体渲染的，

所以，一般情况下，你不应该在游戏的主循环里面频繁地修改富文本的文本内容, 这可能会导致性能比较低。

另外，如果能不使用富文本组件，就尽量使用普通的文本组件，并且 BMFont 的效率是最高的。
