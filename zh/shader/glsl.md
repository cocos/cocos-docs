# GLSL 基础语法

GLSL 是为图形计算量身定制用来编写着色器的语言，它包含一些针对向量和矩阵操作的特性，使渲染管线具有可编程性。本章主要罗列出一些大家在编写 shader 时常用的一些语法，包括以下几个：

1. 变量
2. 语句
3. 限定符

## 变量

变量及变量类型

变量类型 | 描述 | Cocos Effect 中的默认值 ｜ Cocos Effect 中的可选项
:-- | :-- | :-- | :--
bool | 布尔型标量数据类型 | false | 无
int/ivec2/ivec3/ivec4 | 包含 1，2，3，4 个整型向量 | 0/[0, 0]/[0, 0, 0]/[0, 0, 0, 0] | 无
float/vec2/vec3/vec4 | 包含 1，2，3，4 个浮点型向量 | 0/[0, 0]/[0, 0, 0]/[0, 0, 0, 0] | 无
sampler2D | 表示 2D 纹理 | **default** | black, grey, white, normal, default
samplerCube | 表示立方体纹理 | **default-cube** | black-cube, white-cube, default-cube

<!-- 对于 defines：
- boolean 类型默认值为 false。
- number 类型默认值为 0，默认取值范围为 [0, 3]。
- string 类型默认值为 options 数组第一个元素。 -->