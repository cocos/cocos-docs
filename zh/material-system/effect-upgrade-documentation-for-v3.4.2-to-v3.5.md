# effect 升级

解决 **effect** 文件从v3.4.x，升级到 v3.5.0 后，shadowBias 不生效的问题。

总共分 **四步** 升级，请按照下列段落依次进行。

> **注意**：当看到 `//复制开始` 时直接引用该代码，到 `//复制结束` 时为一个完整的升级步骤。段落位置已给出，下列代码除升级代码外均为伪代码。

```c
CCProgram standard-vs %{
    // 头文件区域
    #include <cc-xxx>
    ...
    #include <cc-xxxx>

    // vs 输出区域
    out vec3 v_xxx;
    ...
    // 步骤一: effect 中的 vs shader 添加 v_Shadowbias 输出
    // 复制开始
    #if CC_RECEIVE_SHADOW
        out mediump vec2 v_shadowBias;
    #endif
    // 复制结束
    ...
    out vec3 v_xxxx;

    // vs 执行区域
    void main () {
        xxx;
        ...
        // 步骤二: 通过 CCGetShadowBias() 获取 shadowBias
        // 复制开始
        #if CC_RECEIVE_SHADOW
            v_shadowBias = CCGetShadowBias();
        #endif
        // 复制结束
        ...
        xxxx;
    }
}%

CCProgram standard-fs %{
    // 头文件区域
    #include <cc-xxx>
    ...
    #include <cc-xxxx>

    // vs 输入区域
    in vec3 v_xxx;
    ...
    // 步骤三: effect 中的 ps shader 添加 v_Shadowbias 输入
    // 复制开始
    #if CC_RECEIVE_SHADOW
        in mediump vec2 v_shadowBias;
    #endif
    // 复制结束
    ...
    in vec3 v_xxxx;

    // ps 执行区域
    void surf (out StandardSurface s) {
        xxx;
        ...
        // 步骤四: 将 ps 获取到的 shadowBias 传入到 StandardSurface 中
        // 复制开始
        #if CC_RECEIVE_SHADOW
            s.shadowBias = v_shadowBias;
        #endif
        // 复制结束
        ...
        xxxx;
    }
}%
```
