# Profile

配置

## 接口说明

```typescript
type preferencesProtocol = 'default' | 'global' | 'local';

type projectProtocol = 'default' | 'project';

type tempProtocol = 'temp';

interface ProfileGetOptions {
    type: 'deep' | 'current' | 'inherit';
}

interface ProfileObj {
    get: (key?: string, options?: ProfileGetOptions) => any;
    set: (key?: string, value?: any) => any;
    remove: (key: string) => void;
    save: () => void;
    clear: () => void;
    reset: () => void;
}
```

## 函数

### getConfig

▸ **getConfig**(name: `string`, key?: `string`, type?: `preferencesProtocol`): Promise<`any`\>

读取插件配置

**请求参数**

| Name    | Type                  | Description      |
| :------ | :-------------------- | :--------------- |
| `name`  | `string`              | 插件名           |
| `key?`  | `string`              | 配置路径         |
| `type?` | `preferencesProtocol` | 配置的类型，选填 |

**返回结果**

Promise<`any`\>

```typescript
const value = await Editor.Profile.getConfig('asset-db', 'autoScan');
```

### getProject

▸ **getProject**(`name: `string`, key?: `string`, type?: `projectProtocol`): Promise<`any`\>

读取插件内的项目配置

**请求参数**

| Name    | Type              | Description      |
| :------ | :---------------- | :--------------- |
| `name`  | `string`          | 插件名           |
| `key?`  | `string`          | 配置路径         |
| `type?` | `projectProtocol` | 配置的类型，选填 |

**返回结果**

Promise<`any`\>

```typescript
const engineModules = await Editor.Profile.getProject('engine', 'modules.includeModules');
```

### getTemp

▸ **getTemp**(name: `string`, key?: `string`): Promise<`any`\>

读取插件配置

**请求参数**

| Name   | Type     | Description      |
| :----- | :------- | :--------------  |
| `name` | `string` | 插件名           |
| `key?` | `string` | 配置路径，选填    |

**返回结果**

Promise<`any`\>

```typescript
const state = await Editor.Profile.getTemp('assets', 'state');
```

### migrateGlobal

▸ **migrateGlobal**(pkgName: `string`, profileVersion: `string`, profileData: `any`): `any`

迁移插件某个版本的全局配置数据到编辑器最新版本

**请求参数**

| Name             | Type     | Description           |
| :--------------- | :------- | --------------------- |
| `pkgName`        | `string` | 插件名                 |
| `profileVersion` | `string` | 要迁移的插件版本号      |
| `profileData`    | `any`    | 迁移的数据             |

```typescript
// const buildJson = { xxx };
await Editor.Profile.migrateGlobal('builder', '1.2.1', buildJson);
```

### migrateLocal

▸ **migrateLocal**(pkgName: `string`, profileVersion: `string`, profileData: `any`): `any`

迁移插件某个版本的本地配置数据到编辑器最新版本

**请求参数**

| Name             | Type     | Description           |
| :--------------- | :------- | --------------------- |
| `pkgName`        | `string` | 插件名                 |
| `profileVersion` | `string` | 要迁移的插件版本号      |
| `profileData`    | `any`    | 迁移的数据             |

```typescript
await Editor.Profile.migrateLocal('builder', '1.2.1', buildJson);
```

### migrateProject

▸ **migrateProject**(pkgName: `string`, profileVersion: `string`, profileData: `any`): `any`

迁移插件某个版本的项目配置数据到编辑器最新版本

**请求参数**

| Name             | Type     | Description           |
| :--------------- | :------- | --------------------- |
| `pkgName`        | `string` | 插件名                 |
| `profileVersion` | `string` | 要迁移的插件版本号      |
| `profileData`    | `any`    | 迁移的数据             |

```typescript
await Editor.Profile.migrateProject('builder', '1.2.1', buildJson);
```

### removeConfig

▸ **removeConfig**(name: `string`, key: `string`, type?: `preferencesProtocol`): Promise<`void`\>

删除某个插件配置

**请求参数**

| Name    | Type                  | Description      |
| :------ | :-------------------- | :--------------- |
| `name`  | `string`              | 插件名           |
| `key`   | `string`              | 配置路径         |
| `type?` | `preferencesProtocol` | 配置的类型，选填 |

**返回结果**

Promise<`void`\>

```typescript
await Editor.Profile.removeConfig('device', 'enable', 'global');
```

### removeProject

▸ **removeProject**(name: `string`, key: `string`, type?: `projectProtocol`): Promise<`void`\>

删除插件内的项目配置

**请求参数**

| Name    | Type              | Description      |
| :------ | :---------------- | :--------------- |
| `name`  | `string`          | 插件名           |
| `key`   | `string`          | 配置路径         |
| `type?` | `projectProtocol` | 配置的类型，选填 |

**返回结果**

Promise<`void`\>

```typescript
await Editor.Profile.removeProject('engine', 'modules.includeModules');
```

### removeTemp

▸ **removeTemp**(name: `string`, key: `string`): Promise<`void`\>

删除某个插件配置

**请求参数**

| Name   | Type     | Description |
| :----- | :------- | :---------- |
| `name` | `string` | 插件名      |
| `key`  | `string` | 配置路径    |

**返回结果**

Promise<`void`\>

```typescript
await Editor.Profile.removeTemp('assets', 'state');
```

### setConfig

▸ **setConfig**(name: `string`, key: `string`, value: `any`, type?: `preferencesProtocol`): Promise<`void`\>

设置插件配置

**请求参数**

| Name    | Type                  | Description      |
| :------ | :-------------------- | :--------------- |
| `name`  | `string`              | 插件名           |
| `key`   | `string`              | 配置路径         |
| `value` | `any`                 | 配置的值         |
| `type?` | `preferencesProtocol` | 配置的类型，选填 |

**返回结果**

Promise<`void`\>

```typescript
await Editor.Profile.setConfig('package-asset', 'import-path', dirname(result.filePaths[0]));
await Editor.Profile.setConfig('reference-image', 'show', true);
```

### setProject

▸ **setProject**(name: `string`, key: `string`, value: `any`, type?: `preferencesProtocol`): Promise<`void`\>

设置插件内的项目配置

**请求参数**

| Name    | Type              | Description      |
| :------ | :---------------- | :--------------- |
| `name`  | `string`          | 插件名           |
| `key`   | `string`          | 配置路径         |
| `value` | `any`             | 配置的值         |
| `type?` | `projectProtocol` | 配置的类型，选填 |

**返回结果**

Promise<`void`\>

```typescript
await Editor.Profile.setProject('node-library', 'custom', {});
```

### setTemp

▸ **setTemp**(name: `string`, key: `string`, value: `any`): Promise<`void`\>

设置插件配置

**请求参数**

| Name    | Type     | Description |
| :------ | :------- | :---------- |
| `name`  | `string` | 插件名      |
| `key`   | `string` | 配置路径    |
| `value` | `any`    | 配置的值    |

**返回结果**

Promise<`void`\>

```typescript
Editor.Profile.setTemp('assets', 'state', {});
```
