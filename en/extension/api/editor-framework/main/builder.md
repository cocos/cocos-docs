# Editor.Builder

This document is just a brief introduction to the API. For details on its usage, please refer to [Custom Project Build Process](../../../../publish/custom-project-build-template.md).

## Methods

### Editor.Builder.on(eventName, callback)

- `eventName` string - The name of the event
- `callback` function - The event callback
  - `options` object - Callback params, the build options
  - `cb` function - Need to call `cb` when the callback process finished

### Editor.Builder.once(eventName, callback)

- `eventName` string - The name of the event
- `callback` function - The event callback
  - `options` object - Callback params, the build options
  - `cb` function - Need to call `cb` when the callback process finished

### Editor.Builder.removeListener(eventName, callback)

- `eventName` string - The name of the event
- `callback` function - The event callback


## Events

### Event: 'build-finished'

Emit when build finished

### Event: 'compile-finished'

Emit when compile finished

### Event: 'before-change-files'

Emit before editor modifies the build files (e.g, before encryption js files)
