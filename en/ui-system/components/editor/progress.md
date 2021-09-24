# ProgressBar Component Reference

__ProgressBar__ is usually used to show the progress of a certain operation in the game. Add the __ProgressBar__ component to a node and associate a __Bar Sprite__ to this component. Then the __Bar Sprite__ can be controlled to show progression in the scene.

![add-progressbar](progress/add-progressbar.png)

Click the __Add Component__ button at the bottom of the __Inspector__ panel and select __UI/ProgressBar__ to add the __ProgressBar__ component to the node.

To use `Progress`, please refer to the [Mask API](__APIDOC__/en/#/docs/3.3/en/ui/Class/ProgressBar) documentation and the [Progress](https://github.com/cocos-creator/test-cases-3d/tree/v3.3/assets/cases/ui/11.progress) scene of the test-cases-3d project.

## ProgressBar Properties

| Property | Function Explanation |
| :-------------- | :----------- |
| **BarSprite** | The __Sprite__ component needed for rendering __ProgressBar__. It can be linked by dragging a node with the __Sprite__ component to this property |
| **Mode**      | Currently supports the __HORIZONTAL__, __VERTICAL__ and __FILLED__ modes. The initial direction can be changed by cooperating with the __reverse__ property |
| **Progress**  | Floating point. The value range is __0~1__, and values outside the range are not allowed. |
| **Reverse**   | Boolean value. The default fill direction is from left to right / bottom to top, when enable, it becomes right to left / top to bottom |
| **Total Length** | The total length / total width of the __BarSprite__ when the __ProgressBar__ is at __100%__. In __FILLED__ mode, __Total Length__ represents the percentage of the total display range for __Bar Sprite__, with values ranging from __0 to 1__ |

## Detailed Explanation

After adding the ProgressBar component, drag a node with the __Sprite__ component from the __Hierarchy__ to the BarSprite property. Then you can control the display of the ProgressBar by dragging the progress sliding block.

Bar Sprite could be its own node, child node or any node that comes with the __Sprite__ component. Also, Bar Sprite can freely choose the `SIMPLE`, `SLICED` or `FILLED` render types.

If the mode of the progress bar is __FILLED__, the __Type__ of __BarSprite__ should to be set to __FILLED__, otherwise a warning will appear.
