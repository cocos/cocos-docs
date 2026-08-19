# Project

当前打开的项目基本信息

## 变量

### name

• **name**: `string`

当前项目名称(取自 package.json)

```typescript
const projectName = Editor.Project.name; // "Hello World 3.4.0"
```

### path

• **path**: `string`

当前项目路径

```typescript
const projectPath = Editor.Project.path;  // "E:\\workSpace\\Hello World 3.4.0"
```

### tmpDir

• **tmpDir**: `string`

当前项目临时文件夹

```typescript
const projectTmpDir = Editor.Project.tmpDir;  // "E:\\workSpace\\Hello World 3.4.0\\temp"
```

### uuid

• **uuid**: `string`

当前项目 uuid

```typescript
const projectUUID = Editor.Project.uuid;  // "7aa7c089-8e53-4611-8689-98b69ab28e22"
```
