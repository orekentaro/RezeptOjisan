import { createMessage } from "./modules/createMessage";

import type { E, Event, Payload } from "./types/lineChatBot";

// プロパティが無いと言われるのを防ぐ程度の型定義
export declare const global: {
  [x: string]: any;
};
global.doPost = (e: E) => {
  try {
    const userProperties = PropertiesService.getScriptProperties();
    const token = userProperties.getProperty("LINE_BOT_CHANNEL_TOKEN");

    const eventData = JSON.parse(e.postData.contents).events[0] as Event;

    const userMessage = eventData.message.text;
    const replyMessage = createMessage(userMessage);

    const payload = {
      replyToken: eventData.replyToken,
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
    UrlFetchApp.fetch(userProperties.getProperty("LINE_URL"), options);
  } catch (err) {
    return "半角数字で[総数 (半角スペース) CL数を入れてください。";
  }
};
