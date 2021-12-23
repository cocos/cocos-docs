# Project

项目

## 变量

### name

• **name**: `string`

当前项目名称(取自 package.json)

```typescript
const projectName = Editor.Project.name;
```

### path

• **path**: `string`

当前项目路径

```typescript
const projectPath = Editor.Project.path;
```

### tmpDir

• **tmpDir**: `string`

当前项目临时文件夹

```typescript
const projectTmpDir = Editor.Project.tmpDir;
```

### type

• **type**: ``"2d"`` \| ``"3d"``

当前项目类型
谨慎使用，之后会被移除

```typescript
const projectType = Editor.Project.type;
```

### uuid

• **uuid**: `string`

当前项目 uuid

```typescript
const projectUUID = Editor.Project.uuid;
```

## 函数

### add

▸ **add**(`path: string`): `any`

添加一个项目
谨慎使用，之后会被移除

**请求参数**

| Name   | Type     | Description |
| :----- | :------- | ----------- |
| `path` | `string` | 项目路径     |

**返回结果**

`any`

```typescript
Editor.Project.add('E:\\CocosCreatorWorkSpace\\HelloWorld');
```

### create

▸ **create**(): `any`

创建一个项目
谨慎使用，之后会被移除

**返回结果**

`any`

```typescript
Editor.Project.create();
```

### open

▸ **open**(`path?: string`): `Promise`<`any`\>

打开一个项目
谨慎使用，之后会被移除

**请求参数**

| Name    | Type     | Description |
| :------ | :------- | ----------- |
| `path?` | `string` | 项目路径     |

**返回结果**

`Promise`<`any`\>

```typescript
await Editor.Project.open('E:\\CocosCreatorWorkSpace\\HelloWorld');
```
