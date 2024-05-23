# Install and Share

When Cocos Creator is opened and a specific project opened, it will search packages in its search path, and try to load all of them. There are two search paths --- **Global Packages** and **Project Packages**.

## Global Packages

To apply a package to all of your Cocos Creator projects, the extensions can be installed globally. Depending on platform, the location is as follows:

- **Windows** `%USERPROFILE%\.CocosCreator\packages`
- **Mac** `$HOME/.CocosCreator/packages`

## Project Packages

When loading a package for a specific project, the package can be installed locally in `${your-project}/packages`.

## Uninstall Package

Just delete the package from above directories.
