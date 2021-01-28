# 使用 TypeScript 脚本

> 校对：大城小胖

TypeScript 是一种由微软开发的自由和开源的编程语言。它是 JavaScript 的一个严格超集，并添加了可选的静态类型和基于类的面向对象编程。TypeScript 的设计目标是开发大型应用，然后转译成 JavaScript 运行。由于 TypeScript 是 JavaScript 的超集，任何现有的 JavaScript 程序都是合法的 TypeScript 程序。

关于 TypeScript 的详细使用方法，请访问 [TypeScript 官方网站](https://www.typescriptlang.org/)。

## TypeScript 和 Cocos Creator

Cocos Creator 的很多用户之前是使用其他强类型语言（如 C++/C#）来编写游戏的，因此在使用 Cocos Creator 的时候也希望能够使用强类型语言来增强项目在较大规模团队中的表现。

和其他 JavaScript 脚本一样，项目 `assets` 目录下的 TypeScript 脚本（.ts 文件) 在创建或修改后激活编辑器，就会被编译成兼容浏览器标准的 ES5 JavaScript 脚本。编译后的脚本存放在项目下的 `library`（还包括其他资源）目录。

## 使用准备

### 在新项目中使用 TypeScript

新建项目时，从项目模板中选择 **HelloWorld TypeScript**，即可创建一个包括 TypeScript 相关设置和基本组件的 HelloWorld 项目。

![hello typescript](assets/hello-typescript.jpg)

在编辑 TypeScript 脚本时，我们推荐使用微软推出的 [VS Code](https://code.visualstudio.com/) 作为代码编辑器，VS Code 具有完善的 TypeScript 语言支持功能。

### 在已有项目中添加 TypeScript 设置

如果希望在原有项目中添加 TypeScript 脚本，并获得 VS Code 等 IDE 的完整支持，需要执行主菜单的 **开发者 -> VS Code 工作流 -> 更新 VS Code 智能提示数据** 和 **开发者 -> VS Code 工作流 -> 添加 TypeScript 项目配置**，来添加 `creator.d.ts` 和 `tsconfig.json` 文件到你的项目根目录中。`creator.d.ts` 声明了引擎的所有 API，用于支持 VS Code 的智能提示。

![](assets/setting-vscode.png)

`tsconfig.json` 用于设置 TypeScript 项目环境，你可以参考官方的 [tsconfig.json 说明](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) 进行定制。

以下是常用的 `tsconfig.json` 配置方案：

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "lib": [ "es2015", "es2017", "dom" ],
    "target": "es5",
    "experimentalDecorators": true,
    "skipLibCheck": true,
    "outDir": "temp/vscode-dist"
  },
  "exclude": [
    "node_modules",
    "library",
    "local",
    "temp",
    "build",
    "settings"
  ]
}
```

### 在项目中创建 TypeScript 脚本

和创建 JavaScript 脚本一样，你可以直接在文本编辑器里新建 `.ts` 文件，或通过编辑器的 **资源管理器** 的创建菜单，右键点击一个文件夹，并选择 **新建 -> TypeScript**。

## 使用 TypeScript 声明 CCClass

在 [TypeScript 中 class 的声明方式](https://www.typescriptlang.org/docs/handbook/classes.html) 和 [ES6 Class](http://es6.ruanyifeng.com/#docs/class) 相似。但为了编辑器能够正确解析 **属性检查器** 里显示的各类属性，我们还需要使用引擎内置的一些装饰器，来将普通的 class 声明成 CCClass。这和目前将 JavaScript 中的 ES6 Class 声明为 CCClass 的方法类似。关于装饰器的更多信息请参考 [TypeScript decorator](http://www.typescriptlang.org/docs/handbook/decorators.html)。

下面是一个基本的 TypeScript 声明组件的实例：

```typescript
const {ccclass, property} = cc._decorator; // 从 cc._decorator 命名空间中引入 ccclass 和 property 两个装饰器

