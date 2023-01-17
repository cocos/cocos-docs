# Web Preview Customization Workflow

## Custom Preview Templates

Preview supports custom templates for users to customize the preview effect they need, and the custom preview template can be placed in the `preview-template` folder in the project directory. Or click **Project -> Create Preview Template** in the editor main menu to create an updated preview template in the project directory. The preview in the editor also uses the template to inject the latest project data, the preview will look for the index file in the directory and if it exists it will be used as the template for the preview.

The `preview-template` folder has a structure similar to

```js
project-folder
 |--assets
 |--build
 |--preview-template
     // Required entry file
     |--index.ejs
     // Other files can be added according to the preview effect you want to achieve
```

To start customizing the page preview, it should be noted that there are some preview menu items and preview debugging tools in the preview template. Be careful when adding or deleting some template syntax. Random changes may cause the preview template to be unavailable. It is recommended to keep all the content injected with ejs and then add the required content on top of it. Also, if `index.html` and `index.ejs` are coexisting, **`index.html` will replace `index.ejs`** as the preview page content.

## Usage examples

1. Click **Project -> Create Preview Template** in the editor main menu, the **Console** will output the message "Preview Template generated successfully" and show the path of the generated preview template.

2. Add scripts like `test.js`, where `<%- include(cocosTemplate, {}) %>` contains the default start game logic, and the added scripts can be stored before/after the game logic is started as needed. The following `test.js` is loaded after the game is launched.

    - Open `index.ejs` and modify it as follows:

      ```html
      <html>
          ...
          <body>
              ...
              <%- include(cocosTemplate, {}) %> // Game launch processing logic
              <script src="/test.js"></script> // Add a new script
          </body>
      </html>
      ```

    - `test.js` is placed in the relative path of the logo within the page (only in the `preview-template` folder)

      ```
      |--preview-template
              |--index.ejs
              |--test.js
      ```

For more details, please refer to the example [Preview Template](https://github.com/cocos/cocos-test-projects/tree/v3.7/preview-template).
