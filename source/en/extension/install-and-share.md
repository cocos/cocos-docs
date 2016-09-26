# Install and Share

When you start Cocos Creator and open a specific project, Cocos Creator will search packages in its search path, and try to load all of them. There are two search paths --- "Global Packages" and "Project Packages".

## Global Packages

If you plan to apply your package to all your Cocos Creator project, you can choose to install your package globally. Depends on your platform, the place can be:

 - **Windows** `%USERPROFILE%\.CocosCreator\packages`
 - **Mac** `$HOME/.CocosCreator/packages`
 - **Linux** `$HOME/.CocosCreator/packages`

## Project Packages

Sometimes we only want the package loaded for specific project, in this case we can install package locally in `${your-project}/packages`.
