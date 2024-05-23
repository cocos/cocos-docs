# Assets

**Assets** is used for us to access and manage the working area of project assets. Adding assets into here is normally a necessary step when starting to make a game. You can use the **Hello World** template to create a new project and then see there are some basic asset types within **Assets**.

## Introduction to the interface

**Assets** shows the contents of the project assets folder in a tree structure, but note that only the assets put under the `assets` catalogue in the project folder will be shown here. Please read [project structure](../../project-structure.md) for more about the project folder structure. Now let's introduce the factors of each interface:

![assets overview](assets/overview.png)

- The ![](assets/add.png) button in the upper left corner is the create button for creating a new asset.
- The input box on the top right can be used to search and filter the asset file names that contain some specific text.
- The **search button** in the upper right corner is used to select the type of asset for the search.
- The main part of the panel is the asset list of the asset folder where you can add, delete or alter the assets using the context menu or by dragging.
- The small triangle ![](assets/button.png) in front of the folder is used to toggle the expand/collapse state of the folder. When the user presses the Alt/Option and clicks the button, in addition to performing the expand/collapse operation of the folder itself, the expand/collapse operation is also performed on all subfolders under this folder at the same time.

## Asset list

An asset list can include any folder structure. Folders in **Assets** will be shown by the ![folder](assets/folder.png) icon. Click the arrow to the left of this icon to expand/collapse the contents of a folder.

Except for the folders, everything else in the list is asset files. Files in the asset list will not show their extended names; instead icons will be used to indicate the type of file or asset. For example, the project created by the **HelloWorld** template includes three core assets:

- **Image assets**: Currently includes image files like `jpg` and `png`, the icon will show as a thumbnail of the image.
- ![javascript](assets/javascript.png) **Script assets**: The JavaScript file compiled by the programmer. It uses `js` as the filename extension. We edit these scripts to add functions and game logic.
- ![scene](../../../asset-workflow/index/scene.png) **Scene assets**: Double click to open the scene file. Only when the scene file has been opened can we continue creating the contents.

For more common asset types and asset workflows, please read the [asset workflow](../../../asset-workflow/index.md) chapter.

### Create assets

Currently, the assets that can be created in **Assets** are the following:

- Folder
- Script file
- Scene
- Animation clips
- Auto Atlas
- Label Atlas

Click the **create** button on the top left corner and the create assets menu including the above asset list will then pop up. Clicking any item on it will create new corresponding assets at the currently selected location.

![create asset](assets/create_scene.png)

### Select assets

You can use the following selection of assets in the asset list:

- Click to select a single asset
- Press <kbd>Ctrl</kbd> or <kbd>Cmd</kbd> and click individual assets to select them all together
- Press <kbd>Shift</kbd> and click to select multiple assets

You can move, delete and use other operations on the selected assets.

### Move assets

After selecting the asset (can select multiple assets at once), hold down the mouse and drag to move the asset(s) to another position. Drag the assets onto a folder and you will see the folder that the folder will be highlighted in orange. Release the mouse to move the assets into the highlighted folder.

![move asset](assets/move_asset.png)

### Delete assets

For the selected assets, you can execute the following operation to delete:

- Right click and choose `delete` from the pop up menu
- Press <kbd>Delete</kbd> (Windows) or <kbd>Cmd + Backspace</kbd> (Mac) after selecting the asset.

Since deleting assets is an irreversible operation, there will be a pop up dialog box requesting the user to confirm. Once the user clicks yes, the assets will be deleted permanently and cannot be found in the Recycle Bin (Windows) or Trash Bin (Mac). Please use it with caution and do version management or a manual backup.

### Other operations

The right click menu of **Asset** also includes the following operations:

- `Create`: Same function as the **Create** button, it will add assets to the currently selected folder. If what is currently selected is an asset file, it will add new assets to the same folder as the currently selected asset.
- `Rename`: Rename the asset.
- `Find Usages`: Find the file that used the resource and filter it in the search box.
- `Open in Explorer (Windows) or Reveal In Finder (Mac)`: open the asset folder in the file manager of the operating system.
- `Open Asset In Library`: Open the data generated when the selected resource is imported by the Creator.
- `Reveal In Library`: Open the imported asset location in `Library` of the project folder. Please read [project structure](../../project-structure.md) for details.
- `Show asset UUID and path`: Show the currently selected asset's UUID in the **Console** panel.

Also, by double clicking on the asset you can enter the editing status for specific asset types such as scene assets and script assets.

## Filter assets

Enter some text in the search box at the top right of **Assets** to filter out filenames of all the assets that include the input text. You can also input filename extensions like `*.png` to list all the assets with this specific extension.

![search asset](assets/search_asset.png)
