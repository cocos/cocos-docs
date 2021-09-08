# Cocos Creator Image Location Resolution Algorithm

The parameters given in the Cocos Creator image location resolution algorithm and their descriptions are as follows:

| Parameter | Description |
| :---- | :------ |
| `url` | The desired URL |
| `startDir` | The starting search directory |
| `DEPTH` | Search depth, fixed to **2** |
| `SEARCH_DIR_NAMES` | Array of texture folder names, default is: `textures`, `materials` |
| `SEARCH_EXT_NAMES` | Array of extensions to search for, fixed to `.jpg`, `.jpeg`, `.png`, `.tga`, `.webp` |

The Cocos Creator image location resolution algorithm is given by the following procedure:

- If the file corresponding to `url` exists, return `url`.

- Let `expectedExtName` be the extension of `url`.

- let `expectedBaseName` be the extensionless filename of `url`.


- Let `searchExtNames` be `[expectedExtName, ...SEARCH_EXT_NAMES]` array after de-duplication.

- Let `currentDir` be `startDir` and loop for `DEPTH` times:

    - If `currentDir` is outside the project `assets` directory, then exit the loop.

    - If none of the subdirectories in the `currentDir` directory have names matching `SEARCH_DIR_NAMES`, then the next loop is executed.

    - Make `dir` a subdirectory of the `currentDir` directory with a name matching `SEARCH_DIR_NAMES`.

    - Search `dir` for files with base names matching `expectedBaseName` and extensions matching `searchExtNames`, and if so, return their paths.

    - Set `currentDir` to its parent directory.

- Return search failure.
