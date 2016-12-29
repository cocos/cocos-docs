# Editor (Console Module)

## Methods

### Editor.clearLog(pattern, useRegex)

 - `pattern` string - Specify the clear pattern
 - `useRegex` boolean - If we use regex for the clear pattern

Clear the logs. If we specify `pattern` for the method, it will clear the match pattern.
The method will send ipc message `editor:console-clear` to all windows.

### Editor.connectToConsole()

After we call this function, all the incoming logs will be stored in the memory, and can be queried by ipc message `editor:console-query`.

### Editor.error([...args])

 - `...args` ... - Whatever arguments the message needs

Log the error message and show on the console, it also shows the call stack start from the function call it.
The method will sends ipc message `editor:console-error` to all windows.

### Editor.fatal([...args])

 - `...args` ... - Whatever arguments the message needs

Log the fatal message and show on the console, the app will quit immediately after that.

### Editor.failed([...args])

 - `...args` ... - Whatever arguments the message needs

Log the failed message and show on the console
The method will send ipc message `editor:console-failed` to all windows.

### Editor.info([...args])

 - `...args` ... - Whatever arguments the message needs

Log the info message and show on the console
The method will send ipc message `editor:console-info` to all windows.

### Editor.log([...args])

 - `...args` ... - Whatever arguments the message needs

Log the normal message and show on the console.
The method will send ipc message `editor:console-log` to all windows.

### Editor.success([...args])

 - `...args` ... - Whatever arguments the message needs

Log the success message and show on the console
The method will send ipc message `editor:console-success` to all windows.

### Editor.trace(level[, ...args])

 - `level` string - The log level
 - `...args` ... - Whatever arguments the message needs

Trace the log

### Editor.warn([...args])

 - `...args` ... - Whatever arguments the message needs

Log the warnning message and show on the console, it also shows the call stack start from the function call it.
The method will send ipc message `editor:console-warn` to all windows.

## IPC Messages

### Message: 'editor:console-query'

Return logs stores in the memory in main process.

### Message: 'editor:renderer-console-error'

Log the error message from renderer process.

### Message: 'editor:renderer-console-trace'

Trace the log from renderer process.

### Message: 'editor:renderer-console-failed'

Log the failed message from renderer process.

### Message: 'editor:renderer-console-info'

Log the failed message from renderer process.

### Message: 'editor:renderer-console-log'

Log the normal message from renderer process.

### Message: 'editor:renderer-console-success'

Log the success message from renderer process.

### Message: 'editor:renderer-console-warn'

Log the warning message from renderer process.
