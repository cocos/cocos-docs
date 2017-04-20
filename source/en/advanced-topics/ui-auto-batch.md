# BMFont and UI auto-batch

## Preface

When building complex UI, the Label component will break the auto-batch, such that the Draw Call of UI scene will be very high.
But the BMFont and LabelAtlas also use texture file to rendering font, so we add the BMFont and LabelAtlas auto batch functionality to Creator 1.4.

It's simple to use this feature, you just need create a [Auto-Atlas](../asset-workflow/auto-atlas.md) asset configuration and put all the UI images,
BMFont and LabelAtlas into the directory of the Auto-Atlas asset. If you want the Draw call as minimal as possible, you should make sure the resulting 
number of merged atlas is minimal. If you could make all the UI elements into one image atlas, the resulting Draw call could be one.


## Attention

1. Because the atlas merge step is done when exporting project, so you need to export your project to test the batch drawing feature.
2. When import BMFont asset, you need put the associate .fnt file and png file in the same directory.
3. LabelAtlas is rendered the same as BMFont, so it's ok to batch it with UI elements and BMFont.
