function doGet(e) {
    // アクセストークン取得
    const properties = PropertiesService.getScriptProperties();
    const accessToken = properties.getProperty("ACCESS_TOKEN");
  
    // ブロードキャストメッセージ送信
    const message = "お客さまがお呼びです";
    sendBroadcastMessage(accessToken, message);
  
    // 画面に表示
    const resultText = 'しばらくお待ちください'
    return ContentService.createTextOutput(resultText);
  }
  
  // ブロードキャストメッセージ送信
  // https://developers.line.biz/ja/reference/messaging-api/#send-broadcast-message
  function sendBroadcastMessage(accessToken, message) {
    const url = "https://api.line.me/v2/bot/message/broadcast";
    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`
    };
  
    const payload = {
      "messages": [{
        "type": "text",
        "text": message
      }]
    };
  
    const options = {
      "method": "post",
      "headers": headers,
      "payload": JSON.stringify(payload)
    };
  
    UrlFetchApp.fetch(url, options);
  }