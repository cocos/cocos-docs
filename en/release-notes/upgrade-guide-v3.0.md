# Cocos Creator 3.0 Preview Upgrade Guide

## Version introduction

__Cocos Creator 3.0 Preview__ integrates all the functions of the original __2D__ and __3D__ products, brings many major updates, and will become the main version of __Cocos Creator__. At the same time, 3.0 also continues __Cocos's__ advantages of light weight and high efficiency in 2D categories, and provides an efficient development experience for 3D heavy games.

In order to ensure the smooth transition of an existing __Cocos Creator 2.4__ project, we will use 2.4 as the LTS (long-term support) version and provide continuous updates for the next **two years**! In **2021**, 2.4 will continue to be updated to provide bug fixes and new mini-game platform support to ensure the successful launch of your project; in **2022**, we will continue to provide developers with the key to 2.4 bug fixes to ensure the smooth operation of online games! Therefore,

 - **Existing 2.x projects can continue to develop without compulsory upgrade to 3.0**.
 - **For new projects, it is recommended to use version 3.0 for development**. We will continue to optimize the development experience and operating efficiency of 3.0 to support the smooth launch of heavy games of different categories such as 2D and 3D.

This __Cocos Creator 3.0 Preview__ version is close to the official version in terms of functionality, and can be used for new project establishment and feature pre-research. The next official version will be released around Feb 11 - Feb 17, 2021, and will further improve the performance and fix the problems at that time to ensure that everyone's new projects can proceed smoothly.

