# ToggleGroup component reference

> **Node**: ToggleGroup is deprecated, please use [ToggleContainer](toggleContainer.md) instead.

ToggleGroup is not a visible UI component but a way to modify the behavior of a set of Toggles. Toggles that belong to the same group could only have one of them to be switched on at a time.

![toggle-group](./toggle/toggle-group.png)

Click the **Add Component** button at the bottom of the **Properties** panel and select **ToggleGroup** from **UI Component**. You can then add the ToggleGroup component to the node.

The API reference of ToggleGroup is here: [ToggleGroup API](%__APIDOC__%/en/classes/ToggleGroup.html).

## ToggleGroup property

| Property       |   Functions Explanation
| -------------- | ----------- |
| Allow Switch Off | If this setting is true, a toggle could be switched off and on when pressed. If it is false, it will make sure there is always only one toggle could be switched on and the already switched on toggle can't be switched off.

## Detailed explanation

The ToggleGroup won't be used alone and it usually be used with `Toggle` to implement the RatioButton.
