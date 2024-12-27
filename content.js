// 確保頁面完全載入後執行
window.addEventListener('load', initQRCode);

// 監聽 URL 變化
let lastUrl = location.href;
new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    resetQRCode();
  }
}).observe(document, { subtree: true, childList: true });

// 初始化 QR Code 的主函數
function initQRCode() {
  // 檢查 QRCode 庫是否正確載入
  if (typeof QRCode === 'undefined') {
    console.error('QRCode library not loaded');
    return;
  }

  // 移除舊的 QR code 容器（如果存在）
  const existingContainer = document.querySelector('.qr-container');
  if (existingContainer) {
    existingContainer.remove();
  }

  // 獲取網站 favicon 的函數
  function getFaviconUrl() {
    const hostname = window.location.hostname;

    // 特定網站的處理
    const specialSites = {
      'github.com': 'https://github.githubassets.com/favicons/favicon.svg',
      'www.github.com': 'https://github.githubassets.com/favicons/favicon.svg',
      'youtube.com': 'https://www.youtube.com/s/desktop/12d6b690/img/favicon_144x144.png',
      'www.youtube.com': 'https://www.youtube.com/s/desktop/12d6b690/img/favicon_144x144.png',
      'twitter.com': 'https://abs.twimg.com/responsive-web/client-web/icon-default.522d363a.png',
      'www.twitter.com': 'https://abs.twimg.com/responsive-web/client-web/icon-default.522d363a.png',
      'x.com': 'https://abs.twimg.com/responsive-web/client-web/icon-default.522d363a.png',
      'www.x.com': 'https://abs.twimg.com/responsive-web/client-web/icon-default.522d363a.png',
    };

    // 如果是特定網站，直接返回對應的 favicon URL
    if (hostname in specialSites) {
      return specialSites[hostname];
    }

    // 按優先順序檢查不同類型的 favicon
    const selectors = [
      'link[rel="icon"][sizes="192x192"]',
      'link[rel="icon"][sizes="128x128"]',
      'link[rel="icon"][sizes="96x96"]',
      'link[rel="icon"][sizes="64x64"]',
      'link[rel="icon"][sizes="32x32"]',
      'link[rel="shortcut icon"]',
      'link[rel="icon"]',
      'link[rel="apple-touch-icon"]'
    ];

    for (let selector of selectors) {
      const link = document.querySelector(selector);
      if (link && link.href) {
        return link.href;
      }
    }

    // 如果沒有找到，使用默認的 favicon 路徑
    return window.location.origin + '/favicon.ico';
  }

  // 創建樣式
  if (!document.querySelector('#qr-styles')) {
    const style = document.createElement('style');
    style.id = 'qr-styles';
    style.textContent = `
      .qr-container {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: white;
        padding: 15px;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        z-index: 2147483647;
        transition: all 0.3s ease;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .qr-container.collapsed {
        width: 48px;
        height: 48px;
        padding: 8px;
        border-radius: 50%;
        overflow: hidden;
      }
      .qr-container.collapsed .qr-code,
      .qr-container.collapsed .site-name,
      .qr-container.collapsed .page-title {
        display: none;
        opacity: 0;
        visibility: hidden;
      }
      .qr-toggle {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        background: white;
      }
      .qr-toggle img {
        width: 32px;
        height: 32px;
        object-fit: contain;
        position: relative;
      }
      .qr-container:not(.collapsed) .qr-toggle {
        display: none;
        opacity: 0;
        visibility: hidden;
      }
      .site-name, .page-title {
        margin-top: 8px;
        text-align: center;
        max-width: 256px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .page-title {
        font-weight: bold;
      }
    `;
    document.head.appendChild(style);
  }

  // 創建容器
  const container = document.createElement('div');
  container.className = 'qr-container collapsed';
  
  // 創建切換按鈕
  const toggle = document.createElement('div');
  toggle.className = 'qr-toggle';
  const toggleImg = document.createElement('img');
  toggleImg.src = getFaviconUrl();
  toggle.appendChild(toggleImg);
  
  // 創建 QR Code 元素
  const qrDiv = document.createElement('div');
  qrDiv.id = 'qrcode';
  qrDiv.className = 'qr-code';
  
  // 創建網站名稱元素
  const siteName = document.createElement('div');
  siteName.className = 'site-name';
  siteName.textContent = new URL(window.location.href).hostname;
  
  // 創建頁面標題元素
  const pageTitle = document.createElement('div');
  pageTitle.className = 'page-title';
  pageTitle.textContent = document.title.substring(0, 15);
  
  // 將元素添加到容器中
  container.appendChild(toggle);
  container.appendChild(qrDiv);
  container.appendChild(siteName);
  container.appendChild(pageTitle);
  document.body.appendChild(container);

  // 添加點擊事件
  container.addEventListener('click', function(event) {
    event.stopPropagation();
    
    if (container.classList.contains('collapsed')) {
      container.classList.remove('collapsed');
      // 首次展開時生成 QR Code
      if (!qrDiv.hasChildNodes()) {
        generateQRCode();
      }
    } else {
      container.classList.add('collapsed');
    }
  });

  // 生成 QR Code 的函數
  function generateQRCode() {
    // 清除舊的 QR Code
    qrDiv.innerHTML = '';
    
    // 生成新的 QR Code
    const qr = new QRCode(qrDiv, {
      text: window.location.href,
      width: 256,
      height: 256,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H
    });

    // 在 QR Code 生成後添加 logo
    setTimeout(() => {
      const qrImage = qrDiv.querySelector('img');
      if (qrImage) {
        // 創建一個臨時的 canvas
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 256;
        canvas.height = 256;

        // 加載 favicon
        const logoImg = new Image();
        logoImg.crossOrigin = 'Anonymous';
        const faviconUrl = getFaviconUrl();
        logoImg.src = faviconUrl;

        logoImg.onload = function() {
          // 先繪製 QR Code
          ctx.drawImage(qrImage, 0, 0, 256, 256);

          // 計算 logo 的位置和大小
          const logoSize = 48;
          const logoX = (256 - logoSize) / 2;
          const logoY = (256 - logoSize) / 2;

          // 繪製白色背景
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(logoX - 2, logoY - 2, logoSize + 4, logoSize + 4);

          // 設置圖像平滑
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';

          // 繪製 logo
          ctx.drawImage(logoImg, logoX, logoY, logoSize, logoSize);

          try {
            // 替換原來的 QR Code 圖片
            qrImage.src = canvas.toDataURL();
          } catch (e) {
            console.error('Error converting canvas to image:', e);
          }
        };

        logoImg.onerror = function() {
          console.warn('Error loading logo image:', faviconUrl);
          // 使用備用圖標
          logoImg.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxyZWN0IHg9IjMiIHk9IjMiIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgcng9IjIiIHJ5PSIyIj48L3JlY3Q+PHJlY3QgeD0iNyIgeT0iNyIgd2lkdGg9IjMiIGhlaWdodD0iOSI+PC9yZWN0PjxyZWN0IHg9IjE0IiB5PSI3IiB3aWR0aD0iMyIgaGVpZ2h0PSI1Ij48L3JlY3Q+PC9zdmc+';
        };
      }
    }, 100);
  }
}

// 重置 QR Code 的函數
function resetQRCode() {
  // 移除舊的 QR code
  const existingContainer = document.querySelector('.qr-container');
  if (existingContainer) {
    existingContainer.remove();
  }
  // 重新初始化
  initQRCode();
} 