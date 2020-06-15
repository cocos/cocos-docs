# Cocos Creator v2.3 User Manual

Welcome to the **Cocos Creator User Manual**! **Cocos Creator** is a free, cross-platform, game development tool based on **Cocos2d-x**. This is a comprehensive and detailed guide to help you get started with designing and developing games.

**Note**: Please select the corresponding version of the manual in the upper right corner according to the version of Cocos Creator you are using.

## What's New

- **As of v2.4.0**, Cocos Creator has completely rewritten the Resource Management module, and it's compatible with most of the previously used APIs, so most projects will still work under existing code, but some projects may receive some warnings. In both cases, developers are advised to upgrade to the latest resource management module.See [v2.4 Asset Manager Upgrade Guide](release-notes/asset-manager-upgrade-guide.md) and [v2.4 Subpackage upgrade guide](release-notes/subpackage-upgrade-guide.md) for details.
- **As of v2.4.0**, Cocos Creator officially supports Asset Bundle functionality, providing more powerful remote resource loading capabilities, dynamic loading of subprojects, and further reducing the size of the first bundle, see [Asset Bundle](scripting/asset-bundle.md) for details.
- **As of v2.4.0**, the build process of the editor will be based on Asset Bundle, and if a developer extends the build process on the editor using plugins prior to v2.4, they will need to upgrade the use of some of the APIs, as detailed in the [Custom Build Process Upgrade Guide](release-notes/build-extend-upgrade-guide.md).
- **As of v2.3.0**, Cocos Creator has added support for [3D Physics and Collision](physics-3d/index.md) and [3D Particle System](3d/particle-system-3d.md), while the [Material System](render/index.md) has been upgraded to the official version.
- **As of v2.3.0**, Cocos Creator supports publishing to [QTT Mini Games](publish/publish-qutoutiao-mini-games.md).
- [Spine ReplaceTexture](components/spine.md#spine-replacetexture).
- [DragonBones ReplaceTexture](components/dragonbones.md).
- **As of v2.1.4**, Cocos Creator supports publishing to [Alipay Mini Games](publish/publish-alipay-mini-games.md).
- **As of v2.1**, Cocos Creator introduced 3D support. Please refer to [v2.1.0 Release Notes](release-notes/upgrade-guide-v2.1.md).
- **As of v2.0.10**, Cocos Creator supports publishing to [Xiaomi Quick Games](publish/publish-xiaomi-quick-games.md) and [Cocos Play](publish/publish-cocosplay.md).
- **As of v2.0.7**, Cocos Creator supports publishing to [Huawei Quick Games](publish/publish-huawei-quick-games.md).
- **As of v2.0.5**, Cocos Creator supports publishing to [OPPO Mini Games](publish/publish-oppo-instant-games.md) and [vivo Mini Games](publish/publish-vivo-instant-games.md).
- **As of v2.0.4**, Cocos Creator supports publishing to [Google Play Instant](publish/publish-android-instant.md).
- [v2.0 Upgrade Guide](release-notes/upgrade-guide-v2.0.md).
- **As of v1.10**, Cocos Creator refactored the underlying resource types, most of which are unaffected, but some projects may receive warnings, please refer to [v1.10 Resource Upgrade Guide](release-notes/raw-asset-migration.md).

## Index

- [Getting Started](getting-started/index.md)
- [Asset Workflow](asset-workflow/index.md)
- [Scene Creation Workflow](content-workflow/index.md)
- [Scripting](scripting/index.md)
- [Publishing](publish/index.md)
- [Renderer and Graphics](render/index.md)
- [UI](ui/index.md)
- [Animation](animation/index.md)
- [Audio](audio/index.md)
- [2D Physics and Collision](physics/index.md)
- [3D System](3d/index.md)
- [3D Physics and Collision](physics-3d/index.md)
- [Editor Extension](extension/index.md)
- [Advanced Topics](advanced-topics/index.md)
- [SDK Integration](sdk/index.md)

## Example Projects

- [Example Collections](https://github.com/cocos-creator/example-cases): You can also get access to it by creating a new project using that template. It's a case by case introduction of most Cocos Creator components and features.
- [Your first Cocos Creator game: Star Catcher](https://github.com/cocos-creator/tutorial-first-game), please read [Quick Start Tutorial](getting-started/quick-start.md).
- [Blackjack Demo co-developed with Tencent Games](https://github.com/cocos-creator/tutorial-blackjack)
- [UI Demo](https://github.com/cocos-creator/demo-ui)
- [Dark Slash](https://github.com/cocos-creator/tutorial-dark-slash): Original Dark Slash resources authorized by Veewo Games to recreate Dark Slash in Cocos Creator as a demo.
- [i18n Multi-language demo](https://github.com/nantas/demo-i18n)

**Note**: These projects are not always brought up to date with the most recent version of Cocos Creator. Their default branches on GitHub are `master`, which corresponds to the latest **Cocos Creator version**. If you are still using the old version of Cocos Creator, these projects may not be able to open, and you can try to switch to the same named branch as the old version.
