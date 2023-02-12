export interface Message {
  type: string;
  id?: sting;
  text: string;
}
export interface Event {
  type: string;
  replyToken: string;
  source: {
    userId: string;
    type: string;
  };
  timestamp: number;
  message: Message;
}

export interface PostData {
  destination: string;
  contents: string;
}

export interface E {
  postData: PostData;
}

export interface Payload {
  replyToken: string;
  messages: Message[];
}
// プロパティが無いと言われるのを防ぐ程度の型定義
export declare const global: {
  [x: string]: any;
};
