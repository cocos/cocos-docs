# Effect 语法

Cocos Effect 是一种基于 YAML 和 GLSL 的单源码嵌入式领域特定语言（single-source embedded domain-specific language），YAML 部分声明流程控制清单，GLSL 部分声明实际的 shader 片段，这两部分内容上相互补充，共同构成了一个完整的渲染流程描述。

如果希望在引擎中实现自定义的着色效果，需要书写自定义 Effect。我们推荐使用 VSCode，搜索安装 Cocos Effect 插件，以便编辑任何 Effect 文件。

> **注意**：这篇文档的目标受众是项目组中的 TA 或图形向的程序，如果有具体定制 shader 需求的美术人员，请联系项目 TA 或程序，把这篇文档丢给他！

## 语法框架

以 `builtin-unlit.effect` 为例，这个 Effect 文件的内容大致如下：

![effect](effect.png)

## Effect 名称

Effect name 是基于 EffectAsset 文件名和所在路径两个信息自动生成的，路径部分固定为基于 `assets/effects` 目录的相对路径，文件名不包括扩展名。

在运行时可以通过 Effect name 获取或使用 EffectAsset 资源：

```ts
const effect = EffectAsset.get('builtin-unlit'); // this is the EffectAsset resource instance
const mat = new Material();
mat.initialize({ effectName: 'builtin-standard' }); // now 'mat' is a valid standard material
```

> **注意**：因为编辑器内置 EffectAsset 资源全部位于 Internal DB 的 `assets/effects` 目录下，因而引用时不需要路径部分。

在 **层级管理器** 中选中材质，然后在 **属性检查器** 的 Effect 属性下拉列表中可以看到所有当前可用的 Effect name。

## Effect 书写规范

关于 Effect 的书写规范请参考：

- [YAML 101](yaml-101.md)
- [流程控制清单](rendering-procedure-manifest.md)
- [shader 片段](pass-parameter-list.md)
