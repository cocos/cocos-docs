# 移除不支持的特性

首先需要将应用发布为 [Android Studio 工程](../android/build-example.md)。

在 AndroidManifest.xml 文件中找到如下的权限申请的代码：

```xml
```

根据 [功能测试要求](https://developer.android.com/games/playgames/pc-compatibility?hl=zh-cn#unsupported-features-1) 以及 [质量测试要求](https://developer.android.com/games/playgames/pc-compatibility?hl=zh-cn#unsupported-features-2) 的要求将里面相关权限删除。