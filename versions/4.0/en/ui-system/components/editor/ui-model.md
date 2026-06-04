# UIMeshRenderer Reference

UIMeshRenderer is a renderer component with a conversion feature that converts 3D models from 3D render pipeline to 2D. This component supports rendering the 3D model and particle system in the UI, without the component, the 3D model and particle system nodes will not be rendered.

> **Note**: if the 3D model cannot be displayed in a UI scene, please try to enlarge the model.

The UIMeshRenderer component is added by selecting the node in the __Hierarchy__ panel with the __MeshRenderer__ or classes inherited from it, then clicking the __Add Component__ button below the __Inspector__ panel and selecting __UI -> UIMeshRenderer__. The particles are added to the particle nodes. The usual structure is as below:

![ui-model-hierachy](uimodel/ui-model-hierarchy.png)
