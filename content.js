// 確保頁面完全載入後執行
window.addEventListener('load', function() {
  // 檢查 QRCode 庫是否正確載入
  if (typeof QRCode === 'undefined') {
    console.error('QRCode library not loaded');
    return;
  }

  // 獲取網站 favicon 的函數
  function getFaviconUrl() {
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

  // 創建容器
  const container = document.createElement('div');
  container.className = 'qr-container';
  
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
  container.appendChild(qrDiv);
  container.appendChild(siteName);
  container.appendChild(pageTitle);
  document.body.appendChild(container);

  // 生成 QR Code
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
      logoImg.src = getFaviconUrl();

      logoImg.onload = function() {
        // 先繪製 QR Code
        ctx.drawImage(qrImage, 0, 0, 256, 256);

        // 計算 logo 的位置和大小
        const logoSize = 48;  // logo 大小
        const logoX = (256 - logoSize) / 2;  // 居中位置
        const logoY = (256 - logoSize) / 2;

        // 繪製白色背景
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(logoX - 2, logoY - 2, logoSize + 4, logoSize + 4);

        // 繪製 logo
        ctx.drawImage(logoImg, logoX, logoY, logoSize, logoSize);

        // 替換原來的 QR Code 圖片
        qrImage.src = canvas.toDataURL();
      };

      logoImg.onerror = function() {
        console.error('Error loading favicon');
      };
    }
  }, 100); // 給予一些時間讓 QR Code 先生成
}); 