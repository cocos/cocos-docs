# 使用第三方工具

在开发一个扩展的过程中，不可避免的会需要使用到许多第三方的工具或者库，这里介绍几种实用方式。

## 使用 NPM 上的库

[获取 NPM 包](../scripting/modules/config.md)

一个完整的 Creator 扩展其实就是一个 `NPM` 模块，我们可以在命令行里进入到扩展的根目录，执行：

### 运行时依赖

```bash
npm install fs-extra
```

这时候，`NPM` 会自动在 `package.json` 文件里增加上 `dependencies` 字段：

```json5
{
    "name": "test-extension",
    "dependencies": {
        "fs-extra": "^10.0.0"
    }
}
```

我们也可以手动的增加这个字段，然后执行：

```bash
npm install
```

`NPM` 也会将标记的依赖安装到当前扩展里的 `node_modules` 目录。

当我们将需要使用的库文件安装好后，在代码里就可以使用了：

```ts
import { outputFile } from 'fs-extra';
```

如果出现 ts 定义问题，可以尝试去安装库文件的定义：

```bash
npm install @types/fs-extra
```

### 开发依赖

如果有一些依赖库是开发时候才需要使用的，比如编译工具等。我们也可以将依赖的库标记为开发依赖：

```bash
npm install fs-extra --save-dev
```

这样 `package.json` 里标记的依赖会是这样的：

```json5
{
    "name": "test-extension",
    "devDependencies": {
        "fs-extra": "^10.0.0"
    }
}
```

我们在准备发布这个扩展的时候，可以先清空 node_modules，然后执行命令：

```bash
npm install --production
```

这样就只会安装 `dependencies` 里的依赖库，从而减小发布扩展的包体。

## 使用可执行程序

在 Creator 提供的环境里可以使用子进程的方式调用第三方的可执行程序：

```typescript
import { join } from 'path';
import { spawn } from 'child_process';

const child = spawn(join(__dirname, '../ps.exe'), {});
child.on('error', function () {});
```
