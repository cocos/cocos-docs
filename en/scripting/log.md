# Adding Logging within the Engine

This document mainly explains how to add new Log messages (including **log**, **warning**, and **error**) to the internal code of the engine according to the correct specifications.

## Log Information Mechanism and Background

Currently, the **Log** information in Cocos Creator is stored in the form of an error message table independent of the engine, which is stored in the `EngineErrorMap.md` under the engine directory. In the engine code, it is not allowed to write logs, warnings, errors and other information directly in the form of strings. It must be written in the following three APIs:

```
import {logID, warnID, errorID} from'core/platform/debug';

logID(id, ...params);
warnID(id, ...params);
errorID(id, ...params);
```

The main purpose of this is to reduce the package body occupied by the string in the engine source code.

## EngineErrorMap writing specifications

`EngineErrorMap` is divided into large modules according to one hundred bits, a total of four bits, from `0000` to `9900`, which means that it supports up to `100` large modules. The tens digit is used to divide the sub-modules, or it can be arranged in a continuous form, which is determined by the person in charge of the module.

Due to historical reasons, there is currently no strict priority order for sorting, and newly-built modules can simply be postponed. In the future, we will do better sorting management and sorting.

The specifications for writing specific error messages are as follows:

```
### 4 number ID

Message in english.
```

Example:

```
### 8300

Should only one camera exists, please check your project.
```

The information supports the use of parameter receivers such as `%s`, `%d`, and `%f`. When running the output LOG, it will be spliced ​​into the information in the order of the parameters.

## Maintenance of EngineErrorMap

After `EngineErrorMap` is modified, if you want the call in the code to take effect, you need to execute it in the engine directory

```sh
> gulp build-debug-infos
```

Changes to `EngineErrorMap.md` should also be submitted to git following other changes to the engine.
