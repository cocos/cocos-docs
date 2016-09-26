# Installation and Launch

If you haven't downloaded and started Cocos Creator already, please start it according to the following steps.

## Download Cocos Creator

You can visit the download link on [Cocos Creator products homepage](http://cocos2d-x.org/products#creator) to download the installer file of Cocos Creator.

Double click the downloaded installer to install Cocos Creator.

### Windows Instruction

Cocos Creator Windows version uses a "one-click" installer framework, so you can't specify target location during installation. Once completes, the installer will create shortcut for both desktop and startup menu.

The application will be installed to `%USER\AppData\Local\CocosCreator`, different version of Cocos Creator will be put into sub-folders named `app-x.x.x`. It will keep two versions of Cocos Creator maximum. You can switch between two of most recent Cocos Creator versions to make sure your project is in good hand. You can also copy `app-x.x.x` folder to another disk if you prefer not to use your system volumn. But auto update feature will no-longer works from elsewhere.

Cocos Creator will take about 1 GB space on your system volumn. Please make sure you have enough space before proceeds. 

**Notice:** If installation fails, please clean up `%USER\AppData\Local\SquirrelTemp` folder and try again. If problem still exists, please contact development team for help.

### Mac Instruction 

The installer of Cocos Creator Mac version is a DMG image file. Double click it and drag `CocosCreator.app` to the link of your Application folder. You can also drag it anywhere you like. Double click `CocosCreator.app` to get started.

**Notice:** If your first launch resulted in a warning dialog says "Downloaded .app is damaged and can’t be opened". You can go to "System preferences.../Security & Privacy" and set "Allow apps downloaded from" option to "Anywhere". Then after first launch of Cocos Creator, you can set the option back to original setting.

### System Requirements

The minimum system requirements are:

- For Mac: OS X 10.9
- For Windows: Windows 7

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
