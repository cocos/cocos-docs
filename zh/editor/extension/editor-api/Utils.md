# Utils

工具

## File

```typescript
interface UnzipOptions {
    peel?: boolean;
}
```

### 函数

#### copy

▸ **copy**(`source: string`, `target: string`): `void`

复制一个文件到另一个位置

**请求参数**

| Name     | Type     | Description |
| :------- | :------- | ----------- |
| `source` | `string` |             |
| `target` | `string` |             |

**返回结果**

`void`

```typescript
Editor.Utils.File.copy('C:\\CocosCreatorWorkSpace\\HelloWorld', 'E:\\CocosCreatorWorkSpace\\HelloWorld');
```

#### getName

▸ **getName**(`file: string`): `string`

初始化一个可用的文件名
返回可用名称的文件路径

Parameters

| Name   | Type     | Description  |
| :----- | :------- | :----------- |
| `file` | `string` | 初始文件路径 |

**返回结果**

`string`

```typescript
const newFileName = Editor.Utils.File.getName('E:\\CocosCreatorWorkSpace\\HelloWorld');
```

#### unzip

▸ **unzip**(`zip: string`, `target: string`, `options?: UnzipOptions`): `Promise`<`void`\>

解压文件夹

**请求参数**

| Name       | Type           | Description |
| :--------- | :------------- | ----------- |
| `zip`      | `string`       |             |
| `target`   | `string`       |             |
| `options?` | `UnzipOptions` |             |

**返回结果**

`Promise`<`void`\>

```typescript
await Editor.Utils.File.unzip('E:\\repositories\\utils.zip', 'E:\\CocosCreatorWorkSpace\\HelloWorld');
```

## Math

### 函数

#### add

▸ **add**(`arg1： string | number`, `arg2： string | number`): `number`

加法函数
入参：函数内部转化时会先转字符串再转数值，因而传入字符串或 number 均可
返回值：arg1 加上 arg2 的精确结果

**请求参数**

| Name   | Type                 | Description |
| :----- | :------------------- | ----------- |
| `arg1` | `string` \| `number` |             |
| `arg2` | `string` \| `number` |             |

**返回结果**

`number`

```typescript
const res = Editor.Utils.Math.add('123', 12.12);  // 135.12
```

#### clamp

▸ **clamp**(`val: number`, `min: number`, `max: number`): `any`

取给定边界范围的值

**请求参数**

| Name  | Type     | Description |
| :---- | :------- | ----------- |
| `val` | `number` |             |
| `min` | `number` |             |
| `max` | `number` |             |

**返回结果**

`any`

```typescript
const res = Editor.Utils.Math.clamp(100, 1, 99);  // 99
```

#### clamp01

▸ **clamp01**(`val:number`): `number`

取给 0 - 1 范围内的值

**请求参数**

| Name  | Type     | Description |
| :---- | :------- | ----------- |
| `val` | `number` |             |

**返回结果**

`number`

```typescript
const res = Editor.Utils.Math.clamp01(0.5);  // 0.5
```

#### sub

▸ **sub**(`arg1： string | number`, `arg2： string | number`): `number`

减法函数
入参：函数内部转化时会先转字符串再转数值，因而传入字符串或number均可
返回值：arg1 减 arg2的精确结果

**请求参数**

| Name   | Type                 | Description |
| :----- | :------------------- | ----------- |
| `arg1` | `string` \| `number` |             |
| `arg2` | `string` \| `number` |             |

**返回结果**

`number`

```typescript
const res = Editor.Utils.Math.sub('123', 12.12);  // 110.88
```

#### toFixed

▸ **toFixed**(`val: number`, `num: number`): `number`

保留小数点

**请求参数**

| Name  | Type     | Description |
| :---- | :------- | ----------- |
| `val` | `number` |             |
| `num` | `number` |             |

**返回结果**

`number`

```typescript
const res = Editor.Utils.Math.toFixed(12.1294, 2);  // 12.13
```

## Parse

```typescript
interface WhenParam {
    PanelName?: string;
    EditMode?: string;
}
```

### 函数

#### checkWhen

▸ **checkWhen**(`when: string`): `boolean`

判断一个 when 数据是否符合当前条件

**请求参数**

| Name   | Type     | Description |
| :----- | :------- | ----------- |
| `when` | `string` |             |

**返回结果**

`boolean`

```typescript
const res = Editor.Utils.Parse.checkWhen("PanelName === '' && EditMode === ''");  // false
```

#### when

▸ **when**(`when: string`): `WhenParam`

解析 when 参数
when 的格式：PanelName === '' && EditMode === ''
整理后的数据格式：
    {
        PanelName: '',
        EditMode: '',
    }

**请求参数**

