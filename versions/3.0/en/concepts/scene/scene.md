# Scene structure

__Cocos Creator__ adds a 3D scene structure to __Creator’s__ __EC (entity component) framework__. The 3D scene is represented by __RenderScene__. The corresponding __Component__ in the __EC structure__ references the *Model*, *Camera*, and *Light* are maintained in `RenderScene`. Other elements are also linked together through __Node__, including the *Transformations* in `RenderScene` is also manipulated through the __Node API__.

> __Note__: the differences between __Scene__ in __EC structure__ and __RenderScene__ in a __3D__ scene structure. __Scene__ in __EC structure__ is
the logical organization structure of the __Node hierarchy__. __RenderScene__ in __3D__ is the organization structure of scene rendering elements. Elements in __EC scene__'s contain references to the correspond rendering objects in `RenderScene`.

The relationship between __EC structure__ and __3D__ scene structure is shown in the following figure:

![ec & scene](scene/ecs-scene.jpg)

The entire __3D__ scene structure is encapsulated under __Component__, and the organizational relationship is established through __Node__. This is completely transparent relationship between __EC structure__ and a __3D__ scene.
