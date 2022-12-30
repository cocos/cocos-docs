# Animation System

Cocos Creator has a built-in universal animation system for implementing keyframe-based animations. In addition to standard moving, rotation, scaling and frame animations, it also supports arbitrary component properties and user-defined property drivers, plus arbitrary time curves and innovative trajectory editing, allowing content producers to create detailed dynamic effects without writing a single line of code.

![animation cover](index/main.gif)

> **Note**: the **Animation** panel that comes with Cocos Creator is suitable for creating less complex animations that need to be linked with logic, such as UI animations. If you want to create complex effects, character animations, nested animations, etc., consider using Spine, DragonBones or skeletal animation editor for 3D models instead.

## Content

- [Animation Clip](animation-clip.md): asset containing animation data, reusable. Animation clips can be produced by the **Animation** panel, or imported by some external asset that already contains skeletal animation.

- [Animation Component Reference](animation-comp.md): the Animation component can drive node and component properties on their nodes and children in an animated manner, including properties in user-defined scripts.

- [Animation Editor](animation.md): learn how to use the Animation Editor and create/modify/generate animation clip assets through the Animation Editor.

- [Skeletal Animation](skeletal-animation.md): a common but special type of animation, this article mainly introduces it and explains its usage.

- [Controlling Animation with Scripts](animation-component.md): the Animation component manages a set of animation states, which are used to control the play, pause, continue, stop, switch, etc. of each animation.

    - [Animation State](animation-state.md): the state of animation clips is stored in an object called animation state, animation state can control the animation clips that need to be used on the object. Animation state provides more animation control interfaces, through which animation can be played, stopped, shifted, set to loop mode and other more detailed control.

- [Marionette Animation System](./marionette/index.md): added in v3.4 and implements an automated and reusable skeletal animation process controlled by a state machine.

According to different animation requirements, the operation steps and code implementation for specific animations are different, please refer to the official example [animation](https://github.com/cocos/cocos-test-projects/tree/v3.4/assets/cases/animation), which mainly introduces some common editing operations and code examples for reference.
