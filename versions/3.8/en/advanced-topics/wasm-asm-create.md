# Converting Native Code to Wasm/Asm Files Using Emscripten

## Installing Emscripten on Windows

1. **Download emsdk:** Clone the emsdk repository by running the git command: `git clone https://github.com/emscripten-core/emsdk.git`

    > **Note:** You need to have git installed on your computer to run git commands. If not installed, download and install it from [git official website](https://git-scm.com/).

2. **Choose an emsdk version:** The latest version of emsdk is 4.0.10, but testing has revealed unexpected compatibility issues. We recommend using version 3.1.41, which is the version used by the engine team when compiling Spine module wasm files.

3. **Install emsdk dependencies:** In the emsdk root directory, run the command: `./emsdk install 3.1.41`. This will automatically install the required runtime libraries for emsdk.

    > **Notes:**
    > * When switching emsdk versions, you need to both switch the source code version and reinstall the runtime libraries. Simply append the version number string after `./emsdk install`.
    >
    > * To install the latest version of emsdk dependencies, append `latest` after `./emsdk install`.
    >
    > * If downloads fail during dependency installation, try using a VPN to accelerate the connection.

4. **Configure system environment variables for emsdk:** In the emsdk root directory, run the command: `./emsdk_env.bat` to automatically configure the required system environment variables for emsdk runtime libraries.

5. **Verify emsdk environment variables:** Open the upstream/emscripten/.emscripten file in the emsdk directory and check if LLVM_ROOT and BINARYEN_ROOT match the following reference paths:

    ```python
    LLVM_ROOT = 'D:\\git\\emsdk\\upstream\\bin'
    BINARYEN_ROOT = 'D:\\git\\emsdk\\upstream'
    ```

    If they don't match, manually modify them to point to the local paths where llvm tools and binaryen tools can be found.

6. **Activate emsdk environment:** In the emsdk root directory, run the command: `./emsdk activate --system` to activate the emsdk environment. After this, you can use the `emcc` command in command line windows.

    > **Notes:**
    > * Adding `--system` makes the emsdk environment available in all command line windows. Otherwise, you would need to run `./emsdk activate` each time you open a new command line window.
    >
    > * Older versions typically used `./emsdk activate --global` for global activation.

7. **Verify successful emsdk installation:** Run the command: `emcc --version` in a command line window. If you see output like `emcc (Emscripten gcc/clang-like replacement + linker emulating GNU ld) 3.1.41`, the installation was successful.

## Generating Wasm Files

1. **Create a C code file:** Create a Cocos.c file in any directory with the following content:

    ```C
    #include <stdio.h>

    int main() {
        printf("Hello World\n");
    }
    ```

2. **Convert C code to Wasm/Asm file:** In the root directory where Cocos.c is located (assuming it's in D:\) run the command: `emcc D:\Cocos.c -s WASM=1`. After execution, the wasm file will be generated in the current directory.

    > **Notes:**
    >
    > * Adding `-s WASM=1` specifies generation of wasm files. Using `-s WASM=0` generates Asm files for platforms without WebAssembly support.
    >
    > * When generating Asm files, if the native code requires large memory initialization, a .mem file will also be generated and needs to be loaded.
    >
    > * For more command line parameters, run `emcc --help` or search for related documentation online.

## Loading Wasm/Asm Files

Refer to [Custom Loading of Wasm/Asm Files and Modules](./wasm-asm-load.md) for instructions on loading Wasm/Asm files.

## Compiling Cocos Engine's Spine Wasm

1. **Install CMake:** Download and install from [CMake official website](https://cmake.org/)

2. **Configure CMake system environment variables:** Add `C:\Program Files\CMake\bin` to your system environment variables.

3. **Install MinGW:** Download the package containing `win32-seh-ucrt` from [MinGW releases page](https://github.com/niXman/mingw-builds-binaries/releases), then extract it to your computer.

4. **Configure MinGW system environment variables:** Add `C:\mingw64\bin` to your system environment variables.

5. **Navigate to Spine Wasm C++ code folder:** Open a command line tool and use cd to enter the Cocos engine folder containing Spine Wasm C++ code:

    ```cmd
    cd D:\CocosCreator\Creator\3.8.3\resources\resources\3d\engine-native\cocos\editor-support\spine-wasm
    ```

    > **Note:** This is a reference path - modify it according to your actual installation path.

6. **Generate CMakeFiles:** Run the command `emcmake cmake -B ./build` to generate CMakeFiles in the build folder.

7. **Enter build folder:** Use cd to enter the build folder: `cd ./build`.

8. **Generate Spine Wasm files:** Run the command `emmake make`. You should now see spine.js and spine.wasm generated in the build folder.

    ![spine-wasm-create](../../zh/advanced-topics/wasm-asm-create/spine-wasm-create.png)

9. **Modify emcc commands in CMakeLists.txt:** The CMakeLists.txt file is located in the spine-wasm folder. Open it and modify the `emcc` command parameters to change the final output.

    > **Note:**
    >
    > * To compile a Debug version, set CMAKE_BUILD_TYPE to Debug in CMakeLists.txt, remove the -O3 optimization option from emcc commands, and add the -g compilation option.

10. **Update Cocos Engine's built-in Spine Wasm:** Copy the generated Spine Wasm files to the relative path `engine-native/external/emscripten/spine`.

    > **Note:** You need to restart the editor after switching between debug and release modes.
