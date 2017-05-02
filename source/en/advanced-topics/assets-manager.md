# Hot Update AssetsManager

This document will fully cover the `AssetsManager` module for hot update, includes technical details and usage. As the requirements of the hot update process for developers may be different, and each developer may also face different problems. So that developers need to fully understand the details of the hot update mechanism to be able to customize the workflow to meet their needs.

So this document is relatively long, it tries to introduce the hot update mechanism gradually, but will not introduce too much user level code. you want to first understand how to use the hot update mechanism to update their game developers, you can try our [simple tutorial](hot-update.md) to get started.

## Introduction to Asset Hot Update

Asset hot update is designed for the game to dynamically update assets, where the asset can be textures, audio and even game logic. During the maintenance and operations of the game, you will be able to upload new assets to your server so that your game keeps in sync of the remote server and automatically downloads new assets to the user's device. In this way, new designs, new play experience and even new game content will be immediately pushed to your users hands. It is important that you don't have to publish and submit your application to each market and go through a painful application submission review!

The asset hot update manager has walked through three important phases:

1. Cocos2d-JS v3.0 contains the initial design and implementation.
2. In cocos2d-x v3.9 we upgraded `Downloader` and implemented multi-threaded concurrent download.
3. Cocos Creator v1.4.0 and Cocos2d-x v3.15 we have made a major reconstruction, and solve most of major issues during hot update process.

So please use the latest version of the engine or editor, this document is based on Cocos Creator v1.4.0+ and cocos2d-x 3.15.

## Design goals and basic principles

The hot update mechanism essentially downloads the required assets from the server to the client, and can execute new game logic so that new assets can be used by the game. This means two of the most central goals are: to download new assets, overwrite game logic and assets. At the same time, since the hot update mechanism was originally designed in Cocos2d-JS, we considered what kind of hot update mechanism was more suitable for Cocos's JavaScript user base. Finally, we decided to use a mechanic similar to how Web page update its content to update the game content. Let's take a look at the Web content update mechanic:

1. The server has complete files of all the page content
2. The browser requests a web page to cache its content locally
3. When the browser re-request this page, it will query the version on server version by the last modified time (Last-Modified) or unique identification (Etag). If these two value are different, then download a new file to update the local cache, if not, continue to use the cache.

The browser cache mechanism is more complex than the above description, but we can use similar basic idea. For game assets, you can also keep a copy of complete assets on the asset server. The client compare the version list with the server during updates, and download the different files and replace the cache. For the rest continues to use the client version or the cached file. So here's what we need to update the game:

1. The server keeps the latest version of all the game assets (the developer can update the server at any time)
2. The client sends request to get the asset different file list compare to server version
3. Download all assets changed in the new version from the server
4. Overwrite the old cache with the new assets and the files in the application package

This is the whole hot update process. Of course, there are very many specific details we will introduce later. What the take away here is:

**Cocos default hot update mechanism is not based on the patch update mechanism, the traditional hot update is often generate patches between multiple version of packages. Client need to download patches one by one according to the order of versions. Cocos's hot update mechanism generates a list of differences by updating the differences between the latest remote version and current local version directly.**

This can naturally support cross-version update, such as the local version is A, remote version is C, then directly update the difference between A and C, do not need to generate A to B and B to C update patches. Therefore, in this design, we can upload new version of the game files separately to the server.

## Hot update basic workflow

After understand the basic design above, we can take a look at a typical hot update process. We use the manfiest description file to describe the asset file list and asset version that is stored locally or remotely. The manifest file definition is described later. The runtime environment assumes that the installer version is updated for the first time after the user has installed the app:

![asset manager](hot-update/assets-manager.png)

The figure is divided into three parts, the middle is the hot update process, the left is the process of updating the AssetsManager to send the message to the user, the right is the middle output of each step. The bold words indicates the location of the middle output, such as in memory / temporary folder / cache folder.

After reading this picture you may have a lot of questions. We will discuss details of the various steps that need to pay attention to or not easy to understand in the first place.

## Technical details

### Manifest format

The manifest file is a json format that we use to compare local and remote asset differences, including master version information, engine version information, asset file lists, and asset information:

```
{
    "packageUrl": The local cache root path of the remote asset
    "remoteVersionUrl": [optional] the path of the remote version of the file used to determine whether the server has a new version of the assets
    "remoteManifestUrl": Path of the remote asset manifest file, including version information and all asset information
    "version": the version of the asset
    "engineVersion": engine version
    "assets": all asset lists
        "key": the relative path of the asset (relative to the asset root)
        "md5": The md5 value represents the version information of the asset file
        "compressed": [optional] If the value is true, the file is automatically downloaded after being extracted, currently only supports zip compression format
        "size": [optional] The byte size of the file used to quickly get progress information
    "searchPaths": A list of search paths that need to be added to FileUtils
}
```

