# Summary

## User Manual 3.7

- [Cocos Creator 3.7](index.md)
- [About Cocos Creator](getting-started/introduction/index.md)
- [Support](getting-started/support.md)

## Understanding the Basics

- [Getting Started](getting-started/index.md)

    - [Installing and Launching](getting-started/install/index.md)
    - [Dashboard](getting-started/dashboard/index.md)
    - [Hello World!](getting-started/helloworld/index.md)
    - [Project Structure](getting-started/project-structure/index.md)
- [Editor Interfaces](editor/index.md)
    - [Scene](editor/scene/index.md)
    - [Hierarchy](editor/hierarchy/index.md)
    - [Assets](editor/assets/index.md)
    - [Inspector](editor/inspector/index.md)
    - [Console](editor/console/index.md)
    - [Preferences](editor/preferences/index.md)
    - [Project Settings](editor/project/index.md)
    - [Main Menu](editor/mainMenu/index.md)
    - [Tool Bar](editor/toolbar/index.md)
    - [Editor Layout](editor/editor-layout/index.md)
    - [Preview & Debugging](editor/preview/index.md)
- [Glossary](glossary/index.md)

## Tutorials

- [Quick Start: Making Your First 2D Game](getting-started/first-game-2d/index.md)
    - [Handle Touch Events](getting-started/first-game-2d/touch.md)
- [Quick Start: Make Your First 3D Game](getting-started/first-game/index.md)
    - [Advanced: Add Light, Shadow and Skeleton Animation](getting-started/first-game/advance.md)
- [Examples & Tutorials](cases-and-tutorials/index.md)

## Basic Workflow

- [Upgrade Guide](release-notes/index.md)
    - [Cocos Creator 3.0 Upgrade Guide](release-notes/upgrade-guide-v3.0.md)
    - [Cocos Creator 3.0 Material Upgrade Guide](material-system/effect-2.x-to-3.0.md)
    - [Cocos Creator 3.1 Material Upgrade Guide](material-system/Material-upgrade-documentation-for-v3.0-to-v3.1.md)
    - [Cocos Creator 3.5 Material Upgrade Guide](material-system/effect-upgrade-documentation-for-v3.4.2-to-v3.5.md)
    - [Cocos Creator 3.5 Native Built Project Upgrade Guide](engine/template/native-upgrade-to-v3.5.md)
    - [Cocos Creator 3.6 Native Built Project Upgrade Guide](engine/template/native-upgrade-to-v3.6.md)
    - [Cocos Creator 3.6.0 Build Template and settings.json Upgrade Guide](release-notes/build-template-settings-upgrade-guide-v3.6.md)
    - [Upgrade Guide: Effect from v3.5.x to v3.6.0](material-system/effect-upgrade-documentation-for-v3.5-to-v3.6.md)
    - [Upgrade Guide: Particle from v3.5.x to v3.6.0](particle-system/particle-upgrade-documentation-for-v3.5-to-v3.6.md)

- [Scene Creation](concepts/scene/index.md)
    - [Scene Assets](asset/scene.md)
    - [Nodes and Components](concepts/scene/node-component.md)
    - [Coordinate Systems and Transformations](concepts/scene/coord.md)
    - [Node Hierarchy and Rendering Order](concepts/scene/node-tree.md)
    - [Build a Scene Image Using the Scene Panel](concepts/scene/scene-editing.md)
    - [Level of Details](editor/rendering/lod.md)