@ccclass // 使用装饰器声明 CCClass
export default class NewClass extends cc.Component { // ES6 Class 声明语法，继承 cc.Component

    @property(cc.Label)     // 使用 property 装饰器声明属性，括号里是属性类型，装饰器里的类型声明主要用于编辑器展示
    label: cc.Label = null; // 这里是 TypeScript 用来声明变量类型的写法，冒号后面是属性类型，等号后面是默认值

    // 也可以使用完整属性定义格式
    @property({
        visible: false
    })
    text: string = 'hello';

    // 成员方法
    onLoad() {
        // init logic
    }
}
```

装饰器使用 `@` 字符开头作为标记，装饰器主要用于编辑器对组件和属性的识别，而 TypeScript 语法中的类型声明 `myVar: Type` 则允许 VS Code 编码时自动识别变量类型并提示其成员。

### 更多属性类型声明方法

- 声明值类型

    ```typescript
    @property({
        type: cc.Integer
    })
    myInteger = 1;

    @property
    myNumber = 0;

    @property
    myText = "";

    @property(cc.Node)
    myNode: cc.Node = null;

    @property
    myOffset = new cc.Vec2(100, 100);
    ```

- 声明数组

    ```typescript
    @property([cc.Node])
    public myNodes: cc.Node[] = [];

    @property([cc.Color])
    public myColors: cc.Color[] = [];
    ```

- 声明 getset

    ```typescript
    @property
    _width = 100;

    @property
    get width () {
        return this._width;
    }

    set width (value) {
        cc.log('width changed');
        this._width = value;
    }
    ```

**注意**：TypeScript 的 public, private 修饰符不影响成员在 **属性检查器** 中的默认可见性，默认的可见性仍然取决于成员变量名是否以下划线开头。

## 完善的智能提示功能

按照 **使用准备** 里描述的方式创建项目或添加配置后，在 VS Code 里打开项目，就可以享受完善的代码智能提示功能了。

### 组件本身的属性成员

只要输入 `this.` 就会自动提示组件本身的其他成员，输入 `this.member.` 可以继续提示该成员的属性或方法

![intellisense](assets/intellisense.jpg)

### 提示其他组件属性和方法

首先我们声明一个组件：

```typescript
// MyModule.ts
const {ccclass, property} = cc._decorator;

@ccclass
export class MyModule extends cc.Component {
    @property(cc.String)
    myName: string = "";

    @property(cc.Node)
    myNode: cc.Node = null;
}
```

然后在其他组件中 import MyModule, 并且声明一个 `MyModule` 类型的成员变量：

```typescript
// MyUser.ts
const {ccclass, property} = cc._decorator;
import {MyModule} from './MyModule';

@ccclass
export class MyUser extends cc.Component {
    @property(MyModule)
    public myModule: MyModule = null;

    /*
     * // 声明自定义类型数组
     * @property(MyModule)
     * public myModule: MyModule[] = [];
     *
     * @property({
     *     type: MyModule
     * })
     * public myModule: MyModule[] = [];
     */

    public onLoad() {
        // init logic
        this.myModule.myName = 'John';
    }
}
```

输入 `this.myModule.` 时，就可以提示我们在 `MyModule.ts` 中声明的属性了。

![auto complete](assets/auto-complete.gif)

**注意：如果将已声明属性修改为数组类型，但是在编辑器中却未生效。那么请通过组件菜单对组件进行重置。**

![Reset component](assets/reset-component.png)

## 1.10 版本之后的特殊类型

在 v1.10 包括之后的版本，Creator 对资源类型进行了部分调整。`cc.Texture2D`、`cc.AudioClip`、`cc.ParticleAsset` 类型数据在 ts 中的声明一定要按照以下的格式进行声明：

```typescript
@property({
    type: cc.Texture2D,
})
texture: cc.Texture2D = null;

