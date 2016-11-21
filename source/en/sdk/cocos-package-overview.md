# Cocos Package

Cocos Package is an automation integrated solution that offers Cocos engine developers SDK integration.It lets developers no longer pay attention to whether the lack of libraries integration SDK, if less configuration, developers can invoke the SDK interface directly, integration is more convenient and quick.

## Introduction

Cocos Package provide a command line tool for developer. Developer can use it in Cocos Console command. `cocos package -h --anysdk` show help documentation

```
	command:

        list            list available and imported plugins on your machine.

        import [name]   import the SDK into Cocos engine project.

        update          re-import all imported plugins to update them to the latest version.

        restore         restores your project to the latest backup that can be found.If you have made changes 
                        to your project files since importing,this will overwrite your changes, so use carefully.

        info            show the plugins that have been imported into your project.

        symbols         displays the symbols that are used to drive the import process.

        version         show Cocos Package version 
```
 : <p> when invoked command , you need to add --anysdk parameter </p>
 
## SDK

### AnySDK Framework

**AnySDK Framework** is AnySDK`s client framework, AnySDK is a third party solution that offers game developers SDK integration without making changes to the SDK's features or parameters.It can do all of this while remaining invisible to your end user.

Cocos Creator built-in Cocos engine includes AnySDK Framework libraries. The platform project that built by developer already includes AnySDK Framework. According to AnySDK Framework](anysdk/anysdk-framework.md) chapter ，know how to use Cocos Package to integrate AnySDK Framework



