# Editing Sprite animation

Let's see a concrete method for creating a frame animation.

## Add a new Sprite component to node

First, we need to make the Node properly displays textures. To do this we need to add a Sprite component to the Node.

After selecting the Node, choose __add render component->Sprite__ by clicking the **Add component** button in the Properties.

## Add a `cc.Sprite.spriteFrame` to property list

Once the Node is able to properly display textures, we need to create an animation path for the texture. Click __add property__ in the animation editor, then choose `cc.Sprite.spriteFrame`.

## Add a frame

Drag the texture from the Assets to the property frame field and put it on the `cc.Sprite.spriteFrame`path. Then drag the texture that needs to be displayed in the next frame to the designated position. Click __Play__ and the newly created animation can be previewed.
