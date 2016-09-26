# Button component reference

The button component responds to a click from the user. When the user clicks a Button, its status will change. In addition, users can assign a custom behavior to buttons' click event.

![button.png](./button/button.png)

![button-color](./button/button-color.png)

Click the ‘add component’ button at the bottom of the **Properties** panel and select ‘Button’ from ‘add UI component’. You can then add the Button component to the node.

## Button attribute

| Attribute |   Function explanation
| -------------- | ----------- |
|Interactable| Boolean type, if set to false then the Button component enters the forbidden state.
|enableAutoGrayEffect| Boolean type, if set to true, the Button's target sprite will turn gray when interactable is false. Don't  take effect when Transition type is SPRITE and the disabledSprite property is exists.
|Transition| Enumeration type, including NONE, COLOR and SPRITE. Each type corresponds to a different Transition setting. Please check more detailed information in the chapter ‘Button Transition’.
|Click Event| Default list type is null. Each event added by the user is composed of the node reference, component name and a response function. Please check more detailed information in the chapter ‘Button Event’.


### Button Transition
Button Transition is used to indicate the status of the Button when clicked by the user. Currently the types available are NONE, COLOR, SPRITE and SCALE.

![transition](./button/transition.png)

### Color Transition

![color-transition](./button/color-transition.png)


| Attribute |   Function Explanation
| -------------- | ----------- |
|Normal| Color of Button under Normal status.
|Pressed| Color of Button under Pressed status.
|Hover| Color of Button under Hover status.
|Disabled| Color of Button under Disabled status.
|Duration| Time interval needed for Button status switching.

### Sprite Transition

![sprite-transition](./button/sprite-transition.png)

| Attribute |   Function Explanation
| -------------- | ----------- |
|Normal| SpriteFrame of Button under Normal status.
|Pressed| SpriteFrame of Button under Pressed status.
|Hover| SpriteFrame of Button under Hover status.
|Disabled| SpriteFrame of Button under Disabled status.

### Scale Transition

![scaleTransition](./button/scaleTransition.png)

| Attribute |   Function Explanation
| -------------- | ----------- |
|Duration| Time interval needed for Button status switching.
|ZoomScale| When user press the button, the button will zoom to a scale.The final scale of the button  equals (button original scale * zoomScale), zoomScale could be negative value.

### Button event

![button-event](./button/button-event.png)


| Attribute |   Function Explanation
| -------------- | ----------- |
|Target| Node with the script component.
|Component| Script component name.
|Handler| Assign a callback function which will be triggered when the user clicks and releases the Button.

#### Detailed explanation

Button currently only supports the On Click event. This means only when users click and release the Button will the corresponding call-back function be triggered.

There is a *event* parameter in Button's callback, if you want to access the Button component in the callback,
you could use the following code snippet:

```js
callback: function(event) {
    var node = event.target;
    var button = node.getComponent(cc.Button);
}
```
---

Continue on to read about [ProgressBar Component reference](progress.md).
