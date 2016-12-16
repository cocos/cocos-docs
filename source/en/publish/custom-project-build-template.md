# Custom Project Build Template

Creator support custom build template to project.    
You just need to add a folder `build-templates` in the project path, the sub-folder in `build-templates` should named with platform.   
Then all the files in the folder will be copied to build path according to the folder structure.

Folder Structure: 

```
project-folder
 |--assets
 |--build
 |--build-templates
      |--web-mobile
            |--index.html
      |--jsb-binary
            |--main.js
      |--jsb-default
            |--main.js
```

Example:

If current platform is `web-mobile`, then `build-templates/web-mobile/index.html` will be copied to `build/web-mobile/index.html`.