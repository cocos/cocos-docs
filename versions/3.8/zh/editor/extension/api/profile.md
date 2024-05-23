# Profile

配置

## 接口说明

```typescript
type preferencesProtocol = 'default' | 'global' | 'local';

type projectProtocol = 'default' | 'project';
```

## 函数

### getConfig

▸ **getConfig**(name: `string`, key?: `string`, type?: `preferencesProtocol`): Promise<`any`\>

读取扩展配置

**请求参数**

| Name    | Type                  | Description      |
| :------ | :-------------------- | :--------------- |
| `name`  | `string`              | 扩展名           |
| `key?`  | `string`              | 配置路径         |
| `type?` | `preferencesProtocol` | 配置的类型，选填 |

**返回结果**

Promise<`any`\>

```typescript
const value = await Editor.Profile.getConfig('asset-db', 'autoScan');
```

### setConfig

▸ **setConfig**(name: `string`, key: `string`, value: `any`, type?: `preferencesProtocol`): Promise<`void`\>

设置扩展配置

**请求参数**

| Name    | Type                  | Description      |
| :------ | :-------------------- | :--------------- |
| `name`  | `string`              | 扩展名           |
| `key`   | `string`              | 配置路径         |
| `value` | `any`                 | 配置的值         |
| `type?` | `preferencesProtocol` | 配置的类型，选填 |

**返回结果**

Promise<`void`\>

```typescript
await Editor.Profile.setConfig('package-asset', 'import-path', dirname(result.filePaths[0]));
await Editor.Profile.setConfig('reference-image', 'show', true);
```

### removeConfig

▸ **removeConfig**(name: `string`, key: `string`, type?: `preferencesProtocol`): Promise<`void`\>

删除某个扩展配置

**请求参数**

| Name    | Type                  | Description      |
| :------ | :-------------------- | :--------------- |
| `name`  | `string`              | 扩展名           |
| `key`   | `string`              | 配置路径         |
| `type?` | `preferencesProtocol` | 配置的类型，选填 |

**返回结果**

Promise<`void`\>

```typescript
await Editor.Profile.removeConfig('device', 'enable', 'global');
```

### getProject

▸ **getProject**(`name: `string`, key?: `string`, type?: `projectProtocol`): Promise<`any`\>

读取扩展内的项目配置

**请求参数**

| Name    | Type              | Description      |
| :------ | :---------------- | :--------------- |
| `name`  | `string`          | 扩展名           |
| `key?`  | `string`          | 配置路径         |
| `type?` | `projectProtocol` | 配置的类型，选填 |

**返回结果**

Promise<`any`\>

```typescript
const engineModules = await Editor.Profile.getProject('engine', 'modules.includeModules');
```

### setProject

▸ **setProject**(name: `string`, key: `string`, value: `any`, type?: `preferencesProtocol`): Promise<`void`\>

设置扩展内的项目配置

**请求参数**

| Name    | Type              | Description      |
| :------ | :---------------- | :--------------- |
| `name`  | `string`          | 扩展名           |
| `key`   | `string`          | 配置路径         |
| `value` | `any`             | 配置的值         |
| `type?` | `projectProtocol` | 配置的类型，选填 |

**返回结果**

Promise<`void`\>

```typescript
await Editor.Profile.setProject('node-library', 'custom', {});
```

### removeProject

▸ **removeProject**(name: `string`, key: `string`, type?: `projectProtocol`): Promise<`void`\>

删除扩展内的项目配置

**请求参数**

| Name    | Type              | Description      |
| :------ | :---------------- | :--------------- |
| `name`  | `string`          | 扩展名           |
| `key`   | `string`          | 配置路径         |
| `type?` | `projectProtocol` | 配置的类型，选填 |

**返回结果**

Promise<`void`\>

```typescript
await Editor.Profile.removeProject('engine', 'modules.includeModules');
```

### getTemp

▸ **getTemp**(name: `string`, key?: `string`): Promise<`any`\>

读取扩展配置

**请求参数**

| Name   | Type     | Description      |
| :----- | :------- | :--------------  |
| `name` | `string` | 扩展名           |
| `key?` | `string` | 配置路径，选填    |

**返回结果**

Promise<`any`\>

```typescript
const state = await Editor.Profile.getTemp('assets', 'state');
```

### setTemp

▸ **setTemp**(name: `string`, key: `string`, value: `any`): Promise<`void`\>

设置扩展配置

**请求参数**

| Name    | Type     | Description |
| :------ | :------- | :---------- |
| `name`  | `string` | 扩展名      |
| `key`   | `string` | 配置路径    |
| `value` | `any`    | 配置的值    |

**返回结果**

Promise<`void`\>

```typescript
Editor.Profile.setTemp('assets', 'state', {});
```

### removeTemp

▸ **removeTemp**(name: `string`, key: `string`): Promise<`void`\>

删除某个扩展配置

**请求参数**

| Name   | Type     | Description |
| :----- | :------- | :---------- |
| `name` | `string` | 扩展名      |
| `key`  | `string` | 配置路径    |

**返回结果**

Promise<`void`\>

```typescript
await Editor.Profile.removeTemp('assets', 'state');
```

### migrateProject

▸ **migrateProject**(pkgName: `string`, profileVersion: `string`, profileData: `any`): `void`

迁移扩展某个版本的项目配置数据到编辑器最新版本

**请求参数**

| Name             | Type     | Description           |
| :--------------- | :------- | --------------------- |
| `pkgName`        | `string` | 扩展名                 |
| `profileVersion` | `string` | 要迁移的扩展版本号      |
| `profileData`    | `any`    | 迁移的数据             |

```typescript
await Editor.Profile.migrateProject('builder', '1.2.1', buildJson);
```


### migrateGlobal

▸ **migrateGlobal**(pkgName: `string`, profileVersion: `string`, profileData: `any`): `void`

迁移扩展某个版本的全局配置数据到编辑器最新版本

**请求参数**

| Name             | Type     | Description           |
| :--------------- | :------- | --------------------- |
| `pkgName`        | `string` | 扩展名                 |
| `profileVersion` | `string` | 要迁移的扩展版本号      |
| `profileData`    | `any`    | 迁移的数据             |

```typescript
// const buildJson = { xxx };
await Editor.Profile.migrateGlobal('builder', '1.2.1', buildJson);
```

### migrateLocal

▸ **migrateLocal**(pkgName: `string`, profileVersion: `string`, profileData: `any`): `void`

迁移扩展某个版本的本地配置数据到编辑器最新版本

**请求参数**

| Name             | Type     | Description           |
| :--------------- | :------- | --------------------- |
| `pkgName`        | `string` | 扩展名                 |
| `profileVersion` | `string` | 要迁移的扩展版本号      |
| `profileData`    | `any`    | 迁移的数据             |

```typescript
await Editor.Profile.migrateLocal('builder', '1.2.1', buildJson);
```