# Version History

## V1.2.0

Added:
- Added support for basic mode light estimation on iOS and basic/HDR mode light estimation on Huawei Android platforms.
- Enabled building and publishing of XR applications to the WebXR platform, with support for `inline`, `immersive-vr`, and `immersive-ar` session modes.
- Added behavior control functionality to the screen gesture interactor, allowing users to choose gesture behaviors for interactive objects.
- Enhanced the placement feature of the screen gesture interactor component, providing options to place content based on a fixed distance from the interactor.
- Added the `Composition Layer` feature, supporting `Overlay` and `Underlay` rendering modes.
- Added `Pass-Through` functionality, enabling video passthrough on standalone devices using OpenXR standard interfaces. Combined with the Composition Layer, it allows adjusting the rendering mode (Overlay/Underlay) of the passthrough video stream.
- Supported XR Web Preview feature, enabling browsing of web content on standalone devices.
- XR video player now supports playback of 3D video resources.
- Added support for spatial audio, which allows rendering audio from different directions to simulate sound behavior in the physical world, enhancing immersion.
- Added adjustments for `Fixed Foveated Rendering (FFR)`, supporting the use of OpenXR standard interfaces to enable FFR and adjust rendering levels.
- Updated `Snapdragon Spaces SDK` to version 0.11.1 and added support for RGB Camera and Meshing features.

Fixed:

- Improved the effectiveness of screen gesture interaction.
- Fixed the issue where the vibration duration of `Huawei VR Glass` controller was not working when set to 0.
- Fixed the error when converting AR Camera.
- Resolved compatibility issues with higher versions of Android Target API.

## v1.1.1

Added:

- Adapted to Cocos Creator 3.7.2。

## v1.1.0

Added:

- Added AR application development module, enabling publishing of AR applications to AREngine, ARCore, ARKit, and Qualcomm Spaces platforms. Provides automated behavior editing components for quick creation and experience of AR content, supporting features such as device tracking (AR Camera), plane tracking, image tracking, anchors, and Mesh.
- Added non-buffered haptic feedback for controller vibration. Select the desired event types for vibration in `cc.InteractorEvent`'s `Haptic Event` and adjust the vibration parameters.
- Added a **one-click conversion** feature for XRUI, enabling the transformation of traditional 2D UI into XR UI with spatial properties.
- Added gaze interactor for interaction based on the gaze center position of the head-mounted device.
- Added XR video player, optimizing the video rendering pipeline for XR devices and supporting display window switching and multiple styles (180-degree, 360-degree) of videos. Meets the need for browsing panoramic videos or dynamic materials in 3D scenes.
- Added wireless streaming option for XR content preview, allowing previewing of XR projects in a web browser and synchronizing all signals from XR devices. Provides a complete and fast experience of all XR project content without the need to package the application to the device.
- Added screen gesture interactor for manipulating AR virtual objects using screen gestures.
- Added support for using the phone as a 3DOF air mouse for Rokid Air devices.

Fixed:

- Full support for 6DOF input on Huawei VR Glass (6DOF Kit).
- Resolved the issue of the random signal generation when using the 6DOF controller of `Huawei VR Glass` while touching the joystick.

## v1.0.1

- Supported publishing XR applications to Rokid Air, HuaweiVR, Meta Quest/Quest2, Pico Neo3/Pico4, and Monado devices.
- Provided device mapping, interaction, virtual movement, and modularized XR UI components for XR content creation.
- Supported previewing XR content using a web browser, allowing simulation of headsets and controller devices using keyboard and mouse controls.
