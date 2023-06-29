# Cocos Creator 3.3 User Manual

Welcome to the __Cocos Creator 3.3__ user manual! This manual includes detailed instructions, a workflow for users, and a step-by-step tutorial for beginners. This manual can help you quickly learn how to develop cross-platform games with __Cocos Creator__.

**Note: please select the corresponding manual version in the upper right corner according to the Cocos Creator version you are using.**

## Product Line Overview

Over the years, Cocos (Xiamen Yaji Software) has been continuously developing and has released several product lines closely related to Cocos Creator. To avoid confusion, here is a brief introduction to these products:
- **Cocos Creator 3.x**: Released in early 2021, it is the latest version of Cocos Creator, and has been validated through numerous commercial projects. 3.x completely abandons the Cocos2d-x base, adopting a brand new high-performance cross-platform 3D core. This marks the official development of Cocos Creator into a comprehensive pan-mobile 3D game engine. Since the 3.x base has been completely rewritten, Cocos Creator is no longer considered a direct extension and upgrade of Cocos2d-x.
- **Cocos Creator 2.x**: Released in 2018, updates ceased in 2023. All capabilities have been inherited by Cocos Creator 3.x, so it is recommended that new projects use the [latest Cocos Creator 3.x](https://www.cocos.com/creator-download).
- **Cocos Creator 3D**: Initiated in 2017, it underwent small-scale testing in China for over a year as Cocos Creator 3D at the end of 2019, and later officially merged into Cocos Creator 3.0. Since it has been replaced by Cocos Creator 3.x and is no longer updated separately, Cocos Creator 3D usually refers to Cocos Creator's own 3D capabilities rather than this specific version.
- **[Cocos2d-x](https://www.cocos.com/cocos2d-x)**: Released in 2010, it ceased updates in 2019. This is the most active branch of the Cocos2d community, and the underlying runtime initially adopted by Cocos Creator 2.x was the upgraded Cocos2d-x.
- **Cocos**: When Cocos appears as the engine name alone, it usually represents Cocos Creator 3.x, rather than Cocos2d-x.

After years of rapid development, there are significant differences in usage between Cocos Creator 3.x and Cocos Creator 2.x, and their APIs are not fully compatible. Therefore, when developers consult documentation, APIs, and tutorials, please pay attention to distinguish whether the target version is 2.x or 3.x to avoid errors due to version inconsistency.

## General Guide

- [Cocos Creator Basic Usage](getting-started/index.md)
- [Scene Creation](concepts/scene/index.md)
- [Assets System](asset/index.md)
- [Scripting Guide and Event System](scripting/index.md)
- [Cross-platform Game Publish](editor/publish/index.md)
- [Graphics Rendering](module-map/graphics.md)
- [2D Rendering](2d-object/2d-render/index.md)
- [UI System](2d-object/ui-system/index.md)
- [Animation System](animation/index.md)
- [Audio System](audio-system/overview.md)
- [Physics System](physics/index.md)
- [Particle System](particle-system/index.md)
- [Tween System](tween/index.md)
- [Terrain System](editor/terrain/index.md)
- [Asset Manager](asset/asset-manager.md)
- [Editor Extension](editor/extension/readme.md)
- [Advanced Topics](advanced-topics/index.md)

## Demo and Example Projects

- [Example collection](https://github.com/cocos-creator/example-3d): From the use of basic components to the display of rendering effects, this project includes multiple scenarios with different functions and multiple game demo projects for user reference.
- [One Step, Two Steps](https://github.com/cocos-creator/tutorial-mind-your-step-3d): This is the [Quick Start](getting-started/first-game/index.md) document Step-by-step explanation of the game.
- [Examples of Physics](https://github.com/cocos-creator/example-3d/tree/v3.3/physics-3d): Includes some Physics test cases and examples, such as **Engulfing Black Hole**, **Simple Car**, **Falling ball**, etc. The test cases introduce some basic functions and usage methods, so that understand the physical functions in combination with the documentation.
- [Simple Games](https://github.com/cocos-creator/example-3d/tree/v3.3/simple-games): Users can use this case study to complete some simple and famous games.
- [Module display collection](https://github.com/cocos-creator/test-cases-3d): The example project of each function of the engine, which basically covers most of the function modules of the engine. Users can refer to it when using the functions Development in this project.
- [UI Show Demo](https://github.com/cocos-creator/demo-ui/): Demo of various UI components combined use Demo.
- [Jump Ball 3D](https://github.com/cocos-creator/demo-ball): Users can make jump ball games through this project.
- [Taxi Game 3D](https://github.com/cocos-creator/tutorial-taxi-game): Physics-based game demo, users can make taxi games through this project.

> **Note**: the above items will be updated from time to time. Their default branch on GitHub is `master`, which generally corresponds to the latest __Cocos Creator__ version. If you are still using an older version of __Cocos Creator__, these projects may not open, try to switch to the same named branch as the old version.
