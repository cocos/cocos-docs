# 纯 JS 对象与绑定对象之间的差异

## 属性

纯 JS 对象的属性是被赋值到对象实例上，但是绑定对象的属性是被赋值到对象的原型上的。

### 纯 JS 对象

```typescript
class MyClass {
  constructor() {
    this.a = 'a';
    this.b = false;
    this.c = 100;
  }
};

const myobj = new MyClass();
const ownA = myobj.hasOwnProperty('a');
console.log(`ownA: ${ownA}`); // ownA: true
```

### JS 绑定对象

```c++
// C++ 类
class MyClass {
public:
  std::string a;
  bool b;
  int32_t c;
};

// MyClass 绑定代码片段
bool js_register_cc_MyClass(se::Object* obj) {
    auto* cls = se::Class::create("MyClass", obj, nullptr, _SE(js_new_cc_MyClass)); 
    cls->defineStaticProperty("__isJSB", se::Value(true), se::PropertyAttribute::READ_ONLY | se::PropertyAttribute::DONT_ENUM | se::PropertyAttribute::DONT_DELETE);
  
    cls->defineProperty("a", _SE(js_cc_MyClass_a_get), _SE(js_cc_MyClass_a_set)); 
    cls->defineProperty("b", _SE(js_cc_MyClass_b_get), _SE(js_cc_MyClass_b_set)); 
    cls->defineProperty("c", _SE(js_cc_MyClass_c_get), _SE(js_cc_MyClass_c_set)); 
    
    cls->defineFinalizeFunction(_SE(js_delete_cc_MyClass));
    cls->install();
    JSBClassType::registerClass<cc::MyClass>(cls);
    
    __jsb_cc_MyClass_proto = cls->getProto();
    __jsb_cc_MyClass_class = cls;
    se::ScriptEngine::getInstance()->clearException();
    return true;
}
//
```

```typescript
const myobj = new jsb.MyClass();
const ownA = myobj.hasOwnProperty('a');
console.log(`ownA: ${ownA}`); // ownA: false
const protoOwnA = myobj.__proto__.hasOwnProperty('a');
console.log(`protoOwnA: ${protoOwnA}`); // protoOwnA: true
```

因此，如果你的代码逻辑中依赖了 `hasOwnProperty` ，你需要谨记上述差异，因为其可能会导致你的应用在 Web 环境下运行正常，但是在 Native 环境下出现异常的情况。

### 可能的解决方案

如果你的应用需要运行在 Native 环境下，当判断一个绑定对象上的属性是否存在的时候，需要额外再判断一下原型上是否存在此属性，例如：

```typescript
function doSomething(v) {
  // ......
}

function foo() {
  for (const key in myObj) {
    if (myObj.hasOwnProperty('a')) {
      doSomething(myObj['a']);
    } else if (NATIVE) {
      myObj.__proto__.hasOwnProperty('a') {
        doSomething(myObj['a']);
      }
    }
  }
}
```

