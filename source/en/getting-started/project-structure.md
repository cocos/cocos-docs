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

`assets` contains all resources, script files and third party modules. Only files in `assets` folder will be shown in **Assets** panel of editor. After imported to project, a `.meta` file will be generated for each file in `assets` folder. Meta files are used to store resource setting and their reference to other resources. Some third party project files such as `.tps` from TexturePacker, or `.psd` from Photoshop can be put outside of `assets` since we won't use them directly in our project.

### Library

`library` folder is generated once the project is first opened and imported. In this folder, all resources of the game are renamed with their UUID (universal unique identifier) and will be copied over when the game is published. This folder should be ignored by version control system such as in `.gitignore` file.

If your the content of your `library` is damaged or missing, you can safely delete the `library` folder and reopen the project to re-generate it.


### Local Settings

`local` folder contains all settings that should not be shared across computer. Most of them are personal preferences such as Editor layout, window size and position. You should not care about the content in this folder and neither should your version control system.

### Project Settings

`settings` folder contains project related settings such as bundle name, bundle id and target platform settings in **Build** panel. You should keep it under version control so your team can share those settings.

### project.json

`project.json`, along with `assets` folder, are the only two necessary requirements for validating a Cocos Creator project. `project.json` only contains current engine id and local editor extension folder. You should not change the file manually.

---

Continue to read [Get Help and Support](support.md).