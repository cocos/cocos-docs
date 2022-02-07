# 着色器属性检查器

在 资源查看器内 单选着色器资源可以打开着色器的 **属性查看器**：

![effect Inspector](img/effect-inspector.png)

着色器的 **属性查看器** 主要由三部分组成:

|名称|说明|
|:--|:--|
|Shaders |这里展示的是当前的着色器被引擎编译后所产生的名字
|Precompile |Combinations 预编译宏定义，修改 on/off 状态会导致受影响的材质重新编译
|GLSL Output |这里展示的是在不同版本的 OpenGL 下，编译出的着色器代码的最终效果

通过选择不同的标签页可切换显示当前编译后的顶点着色器和片元着色器：

![vs-fs-switc](img/change-vs-fs.png)