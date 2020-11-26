# Animation component

__Animation components__ control the playback of animations.

__Animation components__ are added to nodes in exactly the same way as other components:

```ts
import { Animation, Node } from "cc";

function (node: Node) {
    const animationComponent = node.addComponent(Animation);
}
```

The __animation component__ manages a set of animation clips. Before the __animation component__ begins, it creates a corresponding **animation state** object for each __animation clip__. The __animation state__ controls the playback process of an __animation clip__ at a node, and an __animation clip__ can be used by multiple __animation states__ at the same time.

In an __animation component__, the __animation state__ is identified by name. The default name of each animation state is the name of its __animation clip__.

## Playing and switching animations

`play()` causes the __animation componen__t to start playing the specified animation:

```ts
animationComponent.play('idle'); // play animation state 'idle'
```

When playing, the old animation will be stopped immediately, this switch is very abrupt. In some cases, we want this switch to __fade in and out__. The `crossFade()` method can be used to achieve this.
`crossFade()` will complete the switch smoothly within the specified period:

```ts
animationComponent.play('walk');

/* ... */

// When you need to switch to running animation
animationComponent.crossFade('run', 0.3); // Smoothly switch from walking animation to running animation in 0.3 seconds
```

The `crossFade()` fade-in and fade-out mechanism makes it possible for more than one animation state to play at the same time. Therefore, the __animation component__ has no concept of the **current animation**.

The __animation component__ still provides `pause()`, `resume()` and `stop()` methods. These calls pause, continue, and stop all __animation states__ that are playing, however, they also pause, resume, and stop switching animations.

## Animation State

Sometimes it is necessary to perform other operations on the __animation state__, for example, to set its speed.

You can get the __animation state__ through `getState()`:

```ts
const animationComponent = node.getComponent(Animation);
animationComponent.clips = [ idleClip, runClip ];

// Get the status of `idleClip`
const idleState = animationComponent.getState(idleClip.name);
```

You can set the speed of the animation playback:

```ts
animationComponent.getState('idle').speed = 2.0; // Play standby animation at double speed
```

The __animation state__ also provides `play()`, `pause()`, `resume()` and `stop()`. These control common playback functions. When these common playback controls cannot meet your requirements, it is also possible to manipulate the playback of the __animation state__ in a custom way.

## Default animation

When the __animation component__'s `playOnLoad` is `true`, it will automatically play the default animation clip, `defaultClip`, the first time it runs.

## Frame events

You can add events for each time point of the animation.

The `events` of an `AnimationClip` contains all event descriptions for the animation, and each event description has the following properties:

```ts
{
    frame: number;
    func: string;
    params: any[];
}
```

`frame` represents the time point at which the event was triggered, in seconds. For example, `0.618` means that the event will be triggered when the animation reaches `0.618` seconds.

`func` represents the method name that is called back when the event is triggered. When the event is triggered, a **search** for a method named `func` on all components of the current node, once found, it is called with `params` passed to it. Example:

```ts
import { Animation, Component } from "cc";
class MyScript extends Component {
    constructor() {

    }

    public start() {
        const animationComponent = this.node.getComponent(Animation);
        if (animationComponent && animationComponent.defaultClip) {
            const { defaultClip } = animationComponent;
            defaultClip.events.push({
                frame: 0.5, // trigger event on the 0.5 second
                func: 'onTriggered', // name of event to be called
                params: [0], // parameters passed to `func`
            });
            defaultClip.updateEventDatas();
        }
    }

    public onTriggered(arg: number) {
        console.log(`I'm triggered!`);
    }
}
```

The above code indicates that the default __animation clip__ of the __animation component__ at the node where the `MyScript` component is located. At the `0.5th` second, it will call the `test()` method of the `MyScript` component and pass the parameter `0`.
