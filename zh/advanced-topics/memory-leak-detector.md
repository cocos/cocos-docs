# 原生引擎内存泄漏检测系统

原生引擎使用c++语言开发，内存泄漏问题不可避免，为了方便游戏&引擎开发者快速查找内存泄漏，此版本提供了 **内存泄漏检测系统**

## 一，相对其他内存泄漏查找工具，Cocos Creator内置的内存泄漏检测工具有何优点：
- **跨平台**：支持Windows/Android/Mac/iOS平台
- **易用性**：无需下载额外的工具，并进行复杂的配置；支持输出内存泄漏处的堆栈信息，方便快速定位泄漏
- **一致性**：各平台的使用流程几乎一致：从ide中启动游戏->运行一段时间->关闭游戏->查看ide输出日志
- **实时性**：查找过程的游戏帧率虽有下降，但仍保持实时运行帧率
- **精确性**：理论上零漏报，零误报

## 二，使用步骤
- 修改`cocos/base/Config.h`中的宏`USE_MEMORY_LEAK_DETECTOR`为`1`，默认值`0`代表关闭内存泄漏检测系统，关闭后对引擎性能零损耗
    ```c++
    #ifndef USE_MEMORY_LEAK_DETECTOR
        #define USE_MEMORY_LEAK_DETECTOR 1
    #endif
    ```
- android平台上需要额外做两件事：
    - 在项目目录/native/engine/android/CMakeLists.txt中如下位置添加一行：
    set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -finstrument-functions")
        ```
        set(PROJ_SOURCES
            ${CMAKE_CURRENT_LIST_DIR}/../common/Classes/Game.h
            ${CMAKE_CURRENT_LIST_DIR}/../common/Classes/Game.cpp
            ${CMAKE_CURRENT_LIST_DIR}/jni/main.cpp
        )
        set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -finstrument-functions")
        ```
    - 如果构建android项目的时候Job System为TBB，请改为None或者TaskFlow(默认)，原因在于TBB会与目前android平台上的内存捕获实现机制相冲突

        ![tbb](./memory-leak-detector/build.png)

- 从Visual Studio/Android Studio/XCode启动游戏，运行一段时间，然后关闭游戏，此时会在ide的输出窗口中输出内存泄漏详细信息（若有）
    - Windows平台：

    ![visual studio](./memory-leak-detector/visualstudio.png)

    对于Release版本，如果需要更友好的堆栈信息，右击可执行项目-属性，打开项目属性页，进行如下设置：

        - 链接器-调试-生成调试信息：生成调试信息(/DEBUG)
        - C/C++-优化-优化：已禁用(/Od)
        - C/C++-优化-内联函数扩展：已禁用(/Ob0)
        
    - Android平台：

    ![android studio](./memory-leak-detector/androidstudio.png)

    - Mac/iOS平台：
    
    ![xcode](./memory-leak-detector/xcode.png)

- 根据ide输出的信息修复泄漏，如此反复，直到没有泄漏为止

