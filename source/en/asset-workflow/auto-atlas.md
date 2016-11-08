# Auto-atlas Asset

**Auto-atlas Asset** is a sprite sheet As a Cocos Creator comes with the map function, you can specify a series of broken plans packaged into a large picture, the specific role and Texture Packer function is very similar.

## Create an auto-atlas asset

In **Assets** panel right-click on a folder, and click the following context menu item **New -> Auto Atlas**. It will create a **AutoAtlas.pac** asset to hold your atlas configuration for current folder.

! [Create auto atlas](auto-atlas/create-auto-atlas.png)

With an **Auto-atlas asset** created, all **SpriteFrame** assets in the current folder including sub-folders will be used to generate a sprite sheet atlas during build process.  And all SpriteFrame assets added to the folder or its sub-folder will be added to the atlas automatically in the future.

If there're settings for **SpriteFrame** assets (such as trim), they will be preserved in the **SpriteFrame** assets in the generated atlas.

## Configure the auto-atlas asset

After selecting an **Auto-atlas asset** in the **Assets** panel, the **Properties** panel will display all configurable properties for the **Auto-atlas asset**.

| Properties | Description
| -------------- | ----------- |
| Max Width  |The maximum width of a single atlas
| Max Height | The maximum height of a single atlas
| Padding | The spacing between sprites in the atlas
| Allow Rotation | Allows rotation of the sprites
| Force Squared | Whether to force the Atlas size to be set to square
| PowerOfTwo | Whether to set the map size to a power of two number
| Heuristices | Atlas packaging strategy, the optional strategies are [BestShortSideFit, BestLongSideFit, BestAreaFit, BottomLeftRule, ContactPointRule]
| Format | Image generation format, available in [png, jpg, webp]

After the configuration is complete, you can click the **Preview** button to preview the results of the packaging. The results of the current auto-atlas configuration will be displayed in the area below the **Properties** panel.
Note that after any configuration change, you need to click **Preview** button again to refresh the preview.

The results are:

- Packed Textures: display packaged atlas texture and related information, if there're multiple textures, they will be listed in the preview area.
- Unpacked Textures: showing textures that can not be packed into the Atlas. The cause may be that the size of these sprites are larger than the maximum size of the atlas texture.

## Generate atlas

With **Auto-atlas asset** created correctly, you can build your scenes or animations using the original sprite textures. During the **Build** process, Cocos Creator will automatically pack all **SpriteFrame** with auto-atlas asset in the folder into atlas and update reference to them in the whole project automatically.

The generated atlas texture will be placed in corresponding directory to the auto-atlas asset in build target folder's **res/raw-assets** sub-folder of build target folder. The file will be named as  **AutoAtlas-xx.png**.

You can go to the corresponding directory to check whether the Auto-atlas asset is generated successfully.