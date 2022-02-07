# GLSL 基础语法

GLSL 是为图形计算量身定制用来编写着色器的语言，它包含一些针对向量和矩阵操作的特性，使渲染管线具有可编程性。本章主要罗列出一些大家在编写 shader 时常用的一些语法，包括以下几个：

- 变量
- 语句
- 限定符
- 预处理宏定义

## 变量

变量及变量类型

变量类型 | 描述 | Cocos Effect 中的默认值 ｜ Cocos Effect 中的可选项
:-- | :-- | :-- | :--
bool | 布尔型标量数据类型 | false | 无
int/ivec2/ivec3/ivec4 | 包含 1，2，3，4 个整型向量 | 0/[0, 0]/[0, 0, 0]/[0, 0, 0, 0] | 无
float/vec2/vec3/vec4 | 包含 1，2，3，4 个浮点型向量 | 0/[0, 0]/[0, 0, 0]/[0, 0, 0, 0] | 无
sampler2D | 表示 2D 纹理 | **default** | black, grey, white, normal, default
samplerCube | 表示立方体纹理 | **default-cube** | black-cube, white-cube, default-cube
mat[2..3] |  表示 2x2, 3x3 的矩阵 | 不可用 |
mat4 |  表示 4x4 的矩阵 | [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1] |

### 标量

构造标量的方式和 C 语言一致：

```glsl
float floatValue = 1.0;
bool booleanValue = false;
```

### 向量

当构造向量时，有如下的规则：

- 若向向量构造器提供了一个标量，则向量的所有值都会设定为该标量值
- 若提供多个标量值或向量，则从左到右使用提供的值赋值，若要这样做标量或向量的数量之和要等于向量构造器的数量

```glsl
vec4 myVec4 = vec4(1.0);              // myVec4 = {1.0, 1.0, 1.0, 1.0}
vec2 myVec2 = vec2(0.5, 0.5);         // myVec2 = {0.5, 0.5}
vec4 newVec4 = vec4(1.0, 1.0, myVec2);// newVec4 = {1.0, 1.0, 0.5, 0.5} 
```

向量在访问时可通过 `r, g, b, a` 或 `x, y, z, w` 来进行访问， 也可以同时访问多个角标：

```glsl
vec4 myVec4 = vec4(1.0);
float x = myVec4.x;       // x = 1.0;
vec3 myVec3 = myVec4.xyz; // myVec3 = { 1.0, 1.0, 1.0 }
vec3 myVec3 = myVec4.rgb; // myVec3 = { 1.0, 1.0, 1.0 }
```

### 矩阵

在 GLSL 内可构造 mat[2..4] 来表示 2 阶到 4 阶的矩阵。

矩阵构造有如下的规则：

- 如只为矩阵构造器提供了一个标量，则该值会构造矩阵对角线上的值
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
mat3 matrix3x3 = mat3(0.0, 0.0, 0.0,  //第一列
                      0.0, 0.0, 0.0, )//第二列
                      0.0, 0.0, 0.0   //第三列
```

>**注意**：引擎为避免 implicit padding，若要使用 Uniform 限定符的矩阵，则必须是 4 阶矩阵。

矩阵的访问：

矩阵可以通过索引访问不同的列：

```glsl
mat2 matrix2x2 = mat2(0.0, 0.0, 0.0, 0.0);
vec4 myVec4 = vec4(matrix2x2[0], matrix2x2[1]);
vec2 myVec2 = matrix2x2[0];

