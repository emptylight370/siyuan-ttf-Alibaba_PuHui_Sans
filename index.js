module.exports = class AlibabaPuHuiSans extends require('siyuan').Plugin {
  pluginName = 'siyuan-ttf-Alibaba_PuHui_Sans';
  style = document.createElement('style');

  onload() {
    console.log(`${this.pluginName}: load start.`);

    fetch(`../plugins/${this.pluginName}/style.css`)
      .then((response) => {
        if (!response.ok) throw new Error(`${this.pluginName}: Failed to load CSS file.`);
        return response.text();
      })
      .then((css) => {
        // id 以 snippet 开头的 style 会被添加到导出 PDF 中 https://github.com/siyuan-note/siyuan/commit/4318aa446369eaf4ea85982ba4919b5d47340552
        this.style.id = `snippetCSS-${this.pluginName}`;
        this.style.textContent = css;
        document.head.appendChild(this.style);

        setTimeout(() => {
          if (!document.fonts || typeof document.fonts.load !== 'function') return;
          try {
            // 预加载字体
            document.fonts.load('16px "AlibabaPuHuiTiSC"');
          } catch (_) {}
          console.log(`${this.pluginName}: loaded.`);
        }, 0);
      })
      .catch((error) => {
        console.error(`${this.pluginName}: load error.` + error);
      });
  }

  onunload() {
    this.style?.remove();
    console.log(`${this.pluginName}: unloaded.`);
  }

  uninstall() {
    this.style?.remove();
    console.log(`${this.pluginName}: uninstall.`);
  }
};
