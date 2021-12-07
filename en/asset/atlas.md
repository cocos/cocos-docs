# Atlas assets

__Atlas__, also called a __Sprite Sheet__, is a common art asset in game development. __Atlas__ is an asset for merging multiple pictures into a large picture through a special tool, and indexing through a file such as a **.plist**. __Atlas__ assets available for __Cocos Creator__ consist of a **.plist** and at least one **.png** file, although usually many **.png** files make up an __Atlas__. The following is an image file used in an __Atlas__:

![atlas sheep](atlas/sheep_atlas.png)

## Why use atlas assets

In a game, using an __Atlas__ composed of multiple pictures as art assets has the following advantages:

- The blank area around each picture will be removed when synthesizing the __Atlas__, plus various optimization algorithms can be implemented as a whole. After synthesizing the __Atlas__, the game package and memory consumption can be greatly reduced.
- When multiple __Sprites__ are rendering pictures from the same atlas, these __Sprites__ can be processed using the same rendering batch, which greatly reduces the CPU's computing time and improves operating efficiency.

For a more comprehensive explanation, watch a teaching video: [__What is a Sprite Sheet__](https://www.codeandweb.com/what-is-a-sprite-sheet) from __CodeAndWeb__.

## Atlas Assets

To generate an __Atlas__, you should first prepare a set of original pictures. Example:

![single sheep](atlas/single_sheep.png)

__Next__, use special software to generate the __Atlas__. Examples:

- [TexturePacker 4.x](https://www.codeandweb.com/texturepacker)
- [Zwoptex](https://zwopple.com/zwoptex/)

When using these software packages to generate an __Atlas__, please select a `.plist` file in **Cocos2d-x** format. The resulting __Atlas__ files are a `.plist` and `.png` with the same name. Example: `myAtlas.plist` and `myAtlas.png`.

![atlas files](atlas/atlas_files.png)

When using __TexturePacker__ software, please note that use __v4.x__ only, v3.x and below is not supported.

## Importing Atlas Assets

Drag the **.plist** and the **.png** files shown above into the **Assets** panel at the same time. It is possible to generate __Atlas__ assets that can be used in the editor and scripts.

### Atlas and SpriteFrame

In the [Image Resource Document](../ui-system/components/editor/sprite.md), the relationship between __Texture__ and __SpriteFrame__ was introduced. After importing the __Atlas__, we can see that the __Atlas__ is of type __Atlas__ and can be expanded by clicking the triangle icon on the left. After expanding, we can see that the __Atlas__ contains many sub-assets of type __SpriteFrame__. Assets are pictures that can be used and referenced individually.

![sprite frame](atlas/spriteframes.png)

The use of the __Sprite Frame__ is the same as that described in the image asset. Please refer to the related documents.

<!-- ## 碎图转图集

在项目原型阶段或生产初期，美术资源的内容和结构变化都会比较频繁，我们通常会直接使用碎图（也就是多个单独的图片）来搭建场景和制作 UI。为了优化性能和节约包体，需要将碎图合并成图集。 -->
