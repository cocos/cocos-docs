# Submit Extension Packages to the Store

Cocos Creator provides a built-in [Extension Store](install-and-share.md) for users to browse, download and automatically install official or third-party plugins and resources.

Users can also submit their own extensions, code, music, sound effects and other resources to the Extension Store for sharing or selling. Next, it is important to review an example submission process for the extension plugin.

## Package your plugin extensions

Suppose the completed plugin extension package directory structure is as follows:

```
foobar
    |--panel
        |--index.js
    |--package.json
    |--main.js
```

The `foobar` folder needs to be packaged into the `foobar.zip` file and submitted to the Cocos Developer Center.

For more information on the plugin extensions, please refer to the [Create Extension Packages](your-first-extension.md) documentation.

### The third-party library

The current extension package installation system does not install workflows such as NPM that include management systems, so the extension packages that use third-party libraries should package folders such as `node_modules` into the **zip** package as well.

## Submit your plugin extension package

Go to the [Cocos Developer Center](https://auth.cocos.com/#/) and login, then go to the [Store](https://store-my.cocos.com/#/seller/resources/) and click on the **Create new resource** button in the top right.

  ![create](submit-to-store/create.png)

- Then enter the **Category** page, fill in the **Name** and **Category**, and check "I have read and agreed to the Agreement".

  ![category](submit-to-store/category.png)

  - **Name**: The name of the plugin displayed in the Extension Store. Please note that the **Name** cannot be changed once it is confirmed, so please fill it in carefully.
  - **Category**: For the resource category to submit, we select **Creator Extension -> Plugins** here.

  When the settings are complete, click **Next** to enter the resource **Introduction** page.

- Fill in the relevant information on the **Introduction** page.

  ![introduction](submit-to-store/introduction.png)

  - **Keyword**: Easier for users to search for your plugin faster, supports multiple keywords.
  - **Support Platform**: Including Android, iOS, HTML5.
  - **Icon**: The icon size is **256 * 256** and no more than **500KB**, **png** format.
  - **Screenshot**: Upload up to **5** screenshots in **jpg**/**png** format. The size limit for each screenshot is minimum **640px** and maximum **2048px**, and no more than **1000KB**.
  - **Description**: Include **Chinese** and **English**, fill in the basic functions and usage of the plugin. The plugin will be displayed in the Extension Store of the corresponding language version only after both languages are filled in. For example, the plugin will only appear in the English Extension Store if you fill in the English name and description.
  
  Click **Next** to enter the **Pricing** page after completing the filling.

- Set the sale price of the plugin on the **Pricing** page, including **CNY** and **USD**, and if it is free please fill in **0**.

  ![pricing](submit-to-store/pricing.png)

  Click **Next** to enter the **Upload** page after completing the filling.

- On the **Upload** page, upload the plugin extension package and fill in the relevant information.

  ![uploadf](submit-to-store/upload.png)

  - **Package**: **Zip** format, up to **100MB**.
  - **Extension Name**: The name of the plugin extension package, defined in the `package.json` file of the extension package.
  - **Version Number**: Plugin version number, defined in the `package.json` file of the extension package. Follow the [semver specification [cn]](http://semver.org/lang/zh-CN/) for writing conventions.
  - **Creator Version Requirements**: The plugin's requirements for the Creator version.

  Click **Next** to enter the **Submit for review** page after completing the filling.

- Click the **Submit review** button on the **Submit for review** page, or click the **View** button to review/reedit the information for this plugin resource.

  ![submit-for-review](submit-to-store/submit-for-review.png)
  
- After submitting for review, the Extension Store admin will review the plugin content and information within **3** business days.

  - If there are no problems, then the plugin is approved and you will see your plugin in the Extension Store.
  - If there are problems that need to be corrected, the plugin will not be approved and the reason will be noted.
  
  The above results will be sent to the registered email address of your Cocos developer account, so please check the email in time.