| Name   | Type     | Description |
| :----- | :------- | ----------- |
| `when` | `string` |             |

**返回结果**

`WhenParam`

```typescript
const res = Editor.Utils.Parse.when("PanelName === '' && EditMode === ''"); 
```

## Path

### 变量

#### delimiter

• **delimiter**: ``";"`` \| ``":"``



#### sep

• **sep**: ``"\\"`` \| ``"/"``



### 函数

#### basename

▸ **basename**(`p: string`, `ext?: string`): `string`

返回路径的最后一部分

**请求参数**

| Name   | Type     | Description      |
| :----- | :------- | ---------------- |
| `p`    | `string` | 路径             |
| `ext?` | `string` | 文件扩展名，可选 |

**返回结果**

`string`

```typescript
const fileName = Editor.Utils.Path.basename('E:\\CocosCreatorWorkSpace\\HelloWorld\\package.json', '.json');  // package
```

#### basenameNoExt

▸ **basenameNoExt**(`path: string`): `string`

返回一个不含扩展名的文件名

**请求参数**

| Name   | Type     | Description |
| :----- | :------- | ----------- |
| `path` | `string` |             |

**返回结果**

`string`

```typescript
const fileName = Editor.Utils.Path.basenameNoExt('E:\\CocosCreatorWorkSpace\\HelloWorld\\package.json');  // package
```

#### contains

▸ **contains**(`pathA: string`, `pathB: string`): `boolean`

判断路径 pathA 是否包含 pathB

**请求参数**

| Name    | Type     | Description |
| :------ | :------- | ----------- |
| `pathA` | `string` |             |
| `pathB` | `string` |             |

**返回结果**

`boolean`

```typescript
const res = Editor.Utils.Path.contains('foo/bar', 'foo/bar/foobar');  // true
const res = Editor.Utils.Path.contains('foo/bar', 'foo/bar');  // true
const res = Editor.Utils.Path.contains('foo/bar/foobar', 'foo/bar');  // false
const res = Editor.Utils.Path.contains('foo/bar/foobar', 'foobar/bar/foo');  // false
```

#### dirname

▸ **dirname**(`p: string`): `string`

返回路径的目录名

**请求参数**

| Name | Type     | Description |
| :--- | :------- | ----------- |
| `p`  | `string` |             |

**返回结果**

`string`

```typescript
const dirname = Editor.Utils.Path.dirname('E:\\CocosCreatorWorkSpace\\HelloWorld\\package.json');
// "E:\\CocosCreatorWorkSpace\\HelloWorld"
```

#### extname

▸ **extname**(`p: string`): `string`

返回路径的扩展名

**请求参数**

| Name | Type     | Description |
| :--- | :------- | ----------- |
| `p`  | `string` |             |

**返回结果**

`string`

```typescript
const extname = Editor.Utils.Path.extname('E:\\CocosCreatorWorkSpace\\HelloWorld\\package.json');  // .json
```

#### format

▸ **format**(`pP`): `string`

根据对象数据返回路径字符串

**请求参数**

| Name | Type                    | Description |
| :--- | :---------------------- | ----------- |
| `pP` | `FormatInputPathObject` |             |

**返回结果**

`string`

```typescript
const path = Editor.Utils.Path.format({
  root: '/ignored',
  dir: '/home/user/dir',
  base: 'file.txt'
});  // "/home/user/dir\\file.txt"
```

#### isAbsolute

▸ **isAbsolute**(`p: string`): `boolean`

判断路径是否为绝对路径

**请求参数**

| Name | Type     | Description |
| :--- | :------- | ----------- |
| `p`  | `string` |             |

**返回结果**

`boolean`

```typescript
const res = Editor.Utils.Path.isAbsolute('E:\\CocosCreatorWorkSpace\\HelloWorld\\package.json');  // true
```

#### join

▸ **join**(...`paths: `string`[]`): `string`

使用特定于平台的分隔符作为定界符将所有给定的 `path` 片段连接在一起，然后规范化生成的路径

**请求参数**

| Name       | Type       | Description |
| :--------- | :--------- | ----------- |
| `...paths` | `string`[] |             |

**返回结果**

`string`

```typescript
const path = Editor.Utils.Path.join('/foo', 'bar', 'abc/def', 'g');  // "\\foo\\bar\\abc\\def\\g"
```

#### normalize

▸ **normalize**(`path: string`): `string`

格式化路径
如果是 Windows 平台，需要将盘符转成小写进行判断

**请求参数**

| Name   | Type     | Description |
| :----- | :------- | ----------- |
| `path` | `string` |             |

**返回结果**

`string`

```typescript
const path = Editor.Utils.Path.normalize('/foo/bar//abc/def/g');  // "\\foo\\bar\\abc\\def\\g"
```

