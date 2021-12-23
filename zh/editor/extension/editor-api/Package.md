# Package

插件

## 函数

```typescript
interface GetPackageOptions {
    name?: string;
    debug?: boolean;
    path?: string;
    enable?: boolean;
    invalid?: boolean;
}
interface PackageJson {
    author?: string;
    debug?: boolean;
    description?: string;
    main?: string;
    menu?: any;
    name: string;
    version: string;
    windows: string;
    editor?: string;
    panel?: any;
}
type PathType = 'home' | 'data' | 'temp';
```

### disable

▸ **disable**(`path: string`, `options: any`): `any`

关闭一个插件

**请求参数**

| Name      | Type     | Description |
| :-------- | :------- | ----------- |
| `path`    | `string` |             |
| `options` | `any`    |             |

**返回结果**

`any`

```typescript
Editor.Package.disable('D:\\Program\\CocosEditor\\Creator\\3.4.0\\resources\\app.asar\\builtin\\assets', {});
```

### enable

▸ **enable**(`path`): `any`

启动一个插件

**请求参数**

| Name   | Type     | Description |
| :----- | :------- | ----------- |
| `path` | `string` |             |

**返回结果**

`any`

```typescript
Editor.Package.enable('D:\\Program\\CocosEditor\\Creator\\3.4.0\\resources\\app.asar\\builtin\\assets', {});
```

### getPackages

▸ **getPackages**(`options?: GetPackageOptions`): `EditorInterfacePackageInfo`[]

查询插件列表

**请求参数**

| Name       | Type                | Description |
| :--------- | :------------------ | ----------- |
| `options?` | `GetPackageOptions` |             |

**返回结果**

`EditorInterfacePackageInfo[]`

```typescript
const pkgs = Editor.Package.getPackages({ enable: true });
```

### getPath

▸ **getPath**(`extensionName`, `type?`): `any`

获取一个插件的几个预制目录地址

**请求参数**

| Name            | Type       | Description                                                  |
| :-------------- | :--------- | :----------------------------------------------------------- |
| `extensionName` | `string`   | 扩展的名字                                                   |
| `type?`         | `PathType` | 地址类型（temp 临时目录，data 需要同步的数据目录,不传则返回现在打开的插件路径） |

**返回结果**

`any`

```typescript
const path = Editor.Package.getPath('menu');  // "D:\\Program\\CocosEditor\\Creator\\3.4.0\\resources\\app.asar\\builtin\\menu"
```

### on

▸ **on**(`action: string`, `handle: Function`): `any`

监听插件事件
谨慎使用，之后会被移除

**请求参数**

| Name     | Type       | Description |
| :------- | :--------- | ----------- |
| `action` | `string`   |             |
| `handle` | `Function` |             |

**返回结果**

`any`

```typescript
Editor.Package.on('enable', () => {});
```

### once

▸ **once**(`action: string`, `handle: Function`): `any`

监听一次插件事件
谨慎使用，之后会被移除

**请求参数**

| Name     | Type       | Description |
| :------- | :--------- | ----------- |
| `action` | `string`   |             |
| `handle` | `Function` |             |

**返回结果**

`any`

```typescript
Editor.Package.once('disable', () => {});
```

### register

▸ **register**(`path: string`): `any`

注册一个插件
谨慎使用，之后会被移除

**请求参数**

| Name   | Type     | Description |
| :----- | :------- | ----------- |
| `path` | `string` |             |

**返回结果**

`any`

```typescript
Editor.Package.register('D:\\Program\\CocosEditor\\Creator\\3.4.0\\resources\\app.asar\\builtin\\assets');
```

### removeListener

▸ **removeListener**(`action: string`, `handle: Function`): `any`

移除监听插件的事件
谨慎使用，之后会被移除

**请求参数**

| Name     | Type       | Description |
| :------- | :--------- | ----------- |
| `action` | `string`   |             |
| `handle` | `Function` |             |

**返回结果**

`any`

```typescript
Editor.Package.removeListener('enable', () => {});
```

### unregister

▸ **unregister**(`path: string`): `any`

反注册一个插件
谨慎使用，之后会被移除

**请求参数**

| Name   | Type     | Description |
| :----- | :------- | ----------- |
| `path` | `string` |             |

**返回结果**

`any`

```typescript
Editor.Package.unregister('D:\\Program\\CocosEditor\\Creator\\3.4.0\\resources\\app.asar\\builtin\\assets');
```
