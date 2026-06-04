# Obtaining and Loading Assets

__Cocos Creator__ uses the same asset management mechanism as __Cocos Creator__. In this section, we will introduce:

  - Declaration of asset attributes
  - How to set assets in the **Inspector** panel
  - Loading assets dynamically
  - Loading remote assets and device assets
  - Dependence and releasing assets

## Declaration of asset attributes

In __Cocos Creator__, all types that inherit from `Asset` are collectively called __assets__, such as` Texture2D`, `SpriteFrame`,` AnimationClip`, `Prefab`, etc. Loading assets is unified and interdependent assets can be automatically preloaded.

> For example: when the engine is loading the scene, it will automatically load the assets associated with the scene first. If these assets are associated with other assets, the other will be loaded first, and the scene loading will end after all loading is completed.

You can define an __Asset__ property in the script like this:

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

## How to set Assets in the Inspector panel

As long as the type is defined in the script, you can easily set the __asset__ directly in the __Inspector__ panel. Suppose, we create a script like this:

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

After adding it to a node, it looks like this in the **Inspector** panel:

![asset-in-properties-null](load-assets/asset-in-inspector-null.png)

__Next__, we drag a __Texture__ and a __SpriteFrame__ from the **Assets** panel into the corresponding properties of the **Inspector** panel:

![asset-in-properties-dnd](load-assets/asset-in-inspector-dnd.png)

Resulting in:

![asset-in-properties-dnd](load-assets/asset-in-inspector.png)

This allows you to get and set assets directly within a script:

```typescript
    start () {
        let spriteFrame = this.spriteFrame;
        let texture = this.texture;
    }
```

Although it is intuitive to set assets in the **Attributes Inspector**, the assets can only be set in the __Scene__, in advance. This means there is no way to switch assets dynamically. If you need to switch assets dynamically, take a look at this next section on __Dynamic loading__.

## Dynamic loading

For dynamic loading, please refer to [Dynamic Load Resources](../asset/dynamic-load-resources.md)