//访问第一列的第一个元素
float value = matrix2x2[0][0];
matrix2x2[1][1] = 2.0;
```

<!-- 对于 defines：
- boolean 类型默认值为 false。
- number 类型默认值为 0，默认取值范围为 [0, 3]。
- string 类型默认值为 options 数组第一个元素。 -->

<!-- 
内置变量

|内置变量 | 说明| 
|:--|:--|
|gl_Position| 齐次坐标顶点位置|
|gl_FragColor| 片元颜色|
|gl_DepthRange | 全局深度范围|

-->

### 结构体

和 C 语言类似， 可将不同数据类型聚合形成结构体：

```c
struct myStruct
{
  vec4 position;
  vec4 color;
  vec2 uv;
};
```

结构体的构造的示例：

```glsl
myStruct structVar = myStruct(vec4(0.0, 0.0,0.0,0.0), vec4(1.0, 1.0, 1.0, 1.0), vec2(0.5, 0.5));
```

结构体支持赋值（=）和比较（==，!=），但要求两个结构体拥有相同的类型且组件分量（component-wise）都必须相同。

### 数组

数组的用法和 C 语言类似：

- 数组必须声明长度
- 数组不能在声明的同时初始化
- 数组必须由常量表达式初始化
- 数组不能用 `const` 修饰
- 不支持多维数组
<!-- - 低于 OpenGL 4.3 则不支持多维数组 -->

数组声明和初始化示例：

```glsl
float array[4];
for(int i =0; i < 4; i ++)
{
    array[i] = 0.0;
}
```

<!-- 
### UBO（Uniform Block Object）

UBO 是 GLSL 内，为OpenGL 和应用程序交互所定义的特殊语法。

在旧有的着色器写法中，通常会使用 uniform 限定符对比变量进行离散声明：

```glsl
uniform float floatVlaue = 1.0;
```

目前

-->

## 语句

### 控制流程

GLSL 支持标准的 C/C++ 控制流程，含：
- if-esle/switch-case
- for/while/do-while
- break/continue/return
- 没有 goto，若要跳出可使用 discard，该语句仅在片元着色器下有效，该语句会导致管线放弃当前片元，不会写入帧缓存

`if-else`的用法和 C 语言一致：

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

在 GLSL 里面，循环变量必须是编译时已知或常量：

 ```glsl
    const float value = 10.; 
    for(float i = 0.0; i < value; i ++){ 
        ...
    }
 ```

 错误示例：

 ```glsl
    float value = 10.;  
    //错误，value 不为常量
    for(float i =0.0; i < value; i ++){  
        ...
    }
 ```

### 函数

 GLSL 的函数由返回值，函数名和参数构成，其中返回值和函数名为必须。若无返回值，需用 `void` 代替。

 需要注意的是 GLSL 的函数不能递归。

 代码示例：

```glsl
void scaleMatrix (inout mat4 m, float s){
  m[0].xyz *= s;
  m[1].xyz *= s;
  m[2].xyz *= s;
}
```

## 限定符

### 存储限定符

存储限定符表明了变量在管线中的作用。

|限定符|描述|
|:--|:--|
|< none:default > | 无限定符或者使用 `default`，常用语局部变量，函数参数
|const   | 编译时为常量或作为参数时只读
|attribute| 应用程序和顶点着色器通信用于确定顶点格式
|uniform | 应用程序和着色器之间交互数据。在顶点着色器和片元着色器中保持一致
|varying | 顶点着色器传输给片元着色器的插值值

#### uniform

在一个渲染过程内声明的 uniform 不能重复，即如果在顶点着色器里面定义了某个变量 `variableA` 那么其也必定在片元着色器内存在且值相同。

在引擎中，不支持离散声明的 uniform 变量，必须使用 UBO 并保持内存对齐避免 implicit padding。

#### varying

varying 是由顶点着色器输出传输给片元着色器的变量，在管线的作用下，这些值并不会和顶点着色器的输出一致，而是由管线进行插值。

因此可能会出现顶点输出的法线没有归一化的情况。这种情况如果在片元着色器里面使用，则需要对法线进行归一化：

```glsl
vec3 normal = normalize(v_normal);
```

### 参数限定符

GLSL 的函数参数可有一下的限定符：

|限定符|描述|
|:---|:---|
| < none:in > | 缺省限定符，和 C 语言的值传递类似，指明传入的参数传递的是指，函数内不会修改传入的值|
| inout| 类似于 C 语言的引用，参数的值会传入函数并返回函数内修改的值 |
| out| 参数的值不会传入函数，由函数内部修改并返回修改后的值|

### 精度限定

GLSL 引入了精度限定符，可以用来指定整型或浮点型变量的精度。精度限定符可使着色器的编写者明确定义着色器变量计算时使用的精度。在
shader 头部声明的精度应用于整个 shader，所有基于浮点型的变量都会以此作为默认精度。同时也可以定义单个变量的精度。在 shader 中如果没有指定默认精度，则所有的整型和浮点型都采用高精度计算。

GLSL 支持的精度包括以下几种：

|限定符|说明|
|:--|:--|
|highp | 高精度。浮点型精度范围 [-2^62, 2^62]。整型精度范围 [-2^16, 2^16]。
|mediump | 中精度。浮点型精度范围 [-2^14, 2^14]。整型精度范围 [-2^10, 2^10]。
|lowp | 低精度。浮点型精度范围 [-2, 2]。整型精度范围 [-2^8, 2^8]。

代码示例：

```glsl
highp mat4 cc_matWorld;
mediump vec2 dir;
lowp vec4 cc_shadowColor;
```

## 预处理宏定义

GLSL 允许定义和 C 语言类似的宏定义。

预处理宏定义允许着色器定义多样化的动态分支，确定最终的渲染效果。

在 GLSL 内使用预处理宏定义示例：

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

下面的代码演示了如何开启使用顶点颜色：

```glsl
  #if USE_VERTEX_COLOR
    in vec4 v_color;
  #endif
```

和引擎的交互部分可参考： [预处理宏定义](macros.md)

>注意：在引擎中，材质的预处理宏定义在材质初始化完成后则不能修改，如果要修改，需要通过 `Material.initialize`或`Material.reset` 方法进行。
