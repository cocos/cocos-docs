# Skeletal Animation Assets (Spine)

Skeletal animation assets in Creator are exported from [Spine](http://esotericsoftware.com/), which currently supports the [JSON](http://esotericsoftware.com/spine-export/#JSON) and [binary](http://esotericsoftware.com/spine-export/#%E4%BA%8C%E8%BF%9B%E5%88%B6) data formats.

The supported Spine versions for each Creator version are as follows.

| Creator Version | Spine Version |
| :---------- | :-------- |
| v2.0.7 and below | v2.5 |
| v2.0.8 to v2.1 | v3.6 | v2.2 | v3.7
| v2.2 | v3.7 |
| v2.3 and above | v3.8 |

## Import Skeletal Animation Assets

The assets required for skeletal animation are:

- `.json/.skel` skeletal data
- `.png` atlas textures
- `.txt/.atlas` atlas data

  ![spine](spine/import.png)

## Create Skeletal Animation

Drag the skeletal animation asset from the **Assets** panel to the `SkeletonData` property of the spine component in the **Inspector** panel.

![spine](spine/set_skeleton.png)
