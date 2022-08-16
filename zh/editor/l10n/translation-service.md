# 译文服务商

译文服务商是第三方软件商，引擎通过抹平他们之间 API 的差异将其整合到一起。通常开发者需要注册服务商的账号并开启相应的 API 才可以启动自动翻译的功能。

若您没有对应的开发者账号也无需担心，L10N 支持手动翻译。

![service](translation-service/overview.png)

- **译文服务商**：该下拉菜单允许开发者选择不同的译文服务商，如选择 **None** 则无法使用自动翻译功能，手动翻译功能不受影响。

    ![select](translation-service/select.png)

    目前支持的服务商的地址如下：

    - [有道智云平台](https://ai.youdao.com/gw.s#/)
    - [Google Cloud](https://cloud.google.com)

- **AppKey**/**AppSecret**：选择不同的服务商后，开发者需要输入 AppKey 和 AppSecret 才可以继续后续的操作。通常这些信息需要在译文服务商的网站上获取。

    ![key](translation-service/youdao.png)

    输入完成后，点击保存即可。
