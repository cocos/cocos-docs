# 扩展配置系统

## 注册配置

先像这样设置 `package.json` 。

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
    }
}
```

这样就定义好了两个配置数据，都叫做 test.a ,分别存放在项目配置和编辑器配置。
在配置修改的时候分别会发送消息 `editor-test-a-changed` 和 `project-test-a-changed` 给扩展

`package.json` 的 `contributions` 需要像下面这样定义。

```typescript
interface ProfileItem {
    // 默认值
    default: any;
    // 当消息修改后，会触发定义的消息。用于配置改变的时候动态更新一些数据
    message?: string;
    // 简单的描述这个配置。在可以显示配置的地方，可能会显示这个描述。支持 i18n:key 格式。
    label?: string;
    // 配置的说明,会出现在tooltip上
    description?: string;
}

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

## 读取配置

读取编辑器配置

```typescript
Editor.Profile.getConfig(name: string, key?: string | undefined, type?: "default" | "global" | "local" | undefined): Promise<any>;
```

```javascript
await Editor.Profile.getConfig('hello-world','test.a'); // 0
await Editor.Profile.getConfig('hello-world','test.a','local'); // undefined
await Editor.Profile.getConfig('hello-world','test.a','global'); // undefined
```

读取项目配置

```typescript
Editor.Profile.getProject(name: string, key?: string | undefined, type?: "default" | "project" | undefined): Promise<any>;
```

```javascript
await Editor.Profile.getProject('hello-world','test.a'); // 1
await Editor.Profile.getProject('hello-world','test.a','project'); // undefined
```

## 写入配置

写入编辑器配置

```typescript
Editor.Profile.setConfig(name: string, key: string, value: any, type?: "default" | "global" | "local" | undefined): Promise<void>;
```

```javascript
await Editor.Profile.setConfig('hello-world', 'test.a', 1); // 0
await Editor.Profile.setConfig('hello-world', 'test.a', 1, 'local'); // undefined
await Editor.Profile.setConfig('hello-world', 'test.a', 1, 'global'); // undefined
```

写入项目配置

```typescript
Editor.Profile.setProject(name: string, key: string, value: any, type?: "default" | "project" | undefined): Promise<void>;
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
