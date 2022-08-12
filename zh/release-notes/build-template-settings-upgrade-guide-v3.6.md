# Cocos Creator 3.6.0 构建模板与 settings.json 升级指南

> 本文将介绍 Cocos Creator 3.6.0 构建模板与 settings.json 升级注意事项

在 3.6 版本之前，引擎的代码中都包含了一部分无法被剔除的内置 effect 的数据，这部分数据极大的占用了引擎的包体与拖慢了解析引擎代码的时间。对于大部分项目来说是一种资源浪费。 

在之前版本中，构建模板中的 `application.ejs` 与 `game.ejs`(某些平台是 `index.ejs`) 中包含了不少引擎启动流程的逻辑代码，这部分逻辑代码较为复杂，定制过程中容易出现问题，需要更加易用与稳定的引擎启动流程的定制方案。

此外，在之前版本中，游戏的主要配置数据存储在 `settings.json` 中, 在游戏运行过程中无法访问这部分数据，对于一些插件来说是极不方便的。

针对以上几个问题，我们在 Cocos Creator 3.6 中，为了优化引擎包体，更好地维护引擎的业务代码，同时能够提供更多的定制空间，我们重构了引擎的启动流程并提供了一个新的 `settings` 配置模块 。在重构的过程中，虽然我们希望能尽可能地保证之前版本项目构建模板与 settings.json 的兼容性，但是某些方面还是引入了一些无法兼容的情况。在这些情况下，你需要手动升级项目构建模板与配置文件的定制内容。

- 对 **美术策划** 而言，项目中的所有资源，例如场景、动画、Prefab 都不需要修改，也不需要升级。
- 对 **程序** 与 **插件开发者** 而言，影响主要体现在原先项目中定制的构建模板和 `settings.json` 需要调整为新的方式。

以下将详细介绍这部分内容。

## 需要手动升级的情况

- 你在项目中有定制过构建模板中的 `application.ejs`。
- 你在项目中有定制过构建模板中的 `game.ejs` 或 `index.ejs`。
- 你在项目中有定制过生成后的 `settings.json`。

## 升级步骤

### 将定制过的 application.ejs 迁移到新的模板上

application.ejs 在 v3.6 版本中改动较大，主要有以下两个方面的改动：

#### 提供了一个更加简单的 Application 类型的定义

```
class Application {
    init (cc: any): Promise<void> | void;
    start(): Promise<void>;
}
```
我们提供了形如以上的 Application 的定义，我们在其中提供了两个生命周期回调：
- `init` 生命周期函数会在引擎代码加载后被调用，引擎模块将作为参数传入，你可以在 `init` 函数中监听引擎启动流程的事件，并在对应事件触发时，执行一些定制逻辑。
- `start` 生命周期函数会在 `init` 函数后被调用，你需要在此函数中以你需要的方式启动并运行引擎。

