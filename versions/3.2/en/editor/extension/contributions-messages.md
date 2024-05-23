# Message

In the **Cocos Creator**, all interactions are done through [Message](./messages.md).

The message needs to be defined in `contributions` before it can be used.

## View public messages

In the top menu **Developer -> Message List**, the editor presets a **Message Manager** panel that displays public messages and descriptions of each function definition.

## Define a message

```json
{
    "name": "hello-world",
    "contributions": {
        "messages": {
            "messageName": {
                "public": false,
                "description": "",
                "doc": "",
                "methods": []
            }
        }
    }
}
```

### public

Type `{string}` Optional

Whether to display this message externally, if true, the basic information of this message will be displayed on the message list interface.

### description

Type `{string}` Optional

If public is true, some simple descriptions will be displayed in the message list, supporting `i18n: key` syntax.

### doc

Type `{string}` Optional

If public is true, some documents of this message will be displayed, supporting i18n:key syntax.

This document is written and rendered in markdown format.

### methods

Type `{string[]}` Optional

The method queue triggered by the message.

This is an array of strings. The strings are methods on the extension or panel.

If it is a method on the extension, directly define `methodName`, if you want to trigger a method on the panel, you must fill in `panelName.methodName`. For example, the `ready` method of the scene manager is `scene:ready`.

## Define broadcast message

When developing an extension, you need to send some notifications to other extension after completing an action. If these notifications also need to be displayed on the **Developer -> Message List** panel, you can define the message like this:

```json
{
    "name": "hello-world",
    "contributions": {
        "messages": {
            "hello-world:ready": {
                "public": true,
                "description": "hello-world ready notification"
            }
        }
    }
}
```
