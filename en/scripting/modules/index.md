# Modules

The engine and editor expose their APIs to developers through modules, which exist as **ECMAScript** modules.

> **Note**: starting from 3.0, engine functions cannot be accessed through the global variable, prefixed with `cc`!

## Engine Module

Currently, the engine only provides a public module prefixed with `'cc'`.

The content of the `'cc'` module is dynamic, and its content is related to the setting of **Feature crop** in **Project Settings**.

### Engine log output

An example is shown below:

```ts
import { log } from 'cc';
log('Hello world!');
```

## Editor Modules

The editor modules are all under the `'cce:'` protocol (**cce** stands for "**C**ocos**C**reator**E**ditor").

All editor modules are only available in the editor environment, except for the `cce.env` module. For example, the editor module cannot be accessed in the environment after previewing and building, on the contrary, it can be accessed in the **Scene** panel.

| Module name | Description |
| :---------- | :-------------- |
| `'cce.env'` | Used to access build-time constants |
<!--
| `'cce:gizmo'` | Gizmo |
-->

### Constants at build time

The `'cce.env'` editor module exposes some **constants** at build time. These constants represent the execution environment, debug level, or platform identification. Unlike other editor modules, `'cce.env'` allows access in a non-editor environment.

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

The constants listed in the following table represent whether it is running on a particular platform or class of platforms, and all types are boolean.
<!-- Please sort the following table lexicographically -->

| Name | Representative platform | `MINIGAME` "mini game" | `RUNTIME_BASED` based on Cocos Runtime | `SUPPORT_JIT` supports JIT |
| :---------- | :---------- | :----------------- | :----------------- | :----------------- |
| `HTML5`     | Web | ❌ | ❌ | ❌ |
| `NATIVE`    | Native platforms    | ❌ | ❌ | ❌ |
| `ALIPAY`    | Alipay Mini game    | ✔️ | ❌ | ✔️ |
| `BAIDU`     | Baidu Mini Games    | ✔️ | ❌ | ✔️ |
| `BYTEDANCE` | Bytedance Mini game | ✔️ | ❌ | ✔️ |
| `WECHAT`    | WeChat Mini Game    | ✔️ | ❌ | ✔️ |
| `XIAOMI`    | XiaoMi Mini Game    | ✔️ | ❌ | ✔️ |
| `COCOSPLAY` | Cocos Play          | ❌ | ✔️ | ✔️ |
| `HUAWEI`    | Huawei Quick Game   | ❌ | ✔️ | ✔️ |
| `OPPO`      | OPPO Mini Game      | ❌ | ✔️ | ✔️ |
| `VIVO`      | vivo Mini game      | ❌ | ✔️ | ✔️ |

#### Outputting in debug mode

An example is shown below:

```ts
import { log } from 'cc';
import { DEV } from 'cce.env';

if (DEV) {
    log('I am in development mode!');
}
```
