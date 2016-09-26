# EditBox 组件参考

EditBox 是一种文本输入组件，该组件让你可以轻松获取用户输入的文本。

![editbox](./editbox/editbox.png)

点击**属性检查器**下面的`添加组件`按钮，然后从`添加 UI 组件`中选择`EditBox`，即可添加 EditBox 组件到节点上。

EditBox 的脚本接口请参考[EditBox API](../api/classes/EditBox.html)。

## EditBox 属性

| 属性 |   功能说明
| -------------- | ----------- |
| String| 输入框的初始输入内容，如果为空则会显示占位符的文本
| Background Image | 输入框的背景图片
| Keyboard Return Type | 指定移动设备上面回车按钮的样式
| Input Flag | 指定输入标识：可以指定输入方式为密码或者单词首字母大写
| Input Mode | 指定输入模式: ANY 表示多行输入，其它都是单行输入，移动平台上还可以指定键盘样式。
|Font Size| 输入框文本的字体大小
|Line Height| 输入框文本的行高
|Font Color| 输入框文本的颜色
|Placeholder|输入框占位符的文本内容
|Placeholder Font Size| 输入框占位符的字体大小
|Placeholder Font Color| 输入框占位符的字体颜色
|Max Length| 输入框最大允许输入的字符个数

## EditBox 事件

![editbox-event](./editbox/editbox-event.png)

### Editing Did Began 事件
| 属性 |   功能说明
| -------------- | ----------- |
|Target| 带有脚本组件的节点。
|Component| 脚本组件名称。
|Handler| 指定一个回调函数，当用户开始输入文本的时候会调用该函数


### Text Changed 事件
| 属性 |   功能说明
| -------------- | ----------- |
|Target| 带有脚本组件的节点。
|Component| 脚本组件名称。
|Handler| 指定一个回调函数，当用户正在输入文本的时候会调用该函数

### Editing Did Ended 事件
| 属性 |   功能说明
| -------------- | ----------- |
|Target| 带有脚本组件的节点。
|Component| 脚本组件名称。
|Handler| 指定一个回调函数，当用户输入文本结束时会调用该函数。在单行模式下面，一般是在用户按下回车或者点击屏幕输入框以外的地方调用该函数。如果是多行输入，一般是在用户点击屏幕输入框以外的地方调用该函数。


## 详细说明

- Keyboard Return Type 特指在移动设备上面进行输入的时候，弹出的虚拟键盘上面的回车键样式。
- 如果需要输入密码，则需要把 Input Flag 设置为 password，同时 Input Mode 必须是 Any 之外的选择，一般选择 Single Line。
- 如果要输入多行，可以把 Input Mode 设置为 Any。
- 背景图片支持九宫格缩放

<hr>

继续前往 [Collider 组件参考](collider.md) 说明文档。
