# GLSL 语法简介

GLSL 是为图形计算量身定制的用于编写着色器的语言，它包含一些针对向量和矩阵操作的特性，使渲染管线具有可编程性。本章主要介绍在编写 Shader 时常用的一些语法，包括以下几个方面：

- 变量
- 语句
- 限定符
- 预处理宏定义

## 变量

### 变量及变量类型

| 变量类型 | 说明 | Cocos Effect 中的默认值 | Cocos Effect 中的可选项 |
| :-- | :-- | :-- | :-- |
| bool | 布尔型标量数据类型 | false | 无 |
| int/ivec2/ivec3/ivec4 | 包含 1/2/3/4 个整型向量 | 0/[0, 0]/[0, 0, 0]/[0, 0, 0, 0] | 无 |
| float/vec2/vec3/vec4 | 包含 1，2，3，4 个浮点型向量 | 0/[0, 0]/[0, 0, 0]/[0, 0, 0, 0] | 无 |
| sampler2D | 表示 2D 纹理 | **default** | black、grey、white、normal、default |
| samplerCube | 表示立方体纹理 | **default-cube** | black-cube、white-cube、default-cube |
| mat[2..3] |  表示 2x2 和 3x3 的矩阵 | 不可用 |
| mat4 |  表示 4x4 的矩阵 | [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] |

### 标量

构造标量的方式和 C 语言一致：

```glsl
float floatValue = 1.0;
bool booleanValue = false;
```

### 向量

构造向量时的规则如下：

- 若向向量构造器提供了一个标量，则向量的所有值都会设定为该标量值
- 若提供多个标量值或向量，则从左到右使用提供的值赋值。前提是标量或向量的数量之和要等于向量构造器的数量

```glsl
vec4 myVec4 = vec4(1.0);              // myVec4 = {1.0, 1.0, 1.0, 1.0}
vec2 myVec2 = vec2(0.5, 0.5);         // myVec2 = {0.5, 0.5}
vec4 newVec4 = vec4(1.0, 1.0, myVec2);// newVec4 = {1.0, 1.0, 0.5, 0.5} 
```

向量可以通过 `r, g, b, a` 或 `x, y, z, w` 进行访问，也可以同时访问多个角标：

```glsl
vec4 myVec4_0 = vec4(1.0); // myVec4_0 = { 1.0, 1.0, 1.0, 1.0 }
vec4 myVec4 = vec4(1.0, 2.0, 3.0, 4.0); // myVec4 = { 1.0, 2.0, 3.0, 4.0 }
float x = myVec4.x;       // x = 1.0;
vec3 myVec3_0 = myVec4.xyz; // myVec3_0 = { 1.0, 2.0, 3.0 }
vec3 myVec3_1 = myVec4.rgb; // myVec3_1 = { 1.0, 2.0, 3.0 }
vec3 myVec3_2 = myVec4.zyx; // myVec3_2 = { 3.0, 2.0, 1.0 }
vec3 myVec3_3 = myVec4.xxx; // myVec3_3 = { 1.0, 1.0, 1.0 }
```

### 矩阵

在 GLSL 内可构造 mat[2..4] 来表示 2 阶到 4 阶的矩阵。

矩阵构造有如下的规则：

- 若只为矩阵构造器提供了一个标量，则该值会构造矩阵对角线上的值
- 矩阵可以由多个向量构造
- 矩阵可以由单个标量从左到右进行构造

```glsl

mat4 marixt4x4 = mat4(1.0); // marixt4x4 = { 1.0, 0.0, 0.0, 0.0, 
                            //                0.0, 1.0, 0.0, 0.0 
                            //                0.0, 0.0, 1.0, 0.0                    
                            //                0.0, 0.0, 0.0, 1.0 }

vec2 col1 = vec2(1.0, 0.0);
vec2 col2 = vec2(1.0, 0.0);

mat2 matrix2x2 = mat2(coll1, col2);

// GLSL 是列矩阵存储，因此构造时，构造器会按照列顺序进行填充
mat3 matrix3x3 = mat3(0.0, 0.0, 0.0,   // 第一列
                      0.0, 0.0, 0.0,   // 第二列
                      0.0, 0.0, 0.0);  // 第三列
```

> **注意**：为避免 implicit padding，引擎规定若要使用 Uniform 限定符的矩阵，必须是 4 阶矩阵，2，3 阶的矩阵不可作为 Uniform 变量。 

矩阵的访问：

矩阵可以通过索引访问不同的列：

```glsl
mat2 matrix2x2 = mat2(0.0, 0.0, 0.0, 0.0);
vec4 myVec4 = vec4(matrix2x2[0], matrix2x2[1]);
vec2 myVec2 = matrix2x2[0];

// 访问第一列的第一个元素
float value = matrix2x2[0][0];
matrix2x2[1][1] = 2.0;
```

### 结构体

结构体的形成和 C 语言类似，可由不同数据类型聚合而成：

```c
struct myStruct
{
  vec4 position;
  vec4 color;
  vec2 uv;
};
```

构造结构体的代码示例如下：

```glsl
myStruct structVar = myStruct(vec4(0.0, 0.0,0.0,0.0), vec4(1.0, 1.0, 1.0, 1.0), vec2(0.5, 0.5));
```

结构体支持赋值（=）和比较（==，!=）运算符，但要求两个结构体拥有相同的类型且组件分量（component-wise）都必须相同。

### 数组

数组的用法和 C 语言类似，规则如下：

- 数组必须声明长度
- 数组不能在声明的同时初始化
- 数组必须由常量表达式初始化
- 数组不能用 `const` 修饰
- 不支持多维数组

数组声明和初始化的代码示例如下：

```glsl
float array[4];
for(int i =0; i < 4; i ++)
{
    array[i] = 0.0;
}
```