- [Assets](asset/index.md)
    - [Asset Workflow](asset/asset-workflow.md)
    - [Images](asset/image.md)
        - [Textures](asset/texture.md)
        - [Sprite Frames](asset/sprite-frame.md)
            - [Auto Trim for SpriteFrame](ui-system/components/engine/trim.md)
        - [Texture Cube](asset/texture-cube.md)
        - [Atlas](asset/atlas.md)
        - [Auto Atlas](asset/auto-atlas.md)
        - [Label Atlas](asset/label-atlas.md)
    - [Prefab](asset/prefab.md)
    - [Fonts](asset/font.md)
    - [Audio](asset/audio.md)
    - [Material](asset/material.md)
        - [FBX Smart Material Conversion](importer/materials/fbx-materials.md)
    - [Model](asset/model/mesh.md)
        - [Importing Models Exported from DCC Tools](asset/model/dcc-export-mesh.md)
        - [Export FBX file from 3ds Max](asset/model/max-export-fbx.md)
        - [Export FBX file from Maya](asset/model/maya-export-fbx.md)
        - [glTF](asset/model/glTF.md)
        - [Programmatically Create Meshes](asset/model/scripting-mesh.md)
    - [Spine Skeletal Animation](asset/spine.md)
    - [DragonBones Skeletal Animation](asset/dragonbones.md)
    - [TiledMap](asset/tiledmap.md)

- [Scripting Guide and Event System](scripting/index.md)
    - [Programming Language Support](scripting/language-support.md)
    - [Scripting Basics](scripting/script-basics.md)
        - [Script Creation](scripting/setup.md)
        - [Coding Environment Setup](scripting/coding-setup.md)
        - [Operating Environment](scripting/basic.md)
        - [Decorator](scripting/decorator.md)
        - [Property Attributes](scripting/reference/attributes.md)
        - [Life Cycle Callbacks](scripting/life-cycle-callbacks.md)
    - [Using Scripts](scripting/usage.md)
        - [Access Nodes and Components](scripting/access-node-component.md)
        - [Common Node and Component Interfaces](scripting/basic-node-api.md)
        - [Create and Destroy Nodes](scripting/create-destroy.md)
        - [Scheduler](scripting/scheduler.md)
        - [Components and Component Execution Order](scripting/component.md)
        - [Loading and Switching Scenes](scripting/scene-managing.md)
        - [Obtaining and Loading Assets](scripting/load-assets.md)
        - [tsconfig Configuration](scripting/tsconfig.md)
    - [Advanced Scripting](scripting/reference-class.md)
    - [Events](engine/event/index.md)
        - [Listening to and Launching Events](engine/event/event-emit.md)
        - [Input Event System](engine/event/event-input.md)
        - [Node Event System](engine/event/event-node.md)
        - [Event API](engine/event/event-api.md)
    - [Modules](scripting/modules/index.md)
        - [Engine Modules](scripting/modules/engine.md)
        - [External Module Usage Case](scripting/modules/example.md)
        - [Module Specification](scripting/modules/spec.md)
        - [Import Maps](scripting/modules/import-map.md)
    - [Plugin Scripts](scripting/external-scripts.md)

