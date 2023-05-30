# 特性与系统版本

## 功能模块与系统版本

| 功能模块 | Android | iOS |
| :-- | :--- | :-- |
| VULKAN 渲染后端 | API Level 24（7.0）| - |
| Google Play Instant | API Level 23（6.0）| - |
| TBB 任务调度系统 | API Level 21（5.0）| 10.0 |
| TaskFlow 任务调度系统 | API Level 18（4.3）| 12.0 |
| 延迟渲染管线 | API Level 21（5.0）| 10.0 |

## C++ 与 系统版本

| Cocos Creator | C++ | Android | iOS |
| :-- | :--- | :-- | :-- |
| 3.0 | C++14 | API Level 18(4.3) | 10.0 |
| 3.1~3.3.1 | C++17 | API Level 21(5.0) | 11.0 |
| 3.3.2 ~ 3.5.1 | C++14 | API Level 18 (4.3) | 10.0 |
| 3.6.0 以上 | C++17 | API Level 21(5.0) | 11.0

> **注意：** 启用 TaskFlow 任务调度系统，会自动开启 C++17 以支持编译，并且 TaskFlow 需要的特性需要 iOS 12+ 的支持。

## 最高版本支持情况

- Android：API Level 31（13.x）
- iOS：16.x
