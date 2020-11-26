# Publishing from the Command Line

Publish a project from the command line can help us build an auto-publish routine that allows modifying command line parameters to achieve different goals.

## Command Reference

**For example**: Build Web Desktop with debug mode enabled:

- Mac

  ```bash
  /Applications/CocosCreator3D.app/Contents/MacOS/CocosCreator3D --project projectPath
  --build "platform=web-desktop;debug=true"
  ```

- Windows

  ```bash
  CocosCreator3D/CocosCreator3D.exe --project projectPath --build "platform=web-desktop;debug=true"
  ```

Currently, when using the command line to build, except for the required build options, if no parameter values are uploaded, the default values are used to build. Please refer to the description below and the platform's build options description for specific default values.

## Exit Codes

- **332** Build failed —— Invalid build parameters.
- **334** Build failed —— Some unexpected errors occurred during the build process, please refer to the build log for details.
- **336** Build success.

## Publish Parameters

- `--project`: Required, specify the project path.

- `--build`: Specify the parameters to be used when building the project.

  If no parameters are specified after `--build`, then the parameters used in the **Build** panel, such as platforms, templates, and so on, will be used as default parameters. If additional parameter settings are specified, the default parameters will be overwritten with the specified parameters. The available parameters are:

    - `configPath`: Parameter file path. If define `configPath`, then __Cocos Creator__ will load this file as a build parameter in the `JSON` file format. This parameter can be modified by yourself or exported directly from the **Build** panel.

    - `includedModules`: Package modules for custom engines. Only the required modules are packaged.

      > **Note**: the pass is an array of module `entry` fields, see [this documentation](https://github.com/cocos-creator/engine/blob/3d-v1.0.0/scripts/module-division/division-config.json) for details.

    - `taskName`: Build task name, the name of the release folder generated after the build.
    - `name`: Game name
    - `platform`: Required, the platform needs to be built.
    - `buildPath`: The game's release path, the default release path is in the `build` under the project folder.
    - `startScene`: The uuid of the main scene (the participating scene will use the build option parameters in the **Build** panel from the last build), and the first scene from the **Included Scenes** will be used if not specified.
    - `scenes`: Information about the scenes involved in the build, which defaults to all scenes when not specified.
    - `debug`: Whether or not debug mode, the default is `false`.
    - `mergeStartScene`: Whether or not to merge all `JSON` that the initial scene depends on, the default is `false`.
    - `packAutoAtlas`: Enabled or disabled the Auto Atlas, the default is `false`.
    - `compressTexture`: Enabled or disabled the compress texture, the default is `false`.
    - `replaceSplashScreen`: Whether to replace the splash screen, the default is `false`.
    - `md5Cache`: Enabled or disabled the MD5 Cache, the default is `false`.

Each platform's build will be embedded in the **Build** panel as a separate plugin, so each platform's build options are in different locations, and the build options are in `packages.platform-name.key`. For example, to specify the build options for the WeChat Mini Game, the configuration is as follows:

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

After the build plugin system is opened to the public, the configuration parameters of other plugins are embedded in the **Build** panel in the same way. Please refer to the documentation of each platform for the specific parameter fields of each platform, it is better to use the **Export** function of the **Build** panel to get the configuration parameters. Currently it is still compatible with the old version of the parameters to build, but the compatibility process will be gradually removed later, so please upgrade the configuration parameters as soon as possible.

## Publishing using Jenkins

**Cocos Creator** still needs the GUI environment when running from the command line. If the Jenkins server can not run **Cocos Creator** from the command line, a solution is running Jenkins in agent mode, so it can interact with the operating systems window server. For more details please review this [Stack Overflow post]( https://stackoverflow.com/questions/13966595/build-unity-project-with-jenkins-failed).

If the Jenkins server can not compile under Windows, specify a local user for the Jenkins service in the Windows **Control Panel -> Administrative Tools -> Services**, and then restart the computer. You don't need to set up a master-slave mode separately.
