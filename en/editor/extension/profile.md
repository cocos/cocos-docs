# Configuration System

The Cocos Creator extension provides a configuration management mechanism for saving user settings and data in the extension.

## Configuration Types

There are two types of configuration types.
1. editor configuration (editor)
2. project configuration (project)

### Editor Configuration

The editor configuration is used to store some editor-related user settings and data, and is divided into three priority levels, from high to low, as follows.

```
local -> global -> default
```

If there is no corresponding configuration in `local`, the configuration in `global` will be used, and if no corresponding configuration in `global` is found, the default `default` configuration will be used.

### Project Configuration

The project configuration is used to store some project-related user settings and data, and is divided into two priority levels, from highest to lowest.

```
local -> default
```

Similar to the rules of **Editor Configuration**, when fetching configuration data, the configuration item in `local` will be used first, and if there is no corresponding configuration item in `local`, the default `default` configuration will be used.

## Registering Configuration

To use the configuration system, you need to define the `profile` information in the `contributions` field of the extension definition file `package.json`, as follows.

```json
{
    "name": "hello-world",
    "contributions": {
        "profile": {
            "editor": {
                "test.a": {
                    "default": 0,
                    "message": "editorTestAChanged",
                    "label": "Test Editor configuration"
                }
            },
            "project": {
                "test.a": {
                    "default": 1,
                    "message": "projectTestAChanged",
                    "label": "Test Project Configuration"
                }
            }
        }
    },
}
```

**contributions.profile** The related fields are interpreted as follows.
- `editor`:{} - editor configuration
- `project`:{} - project configuration
- `test.a`:{} - key for the configuration of test.a
- `default`:any - the default value of this configuration item, optional parameter
- `message`:string - the message that will be triggered when this configuration item is modified, optional
- `label`:string - where the configuration can be displayed, this description may be displayed. Supports i18n:key format, optional parameters

The TypeScript interface associated with `profile` is defined as follows.

```typescript
interface ProfileInfo {
    editor: { [ key: string ]: ProfileItem };
    project: { [ key: string ]: ProfileItem };
}

interface ProfileItem {
    // Default data for configuration
    default: any;
    // This message is automatically sent for notification of configuration changes
    message: string;
    // A simple description of the role of configuration information, supporting the i18n:key syntax
    label: string;
}
```

## Read and Modify Configuration

### Importing Extension Definitions

```typescript
import packageJSON from '../package.json';
```

If the last parameter of `Editor.Profile.getConfig` is empty, a [priority](#Editor%20Configuration) match will be performed.

If the fetch location (one of `local`, `global`, `default`) is specified, the corresponding value will be returned. As shown below, `local` and `global` are `undefined` because they are not set.

```typescript
await Editor.Profile.getConfig(packageJSON.name, 'test.a'); // 0
await Editor.Profile.getConfig(packageJSON.name, 'test.a', 'local'); // undefined
await Editor.Profile.getConfig(packageJSON.name, 'test.a', 'global'); // undefined
```

### Modify the Editor Configuration

Call `getConfig` after modifying the configuration with the following code to see the corresponding changes.

```typescript
await Editor.Profile.setConfig(packageJSON.name, 'test.a', 1);
await Editor.Profile.setConfig(packageJSON.name, 'test.a', 'local', 2);
await Editor.Profile.setConfig(packageJSON.name, 'test.a', 'global', 3);
```

### Read Project Configuration

If the last parameter of `Editor.Profile.getProject` is empty, a [priority](#Project%20Configuration) match will be performed.

If the fetch location (either `local`, `default`) is specified, the corresponding value will be returned. As shown below, the `local` is `undefined` because it is not set.

```typescript
await Editor.Profile.getProject(packageJSON.name, 'test.a'); // 1
await Editor.Profile.getProject(packageJSON.name, 'test.a', 'local'); // undefined
```

### Modify the Project Configuration

Call `getProject` after modifying the configuration with the following code to see the corresponding changes.

```typescript
await Editor.Profile.setProject(packageJSON.name, 'test.a', 1);
await Editor.Profile.setProject(packageJSON.name, 'test.a', 'local', 2);
```

## Storage Paths

### Editor Configuration Storage Path

| Hierarchy | Path                                                       |
| ------- | ------------------------------------------------------------ |
| local   | `{projectPath}/profiles/v2/extensions/{extensionName}.json`  |
| global(mac)  | `Users/{name}/.CocosCreator/profiles/v2/extensions/{extensionName}.json` |
| global(window)  | `c/Users/{name}/.CocosCreator/profiles/v2/extensions/{extensionName}.json` |
| default | `{extensionPath}/package.json`                              |

### Project Configuration Storage Path

| Hierarchy | Path                                                      |
| ------- | ----------------------------------------------------------- |
| local   | `{projectPath}/settings/v2/extensions/{extensionName}.json` |
| default | `{extensionPath}/package.json`                             |
