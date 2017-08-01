# Editor

## Methods

### Editor.url(url)

 - `url` string

Returns the file path (if it is registered in custom protocol) or url (if it is a known public protocol).

### Editor.loadProfile(url, cb)

  - `url` string - The profile url.
  - `cb` function - The callback function.

Load profile via `url`. Once it is loaded, the `cb` will be invoked and returns profile as the first argument.  

### Editor.import(urls)

  - `urls` string|array - The url list.
