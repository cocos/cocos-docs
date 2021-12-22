# Extension Manager Panel Description

The **Extension Manager** is used to manage extensions in the editor. Click on **Extension -> Extension Manager** in the top menu bar of Creator to open.

![extension-manager](./image/extension-manager.png)

The relevant functions at the top of the extension manager are described as follows:

**1**: extension categories, currently including **Internal**, **Project**, **Global** and **Develop**, please refer to the **Extension Types** section below for details.

**2**: scan button, scan for extensions under the extensions directory (`extensions`), uninstall non-existent extensions, and install extensions that have not been imported.

**3**: import button, import extensions to the extensions type tab you are currently in.

**4**: search field, enter the name of the extension to search for the extension in the list of extension types you are currently in.

## Extension List

The **Extension Manager** panel displays the corresponding extensions according to the currently selected extension type and by filtering through the search bar, etc.

![simple-extension](./image/extension-list.png)

In the extension list, the extension-related information is displayed on the left side of the extension, and the descriptions of the buttons on the right side are as follows:

- ![folder](first/folder.png): opens the extension package in the operating system's file manager.

- ![refresh](first/refresh.png): refresh button, used to reload the current extension.

- ![delete](first/delete.png): uninstall the extension, when clicked it will remove the current extension from the extension list and delete the extension package.

- ![enable](first/enable.png): enable/disable the extension, the button shows green for enable and gray for disable.

## Extension Types

Creator currently classifies extensions as **Internal**, **Project**, **Global**, and **Develop**, click to switch and display the list of extensions of the current type.

### Internal Extensions

The extensions in the Internal extensions tab are all built-in extensions of the editor. The internal extensions cannot be closed, uninstalled or refreshed, and external extensions cannot be imported as internal extensions, so the Scan and Import buttons above are grayed out and not available.

![simple-extension](./image/extension-internal.png)

### Project Extensions

The extensions in the project extensions tab are only available for the current project. The project extensions are located in `${project directory}/extensions`.

![simple-extension](./image/extension-project.png)

| Function | Description |
| :--------------- | :---------- |
| Extension List | Shows extensions installed in the project extension directory. |
| Import Button | Imports the ZIP package of the extension and extract the ZIP to the project extension directory. |

### Global Extensions

The extensions in the Global Extensions tab are available to all projects that have the extension enabled. The global extensions are located in the following directories.

- **Windows**: `%USERPROFILE%\.CocosCreator\extensions`
- **MacOS**: `$HOME/.CocosCreator/extensions`

![simple-extension](./image/extension-global.png)

| Function | Description |
| :--------- | :----------- |
| Extension List | Shows the extensions installed in the global extension directory. |
| Import Button | Imports the ZIP package of the extension and extract the ZIP to the global extension directory. |

### Develop

To facilitate the development of extensions, the **Develop** tab allows **temporary import** of extensions (excluding **current project extensions** and **global extensions**).

| Function | Description |
| :------ | :-------- |
| Extension List | Show temporarily installed extensions. |
| Scan Button | This button is disabled. |
| Import Button | Click this button to **temporarily** register the specified extensions to the extension list in the **Development** tab, but will not copy the corresponding extension packages to the current project. Note that temporarily registered extensions are not currently recorded and will need to be re-registered the next time the project is opened. |

> **Note**: if you click the Uninstall button of an extension in the **Develop** tab, it will only remove the extension in the extension list, and will not delete the extension folder.
