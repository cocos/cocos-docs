# Editor.Window

## Methods

### Editor.Window.open (name, url, options)

  - `name` string
  - `url` string
  - `options` object

Open a new `Editor.Window` with `options` and load `url`.

### Editor.Window.focus ()

Focus on current window.

### Editor.Window.load (url, argv)

  - `url` string
  - `argv` object

Load `url` in current window.

### Editor.Window.resize (w, h, useContentSize)

  - `w` number
  - `h` number
  - `useContentSize` boolean

Resize current window.

### Editor.Window.resizeSync (w, h, useContentSize)

  - `w` number
  - `h` number
  - `useContentSize` boolean

Resize current window synchronously.

### Editor.Window.center ()

Center the window.

## IPC Messages

### Message: 'editor:window-inspect'

Turn on the inspect element mode.
