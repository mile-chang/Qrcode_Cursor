# QR Code Chrome Extension

<div align="center">
  <a href="#chinese">中文</a> | <a href="#english">English</a> | <a href="#japanese">日本語</a>
</div>

---

<div id="chinese">

# QR Code 網頁分享插件 🔍

這是一個簡單但功能強大的 Chrome 擴展，可以為任何網頁生成包含網站 logo 的 QR Code。
本專案完全使用 [Cursor](https://cursor.sh/) 編輯器開發，展示了 AI 輔助開發的強大功能。

## 功能特點

- 在網頁右下角顯示一個簡潔的網站圖標
- 點擊圖標可展開顯示完整的 QR Code
- QR Code 中央自動嵌入當前網站的 logo
- 在 QR Code 下方顯示網站名稱和頁面標題
- 支持所有網站，對主流網站（如 GitHub、YouTube 等）有特殊優化
- 提供便捷的 QR Code 下載按鈕

## 使用方法

1. 安裝擴展後，會在每個網頁的右下角看到一個小圖標（網站的 favicon）
2. 點擊小圖標會展開顯示：
   - 帶有網站 logo 的 QR Code（尺寸：256x256像素）
   - 網站域名
   - 頁面標題
   - 下載按鈕
3. 點擊下載按鈕可將當前 QR Code 保存為圖片
4. 再次點擊可收起回到小圖標狀態

## 技術特點

- 使用 Cursor 編輯器進行 AI 輔助開發
- 自動檢測並使用最高質量的網站圖標
- 特殊處理主流網站的圖標獲取方式
- 使用 Canvas 技術實現 logo 的平滑嵌入
- 響應式設計，平滑的展開/收起動畫
- 高糾錯級別的 QR Code 生成

## 開發工具

- [Cursor](https://cursor.sh/) - AI 驅動的程式碼編輯器
- 透過 Cursor 的 AI 功能實現快速開發和程式碼優化
- 利用 AI 協助解決開發過程中的技術難題

## 安裝方法

1. 下載此專案的所有文件
2. 打開 Chrome 瀏覽器，進入擴展管理頁面（chrome://extensions/）
3. 開啟右上角的「開發者模式」
4. 點擊「載入未封裝項目」
5. 選擇此專案的資料夾

## 注意事項

- 某些網站可能會因為跨域限制無法正確顯示 logo
- 如果網站沒有設置 favicon，將使用網站域名作為標識
- QR Code 中的 logo 大小固定為 48x48 像素

## 更新記錄

### 最新版本
- 新增 QR Code 下載按鈕功能
- 優化 QR Code 生成效果
- 改進圖標顯示效果
- 優化使用者體驗

</div>

---

<div id="english">

# QR Code Web Share Extension 🔍

A simple yet powerful Chrome extension that generates QR codes with website logos for any webpage.
This project was entirely developed using the [Cursor](https://cursor.sh/) editor, showcasing the power of AI-assisted development.

## Features

- Displays a clean website icon in the bottom right corner
- Click to expand and show the full QR code
- Automatically embeds the website's logo in the center of the QR code
- Shows website name and page title below the QR code
- Supports all websites with special optimization for major platforms
- Provides a convenient QR code download button

## How to Use

1. After installation, you'll see a small icon (website favicon) in the bottom right corner of every webpage
2. Click the icon to expand and show:
   - QR code with website logo (256x256 pixels)
   - Website domain name
   - Page title
   - Download button
3. Click the download button to save the current QR code as an image
4. Click again to collapse back to icon view

## Technical Features

- Developed using Cursor editor with AI assistance
- Automatic detection and use of highest quality website icons
- Special handling for major website icons
- Smooth logo embedding using Canvas technology
- Responsive design with smooth expand/collapse animations
- High error correction level QR code generation

## Development Tools

- [Cursor](https://cursor.sh/) - AI-powered code editor
- Rapid development and code optimization through Cursor's AI features
- AI-assisted problem solving during development

## Installation

1. Download all project files
2. Open Chrome browser and navigate to extensions page (chrome://extensions/)
3. Enable "Developer mode" in the top right
4. Click "Load unpacked"
5. Select the project folder

## Notes

- Some websites may not display logos correctly due to CORS restrictions
- Website domain name will be used as identifier if favicon is not set
- QR code logo size is fixed at 48x48 pixels

## Update Log

### Latest Version
- Added QR code download button feature
- Enhanced QR code generation
- Improved icon display
- Enhanced user experience

</div>

---

<div id="japanese">

# QR コード Web 共有拡張機能 🔍

任意のウェブページに対してウェブサイトのロゴ入り QR コードを生成する、シンプルながらパワフルな Chrome 拡張機能です。
このプロジェクトは [Cursor](https://cursor.sh/) エディタを使用して完全に開発され、AI 支援開発の強力な機能を示しています。

## 主な機能

- ウェブページの右下にシンプルなウェブサイトアイコンを表示
- アイコンをクリックすると完全な QR コードを表示
- QR コードの中央にウェブサイトのロゴを自動的に埋め込み
- QR コードの下にウェブサイト名とページタイトルを表示
- すべてのウェブサイトをサポート（主要プラットフォームに特別対応）
- 便利な QR コードダウンロードボタンを提供

## 使用方法

1. インストール後、各ウェブページの右下に小さなアイコン（ウェブサイトのファビコン）が表示されます
2. アイコンをクリックすると表示される内容：
   - ウェブサイトのロゴ入り QR コード（256x256 ピクセル）
   - ウェブサイトのドメイン名
   - ページタイトル
   - ダウンロードボタン
3. ダウンロードボタンをクリックして現在の QR コードを画像として保存
4. 再度クリックするとアイコン表示に戻ります

## 技術的特徴

- Cursor エディタを使用した AI 支援開発
- 最高品質のウェブサイトアイコンの自動検出と使用
- 主要ウェブサイトのアイコン取得に特別対応
- Canvas 技術によるロゴのスムーズな埋め込み
- レスポンシブデザインと滑らかな展開/収縮アニメーション
- 高誤り訂正レベルの QR コード生成

## 開発ツール

- [Cursor](https://cursor.sh/) - AI 駆動のコードエディタ
- Cursor の AI 機能による迅速な開発とコード最適化
- 開発中の技術的課題に AI 支援による解決

## インストール方法

1. プロジェクトのすべてのファイルをダウンロード
2. Chrome ブラウザで拡張機能ページ（chrome://extensions/）を開く
3. 右上の「デベロッパーモード」を有効にする
4. 「パッケージ化されていない拡張機能を読み込む」をクリック
5. プロジェクトフォルダを選択

## 注意事項

- CORS 制限により一部のウェブサイトでロゴが正しく表示されない場合があります
- ファビコンが設定されていない場合、ウェブサイトのドメイン名が識別子として使用されます
- QR コード内のロゴサイズは 48x48 ピクセルに固定されています

## 更新履歴

### 最新バージョン
- QR コードダウンロードボタン機能を追加
- QR コード生成効果を向上
- アイコン表示を改善
- ユーザーエクスペリエンスを向上

</div>