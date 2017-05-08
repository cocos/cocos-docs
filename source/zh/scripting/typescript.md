# 使用 TypeScript 脚本

TypeScript 是一种由微软开发的自由和开源的编程语言。它是JavaScript的一个严格超集，并添加了可选的静态类型和基于类的面向对象编程。 TypeScript设计目标是开发大型应用，然后转译成JavaScript。由于TypeScript是JavaScript的严格超集，任何现有的JavaScript程序都是合法的TypeScript程序。

关于 TypeScript 的详细使用方法，请访问 [TypeScript官方网站](https://www.typescriptlang.org/)。

## TypeScript 和 Cocos Creator

Cocos Creator 的用户中，很多之前是使用其他强类型语言（如 C++/C#）来编写游戏的，因此在使用 Cocos Creator 开发游戏的时候也希望能够使用强类型语言来增强项目在较大规模团队中的表现。

从 v1.5 版本开始 Cocos Creator 支持在游戏项目中使用 TypeScript 作为脚本代码，用户的源码可以完全使用 TypeScript，或者 TypeScript 和 JavaScript 混合使用。

和其他 JavaScript 脚本一样，项目 `assets` 目录下的 TypeScript 脚本（.ts 文件) 在创建或修改后激活编辑器，就会被编译成兼容浏览器标准的 ES5 JavaScript 脚本。编译后的脚本存放在项目目录下的 `library`（还包括其他资源） 和 `temp` 目录。

## 使用准备

### 在新项目中使用 TypeScript

新建项目时，从项目模板中选择 **HelloWorld TypeScript**，即可创建一个包括 TypeScript 相关设置和基本组件的 HelloWorld 项目。

![hello typescript](assets/hello-typescript.jpg)

在编辑 TypeScript 脚本时，我们推荐使用微软推出的 [VS Code](https://code.visualstudio.com/) 作为代码编辑器，VS Code 具有完善的 TypeScript 语言支持功能。

### 在已有项目中添加 TypeScript 设置

如果希望在原有项目中添加 TypeScript 脚本，并在 VS Code 中正确识别声明组件时使用的装饰器语法，需要执行主菜单中的 `开发者 -> VS Code 工作流 -> 添加 TypeScript 项目配置`，来添加一份 `tsconfig.json` 文件到你的项目根目录中。您可以参考官方的 [tsconfig.json 说明](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)，来进一步定制你的 TypeScript 项目配置。

### 更新引擎接口声明数据

新版本引擎中针对 TypeScript 优化了引擎接口声明数据，如果要在已有项目中使用 TypeScript 并希望能够正确提示引擎接口，需要更新项目中的 `creator.d.ts` 文件到最新。通过主菜单的 `开发者 -> VS Code 工作流 -> 更新 VS Code 智能提示数据` 来完成更新。

### 在项目中创建 TypeScript 脚本

和创建 JavaScript 脚本一样，你可以直接在文本编辑器里新建 `.ts` 文件，或通过编辑器的 **资源管理器** 的创建菜单，右键点击一个文件夹，并选择 `新建 -> TypeScript`。

## 使用 TypeScript 声明 cc.Class

目前 cc.Class 的声明已经支持使用 ES6 class 的格式，而在 TypeScript 脚本中的声明方式也和 ES6 class 类似。为了编辑器能够正确解析属性检查器里显示的各类属性，我们需要使用引擎内置的装饰器来标注 cc.Class 和 property 的定义。关于装饰器的更多信息请参考 [TypeScript decorator](http://www.typescriptlang.org/docs/handbook/decorators.html)。

下面是一个基本的 TypeScript 声明组件的实例：

```typescript
const {ccclass, property} = cc._decorator; //从 cc._decorator 命名空间中引入 ccclass 和 property 两个装饰器

@ccclass //使用装饰器声明 cc.Class
export default class NewClass extends cc.Component { //ES6 class 声明语法，继承 cc.Component

    @property(cc.Label) //使用 property 装饰器声明属性，括号里是属性类型，装饰器里的类型声明主要用于编辑器展示时
    label: cc.Label; //这里是 TypeScript 用来声明变量类型的写法，冒号后面是属性类型

    @property({
        default: 'hello'
    }) //也可以使用完整属性定义格式
    text: string = 'hello';

    onLoad() { //成员方法
        // init logic
    }
}
```

装饰器使用 `@` 字符开头作为标记，装饰器主要用于编辑器对组件和属性的识别，而 TypeScript 语法中的类型声明 `myVar: Type` 则允许使用 VS Code 编码时自动识别变量类型并提示其成员。

## 完善的智能提示功能

按照 **使用准备** 里描述的方式创建项目或添加配置后，在 VS Code 里打开项目，就可以享受完善的代码智能提示功能了。

### 组件本身的属性成员

只要输入 `this.` 就会自动提示组件本身的其他成员，输入 `this.member.` 可以继续提示该成员的属性或方法

![intellisense](assets/intellisense.jpg)

### 提示其他组件属性和方法

首先我们声明一个组件：

```typescript
//MyModule.ts
const {ccclass, property} = cc._decorator;

@ccclass
export class MyModule extends cc.Component {
    @property(cc.String)
    myName : string;

    @property(cc.Node)
    myNode: cc.Node;
}
```

然后在其他组件中声明一个 `MyModule` 类型的成员：

```typescript
//MyUser.ts
const {ccclass, property} = cc._decorator;
import {MyModule} from './MyModule';

@ccclass
export class MyUser extends cc.Component {
    @property(MyModule)
    public myModule: MyModule;

    public onLoad() {
        // init logic
        this.myModule.myName = 'John';
    }
}
```

输入 `this.myModule.` 时，就可以提示我们在 `MyModule.ts` 中声明的属性了。

![auto complete](assets/auto-complete.gif)

---

Cocos Creator 中对 TypeScript 的支持参考了很多 [Creator TypeScript Boilerplate](https://github.com/toddlxt/Creator-TypeScript-Boilerplate) 项目的设置和做法，在此特别感谢。另外这个项目中也包含了很多关于使用 TypeScript 项目的工作流程和高级功能，可以参考。

