# Passthrough

The implementation of **Passthrough** involves capturing real-world scenes through the cameras of XR devices and transmitting them to the display, allowing users to see the real-world environment. In a virtual reality setting, users cannot perceive the real-world environment, which can lead to collision or safety issues. By using Passthrough technology, users can perceive the real-world environment, enabling safer interactions in the virtual reality environment and enhancing the sense of immersion.

## Passthrough Feature

XR extensions provide dedicated layers for rendering passthrough images while using composition layers to control the blending and display relationship between passthrough images and virtual scenes.

| Property      | Description                                                  |
| --------- | ----------------------------------------------------- |
| Placement | Specifies the composition mode for the Passthrough Layer.         |
| Depth     | Sets the depth to specify the ordering of the Passthrough within the Composition Layer. |
| Opacity   | Sets the opacity of the Passthrough image.    |

> **Note**: The Passthrough functionality is based on non-core extensions of OpenXR. The current version only supports Meta Quest series devices.

## Enabling Passthrough

Adjust the Clear Flags of the Camera component of the **XR HMD** node to SOLID_COLOR, and set the opacity of Clear Color to 0.

<img src="./xr-pass-through/set-hmd-camera.png" style="zoom:50%;" />

Add the passthrough component to the XR HMD node. Find **XR > Extra > XRPassThroughLayer** and click Add.

<img src="./xr-pass-through/add-pass-throught-layer.png" style="zoom:50%;" />

To display the passthrough video image below all 3D content, set the `Placement` property to `Underlay`.

After packaging, the passthrough effect will be visible.

![xr-pass-through/pass-through-effect.png](xr-pass-through/pass-through-effect.png)

> **Note**: To use the passthrough functionality, you need extension version >=1.2.0 and the Cocos Creator version >= 3.7.3.
