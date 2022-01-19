# 编写着色器

本文将基于 RimLight 编写一个基础的 `GLSL` 着色器。

菲尼尔现象（Fresnel Effect）：

菲涅尔现象指的是不同材质上，光照强度随着视角的变化而变化的现象。

RimLight:

也称为“内发光”、“轮廓光”或者“边缘光”，通过使物体的边缘发出高亮，让物体更加生动的技术。

在角色受击，技能释放等也有广泛的应用。

RimLight 实现简单，效率高，效果也不错。

本文将以 RimLight 为例，实现 Cocos Creator 的着色器。

首先新建一个 `Effect`。

由于 RimLight 只绘制不透明，因此删掉半透明的渲染技术：

```yaml
# 删除如下的部分
- name: transparent
    passes:
    - vert: general-vs:vert # builtin header
      frag: rimlight-fs:frag
      blendState:
        targets:
        - blend: true
          blendSrc: src_alpha
          blendDst: one_minus_src_alpha
          blendSrcAlpha: src_alpha
          blendDstAlpha: one_minus_src_alpha
      properties: *props 
```
## 顶点着色器

顶点着色器直接沿用引擎内置的通用顶点着色器：

```yaml
 - vert: general-vs:vert # builtin header
```
## 片元着色器

要计算视点的方向，需要获取当前相机的位置，之后用相机的位置减去当前的坐标：

```glsl
#include <cc-global>  // 包含 Cocos Creator 内置全局变量  
```

计算视点的方向：
```glsl
vec3 viewDirection = cc_cameraPos.xyz - v_position; //计算视点的方向
```
注意这里只有 cc_cameraPos 的 xyz 分量表示了相机的位置， w 分量不会用到。

之后片元着色器会变成：

```glsl
  vec4 frag(){ 
    vec3 viewDirection = cc_cameraPos.xyz - v_position; //计算视点的方向
    vec3 normalizedViewDirection = normalize(viewDirection);  //对视点方向进行归一化
    vec4 col = mainColor * texture(mainTexture, v_uv); //计算最终的颜色
    CC_APPLY_FOG(col, v_position);
    return CCFragOutput(col);  
  }
```
接下来需要计算法线和视角的夹角，法线已由定点着色器传入到片元着色器：

```glsl
in vec3 v_normal;
```

法线由于管线的插值，不再处于归一化状态， 因此需要对法线进行归一化处理，此时片元着色器会变成：

```glsl
vec4 frag(){ 
    vec3 normal = normalize(v_normal);  //重新归一化法线。
    vec3 viewDirection = cc_cameraPos.xyz - v_position; //计算视点的方向
    vec3 normalizedViewDirection = normalize(viewDirection);  //对视点方向进行归一化
    vec4 col = mainColor * texture(mainTexture, v_uv); //计算最终的颜色
    CC_APPLY_FOG(col, v_position);
    return CCFragOutput(col);  
}
```

这时可计算法线和视角的夹角：

```glsl
dot(normal, normalizedViewDirection)
```

注意点积的计算可能会出现小于 0 的情况，而颜色一般是正值，因此通过 `max` 函数将其约束在 [0, 1] 这个范围内：

```glsl
max(dot(normal, normalizedViewDirection), 0.0)
```

此时可根据点积的值来调整 RimLight 的颜色， 

```glsl
vec4 frag(){ 
    vec3 normal = normalize(v_normal);  //重新归一化法线。
    vec3 viewDirection = cc_cameraPos.xyz - v_position; //计算视点的方向
    vec3 normalizedViewDirection = normalize(viewDirection);  //对视点方向进行归一化
    float rimPower = max(dot(normal, normalizedViewDirection), 0.0);
    vec4 col = mainColor * texture(mainTexture, v_uv); //计算最终的颜色
    col.rgb += rimPower * rimColor.rgb;
    CC_APPLY_FOG(col, v_position);
    return CCFragOutput(col);  
}
```

可观察到物体中心比边缘更亮，这是由于点积描述的是法线和视线的夹角，显然边缘的点积结果更大。

![](img/dot.png)

根据三角函数可知，点积的结果被约束在 [0,1] 这个区间内， 因此用 1 减去结果则可以得到正确的值：

~~float rimPower = max(dot(normal, normalizedViewDirection), 0.0);~~
float rimPower = 1.0 - max(dot(normal, normalizedViewDirection), 0.0);

片元着色器代码会编程：

```glsl
vec4 frag(){ 
    vec3 normal = normalize(v_normal);  //重新归一化法线。
    vec3 viewDirection = cc_cameraPos.xyz - v_position; //计算视点的方向
    vec3 normalizedViewDirection = normalize(viewDirection);  //对视点方向进行归一化
    float rimPower = 1.0 - max(dot(normal, normalizedViewDirection), 0.0);
    vec4 col = mainColor * texture(mainTexture, v_uv); //计算最终的颜色
    col.rgb += rimPower * rimColor.rgb;
    CC_APPLY_FOG(col, v_position);
    return CCFragOutput(col);  
  }
```

![](img/1-dot.png)

虽然已经出现的边缘光，但是如果希望通过参数去调整则不是很方便，因此在着色器的 CCEffect 段内增加一个可调整的参数 rimIntensity， 由于之前 rimColor 的 alpha 分量没有被使用到，因此借用该分量进行绑定可节约额外的 Uniform 字段：

CCEffect 示例：

```glsl 

techniques:
  - name: opaque
    passes:
    - vert: general-vs:vert # builtin header
      frag: rimlight-fs:frag
      properties: &props
        mainTexture:    { value: white } 
        mainColor:      { value: [1, 1, 1, 1], editor: { type: color } }    
        # Rim Light 的颜色，只依赖 rgb 三个通道的分量
        rimLightColor:  { value: [1.0, 1.0, 1.0], target: rimColor.rgb, editor: { displayName: Rim Color, type: color } }
        # rimLightColor 的 a 没有被用到，复用该通道用来描述 rimLightColor 的强度。
        rimInstensity:  { value: 1.0, target: rimColor.a, editor: {slide: true, range: [0, 10], step: 0.1}}                   
```

使用 pow 函数， 可实现不同的曲线效果， 将下列代码修改为：

~~col.rgb += rimPower * rimColor.rgb;~~

```glsl
float rimInstensity = rimColor.a;
col.rgb += pow(rimPower, rimInstensity), * rimColor.rgb;
```

之后将材质属性查看器面板的 rimIntensity 的值修改为 2：

![](img/intensity.png)

此时可观察到边缘光照更自然： 

![](img/preview-instensity.png)



 