
# Cocos Creator 图像位置解析算法

给定参数：

- `url` - 期望的URL

- `startDir` - 起始搜索目录

- `DEPTH` - 搜索深度，固定为 `2`

- `SEARCH_DIR_NAMES` - 贴图文件夹名称数组，默认为：`textures`、`materials`

- `SEARCH_EXT_NAMES` - 需要搜索的扩展名数组，固定为：`.jpg`、`.jpeg`、`.png`、`.tga`、`.webp`

Cocos Creator 图像位置解析算法由以下过程给出：

```
- 如果 `url` 对应的文件存在，则返回 `url`。

- 令：

  - `expectedExtName` 为 `url` 的扩展名

  - `expectedBaseName` 为 `url` 去扩展后的文件名

  - `searchExtNames` 为 `[expectedExtName, ...SEARCH_EXT_NAMES]` 去重之后的数组

- 令 `currentDir` 为 `startDir` ，进行 `DEPTH` 次循环：

  - 如果 `currentDir` 处于项目 `assets` 目录外，退出循环

  - 如果 `currentDir` 目录中的没有任何一个子目录的名称匹配 `SEARCH_DIR_NAMES` ，进行下次循环

  - 令 `dir` 为 `currentDir` 目录中名称匹配 `SEARCH_DIR_NAMES` 的子目录

  - 在 `dir` 中搜索是否有文件基础名称匹配 `expectedBaseName` 且扩展名匹配 `searchExtNames`的，如果有，返回其路径

  - 将 `currentDir` 置为其上层目录

- 返回搜索失败。
```
