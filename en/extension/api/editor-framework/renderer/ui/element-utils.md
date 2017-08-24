# Editor.UI (Element Utils Module)

## Methods

### Editor.UI.getProperty (type)

  - `type` string

Get registered property via `type`.

### Editor.UI.parseArray (txt)

  - `txt` string

Parse `txt` as an array.

### Editor.UI.parseBoolean (txt)

  - `txt` string

Parse `txt` as a boolean value.

### Editor.UI.parseColor (txt)

  - `txt` string

Parse `txt` as a color object.

### Editor.UI.parseObject (txt)

  - `txt` string

Parse `txt` as an object.

### Editor.UI.parseString (txt)

  - `txt` string

Parse `txt` as a string.

### Editor.UI.regenProperty (propEL, cb)

  - `propEL` HTMLElement
  - `cb` function

Regenerate property at `propEL`.

### Editor.UI.registerElement (name, def)

  - `name` string
  - `def` object

Register a custom element.

### Editor.UI.registerProperty (type, protoOrUrl)

  - `type` string
  - `protoOrUrl` object|string

Register a custom property.

### Editor.UI.unregisterProperty (type)

  - `type` string

Unregister a custom property.
