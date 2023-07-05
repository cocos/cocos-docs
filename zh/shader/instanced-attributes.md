# 自定义几何体实例化属性

通过 **几何体实例化** 特性（GPU Instancing）可使 GPU 批量绘制模型相同且材质相同的渲染对象。如果我们想在不打破这一特性的情况下单独修改某个对象的显示效果，就需要通过自定义几何体实例化属性。

我们以新增一个颜色属性为例。

## 定义变量

实例化属性需要单独定义，并且处于 `USE_INSTANCING` 宏定义之下，否则会出现编译错误。

```glsl
#if USE_INSTANCING // when instancing is enabled
  #pragma format(RGBA8) // normalized unsigned byte
  in vec4 a_instanced_color;
#endif
```

## 用 vs 传递

虽然 a_instanced_color 仅用在 fs 中修改物体颜色，但几何体实例化属性属于顶点属性，只能在 vs 中被访问。 因此需要在 vs 中声明一个输出到 fs 的变量。 代码示例如下：

```glsl
CCProgram vs %{
  #if USE_INSTANCING
    out vec4 instancedColor;
  #endif

  vec4 vert(){
      ...
      #if USE_INSTANCING
        instancedColor = a_instanced_color;
      #endif
      ...
  }
}%
```

## 在 fs 中使用

通过在 fs 声明对应的 in 变量，获取到 vs 中传递过来的几何体实例化属性，实现想要的功能。

```glsl
CCProgram fs %{
  #if USE_INSTANCING
    in vec4 instancedColor;
  #endif

  vec4 frag(){
      ...
      vec4 o = mainColor;
      #if USE_INSTANCING
        o *= instancedColor;
      #endif
      ...
  }
}%
```

## 在脚本中设置属性

几何体实例化属性属于具体的渲染对象实例，无法通过材质属性面板设置，只能通过模型组件 MeshRenderer 上的 setInstancedAttribute 方法进行设置。 示例代码如下：

```ts
const comp = node.getComponent(MeshRenderer);
comp.setInstancedAttribute('a_instanced_color', [100, 150, 200, 255]);
```

## 注意事项

有以下几点需要注意：
1. `#pragma format(RGBA8)` 用于指定此属性的具体数据格式，参数可以为引擎 `GFXFormat` 中的任意枚举名[^1]；如未声明则默认为 RGBA32F 类型。

2. 所有实例化属性都是从利用顶点着色器（vs）的 attribute 输入，如果要在片元着色器（fs）中使用，需要先在 vs 中声明，再传递给 fs。

3. 请确保代码在所有分支都能正常执行，无论 `USE_INSTANCING` 是否启用。

4. 实例化属性的值在运行时会初始化为 0。

5. 如果在 **MeshRenderer** 组件上更换了材质，那么所有的实例化属性值都会被重置，需要重新设置。

[^1]: WebGL 1.0 平台下不支持整型 attributes，如项目需要发布到此平台，应使用默认浮点类型。
