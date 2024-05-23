# Reflection Probe Art Workflow

## Bake Reflection Probe Workflow

- Create **Reflection Probe** nodes within the scene

- Modify the **Mobility** property of the node that needs to bake the reflection to **Static**

    ![static](reflection-probe/static.png)

- Find **Reflection Probe Settings** by scrolling down on the **Inspector** of the node where the reflection needs to be baked, and adjust its corresponding property to.

    ![setting](reflection-probe/mesh-renderer-reflect-probe.png)

    - **Reflection Probe**: Select the type of reflection probe
    - **Bake To Reflection Probe**: Check whether to bake the reflection information of this mesh renderer to the reflection probe related map

    For detail, please refer to [MeshRenderer Component Reference](../../../../engine/renderable/model-component.md)

- Bake

    - Click the **Bake** button on the **Inspector** to bake the currently selected reflection probe.

        ![bake](reflection-probe/bake.png)

    - Select **Projects** -> **Light** -> **Reflection Probe** on the main menu to open the [Reflection Probe Panel](reflection-probe-panel.md) and bake by clicking the bake button on the panel.

- Check baking results

    After baking is complete, **Asset Manager** creates mappings named starting with **reflectionProbe_** within the **Asset Manager**. Developers can see if these mappings meet expectations.

For more examples, please refer to [IBL Example](example.md).

## Real-time Reflection Probe Workflow

- Build the scene as shown in the figure.

    ![scene](reflection-probe/plannar-scene.png)

- Create **Reflection Probe** nodes in the scene:

    - Modify **Probe Type** to **PLANNAR**
    - Configure the **Source Camera** property to be the **Main Camera** node created in the above step

    ![inspector](reflection-probe/plannar-probe-property.png)

- Modify the **Reflection Probe** of the **MeshRenderer** property of the **Plane** node in the scene to **PLANNAR_REFLECTION**.

    ![inspector](reflection-probe/plane-reflection-probe-property.png)

- At this point it can be observed that within the scene, the reflection of the plane changes.

    ![plannar-reflection-result](reflection-probe/plannar-reflection-result.png)
