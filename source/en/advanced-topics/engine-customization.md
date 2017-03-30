# Engine Customization Workflow

The game engine in Cocos Creator has two parts: JavaScript engine with ECS (entity-component system) and C++ (custom version of cocos2d-x). They are both open sourced on github:

- Creator-JS engine: https://github.com/cocos-creator/engine
- Cocos2d-x-lite engine：https://github.com/cocos-creator/cocos2d-x-lite

For the purpose of customize engine, we recommend that you follow the fork workflow of github, please read [github help: Fork A Repo](https://help.github.com/articles/fork-a-repo) to learn details. More related github workflow can be looked up here: [github help](https://help.github.com).

## Customize JavaScript Engine

If your concern is only Web games, or what you want to change in the engine is not native API related (for example UI and animation components), you just need to follow the workflow here:

### Get JavaScript Engine Repository

First of all you need to clone the engine repository or forked repository. You have to make sure the repo is at the corresponding branch. For example to customize engine for Cocos Creator v1.1.2 you'll need to checkout `v1.1` branch; for Cocos Creator v1.2.1 you'll need to checkout `v1.2` branch. Once clone is completed, go to the repo's folder in your command line tool (or terminal on mac).

### Install NPM Dependencies

We use npm and gulp for engine building so let's install those dependencies:

```bash
npm install -g gulp
npm install
```

### Change and Build

Now you can do whatever you want to the engine, once you finished:

```bash
# build engine
gulp build
```

This will generated comipled engine to `bin` folder.

### Use customized engine in Cocos Creator

Goto **Preferences** panel and click [Native Develop Tab](../getting-started/basics/editor-panels/preferences.md#--8). And follow the guide to set the path to your customized JavaScript engine.


## Customized Cocos2d-x C++ Engine

If you need to change stuff of rendering or native API related function. Besides updating JavaScript engine (so that your change can work with component system) you'll need to synchronize your change to the customized cocos2d-x-lite engine of Cocos Creator. Please make sure you get the cocos2d-x-lite engine repo from the link on top of this article, it's not the same as the stand alone cocos2d-x repo (http://github.com/cocos2d/cocos2d-x)!

Same as JavaScript engine, you need to make sure cocos2d-x-lite repo is on correct branch. For Cocos Creator v1.2.0 please checkout `v1.2` branch.

### Initialize

Once cloned, enter the cocos2d-x-lite engine folder and run:

```bash
# Install NPM dependencies
npm install
# download binary dependencies, you'll need python working first
python download-deps.py
# update submodule repos, you'll need git
git submodule update --init
```


### Used customized cocos2d-x-lite engine in Cocos Creator

Goto **Preferences** panel and click [Native Develop Tab](../getting-started/basics/editor-panels/preferences.md#--8). And follow the guide to set the path to your customized cocos2d-x-lite engine.

### Build from Source

Next you can start working on updating code for cocos2d-x-lite. If you want to use source code in your build project you can just choose `default` template in **Build** panel and compile from the source, no extra command line work needed.

### Build binary library and simulator

If you want to use `binary` template to build and compile native project (it's much faster since C++ code are already compiled), you'll need to run these commands:

```bash
# use cocos console to generate prebuilt binary libs
gulp gen-libs
```

To generate simulator to preview your changes:

```bash
# use cocos console to generate simulator
gulp gen-simulator
gulp update-simulator-config
```


## JSB Workflow (JavaScript Binding)

If your changes involves JavaScript and C++ changes at the same time. You should read this article:

- [How to bind C++ to JavaScript](http://www.cocos2d-x.org/wiki/How_to_bind_C++_to_Javascript)