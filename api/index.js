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
  try {
    const { message } = req.body;

    if (message && message.text) {
      const chatId = message.chat.id;
      const text = message.text;

      // 簡單的回話邏輯
      if (text === '/start') {
        await bot.sendMessage(chatId, "你好！我是跑在 Vercel 上的交易助理。");
      } else {
        await bot.sendMessage(chatId, `收到訊息：${text}`);
      }
    }

    res.status(200).send('OK'); // 必須回傳 200 告訴 Telegram 訊息已收到
  } catch (error) {
    console.error(error);
    res.status(500).send('Error');
  }
});

module.exports = app;