# Extended build process

To build a platform plug-in a common editor plug-in format is required. For the basic structure of the plug-in, please refer to the [Package Plug-in System](../extension/install.md) documentation . To extend the build function, it is necessary to understand the overall process of the build. Please read the [Introduction to the build process and FAQ guide](./build-guide.md) documentation.

## Quick start

1. Click **Project -> New Build Extension** in the menu bar of the editor, and select **Global**/**Project** to create a build extension package.

    * If selecting **Global**, the build extension will be applied to all Cocos Creator projects. The path of **Global** is:

        * **Windows**: `%USERPROFILE%\.CocosCreator\extensions`

        * **Mac**: `$HOME/.CocosCreator/extensions`

    * If selecting **Project**, this will apply the build extension to the specified Cocos Creator project. The path of **Project** is:

        * `$Your project address/extensions`

2. After the build extension is created, you will see the generation path of the plugin in the **console**. Click on the path to open the build extension package in the file manager of the operating system.

3. Before enabling the build extension, execute `npm install` in the directory to install some dependent @types modules to compile normally. The interface definition that comes with the editor has been generated under the **@types** folder in the root directory. **Developer -> Export.d.ts** from the menu bar of the editor shows the latest.

4. Click **Extensions -> Extension Manager** in the menu bar of the editor to open the **Extension Manager** panel. Then select the **Project**/**Global** tab in the **Extension Manager**, and click the **Refresh Icon** button to see the build extension you just added. Then click the **Enable** button on the right to run the plug-in normally.

    ![enable-plugin](./custom-project-build-template/enable-plugin.png)

5. After the build extension is enabled, open the **Build Release** panel, you can see the expansion bar of the build extension. Click **Build** to join the build process.

    ![plugin-template](./custom-project-build-template/plugin-template.png)

6. If you need to modify the content of the build extension, directly modify the build extension package under the `extensions` directory, and then perform the third step. Then find the corresponding build extension in the **Extension Manager**, and click the **Reload** icon button. At this time, the extension in the editor will re-run with the latest code and files.

## Basic configuration process

To extend the build function of the plug-in, you need to add the `builder` field to the `contributions` in `package.json`, and the relative path configuration of the corresponding module can be passed to the specified platform in the field.

Example `package.json`:

```json
{
    "contributions": {
        "builder": "./dist/builder"
    }
}
```

## Plug-in entry configuration code example and interface definition

Example entry configuration code:

```ts
export const configs: IConfigs = {
    'web-mobile': {
        hooks: './hooks',
        options: {
            remoteAddress: {
                label: 'i18n:xxx',
                render: {
                    ui: 'ui-input',
                    attributes: {
                        placeholder: 'Enter remote address...',
                    },
                },
                // Validation rules, there are currently several commonly used validation rules built in, and the rules that need to be customized can be configured in the verifyRuleMap field
                verifyRules: ['require', 'http'],
            },
            enterCocos: {
                    label: 'i18n:cocos-build-template.options.enterCocos',
                    description: 'i18n:cocos-build-template.options.enterCocos',
                    default: '',
                    render: {
                        // Please click "Developer -> UI Components" in the menu bar of the editor to view a list of all supported UI components.
                        ui: 'ui-input',
                        attributes: {
                            placeholder: 'i18n:cocos-build-template.options.enterCocos',
                        },
                    },
                    verifyRules: ['ruleTest']
                }
            },
            verifyRuleMap: {
                ruleTest: {
                    message: 'i18n:cocos-build-template.ruleTest_msg',
                    func(val, option) {
                        if (val === 'cocos') {
                            return true;
                        }
                        return false;
                    }
                }
            }
        },
};
```

Please pay extra attention to the following points when writing entry scripts:

1. The environment variables in different processes will be different. The entry script will be loaded by the rendering process and the main process at the same time, do not use the editor interface that only exists in a single process in the entry script.

2. There are two ways to configure the key of `config`: one is for a single platform configuration, and the key is filled in as **platform plugin name** (available in the editor menu bar **Extensions -> Extension Manager -> Built-in** To view the platform plug-in name); one is the configuration for all platforms, the key is filled in as `*`. These two configuration methods are mutually exclusive, please do not use them in the same build extension package.

Example:

```ts
declare type IConfigs = Record<Platform | '*', IPlatformConfig>;
declare interface IBuildPlugin {
    hooks?: string; // Storage path of hook function
    options?: IDisplayOptions; // Platform parameter configuration that needs to be injected
    verifyRuleMap?: IVerificationRuleMap; // Register parameter verification rule function
}
declare type IDisplayOptions = Record<string, IConfigItem>;
declare interface IConfigItem {
    // The default value, the registered default value will be in the options.[platform].xxx field in the plugin configuration
    default?: any;

    render: ?{
        // The rules for rendering ui components are consistent with the unified rules at ui-prop. Only configurations with ui properties specified will be displayed on the build configuration panel
        ui?: string;
        // The configuration parameters passed to the ui component
        attributes?: IUiOptions;
    };

    // Configure the displayed name, if you need to translate, then pass in i18n:${key}
    label?: string;

    // A brief description of the setting will be displayed on the title of the configuration name
    description?: string;

    // Type of configuration
    type?: 'array' | 'object';

    // If type is an array, the data will be rendered according to the specified data type and itemConfigs
    itemConfigs?: Record<string, IConfigItem> | IConfigItem[];
}

declare interface IUiOptions extends IOptionsBase {
    // Validation rule array, build to provide some basic rules, you can also specify a new validation rule through verifyRuleMap, only when pass in require will be a valueless check, otherwise only when there is a value
    verifyRules?: string[];
}

declare interface IUiOptions extends IOptionsBase {
    class?: string | string[]; // The name of the style that needs to be set on the current ui-prop
}
```

For the interface definition of `IOptionsBase` please refer to [ui-prop automatic rendering rule definition](../extension/ui.md).

## Custom build hook function code configuration

In the script module defined by the hooks field in the entry configuration, hook functionss can be written that build the life cycle. In different hook functions, the data received will be different. All hook functions run in the build process, and the engine method can be used directly in the build process. If you need to use `Editor`, adding the code `import * as Editor from'editor';` manually is required.

The relationship between the public hook function and the life cycle of the build can be seen in the following figure:

![build-process](./custom-project-build-template/build-process.jpg)

The rough interface definition of hook function is as follows:

```ts
declare interface IHook {
    throwError?: boolean; // Whether the hook function injected by the plug-in directly exits the build process when the execution fails
    // ------------------ hook function --------------------------
    onBeforeBuild?: IBaseHooks;
    onBeforeCompressSettings?: IBaseHooks;
    onAfterCompressSettings?: IBaseHooks;
    onAfterBuild?: IBaseHooks;
}
type IBaseHooks = (options: IBuildTaskOptions, result?: IBuildResult) => void;
```

> **Note**: The `result` parameter can be accessed at the beginning of `onBeforeCompressSettings`, and the `options` passed to the hook function is used in the actual build process. A copy of `options` is only used as a reference for information acquisition, so directly Modifying it does not really affect the build. To modify the build parameters, please use the `options` of the entry to configure. Due to the numerous interface definitions, you can refer to the `@types/builder.d.ts` file in the build plugin template folder for detailed interface definitions.

A simple example:

```ts
export function onBeforeBuild(options) {
    // Todo some thing...
}
export function onBeforeCompressSettings(options, result) {
    // Todo some thing...
}
```

## Build plugin debugging

Click **Developer —> Open Build Debug Tool** in the menu to debug the plugin script normally.
