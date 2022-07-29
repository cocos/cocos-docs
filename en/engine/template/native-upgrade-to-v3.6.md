# Project Engineering Upgrade Guide

 - This article will introduce in detail the precautions for upgrading Cocos Creator natively built projects from 3.5~3.5.x to 3.6. The modification is only for the 'native' directory under the project.

### First, open the old project in the new directory with the new version of creator, then build the target platform, and finally refer to the following steps

#### Android 
  - Remove the file: ~~jni/main.cpp~~
  - Remove code `${CMAKE_CURRENT_LIST_DIR}/jni/main.cpp` from `android/CMakeLists.txt`
  
#### The modification of Native Code
  - Delete `NonRefNativePtrCreatedByCtorMap` related code

#### `Readonly` property changes for Native Code
  - To reduce memory usage, the property obtained is a newly created object, the description of `Readonly` [Reference](../../scripting/readonly.md)


    