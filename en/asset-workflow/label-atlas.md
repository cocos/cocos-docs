# LabelAtlas Asset

**LabelAtlas Asset** is a user defined asset, it's used for configuring LabelAtlas.

## Create LabelAtlas Asset
In **Assets** panel right-click on a folder, and click the following context menu item **New -> LabelAtlas**.
It will create a **LabelAtlas.labelatlas** asset.
![create label atlas](label-atlas/create-label-atlas.jpeg)

Before using **LabelAtlas asset**, you need some configurations. eg, configure the rendering texture file, the width and height
of each rendered character and the start char.

## Configuration of LabelAtlas asset
After selecting an **LabelAtlas asset** in the **Assets** panel, the **Properties** panel will display all configurable properties for the **LabelAtlas asset**.

| Properties       | Description                                                                                |
| --------------   | -----------                                                                                |
| Raw Texture File | Specify the rendering texture file                                                         |
| Item Width       | Specify the width of each character                                                        |
| Item Height      | Specify the height of each character                                                       |
| Start Char       | Specify the start char, even if the start char is a *space*, you also need insert a space. |

After the configuration, you need click the green button on the top right corner of **Inspector** panel.

![save label atlas](label-atlas/save-label-atlas.jpeg)
 

## Using LabelAtlas asset
It's quite simple to use the LabelAtlas asset. You just need setup a new Label component and drag the LabelAtlas asset to the *Font* attribute of the Label component.
