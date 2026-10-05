module.exports = class AlibabaPuHuiSans extends require('siyuan').Plugin {
  pluginName = 'siyuan-ttf-Alibaba_PuHui_Sans';

  onload() {
    console.log(`${this.pluginName}: load start.`);

    // @font-face 与字体栈声明由随包的 index.css 经 loadPetals 注入（pluginsStyle 元素），
    // 不在 onload 中手动 fetch：以 snippetCSS 为前缀注入的样式会被代码片段加载逻辑移除，
    // 导致启动时样式短暂出现后被删除，只有手动重启插件才能恢复
    setTimeout(() => {
      if (!document.fonts || typeof document.fonts.load !== 'function') return;
      try {
        // 预加载字体
        document.fonts.load('16px "AlibabaPuHuiTiSC"');
        document.fonts.load('16px "AlibabaPuHuiTiTC"');
        document.fonts.load('16px "AlibabaPuHuiTiJP"');
        document.fonts.load('16px "AlibabaSans"');
      } catch (_) {}
      console.log(`${this.pluginName}: loaded.`);
    }, 0);
  }

  onunload() {
    // 样式由前端在 destroyPlugin 中按 pluginsStyle${name} 移除，无需手动清理
    console.log(`${this.pluginName}: unloaded.`);
  }

  uninstall() {
    console.log(`${this.pluginName}: uninstall.`);
  }
};
