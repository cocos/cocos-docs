# 获取和加载资源

Cocos Creator 3.0 采用与 Cocos Creator v2.x 统一的资源管理机制，在本篇教程，我们将介绍：

- 资源属性的声明
- 如何在 **属性检查器** 里设置资源
- 动态加载资源
- 加载远程资源和设备资源
- 资源的依赖和释放

## 资源属性的声明

在 Cocos Creator 3.0 中，所有继承自 `Asset` 的类型都统称资源，如 `Texture2D`、`SpriteFrame`、`AnimationClip`、`Prefab` 等。它们的加载是统一并且自动化的，相互依赖的资源能够被自动预加载。

> 例如，当引擎在加载场景时，会先自动加载场景关联到的资源，这些资源如果再关联其它资源，其它也会被先被加载，等加载全部完成后，场景加载才会结束。

脚本中可以这样定义一个 Asset 属性：

```typescript
//test.ts

import { _decorator, Component, Node, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

@ccclass("test")
export class test extends Component {

    @property({type: SpriteFrame})
    private spriteFrame: SpriteFrame = null;
}
```

## 如何在属性检查器里设置资源

只要在脚本中定义好类型，就能直接在 **属性检查器** 很方便地设置资源。假设我们创建了这样一个脚本：

```typescript
//test.ts
import { _decorator, Component, Node, SpriteFrame, Texture2D } from 'cc';
const { ccclass, property } = _decorator;

@ccclass("test")
export class test extends Component {

    @property({type: Texture2D})
    private texture: Texture2D = null;

    @property({type: SpriteFrame})
    private spriteFrame: SpriteFrame = null;
}
```

将它添加到节点后，在 **属性检查器** 中是这样的：

![asset-in-properties-null](load-assets/asset-in-inspector-null.png)

接下来我们从 **资源管理器** 里面分别将一个 Texture 和一个 SpriteFrame 拖到 **属性检查器** 的对应属性中：

![asset-in-properties-dnd](load-assets/asset-in-inspector-dnd.png)

结果如下：

![asset-in-properties-dnd](load-assets/asset-in-inspector.png)

这样就能在脚本里直接拿到设置好的资源：

```typescript
start () {
    let spriteFrame = this.spriteFrame;
    let texture = this.texture;
}
```

在 **属性检查器** 里设置资源虽然很直观，但资源只能在场景里预先设好，没办法动态切换。如果需要动态切换，你需要看看下面的内容。

## 动态加载

关于动态加载，请参考 [动态加载资源](../asset/dynamic-load-resources.md)
