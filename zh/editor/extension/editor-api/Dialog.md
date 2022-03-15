# Dialog

对话框

## 接口说明

弹窗具体参数参考 [Electron 官方文档](https://www.electronjs.org/zh/docs/latest/api/dialog)

```typescript
export interface SelectDialogOptions {
    title?: string;
    path?: string;
    type?: 'directory' | 'file';
    button?: string;
    multi?: boolean;
    filters?: FileFilter[];
    extensions?: string;
}

export interface MessageDialogOptions {
    title?: string;
    detail?: string;
    default?: number;
    cancel?: number;
    checkboxLabel?: string;
    checkboxChecked?: boolean;
    buttons?: string[];
}
```
## 函数

### error

▸ **error**(message: `string`, options?: `MessageDialogOptions`, window?: `BrowserWindow`): Promise<`MessageBoxReturnValue`\>

错误弹窗

**请求参数**

| Name       | Type                   | Description                          |
| :--------- | :--------------------- | :----------------------------------- |
| `message`  | `string`               | 错误信息                             |
| `options?` | `MessageDialogOptions` | 错误弹窗可选参数                     |
| `window?`  | `BrowserWindow`        | 依附于哪个窗口（插件主进程才可使用） |

**返回结果**

Promise<`MessageBoxReturnValue`\>

```typescript
await Editor.Dialog.error('error content', {
    title: 'options-title'
});
```

### info

▸ **info**(message: `string`, options?: `MessageDialogOptions`, window?: `BrowserWindow`): Promise<`MessageBoxReturnValue`\>

信息弹窗

**请求参数**

| Name       | Type                   | Description                          |
| :--------- | :--------------------- | :----------------------------------- |
| `message`  | `string`               | 显示的消息                            |
| `options?` | `MessageDialogOptions` | 信息弹窗可选参数                       |
| `window?`  | `BrowserWindow`        | 依附于哪个窗口（插件主进程才可使用）    |

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

### save

▸ **save**(options?: `MessageDialogOptions`, `window?: `BrowserWindow`): Promise<`SaveDialogReturnValue`\>

保存文件弹窗

**请求参数**

| Name       | Type                  | Description                          |
| :--------- | :-------------------- | :----------------------------------- |
| `options?` | `SelectDialogOptions` | 保存文件窗口参数                     |
| `window?`  | `BrowserWindow`       | 依附于哪个窗口（插件主进程才可使用） |

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

▸ **select**(options?: `SelectDialogOptions`, window?: `BrowserWindow`): Promise<`OpenDialogReturnValue`\>

选择文件弹窗

**请求参数**

| Name       | Type                  | Description                          |
| :--------- | :-------------------- | :----------------------------------- |
| `options?` | `SelectDialogOptions` | 选择弹窗参数                         |
| `window?`  | `BrowserWindow`       | 依附于哪个窗口（插件主进程才可使用） |

**返回结果**

Promise<`OpenDialogReturnValue`\>

```typescript
const result = await Editor.Dialog.select({
    title: 'Select Title',
    path: aEditor.Project.path,
    filters: [{ name: 'Package', extensions: ['zip'] }],
});
if (result.filePaths && result.filePaths[0]) {
    return result.filePaths[0];
} else {
    return '';
}
```

### warn

▸ **warn**(message: `string`, options?: `MessageDialogOptions`, window?: `BrowserWindow`): Promise<`MessageBoxReturnValue`\>

警告弹窗

**请求参数**

| Name       | Type                   | Description                          |
| :--------- | :--------------------- | :----------------------------------- |
| `message`  | `string`               | 警告信息                             |
| `options?` | `MessageDialogOptions` | 警告弹窗可选参数                     |
| `window?`  | `BrowserWindow`        | 依附于哪个窗口（插件主进程才可使用） |

**返回结果**

Promise<`MessageBoxReturnValue`\>

```typescript
await Editor.Dialog.warn('Warn Message');
```
