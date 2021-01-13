# Extended build process

To build a platform plug-in a common editor plug-in format is required. For the basic structure of the plug-in, please refer to the [Package Plug-in System](../extension/install.md) documentation . To extend the build function, it is necessary to understand the overall process of the build. Please read the [Introduction to the build process and FAQ guide](./build-guide.md) documentation.

## Quick start

1. Click **Project -> Generate Build Plug-in Template** in the menu in the editor, and select a folder to generate a build plugin template in the corresponding location. The build plugin used as a project can select the `packages/xxx` path under the project. As a global build plugin, select the `packages/xxx` path under the global plugin directory. This example uses the `packages` directly under the project as a test.

2. After selecting the corresponding folder, if it is generated normally, the log with successful template generation is printed on the console. Use **Ctrl + mouse** to jump directly to the corresponding location.

3. After the folder is directly placed in packages under the project directory, click in the menu to open the plug-in manager, and click refresh on the project page to see the newly added plug-ins. At this point, click the **Enable** button to enable the plug-in.

    ![enable-plugin](./custom-project-build-template/enable-plugin.png)

4. After enabling the plug-in, open the build plug-in panel, select the `Web-Mobile` platform, you can see the new parameters injected by the build plug-in, and click **build** to take effect.

    ![plugin-template](./custom-project-build-template/plugin-template.png)

5. Modify the code in the folder directly, compile it, and then reload the plug-in. The example is a small example compiled with Typescript. If you don't know how to compile, please refer to the `readme` document in the plugin package.

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

```ts
export const configs: IConfigs = {
    'web-mobile': {
        hooks: './hooks',
        options: {
            remoteAddress: {
                label: 'i18n:xxx',
                render: {
                    ui: 'input',
                    attributes: {
                        placeholder: 'Enter remote address...',
                    },
                },
                verifyRules: ['require', 'http'],
            },
        },
    },
};
```

> **Notes**: The environment variables in different processes will be different, pay extra attention when writing scripts:
  > 1. If the platform key is added with `*`, it will take effect for all platforms. However, using `*` is mutually exclusive with the specified platform name. Do not use both configuration methods in the same build plugin.
  > 2. The script passed in the `hooks` field will be executed during the build process.
  > 3. The script passed in the `panel` field will be executed in the rendering process.

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

    // Compile the generated hook function (only valid when the platform is built with a "generation" process)
    onBeforeMake?: (root: string, options: IBuildTaskOptions) => void;
    onAfterMake?: (root: string, options: IBuildTaskOptions) => void;
}
type IBaseHooks = (options: IBuildTaskOptions, result?: IBuildResult) => void;
```

> **Note**: the `result` parameter can be accessed at the beginning of `onBeforeCompressSettings`, and the `options` passed to the hook function is used in the actual build process. A copy of `options` is only used as a reference for information acquisition, so directly Modifying it does not really affect the build. To modify the build parameters, please use the `options` of the entry to configure. Due to the numerous interface definitions, you can refer to the `@types/builder.d.ts` file in the build plugin template folder for detailed interface definitions.

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
