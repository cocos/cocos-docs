# 扩展主菜单

Cocos Creator 的主菜单是可以自由扩展的。扩展方法是在 `package.json` 文件中的 `main-menu` 字段里，加入自己的菜单路径和菜单设置选项。下面是一份主菜单的配置样例：

```json
{
  "main-menu": {
    "Examples/FooBar/Foo": {
      "message": "my-package:foo"
    },
    "Examples/FooBar/Bar": {
      "message": "my-package:bar"
    }
  }
}
```

在样例中，我们通过配置菜单路径，在主菜单 "Example" > "Foobar" 里加入了 "Foo" 和 "Bar" 两个菜单选项。当我们点击这个菜单项，它会发送定义在其 `message` 字段中的 IPC 消息到主进程中。比如我们点击 "Foo" 将会发送 `my-package:foo` 这个消息。

## 菜单路径

在主菜单中注册中，其键值（Key）需要是一份菜单路径。菜单路径是 posix 路径格式，使用 `/` 作为分割符。在主菜单注册过程中，Cocos Creator 会根据路径一级一级往下寻找子菜单项，如果在寻找路径中没有找到对应的子菜单，就会在对应的路径中进行创建，直到最后一级菜单，将被当做菜单项加入。

在注册过程中也会遇到一些出错的情况：

### 注册的菜单项已经存在

这种情况多发生在多个扩展包之间，当你的扩展包和其他用户的扩展包的菜单注册路径相同时，就会发生该冲突。

### 注册菜单项的父级菜单已经被其他菜单项注册，其类型不是一个子菜单（submenu）

这个情况和上一种情况类似，我们可以用以下这个例子来说明：

```json
{
  "main-menu": {
    "Examples/FooBar": {
      "message": "my-package:foo"
    },
    "Examples/FooBar/Bar": {
      "message": "my-package:bar"
    }
  }
}
```

在这个例子中，我们先在主菜单中注册了一份菜单路径 `Examples/Foobar`，这之后我们又注册了 `Examples/Foobar/Bar`，而第二个菜单路径的注册要求 Foobar 的类型为一个分级子菜单（submenu），然而由于上一次的注册已经将 Foobar 的类型定义为菜单选项（menu-item），从而导致了注册失败。

## 菜单选项

在上面的例子中，我们已经使用了 `message` 菜单选项。菜单注册过程中还有许多其他的可选项，例如：icon、accelerator、type 等。更多选项，请阅读 [主菜单字段参考](reference/main-menu-reference.md)。

## 插件专用菜单分类

为了避免用户安装多个插件时，每个插件随意注册菜单项，降低可用性，我们推荐所有编辑器扩展插件的菜单都放在统一的菜单分类里，并以插件包名对不同插件的菜单项进行划分。

插件专用的菜单分类路径是 `i18n:MAIN_MENU.package.title`，在中文语言环境会显示为一级菜单 `插件`，接下来的二级菜单路径名应该是插件的包名，最后的三级路径是具体的菜单项功能，如：

`i18n:MAIN_MENU.package.title/FooBar/Bar`

在中文环境的编辑器下就会显示如 `插件/FooBar/Bar` 这样的菜单。

`i18n:MAIN_MENU.package.title` 是多语言专用的路径表示方法，详情请见 [扩展包多语言化](i18n.md) 文档。
