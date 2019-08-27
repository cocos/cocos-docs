# Web Preview Customization Workflow

Starting with v2.2, Cocos Creator supports for custom web preview.
## Custom Web Preview

- Create `preview-templates` folder in the project path.

  Folder Structure:

  ```js
  project-folder
    |--assets
    |--build
    |--preview-templates
  ```

- Start customizing the web preview, you can refer to the editor's builtin `preview-templates`. After the customization is complete, you need to restart the editor, then select the **Browser** above the editor and click the **Preview** button to see the effect.

  The editor's builtin `preview-templates` folder are placed here:

  **Mac**: `CocosCreator.app/Contents/Resources/static/preview-templates`

  **Windows**: `CocosCreator/resources/static/preview-templates`

## preview-templates

The `preview-templates` folder is equivalent to a normal web template, which contains:

  ```js
  preview-templates
    // Required entry file
    |--index.html
    // Other files can be added as needed
  ```

Developers can customize `index` file as needed. You can use **.jade** or **.ejs** rather than **.html**.

Creator provides a custom web preview example of html type that you can create in the **Dashboard -> New Project** panel for reference.

![Custom Preview Template](./custom-preview-template/create.png)

If you are not familiar with the three file types, you can refer to the following basic documents:

| File types |   Link
| -------------- | ----------- |
| html | <https://developer.mozilla.org/zh-CN/docs/Web/HTML> |
| jade | <http://jade-lang.com/>                             |
| ejs  | <https://ejs.bootcss.com/>  
