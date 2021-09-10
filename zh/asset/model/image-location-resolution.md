# Cocos Creator 图像位置解析算法

Cocos Creator 图像位置解析算法中给定的参数及参数说明如下：

| 参数   | 说明    |
| :---- | :------ |
| `url`      | 期望的 URL   |
| `startDir` | 起始搜索目录  |
| `DEPTH`    | 搜索深度，固定为 **2** |
| `SEARCH_DIR_NAMES` | 贴图文件夹名称数组，默认为：`textures`、`materials`  |
| `SEARCH_EXT_NAMES` | 需要搜索的扩展名数组，固定为：`.jpg`、`.jpeg`、`.png`、`.tga`、`.webp` |

Cocos Creator 图像位置解析算法由以下过程给出：

- 如果 `url` 对应的文件存在，则返回 `url`

- 令 `expectedExtName` 为 `url` 的扩展名

- 令 `expectedBaseName` 为 `url` 去扩展后的文件名

- 令 `searchExtNames` 为 `[expectedExtName, ...SEARCH_EXT_NAMES]` 去重之后的数组

- 令 `currentDir` 为 `startDir`，进行 `DEPTH` 次循环：

    - 如果 `currentDir` 处于项目 `assets` 目录外，则退出循环

    - 如果 `currentDir` 目录中没有任何一个子目录的名称匹配 `SEARCH_DIR_NAMES`，则执行下次循环

    - 令 `dir` 为 `currentDir` 目录中名称匹配 `SEARCH_DIR_NAMES` 的子目录

    - 在 `dir` 中搜索是否有文件基础名称匹配 `expectedBaseName` 且扩展名匹配 `searchExtNames`的，如果有，则返回其路径

    - 将 `currentDir` 置为其上层目录

- 返回搜索失败
