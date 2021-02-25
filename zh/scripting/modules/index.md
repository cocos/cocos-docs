# 脚本基础

## 模块

引擎和编辑器通过模块向开发者暴露功能接口，模块以 ECMAScript 模块形式存在。

### 引擎模块

Cocos Creator 3.0 引擎的 API 都存在模块 `cc` 中，使用标准的 ES6 模块导入语法将其导入：

```ts
import {
    Component, // 导入类 Component
    _decorator, // 导入命名空间 _decorator
} from "cc";

@_decorator.ccclass("MyComponent")
export class MyComponent extends Component {
    public v = new cc.Vec3();
}
```

模块 `cc` 提供了所有引擎功能的访问。但同时，模块 'cc' 的内容也是动态的，其内容和 **项目设置/功能裁剪** 设置有关。假设，代码获取了 UI 组件 `Button`，但在功能裁剪处剔除了 UI 模块，那么就会获得如下报错：

    ![type-is-none](modules/type-is-none.png)

由于历史原因，`cc` 是 Cocos Creator 3.0 保留使用的标识符，其行为 **相当于** 在任何模块顶部定义了名为 cc 的对象。因此，开发者不应该将 `cc` 用作任何 **全局对象** 的名称：

```ts
/* const cc = {}; // 每个 Cocos Creator 脚本都等价于在此处含有隐式定义 */

import * as cc from "cc"; // 错误：命名空间导入名称 cc 由 Cocos Creator 保留使用

const cc = {
    x: 0
};
console.log(cc.x); // 错误：全局对象名称 cc 由 Cocos Creator 保留使用

function f () {
    const cc = {
        x: 0
    };
    console.log(cc.x); // 正确：cc 可以用作局部对象的名称

    const o = {
        cc: 0
    };
    console.log(o.cc); // 正确：cc 可以用作属性名
}

console.log(cc, typeof cc); // 错误：行为是未定义的
```

⚠️ 特别注意，从 3.0 开始，将不能通过全局变量 `cc` 访问引擎功能！引擎内的所有功能模块都必须通过 `import` 的方式从 `cc` 模块导入

```ts
/* const cc = {}; // 每个 Cocos Creator 脚本都等价于在此处含有隐式定义 */

import { Vec3 } from "cc";
const pos1 = new Vec3(); // 正确

const pos2 = new cc.Vec3(); // 错误，无法通过全局变量 cc 访问引擎功能
```

#### 构建时常量

引擎模块 `'cc/env'` 暴露了一些构建时的 **常量**，这些常量代表执行环境、调试级别或平台标识等。

由于这些常量都以 `const` 声明，提供了很好的代码优化机会。

##### 执行环境

| 名称（类型都为 `boolean`） | 说明                       |
|--------------------------|--------------------------|
| `BUILD`                  | 是否正在构建后的环境中运行 |
| `PREVIEW`                | 是否正在预览环境中运行     |
| `EDITOR`                 | 是否正在编辑器环境中运行   |

##### 调试级别

| 名称（类型都为 `boolean`） | 说明                                                                              |
|--------------------------|---------------------------------------------------------------------------------|
| `DEBUG`                  | 是否处于调试模式。仅当构建时未勾选调试选项的情况下为 `false`，其它情况下都为 `true` |
| `DEV`                    | 等价于 `DEBUG`/`EDITOR`/`PREVIEW`                                                 |

#### 平台标识

下表列出的常量表示是否正在 **某一个** 或 **某一类** 平台上运行，常量的类型都是 `boolean`。
<!-- 下表请按字典序排序 -->

| 名称        | 代表平台       | `MINIGAME` “小游戏” | `RUNTIME_BASED` 基于 Cocos Runtime | `SUPPORT_JIT` 支持 JIT |
|-------------|----------------|---------------------|------------------------------------|------------------------|
| `HTML5`     | Web            | ❌                   | ❌                                  | ❌                      |
| `NATIVE`    | 原生平台       | ❌                   | ❌                                  | ❌                      |
| `ALIPAY`    | 支付宝小游戏   | ✔️                  | ❌                                  | ✔️                     |
| `BAIDU`     | 百度小游戏     | ✔️                  | ❌                                  | ✔️                     |
| `BYTEDANCE` | 字节跳动小游戏 | ✔️                  | ❌                                  | ✔️                     |
| `WECHAT`    | 微信小游戏     | ✔️                  | ❌                                  | ✔️                     |
| `XIAOMI`    | 小米快游戏     | ✔️                  | ❌                                  | ✔️                     |
| `COCOSPLAY` | Cocos Play     | ❌                   | ✔️                                 | ✔️                     |
| `HUAWEI`    | 华为快游戏     | ❌                   | ✔️                                 | ✔️                     |
| `OPPO`      | OPPO 小游戏    | ❌                   | ✔️                                 | ✔️                     |
| `VIVO`      | vivo 小游戏    | ❌                   | ✔️                                 | ✔️                     |

#### 调试模式下的输出

示例如下：

```ts
import { log } from 'cc';
import { DEV } from 'cc/env';

if (DEV) {
    log('I am in development mode!');
}
```

更多模块内容请参考：

- [模块规范](./spec.md)
- [示例：通过 npm 使用 protobuf.js](./example-protobufjs.md)

<!-- ### 编辑器模块

编辑器模块都在 `'cce:'` 协议下（“cce”代表“**C**ocos**C**reator**E**ditor”）。

所有编辑器模块仅在编辑器环境下有效。例如，预览和构建后的环境中是不能访问编辑器模块的，相反，场景编辑器中则可以访问到。 -->

<!--
| 模块名称      | 用于  |
|---------------|-------|
| `'cce:gizmo'` | Gizmo |
-->
