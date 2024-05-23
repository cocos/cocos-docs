# Tweening

In order to be fully compatible with and maintain the experience of the __Cocos Creator v2.x__ easing system, all the __Cocos Creator v2.x__ functions are transplanted in __Cocos Creator 3.0__.

> **Note**: `action` has been abandoned, please use `tween`.

> **Note**: there is no longer a dependency on `tween.js`. If you use the relevant features of `tween.js`, please adapt.

> **Note**: the `onStart, onUpdate, onComplete` callbacks were added to the optional attributes of `to` and `by`.

The difference from the previous `tween.js` is mainly optional attributes, explained as follows:

- The value definition of `easing` has been changed (compatibility is done here).
- In addition to `easing`, `onStart`, `onUpdate`, `onComplete`, other properties are not supported yet (checked here, the console will have a corresponding warning).

## Example

```typescript
import { _decorator, Component, Vec3, tween } from 'cc';

@ccclass("tween-test")
export class tweentest extends Component {

    private _pos: Vec3 = new Vec3(0, 0, 0);

    start () {
        /** Easing _pos */
        tween(this._pos)
            .to(3, new Vec3(10, 10, 10), { easing: 'bounceInOut' })
            .to(3, new Vec3(0, 0, 0), { easing: 'elasticOut' })
            .union()
            .repeat(2) // 执行 2 次
            .start();

        /** Easing Node, here will ease the Node's position property */
        tween(this.node)
            .to(3, { position: new Vec3(10, 10, 10) }, { easing: 'bounceInOut' })
            .to(3, { position: new Vec3(0, 0, 0) }, { easing: 'elasticOut' })
            .union()
            .repeat(2) // execute 2 times
            .start();
    }
}
```

## Precautions

### repeat semantics

Previously, the semantics of `repeat` was repeated several times. In order to fully maintain the design of __Cocos Creator 2D__, `repeat` is executed several times, that is, `repeat(1)` stands for one execution.

### Restrictions

In-order to reduce the frequency of updating the `Node Transform` information, `Node` maintains a `dirty` state. Only when an interface that may change the `Node Transform` information is called, will `dirty` be set to the state that needs to be updated.

> **Note**: the current interface has certain restrictions, for example  `position` obtained through `this.node.position` is a generic `Vec3`.

When this code `this.node.position.x = 1` is executed, only the `getter` of `position` is executed, and the `setter` of `position` is not executed. Since `dirty` is not updated, it will cause the `Transform` information of the nodes used during rendering not to be updated.

Such calls are not supported, but the use of `setPosition` or `position` is encouraged. Example:

```typescript
let _pos = new Vec3(0, 1, 0);
this.node.position = _pos;      // here will pass the position setter
this.node.setPosition(_pos);    // here will setPosition through interface
```

### The right way of easing

In the new `Tween` module, you can obtain properties with `getter` and `setter`, such as the `position` property of `node` (in the simple example above). During the easing process, the corresponding interface will be carried out, making setting changes to ensure that `dirty` is updated normally.

> **Note**: pay attention to stop the corresponding slow motion when switching scenes.

## Tween interface introduction

| Interface | Explanation |
| ----------------- | ------------------------------------------- |
| **to** | Add an interval action that calculates the **absolute value** of the property |
| **by** | Add an interval action to calculate the **relative value** of the property |
| **set** | Add a momentary action that **sets** the target property directly |
| **delay** | Add an instant action of **delay time** |
| **call** | Add an instant action of **call callback** |
| **target** | Add a **instant** action to directly set the slow-motion target |
| **union** | Package the easing action of the context into one|
| **then** | Insert a Tween into the easing queue |
| **repeat** | **Execution several times** (previously repeated several times, if using, please adapt) |
| **repeatForever** | Always repeat execution |
| **sequence** | Add a sequential slow motion |
| **parallel** | Add a simultaneous easing |
| **start** | Start slow motion |
| **stop** | Stop slow motion |
| **clone** | Clone Easing |
| **show** | To enable rendering on the node chain, the slowing target needs to be Node |
| **hide** | Disable rendering on the node chain, the slowing target needs to be Node |
| **removeSelf** | Move the node out of the scene tree, the slowing target needs to be Node |

### Optional attributes of to and by

The definition is as follows:

```typescript
interface ITweenOption {
    easing?: TweenEasing | ((k: number) => number);
    progress?: (start: number, end: number, current: number, ratio: number) => number;
    onStart?: (target: object) => {};
    onUpdate?: (target: object, ratio: number) => {};
    onComplete?: (target: object) => {};
}
```

The difference with __Cocos Creator 2D__ is the addition of properties such as `onStart`, `onUpdate`, and `onComplete`. These properties are callback functions, which will be passed into the easing target when called.

In addition, an additional value of the current easing will be passed in when `onUpdate` is called, and the range is `(0-1)`.

#### Example of using callback

Taking `onUpdate` as an example, the following code eases a position, and then setting it to multiple objects in `onUpdate`, this demonstrates __batch easing__.

```typescript
import { Node, tween, Vec3 } from 'cc';
const nodeArray: Node[] = []; // Replace here with your node array
const tweenTargetVec3 = new Vec3();
tween(tweenTargetVec3)
    .by(1, new Vec3(1, 1, 1), {
        'onUpdate': (target: Vec3, ratio: number) => {
            for (let i = 0; i < nodeArray.length; i++)
                nodeArray[i].worldPosition = target;
        }
    });
```

## Automatic destruction

In Cocos Creator 3.0, when the easing target is `Node`, it will listen to its destruction event for automatic destruction of the easing. This calls the `target` method and also automatically updates the listener.

> **Note**: related test cases are located on [GitHub](https://github.com/cocos/cocos-test-projects).

> **Note**: please refer to [Using the Tween System](https://docs.cocos.com/creator/manual/en/scripting/tween.html) documentation.
