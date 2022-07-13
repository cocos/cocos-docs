# Export FBX file from Maya

## Steps 
1. Select the model
![Select the model](../../../zh/asset/model/maya/01-select-mesh.png)
2. Go to `File->Export Selection Option` 
![Export Selection Option](../../../zh/asset/model/maya/02-export-selection-option.png)
3. Set `File type` to` FBX export`, click `export selection`
![Export File Type](../../../zh/asset/model/maya/03-export-type-selection.png)
4. Set `Current Preset` to `Autodesk Media and Entertainment`
![Current Preset](../../../zh/asset/model/maya/04-export-preset-selection.png)
5. Check on `Embed Media`
![Enable Embed Media](../../../zh/asset/model/maya/05-embed-media.png)
6. Name the file to `simpleBox`， click `Export Selection`
![Export the file](../../../zh/asset/model/maya/06-export-file.png)
**Remarks:** For more information, please refer to [Maya FBX Plugin-in](https://help.autodesk.com/view/MAYAUL/2022/ENU/index.html?guid=GUID-BD85FA4C-4D40-457C-BE66-47BC08B82FC3)

# Import fbx into your project
1. Place the export file `simpleBox` in the `Asset` folder of your project directory. More info about [FBX import](mesh.md).
2. Comparison of import results.

| Maya Viewport                                                                 | Cocos Creator Scene Viewport                                                   |
|-------------------------------------------------------------------------------|--------------------------------------------------------------------------------|
| <img height="600" src="../../../zh/asset/model/maya/07-1-maya-viewport.png"/> | <img height="600" src="../../../zh/asset/model/maya/07-2-cocos-viewport.png"/> |
