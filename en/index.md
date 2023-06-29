# Cocos Creator v2.0 User Manual

Welcome to the __Cocos Creator__ User Manual! __Cocos Creator__ is a free, cross-platform, game development tool based on __Cocos2d-x__. This is a comprehensive and detailed guide to help you get started with designing and developing games.

> **Note**: please select the corresponding version of the manual in the upper right corner according to the version of __Cocos Creator__ you are using.

## Product Line Overview

Over the years, Cocos (Xiamen Yaji Software) has been continuously developing and has released several product lines closely related to Cocos Creator. To avoid confusion, here is a brief introduction to these products:
- **Cocos Creator 3.x**: Released in early 2021, it is the latest version of Cocos Creator, and has been validated through numerous commercial projects. 3.x completely abandons the Cocos2d-x base, adopting a brand new high-performance cross-platform 3D core. This marks the official development of Cocos Creator into a comprehensive pan-mobile 3D game engine. Since the 3.x base has been completely rewritten, Cocos Creator is no longer considered a direct extension and upgrade of Cocos2d-x.
- **Cocos Creator 2.x**: Released in 2018, updates ceased in 2023. All capabilities have been inherited by Cocos Creator 3.x, so it is recommended that new projects use the [latest Cocos Creator 3.x](https://www.cocos.com/creator-download).
- **Cocos Creator 3D**: Initiated in 2017, it underwent small-scale testing in China for over a year as Cocos Creator 3D at the end of 2019, and later officially merged into Cocos Creator 3.0. Since it has been replaced by Cocos Creator 3.x and is no longer updated separately, Cocos Creator 3D usually refers to Cocos Creator's own 3D capabilities rather than this specific version.
- **[Cocos2d-x](https://www.cocos.com/cocos2d-x)**: Released in 2010, it ceased updates in 2019. This is the most active branch of the Cocos2d community, and the underlying runtime initially adopted by Cocos Creator 2.x was the upgraded Cocos2d-x.
- **Cocos**: When Cocos appears as the engine name alone, it usually represents Cocos Creator 3.x, rather than Cocos2d-x.

After years of rapid development, there are significant differences in usage between Cocos Creator 3.x and Cocos Creator 2.x, and their APIs are not fully compatible. Therefore, when developers consult documentation, APIs, and tutorials, please pay attention to distinguish whether the target version is 2.x or 3.x to avoid errors due to version inconsistency.

## What's New

- [DragonBones ReplaceTexture](components/dragonbones.md)
- Starting with __v2.0.5__, Cocos Creator supports publishing to [OPPO Mini Game](publish/publish-oppo-instant-games.md) and [vivo Mini Game](publish/publish-vivo-instant-games.md).
- Starting with __v2.0.4__, Cocos Creator supports publishing to [Google Play Instant](publish/publish-android-instant.md).
- Starting with __v2.0.1__, Cocos Creator upgraded the open data context solution, see [WeChat Mini Game Open Data Context](publish/publish-wechatgame-sub-domain.md).
- [v2.0 Upgrade Guide](release-notes/upgrade-guide-v2.0.md).
- Starting with __v1.10__, Cocos Creator refactored the underlying resource types. Most projects are not affected, but some projects may receive some warnings. For details, please refer to [v1.10 Resource Upgrade Guide](release-notes/raw-asset-migration.md).
- Starting with __v1.10__, Cocos Creator supports __WeChat Mini Game__ and their subpackage loading feature, please refer to [Subpackage Loading](scripting/subpackage.md).

## Index

- [Getting Started](getting-started/index.md)
- [Asset Workflow](asset-workflow/index.md)
- [Scene Creation Workflow](content-workflow/index.md)
- [Renderer and Graphics](render/index.md)
- [UI](ui/index.md)
- [Scripting](scripting/index.md)
- [Animation](animation/index.md)
- [Physics](physics/index.md)
- [Audio](audio/index.md)
- [Publishing](publish/index.md)
- [Editor Extension](extension/index.md)
- [Advanced Topics](advanced-topics/index.md)
- [SDK Integration](sdk/index.md)

## Example Projects

- [Example Collections](https://github.com/cocos/example-projects): You can also get access to it by creating a new project using that template. It's a case by case introduction of most Cocos Creator components and features.
- [Your first Cocos Creator game: Star Catcher](https://github.com/cocos-creator/tutorial-first-game), please read [Quick Start Tutorial](getting-started/quick-start.md) to build it step by step!
- [Blackjack Demo co-developed with Tencent Games](https://github.com/cocos-creator/tutorial-blackjack)
- [UI Demo](https://github.com/cocos/cocos-example-ui)
- [Dark Slash](https://github.com/cocos/cocos-example-dark-slash): Original Dark Slash resources authorized by Veewo Games to recreate Dark Slash in Cocos Creator as a demo.

> **Note**: these projects are not always brought up to date with the most recent version of __Cocos Creator__. Their default branches on GitHub are `master`, which corresponds to the latest __Cocos Creator version__. If you are still using the old version of __Cocos Creator__, these projects may not be able to open, and you can try to switch to the same named branch as the old version.
