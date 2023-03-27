# 内置 Legacy Shader 导读

Legacy Shader 相关的源码，有两个目录：
- internal/chunks/legacy
- internal/effects/legacy

在 `chunks/legacy` 目录中，存放的是一些公共函数，如解码器、雾效、输入、输出、阴影、骨骼蒙皮等等。

Legacy Shader 和 Surface Shader 都会调用 internal/chunks/builtin 和 internal/chunks/common 提供的函数。

在 `effects/legacy` 目录中，提供了三个内置的 Legacy Shader：
- standard： 标准材质
- terrain：用于地形渲染
- toon：用于卡通渲染

## 基本结构

Legacy Shader 代码通常由几个部分组成：
- 信息描述（`CCEffect`）：描述此 Shader 的技术、渲染过程组成部分，以及每个渲染过程使用的 Shader、渲染状态、属性等。
- 共享常量（`Shared UBOs`）：把 vs 和 fs 都需要用到的 uniforms 定义在一起，方便管理。
- 主体函数（`Shader Body`）：用于实现具体的 Shader 主体。

Legacy Shader 中的 CCEffect 和 共享常量部分与 Surface Shader 一致，可前往 [内置 Surface Shader](../surface-shader/builtin-surface-shader.md) 了解详情。

## 前向渲染与延迟渲染

Cocos Creator 引擎支持 前向渲染和延迟渲染。因此，在 Shader 架构上，也要为这两种渲染流程做兼容，并且让用户感知不到。

内置的 Legacy Shader 都是 PBR 材质，它们在渲染时都遵守以下流程：

### 前向渲染

1. 调用 vs
2. 调用 fs -> surf -> 光照计算

### 延迟渲染

#### Buffer 阶段

1. 调用 vs
2. 调用 fs -> surf -> GBuffer

#### Lighting 阶段

1. 从 Gbuffer 还原 StandardSurface 信息
2. 光照计算

可以看出，对于 PBR 材质来说，不管是前向渲染还是延迟渲染，用户能够控制的只有 vs 和 surf 函数。

这就统一了架构，使用户写的 Shader 可以不用修改就运行在 前向渲染管线 和 延迟渲染管线中。

## 着色函数

### standard(PBR)

在 legacy/standard.effect 中，定义了着色相关的Shader代码：

```ts
CCProgram standard-vs %{
    //...
    void main(){
        StandardVertInput In;
        CCVertInput(In);
        //...
        gl_Position = cc_matProj * (cc_matView * matWorld) * In.position;
    }
}%

CCProgram standard-fs %{
    //...
    void surf(out StandardSurface s){
        //s.albedo = ...
        //s.occlusion = ...
        //s.roughness = ...
        //s.metallic = ...
        //s.specularIntensity = ...
        //s.normal = ...
    }
    CC_STANDARD_SURFACE_ENTRY()
}%
```

可以看到，在 vs 中，直接使用了 main 函数作为入口，而在 fs 中，只有一个 surf 函数。

这是因为 `CC_STANDARD_SURFACE_ENTRY` 宏展开后，就是 main 函数，这个 main 函数会调用 surf 函数。

### terrain

terrain 使用 StandardSurface 作为材质表面数据结构，使用 `CC_STANDARD_SURFACE_ENTRY` 作为入口。这就说明，terrain 的渲染流程与光照计算和 standard 完全一致。

只是由于地形采用的是多层纹理混合，所以 terrain 使用的纹理以及 surf 函数实现细节与 standard 的有较大区别。

### toon

在 legacy/toon.effect 中，我们可以看到：

```ts
CCProgram toon-vs %{
    //...
    void main(){
        StandardVertInput In;
        CCVertInput(In);
        //...
        gl_Position = cc_matProj * (cc_matView * matWorld) * In.position;
    }
}%

CCProgram toon-fs %{
    //...
    void surf(out ToonSurface s){
        //s.baseStep = ...
        //s.baseFeather = ...
        //s.shadeStep = ...
        //s.shadeFeather = ...
        //s.shadowCover = ...
    }

    void frag(){
        ToonSurface s; surf(s);
        vec4 color = CCToonShading(s);
        return CCFragOutput(color);
    }
}%
```

toon 最大的特征是在 CCEffect 中，多定义了一个 outline pass，outline pass 的代码在 chunks/legacy/main-functions/outline-vs(fs) 中。

toon 材质表面数据结构为 ToonSurface，与 standard 使用的不一样。 在 frag 函数中可以看到， toon 的光照计算使用了专门的 CCToonShading 函数。

并且，toon 自己定义了一个 frag 入口函数，未使用 `CC_STANDARD_SURFACE_ENTRY` 宏。这也意味着，toon 是不支持延迟渲染的。

### shadow-caster

可以看到，standard，terrain，toon 都有关于 shadow 的代码片段：

```ts
CCProgram shadow-caster-vs %{
    //...
}%

CCProgram shadow-caster-fs %{
    //...
}%
```

这个套 vs/fs 用于阴影贴图生成，引擎渲染管线会在阴影贴图生成阶段，查找 phase 为 shadow-add 的 pass 进行绘制。
