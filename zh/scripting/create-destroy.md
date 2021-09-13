# 创建和销毁节点

## 创建新节点

除了通过场景编辑器创建节点外，我们也可以在脚本中动态创建节点。通过 `new Node()` 并将它加入到场景中，可以实现整个创建过程。

以下是一个简单的例子:

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

## 克隆已有节点

有时我们希望动态的克隆场景中的已有节点，我们可以通过 `instantiate` 方法完成。使用方法如下：

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

## 创建预制节点

和克隆已有节点相似，你可以设置一个预制（[Prefab](..\asset\prefab.md)）并通过 `instantiate` 生成节点。使用方法如下：

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

## 销毁节点

通过 `node.destroy()` 函数，可以销毁节点。值得一提的是，销毁节点并不会立刻被移除，而是在当前帧逻辑更新结束后，统一执行。当一个节点销毁后，该节点就处于无效状态，可以通过 `isValid` 判断当前节点是否已经被销毁。

使用方法如下：

```typescript
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass("test")
export class test extends Component {

    @property({type:Node})
    private target: Node = null;

    private positionz: number = -20;

    start(){
        // 5秒后销毁节点
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

### destroy 和 removeFromParent 的区别

调用一个节点的 `removeFromParent` 后，它并不会从内存中释放，因为一些逻辑上的问题，导致程序中仍然引用到了这个对象。**因此如果一个节点不再使用，请直接调用它的 `destroy` 而不是 `removeFromParent`，否则会导致内存泄漏。**

总之，如果一个节点不再使用，`destroy` 就对了，不需要 `removeFromParent` 也不需要设置 `parent` 为 `null` 哈。
