# Editor.Profile

Profile module for operating profiles

## Methods

### Editor.Profile.load (name, type, defaultProfile)

  - `url` string - The url of the profile.
  - `defaultProfile` object - The default profile to use if the profile is not found.

Load profile via `url`, if no profile found, it will use the `defaultProfile` and save it to the disk.
You must register your profile path via `Editor.Profile.register` before you can use it.

Example:

```js
// register a project profile
Editor.Profile.register( 'project', '~/foo/bar');

// load the profile at ~/foo/bar/foobar.json
let profile = Editor.loadProfile( 'profile://project/foobar.json', {
  foo: 'foo',
  bar: 'bar',
});

// change and save your profile
profile.foo = 'hello foo';
profile.save();
```

### Editor.Profile.register (type, path)

  - `type` string - The type of the profile you want to register.
  - `path` string - The path for the register type.

Register profile `type` with the `path` you provide.

### Editor.Profile.reset ()

Reset the registered profiles

## IPC Message

### Message: 'editor:load-profile'

### Message: 'editor:save-profile'
