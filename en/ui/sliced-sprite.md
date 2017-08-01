# Use a Sliced Sprite to make a UI image

When developing UI, we usually use an image in a nine rectangle grid format to display US element, the size of which might be dynamically modified according to the requirements of fitting screen resolution. In this way, even a very small original picture can be used to generate a background image that can cover the whole screen. It will save the inclusive space of the game, on the other hand, it can flexibly fit different layout requirements.

![compare](sliced-sprite/compare.png)

The right side of the picture above displays the texture of original size. The left side displays the effect of choosing Sliced mode and enlarging the `size` property.

## The nine rectangle grid cutting of the image resource

To use a nine rectangle grid image effect that can be infinitely enlarged, we need to cut the image resource into a nine rectangle grid at first. There are two methods to open **Sprite editor** to edit the image resource:

- Choose image resource in **Assets**, then click the **edit** button on the bottom of ** Properties**. If the height of your window is not large enough, you might need to scroll **Properties** downward to see the button at the bottom.
- Choose the image node that you want to cut into a nine rectangle grid in **scene editor**. Then find and click the **Edit** button on the right side of the `Sprite Frame` property in the Sprite component of **Properties**.

After opening **Sprite editor**, you will see there is a green line around the image, which indicates the position of the current split line of the nine rectangle grid. Drag the mouse to the split line, you will see the shape of the cursor change, then you can press down and drag the mouse to modify the position of the split line.

We drag the four split lines on the left/right/upper/lower side respectively and cut the image into a nine rectangle grid. The nine areas will apply different zooming in/out strategies when the Sprite size changes, which is as illustrated below:

![sliced](sliced-sprite/editing.png)

And the following picture illustrates the state of zooming in/out in different areas (the picture comes from[Yannick Loriot's Blog](http://yannickloriot.com/2011/12/create-buttons-in-cocos2d-by-using-cccontrolbutton/)）:

![scaling](sliced-sprite/scaling.png)

After cutting, don't forget to click the green check mark on the upper right corner of **Sprite editor** to save modifications to the resource.

## Set Sprite component to use Sliced mode

After preparing the resource that has been cut into a nine rectangle grid, you can modify the display mode of the Sprite. And by modifying `size`, you can create a UI element whose size can be arbitrarily designated.

1. First, choose the Sprite node in the scene, set `Type` property of the Sprite as `Sliced`.
2. Then drag the controlling point by [rectangle tool](../getting-started/basics/editor-panels/scene.html#--12) to enlarge the `size` property of the node. You can also modify the `size` property by directly inputting a numeric value into **Properties**. If the image resource is produced in a nine rectangle grid format, then no matter how much the Sprite zooms in, no vagueness or distortion will appear.

## Notice

When using **rectangle tool** or directly modifying the `size` property of a Sliced Sprite, don't set the value of `size` as a negative number, otherwise it can't be displayed correctly in Sliced mode.


---

Continue on to read about [Multi-resolution](multi-resolution.md)
