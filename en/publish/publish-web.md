# Release a Game on Web platform

Click the main menu's `Project -> Build...` to open the **Build** panel.

Cocos Creator provides page templates for two kinds of Web platforms. From the pop up menu of **release platform**, you can choose `Web Mobile` or `Web Desktop`. The major difference is that in `Web Mobile`, the image will cover the whole browser window by default, while in `Web Desktop`, you are allowed to designate the resolution of image, which doesn't change when you zoom on the browser window.

## Release a path

You can designate a release path for the game by inputting a path in the **release path** input field or choosing one via the `...` browsing button. The following cross-platform release will create resources or projects in child folders of this release path.

The default release path is in the `build` under the project folder. If you use version control systems like git and svn, you can ignore the `build` folder in version control.

## Build settings

### Inline all SpriteFrames

When merging assets automatically, combine all SpriteFrames and the assets that are being relied on into the same package. It is recommended to enable this option in web. When enabled, it will increase the overall game size slightly, consume a little bit of network traffic, but can significantly reduce the number of network requests. It is recommended to disable this option in native, because it will increase the package size used in hot update.

### Merge all JSON that the Start Scene depends on

When merging assets automatically, all JSON files that the Start Scene depends on are merged into the package that contains the Start Scene. This option is disabled by default. When enabled, it will not increase the overall game size, but if these JSON is also used by other scenes, then CPU overhead may increase slightly when they are loaded again.

### MD5 Cache

Compute MD5 to rename all resources, to resolve the CDN cache problem. After being enabled, if any resource fails to load, it is because the renamed new file can not be found. It is usually because some third party resources was not loaded by `cc.loader`. If this happens, you can convert the url before loading, to fix the loading problem.

```js
url = cc.loader.md5Pipe.transformURL(url);
```

### vConsole

> Before Creator v1.9, the Eruda debug plugin was used.

Insert vConsole debug plugin, which similar to DevTools mini version, used to help debug.

If you need test, check **Debug Mode** and **Source Maps** option. The built version will have sourcemap for debugging.

## Build and preview

Click the **Build** button, then a progress bar will appear on the top of the panel. When the progress bar reaches 100%, the construction is finished.

Next, you can click the **Play** button to open the built game version in the browser for preview and test.

![web desktop](publish-web/web_desktop.png)

A preview of the Web Desktop mode is shown above. You can see that the resolution of the game image is fixed and the game image doesn't fully cover the browser window.

## Release a game on Web server

If you want to release or share your games on the Internet, click the **Open** button next to **Build path**. After opening the release path, copy everything in the built `web-mobile` or `web-desktop` folders, and drop them into your Web server. Then you can see the game later there.

For the construction of Web server, you can search for solutions such as Apache, Nginx, IIS and Express on your own.