- [Cross-platform Publishing](editor/publish/index.md)
    - [Publishing Android Apps](editor/publish/android/index.md)
        - [Android Publishing Example](editor/publish/android/build-example-android.md)
        - [Build Options - Android](editor/publish/android/build-options-android.md)
        - [Android Development Environment Setup](editor/publish/android/build-setup-evn-android.md)
    - [Publishing iOS Apps](editor/publish/ios/index.md)
        - [iOS Publishing Example](editor/publish/ios/build-example-ios.md)
        - [Build Options - iOS](editor/publish/ios/build-options-ios.md)
    - [Publishing Huawei HarmonyOS Apps](editor/publish/publish-huawei-ohos.md)
    - [Publishing macOS Desktop Application](editor/publish/mac/index.md)
        - [macOS Publishing Example](editor/publish/mac/build-example-mac.md)
        - [Build Options - macOS](editor/publish/mac/build-options-mac.md)
    - [Publishing Windows Desktop Application](editor/publish/windows/index.md)
        - [Windows Publishing Example](editor/publish/windows/build-example-windows.md)
        - [Build Options - Windows](editor/publish/windows/build-options-windows.md)
    - [Fundamentals for Publishing to Native Platforms](editor/publish/publish-native-index.md)
        - [General Native Build Options](editor/publish/native-options.md)
        - [Setting up Native Development Environment](editor/publish/setup-native-development.md)
        - [Debugging JavaScript on Native Platforms](editor/publish/debug-jsb.md)
    - [Publish to Mini Game Platforms](editor/publish/publish-mini-game.md)
        - [Publish to HUAWEI AppGallery Connect](editor/publish/publish-huawei-agc.md)
        - [Publish to Alipay Mini Game](editor/publish/publish-alipay-mini-game.md)
        - [Publish to Taobao Mini Game](editor/publish/publish-taobao-mini-game.md)
        - [Publish to WeChat Mini Games](editor/publish/publish-wechatgame.md)
            - [WeChat Mini Games Engine Plugin Instructions](editor/publish/wechatgame-plugin.md)
            - [Access to WeChat PC Mini Games](editor/publish/publish-pc-wechatgame.md)
        - [Publish to ByteDance Mini Games](editor/publish/publish-bytedance-mini-game.md)
        - [Publish to Huawei Quick Games](editor/publish/publish-huawei-quick-game.md)
        - [Publish to OPPO Mini Games](editor/publish/publish-oppo-mini-game.md)
        - [Publish to vivo Mini Games](editor/publish/publish-vivo-mini-game.md)
        - [Publish to Xiaomi Quick Games](editor/publish/publish-xiaomi-quick-game.md)
        - [Publish to Baidu Mini Games](editor/publish/publish-baidu-mini-game.md)
        - [Access to Open Data Context](editor/publish/build-open-data-context.md)
        - [Mini Game Subpackage](editor/publish/subpackage.md)
        - [Introduction to the Build Process and FAQ](editor/publish/build-guide.md)
    - [Publish to Facebook Instant Games](editor/publish/publish-fb-instant-games.md)
    - [Publish to Web Platforms](editor/publish/publish-web.md)
    - [General Build Options](editor/publish/build-options.md)
    - [Publish from the Command Line](editor/publish/publish-in-command-line.md)
    - [Custom Project Build Template](editor/publish/custom-project-build-template.md)
    - [Build Process and FAQ](editor/publish/build-guide.md)

## Function Modules

