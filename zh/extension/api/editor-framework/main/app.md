# Editor.App

## Properties

### Editor.App.focused

Indicates if application is focused

### Editor.App.home

Your application's home path. Usually it is `~/.{your-app-name}`

### Editor.App.name

The name of your app loaded from the `name` field in `package.json`.

### Editor.App.path

Your path of your application.

### Editor.App.version

The version of your app loaded from the `version` field in `package.json`.

## Methods

### Editor.App.emit(eventName[, ...args])

 - `eventName` string - The name of the event
 - `...args` ... - Arguments

Emits event by name.

### Editor.App.extends(proto)

 - `proto` object - The prototype used to extends

Extends the Editor.App module. More details read [App Lifecycle callbacks](../manual/getting-started/app-lifecycle-an-events.md)

### Editor.App.off(eventName, listener)

 - `eventName` string - The name of the event
 - `listener` function - The callback function

Removes an event listner function.

### Editor.App.on(eventName, listener)

 - `eventName` string - The name of the event
 - `listener` function - The callback function

Adds an event listner function.

### Editor.App.once(eventName, listener)

 - `eventName` string - The name of the event
 - `listener` function - The callback function

Adds a one time event listner function.

## Events

### Event: 'blur'

Emit when your app is blurred.

### Event: 'focus'

Emit when your app is focused.

### Event: 'quit'

Emit when Editor.App closed all window and main process services.
