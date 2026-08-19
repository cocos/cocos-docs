# Cocos Creator 3.6.0 Build Template and settings.json Upgrade Guide

> This article will introduce Cocos Creator 3.6.0 build templates and settings.json upgrade considerations.

Prior to 3.6, the engine code contained some built-in effect data that could not be removed, which took up a lot of the engine package and slowed down the time to parse the engine code. For most projects, this is a waste of resources.

In the previous version, `application.ejs` and `game.ejs` (`index.ejs` for some platforms) in the build template contained a lot of logical code for the engine startup process, which was more complex and prone to problems during customization, and needed a more easy-to-use and stable customization solution for the engine startup process.

In addition, in the previous version, the main configuration data of the game was stored in `settings.json`, which was not accessible during the game runtime, which was extremely inconvenient for some plugins.

To address these issues, in Cocos Creator 3.6 we refactored the engine startup process and provided a new `settings` configuration module in order to optimize the engine package, better maintain the engine's business code, and provide more room for customization. During the refactoring process, although we wanted to ensure as much compatibility as possible between the previous version of the project build template and settings.json, some aspects of the refactoring introduced some incompatibilities. In these cases, you will need to manually upgrade the project build template with the custom content of the configuration file.

- For **Artists** and **Designers**, all resources in the project, such as scenes, animations, and Prefab, do not need to be modified and do not need to be upgraded.
- For **Programmers** and **Plugin Developers**, the impact is mainly on the custom build templates and `settings.json` in the original project that need to be adapted to the new way.

This section is described in more detail below.

## Cases where manual upgrade is required

- The project has a custom build template with `application.ejs` in it.
- The project has a custom build template with `game.ejs` or `index.ejs`.
- The project has a custom generated `settings.json`.

## Upgrade steps

### Migrate the customized application.ejs to the new template

The `application.ejs` has been changed significantly in v3.6, with two main changes.

#### Provides a simpler definition of the Application type

```js
class Application {
    init (cc: any): Promise<void> | void;
    start(): Promise<void>;
}
```

We provide the definition of an Application like the one above, where we provide two lifecycle callbacks.
- The `init` lifecycle function will be called after the engine code is loaded, the engine module will be passed as a parameter and you can listen for events in the `init` function for the engine start process and execute some custom logic when the corresponding event is triggered.
- The `start` lifecycle function will be called after the `init` function and you need to start and run the engine in the way you want in this function.

Here is the simplest template we have implemented for `application.ejs` with the corresponding explanation.

```js
let cc;
export class Application {
    constructor () {
        this.settingsPath = '<%= settingsJsonPath %>'; // settings.json file path, usually passed in by the editor when building, you can also specify your own path
        this.showFPS = <%= showFPS %>; // Whether or not to open the profiler, usually passed in when the editor is built, but you can also specify the value you want
    }
    
    init (engine) {
        cc = engine;
        cc.game.onPostBaseInitDelegate.add(this.onPostInitBase.bind(this)); // Listening for engine start process events onPostBaseInitDelegate
        cc.game.onPostSubsystemInitDelegate.add(this.onPostSystemInit.bind(this)); // Listening for engine start process events onPostSubsystemInitDelegate
    }

    onPostInitBase () {
        // cc.settings.overrideSettings('assets', 'server', '');
        // Implement some custom logic
    }

    onPostSystemInit () {
        // Implement some custom logic
    }

    start () {
        return cc.game.init({ // Run the engine with the required parameters
            debugMode: <%= debugMode %> ? cc.DebugMode.INFO : cc.DebugMode.ERROR,
            settingsPath: this.settingsPath, // Pass in the settings.json path
            overrideSettings: { // Override part of the data in the configuration file, this field will be described in detail below
                // assets: {
                //      preloadBundles: [{ bundle: 'main', version: 'xxx' }],
                // }
                profiling: {
                    showFPS: this.showFPS,
                }
            }
        }).then(() => cc.game.run());
    }
}
```