- [Graphics](module-map/graphics.md)
    - [Render Pipeline](render-pipeline/overview.md)
        - [Built-in Render Pipeline](render-pipeline/builtin-pipeline.md)
        - [Custom rendering of pipelines (experimental)](render-pipeline/custom-pipeline.md)
    - [Camera](editor/components/camera-component.md)
    - [Lighting](concepts/scene/light.md)
        - [Physically Based Lighting](concepts/scene/light/pbr-lighting.md)
        - [Lights](concepts/scene/light/lightType/index.md)
            - [Directional Lights](concepts/scene/light/lightType/dir-light.md)
            - [Spherical Lights](concepts/scene/light/lightType/sphere-light.md)
            - [Spotlights](concepts/scene/light/lightType/spot-light.md)
            - [Ambient Light](concepts/scene/light/lightType/ambient.md)
        - [Additive Per-Pixel Lights](concepts/scene/light/additive-per-pixel-lights.md)
        - [Shadows](concepts/scene/light/shadow.md)
        - [Imaged Based Lighting](concepts/scene/light/probe/index.md)
            - [Lightmapping](concepts/scene/light/lightmap.md)
            - [Light Probes](concepts/scene/light/probe/light-probe.md)
                - [Light Probe Panel](concepts/scene/light/probe/light-probe-panel.md)
            - [Reflection Probe](concepts/scene/light/probe/reflection-probe.md)
                - [Reflection Probe Panel](concepts/scene/light/probe/reflection-probe-panel.md)
                - [Reflection Probe Art Workflow](concepts/scene/light/probe/reflection-art-workflow.md)
            - [IBL Example](concepts/scene/light/probe/example.md)
    - [Meshes](module-map/mesh/index.md)
        - [MeshRenderer](engine/renderable/model-component.md)
        - [SkinnedMeshRenderer](module-map/mesh/skinnedMeshRenderer.md)
        - [SkinnedMeshBatchRenderer](module-map/mesh/skinnedMeshBatchRenderer.md)
        - [Importing Models Exported from DCC Tools](asset/model/dcc-export-mesh.md)
        - [Export FBX file from 3ds Max](asset/model/max-export-fbx.md)
        - [Export FBX file from Maya](asset/model/maya-export-fbx.md)
        - [glTF](asset/model/glTF.md)
        - [Programmatically Create Meshes](asset/model/scripting-mesh.md)
    - [Textures](module-map/texture/index.md)
        - [Textures](asset/texture.md)
        - [Texture Cube](asset/texture-cube.md)
        - [Texture Compression](asset/compress-texture.md)
        - [RenderTexture](asset/render-texture.md)
    - [Material System Overview](material-system/overview.md)
        - [Programmatic Use of Materials](material-system/material-script.md)
        - [Builtin Materials](material-system/builtin-material.md)
        - [Material System Classes Diagram](material-system/material-structure.md)
    - [Shader Overview](shader/index.md)
        - [Create and Use Shader](shader/effect-inspector.md)
        - [Built-in Shaders](shader/effect-builtin.md)
            - [Physically Based Rendering - PBR](shader/effect-builtin-pbr.md)
            - [Toon Shading](shader/effect-builtin-toon.md)
            - [Unlit Shading](shader/effect-builtin-unlit.md)
        - [Syntax](shader/effect-syntax.md)
            - [Optional Pass Parameters](shader/pass-parameter-list.md)
            - [YAML 101](shader/yaml-101.md)
            - [GLSL](shader/glsl.md)
            - [Preprocessor Macro Definition](shader/macros.md)
            - [Chunk](shader/effect-chunk-index.md)
        - [Built-in Uniforms](shader/uniform.md)
        - [Common Functions](shader/common-functions.md)
        - [Render Flow of Forward Rendering and Deferred Shading](shader/forward-and-deferred.md)
        - [Surface Shader](shader/surface-shader.md)
            - [Guide to Built-in Surface Shader](shader/surface-shader/builtin-surface-shader.md)
            - [Surface Shader Overview](shader/surface-shader/surface-shader-structure.md)
            - [Surface Shader Execution Flow](shader/surface-shader/shader-code-flow.md)
            - [Include](shader/surface-shader/includes.md)
            - [Macro Remapping](shader/surface-shader/macro-remapping.md)
            - [Function Replacement Using Macros](shader/surface-shader/function-replace.md)
            - [Surface Shader Built-in Replaceable Functions](shader/surface-shader/surface-function.md)
            - [Render Usages](shader/surface-shader/render-usage.md)
            - [Lighting Models](shader/surface-shader/lighting-mode.md)
            - [Surface Material Data Structure](shader/surface-shader/surface-data-struct.md)
            - [Shader Stages](shader/surface-shader/shader-stage.md)
            - [Shader Assembly](shader/surface-shader/shader-assembly.md)
            - [VS Inputs](shader/surface-shader/vs-input.md)
            - [FS Inputs](shader/surface-shader/fs-input.md)
            - [Customize Surface Shader](shader/surface-shader/customize-surface-shader.md)
            - [Rendering Debug View](shader/surface-shader/rendering-debug-view.md)
        - [Legacy Shader](shader/legacy-shader/legacy-shader.md)
            - [Guide to Built-in Legacy Shaders](shader/legacy-shader/legacy-shader-builtins.md)
            - [Legacy Shader Key Functions and Structures](shader/legacy-shader/legacy-shader-func-struct.md)
        - [Write Shaders](shader/write-effect-overview.md)
            - [2D Sprite Shader: Gradient](shader/write-effect-2d-sprite-gradient.md)
            - [3D Shader: RimLight](./write-effect-3d-rim-light.md)
        - [Instanced Attributes](shader/instanced-attributes.md)
        - [UBO Layout](shader/ubo-layout.md)
        - [Fallback to WebGL 1.0](shader/webgl-100-fallback.md)
        - [VSCode Extension - Cocos Effect](shader/vscode-plugin.md)
    - [Sorting](engine/rendering/sorting.md)
    - [Effects](module-map/effects/index.md)
        - [Billboard](particle-system/billboard-component.md)
        - [Line](particle-system/line-component.md)
    - [Skybox](concepts/scene/skybox.md)
    - [Global Fog](concepts/scene/fog.md)
    - [Geometry Renderer](geometry-renderer/index.md)

