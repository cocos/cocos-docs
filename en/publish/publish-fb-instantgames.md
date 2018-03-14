# Facebook Instant Games 

Starting with Cocos Creator v1.9, creating games for the Facebook Instant Games platform is officially supported. Developers can quickly publish games that meet the Facebook Instant Games technical standards. Facebook Instant Games are a bit different compared to WeChat Mini Games and QQ Play, as Facebook Instant Games runs in a pure HTML5 environment. This means that your games can be run not only on your phone but also in a desktop browser, making development and debugging more convenient.

**Cocos Creator includes:**

- Integrated Facebook Instant Games SDK, and automatic initialization, users can directly call the relevant API
- Provides a one-click packaging process in the Cocos Creator Build Panel that can be packaged directly into a Facebook Instant Games that meets all technical specifications

**What the user needs to do:**

- Call the Facebook Instant Games SDK to access platform-related features
- Upload your Cocos Creator packaged version to Facebook according to the Facebook Release process

# Publish Process

- Build your game using Cocos Creator
- Test your game
- Upload your game to Facebook background
- Share your game on Facebook

## First, use Cocos Creator to build the game

Using Creator open the project project that needs to be published. Open the Build Publish panel from the Menu bar. Select `Project` and select the Facebook Instant Games platform in the build Publish panel:

![](./publish-fb-instantgames/build.png)

After the build is complete, a `fb-instant-games` folder will be created in the specified directory:

![](./publish-fb-instantgames/package.png)

## Second, test the game

Create a new application in the background of Facebook, add an **Instant Games** in **Add a Product** , set the game category, and save the changes. (For details, please refer to the [setting application](https://developers.facebook.com/docs/games/instant-games/getting-started/quickstart?locale=en_US#app-setup))

1. **Enable the https-enabled Web server locally**
- Install http-server package via npm
```bash
$ npm install -g http-server
```
- Create the private key and certificate through openssl. The path needs to be assigned to the built `fb-instant-games` directory
```bash
$ cd fb-instant-games/
$ openssl genrsa 2048 > key.pem
$ openssl req -x509 -days 1000 -new -key key.pem -out cert.pem
```
- Once the private key and certificate are ready, the Web service can be started locally via SSL.
```bash
$ http-server --ssl -c-1 -p 8080 -a 127.0.0.1
```
- Use the browser to open https://localhost:8080 and skip the security warning displayed by the browser. This step is only to allow the browser to whitelist the above private key and certificate. If you subsequently regenerate the private key and certificate, you will need to turn on the confirmation again. It is not yet possible to preview the game directly at this step, because the preview game needs to initialize the SDK of Facebook Instant Games. You need to use the following method.

2. **Preview the game on Facebook**
If you want to use all the features of the Facebook Instant Games SDK, you need to open:
https://www.facebook.com/embed/instantgames/YOUR_GAME_ID/player?game_url=https://localhost:8080 in your browser. Pay attention to the `YOUR_GAME_ID` in the link. Replace the application number you created in Facebook.

Then you can see the game running successfully:

![](./publish-fb-instantgames/game.png)

## Third, Upload to Facebook

- Click the **Virtual Hosts** tab on the left side of the Applications panel, click **Upload Version**, and upload the `.zip` file in the `fb-instant-games` directory to the Facebook hosting service.

![](./publish-fb-instantgames/upload.png)

- When the version status changes to Standby, click the ★ button to push the build version to the production environment.

![](./publish-fb-instantgames/push.png)

## Fourth, Share your game on Facebook

Click on the **Instant Games** tab in the Applications panel, select **Details**, in the details page to the bottom of the page you can see the following picture, select **share the game**, you can directly share the game to the Facebook news.

![](./publish-fb-instantgames/share.png)

For details, refer to [**Testing, Publishing, and Sharing**](https://developers.facebook.com/docs/games/instant-games/test-publish-share?locale=EN) [**an Instant Game**](https://developers.facebook.com/docs/games/instant-games/test-publish-share?locale=EN).

**Precautions**

There are many limitations to Facebook hosting, the most important of which are:

- Does not support server-side logic (e.g. php)
- A maximum of 500 files uploaded per application

# Custom Instant Games

Developers can configure these files under `resources/static/``fb-``instant-games/` in the Creator installation directory according to their needs:

![](./publish-fb-instantgames/file.png)

`fbapp-config.json`: This is the configuration of the entire package, go to the [official introduction](https://developers.facebook.com/docs/games/instant-games/bundle-config).
`index.html`: This will change the version of the Instant Games SDK introduced.
`main.js`: Here you can modify the SDK initialization and progress bar.

# SDK Instructions

Cocos Creator has integrated the Facebook **Instant Games SDK** and it automatically initializes (`initializeAsync` and `startGameAsync`) when the game is loaded. The user can access directly through the `FBInstant` namespace. See the [Instant Games SDK](https://developers.facebook.com/docs/games/instant-games/sdk) for details.

In addition, Facebook also provides the **Facebook SDK for JavaScript**, which can be used to access Facebook's social features according to your needs. It needs to be accessed through the `FB` namespace. However, it is not integrated into Cocos Creator and needs to be manually introduced by the user. See the [official documentation](https://developers.facebook.com/docs/javascript) for details.

# Reference link

- The [Instant Games s](https://github.com/cocos-creator/demo-instant-games)[ample project](https://github.com/cocos-creator/demo-instant-games) provided by Cocos Creator contains an Instant Games SDK usage example.
- [Facebook background](https://developers.facebook.com/)
- [Facebook Instant Games document](https://developers.facebook.com/docs/games/instant-games?locale=en_US)

