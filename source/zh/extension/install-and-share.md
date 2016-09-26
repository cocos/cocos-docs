# 安装与分享

当你启动 Cocos Creator 并且打开了一个指定项目后，Cocos Creator 会开始搜索并加载扩展包。Cocos Creator 有两个扩展包搜索路径，“全局扩展包路径”和“项目扩展包路径”。

## 全局扩展包路径

当你打算将你的扩展应用到所有的 Cocos Creator 项目中，你可以选择将扩展包安装到全局扩展包路径中。根据你的目标平台，全局扩展包路径将会放在：

 - **Windows** `%USERPROFILE%\.CocosCreator\packages`
 - **Mac** `$HOME/.CocosCreator/packages`
 - **Linux** `$HOME/.CocosCreator/packages`

## 项目扩展包路径

有时候我们只希望某些扩展功能被应用于指定项目中，这个时候我们可以将扩展包安装到项目的扩展包存放路径上。项目的扩展包路径为 `$你的项目地址/packages`。
