# Editor.Utils

## Methods

### Editor.Utils.padLeft (text, width, ch)

  - `text` string
  - `width` number
  - `ch` string - The character used to pad

### Editor.Utils.toFixed (value, precision, optionals)

  - `value` number
  - `precision` number
  - `optionals` number

Implementation of toFixed() that treats floats more like decimals

Fixes binary rounding issues (eg. (0.615).toFixed(2) === '0.61') that present
problems for accounting- and finance-related software.

### Editor.Utils.formatFrame (frame, frameRate)

  - `frame` number
  - `frameRate` number

### Editor.Utils.smoothScale (curScale, delta)

  - `curScale` number
  - `delta` number

### Editor.Utils.wrapError (curScale, delta)

  - `err` Error

### Editor.Utils.arrayCmpFilter (items, func)

  - `items` array
  - `func` function

### Editor.Utils.fitSize (srcWidth, srcHeight, destWidth, destHeight)

  - `srcWidth` number
  - `srcHeight` number
  - `destWidth` number
  - `destHeight` number

### Editor.Utils.prettyBytes (num)

  - `num` number

Convert bytes to a human readable string: 1337 → 1.34 kB. Reference: https://github.com/sindresorhus/pretty-bytes

### Editor.Utils.run (execFile, ...args)

  - `execFile` string
  - `...args` ...

run `execFile` with `args`.
