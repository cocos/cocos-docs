# 如何向 Cocos 提交代码

Cocos Creator 是一个开源引擎，连同范例、文档都是开源的。<br>
在你开发游戏的过程中，当发现了引擎、文档或者范例不够完善的地方，如果仅仅是向官方团队提出建议，官方团队可能会因为人力资源的紧张而无法及时跟进。在此我们欢迎所有用户主动向我们提交 PR，帮助 Cocos 越做越好。引擎有 Bug？提 PR！范例难看？提 PR！API 注释不清晰？提 PR！文档有错别字？提 PR！想要把你的宝贵修改贡献给游戏社区？提 PR！以下几个是目前官方比较常用的开源仓库，这些仓库都可以提交 PR。

- **Cocos 引擎官方仓库**：[GitHub](https://github.com/cocos/cocos-engine/) | [Gitee](https://gitee.com/mirrors_cocos-creator/engine/)

下面让我们来看一下，如何从零开始在 GitHub 上向 Cocos 提交代码。

## 注册一个 GitHub 账号

打开 [GitHub 网站](https://github.com/) 注册账号。若之前已经有注册过，那直接登录就可以了。

## 环境配置

### 安装 Git

首先先确认电脑是否已经安装 Git，命令行输入 `git`，安装过则会输出以下内容：

![git](submit-pr/git.png)

未安装过则 [下载 Git](https://git-scm.com/download/) 并安装。安装过程中的所有选项保留默认就可以了，一直点 next，直到安装完成。

### 安装 Git 客户端 —— GitKraken

GitKraken 是比较常用的 Git 客户端工具。如果不使用 GitKraken 的话，Git 操作全部要通过命令行操作完成，比较麻烦。下面以 Windows 版本为例进行演示。

首先需要下载 [GitKraken](https://www.gitkraken.com/) 并解压缩，进行安装。

![GitKraken install](submit-pr/sourcetree_install.png)

安装完成后界面如下图所示：

![GitKraken install complete](submit-pr/sourcetree_install_complete.png)

## Fork 项目

以手册文档的代码仓库 **creator-docs**（[GitHub](https://github.com/cocos/cocos-docs) | [Gitee](https://gitee.com/mirrors_cocos-creator/creator-docs/)）为例。进入手册文档仓库页面，点击右上角的 Fork 按钮，如下图所示：

![fork](submit-pr/fork.png)

Fork 完成后，会自动跳转到你的 GitHub 仓库页面，可以看到已经生成了 docs-3d 项目副本，如下图所示：

![repository](submit-pr/repository.png)

## 将远程仓库克隆到本地仓库

1、首先需要到你的远程仓库复制 **远程仓库项目地址**，如下图所示：

![copy](submit-pr/copy.png)

2、切换到 GitKraken 后点击上方的 **Clone a repo** 按钮，跳转到 Clone 页面，粘贴刚才复制的 **远程仓库项目地址**，然后填入相关配置。如果想让本地的文件夹名称和项目名称一样，那么在本地存储路径后添加 `/docs-3d`。配置完成后点击 **Clone**。

![clone repository](submit-pr/clone_repository.png)

克隆完成后就会在本地自动创建 docs-3d 文件夹并且在 GitKraken 上自动打开项目。

![clone finish](submit-pr/clone_finish.png)

## 上传本地修改到远程仓库

1、检出需要的分支。在左侧的 **REMOTE** 目录下有一个 **origin** 仓库，这是你自己的远程仓库。例如要修改的分支是 next 分支，则点击 **origin** 后双击 **next** 分支。如下图所示：

![checkout](submit-pr/checkout.png)

**注意**：根据不同的版本，还需要切换不同的分支，例如：

- **vX.Y** 分支：对应 X.Y 版本所用分支
- **develop** 分支：开发分支

2、打开本地 docs-3d 项目进行修改，修改完成后查看仓库详情，如下图所示：

![modification](submit-pr/modification.png)

3、提交暂存区文件到本地仓库。将你要上传的修改文件提交到本地暂存区，然后在下方备注提交内容注释。完成之后点击 **Commit**，将暂存区文件提交到本地仓库。完成后点击 **Push**。步骤如下图所示：

![commit changes](submit-pr/commit_changes.png)

4、将本地仓库的修改推送到自己的远程仓库 origin。

![push](submit-pr/push.png)

5、完成之后，到 GitHub 自己的 docs-3d 远程仓库查看（可以从 **右上方的头像 -> Your profile -> Repositories -> docs-3d** 进入你的远程仓库），可以看到已经有本次的提交信息了。然后点击 **New pull request**。

![push finish](submit-pr/push_finish.png)

6、点击 **New pull request** 后会跳转到官方仓库的 **Open a pull request**。标题会自动填入刚才提交的信息，也可自行修改。下方的填写信息区域需要对提交内容进行适当的补充。特别是针对引擎本身的修改，请将问题描述、改动内容、涉及版本、相关平台等信息补充完整。如果有相关 Issue，或者论坛地址也可以贴上来。最下方的是本次提交的 PR 的改动详情。填写完成后点击 **Create pull request**。

![pull request](submit-pr/pull_request.png)

7、创建完成后在官方仓库 docs-3d 的 pull requests 页面中可以看到创建了一个新的 PR。官方人员会收到提醒并将 PR 指派给相关人员进行 review 和合并。到此 PR 创建完成，若官方审核通过，就会把这个 PR 的修改合并到官方仓库中了。如果上方的Open图标变为Merged图标，则表示修改已合并到官网。若官方觉得有需要，也会在该 PR 上展开进一步讨论。请留意 GitHub 相关消息或关注 PR 所在页面，以免错过讨论。如果你需要修改 PR 提交的内容，请重复 **上传本地修改到远程仓库** 中的 2、3、4 步骤。

## 添加官方仓库

如果距离上次克隆仓库已经挺长时间，那么请在提交 PR 前先从官方仓库获取最新的修改以防和其他人的修改发生冲突。

1、添加官方仓库。点击 GitKraken 左边列表的 **REMOTE +**，如下图所示：

![add upstream](submit-pr/add-upstream.png)

2、在 GitKraken 的 docs-3d 本地仓库的左侧，可以看到有 origin 和 cocos-creator3D 两个远程仓库，分别是自己的远程仓库和官方仓库。可以看到 **远程 -> cocos-creator3D** 下已经有了官方仓库的各个分支，如下图所示：

![upstream](submit-pr/upstream.png)

3、从官方仓库拉取最新更新。切换到要拉取的分支，然后点击左上方的 **Pull**。如下图所示：

![pull](submit-pr/pull.png)

**注意**：在更新官方版本前，如果你完全不熟悉 Git 的操作，建议先确保没有在本地的 Git 仓库中进行任何文件的改动。如果有的话，建议先手动还原，然后等更新完毕后再手动把改动添加回来。

## 如何反馈文档有关的问题

针对文档本身的问题，建议通过 GitHub issue 进行反馈，下面我们简单演示一下。在提交问题之前请先确认：

- 文档版本和 Creator 版本是否一致
- 操作步骤是否正确
- 是否是文档本身的问题，例如代码错误或者根据文档步骤执行出现异常等。

若以上问题都是确定的，那么，有以下两种提交方式：

1、可点击 Creator 官方文档右下方的 **提交反馈** 按钮，进入提交 issue 界面。

![issue](submit-pr/issue.png)

填写完成后点击 **Submit new issue** 提交 issue，就完成了。

2、或者也可以进入官方仓库 **creator-docs**（[GitHub](https://github.com/cocos/cocos-docs) | [Gitee](https://gitee.com/mirrors_cocos-creator/creator-docs/)），选择 **Issue -> New issue** 进入提交 issue 界面，填写内容并提交。

本次提交 pr 和提交 issue 的教程到这里就结束了，若有不理解或者有误的地方请根据上述步骤向我们反馈。<br>
有些人可能会问，为什么要这么麻烦的提交问题。其实，正确的提交问题可以节省很多的沟通成本，而且有些问题可能在初步排查的时候就可以解决了，或者会发现只是由于自己粗心大意导致的。而官方节省下来的人力就可以更好的去服务于 Creator，让 Creator 能更好地为游戏开发者服务。
