# 基于反射机制实现 JavaScript 与 HarmonyOS Next 系统原生通信

使用 Cocos Creator 2.4.14及以上 打包的鸿蒙原生应用中，我们可以通过反射机制直接在 JavaScript 中调用 ArkTs 的静态方法。它的使用方法很简单：

```js
// isSync 调用的ArkTs的方法是同步方法或异步方法，如果调用异步的ArkTs方法可能会阻塞当前线程并等待异步回调的结果。
// clsPath 脚本路径, 例如：entry/src/main/Tests/Test
// methodName 模块名称/静态方法名称 例如：entry/test(模块名称可省略，省略为clsPath第一个字符串)
// paramStr 方法入参, 如果是空的，需要传入'', 如果有多个参数，可以转换成JSON字符串
// result返回值类型只支持基础的三种类型：string，number，boolean，如果需要返回复杂的类型，可以转换为json之后返回
var result = jsb.reflection.callStaticMethod(isSync, clsPath, methodName, paramStr);
```

在 callStaticMethod 方法中，我们通过传入 arkTs 是否同步，模块路径或者依赖包名或者远程库名，方法名，参数就可以直接调用 arkTs 的静态方法，并且可以获得 arkTs 方法的返回值。

> callStaticMethod这个函数本身是同步的，但是可以调用异步的ArkTs的异步方法，但是会阻塞当前的线程，等待ArkTs调用完成，然后获取结果返回、

使用场景
| 场景 | 详细分类 | 说明 |
| --- | --- | --- |
| 本地工程模块 | HAP加载模块内文件路径 | 要求路径以moduleName开头 |
| 本地工程模块 | HAP加载HAR模块名 | - |
| 远程包 | HAP加载远程HAR模块名 | - |
| 远程包 | HAP加载ohpm包名 | - |
| API | HAP加载@ohos.或 @system. | - |
| 模块Native库 | HAP加载libNativeLibrary.so | - |

>本文示范了本地工程模块的两种场景，其他场景可参阅详细说明使用


## 使用示例
### HAP加载模块内文件路径
1. 当加载文件中的模块时，如以下ArkTS代码：
``` ts
function test(param: string): string {
  console.log("param::", param);
  return param;
}

function syncTest(param: string, cb: Function): void {
  console.log("param::", param);
  setTimeout(() => {
    cb(param);
  }, 1000)
}

export { test, syncTest };
```
2. 需要在模块的build-profile.json5文件中进行以下配置
```
"buildOption": {
  "arkOptions": {
    "runtimeOnly": {
      "sources": [
        "./src/main/ets/test.ts"
      ]
    }
  }
}
```
3. 游戏中调用
``` js
let param = {
    a:1,
    b:2
}
let o1 = jsb.reflection.callStaticMethod(true, "entry/src/main/ets/test","entry/test",JSON.stringify(param));
console.log("result::", o1, typeof o1, JSON.parse(o1).a);

let o2 = jsb.reflection.callStaticMethod(false, "entry/src/main/ets/test","entry/syncTest",JSON.stringify(param));
console.log("result::", o2, typeof o2, JSON.parse(o2).a);
```
### HAP加载HAR模块名
1. HAR包Index.ets文件如下
``` ts
function test(param: string): string {
  console.log("param::", param);
  return param;
}

function syncTest(param: string, cb: Function): void {
  console.log("param::", param);
  setTimeout(() => {
    cb(param);
  }, 1000)
}

export { test, syncTest };
```
2. 在加载本地HAR包时，首先需要在oh-package.json5文件中配置dependencies项
```
{
    "dependencies": {
        "library": "file:../library"
    }
}
```
3. 其次，还需要在build-profile.json5中进行配置
```
"buildOption": {
  "arkOptions": {
    "runtimeOnly": {
      "packages": [
        "library"
      ]
    }
  }
}
```
4. 游戏中调用
``` ts
let param = {
    a:1,
    b:2
}
let o1 = jsb.reflection.callStaticMethod("library","entry/test",JSON.stringify(param));
console.log("result::", o1, typeof o1, JSON.parse(o1).a);

let o2 = jsb.reflection.callStaticMethod("library","entry/syncTest",JSON.stringify(param), false);
console.log("result::", o2, typeof o2, JSON.parse(o2).a);
```

## ArkTs 调用 JavaScript

使用 Cocos Creator 3.8.6及以上 打包的鸿蒙原生应用中，C++封装了evalString方法提供给开发者直接从AtkTs直接执行JavaScript代码 使用方法如下：

--- 
 ** ⚠️注意事项：**
- 此方法只能在worker线程执行，因此如果有业务需求在主线程执行后调用的话，需要在主线程将结果发送给worker线程后再调用evalString。
- 此方法需要在worker线程的js引擎初始化完成之后才可以调用，也就是renderContext.nativeEngineInit()执行之后
- 此方法只能在v8和jsvm两种js引擎中有效，方舟引擎不支持。tips：方舟引擎的js交互可直接在globalThis上绑定对象后访问
- 此方法只支持返回number，string，boolean，纯对象相较于老办法nativeSdkUtil.gameMsgHandle，性能提升约30%+，推荐使用。
---

使用示例如下：
```
// 游戏侧：
window.test1 = (a,b) => {
    return a + b;
}

window.test2 = (a,b) => {
    if(a === b)
        return true;
    else
        return false;
}

window.test3 = (a,b)=>{
    return (a + b) + "";
}

window.person = {
    name: "zhangSan",
    age: 18
}

// arkts侧：
import cocos from 'libcocos.so';

let test1 = cocos.evalString("test1(1,2)");
console.log("返回结果:", test1, typeof test1);

let test2 = cocos.evalString("test2(2,3)");
console.log("返回结果:", test2, typeof test2);

let test3 = cocos.evalString("test3(3,4)");
console.log("返回结果:", test3, typeof test3);

let test4 = cocos.evalString("person");
console.log("返回结果:", test4.name, typeof test4);

打印结果：
48604-48719   A03D00/com.coc...harmony/JSAPP  pid-48604             I     返回结果: 3 number
48604-48719   A03D00/com.coc...harmony/JSAPP  pid-48604             I     返回结果: false boolean
48604-48719   A03D00/com.coc...harmony/JSAPP  pid-48604             I     返回结果: 7 string
48604-48719   A03D00/com.coc...harmony/JSAPP  pid-48604             I     返回结果: zhangSan object
```