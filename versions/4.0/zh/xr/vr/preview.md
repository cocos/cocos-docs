# 预览

为了方便开发者在项目开发过程中实时调试，快速验证一些传统的功能逻辑来提高开发效率，Cocos CreatorXR 基于Cocos Creator的 Web Preview 功能开发了适用于 XR 项目的预览功能。

## 操作说明

在 xr-plugin 的资源库中找到 XR Simulator，将其拖拽至场景中。

<img src="./preview/xr-simulator.png" style="zoom:50%;" />

在编辑器的预览选项中选择浏览器预览，并点击运行。

<img src="./preview/run.png" style="zoom:50%;" />

运行后即可在浏览器中进行模拟预览。

![web preview](preview/web preview.png)

键盘 WASD 来控制角色整体（HMD + 手柄）进行前左后右移动，QE 控制整体上升和下降。
键盘 Latin部 分的数字键 123 功能分别为：1.鼠标键盘的控制对象切换至 XR Agent （角色自身）此时前后左右上下作用于整体角色，鼠标滑动控制 HMD（Camera）转动，射线发出位置位于 HMD 中央，空格键用于触发click（点击），按住空格拖动鼠标触发drag（点击）；2 和 3 将鼠标和键盘的控制对象切换至左/右手柄，此时前后左右上下作用于单独的左/右手柄，射线从手柄位置发出，空格键用于触发click（点击），按住空格拖动鼠标触发drag（拖动）。
长按 B 键重置手柄位置。
控制手柄移动时，正前方向向量始终和 XR Agent 的前向保持一致。
