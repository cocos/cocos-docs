# Installation and Launch

If you haven't downloaded and started Cocos Creator already, please start it according to the following steps.

## Download Cocos Creator

You can visit the download link on [Cocos Creator products homepage](http://cocos2d-x.org/products#creator) to download the installer file of Cocos Creator.

Double click the downloaded installer to install Cocos Creator.

### Windows Instruction

Start from v1.3.0, Cocos Creator for Windows will not support 32bit system. Please consider upgrade your Windows to 64 bit.

The installer for Windows is a `.exe` file, usually named as `CocosCreator_vX.X.X_20XXXXXX_setup.exe`, where `vX.X.X` is Cocos Creator main version number, the series following is the build date version number.

**Notice** The build date version number will be frequently updated during beta testing phase, if the main version number installed on your PC is the same as the installer you won't be able to install it before uninstall the one on your PC first.

The default install location is `C:\CocosCreator`, you can change the target location during installation process.

Cocos Creator will take up about 1.25 GB disk space, please prepare for enough disk space before installation.

**Notice** If your installation failed, please try to run the installer with the following command line:

```
CocosCreator_v1.2.0_2016080301_setup.exe /exelog "exe_log.txt" /L*V "msi_log.txt"
```

You can execute this command line either by `CMD` program or by creating a shortcut for installer and put it into the `target` property of the shortcut. Then please submit the installation logs (`exe_log.txt` and `msi_log.txt`) to developer team for help.


### Mac Instruction

The installer of Cocos Creator Mac version is a DMG image file. Double click it and drag `CocosCreator.app` to the link of your Application folder. You can also drag it anywhere you like. Double click `CocosCreator.app` to get started.

**Notice:** If your first launch resulted in a warning dialog says "Downloaded .app is damaged and can’t be opened". You can go to "System preferences.../Security & Privacy" and set "Allow apps downloaded from" option to "Anywhere". Then after first launch of Cocos Creator, you can set the option back to original setting.

### System Requirements

The minimum system requirements are:

- For Mac: OS X 10.9
- For Windows: Windows 7 64bit

## Run Cocos Creator

On the Windows operating system, double click the `CocosCreator.exe` document in the decompressed folder to start Cocos Creator.

On the Mac operating system, double click the decompressed `CocosCreator.app` icon to start Cocos Creator.

You can set up quick start, Dock or a shortcut according to your preference for starting up the program, allowing you to run it at any time.


## Use Cocos developer account to login

If you don't need to release games on original platforms, the above two simple steps can prepare for you a full developing environment fordeveloping games using Cocos Creator.

After starting Cocos Creator, you will access the login interface for Cocos developer accounts. After logging in, you can enjoy various kinds of online services, product upgrade information and various developer benefits provided for developers.

If you don't have a Cocos developer account, you can use the **sign up** button in the login interface to sign in to the Cocos developer center, or you can directly use the link below:

https://passport.cocos.com/auth/signup

After signing up, you can go back to the login interface of Cocos Creator to complete the login! After verifying your identity, you will be able to access the Dashboard interface. In situations other than manual log out or the expiration of login information, the information saved in the local session will be used for auto login.

## Native Development Setup

If your game's target platform is Web, you can start game creation now. If you want to publish your game to native platforms (iOS, Android, Desktop), please follow the [Setup Native Development Environment](../publish/setup-native-development.md) guide.

---

Continue on to read about [Dashboard](dashboard.md).
