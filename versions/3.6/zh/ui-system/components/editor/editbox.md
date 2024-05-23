# EditBox 组件参考

EditBox 是一种文本输入组件，该组件让你可以轻松获取用户输入的文本。

![editbox](editbox/editbox.png)

点击 **属性检查器** 下面的 **添加组件** 按钮，然后从 **UI/EditBox** 即可添加 EditBox 组件到节点上。

EditBox 的脚本接口请参考 [EditBox API](__APIDOC__/zh/class/EditBox)。

关于使用可以参考范例 **EditBox**（[GitHub](https://github.com/cocos/cocos-test-projects/tree/v3.6/assets/cases/ui/12.editbox) | [Gitee](https://gitee.com/mirrors_cocos-creator/test-cases-3d/tree/v3.6/assets/cases/ui/12.editbox)）。

## EditBox 属性

| 属性                   | 功能说明                                                                       |
| :-------------         | :----------                                                                  |
| BackgroundImage      | 输入框背景节点上挂载的 Sprite 组件对象  |
| FontColor            | 输入框文本的颜色 |
| FontSize             | 输入框文本的字体大小 |
| InputFlag           | 指定输入标识：可以指定输入方式为密码或者单词首字母大写（仅支持 Android 平台）|
| InputMode           | 指定输入模式：ANY 表示多行输入，其它都是单行输入，移动平台上还可以指定键盘样式。 |
| LineHeight           | 输入框文本的行高 |
| MaxLength            | 输入框最大允许输入的字符个数  |
| Placeholder          | 输入框占位符的文本内容  |
| PlaceholderFontColor | 输入框占位符的文本字体颜色  |
| PlaceholderFontSize  | 输入框占位符的文本字体大小  |
| PlaceholderLabel     | 输入框占位符节点上挂载的 Label 组件对象  |
| ReturnType           | 指定移动设备上面回车按钮的样式
| String               | 输入框的初始输入内容，如果为空则会显示占位符的文本 |
| TabIndex             | 修改 DOM 输入元素的 tabIndex，这个属性只有在 Web 上面修改有意义。 |
| TextLabel            | 输入框输入文本节点上挂载的 Label 组件对象  |

## EditBox 事件

![editbox-event](editbox/editbox-event.png)

事件结构参考：[组件事件结构](./button.md#组件事件结构)

- **Editing Did Began**：该事件在用户点击输入框获取焦点的时候被触发。
- **Editing Did Ended**：在单行模式下面，一般是在用户按下回车或者点击屏幕输入框以外的地方调用该函数。<br>如果是多行输入，一般是在用户点击屏幕输入框以外的地方调用该函数。
- **Text Changed**：该事件在用户每一次输入文字变化的时候被触发。但若是通过 `EditBox.string` 的 `setter` 设置时不会派发该事件。

## 详细说明

- 如果需要输入密码，则需要把 Input Flag 设置为 password，同时 Input Mode 必须是 Any 之外的选择，一般选择 Single Line。
- 如果要输入多行，可以把 Input Mode 设置为 Any。
- 背景图片支持九宫格缩放

## 通过脚本代码添加回调

### 方法一

这种方法添加的事件回调和使用编辑器添加的事件回调是一样的，都是通过代码添加。首先需要构造一个 `EventHandler` 对象，然后设置好对应的 `target`、`component`、`handler` 和 `customEventData` 参数。

```ts
import { _decorator, Component, EditBox, EventHandler } from 'cc';
const { ccclass, property } = _decorator;

@ccclass("example")
export class example extends Component {
    onLoad() {
        const editboxEventHandler = new EventHandler();
        editboxEventHandler.target = this.node; // 这个 node 节点是你的事件处理代码组件所属的节点
        editboxEventHandler.component = 'example';
        editboxEventHandler.handler = 'onEditDidBegan';
        editboxEventHandler.customEventData = 'foobar';

        const editbox = this.node.getComponent(EditBox);
        editbox.editingDidBegan.push(editboxEventHandler);
        // 你也可以通过类似的方式来注册其它回调函数
        // editbox.editingDidEnded.push(editboxEventHandler);
        // editbox.textChanged.push(editboxEventHandler);
        // editbox.editingReturn.push(editboxEventHandler);
    }

    onEditDidBegan(editbox, customEventData) {
        // 这里 editbox 是一个 EditBox 对象
        // 这里的 customEventData 参数就等于你之前设置的 "foobar"
    }
    // 假设这个回调是给 editingDidEnded 事件的
    onEditDidEnded(editbox, customEventData) {
        // 这里 editbox 是一个 EditBox 对象
        // 这里的 customEventData 参数就等于你之前设置的 "foobar"
    }
    // 假设这个回调是给 textChanged 事件的
    onTextChanged(text, editbox, customEventData) {
        // 这里的 text 表示修改完后的 EditBox 的文本内容
        // 这里 editbox 是一个 EditBox 对象
        // 这里的 customEventData 参数就等于你之前设置的 "foobar"
    }
    // 假设这个回调是给 editingReturn 事件的
    onEditingReturn(editbox, customEventData) {
        // 这里 editbox 是一个 EditBox 对象
        // 这里的 customEventData 参数就等于你之前设置的 "foobar"
    }
}
```

### 方法二

通过 `editbox.node.on('editing-did-began', ...)` 的方式来添加

```ts
// 假设我们在一个组件的 onLoad 方法里面添加事件处理回调，在 callback 函数中进行事件处理:
import { _decorator, Component, EditBox } from 'cc';
const { ccclass, property } = _decorator;

@ccclass("example")
export class example extends Component {
    @property(EditBox)
    editbox: EditBox | null = null;
    onLoad(){
        this.editbox.node.on('editing-did-began', this.callback, this);
    }

    callback(editbox: EditBox){
        // 回调的参数是 editbox 组件，注意这种方式注册的事件，无法传递 customEventData
    }
}
```

同样的，你也可以注册 `editing-did-ended`、`text-changed` 和 `editing-return` 事件，这些事件的回调函数的参数与 `editing-did-began` 的参数一致。
