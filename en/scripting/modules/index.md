# Modules

Engines and editors expose their functionality through API interfaces and modules that exist in the form of **ECMAScript** modules.

> **Note**: starting from 3.0, engine functions cannot be accessed through the global variable, prefixed with `cc`!

## Engine Module

Currently, the engine only provides a public module prefixed with `'cc'`.

The content of the `'cc'` module is dynamic, and its content is related to the setting of **engine module** in **Project Settings**.

### Engine log output

Examples are as follows:

```ts
import {log} from'cc';
log(`Hello world!`);
```

## Editor Module

The editor modules are all under the `'cce:'` protocol (**cce** stands for "**C**ocos**C**reator**E**ditor").

With the only exception being `'cce.env'`, all editor modules are only available in the editor environment. For example, the editor module cannot be accessed in the preview and build environment, on the contrary, it can be accessed in the **scene editor**.

| Module name | Description |
| :---------- | :-------------- |
| `'cce.env'` | Used to access build-time constants |
<!--
| `'cce:gizmo'` | Gizmo |
-->

### Build time constant

The editor module, `'cce.env'`, exposes some **constants** at build time. These constants represent the execution environment, debugging level, or platform identification. Unlike other editor modules, `'cce.env'` allows access in a non-editor environment.

As these constants are declared with `const`, it provides a good opportunity for code optimization.

#### Execution environment

| Name (all types are `boolean`) | Description |
| :-------- | :------------------- |
| `BUILD` | Is it running after build |
| `PREVIEW` | Is it running in preview |
| `EDITOR` | Is it running in the editor |

#### Debug level

| Name (all types are `boolean`) | Description |
| :------ | :------ |
| `DEBUG` | Whether it is in debug mode. It is `false` only when the debug option is not checked when building, and it is `true` in all other cases |
| `DEV` | Equivalent to `DEBUG`/`EDITOR`/`PREVIEW` |

#### Platform ID

The constants listed in the following table represent whether it is running on **a** or **a type** platform, and the type is all `boolean`.
<!-- Please sort the following table lexicographically -->

| Name | Representative platform | `MINIGAME` "mini game" | `RUNTIME_BASED` based on Cocos Runtime | `SUPPORT_JIT` supports JIT |
| :---------- | :---------- | :----------------- | :----- ------------ | :----------------- |
| `HTML5` | Web | ❌ | ❌ | ❌ |
| `NATIVE` | Native platform | ❌ | ❌ | ❌ |
| `ALIPAY` | Alipay game | ✔️ | ❌ | ✔️ |
| `BAIDU` | Baidu Mini Games | ✔️ | ❌ | ✔️ |
| `BYTEDANCE` | Bytedance game | ✔️ | ❌ | ✔️ |
| `WECHAT` | WeChat Mini Game | ✔️ | ❌ | ✔️ |
| `XIAOMI` | Mi Games | ✔️ | ❌ | ✔️ |
| `COCOSPLAY` | Cocos Play | ❌ | ✔️ | ✔️ |
| `HUAWEI` | Huawei Quick Game | ❌ | ✔️ | ✔️ |
| `OPPO` | OPPO Quick Game | ❌ | ✔️ | ✔️ |
| `VIVO` | vivo fast game | ❌ | ✔️ | ✔️ |

#### Outputting in debug mode

Examples are as follows:

```ts
import {log} from'cc';
import {DEV} from'cce.env';

if (DEV) {
    log(`I'm in development mode!`);
}
```