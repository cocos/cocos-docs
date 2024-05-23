# `sebind` 使用教程

在 `sebind` 之前，不论是手动绑定还是自动绑定，开发者需要比较多的步骤才能完成绑定，而且需要对 JSB 有比较多了解。`sebind` 利用 C++ 的模板，最大化地减少了中间代码。

## 简单的示例

我们将在全局空间中定义一个对象 `simpleMath`，并且添加一个 `lerp` 方法：

```js
let v = simpleMath.lerp(a, b, t);
```

这个方法在 C++ 中实现。

### 准备工作

我们需要创建一个空的工程，保存场景，并且新建任一原生平台的构建任务。本示例使用的是 Windows 平台。

### 第一步：添加绑定代码

在 `native/engine/common/Classes` 目录，新建文件 `HelloSEBind.cpp`，写入以下内容：

```c++
// HelloSEBind.cpp
#include "bindings/sebind/sebind.h"

namespace {
struct Empty {}; // act as a namespace
float lerp(float a, float b, float t) { return (1 - t) * a + t * b; }
} // namespace

bool jsb_register_simple_math(se::Object *globalThis) {

  sebind::class_<Empty> demoMathClass("simpleMath");
  {
    // invoke through simpleMath.lerp(a, b, t);
    demoMathClass.staticFunction("lerp", &lerp).install(globalThis);
  }
  return true;
}
```

在 `native/engine/common/CMakeLists.txt` 中加入源文件 `HelloSEBind.cpp`：

```cmake

# ... 

list(APPEND CC_COMMON_SOURCES
    ${CMAKE_CURRENT_LIST_DIR}/Classes/Game.h
    ${CMAKE_CURRENT_LIST_DIR}/Classes/Game.cpp
    ${CMAKE_CURRENT_LIST_DIR}/Classes/HelloSEBind.cpp # new file
)
```

### 第二步：注册到 `ScriptEngine`

编辑 `Game.cpp`，位于 `native/engine/common/Classes` 目录：

```c++
// ...

// declare registry function
extern bool jsb_register_simple_math(se::Object *);       // #1

Game::Game() = default;


int Game::init() {

// ...
  _xxteaKey = SCRIPT_XXTEAKEY;

  // add callback to script engine
  auto *seengine = se::ScriptEngine::getInstance();        // #2
  seengine->addRegisterCallback(jsb_register_simple_math); // #3
  
  BaseGame::init();
  //....
```

按照上述标记（#1、2、3）依次添加编辑对应的代码。

### 第三步：验证

启动程序，在 Debug 模式下通过 Chrome devtools 验证：

![devtool](./sebind/devtool-test.png)

此时可观察到导出成功。

相比之前的做法，对 `se` 接口的使用大大减少，代码量也随之减少。

## 更复杂的绑定示例

`sebind` 以类为单位进行接口绑定，每一个 JS 类都需要构造对应的 `sebind::class_` 实例。所有的类的绑定都是通过 `sebind::class_` 所提供的方法来完成的。

下面，我们通过导出示例代码的 `User` 类来熟悉 `sebind` 的绑定流程。

> **注意**：示例代码只用作说明 `sebind` 的用法, 内部接口设计和实现在实际开发中无参考价值。

```c++
class User {
private:
  static int userCount;

public:
  // static methods
  static int doubleUserCount() { return 2 * userCount; }
  // static attributes
  static int getUserCount() { return userCount; }
  static void setUserCount(int v) { userCount = v; }

  // constructors with different parameters
  User() { userCount++; }
  User(const std::string &name_) : User() { name = name_; }
  User(const std::string &name_, const std::string &token)
      : User() {
    name = name_;
    _token = token;
  }
  User(const std::string &name_, const std::string &token, int credit)
      : User(name, token) {
    _credit = credit;
    name = name_;
    _token = token;
  }

  
  ~User() = default;

  // attributes 
  std::string getToken() const { return _token; }
  void setToken(const std::string &t) { _token = t; }

  // override function
  std::string toString() const { return name + ":" + _token; }
  std::string toString(const std::string &tag) const {
    return "[" + tag + "]:" + name + ":" + _token;
  }

  // function args with bound type
  std::string mergeName1(User &other) { return name + "|" + other.name; }
  std::string mergeName2(User *other) { return name + "|" + other->name; }
  std::string mergeName3(const std::shared_ptr<User> &other) {
    return name + "|" + other->name;
  }
  // public fields
  std::string name{"unset"};

private:
  std::string _token{"unset"};
  int _credit{-1};
};

int User::userCount = 0;

} // namespace

```
#### 实例化 `sebind::class_`

