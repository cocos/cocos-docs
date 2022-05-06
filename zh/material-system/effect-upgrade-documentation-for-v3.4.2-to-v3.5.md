# 升级指南：Effect 从 v3.4.x 升级到 v3.5.0

## 宏标记和函数宏

宏标记和功能宏的效果语法已升级，为避免占用标准的 glsl 定义，项目中旧的 Effect 资源将自动升级，但如果您使用的是没有 Meta 元数据的外部 Effect 或编写新的 Effect，则必须注意。

- 宏标记的新语法：`#pragma define meta`
- 函数宏的新语法：`#pragma define`

有关详细信息，请参阅 [Effect Syntax - macro-tags](../shader/macros.md#macro-tags)。

## 模型级别的阴影偏移

在 v3.5 中我们支持对模型设置单独阴影偏移值，可以对简单或复杂曲面上的阴影效果进行详细控制。如果您有任何自定义的 effect 文件，您可能需要升级它们使阴影偏移值生效。

解决 **effect** 文件从v3.4.x，升级到 v3.5.0 后，shadowBias 不生效的问题。

> **注意**：如果禁用灯光的阴影贴图，或者没有在顶点着色器上计算 **CC_TRANSFER_SHADOW(pos)** 则 **忽略** 该材质升级。

### 升级说明

有 **四个元素** 要添加到效果文件中，如下所示：

1. vs out varying 定义

    ```
    #if CC_RECEIVE_SHADOW
        out mediump vec2 v_shadowBias;
    #endif
    ```

2. vs shadow bias 获取

    ```
    #if CC_RECEIVE_SHADOW
        v_shadowBias = CCGetShadowBias();
    #endif
    ```

3. fs in varying 定义

    ```
    #if CC_RECEIVE_SHADOW
        in mediump vec2 v_shadowBias;
    #endif
    ```

4. fs shadow bias 赋值

    ```
    #if CC_RECEIVE_SHADOW
        s.shadowBias = v_shadowBias;
    #endif
    ```

### 示例（代码片段）

```c
// 顶点着色器
CCProgram standard-vs %{
    // 头文件区域
    #include <cc-xxx>
    ...
    #include <cc-xxxx>

    // vs 输出区域
    out vec3 v_xxx;
    ...

    #if CC_RECEIVE_SHADOW
        out mediump vec2 v_shadowBias;
    #endif

    ...
    out vec3 v_xxxx;

    // vs 执行区域
    void main () {
        xxx;
        ...

        #if CC_RECEIVE_SHADOW
            v_shadowBias = CCGetShadowBias();
        #endif

        ...
        xxxx;
    }
}%

// 片元着色器
CCProgram standard-fs %{
    // 头文件区域
    #include <cc-xxx>
    ...
    #include <cc-xxxx>

    // vs 输入区域
    in vec3 v_xxx;
    ...

    #if CC_RECEIVE_SHADOW
        in mediump vec2 v_shadowBias;
    #endif

    ...
    in vec3 v_xxxx;

    // ps 执行区域
    void surf (out StandardSurface s) {
        xxx;
        ...

        #if CC_RECEIVE_SHADOW
            s.shadowBias = v_shadowBias;
        #endif

        ...
        xxxx;
    }
}%
```
