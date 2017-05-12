# Use TypeScript

TypeScript is a free and open source programming language developed by Microsoft. It is a strictly superset of JavaScript and adds optional static types and class-based object-oriented programming. TypeScript design goal is to develop large-scale applications, and then translated into JavaScript. Since TypeScript is a strictly superset of JavaScript, any existing JavaScript program is a valid TypeScript program.

For more information on how to use TypeScript, please visit [TypeScript official website](https://www.typescriptlang.org/).

## TypeScript and Cocos Creator

Many of Cocos Creator users used to use other strong type programming language (such as C++ / C#) to write game, so they hope to use strong type language to enhance the project in the larger scale team when developing games with Cocos Creator.

From v1.5 version on, Cocos Creator supports using TypeScript in the game project as a script language. Users' source code can be all TypeScript, or TypeScript and JavaScript mixed.

As with other JavaScript scripts, the TypeScript file (`.ts`) in the project `assets` directory will be compiled into an ES5 JavaScript script that is compatible with the browser standard once created or modified. The compiled script is stored in the `library` and `temp` directories in the project folder.

## Setup

### Use TypeScript in a new project

When you create a new project, select **HelloWorld TypeScript** from the project templates to create a HelloWorld project that includes TypeScript related settings and basic components.

![Hello typescript](assets/hello-typescript.jpg)

When editing the TypeScript script, we recommend using Microsoft's [VS Code](https://code.visualstudio.com/) as the code editor, and VS Code has perfect TypeScript language support.

### Add a TypeScript setting to an existing project

If you want to add a TypeScript script to the original project and correctly recognize the decorator syntax used to declare the component in the VS Code, you need to execute the `Developer -> VS Code Workflow -> Add TypeScript Config` in the main menu. This will add a `tsconfig.json` file to your project root directory. You can further customize your TypeScript project configuration by referring to the official [tsconfig.json instructions](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html).

### Update engine interface declaration data

The new version of the engine for the TypeScript optimized engine interface statement data, if you want to use the existing project TypeScript and want to be able to correctly prompt the engine interface, you need to update the project `creator.d.ts` file to the latest. Go through the main menu 'Developer -> VS Code Workflow -> Update VS Code API Source` to complete the update.

### Create a TypeScript script in the project

As with creating a JavaScript script, you can create a new `.ts` file directly in the text editor, or create via Assets panel's context menu, right-click on a folder and select `New -> TypeScript`.

## Declare cc.Class with TypeScript

The current `cc.Class` statement already supports the use of ES6 class format, and in the TypeScript script the statement of cc.Class is similar to ES6 class. In order for the editor to correctly parse the various properties displayed in the **Properties** panel, we need to use the engine built-in decorator to mark the definition of cc.Class and property. For more information on decorators, please refer to [TypeScript decorator](http://www.typescriptlang.org/docs/handbook/decorators.html).

The following is an example of a basic TypeScript component declaration:

```typescript
const {ccclass, property} = cc._decorator; // Introduce ccclass and property from the cc._decorator namespace

@ccclass // use decorator to declare cc.Class
export default class NewClass extends cc.Component {// ES6 class declaration syntax, inherited cc.Component

    @property (cc.Label) // use property decorator to declare attributes, parentheses are attribute types, decorator type declaration is mainly used for editor display
    label: cc.Label; // here is the type used to declare the type of statement, the colon is followed by the type of property

    @property ({
        default: 'hello'
    }) // You can also use the full attribute to define the format
    text: string = 'hello';

    onLoad () {// member method
        // init logic
    }
}
```

The decorator uses the `@` character as the marker, the decorator is mainly used for the editor to identify the components and attributes, and the type statement in the TypeScript syntax `myVar: Type` allows automatic identification of the variable type when using VS Code scripting and code intellisense.

### More property declaration example

Declare value types:

```typescript
@property({
    default: 0,
    type: cc.Integer
})
myInteger = 0;

@property({
    default: 0.1,
    type: cc.Float
})
myFloat = 0.1; 

@property(cc.String)
public myString: String = '';
```

Declare arrays

```typescript
@property([cc.Node])
public myNodes: Array<cc.Node> = [];

@property([cc.Color])
public myColors: Array<cc.Color> = [];
```

## Intellisense

In accordance with the setup described in previous section, open the project in the VS Code and you can enjoy the code intellisense and auto complete in all your TypeScript coding.

### Component Member in the same file

Just enter `this.` will automatically prompt the other members of the component itself. Enter `this.member.` will prompt the member's properties or methods.

![intellisense](assets/intellisense.jpg)

### Other component properties and methods

First we declare a component:

```typescript
//MyModule.ts
const {ccclass, property} = cc._decorator;

@ccclass
export class MyModule extends cc.Component {
    @property (cc.String)
    myName: string;

    @property (cc.Node)
    myNode: cc.Node;
}
```

And then declare a member of the `MyModule` type in the user component:

```typescript
//MyUser.ts
const {ccclass, property} = cc._decorator;
import {MyModule} from './MyModule';

@ccclass
export class MyUser extends cc.Component {
    @property (MyModule)
    public myModule: MyModule;

    public onLoad () {
        // init logic
        this.myModule.myName = 'John';
    }
}
```

When you enter `this.myModule.`, you will be prompt the properties declared in `MyModule.ts`.

![Auto complete](assets/auto-complete.gif)

---

Support for TypeScript in Cocos Creator has taken a lot of reference from [Creator TypeScript Boilerplate](https://github.com/toddlxt/Creator-TypeScript-Boilerplate) project settings and practices. Great appreciation to the author. In addition, this project also contains a lot of work on the use of TypeScript project and advanced features that TypeScript developers can refer to.