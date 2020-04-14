# SafeArea 组件参考

该组件会将所在节点的布局适配到 iPhone X 等异形屏手机的安全区域内，通常用于 UI 交互区域的顶层节点，具体用法可参考官方范例 [example-cases/02_ui/16_safeArea/SafeArea.fire](https://github.com/cocos-creator/example-cases/tree/master/assets/cases/02_ui/16_safeArea)。

![Renderings](./safearea/renderings.png)

开发者只需要在节点上添加该组件，无需任何设置，该组件在启用时会通过 API `cc.sys.getSafeAreaRect();` 获取到当前 iOS 或 Android 设备的安全区域，并通过 Widget 组件（如果没有 Widget 组件会自动添加）实现适配。