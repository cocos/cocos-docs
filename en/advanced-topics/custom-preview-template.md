# Preview Template Customization Workflow

Starting with v2.2, Cocos Creator supports for custom preview templates. Developers can customize the preview they need, and currently only support custom browser preview.

## Custom Preview Template

- Create `preview-templates` folder in the project path.

  Folder Structure:
    
  ```js
  project-folder
    |--assets
    |--build
    |--preview-templates
  ```

- Once the `preview-templates` file is created, the developer can customize it directly, or it can be customized by referring to the `preview-templates` file structure built-in the editor. After the customization is complete, you need to restart the editor, then select the **Browser** above the editor and click the **Preview** button to see the effect.

  The `preview-templates` files built-in the editor are stored as follows:

  **Mac**: `./CocosCreator.app/Contents/Resources/static/preview-templates`

  **Windows**: `./CocosCreator/resources/static/preview-templates`

## preview-templates

The `preview-templates` file is equivalent to a normal web template, which contains:

  ```js
  preview-templates
    // Entry file that must exist
    |--index.html
    // Other files can be added as needed
  ```

Developers can write `index` files based on their needs. The three common web template types that `index` currently supports are **.html**, **.jade**, **.ejs**.

Creator also provides a simple example of custom preview **html** template, developers can create a custom preview template project in the **Dashboard -> New Project** panel for reference.

![Custom Preview Template](./custom-preview-template/create.png)

**Note**: Three web templates can only choose one of them to write. If you don't know about the three types, refer to the following basic documentation for details:

**html**: <https://developer.mozilla.org/zh-CN/docs/Web/HTML>

**jade**: <http://jade-lang.com/>

**ejs**: <https://ejs.bootcss.com/>