- This template listens to events in the `init` function during the engine startup process, and can execute some custom logic when the corresponding event is triggered.
    `game.init` triggers events at various stages during execution, see the API description of `game.init`, where the events at different stages can use different engine capabilities, and the sequence of triggered events is as follows.

    ```
    -PreBaseInitEvent, no engine capability can be used
    -Base module initialization (logging, sys, settings)
    -PostBaseInitEvent, can use the capabilities in the base module
    -PreInfrastructureInitEvent, can use the capabilities in the base module
    -Infrastructure module initialization (assetManager, builtinResMgr, gfxDevice, screen, Layer, macro)
    -PostInfrastructureInitEvent, can use the capabilities in the infrastructure module, infrastructure module
    -PreSubsystemInitEvent, can use the capabilities of the infrastructure module, infrastructure module
    -Subsystem module initialization (animation, physics, tween, ui, middleware, etc.)
    -PostSubsystemInitEvent, can use capabilities from base module, infrastructure module, subsystem module
    -EngineInitedEvent, can use the capabilities of the base module, infrastructure module, subsystem module
    -PreProjectDataInitEvent, which can use the capabilities of the base module, infrastructure module, and subsystem module
    -ProjectDataInit(GamePlayScripts, resources, etc)
    -PostProjectDataInitEvent, which can use capabilities from the base module, infrastructure module, subsystem module, and project data
    -GameInitedEvent, can use all engine capabilities
    ```

- The `start` function is called to initialize and run the engine. You can control the start of the engine by passing in custom parameters when calling `game.init`. Note the `overrideSettings` field, which can be used to override some configuration data in the configuration file to affect the start of the engine. This field will be discussed in detail in the second part.

The new `application.ejs` is much cleaner and more customizable than the previous version, so you can refer to this template to implement your own `application.ejs` and execute your custom logic in it.

#### Engine startup process related logic code migrated to the engine

We have migrated the logic related to the engine startup process from application.ejs to the engine, including the loading of settings.json (`loadSettingsJson`), the loading of js plugins (`loadJsList`), the loading of project bundles (`loadAssetBundle`), etc. ), and so on. So now you **can't directly modify the engine startup process in application.ejs**, but you can override the configuration file with the `overrideSettings` field passed in `game.init` to influence the startup process, and you can also listen to events during the engine startup process and execute some custom logic. The following section describes in detail how the engine startup process customization can be migrated to the new mechanism. If your project has customizations to the engine startup process, please refer to the following upgrade method for migration.

- If you inserted custom code logic at a specific stage of engine startup in an earlier template, for example by making a customization such as:

    ```js
    function start ({
        findCanvas,
    }) {
        let settings;
        let cc;
        return Promise.resolve()
            .then(() => topLevelImport('cc'))
            .then(() => customLogic1()) // Customized Logic 1
            .then((engine) => {
                cc = engine;
                return loadSettingsJson(cc);
            })
            .then(() => customLogic2()) // Customized Logic 2
            .then(() => {
                settings = window._CCSettings;
                return initializeGame(cc, settings, findCanvas)
                    .then(() => {
                        if (settings.scriptPackages) {
                            return loadModulePacks(settings.scriptPackages);
                        }
                    })
                    .then(() => loadJsList(settings.jsList))
                    .then(() => loadAssetBundle(settings.hasResourcesBundle, settings.hasStartSceneBundle))
                    .then(() => {
                        return cc.game.run(() => onGameStarted(cc, settings));
                    });
            }).then(() => customLogic3()); // Customized Logic 3
    }
    ```

    You can implement custom logic in the new `application.ejs` template by listening for events in the engine startup process as described above, e.g.

    ```js
    init (engine) {
        cc = engine;
        cc.game.onPreBaseInitDelegate.add(this.onPreBaseInit.bind(this)); // Listening for engine start process events onPreBaseInitDelegate
        cc.game.onPostBaseInitDelegate.add(this.onPostBaseInit.bind(this)); // Listening for engine start process events onPostBaseInitDelegate
        cc.game.onPostProjectInitDelegate.add(this.onPostProjectInit.bind(this)); // Listening for engine start process events onPostProjectInitDelegate
    }

    onPreBaseInit () {
        customLogic1(); // Customized Logic 1
    }

    onPostBaseInit () {
        customLogic2() // Customized Logic 2
    }

    onPostProjectInit () {
        customLogic3() // Customized Logic 3
    }
    ```

- If you customized the loading of the physical module wasm in the previous template, i.e. the following method in the old template.

    ```js
    <% if (hasPhysicsAmmo) { %>
    promise = promise
        .then(() => topLevelImport('wait-for-ammo-instantiation'))
        .then(({default: waitForAmmoInstantiation}) => {            
            return waitForAmmoInstantiation(fetchWasm(''));
        });
    <% } %>
    ```

    This method has been changed for internal use in the engine. If you need to customize it, please customize the engine and customize the `cocos/physics/bullet/instantiated.ts` content in the engine directory.

