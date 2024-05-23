# Huawei Cloud OBS Helper
[对象存储服务（Object Storage Service，OBS）](https://www.huaweicloud.com/product/obs.html)是一个基于对象的海量存储服务，为客户提供海量、安全、高可靠、低成本的数据存储能力。
您可以使用[OBS Helper action](https://github.com/marketplace/actions/huawei-cloud-obs-helper-action)实现如下对OBS的操作：  
1、上传文件/文件夹  
2、下载文件/文件夹  
3、创建桶  
4、删除桶  
本项目说明文件仅做基础功能示例，具体不同场景下的使用样例及其参数使用请访问[OBS Helper Workflow Sample](https://github.com/huaweicloud/obs-helper-workflow-sample)  
## **前置工作**
1、需要开通华为云的OBS服务，进行对象操作时需要建好桶。[OBS主页](https://www.huaweicloud.com/product/obs.html)，[OBS文档](https://support.huaweicloud.com/obs/)；  
2、action调用华为云接口需要华为云鉴权，建议将您华为云账户的ak/sk配置于您GitHub工程中的settting-Secret-Actions，分别添加为ACCESSKEY、SECRETACCESSKEY以加密使用，[获取ak/sk方式](https://support.huaweicloud.com/api-obs/obs_04_0116.html)； 
3、注意替换参数region为自己OBS服务的地区，方便插件配置终端节点 *obs.'\<region\>'.myhuaweicloud.com* 来访问您的OBS服务；   
4、注意替换参数bucket_name为自己OBS服务的桶名（创建桶时为要创建的桶名）  
## **华为云统一鉴权认证**
推荐使用[huaweicloud/auth-action](https://github.com/huaweicloud/auth-action)进行OBS操作的鉴权认证。
```yaml
    - name: Authenticate to Huawei Cloud
      uses: huaweicloud/auth-action@v1.0.0
      with: 
          access_key_id: ${{ secrets.ACCESSKEY }} 
          secret_access_key: ${{ secrets.SECRETACCESSKEY }}
          region: '<region>'
```
## **上传下载对象参数说明**
|  参数名称  |  参数说明  |  默认值  |  是否必填  |
|  :----:  |  ----  |  :----: |  :----:  |
| access_key  | 访问密钥ID。与私有访问密钥关联的唯一标识符，和私有访问密钥(secret_key)一起使用，对请求进行加密签名。建议参照**前置工作**中的步骤2进行设置以加密使用。如果使用了华为云统一鉴权[huaweicloud/auth-action](https://github.com/huaweicloud/auth-action)可以不填写此参数 |  无  |  否  |
| secret_key  | 与访问密钥ID(access_key)结合使用的私有访问密钥，对请求进行加密签名，可标识发送方，并防止请求被修改。建议参照**前置工作**中的步骤2进行设置以加密使用。如果使用了华为云统一鉴权[huaweicloud/auth-action](https://github.com/huaweicloud/auth-action)可以不填写此参数 |  无  |  否  |
| region  | OBS服务所在区域。用于配置OBS终端节点。如果使用了华为云统一鉴权[huaweicloud/auth-action](https://github.com/huaweicloud/auth-action)可以不填写此参数 |  'cn-north-4'  |  否  |
| bucket_name  | OBS的目标桶名 |  无  |  是  |
| operation_type  | 要进行的操作，上传请使用*upload*，下载请使用*download* |  无  |  是  |
| local_file_path  | 对象的本地路径，上传对象时可填写1~10个 |  无  |  是  |
| obs_file_path  | 对象在桶内的路径 |  无  |  下载时必填  |
| include_self_folder  | 上传/下载文件夹时是否包含文件夹自身，上传/下载单个文件时无意义。默认不包含 |  false  |  否  |
| exclude  | 下载对象时，要排除的对象，上传时无用。不填写时不排除任何对象 |  无  |  否  |

> 请注意，上传/下载时，地址类参数请不要使用操作系统独有的地址符号（如Linux系统的'\~'，会被识别成名为'\~'的文件夹）。Github Actions提供的[上下文功能](https://docs.github.com/cn/actions/learn-github-actions/contexts#github-context)中，有一些常用的地址上下文，例如：

```yaml
name: Show Contexts
on:
  push:
    branches:
        master
jobs:
  Show-Workspace:
    runs-on: ubuntu-latest
    steps:
      # ${{ github.workspace }}为action运行时的工作目录
      - name: Echo Workspace of Action
        run: echo ${{ github.workspace }}

      # ${{ runner.temp }}为运行器临时目录的路径
      - name: Echo Temporary Directory on the Runner
        run: echo ${{ runner.temp }}
```
## **创建删除桶参数说明**
|  参数名称  |  参数说明  |  默认值  |  是否必填  |
|  :----:  |  ----  |  :----: |  :----:  |
| access_key  | 访问密钥ID。与私有访问密钥关联的唯一标识符，和私有访问密钥(secret_key)一起使用，对请求进行加密签名。建议参照**前置工作**中的步骤2进行设置以加密使用。如果使用了华为云统一鉴权[huaweicloud/auth-action](https://github.com/huaweicloud/auth-action)可以不填写此参数 |  无  |  否  |
| secret_key  | 与访问密钥ID(access_key)结合使用的私有访问密钥，对请求进行加密签名，可标识发送方，并防止请求被修改。建议参照**前置工作**中的步骤2进行设置以加密使用。如果使用了华为云统一鉴权[huaweicloud/auth-action](https://github.com/huaweicloud/auth-action)可以不填写此参数 |  无  |  否  |
| region  | OBS服务所在区域。用于配置OBS终端节点。如果使用了华为云统一鉴权[huaweicloud/auth-action](https://github.com/huaweicloud/auth-action)可以不填写此参数 |  'cn-north-4'  |  否  |
| bucket_name  | OBS的目标桶名 |  无  |  是  |
| operation_type  | 要进行的操作，创建桶请使用*createbucket*，删除桶请使用*deletebucket* |  无  |  是  |
| public_read  | 创建桶时，是否开放桶公共读权限，不填时默认不开放。如需设置其他权限，请在创建桶后到控制台进行修改 |  false  |  否  |
| storage_class  | 创建桶时，桶的存储类型，不填时默认为*标准存储*|  无  |  否  |
| clear_bucket  | 删除桶时，是否清空桶内全部对象/碎片，不填时默认清空 |  true  |  否  |

## **参数支持列表**
目前OBS支持的区域名称和对应region(区域)、终端节点请见[对象存储服务 OBS](https://developer.huaweicloud.com/endpoint?OBS)  
  
目前OBS支持的存储类型(storage_class)如下
```text
  标准存储： standard
  低频访问存储： infrequent
  归档存储： archive
```
## **action代码示例片段**
以下action示例片段若无特别说明，均默认使用了华为云统一鉴权[huaweicloud/auth-action](https://github.com/huaweicloud/auth-action)。
```yaml
- name: Authenticate to Huawei Cloud
  uses: huaweicloud/auth-action@v1.0.0
  with: 
    access_key_id: ${{ secrets.ACCESSKEY }} 
    secret_access_key: ${{ secrets.SECRETACCESSKEY }}
    region: 'cn-north-4'
```
### **上传文件示例**
> 注意：上传单个文件时，在使用参数obs_file_path的时候，请使用是否以'/'作为结尾来区分是上传为文件，还是上传至文件夹。


假设本地文件夹的格式如下：
```text
└── src1
    ├── src2
          ├── test1.txt
          └── test2.txt
    └── src3
          └── test3.txt
```
#### 上传文件src1/src2/test1.txt至obs根目录
```yaml
- name: Upload to Huawei Cloud OBS
  uses: huaweicloud/obs-helper@v1.4.0
  with:
    bucket_name: 'bucket-test'
    local_file_path: 'src1/src2/test1.txt'
    obs_file_path: 'test1.txt'
    operation_type: 'upload'
```
成功上传后，桶内生成对象为：
```text
test1.txt
```

#### 上传文件夹src1(包含文件夹自身)至src文件夹
```yaml
- name: Upload to Huawei Cloud OBS
  uses: huaweicloud/obs-helper@v1.4.0
  with:
    bucket_name: 'bucket-test'
    local_file_path: 'src1'
    obs_file_path: 'src'
    operation_type: 'upload'
    include_self_folder: true
```
成功上传后，桶内生成对象为：
```text
  src
    └── src1
          ├── src2
                ├── test1.txt
                └── test2.txt
          └── src3
                └── test3.txt
```

#### 上传多个文件和文件夹(不包含文件夹自身)至src文件夹
```yaml
- name: Upload to Huawei Cloud OBS
  uses: huaweicloud/obs-helper@v1.4.0
  with:
    bucket_name: 'bucket-test'
    local_file_path: |
      'src1/src2/test1.txt'
      'src1/src3'
    obs_file_path: 'src'
    operation_type: 'upload'
    include_self_folder: false
```
成功上传后，桶内生成对象为：
```text
  src 
    └── test1.txt
    └── src3
          └── test3.txt
```

### **下载文件示例**
> 注意：下载文件时，在使用参数local_file_path的时候，请使用是否以'/'作为结尾来区分是下载为文件，还是下载至文件夹。

假设bucket-test桶内包含如下对象：
```text
test1.txt
src1
  ├── src2
        ├── test2.txt
        └── test3.txt
  └── src3
        └── test4.txt
```
#### 下载文件test1.txt至文件夹src1中
```yaml
- name: Download File from Huawei Cloud OBS
  uses: huaweicloud/obs-helper@v1.4.0
  with:
    bucket_name: 'bucket-test'
    local_file_path: 'src1/'
    obs_file_path: 'test1.txt'
    operation_type: 'download'
```
下载完成后，本地生成的文件为：
```text
└── src1
      └── test1.txt
```

#### 下载文件夹src1(包含文件夹自身)至文件夹src中
```yaml
- name: Download from Huawei Cloud OBS
  uses: huaweicloud/obs-helper@v1.4.0
  with:
    bucket_name: 'bucket-test'
    local_file_path: 'src'
    obs_file_path: 'src1'
    operation_type: 'download'
    include_self_folder: true
```
下载完成后，本地生成的文件为：
```text
src
  └── src1
        ├── src2
              ├── test2.txt
              └── test3.txt
        └── src3
              └── test4.txt
```

#### 下载文件夹src1(不包含文件夹自身，排除下载桶内src1/sr2/test3.txt和src1/src3目录下的所有文件)到src文件夹下
```yaml
- name: Download from Huawei Cloud OBS
  uses: huaweicloud/obs-helper@v1.4.0
  with:
    bucket_name: 'bucket-test'
    local_file_path: 'src'
    obs_file_path: 'src1'
    operation_type: 'download'
    include_self_folder: false
    exclude: |
      'src1/src2/test3.txt'
      'src1/src3'
```
下载完成后，本地生成的文件为：
```text
src
  └── src2
        └── test2.txt
```

### **创建桶用法**
创建新桶时，可指定是否开放桶公共读权限(public_read)和桶的存储类型(storage_class)。若不指定，默认不开放公共读权限，存储类型为标准存储(standard)。如需开放更多权限，请至obs控制台进行修改。  
#### 创建名为'new-bucket'的桶（开放公共读、低频访问存储、未使用统一鉴权）
假设您的OBS中不存在名为'new-bucket'的桶
```yaml
- name: Create Bucket on Huawei Cloud OBS
  uses: huaweicloud/obs-helper@v1.4.0
  with:
    access_key: ${{ secrets.ACCESSKEY }}
    secret_key: ${{ secrets.SECRETACCESSKEY }}
    region: 'cn-north-4'
    bucket_name: 'new-bucket'
    operation_type: 'createBucket'
    public_read: true
    storage_class: 'infrequent'
```
执行成功后，OBS中会创建一个名为'new-bucket'、开放公共读权限，存储类型为低频访问存储的桶

### **删除桶用法**
删除桶操作默认会自动清空桶内所有对象和碎片，若您不确定桶内是否有重要对象未备份，请设置参数'clear_bucker'为false  
#### 删除名为'new-bucket'的桶（自动清空桶内所有对象和碎片）
假设您的obs中存在名为'new-bucket'的桶
```yaml
- name: Delete bucket on Huawei Cloud OBS
  uses: huaweicloud/obs-helper@v1.4.0
  with:
    bucket_name: 'new-bucket'
    operation_type: 'deleteBucket'
```
执行成功后，您在obs的桶'new-bucket'以及其中所有对象和碎片将被删除

## Action中使用的公网地址说明
- 本action在使用过程会调用OBS服务，涉及到的公网域名可到[地区和终端节点 - 对象存储服务 OBS](https://developer.huaweicloud.com/endpoint?OBS)查看。  
- [Linux AMD64 OBSUtil下载链接](https://obs-community.obs.cn-north-1.myhuaweicloud.com/obsutil/current/obsutil_linux_amd64.tar.gz)

## 第三方开源包引入的公网地址
- https://docs.github.com/actions/using-workflows/workflow-commands-for-github-actions#adding-a-job-summary
- http://acs.amazonaws.com/groups/glob
- http://acs.amazonaws.com/groups/global/AllUsers
- http://acs.amazonaws.com/groups/global/AuthenticatedUsers
- http://acs.amazonaws.com/groups/s3/LogDelivery
- https://github.com/jprichardson/node-fs-extra/issues/269
- https://github.com/jprichardson/node-fs-extra/pull/141
- http://mths.be/fromcodepoint
- http://www.w3.org/2001/XMLSchema-instance
- http://www.w3.org/XML/1998/namespace
- http://www.w3.org/2000/xmlns/