下面是我们实现的一份最简单的 `application.ejs` 的模板与其对应的解释:
```
let cc;
export class Application {
    constructor () {
        this.settingsPath = '<%= settingsJsonPath %>'; // settings.json 文件路径，通常由编辑器构建时传入，你也可以指定自己的路径
        this.showFPS = <%= showFPS %>; // 是否打开 profiler, 通常由编辑器构建时传入，你也可以指定你需要的值
    }
    
    init (engine) {
        cc = engine;
        cc.game.onPostBaseInitDelegate.add(this.onPostInitBase.bind(this)); // 监听引擎启动流程事件 onPostBaseInitDelegate
        cc.game.onPostSubsystemInitDelegate.add(this.onPostSystemInit.bind(this)); // 监听引擎启动流程事件 onPostSubsystemInitDelegate
    }

    onPostInitBase () {
        // cc.settings.overrideSettings('assets', 'server', '');
        // 实现一些自定义的逻辑
    }

    onPostSystemInit () {
        // 实现一些自定义的逻辑
    }

    start () {
        return cc.game.init({ // 以需要的参数运行引擎
            debugMode: <%= debugMode %> ? cc.DebugMode.INFO : cc.DebugMode.ERROR,
            settingsPath: this.settingsPath, // 传入 settings.json 路径
            overrideSettings: { // 对配置文件中的部分数据进行覆盖，第二部分会详细介绍这个字段
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
- 此模板中在 `init` 函数中监听了引擎启动流程中的事件，可以在对应事件触发时执行一些自定义逻辑。
`game.init` 在执行过程中会触发各个阶段的事件，可参考 `game.init` 的 API 说明，其中不同的阶段的事件可以使用不同的引擎能力，触发的事件顺序如下所示：
    ```
    -PreBaseInitEvent，不可以使用任何引擎能力
    -基础模块初始化(logging, sys, settings)
    -PostBaseInitEvent，可使用基础模块中的能力
    -PreInfrastructureInitEvent，可使用基础模块中的能力
    -基础设施模块的初始化(assetManager, builtinResMgr, gfxDevice, screen, Layer, macro)
    -PostInfrastructureInitEvent，可使用基础模块，基础设施模块中的能力
    -PreSubsystemInitEvent，可使用基础模块，基础设施模块中的能力
    -子系统模块初始化(animation, physics, tween, ui, middleware 等)
    -PostSubsystemInitEvent，可使用基础模块，基础设施模块，子系统模块中的能力
    -EngineInitedEvent，可使用基础模块，基础设施模块，子系统模块中的能力
    -PreProjectDataInitEvent，可使用基础模块，基础设施模块，子系统模块中的能力
    -项目数据初始化(GamePlayScripts, resources, etc)
    -PostProjectDataInitEvent，可使用基础模块，基础设施模块，子系统模块，项目数据中的能力
    -GameInitedEvent，可使用引擎所有能力
    ```

- `start` 函数中调用了引擎的初始化与运行。你可以通过在调用 `game.init` 时传入自定义的参数来控制引擎的启动。需要注意的是其中的 `overrideSettings` 字段，此字段可用于覆盖配置文件中的一些配置数据，从而影响引擎的启动。第二部分将详细说到此字段。

新的 `application.ejs` 比之前版本更加简洁和易定制，你可以参考此模板实现你自己的 `application.ejs` 并在其中执行你的自定义逻辑。

#### 引擎启动流程相关的逻辑代码迁移到了引擎中

我们将之前在 application.ejs 中与引擎启动相关的逻辑迁移到了引擎中，包括 settings.json 的加载(`loadSettingsJson`)，js 插件的加载(`loadJsList`)，项目 bundle 的加载(`loadAssetBundle`)等等。所以现在你**无法在 application.ejs 直接修改引擎启动流程**，但你可以通过 `game.init` 中传入的 `overrideSettings` 字段来覆盖配置文件，从而影响启动流程，另外你也可以监听引擎启动过程中的事件，并执行一些自定义逻辑。下面将详细介绍引擎的启动流程定制如何迁移到新的机制上。如果你的项目有对引擎启动流程进行定制，请参考以下升级方法进行迁移：

- 如果你在老的模板中引擎启动的特定阶段插入了自定义的代码逻辑，例如做了如下定制：
    ```
    function start ({
        findCanvas,
    }) {
        let settings;
        let cc;
        return Promise.resolve()
            .then(() => topLevelImport('cc'))
            .then(() => customLogic1()) // 自定义逻辑 1
            .then((engine) => {
                cc = engine;
                return loadSettingsJson(cc);
            })
            .then(() => customLogic2()) // 自定义逻辑 2
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
            }).then(() => customLogic3()); // 自定义逻辑 3
    }
    ```
    你可以在新的 application.ejs 模板中通过上述所说的监听引擎启动流程中的事件来实现自定义逻辑，例如：
    ```
    init (engine) {
        cc = engine;
        cc.game.onPreBaseInitDelegate.add(this.onPreBaseInit.bind(this)); // 监听引擎启动流程事件 onPreBaseInitDelegate
        cc.game.onPostBaseInitDelegate.add(this.onPostBaseInit.bind(this)); // 监听引擎启动流程事件 onPostBaseInitDelegate
        cc.game.onPostProjectInitDelegate.add(this.onPostProjectInit.bind(this)); // 监听引擎启动流程事件 onPostProjectInitDelegate
    }

    onPreBaseInit () {
        customLogic1(); // 自定义逻辑 1
    }

    onPostBaseInit () {
        customLogic2() // 自定义逻辑 2
    }

    onPostProjectInit () {
        customLogic3() // 自定义逻辑 3
    }
    ```
    
- 如果你在老的模板中定制了物理模块 wasm 的加载，即老模板中的下面这个方法。
    ```
    <% if (hasPhysicsAmmo) { %>
    promise = promise
        .then(() => topLevelImport('wait-for-ammo-instantiation'))
        .then(({default: waitForAmmoInstantiation}) => {            
            return waitForAmmoInstantiation(fetchWasm(''));
        });
    <% } %>
    ```
    此方法已改为引擎内部使用，如果需要定制，请自定义引擎，并定制引擎目录下的 cocos/physics/bullet/instantiated.ts 内容。

- 如果你在老的模板中定制了 settings.json 的加载, 即老模板中的 `loadSettingsJson` 函数。
    此方法已改为引擎内部使用，如果你对这部分存在定制，请分为以下三种情况考虑：
    - 如果你需要定制 `settings.json` 的路径，你可以在调用 `game.init` 方式时传入自定义的 `settingsPath` 路径，例如：
        ```
        game.init({ settingsPath: this.mySettingsPath });
        ```
    - 如果你需要读取 settings.json 中的内容，你可以监听 `game.onPostBaseInitDelegate` 之后的事件，这些事件中你都可以安全的访问引擎中的 `settings` 模块，并通过 `settings` 模块的相关 API 获取对应配置数据，例如：
        ```
        init (engine) {
            cc = engine;
            cc.game.onPostBaseInitDelegate.add(this.onPostBaseInit.bind(this));
        }

        onPostBaseInit () {
            const property = cc.settings.querySettings('MyCustomData', 'MyCustomProperty');
        }
        ```
    - 如果你需要设置配置文件中的内容，你可以通过在调用 `game.init` 方法时传入 `overrideSettings` 字段来覆盖一些配置文件中的数据，也可以在 game 的事件回调中去调用 `settings.overrideSettings` 覆盖配置文件中的数据，从而影响引擎启动流程，例如：
        ```
        start () {
            cc.game.init({ 
                overrideSettings: { 
                    'profiling': { 'showFPS': true } 
                }
            });
        }
        ```
        或
        ```
        onPostBaseInit () {
            cc.settings.overrideSettings('profiling', 'showFPS', true);
        }
        ```

- 如果你在老的模板中定制了加载 js 插件, 即老模板中的 `loadJsList` 函数。
    此方法已改为引擎内部使用，如果你需要修改要加载的 js 文件列表，你可以通过在调用 `game.init` 时传入 `overrideSettings` 的 `plugin` 字段来修改，例如：
    ```
    start () {
        cc.game.init({ 
            overrideSettings: { 
                'plugins': { 'jsList': ['MyCustom.js'] } 
            }
        });
    }
    ```

- 如果你在老的模板中定制了加载项目 Bundle， 即老模板中的 `loadAssetBundle` 函数。
    此方法已改为引擎内部使用，如果你需要修改要加载的 bundle 列表，你可以通过在调用 `game.init` 时传入 `overrideSettings` 的 `assets` 字段来修改，例如：
    ```
    start () {
        cc.game.init({ 
            overrideSettings: { 
                'assets': { 'preloadBundles': [ 'main', 'resources', 'myBundle' ]}
            }
        });
    }
    ```
- 如果你在老的模板中定制了 macros 与 layer 的初始化， 即老模板中的`initializeGame` 函数。
    此方法已改为引擎内部使用，如果你需要修改 macros 与 layer 的列表，你可以通过在调用 `game.init` 时传入 `overrideSettings` 的 `engine` 字段来修改，例如：
    ```
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
- 如果你在老的模板中定制了初始场景的加载， 即老模板中的 `onGameStarted` 函数。
    此方法已改为引擎内部使用，如果你需要修改初始场景，你可以通过在调用 `game.init` 时传入 `overrideSettings` 的 `launch` 字段来修改，例如：
    ```
    start () {
        cc.game.init({ 
            overrideSettings: { 
                'launch': { 'launchScene': 'MyFirstScene' }
            }
        });
    }
    ```
