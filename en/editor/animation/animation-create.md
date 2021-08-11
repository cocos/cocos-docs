# Create Animation components and animation clips

## Creating Animation Components

On each __Node__, we can add different __components__. If we want to create an __animation__ on this node, we must also create a new __Animation component__ for it.

There are two ways to create a new __Animation component__:

- Select the corresponding node, click __Add Component__ below in the __Inspector__ panel, and select __Animation Component__ in __Components__.
- Open the **Animation** panel, then select the node in which to add then animation in the __Hierarchy__ panel, and click the __Add Animation component__ button in the **Animation** panel.

![add-component](animation-clip/add-component.png)

Specifics about __Animation component__ parameters can be found in the [Animation Component Reference](./../../engine/animation/animation-component.md) documentation.

## Creating and attaching animation clips

Even though there is an __Animation component__ on the __Node__, there is no corresponding __animation clip data__. There are two ways to create __animation clips__:

- Click the `+` on the upper left in the __Assets__ panel, or right-click the blank area and select __Animation Clip__. Now, a clip file named `NewAnimationClip` will be created in the __Assets__ panel.

It is not enough to just create it. We need to click on the node, in the __Hierachy manager__ and find __Animation__ in the __Inspector__ panel. At this time, __Clips__ shows __0__, and it needs to be changed to __1__. __Next__, drag the `NewAnimationClip` that was just created in the __Assets__ panel, and drag it into the __animation-clip selection box__ that just appeared.

- If an __Animation Clip file__ has not been added to an __Animation component__, directly click the `NewAnimationClip` button in the **Animation** panel to create a new animation clip file. The newly created Animation Clip will be automatically attached to the Animation Component.

> **Note**: if you choose to overwrite the existing clip file, the content of the overwritten file will be cleared.

![add-clip](animation-clip/add-clip.png)