## 语句

### 控制流程

GLSL 支持标准的 C/C++ 控制流程，包括：
- `if-esle`/`switch-case`
- `for`/`while`/`do-while`
- `break`/`continue`/`return`
- 没有 `goto`，若要跳出可使用 `discard`。该语句仅在片元着色器下有效，需要注意的是使用该语句会导致管线放弃当前片元，不会写入帧缓存

`if-else` 的用法和 C 语言一致，代码示例如下：

```glsl
if(v_uvMode >= 3.0) {
    i.uv = v_uv0 * v_uvSizeOffset.xy + v_uvSizeOffset.zw;
} else if (v_uvMode >= 2.0) {
  i.uv = fract(v_uv0) * v_uvSizeOffset.xy + v_uvSizeOffset.zw;
} else if (v_uvMode >= 1.0) {
  i.uv = evalSlicedUV(v_uv0) * v_uvSizeOffset.xy + v_uvSizeOffset.zw;
} else {
  i.uv = v_uv0;
}
```

在 GLSL 中，循环变量必须是常量或者编译时已知，代码示例如下：

 ```glsl
const float value = 10.; 
for(float i = 0.0; i < value; i ++){ 
    ...
}
 ```

错误示例：

 ```glsl
float value = 10.;  
// 错误，value 不为常量
for(float i =0.0; i < value; i ++){  
    ...
}
 ```

### 函数

GLSL 的函数由 **返回值**、**函数名** 和 **参数** 构成，其中返回值和函数名是必须的。若无返回值，需要使用 `void` 代替。

> **注意**：GLSL 的函数不能递归。

代码示例如下：

```glsl
void scaleMatrix (inout mat4 m, float s){
  m[0].xyz *= s;
  m[1].xyz *= s;
  m[2].xyz *= s;
}
```

## 限定符

### 存储限定符

存储限定符用于描述变量在管线中的作用。

| 限定符 | 说明 |
|:--|:--|
|< none:default > | 无限定符或者使用 `default`，常用语局部变量，函数参数
|const   | 编译时为常量或作为参数时只读
|attribute| 应用程序和顶点着色器间通信，用于确定顶点格式
|uniform | 应用程序和着色器之间交互数据。在顶点着色器和片元着色器中保持一致
|varying | 顶点着色器传输给片元着色器的插值

#### uniform

在一个渲染过程内声明的 `uniform` 不能重复。例如在顶点着色器中定义了变量 `variableA`，`variableA` 也会存在于片元着色器且值相同，那么也就是 `variableA` 不能在片元着色器中再次定义。

引擎不支持离散声明的 `uniform` 变量，必须使用 UBO 并保持内存对齐，以避免 implicit padding。

#### varying

`varying` 是由顶点着色器输出并传输给片元着色器的变量。在管线的作用下，变量值并不会和顶点着色器输出的保持一致，而是由管线进行插值，这就可能会出现顶点输出的法线没有归一化的情况。此时需要手动归一化，代码示例如下：

```glsl
// 归一化法线
vec3 normal = normalize(v_normal);
```

### 参数限定符

GLSL 中函数的参数限定符包括以下几种：

| 限定符 | 说明 |
|:---|:---|
| < none:in > | 缺省限定符，和 C 语言的值传递类似，指明传入的参数传递的是值，函数内不会修改传入的值|
| inout| 类似于 C 语言的引用，参数的值会传入函数并返回函数内修改的值 |
| out| 参数的值不会传入函数，由函数内部修改并返回修改后的值|

### 精度限定符

GLSL 引入了精度限定符，用于指定整型或浮点型变量的精度。精度限定符可使着色器的编写者明确定义着色器变量计算时使用的精度。在
在 Shader 头部声明的精度应用于整个 Shader，是所有基于浮点型的变量的默认精度，同时也可以定义单个变量的精度。在 Shader 中如果没有指定默认精度，则所有的整型和浮点型变量都采用高精度计算。

GLSL 支持的精度限定符包括以下几种：

|限定符|说明|
|:--|:--|
|highp | 高精度。<br>浮点型精度范围为 [-2<sup>62</sup>, 2<sup>62</sup>]<br>整型精度范围为 [-2<sup>16</sup>, 2<sup>16</sup>]。
|mediump | 中精度。<br>浮点型精度范围为 [-2<sup>14</sup>, 2<sup>14</sup>]<br>整型精度范围为 [-2<sup>10</sup>, 2<sup>10</sup>]。
|lowp | 低精度。<br>浮点型精度范围为 [-2<sup>8</sup>, 2<sup>8</sup>]<br>整型精度范围为 [-2<sup>8</sup>, 2<sup>8</sup>]。

代码示例如下：

```glsl
highp mat4 cc_matWorld;
mediump vec2 dir;
lowp vec4 cc_shadowColor;
```

## 预处理宏定义

GLSL 允许定义和 C 语言类似的宏定义。

预处理宏定义允许着色器定义多样化的动态分支，确定最终的渲染效果。

在 GLSL 中使用预处理宏定义的代码示例如下：

```glsl
#define
#undef
#if
#ifdef

#ifndef
#else
#elif
#endif
```

下方代码示例若 `USE_VERTEX_COLOR` 条件为真，则声明一个名为 `v_color` 的四维向量：

```glsl
#if USE_VERTEX_COLOR
  in vec4 v_color;
#endif
```

预处理宏定义和引擎的交互部分可参考： [预处理宏定义](macros.md)

>> **注意**：在引擎中，材质的预处理宏定义在材质初始化完成后便不能修改。如果需要修改，请使用 `Material.initialize` 或 `Material.reset` 方法。代码示例可参考：[程序化使用材质](../material-system/material-script.md)