- 如果你在老的模板中定制了传入 `game.init` 的参数， 即老模板中的 `getGameOptions` 函数。
    请参考最新的 `IGameConfig` 接口定义，并在 `game.init` 时传入该参数。

### 将定制过的 game.ejs 或 index.ejs 迁移到新模板上

game.ejs 与 index.ejs 相较于之前版本没有太大变化，主要变化体现在以下几个点：
* 我们将 `loadJsListFile`, `fetchWasm`, `findCanvas` 等引擎使用的接口迁移到了引擎内部，如果你对这部分内容存在定制，请自定义引擎，并修改引擎目录下的 pal/env 的内容。
* 正如第一部分所说，我们整理了 Application 类型的接口定义，而 game.ejs 与 index.ejs 作为 Application 类型的调用者，所以在 Application 接口调用的地方也发生了变化，比如在某些平台我们改成了如下形式：

    ```
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

* 我们将不同平台上用于适配的代码进行了打包，合并成了单个 js 文件以减少包体，所以在运行代码的地方改为只运行一个 js 文件，例如：
    ```
    require('./libs/common/engine/index.js');
    require('./libs/wrapper/engine/index');
    require('./libs/common/cache-manager.js');
    ```
    改为了
    ```
    require('./engine-adapter');
    ```

如果你对 game.ejs 与 index.ejs 存在定制的话，只需要将定制迁移到最新的模板上即可，需要**注意**的是如果你的自定义逻辑依赖于**字符串的匹配**进行插入，例如:
```
const gameTemplateString = readFileSync('game.ejs', 'utf-8');
gameTemplateString = gameTemplateString.replace('require('./libs/common/cache-manager.js');', 'require('./libs/common/cache-manager.js');\nCustomLogic();\n')
```
则有可能出现匹配字符串失败的地方，你需要在新的模板下进行插入，或者你可以参考第一部分在 application.ejs 中进行定制，新的 application.ejs 模板更加利于定制。

### 迁移对 settings.json 的定制

我们在 3.6 中增加了 `settings` 模块用于在游戏中对配置数据进行访问，你可以在 settings.json 中增加自定义数据，然后在运行时使用 `settings` 模块进行访问，但为了避免模块之间的配置数据互相影响，我们将之前只有一层的配置数据结构，改为了 `Category` 与 `Property` 的两层结构，下面是具体的变化：

之前版本：
```
interface Settings {
    CocosEngine: string;
    debug: boolean; // 是否是 debug 模式
    designResolution: ISettingsDesignResolution; // 设计分辨率
    jsList: string[]; // js 插件列表
    launchScene: string; // 首场景
    preloadAssets: string[], // 预加载资源
    platform: string; // 平台名称
    renderPipeline: string; // 渲染管线
    physics?: IPhysicsConfig; // 物理相关配置
    exactFitScreen: boolean; // 在 web 下是否让游戏外框对齐到屏幕上

