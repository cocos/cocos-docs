# Editor.Selection

## Methods

### Editor.Selection.register (type)

  - `type` string

### Editor.Selection.reset ()

### Editor.Selection.local ()

Returns a `Editor.Selection.ConfirmableSelectionHelper` instance.

### Editor.Selection.confirm ()

Confirms all current selecting objects, no matter which type they are.
This operation may trigger deactivated and activated events.

### Editor.Selection.cancel ()

Cancels all current selecting objects, no matter which type they are.
This operation may trigger selected and unselected events.

### Editor.Selection.confirmed (type)

  - `type` string

Check if selection is confirmed.

### Editor.Selection.select (type, id[, unselectOthers, confirm])

  - `type` string
  - `id` string
  - `unselectOthers` boolean
  - `confirm` boolean

Select item with its id.

### Editor.Selection.unselect (type, id[, confirm])

  - `type` string
  - `id` string
  - `confirm` boolean

Unselect item with its id.

### Editor.Selection.hover (type, id)

  - `type` string
  - `id` string

Hover item with its id. If id is null, it means hover out.

### Editor.Selection.setContext (type, id)

  - `type` string
  - `id` string

### Editor.Selection.patch (type, srcID, destID)

  - `type` string
  - `srcID` string
  - `destID` string

### Editor.Selection.clear (type)

  - `type` string

### Editor.Selection.hovering (type)

  - `type` string

### Editor.Selection.contexts (type)

  - `type` string

### Editor.Selection.curActivate (type)

  - `type` string

### Editor.Selection.curGlobalActivate (type)

  - `type` string

### Editor.Selection.curSelection (type)

  - `type` string

### Editor.Selection.filter (items, mode, func)

  - `items` array(string)
  - `mode` string - 'top-level', 'deep' and 'name'
  - `func` function
