# Project Structure

Using Dashboard we can create a new project with **Hello World** project template. Let's use the project to learn the structure of a Cocos Creator project.

## Folder Structure

Your Cocos Creator project should look like this:

```
ProjectName (project root)
├──assets
├──library
├──local
├──packages
├──settings
├──temp
└──project.json
```

Let's see what these folders do:

### assets

`assets` contains all art assets, script files and third party modules. Only files in `assets` folder will be shown in **Assets** panel of editor. Once imported to the project, a `.meta` file with the same name will be generated for each file in `assets` folder. `.meta` files are used to store the corresponding resource configuration and index information. The `.meta` file needs to be submitted to the version control system, please refer to [Resource Management Considerations --- meta files](../advanced-topics/meta.md) for details.

Some third party project files such as `.tps` from TexturePacker, or `.psd` from Photoshop should be put outside of `assets` since we won't use them directly in our project.

### library

`library` folder is generated once the project is first opened and imported. In this folder, all assets of the game are renamed with their UUID (universal unique identifier) and will be copied over when the game is published.

If your `library` is damaged or missing, you can safely delete the `library` folder and reopen the project to re-generate it.

### local

`local` folder contains all settings that should not be shared across computer. Most of them are personal preferences such as Editor layout, window size and position. You should not use or modify the content of this folder.

### Packages

`packages` folder is used to place custom extensions for this project. If you need to install the extension manually, you can create this folder manually. If you need to uninstall the extension, delete the corresponding folder in `packages`.

### settings

`settings` folder contains project related settings such as bundle name, bundle id and target platform settings in **Build** panel.

### temp

`temp` is a temporary folder used to cache local temporary files of Cocos Creator. This folder can be deleted manually after closing Cocos Creator, and you don't need to care about what's inside.

### project.json

`project.json`, along with `assets` folder, are the only two necessary requirements for validating a Cocos Creator project. Only folders containing `project.json` and `assets` can be opened as Cocos Creator projects. You should not change the file manually, and you don't need to care about the contents inside.

### Build Target

A `build` folder will be created once you use main menu `Project -> Build...` and publish your game with default build target. If you have built for native platforms, this `build` folder will be very large.

## Version Control

When Cocos Creator creates a new project, it will automatically generate a `.gitignore` file to exclude files that should not be submitted to the git repository. If you use other version control systems, or need to submit project to other places, you should pay attention to only submitting `assets`, `packages`, `settings`, `project.json`, or other manually added association files.