- [2D Objects](2d-object/index.md)
    - [2D Render](2d-object/2d-render/index.md)
        - [Rendering Order](ui-system/components/engine/priority.md)
        - [2D Renderable Component Batching Rules](ui-system/components/engine/ui-batch.md)
        - [Custom Materials for 2D Rendering Objects](ui-system/components/engine/ui-material.md)
        - [2D Renderable Components](ui-system/components/editor/render-component.md)
            - [Sprite Component Reference](ui-system/components/editor/sprite.md)
            - [Label Component Reference](ui-system/components/editor/label.md)
            - [Mask Component Reference](ui-system/components/editor/mask.md)
            - [Graphics Component Reference](ui-system/components/editor/graphics.md)
            - [RichText Component Reference](ui-system/components/editor/richtext.md)
            - [UIStaticBatch Component Reference](ui-system/components/editor/ui-static.md)
            - [Spine Skeleton Component Reference](editor/components/spine.md)
            - [DragonBones ArmatureDisplay Component Reference](editor/components/dragonbones.md)
            - [TiledMap Component Reference](editor/components/tiledmap.md)
            - [TiledTile Component Reference](editor/components/tiledtile.md)
            - [MotionStreak Component Reference](editor/components/motion-streak.md)
    - [UI System](2d-object/ui-system/index.md)
        - [UI Components](ui-system/components/editor/base-component.md)
            - [Canvas Component Reference](ui-system/components/editor/canvas.md)
            - [UITransform Component Reference](ui-system/components/editor/ui-transform.md)
            - [Widget Component Reference](ui-system/components/editor/widget.md)
            - [Button Component Reference](ui-system/components/editor/button.md)
            - [Layout Component Reference](ui-system/components/editor/layout.md)
            - [EditBox Component Reference](ui-system/components/editor/editbox.md)
            - [ScrollView Component Reference](ui-system/components/editor/scrollview.md)
            - [ScrollBar Component Reference](ui-system/components/editor/scrollbar.md)
            - [ProgressBar Component Reference](ui-system/components/editor/progress.md)
            - [LabelOutline Component Reference](ui-system/components/editor/label-outline.md)
            - [LabelShadow Component Reference](ui-system/components/editor/label-shadow.md)
            - [Toggle Component Reference](ui-system/components/editor/toggle.md)
            - [ToggleContainer Component Reference](ui-system/components/editor/toggleContainer.md)
            - [Slider Component Reference](ui-system/components/editor/slider.md)
            - [PageView Component Reference](ui-system/components/editor/pageview.md)
            - [PageViewIndicator Component Reference](ui-system/components/editor/pageviewindicator.md)
            - [UIMeshRenderer Component Reference](ui-system/components/editor/ui-model.md)
            - [UICoordinateTracker Component Reference](ui-system/components/editor/ui-coordinate-tracker.md)
            - [UIOpacity Component Reference](ui-system/components/editor/ui-opacity.md)
            - [BlockInputEvents Component Reference](ui-system/components/editor/block-input-events.md)
            - [WebView Component Reference](ui-system/components/editor/webview.md)
            - [VideoPlayer Component Reference](ui-system/components/editor/videoplayer.md)
            - [SafeArea Component Reference](ui-system/components/editor/safearea.md)
        - [UI Practice Guide](ui-system/components/engine/usage-ui.md)
            - [Multi-Resolution Adaption](ui-system/components/engine/multi-resolution.md)
            - [Widget Alignment](ui-system/components/engine/widget-align.md)
            - [Label Layout](ui-system/components/engine/label-layout.md)
            - [Auto Layout Container](ui-system/components/engine/auto-layout.md)
            - [Create a List of Dynamically Generated Content](ui-system/components/engine/list-with-data.md)
            - [Stretchable UI Sprite](ui-system/components/engine/sliced-sprite.md)