This __Cocos Creator 3.0 Preview__ version uses a new future-oriented engine architecture, which will bring high-performance, data-oriented and load-balanced renderers to the engine, and seamlessly support Vulkan & Metal multi-backend rendering. In the future, it will also support mobile VR/AR and some Host platform. For a detailed introduction to the __Cocos Creator 3.0 Preview__, please go to [Official Website Update Instructions](https://cocos.com/creator).

## How to migrate (not supported in Preview version)

Although **we do not recommend projects under development, especially projects that are about to go live, upgrade to 3.0**, we will still launch the 2.x resource import tool in the 3.0 official version. This tool will support the perfect import of old project resources and the auxiliary import of codes. Code-assisted import will convert **Javascript** into **TypeScript**, add component type declarations, attribute declarations and function declarations. The references of components in the scene will be preserved, and the code inside the function will be imported in the form of comments, which can reduce the developer's upgrade difficulty.

Users only need to click **File -> Import -> CocosCreator 2D Project** in the main menu, and a window for importing the plug-in will appear.

![image](https://user-images.githubusercontent.com/1503156/100599538-20b8c880-333b-11eb-9831-bf176730b777.png)
![image](https://user-images.githubusercontent.com/1503156/100599556-26161300-333b-11eb-8b85-31e144300f73.png)
![image](https://user-images.githubusercontent.com/1503156/100599545-23b3b900-333b-11eb-844a-876ad09fe7c6.png)

Then click the button under the left picture and select the root directory of the __Cocos Creator__ 2D project. The plug-in will automatically traverse all the resources in the project and present it to the user. Users can check the resources to be imported by themselves, and click the import button in the right picture after selection. The import is complete.

If an existing project needs to be upgraded for special reasons, and you encounter technical or workload difficulties, you can also contact [slackmoehrle@cocos2d-x.org](mailto:slackmoehrle@cocos2d-x.org) for assistance!

## Old version developers quickly get started

### Engine API upgrade

#### Component class name change (for v1.2 users)

In order to comply with the __Cocos Creator v2.x__ API specification, __Cocos Creator 3.0 Preview__ discarded the naming method of component class names containing Component suffix, and made automatic data upgrade and code compatibility.

However, it is recommended that developers still search for all uses of similar naming methods in the code and change to the class name without the Component suffix as soon as possible. You can use the following regular expressions to perform a global search (open case sensitivity and regular matching):

```
([A-Z]\w+)Component
```

#### UI related interfaces on the obsolete node (for v2.x users)

The abandoned interfaces are as follows:

- Attributes: `width`, `height`, `anchorX`, `anchorY`.
- Methods: `getAnchorPoint`, `setAnchorPoint`, `getContentSize`, `setContentSize`.

Please get the `UITransform` component on the node first, and then use the corresponding interface, for example:

```typescript
node.getComponent(UITransform).setContentSize(size);
```

#### loader

The loader API is consistent with v2.4, please refer to the [v2.4 Resource Management Module Upgrade Guide](https://docs.cocos.com/creator/manual/en/release-notes/asset-manager-upgrade-guide.html).

### Editor upgrade

#### Build Panel

The builds of all platforms in __Cocos Creator 3.0 Preview__ are built-in plug-ins, so the build panel is also different from __Creator v2.4__. The unique build options of each platform will be placed in a foldable section control separately.

![image](https://user-images.githubusercontent.com/1503156/100602713-3d56ff80-333f-11eb-8280-d58e262ccc2b.png)

After clicking the build button, it will jump to the **Build Tasks** panel, where all built platforms will be displayed. You can modify the build options of the built project in this panel and then rebuild, view the build log, open the project directory, etc. If you need to compile for other platforms, click the **New Build Task** button at the top left of the panel.

![image](https://user-images.githubusercontent.com/1503156/100602806-5cee2800-333f-11eb-8dfe-4ba7e8e9283a.png)

In addition, it supports the construction of multi-module results with file separation during construction, which facilitates concurrent loading of multiple modules and dynamic loading of modules, and the WeChat engine plug-in supports the selection of different physical engine backends. The `settings.js` generated after the build is also changed to `settings.json` and placed under `res`, allowing it to be used as a resource upload server.

#### Resource thumbnail panel

Select the resource in the resource manager to display resource thumbnails in the resource thumbnail panel for easy viewing:

![image](https://user-images.githubusercontent.com/1503156/100602913-78f1c980-333f-11eb-9f9a-18e214548ce7.png)

#### Animation editor upgrades

- Support the search and display filtering of nodes in the node tree panel.
- Support using the system clipboard to copy and paste all animation data (nodes, tracks, and key frames) on nodes.
- Support multi-select nodes to add attribute tracks in batches.
- Optimize the experience of selecting and deselecting key frames (Ctrl + mouse click to select key frames to deselect them).
- After selecting multiple key frames, continue to click to edit the curve or select unselected key frames.
- Support continuing to edit node attributes in the animation editing state, including particle and model material attributes, etc.

![image](https://user-images.githubusercontent.com/1503156/100603114-a2aaf080-333f-11eb-8bd3-0997721adcb6.png)

#### Project settings panel update

It is divided into three parts: **Engine module**, **project settings**, and **compressed texture configurations**.

The Physics Collision Group uses the `PhysicsSystem.PhysicsGroup` type independently, and no longer shares the group configuration with `Node.Layers`:

![image](https://user-images.githubusercontent.com/1503156/100603220-be15fb80-333f-11eb-9ddd-a6b97455c468.png)

The **compressed texture configuration** is modified to configure the preset in the project settings, then select the image resource in the resource manager, and then select the preset method. After the old project is upgraded, the editor will automatically scan all the compressed texture configurations in the project and sort out several presets. Since it is automatically scanned, the generated name may not be what you want, you can modify it here.

![image](https://user-images.githubusercontent.com/1503156/100603295-d259f880-333f-11eb-8ff9-c985df953d83.png)

### TypeScript Reference Tutorial

- [TypeScript official website](https://www.typescriptlang.org/)
- [TypeScript - Classes](https://www.typescriptlang.org/docs/handbook/classes.html)
- [TypeScript - Decorators](https://www.typescriptlang.org/docs/handbook/decorators.html)
- [Learn TypeScript in Y minutes](https://learnxinyminutes.com/docs/typescript/)
