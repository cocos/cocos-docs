
# Life Cycle Callbacks

__Cocos Creator__ provides life cycle callback functions for component scripts. As long as the user defines a specific callback function, __Cocos Creator__ will automatically execute related scripts in a specific period, and the user does not need to call them manually.

The life cycle callback functions currently provided to users mainly include (order by life cycle trigger):

- `onLoad()`
- `onEnable()`
- `start()`
- `update()`
- `lateUpdate()`
- `onDisable()`
- `onDestroy()`

## `onLoad()`

In the initialization phase of the component script, the `onLoad()` callback function is available. The `onLoad()` callback will be triggered when the node is activated for the first time, such as when the scene is loaded or the node is activated. In the `onLoad()` stage, it is guaranteed that you can get other nodes in the scene and the resource data associated with the nodes. `onLoad()` will always be executed before any start method is called, which can be used to arrange the initialization sequence of the script. Usually, some initialization related operations are performed in the `onLoad()` stage. Example:

```ts
import { _decorator, Component, Node, SpriteFrame, find } from 'cc';
const { ccclass, property } = _decorator;

@ccclass("test")
export class test extends Component {
    @property({type:SpriteFrame})
    bulletSprite=null;
    @property({type:Node})
    gun=null;

    _bulletRect=null;

    onLoad(){
        this._bulletRect=this.bulletSprite.getRect();
        this.gun = find('hand/weapon', this.node);
    }
}
```

## `onEnable()`

When the `enabled` property of the component changes from `false` to `true`, or the node's `active` property changes from `false` to `true`, the `onEnable()` callback will be activated. If the node is created for the first time and `enabled` is `true`, it will be called after `onLoad()` but before `start()`.

## `start()`

The `start()` callback function will be triggered before the first activation of the component, that is, before the first execution of `update()`. `start()` is usually used to initialize some intermediate state data. These data may change during update and are frequently enabled and disabled. Example:

```ts
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass("starttest")
export class starttest extends Component {

    private _timer: number = 0.0;

    start () {
        this._timer = 1.0;
    }

    update (deltaTime: number) {
        this._timer += deltaTime;
        if(this._timer >= 10.0){
            console.log('I am done!');
            this.enabled = false;
        }
     }
}
```

## `update()`

A key point of game development is to update the behavior, state and orientation of objects before each frame of rendering. These update operations are usually placed in the `update()` callback. Example:

```ts
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass("updatetest")
export class updatetest extends Component {

    update (deltaTime: number) {
        this.node.setPosition(0.0,40.0*deltaTime,0.0);
    }
}
```

## `lateUpdate()`

`update()` will be executed before all animations are updated, but if developer's need to perform some additional operations after the animations (such as animation, particles, physics, etc.) are updated, or it is needed to execute the `update()` of all components after doing other operations, use the `lateUpdate()` callback. Example:

```ts
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass("lateupdatetest")
export class lateupdatetest extends Component {

    lateUpdate (deltaTime: number) {
        this.node.setPosition(0.0,50,0.0);
    }
}
```

## `onDisable()`

When the `enabled` property of the component changes from `true` to `false`, or the node's `active` property changes from `true` to `false`, the `onDisable()` callback will be activated.

## `onDestroy()`

When the component or the node where it calls `destroy()`, the `onDestroy()` callback will be called, and the component will be recycled when the frame ends.