- If you customized the loading of settings.json in the previous template, i.e. the `loadSettingsJson` function in the previous template.
    This method has been changed to be used internally by the engine. If you have customizations for this part, please consider it in the following three cases.
    - If you need to customize the path to `settings.json`, you can pass in a custom `settingsPath` path when calling the `game.init` method, e.g:

        ```js
        game.init({ settingsPath: this.mySettingsPath });
        ```

    - If you need to read the contents of settings.json, you can listen to the events after `game.onPostBaseInitDelegate`, where you can safely access the `settings` module in the engine and get the corresponding configuration data through the relevant API of the `settings` module, e.g:

        ```js
        init (engine) {
            cc = engine;
            cc.game.onPostBaseInitDelegate.add(this.onPostBaseInit.bind(this));
        }

        onPostBaseInit () {
            const property = cc.settings.querySettings('MyCustomData', 'MyCustomProperty');
        }
        ```

    - If you need to set the contents of a configuration file, you can override some of the data in the configuration file by passing in the `overrideSettings` field when calling the `game.init` method, or you can call `settings.overrideSettings` in the game's event callback to override the data in the configuration file. thus affecting the engine startup process, e.g:

        ```js
        start () {
            cc.game.init({ 
                overrideSettings: { 
                    'profiling': { 'showFPS': true } 
                }
            });
        }
        ```

        Or

        ```js
        onPostBaseInit () {
            cc.settings.overrideSettings('profiling', 'showFPS', true);
        }
        ```

- If you customized the previous template to load js plugins, i.e. the `loadJsList` function in the previous template.
    This method has been changed for internal use in the engine, so if you need to modify the list of js files to be loaded, you can do so by passing in the `plugin` field of `overrideSettings` when calling `game.init`, e.g:

    ```js
    start () {
        cc.game.init({ 
            overrideSettings: { 
                'plugins': { 'jsList': ['MyCustom.js'] } 
            }
        });
    }
    ```

- If you customized the previous template to load item bundles, i.e. the `loadAssetBundle` function in the previous template.
    This method has been changed for internal use in the engine, so if you need to modify the list of bundles to be loaded, you can do so by passing in the `assets` field of `overrideSettings` when calling `game.init`, e.g:

    ```js
    start () {
        cc.game.init({ 
            overrideSettings: { 
                'assets': { 'preloadBundles': [ 'main', 'resources', 'myBundle' ]}
            }
        });
    }
    ```

- If you customized the initialization of macros and layers in the previous template, i.e. the `initializeGame` function in the previous template.
    This method has been changed for internal use in the engine, so if you need to modify the list of macros and layers, you can do so by passing in the `engine` field of `overrideSettings` when calling `game.init`, e.g:

    ```js
    start () {
        cc.game.init({ 
            overrideSettings: { 
                'engine': { 
                    'macros': {},
                    'customLayers': [],
                }
            }
        });
    }
    ```

- If you customized the loading of the initial scene in the old template, the `onGameStarted` function in the previous template.
    This method has been changed for internal use in the engine, so if you need to modify the initial scene, you can do so by passing in the `launch` field of `overrideSettings` when calling `game.init`, e.g:

    ```js
    start () {
        cc.game.init({ 
            overrideSettings: { 
                'launch': { 'launchScene': 'MyFirstScene' }
            }
        });
    }
    ```

- If you customized the previous template by passing in the `game.init` parameter, i.e. the `getGameOptions` function in the previous template.
    Please refer to the latest `IGameConfig` interface definition and pass that parameter in `game.init`.

### Migration of customized game.ejs or index.ejs to the new template

game.ejs and index.ejs have not changed much compared to previous versions, the main changes are in the following points.
- We migrated the interfaces used by the engine such as `loadJsListFile`, `fetchWasm`, `findCanvas`, etc. to the internal part of the engine. If you have customizations for this part, please customize the engine and modify the contents of pal/env in the engine directory.
- As mentioned in the first part, we have organized the interface definitions for the Application type, and game.ejs and index.ejs as callers of the Application type, so changes have been made in the Application interface calls, for example in some platforms we have changed to the following form:

    ```js
    System.import('<%= applicationJs %>')
    .then(({ Application }) => {
        return new Application();
    }).then((application) => {
        return System.import('cc').then((cc) => {
            return application.init(cc);
        }).then(() => {
            return application.start();
        });
    }).catch((err) => {
        console.error(err.toString() + ', stack: ' + err.stack);
    });
    ```

- We packaged the code used for adaptation on different platforms and merged it into a single js file to reduce the package size, so where the code is run it is instead run as a single js file, e.g:

    ```js
    require('./libs/common/engine/index.js');
    require('./libs/wrapper/engine/index');
    require('./libs/common/cache-manager.js');
    ```

    Changed to:

    ```js
    require('./engine-adapter');
    ```

