## 材质资源

### 材质创建

材质创建方式如下：

![material-create](material/material-create.png)

或

![material-create-menu](material/material-create-menu.png)

材质控制着每个模型最终的着色，材质由 Effect 构成，由材质操控 Effect 的着色流程。材质本身也可以看作是 Effect 资源的容器，材质可以任意切换当前要使用的 Effect 资源。下图就是我们创建的材质默认选择的 Effect 资源。

![default-effect](material/default-effect.png)

同时，我们还可以通过点击 Effect 属性右边的框要切换当前材质的 Effect。

![effects](material/effects.png)

### Effect 创建

Effect 的创建方式跟 Material 的创建方式类似。

![effect-create](material/effect-create.png)

创建出来的 Effect 默认是一个 PBR 的 Effect。

![effect-show](material/effect-show.png)

以上就是一个材质的创建流程，更多信息可以参考：[Effect 书写格式与语法](../material-system/effect-syntax.md)
