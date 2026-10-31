# 思源笔记 阿里巴巴普惠体 插件

字体文件来自：[阿里巴巴普惠体](https://www.alibabafonts.com/#/font)，自带 .woff 格式

## 注意

本插件可能与集市中的其他字体或 Emoji 插件不兼容，使用本插件时请禁用其他字体或 Emoji 插件。

> [!NOTE]
> 本插件修改字体范围：全局。修改变量：`--b3-font-family-default`。
> 与设置中编辑器字体兼容，与修改其余变量插件/代码片段兼容。
> 在设置中修改全局字体会覆盖插件效果，目前插件作为默认全局字体启用。

> [!TIP]
> 修复发布服务时，因为使用了新版本声明语法，旧版本不受支持。如果你所用的版本无法更新，又遇到了发布服务下无法加载字体的问题，请参考 `plugin.json` 中的 `publish` 字段修改，注意将 `"fonts"` 文件夹替换为文件夹下的文件，注意每个字体文件均需列出。

## [更新日志](https://github.com/emptylight370/siyuan-ttf-Alibaba_PuHui_Sans/blob/main/changelog.md)

- 2026-10-31 支持在独立设置窗口中加载字体(3.8.7)
- 2026-09-24 修复发布服务加载失败问题
- 2026-09-10 适配思源 3.8.2、3.8.3 版本
- 2026-06-30 适配思源 3.7.0 版本
- 2026-02-23 更新赞助链接

## 鸣谢

模板仓库：[TCOTC/siyuan-ttf-HarmonyOS_Sans_SC-and-Twemoji](https://github.com/TCOTC/siyuan-ttf-HarmonyOS_Sans_SC-and-Twemoji)

支持开发：[链接](https://blog.emptylight.cn/sponsor)
