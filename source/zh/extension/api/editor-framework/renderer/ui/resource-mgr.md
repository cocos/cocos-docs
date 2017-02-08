# Editor.UI (Resources Module)

## Methods

### Editor.UI.getResource (url)

  - `url` string

Get cached resource by `url`.  

### Editor.UI.importResource (url)

  - `url` string

Load and cache the resource then return a promise.

### Editor.UI.importScript (url)

  - `url` string

Load and evaluate the script, cache the result then return a promise.

### Editor.UI.importScripts (urls)

  - `urls` array

Load and evaluate the script list, cache the result then return a promise.

### Editor.UI.importStylesheet (url)

  - `url` string

Load and cache the style sheet by `url` then return a promise.

### Editor.UI.importStylesheets (urls)

  - `urls` array

Load and cache the style sheet by `urls` list then return a promise.

### Editor.UI.importTemplate (url)

  - `url` string

Load and cache the template then return a promise.

### Editor.UI.loadGlobalScript (url, cb)

  - `url` string
  - `cb` function

Load and append script by `url`. Once it is done, the `cb` will be invoked.

**NOTE**: the different between `loadGlobalScript` and `importScript` is `loadGlobalScript` use `<script>` tag, and it will process zipped script internally in browser.
However, `loadGlobalScript` cannot return evaluated result, which means you can only get the context in it by assigning global variable inside the target script.
