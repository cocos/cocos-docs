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

```sh
local -> global -> default
```

### 项目设置

存放一些和项目相关的配置，这些配置允许，并且需要在项目间共享。

项目设置分成两个层级，优先级从高到低：

```sh
local -> default
```

## 注册配置

<span id="interface"></span>

```typescript
interface ProfileItem {
    // 默认值
    default: any;
    // 被修改后的通知消息
    message?: string;
    // 配置显示的名字，如果需要翻译，则传入 i18n:${key}
    label?: string;
    // 配置的说明,会出现在tooltip上
    description?: string;
}

// package.json的contributions 需要像下面这样定义
interface Contributions {
    // 配置
    'profile': {
        // 编辑器配置
        editor: { [key: string]: ProfileItem };
        // 项目配置
        project: { [key: string]: ProfileItem };
    };
    ...
}
```

先像这样设置package.json

```json
{
    "name": "hello-world",
    "contributions": {
        "profile": {
            "editor": {
                "test.a": {
                    "default": 0,
                    "message": "editor-test-a-changed",
                    "label": "测试编辑器配置",
                    "description":"test for editor's profile"
                }
            },
            "project": {
                "test.a": {
                    "default": 1,
                    "message": "project-test-a-changed",
                    "label": "测试项目配置",
                    "description":"test for project's profile"
                }
            }
        }
    },
}
```

### profile

类型 {object} 可选

`contributions.profile` 分成 editor 和 project 两种配置，这两中配置的定义都是 object 对象。
object 的 key 为配置的 key，value 则是描述这个配置的基本信息。

#### default

类型 {any} 可选

配置的默认值。可以是任何类型。

#### message

类型 {string} 可选

当消息修改后，会触发定义的消息。用于配置改变的时候动态更新一些数据。

#### label

类型 {string} 可选

简单的描述这个配置。在可以显示配置的地方，可能会显示这个描述。支持 i18n:key 格式

## 读取配置

读取编辑器配置

```typescript
Editor.Profile.getConfig(name: string, key?: string | undefined, type?: "default" | "global" | "local" | undefined): Promise<any>
```

```javascript
await Editor.Profile.getConfig('hello-world','test.a'); // 0
await Editor.Profile.getConfig('hello-world','test.a','local'); // undefined
await Editor.Profile.getConfig('hello-world','test.a','global'); // undefined
```

读取项目配置

```typescript
Editor.Profile.getProject(name: string, key?: string | undefined, type?: "default" | "project" | undefined): Promise<any>
```

```javascript
await Editor.Profile.getProject('hello-world','test.a'); // 1
await Editor.Profile.getProject('hello-world','test.a','project'); // undefined
```

## 写入配置

写入编辑器配置

```typescript
Editor.Profile.setConfig(name: string, key: string, value: any, type?: "default" | "global" | "local" | undefined): Promise<void>
```

```javascript
await Editor.Profile.setConfig('hello-world', 'test.a', 1); // 0
await Editor.Profile.setConfig('hello-world', 'test.a', 1, 'local'); // undefined
await Editor.Profile.setConfig('hello-world', 'test.a', 1, 'global'); // undefined
```

写入项目配置

```typescript
Editor.Profile.setProject(name: string, key: string, value: any, type?: "default" | "project" | undefined): Promise<void>
```

```javascript
await Editor.Profile.setProject('hello-world', 'test.a', 1); // 1
await Editor.Profile.setProject('hello-world', 'test.a', 1, 'project'); // undefined
```

## 配置存放的地方

编辑器配置存放的地方

| 层级    | 路径                                                         |
| ------- | ------------------------------------------------------------ |
| local   | `${projectPath}/profiles/v2/packages/${extensionName}.json`  |
| global  | `C:/Users/Administrator/.CocosCreator/profiles/v2/packages/${extensionName}.json` |
| default | `${extensionPath}/package.json`                              |

项目配置存放的地方

| 层级    | 路径                                                        |
| ------- | ----------------------------------------------------------- |
| local   | `${projectPath}/settings/v2/packages/${extensionName}.json` |
| default | `${extensionPath}/package.json`                             |