If you have customizations to game.ejs and index.ejs, simply migrate the customizations to the latest template, with the **note** that if your custom logic relies on **string matches** for insertion, e.g:

```js
const gameTemplateString = readFileSync('game.ejs', 'utf-8');
gameTemplateString = gameTemplateString.replace('require('./libs/common/cache-manager.js');', 'require('./libs/common/cache-manager.js');\nCustomLogic();\n')
```

Then there may be places where the match string fails and you need to insert it under a new template, or you can refer to the first part to customize it in application.ejs, the new application.ejs template is more conducive to customization.

### Migrating customizations to settings.json

In 3.6 we added the `settings` module for in-game access to configuration data, you can add custom data to settings.json and then use the `settings` module to access it at runtime, but to avoid the configuration data between modules affecting each other, we changed the previous one-layer configuration data structure to a ` Category` and `Property`, the following are the specific changes.

Previous versions:

```js
interface Settings {
    CocosEngine: string;
    debug: boolean; // whether debug mode is enabled
    designResolution: ISettingsDesignResolution; // design resolution
    jsList: string[]; // list of js plugins
    launchScene: string; // The first scene
    preloadAssets: string[], // preload resources
    platform: string; // platform name
    renderPipeline: string; // render pipeline
    physics?: IPhysicsConfig; // physics-related configuration
    exactFitScreen: boolean; // whether or not to align the game frame to the screen under web

    bundleVers: Record<string, string>; // bundle version information
    subpackages: string[]; // bundle's subpackage configuration on the mini-game
    remoteBundles: string[]; // list of remote bundles
    server: string; // Address of the remote server
    hasResourcesBundle: boolean; // whether the resources bundle exists
    hasStartSceneBundle: boolean; // if the first scene bundle exists

    scriptPackages?: string[]; // internal fields used by the engine
    splashScreen?: ISplashSetting; // SplashScreen related configuration

    customJointTextureLayouts?: ICustomJointTextureLayout[]; // JointTextureLayout related configuration

    macros?: Record<string, any>; // cc.macros related configuration
    engineModules: string[]; // engine modules, used in the preview
    customLayers: {name: string, bit: number}[]; // custom layer related configuration
    orientation?: IOrientation; // screen rotation direction
}
```

New version of Settings.json file format is as follows:

```ts
interface Settings {
    CocosEngine: string;
    engine: {
        debug: boolean;
        macros: Record<string, any>;
        customLayers: {name: string, bit: number}[];
        platform: string;
        engineModules?: string[];
        builtinAssets: string[];
    };
    physics?: IPhysicsConfig;
    rendering: {
        renderPipeline: string;
        renderMode?: number;
    };
    assets: {
        server: string;
        remoteBundles: string[];
        bundleVers: Record<string, string>;
        preloadBundles: { bundle: string, version?: string }[];
        importBase?: string;
        nativeBase?: string;
        subpackages: string[];
        preloadAssets: string[];
        jsbDownloaderMaxTasks?: number;
        jsbDownloaderTimeout?: number;
    };
    plugins: {
        jsList: string[];
    };
    scripting: {
        scriptPackages?: string[];
    };
    launch: {
        launchScene: string;
    };
    screen: {
        frameRate?: number;
        exactFitScreen: boolean;
        orientation?: IOrientation;
        designResolution: ISettingsDesignResolution;
    };
    splashScreen?: ISplashSetting;
    animation: {
        customJointTextureLayouts?: ICustomJointTextureLayout[];
    };
    profiling?: {
        showFPS: boolean;
    };
}
```

The fields have remained almost one-to-one with the previous version, except that they have been migrated to a specific `Category`. A few fields have changed slightly.

- A new frameRate field under screen has been added to set the target update frequency
- Added a new showFPS field under profiling to control whether to turn on the statistics display in the lower left corner
- The original hasResourcesBundle and hasStartSceneBundle fields have been removed and are now controlled by the preloadBundles field under assets.
- Added jsbDownloaderMaxTasks, jsbDownloaderTimeout fields under assets to control the number of concurrent downloads and timeout of resources in the native environment.

If you have customized the data fields in settings.json, you need to refer to the new format and migrate the customizations to the new format. If you have custom configuration fields, we recommend that you place the custom configuration data under a custom `Category` to avoid conflicts with other modules' data, e.g:

```ts
interface MyCustomSettings extends Settings {
    'customSettings': {
        'someProperty': string;
    };
}
```

-------------------------
If you encounter any problems during the upgrade process, please feel free to visit [Cocos Creator Forum](https://forum.cocos.org/) or [GitHub](https://github.com/cocos/cocos-) engine/discussions), thank you!
