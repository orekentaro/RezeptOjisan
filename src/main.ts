import { main } from "./modules/functionTest";

const hello = "こんにちわ";
// プロパティが無いと言われるのを防ぐ程度の型定義
declare const global: {
  [x: string]: any;
};

global.run = () => {
  main(hello);
};
