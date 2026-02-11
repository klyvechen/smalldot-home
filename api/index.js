const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const app = express();

app.use(express.json());

// 從 Vercel 的 Environment Variables 讀取你的 Token
const token = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(token);

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

// 匯出 Express App 給 Vercel 執行
module.exports = app;
