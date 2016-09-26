# Editing a time curve
We have already created some basic animations. However, sometimes we need to use
slow-motion effects like EaseInOut, etc., between two frames. So how can this be achieved in the animation editor?

First, we need to create two unequal frames on one path. For example, create two frames on a position which starts from 0,0 to 100,100, then a connecting line between these two frames will appear. Double click the connecting line and the time curve editor will open.

![time curve](time-curve/main.png)

## Using a pre-set curve
We can select various pre-set effects from the left-hand side of the curve editor, such as: Ease In, etc. After selecting, some pre-set parameters will appear at the top on the right-hand side. These can be chosen according to your needs.

## A user-defined curve
Sometimes the pre-set curve cannot meet the needs of the animation. However, we can modify the curve ourselves. In the preview image in the bottom right, there are two grey controlling points. By dragging these controlling points, the path of the curve can be modified.
If the controlling points need to be dragged outside of the visual field, you can use the mouse wheel or small plotting scale on the top right corner to zoom in/out of the preview image. The proportions supported by which range from 0.1 to 1.

---

Continue on to read [Animation Events](animation-event.md).
