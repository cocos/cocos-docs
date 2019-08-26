# Web Preview Customization Workflow

Starting with v2.2, Cocos Creator supports for custom web preview. Developers can customize the web preview what they need.

## Custom Web Preview

- Create `preview-templates` folder in the project path.

  Folder Structure:

  ```js
  project-folder
    |--assets
    |--build
    |--preview-templates
  ```

- Start customizing the web preview and you can refer to the `preview-templates` folder built-in the editor. After the customization is complete, you need to restart the editor, then select the **Browser** above the editor and click the **Preview** button to see the effect.

  The editor's built-in `preview-templates` folder are stored here:

  **Mac**: `./CocosCreator.app/Contents/Resources/static/preview-templates`

  **Windows**: `./CocosCreator/resources/static/preview-templates`

## preview-templates

The `preview-templates` folder is equivalent to a normal web template, which contains:

  ```js
  preview-templates
    // Required entry file
    |--index.html
    // Other files can be added as needed
  ```

Developers can write `index` file as needed. Currently, `index` supports three file types: **.html**, **.jade** and **.ejs**.

At the same time Creator also provides a custom web preview example of html type that you can create in the **Dashboard -> New Project** panel for reference.

![Custom Preview Template](./custom-preview-template/create.png)

**Note**: Only one of the three file types can be selected for writing. If you are not familiar with the three file types, you can refer to the following basic documents:

**html**: <https://developer.mozilla.org/zh-CN/docs/Web/HTML>

**jade**: <http://jade-lang.com/>

**ejs**: <https://ejs.bootcss.com/>
