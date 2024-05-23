# 场景结构

Cocos Creator 在 Creator 的 ECS 实体组件系统框架上增加了3D场景结构，3D 场景通过 RenderScene 表示，ECS 结构中相应的 Component 引用了 RenderScene 中维护的模型（Model）、相机（Camera）、灯光（Light）等元素，它们通过 Node 关联在一起，RenderScene 中更新元素的各种 Transform，也是通过 Node 来操作。

注意区别 ECS 结构中的 Scene 与 3D 场景结构中的 RenderScene，ECS 中的 Scene 作为 Node 的逻辑组织结构，而 RenderScene 是作为场景渲染元素的组织结构，ECS Scene 中包含了 RenderScene 成员变量，两者一一对应。

ECS 与 3D 场景结构的关系，如下图所示：

![ecs & scene](scene/ecs-scene.jpg)

整个 3D 场景结构是被封装在 Component 之下的，通过 Node 建立起组织关系，这样对于 ECS 的上层用户来说，是完全透明的，用户层面对于 3D 场景结构对象是无感知的。
