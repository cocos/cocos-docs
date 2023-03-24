# 着色器创建与使用

## 创建着色器

在 **资源管理器** 面板中点击左上角的 **+** 号按钮（或者在 Assets 目录下点击右键），在弹出菜单中选择 **着色器（Effect）** 或者 **表面着色器（Surface Shader）**， 便可创建新的着色器资源。

![1](img/create-effect.png)

两种类型的着色器区别：
- **着色器（Effect）**：简单的无光照着色器，来自 internal/effects/builtin-unit.effect
- **表面着色器（Surface Shader）**：基于 PBR 的着色器，来自 internal/effects/builtin-standard.effect

我们以 **着色器（Effect）** 为例，引擎会在 **资源管理器** 中创建一个默认名为 **effect** 的着色器资源：

![image](img/new-effect.png)

在 **属性检查器** 中可以看到着色器主要由以下几部分组成：

|属性|说明|
| :-- | :-- |
|Shaders | 当前着色器以及其渲染过程的名称
| Precompile Combinations | 是否开启预处理宏定义组合，详情请参考下文说明
| GLSL 300 ES/100 Output | 着色器输出，详情请参考下文说明

## Shaders

如果当前的着色器有多个渲染过程，则可以通过 Shaders 右边的下拉框来选择不同的渲染过程。选择渲染过程后，可以通过 GLSL Output 窗口查看当前编译后的着色器代码。

![渲染过程](img/effect-pass.png)

## Precompile Combinations

一般情况下材质会在使用到相应宏定义的时候进行编译，当使用到较多宏定义时可能会出现卡顿的情况。因此便可以在该项配置预编译宏定义组合，用于提前编译所需的宏定义组合。例如下图中的配置：

![image](./img/precompile.png)

## GLSL Output

目前引擎提供 GLSL 300 ES 和 GLSL 100 的输出。

通过选择不同的标签页可切换显示编译后的顶点着色器和片元着色器：

![vs-fs-switc](img/change-vs-fs.png)

## 代码访问内置着色器

在 internal/effects/ 目录下包含了引擎提供的内置着色器，这些着色器在程序启动后，会自动加载。

以 builtin-standard 为例，可以参考下面的代码访问并使用：

```ts
// 获取内置 Standard 着色器 ‘builtin-standard.effect’
const effect = EffectAsset.get('builtin-standard');

const mat = new Material();

// 使用内置基于物理的光照着色器（PBR）‘builtin-standard.effect’ 初始化材质
mat.initialize({ effectName: "builtin-standard" });
```

## 动态加载着色器

位于 **resources** 目录下的 着色器文件，可以使用  **resources.load** 进行加载并使用。

代码示例如下：

```ts
resources.load("custom-effect", EffectAsset, (err:Error, data:EffectAsset)=>{
    //获取 effect
    const effectAsset = EffectAsset.get("../resources/custom-effect");

    //使用加载好的 effect 初始化材质
    const material = new Material();
    material.initialize({ effectName: "../resources/custom-effect" });
})        
```

> **注意：** 动态加载的自定义着色器加载成功后，effectName 为 "../" + 文件路径。
