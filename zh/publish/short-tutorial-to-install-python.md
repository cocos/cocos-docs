# MacOS 安装 Python 指南

> 注意：在更新了 12.4 系统之后，MacOS 将不再默认安装 Python 2.7，但如果在这之前有安装过 Python 2.7 模块的话，原有的 Python 2.7 将被保留但是从用户的执行文件中移除。这导致了用户的环境各不相同难以统一。鉴于单独将 Python 作为编辑器内置的一部分，在 MacOS 端是一项冒险且不稳定的行为，故这里仅给出安装 Python 2.7 的指导。

## 通过官网安装

通过 [Python 官网](https://www.python.org/downloads/macos/)下载可以直接下载到适用于所有 MacOS 系统的 Python，最新版本的 Python2 为 2.7.18，也是最后支持的版本，其更新时间为 2020.4.20。

通过下载 [macOS 64-bit installer](https://www.python.org/ftp/python/2.7.18/python-2.7.18-macosx10.9.pkg) 可以获取到适用于 MacOS x86_64 架构 Python 2.7 安装包。该版本亦适用于所有 arm 架构的 MacOS，包括 M1，M2 系芯片开发者。

MacOS 版本的 Python 安装包无法指定安装路径，只需要跟着步骤安装即可。当安装结束后，相应的源文件将保存在 `/Library/Frameworks/Python.framework/Versions/2.7` 中。这是默认的安装路径。此外，对应的替身文件（快捷方式）将被创建于 `/usr/local/bin` 中，如果你的 `PATH` 环境变量中存在这个路径，在安装结束后，不需要重启编辑器就可以直接开始构建。

## 通过 Python 版本管理工具安装

开发者可以通过使用 pyenv 或者 anaconda 等工具安装 python2.7，这些包管理工具可以快速切换 Python 版本，比如 python2 和 python3 的切换。

> **注意**：当你通过 python 的版本管理工具安装 Python 之后，它会设置一个默认的 Python 环境，如果你设置的默认环境为 Python3 时，编辑器在构建阶段会报错。需要注意的是，pyenv  可以接受 conda 的 python 环境作为参数，但是 conda 则不可以管理 pyenv。两种版本管理工具，你选择其中的一种即可。

### pyenv

开发者可以通过 [Homebrew](https://docs.brew.sh/) 安装 pyenv，这需要开发者在终端中使用以下指令：

```shell
brew update
brew install pyenv
```

当成功安装后，输入 pyenv，将会显示版本和帮助。

此时，就可以通过pyenv来安装python2了。

> **注意**：如果没有将 `/opt/homebrew/bin` 加入环境变量，此时输入 pyenv 无任何效果。

```shell
pyenv install 2.7.18 # Install 2.7.18, you can also install other version of python2.
pyenv global 2.7.18 # Tap your version specified.
```

安装完成后，需要重启编辑器以应用更新。

### miniconda

miniconda 作为 Anaconda 的简洁纯净版本，体积更小更好操作。在[官网](https://docs.conda.io/en/latest/miniconda.html)可以选择你需要的 miniconda 版本进行安装。也可以通过 shell脚本[运行安装](https://docs.conda.io/projects/conda/en/latest/user-guide/install/macos.html)。

安装并添加至环境变量中后，执行以下操作来安装 python2.7 并设置为默认环境。这会安装 python2.7 并在每次启动终端时激活该环境，在编辑器中同样有效。

```shell
conda create -n python2.7 python=2.7
echo 'conda activate python2.7' >> ~/.bash_profile # or .bashrc .zshrc depends on your shell used.
```

与 pyenv 相同，你需要重启编辑器来激活环境。
