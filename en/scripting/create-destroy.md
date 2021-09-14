# Creating and Destroying Nodes

## Creating a New Node

In addition to creating nodes through the scene editor, it can also dynamically create nodes in scripts using `new Node()` and adding it to the scene. Example:

```typescript
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass("test")
export class test extends Component {

    start(){
        let node =new Node('box');
        node.setPosition(0,0,-10);
    }
}
```

## Cloning an Existing Node

Sometimes it is needed to dynamically clone the existing nodes in the scene, it can be done through the `instantiate` method. Example:

```typescript
import { _decorator, Component, Node,instantiate, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass("test")
export class test extends Component {

    @property({type:Node})
    private target: Node = null;

    start(){
        let scene = director.getScene();
        let node = instantiate(this.target);

        node.parent = scene;
        node.setPosition(0, 0,-10);
    }
}
```

## Creating a Prefab Node

Similar to cloning an existing node, you can set a prefab ([Prefab](..\asset\prefab.md)) and generate a node through `instantiate`. Example:

```typescript
import { _decorator, Component, Prefab, instantiate, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass("test")
export class test extends Component {

    @property({type:Prefab})
    private target: Prefab = null;

    start(){
        let scene = director.getScene();
        let node = instantiate(this.target);

        node.parent = scene;
        node.setPosition(0,0,0);
    }
}
```

## Destroy the node

Through the `node.destroy()` function, nodes can be destroyed. It is worth mentioning that the destroyed node will not be removed immediately, but will be executed uniformly after the logic update of the current frame is completed. When a node is destroyed, the node is in an invalid state. Use `isValid` to determine whether the current node has been destroyed. Example:

```typescript
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass("test")
export class test extends Component {

    @property({type:Node})
    private target: Node = null;

    private positionz: number = -20;

    start(){
        // Destroy the node after 5 seconds
        setTimeout(function () {
            this.target.destroy();
          }.bind(this), 5000);
    }
    update(deltaTime: number){
        console.info(this.target.isValid);
        this.positionz += 1*deltaTime;
        if (this.target.isValid) {
            this.target.setPosition(0.0,0.0,this.positionz);
          }
    }
}
```

### The Difference Between `destroy` and `removeFromParent`

After calling `removeFromParent` on a node, the node is not released from memory because the engine still holds its data internally. **If a node is no longer used, please call its `destroy` directly instead of `removeFromParent`, otherwise, a memory leak will result.**

In short, if a node is no longer used, `destroy` is right, there is no need to `removeFromParent` nor to set `parent` to `null`.
