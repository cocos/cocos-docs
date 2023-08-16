# UIMeshRenderer Reference

> **NOTE**: We no longer recommend using this component and can use RenderTexture for similar functionality.
The method is as follows:
> - Create a RenderTexture and assign it to the TargetTexture of the Camera component to get the desired texture.
> - At this point the camera's rendering results are output to the RenderTexture.
> - Assign the RenderTexture to the SpriteFrame property of the sprite component to display the camera rendering results to the UI.
>
> For more information about RenderTexture, see [RenderTexture](../../../asset/render-texture.md).

UIMeshRenderer is a renderer component with a conversion feature that converts 3D models from 3D render pipeline to 2D. This component supports rendering the 3D model and particle system in the UI, without the component, the 3D model and particle system nodes will not be rendered.

> **Note**: if the 3D model cannot be displayed in a UI scene, please try to enlarge the model.

The UIMeshRenderer component is added by selecting the node in the __Hierarchy__ panel with the __MeshRenderer__ or classes inherited from it, then clicking the __Add Component__ button below the __Inspector__ panel and selecting __UI -> UIMeshRenderer__. The particles are added to the particle nodes. The usual structure is as below:

![ui-model-hierachy](uimodel/ui-model-hierarchy.png)
