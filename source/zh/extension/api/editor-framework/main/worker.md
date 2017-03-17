# Editor.Worker

## Class: Editor.Worker

### new Editor.Worker (name[, options])

  - `name` string - The worker name.
  - `options` object
    - `workerType` string - Can be one of the list:
      - `renderer`: Indicate the worker is running in a hidden window
      - `main`: Indicate the worker is running is a process
    - `url` string - The url of renderer worker.

## Instance Methdos

### worker.close ()

Close the worker.

### worker.dispose ()

Dereference the native window.

### worker.on (message[, ...args])

  - `message` string
  - `...args` ... - Whatever arguments the message needs.

### worker.start (argv, cb)

  - `argv` object - The arguments
  - `cb` function - The callback function

Starts the worker.
