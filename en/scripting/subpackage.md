# Subpackage Loading

As gameplay becomes more and more rich, the amount of code in the game is increasing and developers are wanting to expand the size of their game package. At the same time, WeChat Mini Games also support the function of subpackage loading. So Cocos Creator provides a **subpackage loading** feature that supports subpackage loading of **code** and **resources**. Where **resource subpackage** is supported from **v2.0.7**. Subpackage loading currently only supports all kinds of mini game platforms, such as WeChat Mini Games, OPPO Mini Games and so on.

**Subpackage Loading**, is the the game content being split into several packages according to certain rules. During the first startup, only the necessary packages are downloaded, also called the **main package**. Other subpackages are downloaded, as triggered, which can effectively reduce the time spent on the first boot.

## Configuration method

__Cocos Creator's__ uses a folder structure when configuring a **subpackage**. When a folder is selected, the relevant configuration options for the folder appear in the **Properties** tab:

![subpackage](./subpackage/subpackage.png)

After checking **Subpackage**, click __Apply__ at the top right, and the code in this folder will be treated as the contents of the __subpackage__. The **Subpackage name** will be passed as the loaded name when the __subpackage__ is loaded. The name of this folder will be used by default.

## Building

The function of **subpackaging** will only be avialable after the project is built. When previewing, it will be loaded according to the whole package. After the project is built, the corresponding **subpackage** file will be generated in **src/assets** in the release package directory.

**For example:** Configuring the **cases/01_graphics** folder in the example project as a **subpackage**. The **01_graphics** folder will be generated in **subpackages** in the release package directory after the project is built.

![package](./subpackage/package.png)

When building, all the **code** and **resources** under the **cases/01_graphics** subpackage folder are handled as follows:

  - **Code**: All code under the **cases/01_graphics** folder is merged into an entry script file named **01_graphics/game.js**, and the code is removed from the main package.
  - **Resources**: The **cases/01_graphics** subpackage resources are moved from the **res/raw-assets** folder to the **subpackages/01_graphics** directory under the release package directory.

## Loading a Subpackage

The engine provides a unified API `cc.loader.downloader.loadSubpackage` to load the resources (including code and other resources) inside the subpackage file. `loadSubpackage` needs to pass in the name of a subpackage. This name is the name of the subpackage that you configured in the project before. The default is the name of the subpackage folder.

When the subpackage is completed, a callback is triggered, and if the loading fails, an error message is returned.

```javascript
cc.loader.downloader.loadSubpackage('01_graphics', function (err) {
    if (err) {
        return console.error(err);
    }
    console.log('load subpackage successfully.');
});
```

If the loading is successful, the script in the subpackage will be executed and the resource loading path of the subpackage will be added to the engine. Developers can access all the resources in this subpackage in exactly the same way as accessing the main package, without having to worry about whether the resources were originally in the main package or in the subpackage.

## WeChat Mini Games

When building for the **WeChat Mini Game** Platform, the configuration of the **subpackage** will be automatically generated into the **game.json** configuration file of the **WeChat Mini Games** release package according to the rules.

![profile](./subpackage/profile.png)

**Note**: WeChat Mini Games require a specific version to support the **subpackage** feature.
> WeChat 6.6.7 Client, 2.1.0 and above base library support, please update to the latest client version, developer tools please use version **1.02.1806120** and above

After updating the developer tools, don't forget to modify the version of __Details -> Project Settings -> Debug Base library__ to __2.1.0__ and above in the developer tools:

![subpackage2](./subpackage/subpackage2.png)

Please refer to the [WeChat SubPackage Loading](https://developers.weixin.qq.com/minigame/en/dev/tutorial/base/subpackages.html) documentation for details.
