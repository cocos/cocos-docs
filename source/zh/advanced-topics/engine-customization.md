# Engine custom workflow

Cocos Creator's has two level of engine integrated: JavaScript and C++. JavaScript engine is a standalone game engine that provides component system and full publish to web platform features. C++ engine is for publishing to native platforms, it can only work together with JavaScript engine and use JS binding to execute JavaScript functions on native platforms.

Both engine are open sourced on github. You can access them by:

- Creator-JS engine: https://github.com/cocos-creator/engine
- Cocos2d-x-lite engine: https://github.com/cocos-creator/cocos2d-x-lite

We recommend that you use github's fork workflow to maintain your own custom repository. Please read [github help: Fork A Repo](https://help.github.com/articles/fork-a-repo). Refer to [github help](https://help.github.com) for more github related workflows.

## Customize JavaScript engine

If you only need to customize the game engine for web platform publishing, or only need to modify logic layer(such as UI system, animation system), then you just follow the process to modify the JS engine on it.

### Get JS engine copy

First you need to clone the Creator-JS engine repo (or your fork) from github. According to the different version of the Creator, you also need to checkout different branches, such as Creator 1.1.2 corresponds to the engine v1.1 branch. Clone the repo to any local path, then in the command line tool enter the following commands.

### Install compilation dependencies

```bash
# Install the gulp build tool
npm install-g gulp
# Enter the engine path from the command line
npm install
```

### Make changes and compile

Then you can modify the engine code, once finished you can run the following command:

`` `Bash
gulp build
`` ``

To compile the engine source code into the `bin` directory.

### Use the custom engine in Cocos Creator

You can specify your custom engine path in Native Develop tab of **Preferences** panel. You can find more details in [native develop](../getting-started/basics/editor-panels/preferences.md#-8).

## Customize the Cocos2d-x-lite engine

If you need to customize the rendering and native interface related engine function, you need to simultaneously modify the JS engine and Cocos2d-x-lite C++ engine. Note that the Cocos2d-x-lite engine used by Cocos Creator is specifically tailored and needs to be downloaded from the github repository specified above.

Similar to the JS engine, you also need to checkout the correct branch of C++ engine repo. For the Cocos Creator v1.2.0 version, use the `v1.2` branch.

### Initialize

After downloading or cloning the engine repository, go to the engine path with the command line tool and execute:

```bash
# Install compilation dependencies
npm install
# Download dependency package, need to configure python in advance
python download-deps.py
# Synchronous sub repo, need to configure git in advance
git submodule update --init
```

### Use the custom engine in Cocos Creator

You can specify your custom engine path in Native Develop tab of **Preferences** panel. You can find more details in [native develop](../getting-started/basics/editor-panels/preferences.md#-8).

### Modify the engine

Then you can customize the Cocos2d-x-lite engine. Since the editor only compile C++ engine code during building process, once finish modifying engine you can open **Build** panel and select `default` template and start building and compiling.

### Compile precompiled libraries and simulators

If you want to use the `binary` precompiled library template to speed up the compilation process in the **Build** panel, you need to do this under the Cocos2d-x-lite engine path:

```bash
# Generate precompiled libraries from a cocos console
gulp gen-libs
```

To preview your engine changes in the simulator, you need to execute the following command to recompile the simulator

```bash
# Generate the simulator through the cocos console
gulp gen-simulator
gulp update-simulator-config
```


## JSB binding process

If you need to synchronize changes in the JavaScript engine and C++ engine, you should complete the JSB binding. Please refer to the following guidance:

- [Cocos2d-x script binding](https://zhuanlan.zhihu.com/p/20525026)
- [Automatic binding in Cocos2d-x](https://zhuanlan.zhihu.com/p/20525109)