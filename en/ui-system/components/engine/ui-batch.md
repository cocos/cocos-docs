# UI Batch Rules

The rules for UI batching are the same hash material and image and sampler for batching. The same hash means that even if the same material is used, if their hash values ​​are different, the batch will be interrupted. For example, two materials involve the modification of `Uniform`, resulting in failure to batch. Sprite and text are the same because their images are different. Of course, it can be done under strict control, but this is another story.

UI rendering data collection is based on the Hierarchy, so in the process of recursive Hierarchy, if you encounter the three components `UIMeshRenderer`, `Mask`, `Graphics` and the above situation, the batch will be interrupted. Therefore, we recommend that the images of different modules be batched separately to reduce DrawCall. However, if you want to batch a large amount of data, you need to strictly layout the nodes.
