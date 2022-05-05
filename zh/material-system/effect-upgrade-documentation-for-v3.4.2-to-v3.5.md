# 升级指南：Effect 从 v3.4.x 升级到 v3.5.0

## 简介

解决 **effect** 文件从v3.4.x，升级到 v3.5.0 后，shadowBias 不生效的问题。

> **注意**：如果不使用阴影，或者没有计算 **CC_TRANSFER_SHADOW(pos)** 则 **忽略** 该材质升级。

总共分 **四步** 升级，请按照下列段落依次进行。

## 前后版本对比

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

    1. vs out varying 定义
    // v3.4.x

    // v3.5.0
    #if CC_RECEIVE_SHADOW
        out mediump vec2 v_shadowBias;
    #endif

    ...
    out vec3 v_xxxx;

    // vs 执行区域
    void main () {
        xxx;
        ...

        2. vs shadow bias 获取
        // v3.4.x

        // v3.5.0
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

    3. fs in varying 定义
    // v3.4.x

    // v3.5.0
    #if CC_RECEIVE_SHADOW
        in mediump vec2 v_shadowBias;
    #endif

    ...
    in vec3 v_xxxx;

    // ps 执行区域
    void surf (out StandardSurface s) {
        xxx;
        ...

        4. fs shadow bias 赋值
        // v3.4.x

        // v3.5.0
        #if CC_RECEIVE_SHADOW
            s.shadowBias = v_shadowBias;
        #endif

        ...
        xxxx;
    }
}%
```
