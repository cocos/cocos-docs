# 示例：导入游戏联机对战引擎 MGOBE

本文通过安装和使用 [游戏联机对战引擎 MGOBE](https://cloud.tencent.com/product/mgobe) 来示范如何在 Cocos Creator 项目中导入（非源自 NPM 的）第三方库。

## 下载 MGOBE SDK

下载 [MGOBE SDK](https://cloud.tencent.com/document/product/1038/33406)。

以 MGOBE 1.3.8 为例，解压下载得到的 `MGOBE_v1.3.8.zip` 内容至 **项目根目录** 下。例如，解压至 `<项目路径>/Libs/`，确保 `Libs/` 目录结构如下：

```
📂 assets
📂 Libs
  📂 MGOBE_v1.3.8
    📜 MGOBE.js
    📜 MGOBE.d.ts
```

## 使用

```ts
// assets/Scripts/foo.ts

import '../../Libs/MGOBE_v1.3.8/MGOBE.js';

console.log(MGOBE); // 全局变量 MGOBE
console.log(MGOBE.Room); // MGOBE Root 类
const { Room } = MGOBE; // 使用解构语法更加简洁
console.log(Room === MGOBE.Room); // 打印：true
```

> 注意，模块说明符中 `.js` 后缀是必须的。

根据 MGOBE 1.3.8 声明文件 `MGOBE.d.ts`，MGOBE 的 API 并没有作为模块导出，而是放置到了全局变量 `MGOBE` 中，因此我们使用 `import "...";` 语法——仅执行该模块，并在随后通过全局变量来访问 MGOBE API。

> 若使用 `import { Room } from "../../Libs/MGOBE_v1.3.8/MGOBE.js";`，IDE 中的 TypeScript 编译器会提示："MGOBE 不是模块"。
