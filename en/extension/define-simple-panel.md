# Defining a Simple Panel

To create a simple panel, that doesn't need to dock to workspace, set the `type` to `simple`.

## Define

In the `panel` field in `package.json`:

```json
{
  "name": "simple-package",
  "panel": {
    "main": "panel/index.html",
    "type": "simple",
    "title": "Simple Panel",
    "width": 400,
    "height": 300
  }
}
```

By defining the `panel` field, and set the `type` to `simple`, the panel will be opened as a simple panel. The simple panel will accept a html page as its entry point in `main`.

The rest is just a web page:

```html
<html>
  <head>
    <title>Simple Panel Window</title>
    <meta charset="utf-8">
    <style>
      body {
        margin: 10px;
      }

      h1 {
        color: #f90
      }
    </style>
  </head>

  <body>
    <h1>A simple panel window</h1>
    <button id="btn">Send Message</button>

    <script>
      let btn = document.getElementById('btn');
      btn.addEventListener('click', () => {
        Editor.log('on button clicked!');
      });
    </script>
  </body>
</html>
```

Once done, open the panel use `Editor.Panel.open('simple-package')`.

The simple panel is similar to a web page, it is used to integrate some web app to Cocos Creator.
