> **Note**: this version of the documentation has been archived and is no longer maintained. Please move to the [latest version](https://service.cocos.com/document/en/hms-analytics.html).

# Analytics Kit (HMS Core) Quick Start

[HUAWEI Analytics Kit](https://developer.huawei.com/consumer/en/hms/huawei-analyticskit) (hereinafter referred to as Analytics Kit or Kit) offers a rich array of preset analytics models that help you gain a deeper insight into your users, products, and content. With this insight, you can then take a data-driven approach to market your apps and optimize your products.

With Analytics Kit's on-device data collection SDK, you can:

- Collect and report custom events.
- Set a maximum of 25 user attributes.
- Automate event collection and session calculation with predefined event IDs and parameters.

### Use Cases

- Analyze user behavior using both predefined and custom events.
- Use audience building to tailor your marketing activity to your users' behaviors and preferences.
- Use dashboards and analytics to measure your marketing activity and identify areas to improve.

### Version Update Description

- Latest Version: 0.5.7_5.0.5.301

    - Add new predefined events and parameters.

- v0.5.5_5.0.5.301

    - Update the Analytics SDK to version 5.0.5.301.
    - Add support for the setting of the installation source.
    - Add `setReportPolicies` to set the report policies.
    - Add predefined events and parameters specific to the gaming and e-commerce industries.
    - Pass `null` or `undefined` in the `setUserProfile` method, can delete the corresponding user profile.

- v0.5.3_5.0.1

    - Integrated Huawei HMS Analytics Kit.

## Enable Analytics Kit Service

- Use Cocos Creator to open the project that needs to be connected to Analytics Kit.

- Click on **Panel -> Service** in the menu bar to open the Service panel, select Analytics Kit service to go to the service detail page, and then click on the **Enable** button in the top right to enable the service. For details, please refer to the Cocos Service [Operation Guide](./index.md#usage) documentation.

  ![](hms-analytics/ana-provisioning.jpeg)

- Refer to the [Configuring App Information in AppGallery Connect](https://developer.huawei.com/consumer/en/doc/development/HMSCore-Guides/android-config-agc-0000001050163815) documentation to complete developer registration, app creation, enable Huawei Analysis Service parameter configuration, and enable the API.

- Fill in **App installation source** in "Params Config" of Analytics Kit service panel. For example, if the installation source of the application is Huawei AppGallery, you can fill in `AppGallery`. The installation source name can contain up to 128 characters, including letters, digits, underscores (_), hyphens (-), and spaces. The name cannot start or end with a space if it contains only digits.

  ![](hms-analytics/ana-filter.jpg)

### Configs HUAWEI Config File

Most of HUAWEI Services need the `agconnect-services.json` configuration file. If there are operations such as newly opened services, please update the file in time.

- Sign in to [AppGallery Connect](https://developer.huawei.com/consumer/en/service/josp/agc/index.html) find your project from the project list and select the app on the project card.

- On the **Project Setting** page, click the configuration file **agconnect-services.json** to download it. The `agconnect-services.json` file **must be copied manually** to the `settings` directory of the project directory after downloading or updating.

  ![](hms-analytics/ana-configfile.png)

- For Creator v2.4.3 and above, if you want to publish to the [HUAWEI AppGallery Connect](../publish/publish-huawei-agc.md), you can select the downloaded or updated configuration file directly in the **Build** panel, no need to copy it manually.

  ![](hms-analytics/ana-agcfile.png)

### Verify whether the service is integrated successfully

- Once the Analytics Kit service is integrated, you can [publish to the Android platform](../publish/publish-native.md) without changing your code. Please make sure that the **Package Name** on the **Build** panel is consistent with the **Package Name** set in the AppGallery Connect console.

- Login the [AppGallery Connect](https://developer.huawei.com/consumer/en/service/josp/agc/index.html) console, open the project, go to **HUAWEI Analytics -> User Analysis -> New Users**. If you can see new user information (usually displayed within 10 minutes), which means the integrate is successful.

## Sample Project

Developer can get a quick taste of the Analytics Kit with the sample project.

- Click on the **Sample** button in the Analytics Kit service panel, clone or download, and open the project in Cocos Creator.

- After enabling the Analytics Kit service and configuring the HUAWEI configuration file as described above, you can open the **Build** panel to compile the project by clicking **Project -> Build** in the Creator editor menu bar. Cocos Creator v2.4.1 and above, you could [publish to HUAWEI AppGallery Connect](../publish/publish-huawei-agc.md). Below Creator v2.4.1 could [publish to the Android platform](../publish/publish-native.md).

- Need to test on Huawei or Honor brand phones with HMS Core service installed.

- Once the Sample project is running on the phone, click the **Analytics** button on the homepage for testing.

    ![](hms-analytics/ana-sample.jpg)

## Developer Guide

Analytics kit provide some [Automatically Collected Events](https://developer.huawei.com/consumer/en/doc/development/HMSCore-Guides/android-automatic-event-collection-0000001051757143). Such events can be automatically collected without extra coding, and the only requirement is that the function of collecting system events is enabled. (The function is automatically enabled during initiation.)

When the analysis service plug-in is started, the initialization of the SDK has been called, and the developer does not need to call it again.

### Custom Events

`onEvent(eventId: any, params: any): void`

Such events can be used to meet personalized analysis requirements that cannot be met by automatically collected events and predefined events.

You may need personalized events for logging and analytics. Analytics Kit allows you to customize events and extend event parameters, or add personalized parameters for predefined events.

For example, you can add custom event `begin_examination` to indicate the event of entering a new exam and add the `exam_difficulty` parameter to define the exam difficulty.

**Parameter Description**:

| Parameter | Description | 
| :---------- | :---------- |
| eventId | Event ID. It is consisting of numbers, letters and underscores, cannot start with a number, cannot contain spaces, cannot exceed 256 characters in length, cannot use [Automatically Collected Events](https://developer.huawei.com/consumer/en/doc/development/HMSCore-Guides/android-automatic-event-collection-0000001051757143). It is recommended to use [Predefined Events](https://developer.huawei.com/consumer/en/doc/development/HMSCore-Guides/ios-predefined-events-0000001051997159) first. | 
| params | Information carried in the event. The number of built-in key-value pairs in the Bundle cannot exceed 2048 and the size cannot exceed 200 KB. The key value in the Bundle can consist of digits, letters, and underscores (_) but cannot start with a digit. | 

**Example**:

```js
let eventName = 'myEvent';
let params = {
    name: 'userName',
    age: 18,
    others: {
        stature: 199,
        level: 100
    }
};

huawei.hms.analytics.analyticsService.onEvent(eventName, params);
```

### Selectable functions

#### Specifies whether to enable event collection

`setAnalyticsEnabled(enable: boolean): void`

Specifies whether to enable event collection. If the function is disabled, no data is recorded.

**Parameter Description**:

| Parameter | Description | 
| :---------- | :---------- |  
| enabled | Indicates whether to enable automatic event collection. The options are as follows. The default value is **true**.<br>**true**: Enable the function<br>**false**: Close the function | 

**Example**:

```js
huawei.hms.analytics.analyticsService.setAnalyticsEnabled(true);
```

#### Sets a user ID

`setUserId(userId: string): void`

When the API is called, a new session is generated if the old value of **userId* is not empty and is different from the new value. If you do not want to use **userId** to identify a user (for example, when a user signs out), you must set id to `null`.

The **userId** is used by Analytics Kit to associate user data. The use of **userId** must comply with related privacy regulations. You need to declare the use of such information in the privacy statement of your app.

**Parameter Description**:

| Parameter | Description | 
| :---------- | :---------- |  
| userId | User ID, a string containing a maximum of 256 characters. The value cannot be empty. | 

**Example**:

```js
huawei.hms.analytics.analyticsService.setUserId("a123456");
```

#### Sets user attributes

`setUserProfile(name: string, value: string): void`

Sets user attributes. The values of user attributes remain unchanged throughout the app lifecycle and during each session. A maximum of 25 user attributes are supported. If the name of an attribute set later is the same as that of an existing attribute, the value of the existing attribute is updated.

**Parameter Description**:

| Parameter | Description | 
| :---------- | :---------- |  
| name | Name of the user attribute, a string containing a maximum of 256 characters excluding spaces and invisible characters. The value cannot be empty. | 
| value | Value of the user attribute, a string containing a maximum of 256 characters. The value cannot be empty.| 

**Example**:

```js
let name = 'profile1';
let value = 'value1';
huawei.hms.analytics.analyticsService.setUserProfile(name, value);
console.log('setUserProfile...', name, value);
```

#### Sets the push token

`setPushToken(token: string): void`

Sets the push token. After obtaining a push token through Push Kit, call this method to save the push token so that you can use the audience defined by HUAWEI Analytics to create HCM notification tasks.

If the HMS Core Push Kit is integrated through [SDKHub](./sdkhub.md), the callback returned by calling the `startPush` function is the **Push Token**.

**Parameter Description**:

| Parameter | Description | 
| :---------- | :---------- |  
| token | Push token, a string containing a maximum of 256 characters. The value cannot be empty. | 

**Example**:

```js
huawei.hms.analytics.analyticsService.setPushToken("0864618033588744300007222600CN01");
```

#### Sets the minimum interval for starting a new session

`setMinActivitySessions(time: number): void`

Sets the minimum interval for starting a new session. A new session is generated when an app is switched back to the foreground after it runs in the background for the specified minimum interval. By default, the minimum interval is 30,000 milliseconds (that is, 30 seconds).

**Parameter Description**:

| Parameter | Description | 
| :---------- | :---------- |  
| milliseconds | Minimum interval for updating a session, in milliseconds. | 

**Example**:

```js
let value = 1000 * 60 * 60;
huawei.hms.analytics.analyticsService.setMinActivitySessions(value);
```

#### Sets the session timeout interval

`setSessionDuration(time: number): void`

Sets the session timeout interval. A new session is generated when an app is running in the foreground but the interval between two adjacent events exceeds the specified timeout interval. By default, the timeout interval is 1,800,000 milliseconds (that is, 30 minutes).

**Parameter Description**:

| Parameter | Description | 
| :---------- | :---------- |  
| milliseconds | Session timeout interval, in milliseconds. | 

**Example**:

```js
let value = 1000 * 60 * 60;
huawei.hms.analytics.analyticsService.setSessionDuration(value);
```

#### Clears all the collected data from the local cache

`clearCachedData(): void`

Deletes all collected data cached locally, including cached data that failed to be sent.

**Example**:

```js
huawei.hms.analytics.analyticsService.clearCachedData();
```

#### Obtains the app instance ID

`getAAID(): void`

Obtains the app instance ID from AppGallery Connect. Call the function with `huawei.hms.analytics.analyticsService.once` to get a single callback, or use `huawei.hms.analytics.analyticsService.on` lintener to listen for callbacks.

**Example**:

```js
huawei.hms.analytics.analyticsService.getAAID();
huawei.hms.analytics.analyticsService.once(huawei.hms.HMS_ANALYTICS_EVENT_LISTENER_NAME.GET_AAID, (result) => {
    console.log('getAAID...', JSON.stringify(result));
});
```

#### Obtains the predefined or custom user attributes

`getUserProfiles(preDefined: boolean): void`

Obtains predefined and custom user attributes in A/B Testing. Call the function with `huawei.hms.analytics.analyticsService.once` to get a single callback, or use `huawei.hms.analytics.analyticsService.on` lintener to listen for callbacks.

**Parameter Description**:

| Parameter | Description | 
| :---------- | :---------- |  
| preDefined | Indicates whether to obtain predefined user attributes. <br>**true**: Obtains predefined user attributes<br>**false**: Obtains custom user attributes | 

**Example**:

```js
huawei.hms.analytics.analyticsService.getUserProfiles();
huawei.hms.analytics.analyticsService.once(huawei.hms.HMS_ANALYTICS_EVENT_LISTENER_NAME.GET_USER_PROFILES, (result) => {
    console.log('getUserProfiles...', JSON.stringify(result));
});
```

#### Defines a custom page entry event

`pageStart(pageName: string, pageClassOverride: string): void`

Customizes a page entry event. The API applies only to non-activity pages because automatic collection is supported for activity pages. If this API is called for an activity page, statistics on page entry and exit events will be inaccurate.

After this API is called, the `pageEnd()` API must be called.

**Parameter Description**:

| Parameter | Description | 
| :---------- | :---------- |  
| pageName | Name of the current page, a string containing a maximum of 256 characters. The value cannot be empty. | 
| pageClassOverride | Class name of the current page, a string containing a maximum of 256 characters. The value cannot be empty. | 

**Example**:

```js
huawei.hms.analytics.analyticsService.pageStart("pageName1", "pageClassOverride1");
```

#### Defines a custom page exit event

`pageEnd(pageName: string): void`

**Parameter Description**:

| Parameter | Description | 
| :---------- | :---------- |  
| pageName | Name of the current page, a string containing a maximum of 256 characters. The value cannot be empty. It must be the same as the value of **pageName** passed in `pageStart()`. | 

**Example**:

```js
huawei.hms.analytics.analyticsService.pageEnd("pageName1");
```

#### Sets the automatic event reporting policy

`setReportPolicies(...reportPolicies: ReportPolicy[])`

**Parameter Description**:

| Parameter | Description | 
| :---------- | :---------- |  
| policies | Policy for data reporting. Four policies are supported, and multiple policies can be set at the same time.<br>**ON_APP_LAUNCH_POLICY**: An event is reported immediately when this policy is set. After that, an event is reported each time the app is started.<br>**ON_MOVE_BACKGROUND_POLICY**: This event is reported when an app is switched to the background (including app exit).<br>**ON_SCHEDULED_TIME_POLICY**: An event is reported at the specified interval. The value ranges from 60 to 1800, in seconds. If the specified value is beyond the value range, the boundary value is used.<br>**ON_CACHE_THRESHOLD_POLICY**: An event is reported when the number of cached events reaches the threshold. The value ranges from 30 to 1000. The default value is 30. If the specified value is beyond the value range, the boundary value is used.| 

> **Notes**:
>
> 1. The preceding reporting policies take effect only when the debug mode is disabled.
> 2. **onMoveBackgroundPolicy** and **onCacheThresholdPolicy** are default policies. If no policy is set, the two policies automatically take effect. If **onMoveBackgroundPolicy** is not included in the configured event reporting policies, this policy will not take effect.
> 3. **onCacheThresholdPolicy** is mandatory. This policy is effective no matter what policy has been configured. You can change the threshold as needed.
> 4. Event reporting policies will be updated if a policy setting API is called multiple times. Only the policy set by the last API is effective.
> 5. When a policy is met and event reporting is triggered, the event is cached locally if no network is available and will be reported again when reporting conditions are met next time.
> 6. The specified event reporting policies are saved persistently.
> 7. If the app is uninstalled when only **onAppLaunchPolicy** or **onScheduledTimePolicy** is specified, events of the app may be lost.

**Example**:

```js
let ReportPolicy = huawei.hms.analytics.ReportPolicy;
let moveBackgroundPolicy = ReportPolicy.ON_MOVE_BACKGROUND_POLICY;
let scheduledTimePolicy = ReportPolicy.ON_SCHEDULED_TIME_POLICY;
scheduledTimePolicy.threshold = 600;
huawei.hms.analytics.analyticsService.setReportPolicies(moveBackgroundPolicy, scheduledTimePolicy);
```

#### Enables the debug log function

`static enableLog(level?: LOG_LEVEL): void`

Enables the debug log function

**Parameter Description**:

| Parameter | Description | 
| :---------- | :---------- |  
| level | Enables the debug log function and specify the level of the debug log.<br>Debug log level:<br>huawei.hms.LOG_LEVEL.debug, <br>huawei.hms.LOG_LEVEL.info, <br>huawei.hms.LOG_LEVEL.warn, <br>huawei.hms.LOG_LEVEL.error. | 

**Example**:

```js
huawei.hms.analytics.AnalyticsTools.enableLog();

huawei.hms.analytics.AnalyticsTools.enableLog(huawei.hms.LOG_LEVEL.debug);
```

## API Reference

Please refer to the [Analytics Kit - API Reference](https://service.cocos.com/document/api/modules/huawei.hms.analytics.html).
