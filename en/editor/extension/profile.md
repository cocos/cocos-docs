# Configuration system

When writing an extension, it may be necessary to save configurations and provide some configurations for users to customize settings. Therefore, a configuration management mechanism is provided in the editor.

## Configuration Type

The configuration in the editor is divided into two types:

1. Editor settings
2. Project Settings

### Editor settings

Store some editor-related function settings. This part is also the main configuration of the editor.

The editor settings are divided into three levels, with priority from high to low:

```sh
local -> global -> default
```

### Project Settings

Store some project-related configurations, which are allowed and need to be shared between projects.

```sh
local -> default
```

## Register Configuration

<span id="interface"></span>

```typescript
interface ProfileItem {
    // Configured default data
    default: any;
    // After configuration changes, this message will be automatically sent to notify
    message?: string;
    // Simply describe the role of configuration information, support i18n:key syntax
    label?: string;
    // A description of the configuration appears on tooltip
    description?: string;
}

// package.json的contributions 需要像下面这样定义
interface Contributions {
    'profile': {
        // Editor configuration
        editor: { [key: string]: ProfileItem };
        // Project configuration
        project: { [key: string]: ProfileItem };
    };
    ...
}
```

Set the package.json like this

```json
{
    "name": "hello-world",
    "contributions": {
        "profile": {
            "editor": {
                "test.a": {
                    "default": 0,
                    "message": "editorTestAChanged",
                    "label": "Test Editor Configuration",
                    "description":"test for editor's profile"
                }
            },
            "project": {
                "test.a": {
                    "default": 1,
                    "message": "projectTestAChanged",
                    "label": "Test project configuration",
                    "description":"test for project's profile"
                }
            }
        }
    },
}
```

### profile

`Type {object} optional`

`contributions.profile` is divided into editor and project configurations. The definitions of these two configurations are object objects. The key of the object is the key of the configuration, and the value is the basic information describing the configuration.

#### default

`Type {any} optional`

The default value of the configuration. It can be of any type.

#### message

`Type {string} optional`

When the message is modified, the defined message will be triggered. Used to dynamically update some data when configuration changes.

#### label

`Type {string} optional`

Briefly describe this configuration. Where the configuration can be displayed, this description may be displayed. Support i18n:key format

## Read configuration

Read editor configuration

```typescript
Editor.Profile.getConfig(name: string, key?: string | undefined, type?: "default" | "global" | "local" | undefined): Promise<any>
```

```javascript
await Editor.Profile.getConfig('hello-world','test.a'); // 0
await Editor.Profile.getConfig('hello-world','test.a','local'); // undefined
await Editor.Profile.getConfig('hello-world','test.a','global'); // undefined
```

Read project configuration

```typescript
Editor.Profile.getProject(name: string, key?: string | undefined, type?: "default" | "project" | undefined): Promise<any>
```

```javascript
await Editor.Profile.getProject('hello-world','test.a'); // 1
await Editor.Profile.getProject('hello-world','test.a','project'); // undefined
```

## Write Configuration

Write to editor configuration

```typescript
Editor.Profile.setConfig(name: string, key: string, value: any, type?: "default" | "global" | "local" | undefined): Promise<void>
```

```javascript
await Editor.Profile.setConfig('hello-world', 'test.a', 1); // 0
await Editor.Profile.setConfig('hello-world', 'test.a', 1, 'local'); // undefined
await Editor.Profile.setConfig('hello-world', 'test.a', 1, 'global'); // undefined
```

Write to project configuration

```typescript
Editor.Profile.setProject(name: string, key: string, value: any, type?: "default" | "project" | undefined): Promise<void>
```

```javascript
await Editor.Profile.setProject('hello-world', 'test.a', 1); // 1
await Editor.Profile.setProject('hello-world', 'test.a', 1, 'project'); // undefined
```

## The location of the configuration

location of the editor's configuration

| level    | location                                                        |
| ------- | ------------------------------------------------------------ |
| local   | `${projectPath}/profiles/v2/packages/${extensionName}.json`  |
| global  | `C:/Users/Administrator/.CocosCreator/profiles/v2/packages/${extensionName}.json` |
| default | `${extensionPath}/package.json`                              |

location of the project's configuration

| level    | location                                                        |
| ------- | ----------------------------------------------------------- |
| local   | `${projectPath}/settings/v2/packages/${extensionName}.json` |
| default | `${extensionPath}/package.json`                             |
