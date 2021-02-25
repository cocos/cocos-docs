# Modules

The engine and editor expose their APIs to developers through modules, which exist as **ECMAScript** modules.

> **Note**: starting from 3.0, engine functions cannot be accessed through the global variable, prefixed with `cc`!

## Engine Module

### Functionality

Module `'cc'` provide access to engine functionalities. The content of the `'cc'` module is dynamic, and its content is related to the setting of **Feature crop** in **Project Settings**.

#### Engine logging

An example is shown below:

```ts
import { log } from 'cc';
log('Hello world!');
```

### Constants at build time

The engine module `'cc/env'` exposes some **constants** at build time. These constants represent the execution environment, debug level, or platform identification.

As these constants are declared with `const`, it provides a good opportunity for code optimization.

#### Execution environment

| Name (all types are `boolean`) | Description |
| :-------- | :------------------- |
| `BUILD` | Is it running in the built environment. |
| `PREVIEW` | Is it running in the preview environment. |
| `EDITOR` | Is it running in the editor environment. |

#### Debug level

| Name (all types are `boolean`) | Description |
| :------ | :------ |
| `DEBUG` | Whether it is in debug mode. It is `false` only when the debug option is not checked when building, and it is `true` in all other cases |
| `DEV`   | Equivalent to `DEBUG`/`EDITOR`/`PREVIEW` |

#### Platform identification

The constants listed in the following table represent whether it is running on a particular platform or class of platforms, and all types of these constants are `boolean`.
<!-- Please sort the following table lexicographically -->

| Name        | Platform            | `MINIGAME` mini game | `RUNTIME_BASED` based on Cocos Runtime | `SUPPORT_JIT` JIT is supported |
| :---------- | :------------------ | :------------------- | :------------------- | :------------------- |
| `HTML5`     | Web                 | ❌                   | ❌                    | ❌                   |
| `NATIVE`    | Native platforms    | ❌                   | ❌                    | ❌                   |
| `ALIPAY`    | Alipay Mini Game    | ✔️                   | ❌                    | ✔️                    |
| `BAIDU`     | Baidu Mini Game     | ✔️                   | ❌                    | ✔️                    |
| `BYTEDANCE` | Bytedance Mini Game | ✔️                   | ❌                    | ✔️                    |
| `WECHAT`    | WeChat Mini Game    | ✔️                   | ❌                    | ✔️                    |
| `XIAOMI`    | Xiaomi Quick Game   | ✔️                   | ❌                    | ✔️                    |
| `COCOSPLAY` | Cocos Play          | ❌                   | ✔️                     | ✔️                    |
| `HUAWEI`    | Huawei Quick Game   | ❌                   | ✔️                     | ✔️                    |
| `OPPO`      | OPPO Mini Game      | ❌                   | ✔️                     | ✔️                    |
| `VIVO`      | vivo Mini Game      | ❌                   | ✔️                     | ✔️                    |

#### Logging in debug mode

An example is shown below:

```ts
import { log } from 'cc';
import { DEV } from 'cc/env';

if (DEV) {
    log('I am in development mode!');
}
```

## Editor Modules

The editor modules are all under the `'cce:'` protocol (**cce** stands for "**C**ocos**C**reator**E**ditor").

All editor modules are only available in the editor environment. For example, the editor module cannot be accessed in the environment after previewing and building, on the contrary, it can be accessed in the **Scene** panel.

<!--
| Module name | Use for                        |
|-------------|--------------------------------|
| `'cce:gizmo'` | Gizmo                          |
-->
