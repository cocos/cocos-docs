# How to Get npm Packages

## Installing Node.js

The npm package management tool `npm` is included in the Node.js distribution. It is ready to use after installing Node.js.

To confirm if the installation of `npm` was successful issue the following command:

```bash
> npm -v
# Possible output.
# 6.14.9
```

## Installing npm packages

To install an `npm` package, execute the following command in the project root directory:

```bash
> npm install --save protobufjs
```

The above command will install the `npm` package `protobufjs` into the `/node_modules` directory and write the dependencies for this package to the file `package.json`.

The `package.json` file is an `npm` manifest file and needs to be included in version control.

> **Note**: Cocos Creator recommends that the automatically generated `package-lock.json` be included in version control to ensure that the same version of the package is installed between multiple developers.

The `/node_modules` directory is generally not included in version control.

Once the dependencies have been written into the `package.json`, the following commands can be executed directly to reinstall or install in other environments:

```bash
> npm install
```

## Expansion: Using npm mirrors

`npm` reads and downloads packages from the [official npmjs source](https://www.npmjs.com/) by default. Some countries or regions may have network issues that cause the installation to fail or install too slowly, it is recommended to fix this by switching mirrors.

First, install the `npm` package [nrm](https://www.npmjs.com/package/nrm) globally:

```bash
> npm install -g nrm
```

> **Note**: `-g` means global, the npm package will be installed directly on the current computer. Once it is done, there is no need to do it again.

To view valid npm images:

```bash
> npx nrm ls
# Possible output.
# * npm -------- https://registry.npmjs.org/
# yarn ------- https://registry.yarnpkg.com/
# cnpm ------- http://r.cnpmjs.org/
# taobao ----- https://registry.npm.taobao.org/
# nj --------- https://registry.nodejitsu.com/
# npmMirror -- https://skimdb.npmjs.com/registry/
# edunpm ----- http://registry.enpmjs.org/
```

Choose the appropriate mirror according to the current region. The `taobao` mirror is a good choice for users in mainland China. Execute the following command to switch mirrors.

```bash
> npx nrm use taobao # or any suitable mirror
```

> **Note**: this command is also global. Optionally, to switch only the mirror of the current project, see the [nrm options](https://www.npmjs.com/package/nrm#usage) documentation.

The mirror name `npm` is the name of the official source, and can be switched back to the official source with the following command:

```bash
> npx nrm use npm
```