# 基于多 Pass 的多光源支持

下面以 Creator 中默认的光照材质 `default-material.mtl` 为例，介绍如何实现基于多 Pass 的多光源支持。

![default-material](default-material.png)

首先在 **层级管理器** 中新建一个 **Sphere 球体** 节点，然后继续添加一个平行光，两个聚光灯，将它们设置环绕在球体周围，如下图所示：

![using Light](usingLight.png)

场景搭建完成后，选择编辑器上面的浏览器预览，可以在左下角看到 Draw Call。

![Draw Call](drawCall.png)

> 我们来打开Frame Debug来看看这些到底是如何渲染到屏幕上去的:

![Frame Debug](debug.png)

> 第一遍，先渲染 ` Main Light ` 的基础着色效果。

![main light pass](pass1.png)

> 第二遍，渲染 ` 聚光灯_1 ` 的光照效果。

![ForwardAdd pass](pass2.png)

> 第三遍，渲染 ` 聚光灯_2 ` 的光照效果。

![ForwardAdd pass](pass3.png)

> 这种渲染路径就是 Forward-Pipeline，Forward 由两个 Pass 组成 第一个 Pass 叫 BasePas，用来绘制一个平行光带来的光照，另一个 Pass 叫 LightPass，负责绘制剩余灯>光的光照，可以预见到一个物体被多个灯光照射到了，就会多个 Draw Call。
