# Editor.Console

## Methods

### Editor.trace(level[, ...args])

 - `level` String - The log level
 - `...args` ... - Whatever arguments the message needs

Trace the log.

### Editor.log([...args])

 - `...args` ... - Whatever arguments the message needs

Log the normal message and show on the console.
The method will send ipc message `editor:renderer-console-log` to the main process.

### Editor.success([...args])

 - `...args` ... - Whatever arguments the message needs

Log the success message and show on the console.
The method will send ipc message `editor:renderer-console-success` to the main process.

### Editor.failed([...args])

 - `...args` ... - Whatever arguments the message needs

Log the failed message and show on the console.
The method will send ipc message `editor:renderer-console-failed` to the main process.

### Editor.info([...args])

 - `...args` ... - Whatever arguments the message needs

Log the info message and show on the console.
The method will send ipc message `editor:renderer-console-info` to the main process.

### Editor.warn([...args])

 - `...args` ... - Whatever arguments the message needs

Log the warn message and show on the console.
The method will send ipc message `editor:renderer-console-warn` to the main process.

### Editor.error([...args])

 - `...args` ... - Whatever arguments the message needs

Log the error message and show on the console.
The method will send ipc message `editor:renderer-console-error` to the main process.
