# App

Creator 基本信息

## 变量

### dev

• **dev**: `boolean`

是否是开发模式

```typescript
Editor.App.dev;  // true
```

### home

• **home**: `string`

Creator 的主目录，存放一些临时文件和配置信息

```typescript
Editor.App.home;  // "C:\\Users\\Administrator\\.CocosCreator_Develop"
```

### path

• **path**: `string`

Creator 程序所在文件夹

```typescript
Editor.App.path;  // "D:\\Program\\CocosEditor\\Creator\\3.4.0\\resources\\app.asar"
```

### temp

• **temp**: `string`

获取当前编辑器的临时缓存目录

```typescript
Editor.App.temp;  // "C:\\Users\\ADMINI~1\\AppData\\Local\\Temp\\CocosCreator\\3.4.0"
```

### userAgent

• **userAgent**: `string`

Creator 使用的用户代理信息

```typescript
const UA = Editor.App.userAgent;  // "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) CocosCreator/3.4.0 Chrome/91.0.4472.106 Electron/13.1.4 Safari/537.36"
```

### version

• **version**: `string`

Creator 版本号

```typescript
const version = Editor.App.version;  // "3.4.0"
```

## 函数

### quit

▸ **quit**(): `void`

正常退出 Creator，会逐个询问所有扩展，当所有扩展都允许关闭后，才会开始关闭流程

```typescript
Editor.App.quit();
```
