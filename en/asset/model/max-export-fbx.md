# Export FBX file from Max

## Steps

1. Select the model:

  ![Select the model ](../../../zh/asset/model/max/01-select-mesh.png)

2. Go to **File -> Export -> Export Selected**:

  ![Export Selected](../../../zh/asset/model/max/02-export-selected.png)

3. Set **Save as type** to **.fbx**, click the **save** button:

  ![Name the file](../../../zh/asset/model/max/03-export-file-name.png)
  
4. Set **Current Preset** to **Autodesk Media and Entertainment**:

  ![Export Preset](../../../zh/asset/model/max/04-export-preset-selection.png)
  
5. Enable **Embed Media** check box:

  ![Enable Embed Media](../../../zh/asset/model/max/05-embed-media.png)
  
6. Click **OK** to export the file:
  
  ![Export file](../../../zh/asset/model/max/06-export-file.png)
  
**Remarks** : For more information, please refer to [Max Fbx Files](https://help.autodesk.com/view/3DSMAX/2022/ENU/?guid=GUID-26E80277-1645-4C4E-A6B2-44399376490F)

## Import fbx into your project

1. Place the export file **simpleBox** in the **Asset** folder of your project directory. More info about [FBX Import](mesh.md).
2. Comparison of import results.

| 3ds Max Viewport                                                            | Cocos Creator Scene Viewport                                                  |
|-----------------------------------------------------------------------------|-------------------------------------------------------------------------------|
| <img height="600" src="../../../zh/asset/model/max/07-1-max-viewport.png"/> | <img height="600" src="../../../zh/asset/model/max/07-2-cocos-viewport.png"/> |
