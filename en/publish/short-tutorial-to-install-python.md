# A short tutorial to install python on MacOS

> **Note**: After MacOS Monterey 12.4, Mac no longer supports python 2.7 as a part of default developement environment, but the old python 2.7 might still exist if you have install some modules and frequently use it. According to this uncertain behavior on developer's computer, we offer a short tutorial to help you install python 2.7 to make sure that you can work fine with Cocos Creator 2.4.x.

## Install with python.org

Visit [the download page of Python.org](https://www.python.org/downloads/macos/), and you can see all available version of python. The newest version of python2 is 2.7.18, updated 2020.4.20。

Downloading [macOS 64-bit installer](https://www.python.org/ftp/python/2.7.18/python-2.7.18-macosx10.9.pkg) to fit Mac x86_64, which also can be used by Mac with arm architecture, with M1, M2 chips.

After installation, you may able to see all contents in `/Library/Frameworks/Python.framework/Versions/2.7` as a default path. You can also see shortcuts in `/usr/local/bin`, if it's already in your `PATH`, you can build the game without restart the creator.

## Install python by using version control tools.

Developers can also install pythons by using `conda` or `pyenv`, good tools to switch python version.

> **Note**: When you install python by using version control tools, it will set a default python environment, and if it's python3, the editor will throw an error. You may only need one version control tool to avoid environment conflits.

### pyenv

Developers can install pyenv by using [Homebrew](https://docs.brew.sh/). Tapping these scripts to install pyenv.

```shell
brew update
brew install pyenv
```

When the installation is finished, you can tap `pyenv` to get neccessary help.

> **Note**: If `/opt/homebrew/bin` is not added into the environment variables, you may see `command not found` error, and you should add it into the `PATH` by yourself.

```shell
pyenv install 2.7.18 # Install 2.7.18, you can also install other version of python2.
pyenv global 2.7.18 # Tap your version specified.
```

Restart your cocos creator to adapt the update.

### miniconda

miniconda is a cleaner and small size of anaconda, it requires less space. On [the official site of conda](https://docs.conda.io/en/latest/miniconda.html) can you choose the way to install conda. you can also install it with [shell script](https://docs.conda.io/projects/conda/en/latest/user-guide/install/macos.html)。

After install and add it to the environment variables, tap the script below to install python 2.7 and set it as default python environment, and restart creator to adapt the update.

```shell
conda create -n python2.7 python=2.7
echo 'conda activate python2.7' >> ~/.bash_profile # or .bashrc .zshrc depends on your shell used.
```
