   const express = require('express');                                                                       
   const bodyParser = require('body-parser');                                                                
                                                                                                             
   // 初始化 Express 應用                                                                                    
   const app = express();                                                                                    
   app.use(bodyParser.json());                                                                               
                                                                                                             
   const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;                                                        
   const TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_TOKEN}`;                                     
                                                                                                             
   // 處理 Telegram Webhook                                                                                  
   app.post('/', async (req, res) => {                                                                       
     const message = req.body;                                                                               
                                                                                                             
     console.log('收到的訊息:', message);                                                                    
                                                                                                             
     if (message.message) {                                                                                  
       const chatId = message.message.chat.id;                                                               
       const text = `你好！你剛才說了：「${message.message.text}」 😊`;                                      
                                                                                                             
       // 回應用戶                                                                                           
       await fetch(`${TELEGRAM_API}/sendMessage`, {                                                          
         method: 'POST',                                                                                     
         headers: { 'Content-Type': 'application/json' },                                                    
         body: JSON.stringify({                                                                              
           chat_id: chatId,                                                                                  
           text: text,                                                                                       
         }),                                                                                                 
       });                                                                                                   
                                                                                                             
       res.send({ status: '收到並已回應' });                                                                 
     } else {                                                                                                
       res.send({ status: '收到訊息但無需處理' });                                                           
     }                                                                                                       
   });                                                                                                       
                                                                                                             
   // 監聽 HTTP 請求 (僅適用於本地端測試)                                                                    
   const port = process.env.PORT || 3000;                                                                    
   app.listen(port, () => {                                                                                  
     console.log(`服務已啟動，http://localhost:${port}`);                                                    
   });                                                                                                       
                                                                                                             
   // 匯出程式碼 (Vercel 部署用)                                                                             
   module.exports = app;   
