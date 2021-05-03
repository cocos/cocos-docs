> **Note**: this version of the documentation has been archived and is no longer maintained. Please move to the [latest version](https://service.cocos.com/document/en/agc-cloudfunc.html).

# Cloud Functions (AppGallery Connect) Quick Start

[Cloud Functions](https://developer.huawei.com/consumer/en/doc/development/AppGallery-connect-Guides/agc-cloudfunction-introduction) enables serverless computing. It provides the Function as a Service (FaaS) capabilities to simplify app development and O&M so your functions can be implemented more easily and your service capabilities can be built more quickly.

### Main Functions

- Cloud Functions provides an efficient and reliable framework for developing and running functions. It frees you from complex traditional development and O&M of apps. Server configuration and management, code deployment, load balancing, autoscaling, and high reliability assurance are now streamlined. You only need to focus on service logic and function code to build reliable and scalable serverless apps.

- As the core of serverless computing, Cloud Functions works with other cloud services like building blocks to implement your service logic.

### Concepts

With Cloud Functions, you can develop functions using programming languages supported by AppGallery Connect and run them in a serverless environment. Each function instance receives and responds to events in an isolated environment. Cloud Functions guarantees reliable function instances and scales their number as needed.

- Function: A script or program running in Cloud Functions to respond to events.
- Event source: Other services (such as Cloud DB) in AppGallery Connect, or your custom services. An event source can release multiple types of events to trigger functions.
- Trigger: Configured to listen on a specified type of event from the event source. Triggers vary by event source, event type, and function-event mapping, and submit data of the specified type of event to a function for handling.
- Alias: A pointer to a specific function. You can create one or more aliases for a function. The function caller (including the trigger) can access a function through its alias.

### Use Cases

Cloud Functions lets you run function code to respond to specific events, such as:

- Sending event notifications to users.
- Executing database cleaning and maintenance tasks.
- Executing intensive tasks on the cloud.
- Integrating third-party services and APIs.

### Apply for Test Qualification

Cloud Functions is still in Beta state. To use Cloud Functions, send an application email to `agconnect@huawei.com` to apply for the service.

Set your email title format as: **[Cloud Functions]-[Company name]-[Developer account ID]-[Project ID]**. For details about how to query the developer account ID and project ID, please refer to [Querying the Developer Account ID and Project ID](https://developer.huawei.com/consumer/en/doc/development/AppGallery-connect-Guides/agc-query-ID). Huawei operation personnel will reply within 1 to 3 working days. 

### Charge

Currently, Cloud Functions is in beta test and **free** of charge. Huawei will email you a notice about pricing policies one month in advance of formal charging.

### Version Update Description

- Latest Version: 0.5.0_1.4.1.300

    - Integrated Huawei AGC Cloud Functions service.

## Enable Cloud Functions Service

- Ensure that the Cloud Functions service test qualification application has been passed.

- Use Cocos Creator to open the project that needs to be connected to Cloud Functions service.

- Click on **Panel -> Service** in the menu bar to open the Service panel, select **Cloud Functions** service to go to the service detail page, and then click on the **Enable** button in the top right to enable the service. For details, please refer to the Cocos Service [Operation Guide](./index.md#usage) documentation.

  ![](agc-cloudfunc/cf-panel.png)

### Configs HUAWEI Config File

Most of HUAWEI Services need the `agconnect-services.json` configuration file. If there are operations such as newly opened services, please update the file in time.

- Sign in to [AppGallery Connect](https://developer.huawei.com/consumer/en/service/josp/agc/index.html) find your project from the project list and select the app on the project card.

- On the **Project Setting** page, click the configuration file **agconnect-services.json** to download it. The `agconnect-services.json` file **must be copied manually** to the `settings` directory of the project directory after downloading or updating.

  ![](agc-cloudfunc/cf-configfile.png)

- For Creator v2.4.3 and above, if you want to publish to the [HUAWEI AppGallery Connect](../publish/publish-huawei-agc.md), you can select the downloaded or updated configuration file directly in the **Build** panel, no need to copy it manually.

  ![](agc-cloudfunc/cf-agcfile.png)

### Verify whether the service is integrated successfully

- Please refer to [Creating a Function](https://developer.huawei.com/consumer/en/doc/development/AppGallery-connect-Guides/agc-cloudfunction-getstarted#h1-1592364963757) document, create a function in the AGC console. AGC provides the default **myHandler** function, use the code directly, and get the [Trigger Identifier](https://developer.huawei.com/consumer/en/doc/development/AppGallery-connect-Guides/agc-cloudfunction-appcall#h1-1578361186845).

- Once the Cloud Functions service is integrated, we can verify the success of the Cloud Functions service integration by adding simple code to the script. Take the obtained trigger identifier as `test-$latest` as an example.

  ```js
  huawei.agc.func.AGCFunctionService.wrap("test-$latest").call((err, data) => {
      if (err !== null) {
          console.log("Cloud Function", `error: ${JSON.stringify(err)}`);
      }
      console.log("Cloud Function", `result: ${JSON.stringify(data)}`);
  });
  ```
  
- [Publish to the Android platform](../publish/publish-native.md) after the code is added. Please make sure that the **Package Name** on the **Build** panel is consistent with the **Package Name** set in the AppGallery Connect console.

- Run the project on a phone, if you can see the log output in Logcat, which means the integrate is successful.

  ![](agc-cloudfunc/cf-console.png)

## Sample Project

Developer can get a quick taste of the Cloud Functions service with the sample project.

- Click on the **Sample** button in the Cloud Functions service panel, clone or download, and open the project in Cocos Creator.

- Please refer to [Creating a Function](https://developer.huawei.com/consumer/en/doc/development/AppGallery-connect-Guides/agc-cloudfunction-getstarted#h1-1592364963757) document, create a function in the AGC console. If there is a custom name of trigger identifier, please replace the "func-$latest" to the cumstom name in `assets/function/function.js`.

- After enabling the Cloud Function service and configuring the HUAWEI configuration file as described above, you can open the **Build** panel to compile the project by clicking **Project -> Build** in the Creator editor menu bar. Cocos Creator v2.4.1 and above, you could [publish to HUAWEI AppGallery Connect](../publish/publish-huawei-agc.md). Below Creator v2.4.1 could [publish to the Android platform](../publish/publish-native.md).

- Once the Sample project is running on the phone, click the **Functions** button on the homepage for testing.

  ![](agc-cloudfunc/cf-sample.jpg)

## Developer Guide

This document refers to AppGallery Connect documentation - [Calling a Function](https://developer.huawei.com/consumer/en/doc/development/AppGallery-connect-Guides/agc-cloudfunction-appcall#h1-1578361210933).

Call `wrap` and transfer the trigger identifier to it.

`wrap(trigger: string): AGCFunctionCallable`

**Example**:

```js
var function = huawei.agc.func.AGCFunctionService.wrap("test-$latest");
```

Then call the `call` method to call the function.

`call(cb: FunctionCallback, param = {}): void`

**Example**:

```js
// without params
function.call((err, data) => {
    if (err !== null) {
        console.log("Cloud Function", `error: ${JSON.stringify(err)}`);
    }
    console.log("Cloud Function", `result: ${JSON.stringify(data)}`);
});

// with params
function.call((err, data) => {
    if (err !== null) {
        console.log("Cloud Function", `error: ${JSON.stringify(err)}`);
    }
    console.log("Cloud Function", `result: ${JSON.stringify(data)}`);
}, {
    param1: "value1",
    param2: {
        param3: "value3",
        param4: 123
    }
});
```

## API Reference

Please refer to the [Cloud Functions - API Reference](https://service.cocos.com/document/api/modules/huawei.agc.func.html).
