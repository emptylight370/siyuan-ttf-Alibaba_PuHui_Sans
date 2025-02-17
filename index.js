module.exports = class AlibabaPuHuiSans extends require('siyuan').Plugin {
    onload() {

        // 创建 style 元素
        const styleElement = document.createElement('style');
        styleElement.id = 'snippetCSS-PuHuiSans';

        // 插入到 head 中
        document.head.appendChild(styleElement);

        // 获取 CSS 文件内容
        fetch('../plugins/siyuan-ttf-Alibaba_PuHui_Sans/style.css')
            .then(response => {
                if (!response.ok) {
                    throw new Error('siyuan-ttf-Alibaba_PuHui_Sans: Failed to load CSS file');
                }
                return response.text();
            })
            .then(cssText => {
                // 将 CSS 文本插入到 style 元素中
                styleElement.textContent = cssText;
                console.log("siyuan-ttf-Alibaba_PuHui_Sans: Loaded successful.");
            })
            .catch(error => {
                console.error('siyuan-ttf-Alibaba_PuHui_Sans: Error loading CSS:', error);
            });
    }

    onunload() {
        // 移除 style 元素
        const styleElement = document.getElementById('snippetCSS-PuHuiSans');
        if (styleElement) {
            styleElement.remove();
            console.log("siyuan-ttf-Alibaba_PuHui_Sans: Removed successful.");
        } else {
            console.log("siyuan-ttf_Alibaba_PuHui_Sans: Stylesheet not found.");
        }
    }

    uninstall() {
        // 在卸载时也移除 style 元素
        const styleElement = document.getElementById('snippetCSS-PuHuiSans');
        if (styleElement) {
            styleElement.remove();
            console.log("siyuan-ttf-Alibaba_PuHui_Sans: Removed successful.");
        } else {
            console.log("siyuan-ttf_Alibaba_PuHui_Sans: Stylesheet not found.");
        }
    }
};