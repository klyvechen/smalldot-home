const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const app = express();

app.use(express.json());

const token = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(token);

// --- 新增：處理瀏覽器 GET 請求 ---
app.get('/', (req, res) => {
  res.status(200).send(`
    <h1>🤖 交易助理已啟動</h1>
    <p>伺服器狀態：正常 (Running on Vercel)</p>
    <p>本地測試請使用 POST 指令。</p>
    <hr>
    <small>最後更新時間：${new Date().toLocaleString('zh-TW', {timeZone: 'Asia/Taipei'})}</small>
  `);
});

// 接收 Telegram 訊息的路由
app.post('/api/index', async (req, res) => {
  // --- 新增：除錯專用 Log ---
  console.log("===== 收到新的請求 =====");
  console.log("Headers:", JSON.stringify(req.headers, null, 2));
  console.log("Body內容:", JSON.stringify(req.body, null, 2));
  
  // 檢查 Token 是否存在
  if (!process.env.TELEGRAM_TOKEN) {
    console.error("❌ 錯誤：找不到環境變數 TELEGRAM_TOKEN");
    return res.status(401).send("Token Missing");
  }

  try {
    const { message } = req.body || {};
    if (message && message.text) {
      const chatId = message.chat.id;
      console.log(`[成功解析] 來自 ID ${chatId} 的訊息: ${message.text}`);
      
      await bot.sendMessage(chatId, `助理收到：${message.text}`);
    } else {
      console.warn("⚠️ 警告：收到請求但找不到 message 欄位");
    }
    
    res.status(200).send('OK');
  } catch (error) {
    // 打印詳細的 Telegram 報錯
    console.error("❌ Telegram API 報錯:", error.message);
    res.status(500).send('Internal Error');
  }
});

module.exports = app;