# 配置系统

Cocos Creator 扩展提供了一套配置管理机制，用于在扩展保存用户设置和数据。

## 配置类型

配置类型有两种：
1. 编辑器配置（editor）
2. 项目配置（project）

### 编辑器配置

编辑器配置用于存放一些编辑器相关的用户设置和数据，分成三个优先级，从高到低今次为：

```
local -> global -> default
```

在进行配置数据获取时，会优先采用 `local` 中的配置项，若 `local` 中无对应配置项，则会采用 `global` 中的配置项，若 `global` 中也找不到对应配置项，则会采用默认的 `default` 配置。

### 项目配置

项目配置用于存放一些和项目相关的用户设置和数据，分成两优先级，从高到低为：

```
local -> default
```

和 **编辑器配置** 的规则类似，在进行配置数据获取时，会优先采用 `local` 中的配置项，若 `local` 中无对应配置项，则会采用默认的 `default` 配置。

## 注册配置

若要使用配置系统，需要在扩展定义文件 `package.json` 的 `contributions` 字段中定义 `profile` 相关信息，如下所示：

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

**contributions.profile** 相关的字段释义如下：
- `editor`:{} - 编辑器配置
- `project`:{} - 项目配置
- `test.a`：{} - key 为 test.a 的配置项
- `default`:any - 此配置项的默认值，可选参数
- `message`:string - 此配置项被修改时会触发此消息，可选参数
- `label`:string - 在可以显示配置的地方，可能会显示这个描述。支持 i18n:key 格式，可选参数

`profile` 相关的 TypeScript 接口定义如下：

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

## 读取与修改配置

### 导入扩展定义

```typescript
import packageJSON from '../package.json';
```

`Editor.Profile.getConfig` 最后一个参数为空的情况，会进行 [优先级](#%E7%BC%96%E8%BE%91%E5%99%A8%E9%85%8D%E7%BD%AE) 匹配。

若指定了获取位置（`local` 、 `global` 、`default` 三者之一），则会返回对应的值。如下所示，获取到的 `local` 和 `global` 为 `undefined` 是因为未对其进行设置。

```typescript
await Editor.Profile.getConfig(packageJSON.name, 'test.a'); // 0
await Editor.Profile.getConfig(packageJSON.name, 'test.a', 'local'); // undefined
await Editor.Profile.getConfig(packageJSON.name, 'test.a', 'global'); // undefined
```

### 修改编辑器配置

用以下代码修改配置后再调用 `getConfig` 可以看到对应变化。

```typescript
await Editor.Profile.setConfig(packageJSON.name, 'test.a', 1);
await Editor.Profile.setConfig(packageJSON.name, 'test.a', 'local', 2);
await Editor.Profile.setConfig(packageJSON.name, 'test.a', 'global', 3);
```

### 读取项目配置

`Editor.Profile.getProject` 最后一个参数为空的情况，会进行 [优先级](#%E9%A1%B9%E7%9B%AE%E9%85%8D%E7%BD%AE) 匹配。

若指定了获取位置（`local` 、`default` 二者之一），则会返回对应的值。如下所示，获取到的 `local` 为 `undefined` 是因为未对其进行设置。

```typescript
await Editor.Profile.getProject(packageJSON.name, 'test.a'); // 1
await Editor.Profile.getProject(packageJSON.name, 'test.a', 'local'); // undefined
```

### 修改项目配置

用以下代码修改配置后再调用 `getProject` 可以看到对应变化。

```typescript
await Editor.Profile.setProject(packageJSON.name, 'test.a', 1);
await Editor.Profile.setProject(packageJSON.name, 'test.a', 'local', 2);
```

## 存储路径

### 编辑器配置存储路径

| 层级    | 路径                                                         |
| ------- | ------------------------------------------------------------ |
| local   | `{projectPath}/profiles/v2/extensions/{extensionName}.json`  |
| global(mac)  | `Users/{name}/.CocosCreator/profiles/v2/extensions/{extensionName}.json` |
| global(window)  | `c/Users/{name}/.CocosCreator/profiles/v2/extensions/{extensionName}.json` |
| default | `{extensionPath}/package.json`                              |

### 项目配置存储路径

| 层级    | 路径                                                        |
| ------- | ----------------------------------------------------------- |
| local   | `{projectPath}/settings/v2/extensions/{extensionName}.json` |
| default | `{extensionPath}/package.json`                             |
