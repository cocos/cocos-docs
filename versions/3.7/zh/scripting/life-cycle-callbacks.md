
# 生命周期回调

Cocos Creator 为组件脚本提供了生命周期的回调函数。开发者只需要定义特定的回调函数，Creator 就会在特定的时期自动执行相关脚本，开发者不需要手工调用它们。

目前提供给开发者的生命周期回调函数主要有（按生命周期触发先后排列）：

- onLoad
- onEnable
- start
- update
- lateUpdate
- onDisable
- onDestroy

## onLoad

组件脚本的初始化阶段，我们提供了 `onLoad` 回调函数。`onLoad` 回调会在节点首次激活时触发，比如所在的场景被载入，或者所在节点被激活的情况下。在 `onLoad` 阶段，保证了你可以获取到场景中的其他节点，以及节点关联的资源数据。onLoad 总是会在任何 start 方法调用前执行，这能用于安排脚本的初始化顺序。通常我们会在 `onLoad` 阶段去做一些初始化相关的操作。例如：

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

## onEnable

当组件的 `enabled` 属性从 `false` 变为 `true` 时，或者所在节点的 `active` 属性从 `false` 变为 `true` 时，会激活 `onEnable` 回调。倘若节点第一次被创建且 `enabled` 为 `true`，则会在 `onLoad` 之后，`start` 之前被调用。

## start

`start` 回调函数会在组件第一次激活前，也就是第一次执行 `update` 之前触发。`start` 通常用于初始化一些中间状态的数据，这些数据可能在 update 时会发生改变，并且被频繁的 enable 和 disable。

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

## update

游戏开发的一个关键点是在每一帧渲染前更新物体的行为，状态和方位。这些更新操作通常都放在 `update` 回调中。

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

## lateUpdate

`update` 会在所有动画更新前执行，但如果我们要在动效（如动画、粒子、物理等）更新之后才进行一些额外操作，或者希望在所有组件的 `update` 都执行完之后才进行其它操作，那就需要用到 `lateUpdate` 回调。

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

## onDisable

当组件的 `enabled` 属性从 `true` 变为 `false` 时，或者所在节点的 `active` 属性从 `true` 变为 `false` 时，会激活 `onDisable` 回调。

## onDestroy

当组件或者所在节点调用了 `destroy()`，则会调用 `onDestroy` 回调，并在当帧结束时统一回收组件。