- [Animation](animation/index.md)
    - [Animation Clip](animation/animation-clip.md)
    - [Animation Component Reference](animation/animation-comp.md)
    - [Animation Panel](animation/animation.md)
        - [Creating Animation Components and Animation Clips](animation/animation-create.md)
        - [Get Familiar with the Animation Panel](animation/animation-editor.md)
        - [Editing Animation Clips](animation/edit-animation-clip.md)
        - [Editing Animation Easing Curve](animation/animation-curve.md)
        - [Adding Animation Events](animation/animation-event.md)
        - [Using Animation Curves](animation/use-animation-curve.md)
        - [Curve Editor](animation/curve-editor.md)
    - [Skeletal Animation](animation/skeletal-animation.md)
        - [Joint Texture Layout Settings](animation/joint-texture-layout.md)
    - [Controlling Animation with Scripts](animation/animation-component.md)
        - [Animation State](animation/animation-state.md)
    - [Embedded Player](animation/embedded-player.md)
    - [Marionette Animation System](animation/marionette/index.md)
        - [Animation Graph Assets](animation/marionette/animation-graph.md)
        - [Animation Controller Reference](animation/marionette/animation-controller.md)
        - [Animation Graph Panel](animation/marionette/animation-graph-panel.md)
        - [Animation Graph Layer](animation/marionette/animation-graph-layer.md)
        - [Animation State Machine](animation/marionette/animation-graph-basics.md)
        - [State Transition](animation/marionette/state-transition.md)
        - [Animation Mask](animation/marionette/animation-mask.md)
        - [Animation Graph Variants](animation/marionette/animation-variant.md)

- [Audio System](audio-system/overview.md)
    - [AudioSource Component Reference](audio-system/audiosource.md)
    - [AudioMgr Example](audio-system/audioExample.md)
    - [Compatibility Notes](audio-system/audioLimit.md)

- [Physics System](physics/index.md)
    - [Physics 2D](physics-2d/physics-2d.md)
        - [2D Physics Manager](physics-2d/physics-2d-system.md)
        - [2D RigidBody](physics-2d/physics-2d-rigid-body.md)
        - [2D Physics Collider](physics-2d/physics-2d-collider.md)
        - [2D Contact Callback](physics-2d/physics-2d-contact-callback.md)
        - [2D Physics Joint](physics-2d/physics-2d-joint.md)
    - [Physics 3D](physics/physics.md)
        - [Physics Engines](physics/physics-engine.md)
        - [Physics System Configuration](physics/physics-configs.md)
        - [Group and Mask](physics/physics-group-mask.md)
        - [Physics Components](physics/physics-component.md)
            - [Collider](physics/physics-collider.md)
            - [Rigidbody](physics/physics-rigidbody.md)
            - [Constant Force](physics/physics-constantForce.md)
            - [Constraint](physics/physics-constraint.md)
        - [Physics Material](physics/physics-material.md)
        - [Physics Event](physics/physics-event.md)
        - [Raycast Detection](physics/physics-raycast.md)
        - [Continuous Collision Detection](physics/physics-ccd.md)
        - [Physics Application Cases](physics/physics-example.md)

