# Animation State

Animation clips only describe the animation data of a certain type of object, such as a character running, walking, jumping, etc., but are not bound to the specific object to be animated. Animation states are Animation Clips that are used to control the animation on a certain object, similar to a player. In addition to providing simple control functions that are also available for Animation components, they also provide more animation information and an animation control interface that allows control of animation playback such as speed control, setting loop mode, etc. An Animation Clip can be used by multiple animation states at the same time.

Animation states are managed by [Class `AnimationState`](__APIDOC__/en/#/docs/3.3/en/animation/Class/AnimationState).

## Setting the playback speed

First get the animation state by [getState()](__APIDOC__/en/#/docs/3.3/en/animation/Class/Animation?id=getstate):

```ts
// Get the Animation component
const animationComponent = node.getComponent(Animation);

// Get the animation clips on the Animation component
const [ idleClip, runClip ] = animationComponent.clips;

// Get the animation state of 'idleClip'
const idleState = animationComponent.getState(idleClip.name);
```

Then set the speed of the animation to play at:

```ts
// Play the 'idleClip' animation at two times the speed
animationComponent.getState('idle').speed = 2.0; // the larger the speed value the faster it is, the smaller the value the slower it is
```

The animation state also provides `play()`, `pause()`, `resume()`, `stop()` methods for playback control, please refer to the **play state** section below for more details.

## Play Time

The animation state records the **cumulative play time** of the animation. Initially, the accumulated play time is 0. As the animation plays naturally, the time will be accumulated. For example, when the animation loops, the cumulative play time will be **animation period * 2** just after the second loop.

The playback position of the animation at any given moment is called **progress time**, so the progress time is always in the range `[0, animation period]`.

- The **cumulative play time** is obtained from the [time](__APIDOC__/en/#/docs/3.3/en/animation/Class/AnimationState?id=time) field of `AnimationState`, and can be set explicitly.
- The **progress time** is obtained from the [current](__APIDOC__/en/#/docs/3.3/en/animation/Class/AnimationState?id=current) field of `AnimationState`, and is **read-only**.

The wrap mode and repeat count of the animation determines the progress time of the animation when it reaches a certain time, whether the **cumulative play time** is increased by time or changed by direct setting, the **progress time** will be changed accordingly.

## Wrap Mode and Repeat Count

Animation can be played to the end and stop, or it can be looped all the time, or it can be played to the end and then looped from the end to the beginning, these are collectively called wrap modes and are represented by the enumeration [`AnimationClip.WrapMode`](__APIDOC__/en/#/docs/3.3/en/animation/Class/AnimationState?id=wrapmode), the following are included:

| Wrap Mode | Description |
| :--- | :--- |
| `AnimationClip.WrapMode.Normal` | Play from the beginning to the end and then stop. |
| `AnimationClip.WrapMode.Loop` | Play from the beginning to the end continuously. |
| `AnimationClip.WrapMode.PingPong` | Play from the beginning to the end, then reverse from the end to the beginning, and so on. |PingPong

In addition, there are **reverse** looping modes for each of the looping modes in the table above:

| Wrap Mode | Description |
| :--- | :--- |
| `AnimationClip.WrapMode.Reverse` | Play from the end to the beginning and then stop. |
| `AnimationClip.WrapMode.LoopReverse` | Play from the end to the beginning continuously. |
| `AnimationClip.WrapMode.PingPongReverse` | Play from the end to the beginning, then reverse from the beginning to the end, and so on. |

The initial wrap mode of the animation state will be read from the animation clip. When you need to change the wrap mode of the animation state, simply set the `wrapMode` field of the animation state.

> **Note**: setting the wrap mode will reset the **cumulative play time** of the animation state.

Except `AnimationClip.WrapMode.Normal` and its counterpart `AnimationClip.WrapMode.Reverse` (which can be interpreted as a single loop), all other wrap modes perform an infinite loop. The infinite loop needs to be used in conjunction with `repeatCount` of `AnimationState` to achieve the effect, and the number of loops can be set and retrieved via the `repeatCount` field.

When the animation wrap mode is:
- Single loop mode: `repeatCount` will be set to **1**.
- Infinite loop mode: `repeatCount` will be set to `Number.Infinity`, i.e. infinite loop.

> **Note**: setting the repeat count should be done after setting the wrap mode, because resetting the wrap mode will reset the repeat count.

## Playback Control

The animation state provides the following methods to control the play, pause, resume and stop of the animation:

| Method | Description |
| :--- | :--- |
| `play()` | Reset the playback time to 0 and start the animation. |
| `pause()` | Pause the animation. |
| `resume()` | Resume the animation from the current time. |
| `stop()` | Stop the animation. |

The playing status of the animation can be queried by the following fields:

| Field (read-only) | Description |
| :--- | :--- |
| `isPlaying` | If or not the animation is in playing state. |
| `isPaused` | If or not the animation is paused. |
| `isMotionless` | If or not the animation is paused or has been stopped. |

The relationship between the playback control and the playback state is shown in the following figure:

![Playback control](./animation-state/playback-control.svg)

The animation state allows getting information about all the animations in order to use this information to determine what needs to be done. For more interfaces, please refer to [Class `AnimationState`](__APIDOC__/en/#/docs/3.3/en/animation/Class/AnimationState).
