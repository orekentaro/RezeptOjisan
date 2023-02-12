import { E, Event, Payload, global } from "./types/lineChatBot";

global.doPost = (e: E) => {
  try {
    const userProperties = PropertiesService.getScriptProperties();
    const token = userProperties.getProperty("LINE_BOT_CHANNEL_TOKEN");
    const eventData = JSON.parse(e.postData.contents).events[0] as Event;
    const replyToken = eventData.replyToken;
    const userMessage = eventData.message.text;
    const url = userProperties.getProperty("LINE_URL");
    const replyMessage = "投稿種別：" + e + "\n投稿内容：" + eventData;
    const payload = {
      replyToken: replyToken,
      messages: [
        {
          type: "text",
          text: replyMessage,
        },
      ],
    } as Payload;
    const options = {
      payload: JSON.stringify(payload),
      myamethod: "POST",
      headers: { Authorization: "Bearer " + token },
      contentType: "application/json",
    } as GoogleAppsScript.URL_Fetch.URLFetchRequestOptions;
    //LINE Messaging APIにリクエストし、ユーザーからの投稿に返答する
    UrlFetchApp.fetch(url, options);
  } catch (err) {
    console.log(err);
  }
};