    bundleVers: Record<string, string>; // bundle 版本信息
    subpackages: string[]; // bundle 在小游戏上的子包配置
    remoteBundles: string[]; // 远程 bundle 的列表
    server: string; // 远程服务器地址
    hasResourcesBundle: boolean; // 是否存在 resources 包
    hasStartSceneBundle: boolean; // 是否存在首场景分包

    scriptPackages?: string[]; // 引擎内部使用字段
    splashScreen?: ISplashSetting; // SplashScreen 相关配置

    customJointTextureLayouts?: ICustomJointTextureLayout[]; // JointTextureLayout 相关的配置

    macros?: Record<string, any>; // cc.macros 相关配置
    engineModules: string[]; // 引擎模块，预览时使用
    customLayers: {name: string, bit: number}[]; // 自定义 layer 的相关配置
    orientation?: IOrientation; // 屏幕旋转方向
}
```

新版本的 Settings.json 文件格式：

```
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

字段与之前版本几乎保持了一一对应的关系，只是迁移到了某个具体的 `Category` 下。有几个字段略有变化：

* 新增 screen 下的 frameRate 字段用于设置目标更新频率
* 新增 profiling 下的 showFPS 字段用于控制是否开启左下角的统计数据显示
* 移除了原先的 hasResourcesBundle 与 hasStartSceneBundle 字段，改为统一由 assets 下的 preloadBundles 字段控制
* 新增 assets 下的 jsbDownloaderMaxTasks, jsbDownloaderTimeout 字段用于控制原生环境下资源的下载并发数与超时时间。

如果你对 settings.json 中的原有数据字段有所定制的话，你需要参考新的格式，将定制内容迁移到新的格式上。如果你有自定义的配置字段，我们建议你将自定义的配置数据放到一个自定的 `Category` 下，避免与其他模块的数据发生冲突，例如：
```
interface MyCustomSettings extends Settings {
    'customSettings': {
        'someProperty': string;
    };
}
```

-------------------------
以上就是 3.6 版本构建模板与 settings.json 的升级说明，如果在升级过程中遇到问题，欢迎到 Cocos 的官方社区，github 中向我们反馈，感谢！