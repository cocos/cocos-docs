# UIOpacity（透明度设置）组件参考

该组件会为节点记录一个透明度修改标识用来影响到后续的渲染节点。一般用于非渲染节点，如果作用在渲染节点上会形成透明度叠加现象。渲染节点可以通过设置 color 的 alpha 通道来设置透明度。

使用方法如下：

![ui-opacity](uiopacity/ui-opacity.png)

也可以通过代码设置透明度：

```ts
const opacityComp = this.getComponent(UIOpacity);
opacityComp.opacity = 157;
```

遮罩的组件接口请参考 [UIOpacity API](__APIDOC__/zh/#/docs/3.4/zh/ui/Class/UIOpacity)。

关于使用可以参考范例 **UIOpacity**（[GitHub](https://github.com/cocos-creator/test-cases-3d/tree/v3.4/assets/cases/ui/other/opacity) | [Gitee](https://gitee.com/mirrors_cocos-creator/test-cases-3d/tree/v3.4/assets/cases/ui/other/opacity)）。

## UIOpacity 属性

| 属性  |   功能说明           |
| :-------------- | :----------- |
| Opacity           | 透明度 |
