# SafeArea 组件参考

该组件会将所在节点的布局适配到 iPhone X 等异形屏手机的安全区域内，可适配 Android 和 iOS 设备，通常用于 UI 交互区域的顶层节点。

![Renderings](./safearea/renderings.png)

开发者只需要将 SafeArea 组件添加到节点上。该组件在启用时会通过 `sys.getSafeAreaRect()` 获取到当前 iOS 或 Android 设备的安全区域，并通过 Widget 组件（如果没有 Widget 组件会自动添加）实现适配。

SafeArea 脚本接口请参考 [Mask API](__APIDOC__/zh/#/docs/3.5/zh/ui/Class/SafeArea)。

具体用法可参考官方范例 **SafeArea**（[GitHub](https://github.com/cocos-creator/test-cases-3d/tree/v3.4/assets/cases/ui/23.safe-area) | [Gitee](https://gitee.com/mirrors_cocos-creator/test-cases-3d/tree/v3.4/assets/cases/ui/23.safe-area)）。