- [Particle System](particle-system/index.md)
    - [2D Particle System](particle-system/2d-particle/2d-particle.md)
    - [3D Particle System](particle-system/overview.md)
        - [Particle System Module](particle-system/module.md)
            - [Main Module](particle-system/main-module.md)
            - [Shape Module](particle-system/emitter.md)
            - [Velocity Overtime Module](particle-system/velocity-module.md)
            - [Force Overtime Module](particle-system/force-module.md)
            - [Size Overtime Module](particle-system/size-module.md)
            - [Rotation Overtime Module](particle-system/rotation-module.md)
            - [Color Over Life Time Module](particle-system/color-module.md)
            - [Texture Animation Module](particle-system/texture-animation-module.md)
            - [Limit Velocity Overtime Module](particle-system/limit-velocity-module.md)
            - [Trail Module](particle-system/trail-module.md)
            - [Renderer Module](particle-system/renderer.md)
        - [Particle Properties Editor](particle-system/editor/index.md)
            - [Curve Editor](particle-system/editor/curve-editor.md)
            - [Gradient Editor](particle-system/editor/gradient-editor.md)
            - [Particle Editor](particle-system/editor/particle-effect-panel.md)

- [Tween System](tween/index.md)
    - [Tween Interface](tween/tween-interface.md)
    - [Tween Function](tween/tween-function.md)
    - [Tween Examples](tween/tween-example.md)

- [Terrain System](editor/terrain/index.md)

- [Asset Manager](asset/asset-manager.md)
    - [AssetManager Upgrade Guide](asset/asset-manager-upgrade-guide.md)
    - [Asset Bundle Upgrade Guide](asset/subpackage-upgrade-guide.md)
    - [Asset Loading](asset/dynamic-load-resources.md)
    - [Asset Bundle](asset/bundle.md)
    - [Release Of Assets](asset/release-manager.md)
    - [Download and Parse](asset/downloader-parser.md)
    - [Loading and Preloading](asset/preload-load.md)
    - [Cache Manager](asset/cache-manager.md)
    - [Optional Parameters](asset/options.md)
    - [Pipeline and Task](asset/pipeline-task.md)
    - [Resource Management Considerations --- meta files](asset/meta.md)

- [Localization](editor/l10n/overview.md)
    - [Translation Service Provider](editor/l10n/translation-service.md)
    - [Collect and Count](editor/l10n/collect-and-count.md)
    - [Compile Language](editor/l10n/compile-language.md)
    - [L10nLabel](editor/l10n/l10n-label.md)
    - [Sample](editor/l10n/script-using.md)

- [XR](xr/index.md)
    - [Version History](xr/version-history.md)
    - [Architecture](xr/architecture/index.md)
        - [Built-in Resources and Prefabs](xr/architecture/assets.md)
        - [XR Components](xr/architecture/component.md)
        - [XR Preview](xr/architecture/preview.md)
        - [XR Video Player](xr/architecture/xr-video-player.md)
        - [XR Preview in Browser](xr/architecture/xr-webview.md)
        - [XR Spatial Audio](xr/architecture/xr-spatial-audio.md)
        - [XR Composition Layer](xr/architecture/xr-composition-layer.md)
        - [Passthrough](xr/architecture/xr-pass-through.md)
        - [AR](xr/architecture/ar-introduce.md)
            - [AR Camera](xr/architecture/ar-camera.md)
            - [AR Manager](xr/architecture/ar-manager.md)
            - [AR Automated Behavior Editing](xr/architecture/ar-tracking-component.md)
            - [AR Interaction](xr/architecture/ar-interaction.md)
    - [Quick Start](xr/index.md)
        - [VR Project Creation](xr/project-deploy/vr-proj-deploy.md)
        - [VR Building and Publishing](xr/project-deploy/vr-proj-pub.md)
        - [AR Project Creation](xr/project-deploy/ar-proj-deploy.md)
        - [AR Building and Publishing](xr/project-deploy/ar-proj-pub.md)
        - [WebXR Project Setup](xr/project-deploy/webxr-proj-deploy.md)
        - [WebXR Building and Publishing](xr/project-deploy/webxr-proj-pub.md)