The manifest files can be generated by using the [Version generator script](https://github.com/cocos-creator/tutorial-hot-update#使用-version-generator-来生成-manifest-文件) in the hot update example.

It is important to note that the remote information (including packageUrl, remoteVersionUrl, remoteManifestUrl) is for the remote package. That is, the manifest only takes effect when installed or downloaded with a local package. (you can also update the remote package url during version update). In addition, `md5` key is only for file identification so you can use other algorithm or rule to generate the file identification, such as modified date. When client compare manifest with the remote version, as long as the md5 information is different, we think this file has changed.

### The difference between the assets in the project and the published package

Everyone in the creation of a Cocos Creator project, you can see it catalog under the assets of the catalog, which saved your scenes, scripts, prefab, etc., corresponding to the editor in the assets of the panel. But these engineering assets are not the same as the packaged assets, in the use of building a building to build the original version, we will find the directory to find res and src folder, these two folders are saved really let the game run up Of the game package within the assets. Where src contains all the scripts, res contains all the assets.

So our asset hot update should naturally update the built assets, not the project's assets directory.

### Package assets, local cache assets and temporary assets

When the player's game is installed on the user's phone, its game is in the form of .ipa (iOS) or .apk (Android), which, after installation, can not be modified or added Of any assets within the application package will always exist. So the hot update mechanism, we can only update the local cache to the phone's writable directory (application storage space or SD card specified directory), and through the FileUtils search path mechanism to complete the local cache on the package of assets coverage. At the same time in order to protect the reliability of the update, we will update the process will first put the new version of the assets into a temporary folder, only when the update is completed, will be replaced to the local cache folder. If the midrange interrupt update or update fails, the failed version will not pollute the existing local cache. This step is described in detail in the previous section of the flow chart:

![](hot-update/am-part2.png)

In the case of long-term updates, the local cache will always be replaced with the latest version, and the application package only until the user in the application store to update to the new version will be modified.

### Progress information

In the previous section of the big picture, you can see the hot update manager has sent UPDATE_PROGRESSION message to the user. In the current version, the progress information received by the user contains byte-level progress and file-level progress (percentage value):

```js
function updateCb (event) {
    switch (event.getEventCode ())
    {
        case jsb.EventAssetsManager.UPDATE_PROGRESSION:
            cc.log ("Byte progression:" + event.getPercent () / 100);
            cc.log ("File progression:" + event.getPercentByFile () / 100);
            break;
    }
}
```

We will add more information in Cocos Creator 1.5:

1. byte-level progress (percentage)
2. File level progress (percentage)
3. The number of bytes received
4. The total number of bytes
5. The number of files received
6. The total number of documents

### Resume broken transfer

Definitely a developer will ask, if the process of updating the network will be how? The answer is that the hot update manager supports resume broken transfer, and also supports file-level and byte-level breakpoints.

So what exactly is it done? First of all, we use the manifest file to identify the status of each asset, such as not started, download, download success, in the hot update process, the file download will be identified to the memory of the manifest, when the number of files to download each The progress node (defaults to 10% of a node) will serialize manifest in memory and save it to a temporary folder. The concrete steps are shown in the flowcharts of the multithreaded concurrent download asset section:

![](hot-update/am-part1.png)

After the interruption, start the hot update process again, it will check whether there is an outstanding update in the temporary folder. After checking the version and the remote match, use the manifest in the temporary folder to continue the update as the Remote manifest. At this point, for the download status is completed, will not re-download, for the downloaded file, will try to send a request to the server (the server needs to support `Accept-Ranges`, or start from scratch).

### Control concurrency

From Cocos Creator v1.4 and cocos2d-x v3.15, hot update manager adds control to download the number of concurrent API, the use of the following:

```js
AssetsManager.setMaxConcurrentTask(10);
```

### Version comparison function

A very important step in the hot update process is to compare the client and server versions, by default only when the primary version of the server is updated over the client major version. The engine implements a version of the comparison function, its initial version of the use of the most simple string comparison and criticized, for example, there will be 1.9> 1.10 situation. After Cocos Creator v1.4 and Cocos2d-x v3.15, we upgraded to support the xxxx four sequence versions of the comparison function (x is a pure number), do not conform to this version number mode will continue to use the string comparison function.

In addition, we also allow users to use their own version of the contrast