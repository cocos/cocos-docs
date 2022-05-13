# 调试渲染器（Debug-Renderer），目前仅限于原生平台

- 调试渲染器是cocos-engine提供的一种批量渲染屏幕文字的功能接口，主要用于调试：输出任意的文字调试信息到屏幕上。

- 调试渲染器的效果展示如图：
  ![debug-renderer-demo](./debug-renderer-demo.png)

- 使用方式：
  - 由于每帧渲染完这些文字后会清空顶点缓存，所以需要在update等函数中，每帧往geometry renderer对象（位于camera中）添加几何体，除此之外不需要额外的操作，示例 `C++` 代码如下：

    ```
    auto *renderer = cc::DebugRenderer::getInstance();
    renderer->addText("Show Debug Text...", screenPos);
    ```
  
  - 通过 `addText` 最后一个可选的参数，可以定制输出文字的外观：
    | DebugTextInfo 属性 | 说明 |
    | :-- | :-- |
    | color             | 文字颜色 |
    | bold              | 是否粗体 |
    | italic            | 是否斜体 |
    | shadow            | 是否开启阴影效果 |
    | shadowThickness   | 阴影宽度 |
    | shadowColor       | 阴影颜色 |
    | scale             | 文字缩放比例 |

  