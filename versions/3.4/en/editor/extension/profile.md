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

```json
{
    "name": "hello-world",
    "contributions": {
        "profile": {
            "editor": {
                "test.a": {
                    "default": 0,
                    "message": "editorTestAChanged",
                    "label": "Test Editor Configuration"
                }
            },
            "project": {
                "test.a": {
                    "default": 1,
                    "message": "projectTestAChanged",
                    "label": "Test project configuration"
                }
            }
        }
    },
}
```

```typescript
interface ProfileInfo {
    editor: {[key: string ]: ProfileItem };
    project: {[key: string ]: ProfileItem };
}

interface ProfileItem {
    // Configured default data
    default: any;
    // After configuration changes, this message will be automatically sent to notify
    message: string;
    // Simply describe the role of configuration information, support i18n:key syntax
    label: string;
}
```

`contributions.profile` is divided into editor and project configurations. The definitions of these two configurations are object objects. The key of the object is the key of the configuration, and the value is the basic information describing the configuration.

### default

`Type {any} optional`

The default value of the configuration. It can be of any type.

### message

`Type {string} optional`

When the message is modified, the defined message will be triggered. Used to dynamically update some data when configuration changes.

### label

`Type {string} optional`

Briefly describe this configuration. Where the configuration can be displayed, this description may be displayed. Support i18n:key format

## Read configuration

Read editor configuration

```javascript
const packageJSON = require('./package.json');
// await Editor.Profile.getConfig(pkgName, key, protocol);
await Editor.Profile.getConfig(packageJSON.name,'test.a'); // 0
await Editor.Profile.getConfig(packageJSON.name,'test.a','local'); // undefined
await Editor.Profile.getConfig(packageJSON.name,'test.a','global'); // undefined
```

Read project configuration

```javascript
const packageJSON = require('./package.json');
// await Editor.Profile.getConfig(pkgName, key, protocol);
await Editor.Profile.getProject(packageJSON.name,'test.a'); // 1
await Editor.Profile.getProject(packageJSON.name,'test.a','project'); // undefined
```
