# XR UI
传统的生成UI控件的方式都是把UI画在画布(Canvas)上，而画布本身不具有深度信息(位置属性不可更改)，导致了画布是贴在屏幕上的，只有与屏幕进行交互才能反馈作用于UI控件。由于XR设备的摄像头是两个目镜，不支持交互，这明显不满足于XR项目的需求。所以我们需要将UI的交互方式改为在空间中用交互器进行交互，因此需要将UI控件剥离出画布而能够单独存在于空间中，具有完整的位置属性并具有碰撞检测功能。
## XR UI的创建及使用说明
在层级列表中右键呼出菜单：创建→XR→XRUI。

<img src="/Users/parryzhai/XR/cocos-docs/zh/xr/vr/xrui/:Users:parryzhai:Desktop:截屏2022-08-16 18.34.47.png" alt="截屏2022-08-16 18.34.47" style="zoom:50%;" />

相比于传统的UI控件，XR UI会新增一些组件用于计算碰撞检测以触发交互。

<img src="/Users/parryzhai/XR/cocos-docs/zh/xr/vr/xrui/:Users:parryzhai:Library:Application Support:typora-user-images:image-20220816190417205.png" alt="image-20220816190417205" style="zoom:60%;" />

#### 对于存量项目中的UI进行转换

右键创建一个空节点（如命名为UIRoot，下面均使用UIRoot），为节点添加组件RenderRoot2D组件，同时节点会自动添加UITransform组件。

![image-20220817113711623](/Users/parryzhai/XR/cocos-docs/zh/xr/vr/xrui/:Users:parryzhai:Library:Application Support:typora-user-images:image-20220817113711623.png)

将原有的2D UI控件分离出Canvas，移动至UIRoot层级下。修改Button位置和Layer属性。同时将Button及其子节点的Layer属性，都修改为和camera的layer属性一致（此处均为DEFAULT）。

<img src="/Users/parryzhai/XR/cocos-docs/zh/xr/vr/xrui/:Users:parryzhai:Library:Application Support:typora-user-images:image-20220817114021517.png" alt="image-20220817114021517" style="zoom:50%;" />

![image-20220817114323598](/Users/parryzhai/XR/cocos-docs/zh/xr/vr/xrui/:Users:parryzhai:Library:Application Support:typora-user-images:image-20220817114323598.png)

给Button及其子节点添加材质。在资源管理器中点击xr-plugin→xr→res→default_materials，选择xr-3dui-sprite-material拖拽至cc.Sprite的CustomMaterial中。

![image-20220817115035095](/Users/parryzhai/XR/cocos-docs/zh/xr/vr/xrui/:Users:parryzhai:Library:Application Support:typora-user-images:image-20220817115035095.png)

给Button添加射线交互组件RaycastChecker。点击Button节点，在属性检查器下方，点击添加组件，选择XR→UI→RaycastChecker，会在属性检查器中出现RaycastChecker组件和BoxCollider组件，且BoxCollider组件的size的xy值与节点的UITransfrom的wh值一致，如下图：（此处可以将BoxCollider替换为其他所需碰撞盒，能够贴合UI组件即可）。

![image-20220817115511163](/Users/parryzhai/XR/cocos-docs/zh/xr/vr/xrui/:Users:parryzhai:Library:Application Support:typora-user-images:image-20220817115511163.png)

移动Button节点至场景中指定位置，并按需求调整Rotation和Scale的值。

![image-20220817115555335](/Users/parryzhai/XR/cocos-docs/zh/xr/vr/xrui/:Users:parryzhai:Library:Application Support:typora-user-images:image-20220817115555335.png)

按照上述流程，添加完所有UI组件后，删除Canvas节点。

<img src="/Users/parryzhai/XR/cocos-docs/zh/xr/vr/xrui/:Users:parryzhai:Library:Application Support:typora-user-images:image-20220817115621248.png" alt="image-20220817115621248" style="zoom:50%;" />

#### XR Keyborad（虚拟键盘）

添加一个editbox的XR UI，同时给editbox添加一个子节点，命名为KeyboardRoot（命名随意），同时调整KeyboardRoot的位置信息(根据需求进行调整即可，可将XR Keyboard临时放在节点下进行调整)。

![image-20220817133711541](/Users/parryzhai/XR/cocos-docs/zh/xr/vr/xrui/:Users:parryzhai:Library:Application Support:typora-user-images:image-20220817133711541.png)

创建XR Keyboard对象：在资源管理器中点击xr-plugin→xr→res→default_prefab，选择XR Keyboard拖拽至场景中。

<img src="/Users/parryzhai/XR/cocos-docs/zh/xr/vr/xrui/XR Keyboard.png" alt="image-20220817134614423" style="zoom:50%;" />

为editbox节点添加组件cc. XRKeyboardInputField，同时绑定SuspendTransform和XRKeyboard，将节点拖拽进去。

<img src="/Users/parryzhai/XR/cocos-docs/zh/xr/vr/xrui/:Users:parryzhai:Library:Application Support:typora-user-images:image-20220817133751907.png" alt="image-20220817133751907" style="zoom:50%;" />

#### 射线材质

使用射线与XR UI进行交互时，需要给射线绑定材质xr-default-line-material。位置在资源管理器→xr-plugin→xr→res→default_materials

<img src="/Users/parryzhai/XR/cocos-docs/zh/xr/vr/xrui/:Users:parryzhai:Library:Application Support:typora-user-images:image-20220817134210293.png" alt="image-20220817134210293" style="zoom:50%;" />