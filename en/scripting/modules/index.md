

Engine and editor expose their functionalities API through modules. Modules are in form of ECMAScript module format.

⚠️ Note, starting from 3.0, you can not access API through global variable `cc`!

## Engine modules

At present, engine only offers one public module `'cc'`.

Contents of module `'cc'` are dynamically decided,
which is relevant with engine modules setting in project settings.

### Example: engine logging

```ts
import { log } from 'cc';
log(`Hello world!`);
```

## Editor modules

Editor modules are prefixed by `'cce.'`("cce" is abbreviation of "**C**ocos**C**reator**E**ditor").

Except for module `cce.env`, all modules are visible only under editor environments. For example, they are not visible from previewing and after building. Instead, they are visible from scene editor.

| Module name | Use for                        |
|-------------|--------------------------------|
| `'cce.env'` | Accessing build-time constants |
<!--
| `'cce.gizmo'` | Gizmo                          |
-->


### Build-time constants

Editor module `'cce.env'` exposes some **constants** that are came from building environment. These constants may present execution environment, debugging level, platform identification and so on. Unlike other editor modules, `'cce.env'` is visible from non-editor environments.

Since these constants are declared with `const` qualifier, it's very friendly to code optimization.

#### Execution environment

| Name(all in type of `boolean`) | Meaning                            |
|--------------------------------|------------------------------------|
| `BUILD`                        | Is executing after building        |
| `PREVIEW`                      | Is executing during previewing     |
| `EDITOR`                       | Is executing in editor environment |


#### Debugging level

| Name(all in type of `boolean`) | Meaning                                                                                |
|--------------------------------|----------------------------------------------------------------------------------------|
| `DEBUG`                        | Is under debug mode. `false` if debug option is set when do building,`true` otherwise. |
| `DEV`                          | Equivalent to `DEBUG || EDITOR || PREVIEW || EDITOR`                                   |


#### Platform identification

The following constants represent if is executing on some platform or some kind of platforms. All of these constants have type `boolean`.
<!-- Please sort the table in dictionary order -->
| Name        | Platform          | `MINIGAME` "mini game" | `RUNTIME_BASED` based on Cocos Runtime | `SUPPORT_JIT` JIT is supported |
|-------------|-------------------|------------------------|----------------------------------------|--------------------------------|
| `HTML5`     | Web               | ❌                      | ❌                                      | ❌                              |
| `NATIVE`    | Native platforms  | ❌                      | ❌                                      | ❌                              |
| `ALIPAY`    | Alipay mini game  | ✔️                      | ❌                                      | ✔️                              |
| `BAIDU`     | Baidu mini game   | ✔️                      | ❌                                      | ✔️                              |
| `BYTEDANCE` | Tik Tok mini game | ✔️                      | ❌                                      | ✔️                              |
| `WECHAT`    | WeChat mini game  | ✔️                      | ❌                                      | ✔️                              |
| `XIAOMI`    | XiaoMi mini game  | ✔️                      | ❌                                      | ✔️                              |
| `COCOSPLAY` | Cocos play        | ❌                      | ✔️                                      | ✔️                              |
| `HUAWEI`    | HuaWei quick game | ❌                      | ✔️                                      | ✔️                              |
| `OPPO`      | OPPO quick game   | ❌                      | ✔️                                      | ✔️                              |
| `VIVO`      | vivo quick game   | ❌                      | ✔️                                      | ✔️                              |


#### Example: logging under development mode

```ts
import { log } from 'cc';
import { DEV } from "cce.env";

if (DEV) {
    log(`I'm in development mode!`);
}
```