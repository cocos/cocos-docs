# 谷歌 Mobile AD 接入指南

## 准备工作

1. 确保已经熟悉安卓打包流程，参考 []()
2. 正确注册谷歌 Admob 的开发者账号

## 环境搭建

## 系统需求

## 注册账号

## 启动广告

## 接入插件

注意： 请在开启测试之前，确保使用的是 测试 Id 

## 调试和运行

## 。。。。

## 获取设备id

## 使用插件

注意事项像：

1. 设备要有谷歌服务 （Google Play） 安装地址： []()
   1. 出现下面的警告时表示您的设备上的 Google Play 版本太老了需要升级
   >  Google Play services out of date for com.test.abmob.  Requires 212800000 but found 201516037

   升级您的 Googlay Play service 

   浏览器地址：

   选择安装
2. 可以正确访问谷歌的网络

重设配置：

```java
RequestConfiguration requestConfiguration = MobileAds.getRequestConfiguration()
                .toBuilder()
                .setTestDeviceIds(Arrays.asList("90B2E510C816181BB785C71C90DA9A9A"))
                .build();
MobileAds.setRequestConfiguration(requestConfiguration);
```

## 如何部署模拟器

1. 通过 []() 该文档在
2. 配置网络，默认情况下，模拟器会创建一个名为 AndroidWifi 的网络，您可以先断开连接后，通过长按或者配置按钮配置并选择 手动配置，配置对应的代理服务器既可以进行外网的访问

本章分为两个部分：
1. 如何自行接入 Admob
2. 使用插件