关联 C++ 类和指定 JS 类名

```c++
    // 定义绑定类和 JS 类名
  sebind::class_<User> userClass("User"); 
```

#### 绑定构造函数

```c++
userClass.constructor<>() // JS: new User
    .constructor<const std::string &>() // JS: new User("Jone")
    .constructor<const std::string &, const std::string &>() // JS: new User("Jone", "343453")
    .constructor<const std::string &, const std::string &, int>() //JS:  new User("Jone", "343453", 5678)
```

这里声明了 4 个构造模式：分别为 0、1、2、3 个参数. 每一个模板参数都对应于构造函数的参数类型。

在 JS 中调用 `new User(...)` 时, 会根据参数的数目触发对应的 C++ 构造函数。

> **注意**：如果不声明任何的 `constructor`, `sebind:class_` 会使用默认的无参构造函数。

我们也可以将普通函数定义为构造函数, 比如：

```c++
User *createUser(int credit) {
  return = new User("Lambda", "ctor", credit);
}
// ...
  .constructor(&createUser) // JS: new User(234)
```

其返回值需要是一个 `User*` 类型. 这里相当于在 JS 中声明了 构造函数 `constructor(credit:number)`。

#### 导出成员属性

把 C++ 公开的字段定义为 JS 中的属性，代码示例如下：

```c++
.property("name", &User::name)  // JS: user.name
```

也可以将 `getter`/`setter` 函数定义为属性。这里的 `getter` 函数需要有返回值, 且无参。`setter` 函数接受一个参数。

```c++
.property("token", &User::getToken, &User::setToken) // JS: user.token
```

> **注意**：这里的 `getter`/`setter` 可以只提供一个，另一个为 `nullptr`，但不能同时为 `nullptr`。

普通函数，第一个参数是 `User*`，可以作为成员函数使用。如：

```c++
std::string tokenLong_get(User *u) {
  return "token[" + u->getToken() + "]";
}
void tokenLong_set(User *u, const std::string &s) {
  u->setToken("token[" + u->getToken() + "]");
}
//...
.property("tokenPrefix", &tokenLong_get, &tokenLong_set) // JS: user.tokenPrefix
```

#### 导出成员函数

绑定成员函数，代码示例如下：

```c++
.function("mergeName1", &User::mergeName1) // JS: user1.mergeName1(user2)
.function("mergeName2", &User::mergeName2) // JS: user2.mergeName1(user2)
.function("mergeName3", &User::mergeName3) // JS: user3.mergeName1(user2)
```

JS 中绑定类型的实例可以作为参数传递给 C++ 绑定函数。C++ 函数可以使用 **引用**、**指针** 或者 **智能指针** 的方式接收绑定对象实例。这里如果 `User` 继承了 `cc::RefCounted`, 我们可以使用 `cc::IntrusivePtr<User>` 持有。如果没有继承 `cc::RefCounted`，正如现在的情况，我们也可以通过 `std::shared_ptr<User>` 持有。持有后，就是关联的 JS 对象被 GC 了，C++ 层持有的对象不会被析构。

> **注意**：绑定类型需要在调用 sebind 接口之前，通过宏 `JSB_REGISTER_OBJECT_TYPE(User);` 进行注册。后续的 `jsb_conversions` 方法才能正确处理类型转换。

如果对函数进行了重载，我们需要通过 `static_cast` 指定函数指针对应的具体类型。

```c++
.function("toString", static_cast<std::string(User::*)() const>(&User::toString))   ///JS: (new User).toString()
.function("toString", static_cast<std::string(User::*)(const std::string&) const>(&User::toString))  //JS: (new User).toString("1111")
```

