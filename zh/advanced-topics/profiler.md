# 性能剖析器（Profiler）

性能剖析器是用于性能分析和统计的工具，目前仅限原生平台。

## 默认统计数据

- 性能剖析器的效果展示如图：

  ![profiler](native-profiler/profiler.png)

- 与左下角旧版的 `Profiler` 不同，新版的 `Profiler` 提供更详细的游戏性能与内存统计数据，并支持扩展，开发者可自由添加关心的性能及内存数据，默认的数据如下：

  1. 核心数据统计 `CoreStats` ，包括：
      - 帧数
      - 每帧渲染时间
      - GFX 后端
      - 是否开启多线程
      - 是否开启遮挡查询
      - 是否开启阴影贴图
      - 屏幕分辨率

  2. 对象个数统计 `ObjectStats` ，包括：
      - 渲染调用次数
      - 实例化个数
      - 三角面个数
      - 2D渲染批次个数
      - 渲染模型个数
      - 摄像机个数

  3. 内存使用统计 `MemoryStats` ，包括：
      - DebugRenderer的顶点缓冲区大小
      - 原生字体内存大小
      - 贴图占用的显存
      - Buffer占用的显存
      - GeometryRenderer顶点缓冲区大小

  4. 性能数据统计 `PerformanceStats` ，显示逻辑线程调用堆栈，包含每个剖析代码段的：
      - 每帧执行总时间
      - 每帧单次执行最大时间
      - 每帧执行总次数
      - 每帧单次执行平均时间
      - 历史执行总时间
      - 历史单次执行最大时间
      - 历史执行总次数
      - 历史单次执行平均时间

## 使用方式

- 在编辑器的主菜单：**项目** -> **项目设置** -> **功能裁剪** 里勾选 **调试文字渲染器**，此选项默认关闭，需要打开才能显示调试信息：

  ![enable profiler](native-profiler/enable-profiler.png)

- 在 `native/cocos/base/Config.h` 中把 `CC_USE_PROFILER` 宏定义改为 `1`，等性能及内存优化完成后，再改回 `0`，此时性能剖析器完全关闭，不会对代码造成任何副作用：

    ```c++
    #ifndef CC_USE_PROFILER
        #define CC_USE_PROFILER 0
    #endif
    ```

- 如果想要添加 `ObjectStats` 的统计信息， 比如统计每帧渲染模型的个数（需在每帧调用的函数如update中）：

  下述宏都定义在 [native/cocos/profiler/Profiler.h](https://github.com/cocos/cocos-engine/blob/v3.6.0/native/cocos/profiler/Profiler.h) 内。开发者可根据需求使用。

  ```c++
  void RenderScene::update(uint32_t stamp) {
      ... 
      CC_PROFILE_OBJECT_UPDATE(Models, _models.size());
  }
  ```

    - `CC_PROFILE_OBJECT_UPDATE` 用于更新统计数量
    - `CC_PROFILE_OBJECT_INC` 用于递增统计数量
    - `CC_PROFILE_OBJECT_DEC` 用于递减统计数量

- 如果想要添加 `MemoryStats` 的统计信息， 比如统计 `GeometryRenderer` 顶点缓冲区的内存使用量：

    ```c++
    void GeometryVertexBuffer::init(gfx::Device *device, 
        uint32_t maxVertices, const gfx::AttributeList &attributes) {
        ...
        CC_PROFILE_MEMORY_INC(GeometryVertexBuffer, static_cast<uint32_t>(_maxVertices * sizeof(T)));
    }
    ```

    - `CC_PROFILE_MEMORY_UPDATE` 用于更新内存使用量（字节）
    - `CC_PROFILE_MEMORY_INC` 用于递增内存使用量（字节）
    - `CC_PROFILE_MEMORY_DEC` 用于递减内存使用量（字节）

- 如果想要添加 `PerformanceStats` 的统计信息， 比如统计 `ForwardPipeline::render` 函数的执行时间（毫秒）：

    ```c++
    void ForwardPipeline::render(const ccstd::vector<scene::Camera *> &cameras) {
        CC_PROFILE(ForwardPipelineRender);
        ...
    }
    ```

- 通过以上修改后，编译，运行，屏幕上就可以看到新增的统计数据：

  ![add-stats](native-profiler/add-stats.png)
