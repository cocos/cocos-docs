# Marionette Animation System

Cocos Creator 3.4 introduces a new Marionette animation system that controls the skeletal animation of objects via state machines, enabling an automated, reusable animation process.

To distinguish it from the animation system before v3.4, we call the new animation system the Marionette animation system and the animation system used before v3.4 the old animation system. Both animation systems work properly, but do not support simultaneous use. The main differences are as follows:

- Old Animation System: animation components, animation states as the core, manual simple control of animation clips such as play and pause. Animation clips support the use of Animation Clips created through the editor and externally imported skeletal animations (`.fbx` and `.gltf`).

- Marionette Animation System: the animation controller component and the animation graph are the core of the animation system, and the animation clips are automatically controlled by the state machine according to the pre-built animation graph, such as playing and switching. Animation clips only support externally imported skeletal animations (`.fbx` and `.gltf`).

## Content

The main contents of the Marionette animation system include.

- [Animation Graph Assets](animation-graph.md)
- [Animation Graph Panel](animation-graph-panel.md)
- [Animation State Machine](animation-graph-basics.md)
- [State Transition](state-translation.md)

## Terminology

Marionette animation system related function terms are explained as follows:

| Function Noun | Description |
| :--- | :--- |
| Animation Graph Assets | Used to store the entire animation flow data of the object, which can be created directly in the **Assets** panel. For details, please refer to [animation-graph.md](animation-graph.resource). |
| Animation Controller Component | References the animation graph assets and applies it to the object. |
| Animation Graph Panel | Once you have prepared the skeleton animations for the object, you can assemble them into a complete animation flow via the Animation Graph Panel. For details, please refer to the [Animation Graph Panel](animation-graph-panel.md) documentation. |
| State | An action that the object is in that plays a specific animation clip, such as standby, walk, move, attack, etc. <br>This state is different from the [animation state](../animation-state.md) created by the animation component for each animation clip in the old animation system. |
| State Transition | In most cases, an object will have multiple states, and will switch between them according to a certain logic of requirements, which is called [state transition](state-translation.md). For example, if a character triggers a death condition while walking, the walking state will switch to the death state. |
| Animated State Machine | Used to visually manage and control the states and transitions between states on an object, and can be thought of as a flowchart. See [Animation State Machine](animation-graph-basics.md) for details.

States and state transitions are displayed graphically in the Animation Graph panel, for example, the following diagram, where squares indicate states and arrows indicate transitions between states.

![example](animation-graph-basics/example.png)

## Example Reference

Creator provides the [Ms.Amoy](https://github.com/cocos-creator/MarionetteDemo) example, which demonstrates the use of the Marionette animation system, can be downloaded and used as needed.