和构造函数类似，重载函数是根据参数的数目进行匹配的，应该避免相同参数的情形。如果需要运行时判断参数类型可以参考绑定 [ SE 函数](#手动类型转换)。

#### 导出类静态方法

通过下方的代码示例，可以导出类的静态函数：

```c++
.staticFunction("doubleUserCount", &User::doubleUserCount) //JS: User.doubleUserCount()
```

同样可以把普通函数导出为类静态函数：

```c++
int  static_add(int a, int b) { return a + b; }
///...
  .staticFunction("add", &static_add) //JS: User.add(1,2)
```

#### 类静态属性

将类静态函数导出为类的静态属性，代码示例如下：

```c++
.staticProperty("userCount", &User::getUserCount, &User::setUserCount)  //JS: User.userCount
```

或普通函数：

```c++
int gettime() { return time(nullptr); }
/// ...
.staticProperty("time", &gettime, nullptr) //JS: User.time
```

#### 注册析构回调

注册绑定对象被 GC 时的回调示例如下：

```c++
...
.finalizer([](User *usr) {
  std::cout << "release " << usr->name << std::endl;
})
```

#### 导出到 JS 全局对象

将 `User` 类挂载到 `globalThis`对象, 完成导出. JS 脚本中可在全局访问.

```c++
.install(globalThis);
```

#### 继承

`sebind::class_` 的构造函数，第二个参数为父类的 `prototype` 对象。这里的 `SuperUser` 类继承了 `User` 类。

```c++
sebind::class_<User> superUser("SuperUser", userClass.prototype());
{
  superUser.constructor<const std::string &>()
      .function(
          "superName", +[](User *user) { return user->name + ".super";
          }) //JS:  (new SuperUser("Mok")).superName()
      .install(globalThis);
}
```

> **注意**：需要注意的是，父类的静态方法不会被子类继承。

## 其他用法

### C++ 调用 JS 函数

从 3.6.1 起，通过 `sebind::bindFunction` 可以将 `se::Value` 对象，绑定为 C++ 中的 `std::function`，不需要处理参数的转换。 类似地，可以使用 `sebind::callFunction` 直接调用 JS 函数。

示例如下：
```c++
demo.staticFunction(
  "add",
  +[](const se::Value &func, int a, int b) {
    // bind js function as a std::function<int(int,int)>
    auto addFunc = sebind::bindFunction<int(int, int)>(func);
    // ..
    // invoke std::function
    auto result = addFunc(a, b);

    // call JS function with automatic arguments assembling
    auto result2 = sebind::callFunction<int, int, int>(func, a, b);
    auto result3 = sebind::callFunction<int, int, int>(func, 6, 8);

    // argument type computing
    auto result4 = sebind::callFunction<int>(func, a, b);
    auto result5 = sebind::callFunction<int>(func, 6, 8);

    std::cout << "result 1 " << result << std::endl;
    std::cout << "result 2 " << result2 << std::endl;
  });
```

### 绑定抽象类

`sebind::class_` 要求提供构造函数，但抽象类的构造函数不可用。通过提供空的构造函数解决此冲突，实现抽象类型的注册。

示例如下：

```c++

class AbstractClass {
public:
  virtual bool tick() = 0;
};

class SubClass : public AbstractClass {
public:
  bool tick() override { return true; }
};

AbstractClass *fakeConstructor() {
  assert(false); // Abstract class cannot be instantiated
  return nullptr;
}

//..
sebind::class_<AbstractClass> base("AbstractBase");

base.constructor<>(&fakeConstructor) // add constructor
    .function("tick", &AbstractClass::tick)
    .install(globalThis);

sebind::class_<SubClass> sub("SubClass", base.prototype());
sub.install(globalThis);
```

### 手动类型转换

`sebind` 支持绑定传统 SE 函数，实现手动执行转换，代码示例如下：

```c++
bool jsb_sum(se::State &state) {
  double result = 0;
  auto &args = state.args();
  for (int i = 0; i < args.size(); i++) {
    result += (args[i].isNumber() ? args[i].toDouble() : 0);
  }
  state.rval().setDouble(result);
  return true;
}
/// 
.staticFunction("sum", &jsb_sum) // JS: User.sum(1,2,3,4,5)
```

这样就可以支持变长参数 和 灵活的参数转换。相比自动转换，这个方式更灵活同时也要求开发者对 `SE API` 更熟悉。

### 获取 JS this 对象

在 C++ 构造函数中获取对应的 JS `this` 对象是一个常见的需求，也能简化了从 C++ 到 JS 的访问流程。

我们只需要在 `constructor` 的参数类型中指定占位符 `sebind::ThisObject` 同时将对应构造函数的参数类型声明为 `se::Object *`。

```c++
// constructor
User(se::Object *self, const std::string &name_) {
  self->setProperty("fromNative", se::Value(true));
  name = name_;
}
/// ...
    superUser.constructor<sebind::ThisObject, const std::string &>() // JS: new SuperUser("Jone")
``` 
JS 中调用对应构造函数的时候，需要忽略 `sebind::ThisObject` 参数。

![sebind::ThisObject](./sebind/thisobject_placeholder.png)

HelloSEBind.cpp 完整代码如下：

```c++

#include "bindings/sebind/sebind.h"
#include <iostream>

namespace {


struct Empty {}; // act as a namespace
float lerp(float a, float b, float t) { return (1 - t) * a + t * b; }

class User {
  static int userCount;

public:
  static int doubleUserCount() { return 2 * userCount; }
  static int getUserCount() { return userCount; }
  static void setUserCount(int v) { userCount = v; }

  User() { userCount++; }
  // User(const std::string &name_) : User() { name = name_; }
  User(const std::string &name_, const std::string &token) : User() {
    name = name_;
    _token = token;
  }
  User(const std::string &name_, const std::string &token, int credit)
      : User(name, token) {
    _credit = credit;
    name = name_;
    _token = token;
  }

  User(se::Object *self, const std::string &name_) {
    self->setProperty("fromNative", se::Value(true));
    name = name_;
  }

  ~User() { userCount--; }

  std::string getToken() const { return _token; }
  void setToken(const std::string &t) { _token = t; }
  std::string toString() const { return name + ":" + _token; }
  std::string toString(const std::string &tag) const {
    return "[" + tag + "]:" + name + ":" + _token;
  }

  std::string mergeName1(User &other) { return name + "|" + other.name; }
  std::string mergeName2(const std::shared_ptr<User> &other) {
    return name + "|" + other->name;
  }
  std::string mergeName3(User *other) { return name + "|" + other->name; }

  std::string name{"unset"};

private:
  std::string _token{"unset"};
  int _credit{-1};
};

int User::userCount = 0;


class UserExt : public User {
public:
    using User::User;
};

/////////////////////////////////////////////////////



User *createUser(int credit) { return new User("Lambda", "ctor", credit); }

std::string tokenLong_get(User *u) { return "token[" + u->getToken() + "]"; }
void tokenLong_set(User *u, const std::string &s) {
  u->setToken("token[" + u->getToken() + "]");
}

int static_add(int a, int b) { return a + b; }

bool jsb_sum(se::State &state) {
  double result = 0;
  auto &args = state.args();
  for (int i = 0; i < args.size(); i++) {
    result += (args[i].isNumber() ? args[i].toDouble() : 0);
  }
  state.rval().setDouble(result);
  return true;
}

int gettime() { return time(nullptr); }


} // namespace

JSB_REGISTER_OBJECT_TYPE(User);

bool jsb_register_simple_math(se::Object *globalThis) {

  sebind::class_<Empty> demoMathClass("simpleMath");
  {
    // invoke through simpleMath.lerp(a, b, t);
    demoMathClass.staticFunction("lerp", &lerp).install(globalThis);
  }

  sebind::class_<User> userClass("User");
  {

    userClass
        .constructor<>()
        .constructor<const std::string &>()
        .constructor<const std::string &, const std::string &>()
        .constructor<const std::string &, const std::string &, int>()
        // .constructor(&createUser)
        .property("name", &User::name)
        .property("token", &User::getToken, &User::setToken)
        .property("tokenPrefix", &tokenLong_get, nullptr)
        .function("mergeName1", &User::mergeName1)
        .function("mergeName2", &User::mergeName2)
        // .function("mergeName3", &User::mergeName3)
        .function("toString",
                  static_cast<std::string (User::*)() const>(&User::toString))
        .function("toString",
                  static_cast<std::string (User::*)(const std::string &) const>(
                      &User::toString))
        .staticFunction("doubleUserCount", &User::doubleUserCount)
        .staticProperty("userCount", &User::getUserCount, &User::setUserCount)
        .staticProperty("time", &gettime, nullptr)
        .staticFunction("sum", &jsb_sum)
        .finalizer([](User *usr) {
          std::cout << "release " << usr->name << std::endl;
        })
        .install(globalThis);
  }

  sebind::class_<UserExt> superUser("SuperUser", userClass.prototype());
  {
    superUser.constructor<sebind::ThisObject, const std::string &>()
        .function(
            "superName", +[](UserExt *user) { return user->name + ".super"; })
        .install(globalThis);
  }

  return true;
}
```




