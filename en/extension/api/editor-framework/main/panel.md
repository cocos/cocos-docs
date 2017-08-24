# Editor.Panel

Panel module for operating panels

## Methods

### Editor.Panel.close (panelID, cb)

  - `panelID` string - The panelID.
  - `cb` function

Close a panel via `panelID`.

### Editor.Panel.findWindow (panelID)

  - `panelID` string - The panelID.

Find and return an editor window that contains the panelID.

### Editor.Panel.open (panelID, argv)

  - `panelID` string - The panelID.
  - `argv` object - Argument store as key-value table, which will be used in panel's `run` function in renderer process.

Open a panel via `panelID` and pass `argv` to it. The `argv` will be execute in panel's run function in renderer process.

### Editor.Panel.popup (panelID)

  - `panelID` string - The panelID.

Popup an exists panel via `panelID`.

## Properties

### templateUrl

The html entry file used for standalone panel window. Default is 'editor-framework://static/window.html'.

## IPC Messages

### Message: 'editor:panel-close'

### Message: 'editor:panel-dock'

### Message: 'editor:panel-open'

### Message: 'editor:panel-popup'

### Message: 'editor:panel-query-info'
