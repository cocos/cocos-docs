# LabelShadow Component Reference

The LabelShadow component adds a shadow effect to the Label component.

![label-shadow](label/label-shadow.png)

Click the **Add Component** button at the bottom of the **Inspector** panel and select **LabelShadow** from the **UI** to add the LabelShadow component to the node.

> **Notes**:
> 1. Starting from version 3.8.2, the Label component has built-in shadow functionality, so there's no need to add the LabelOutline component.
> 2. LabelShadow can only be used for **system fonts** or **TTF fonts**.
> 3. LabelShadow does not take effect when the **CacheMode** property of the Label component is set to **CHAR**.
> 4 . LabelShadow does not support Windows and Mac native platforms.

LabelShadow script interface, please refer to the [LabelShadow API](%__APIDOC__%/api/en/classes/ui.labelshadow.html) for details.

## LabelShadow Properties

| Property | Description |
| :--------- | :---------- |
| Color  | The color of the shadow. |
| Offset | Offset between label and shadow. |
| Blur   | A non-negative float specifying the level of shadow blur. |
