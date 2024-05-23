# Asset workflow

## Adding an asset

There are three ways to add assets into a project:

* Using the **create** button to add assets
* In the operating system file manager, copy the asset file to the project assets folder and then reopen or activate the Cocos Creator window to finish importing the asset.
* Drag asset files from the operating system file manager (such as Explorer in Windows or Finder in Mac OS) to the **Assets** panel to import the asset.

### Importing an asset from outside

You can drag files from another window in the operating system to the **Assets** panel in Cocos Creator window in order to import assets from the outside. This operation will auto copy the asset files to the project asset files and finish the importing operation.

## Importing and synchronizing assets

The assets in **Assets** and the project asset files seen in the file manager are synchronised. Moving, renaming and deleting assets in **Assets** will do the same alterations to the asset files in the user's file system. Likewise, reopening or activating the Cocos Creator program after adding or deleting assets in the file system (such as Explorer in Windows or Finder in Mac OS)  will update the assets in **Assets**.

## Managing Asset Meta Files

When importing any asset files in `assets` folder a **Meta file** will be generated for each asset, with the same filename at the same location. This meta file contains the universal unique identity (uuid) of the asset, and other important settings such as trim information for textures.

When managing assets in Cocos Creator, meta files are hidden and will be handled automatically. That means when deleting, renaming, moving assets their corresponding meta files will be deleted, renamed, moved accordingly.

**If you try to manage your assets in OS file system such as Explorer and Finder, you are responsible for updating meta files manually**, such as deleting, renaming and moving, to make sure the uuid stay the same and no asset reference lost. Remember, meta files should be at the same location of their assets, and with the same filename as their assets.

### Handling Unmatched Asset Meta

Warning: Unmatched asset meta found

If you move or rename asset file in Explorer or Finder without moving or renaming the meta files accordingly, the Editor will consider the moved or renamed asset as newly imported thus creating new meta files with new uuid. Also the old meta files will have no matched asset and be removed. It will also cause missing reference to the asset (including scripts) in scenes and prefabs.

When that happens the Editor will pop up a dialog to warn the user.

Any unmatched meta files will be removed from `assets` folder, and will be backed up to `temp` folder.

If you wish to recover the reference to those changed assets, please put the backup meta file to the same folder as the changed asset, and make sure to rename the meta file to share the same name as the changed asset. Please notice that there're probably new meta files generated for changed assets, you can delete those newly created meta files safely after you recover the backup meta files.

## Export assets from one project to another

Since v1.5 Cocos Creator editor allow users to export asset and its dependencies from one project to another. Please read [Import/export assets across projects](import-export.md).

## Importing projects from other Editors

You can now import items from other editors in Cocos Creator. For more information, please refer to: [Importing Projects from other Editors](project-import.md)

## Common asset workflow

Next, we will introduce Cocos Creator's main asset types and the related workflows:

- [Scene asset](scene-managing.md)
- [Image asset](sprite.md)
- [Atlas](atlas.md)
- [Auto Atlas asset](auto-atlas.md)
- [Auto Trim for SpriteFrame](trim.md)
- [Texture Compression](compress-texture.md)
- [Script asset](script.md)
- [Font asset](font.md)
- [Particle asset](particle.md)
- [Audio asset](audio-asset.md)
- [Prefab](prefab.md)
- [Spine](spine.md)
- [TiledMap](tiledmap.md)
- [DragonBones](dragonbones.md)
- [JSON asset](json.md)
- [Text asset](text.md)
