// 声明 bodyObserver 为模块级变量
let bodyObserver = null;

// 声明一些常用的文本内容
const pluginName = 'siyuan-ttf-Alibaba_PuHui_Sans';

module.exports = class AlibabaPuHuiSans extends require('siyuan').Plugin {
  onload() {
    console.log(`${pluginName}: load start.`);

    const isMobile = () => {
      return !!window.siyuan?.mobile;
    };

    // 引入 @font-face
    const fetchFontFace = async () => {
      // 创建 style 元素
      const fontFace = document.createElement('style');
      // id 以 snippet 开头的 style 会被添加到导出 PDF 中 https://github.com/siyuan-note/siyuan/commit/4318aa446369eaf4ea85982ba4919b5d47340552
      fontFace.id = 'snippetCSS-PuHuiSans-FontFace';

      // 插入到 head 中
      document.head.appendChild(fontFace);

      // 读取 font-face 并且写入样式标签中
      await fetch('../plugins/siyuan-ttf-Alibaba_PuHui_Sans/font-face.css')
        .then((response) => {
          if (!response.ok) {
            throw new Error(`${pluginName}: Failed to load CSS file.`);
          }
          return response.text();
        })
        .then((cssText) => {
          fontFace.textContent = cssText;
        })
        .catch((error) => {
          console.error(`${pluginName}: Error loading CSS:`, error);
        });

      // 移除导出图片适配的样式标签
      document.querySelector('#snippetCSS-PuHuiSans-Image')?.remove();
    };

    // 使用 style 样式
    const fetchStyle = async () => {
      // 创建 style 元素
      const styleElement = document.createElement('style');
      // id 以 snippet 开头的 style 会被添加到导出 PDF 中 https://github.com/siyuan-note/siyuan/commit/4318aa446369eaf4ea85982ba4919b5d47340552
      styleElement.id = 'snippetCSS-PuHuiSans';

      // 插入到 head 中
      document.head.appendChild(styleElement);

      // 获取 CSS 文件内容并写入到样式标签中
      await fetch('../plugins/siyuan-ttf-Alibaba_PuHui_Sans/style.css')
        .then((response) => {
          if (!response.ok) {
            throw new Error(`${pluginName}: Failed to load CSS file`);
          }
          return response.text();
        })
        .then((cssText) => {
          // 将 CSS 文本插入到 style 元素中
          styleElement.textContent = cssText;
          console.log(`${pluginName}: Loaded successful.`);
        })
        .catch((error) => {
          console.error(`${pluginName}: Error loading CSS:`, error);
        });

      // 移除导出图片适配的样式标签
      document.querySelector('#snippetCSS-PuHuiSans-Image')?.remove();
    };

    // 使用 style-for-export-image 样式
    const fetchStyleForExportImage = async () => {
      // 创建 style 元素
      const imageStyle = document.createElement('style');
      // id 以 snippet 开头的 style 会被添加到导出 PDF 中 https://github.com/siyuan-note/siyuan/commit/4318aa446369eaf4ea85982ba4919b5d47340552
      imageStyle.id = 'snippetCSS-PuHuiSans-Image';

      // 插入到 head 中
      document.head.appendChild(imageStyle);

      // 获取适配图片的样式并且写入样式标签中
      await fetch('../plugins/siyuan-ttf-Alibaba_PuHui_Sans/style.css')
        .then((response) => {
          if (!response.ok) {
            throw new Error(`${pluginName}: Failed to load CSS file.`);
          }
          return response.text();
        })
        .then((cssText) => {
          // 将 CSS 文本插入到 style 元素中
          imageStyle.textContent = cssText;
        })
        .catch((error) => {
          console.error(`${pluginName}: Error loading CSS:`, error);
        });
    };

    fetchFontFace();
    // 启用插件时可能正在导出图片，预先处理
    if (document.querySelector('.b3-dialog--open[data-key="dialog-exportimage"]')) {
      if (isMobile()) {
        fetchStyle();
        return;
      }
      fetchStyleForExportImage();
    } else {
      fetchStyle();
    }

    // 监听 body 元素的直接子元素变化
    bodyObserver = new MutationObserver((mutationsList) => {
      mutationsList.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            setTimeout(() => {
              //  弹出导出图片窗口
              if (node.classList.contains('b3-dialog--open') && node.dataset.key === 'dialog-exportimage') {
                fetchStyleForExportImage();
              }
            });
          }
        });

        // 处理移除的节点
        mutation.removedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            // 关闭导出图片窗口
            if (node.classList.contains('b3-dialog--open') && node.dataset.key === 'dialog-exportimage') {
              fetchStyle();
            }
          }
        });
      });

      // 观察 body 元素子节点的变化
      bodyObserver.observe(document.body, { childList: true });
    });
  }

  onunload() {
    // 移除监听器
    bodyObserver?.disconnect();

    // 移除 style 元素
    const styleElement = document.getElementById('snippetCSS-PuHuiSans') || document.getElementById('snippetCSS-PuHuiSans-Image');
    if (styleElement) {
      styleElement.remove();
    }

    // 移除 font-face 元素
    const fontFaceElement = document.getElementById('snippetCSS-PuHuiSans-FontFace');
    if (fontFaceElement) {
      fontFaceElement.remove();
    }

    console.log(`${pluginName}: unloaded.`);
  }

  uninstall() {
    // 移除监听器
    bodyObserver.disconnect();

    // 在卸载时也移除 style 元素
    const styleElement = document.getElementById('snippetCSS-PuHuiSans') || document.getElementById('snippetCSS-PuHuiSans-Image');
    if (styleElement) {
      styleElement.remove();
    }

    // 在卸载时也移除 font-face 元素
    const fontFaceElement = document.getElementById('snippetCSS-PuHuiSans-FontFace');
    if (fontFaceElement) {
      fontFaceElement.remove();
    }

    console.log(`${pluginName}: uninstall.`);
  }
};
