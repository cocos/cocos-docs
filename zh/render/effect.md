# Effect 参考

## 创建 Effect

直接点击 **资源管理器** 左上方的 **+** 号按钮，然后选择 **Effect** 即可。

![](./material/create-effect.png)

另外一种方式是在 **资源管理器** 中选中要存放 Effect 的文件夹，然后点击右键，选择 **新建 -> Effect** 即可。

## 使用 Effect

1. 创建 Effect 后，在 **资源管理器** 中选中新建的 New Effect，然后在 **属性检查器** 中可以预览到编译后的 glsl 代码。

    ![](./material/effect-preview.png)

2. 在 **资源管理器** 中选择材质，然后在 **属性检查器** 的 Effect 下拉框中可以看到新建的 New Effect 选项。

    ![](./material/use-effect.png)

## Effect 书写规则

Cocos Creator 的 Effect 书写规则基本与 Cocos Creator 3D 一致，可以使用 VS Code 的 Cocos Effect 插件进行编写，只是内置的一些 shader 变量名字有些区别。具体可以参考 [文档](https://docs.cocos.com/creator3d/manual/zh/material-system/overview.html)。
