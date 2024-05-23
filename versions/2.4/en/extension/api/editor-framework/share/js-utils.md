# Editor.JS

Extending JavaScript to better handle property and class inheritance.

## Methods

### Editor.JS.addon (obj, ...args)

  - `obj` object
  - `...args` object

Copy all properties not defined in obj from arguments[1...n] to it.

### Editor.JS.assign (obj, ...args)

  - `obj` object
  - `...args` object

Copy all properties from arguments[1...n] to `obj`, return the mixed result.

### Editor.JS.assignExcept (obj, src, except)

  - `obj` object
  - `src` object
  - `except` array

Copy all properties from arguments[1...n] to `obj` except the specific ones.

### Editor.JS.clear (obj)

  - `obj` object

Removes all enumerable properties from object.

### Editor.JS.copyprop (name, source, target)

  - `name` string
  - `source` object
  - `target` object

Copy property by name from source to target.

### Editor.JS.extend (cls, base)

  - `cls` function
  - `base` function

Derive the class from the supplied base class.

### Editor.JS.extract (obj, propNames)

  - `obj` object
  - `except` array(string)

Extract properties by `propNames` from `obj`, return the extracted result.

### Editor.JS.getPropertyByPath (obj, path)

  - `obj` object
  - `path` string

Get property by path.
