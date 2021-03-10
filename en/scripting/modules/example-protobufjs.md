# Example: Using protobuf.js with npm

This section illustrates how to use npm packages in a Cocos Creator project by installing and using [protobufjs](https://www.npmjs.com/package/protobufjs).

## Install Node.js

The npm package management tool `npm` is included in the Node.js distribution. You can use it after installing Node.js.

Confirm that the installation of `npm` is successful with the following command:

```bash
> npm -v
# Possible output:
# 6.14.9
```

## Install the npm Package

Executing the following command in the project root directory:

```bash
> npm install --save protobufjs
```

Will install the npm package `protobufjs` into the `/node_modules` directory and write the dependencies for this package to the file `package.json`.

The `package.json` file is an npm manifest file and needs to be included in version control.

> **Note**: Cocos Creator recommends that the automatically generated `package-lock.json` also be included in version control to ensure that the developers install the same version of the package.

The `/node_modules` directory is generally not included in version control.

Once `package.json` has documented the dependencies, the following commands can be executed directly to reinstall or install in other environments.

```bash
> npm install
```

### Expansion: Use npm Mirrors

npm reads and downloads packages from the [official npmjs source](https://www.npmjs.com/) by default. As some countries or regions may have network issues that cause installation to fail or install too slowl, it is recommended to fix this by switching mirrors.

First, install the npm package [nrm](https://www.npmjs.com/package/nrm) globally.

```bash
> npm install -g nrm
```

> `-g` means global, which installs the npm package directly on the current computer, so you don't need to run it again as long as it is executed once.

Check the following valid npm mirrors:

```bash
> npx nrm ls
# Possible output:
# * npm -------- https://registry.npmjs.org/
# yarn ------- https://registry.yarnpkg.com/
# cnpm ------- http://r.cnpmjs.org/
# taobao ----- https://registry.npm.taobao.org/
# nj --------- https://registry.nodejitsu.com/
# npmMirror -- https://skimdb.npmjs.com/registry/
# edunpm ----- http://registry.enpmjs.org/
```

Choose the appropriate mirror according to the current region. Execute the following command to switch mirrors.

```bash
> npx nrm use taobao # or any suitable mirror
```

> This command is also global. Optionally, switch only the mirror of the current project, see [nrm options](https://www.npmjs.com/package/nrm#usage).

The mirror name `npm` is the name of the official source, and it can be switched back to the official source with the following command:

```bash
> npx nrm use npm
```

## TypeScript Configuration

The protobufjs package comes with a TypeScript type declaration file. However, a little configuration is needed to adapt it to the module system of Cocos Creator.

Edit the `tsconfig.json` file in the project directory and make sure that the `"allowSyntheticDefaultImports"` option in the `"compilerOptions"` field is set to `true`.

```json5
{
  /* Base configuration. Do not edit this field. */
  "extends": "./temp/tsconfig.cocos.json",

  "compilerOptions": {
      "allowSyntheticDefaultImports": true, // needs to be turned on
  }
}
```

Currently `protobufjs` only provides CommonJS modules, and Cocos Creator accesses CommonJS modules via "default import".

## Using protobufjs

```ts
import protobuf from 'protobufjs';

const root = protobuf.Root.fromJSON(/* ... */);
```

protobufjs has `light` and `minimal` subpaths that can be imported into the package when needed:

```ts
// Use the light version
import protobuf from 'protobufjs/light.js';
```

or.

```ts
// Use the minimal version
import protobuf from 'protobufjs/minimal.js';
```

> **Note**: in the case of protobufjs and many classic npm packages, the suffix is required when importing subpaths in the package. Please refer to the [Cocos Creator Module Specification](./spec.md) documentation.
