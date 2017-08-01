# Editor.Undo

## Methods

### Editor.Undo.undo ()

### Editor.Undo.redo ()

### Editor.Undo.add (id, info)

  - `id` string
  - `info` object

### Editor.Undo.commit ()

### Editor.Undo.cancel ()

### Editor.Undo.collapseTo (index)

  - `index` number

### Editor.Undo.save ()

### Editor.Undo.clear ()

### Editor.Undo.reset ()

### Editor.Undo.dirty ()

### Editor.Undo.setCurrentDescription (desc)

  - `desc` string

### Editor.Undo.register (id, cmd)

  - `id` string
  - `cmd` Editor.Undo.Command

## Class: Editor.Undo.Command

## Instance Methods

### cmd.undo ()

### cmd.redo ()

### cmd.dirty ()
