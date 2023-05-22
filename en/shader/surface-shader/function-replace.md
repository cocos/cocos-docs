# Function Replacement Using Macros

Sometimes we need to create some common functions for different requirements to reduce code volume and maintenance costs.

However, for some functions in the process, we hope to replace them with specific versions on certain occasions to meet specific requirements.

This can be done using the macro definition mechanism.

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

In the code above, `myFunc` has a complete calling process. If you want to modify the implementation of `ModifySomething`, you only need to define the `CC_USER_MODIFY_SOMETHING` macro before `#include example.chunk`, and implement your `ModifySomething` function.

```glsl
#define CC_USER_MODIFY_SOMETHING
void ModifySomething(){
    //do what you want
}

#include <example.chunk>
```

> Note, the definition of the replaced function should be placed before the `include`.

This mechanism is widely used in the Surface Shader system, such as the `SurfacesFragmentModifySharedData` function in `lighting-models/includes/common` mentioned earlier.

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
