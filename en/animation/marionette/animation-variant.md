# Animation Graph Variants

If two animation graphs have the same animation logic but different corresponding animation clips, re-creating an animation graph will create an additional maintenance burden. By using animation variants, this problem can be better solved.

An animated graph variant is an asset that is created by clicking **Animation Graph Variant** within **Assets Manager**.

![create](animation-variant/create-asset.png)

The created variant is shown in the following figure.

![default](animation-variant/variant-asset.png)

## Properties

![default](animation-variant/empty-varint.png)

| Properties | Description |
| :-- | :-- |
| **Animation Graph** | Animated graph that require variants, selected by drop-down or from within **Assets Manager** <br> ![select](animation-variant/select.png)|
| **Clip Overrides** | Animation clips that need to be covered <br> ![override](animation-variant/overrides.png) <br> With the Overrides column on the right, select the animation clips to be replaced from the **Assets Manager** |

## Use of variants

The different variants can be selected by pulling down the **Animation Graph** property of the Animation Controller component.

![controller](animation-variant/controller.png)
