# Task

任务

## 函数

```typescript
interface NoticeOptions {
    title: string;
    message?: string;
    type?: 'error' | 'warn' | 'log' | 'success';
    source?: string;
    timeout?: number;
}
```

### addNotice

▸ **addNotice**(`options: NoticeOptions`): `any`

添加一个通知

**请求参数**

| Name      | Type            | Description |
| :-------- | :-------------- | :---------- |
| `options` | `NoticeOptions` | 消息配置    |

**返回结果**

`any`

```typescript
Editor.Task.addNotice({ title: 'add success', type: 'success' });
```

### addSyncTask

▸ **addSyncTask**(`title: string`, `describe?: string`, `message?: string`): `any`

添加一个同步任务
会在主窗口显示一个遮罩层

**请求参数**

| Name        | Type     | Description |
| :---------- | :------- | :---------- |
| `title`     | `string` | 任务名字    |
| `describe?` | `string` | 任务描述    |
| `message?`  | `string` | 任务内容    |

**返回结果**

`any`

```typescript
Editor.Task.addSyncTask('Task Title');
```

### changeNoticeTimeout

▸ **changeNoticeTimeout**(`id: number`, `time: number`): `any`

修改 notice 自动移除的时间

**请求参数**

| Name   | Type     | Description |
| :----- | :------- | :---------- |
| `id`   | `number` | 通知 id     |
| `time` | `number` | 超时时间    |

**返回结果**

`any`

```typescript
Editor.Task.changeNoticeTimeout(12, 1000);
```

### queryNotices

▸ **queryNotices**(): `any`

查询所有通知

**返回结果**

`any`

```typescript
const notices = Editor.Task.queryNotices();
```

### removeNotice

▸ **removeNotice**(`id: number`): `any`

删除一个通知

**请求参数**

| Name | Type     | Description |
| :--- | :------- | :---------- |
| `id` | `number` | 通知 id     |

**返回结果**

`any`

```typescript
Editor.Task.removeNotice(12);
```

### removeSyncTask

▸ **removeSyncTask**(`title: string`): `any`

删除一个同步任务

**请求参数**

| Name    | Type     | Description |
| :------ | :------- | :---------- |
| `title` | `string` | 任务的名字  |

**返回结果**

`any`

```typescript
Editor.Task.removeSyncTask('Task Title');
```

### sync

▸ **sync**(): `any`

页面进程立即同步一次主进程数据
谨慎使用，之后会被移除

**返回结果**

`any`

```typescript
Editor.Task.sync();
```

### updateSyncTask

▸ **updateSyncTask**(`title: string`, `describe?: string`, `message?: string`): `any`

更新某一个同步任务显示的数据

**请求参数**

| Name        | Type     | Description |
| :---------- | :------- | :---------- |
| `title`     | `string` | 任务名字    |
| `describe?` | `string` | 任务描述    |
| `message?`  | `string` | 任务内容    |

**返回结果**

`any`

```typescript
Editor.Task.updateSyncTask('Task Title');
```
