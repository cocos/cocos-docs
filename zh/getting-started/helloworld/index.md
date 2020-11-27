# Hello World 项目

第一个 Cocos Creator 项目，为您展示:
- 创建项目
- 了解工程目录
- 创建一个物体
- 修改相机属性
- 创建、修改、绑定脚本
- 运行及调试项目

## 新建项目

在 Dashboard 面板中，点击右下角<font color=#A52A2A>新建</font>按钮，在弹出菜单中选中 Creator。
<img src="index/dashboard.png"/>

选择空的模板，设置项目路径，点击下方的<font color=#A52A2A>创建</font>按钮。

<img src="index/new.png"/>

## 编辑器界面

<img src="index/engine.png"/>

## 工程目录

通常情况的我们只需要关心<font color=#A52A2A>assets</font>(资源目录)

- assets(资源目录)

- build(构建目录)

- library(导入的资源目录)

- local(日志文件目录)

- profiles(编辑器配置)

- temp(临时文件目录)

- package.json(项目配置)

## 新建场景

左下方资源管理器面板<font color=#A52A2A>点击鼠标右键</font>，选择<font color=#A52A2A>新建</font>-><font color=#A52A2A>Scene</font>。

<img src="index/scene.png"/>

## 创建物体

左上方层级管理器面板<font color=#A52A2A>点击鼠标右键</font>, 选择<font color=#A52A2A>创建</font>-><font color=#A52A2A>3D对象</font>-><font color=#A52A2A>Cube 正方体</font>。创建的正方体就会出现在场景编辑器里。

<img src="index/cube.png"/>

## 修改Camera

- 选择 Camera 对象
<br/>在层级管理器面板，选择Camera，场景编辑器会选中它，并显示Gizmo。</br>
<img src="index/select.png"/>

- 修改 Camera 位置
<br/>在场景编辑器里，拖动Gizmo, 使Camera能够看到创建的正方体。</br>
<img src="index/move.png"/>

- 修改 Camera 背景颜色
<br/>在属性检查器面板，点击 Color 属性，选择黑色为背景色。</br>
<img src="index/property.png"/>

## 添加脚本

- 新建脚本
  <br/>在资源管理器面板<font color=#A52A2A>点击鼠标右键</font>，选择<font color=#A52A2A>新建</font>-><font color=#A52A2A>TypeScript</font>。</br>
  <img src="index/script.png"/>

- 生命周期函数（按以下顺序调用）
   - onLoad
     <br/>脚本初始化时调用</br>
   - onEnable
     <br/>组件的 enabled 属性从 false 变为 true 时调用</br>
   - start
     <br/>组件第一次激活时调用</br>
   - update
     <br/>每一帧渲染前更新物体调用</br>
   - lateUpdate
     <br/>在所有组件的 update 都执行完之后调用</br>
   - onDisable
     <br/>组件的 enabled 属性从 true 变为 false 时调用</br>
   - onDestroy
     <br/>组件或者所在节点销毁时调用</br>

<br/>
- 添加代码
    <br/>添加 start() 函数，并输出 Hello world</br>

```ts
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('HelloWorld')
export class HelloWorld extends Component {
    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    // @property
    // serializableDummy = 0;

    start () {
        // Your initialization goes here.
        console.info('Hello world');
    }

    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }
}
```


- 为物体绑定脚本
<br>选择创建的正方体，在属性检查器面板点击<font color=#A52A2A>添加组件</font>-><font color=#A52A2A>自定义脚本</font>-><font color=#A52A2A>HelloWorld</font></br>
<img src="index/component.png"/>

## 运行项目
<br>编辑器<font color=#A52A2A>菜单栏</font>点击-><font color=#A52A2A>项目</font>-><font color=#A52A2A>运行预览</font>, 或者点击中间的<font color=#A52A2A>运行</font>按钮。</br>
<img src="index/run.png"/>

## 调试项目
以Chrome浏览器为例：
 按 `F12` 或者 `Ctrl + Shift + I` 打开Chrome的**开发者工具**。
 - 日志信息
 <br/>Console面板显示了所有日志输出</br>
 <img src="index/console.png"/>

 - 断点调试
   <br/>选择<font color=#A52A2A>标签栏</font>的<font color=#A52A2A>Source</font>选项，按下<font color=#A52A2A>Ctrl+P</font>，搜索HelloWorld.ts，在start函数里设置断点，再刷新网页就可以调试了。</br>
   <img src="index/debug.png"/>
