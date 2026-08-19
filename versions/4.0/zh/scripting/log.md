# 在引擎内添加 Log 信息

本文档主要说明如何按照正确的规范在引擎内部代码中添加新的 Log 信息（包含 log、warning、error）。

## Log 信息机制和背景

目前 Cocos Creator 中的 Log 信息是以一个错误信息表形式独立于引擎存储的，具体存储在 engine 目录下的 `EngineErrorMap.md` 中。而在引擎代码中，不允许直接以字符串形式写日志、警告、错误等信息，必须以下面三个 API 来书写：

```
import { logID, warnID, errorID } from 'core/platform/debug';

logID(id, ...params);
warnID(id, ...params);
errorID(id, ...params);
```

这样做的主要目的是减少字符串在引擎源码中所占据的包体。

## EngineErrorMap 的编写规范

EngineErrorMap 按照一百位来做大模块划分，总共四位，从 0000 到 9900，也就是说支持最多 100 个大模块。十位数是用来划分子模块的，或者也可以直接以连续的形式排列，这个由模块负责人决定。

由于历史原因，目前没有按照严格的优先级顺序来做排序，新建的模块可以简单得往后顺延。未来我们会做更好的排序管理和整理。

具体错误信息的编写规范如下：

```
### 4 number ID

Message in english.
```

比如：

```
### 8300

Should only one camera exists, please check your project.
```

信息中支持使用 `%s`、`%d`、`%f` 这样的参数接收符，运行输出 LOG 时会按照参数顺序依次拼接到信息中。

## EngineErrorMap 的维护

EngineErrorMap 修改后，如果希望代码中的调用生效，需要在 engine 目录下执行：

```
> gulp build-debug-infos
```

`EngineErrorMap.md` 的修改也要跟随引擎的其他修改提交到 git。
