# The differences between Pure JS and JS-Binding objects

## Properties

The properties of pure JS objects are assigned to instance, but they're assigned to `prototype` for JS-Binding objects.

### Pure JS objects

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

### JS-Binding objects

```c++
// C++ class
class MyClass {
public:
  std::string a;
  bool b;
  int32_t c;
};

// The snippet of JS-Binding glue code.
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

So if you have written some JS code depends on `hasOwnProperty`, you need to keep in mind of the above difference since it may cause your application to work correctly on Web platform, but be broken on Native platform.

### Possible Solution

If the application needs to run on Native platform, while checking whether a property exists on a JS-Binding object, you need to check its `__proto__` either. For example:

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



