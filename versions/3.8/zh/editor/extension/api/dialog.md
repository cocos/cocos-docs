# Dialog

对话框弹窗，当在扩展进程使用的时候，弹出普通弹窗，如果在面板进程使用，则会弹出模态弹窗

## 通用接口说明

### MessageDialogOptions

| Name                | Type                   | Description |
| :------------------ | :--------------------- | :-------------------------- |
| `title?`            | `string`               | 标题，在部分可能会被隐藏 |
| `detail?`           | `string`               | 详细描述 |
| `buttons?`          | `string array`         | 在弹窗上新增一个或者多个按钮 |
| `default?`          | `number`               | 打开弹窗时默认选中的按钮 |
| `cancel?`           | `number`               | 当弹窗关闭时，默认触发的按钮 |
| `checkboxLabel?`    | `number`               | 在弹窗上附加一个可选项 |
| `checkboxChecked?`  | `number`               | 弹窗上附加的可选项默认值 |

### SelectDialogOptions

| Name          | Type                   | Description |
| :------------ | :--------------------- | :-------------------------------- |
| `title?`      | `string`               | 标题，在部分可能会被隐藏 |
| `button?`     | `string`               | 弹窗按钮上的文字 |
| `path?`       | `string`               | 默认打开位置 |
| `type?`       | `directory | file`     | 是选择文件夹还是文件 |
| `multi?`      | `boolean`              | 是否可以多选 |
| `filters?`    | `object array`         | 过滤弹窗可选择的对象 |
| `extensions?` | `string array`         | 设置可选择的文件扩展名，例如 'png' |

### SaveDialogReturnValue

| Name          | Type                   | Description |
| :------------ | :--------------------- | :-------------------------------- |
| `canceled`    | `boolean`              | 用户是否取消 |
| `filePath`    | `string`               | 选择的文件路径 |

### OpenDialogReturnValue

| Name          | Type                   | Description |
| :------------ | :--------------------- | :-------------------------------- |
| `canceled`    | `boolean`              | 用户是否取消 |
| `filePaths`   | `string array`         | 选择的文件路径 |

#### filters 示例

```typescript
{
  filters: [
    { name: 'Images', extensions: ['jpg', 'png', 'gif'] },
    { name: 'Movies', extensions: ['mkv', 'avi', 'mp4'] },
    { name: 'Custom File Type', extensions: ['as'] },
    { name: 'All Files', extensions: ['*'] }
  ]
}
```

## 函数

### info

▸ **info**(message: `string`, options?: `MessageDialogOptions`): Promise<`MessageBoxReturnValue`\>

普通信息弹窗

**请求参数**

| Name       | Type                   | Description                          |
| :--------- | :--------------------- | :----------------------------------- |
| `message`  | `string`               | 显示的消息 |
| `options?` | `MessageDialogOptions` | 信息弹窗可选参数 |

**返回结果**

Promise<`MessageBoxReturnValue`\>

```typescript
const result = await Editor.Dialog.info('Dialog Message', {
    buttons: ['confirm', 'cancel'],
    title: 'Dialog Title',
});
if (0 == result.response) {
    // ... confirm event
} else {
    // ... cancel event
}
```

### warn

▸ **warn**(message: `string`, options?: `MessageDialogOptions`): Promise<`MessageBoxReturnValue`\>

警告弹窗

**请求参数**

| Name       | Type                   | Description                          |
| :--------- | :--------------------- | :----------------------------------- |
| `message`  | `string`               | 警告信息 |
| `options?` | `MessageDialogOptions` | 警告弹窗可选参数 |

**返回结果**

Promise<`MessageBoxReturnValue`\>

```typescript
await Editor.Dialog.warn('Warn Message');
```

### error

▸ **error**(message: `string`, options?: `MessageDialogOptions`): Promise<`MessageBoxReturnValue`\>

错误弹窗

**请求参数**

| Name       | Type                   | Description                          |
| :--------- | :--------------------- | :----------------------------------- |
| `message`  | `string`               | 错误信息 |
| `options?` | `MessageDialogOptions` | 错误弹窗可选参数 |

**返回结果**

Promise<`MessageBoxReturnValue`\>

```typescript
await Editor.Dialog.error('error content', {
    title: 'options-title'
});
```

### save

▸ **save**(options?: `MessageDialogOptions`): Promise<`SaveDialogReturnValue`\>

保存文件弹窗，保存文件时只能选择文件夹，且无法多选，相关参数不会生效

**请求参数**

| Name       | Type                  | Description                          |
| :--------- | :-------------------- | :----------------------------------- |
| `options?` | `SelectDialogOptions` | 保存文件窗口参数 |

**返回结果**

Promise<`SaveDialogReturnValue`\>

```typescript
const result = await Editor.Dialog.save({
    path: Editor.Project.path,
    title: 'Save Title',
    filters: [
        { name: 'Package', extensions: ['zip'] },
    ],
});
if (!result.filePath) {
    return;
}
```

### select

▸ **select**(options?: `SelectDialogOptions`): Promise<`OpenDialogReturnValue`\>

选择文件弹窗

**请求参数**

| Name       | Type                  | Description                          |
| :--------- | :-------------------- | :----------------------------------- |
| `options?` | `SelectDialogOptions` | 选择弹窗参数 |

**返回结果**

Promise<`OpenDialogReturnValue`\>

```typescript
const result = await Editor.Dialog.select({
    title: 'Select Title',
    path: Editor.Project.path,
    filters: [{ name: 'Package', extensions: ['zip'] }],
});
if (result.filePaths && result.filePaths[0]) {
    return result.filePaths[0];
} else {
    return '';
}
```

更多说明请参考 [Electron 官方文档](https://www.electronjs.org/zh/docs/latest/api/dialog)