# Engine Customization Workflow

The engine part of Cocos Creator 3.0 includes TypeScript, engine-native, and an adapter (adapter engine customization is not supported at this time). The engine is all open-source on GitHub. The addresses are as follows:

- [TypeScript engine](ttps://github.com/cocos-creator/engine/)
- [engine-native engine](https://github.com/cocos-creator/engine-native/)
- [Adapter](https://github.com/cocos-creator-packages/adapters)

It is recommended to maintain custom code using the GitHub's Fork workflow. This workflow allows developers to easily update custom engine parts when the engine is upgraded in the future. This workflow is described in the [Fork a repo](https://help.github.com/articles/fork-a-repo) documentation. If you would like to help Cocos get better, feel free to submit changes to GitHub, see the [How to Submit Code to Cocos](../../submit-pr/submit-pr.md) documentation. For more GitHub-related workflows, please refer to the [GitHub Help](https://help.github.com).

Also, depending on the Creator version, developers may need to switch to a different engine branch, it is recommended to use the same branch that corresponds to the version of Creator being used.

## 1 Customize the TypeScript engine

If you only need to customize the engine functionality of the web version of the game, or if you only need to modify the pure TypeScript layer logic (e.g. UI system, animation system), simply modify the TypeScript engine by following the procedure below:

### 1.1 Get the TypeScript engine

You can modify the engine based on the one built in Cocos Creator 3.0 if you just need to make some adjustments based on the current version. Click the **App** button at the top right of the Creator editor, and then copy the built-in `engine` directory to another local path.

![open-engine](engine-customization/open-engine.png)

To get the latest official version in development, fork or clone the original version of the TypeScript engine from GitHub (see above), and switch the corresponding branch of the TypeScript engine according to the Creator version before using it. Once downloaded, store it to any local path.

![download-repo-js](engine-customization/download-repo-js.png)

### 1.2 Modify the TypeScript Engine Path

Set the path of the TypeScript engine to be customized via the **Engine Manager** tab of **Cocos Creator -> Preferences**.

![custom-ts-engine](engine-customization/custom-ts-engine.png)

> **Note**: it is necessary to restart Creator after modifying the engine path.

### 1.3 Install Compilation Dependencies

```bash
### Go to the engine path in the command line
cd E:/engine
# Install the gulp build tool
npm install -g gulp
# Install dependent modules
npm install
```

> **Note**: the gulp build tool is required to generate debuginfos.

### 1.4 Make changes and compile

Next, customize the engine modifications and then click **Developer -> Compile the engine** in the Cocos Creator editor menu bar to compile.

![build](engine-customization/build.png)

This command will generate a `bin` folder under the engine directory and compile the engine source code under the `bin` directory.

![bin](engine-customization/bin.png)

## 2 Customize the engine-native Engine

If you need to customize the engine features related to the native platform, you may need to modify the **engine-native** engine in parallel with the TypeScript engine.

### 2.1 Get the engine-native Engine

If you only need to make some tweaks based on the current version, you can modify the **engine-native** engine built into Cocos Creator 3.0. The procedure is the same as for the TypeScript engine, click the **App** button at the top right of the Creator editor, then copy the built-in `cocos2d-x-lite` directory to another local path.

To get the latest official version in development, download or clone it from the GitHub repository specified above. Similar to the TypeScript engine, the **engine-native** engine should be checked for the current branch before use.

### 2.2 Initialization

After downloading or cloning the **engine-native** engine repository, go to the engine path at the command line and execute the following command:

> **Note**: if you copied the built-in `cocos2d-x-lite` directory from the editor, you can skip this step.

```bash
# Go to the engine-native engine path at the command line
cd E:/cocos2d-x-lite
# Install the gulp build tool
npm install -g gulp
# Install dependent modules
npm install
# Initialize the repository
gulp init
```

### 2.3 Configure a custom engine-native in Cocos Creator 3.0

Set the path to the **engine-native** engine to be customized via the **Engine Manager** tab of **Cocos Creator -> Preferences**.

![custom-native-engine](engine-customization/custom-native-engine.png)

### 2.4 Modify the Engine

It is possible to customize the **engine-native** engine. Since the code is only compiled during the **build release** process, directly open the **Build** panel after modifying the engine and select the **link** template to build and compile.
