
# Cocos Creator 3.1 材质升级指南

> 本文将详细介绍 Cocos Creator 3.0 的材质升级到 v3.1 的注意事项。

## 1. 着色器升级与变化

### 1.1 内置头文件变化

原来 v3.0 的标准着色器头文件 `shading-standard` 在 v3.1 改成了 `standard-surface-entry`，可以使 effect 同时兼容 forward 渲染管线和 deferred 渲染管线。

原来 v3.0 的 `cc-fog` 头文件在 v3.1 改成了 `cc-fog-vs/fs`，拆分成了顶点着色器与片元着色器两个部分。

### 1.2 顶点着色器

- `gl_Position`

    v3.0 的 `VS` 主函数名称 `vert` 在 v3.1 改成了 `main`，并且新增了宏 `gl_Position`，用于给返回值赋值。

    ```c
    CCProgram standard-vs %{
        precision highp float;  

        // include your headfile

        #include <cc-fog-vs> // 注意这里头文件名称的变化
    
        // fill in your data here

        void main () {
        
            // fill in your data here

            gl_Position = fill in your data result;
        }
    }%
    ```

### 1.3 片元着色器

- `CC_STANDARD_SURFACE_ENTRY()`

    加载标准着色器头文件 `standard-surface-entry`，使用 v3.1 的标准着色器输出函数 `CC_STANDARD_SURFACE_ENTRY()` 替换原有 v3.0 着色器输出的函数 `frag()`。

    ```c
    CCProgram standard-fs %{
  
        // include your headfile
   
        #include <cc-fog-fs> // 注意这里头文件名称的变化
        #include <standard-surface-entry> // 注意这里标准着色器头文件的名称变化

        // fill in your data here

        void surf (out StandardSurface s) {
 
            // fill in your data here

        }
        CC_STANDARD_SURFACE_ENTRY() // 标准着色器输出函数
    }%
    ```

## 2. Deferred 渲染管线

### 2.1  Deferred Render Pipeline

v3.1 的材质系统与 v3.0 最大的区别在于 v3.1 支持了 [deferred 渲染管线](../render-pipeline/builtin-pipeline.md)，引擎自带标准的 `standard-surface-entry` 头文件，可以同时支持 forward 渲染管线和 deferred 渲染管线，用法如下：

```c
CCEffect %{
    techniques:

    // fill in your data here

        - &deferred
        vert: // your Vertex shader
        frag: // your Fragment shader
        phase: deferred
        propertyIndex: 0
        blendState:
            targets: // 关闭混合
            - blend: false
            - blend: false
            - blend: false
            - blend: false
            properties: // your properties name

    // fill in your data here
            
}%

// fill in your data here

CCProgram standard-fs %{
    precision highp float;
    #include <cc-global>
    #include <shared-ubos>
    #include <cc-fog-fs> // 注意这里头文件名称的变化。
    #include <standard-surface-entry> // 注意这里标准着色器头文件的名称变化

    // fill in your data here
    void surf (out StandardSurface s) {

        // fill in your data here

    }
    CC_STANDARD_SURFACE_ENTRY() // 标准着色器输出函数
}%

// fill in your data here

```

### 2.2  渲染管线判断

在头文件 `standard-surface-entry` 会判断选择了哪条渲染管线，光照计算在文件 `shading-standard-additive`

如果判断是 deferred 渲染管线，会先调用 `deferred-lighting` effect 文件，随后调用光照计算文件 `shading-standard-additive`

```c
#define CC_STANDARD_SURFACE_ENTRY()                                 
#if CC_FORWARD_ADD                                                 
  #include <shading-standard-additive>

  // fill in your data here

#elif CC_PIPELINE_TYPE == CC_PIPELINE_TYPE_FORWARD  // 判断是否为前向渲染管线
 
  // fill in your data here
   
#elif CC_PIPELINE_TYPE == CC_PIPELINE_TYPE_DEFERRED  // 判断是否为延迟渲染管线
       
 // fill in your data here

#endif
```

## 3. 参数传输升级

v3.0 顶点着色器往片元着色器传递 shadow 参数的宏为 `CCPassShadowParams`，v3.1 则修改为 `CC_TRANSFER_SHADOW`。

v3.1 顶点着色器往片元着色器传输 `FOG` 参数时，直接使用 `CC_TRANSFER_FOG` 宏。

版本对比：

- v3.0

    ```c
    v_fog_factor = CC_TRANSFER_FOG(pos);
    CCPassShadowParams(pos);   
    ```

- v3.1

    ```c
    CC_TRANSFER_FOG(pos);
    CC_TRANSFER_SHADOW(pos); 
    ```
