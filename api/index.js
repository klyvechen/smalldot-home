const express = require('express');
const app = express();
app.use(express.json());

// 接收 Telegram 訊息的路由
app.post('/api/index', async (req, res) => {
  const { message } = req.body;
  console.log("收到訊息:", message?.text);
  // 這裡可以寫轉發給家裡 OpenClaw 的代碼
  res.status(200).send('OK');
});

// 重點：不要寫 app.listen，直接匯出 app
module.exports = app;
