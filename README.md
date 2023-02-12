# レセプトおじさん

以前 [Python](https://github.com/orekentaro/ReceiptChatBot) で作っていたが、Heroku の無料枠が無くなった為、GAS へ移動。

## ファイル構成

```
.
├── README.md
├── dist ・・・ GASへデプロイするファイル
│ ├── appsscript.json
│ └── main.js
├── package-lock.json
├── package.json
├── src ・・・ 作業ファイル（TypeScript）
│ ├── constants
│ │ └── const.ts
│ ├── main.ts ・・・ メインファイル
│ ├── modules ・・・ 関数
│ │ ├── createMessage.ts
│ │ ├── functionTest.ts
│ │ └── rezeptCalculation.ts
│ └── types ・・・ 型ファイル
│ └── lineChatBot.d.ts
├── tests ・・・テストコード（Jest）
│ └── modules
│ ├── createMessage.spec.ts
│ └── rezeptCaluculation.spec.ts
├── tsconfig.json
└── webpack.config.js
```

## コマンド

テスト

`npm test`

ビルド＆デプロイ

`npm run push`

- このコマンドにより dist 配下に JS ファイル 1 つになってビルドされ、GAS へデプロイされる。
