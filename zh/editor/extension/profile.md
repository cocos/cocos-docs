# 配置系统

## 配置类型

编辑器里的配置分成了两种：

- 编辑器设置（editor）
- 项目设置（project）

### 编辑器设置

存放一些编辑器相关的功能设置。这部分也是编辑器的主要配置。

编辑器设置分成三个层级，优先级从高到低：

```
local -> global -> default
```

分别位于：

| 层级    | 路径                                                         |
| ------- | ------------------------------------------------------------ |
| local   | `{projectPath}/profiles/v2/extensions/{extensionName}.json`  |
| global  | (mac)：`Users/{name}/.CocosCreator/profiles/v2/extensions/{extensionName}.json` </br> (window)：`c/Users/{name}/.CocosCreator/profiles/v2/extensions/{extensionName}.json` |
| default | `{extensionPath}/package.json`                              |

### 项目设置

存放一些和项目相关的配置，这些配置允许项目间共享。

```
local -> default
```

分别位于：

| 层级    | 路径                                                        |
| ------- | ----------------------------------------------------------- |
| local   | `{projectPath}/settings/v2/extensions/{extensionName}.json` |
| default | `{extensionPath}/package.json`                             |

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
    // 配置更改后，会自动发送这个消息进行通知。常用于动态更新一些数据。
    message: string;
    // 描述配置的作用，支持 i18n:key 语法
    label: string;
}
```

`contributions.profile` 分成 `editor` 和 `project` 两种配置。`key` 为自定义配置名，值为 `ProfileItem` 类型。

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
// await Editor.Profile.getProject(pkgName, key, protocol);
await Editor.Profile.getProject(packageJSON.name, 'test.a'); // 1
await Editor.Profile.getProject(packageJSON.name, 'test.a', 'project'); // undefined
```