#### parse

▸ **parse**(`p: string`): `ParsedPath`

返回一个对象，表示路径的重要信息

**请求参数**

| Name | Type     | Description |
| :--- | :------- | ----------- |
| `p`  | `string` |             |

**返回结果**

`ParsedPath`

```typescript
const res = Editor.Utils.Path.parse('/foo/bar//abc/def/g.txt');
```

#### relative

▸ **relative**(`from: string`, `to: string`): `string`

根据当前工作目录返回从 `from` 到 `to` 的相对路径

**请求参数**

| Name   | Type     | Description |
| :----- | :------- | ----------- |
| `from` | `string` |             |
| `to`   | `string` |             |

**返回结果**

`string`

```typescript
const relativePath = Editor.Utils.Path.relative('C:\\program\\test\\aaa', 'C:\\program\\impl\\bbb');  // "..\\..\\impl\\bbb"
```

#### resolve

▸ **resolve**(...`pathSegments: `string`[]`): `string`

将路径或路径片段的序列解析为绝对路径

**请求参数**

| Name              | Type       | Description |
| :---------------- | :--------- | ----------- |
| `...pathSegments` | `string`[] |             |

**返回结果**

`string`

```typescript
const path = Editor.Utils.Path.resolve('/foo/bar', './abc');  // "D:\\foo\\bar\\abc"
```

#### slash

▸ **slash**(`path: string`): `string`

将 \ 统一换成 /

**请求参数**

| Name   | Type     | Description |
| :----- | :------- | ----------- |
| `path` | `string` |             |

**返回结果**

`string`

```typescript
const path = Editor.Utils.Path.slash('\\foo\\bar');  // "/foo/bar"
```

#### stripExt

▸ **stripExt**(`path: string`): `string`

删除一个路径的扩展名

**请求参数**

| Name   | Type     | Description |
| :----- | :------- | ----------- |
| `path` | `string` |             |

**返回结果**

`string`

```typescript
const path = Editor.Utils.Path.stripExt('E:\\HelloWorld\\package.json');  // "E:\\HelloWorld\\package"
```

#### stripSep

▸ **stripSep**(`path: string`): `string`

去除路径最后的斜杆，返回一个不带斜杆的路径

**请求参数**

| Name   | Type     | Description |
| :----- | :------- | ----------- |
| `path` | `string` |             |

**返回结果**

`string`

```typescript
const path = Editor.Utils.Path.stripSep('E:\\HelloWorld\\package.json\\');  // "E:\\HelloWorld\\package.json"
```

## Url

### 函数

#### getDocUrl

▸ **getDocUrl**(`relativeUrl: string`, `type?: "manual" | "api"`): `string`

快捷获取文档路径

**请求参数**

| Name          | Type                      | Description |
| :------------ | :------------------------ | ----------- |
| `relativeUrl` | `string`                  |             |
| `type?`       | ``"manual"`` \| ``"api"`` |             |

**返回结果**

`string`

```typescript
const url = Editor.Utils.Url.getDocUrl('publish/publish-bytedance.html');
// "https://docs.cocos.com/creator/3.4/manual/zh/publish/publish-bytedance.html"
```

## UUID

### 函数

#### compressUUID

▸ **compressUUID**(`uuid: string`, `min: boolean`): `string`

压缩 UUID

**请求参数**

| Name   | Type      | Description |
| :----- | :-------- | ----------- |
| `uuid` | `string`  |             |
| `min`  | `boolean` |             |

**返回结果**

`string`

```typescript
const uuid = Editor.Utils.UUID.compressUUID('7bf9df40-4bc9-4e25-8cb0-9a500f949102');  // "7bf9d9AS8lOJYywmlAPlJEC"
```

#### decompressUUID

▸ **decompressUUID**(`str: string`): `string`

解压 UUID

**请求参数**

| Name  | Type     | Description |
| :---- | :------- | ----------- |
| `str` | `string` |             |

**返回结果**

`string`

```typescript
const uuid = Editor.Utils.UUID.decompressUUID('7bf9d9AS8lOJYywmlAPlJEC');  // "7bf9df40-4bc9-4e25-8cb0-9a500f949102"
```

#### generate

▸ **generate**(): `string`

生成一个新的 uuid

**返回结果**

`string`

```typescript
const uuid = Editor.Utils.UUID.generate();
```

#### isUUID

▸ **isUUID**(`str: string`): `string`

检查输入字符串是否是 UUID

**请求参数**

| Name  | Type     | Description |
| :---- | :------- | ----------- |
| `str` | `string` |             |

**返回结果**

`string`

```typescript
const isUUID = Editor.Utils.UUID.isUUID('7bf9d9AS8lOJYywmlAPlJEC');  // true
```
