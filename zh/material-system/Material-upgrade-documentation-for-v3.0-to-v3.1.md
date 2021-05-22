
# Material upgrade documentation for v3.0 to v3.1

## 1. 着色器升级与变化

### 1.1 内置头文件变化

原来 v3.0 版本的标准着色器头文件 `shading-standard` 变成了 v3.1 版本的 `standard-surface-entry`，可以使 effect 同时兼容 forward 渲染管线，和deferred 渲染管线。

原来 v3.0 版本的 `cc-fog` 头文件变成了 v3.1 版本的 `cc-fog-vs/fs`，被拆分成了顶点着色器与片元着色器两个版本。

### 1.2 顶点着色器

- `gl_Position`

    v3.1 版本的 `VS` 主函数名称从 `vert` 改为了 `main` ,并且新增了宏 `gl_Position`，用来给返回值赋值。

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

    加载标准着色器头文件 `standard-surface-entry`，使用 v3.1 版本的标准着色器输出函数 `CC_STANDARD_SURFACE_ENTRY()` 替换原有 v3.0 版本着色器输出函数 `frag ()`

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

## 2. Deferred渲染管线

### 2.1  Deferred Rendering Pipeline

v3.1 与 v3.0 版本材质系统最大的区别就是 v3.1 版本支持了 deferred 渲染管线，引擎自带标准的 `standard-surface-entry` 头文件可以同时支持 forward 渲染管线，和 deferred 渲染管线，用法如下：

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

  #elif CC_PIPELINE_TYPE == CC_PIPELINE_TYPE_FORWARD  // 判断是否前向渲染管线
 
    // fill in your data here
   
  #elif CC_PIPELINE_TYPE == CC_PIPELINE_TYPE_DEFERRED  // 判断是否后向渲染管线
       
   // fill in your data here

  #endif

```

## 3. 参数传输升级

顶点着色器往片元着色器传递shadow参数的宏，原本 v3.0 为 `CCPassShadowParams`,v3.1 版本修改为 `CC_TRANSFER_SHADOW`

v3.1 版本顶点着色器往片元着色器传输 `FOG` 参数，直接使用 `CC_TRANSFER_FOG` 宏

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

[升级指南](../release-notes/index.md)。<br>
