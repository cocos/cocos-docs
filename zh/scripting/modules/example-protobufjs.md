
# 示例：通过 NPM 使用 protobuf.js

本章节通过安装和使用 [protobufjs](https://www.npmjs.com/package/protobufjs) 来阐述如何在 Cocos Creator 项目中使用 NPM 包。

## 安装 Node.js

NPM 包管理工具 `npm` 附带在 Node.js 发行版中。安装 Node.js 之后即可使用 `npm`。

通过以下命令确认 `npm` 的安装已成功：

```bash
> npm -v
# 可能的输出：
# 6.14.9
```

## 安装 NPM 包

在项目根目录下，执行

```bash
> npm install --save protobufjs
```

该命令将安装 NPM 包 `protobufjs` 到 `/node_modules` 目录中，并将对此包的依赖关系写入到文件 `package.json` 。

`package.json` 文件是 NPM 的清单文件。`package.json` 需要纳入版本控制。

> Cocos Creator 推荐将自动生成的 `package-lock.json` 也纳入版本控制，以确保团队不同成员之间包版本的一致性。

`/node_modules` 目录一般不纳入版本控制：
```ini
# .gitignore 文件

node_modules/ # 忽略 node_modules 目录
```

关于 NPM 包管理工具

当 `package.json` 记录了依赖之后，后续可直接执行以下命令重新安装或在其它环境中安装：

```bash
> npm install
```

### 拓展：使用 NPM 镜像

NPM 默认从 [官方 npmjs 源](https://www.npmjs.com/) 读取与下载包。有些国家或地区可能因为网络问题导致安装失败或安装速度过慢。Cocos Creator 推荐以切换镜像的方式来解决。

首先，在全局安装 NPM 包 [nrm](https://www.npmjs.com/package/nrm)：
```bash
> npm install -g nrm
```

> `-g` 代表全局：直接安装到当前计算机中。因此，只要执行一次后续就无需再次执行。

查看有效的 NPM 镜像：
```bash
> npx nrm ls
# 可能的输出：
# * npm -------- https://registry.npmjs.org/
#   yarn ------- https://registry.yarnpkg.com/
#   cnpm ------- http://r.cnpmjs.org/
#   taobao ----- https://registry.npm.taobao.org/
#   nj --------- https://registry.nodejitsu.com/
#   npmMirror -- https://skimdb.npmjs.com/registry/
#   edunpm ----- http://registry.enpmjs.org/
```

可根据当前地区选择合适的镜像。中国大陆用户使用 `taobao` 镜像是不错的选择。执行以下命令来切换镜像：
```bash
> npx nrm use taobao # 或任何合适的镜像
```

> 该命令也是全局的。也可选择仅切换当前项目的镜像，见 [nrm 选项](https://www.npmjs.com/package/nrm#usage)。

镜像名 `npm` 即是官方源的名称，因此，可通过：
```bash
> npx nrm use npm
```
切换回官方源。 

## TypeScript 配置

protobufjs 包中自带了 TypeScript 类型声明文件。不过为了适配 Cocos Creator 模块系统，仍需少许配置。

编辑 `<项目目录>/tsconfig.json`，确保 `"compilerOptions"` 中的 `"allowSyntheticDefaultImports"` 选项已开启：

```json5
{
  /* Base configuration. Do not edit this field. */
  "extends": "./temp/tsconfig.cocos.json",

  "compilerOptions": {
      "allowSyntheticDefaultImports": true, // 需要开启
  }
}
```

> 我们需要开启这个选项是因为截至目前，protobufjs 仅提供了 CommonJS 模块。Cocos Creator 是通过 “默认导入” 来访问 CommonJS 模块的。

## 使用 protobufjs

```ts
import protobuf from 'protobufjs';

const root = protobuf.Root.fromJSON(/* ... */);
```

protobufjs 有 `light` 和 `minimal` 之分，当有需要时，可以导入包中的子路径：

```ts
// 使用 light 版本
import protobuf from 'protobufjs/light.js';
```

或：

```ts
// 使用 minimal 版本
import protobuf from 'protobufjs/minimal.js';
```

注意，就 protobufjs 和许多经典的 NPM 包而言，当导入包中子路径的时候，后缀是需要的。见 [Cocos Creator 模块规范](./spec.md)。