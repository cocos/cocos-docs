# Extending the Project Settings Panel

[Project Settings](../../editor/project/index.md) holds the configuration related to the running of the project. This part of the configuration allows access to versioning and sharing of configurations by multiple people.

For example, the configuration of built modules, the configuration of layers within the project. If this configuration is not synchronized, it may cause inconsistent results on different machines.

For editor-related configurations, please refer to the [Extending the Preferences Panel](./contributions-preferences.md) documentation.

## Panel Introduction

The project settings are divided into two parts:

- On the left side is the function tab inside the function module
- The right side is the configuration modification screen

The project settings allow a functional extension to register multiple tabs, and accordingly the tabs are marked with text indicating which functionality the tab belongs to.

## Registration Method

First define the configuration in `contributions.profile.project`. The data to be displayed can be defined in the project settings in `contributions.project`.

> **Note**: the data configured in the project settings should be stored in the `project` location.

## Registering Project Settings Data

Define a simple extension:

`package.json`

```JSON
{
    "name": "project-test",
    "contributions": {
        "profile": {
            "project": {
                "foo": {
                    "default": 1,
                }
            }
        },        
        "project": {
            "tab1": {
                "label": "test",
                "content": {
                    "foo": {
                        "ui": "ui-num-input"
                    }
                }
            }
        }        
    }
}
```

A new tab called **test** on the left side of the project settings now exists.
The **Project -> Project Settings** menu from the main menu opens the **Project Settings**.
Once selected, modify the foo configuration in the right panel.

For details on how to define a profile, please review the [Profile](./profile.md) documentation.

```typescript
interface Package
{
    'name': string;
    'contributions': {
        'profile': {
            'project': {
                [key:string]: ProfileItem;
            };
        };
        "project": {
            [key:string]: ProjectGroup;
        }
    }
}

interface ProjectGroup {
    /**
     * Text of the left label in the project settings, i18n supported.
     **/
    label: string;
    /**
     * The project field corresponds to the configuration information injected into the project settings, which are defined as 'object' objects.
     * The object's key is the unique identifier of the project setting, and its value is the basic information describing the project setting.
     **/ 
    content?: { [key: string]: UIInfo };
    /**
     * If the configuration is more complex and automatic rendering cannot meet the needs, you can fill in custom data.
     * Customize the rendering panel in the project settings, which appears below the automatic rendering (if properties are defined).
     **/ 
    custom?: string;
}

/**
 * The information needed to render a configuration
 **/ 
interface UIInfo {
    // Which ui element to use for rendering, e.g.: "ui-num-input"
    ui: string;
    attributes: {
        // The attribute data allowed to be passed on the ui element is different for each type of ui, see the ui-kit section for details
        // Assuming the ui is "ui-num-input", here you can fill in "step": 1
        [key:string]: any;
    };
}
```

As additional reading, please review the [Panel Boot](./panel-boot.md) documentation for panel definitions.
