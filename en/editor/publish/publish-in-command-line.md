# Publish from the Command Line

Publish a project from the command line can help us build an auto-publish routine that allows modifying command line parameters to achieve different goals.

## Command Reference

**For example**: Building Web Desktop with debug mode enabled:

- Mac

  ```bash
  /Applications/CocosCreator/Creator/3.0.0/CocosCreator.app/Contents/MacOS/CocosCreator --project projectPath
  --build "platform=web-desktop;debug=true"
  ```

- Windows

  ```bash
  ...\CocosCreator.exe --project projectPath --build "platform=web-desktop;debug=true"
  ```

Currently, when using the command line to build, except for the required build options, if no parameter values are uploaded, the default values are used to build. Please refer to the description below and the platform's build options description for specific default values.

## Exit Codes

- **32** Build failed —— Invalid build parameters.
- **34** Build failed —— Some unexpected errors occurred during the build process, please refer to the build log for details.
- **36** Build success.

## Publish Parameters

- `--project`: Required, specify the project path.

- `--build`: Specify the parameters to be used when building the project.

  When parameters are not specified after `--build`, then the parameters used in the **Build** panel, such as platforms, templates, and so on, will be used as default parameters. When additional parameter settings are specified, the default parameters will be overwritten with the specified parameters. The available parameters are:

    - `configPath`: Parameter file path. If define `configPath`, then __Cocos Creator__ will load this file as a build parameter in the `JSON` file format. This parameter can be modified by yourself or exported directly from the **Build** panel.
    - `logDest`: Specify the log output path.
    - `includedModules`: Customize the engine packaged modules, only the required modules are packaged. The corresponding field of each module can be found in the `features` field in [this file](https://github.com/cocos-creator/engine/blob/3d/cc.config.json) of engine repository.
    - `outputName`: The name of the release folder generated after the build.
    - `name`: Game name.
    - `platform`: Required, the platform needs to be built.
    - `buildPath`: Specify the directory where the build release package is generated, the default is the `build` directory under the project directory. Either an absolute path or a path relative to the project (e.g.: `project://release`) can be used. Note that relative paths like `../` is expected to be supported in v3.4.2.
    - `startScene`: The UUID of the main scene (the participating scene will use the build option parameters in the **Build** panel from the last build), and the first scene from the **Included Scenes** will be used if not specified.
    - `scenes`: Information about the scenes involved in the build, which defaults to all scenes when not specified.
    - `debug`: Whether or not debug mode, the default is `false`.
    - `replaceSplashScreen`: Whether to replace the splash screen, the default is `false`.
    - `md5Cache`: Enabled or disabled the MD5 Cache, the default is `false`.
    - `mainBundleCompressionType`: Main bundle compression type. For specific option values, please refer to the document [Asset Bundle — compression type](../../asset/bundle.md##compression-type).
    - `mainBundleIsRemote`: Configure the main package as a remote package.
    - `packages`: The build configuration parameters supported by each plugin. What needs to be stored is the serialized string for the data object. For details, please refer to the following.

Each platform's build will be embedded in the **Build** panel as a separate plugin, so each platform's build options are in different locations. The build parameters are configured in the `packages` field, for example, to specify the build options for WeChat Mini Game, the configuration is as follows:

```bash
{
    taskName: 'wechatgame',
    packages: {
        wechatgame: {
            appid: '*****',
        }
    }
}
```

After the build plugin system is opened to the public, the configuration parameters of other plugins are embedded in the **Build** panel in the same way. **Please refer to the documentation of each platform for the specific parameter fields of each platform**, it is better to use the **Export** function of the **Build** panel to get the configuration parameters. Currently it is still compatible with the old version of the parameters to build, but the compatibility process will be gradually removed later, so please upgrade the configuration parameters as soon as possible.

## Publish using Jenkins

**Cocos Creator** still needs the GUI environment when running from the command line. If the Jenkins server can not run **Cocos Creator** from the command line, a solution is running Jenkins in agent mode, so it can interact with the operating systems window server. For more details please review this [Stack Overflow post](https://stackoverflow.com/questions/13966595/build-unity-project-with-jenkins-failed).

If the Jenkins server can not compile under Windows, specify a local user for the Jenkins service in the Windows **Control Panel -> Administrative Tools -> Services**, and then restart the computer. You don't need to set up a master-slave mode separately.
