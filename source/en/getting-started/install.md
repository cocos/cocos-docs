# Install and Launch

If you have not downloaded and started Cocos Creator while reading this document, please follow the steps below.

## Download Cocos Creator

You can obtain the installation package for Cocos Creator by visiting the download link on the [Cocos Creator Products Page] (http://www.cocos2d-x.org/products#creator).

Double-click the installation package after the download is complete.

### Windows installation instructions

Starting with v1.3.0, Cocos Creator for Windows will not provide 32-bit operating system support.

The installer for Windows is a `.exe` executable, usually named `CocosCreator_vX.X.X_20XXXXXX_setup.exe`, where `vX.XX` is the version number of Cocos Creator, such as `v1.2.2`, followed by the version date series.

** Note ** The date series will be updated frequently when using the beta version. Note If the version number of the current PC is the same as the version number of the installation package, it can not be automatically overwritten. To install package with the same version number as currently installed on your PC, You need to uninstall the current copy before proceeding with the installation.

The default installation path for the application is `C:\CocosCreator`, which can be specified during the installation process.

Cocos Creator will take up approximately 1.25 GB of space on your system disk, so you can clean up your system disk space before installation.

** Note **: If the installation fails, try executing the installer from the command line:

```
CocosCreator_v1.2.0_2016080301_setup.exe / exelog "exe_log.txt" / L * V "msi_log.txt"
```

Execute with the following command, or create a shortcut for the installer, and fill the shortcut with the command line argument in the `target` attribute. And then submit the resulting installation logs ( `exe_log.txt` and` msi_log.txt`) to the development team for help.


### Mac installation instructions

The installer for Cocos Creator for Mac is the DMG image file, double-click on the DMG file, and drag `CocosCreator.app` to your **Application** folder shortcut, or any other location. And then double-click the copy of the `CocosCreator.app` will get you started.


** Note**: If the downloaded application is corrupt during the first run, go to and set up `System Preferences -> Security & Privacy -> Allow any application from any source`.  Once Cocos Creator is launched, you can restore your security settings.


### Operating system requirements

The system environment that Cocos Creator supports is:

- The minimum Mac OS X version supported is OS X 10.9.
- The minimum Windows version supported is Windows 7 64-bit.


## Run Cocos Creator

On Windows, double-click the `CocosCreator.exe` file in the installation target folder or click `Cocos Creator` from Start menu to start Cocos Creator.

On Mac, start Cocos Creator by double-clicking the `CocosCreator.app` application icon.


### Disable GPU acceleration

For some Windows operating systems and graphics card models, the following error may be encountered:

`` `
This browser does not support WebGL ...
`` `

If this happens, first check if you have latest graphic card driver installed. 

If the above doesn't work, please try running Cocos Creator with command line tool:

`CocosCreator.exe --disable-gpu` 

This argument will disable GPU acceleration. You can bypass some of the graphics card driver problem.


## Sign in with the Cocos developer account

If you do not need to publish the game to the native platform, the above two simple steps can be prepared for you to use Cocos Creator game development environment for all development.

Cocos Creator starts, will enter the Cocos developer account login interface. Sign in to enjoy the variety of online services, product updates, and developer benefits that we offer developers.

If you do not have a Cocos developer account before, you can sign up for the Cocos Developer Center using the ** Sign up** button in the sign-in interface. Or simply use the following links:

https://passport.cocos.com/auth/signup

After registration, you can return to the Cocos Creator login screen to complete the login! Once you verify your identity, you'll enter the Dashboard interface. Except manually log out or login information expired, in other circumstances the editor will preserve your login session information so you can automatically login later.

## Version compatibility and fallback methods

When Cocos Creator is upgraded, the new version of the editor can open the old version of the project, but you may encounter some problems when you upgrade to a new version of Cocos Creator when the project is complicated. Because the engine and editor implementations in earlier versions may have bugs and other problems that can be bypassed by special treatment made by user scripts and setups. These bugs and problems may get fixed in subsequent releases and may cause impact on existing projects.

In addition to contacting the development team to find a solution, you can uninstall the new version of Cocos Creator and reinstall the old version when you discover a problem with this version upgrade. Problems you might encounter during the installation of an older version include:

- [Windows] You may be prompted the error of installing an older version of the application if you already have an newer version of Cocos Creator installed. If you are sure that you have uninstalled the current version of Cocos Creator correctly from the Control Panel and still can not install the older version, please visit [Microsoft Official Fix Can not Install or Uninstall a Program] (https://support.microsoft.com/en-us/help/17588/fix-problems-that-block-programs-from-being-installed-or-removed) help page. Follow the prompts to download the software and repair the damaged installation information, then you can continue to install the old version.
- The project is created or edited with a newer version of Cocos Creator. When you open it in older versions of Cocos Creator, you may encounter problems where the editor panel does not display content. Try selecting `Layout -> Restore Default Layout` in the main menu to fix it.


## Setup native development environment

If you only want to develop Web platform games, complete the above steps is sufficient. If you would like to publish the game to your native platform, please read the setup instructions for the development environment [Setup Native Development Environment] (../publish/setup-native-development.md)

---
Continue on to read about the [Dashboard](dashboard.md).

