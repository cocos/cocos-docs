# 获取 npm 包

## 安装 Node.js

npm 包管理工具 `npm` 附带在 Node.js 发行版中。安装 Node.js 之后即可使用。

通过以下命令确认 `npm` 的安装已成功：

```bash
> npm -v
# 可能的输出：
# 6.14.9
```

## 安装 npm 包

在项目根目录中执行以下命令：

```bash
> npm install --save protobufjs
```

会将 npm 包 `protobufjs` 安装到 `/node_modules` 目录中，并将对此包的依赖关系写入到文件 `package.json` 中。

`package.json` 文件是 npm 的清单文件，需要纳入版本控制。

> Cocos Creator 推荐将自动生成的 `package-lock.json` 也纳入版本控制，以确保多个开发者之间安装相同版本的包。

`/node_modules` 目录一般不纳入版本控制。

当 `package.json` 记录了依赖之后，后续可直接执行以下命令重新安装或在其它环境中安装：

```bash
> npm install
```

## 拓展：使用 npm 镜像

npm 默认从 [官方 npmjs 源](https://www.npmjs.com/) 读取和下载包。有些国家或地区可能因为网络问题导致安装失败或安装速度过慢，推荐通过切换镜像的方式来解决。

首先，全局安装 npm 包 [nrm](https://www.npmjs.com/package/nrm)：

```bash
> npm install -g nrm
```

> `-g` 表示全局，会将 npm 包直接安装到当前计算机中，只要执行一次后续就不需要再次执行。

查看有效的 npm 镜像：

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

镜像名 `npm` 是官方源的名称，因此，可通过以下命令切换回官方源：

```bash
> npx nrm use npm
```