# 编写着色器

若内置的着色器无法满足需求，可通过自定义着色器实现特例化渲染。

## 创建着色器资源

在 Cocos Creator 中的着色器称之为 **Cocos Effect**，资源类型为 **EffectAsset**，可以通过点击 **资源管理器** 右上角的 **+** 或者在 **资源管理器** 任意空白区域右键，选择 **Effect** 即可创建 **Cocos Effect**。

![create-effect](img/create-effect.png)

默认情况下，引擎会创建最简单的无光照着色器模板：

![默认着色器模板](img/default-effect.png)

若要基于内置着色器修改，可从项目内 **资源管理器 -> internal->effects** 内拷贝到资源管理器进行修改。

<!-- 了解更多内置着色器的内容：[内置着色器](effect-buildin.md) 。 -->

本节将包含以下内容：

- [编写普通着色器](write-effect.md)
<!-- TODO： 增加表面着色器的写法
- [编写表面着色器](write-surf-shader.md) 
-->