@property({
    type: cc.Texture2D,
})
textures: cc.Texture2D[] = [];
```

## 使用命名空间

在 TypeScript 里，命名空间是位于全局命名空间下的一个普通的带有名字的 JavaScript 对象。通常用于在使用全局变量时为变量加入命名空间限制，避免污染全局空间。命名空间和模块化是完全不同的概念，命名空间无法导出或引用，仅用来提供通过命名空间访问的全局变量和方法。关于命名空间和模块化更详细的解释请参阅官方文档 [命名空间和模块](https://zhongsp.gitbooks.io/typescript-handbook/content/doc/handbook/Namespaces%20and%20Modules.html)。

Creator 中默认所有 assets 目录下的脚本都会进行编译，自动为每个脚本生成模块化封装，以便脚本之间可以通过 `import` 或 `require` 相互引用。当希望把一个脚本中的变量和方法放置在全局命名空间，而不是放在某个模块中时，我们需要选中这个脚本资源，并在 **属性检查器** 里设置该脚本 `导入为插件`。设为插件的脚本将不会进行模块化封装，也不会进行自动编译。

**注意**：在微信、百度、小米、支付宝小游戏环境中，全局变量需要显式地给 window 设置属性才能成功声明，如 `window.data = {};`。

所以对于包含命名空间的 TypeScript 脚本来说，我们既不能将这些脚本编译并进行模块化封装，也不能将其设为插件脚本（会导致 TS 文件不被编译成 JS）。如果需要使用命名空间，我们需要使用特定的工作流程。

### 命名空间工作流程

下面我们通过一个范例介绍命名空间的工作流程。

1. 如果是首次使用，需要安装 TypeScript 编译器。在命令行中执行以下命令：

    ```bash
    npm install -g typescript
    ```

2. 用 VS Code 打开项目根目录中的 **tsconfig.json** 文件，然后在 `compilerOptions` 字段中设置 `outDir`：

    ```json
    {
      "compilerOptions": {

        "outDir": "temp/vscode-dist"

        ......
      },

      ......
    }
    ```

3. 在项目的根目录下（assets 目录外），新建一个文件夹并命名为 **namespaces**，用于存放所有包含命名空间的 ts 脚本。然后在该文件夹下新建一个脚本 **foo.ts**，代码如下：

    ```ts
    namespace Foo {
        export let bar: number = 1;
    }
    ```

4. 在 VS Code 中按下 **Ctrl/Cmd + Shift + P**，在弹出的 Command Palette 中输入 `task`，并选择 `Tasks: Configure Task`。然后继续在弹出的选项中选择 `tsc: build - tsconfig.json`。

5. 按下 **Ctrl/Cmd + Shift + B**，在 Command Palette 中选择 `tsc: build - tsconfig.json` 启动 ts 编译任务。可以看到在 **temp** 目录下生成了 **vscode-dist** 文件夹。进入该文件夹，找到编译后的脚本 **foo.js**，此时脚本内的内容应该是：

    ```js
    var Foo;
    (function (Foo) {
        Foo.bar = 1;
    })(Foo || (Foo = {}));
    ```

6. 将 **foo.js** 脚本拷贝到 **assets** 目录下的任意有效位置。

7. 回到 Creator 编辑器，在 **资源管理器** 中选中 **foo.js**，然后在 **属性检查器** 中勾选 **导入为插件**，完成后点击右上角的 **应用**。此时 **foo.js** 中定义的命名空间就可以正常的工作了。

以上就是在 Creator 中使用 TypeScript 命名空间的完整工作流程。

## 更新引擎接口声明数据

Creator 每个新版本都会更新引擎接口声明，建议升级了 Creator 后，通过主菜单的 **开发者 -> VS Code 工作流 -> 更新 VS Code 智能提示数据** 来更新已有项目的 `creator.d.ts` 文件。

---

Cocos Creator 中对 TypeScript 的支持参考了很多 [Creator TypeScript Boilerplate](https://github.com/toddlxt/Creator-TypeScript-Boilerplate) 项目的设置和做法，在此特别感谢。另外这个项目中也包含了很多关于使用 TypeScript 项目的工作流程和高级功能，可供参考。
