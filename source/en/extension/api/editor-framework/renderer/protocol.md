# Editor.Protocol

Protocol module used in `Editor.url` and custom protocol.

## Methods

### Editor.Protocol.register (protocol, fn)

  - `protocol` string - Protocol name
  - `fn` function

Register a protocol so that `Editor.url` can use it to convert an url to the filesystem path.
The `fn` accept an url Object via [url.parse](https://nodejs.org/api/url.html#url_url_parse_urlstring_parsequerystring_slashesdenotehost).

Example:

```js
const Path = require('path');

let _url2path = base => {
  return uri => {
    if ( uri.pathname ) {
      return Path.join( base, uri.host, uri.pathname );
    }
    return Path.join( base, uri.host );
  };
};

Editor.Protocol.register('editor-framework', _url2path(Editor.frameworkPath));
```
