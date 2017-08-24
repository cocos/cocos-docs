# Editor.Window

## Class: Editor.Window

### new Editor.Window (name[, options])

  - `name` string - The window name.
  - `options` object - The [Electron's BrowserWindow options](http://electron.atom.io/docs/api/browser-window/#new-browserwindowoptions) with the following additional field  
    - `windowType` string - Can be one of the list:
      - `dockable`: Indicate the window contains a dockable panel
      - `float`: Indicate the window is standalone, and float on top.
      - `fixed-size`: Indicate the window is standalone, float on top and non-resizable.
      - `quick`: Indicate the window will never destroyed, it only hides itself when it close which make it quick to show the next time.
    - `save` boolean - Indicate if save the window position and size.

Window class for operating editor window.

## Instance Methods

### win.adjust (x, y, w, h)

  - `x` number
  - `y` number
  - `w` number
  - `h` number

Try to adjust the window to fit the position and size we give.

### win.close ()

Close the window.

### win.closeDevTools ()

Closes the devtools.

### win.dispose ()

Dereference the native window.

### win.emptyLayout ()

Clear all panels docked in current window.

### win.focus ()

Focus on the window.

### win.forceClose ()

Force close the window.

### win.hide ()

Hide the window.

### win.load (editorUrl, argv)

  - `editorUrl` string
  - `argv` object

Load page by url, and send `argv` in query property of the url. The renderer process will parse the `argv` when the page is ready and save it in `Editor.argv` in renderer process.

### win.minimize ()

Minimize the window.

### win.openDevTools (options)

  - `options` object
    - `mode` string - Opens the devtools with specified dock state, can be `right`, `bottom`, `undocked`, `detach`. Defaults to last used dock state. In `undocked` mode it`s possible to dock back. In detach mode it`s not.  

Opens the devtools.

### win.popupMenu (template[, x, y])

  - `template` object - The menu template.
  - `x` number - The x position.
  - `y` number - The y position.

Popup a context menu.

### win.resetLayout ([url])

  - `url` string

Reset the dock layout of current window via `url`

### win.restore ()

Restore the window.

### win.show ()

Show the window.

### win.send (message[, ...args])

  - `message` string - The message name.
  - `...args` ... - Whatever arguments the message needs.
  - `callback` function - You can specify a callback function to receive IPC reply at the last or the 2nd last argument.
  - `timeout` number - You can specify a timeout for the callback at the last argument. If no timeout specified, it will be 5000ms.

Send `message` with `...args` to renderer process asynchronously. It is possible to add a callback as the last or the 2nd last argument to receive replies from the IPC receiver.

## Instance Properties

### win.isFocused

If the window is focused.

### win.isLoaded

If the window is loaded.

### win.isMainWindow

If this is a main window.

### win.isMinimized

If the window is minimized.

### win.panels

Returns the id list of the panel dock on this window.

## Static Properties

### Editor.Window.defaultLayoutUrl

The url of the default layout.

### Editor.Window.main

The main window.

### Editor.Window.windows

The current opened windows.

## Static Methods

### Editor.Window.addWindow ( win )

  - `win` Editor.Window

Add an Editor.Window to window list.

### Editor.Window.find ( param )

  - `param` string|BrowserWindow|WebContents

Find window by name, by `BrowserWindow` instance or by `WebContents` instance. Returns the `Editor.Window`.

### Editor.Window.removeWindow ( win )

  - `win` Editor.Window

Remove an Editor.Window from window list.

## IPC Messages

### Message: 'editor:window-center'

### Message: 'editor:window-focus'

### Message: 'editor:window-inspect-at'

### Message: 'editor:window-load'

### Message: 'editor:window-open'

### Message: 'editor:window-query-layout'

### Message: 'editor:window-remove-all-panels'

### Message: 'editor:window-resize'

### Message: 'editor:window-save-layout'
