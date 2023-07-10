# 使用宏定义实现函数替换

有时候需要制作一些公用的函数供不同的需求场景使用， 以降低代码量和维护成本。

但流程里的某些函数，我们希望在某些场合替换为特定版本，以满足特定需求。

可以通过宏定义机制来完成。

```glsl
//example.chunk
#ifndef CC_USER_MODIFY_SOMETHING
void ModifySomething(){
    //do something here
}
#endif

void Before(){
    //do something here
}

void After(){
    //do something here
}

void myFunc(){
    Before();
    ModifySomething();
    After();
}
```

可以看到，在上面的代码中，myFunc 拥有完整的调用流程。如果想修改 ModifySomething 的实现，只需要在 #include example.chunk 之前，定义 CC_USER_MODIFY_SOMETHING 宏，并实现自己的 ModifySomething 函数即可。

```glsl
#define CC_USER_MODIFY_SOMETHING
void ModifySomething(){
    //do what you want
}

#include <example.chunk>
```

> 注意，**重载函数定义要放在 include 前面**。

这个机制在 Surface Shader 系统中被广泛应用，比如前面提到的 lighting-models/includes/common 中的 SurfacesFragmentModifySharedData 函数。

```glsl
// user-defined-common-surface.chunk:
// base surface function
#ifndef CC_SURFACES_FRAGMENT_MODIFY_SHARED_DATA
#define CC_SURFACES_FRAGMENT_MODIFY_SHARED_DATA
void SurfacesFragmentModifySharedData(inout SurfacesMaterialData surfaceData)
{
    .................
}
#endif

// effect
// this function needs overriding
#define CC_SURFACES_FRAGMENT_MODIFY_SHARED_DATA
void SurfacesFragmentModifySharedData(inout SurfacesMaterialData surfaceData)
{
    .............
}
// base functions should place after override functions
#include <user-defined-common-surface.chunk>
```
