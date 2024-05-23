# 升级指南：粒子 从 v3.5.x 升级到 v3.6.0

## CPU 粒子

v3.6.0 粒子系统新增了 instance 支持，粒子 shader particle-vs-legacy.chunk 需要做如下修改：

原来的 layout：

````
in vec3 a_position; // center position
in vec3 a_texCoord;  // xy:vertex index,z:frame index
in vec3 a_texCoord1; // size
in vec3 a_texCoord2; // rotation
in vec4 a_color;

#if CC_RENDER_MODE == RENDER_MODE_STRETCHED_BILLBOARD
  in vec3 a_color1; // velocity.x, velocity.y, velocity.z, scale
#endif

#if CC_RENDER_MODE == RENDER_MODE_MESH
  in vec3 a_texCoord3;  // mesh vertices
  in vec3 a_normal;     // mesh normal
  in vec4 a_color1;     // mesh color
#endif
````

现在的 layout：

````
in vec3 a_texCoord1;  // size
in vec3 a_texCoord2;  // rotation
in vec4 a_color;

in vec3 a_texCoord;  // xy:vertex index,z:frame index
#if !CC_INSTANCE_PARTICLE
 in vec3 a_position;  // center position
#endif
#if CC_INSTANCE_PARTICLE
 in vec4 a_texCoord4; // xyz:position,z:frame index
#endif

#if CC_RENDER_MODE == RENDER_MODE_STRETCHED_BILLBOARD
  in vec3 a_color1; // velocity.x, velocity.y, velocity.z, scale
#endif

#if CC_RENDER_MODE == RENDER_MODE_MESH
  in vec3 a_texCoord3;  // mesh vertices
  in vec3 a_normal;     // mesh normal
  in vec4 a_color1;     // mesh color
#endif
````

其它 shader 代码需要参考 v3.6.0 的 particle-vs-legacy.chunk 进行修改。

## GPU 粒子

GPU 粒子 shader particle-vs-gpu.chunk 需要做如下修改：

原来的 layout：

````
in vec4 a_position_starttime; // center position,particle start time
in vec4 a_size_uv;  // xyz:size, w:uv_0
in vec4 a_rotation_uv;  // xyz:rotation, w:uv_1
in vec4 a_color;
in vec4 a_dir_life;  // xyz:particle start velocity,w:particle lifetime
in float a_rndSeed;

#if CC_RENDER_MODE == RENDER_MODE_MESH
  in vec3 a_texCoord;  // mesh uv
  in vec3 a_texCoord3;  // mesh vertices
  in vec3 a_normal;     // mesh normal
  in vec4 a_color1;     // mesh color
#endif
````

现在的 layout

````
in vec4 a_position_starttime; // center position,particle start time
in vec4 a_color;
in vec4 a_dir_life;  // xyz:particle start velocity,w:particle lifetime
in float a_rndSeed;

#if !CC_INSTANCE_PARTICLE
  in vec4 a_size_uv;  // xyz:size, w:uv_0
  in vec4 a_rotation_uv;  // xyz:rotation, w:uv_1
#endif
#if CC_INSTANCE_PARTICLE
  in vec4 a_size_fid;  // xyz:size, w:fid
  in vec3 a_rotation;  // xyz:rotation
  in vec3 a_uv;
#endif

#if CC_RENDER_MODE == RENDER_MODE_MESH
  in vec3 a_texCoord;   // mesh uv
  in vec3 a_texCoord3;  // mesh vertices
  in vec3 a_normal;     // mesh normal
  in vec4 a_color1;     // mesh color
#endif
````

其它 shader 代码需要参考 v3.6.0 的 particle-vs-gpu.chunk 进行修改。
