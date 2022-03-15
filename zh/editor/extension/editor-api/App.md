# App

程序

## 变量

### dev

• **dev**: `boolean`

是否是开发模式

```typescript
const isDev = Editor.App.dev;  // true
```

### home

• **home**: `string`

主目录

```typescript
const home = Editor.App.home;  // "C:\\Users\\Administrator\\.CocosCreator_Develop"
```

### icon

• **icon**: `string`

获取当前编辑器 icon 地址

```typescript
const icon = Editor.App.icon;  // "D:\\Program\\CocosEditor\\Creator\\3.4.0\\resources\\app.asar\\static\\logo.png"
```

### path

• **path**: `string`

编辑器程序文件夹

```typescript
const path = Editor.App.path;  // "D:\\Program\\CocosEditor\\Creator\\3.4.0\\resources\\app.asar"
```

### temp

• **temp**: `string`

获取当前编辑器的临时缓存目录

```typescript
const temp = Editor.App.temp;  // "C:\\Users\\ADMINI~1\\AppData\\Local\\Temp\\CocosCreator\\3.4.0"
```

### urls

• **urls**: `Object`

获取当前编辑器使用的 url 地址

**属性说明**

| Name     | Type     |    Description    |
| :------- | :------- | ----------------- |
| `api`    | `string` |   api 文档地址     |
| `forum`  | `string` |   论坛地址         |
| `manual` | `string` |   手册地址         |

```typescript
const urls = Editor.App.urls;
/**
*   {
*       manual: "https://docs.cocos.com/creator/3.4/manual/zh/",
*       api: "https://docs.cocos.com/creator/3.4/api/zh/",
*       forum: "https://forum.cocos.org/c/Creator"
*   }
*/
```

### userAgent

• **userAgent**: `string`

用户代理信息

```typescript
const UA = Editor.App.userAgent;  // "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) CocosCreator/3.4.0 Chrome/91.0.4472.106 Electron/13.1.4 Safari/537.36"
```

### version

• **version**: `string`

编辑器版本号

```typescript
const version = Editor.App.version;  // "3.4.0"
```

## 函数

### quit

▸ **quit**(): `void`

退出程序

```typescript
Editor.App.quit();
```
