# Package

扩展管理器

## 接口说明

```typescript
interface GetPackageOptions {
    name?: string;
    debug?: boolean;
    path?: string;
    enable?: boolean;
    invalid?: boolean;
}

interface EditorInterfacePackageInfo {
    debug: boolean;
    invalid: boolean;
    enable: boolean;
    name: string;
    path: string;
    version: string;
    info: PackageJson;
}

type PathType = 'home' | 'data' | 'temp';
```

## 函数

### disable

▸ **disable**(path: `string`): `any`

关闭一个扩展

**请求参数**

| Name      | Type     | Description      |
| :-------- | :------- | ---------------- |
| `path`    | `string` | 扩展所在路径 |
| `options` | `any`    | 关闭时带上的配置 |

```typescript
Editor.Package.disable('D:\\Program\\CocosEditor\\Creator\\3.4.0\\resources\\app.asar\\builtin\\assets', {});
```

### enable

▸ **enable**(path: `string`): `any`

启动一个扩展

**请求参数**

| Name   | Type     | Description      |
| :----- | :------- | ---------------- |
| `path` | `string` | 扩展所在路径 |

```typescript
Editor.Package.enable('D:\\Program\\CocosEditor\\Creator\\3.4.0\\resources\\app.asar\\builtin\\assets', {});
```

### getPackages

▸ **getPackages**(options?: `GetPackageOptions`): `EditorInterfacePackageInfo[]`

查询扩展列表

**请求参数**

| Name       | Type                | Description |
| :--------- | :------------------ | ----------- |
| `options?` | `GetPackageOptions` | 查询条件 |

**返回结果**

`EditorInterfacePackageInfo[]`

```typescript
const pkgs = Editor.Package.getPackages({ enable: true });
```

### getPath

▸ **getPath**(extensionName: `string`, type?: `PathType`): `any`

获取一个扩展的几个预制目录地址

**请求参数**

| Name            | Type       | Description   |
| :-------------- | :--------- | :------------ |
| `extensionName` | `string`   | 扩展的名字 |
| `type?`         | `PathType` | 地址类型（temp 临时目录，data 需要同步的数据目录，不传则返回现在打开的扩展路径） |

```typescript
const path = Editor.Package.getPath('menu');  // "D:\\Program\\CocosEditor\\Creator\\3.4.0\\resources\\app.asar\\builtin\\menu"
```
