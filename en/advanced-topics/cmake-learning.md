# CMake Usage Introduction

CMake is a cross-platform build tool that can output a variety of Makefile or Project files as needed. CMake uses `CMakeLists.txt` to configure project files, where developers can integrate SDKs or reference libraries and configurations for compiling native platforms, review [Secondary Development](../editor/publish/native-options.md#secondary-development).

Starting from v3.0, Creator has integrated the CMake output process and base authoring. This document focuses on the rules for using `CMakeLists.txt` on the native platform and some simple examples.

## Generation and Usage of CMakeLists

### Generation

When selecting a native platform to build on, the `native\engine` directory will generate a `current build platform name` folder (e.g.: `android`) and a `common` folder, and CMake will generate `CMakeLists.txt` files in each of these two directories when it is first run, with which serve different purposes:

- In the `current build platform name` folder: `CMakeLists.txt` is mainly used to configure the corresponding build platform. For the Android platform, for example:

    ![folder2](./cmak-learning/folder3.png)

- In the `common` folder: `CMakeLists.txt` is mainly used to configure the whole project.

    ![folder2](./cmak-learning/folder4.png)

The syntax of `CMakeLists.txt` is relatively simple, consisting of **commands**, **comments** and **spaces**. The commands are case-insensitive, but the parameters and variables in the commands are case sensitive.

### Usage

How to use CMake to compile a project into a dynamic library for other projects? Simply put, enter the compilation information first, and then the CMake command generates the Makefile file needed for compilation according to the configuration in `CMakeLists.txt`.

Taking the Android platform as an example and see how to configure `CMakeLists.txt` in the project directory `native/engine/android`.

```CMake
# Set the minimum version of CMake required. If the version of CMake used is lower than this version, the user will be reminded to upgrade to this version before executing CMake
cmake_minimum_required(VERSION 3.8)

# Declare the project name
option(APP_NAME "Project Name" "cmakeTest")

# Declare the project name and the supported programming languages, if not specified, all programming languages are supported by default, including C, C++ and JAVA, which are represented by C, CXX and JAVA respectively.
project(${APP_NAME} CXX)

# include loads and runs CMake code from a file or module
include(${CMAKE_CURRENT_LIST_DIR}/../common/CMakeLists.txt)

# Define a new variable LIB_NAME and set it to "cocos"
set(LIB_NAME cocos)

# Define a variable PROJ_SOURCES
set(PROJ_SOURCES
    ${CMAKE_CURRENT_LIST_DIR}/../common/Classes/Game.h
    ${CMAKE_CURRENT_LIST_DIR}/../common/Classes/Game.cpp
    ${CMAKE_CURRENT_LIST_DIR}/jni/main.cpp
)

# If jsb_module_register.cpp does not exist in this path, copy the jsb_module_register.cpp file in this path to the target folder
if(NOT EXISTS ${CMAKE_CURRENT_LIST_DIR}/../common/Classes/jsb_module_register.cpp)
    file(_COPY "${COCOS_X_PATH}/cocos/bindings/manual/jsb_module_register.cpp"
        DESTINATION ${CMAKE_CURRENT_LIST_DIR}/../common/Classes/)
endif()

# Add new element to PROJ_SOURCES
list(APPEND PROJ_SOURCES
    ${CMAKE_CURRENT_LIST_DIR}/../common/Classes/jsb_module_register.cpp
)

# Dynamic library PROJ_SOURCES generates a link file to LIB_NAME
add_library(${LIB_NAME} SHARED ${PROJ_SOURCES})

# Link the target file LIB_NAME with the library file cocos2d_jni
target_link_libraries(${LIB_NAME}
    "-Wl,--whole-archive" cocos2d_jni "-Wl,--no-whole-archive"
    cocos2d
)

# Add the include directories to the target folder.
target_include_directories(${LIB_NAME} PRIVATE
    ${CMAKE_CURRENT_LIST_DIR}/../common/Classes
)
```

The `CMakeLists.txt` file in the project directory `native/engine/common` is configured in the same way, but with some more basic configuration. For example:

```CMake
option(USE_SPINE                "Enable Spine"                      ON)
```

The release package directory generated after the build (e.g.: `build/android`) has a `proj/cfg.cmake` file to store some configuration for the current project. Since `CMakeLists.txt` introduces the `cfg.cmake` file, when the configuration in the `cfg.cmake` file is modified, it will be synchronized to `CMakeLists.txt`; if the configuration is the same, it will be overwritten directly, and the one in the `cfg.cmake` file will prevail.

```CMake
CMakeLists.txt

# Introduce cfg.cmake
include(${RES_DIR}/proj/cfg.CMake)
```

For example, uncheck **Spine Animation** in the editor's main menu **Project -> Project Settings -> Feature Cropping**.

![project](./cmak-learning/project.png)

Then `USE_SPINE` will be set to `OFF` in the re-generated `cfg.make` when building again:

![code1](./cmak-learning/code1.png)

Then at compile time, CMake generates a **CMakeCache.txt** file based on the configuration (e.g.: `CMakeLists.txt` and the `cfg.make` configuration file introduced in `CMakeLists.txt`), which contains the **various input parameters that the project needs to rely on** when building.

![code2](./cmak-learning/code2.png)

## CMakeLists Common Compilation Directives

### Find compilation headers

Find the compilation header file and CMake will specify the include directory or target folder to be used when compiling a given target:

```CMake
target_include_directories(<target> [SYSTEM] [BEFORE]
  <INTERFACE|PUBLIC|PRIVATE> [items1...]
  [<INTERFACE|PUBLIC|PRIVATE> [items2...]) ...])
```

In general, library paths referenced by the above directive can be introduced into CMake as external dependencies. For example:

```CMake
# Add the Classes header library path to LIB_NAME
target_include_directories(${LIB_NAME} PRIVATE
    ${CMAKE_CURRENT_LIST_DIR}/../common/Classes
)
```

For more, see the official CMake [target_include_directories](https://cmake.org/cmake/help/latest/command/target_include_directories.html) documentation.

### Generate "target" (executable)

The `target` in the **find compilation headers** command above is the executable generated by the `add_library`, `add_executable`, and `add_custom_command` commands.

- Generated by the `add_library` command

   The `add_library` directive generates a link file from the specified source file and then adds it to the project.

    ```CMake
    add_library(<name> [STATIC | SHARED | MODULE])
            [EXCLUDE_FROM_ALL]
            [source1] [source2 ...])
    ```

    - `name`: add a target library named <name>, which is built from the source files listed in the command (source1, source2), and is globally unique in the project. The source files can be ignored here if they are subsequently specified via [target_sources()](https://cmake.org/cmake/help/latest/command/target_sources.html?highlight=target_sources) .

    - `STATIC` (static library), `SHARED` (dynamic library), `MODULE` (module library): used to specify the type of library to be created. STATIC libraries are archives of object files and are used to link to other targets. SHARED libraries are dynamically linked and loaded at runtime. MODULE libraries are plug-ins that are not linked to other targets, but can be loaded dynamically at runtime using a function similar to dlopen.

    Examples are as follows:

    ```CMake
    add_library(${LIB_NAME} SHARED ${PROJ_SOURCES})
    ```

    For more details, please refer to the official CMake [add_library](https://cmake.org/cmake/help/v3.16/command/add_library.html) documentation.

- Generated by the `add_executable` command

    The `add_executable` command generates the target executable by using the specified source file.

    ```CMake
    add_executable(<name> [WIN32] [MACOSX_BUNDLE]
                   [EXCLUDE_FROM_ALL]
                   [source1] [source2 ...])
    ```

    - `name`: the name of the executable target file, which must be globally unique within a CMake project.
    - `WIN32`: used to create an executable target file in **Windows** with `WinMain` as the entry point (usually the entry function is `main`), which is a **GUI application**, not a **console application**. When using `WIN32`, the executable target's `WIN32_EXECUTABLE` will be set to `ON`.
    - `MACOSX_BUNDLE`: used to create a GUI executable application in **macOS** or **iOS**. When using `MACOSX_BUNDLE`, the executable target's `MACOSX_BUNDLE` will be set to `ON`.
    - `EXCLUDE_FROM_ALL`: whether to build the specified executable target file. When this item is used, the executable target file will not be built.
    - `[source1] [source2 ...]`: the source file needed to build the executable target file. It is also possible to continue to add source files to the executable target file by using [target_sources()](https://cmake.org/cmake/help/latest/command/target_sources.html?highlight=target_sources). Note that the executable must have been defined by `add_executable` or `add_library` before `target_sources` is called.

    An example is as follows:

    ```CMake
    add_executable(hello-world hello-world.cpp)
    ```

    For more details, please refer to the official CMake documentation [add_executable](https://cmake.org/cmake/help/v3.16/command/add_executable.html?highlight=add_executable).

- Generated by the `add_custom_command` command

    The `add_custom_command` command is used to add custom build rules to the generated build system for two cases:

    1. adding custom commands to generate output files

        ```CMake
        add_custom_command(OUTPUT output1 [output2 ...]
                    COMMAND command1 [ARGS] [args1...]
                    [COMMAND command2 [ARGS] [args2...] ...]
                    [MAIN_DEPENDENCY depend]
                    [DEPENDS [depends...]]
                    [BYPRODUCTS [files...]]
                    [IMPLICIT_DEPENDS <lang1> depend1
                                        [<lang2> depend2] ...]
                    [WORKING_DIRECTORY dir]
                    [COMMENT comment]
                    [DEPFILE depfile]
                    [JOB_POOL job_pool]
                    [VERBATIM] [APPEND] [USES_TERMINAL]
                    [COMMAND_EXPAND_LISTS])
        ```

        The meanings of some of the parameters are as follows:

        - `OUTPUT`: specifies the output file that the command is expected to produce. The output file name can be **absolute path** or **relative path** (relative to the source directory path of the current build).

        - `COMMAND`: specifies the command line to be executed at build time.

        Examples are as follows:

        ```CMake
        add_custom_command(OUTPUT COPY_RES
                COMMAND ${CMAKE_COMMAND} -E copy_if_different ${abs} $<TARGET_FILE_DIR:${LIB_NAME}>/${filename}
            )
        ```

        > **Notes**:
        >
        > 1. Valid only if all targets that depend on its output are specified in the same `CMakeLists.txt`.
        >
        > 2. Do not execute the above command in multiple mutually independent target files at the same time to produce the same file, mainly to prevent conflicts from arising.

    2. Add additional custom commands to the build process of a target (e.g.: library or executable)

        ```CMake
        add_custom_command(TARGET <target>)
                   PRE_BUILD | PRE_LINK | POST_BUILD
                   COMMAND command1 [ARGS] [args1...]
                   [COMMAND command2 [ARGS] [args2...] ...]
                   [BYPRODUCTS [files...]]
                   [WORKING_DIRECTORY dir]
                   [COMMENT comment]
                   [VERBATIM] [USES_TERMINAL]
                   [COMMAND_EXPAND_LISTS])
        ```

        The meanings of some of the parameters are as follows:

        - `TARGET`: specifies the target of the command run

        - `COMMAND`: specifies the command line to be executed at build time.

    For more information about the `add_custom_command` command, please refer to the official CMake [add_custom_command](https://cmake.org/cmake/help/v3.16/command/add_custom_command.html?highlight=add_custom_command) documentation.

### Linking library files

The order of library files in ``target_link_libraries`` conforms to the rules of `gcc` linking order, i.e. the dependent library is placed after the library that depends on it.

```CMake
target_link_libraries(<target> [item1] [item2] [...]
                      [[debug|optimized|general] <item>] ...)
```

`item` indicates a library file without a suffix name. By default, library dependencies are passed. When this target is linked to another target, the library linked to this target will also appear on the link line of the other target. For example:

```CMake
target_link_libraries(${LIB_NAME}
    "-Wl,--whole-archive" cocos2d_jni "-Wl,--no-whole-archive"
    cocos2d
)
```

For more, see the official CMake [target_link_libraries](https://cmake.org/cmake/help/latest/command/target_link_libraries.html) documentation.

### Other commands

- Print debug log messages

    ```CMake
    message(STATUS "my custom debug info")
    ```

- Manipulate file commands

    ```CMake
    file(_COPY "${COCOS_X_PATH}/cocos/bindings/manual/jsb_module_register.cpp"
        DESTINATION ${CMAKE_CURRENT_LIST_DIR}/../common/Classes/)
    ```

    ``COPY`` means to copy files, directories and symbolic links to a target folder. The input path is the path relative to the current source code directory. The destination path is relative to the current build directory.

- Loading and running CMake code from a file or module

    ```CMake
    include(${CMAKE_CURRENT_LIST_DIR}/../common/CMakeLists.txt)
    ```

## CMakeLists Usage Examples

**Android.mk** is the Makefile of Android source code compilation system, which is used to compile dynamic libraries, static libraries, executables, apk, etc. of C++ in the system. The next step is to rewrite one `Android.mk` in [Tencent Cloud Multimedia Engine SDK](https://intl.cloud.tencent.com/document/product/607/15216) to ` CMakeLists.txt` for a simple example.

The code in `Android.mk` is as follows:

```
LOCAL_PATH := $(call my-dir)

include $(CLEAR_VARS)
LOCAL_MODULE := Pre_GMESDK
LOCAL_SRC_FILES := ./$(TARGET_ARCH_ABI)/libgmesdk.so
include $(PREBUILT_SHARED_LIBRARY)

include $(CLEAR_VARS)
LOCAL_MODULE := Pre_TRAE
LOCAL_SRC_FILES := ./$(TARGET_ARCH_ABI)/libtraeimp.so
include $(PREBUILT_SHARED_LIBRARY)

include $(CLEAR_VARS)
LOCAL_MODULE := Pre_PTT
LOCAL_SRC_FILES := ./$(TARGET_ARCH_ABI)/libsilk.so
include $(PREBUILT_SHARED_LIBRARY)

include $(CLEAR_VARS)
LOCAL_MODULE := Pre_MP3
LOCAL_SRC_FILES := ./$(TARGET_ARCH_ABI)/libgmecodec.so
include $(PREBUILT_SHARED_LIBRARY)
```

Where there is a ``LOCAL_PATH`` variable indicating the location of the source file in the development tree. The macro function `my-dir` provided by the build system will return the path to the current directory (the directory where the `Android.mk` file itself is located).

```
LOCAL_PATH := $(call my-dir)
```

The equivalent in `CMakeLists.txt` would be:

```cmake
set(LOCAL_PATH ${CMAKE_CURRENT_SOURCE_DIR}/..)
```

The code in the following section of ``Android.mk``:

```
include $(CLEAR_VARS)
LOCAL_MODULE := Pre_GMESDK
LOCAL_SRC_FILES := ./$(TARGET_ARCH_ABI)/libgmesdk.so
include $(PREBUILT_SHARED_LIBRARY)
```

The equivalent in `CMakeLists.txt` would be:

```CMake
add_library(Pre_GMESDK SHARED IMPORTED GLObal)
set_target_properties(Pre_GMESDK PROPERTIES
  IMPORTED_LOCATION ./${ANDROID_ABI}/libgmesdk.so
)
```

## Conclusion

CMake contains an extensive set of commands. Please continue to learn about it. In the future, Cocos Creator will also integrate more CMake features into the editor's **Build** panel for easy access.

For more details about CMake syntax and interface, please refer to the official [CMake](https://cmake.org/cmake/help/v3.16/guide/tutorial/index.html) documentation.
