# Project Settings

**Project Settings** panel can be accessed from main menu `Project->Project Settings...`. This setting panel is for project specific customization. All these settings will be saved in `settings/project.json`. If you need to synchronize project settings across computers, please include `settings` folder in your version control.

## Group Manager

![Group](project-settings/group.jpg)

The **Group Manager** tab in **Project Settings** is mainly for [collision system](../../../physics/index.md) to provide collision group support. Please refer to [Collision Group](../../../physics/collision-group.md).

## Module Config

![Module](project-settings/module.jpg)

The setting here is for building game engine for release version of Web platform, including only modules checked in this page. The unselected module will be cropped.

Crop the unused module here will significantly reduce the engine package size. It is recommended to completely test published package after build, to avoid the use of cropped module in your script.

## Preview Run

**Preview Run** provides similar options as in the **Preview Run** page in [Preferences Panel](preferences.md), which are used to set the initial preview scene, resolution, etc., but only for the current project.

![preview](project-settings/preview.jpg)

### Preview Start Scene

This option will set which scene to run when you press **Preview** button at the top of the editor. If you set it to **Current Opened Scene**, it will run the scene you are currently editing. In addition you can also set this option to a specific scene from your scene list (for project that always need to start from the login scene).

### Design resolution, Fit Width / Fit Height

Use these settings to specify the default design resolution values ​​in the Canvas node, as well as the **Fit Height** and **Fit Width** option when creating a new scene or **Canvas Component**.

### Simulator Setting Type

Use this setting to set the simulator preview resolution and screen orientation. When this option is set to **Global**, the simulator resolution and screen orientation settings in **Preferences** are used. When set to **Project**, the following simulator settings are displayed:

- Simulator Device Orientation
- Simulator Resolution
- Simulator Custom Resolution

The above options are the same as those in the [Preferences](preferences.md) panel.