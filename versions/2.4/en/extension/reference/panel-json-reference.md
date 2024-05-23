# 面板字段参考

### main (String)

面板入口文件，可以是 js 文件也可以是 html 文件。取决于面板类型（type）。如果面板类型为 `simple`
则读入的为 html 文件。否则读入 js 文件。

### type (String)

面板类型。可选类型有：

- dockable：该面板为标准的编辑器面板，可以自由的在编辑器内停靠。
- float：该面板为浮动面板，不能停靠在编辑器中。
- fixed-size：该面板和浮动面板功能相似，不同之处在于它的窗口大小是固定的。
- quick：该面板和浮动面功能相似，不同之处在于当它失去焦点后将会自动关闭。
- simple：简单面板拥有独立窗口，通过读取用户自定义的 html 文件展示界面。

### title (String)

面板标题，如果面板类型为 `dockable`，面板标题将会显示在 Tab 上。

### icon (String)

面板 Tab 上显示的图标

### resizable (Boolean)

设置面板在独立窗口状态下时是否可以改变大小

### width (Integer)

设置面板窗口的初始宽度

### height (Integer)

设置面板窗口的初始高度

### min-width (Integer)

设置面板窗口的最小宽度

### min-height (Integer)

设置面板窗口的最小高度

### max-width (Integer)

设置面板窗口的最大宽度

### max-height (Integer)

设置面板窗口的最大高度
