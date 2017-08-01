# Project Structure

Using Dashboard we can create a new project with **Hello World** project template. Let's use the project to learn the structure of a Cocos Creator project.

## Folder Structure

Your Cocos Creator project should look like this:

```
ProjectName（project root）
├──assets
├──library
├──local
├──settings
├──temp
└──project.json
```

Let's see what these folders do:

### Assets

`assets` contains all art assets, script files and third party modules. Only files in `assets` folder will be shown in **Assets** panel of editor. Once imported to the project, a `.meta` file will be generated for each file in `assets` folder. Meta files are used to store asset setting and their reference to other assets. Some third party project files such as `.tps` from TexturePacker, or `.psd` from Photoshop should be put outside of `assets` since we won't use them directly in our project.

### Library

`library` folder is generated once the project is first opened and imported. In this folder, all assets of the game are renamed with their UUID (universal unique identifier) and will be copied over when the game is published. This folder should be ignored by version control system such as in `.gitignore` file.

If your the content of your `library` is damaged or missing, you can safely delete the `library` folder and reopen the project to re-generate it.


### Local Settings

`local` folder contains all settings that should not be shared across computer. Most of them are personal preferences such as Editor layout, window size and position. You should not use or modify the content of this folder and neither should your version control system.

### Project Settings

`settings` folder contains project related settings such as bundle name, bundle id and target platform settings in **Build** panel. You should keep it under version control so your team can share those settings.

### project.json

`project.json`, along with `assets` folder, are the only two necessary requirements for validating a Cocos Creator project. `project.json` only contains current engine id and local editor extension folder. You should not change the file manually.

### Build Target

A `build` folder will be created once you use main menu `Project->Build...` and publish your game with default build target. If you have built for native platforms, this `build` folder will be very large. So you should not include this folder in version control.