# 独立仓库与在线发布

目标仓库：`casteen-code/campaign-motion-studio`。

编辑器直接放在新仓库根目录。它的 GitHub Pages 只发布本项目，库存工具保留在原仓库，两者分别部署。本文件是发布步骤，不能作为仓库已经创建或网站已经上线的证明。

## 首次设置

1. 打开 [GitHub 新建仓库](https://github.com/new?name=campaign-motion-studio)，仓库名填 `campaign-motion-studio`，选择 **Public**，勾选 **Add a README file** 后创建。
2. 在新仓库打开 **Settings → Pages → Build and deployment → Source**，选择 **GitHub Actions**。无需再选择或创建 GitHub 建议的工作流模板，本项目已带发布工作流。
3. 允许当前 GitHub 连接访问新仓库。如果该连接已选择 **All repositories**，通常无需额外添加仓库。
4. 把新仓库链接发给 GPT，继续将这个发布包内的项目内容上传到 `main`。`index.html`、`package.json` 和 `.github/` 必须位于仓库根目录，不要再套一层 `campaign-motion-studio/`。

也可以通过 GitHub Desktop 或已登录的 Git 命令行上传本项目。若远端已有 README 初始化提交，应先拉取、检查并合并该提交，不要强制覆盖远端历史。

## 发布流程

提交到 `main` 后，**Actions → Publish Campaign Motion Studio** 会依次运行：

1. 安装锁定版本的开发依赖，运行现有自动检查。
2. 重新构建完整 `index.html`，确认它与提交的源码一致。
3. 将编辑器与原版编辑器整理到 `_site/` 并上传发布。
4. 部署任务成功后，在 **Settings → Pages** 和工作流的 `github-pages` 环境中查看实际在线地址。

若仓库采用上述名称，成功发布后的预期地址为 `https://casteen-code.github.io/campaign-motion-studio/`。在 GitHub 显示部署成功且地址可打开前，不应把这个预期地址当成已上线链接。

原版编辑器在该网址下的 `examples/realme-99-legacy.html`。

本仓库只有 `pages.yml` 负责发布；`check.yml` 只做代码检查。不要在此仓库增加另一套发布库存工具的 Pages 工作流。

## 日后修改

日常在页面替换图片、调动效后，点击 **保存项目** 下载 `.campaign.json`，或点击 **保存独立 HTML**。网页里的个人修改不会自动提交到 GitHub。迁移时可通过“打开项目”导入此前下载的项目文件。

更新默认模板时，将新 campaign 素材放进 `assets/<campaign-name>/`，修改示例配置，再构建和提交：

```bash
npm test
npm run build:pages
```

构建工具会更新仓库根目录的 `index.html`。将它与源码一并提交；`_site/` 是发布时自动生成的目录，不需要提交。

## 常见发布问题

- **提示找不到 Pages site**：先在 Settings → Pages 将 Source 设为 GitHub Actions，再重跑发布工作流。
- **工作流未启动**：检查提交目标是否为 `main`，并在 Actions 中启用仓库工作流。
- **页面与源码不一致检查失败**：运行 `npm run build`，将更新后的 `index.html` 一并提交。
- **暂时出现 404**：先确认部署任务成功，再从 Settings → Pages 复制实际地址。

GitHub 官方说明：[配置发布来源](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)、[自定义 Pages 工作流](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)。
