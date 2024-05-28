# LabelShadow Component Reference

The LabelShadow component adds a shadow effect to the Label component.

![label-shadow](label/label-shadow.png)

Click the **Add Component** button at the bottom of the **Inspector** panel and select **LabelShadow** from the **UI** to add the LabelShadow component to the node.

> **Notes**:
>
> 1. LabelShadow can only be used for **system fonts** or **TTF fonts**.
> 2. LabelShadow does not take effect when the **CacheMode** property of the Label component is set to **CHAR**.
> 3. LabelShadow does not support native platforms.

LabelShadow script interface, please refer to the [LabelShadow API](%__APIDOC__%/api/en/classes/ui.labelshadow.html) for details.

## LabelShadow Properties

| Property | Description |
| :--------- | :---------- |
| Color  | The color of the shadow. |
| Offset | Offset between label and shadow. |
| Blur   | A non-negative float specifying the level of shadow blur. |
