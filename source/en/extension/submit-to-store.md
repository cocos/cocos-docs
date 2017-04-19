# Submit To Store

Cocos Creator provide extension store allow user browser, download and install 3rd extensions. Read the usage of it [Install and Share](install-and-share.md). To share and selling extensions, you need to submit your package to the store:

## Package your extension

Suppose your directory structure like this:

```
foobar
    |--panel
    |    |--index.js
    |--package.json
    |--main.js
```

You need to zip the `foobar` to `foobar.zip`.

### npm install 3rd library

We didn't include the npm piepline, so you have to pre-install the 3rd packages in `node_modules` before zip.

## Login to Developer Platform

- Access and login to [Cocos Developer](https://open.cocos.com)
- Go to [Cocos App](https://open.cocos.com/app)
- Under Cocos Store Click [Submit](https://open.cocos.com/store/name_list)

![login to cocos open platform](submit-to-store/login.jpg)

## Create Extensions

Enter the Cocos Store page, click `Submit` button at top right, go to the submit page:

- Name your extension
- Choose the category `Creator Extension`
- Click Create, and fill the information

## Fill the Information

We need to fill the form:

- **version** Follow the [semver standard](http://semver.org/lang/zh-CN/)
- **Price** RMB, free is 0.
- **Description**
- **Download Address** Two method: 1. Submit to net-driver or github link 2. Manually submit to Cocos Store
- **Icon** 512x512
- **Snapshot** Up to 5, size 640x960 or 960x640
- **Links** You supports link

Once you done, click `Submit to Review`, we will review your packages:

- If nothing wrong, you will see your extensions in the store
- Any problem we will send you the E-mail