- [Native Development](native/overview.md)
    - [Native Platform Secondary Development Guide](advanced-topics/native-secondary-development.md)
    - [JavaScript and Android Communication with Reflection](advanced-topics/java-reflection.md)
    - [JavaScript and iOS/macOS Communication with Reflection](advanced-topics/oc-reflection.md)
    - [JavaScript and Java Communication using JsbBridge](advanced-topics/js-java-bridge.md)
    - [JavaScript and Objective-C Communication using JsbBridge](advanced-topics/js-oc-bridge.md)
    - [JsbBridgeWrapper - An Event Mechanism based on JsbBridge](advanced-topics/jsb-bridge-wrapper.md)
    - [Tutorial: JSB 2.0](advanced-topics/JSB2.0-learning.md)
        - [JSB Manual Binding](advanced-topics/jsb-manual-binding.md)
        - [JSB Auto Binding](advanced-topics/jsb-auto-binding.md)
        - [Swig](advanced-topics/jsb-swig.md)
        - [Swig Tutorial](advanced-topics/jsb/swig/tutorial/index.md)
    - [CMake Usage Introduction](./advanced-topics/cmake-learning.md)
    - [Native Engine Memory Leak Detection System](./advanced-topics/memory-leak-detector.md)
    - [Native Scene Culling](./advanced-topics/native-scene-culling.md)
    - [Native Profiler](./advanced-topics/profiler.md)
    - [Native Plugins](./advanced-topics/native-plugins/brief.md)
        - [Cocos Native Plugin Quick Tutorial](./advanced-topics/native-plugins/tutorial.md)
    - [Optimization of Cross-Language Invocation](advanced-topics/jsb-optimizations.md)

## Advanced Tutorials

- [Editor Extension](editor/extension/readme.md)
    - [Extension Manager](editor/extension/extension-manager.md)
    - [Extension Templates and Compile Builds](editor/extension/create-extension.md)
    - [Getting Started Example - Menu](editor/extension/first.md)
    - [Getting Started Example - Panel](editor/extension/first-panel.md)
    - [Getting Started Example - First Data Interaction](editor/extension/first-communication.md)
    - [Change the Name of a Extension](editor/extension/extension-change-name.md)
    - [Install and Share](editor/extension/install.md)
    - [Submitting Resources to Cocos Store](editor/extension/store/upload-store.md)
    - [Extend Existing Functionality](editor/extension/contributions.md)
        - [Customize the Main Menu](editor/extension/contributions-menu.md)
        - [Customized Messages](editor/extension/contributions-messages.md)
        - [Calling the Engine API and Project Script](editor/extension/scene-script.md)
        - [Extending the Assets Panel](editor/assets/extension.md)
        - [Custom Asset Database](editor/extension/contributions-database.md)
        - [Custom Inspector Panel](editor/extension/inspector.md)
        - [Extending Build Process](editor/publish/custom-build-plugin.md)
        - [Extending Project Settings Panel](editor/extension/contributions-project.md)
        - [Extending the Preferences Panels](editor/extension/contributions-preferences.md)
        - [Extending Shortcut](editor/extension/contributions-shortcuts.md)
    - [Extension Details](editor/extension/basic.md)
        - [Extension Infrastructure](editor/extension/package.md)
        - [Definition of Extension](editor/extension/define.md)
        - [Message System](editor/extension/messages.md)
        - [Configuration System](editor/extension/profile.md)
        - [Extension Panel](editor/extension/panel.md)
        - [UI Components](editor/extension/ui.md)
- [Advanced Topics](advanced-topics/index.md)
    - [Submit Code to Cocos Engine Repository](submit-pr/submit-pr.md)
    - [User Data Storage](advanced-topics/data-storage.md)
    - [Engine Customization Workflow](advanced-topics/engine-customization.md)
    - [Web Preview Customization Workflow](editor/preview/browser.md)
    - [Dynamic Atlas](advanced-topics/dynamic-atlas.md)
    - [Hot Update Tutorial](advanced-topics/hot-update.md)
    - [AssetManager for Hot Update](advanced-topics/hot-update-manager.md)
    - [HTTP Request](advanced-topics/http.md)
    - [WebSocket Introduction](advanced-topics/websocket-introduction.md)
        - [WebSocket Client](advanced-topics/websocket.md)
        - [WebSocket Server](advanced-topics/websocket-server.md)