# 配置系统

在编写扩展的时候，有可能需要保存一些配置，并提供一些配置让用户进行自定义设置。
所以编辑器内就提供了一套配置管理机制。

## 配置类型

编辑器里的配置分成了两种：

1. 编辑器设置
2. 项目设置

### 编辑器设置

存放一些编辑器相关的功能设置。这部分也是编辑器的主要配置。

编辑器设置分成三个层级，优先级从高到低：

```
local -> global -> default
```

### 项目设置

存放一些和项目相关的配置，这些配置允许，并且需要在项目间共享。

```
local -> default
```

## 注册配置

```json
{
    "name": "hello-world",
    "contributions": {
        "profile": {
            "editor": {
                "test.a": {
                    "default": 0,
                    "message": "editorTestAChanged",
                    "label": "测试编辑器配置"
                }
            },
            "project": {
                "test.a": {
                    "default": 1,
                    "message": "projectTestAChanged",
                    "label": "测试项目配置"
                }
            }
        }
    },
}
```

```typescript
interface ProfileInfo {
    editor: { [ key: string ]: ProfileItem };
    project: { [ key: string ]: ProfileItem };
}

interface ProfileItem {
    // 配置的默认数据
    default: any;
    // 配置更改后，会自动发送这个消息进行通知
    message: string;
    // 简单的描述配置信息的作用，支持 i18n:key 语法
    label: string;
}
```

contributions.profile 分成 editor 和 project 两种配置，这两中配置的定义都是 object 对象。
object 的 key 为配置的 key，value 则是描述这个配置的基本信息。

### default 

类型 {any} 可选

配置的默认值。可以是任何类型。

### message

类型 {string} 可选

当消息修改后，会触发定义的消息。用于配置改变的时候动态更新一些数据。

### label

类型 {string} 可选

简单的描述这个配置。在可以显示配置的地方，可能会显示这个描述。支持 i18n:key 格式

## 读取配置

读取编辑器配置

```javascript
const packageJSON = require('./package.json');
// await Editor.Profile.getConfig(pkgName, key, protocol);
await Editor.Profile.getConfig(packageJSON.name, 'test.a'); // 0
await Editor.Profile.getConfig(packageJSON.name, 'test.a', 'local'); // undefined
await Editor.Profile.getConfig(packageJSON.name, 'test.a', 'global'); // undefined
```

读取项目配置

```javascript
const packageJSON = require('./package.json');
// await Editor.Profile.getConfig(pkgName, key, protocol);
await Editor.Profile.getProject(packageJSON.name, 'test.a'); // 1
await Editor.Profile.getProject(packageJSON.name, 'test.a', 'project'); // undefined
```

## 配置存放的地方

### 编辑器配置存放的地方

| 层级    | 路径                                                         |
| ------- | ------------------------------------------------------------ |
| local   | `{projectPath}/profiles/v2/extensions/{extensionName}.json`  |
| global(mac)  | `Users/{name}/.CocosCreator/profiles/v2/extensions/{extensionName}.json` |
| global(window)  | `c/Users/{name}/.CocosCreator/profiles/v2/extensions/{extensionName}.json` |
| default | `{extensionPath}/package.json`                              |

### 项目配置存放的地方

| 层级    | 路径                                                        |
| ------- | ----------------------------------------------------------- |
| local   | `{projectPath}/settings/v2/extensions/{extensionName}.json` |
| default | `{extensionPath}/package.json`                             |
