// 確保頁面完全載入後執行
window.addEventListener('load', function() {
  // 檢查 QRCode 庫是否正確載入
  if (typeof QRCode === 'undefined') {
    console.error('QRCode library not loaded');
    return;
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
  
  // 獲取網站 favicon
  const favicon = document.querySelector('link[rel="icon"]') || 
                 document.querySelector('link[rel="shortcut icon"]');
  const faviconUrl = favicon ? favicon.href : '';
  
  try {
    // 生成 QR Code
    new QRCode(qrDiv, {
      text: window.location.href,
      width: 256,
      height: 256,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H,
      logo: faviconUrl,
      logoWidth: 64,
      logoHeight: 64,
      logoBackgroundColor: 'white',
      logoBackgroundTransparent: false
    });
  } catch (error) {
    console.error('Error generating QR code:', error);
  }
}); 