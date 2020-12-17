# Module

Engine and editor expose their functionalities API through modules. Modules are in form of ECMAScript module format.

⚠️ Note, starting from 3.0, you can not access API through global variable `cc`!

## Engine modules

### Functionalities

<<<<<<< HEAD
Module `'cc'` provide access to engine functionalities. Contents of module `'cc'` are dynamically decided,
which is relevant with engine modules setting in project settings.

#### Example: engine logging
=======
Contents of module `'cc'` are dynamically decided, which is relevant with **Engine Module** setting in **Project Setting** panel.

### Engine logging

Example:
>>>>>>> 7f1bcd3f4b0a4361a61c837d690ef0efb8cb5958

```ts
import { log } from 'cc';
log(`Hello world!`);
```

<<<<<<< HEAD
=======
## Editor modules

Editor modules are under protocol `'cce:'` ("cce" is abbreviation of "**C**ocos**C**reator**E**ditor").

Except for module `cce.env`, all modules are visible only under editor environments. For example, they are not visible from previewing and after building. Instead, they are visible from scene editor.

| Module name | Description                    |
| :---------- | :----------------------------- |
| `'cce.env'` | Accessing build-time constants |
<!--
| `'cce:gizmo'` | Gizmo                          |
-->

>>>>>>> 7f1bcd3f4b0a4361a61c837d690ef0efb8cb5958
### Build-time constants

Module `'cc/env'` exposes some **constants** that are came from building environment. These constants may present execution environment, debugging level, platform identification and so on.

Since these constants are declared with `const` qualifier, it's very friendly to code optimization.

#### Execution environment

| Name (all in type of `boolean`) | Description   |
| :-------- | :--------------------------------- |
| `BUILD`   | Is executing after building        |
| `PREVIEW` | Is executing during previewing     |
| `EDITOR`  | Is executing in editor environment |

#### Debugging level

| Name (all in type of `boolean`) | Description  |
| :------ | :------- |
| `DEBUG` | Is under debug mode. `false` if debug option is set when do building, `true` otherwise. |
| `DEV`   | Equivalent to `DEBUG`/`EDITOR`/`PREVIEW`.  |


#### Platform identification

The following constants represent if is executing on some platform or some kind of platforms. All of these constants have type `boolean`.
<!-- Please sort the table in dictionary order -->

| Name        | Platform            | `MINIGAME` mini game | `RUNTIME_BASED` based on Cocos Runtime | `SUPPORT_JIT` JIT is supported |
| :---------- | :------------------ | :------------------- | :------------------- | :------------------- |
| `HTML5`     | Web                 | ❌                   | ❌                    | ❌                   |
| `NATIVE`    | Native platforms    | ❌                   | ❌                    | ❌                   |
| `ALIPAY`    | Alipay Mini Game    | ✔️                    | ❌                    | ✔️                   |
| `BAIDU`     | Baidu Mini Game     | ✔️                    | ❌                    | ✔️                    |
| `BYTEDANCE` | Bytedance Mini Game | ✔️                    | ❌                    | ✔️                    |
| `WECHAT`    | WeChat Mini Game    | ✔️                    | ❌                    | ✔️                    |
| `XIAOMI`    | XiaoMi Mini Game    | ✔️                    | ❌                    | ✔️                    |
| `COCOSPLAY` | Cocos Play          | ❌                   | ✔️                     | ✔️                    |
| `HUAWEI`    | HuaWei Quick Game   | ❌                   | ✔️                     | ✔️                    |
| `OPPO`      | OPPO Quick Game     | ❌                   | ✔️                     | ✔️                    |
| `VIVO`      | vivo Quick Game     | ❌                   | ✔️                     | ✔️                    |


#### Logging under development mode

Example:

```ts
import { log } from 'cc';
import { DEV } from "cc/env";

if (DEV) {
    log(`I'm in development mode!`);
}
```
<<<<<<< HEAD

## Editor modules

Editor modules are under protocol `'cce:'`("cce" is abbreviation of "**C**ocos**C**reator**E**ditor").

All modules are visible only under editor environments. For example, they are not visible from previewing and after building. Instead, they are visible from scene editor.

<!--
| Module name | Use for                        |
|-------------|--------------------------------|
| `'cce:gizmo'` | Gizmo                          |
-->
=======
>>>>>>> 7f1bcd3f4b0a4361a61c837d690ef0efb8cb5958
