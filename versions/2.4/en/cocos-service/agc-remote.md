> **Note**: this version of the documentation has been archived and is no longer maintained. Please move to the [latest version](https://service.cocos.com/document/en/agc-remote.html).

# Remote Configuration (AppGallery Connect) Quick Start

HUAWEI AppGallery Connect provides the [Remote Configuration](https://developer.huawei.com/consumer/en/doc/development/AppGallery-connect-Guides/agc-remoteconfig-introduction) service for you to manage parameters online. With the service, you can change the behavior and appearance of your app online without requiring users to update the app.

By integrating the client SDK, your app can periodically obtain parameter values delivered on the console to modify the app's behavior and appearance.

### Functions

- **Parameter management**: Includes adding, deleting, and modifying parameters, copying and modifying existing parameters as new ones, and setting conditional values.
- **Condition management**: Includes adding, deleting, and modifying conditions, and copying and modifying existing conditions as new ones. Currently, you can set the following conditions: version, language, country/region, audience, user attribute, user percentage, and time. More conditions will be available in the future.
- **Version management**: Supports management and rollback of up to 90 days of 300 historical versions for parameters and conditions.
- **Permission management**: Allows the account holder, administrator, app administrator, R&D personnel, and operations personnel to access Remote Configuration by default.

### Use Cases

#### Displaying the Language by Country/Region

You can schedule a promotion by setting a trigger in Remote Configuration. More importantly, the promotion content can vary depending on the country or region as long as you set the locale information in Remote Configuration.

#### Displaying Different Content to Different Users

Remote Configuration can work with HUAWEI Analytics to personalize content displayed to different user groups. For example, office workers and students will see different products and UI layouts in an app.

#### Adapting the App Theme by Time

You can set the time condition, different app colors, and various picture materials in Remote Configuration to change the app theme for a special time. For example, during the graduation season, you can adapt your app to the graduation theme to attract more users.

#### Releasing New Functions

Releasing new functions to all users at the same time may be risky. Remote Configuration enables new function release by user percentage for you to slowly increase the target user scope, effectively helping you improve your app based on the feedback from users already exposed to the new functions.

### Version Update Description

- Latest Version: 0.5.1_1.4.1.300

    - Update the SDK and add local configuration entry.

- v0.5.0_1.4.0

    - Integrated Huawei AGC Remote Configuration service.

## Enable Remote Configuration Service

- Use Cocos Creator to open the project that needs to be connected to Remote Configuration service.

- Click on **Panel -> Service** in the menu bar to open the Service panel, select Remote Configuration service to go to the service detail page, and then click on the **Enable** button in the top right to enable the service. For details, please refer to the Cocos Service [Operation Guide](./index.md#usage) documentation.

  ![](agc-remote/remote-panel.png)

  - The **Params Config** item in Service panel, please refer to [Setting Default In-app Parameter Values](#setting-default-in-app-parameter-values).

- Find your project from the project list and click the app for which you need to enable Remote Configuration service on the project card. Go to **Growing -> Remote Configuration**, if it is the first time that you use Remote Configuration service, click **Enable now** in the upper right corner. 

  ![](agc-remote/remote-open.png)

- By default, the Remote Configuration API is automatically enabled when you enable the Remote Configuration service. If you need to manually control whether the Remote Configuration API is enabled or not, refer to the documentation [Enabling Services](https://developer.huawei.com/consumer/en/doc/distribution/app/agc-enable_service).

  ![](agc-remote/remote-console.png)

### Configs HUAWEI Config File

Most of HUAWEI Services need the `agconnect-services.json` configuration file. If there are operations such as newly opened services, please update the file in time.

- Sign in to [AppGallery Connect](https://developer.huawei.com/consumer/en/service/josp/agc/index.html) find your project from the project list and select the app on the project card.

- On the **Project Setting** page, click the configuration file **agconnect-services.json** to download it. The `agconnect-services.json` file **must be copied manually** to the `settings` directory of the project directory after downloading or updating.

  ![](agc-remote/remote-configfile.png)

- For Creator v2.4.3 and above, if you want to publish to the [HUAWEI AppGallery Connect](../publish/publish-huawei-agc.md), you can select the downloaded or updated configuration file directly in the **Build** panel, no need to copy it manually.

  ![](agc-remote/remote-agcfile.png)

### Verify whether the service is integrated successfully

- Once the Remote Configuration service is integrated, we can verify the success of the Remote Configuration service integration by adding simple code to the script.

  ```js
  let value = huawei.agc.rc.rcService.getValueAsString('test');
  console.log('Get config by key : test, value :' + value);
  ```

- You can [publish to the Android platform](../publish/publish-native.md) after the code is added. Please make sure that the **Package Name** on the **Build** panel is consistent with the **Package Name** set in the AppGallery Connect console.

- Run the project on a phone, if you can see the output value is **testValue** in LogCat, which means the integrate is successful.

  ![](agc-remote/remote-logcat.png)

## Sample Project

Developer can get a quick taste of the Remote Configuration with the sample project.

- Click on the **Sample** button in the Remote Configuration Service panel, clone or download, and open the project in Cocos Creator.

- After enabling the Remote Configuration service and configuring the HUAWEI configuration file as described above, you can open the **Build** panel to compile the project by clicking **Project -> Build** in the Creator editor menu bar. Cocos Creator v2.4.1 and above, you could [publish to HUAWEI AppGallery Connect](../publish/publish-huawei-agc.md). Below Creator v2.4.1 could [publish to the Android platform](../publish/publish-native.md).

- Need to test on Huawei or Honor brand phones with HMS Core service installed.

- Once the Sample project is running on the phone, click the **Remote** button on the homepage for testing.

  ![](agc-remote/remote-sample.png)

## Developer Guide

This document refers to the AppGallery Connect documentation - [Integrating Remote Configuration](https://developer.huawei.com/consumer/en/doc/development/AppGallery-connect-Guides/agc-remoteconfig-dev-guide). When calling in JavaScript, please use this document and the [API documentation](https://service.cocos.com/document/api/modules/huawei.agc.rc.html) as a guide.

Since the `apply` method of the Java SDK returns a parameter object, it cannot be passed in the JavaScript layer. So the Remote Configuration service plug-in that Creator integrates into the Service panel uses the `applyLastFetched` and `fetchAndApply` methods instead of the `applyDefault` and `apply` methods of the Java SDK in its wrapper.

### Setting Default In-app Parameter Values

You can set [in-app default parameter values](https://developer.huawei.com/consumer/en/doc/development/AppGallery-connect-Guides/agc-remoteconfig-dev-guide#h1-1592307026459) in the Remote Configuration object so that your app can run properly before being connected to Remote Configuration, and in-app default values are used if parameter values are not set on the console, the default values is set in **Params Config** item in the Service panel.

![](agc-remote/remote-param.png)

### Fetching Parameter Values from Remote Configuration

#### fetchAndApply

`fetchAndApply(intervalSeconds?: number): void`

The Remote Configuration plug-in add the `fetchAndApply` method, corresponding to `fetch` + `apply` methods of the Java SDK. 

It is recommended to use this method to fetch and apply parameter values from the cloud. Developers can get the failure callback from [setRemoteConfigListener](#setRemoteConfigListener). **No callback in case of success**.

**Parameter Description**:

| Parameter | Description | 
| :---------- | :------------- |  
|  intervalSeconds  | Interval for fetching data, the unit is seconds, default value is -1 for 12 hours. | 

**Example**:

```js
huawei.agc.rc.rcService.fetchAndApply();
```

#### fetch

`fetch(intervalSeconds: number): void`

Developers can also call the `fetch` method to get the `setRemoteConfigListener` callback, and then call the `applyLastFetched` method to apply parameter values from the cloud. But it is recommended to use the `fetchAndApply` method.

**Parameter Description**:

| Parameter | Description | 
| :---------- | :------------- |  
|  intervalSeconds  | Interval for fetching data, the unit is seconds, default value is -1 for 12 hours. | 

**Example**:

```js
huawei.agc.rc.rcService.fetch();
```

#### setRemoteConfigListener

`setRemoteConfigListener(listener: RemoteConfigListener): void`

The `setRemoteConfigListener` is used to get the callback for obtaining the parameter value from the cloud. Developers can choose whether to enable monitoring according to their needs.

- If the `fetchAndApply` method is used, `setRemoteConfigListener` will return the callback only if it fails to obtain the parameter value.
- If the `fetch` method is used, regardless of whether the parameter value is obtained successfully or failed, `setRemoteConfigListener` will return a callback. Developers can call the `applyLastFetched` method to update cloud parameter values after returning the success callback.

**Example**:

```js
huawei.agc.rc.rcService.fetch();
```

### Obtaining Parameter Values by Data Type

```js
getValueAsBoolean(key: String): Boolean {return false;}

getValueAsDouble(key: String): Number {return 0;}

getValueAsLong(key: String): Number {return 0;}

getValueAsString(key: String): String {return "";}
```

After default parameter values are set and parameter values are fetched from Remote Configuration, you can call any of these APIs provided by the SDK based on the data type to obtain the parameter values to use in your app.

> **Note**: due to JavaScript layer limitation, the Remote Configuration plug-in does not support `getValueAsBytArray` method of the Java SDK.

**Parameter Description**:

| Parameter | Description | 
| :---------- | :------------- |  
|  key  | Key of a parameter specified in Remote Configuration. | 

**Example**:

```js
let value = huawei.agc.rc.rcService.getValueAsString('test');
console.log('Get config by key : test, value :' + value);
```

You can call the `getSource` API to obtain the source of a value. The data sources are as follows:

- `huawei.agc.rc.rcService.RemoteConfigSource.STATIC = 0`: default value of the data type.
- `huawei.agc.rc.rcService.RemoteConfigSource.DEFAULT = 1`: in-app default value.
- `huawei.agc.rc.rcService.RemoteConfigSource.REMOTE = 2`: value obtained from Remote Configuration.

### Obtaining All Parameter Values

`getMergedAll(): any`

Returns all values obtained after the combination of the default values and values in Remote Configuration. If they have a same Key, the values in Remote Configuration is preferred.

**Example**:

```js
let values = huawei.agc.rc.rcService.getMergedAll();
console.log('Get all configs : ' + JSON.stringify(values));
```

### Resetting Parameter Values

`clearAll(): void`

Clears all cached data, including the data fetched from Remote Configuration and the default values passed in.

**Example**:

```js
huawei.agc.rc.rcService.clearAll();
```

### Loading Process

You can apply obtained parameter values in either of the following ways, refer to [Loading Process](https://developer.huawei.com/consumer/en/doc/development/AppGallery-connect-Guides/agc-remoteconfig-dev-guide#h1-1592307089186) documentation for details.

#### Applying parameter values immediately

Please refer to [fetchAndApply](#fetchAndApply) function.

#### Applying parameter values upon the next startup

You can `fetch` parameter values at any time. However, the fetched values are not applied immediately but take effect when the app is started next time by calling the `apply` API. In this way, latest parameter values can be applied without asynchronous waiting.

Corresponding to the [fetch](#fetch) method, when [setRemoteConfigListener](#setRemoteConfigListener) is successfully callback, call the `applyLastFetched` method to update the cloud parameter value.

`applyLastFetched(): void`

Corresponding to `loadLastFetched` + `apply` methods of the Java SDK. Obtains the cached data that is successfully fetched last time, and applies parameter values.

**Example**:

```js
huawei.agc.rc.rcService.applyLastFetched();
```

### Set Developer Mode

`setDeveloperMode(isDeveloperMode: Boolean): void`

Enables the developer mode, in which the number of times that the client obtains data from Remote Configuration is not limited, and traffic control is still performed over the cloud.

**Parameter Description**:

| Parameter | Description | 
| :---------- | :------------- |  
|  isDeveloperMode  | Indicates whether to enable the developer mode. | 

**Example**:

```js
huawei.agc.rc.rcService.setDeveloperMode(true);
```

## API Reference

Please refer to the [Remote Configuration - API Reference](https://service.cocos.com/document/api/modules/huawei.agc.rc.html).
