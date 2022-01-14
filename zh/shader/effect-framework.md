# Cocos 着色器语法

着色器 Cocos Effect 是一种基于 YAML 和 GLSL 的单源码嵌入式领域特定语言（single-source embedded domain-specific language），YAML 部分声明流程控制清单，GLSL 部分声明实际的 shader 片段，这两部分内容上相互补充，共同构成了一个完整的渲染流程描述。

>注意：如果希望在引擎中实现自定义的着色效果，需要书写自定义 Cocos Effect。我们推荐使用 VSCode，搜索安装 Cocos Effect 插件，以便编辑任何 effect 文件。

## 语法框架

此处以 `builtin-unlit.effect` 为例，说明 Cocos Effect 的语法框架。

![effect](img/effect.png)

## 渲染技术 

## Pass 