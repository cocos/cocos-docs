# EditBox Component Reference

__EditBox__ is a text input component, use this component to get user input easily.

![editbox](editBox/editbox.png)

Click the __Add Component__ button at the bottom of the __Inspector__ panel and select __UI/EditBox__ to add the __EditBox__ component to the node.

To use `EditBox`, please refer to the [EditBox API](__APIDOC__/en/#/docs/3.3/en/ui/Class/EditBox) documentation and the [EditBox](https://github.com/cocos/cocos-test-projects/tree/v3.3/assets/cases/ui/12.editbox) scene of the test-cases-3d project.

## EditBox Properties

| Property   | Function Explanation |
| --------------      | -----------   |
| __BackgroundImage__      | The Sprite component attached to the node for EditBox's background |
| __FontColor__            | The input text color of EditBox |
| __FontSize__             | The input text size of EditBox |
| __InputFlag__            | Specify the input flag: password or capitalized word. (Only supports Android platform) |
| __InputMode__            | Specify the input mode: multiline or single line |
| __LineHeight__           | The input text line height of EditBox |
| __MaxLength__            | The maximize input characters of EditBox  |
| __Placeholder__          | The text content of EditBox placeholder |
| __PlaceholderFontColor__ | The text font color of EditBox placeholder |
| __PlaceholderFontSize__  | The text font size of EditBox placeholder  |
| __PlaceholderLabel__     | The Label component attached to the node for EditBox's placeholder text label |
| __ReturnType__           | The keyboard return type of EditBox. This is useful for keyboard of mobile device |
| __String__               | The initial input text of EditBox, which displays the text of the placeholder if not set |
| __TabIndex__             | Set the `tabIndex` of the DOM input element, only useful on the Web |
| __TextLabel__            | The Label component attached to the node for EditBox's input text label |

## EditBox Events

![editbox-event](editbox/editbox-event.png)

For event structure you can refer to the [Button](./button.md) documentation.

- __Editing Did Began__: This event will be triggered when the user __clicks__ on the __EditBox__.
- __Editing Did Ended__: This event will be triggered when the __EditBox loses focus__.
    - When in __single line input mode__, it's triggered after user presses __Enter__ key or __clicks__ the area __outside__ of __EditBox__.
    - When in __multiline input mode__, it's triggered only after user __clicks__ the area __outside__ of __EditBox__.
- __Text Changed__: This event will be triggered when the __content__ in __EditBox__ is __changed each time__. However, it is not dispatched if it is set by `setter` of `EditBox.string`.

## Detailed Explanation

- If you want to input password, you need set __Input Flag__ to `PASSWORD` and the __Input Mode__ mustn't be `ANY`, usually we use __Single Line__.
- If you want to enable multiline input support, you can set the __Input Mode__ to `Any`.
- The background image of EditBox support 9-slicing sprite frame, you could customize the border as you did in Sprite component.

## Add a callback through the script code

### Method one

The event callback added by this method is the same as the event callback added by the editor, all added by code. First you need to construct a `EventHandler` object, and then set the corresponding `target`, `component`, `handler` and `customEventData` parameters.

```ts
import { _decorator, Component, EditBoxComponent, EventHandler } from 'cc';
const { ccclass, property } = _decorator;

@ccclass("example")
export class example extends Component {
    onLoad() {
        const editboxEventHandler = new EventHandler();
        // This node is the node to which your event handler code component belongs.
        editboxEventHandler.target = this.node;
        editboxEventHandler.component = 'example';
        editboxEventHandler.handler = 'onEditDidBegan';
        editboxEventHandler.customEventData = 'foobar';

        const editbox = this.node.getComponent(EditBoxComponent);
        editbox.editingDidBegan.push(editboxEventHandler);
        // You can also register other callback functions in a similar way.
        // editbox.editingDidEnded.push(editboxEventHandler);
        // editbox.textChanged.push(editboxEventHandler);
        // editbox.editingReturn.push(editboxEventHandler);
    }

    onEditDidBegan(editbox, customEventData) {
        // The editbox here is a EditBox object.
        // The customEventData parameter here is equal to the "foobar" you set before.
    }

    // Suppose this callback is for the editingDidEnded event.
    onEditDidEnded(editbox, customEventData) {
        // The editbox here is a EditBox object.
        // The customEventData parameter here is equal to the "foobar" you set before.
    }

    // Suppose this callback is for the textChanged event.
    onTextChanged(text, editbox, customEventData) {
        // The text here indicates the text content of the modified EditBox.
        // The editbox here is a EditBox object.
        // The customEventData parameter here is equal to the "foobar" you set before.
    }
    // Suppose this callback is for the editingReturn event.
    onEditingReturn(editbox, customEventData) {
        // The editbox here is a EditBox object.
        // The customEventData parameter here is equal to the "foobar" you set before.
    }
}
```

### Method two

Added with **Node**'s event API `editbox.node.on('editing-did-began', ...)`.

```ts
// Suppose we add an event handler callback inside a component's onLoad method and event handlers in the callback function.
import { _decorator, Component, EditBoxComponent } from 'cc';
const { ccclass, property } = _decorator;

@ccclass("example")
export class example extends Component {
    @property(EditBoxComponent)
    editbox: EditBoxComponent | null = null;
    onLoad(){
        this.editbox.node.on('editing-did-began', this.callback, this);
    }

    callback(editbox: EditBoxComponent){
        // The callback parameter is the EditBox component, note that events registered this way cannot pass customEventData.
    }
}
```

Similarly, you can register events such as `editing-did-ended`, `text-changed`, `editing-return`, etc. The parameters of the callback function for these events are consistent with the parameters of `editing-did-began`.
