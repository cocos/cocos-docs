# Custom Project Build Process

## Custom Project Build Template

**Cocos Creator** supports custom build templates for each project. Add a `build-templates` folder to the project path, divide the sub-folder according to the `platform` path. Then all the files in this folder will be automatically copied to the build generated project according to the corresponding folder structure after the build. Currently, all platforms except the native platform support this function, the specific platform name can be referred to the following **custom build template platform support table**.

Folder Structure:

```
project-folder
 |--assets
 |--build
 |--build-templates
      |--web-mobile
            |--index.html
```

If the current platform is `Web-Mobile`, then `build-templates/web-mobile/index.html` will be copied to `build/web-mobile/index.html`.

In addition to this, build templates can be customized in the following ways.

### ejs type

Since the content of the package is not guaranteed to be exactly the same in every version, when the build template within the editor is updated, the developer also needs to update the build template within their project. Now add a new way to use the template, click on **Project -> Create preview template** in the main menu, and an `ejs` template file will be generated for the corresponding platform.

```md
project-folder
 |--assets
 |--build
 |--build-templates
      |--web-mobile
            |--index.ejs
```

Parameters are imported into these templates during the build, and content that is frequently changed during the build is placed in sub-templates of that template. You only need to modify what you want to use, so that the build templates within the project can be updated less frequently.

> **Note**: the copy template occurs after the rendered template. For example, if both `index.ejs` and `index.html` exist in this directory, the final packaged package will be the `index.html` file instead of the `index.ejs` rendered file.

### JSON Type

Many mini games have their own configuration `JSON` files, like `game.json` to WeChat Mini Games. Files in the build templates folder will just copy in **default**, but this configuration JSON will be merged instead of overwrite. Of course, it doesn't mean that all `JSON` file will be merged, you can check it in the tables below.

### Custom build template platform supports tables

The `JSON` files corresponding to the data fusion for each mini game are as follows:

| Platform | Actual Name | Custom Build Template |
| -------- | ---------- | ----------- |
| **WeChat Mini Game** | wechatgame | `game.ejs`, `game.json`, `project.config.json` |
| **Web Mobile** | web-mobile | `index.ejs` |
| **Web Desktop** | web-desktop | `index.ejs` |
| **Xiaomi Quick Game** | xiaomi-quick-game | `manifest.json` |
| **Huawei Quick Game** | huawei-quick-game | Use the Build Panel's|
| **Cocos Play** | cocos-play | `game.config.json` |
| **Baidu Mini Game** | baidu-mini-game | `game.json`, `project.swan.json` |
| **OPPO Mini Game** | oppo-mini-game | `manifest.json` |
| **vivo Mini Game** | vivo-mini-game | `project.config.json` |
| **Alipay Mini Game** | alipay-mini-game | `game.json` |
| **Native** | native | X (Not recommended) |

## Custom Build Plugins

It is currently in the internal testing phase and is not open to the public at this time.
