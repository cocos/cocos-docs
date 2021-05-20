# 项目设置

**项目设置** 面板通过点击编辑器主菜单栏中的 **项目 -> 项目设置** 即可打开，主要用于设置特定项目的相关配置项。这些设置会保存在项目的 `settings/packages` 文件夹中。如果需要在不同开发者之间同步项目设置，请将 `settings` 目录加入到版本控制。

**项目设置** 由几个不同的分页组成，包括 **Macro Config**、**功能裁剪**、**项目数据**、**Layers**、**物理**、**脚本** 和 **纹理压缩**。修改设置之后 **项目设置** 面板会自动保存修改。

## Macro Config（引擎宏配置）

关于引擎宏模块的具体信息与代码可以参考 **Engine macro**（[GitHub](https://github.com/cocos-creator/engine/blob/3d/cocos/core/platform/macro.ts#L824) | [Gitee](https://gitee.com/mirrors_cocos-creator/engine/blob/3d/cocos/core/platform/macro.ts#L824)），这里提供了修改宏配置的快捷方式，配置的宏将会在预览、构建时生效，同时也会跟随自定义引擎的配置更新当前宏配置的默认值。

![macro](./index/macro.png)

## 功能裁剪

**功能裁剪** 分页主要是针对发布游戏时引擎中使用的模块进行裁剪，达到减小发布版引擎包体的效果。列表中未选中的模块在打包、预览时将会被裁剪掉。建议打包后进行完整的测试，避免场景和脚本中使用到了被裁剪掉的模块。

![feature-core](./index/feature-crop.png)

## 项目数据

**项目数据** 分页主要用于设置默认 Canvas、渲染管线等，只对当前项目生效。

![project-data](./index/project-data.png)

### 默认 Canvas 设置

默认 Canvas 设置包括 **设计分辨率** 和 **适配屏幕宽度/高度**，用于规定在新建场景或 Canvas 组件 时，Canvas 中默认的设计分辨率数值，以及 `Fit Height` 和 `Fit Width`。详情请参考 [多分辨率适配方案](../../ui-system/production-strategy/multi-resolution.md)。

### 渲染管线

渲染管线用于控制场景的渲染流程，该项用于指定当前项目使用的是哪一套渲染流程，目前仅支持 builtin-forward，开发者也可以自定义渲染管线。详情请参考 [进阶主题 — 渲染管线](../../render-pipeline/overview.md)

## Layers

![Layers](./index/layers.png)

- Layers 能让相机渲染部分场景，让灯光照亮部分场景。
- 可自定义 0 到 19 个 Layers，清空输入框则删除原先的设置。
- 后 12 个 Layers 是引擎内置的，不可修改。
- 目前使用到 Layer 的位置包括：

  1. Node 节点在 **属性检查器** 中的 [Layer 属性](../../concepts/scene/node-component.md)。

      ![Layers-node](./index/layers-node.png)

  2. Camera 节点在 **属性检查器** 中的 Visibility 属性，节点的 layer 属性匹配相机的 visibility 属性。只有当节点设置的 Layer 属性包含在相机的 visibility 中时，节点才可以被相机看见。更多说明可以参考 [Camera 组件](./../components/camera-component.md)。

      ![Layers-camera](./index/layers-camera.png)

<!-- native 引擎设置的修改主要影响的是构建原生项目时使用 cocos2dx 引擎模板，修改后可以实时生效。 -->

## 物理

![physics](./index/physics.png)

用于配置物理的各项参数，详情请参考 [物理配置](physics-configs.md)。

## 脚本

![scripting](./index/scripting.png)

## 压缩纹理

在 Cocos Creator 3.0，压缩纹理修改为在 **项目设置** 中配置预设，然后在 **属性检查器** 中选择图片资源的预设方式。旧版本的项目在升级到 v3.0 后，编辑器会自动扫描项目中所有的压缩纹理配置情况，整理出几个预设，由于是自动扫描的，所以预设名称可能不匹配项目，可以自行在此处修改。

![compress-texture](./texture-compress/compress-texture.png)

该分页主要用于添加压缩纹理预设配置，可添加多个，每个压缩纹理配置允许针对不同的平台制定配置细则。添加完成后，在 **层级管理器** 中选中图片资源，就可以在 **属性检查器** 中快速添加压缩纹理预设。同时也可以在该分页中直接修改预设来达到批量更新压缩纹理配置的使用需求。

目前配置压缩纹理支持以下平台：

1. Web：包括 Web-Mobile 和 Web-Desktop 两个平台
2. iOS
3. Mini Game: 包括目前 Creator 支持的所有小游戏平台，比如微信小游戏、华为快游戏等
4. Android

各平台对纹理压缩的支持情况，详情请参考 [压缩纹理](../../asset/compress-texture.md)。

### 添加/删除纹理压缩预设

在上方的输入框中输入压缩纹理预设名称，点击 Enter 键或者右侧的加号按钮即可添加一个预设。另外两个按钮是用于导入/导出压缩纹理预设，详情请参考下文介绍。

![add](./texture-compress/add.png)

添加完压缩纹理后，如需删除可以直接将鼠标移到预设名称上，点击右侧的删除按钮即可。

![delete](./texture-compress/delete.png)

> **注意**：面板中内置的 **default** 和 **transparent** 这两个预设不可修改/删除。

### 添加/删除纹理压缩格式

选择平台，然后点击 **Add Format** 按钮，选择需要的纹理格式，再配置好对应的质量等级即可，目前同类型的图片格式只能添加一次。

![add-format](./texture-compress/add-format.png)

如需删除，将鼠标移至纹理格式上方，点击右侧的红色删除按钮即可。

![delete-format](./texture-compress/delete-format.png)

### 修改压缩纹理预设名称

压缩纹理的名称仅仅是作为显示使用，在添加压缩纹理预设时，就会随机生成 uuid 作为该预设的 ID，因而直接修改预设名称并不会影响图片资源处对预设的引用。

![edit](./texture-compress/edit.png)

### 导出/导入压缩纹理预设

压缩纹理配置页面允许导入/导出压缩纹理预设，以便更好地跨项目复用配置，也可以自行在外部编辑好压缩纹理预设再导入到编辑器。

大部分情况下直接导入导出即可，如果需要自行编写压缩纹理配置，请参考下方接口定义与范例：

**接口定义**：

```ts
type IConfigGroups = Record<ITextureCompressPlatform, IConfigGroupsInfo>;
type ITextureCompressPlatform = 'miniGame' | 'web' | 'ios' | 'android' | 'pc';
type ITextureCompressType =
    | 'jpg'
    | 'png'
    | 'webp'
    | 'pvrtc_4bits_rgb'
    | 'pvrtc_4bits_rgba'
    | 'pvrtc_4bits_rgb_a'
    | 'pvrtc_2bits_rgb'
    | 'pvrtc_2bits_rgba'
    | 'pvrtc_2bits_rgb_a'
    | 'etc1_rgb'
    | 'etc1_rgb_a'
    | 'etc2_rgb'
    | 'etc2_rgba'
    | 'astc_4x4'
    | 'astc_5x5'
    | 'astc_6x6'
    | 'astc_8x8'
    | 'astc_10x5'
    | 'astc_10x10'
    | 'astc_12x12';
type IConfigGroupsInfo = Record<ITextureCompressType, IQuality>
interface ICompressPresetItem {
    name: string;
    options: IConfigGroups;
}
```

**示例参考**：

```json
{
    "default": {
        "name": "default",
        "options": {
            "miniGame": {
                "etc1_rgb": "fast",
                "pvrtc_4bits_rgb": "fast"
            },
            "android": {
                "astc_8x8": "-medium",
                "etc1_rgb": "fast"
            },
            "ios": {
                "astc_8x8": "-medium",
                "pvrtc_4bits_rgb": "fast"
            },
            "web": {
                "astc_8x8": "-medium",
                "etc1_rgb": "fast",
                "pvrtc_4bits_rgb": "fast"
            },
        }
    },
    "transparent": {
        "name": "transparent",
        "options": {
            "miniGame": {
                "etc1_rgb_a": "fast",
                "pvrtc_4bits_rgb_a": "fast"
            },
            "android": {
                "astc_8x8": "-medium",
                "etc1_rgb_a": "fast"
            },
            "ios": {
                "astc_8x8": "-medium",
                "pvrtc_4bits_rgb_a": "fast"
            },
            "web": {
                "astc_8x8": "-medium",
                "etc1_rgb_a": "fast",
                "pvrtc_4bits_rgb_a": "fast"
            },
        }
    }
}
```

## 扩展项目设置面板

Creator 支持在 **项目设置** 右侧添加自定义功能页，详情请参考 [扩展项目设置](../../editor/extension/contributions-project.md)。
