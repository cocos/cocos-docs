# Spine

Spine skeleton animation resources in Cocos Creator are exported from [Spine Editor](http://esotericsoftware.com/), and currently support both [JSON](http://esotericsoftware.com/spine-export/#JSON) and [Binary](http://esotericsoftware.com/spine-export/#Binary) data formats.

The supported Spine versions for each Creator version are as follows:

| Creator version | Spine version |
| :---------- | :-------- |
| v2.0.7 and below | v2.5 |
| v2.0.8～v2.1     | v3.6 |
| v2.2             | v3.7 |
| v2.3 and above   | v3.8 |

## Import skeleton animation resources

Skeleton animation resource use three main resources:

- `.json/.skel` Skeletal animation data
- `.png`  Atlas
- `.txt/.atlas` Atlas data

  ![spine](spine/import.png)

## Create a skeleton animation resources

You can create a spine node in three ways:

1. Drag the Spine assets directly from **Assets** to **Node Tree**:

    ![spine](spine/create_1.png)

2. Drag the Spine assets directly from **Assets** to **Scene**:

    ![spine](spine/create_2.png)

3. Drag the Spine assets directly from **Assets** to the **Skeleton Data** property of the **Spine Skeleton** component in the **Properties** panel.

   ![spine](spine/create_3.png)
