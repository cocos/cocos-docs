# Modules

The engine expose functional interfaces to developers via modules, which exist as **ECMAScript** modules.

> **Note**: from v3.0, it is strongly recommended not to use the global variable `cc` to access engine modules or classes.

## Engine Modules

### Function

The module `'cc'` provides access to all engine functions. The contents of module `'cc'` are dynamic and are related to the **Feature Cropping** setting in **Project Setting**.

#### Engine Log Output

Example:

```ts
import { log } from 'cc';
log('Hello world!');
```

### Build-Time Constants

The engine module `'cc/env'` exposes a number of build-time **constants** that represent the execution environment, debug level, or platform identifier, etc.

As these constants are declared with `const`, they provide good opportunities for code optimization.

#### Execution Environment

| Name (all of type `boolean`) | Description |
| :-------- | :------------------- |
| `BUILD` | Whether it is running in the post-build environment |
| `PREVIEW` | Whether it is running in the preview environment |
| `EDITOR` | Whether it running in the editor environment |

#### Debug Level

| Name (all of type `boolean`) | Description |
| :------ | :------ |
| `DEBUG` | Whether it is in debug mode. Only `false` if the debug option is unchecked at build time, but `true` in all other cases.
| `DEV` | Equivalent to `DEBUG`/`EDITOR`/`PREVIEW` |

#### Platform Identifier

The constants in the following table indicate whether the application is running on **a particular** or **a class of** platforms, and are all of type `boolean`.
<!-- Please sort the table below in dictionary order -->

| Name | Platform | `MINIGAME` | `RUNTIME_BASED` | `SUPPORT_JIT` |
| :---------- | :---------- | :----------------- | :----------------- | :----------------- |
| `HTML5` | Web | ❌ | ❌ | ❌ |
| `NATIVE` | Native Platforms | ❌ | ❌ | ❌ |
| `ALIPAY` | Alipay Mini Game | ✔️ | ❌ | ✔️ |
| `BAIDU` | Baidu Mini Game | ✔️ | ❌ | ✔️ |
| `BYTEDANCE` | ByteDance Mini Game | ✔️ | ❌ | ✔️ |
| `WECHAT` | WeChat Mini Gamee | ✔️ | ❌ | ✔️ |
| `XIAOMI` | Xiaomi Quick Game | ✔️ | ❌ | ✔️ |
| `COCOSPLAY` | Cocos Play | ❌ | ✔️ | ✔️ |
| `HUAWEI` | Huawei Quick Game | ❌ | ✔️ | ✔️ |
| `OPPO` | OPPO Mini Game | ❌ | ✔️ | ✔️ |
| `VIVO` | vivo Mini Game | ❌ | ✔️ | ✔️ |

#### Output in Debug Mode

Examples are as follows:

```ts
import { log } from 'cc';
import { DEV } from 'cc/env';

if (DEV) {
    log('I am in development mode!');
}
```

<!--
## Editor Modules

The editor modules are all under the `'cce:'` protocol ("cce" stands for "**C**ocos**C**reator**E**ditor").

All editor modules are valid only in the editor environment. For example, the editor module is not accessible in the preview and post-build environments, but in contrast, it is accessible in the **Scene** panel.

| Module name | for |
|---------------|----------------|
| `'cce:gizmo'` | Gizmo |
-->
